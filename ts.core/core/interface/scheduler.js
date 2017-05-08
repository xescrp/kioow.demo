var _ = require('underscore');
var common = require('yourttoo.common');
var hash = common.hashtable;

function getms(minutes) {
    return minutes * 60 * 1000;
}

var Scheduler = function () {
    var conf = require('../configurations/scheduler.config');
    this.configuration = {
        port: 9000,
        scheduledConfigurations: []
    };
    if (conf != null) { 
        this.configuration = conf.configuration;
    }
    this.scheduledTasks = conf.configuration.scheduledConfigurations;
    this.shortcuts = new hash.HashTable();
    this.requests = new hash.HashTable();
    this.scheduled = [];

    this.core = require('./core');
    this.core.configuration.disconnected = true;

    this.icplistener = new common.icp.ICPlistener([{
            messagekey: 'command', 
            commandpropertyname: 'command', 
            oncompletepropertyname: 'oncompleteeventkey', 
            onerrorpropertyname: 'onerroreventkey'
        }]);
    this.errorhandler = { notassigned: true };
    this.strategy = require('../strategy')();
}
//inherits
var eventThis = require('yourttoo.common').eventtrigger;
eventThis.eventtrigger(Scheduler);

Scheduler.prototype.configure = function () {
    scheduler.core.start();

    if (scheduler.scheduledTasks != null && scheduler.scheduledTasks.length > 0) {
        _.each(scheduler.scheduledTasks, function (conf) {
            
            var stconf = {
                name: conf.Name,
                key: conf.EventKey,
                runinmediately: conf.RunInmediately,
                interval: conf.Interval,
                scheduledfile: conf.TaskPath,
                core: scheduler.core
            }
            var _sch = require('./scheduled');
            var sch = new _sch.Scheduled(stconf);

            scheduler.scheduled.push(sch);
            scheduler.shortcuts.set(conf.EventKey, sch);

        });
    }
    //scheduler.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(scheduler);
}


Scheduler.prototype.start = function () {
    //initialization...
    scheduler.configure();
    scheduler.initremote();
    
    if (scheduler.scheduled != null && scheduler.scheduled.length > 0) {
        _.each(scheduler.scheduled, function (task) { 
            //task();
            console.log('scheduling task... ' + task.configuration.name);
            task.start();
        });
    }
}

Scheduler.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'scheduler',
        strategymethod: request.method
    };
    var rq = null;
    if (request.forkprocess) {
        rq = scheduler.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        rq = scheduler.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

Scheduler.prototype.initremote = function () {
    var remoteThis = require('yourttoo.common').remoteendpoint;
    remoteThis.RemoteServerEndPoint('Scheduler Remote End Point', scheduler.configuration.port, scheduler);

    scheduler.remoteserver.listen();
    scheduler.remoteserver.io.on('connection', function (socket) {
        //route connection...
        var router = require('../socketroutes/scheduler.actions')(scheduler, socket);
    });
    scheduler.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
    
    scheduler.icplistener.on('command', function (socket) {
        var router = require('../socketroutes/scheduler.actions')(scheduler, socket);
    });
}

var scheduler = module.exports = exports = new Scheduler;

