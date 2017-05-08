
var formatNumber = function (num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}
var formatDate = function () {
    var d = new Date();
    var tm = formatNumber(d.getDate(), 2) + '/' + 
                    formatNumber(d.getMonth(), 2) + '/' + 
                    formatNumber(d.getFullYear(), 2) + ' - ' + 
                    formatNumber(d.getHours(), 2) + ':' + 
                    formatNumber(d.getMinutes(), 2) + ':' + 
                    formatNumber(d.getSeconds(), 2);
    
    return tm;
}

//get ready output pipe
var DateFormatStream = function () {
    this.readable = true;
    this.writable = true;
};



require("util").inherits(DateFormatStream, require("stream"));
DateFormatStream.prototype._transform = function (data) {

    data = data ? data.toString() : "";
    this.emit('data.arrived', data);
    this.emit("data", '[' + formatDate() + '] ' + data + '\r\n');
};
DateFormatStream.prototype.write = function () {
    this._transform.apply(this, arguments);
};
DateFormatStream.prototype.end = function () {
    this._transform.apply(this, arguments);
    this.emit("end");
};

module.exports.DateFormatStream = DateFormatStream;

var HookProcessStreamLogger = function (logname) {
    var hook_writestream = function (stream, callback) { 
        var old_write = stream.write;
        
        stream.write = (function (write) {
            return function (string, encoding, fd) {
                write.apply(stream, arguments);
                callback(string, encoding, fd);
            };
        })(stream.write);
        
        return function () {
            stream.write = old_write;
        };
    }
    
    var workspath = process.env.TS_BASEWORKSPATH.toLowerCase();
    var tracelogspath = workspath + '/logs/trace/';
    var errorlogspath = workspath + '/logs/error/';

    var fs = require('fs');
    var todayD = new Date();
    var fsufix = [formatNumber(todayD.getDate(), 2), formatNumber(todayD.getMonth(), 2), todayD.getFullYear()].join('-');
    var sufix = [fsufix, 'log'].join('.');
    var outFile = [logname, 'log', sufix].join('.');
    var errFile = [logname, 'error', sufix].join('.');
    var out = fs.createWriteStream(tracelogspath + outFile, { flags: 'a' });
    var err = fs.createWriteStream(errorlogspath + sufix, { flags: 'a' });

    //Pipe the output from the processes... [OUT & ERROR]
    hook_writestream(process.stdout, function (string, encoding, fd) {
        var outstr = '[' + formatDate() + '] ' + string + '\r\n';
        out.write(outstr, encoding || 'utf8');
    });
    hook_writestream(process.stderr, function (string, encoding, fd) {
        var errstr = '[' + formatDate() + '] ' + string + '\r\n';
        err.write(errstr, encoding || 'utf8');
    });
}

module.exports.HookProcessStreamLogger = HookProcessStreamLogger;