

var Server = require('socket.io');
var RemoteServerEndPoint = function (name, port, remotethis) {
    
    this.io = null;
    this.socketport = null;
    this.name = '';
    if (port != null && port > 0) {
        this.socketport = port;
        remotethis.remoteserver = this;
    } else { 
        console.log('End point disabled. No port number specified');
    }

    remotethis.remoteserver.listen = function () {
        remotethis.remoteserver.io = Server.listen(this.socketport);
        console.log(remotethis.remoteserver.name + ' listening on port: ' + remotethis.remoteserver.socketport);
    }
}



module.exports.RemoteServerEndPoint = RemoteServerEndPoint;