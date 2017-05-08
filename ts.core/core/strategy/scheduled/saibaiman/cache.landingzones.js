module.exports = function (conf, callback) {
    var core = conf.core;

    var common = require('yourttoo.common');
    var _ = require('underscore');
    var countries = conf.destinationcountries;
    var results = [];
    var randomlist = conf.countryzones;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var pending = randomlist.length;

    cev.on('zone.finished', function (result) {
        results.push(result);
        conf.results = results;
        conf.pushmementoconfig.item = conf.results;
        pending--;
        pending == 0 ? callback(null, conf) : null;
    });
    console.log('start building zones contents');

    _.each(randomlist, function (zone) {
        console.log('building zone : ' + zone.zone.slug);
        var result = {
            title_es: zone.zone.label_es,
            title_en: zone.zone.label_en,
            mainImage: zone.zone.mainImage,
            order: zone.zone.sortOrder,
            cheapestcountries: []
        };

        var codes = _.pluck(zone.countries, '_id');
        
        var alreadydonecountries = [];

        var query = {
            $and: [
                { 'minprice.value': { $gt: 0 } },
                { 'minprice.currency.label': { $ne: null } },
                { 'minprice.currency.value': { $ne: null } },
                { publishState: 'published', origin: { $ne : 'tailormade' } },
                { 'itinerary.0': { $exists: true } },
                { 'sleepcountry.0': { $exists: true } },
                {
                    $or: [
                        { sleepcountry : { $in: codes } }, 
                        { departurecountry : { $in: codes } }, 
                        { stopcountries : { $in: codes } }
                    ]
                }
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
            var slpid = prod.sleepcountry[0];
            if (result.cheapestcountries.length < 6 && alreadydonecountries.indexOf(slpid.toString()) < 0) {
                alreadydonecountries.push(slpid.toString());
                var ct = _.find(zone.countries, function (country) { return country._id.toString() == slpid.toString(); });
                if (ct != null) {
                    var t = {
                        label_es: ct.label_es,
                        label_en: ct.label_en,
                        countrycode: ct.slug.toUpperCase(),
                        minprice: {
                            value: prod.minprice.value,
                            currency: prod.minprice.currency
                        }
                    };

                    if (conf.selectedcurrency != null & prod.minprice.currency.value != conf.currentcurrency) {
                        prod.minprice.value = common.utils.convertValueToCurrency(t.minprice.value,
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
                    console.log(t.minprice.currency);
                    result.cheapestcountries.push(t);
                }
            }
        });
        
        querystream.on('error', function (err) {
            console.log(err);
        });
        
        querystream.on('close', function () {
            cev.emit('zone.finished', result);
            console.log('zone builded ' + zone.zone.slug);
            console.log('cheapest products finded : ' + result.cheapestcountries.length);
        });

    });

    
}