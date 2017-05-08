
//#################### generic task launcher... ############################################
//function forprocess(conf): 
//    conf = {
//             taskid: [String] # an unique identifier for your subprocess, 
//             name: [String] # a name for your subprocess,
//             taskpath: [String] # full path or relative to the file or script to execute,
//             request: [Object] # an object for passing the parameters to your subprocess or script
//           }
// returns : task object -> events: 
//                              TASK.STARTED : event triggered when your subprocess start
//                              TASK.FINISHED : event triggered when your subprocess ends -> returns an [Object] or the result

var events = require('events');

var workerspath = require('path').dirname(module.filename);
var utils = require('./utils');
var hash = require('./hashtable');
workerspath = utils.replaceAll(workerspath, '\\', '/') + '/';

//launch a subprocess
var events = require('events');
var createdelegatehandler = exports.createdelegatehandler = function (name) {
    var _help = require('./forkcomm');
    var subprocess = new _help.SubProcess({
        id: name
    });
    return subprocess;
}


var delegate = exports.delegate = function (scriptfile, request, callback, errorcallback) {
    
    var id = 'carrier.' + new Date();
    var workerHub = require('child_process');
    var worker = null;
    
    var eventcarrier = function (id, worker) {
        this.name = 'Helper to send events...';
        this.created = new Date();
        this.id = id || 'carrier.' + this.created.toISOString();
        this.worker = worker;
        this.end = function () {
            this.worker.kill('SIGINT');
        }
        return this;
    };
    eventcarrier.super_ = events.EventEmitter;
    eventcarrier.prototype = Object.create(events.EventEmitter.prototype, {
        constructor: {
            value: eventcarrier,
            enumerable: false
        }
    });
    worker = workerHub.fork(scriptfile);
    
    worker.on('message', function (message) {
        if (message != null && message.hasOwnProperty('$interprocess')) {
            switch (message.$interprocess) {
                case 'SUBPROCESS.READY':
                    worker.send(request);
                    break;
                case 'SUBPROCESS.RESPONSE':
                    if (callback) {
                        callback(message.result);
                    }
                    carrier.emit('subprocess.response', message.result);
                    break;
                case 'SUBPROCESS.ERROR':
                    if (errorcallback) {
                        errorcallback(message.error);
                    }
                    carrier.emit('subprocess.error', message.error);
                    break;
            }
        }
    });
    
    var carrier = new eventcarrier(id, worker);
    
    return carrier;

}




//FOR ICPWorker Communication...
var forkworker = module.exports.forkworker = function (conf, callback) { 
    var workerHub = require('child_process');
    var worker = null;

    var _atask = function (config) {
        this.id = config.taskid;
        this.name = config.taskname;
        this.sendconfiguration = function (options) {
            worker.send({ icpconfigmessage : options });
        }
        this.command = function (options) { 
            worker.send(options);
        }
        this.end = function () { 
            worker.kill('SIGINT');
        }
    };
    _atask.super_ = events.EventEmitter;
    _atask.prototype = Object.create(events.EventEmitter.prototype, {
        constructor: {
            value: _atask,
            enumerable: false
        }
    });
    var atask = new _atask(conf);
    var worker = workerHub.fork(conf.taskpath);

    worker.on('message', function (message) {
        if (message.hasOwnProperty('$interprocess')){
            //control message...
            console.log(message);
            var emitevent = message.key;
            var data = message.data;
            atask.emit(emitevent, data);
        }
                
    });
    worker.on('exit', function (code) {
        console.log('worker process exited with exit code ' + code);
        atask.emit('WORKER.EXIT');
    });
    worker.on('close', function (code) {
        console.log('worker process exited with code ' + code);
        atask.emit('WORKER.CLOSE');
    });
    return atask;

}

var forkprocess = module.exports.forkprocess = function(conf, callback) {
    var workerHub = require('child_process');
    
    //a task generated
    var _atask = function(conf){
        this.id = conf.taskid;
        this.name = conf.taskname;
        events.EventEmitter.call(this);
    };
    _atask.super_ = events.EventEmitter;
    _atask.prototype = Object.create(events.EventEmitter.prototype, {
        constructor: {
            value: _atask,
            enumerable: false
        }
    });
    //ne instance...
    var atask = new _atask;
    //start thread...
    var worker = workerHub.fork(conf.taskpath);
    worker.on('message', function (result) {
        console.log(result);
        if (result.Status == 'WORKER.READY') {
            worker.send(conf.request);
            atask.emit('TASK.STARTED', null);
        }
        if (result.Status == 'WORKER.FINISHED') {
            atask.emit('TASK.FINISHED', result.Data);
            if (callback) { 
                callback(result.Data);
            }
        }
                    
    });
    worker.on('exit', function (code) {
        console.log('worker process exited with exit code ' + code);
    });
    worker.on('close', function (code) {
        console.log('worker process exited with code ' + code);
    });
    
    return atask;
}

