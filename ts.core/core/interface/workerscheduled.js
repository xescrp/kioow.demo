var common = require('yourttoo.common');
var base = require('../base');

var WorkerScheduled = function () {
    
    this.configuration = {
        name: '',
        key: '',
        scheduledfile: ''
    };

    this.ICPWorker = new common.icpworker.ICPWorker();

    this.ICPWorker.on('command', function (socket) {
        console.log('command for worker scheduled...');
        var routes = require('../observers/routes/scheduled.actions')(workerscheduled, socket);
    });

    this.ICPWorker.on('configuration', function (conf) {
        workerscheduled.configuration = conf;
        console.log('configuration for worker scheduled...');
        workerscheduled.ICPWorker.send('WORKER.CONFIGURED', workerscheduled.configuration);
    });
    this.strategy = require('../strategy')();
    this.core = new base.YourTTOOCore();
    this.core.start(function () {
        console.log('Scheduled worker ready to run...');
        workerscheduled.ICPWorker.ready();
    });
}

WorkerScheduled.prototype.processrequest = function (request, callback, errorcallback) {
    var self = this;
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'scheduled',
        strategymethod: request.method
    };
    var rq = null;
    if (request.forkprocess) {
        rq = self.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        rq = self.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

WorkerScheduled.prototype.setfinished = function (result) {
    workerscheduled.ICPWorker.send('WORKER.DONE', result);
}

WorkerScheduled.prototype.seterror = function (err) {
    workerscheduled.ICPWorker.send('WORKER.ERROR', err);
}

var workerscheduled = module.exports = exports = new WorkerScheduled;