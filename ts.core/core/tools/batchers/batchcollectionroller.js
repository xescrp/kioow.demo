module.exports = function (options, callback) {
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var results = {
        start: new Date(),
        finish: null,
        results: []
    };
    var core = options.core;
    var collections = (options.updatebatch != null && options.updatebatch.collections != null) ? 
        options.updatebatch.collections : [];
    
    var scriptfile = (options.updatebatch != null && options.updatebatch.script != null)? 
        options.updatebatch.script : 'genericupdateprocess';

    cev.on('batch.done', function () {
        options.results = results;
        options.results.finish = new Date();
        callback(null, options);
    });
    cev.on('batch.error', function (err) { 
        callback(err, options);
    });

    cev.on('process.collection', function (collectionname) {
        var updater = require('./' + scriptfile);
        var setup = require('./batchcollectionsetup')(collectionname);
        updater({
            core: core, 
            collectionname: collectionname, 
            query: setup.query, 
            fields: setup.fields, 
            populate: setup.populate,
            max: setup.max
        }, 
           function (result) {
            results.results.push(result);
            cev.emit('next');
        }, function (err) {
            cev.emit('batch.error', err);
        });
    });

    cev.on('next', function () { 
        collections.length > 0 ? cev.emit('process.collection', collections.shift()) : cev.emit('batch.done');
    });

    cev.emit('next'); //start process..
}