module.exports = function (options, callback) { 
    console.log('Update Destination city subscriber worker started - ' + new Date());
    var core = options.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var city = options.data;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    cev.on('scheduler.trigger', function (result) {
        options.scheduletasks = ['DESTINATIONS.FILES'];
        console.log('destinations files work scheduled after cms update at ' + new Date());
        cev.emit('all.done', result);
    });

    cev.on('city.saved', function (savedcity) {
        console.log('destination city ' + savedcity.label_en + ' - ' + savedcity.slug + ' updated');
        cev.emit('scheduler.trigger', {
            ResultOK: true, Message: 'destination city ' + savedcity.label_en + ' - ' + savedcity.slug + ' updated'
        });
    });
    
    cev.on('country.update', function (country, findedcity) {
        console.log('relation city and country' + country.slug + ' - ' + findedcity.slug);
        findedcity.country = country;
        findedcity.save(function (err, doc) {
            err != null ? cev.emit('all.error', err) : cev.emit('city.saved', doc);
        });
    });
    
    cev.on('country.notfound', function (findedcity) {
        console.log('country not found with id' + city.country);
        cev.emit('city.saved', findedcity);
    });

    cev.on('country.found', function (cmscountry, findedcity) {
        console.log('found country for city');
        var cmsct = cmscountry.toObject();
        console.log('country ' + cmsct.slug);
        core.list('DestinationCountries').model.find({ slug : cmsct.slug })
        .exec(function (err, dscountries) { 
            err != null ? cev.emit('all.error', err) : null;
            (dscountries != null && dscountries.length > 0) ? cev.emit('country.update', dscountries[0], findedcity) 
            : 
            cev.emit('country.notfound', findedcity);
        });
    });

    cev.on('city.country', function (findedcity) {
        console.log('binding country to city ' + findedcity.slug);
        core.list('Countries').model.find({ _id : city.country })
        .exec(function (err, countries) {
            err != null ? cev.emit('all.error', err) : null;
            (countries != null && countries.length > 0) ? 
            cev.emit('country.found', countries[0], findedcity) : 
            cev.emit('country.notfound', findedcity);
        });
    });

    cev.on('city.process', function (findedcity) {  
        console.log('lets process city ' + findedcity.slug);
        findedcity.label_es = city.label_es;
        findedcity.label_en = city.label_en;
        findedcity.slug = city.slug;
        findedcity.key_es = city.key_es;
        findedcity.key_en = city.key_en;
        findedcity.countrycode = city.countrycode;
        findedcity.mainImage = city.mainImage;
        findedcity.captionImage = city.captionImage;
        findedcity.description_es = city.description_es;
        findedcity.description_en = city.description_en;
        findedcity.state = city.state;
        findedcity.publishedDate = city.publishedDate;
        findedcity.titleSEO_es = city.titleSEO_es;
        findedcity.metaDescription_es = city.metaDescription_es;
        findedcity.descriptionGooglePlus_es = city.descriptionGooglePlus_es;
        findedcity.descriptionFacebook_en = city.descriptionFacebook_en;
        findedcity.imageFacebook = city.imageFacebook;
        findedcity.location.latitude = (city.location != null && city.location.geo != null) ? city.location.geo[1] : 0;
        findedcity.location.longitude = (city.location != null && city.location.geo != null) ? city.location.geo[0] : 0;

        findedcity.save(function (err, doc) { 
            err != null ? cev.emit('all.error', err) : cev.emit('city.country', doc);
        });
    })

    cev.on('cities.found', function (cities) { 
        cities.length > 0 ? cev.emit('city.process', cities[0]) : cev.emit('all.error', 'No cities found');
    });

    cev.on('all.error', function (err) {
        options.results.push(err);
        callback(err, options);
    });
    
    cev.on('create.city', function () {
        var createdcity = core.list('DestinationCities').model({ slug: city.slug });
        cev.emit('city.process', createdcity)
    });

    cev.on('all.done', function (result) {
        options.results.push(result);
        callback(null, options);
    });
    
    core.list('DestinationCities').model.find({ slug : city.slug })
    .exec(function (err, cities) {
        err != null ? cev.emit('all.error', err) : null;
        (cities != null && cities.length > 0) ? cev.emit('cities.found', cities) : cev.emit('create.city');
    });
}
