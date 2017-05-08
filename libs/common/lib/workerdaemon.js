//#################### generic daemon process... ############################################
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


console.log('WORKER DAEMON Starting...');

var self = this;
self.coreprocess = null;

process.on('message', function (conf) {
    
    //START TRIGGER... (conf.Start)
    if (conf.start == true) {
        //take the task module and execute it...
        _sch = require(conf.taskpath);
        
        if (conf.createinstance == true) {
            self.coreprocess = new _sch[conf.newinstancename](conf.taskparameters);
            
            process.send({ started: true });
        } else {
            _sch.start(function (result) {
                console.log('process daemon started');
                self.coreprocess = _sch;
                process.send({ started: true });
            });
        }
        
    }
    //specials...
    if (conf.objectrequest == true) { 
        process.send({ id: conf.id, instancedobject: self.coreprocess });
    }
    //Method launcher.. 
    if (self.coreprocess != null) {
        if (conf.method != null && conf.method != '') {
            self.coreprocess[conf.method](conf.request, function (results) {
                var rs = {
                    method: conf.Method, data: results, id: conf.id, Status: 'WORKER.RESPONSE'
                }
                process.send(rs);
                //self.emit(conf.doneeventkey, rs);
            });
        }
    }
});

console.log('WORKER Loaded and running at ' + new Date() + '...');
process.send({ Status: 'WORKER.READY' });