var common = require('yourttoo.common');
var _ = require('underscore');
var Hermes = function () {
    console.log('new instance of hermes server...');
    this.configuration = {
        port: 7000
    }
    this.strategy = require('../strategy')();
    this.core = require('./core');
    this.core.configuration.disconnected = true;
    this.suscriptions = new common.hashtable.HashTable();
    this.errorhandler = { notassigned: true };
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(Hermes);

Hermes.prototype.start = function () {
    var remoteThis = common.remoteendpoint;
    remoteThis.RemoteServerEndPoint('hermes Server Remote End Point', hermes.configuration.port, hermes);
    //main end point handler
    hermes.remoteserver.listen();
    hermes.remoteserver.io.on('connection', function (socket) { 
        var router = require('../socketroutes/hermes.triggers')(hermes, socket);
    });

    hermes.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
    //suscriptors handler...
    hermes.loadsuscriptions();
    //core start...
    hermes.core.start();
    //hermes.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(hermes);
}

Hermes.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'hermes',
        strategymethod: request.method
    };
    if (request.forkprocess) {
        return hermes.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        return hermes.strategy.execstrategy(stargs, callback, errorcallback);
    }
}

Hermes.prototype.loadsuscriptions = function () {
    var themes = common.staticdata.hermessuscriptions;

    _.each(themes, function (suscription) {
        var ss = hermes.remoteserver.io.of('/' + suscription.subject)
        .on('connection', function (socket) {
            //send all the available actions for the theme..
            socket.emit('subscriptions.connected', { availableactions: suscription.actions });
            console.log('new subscriber connected for [' + suscription.subject + '] at ' + new Date());
        });
        //save suscriber listener...
        hermes.suscriptions.set(suscription.subject, ss);
        console.log(suscription.subject + ' listening for subscribers..http://localhost:' + 
            hermes.configuration.port + '/' + suscription.subject);
    });
}

Hermes.prototype.broadcastsubscribers = function (options) {
    var subject = options.subject;
    var action = options.action;
    var data = options.data;

    //get subscriber theme listener...
    var sender = hermes.suscriptions.get(subject);
    //broadcast the message..
    if (sender != null) { 
        console.log('Broadcasting [' + action + '] for [' + subject + ']');
        sender.emit(action, data);
    }
}


var hermes = module.exports = exports = new Hermes;

