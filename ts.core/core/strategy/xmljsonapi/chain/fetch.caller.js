module.exports = function (conf, callback) {
    var _ = require('underscore');
    setImmediate(function () {
        var find = require('../../core/findone');

        var decoprogram = require('../../../flyweight/xmljsonprogram');
        var decobooking = require('../../../flyweight/xmljsonbooking');

        console.log(conf.findquery);

        conf.findquery != null ?
            setImmediate(function () {
                find(conf.findquery,
                    function (results) { conf.collectionname == 'DMCProducts' ? results = decoprogram(results) : results = decobooking(results); callback(null, results); },
                    function (err) { callback(err, conf); });
            }) : callback(null, conf);
    });
}