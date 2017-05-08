var common = require('yourttoo.common');
var mongoclass = require('../classes/mongoiso');

var Core = function (options) {
    this.mongo = null;
    //this.mongocms = null;

    this.corebase = null;
    //this.corebasecms = null;

    this.strategy = require('../strategy')();
    this.configuration = options;

    if (this.configuration == null) {
        this.configuration = {
            forkdblayer: false,
            port: 4000,
            disconnected: false
        }
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
eventThis.eventtrigger(Core);

Core.prototype.start = function (onready) {
    
    console.log('Load mongo for YTO');
    core.mongo = new mongoclass.MongoIso(core.configuration);
    core.corebase = this.mongo.core;
    core.corebase.on('core.on.ready', function (readystatus) { onready != null? onready(readystatus) : null; });
    console.log('core id for YTO: ' + core.corebase.id);

    core.listen();
}

Core.prototype.setconfiguration = function(options) {
    this.configuration = options;
}

Core.prototype.setconfigurationcms = function (options) {
    this.configuration = options;
}

Core.prototype.listen = function () {
    if (!core.configuration.disconnected) { 
        var remoteThis = common.remoteendpoint;
        remoteThis.RemoteServerEndPoint('Core Remote End Point', core.configuration.port, core);
        core.remoteserver.listen();
        core.remoteserver.io.on('connection', function (socket) {
            console.log('new request for core...');
            var router = require('../socketroutes/api.core')(core, socket);
        });
        
        core.remoteserver.io.on('disconnect', function (socket) {
            console.log('a client has disconnected');
        });

        //core.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(core);

    }
    
    core.icplistener.on('command', function (socket) {
        console.log('new request for core...');
        var router = require('../socketroutes/api.core')(core, socket);
    });
}

Core.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'core',
        strategymethod: request.method
    };
    var rq = null;
    if (request.forkprocess) {
       rq = core.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else { 
        rq = core.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

Core.prototype.reboot = function (config) {
    core = module.exports = exports = new Core;
    core.setconfiguration(config);
    core.start();
}


var core = module.exports = exports = new Core;
