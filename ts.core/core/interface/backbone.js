
var common = require('yourttoo.common');
var _ = require('underscore');
var fs = require('fs');
var cl = require('./cluster');
var _authm = require('../mediator/auth.mediator');
var _hrmed = require('../mediator/hermes.mediator');
var BackBone = function () {
    this.configuration = require('../configurations/backbone.config').configuration;
    this.clusters = new common.hashtable.HashTable();
    this.strategy = require('../strategy')();
    this.tracking = { date: new Date() };
    this.authhandler = new _authm.AuthMediator();
    this.hermeshandler = new _hrmed.HermesMediator();
}

var eventThis = common.eventtrigger;
eventThis.eventtrigger(BackBone);

BackBone.prototype.track = function (rq, data, eventname) {
    var track = null;
    
    if (!this.tracking.hasOwnProperty(rq.id)) {
        this.tracking[rq.id] = {
            id: rq.id,
            command: rq.command,
            date: new Date(),
            start: null,
            done: null,
            errors: null
        };
    }
    track = this.tracking[rq.id];
    track[eventname] = new Date();
    this.tracking[rq.id] = track;
    var self = this;
    eventname == 'errors' ? setImmediate(function () { 
        var action = 'trace';
        var hresult = self.tracking[rq.id];
        hresult.errors = data;
        var subject = 'backbone';
        console.log('notify hermes subject: ' + subject);
        var commandkey = 'notify.suscribers';
        var hrq = {
            subject: subject,
            action: action,
            data: hresult,
            oncompleteeventkey: 'notify.suscribers.done',
            onerroreventkey: 'notify.suscribers.error'
        };
        
        self.hermeshandler.send(commandkey, hrq, function (result) {
            console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
            console.log('Hermes errors report for rq ' + rq.id);
        });

    }) : null;
}

BackBone.prototype.setconfiguration = function (config) { 
    this.configuration = config;
}

BackBone.prototype.start = function (callback) {
    this.clusters = new common.hashtable.HashTable();
    this.authhandler.start();
    _.each(this.configuration.clusters, function (cluster) {
        var dcluster = new cl.cluster(cluster);
        backbone.clusters.set(dcluster.configuration.name, dcluster);
        dcluster.start();
    });
    backbone.listen();
}

BackBone.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'backbone',
        strategymethod: request.method
    };
    if (request.forkprocess) {
        return backbone.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        return backbone.strategy.execstrategy(stargs, callback, errorcallback);
    }
}

BackBone.prototype.listen = function () {
    
    var remoteThis = require('yourttoo.common').remoteendpoint;
    if (backbone.configuration.ssl.enabled) {
        remoteThis.RemoteServerSSLEndPoint('Backbone SSL Server Remote End Point', 
            backbone.configuration.port, 
            backbone, backbone.configuration.ssl);
    }
    else { 
        remoteThis.RemoteServerEndPoint('Backbone Server Remote End Point', backbone.configuration.port, backbone);
    }
    

    backbone.remoteserver.listen();
    //compression module
    var uzipMW = require('../middleware/socket.compression')();
    backbone.remoteserver.io.use(uzipMW);
    //authentication module...
    var authMW = require('../middleware/socket.auth')(backbone.authhandler);
    backbone.remoteserver.io.use(authMW);

    //handle connections...
    backbone.remoteserver.io.on('connection', function (socket) { 
        var router = require('../socketroutes/backbone.router')(backbone, socket);
    });
    backbone.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
}

var backbone = module.exports = exports = new BackBone;

