module.exports = function (conf, callback) {
    console.log('chain - get affiliate');

    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var query = conf.affiliatequery;

    query != null ? setImmediate(function () {
        core.list('Affiliate').model.find(query)
        .populate('user')
        .populate('wlcustom')
        .exec(function (err, docs) {
            err != null ? process.nextTick(function () {
                callback(err, conf);
            }) : process.nextTick(function () {
                conf.affiliate = (docs != null && docs.length > 0) ? docs[0] : null;
                callback(null, conf);
            });
        });
    }) : setImmediate(function () {
        callback(null, conf);
    });
}
