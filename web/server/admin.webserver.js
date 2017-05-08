
//WEB SERVER Version 0.0.0 --- Clustering process

//Ready to create the worker process pool
var appPool = require('cluster');
//configure worker process for core
var workerCount = 1;

//Start the Pool
if (appPool.isMaster) {
    //configure and start the required worker process
    if (workerCount <= 0) {
        workerCount = require('os').cpus().length;
    }
    for (var i = 0; i < workerCount; i += 1) {
        appPool.fork();
    }
} else {
    var webapp = require('./admin.webapp');
    webapp.httplisten();
}

var dying = false;

appPool.on('exit', function (worker) {
    
    // Replace the dead worker,
    // we're not sentimental ... ;)
    if (dying == false) {
        console.log('Worker ' + worker.id + ' died :(');
        appPool.fork();
    }

});



process.on('SIGINT', function () {
    console.log('Got SIGINT.  Process exiting...');
    //redefine handlers...
    dying = true;
    appPool.on('exit', function () {
        console.log('Nothing to do. We are exiting process...');
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






