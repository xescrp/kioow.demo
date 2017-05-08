//  {}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}
//  {}                                                                {} 
//  {}      THE ARCHITECT OPEN MARKET TRAVEL - 2015 Version 4.2.1    {}
//  {}                 A process to rule them all                     {}
//  {}                                                                {} 
//  {}               Check /appConfiguration dir                      {} 
//  {}               set your local configuration                     {}
//  {}                                                                {}
//  {}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}

//configure path variables...
var toolsPath = 'C:/development/node/yourttoo/core/yourttoo.thearchitect/tools/';
var configPath = 'C:/development/node/yourttoo/core/yourttoo.core/configurations/';

//initialization...
var io = null;
var Server = require('socket.io');
var events = require('events');
var hash = require('yourttoo.common').hashtable;
var _ = require('underscore');
var flags = {
    killAll : false,
};

//TOKEN Auto Builder
function _buildTOKEN() {
    var d = new Date().getTime();
    var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    
    return token;
}

//The constructor...
var TheArchitect = function () {
    events.EventEmitter.call(this);
    this.clients = new hash.HashTable();
    this.currentprocesses = new hash.HashTable();
    this.watchers = new hash.HashTable();
    this.configuration = require(configPath + 'thearchitect.config').processes;
    thearchitect = this;
}

TheArchitect.super_ = events.EventEmitter;

TheArchitect.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: TheArchitect,
        enumerable: false
    }
});

TheArchitect.prototype.suscribeEvents = function () {
    thearchitect.on('addfilewatcher', function (watch) {
        if (watch != null) {
            
            //wathc the error file Log...
            setTimeout(function () {
                var fs = require('fs');
                console.log('watching file : ' + watch.name + ' [' + watch.errorFile + ']');
                fs.watch(watch.errorFile, function (event, filename) {
                    if (event == 'change') {
                        console.log('error en ' + watch.name);
                        
                        var st = thearchitect.currentprocesses.get(watch.name);
                        st.errorcount++;
                        thearchitect.currentprocesses.remove(watch.name);
                        thearchitect.currentprocesses.set(watch.name, st);
                    }
                });
                thearchitect.watchers.set(watch.name, watch);
            }, 2000);
        }
    });
}

TheArchitect.prototype.startListener = function (port) {
    
    thearchitect = this;
    if (port == null || port == 0) {
        port = 3552;
    }
    
    this.io = Server.listen(port);
    this.name = 'thearchitect::' + _buildTOKEN();
    
    console.log('thearchitect engine listening on port: ' + port);
    console.log(this.name + ' thearchitect Engine configured and running....[' + new Date() + ']');
    thearchitect.io.on('connection', function (socket) {
        
        console.log('new connection arrived...');
        var token = _buildTOKEN();
        thearchitect.clients.set(socket.id, {
            token: token,
            socket: socket,
            dateStartConnection: new Date(),
            dateLastConnection: new Date(),
            whoami: null
        });
        
        require('./socketroutes/thearchitect.api')(thearchitect, socket);
       
    });
    
    thearchitect.io.on('disconnect', function () {
        console.log('disconnection...');
    });
}

