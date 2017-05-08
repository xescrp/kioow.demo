var common = require('yourttoo.common');
var mongoclass = require('../classes/mongoiso');

var Memento = function (options) {
    this.mongo = null;
    
    this.corebase = null;
    
    this.strategy = require('../strategy')();
    this.configuration = options;
    
    if (this.configuration == null) {
        this.configuration = {
            forkdblayer: false,
            port: 5000
        };
    }
    this.icplistener = new common.icp.ICPlistener([{
            messagekey: 'command', 
            commandpropertyname: 'command', 
            oncompletepropertyname: 'oncompleteeventkey', 
            onerrorpropertyname: 'onerroreventkey'
        }]);
    this.errorhandler = { notassigned: true };
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(Memento);

Memento.prototype.start = function () {

    console.log('Load mongo for Operations-YTO');
    this.mongo = new mongoclass.MongoIso(this.configuration);
    memento.corebase = this.mongo.core;
    memento.listen();
    //memento.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(memento);
}

Memento.prototype.listen = function () {
    var remoteThis = common.remoteendpoint;
    remoteThis.RemoteServerEndPoint('Memento Remote End Point', memento.configuration.port, memento);
    memento.remoteserver.listen();
    memento.remoteserver.io.on('connection', function (socket) {
        console.log('request for memento...');
        var router = require('../socketroutes/api.memento')(memento, socket);
    });
    
    memento.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
    
    memento.icplistener.on('command', function (socket) {
        console.log('request for memento...');
        var router = require('../socketroutes/api.memento')(memento, socket);
    });
}

Memento.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'memento',
        strategymethod: request.method
    };
    if (request.forkprocess) {
        return memento.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        return memento.strategy.execstrategy(stargs, callback, errorcallback);
    }

}

var memento = module.exports = exports = new Memento;