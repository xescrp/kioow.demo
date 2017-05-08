var common = require('yourttoo.common');
var base = require('../base');

var WorkerSubscriber = function () {
    
    this.configuration = {
        name: '',
        subject: '',
        actionsfile: ''
    };

    this.ICPWorker = new common.icpworker.ICPWorker();

    this.ICPWorker.on('command', function (socket) {
        console.log('command for worker suscriber...');
        var routes = require('../observers/routes/' + workersubscriber.configuration.actionsfile)(workersubscriber, socket);
    });

    this.ICPWorker.on('configuration', function (conf) {
        workersubscriber.configuration = conf;
        workersubscriber.ICPWorker.send('WORKER.CONFIGURED', workersubscriber.configuration);
    });
    this.strategy = require('../strategy')();
    this.core = new base.YourTTOOCore();
    this.core.start(function () {
        console.log('Subscriber worker ready to run...');
        workersubscriber.ICPWorker.ready();
    });
}

WorkerSubscriber.prototype.processrequest = function (request, callback, errorcallback) {
    var self = this;
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'subscribers',
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

WorkerSubscriber.prototype.setfinished = function (result) {
    setTimeout(function () { 
        workersubscriber.ICPWorker.send('WORKER.DONE', result);
    }, 4000);
    
}

WorkerSubscriber.prototype.seterror = function (err) {
    setTimeout(function () {
        workersubscriber.ICPWorker.send('WORKER.ERROR', err);
    }, 4000);
}

var workersubscriber = module.exports = exports = new WorkerSubscriber;