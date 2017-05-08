var common = require('yourttoo.common');
var _ = require('underscore');

var RaditzSeed = function () { 
    this.configuration = {
        name: '',
        subject: '',
        actionsfile: '',
        url: '',
        actions: []
    };
    this.localroutes = require('../local.routes').paths;
    this.requests = [];
    this.currentrequest = null;
    this.routes = null;
    this.trigger = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    this.strategy = require('../strategy')();
    var base = require('../base');
    this.core = new base.YourTTOOCore();
    
    this.core.start(function () {
        console.log('### Raditz worker - core ready and running...');
    });
}

RaditzSeed.prototype.command = function (socket) { 
    var self = this;
    if (socket != null) { 
        console.log('an action [' + action + '] just triggered for subject [' + self.configuration.subject + ']');
        var trroutes = require('../observers/' + self.configuration.subject + '/actions')(self, socket);
    } 
}

RaditzSeed.prototype.setconfiguration = function (config) {
    this.configuration = config;
}

RaditzSeed.prototype.trackactions = function () {
    var self = this;

    _.each(self.configuration.actions, function (action) {
        console.log('SOCKET: listening for action [' + self.configuration.subject + '].[' + action + ']...');
        self.socket.on(action, function (request) {
            console.log('an action [' + action + '] just happened for subject [' + self.configuration.subject + ']');
        });
        console.log('TRIGGER: listening for action [' + self.configuration.subject + '].[' + action + ']...');
        self.trigger.on(action, function (request) {
            console.log('an action [' + action + '] just triggered for subject [' + self.configuration.subject + ']');
        });
    });

    self.trigger.on('dispatch.done', function (rs) { 
        self.dispatch(false, rs);
    });
    self.trigger.on('dispatch.error', function (rs) {
        self.dispatch(true, rs);
    });
}

RaditzSeed.prototype.start = function () {
    var self = this;
    console.log('#### connecting ' + self.configuration.subject + ' raditz worker to Hermes');
    console.log('#### url: ' + self.configuration.url);
    var io = require('socket.io-client');
    self.socket = io(self.configuration.url);
    self.socket.on('connect', function (result) {
        console.log('connection successful!!');
        console.log('Suscriptor (raditz) connected - Subject: ' + self.configuration.subject);
        console.log('Connected at - ' + new Date());
        self.socket.on('subscriptions.connected', function (actions) {
            if (self.routes == null) {
                self.configuration.actions = actions.availableactions;
                require('../observers/' + self.configuration.actionsfile)(self, self.socket);
                self.trackactions();
                self.routes = { actions: '../observers/' + self.configuration.actionsfile }
            } else { console.log('socket reconnected...'); }
        });
    });
    self.socket.on('connect_timeout', function (data) { 
        console.log('connection timeout!!');
        console.log('Timeout at - ' + new Date());
    });
    self.socket.on('connect_error', function (data) { 
        console.log('connection error!!');
        console.log('Error at - ' + new Date());
    });
}

RaditzSeed.prototype.processrequest = function (request, callback, errorcallback) {
    var self = this;
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'raditz/' + self.configuration.subject,
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

RaditzSeed.prototype.hermesassertion = function (dispatchmessage) {
    var self = this;
    var query = dispatchmessage != null ? { code: dispatchmessage.heventcode } : null;
    query != null ?
        setImmediate(function () {
            self.core.list('Hevents').model.find(query)
                .populate('subscribermessages')
                .exec(function (err, docs) {
                    err != null ? console.error(err) : null;
                    docs != null && docs.length > 0 ?
                        setImmediate(function () {
                            var hev = docs[0];
                            hev.subscribermessages.push(dispatchmessage);
                            hev.readers.push('raditz');
                            hev.state = ['dispatch', dispatchmessage.state].join('.');
                            hev.subscriberids.push({ name: 'raditz/' + self.configuration.subject + '#' + taskresults.action, date: new Date() });
                            hev.save(function (err, doc) {
                                err != null ? console.error(err) : console.log('Raditz Task Tracking saved on Hevent: ' + hev.code);
                            });
                    }) : null;
                });
        }) :
        setImmediate(function () {
            console.error('no dispatched message for this raditz ended task');
        }); 
}

RaditzSeed.prototype.dispatch = function (error, taskresults) {
    var self = this;
    var collectionname = 'SubscriptionMessages';
    var responseData = {
        code: common.utils.getToken(),
        subject: self.configuration.subject,
        action: taskresults.action,
        lasterrordate: (error) ? new Date() : null,
        commitdate: (!error) ? new Date() : null,
        subscribertaskdone: !error,
        state: (error) ? 'error' : 'done',
        subscriberslist: [{ name: 'raditz/' + self.configuration.subject + '#' + taskresults.action }],
        errorslist: [],
        lastresults: [],
        heventcode: taskresults.data.code
    };
    //console.log(taskresults);
    var message = self.core.list(collectionname).model(responseData);
    taskresults.data != null ? message.lastparams = [taskresults.data] : null;

    (error) ? message.errorslist.push(taskresults.result.results) : null;
    (!error) ? message.lastresults.push(taskresults.result.results) : null;
    
    console.log('Save tracking raditz task on mongo...');
    //console.log(message);
    message.save(function (err, doc) {
        err != null ?
            setImmediate(function () {
                console.error('Raditz Task cannot be saved on mongo!');
                console.error(err);
                self.offlinesave(message, function (err, filepath) {
                    err != null ? console.error(err) : console.log('Raditz Task Tracking saved on disk ' + filepath);
                });
        }) : setImmediate(function () {
                console.log('Raditz Task saved on mongo - ' + doc.code);
                self.hermesassertion(message);
        });
    });
}

RaditzSeed.prototype.offlinesave = function (command, callback) {
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
    var foldername = ['raditz', self.configuration.subject, strdate].join('/');
    var fullpath = self.localroutes.baseworks + foldername;
    
    directoryExists(fullpath, 0744, function (err) {
        err != null ? 
        process.nextTick(function () {
            console.log('failed directory creation...' + fullpath);
            callback != null ? callback(err) : null;
        }) 
        : 
        process.nextTick(function () {
            var filename = command._id.toString();
            var filepath = [fullpath, filename].join('/');
            //write the command for possible disk file recovering
            var content = JSON.stringify(command);
            fs.writeFile(filepath, content, function (err) {
                (err != null) ? console.error(err) : console.log('Saved (offline) command for raditz ' + command.id);
                callback != null ? callback(err, filepath) : null;
            });
        });
    });
}

module.exports.RaditzSeed = RaditzSeed;