TheArchitect.prototype.startProcesses = function () {
    if (thearchitect.configuration != null && thearchitect.configuration.length > 0) {
        console.log('Launch processes...');
        _.each(thearchitect.configuration, function (conf) {
            var statics = {
                process: conf.name,
                recycles: 0,
                errorcount: 0,
                reboots: 0,
                pid: '',
                started: new Date(),
                missing: 0,
                pids : new hash.HashTable(),
                lock: false
            };
            //add to processes list...
            thearchitect.currentprocesses.set(conf.name, statics);
            
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
            
            
            //run the process...
            var spawn = require('child_process').spawn;
            try {
                var workerProcess = null;
                
                function triggerProcess() {
                    var fs = require('fs');
                    //output descriptors
                    var todayD = new Date();
                    var sufix = todayD.getDate() + '_' + todayD.getMonth() + '_' + todayD.getFullYear() + '.log';
                    var out = fs.createWriteStream(conf.outputFile + sufix, { flags: 'a' });
                    var err = fs.createWriteStream(conf.errorFile + sufix, { flags: 'a' });
                    var rnOut = new rnStream();
                    var rnErr = new rnStream();
                    
                    console.log(conf.name + ' - Started!');
                    
                    workerProcess = spawn('node', conf.args, {
                        cwd: conf.cwd,
                        //stdio: ['ignore', out, err],
                        env: process.env
                    });
                    //Pipe the output from the processes... [OUT & ERROR]
                    workerProcess.stdout.pipe(rnOut).pipe(out);
                    workerProcess.stderr.pipe(rnErr).pipe(err);
                    //emit event.. filewatcher
                    if (!thearchitect.watchers.hasItem(conf.name)) {
                        thearchitect.emit('addfilewatcher', {
                            name: conf.name,
                            errorFile: conf.errorFile + sufix
                        });
                    }
                    
                    //update pid
                    var stP = thearchitect.currentprocesses.get(conf.name);
                    //push to the pids...
                    stP.pid = workerProcess.pid;
                    
                    stP.started = new Date();
                    thearchitect.currentprocesses.remove(conf.name);
                    thearchitect.currentprocesses.set(conf.name, stP);
                    
                    //on close process.. start the same process..
                    workerProcess.on('close', function (code, signal) {
                        console.log(new Date());
                        console.log(conf.name + ' terminated due to receipt of signal ' + signal + ' - [RECYCLE]');
                        console.log('pid: ' + workerProcess.pid + ' exited with code ' + code);
                        var st = thearchitect.currentprocesses.get(conf.name);
                        if (st.pids.hasItem(workerProcess.pid)) {
                            var pd = st.pids.get(workerProcess.pid);
                            pd.killed = true;
                            st.pids.remove(workerProcess.pid);
                            st.pids.set(workerProcess.pid, pd);
                        } else {
                            stP.pids.set(workerProcess.pid, { pid: workerProcess.pid, killed: true });
                        }
                        st.reboots++;
                        thearchitect.currentprocesses.remove(conf.name);
                        thearchitect.currentprocesses.set(conf.name, st);
                        console.log(st);
                        workerProcess = null;
                        setTimeout(function () {
                            //wait for restart the process...
                            triggerProcess();
                        }, 5000);
                        
                    });
                }
                
                triggerProcess();
                
                //set recycle time...
                if (conf.interval > 0) {
                    var interval = setInterval(function () {
                        workerProcess.kill('SIGINT');
                        console.log('Recycle signal send to process...');
                        var st = thearchitect.currentprocesses.get(conf.name);
                        st.recycles++;
                        thearchitect.currentprocesses.remove(conf.name);
                        thearchitect.currentprocesses.set(conf.name, st);
                        console.log(st);
                    }, conf.interval);
                }
                
                thearchitect.on('restart.process', function (item) {
                    if (item != null) {
                        if (item.name == conf.name) {
                            if (workerProcess != null) {
                                workerProcess.kill('SIGINT');
                            }
                            workerProcess = null;
                            setTimeout(function () {
                                //wait for restart the process...
                                triggerProcess();
                            }, 5000);
                        }
                    }
                });
                
            }
            catch (exc) {
                console.log(exc);
            }
            
        });
    }
}

TheArchitect.prototype.startMonitoring = function () {
    //set alive check time...
    var aliveInterval = setInterval(function () {
        
        
        require(toolsPath + 'processes').getProcessList({ processname: 'node' }, function (list) {
            
            var k = thearchitect.currentprocesses.keys();
            _.each(k, function (key) {
                var st = thearchitect.currentprocesses.get(key);
                var process = _.filter(list, function (pr) {
                    return pr.PID == st.pid.toString();
                });
                
                if (process != null && process.length > 0) {
                            //everything is ok with the process...
                } else {
                    console.log('Process for ' + st.name + ' not found! Trigger a new process!');
                    st.missing++;
                    thearchitect.currentprocesses.remove(st.name);
                    thearchitect.currentprocesses.set(st.name, st);
                    thearchitect.emit('restart.process', {
                        name: st.name
                    });
                    //triggerProcess();
                }
                
                //check orphaned process...
                //get orphans..
                if (st.pids != null) {
                    _.each(list, function (pr) {
                        var orph = _.filter(st.pids.values(), function (cf) {
                            return cf.pid.toString() == pr;
                        });
                        //si ha processos huerfanos...
                        if (orph != null && orph.length > 0) {
                            console.log('Procesos huerfanos... eliminar');
                            console.log(orph);
                            _each(orph, function (orp) {
                                require(toolsPath + 'processes').killProcess(orp.pid, function () {
                                    console.log('Orphan process ' + orp.pid + ' killed!');
                                });
                            });
                        }
                    });
                }

                //
               
            });
        });
    }, 60000);
}

var thearchitect = null;
thearchitect = module.exports = exports = new TheArchitect();
//Start the server...
thearchitect.suscribeEvents();
thearchitect.startListener();
thearchitect.startProcesses();
thearchitect.startMonitoring();

