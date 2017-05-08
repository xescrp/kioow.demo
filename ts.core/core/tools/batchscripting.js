var _ = require('underscore');
var common = require('yourttoo.common');
var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

var ytobase = require('../base');
var core = new ytobase.YourTTOOCore();

cev.on('process.ready', function () {
    var options = {
        core: core,
        updatebatch: {
            collections: ['Affiliate'], // 'UserQueries', 'Affiliate', 'DMCProducts'
            script: null
        }
    }
    var handlers = require('./batchers')(options);
    var async = require('async');
    
    async.waterfall(handlers.updatebatch, function (err, result) {
        err != null ? setImmediate(function () {
            console.error('BATCH PROCESS FINISHED WITH ERROR!!');
            console.error(err);
        }) : setImmediate(function () { 
            console.log('BATCH PROCESS FINISHED OK!!');
            console.log(result);
        });
    }); 
});

core.start(function (readyrs) {
    console.log('Mongo Layer connected to BBDD. Total: ' + readyrs.connectionsOK.length);
    cev.emit('process.ready');
});

