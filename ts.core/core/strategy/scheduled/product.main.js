module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    
    var core = options.core;
    var collection = 'DMCProducts';
    
    var query = options.query || { $and: [{ _id: { $ne: null } }, { code: { $ne: null }}] };
    var populate = [{ path: 'dmc' }];
    
    var months = common.staticdata.months_en;
    var currencys = common.staticdata.currencys;
    var currentcurrency = 'EUR';

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var results = {
        name: 'Update Process for collection ' + collection,
        id: collection + '-' + common.utils.getToken(),
        resultOk: true,
        messages: [],
        errors: [],
        total: 0,
        processed: 0
    };
    
    var idbuffer = [];
    
    cev.on('all.done', function () {
        callback != null ? callback(results) : null;
    });
    cev.on('all.error', function () {
        errorcallback != null ? errorcallback(results) : null;
    });

    core.list(collection).model.find(query)
    .select('_id')
    .exec(function (err, ids) {
        err != null ? cev.emit('update.error', err) : setImmediate(function () {
            idbuffer = _.pluck(ids, '_id');
            results.total = ids.length;
            cev.emit('next');
        });
    });       
}