

var Server = require('socket.io');
var RemoteServerEndPoint = function (name, port, remotethis) {
    var remote = function(name, port){
        this.io = null;
        this.socketport = port;
        this.name = '';
        this.listen = function () {
            remotethis.remoteserver.io = Server.listen(this.socketport);
            console.log(name + ' listening on port: ' + remotethis.remoteserver.socketport);
        }
    }
    
    if (port != null && port > 0) {
        remotethis.remoteserver = new remote(name, port);
    } else { 
        console.log('End point disabled. No port number specified');
    }
}

var RemoteServerSSLEndPoint = function (name, port, remotethis, sslconf) {
    var remote = function (name, port, ssl) {
        this.io = null;
        this.socketport = port;
        this.name = '';
        var fs = require('fs');
        this.ssloptions = {
            key: fs.readFileSync(ssl.keyfile),
            cert: fs.readFileSync(ssl.certfile)
        };
        this.https = require('https');
        this.app = this.https.createServer(this.ssloptions);;
        this.listen = function () {
            remotethis.remoteserver.io = Server.listen(this.app);
            this.app.listen(this.socketport, "0.0.0.0");
            console.log(name + ' listening(ssl) on port: ' + remotethis.remoteserver.socketport);
        }
    }
    if (port != null && port > 0) {
        remotethis.remoteserver = new remote(name, port, sslconf);
    } else {
        console.log('End point disabled. No port number specified');
    }
}

module.exports.RemoteServerEndPoint = RemoteServerEndPoint;
module.exports.RemoteServerSSLEndPoint = RemoteServerSSLEndPoint;