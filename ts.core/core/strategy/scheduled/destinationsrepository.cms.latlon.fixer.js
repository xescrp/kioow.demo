
module.exports = function (options, callback, errorcallback) {
    
    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var CMSCountries = [];

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    
    
    cev.on('country.process', function (original, finded) {
        if (finded != null && original != null) {
            console.log('before...');
            console.log(finded.location);
            finded.location.latitude = (original.location != null && original.location.geo != null) ? original.location.geo[1] : 0;
            finded.location.longitude = (original.location != null && original.location.geo != null) ? original.location.geo[0] : 0;
            console.log('after...');
            console.log(finded.location);
            finded.save(function (err, doc) {
                err != null ? console.log(err): null;
                cev.emit('country.next');
            });
        }
        else { cev.emit('country.next'); }
    });

    cev.on('country.next', function () { 
        console.log('pending: ' + CMSCountries.length);
        if (CMSCountries != null && CMSCountries.length > 0) {
            var country = CMSCountries.shift();
            country = country.toObject();
            console.log(country.slug);
            core.list('DestinationCountries').model.find({ slug: country.slug }).exec(function (err, finded) {
                (err != null) ? cev.emit('country.error', err) : cev.emit('country.finded', country, finded[0]);
            });
        } else { 
            callback({ ResultOK: true, Message: 'Countries Latitude & Longitude fixed' });
        }
    });

    cev.on('country.finded', function (original, finded) {
        //console.log('original ->' + JSON.stringify(original));
        //console.log('finded   ->' + finded);
        console.log('processing ' + original.slug);
        cev.emit('country.process', original, finded);
    });

    cev.on('country.ready', function (countries) {
        //Empty the yto/omt slave collection 
        console.log('finded: ' + countries.length);
        CMSCountries = countries;
        cev.emit('country.next');
    });
    cev.on('country.error', function (err) {
        console.log('Tranfer Countries complete [FAILED]');
        errorcallback(err);
    });
    //first call
    console.log('Start fetching CMS Country Zones...');
    core.list('Countries').model.find({ slug: { $ne: null } }).exec(function (err, countries) {
        (err != null) ? cev.emit('country.error', err) : cev.emit('country.ready', countries);
    });

}