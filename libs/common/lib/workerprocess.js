//WORKER PROCESS SERVER Version 3.1.1 --- Clustering process
module.exports = function (server) {
    //Ready to create the worker process pool
    console.log('Initializing process cluster...');
    var appPool = require('cluster');
    var workerCount = 1;
    //configure worker count
    if (server.config.workers > 0) { 
        workerCount = server.config.workers;
    }
    //Start the Pool
    if (appPool.isMaster) {
        //configure and start the required worker process
        if (workerCount <= 0) {
            workerCount = require('os').cpus().length;
        }
        for (var i = 0; i < workerCount; i += 1) {
            appPool.fork();
        }
    }
    else {
        //all the servers has to implement the start() method...
        server.start();
        console.log(server.config.name + ' worker process started');
    }
    

    var dying = false;
    
    appPool.on('exit', function (worker) {
        
        // Replace the dead worker,
        // we're not sentimental ... ;)
        if (dying == false) {
            console.log('Worker ' + worker.id + '|| Process: ' + server.config.name  + ' died :(');
            var worker = appPool.fork();
            console.log(worker.id);
        }

    });
    
    process.on('SIGINT', function () {
        console.log('Got SIGINT.  Process exiting...');
        //redefine handlers...
        dying = true;
        appPool.on('exit', function () {
            console.log('Nothing to do. We are exiting process...' + server.config.name);
        });
        //kill childs...
        for (var id in appPool.workers) {
            try {
                appPool.workers[id].kill('SIGINT');
            }
        catch (err) {
                console.log(err);
            }
        }
        process.exit(0);
    });


}
