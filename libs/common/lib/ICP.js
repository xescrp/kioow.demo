var _ = require('underscore');
var hash = require('./hashtable');
var eventtriger = require('./eventtrigger');

var ICPlistener = function (listeningEvents) {

    this.keys = new hash.HashTable();
    this.messages = [];
    var self = this;

    _.each(listeningEvents, function (listener) {
        self.keys.set(listener.messagekey, listener);
        self.messages.push(listener.messagekey);             
    });
    //listen ICP messages...
    process.on('message', function (request) {
        if (request != null) {
            var ls = self.keys.get(self.keys.keys()[0]);
            //handle command...
            var c_id = require('./utils').getToken();
            var carrier = eventtriger.eventcarrier(c_id);
            
            var commandpropertyname = ls.commandpropertyname;
            var oncompletepropertyname = ls.oncompletepropertyname;
            var onerrorpropertyname = ls.onerrorpropertyname;
            //event keys
            var emiteventkey = request[commandpropertyname];
            var listeneventkey = request.request[oncompletepropertyname];
            var errorneventkey = request.request[onerrorpropertyname];
            //unhandled exceptions...
            carrier.uncaughtexceptionhandler = function (err) {
                console.log('An error on process...');
                console.log('ICP response ' + errorneventkey + ' to parent process...');
                if (request.socket != null) {
                    request.socket.emit(errorneventkey, err);
                } else {
                    console.log('process pipe send...');
                    process.send({ results: err, icp_id: request.icp_id, ok: false });
                }
                process.removeListener('uncaughtException', carrier.uncaughtexceptionhandler);
                //wait for secure delivering and bubble the error...
                setTimeout(function () {
                    throw new Error(err);
                }, 2000);
            }

            //bubble event...
            self.emit(self.keys.keys()[0], carrier);
            carrier.on(listeneventkey, function (results) {
                console.log('ICP response ' + listeneventkey + ' to parent process...');
                if (request.socket != null) {
                    request.socket.emit(listeneventkey, results);
                } else {
                    console.log('process pipe send [OK]...' + request.icp_id);
                    process.send({ results: results, icp_id: request.icp_id, ok: true });
                }
            });
            carrier.on(errorneventkey, function (results) {
                console.log('ICP response ' + errorneventkey + ' to parent process...');
                if (request.socket != null) {
                    request.socket.emit(errorneventkey, results);
                } else {
                    console.log('process send [ERROR]...' + request.icp_id);
                    process.send({ results: results, icp_id: request.icp_id, ok: false });
                }
            });
            //catch a global error...
            process.on('uncaughtException', carrier.uncaughtexceptionhandler);
            //deliver command... 
            carrier.emit(emiteventkey, request.request);
            
        }
    });
}

eventtriger.eventtrigger(ICPlistener);

var ICPserver = function (worker) {
    this.worker = worker;
    this.sockets = new hash.HashTable();

    this.worker.on('message', function (rs) {
        console.log('ICP child response...' + rs.icp_id);
        
        var crq = self.sockets.get(rs.icp_id);
        if (crq != null) {
            var rsp = rs.results;
            var evOK = crq.request.request.oncompleteeventkey || crq.request.command + '.done';
            var evKO = crq.request.request.onerroreventkey || crq.request.command + '.error';
            if (rs.ok) {
                console.log('response is ok -> send: ' + evOK);
                crq.socket.emit(evOK, rsp);
            } else {
                console.log('response is nok -> send: ' + evKO);
                crq.socket.emit(evKO, rsp);
            }
            setTimeout(function () {
                console.log('remove socket handler...' + crq.icp_id);
                self.sockets.remove(crq.icp_id);
            }, 3000);
            
        } else { 
            console.log('ICP Server can not find ' + rs.icp_id + ' request handler, sure it was handled previously...');
        }
    });

    var self = this;
    return self;
}
eventtriger.eventtrigger(ICPserver);

ICPserver.prototype.send = function (socket, request) {
    this.pipesocket(socket, request);
}

ICPserver.prototype.pipesocket = function (socket, request) {
    var id = require('./utils').getToken();
    request.icp_id = id;
    this.sockets.set(request.icp_id, { icp_id: id, request: request, socket: socket });
    this.worker.send(request);
    console.log('ICP request piped...' + id);
}

module.exports.ICPlistener = ICPlistener;
module.exports.ICPserver = ICPserver;