var processtransfer = function (options) {
    this.parameters = options;
    events.EventEmitter.call(this);
}
processtransfer.super_ = events.EventEmitter;
processtransfer.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: processtransfer,
        enumerable: false
    }
});
//subprocess helper..
var subprocess = module.exports.subprocess = function (conf) {
    this.taskpath = conf.taskpath;
    this.id = conf.taskid;
    this.name = conf.taskname;
    this.ready = false;
    this.running = true;
    
    events.EventEmitter.call(this);

    var workerHub = require('child_process');
    this.worker = null;
    this.worker = workerHub.fork(workerspath + 'worker');
    //the public object...
    var self = this;

    worker.on('message', function (result) {
        if (result.Status == 'WORKER.READY') {
            self.ready = true;
            worker.send({ Start: true, TaskPath: self.taskpath });
        }
        if (result.Status == 'WORKER.FINISHED') {
            self.emit('TASK.FINISHED', result.Data);
            self.ready = false;
        }            
    });

    worker.on('exit', function (code) {
        console.log('worker process exited with exit code ' + code);
        self.ready = false;
        self.running = false;
        self.emit('exit');
    });
    worker.on('close', function (code) {
        console.log('worker process exited with code ' + code);
        self.ready = false;
        self.running = false;
        self.emit('close');
    });

    return self;
}
subprocess.super_ = events.EventEmitter;
subprocess.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: subprocess,
        enumerable: false
    }
});

subprocess.prototype.exec = function (options, callback) { 
    var rqt = new processtransfer(options);
    this.worker.send(rqt);
    return rqr;
}

var daemon = module.exports.daemon = function (conf) { 
    this.taskpath = conf.taskpath;
    this.id = conf.taskid;
    this.name = conf.taskname;
    this.ready = false;
    this.running = true;

    events.EventEmitter.call(this);
    var workerHub = require('child_process');
    this.worker = null;
    this.worker = workerHub.fork(workerspath + 'workerdaemon');

    //the public object...
    var self = this;
    
    self.worker.on('message', function (result) {
        if (result.Status == 'WORKER.READY') {
            self.ready = true;
            self.worker.send({
                start: conf.start, 
                taskpath: self.taskpath, 
                createinstance: conf.createinstance, 
                taskparameters: conf.taskparameters,
                newinstancename: conf.newinstancename
            });
        }
        if (result.Status == 'WORKER.FINISHED') {
            self.emit('TASK.FINISHED', result.Data);
            self.ready = false;
        }
        if (result.Status == 'WORKER.RESPONSE') { 
            self.emit(result.id, result);
        }
    });
    
    self.worker.on('exit', function (code) {
        console.log('worker process exited with exit code ' + code);
        self.ready = false;
        self.running = false;
        self.emit('exit');
    });
    
    self.worker.on('close', function (code) {
        console.log('worker process exited with code ' + code);
        self.ready = false;
        self.running = false;
        self.emit('close');
    });
    
    self.exec = function (request, callback) {
        var id = utils.getToken();
        console.log(id);
        request.id = id;
        self.on(id, function (result) {
            callback(result);
        });
        self.worker.send(request);
        return id;  
    }
    
    self.do = function (request, callback) {
        var id = utils.getToken();
        console.log(id);
        request.id = id;

        self.on(id, function (result) {
            callback(result);
        });

        self.worker.send(request);
        return id;
    }

    return self;
};

daemon.super_ = events.EventEmitter;
daemon.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: daemon,
        enumerable: false
    }
});


