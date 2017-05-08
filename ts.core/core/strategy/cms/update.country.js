module.exports = function (options, callback, errorcallback) {
    console.log('Update Destination country subscriber worker started - ' + new Date());
    var core = options.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var country = options.country;
    
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    cev.on('scheduler.trigger', function (result) { 
        var mmed = require('../../mediator/scheduler.mediator');
        var mediator = new mmed.SchedulerMediator();

        var command = 'schedule';
        var data = {
            interval: 500,
            eventKeys: ['DESTINATIONS.FILES']
        };

        mediator.send(command, data, function (rs) {
            console.log('Scheduled received');
            console.log(rs);
        });

        console.log('destinations files work scheduled after cms update at ' + new Date());
        cev.emit('all.done', result);
    });

    cev.on('country.saved', function (savedcountry) {
        console.log('destination country ' + savedcountry.label_en + ' - ' + savedcountry.slug + ' updated');
        cev.emit('scheduler.trigger', {
            ResultOK: true, Message: 'destination country ' + savedcountry.label_en + ' - ' + savedcountry.slug + ' updated'
        });
    });
    
    cev.on('zone.update', function (zone, findedcountry) {
        console.log('relation zone and country' + zone.slug + ' - ' + findedcountry.slug);
        findedcountry.zone = zone;
        findedcountry.save(function (err, doc) {
            err != null ? cev.emit('all.error', err) : cev.emit('country.saved', doc);
        });
    });
    
    cev.on('zone.notfound', function (findedcountry) {
        console.log('zone not found with id' + country.zone);
        cev.emit('country.saved', findedcountry);
    });

    cev.on('zone.found', function (cmszone, findedcountry) {
        console.log('found zone for country');
        var cmsct = cmszone.toObject();
        console.log('zone ' + cmsct.slug);
        core.list('DestinationCountriesZones').model.find({ slug : cmsct.slug })
        .exec(function (err, dszones) {
            err != null ? cev.emit('all.error', err) : null;
            (dszones != null && dszones.length > 0) ? cev.emit('zone.update', dszones[0], findedcountry) 
            : 
            cev.emit('zone.notfound', findedcountry);
        });
    });

    cev.on('country.zone', function (findedcountry) {
        console.log('binding zone to country ' + findedcountry.slug);
        core.list('CountriesZones').model.find({ _id : country.zone })
        .exec(function (err, zones) {
            err != null ? cev.emit('all.error', err) : null;
            (zones != null && zones.length > 0) ? 
            cev.emit('zone.found', zones[0], findedcountry) : 
            cev.emit('zone.notfound', findedcountry);
        });
    });
     
    cev.on('country.process', function (findedcountry) {
        console.log('lets process country ' + findedcountry.slug);
        findedcountry.label_es = country.label_es;
        findedcountry.label_en = country.label_en;
        findedcountry.slug = country.slug;
        findedcountry.key_es = country.key_es;
        findedcountry.key_en = country.key_en;
        findedcountry.title_es = country.title_es;
        findedcountry.title_en = country.title_en;
        findedcountry.countrycode = country.countrycode;
        findedcountry.mainImage = country.mainImage;
        findedcountry.captionImage = country.captionImage;
        findedcountry.description_es = country.description_es;
        findedcountry.description_en = country.description_en;
        findedcountry.state = country.state;
        findedcountry.averageEuro = country.averageEuro;
        findedcountry.publishedDate = country.publishedDate;
        findedcountry.titleSEO_es = country.titleSEO_es;
        findedcountry.metaDescription_es = country.metaDescription_es;
        findedcountry.descriptionGooglePlus_es = country.descriptionGooglePlus_es;
        findedcountry.descriptionFacebook_en = country.descriptionFacebook_en;
        findedcountry.imageFacebook = country.imageFacebook;
        findedcountry.location.latitude = (country.location != null && country.location.geo != null) ? country.location.geo[1] : 0;
        findedcountry.location.longitude = (country.location != null && country.location.geo != null) ? country.location.geo[0] : 0;
        findedcountry.save(function (err, doc) {
            err != null ? cev.emit('all.error', err) : cev.emit('country.zone', doc);
        });
    })
    
    cev.on('countries.found', function (countries) {
        countries.length > 0 ? cev.emit('country.process', countries[0]) : cev.emit('all.error', 'No countries found');
    });
    
    cev.on('create.country', function () {
        var createdcountry = core.list('DestinationCountries').model({ slug: country.slug });
        cev.emit('country.process', createdcountry)
    });

    cev.on('all.error', function (err) {
        errorcallback(err);
    });
    
    cev.on('all.done', function (result) {
        callback(result);
    });
    
    core.list('DestinationCountries').model.find({ slug : country.slug })
    .exec(function (err, countries) {
        err != null ? cev.emit('all.error', err) : null;
        countries != null && countries.length > 0 ? 
            cev.emit('countries.found', countries) 
            : 
            cev.emit('create.country');
    });
}
