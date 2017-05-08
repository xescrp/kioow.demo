var io = require('socket.io-client');
var events = require('events');
var _ = require('underscore');

function _buildTOKEN() {
    var d = new Date().getTime();
    var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    
    return token;
}

var emitevent = exports.emitevent = function (options, callback) {
    var _emit = (function (options, callback) {
        return function () { 
            var io = require('socket.io-client');
            var socket = io(options.url);
            
            var responseevent = options.request.oncompleteeventkey || options.command + '.done';
            var responseerrorevent = options.request.onerroreventkey || options.command + '.error';
            
            request.request.oncompleteeventkey = responseevent;
            request.request.onerroreventkey = responseerrorevent;
            
            socket.on('connect', function (result) {
                console.log('connection successful!!');
                console.log('Client connected');
                console.log('Connected at - ' + new Date());
                var command = options.command;
                socket.emit(options.command, options.request);
            });
            if (options.oncompleteeventkey == null || options.responseeventkey == '') {
                options.responseeventkey = options.emiteventkey + '.finished';
            }
            socket.on(options.responseeventkey, function (result) {
                rq.response = result;
                //request.emit(options.responseeventkey, result);
                if (callback) {
                    callback(result);
                }
            });
        }
    })(options, callback);
}

var send = exports.send = function (options, callback, errorcallback) {
    
    var _send = (function (options, callback, errorcallback) {
        return function (options, callback, errorcallback) {
            
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
             
            var io = require('socket.io-client');
            var conn_opts = {
                reconnection: false,
                //////////////////////////////
                // this forces a new connection!
                forceNew: true
            };
            if (options.auth != null) {
                if (options.authnovalidate != null && options.authnovalidate == true) { 
            //nothing to do...
                } else {
                    conn_opts = {
                        query: 'userid=' + options.auth.userid + 
                    '&accesstoken=' + options.auth.accessToken +
                    '&command=' + options.command + 
                    '&service=' + options.service,
                        reconnection: false,
                        //////////////////////////////
                        // this forces a new connection!
                        forceNew: true
                    };
                    //delete the auth data.. this will be sent via socket headers...
                    delete options['auth'];
                }
            }
            
            var socket = io(options.url, conn_opts);
            var request = _buildRequest(socket, options);
            var responseevent = request.request.oncompleteeventkey || request.command + '.done';
            var responseerrorevent = request.request.onerroreventkey || request.command + '.error';
            var uncaughtexception = 'uncaughtException';
            
            request.request.oncompleteeventkey = responseevent;
            request.request.onerroreventkey = responseerrorevent;
            
            socket.on('connect', function (result) {
                console.log('connection successful!!');
                console.log('Client connected');
                console.log('Connected at - ' + new Date());
                var command = options.command;
                socket.emit(options.command, options.request);
            });
            
            socket.on(options.request.oncompleteeventkey, function (result) {
                request.response = result;
                request.emit(options.request.oncompleteeventkey, result);
                if (callback) {
                    callback(result);
                }
                socket.disconnect();
            });
            
            socket.on(options.request.onerroreventkey, function (result) {
                request.response = result;
                request.emit(options.request.onerroreventkey, result);
                if (errorcallback) {
                    errorcallback(result);
                }
                socket.disconnect();
            });
            
            socket.on(uncaughtexception, function (err) {
                request.response = err;
                request.emit(options.request.onerroreventkey, err);
                if (errorcallback) {
                    errorcallback(err);
                }
                socket.disconnect();
            });
            
            socket.on('connect_timeout', function (data) {
                console.log('connection timeout!!');
                console.log('Timeout at - ' + new Date());
                console.log(data);
                var rsp = { ResultOK: false, Message: data };
                
                request.emit('timeout', rsp);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
            });
            
            socket.on('connect_error', function (data) {
                console.log('connection error!!');
                console.log('Error at - ' + new Date());
                console.log(data);
                var rsp = { ResultOK: false, Message: data };
                
                request.emit('error', rsp);
                if (errorcallback) {
                    errorcallback(rsp);
                }
                socket.disconnect();
            });
            
            return request;
        }
    })(options, callback, errorcallback);

    return _send(options, callback, errorcallback);
}