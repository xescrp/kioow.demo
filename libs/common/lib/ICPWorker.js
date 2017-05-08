var events = require('events');
var _ = require('underscore');
var eventtriger = require('./eventtrigger');

var ICPWorker = function (options) {
    var self = this;

    process.on('message', function (icpmsg) {
        
        if (icpmsg.hasOwnProperty('icpconfigmessage')) { 
            self.emit('configuration', icpmsg.icpconfigmessage);
        } else {
            var c_id = require('./utils').getToken();
            var carrier = eventtriger.eventcarrier(c_id);
            var action = icpmsg.command;
            var request = icpmsg.request;
            
            self.emit('command', carrier);
            
            carrier.on('icp.emit.error', function (err) {
                process.send('WORKER.ERROR', err);
            });
            carrier.on('icp.emit.info', function (info) {
                process.send('WORKER.INFO', info);
            });
            carrier.on('icp.emit.done', function (data) {
                process.send('WORKER.DONE', data);
            });
            
            carrier.emit(action, request);
        }

    });
}


ICPWorker.super_ = events.EventEmitter;
ICPWorker.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: ICPWorker,
        enumerable: false
    }
});

ICPWorker.prototype.ready = function () {
    var self = this;

    self.send('WORKER.READY', null);
}

ICPWorker.prototype.send = function (message, data) {
    var msg = {
        $interprocess: message, 
        key: message, 
        data: data
    }
    process.send(msg);
}

ICPWorker.prototype.end = function () {
    var self = this;
    self.send('WORKER.KILL', null)
}

module.exports.ICPWorker = ICPWorker;

