
var io = require('socket.io-client');
var events = require('events');
var _ = require('underscore');
var lzw = require('./lzw');

var apiconnection_default = 'https://localhost:6033';
var httpconnection_default = 'https://localhost:4100';


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

module.exports.buildTOKEN = _buildTOKEN;

var apieventsenums = {
    connection: {
        emit: {
            timeout: 'api.timeout',
            error: 'api.error'
        },
        on: {
            connect: 'connect',
            timeout: 'connect_timeout',
            error: 'connect_error',
            unauthorized: 'not_authorized',
            apierror: 'api.command.error'
        }
    },
    request: {
        emit: {
            sendrequest: 'api.request',
            sendcommand: 'api.command',
            statuschanged: 'api.requeststatus.changed'
        },
        on: null
    },
    response: {
        emit: {
            getresponse: 'api.response',
        },
        on: {
            getresponse: 'api.response'
        }
    }
};


var _apiactions = function (url) {
    this.url = url;
}

_apiactions.prototype.sendRequest = function (request, callback, errorcallback) {
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
            
            console.log('new request connection...');
            var io = require('socket.io-client');
            var action = request.apiaction || 'api.command';
            var conn_opts = {
                reconnection: false,
                //////////////////////////////
                // this forces a new connection!
                forceNew: true
            };
            var queryparams = [];
            //compression stuff...
            var compression = (request.compression != null && request.compression.enabled != null) ? 
            request.compression : { enabled: false };
            
            var typecnf = typeof (compression.enabled);
            
            var cmpenabled = false;
            if (typecnf == 'boolean') { cmpenabled = compression.enabled; }
            if (typecnf == 'string') { cmpenabled = (compression.enabled == 'true'); }
            if (typecnf == 'number') { cmpenabled = (compression.enabled > 0); }
            //end compression...
            
            if (request.auth != null) {
                queryparams.push('userid=' + request.auth.userid);
                queryparams.push('accesstoken=' + request.auth.accessToken);
                queryparams.push('command=' + request.command);
                queryparams.push('service=' + request.service);
                //conn_opts = {
                //    query: 'userid=' + request.auth.userid + 
                //    '&accesstoken=' + request.auth.accessToken +
                //    '&command=' + request.command + 
                //    '&service=' + request.service +
                //    '&compression=' + cmpenabled,
                //    reconnection: false,
                //    //////////////////////////////
                //    // this forces a new connection!
                //    forceNew: true
                //};
            }
            queryparams.push('compression=' + cmpenabled);
            conn_opts.query = queryparams.join('&');
            //delete the auth data.. this will be sent via socket headers...
            delete request['auth'];
            delete request['compression'];
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
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(apieventsenums.connection.emit.timeout, data);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
                clearTimeout(timeout);
            }, 50000);
            
            socket.on(apieventsenums.connection.on.connect, function () {
                console.log('connection successful!!');
                console.log('Client connected');
                console.log('Connected at - ' + new Date());
                var snRQ = cmpenabled ? lzw.compress(JSON.stringify(request)) : request;
                socket.emit(action, snRQ);
                clientRequest.state = 'running';
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
            });
            
            socket.on(apieventsenums.connection.on.error, function (data) {
                console.log('connection error!!');
                console.log('Error at - ' + new Date());
                
                var rsp = { ResultOK: false, Message: data };
                
                clientRequest.state = 'exception';
                clientRequest.response = data;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(apieventsenums.connection.emit.error, data);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(apieventsenums.connection.on.timeout, function (data) {
                console.log('connection timeout!!');
                console.log('Timeout at - ' + new Date());
                
                var rsp = { ResultOK: false, Message: data };
                clientRequest.state = 'timeout';
                clientRequest.response = data;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(apieventsenums.connection.emit.timeout, data);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(request.request.oncompleteeventkey, function (results) {
                console.log('response OK from api for client ' + clientRequest.key);
                var dt = cmpenabled ? JSON.parse(lzw.decompress(results)) : results;
                clientRequest.state = 'done';
                clientRequest.response = dt;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.oncompleteeventkey, dt);
                if (callback) {
                    callback(dt);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(request.request.onerroreventkey, function (results) {
                console.log('response NOK from api for client ' + clientRequest.key);
                
                clientRequest.state = 'error';
                clientRequest.response = results;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.onerroreventkey, results);
                if (errorcallback) {
                    errorcallback(results);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            
            socket.on(apieventsenums.connection.on.unauthorized, function (err) {
                console.log('credentials NOOK in the request ' + clientRequest.key);
                
                clientRequest.state = 'error';
                clientRequest.response = err;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.onerroreventkey, err);
                if (errorcallback) {
                    errorcallback(err);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(apieventsenums.connection.on.apierror, function (err) {
                console.log('response NOK from api for client ' + clientRequest.key);
                
                clientRequest.state = 'error';
                clientRequest.response = err;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(request.request.onerroreventkey, err);
                if (errorcallback) {
                    errorcallback(err);
                }
                socket.disconnect();
                clearTimeout(timeout);
            });
            
            socket.on(uncaughtexception, function (err) {
                console.log('response NOK from api for client ' + clientRequest.key);
                clientRequest.state = 'error';
               
                clientRequest.response = err;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
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
_apiactions.prototype.send = function (request, callback, errorcallback) {
    return this.sendRequest(request, callback, errorcallback);
}

var _apihttpactions = function (url) {
    this.url = url;
}

_apihttpactions.prototype.sendRequest = function (request, callback, errorcallback) {
    request.urlcnx = this.url;
    var _send = (function (request, callback, errorcallback) {
        return function (request, callback, errorcallback) {
            var _resthttp = require('./httpclient');
            var http = new _resthttp.HTTPClient();
            
            var headers = {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
            };
            
            //our flag...
            var responseevent = request.request.oncompleteeventkey || request.command + '.done';
            var responseerrorevent = request.request.onerroreventkey || request.command + '.error';
            
            request.request.oncompleteeventkey = this.responseevent;
            request.request.onerroreventkey = this.responseerrorevent;
            
            var clientRequest = _buildRequest(null, request);
            
            if (request != null && request.method != null && request.method != '') {
                if (request.headers != null) {
                    headers = request.headers;
                }
                var method = request.method.toLowerCase();
                
                clientRequest.state = 'running';
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                var cmdurl = request.urlcnx + '/' + request.command;
                if (request.url != null && request.url != '') {
                    cmdurl = request.url;
                }
                http[method](cmdurl, request.request, headers, function (results) {
                    var rs = null;
                    var errordata = null;
                    try {
                        rs = JSON.parse(results.responseBody);
                    }
            catch (err) {
                        console.log(err);
                        errordata = { ResultOK: false, Message: err };
                    }
                    
                    if (rs != null) {
                        clientRequest.state = 'done';
                        clientRequest.response = rs;
                        clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                        clientRequest.emit(request.request.oncompleteeventkey, rs);
                        if (callback) {
                            callback(rs);
                        }
                    }
                    else {
                        clientRequest.state = 'error';
                        clientRequest.response = errordata;
                        clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                        clientRequest.emit(apieventsenums.connection.emit.error, errordata);
                        if (callback) {
                            callback(errordata);
                        }
                    }

                });
            }
            else {
                var rsp = {
                    ResultOK: false, 
                    Message: 'You have to specify in your request param a property method with GET or POST Method choice for your http request'
                }
                clientRequest.state = 'error';
                clientRequest.response = rsp;
                clientRequest.emit(apieventsenums.request.emit.statuschanged, clientRequest);
                clientRequest.emit(apieventsenums.connection.emit.error, rsp);
                if (callback) {
                    callback(rsp);
                }
            }
        
        }
    })(request, callback, errorcallback);
}

_apihttpactions.prototype.send = function (request, callback) {
    return this.sendRequest(request, callback);
}


var APIConnector = function (options) {
    
    this.apiconnection = apiconnection_default;
    
    var connector = null;
    if (options != null && options.endpointinterface != null && options.endpointinterface != '') {
        switch (options.endpointinterface) {
            case 'socket':
                this.apiconnection = apiconnection_default;
                if (options != null && options.url != null && options.url != '') {
                    this.apiconnection = options.url;
                }
                connector = new _apiactions(this.apiconnection);
                break;
            case 'http':
                this.apiconnection = httpconnection_default;
                if (options != null && options.url != null && options.url != '') {
                    this.apiconnection = option.url;
                }
                connector = new _apihttpactions(this.apiconnection);
                break;
            default:
                this.apiconnection = apiconnection_default;
                if (options != null && options.url != null && options.url != '') {
                    this.apiconnection = options.url;
                }
                connector = new _apiactions(this.apiconnection);
                break;
        }
    }
    return connector;
}

module.exports.API = APIConnector;