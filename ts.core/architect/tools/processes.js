var _ = require('underscore');

var getProcessList = exports.getProcessList = function (filter, callback) {
    var win = require('node-windows');
    
    win.list(function (prc) {
        var processes = [];
        if (prc) {
            prc.forEach(function (item) {
                var process = {
                    ImageName: '',
                    PID: '',
                    SessionName: '',
                    SessionNumber: '',
                    MemUsage: '',
                    Status: '',
                    UserName: '',
                    CPUTime: '',
                    WindowTitle: ''
                }
                var i = 0;
                var fields = ['ImageName', 'PID', 'SessionName', 
                                  'SessionNumber', 'MemUsage', 'Status', 
                                  'UserName', 'CPUTime', 'WindowTitle'];
                
                for (var prop in item) {
                    process[fields[i]] = item[prop];
                    i++;
                }
                
                if (filter != null && filter.processname != '') {
                    if ((process.ImageName.toLowerCase().indexOf(filter.processname.toLowerCase()) > -1) || 
                        (process.WindowTitle.toLowerCase().indexOf(filter.processname.toLowerCase()) > -1)) {
                        processes.push(process);
                    }
                } else {
                    processes.push(process);
                }

            });
        }
        callback(processes);
    }, true);
}


var killProcess = exports.killProcess = function (pid, callback) {
    
    var fs = require('fs');
    var spawn = require('child_process').spawn;
    var out = fs.createWriteStream('c:/openmarket/logs/kill.log', { flags: 'a' });
    var err = fs.createWriteStream('c:/openmarket/logs/kill.err.log', { flags: 'a' });
    var pr = spawn('taskkill', ['/F', '/T', '/PID', pid], { env: process.env });
    
    pr.stdout.pipe(out);
    pr.stderr.pipe(err);
    
    pr.on('exit', function () {
        callback();
    });
}

var killEmAll = exports.killEmAll = function (pidexception, callback) {
    getProcessList({ processname: 'node' }, function (list) {
        if (list != null && list.length > 0) {
            var count = list.length;
            var killed = 0;
            _.each(list, function (nodeproc) {
                if (nodeproc.PID != pidexception.toString()) {
                    killProcess(nodeproc.PID, function () {
                        count--;
                        killed++;
                        if (count == 0) {
                            callback(killed);
                        }
                    });
                } else {
                    count--;
                    if (count == 0) {
                        callback(killed);
                    }
                }
            });
        } else {
            callback(0);
        }
    });
}


