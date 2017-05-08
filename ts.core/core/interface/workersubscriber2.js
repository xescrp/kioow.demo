var common = require('yourttoo.common');
var base = require('../base');

var WorkerSubscriber = function () {
    
    this.configuration = {
        name: '',
        subject: '',
        actionsfile: '',
        url: '',
        actions: []
    };
    
    this.commands = [];
    this.socket = null;
    this.currentcommand = null;
    this.toutcommand = null;

    this.ICPWorker = new common.icpworker.ICPWorker();
    
    this.ICPWorker.on('command', function (socket) {
        console.log('command for worker suscriber...');
        var routes = require('../observers/routes/' + workersubscriber.configuration.actionsfile)(workersubscriber, socket);
    });
    
    this.ICPWorker.on('configuration', function (conf) {
        workersubscriber.configuration = conf;
        workersubscriber.ICPWorker.send('WORKER.CONFIGURED', workersubscriber.configuration);
    });
    
    this.trigger = common.eventtrigger.eventcarrier(common.utils.getToken());

    this.strategy = require('../strategy')();

    this.core = new base.YourTTOOCore();
    this.core.start(function () {
        console.log('Subscriber worker ready to run...');
        workersubscriber.ICPWorker.ready();
        var routes = require('../observers/routes/' + 
            workersubscriber.configuration.actionsfile)(workersubscriber, workersubscriber.trigger);
        workersubscriber.toutcommand = setInterval(workersubscriber.processcommandqueue, 5000);
    });
}

WorkerSubscriber.prototype.processcommandqueue = function () { 
    (workersubscriber.commands != null && workersubscriber.commands.length > 0) ? 
    process.nextTick(function () {
        if (workersubscriber.currentcommand == null) {
            workersubscriber.currentcommand = workersubscriber.commands.shift();
            workersubscriber.ICPWorker.send('WORKER.PROCESS.COMMAND', workersubscriber.currentcommand);
            workersubscriber.trigger.emit(workersubscriber.currentcommand.action, workersubscriber.currentcommand.request);
        }
    }) : null;
}

WorkerSubscriber.prototype.startlistening = function () { 
    var self = this;
    var io = require('socket.io-client');
    self.socket = io(self.configuration.url);
    self.socket.on('connect', function (result) {
        console.log('connection successful!!');
        console.log('Suscriptor connected - Subject: ' + self.configuration.subject);
        console.log('Connected at - ' + new Date());
        
        self.socket.on('subscriptions.connected', function (actions) {
            self.configuration.actions = actions.availableactions;
            //configure a listening handler for each action...
            _.each(self.configuration.actions, function (action) {
                console.log('SOCKET: listening for action [' + self.configuration.subject + '].[' + action + ']...');
                self.socket.on(action, function (request) {
                    console.log('an action [' + action + '] just happened for subject [' + self.configuration.subject + ']');
                    var conf = {
                        action: action,
                        request: request,
                        id: common.utils.getToken()
                    };
                    self.commands.push(conf);
                    self.ICPWorker.send('WORKER.NEW.COMMAND', conf);
                });
            });
        });
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
    var rs = {
        result: result,
        command: JSON.parse(JSON.stringify(workersubscriber.currentcommand))
    };
    workersubscriber.currentcommand = null;
    workersubscriber.ICPWorker.send('WORKER.DONE', rs);
}

WorkerSubscriber.prototype.seterror = function (err) {
    var rs = {
        error: err,
        command: JSON.parse(JSON.stringify(workersubscriber.currentcommand))
    };
    workersubscriber.currentcommand = null;
    workersubscriber.ICPWorker.send('WORKER.ERROR', rs);
}

var workersubscriber = module.exports = exports = new WorkerSubscriber;