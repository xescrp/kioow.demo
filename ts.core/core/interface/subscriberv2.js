
var _ = require('underscore');

var common = require('yourttoo.common');

var Subscriber = function (options) {
    this.configuration = {
        workerpath: 'C:/development/node/yourttoo/core/yourttoo.core/interface/workersubscriber',
        offlinepath: 'C:/yourttoo.works/subscribers',
        name: options.name,
        url: options.url,
        subject: options.subject,
        actions: []
    };
    this.core = options.core;
    this.socket = null;
    this.trigger = common.eventtrigger.eventcarrier(common.utils.getToken());
    this.worker = null;
    this.commands = {};
    var self = this;
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(Subscriber);

Subscriber.prototype.workerlistener = function () {
    var self = this;

    var subject = self.configuration.subject;
    var cf = {
        taskid: common.utils.getToken(),
        taskname: self.configuration.subject + ' - ' + action,
        taskpath: self.configuration.workerpath
    }
    self.worker = common.threading.forkworker(cf);
    //When is ready...send command..
    self.worker.on('WORKER.READY', function () {
        //first configure process...
        self.worker.sendconfiguration({
            name: self.configuration.subject + ' worker process for subject ' + subject + ' message subscriber...',
            subject: self.configuration.subject,
            actionsfile: self.configuration.subject + '.actions',
            actions: [],
            url: self.configuration.url
        });

    });
    
    self.worker.on('WORKER.CONFIGURED', function () {
        console.log('Subscriber Worker for subject ' + self.configuration.subject + ' configured.');
    });
    
    self.worker.on('WORKER.NEW.COMMAND', function (conf) { 
        self.commands[conf.id] = {
            dbreg: {
                code: conf.id,
                subject: self.configuration.subject,
                action: conf.action,
                lasterrordate: null,
                commitdate: null,
                subscribertaskdone: false,
                state: 'not processed'
            },
            request: conf
        };

        //offline save...
        self.offlinesave(self.commands[conf.id], function (err) {
            err != null ? process.nextTick(function () {
                console.error('Error saving offline last received Hiperion command (suscribers)');
                console.error(err);
                console.error(JSON.stringify(conf));
            })
             : process.nextTick(function () { 
                console.log('New Hiperion command saved for offline process');
            });
        });
    });
    
    self.worker.on('WORKER.PROCESS.COMMAND', function (conf) { 
        self.commands[conf.id].dbreg.state = 'processing';
    });

    self.worker.on('WORKER.MONGO.TIMEOUT', function () {
        self.worker.workerunsuscribe(true);
        setTimeout(function () { self.workerlistener() }, 4000);
    });
    
    self.worker.on('WORKER.DONE', function (result) {
        var responseData = self.commands[result.command.id] != null ? self.commands[result.command.id].dbreg : null;
        responseData != null ? process.nextTick(function () { 
            responseData.commitdate = new Date();
            responseData.subscribertaskdone = true;
            responseData.state = 'done';
            var rq = self.commands[result.command.id].request.request;

            self.dispatch({ data: responseData, results: result, errors: null, request: rq, subscriber: self.configuration.name }, function () {
                worker.end();
            });
        }) : 
        console.log('this H command has been processed or does not exists');
    });
    
    self.worker.on('WORKER.ERROR', function (err) {
        var responseData = self.commands[err.command.id] != null ? self.commands[err.command.id].dbreg : null;
        responseData != null ? process.nextTick(function () {
            responseData.lasterrordate = new Date();
            responseData.subscribertaskdone = true;
            responseData.state = 'error';
            var rq = self.commands[err.command.id].request.request;
        
            self.dispatch({ data: responseData, results: err, errors: err, request: rq, subscriber: self.configuration.name }, function () {            
                worker.end();
            });              
        }) : 
        console.log('this H command has been processed or does not exists');
    });
    
    self.worker.on('WORKER.EXIT', function (result) {
        console.log('worker ' + self.configuration.subject + ' has been closed');
        console.log('restarting process subscriber for subject ' + self.configuration.subject);
        setTimeout(function () { self.workerlistener() }, 4000);
    });
    
    self.worker.on('WORKER.CLOSE', function (result) {
        console.log('worker ' + self.configuration.subject + ' has been closed');
        console.log('restarting process subscriber for subject ' + self.configuration.subject);
        setTimeout(function () { self.workerlistener() }, 4000);
    });

}

Subscriber.prototype.offlinesave = function (command, callback) {
    var fs = require('fs');

    function directoryExists(path, mask, cb) {
        if (typeof mask == 'function') {
            mask = 0777;
        }
        fs.mkdir(path, mask, function (err) {
            if (err) {
                if (err.code == 'EEXIST') cb(null);
                else cb(err);
            } else cb(null);
        });
    }

    var self = this;
    var dnow = new Date();
    var year = common.utils.pad(dnow.getFullYear(), 4);
    var month = dnow.getMonth() + 1;
    month = common.utils.pad(month, 2);
    var day = common.utils.pad(dnow.getDate(), 2);
    var strdate = [day, month, year].join('-');
    var foldername = '/' + self.configuration.subject + '/' + strdate;
    var fullpath = self.configuration.offlinepath + foldername;

    directoryExists(fullpath, 0744, function (err) {
        err != null ? 
        process.nextTick(function () {
            console.log('failed directory creation...' + fullpath)
            callback != null ? callback(err) : null;
        }) 
        : 
        process.nextTick(function () {
            var filename = command.id;
            var filepath = [fullpath, filename].join('/');
            //write the command for possible disk file recovering
            var content = JSON.stringify(command);
            fs.writeFile(filepath, content, function(err)  {
                (err != null) ? console.error(err) : console.log('Saved (offline) command for hiperion ' + command.id);
                callback != null ? callback(err) : null;               
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


Subscriber.prototype.workerunsuscribe = function (endprocess) {
    var self = this;
    var _endprc = (endprocess != null) ? endprocess : false;
    self.worker.removeAllListeners('WORKER.READY');
    self.worker.removeAllListeners('WORKER.CONFIGURED');
    self.worker.removeAllListeners('WORKER.MONGO.TIMEOUT');
    self.worker.removeAllListeners('WORKER.DONE');
    self.worker.removeAllListeners('WORKER.ERROR');
    self.worker.removeAllListeners('WORKER.EXIT');
    self.worker.removeAllListeners('WORKER.CLOSE');

    _endprc ? self.worker.end() : null;
}

Subscriber.prototype.process = function (options) {
    var self = this;
    var action = options.action;
    var cf = {
        taskid: common.utils.getToken(),
        taskname: self.configuration.subject + ' - ' + action ,
        taskpath: self.configuration.workerpath
    }
    self.worker = common.threading.forkworker(cf);
    var taskOK = false;
    
    var responseData = {
        code: common.utils.getToken(),
        subject: self.configuration.subject,
        action: action,
        lasterrordate: null,
        commitdate: null,
        subscribertaskdone: false,
        state: 'not processed'
    };
    
    
}


module.exports.Subscriber = Subscriber;