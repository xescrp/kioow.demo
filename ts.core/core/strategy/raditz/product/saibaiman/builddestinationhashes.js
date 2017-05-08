module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var core = conf.core;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var hashcountries = {};
    var hashcities = {};
    var flags = {
        hashcountries: false,
        hashcities: false,
    };

    cev.on('finish.error', function (err) { 
        callback(err, conf);
    });
    cev.on('finish.done', function () {
        conf.hashcountries = hashcountries;
        conf.hashcities = hashcities;
        callback(null, conf);
    });
    
    cev.on('destinations.ready', function (hashname) {
        flags[hashname] = true;
        (flags.hashcountries == true && flags.hashcities == true) ? 
            cev.emit('finish.done') : null;
    });

    cev.on('country.get', function (countries) {
        _.each(countries, function (country) {
            hashcountries[country.slug] = country;
        });
        cev.emit('destinations.ready', 'hashcountries')
    });
    
    cev.on('city.get', function (cities) {
        var ct = cities.length;
        _.each(cities, function (city) {
            hashcities[city.slug] = city;
        });
        cev.emit('destinations.ready', 'hashcities')
    });
    

    //find all countries
    core.list('DestinationCountries').model.find().exec(function (err, countries) {
        (err != null) ? cev.emit('finish.error', err) : cev.emit('country.get', countries);
    });
    //find all cities
    core.list('DestinationCities').model.find().exec(function (err, cities) {
        (err != null) ? cev.emit('finish.error', err) : cev.emit('city.get', cities);
    });
}