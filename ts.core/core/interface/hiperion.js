var common = require('yourttoo.common');
var _ = require('underscore');
var routes = require('../local.routes');

var Hiperion = function () {
    console.log('new instance of hiperion server...');
    this.configuration = {
        omt: {
            dbname: 'mongodb',
            forkdblayer: false,
        },
        cms: {
            dbname: 'cmsdb',
            forkdblayer: false,
        },
        subjects: ['product', 'affiliate', 'user', 'chat', 'booking', 'tailormade.queries', 'tailormade.quotes', 'cms'],
        //subjects: ['cms'],
        subscriberspath: routes.paths.core + 'observers/workers',
        urlhermes: 'http://localhost:7000',
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
eventThis.eventtrigger(Hiperion);

Hiperion.prototype.start = function () {
    var remoteThis = common.remoteendpoint;
    remoteThis.RemoteServerEndPoint('Hiperion Server Remote End Point', hiperion.configuration.port, hiperion);
    //main end point handler
    hiperion.remoteserver.listen();

    hiperion.remoteserver.io.on('connection', function (socket) {
        var router = require('../socketroutes/hiperion.triggers')(hiperion, socket);
    });
    
    hiperion.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
    //core started...
    hiperion.core.start();
    //suscriptors handler...
    hiperion.loadsubscriptions();
    //hiperion.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(hiperion);
}

Hiperion.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'hiperion',
        strategymethod: request.method
    };
    if (request.forkprocess) {
        return hiperion.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        return hiperion.strategy.execstrategy(stargs, callback, errorcallback);
    }
}

Hiperion.prototype.loadsubscriptions = function () {
    var themes = hiperion.configuration.subjects;
    var _susc = require('./subscriber');
    var ct = themes.length;
    _.each(themes, function (subject) {
        var config = {
            url: hiperion.configuration.urlhermes + '/' + subject,
            subscriberspath: hiperion.configuration.subscriberspath,
            core: hiperion.core,
            subject: subject
        };
        var subscriber = new _susc.Subscriber(config);
        setTimeout(function () {
            subscriber.start();
            hiperion.subscribers.set(subject, subscriber);
            console.log('loaded [' + subject + '] subscriber...');
        }, ct * 500);
        ct--;
    });
}

var hiperion = module.exports = exports = new Hiperion;