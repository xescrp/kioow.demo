module.exports = function (conf, callback) {
    var core = conf.core;

    var common = require('yourttoo.common');
    var _ = require('underscore');
    var countries = conf.destinationcountries;
    var results = [];
    var randomlist = _.sample(conf.triptags, 8);
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var pending = randomlist.length;

    cev.on('tag.finished', function (result) {
        results.push(result);
        conf.results = results;
        conf.pushmementoconfig.item = conf.results;
        pending--;
        pending == 0 ? callback(null, conf) : null;
    });
    console.log('start building tag contents');
    _.each(randomlist, function (tag) {
        console.log('building tag : ' + tag.slug);
        var result = {
            tag : {
                slug : tag.slug,
                label_es: tag.label,
                label_en: tag.label_en,
                title_en: tag.title,
                title_es: tag.title_es,
                titleSEO_es: tag.titleSEO,
                titleSEO_en: tag.titleSEO_en,
                mainImage: tag.mainImage
            },
            results: []
        };
        
        var alreadydonecountries = [];

        var query = {
            $and: [
                { 'minprice.value': { $gt: 0 } },
                { 'minprice.currency.label': { $ne: null } },
                { 'minprice.currency.value': { $ne: null } },
                { 'tags.slug' : tag.slug },
                { publishState: 'published', origin: { $ne : 'tailormade' } },
                { 'itinerary.0': { $exists: true } },
                { sleepcountry : { $ne: null } },
                { 'sleepcountry.0': { $exists: true } },
            ]
        };
        conf.dmccodes != null ? query.$and.push({ dmccode: { $in: conf.dmccodes } }) : null;
        
        var querystream = core.list('DMCProducts').model.find(query)
        .select('_id code slug slug_es title title_es name itinerarylength minprice sleepcountry dmc')
        .populate('dmc', 'code name membership.commission membership.b2bcommission')
        .sort({ 'minprice.value' : 1 })
        //.limit(50)
        .stream();
        
        querystream.on('data', function (prod) {
            var t = {
                code: prod.code,
                name: prod.name,
                title_en: prod.title,
                title_es: prod.title_es,
                slug: prod.slug,
                slug_es: prod.slug_es,
                country: null,
                days: prod.itinerarylength,
                minprice: prod.minprice
            };
            
            var countryid = prod.sleepcountry[0];
            if (result.results.length < 6 && alreadydonecountries.indexOf(countryid.toString()) < 0) {
                alreadydonecountries.push(countryid.toString());
                var country = {
                    label_es: countries[countryid.toString()].label_es,
                    label_en: countries[countryid.toString()].label_en,
                    countrycode: countries[countryid.toString()].slug.toUpperCase(), 
                };
                t.country = country;
                
                if (conf.selectedcurrency != null & t.minprice.currency.value != conf.currentcurrency) {
                    prod.minprice.value = common.utils.convertValueToCurrency(prod.minprice.value,
                                            prod.minprice.currency.value, conf.currentcurrency, conf.exchanges);
                    prod.minprice.currency = conf.selectedcurrency;
                    t.minprice = prod.minprice;
                }
                
                if (conf.decorators != null && conf.decorators.length > 0) {
                    _.each(conf.decorators, function (fnname) {
                        var r_exec = require('../../../decorator/' + fnname);
                        console.log('minprice before decoration...[' + fnname + '] - ' + t.minprice.value);
                        t.minprice = r_exec({
                            selectedcomission: conf.selectedcomission,
                            document: prod
                        }).minprice;
                        console.log('minprice after decoration...[' + fnname + '] - ' + t.minprice.value);
                    });
                }
                
                result.results.push(t);
            }
        });
        
        querystream.on('error', function (err) {
            console.log(err);
        });
        
        querystream.on('close', function () {
            cev.emit('tag.finished', result);
            console.log('tag builded ' + tag.slug);
            console.log('products finded : ' + result.results.length);
        });

    });

    
}