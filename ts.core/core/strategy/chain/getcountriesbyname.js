module.exports = function (conf, callback) {
    console.log('chain - get destination countries by name');

    var core = conf.core.corebase;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var countrynames = conf.countrynames;
    var query = { $or: [] };

    countrynames == null ? callback(null, conf) : setImmediate(function () {
        _.each(countrynames, function (countryname) {
            var querynameRG = common.utils.mp_conjunctive_regex(countryname);
            query.$or.push({ label_en: querynameRG });
            query.$or.push({ label_es: querynameRG });
        });


        console.log('fetching destination countries... by name: ' + countrynames);
        core.list('DestinationCountries').model.find(query)
            .select('_id label_en label_es slug location.longitude location.latitude')
            .exec(function (err, docs) {
                err != null ? process.nextTick(function () {
                    callback(err, conf);
                }) : process.nextTick(function () {
                    conf.destinationcountries = docs;
                    callback(null, conf);
                });
            });
    });
}