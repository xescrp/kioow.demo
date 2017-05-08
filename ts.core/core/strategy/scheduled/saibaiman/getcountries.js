module.exports = function (conf, callback) {
    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var countryfieldkey = conf.countryfieldkey || 'slug';
    console.log('fetching destination countries... key: ' + countryfieldkey);
    core.list('DestinationCountries').model.find()
    .select('_id label_en label_es slug title_en title_es')
    .exec(function (err, docs) {
        err != null ? process.nextTick(function () {
            callback(err, null);
        }) : process.nextTick(function () {
            conf.destinationcountries = {};
            _.each(docs, function (country) {
                conf.destinationcountries[country[countryfieldkey].toString()] = country;
            });
            callback(null, conf);
        });
    });
}
