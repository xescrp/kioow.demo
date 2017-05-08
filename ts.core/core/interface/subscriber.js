var io = require('socket.io-client');
var _ = require('underscore');
var routes = require('../local.routes');
var common = require('yourttoo.common');

var Subscriber = function (options) {
    this.configuration = {
        workerpath: routes.paths.core + 'interface/workersubscriber',
        name: options.name,
        url: options.url,
        subject: options.subject,
        actions: []
    };
    this.core = options.core;
    this.socket = null;
    this.trigger = common.eventtrigger.eventcarrier(common.utils.getToken());
    var self = this;
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(Subscriber);


Subscriber.prototype.start = function () {
    var self = this;
    //self.core.start();
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
                        request: request
                    }
                    self.process(conf);
                });
                console.log('TRIGGER: listening for action [' + self.configuration.subject + '].[' + action + ']...');
                self.trigger.on(action, function (request) {
                    console.log('an action [' + action + '] just happened for subject [' + self.configuration.subject + ']');
                    var conf = {
                        action: action,
                        request: request
                    }
                    self.process(conf);
                });
            });

        });


    });
}

Subscriber.prototype.dispatch = function (conf, callback) {
    var collectionname = 'SubscriptionMessages';
    var self = this;
	var data = conf.data;
    var result = conf.results;
    var errors = conf.errors;
    var req = conf.request;
    var subscriber = conf.subscriber;

    var message = self.core.mongo.getmodel({ collectionname: collectionname, modelobject: data });
	result != null ? message.lastresults.push(result) : null;
    req != null ? message.lastparams.push(req) : null;
    errors != null ? message.errorslist.push(errors) : null;
    subscriber != null ? message.subscriberslist.push(subscriber) : null;
    message.save(function (err, doc) {
        if (err) { console.log(err); }
        if (doc) {
            console.log('subscriber ' + self.configuration.subject + ' has finished to process message');
            console.log(doc);
        }
        if (callback) { 
            callback();
        }
    });

}

Subscriber.prototype.process = function (options) {
    var self = this;
    var action = options.action;
    var cf = {
        taskid: common.utils.getToken(),
        taskname: self.configuration.subject + ' - ' + action ,
        taskpath: self.configuration.workerpath
    }
    var worker = common.threading.forkworker(cf);
    var taskOK = false;
    
    var responseData = {
        code: common.utils.getToken(),
        subject: self.configuration.subject,
        action: action,
        lasterrordate: null,
        commitdate: null,
        subscribertaskdone: false,
        state: 'not processed',
        subscriberslist: [],
        errorslist: [],
        lastresults: [],
        lastparams: []
    };

    //When is ready...send command..
    worker.on('WORKER.READY', function () { 
        //first configure process...
        worker.sendconfiguration({
            name: self.configuration.subject + ' worker process for ' + action + ' message subscriber...',
            subject: self.configuration.subject,
            actionsfile: self.configuration.subject + '.actions'
        });

    });
    
    worker.on('WORKER.CONFIGURED', function () { 
        worker.command({
            command: action,
            request: options.request
        });
    });

    worker.on('WORKER.DONE', function (result) {
        //something went wrong...
        taskOK = true;
        responseData.commitdate = new Date();
        responseData.subscribertaskdone = true;
        responseData.state = 'done';

        self.dispatch({ data: responseData, results: result, errors: null, request: options.request, subscriber: self.configuration.name }, function () {
            worker.end();
        });
    });
    
    worker.on('WORKER.ERROR', function (err) {
        taskOK = false;
        responseData.lasterrordate = new Date();
        responseData.subscribertaskdone = true;
        responseData.state = 'error';

        self.dispatch({ data: responseData, results: err, errors: err, request: options.request, subscriber: self.configuration.name }, function () { 
            worker.end();
        });
        
    });

    worker.on('WORKER.EXIT', function (result) {
        if (taskOK == false) {
            //something went wrong...
        }
    });
    worker.on('WORKER.CLOSE', function (result) {
        if (taskOK == false) {
            //something went wrong...
        }
    });
}


module.exports.Subscriber = Subscriber;