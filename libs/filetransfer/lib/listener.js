var _ = require('underscore');
var fs = require('fs');
var common = require('yourttoo.common');


var Listener = function () { 
    this.id = common.utils.getToken();
}

var eventThis = common.eventtrigger;
eventThis.eventtrigger(Listener);

Listener.prototype.listen = function () {

    var remoteThis = require('yourttoo.common').remoteendpoint;
    remoteThis.RemoteServerEndPoint('File Server Remote End Point', 1010, listener);

    listener.remoteserver.listen();
    console.log('file server listening on :1010');

    listener.remoteserver.io.on('connection', function (socket) {
        socket.on('file.send', function (fileconfig) {
            console.log('file received...');
            console.log(fileconfig);
            var filepath = fileconfig.filetarget;
            var buffer = new Buffer(fileconfig.buffer);
            var ackevent = fileconfig.acknowledgetoken;
            var dirpath = require('path').dirname(filepath);
            common.utils.directoryExists(dirpath, 0777, function (err) {
                err != null ? 
                setImmediate(function () { 
                    var rs = {
                        ResultOK : (err == null),
                        Message: (err != null) ? err : 'file saved properly on ' + filepath
                    };
                    
                    socket.emit(ackevent, rs);
                    setTimeout(function () {
                        socket.disconnect();
                    }, 3000);
                }) : 
                setImmediate(function () { 
                    fs.writeFile(filepath, buffer, function (errfile) {
                        var rs = {
                            ResultOK : (errfile == null),
                            Message: (errfile != null) ? errfile : 'file saved properly on ' + filepath
                        };
                        
                        socket.emit(ackevent, rs);
                        setTimeout(function () {
                            socket.disconnect();
                        }, 3000);
                    });
                });
            })
            
        });
    });

    listener.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    }); 
}




var listener = module.exports = exports = new Listener;