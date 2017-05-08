module.exports = function (conf, callback) {
    var _ = require('underscore');
    conf.gotresultsbyname == false ?
        setImmediate(function () {
            var find = require('../../core/find');

        conf.findquery != null ?
            setImmediate(function () {
            find(conf.findquery,
                function (results) { callback(null, results); },
                function (err) { callback(err, conf); }); }) : callback(null, conf);
        }) :
        setImmediate(function () {
            conf.results = conf.results != null && conf.results.length > 0 ? _.map(conf.results, function (item) { item = item.toObject(); delete item['_id']; return item; }) : null;
            callback(null, conf.results);
        });
}