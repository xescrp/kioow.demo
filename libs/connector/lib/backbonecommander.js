
//initialization...
var io = require('socket.io-client');
var events = require('events');
var _ = require('underscore');
var backboneconnection_default = 'https://localhost:6033';
var sockeventsenums = {
    connection: {
        emit: {
            timeout: 'backbone.timeout',
            error: 'backbone.error'
        },
        on: {
            connect: 'connect',
            timeout: 'connect_timeout',
            error: 'connect_error'
        }
    },
    request: {
        emit: {
            sendrequest: 'backbone.request',
            sendcommand: 'backbone.command',
            statuschanged: 'backbone.requeststatus.changed'
        },
        on: null
    },
    response: {
        emit: {
            getresponse: 'backbone.response',
        },
        on: {
            getresponse: 'backbone.response'
        }
    }
};

//TOKEN Auto Builder
function _buildTOKEN() {
    var d = new Date().getTime();
    var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    
    return token;
}


var BackboneCommander = function (options) {
    options = options || { url: backboneconnection_default };
    this.backboneconnection = options.url || backboneconnection_default;
    var connector = new _backboneactions(this.backboneconnection);
    return connector;
}


var _backboneactions = function (url) { 
    this.url = url;
}

_backboneactions.prototype.sendRequest = function (request, callback, errorcallback) {
    request.url = this.url;
    var _send = (function (request, callback, errorcallback) {
        return function (request, callback, errorcallback) {
            
            //Generic method to factory every request and it's delegates...
            function _buildRequest(socket, request) {
                
                var TaskRequest = function (idtoken) {
                    this.date = new Date();
                    this.key = idtoken || _buildTOKEN();
                    this.socket = socket;
                    this.command = request.command;
                    this.request = request.request;
                    this.state = 'idle';
                    this.response = null;
                    
                    events.EventEmitter.call(this);
                };
                TaskRequest.super_ = events.EventEmitter;
                
                TaskRequest.prototype = Object.create(events.EventEmitter.prototype, {
                    constructor: {
                        value: taskrequest,
                        enumerable: false
                    }
                });
                var rqT = _buildTOKEN();
                var taskrequest = new TaskRequest(rqT);
                
                return taskrequest;
            }

            console.log('new backbone connection...');
            var io = require('socket.io-client');
            var action = request.apiaction || 'backbone.command';
            var conn_opts = {
                reconnection: false,
                //////////////////////////////
                // this forces a new connection!
                forceNew: true
            };
            if (request.auth != null) {
                conn_opts = {
                    query: 'userid=' + request.auth.userid + 
                    '&accesstoken=' + request.auth.accessToken +
                    '&command=' + request.command + 
                    '&service=' + request.service,
                    reconnection: false,
                    //////////////////////////////
                    // this forces a new connection!
                    forceNew: true
                };
            }
            //delete the auth data.. this will be sent via socket headers...
            delete request['auth'];
            var socket = io(request.url, conn_opts);
            var clientRequest = _buildRequest(socket, request);
            //our flag...
            var responseevent = request.request.oncompleteeventkey || request.command + '.done';
            var responseerrorevent = request.request.onerroreventkey || request.command + '.error';
            
            request.request.oncompleteeventkey = responseevent;
            request.request.onerroreventkey = responseerrorevent;
            var uncaughtexception = 'uncaughtException';
            //configure timeout
            var timeout = setTimeout(function () {
                console.log('connection timeout!!');
                console.log('Timeout at - ' + new Date());
                var data = 'The service has no response, server is busy or down';
                var rsp = { ResultOK: false, Message: data };
                clientRequest.state = 'timeout';
                clientRequest.response = data;
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(sockeventsenums.connection.emit.timeout, data);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
                clearTimeout(timeout);
            }, 50000);
            
            socket.on(sockeventsenums.connection.on.connect, function () {
                console.log('connection successful!!');
                console.log('Client connected');
                console.log('Connected at - ' + new Date());
                
                socket.emit(action, request);
                clientRequest.state = 'running';
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
            });
            
            socket.on(sockeventsenums.connection.on.error, function (data) {
                console.log('connection error!!');
                console.log('Error at - ' + new Date());
                
                var rsp = { ResultOK: false, Message: data };
                clientRequest.state = 'exception';
                clientRequest.response = data;
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(sockeventsenums.connection.emit.error, data);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(sockeventsenums.connection.on.timeout, function (data) {
                console.log('connection timeout!!');
                console.log('Timeout at - ' + new Date());
                console.log(data);
                var rsp = { ResultOK: false, Message: data };
                clientRequest.state = 'timeout';
                clientRequest.response = data;
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(sockeventsenums.connection.emit.timeout, data);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(request.request.oncompleteeventkey, function (results) {
                console.log('response OK from api for client ' + clientRequest.key);
                clientRequest.state = 'done';
                clientRequest.response = results;
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.oncompleteeventkey, results);
                if (callback) {
                    callback(results);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(request.request.onerroreventkey, function (results) {
                console.log('response NOK from api for client ' + clientRequest.key);
                clientRequest.state = 'error';
                clientRequest.response = results;
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.onerroreventkey, results);
                if (errorcallback) {
                    errorcallback(results);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(uncaughtexception, function (err) {
                console.log('response NOK from api for client ' + clientRequest.key);
                clientRequest.state = 'error';
                clientRequest.response = err;
                clientRequest.emit(sockeventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.onerroreventkey, err);
                if (errorcallback) {
                    errorcallback(err);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            return clientRequest;
        }
    })(request, callback, errorcallback);

    return _send(request, callback, errorcallback);
}
_backboneactions.prototype.send = function (request, callback, errorcallback) { 
    return this.sendRequest(request, callback, errorcallback);
}


exports = module.exports = BackboneCommander;



