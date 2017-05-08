module.exports = function (conf, callback) {
    console.log('chain - get destination cities by name');

    var core = conf.core.corebase;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var citiesnames = conf.citynames;
    var query = { $or: [] };

    citiesnames == null ? callback(null, conf) : setImmediate(function () {
        _.each(citiesnames, function (cityname) {
            var querynameRG = common.utils.mp_conjunctive_regex(cityname);
            query.$or.push({ label_en: querynameRG });
            query.$or.push({ label_es: querynameRG });
        });


        console.log('fetching destination cities... by name: ' + citiesnames);
        core.list('DestinationCities').model.find(query)
            .select('_id label_en label_es slug countrycode location.longitude location.latitude')
            .exec(function (err, docs) {
                err != null ? process.nextTick(function () {
                    callback(err, conf);
                }) : process.nextTick(function () {
                    conf.destinationcities = docs;
                    callback(null, conf);
                });
            });
    });
}