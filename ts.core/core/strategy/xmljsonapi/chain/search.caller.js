module.exports = function (conf, callback) {
    var _ = require('underscore');
    conf.searchfilter != null ?
        setImmediate(function () {
            var search = require('../../core/searchxml');
            search(conf.searchfilter,
                function (results) { callback(null, results.pager); },
                function (err) { callback(err, conf); });
        }) :
        setImmediate(function () {
            callback({ error: 'No search criteria found. please review your request' }, conf);
        });
}