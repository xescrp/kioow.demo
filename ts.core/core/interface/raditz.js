var common = require('yourttoo.common');
var _ = require('underscore');
var routes = require('../local.routes');

var Raditz = function () {
    console.log('new instance of Raditz server...');
    this.configuration = {
        subjects: _.pluck(common.staticdata.hermessuscriptions, 'subject'),
        urlhermes: 'http://localhost:7000',
        filter: ['whitelabel', 'booking2'],
        port: 2000
    };
    this.strategy = require('../strategy')();
    this.core = require('./core');
    this.core.configuration.disconnected = true;
    this.subscribers = new common.hashtable.HashTable();
    this.errorhandler = { notassigned: true };
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(Raditz);

Raditz.prototype.start = function () {
    var remoteThis = common.remoteendpoint;
    remoteThis.RemoteServerEndPoint('Raditz Server Remote End Point', raditz.configuration.port, raditz);
    //main end point handler
    raditz.remoteserver.listen();

    raditz.remoteserver.io.on('connection', function (socket) {
        var router = require('../socketroutes/raditz.router')(raditz, socket);
    });
    
    raditz.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
    //core started...
    raditz.core.start();
    //suscriptors handler...
    raditz.loadsubscriptions();
    //raditz.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(raditz);
}

Raditz.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'raditz',
        strategymethod: request.method
    };
    if (request.forkprocess) {
        return raditz.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        return raditz.strategy.execstrategy(stargs, callback, errorcallback);
    }
}

Raditz.prototype.deploycontext = function (configuration) {
    var self = this;
    console.log('### Deploy a Raditz seed for context [' + configuration.subject.toUpperCase() + ']');
    //context description .... 
    var context = raditz.subscribers.get(configuration.subject) == null ? 
    {
        subject: configuration.subject,
        url: [self.configuration.urlhermes, configuration.subject].join('/'),
        process: null, 
        forked: false,
        actionsfile: configuration.subject + '/actions',
        command: function (rq) { this.process.command({
                command: rq.action,
                request: rq.request
            }); }
    } : raditz.subscribers.get(configuration.subject);
    //configuration for the process worker...
    var cf = {
        taskid: common.utils.getToken(),
        taskname: 'worker for subject ' + configuration.subject,
        taskpath: [routes.paths.core, 'interface/raditzworkercontext'].join('')
    };
    if (context.forked == false) { //check we're not relaunching same process...
        var worker = common.threading.forkworker(cf); //launch forked process, create context bin - isolate subject process
        context.forked = true; 
        context.process = worker;
        raditz.subscribers.set(configuration.subject, context);
        //manage the worker context...
        context.process.on('WORKER.READY', function () {
            //first configure process...
            context.process.sendconfiguration({
                name: context.subject + ' worker process...',
                subject: context.subject,
                actionsfile: context.actionsfile,
                url: context.url
            });
        });
        
        context.process.on('WORKER.EXIT', function (result) {
            //something went wrong... recycle process
            console.log('The raditz context ' + configuration.subject + ' has been unloaded');
            context.forked = false;
            raditz.subscribers.set(configuration.subject, context);
        });
        context.process.on('WORKER.CLOSE', function (result) {
            console.log('The worker context ' + configuration.subject + ' has been closed');
            //something went wrong... recycle process
            context.forked = false;
            raditz.subscribers.set(configuration.subject, context);
        });
        
        var checkerI = setInterval(function () { 
            !context.forked ? raditz.deploycontext(configuration) : null; //null: worker still alive, do nothing
        }, 3000);

        raditz.subscribers.set(configuration.subject, context);
    }
}

Raditz.prototype.loadsubscriptions = function () {
    var themes = raditz.configuration.filter || raditz.configuration.subjects;
    var launchinterval = setInterval(function () {
        var subject = themes.shift();
        subject != null && subject != '' ?  raditz.deploycontext({ subject: subject }) : clearInterval(launchinterval);
    }, 1000);
}

var raditz = module.exports = exports = new Raditz;
//raditz.start();