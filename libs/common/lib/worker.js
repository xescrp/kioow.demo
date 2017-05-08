//**************** OPEN MARKET TRAVEL WORKER IMPLEMENTATION STARTER ******************//
console.log('WORKER Starting...');
//Start a core instance...
//this is the container for the process code...
var _sch = null; 
//Comunication with parent process
process.on('message', function (conf) {
    
    //START TRIGGER... (conf.Start)
    if (conf.Start == true) {
        //take the task module and execute it...
        _sch = require(conf.TaskPath);
        _sch.start(function (result) {
            
            process.send({
                Status: 'WORKER.FINISHED',
                Data: result
            });
            
            setTimeout(function () {
                process.exit(0);
            }, 5000);

        });
    }

    if (_sch != null) {
        if (conf.Method != null && conf.Method != '') {
            _sch[conf.Method](conf.request, function (results) {
                var rs = {
                    method: conf.Method, data: results, id: conf.id
                }
                process.send({ method: conf.Method, data: results, id: conf.id });
                conf.emit(conf.doneeventkey, rs);
            });
        }
    }
});

console.log('WORKER Loaded and running at ' + new Date() + '...');
process.send({ Status: 'WORKER.READY' });
