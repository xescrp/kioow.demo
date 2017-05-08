module.exports = function (conf, callback) {
    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var sorting = { sortOrder: 1 };
    console.log('fetching countryzones from cms');
    var errors = [];
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    cev.on('last.step', function () { 
        errors.length > 0 ? callback(errors.join('\n'), conf) : callback(null, conf);
    });

    core.list('DestinationCountriesZones').model.find()
    .sort(sorting)
    .exec(function (err, zones) {
        err != null ? process.nextTick(function () {
            callback(err, null);
        }) : process.nextTick(function () {
            conf.countryzones = [];
            var count = zones.length;
            _.each(zones, function (zone) {
                var czone = {
                    zone: zone,
                    countries: []
                };
                
                core.list('DestinationCountries').model.find({ zone: zone._id, state: 'published' })
                .exec(function (err, docs) { 
                    err != null ? process.nextTick(function () {
                        errors.push(err);
                        count--;
                        count == 0 ? cev.emit('last.step') : null;
                    }) : process.nextTick(function () {
                        czone.countries = docs;
                        conf.countryzones.push(czone);
                        count--;
                        count == 0 ? cev.emit('last.step') : null;
                    });
                })

                
            });
            //callback(null, conf);
        });
    });
}
