module.exports = function (conf, callback) {
    console.log('chain - get a product');

    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var query = conf.productquery;
    console.log('get product..');
    console.log(query);
    query != null ? setImmediate(function () {
        core.list('DMCProducts').model.find(query)
        .populate('dmc')
        .populate('departurecity')
        .populate('stopcities')
        .populate('sleepcity')
        .populate('departurecountry')
        .populate('stopcountry')
        .populate('sleepcountry')
        .exec(function (err, docs) {
            err != null ? process.nextTick(function () {
                callback(err, conf);
            }) : process.nextTick(function () {
                    conf.product = (docs != null && docs.length > 0) ? docs[0] : null;
                    conf.dmcquery = { code: conf.product.dmccode };
                callback(null, conf);
            });
        });
    }) : setImmediate(function () {
        callback(null, conf);
    });
}
