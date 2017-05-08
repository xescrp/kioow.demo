var common = require('yourttoo.common');
var mongoclass = require('../classes/mongoiso');

var XMLJSONApi = function (options) {
    this.mongo = null;
    //this.mongocms = null;

    this.corebase = null;
    //this.corebasecms = null;

    this.strategy = require('../strategy')();
    this.configuration = options;

    if (this.configuration == null) {
        this.configuration = {
            forkdblayer: false,
            port: 10000,
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
eventThis.eventtrigger(XMLJSONApi);

XMLJSONApi.prototype.start = function (onready) {
    
    console.log('Load mongo for YTO');
    xmljsonapi.mongo = new mongoclass.MongoIso(xmljsonapi.configuration);
    xmljsonapi.corebase = this.mongo.core;
    xmljsonapi.corebase.on('xmljsonapi.on.ready', function (readystatus) { onready != null? onready(readystatus) : null; });
    console.log('xmljsonapi id for YTO: ' + xmljsonapi.corebase.id);

    xmljsonapi.listen();
}

XMLJSONApi.prototype.setconfiguration = function(options) {
    this.configuration = options;
}

XMLJSONApi.prototype.setconfigurationcms = function (options) {
    this.configuration = options;
}

XMLJSONApi.prototype.listen = function () {
    if (!xmljsonapi.configuration.disconnected) { 
        var remoteThis = common.remoteendpoint;
        remoteThis.RemoteServerEndPoint('xmljsonapi Remote End Point', xmljsonapi.configuration.port, xmljsonapi);
        xmljsonapi.remoteserver.listen();
        xmljsonapi.remoteserver.io.on('connection', function (socket) {
            console.log('new request for xmljsonapi...');
            var router = require('../socketroutes/api.xmljsonapi')(xmljsonapi, socket);
        });
        
        xmljsonapi.remoteserver.io.on('disconnect', function (socket) {
            console.log('a client has disconnected');
        });

        //xmljsonapi.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(xmljsonapi);

    }
    
    xmljsonapi.icplistener.on('command', function (socket) {
        console.log('new request for xmljsonapi...');
        var router = require('../socketroutes/api.xmljsonapi')(xmljsonapi, socket);
    });
}

XMLJSONApi.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'xmljsonapi',
        strategymethod: request.method
    };
    var rq = null;
    if (request.forkprocess) {
       rq = xmljsonapi.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else { 
        rq = xmljsonapi.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

XMLJSONApi.prototype.reboot = function (config) {
    xmljsonapi = module.exports = exports = new XMLJSONApi;
    xmljsonapi.setconfiguration(config);
    xmljsonapi.start();
}


var xmljsonapi = module.exports = exports = new XMLJSONApi;
