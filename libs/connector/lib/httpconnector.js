var events = require('events');
var _ = require('underscore');

var _chttp = require('./httpclient');
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
function _buildRequest(options) {
    
    var HTTPRequest = function () {
        this.date = new Date();
        this.key = _buildTOKEN();
        this.url = options.url;
        this.request = options.request;
        this.state = 'idle';
        this.response = null;
        this.method = options.method;
        this.headers = options.headers;

        events.EventEmitter.call(this);
    };
    HTTPRequest.super_ = events.EventEmitter;
    
    HTTPRequest.prototype = Object.create(events.EventEmitter.prototype, {
        constructor: {
            value: httprequest,
            enumerable: false
        }
    });
    
    var httprequest = new HTTPRequest;
    
    return httprequest;
}

var HTTPConnector = function () { 
    this.defaulRESTtheader =  {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,fr;q=0.4',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    };
    this.httpclient = new _chttp.HTTPClient();
}

//response = {
//responseError: error,
//responseBody: body,
//responseStatus: response
//}

HTTPConnector.prototype.send = function (options) {
    if (options.method) {
        return this[options.method](options);
    } else {
        throw new Error('you must provide the Method [GET, POST] in your options: ej -> { method : \'GET\'}');
    }
}

HTTPConnector.prototype.get = function (options, callback, errorcallback) {
    var clientRequest = _buildRequest(options);
    var self = this;
    clientRequest.state = 'running';

    setTimeout(function () { 
        clientRequest.emit('request.started', clientRequest);
    }, 100);
    
    //send...
    self.httpclient.get(clientRequest.url, clientRequest.request, clientRequest.headers, function (rsp) {
        clientRequest.state = 'finished';
        if (rsp) {
            //check...
            console.log(rsp.responseStatus);
            if (rsp.responseStatus != null && rsp.responseStatus == 200) {
                clientRequest.response = rsp.responseBody;
                clientRequest.emit('request.done', rsp.responseBody);
                if (callback) { 
                    callback(rsp.responseBody);
                }
            }
            if (rsp.responseStatus != null && rsp.responseStatus != 200) {
                clientRequest.response = rsp.responseError;
                clientRequest.emit('request.error', rsp.responseError);
                if (errorcallback) {
                    errorcallback(rsp.responseError);
                }
            }
        } else { 
            clientRequest.response = '(400) No response from the server';
            clientRequest.emit('request.error', rsp.responseError);
            if (errorcallback) {
                errorcallback(rsp.responseError);
            }
        }

    });

    return clientRequest;
}

HTTPConnector.prototype.post = function (options, callback, errorcallback) {
    var clientRequest = _buildRequest(options);
    var self = this;
    clientRequest.state = 'running';
    
    setTimeout(function () {
        clientRequest.emit('request.started', clientRequest);
    }, 100);
    
    //send...
    self.httpclient.post(clientRequest.url, clientRequest.request, clientRequest.headers, function (rsp) {
        clientRequest.state = 'finished';
        if (rsp) {
            //check...
            console.log(rsp.responseStatus);
            if (rsp.responseStatus != null && rsp.responseStatus == 200) {
                clientRequest.response = rsp.responseBody;
                clientRequest.emit('request.done', rsp.responseBody);
                if (callback) {
                    callback(rsp.responseBody);
                }
            }
            if (rsp.responseStatus != null && rsp.responseStatus != 200) {
                clientRequest.response = rsp.responseError;
                clientRequest.emit('request.error', rsp.responseError);
                if (errorcallback) {
                    errorcallback(rsp.responseError);
                }
            }
        } else {
            clientRequest.response = '(400) No response from the server';
            clientRequest.emit('request.error', rsp.responseError);
            if (errorcallback) {
                errorcallback(rsp.responseError);
            }
        }

    });
    
    return clientRequest;
}

HTTPConnector.prototype.postform = function (options, callback, errorcallback) {
    var clientRequest = _buildRequest(options);
    var self = this;
    clientRequest.state = 'running';
    
    setTimeout(function () {
        clientRequest.emit('request.started', clientRequest);
    }, 100);
    
    //send...
    self.httpclient.postform(clientRequest.url, clientRequest.request, clientRequest.headers, function (rsp) {
        clientRequest.state = 'finished';
        if (rsp) {
            //check...
            console.log(rsp.responseStatus);
            if (rsp.responseStatus != null && rsp.responseStatus == 200) {
                clientRequest.response = rsp.responseBody;
                clientRequest.emit('request.done', rsp.responseBody);
                if (callback) {
                    callback(rsp.responseBody);
                }
            }
            if (rsp.responseStatus != null && rsp.responseStatus != 200) {
                clientRequest.response = rsp.responseError;
                clientRequest.emit('request.error', rsp.responseError);
                if (errorcallback) {
                    errorcallback(rsp.responseError);
                }
            }
        } else {
            clientRequest.response = '(400) No response from the server';
            clientRequest.emit('request.error', rsp.responseError);
            if (errorcallback) {
                errorcallback(rsp.responseError);
            }
        }

    });
    
    return clientRequest;
}


module.exports.HTTPConnector = HTTPConnector;