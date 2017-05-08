
module.exports = function (options, callback, errorcallback) {
    
    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var YTOZones = [];
    var CMSZones = {};
    var CMSCountries = {};
    var CMSCountriesCodes = {};
    var CMSCities = {};
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var trackerrors = [];
    
    cev.on('countryzones.ready', function (countryzones) { 
        //Empty the yto/omt slave collection
        core.list('DestinationCountriesZones').model.find().remove().exec(function (err, deleteresults) { 
            (err != null) ? cev.emit('countryzones.error', err) : cev.emit('countryzones.empty', countryzones);
        });
    });
    cev.on('countryzones.empty', function (zoneresults) {
        console.log('Tranfering Zones to YTO DB...');
        var czcount = (zoneresults != null) ? zoneresults.length : 0;
        var errorscount = 0;
        _.each(zoneresults, function (zone) {
            var zoneR = zone.toObject();
            zoneR.YTOZONE = null;
            CMSZones[zoneR._id] = zoneR;
            delete zoneR.id;
            delete zoneR._id;
            var zoneYTO = core.list('DestinationCountriesZones').model(zoneR);
            zoneYTO.save(function (err, nzone) {
                err != null ? errorscount++ : zoneR.YTOZONE = nzone.toObject();
                czcount--;
                if (czcount == 0) { 
                    errorscount == 0 ? cev.emit('countryzones.done') : cev.emit('countryzones.error');
                }
            });
        });
    });
    cev.on('countryzones.error', function (err) {
        console.log('Tranfer Zones complete [FAILED]');
        errorcallback(err);
    });
    cev.on('countryzones.done', function () {
        console.log('Tranfer Zones complete [OK]');
        core.list('Countries').model.find({ slug: { $ne: null } }).exec(function (err, countries) {
            (err != null) ? cev.emit('country.error', err) : cev.emit('country.ready', countries);
        });
    });

    cev.on('country.ready', function (countries) {
        //Empty the yto/omt slave collection 
        core.list('DestinationCountries').model.find().remove().exec(function (err, deleteresults) {
            (err != null) ? cev.emit('country.error', err) : cev.emit('country.empty', countries);
        });
    });
    cev.on('country.empty', function (countryresults) {
        console.log('Tranfer Countries to YTO DB...');
        var ccount = (countryresults != null) ? countryresults.length : 0;
        var errorscount = 0;
        _.each(countryresults, function (country) {
            var countryR = country.toObject();
            countryR.YTOCOUNTRY = null;
            CMSCountries[countryR._id] = countryR;
            delete countryR.id;
            delete countryR._id;
            var countryYTO = core.list('DestinationCountries').model(countryR);
            //console.log(countryR.location);
            countryYTO.location.latitude = (countryR.location != null && countryR.location.geo != null) ? countryR.location.geo[1] : 0;
            countryYTO.location.longitude = (countryR.location != null && countryR.location.geo != null) ? countryR.location.geo[0] : 0;
            var relatedZone = CMSZones[countryR.zone];
            countryYTO.zone = (relatedZone != null) ? relatedZone.YTOZONE : null;
            countryYTO.save(function (err, ncountry) {
                err != null ? errorscount++ : countryR.YTOCOUNTRY = ncountry.toObject();
                ncountry != null ? CMSCountriesCodes[ncountry.slug.toUpperCase()] = ncountry.id: null;
                ccount--;
                if (ccount == 0) { 
                    errorscount == 0 ? cev.emit('country.done') : cev.emit('country.error');
                }
            });
        });
    });
    cev.on('country.done', function (countryresults) {
        console.log('Tranfer Countries complete [OK]');
        core.list('Cities').model.find({ slug: { $ne: null } }).exec(function (err, cities) {
            (err != null) ? cev.emit('city.error', err) : cev.emit('city.ready', cities);
        });
    });
    cev.on('country.error', function (err) {
        console.log('Tranfer Countries complete [FAILED]');
        errorcallback(err);
    });
    
    cev.on('city.ready', function (cities) { 
        //Empty the yto/omt slave collection
        core.list('DestinationCities').model.find().remove().exec(function (err, deleteresults) {
            (err != null) ? cev.emit('city.error', err) : cev.emit('city.empty', cities);
        });
    });
    cev.on('city.empty', function (cityresults) {
        console.log('Tranfer Cities to YTO DB...');
        var ccount = (cityresults != null) ? cityresults.length : 0;
        var errorscount = 0;
        _.each(cityresults, function (city) {
            var cityR = city.toObject();
            cityR.YTOCITY = null;
            CMSCities[cityR._id] = cityR;
            delete cityR.id;
            delete cityR._id;
            var cityYTO = core.list('DestinationCities').model(cityR);
            //console.log(cityR);
            cityYTO.location.latitude = (cityR.location != null && cityR.location.geo != null) ? cityR.location.geo[1] : 0;
            cityYTO.location.longitude = (cityR.location != null && cityR.location.geo != null) ? cityR.location.geo[0] : 0;
            var relatedCountry = CMSCountriesCodes[cityR.countrycode];
            cityYTO.country = relatedCountry;
            cityYTO.save(function (err, ncity) {
                err != null ? errorscount++ : cityR.YTOCITY = ncity;
                ccount--;
                if (ccount == 0) {
                    errorscount == 0 ? cev.emit('city.done') : cev.emit('city.error');
                }
            });
        });
    });
    cev.on('city.done', function (cityresults) {
        console.log('Tranfer Cities complete [OK]');
        callback({ ResultOK: true, Message: 'Destinations Master schemas data transfer complete' });
    });
    cev.on('city.error', function (err) {
        console.log('Tranfer Cities complete [FAILED]');
        errorcallback(err);
    });
    
    
    //first call
    console.log('Start fetching CMS Country Zones...');
    core.list('CountriesZones').model.find({ key: { $ne: null } }).exec(function (err, countryzones) {
        (err != null) ? cev.emit('countryzones.error', err) : cev.emit('countryzones.ready', countryzones);
    });

}