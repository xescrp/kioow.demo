module.exports = function (conf, callback) {
    console.log('chain - get dmc');

    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var query = conf.dmcquery;

    query != null ? setImmediate(function () {
        core.list('DMCs').model.find(query)
        .populate('user')
        .exec(function (err, docs) {
            err != null ? process.nextTick(function () {
                callback(err, conf);
            }) : process.nextTick(function () {
                conf.dmc = (docs != null && docs.length > 0) ? docs[0] : null;
                callback(null, conf);
            });
        });
    }) : setImmediate(function () {
        callback(null, conf);
    });
}
