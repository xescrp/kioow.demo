var app = angular.module("openMarketTravelApp");

app.service('yto_api', function (http_service) {
    
    function NamedEvent(name) {
        this.name = name;
        this.callbacks = [];
    }
    NamedEvent.prototype.registerCallback = function (callback) {
        this.callbacks.push(callback);
    }
    
    function EventDispatcher() {
        this.events = {};
    }
    
    EventDispatcher.prototype.registerEvent = function (eventName) {
        var event = new NamedEvent(eventName);
        this.events[eventName] = event;
    };
    
    EventDispatcher.prototype.dispatchEvent = function (eventName, eventArgs) {
        this.events[eventName].callbacks.forEach(function (callback) {
            callback(eventArgs);
        });
    };
    
    EventDispatcher.prototype.addEventListener = function (eventName, callback) {
        this.events[eventName].registerCallback(callback);
    };
    
    var dispatcher = new EventDispatcher();
    var counter = 0;
    return {
        send: function (apicall, callback, errorcallback) {
            counter++;
            var _oncompleteeventkey = [apicall.command, counter, 'done'].join('_');
            var _onerroreventkey = [apicall.command, counter ,'error'].join('_');
            dispatcher.registerEvent(_oncompleteeventkey);
            dispatcher.registerEvent(_onerroreventkey);
            //console.log(dispatcher);
            //the event carrier..
            var eventCarrier = function (options) {
                this.command = options.command;
                this.request = options.request;
                this.service = options.service;
                this.rqid = 'request_' + counter;
                this.oncompleteeventkey = _oncompleteeventkey;
                this.onerroreventkey = _onerroreventkey;
                this.url = '/' + options.service + '/' + options.command;
                this.on = function (eventname, callback) {
                    dispatcher.addEventListener(eventname, callback)
                };
            };

            var rqCb = new eventCarrier(apicall);
            //send the request...
            http_service.http_request(rqCb.url, 'POST', '', apicall.request).then(
                function (data) {
                    console.log('api response for ' + rqCb.rqid);
                    dispatcher.dispatchEvent(_oncompleteeventkey, data);
                    if (callback) {
                        callback(data);
                    }
            },
            function (err) {
                    console.log('api error for ' + rqCb.rqid);
                    dispatcher.dispatchEvent(_onerroreventkey, err);
                    if (errorcallback) {
                        errorcallback(err);
                    }
            });

            return rqCb;
        }, 
        "get": function (url, query, callback, errorcallback) {
            counter++;
            var _oncompleteeventkey = [url, counter, 'done'].join('_');
            var _onerroreventkey = [url, counter, '_error'].join('_');
            dispatcher.registerEvent(_oncompleteeventkey);
            dispatcher.registerEvent(_onerroreventkey);
            var cnf = {
                command: url,
                request: query,
            };
            var eventCarrier = function (options) {
                this.command = options.command;
                this.request = options.request;
                this.rqid = 'request_' + counter;
                this.oncompleteeventkey = _oncompleteeventkey;
                this.onerroreventkey = _onerroreventkey;
                this.url = options.command;
                this.on = function (eventname, callback) {
                    dispatcher.addEventListener(eventname, callback)
                };
            };

            var rqCb = new eventCarrier(cnf);
            http_service.http_request(rqCb.url, 'GET', cnf.request, null).then(
                function (data) {
                    dispatcher.dispatchEvent(_oncompleteeventkey, data);
                    if (callback) {
                        callback(data);
                    }
                },
            function (err) {
                    dispatcher.dispatchEvent(_onerroreventkey, err);
                    if (errorcallback) {
                        errorcallback(err);
                    }
                });
            
            return rqCb;
        },
        post: function (url, query, callback, errorcallback) { 
            counter++;
            var _oncompleteeventkey = [url, counter, 'done'].join('_');
            var _onerroreventkey = [url, counter, '_error'].join('_');
            dispatcher.registerEvent(_oncompleteeventkey);
            dispatcher.registerEvent(_onerroreventkey);
            var cnf = {
                command: url,
                request: query,
            };
            var eventCarrier = function (options) {
                this.command = options.command;
                this.request = options.request;
                this.rqid = 'request_' + counter;
                this.oncompleteeventkey = _oncompleteeventkey;
                this.onerroreventkey = _onerroreventkey;
                this.url = options.command;
                this.on = function (eventname, callback) {
                    dispatcher.addEventListener(eventname, callback)
                };
            };

            var rqCb = new eventCarrier(cnf);
            http_service.http_request(rqCb.url, 'POST', null, cnf.request).then(
                function (data) {
                    dispatcher.dispatchEvent(_oncompleteeventkey, data);
                    if (callback) {
                        callback(data);
                    }
                },
            function (err) {
                    dispatcher.dispatchEvent(_onerroreventkey, err);
                    if (errorcallback) {
                        errorcallback(err);
                    }
                });
            
            return rqCb;
        }
    }

});