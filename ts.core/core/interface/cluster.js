var common = require('yourttoo.common');
var _ = require('underscore');
var fs = require('fs');

var cluster = function (options) { 
    this.configuration = options;
    this.currentprocesseskeys = [];
    this.currentprocesses = new common.hashtable.HashTable();
    for (var i = 0, len = options.processes.length; i < len; i++) {
        var process = options.processes[i];
        //configure the process running 
        var conf = {
            id: common.utils.getToken(),
            name: process.name,
            descriptor: process
        };

        var daemon = new common.threading.daemonspawn(conf);
        this.currentprocesses.set(daemon.name, daemon);
        this.currentprocesseskeys.push(daemon.name);
    }
    var _bal = require('./balancer');
    this.balancer = new _bal.Balancer({
        name: this.configuration.name + '.balancer',
        mode: this.configuration.balancestrategy, 
        services: this.currentprocesseskeys
    });
}

var eventThis = common.eventtrigger;
eventThis.eventtrigger(cluster);

cluster.prototype.start = function () { 
    _.each(this.currentprocesses.values(), function (daemon) {
        daemon.start();
        var cnow = new Date();
        daemon.on('process.started', function (dmon) { 
            console.log('Process ' + dmon.name + ' started at ' + cnow);
        });
        daemon.on('close', function (dmon) { 
            console.log('Process ' + dmon.name + ' exit at ' + cnow);
        });
    });
}

cluster.prototype.sendrequest = function (request) {
    var _cluster_process = (function (request, selfcluster) { 
        //promisse schema...
        return function (request, selfcluster) { 
            var RQtoken = common.utils.getToken();
            console.log('command.token: ' + RQtoken);
            
            var clusteredRQ = common.eventtrigger.eventcarrier(RQtoken);
            clusteredRQ.command = request.command;
            var dkey = selfcluster.balancer.getservice();
            console.log('balanced key: ' + dkey);
            var daemon = selfcluster.currentprocesses.get(dkey);
            request.url = [daemon.descriptor.url.host, daemon.descriptor.url.port].join(':');
            console.log('send to ' + request.url);
            console.log('command: ' + request.command);
            
            if (selfcluster.configuration.comm == 'socket') {
                //do connection..
                request.authnovalidate = true;
                var cnx = require('yourttoo.connector');
                var rqcn = cnx.connector;
                var rqcommand = rqcn.send(request);
                //response from request..
                rqcommand.on(request.request.oncompleteeventkey, function (results) {
                    console.log('command [ok]: ' + request.command);
                    console.log('command [ok].token: ' + RQtoken);
                    //check compression...
                    var rtData = request.socket.iscompressed ? cnx.lzip.compress(JSON.stringify(results)) : results; 
                    request.socket.emit(request.request.oncompleteeventkey, rtData);
                    clusteredRQ.emit('cluster.request.done', results);
                });
                
                rqcommand.on(request.request.onerroreventkey, function (err) {
                    console.log('command [nook]: ' + request.command);
                    console.log('command [nook].token: ' + RQtoken);
                    console.log('command [nook].error: ' + err);
                    request.socket.emit(request.request.onerroreventkey, err);
                    clusteredRQ.emit('cluster.request.error', err);
                });
                
                rqcommand.on('error', function (errdata) {
                    console.log('command [nook]: ' + request.command);
                    console.log('command [nook].token: ' + RQtoken);
                    console.log('cluster error detected on request: ');
                    console.log(rqcommand);
                    console.log(errdata);
                    request.socket.emit(request.request.onerroreventkey, errdata);
                    clusteredRQ.emit('cluster.request.error', errdata);
                });
                rqcommand.on('timeout', function (toutdata) {
                    console.log('command [nook]: ' + request.command);
                    console.log('command [nook].token: ' + RQtoken);
                    console.log('cluster timeout detected on request: ');
                    console.log(rqcommand);
                    console.log(toutdata);
                    request.socket.emit(request.request.onerroreventkey, toutdata);
                    clusteredRQ.emit('cluster.request.error', toutdata);
                });
            } else {
                //daemon.piperequest(request);
                daemon.pipesocket(request.socket, { command: request.command, request: request.request });
            }
            
            return clusteredRQ;
        }
    })(request, this);
    //self invoke...
    return _cluster_process(request, this);
}

cluster.prototype.testbalancer = function () {
    var dkey = this.balancer.getservice();
    var daemon = this.currentprocesses.get(dkey);
    return daemon;
}

cluster.prototype.reboot = function (callback) {
    var rt = 3000;
    var rs = [];
    var ct = this.currentprocesses.values().length;
    _.each(this.currentprocesses.values(), function (daemon) {
        setTimeout(function () {
            daemon.wp.kill('SIGINT');
            rs.push({
                process: daemon.descriptor,
                statics: daemon.statics
            });
            ct--;
            ct == 0 ? callback(rs) : null;
        }, rt);
        rt += 2000;
    });
}
module.exports.cluster = cluster;