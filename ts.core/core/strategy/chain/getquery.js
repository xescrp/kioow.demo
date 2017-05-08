module.exports = function (conf, callback) {
    console.log('chain - get a query for booking');

    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var query = conf.userqueryquery;
    console.log('get query..');
    console.log(query);
    query != null ? setImmediate(function () {
        core.list('UserQueries').model.find(query)
        .exec(function (err, docs) {
            err != null ? process.nextTick(function () {
                callback(err, conf);
            }) : process.nextTick(function () {
                    var uquery = docs[0];
                    core.list('UserQueries').model.populate(uquery, [
                        { path: 'affiliate' }, { path: 'dmc' },
                        { path: 'quotes', populate: [{ path: 'products', model: 'DMCProducts' }] },
                        { path: 'selectedquote', populate: [{ path: 'products', model: 'DMCProducts' }] },
                        { path: 'dmcs' }, { path: 'traveler' },
                        { path: 'booking' }], function (err, popdoc) {
                            err != null ?
                                setImmediate(function () {
                                    console.error('Error populating userquery...');
                                    callback(err, conf);
                                })
                                :
                                setImmediate(function () {
                                    uquery = popdoc;
                                    conf.userquery = uquery;
                                    callback(null, conf);
                                });
                        });                    
            });
        });
    }) : setImmediate(function () {
        callback(null, conf);
    });
}

