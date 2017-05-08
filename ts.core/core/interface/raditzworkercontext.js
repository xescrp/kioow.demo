var common = require('yourttoo.common');
var _ = require('underscore');
var _seed = require('./raditzseed');

var RaditzWorkerContext = function () {
    this.seed = new _seed.RaditzSeed();

    this.ICPWorker = new common.icpworker.ICPWorker();
    
    this.ICPWorker.on('command', function (socket) {
        console.log('command for seed worker...');
        raditzworkercontext.seed.command(socket);
    });
    
    this.ICPWorker.on('configuration', function (conf) {
        raditzworkercontext.seed.configuration = conf;
        console.log('configuration for seed done...');
        raditzworkercontext.ICPWorker.send('WORKER.CONFIGURED', raditzworkercontext.seed.configuration);
        //once is configured, lets start...
        console.log('request connection to hermes...');
        raditzworkercontext.seed.start();
    });

    //ready to start
    setImmediate(function () { raditzworkercontext.ICPWorker.ready(); });

}

var raditzworkercontext = module.exports = exports = new RaditzWorkerContext;