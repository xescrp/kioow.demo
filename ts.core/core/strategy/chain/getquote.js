module.exports = function (conf, callback) {
    console.log('chain - get a quote for booking');

    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var query = conf.quotequery;
    console.log('get quote..');
    console.log(query);
    query != null ? setImmediate(function () {
        core.list('Quotes').model.find(query)
        .exec(function (err, docs) {
            err != null ? process.nextTick(function () {
                callback(err, conf);
            }) : process.nextTick(function () {
                    var quote = docs[0];
                    core.list('Quotes').model.populate(quote, [
                        { path: 'affiliate' }, { path: 'dmc' },
                        { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] },
                        { path: 'dmc' }, { path: 'traveler' },
                        { path: 'booking' }], function (err, popdoc) {
                            err != null ?
                                setImmediate(function () {
                                    console.error('Error populating quote...');
                                    callback(err, conf);
                                })
                                :
                                setImmediate(function () {
                                    quote = popdoc;
                                    conf.quote = quote;
                                    callback(null, conf);
                                });
                        });                    
            });
        });
    }) : setImmediate(function () {
        callback(null, conf);
    });
}

