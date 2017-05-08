
var ExceptionHandler = function (server) {
    this.server = server;
    var self = this;
    console.log('Setting the exception controler...');
    
    process.on('uncaughtException', function (err) { 
        var _m_err = err || 'Unhandled exception on process';
        console.log('An uncaught exception happened on process...');
        //console.log(self.server);
        console.log(_m_err.toString());
        console.log('disconnect everyone...');
        if (self.server.remoteserver != null && self.server.remoteserver.io != null) { 
            self.server.remoteserver.io.emit('uncaughtException', _m_err.toString());
        }
        //kill the process... for avoid memory leaks...
        setTimeout(function () {
            console.log('killing process...');
            process.exit(1);
        }, 5000);
    });
}

var SocketExceptionHandler = function (options) {
    this.socket = options.socket;
    this.errorevent = options.erroreventkey;

    console.log('Setting the exception controler for socket...ERROR KEY: ' + options.erroreventkey);
    
    process.on('uncaughtException', function (err) {
        var _m_err = err || 'Unhandled exception on process';
        console.log('An uncaught exception happened on process...');
        //console.log(self.server);
        console.log(_m_err.toString());
        console.log('disconnect everyone...');
        if (options.socket != null) {
            options.socket.emit(options.erroreventkey, _m_err.toString());
        }
        //kill the process... for avoid memory leaks...
        setTimeout(function () {
            console.log('killing process...');
            process.exit(1);
        }, 2000);
    });
}

module.exports.ExceptionHandler = ExceptionHandler;
module.exports.SocketExceptionHandler = SocketExceptionHandler;