var daemonspawn = module.exports.daemonspawn = function (options) {
    this.wp = null;
    this.descriptor = options.descriptor;
    this.name = options.name;
    this.id = options.id;
    this.busy = false;
    this.running = false;
    this.statics = {
        process: options.name,
        recycles: 0,
        errorcount: 0,
        reboots: 0,
        pid: '',
        started: new Date(),
        missing: 0,
        pids : new hash.HashTable(),
        lock: false
    };

    this.currentpid = null;
    this.lastpid = null;
    this.recycleinterval = null;
    this.piperequest = function (request) {
        var icp = require('./icp');

        var icpserver = new icp.ICPserver(this.wp);
        icpserver.send('command', request, request.socket);
    }
    this.pipesocket = function (socket, request) { 
        var icp = require('./icp');
        
        var icpserver = new icp.ICPserver(this.wp);
        icpserver.pipesocket(socket, request);
    }
    this.start = function () {
        if (!self.running) {
            self.triggerProcess(self.descriptor);
        }
    }
    this.triggerProcess = function(conf) {
        
        //* A simple log formatter....
        var rnStream = function () {
            this.readable = true;
            this.writable = true;
        };
        require("util").inherits(rnStream, require("stream"));
        rnStream.prototype._transform = function (data) {
            
            var formatNumber = function (num, length) {
                var r = "" + num;
                while (r.length < length) {
                    r = "0" + r;
                }
                return r;
            }
            var formatDate = function () {
                var d = new Date();
                var tm = formatNumber(d.getDate(), 2) + '/' + formatNumber(d.getMonth(), 2) + '/' + formatNumber(d.getFullYear(), 2) + 
                    ' - ' + formatNumber(d.getHours(), 2) + ':' + formatNumber(d.getMinutes(), 2) + ':' + formatNumber(d.getSeconds(), 2);
                
                return tm;
            }
            
            data = data ? data.toString() : "";
            this.emit("data", '[' + formatDate() + '] ' + data + '\r\n');
        };
        rnStream.prototype.write = function () {
            this._transform.apply(this, arguments);
        };
        rnStream.prototype.end = function () {
            this._transform.apply(this, arguments);
            this.emit("end");
        };
        //**Log formatter is defined... 

        var spawn = require('child_process').spawn;
        var fs = require('fs');
        //output descriptors
        var todayD = new Date();
        var sufix = todayD.getDate() + '_' + todayD.getMonth() + '_' + todayD.getFullYear() + '.log';
        var out = fs.createWriteStream(conf.outputFile + sufix, { flags: 'a' });
        var err = fs.createWriteStream(conf.errorFile + sufix, { flags: 'a' });
        var rnOut = new rnStream();
        var rnErr = new rnStream();
        
        
        console.log(conf.name + ' - Started!');
        
        var workerProcess = spawn('node', conf.args, {
            cwd: conf.cwd,
            stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
            env: process.env
        });
        //Pipe the output from the processes... [OUT & ERROR]
        workerProcess.stdout.pipe(rnOut).pipe(out);
        workerProcess.stderr.pipe(rnErr).pipe(err);
        self.wp = workerProcess;
        this.emit('process.started', self);
    }
    var self = this;
    
    self.on('process.started', function (thisisme) { 
        //self.wp = worker;
        self.running = true;
        //set recicle period...
        if (self.descriptor.interval > 0) {
            clearInterval(self.recycleinterval);
            self.recycleinterval = setInterval(function () {
                self.wp.kill('SIGINT');
                console.log('Recycle signal send to process...');
                self.statics.recycles++;
            }, self.descriptor.interval);
        }
        
        //on close process.. start the same process..
        self.wp.on('close', function (code, signal) {
            console.log(new Date());
            console.log(self.name + ' terminated due to receipt of signal ' + signal + ' - [RECYCLE]');
            console.log('pid: ' + self.wp.pid + ' exited with code ' + code);
            
            if (self.statics.pids.hasItem(self.wp.pid)) {
                var pd = self.statics.pids.get(self.wp.pid);
                pd.killed = true;
                self.statics.pids.remove(self.wp.pid);
                self.statics.pids.set(self.wp.pid, pd);
            } else {
                self.statics.pids.set(self.wp.pid, { pid: self.wp.pid, killed: true });
            }
            self.statics.reboots++;
            self.running = false;
            self.wp = null;
            setTimeout(function () {
                //wait for restart the process...
                self.triggerProcess(self.descriptor);
            }, 5000);
            self.emit('close', self);            
        });
    });

    return self;
};

daemonspawn.super_ = events.EventEmitter;
daemonspawn.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: daemonspawn,
        enumerable: false
    }
});



var forkpool = module.exports.forkpool = function (asyncCalls, onCompleteCallback) {
    var counter = asyncCalls.length;
    var poolhash = new hash.HashTable();
    var _ = require('underscore');
    console.log('Task Pool initialized');
    _.each(asyncCalls, function (asyncCall) {
        console.log('Launching method ');
        console.log(asyncCall.key);
        poolhash.set(asyncCall.key, { finished: false });
        console.log('launch method in pool -> ' + asyncCall.key);
        asyncCall.method(asyncCall.args, function (result) {
            console.log('method in pool finished -> ' + asyncCall.key);
            poolhash.set(asyncCall.key, result);
            counter--;
            console.log('pending tasks ' + counter + '/' + asyncCalls.length);
            if (counter == 0) {
                onCompleteCallback(poolhash);
            }
        })
    })

}
