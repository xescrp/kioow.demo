(function (define) {
    
    "use strict";
    
    define(function (require, exports) {
        
        var HTTPResponse = function (error, response, body) {
            this.responseError = error;
            this.responseBody = body;
            this.responseStatus = response.statusCode;
            this.response = response;
        }
        
        
        var _reqs = require('request');
        var HTTPClient;
        
        HTTPClient = function () {
            this.id = 'http_client#' + require('./api').buildTOKEN();
        }
        
        HTTPClient.prototype.get = function (url, query, headers, onfinishhandler) {
            var options = {
                url: url,
                qs: query,
                method: 'GET',
                headers: headers,
                gzip: true
            }
            
            _reqs(options, function (error, response, body) {
                if (error && response.statusCode != 200) {
                    //log this error...
                    console.log(error);
                }
                
                var fullresponse = {
                    responseError: error,
                    responseBody: body,
                    responseStatus: response.statusCode,
                    response: response
                };
                onfinishhandler(fullresponse);
            });
        }
        HTTPClient.prototype.post = function (url, postdata, headers, onfinishhandler) {
            var options = 
 {
                url: url,
                json: postdata,
                method: 'POST',
                headers: headers,
                gzip: true
            }
            
            _reqs(options, function (error, response, body) {
                if (error && response.statusCode != 200) {
                    //log this error...
                }
                
                var fullresponse = 
 {
                    responseError: error,
                    responseBody: body,
                    responseStatus: response.statusCode,
                    response: response
                };
                onfinishhandler(fullresponse);
            });
        }
        
        HTTPClient.prototype.postform = function (url, postdata, headers, onfinishhandler) {
            var options =
 {
                url: url,
                form: postdata,
                method: 'POST',
                headers: headers
            }
            
            _reqs(options, function (error, response, body) {
                if (error && response.statusCode != 200) {
                //log this error...
                }
                
                var fullresponse =
 {
                    responseError: error,
                    responseBody: body,
                    responseStatus: response.statusCode,
                    response: response
                };
                onfinishhandler(fullresponse);
            });
        }
        
        module.exports.HTTPClient = HTTPClient;
        module.exports.HTTPResponse = HTTPResponse;
    });
})(
    typeof define === 'function' && define.amd ? define : function (factory) { factory(require, exports); }
);