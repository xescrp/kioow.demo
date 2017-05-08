
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


var forkprocess = module.exports.forkprocess = function(conf, callback) {
    var workerHub = require('child_process');
    var worker = null;
    //a task generated
    var atask = {
        id: conf.taskid,
        name: conf.taskname
    };
    events.EventEmitter.call(atask);
    atask.super_ = events.EventEmitter;
    atask.prototype = Object.create(events.EventEmitter.prototype, {
        constructor: {
            value: atask,
            enumerable: false
        }
    });
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