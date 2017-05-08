var events = require('events');

var SubProcess = function (options) {
    this.options = options || { id: 'notassigned' };
    this.id = options.id || 'subprocess_' + new Date();
    var self = this;
    process.send({ $interprocess: 'SUBPROCESS.READY' });

    process.on('message', function (request) { 
        self.emit('command', request);
    });

}

SubProcess.super_ = events.EventEmitter;
SubProcess.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: SubProcess,
        enumerable: false
    }
});

SubProcess.prototype.Response = function (results) { 
    var response = { $interprocess: 'SUBPROCESS.RESPONSE', result: results };
    process.send(response);
}

SubProcess.prototype.ResponseError = function (err) {
    var response = { $interprocess: 'SUBPROCESS.ERROR', error: err };
    process.send(response);
}

module.exports.SubProcess = SubProcess;