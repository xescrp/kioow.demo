var common = require('yourttoo.common');
var _mongo = require('../classes/mongoiso');

var Membership = function () { 
    this.mongo = null;
    this.configuration = {
        dbname: 'mongodb',
        forkdblayer: false,
        port: 6000
    };
    this.strategy = require('../strategy')();
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
eventThis.eventtrigger(Membership);

Membership.prototype.start = function () {
    console.log('Starting membership...');
    membership.mongo = new _mongo.MongoIso(this.configuration);
    
    membership.listen();
    console.log('membership loaded!');
    //membership.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(membership);
}

Membership.prototype.processrequest = function (request, callback, errorcallback) {
    var stargs = {
        args: request.request,
        strategyservice: request.service || 'membership',
        strategymethod: request.method
    };
    var rq = null;
    if (request.forkprocess) {
        rq = membership.strategy.forkstrategy(stargs, callback, errorcallback);
    }
    else {
        rq = membership.strategy.execstrategy(stargs, callback, errorcallback);
    }
    return rq;
}

Membership.prototype.listen = function () {
    var remoteThis = common.remoteendpoint;
    remoteThis.RemoteServerEndPoint('Membership Remote End Point', membership.configuration.port, membership);

    membership.remoteserver.listen();
    membership.remoteserver.io.on('connection', function (socket) {
        console.log('new request for membership...');
        var router = require('../socketroutes/api.membership')(membership, socket);
    });
    
    membership.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });

    membership.icplistener.on('command', function (socket) {
        console.log('new request for membership...');
        console.log(socket);
        var router = require('../socketroutes/api.membership')(membership, socket);
    });
}

var membership = module.exports = exports = new Membership;

