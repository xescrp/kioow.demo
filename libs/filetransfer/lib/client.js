var _ = require('underscore');
var fs = require('fs');
var common = require('yourttoo.common');

var Client = function () { 
    this.id = common.utils.getToken();
}

var eventThis = common.eventtrigger;
eventThis.eventtrigger(Client);

Client.prototype.send = function (conf) {
    var _send = (function (conf) {
        
        return function (conf) {
            var token = common.utils.getToken();
            var rsp = common.eventtrigger.eventcarrier(token);
            
            var io = require('socket.io-client');
            var socket = io(conf.url);
            
            socket.on('connect', function (result) {
                console.log('connection successful!!');
                console.log('Client connected');
                console.log('Connected at - ' + new Date());
                
                //read file...
                var filepath = conf.source;
                fs.readFile(filepath, function (err, data) {
                    err != null ? rsp.emit('send.error', err) : process.nextTick(function () {
                        var options = {
                            filetarget: conf.filetarget,
                            buffer: new Buffer(data),
                            acknowledgetoken: 'send.done.' + token
                        };
                        socket.on(options.acknowledgetoken, function (res) {
                            rsp.emit('send.done', res);
                        });
                        socket.emit('file.send', options);
                    });
                })
            });
            
            return rsp;
        }
    })(conf);

    return _send(conf);
    
}



module.exports.Client = Client;