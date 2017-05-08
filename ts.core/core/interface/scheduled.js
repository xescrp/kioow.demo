var _ = require('underscore');
var routes = require('../local.routes');
var common = require('yourttoo.common');

var Scheduled = function (options) {
    this.configuration = {
        workerpath: routes.paths.core + 'interface/workerscheduled',
        name: options.name,
        key: options.key,
        runinmediately: options.runinmediately,
        interval: options.interval,
        scheduledfile: options.scheduledfile,
        intervalitem: null
    };
    this.launchrequest = null;
    this.core = options.core;
    this.socket = null;
    var self = this;
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(Scheduled);


Scheduled.prototype.start = function () {
    var self = this;

    self.launchrequest = {
        name: self.configuration.name,
        key: self.configuration.key,
        scheduledfile: self.configuration.scheduledfile
    };
    
    console.log('configured task ' + self.launchrequest);

    (self.configuration.interval != null && self.configuration.interval > 0) ? 
    self.configuration.seintervalitem = setInterval(function () {
        self.process(self.launchrequest);
    }, self.configuration.interval * 60000) : null;

    if (self.configuration.runinmediately) { 
        //start process now..
        self.process(self.launchrequest);
    }
}

Scheduled.prototype.schedule = function (interval) {
    var self = this;
    
    self.launchrequest = {
        name: self.configuration.name,
        key: self.configuration.key,
        scheduledfile: self.configuration.scheduledfile
    };
    
    console.log('configured task in ' + interval);
    console.log(self.launchrequest);
    
    (interval != null && interval > 0) ? 
    self.configuration.seintervalitem = setTimeout(function () {
        self.process(self.launchrequest);
    }, interval) 
    : 
    self.dispatch({
        data: null, results: { Message: 'No interval configured' }, 
        errors: ['No interval configured'], request: null
    }, function () {
        console.log('worker.end');
    });

}


Scheduled.prototype.dispatch = function (conf, callback) {
    var collectionname = 'SubscriptionMessages';
    var self = this;
    var data = conf.data;
    var result = conf.results;
    var errors = conf.errors;
    var req = conf.request;
    var message = self.core.mongo.getmodel({ collectionname: collectionname, modelobject: data });

    result != null ? message.lastresults.push(result) : null;
    req != null ? message.lastparams.push(req) : null;
    errors != null ? message.errorslist.push(errors) : null;

    console.log('save data of execution...');
    console.log(message);
    message.save(function (err, doc) {
        if (err) { console.log(err); }
        if (doc) {
            console.log('scheduled ' + self.configuration.name + ' has finished to process scheduled task');
            console.log(doc);
        }
        if (callback) { 
            callback();
        }
    });

}

Scheduled.prototype.process = function (options) {
    var self = this;
    
    var cf = {
        taskid: common.utils.getToken(),
        taskname: options.name ,
        taskpath: self.configuration.workerpath
    };

    var worker = common.threading.forkworker(cf);
    var taskOK = false;
    
    var responseData = {
        code: common.utils.getToken(),
        subject: self.configuration.name,
        action: 'scheduled.' + self.configuration.key,
        lasterrordate: null,
        commitdate: null,
        subscribertaskdone: false,
        state: 'not processed',
        subscriberslist: [{ name: 'scheduled/' + cf.taskname}],
        errorslist: [],
        lastresults: []
    };

    //When is ready...send command..
    worker.on('WORKER.READY', function () {
        //first configure process...
        worker.sendconfiguration(options);

    });
    
    worker.on('WORKER.CONFIGURED', function () { 
        worker.command({
            command: self.launchrequest.scheduledfile,
            request: self.launchrequest
        });
    });

    worker.on('WORKER.DONE', function (result) {
        console.log('scheduled task ' + options.name + ' finished ok');
        taskOK = true;
        responseData.commitdate = new Date();
        responseData.subscribertaskdone = true;
        responseData.state = 'done';

        self.dispatch({ data: responseData, results: result, errors: null, request: options.request }, function () {
            worker.end();
        });
    });
    
    worker.on('WORKER.ERROR', function (err) {
        //something went wrong...
        console.log('scheduled task ' + options.name + ' finished no ok');
        taskOK = false;
        responseData.lasterrordate = new Date();
        responseData.subscribertaskdone = true;
        responseData.state = 'error';

        self.dispatch({ data: responseData, results: err, errors: err, request: options.request }, function () { 
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


module.exports.Scheduled = Scheduled;