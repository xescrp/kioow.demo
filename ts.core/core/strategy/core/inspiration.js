module.exports = function (options, callback, errorcallback) { 
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var helper = require('./helpers');
    var core = options.core.corebase;
    var hash = common.hashtable;
    var currencys = common.staticdata.currencys;
    var currentcurrency = null;
    var exchanges = null;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var errormessages = [];

    var query = {
        $and: [{ publishState: 'published' }, { 'pvp.b2b' : { $gt : 0 } }, { origin: { $ne : 'tailormade' } }]
    };
    
    var middlehash = {};
    var countryhashcomplete = {
        departure: false,
        sleep: false,
        stop: false
    };
    var filter = {
        slugTag : options.tag,
        b2bchannel : options.b2bchannel,
        b2cchannel : options.b2cchannel,
        currency : options.currency || 'EUR'
    };

    currentcurrency = _.find(currencys, function (curr) { return curr.value == filter.currency });

    cev.on('all.error', function () { 
        errorcallback(errormessages);
    });
    cev.on('all.done', function (results) { 
        callback(results);
    });
    
    cev.on('find.products', function () {
        filter.slugTag != null && filter.slugTag != '' ? query.$and.push({ 'tags.slug': filter.slugTag }) : null;
        var querystream = core.list('DMCProducts').model.find(query)
        .select('_id code departurecountry stopcountry sleepcountry minprice pvp dmc')
        .populate('dmc', 'name code company.name company.legalname images membership.b2bchannel membership.b2cchannel membership.commission membership.b2bcommission membership.pvp currency')
        .populate('departurecountry')
        .populate('stopcountry')
        .populate('sleepcountry')
        .stream()
        
        querystream.on('data', function (doc) {
            var prhash = {};
            prhash[doc.code] = doc.code;
            //if (currentcurrency.value != doc.minprice.currency.value) {
            //    //console.log('currency change for product ' + doc.code);
            //    doc.minprice.value = common.utils.convertValueToCurrency(doc.minprice.value,
            //                            doc.minprice.currency.value, currentcurrency.value, exchanges);
            //    doc.minprice.currency = currentcurrency;
            //}
            console.log(doc.dmc);
            doc = require('../../decorator/product.affiliate.price.search.sync')({
                core: core, document: doc, loggeduser: options.auth, environment: options.environment
            });

            var selectedcurrency = options.currentcurrency;
            doc = require('../../decorator/exchange.search')({ core: core, program: doc, currentcurrency: selectedcurrency, auth: options.auth });

            //console.log('processing... ' + doc.code);
            doc.departurecountry != null && doc.departurecountry.length > 0 ? 
            _.each(doc.departurecountry, function (departure) {
                middlehash[departure._id] != null ? 
                middlehash[departure._id].products[doc.code] = doc.code : 
                middlehash[departure._id] = {
                    country: {
                        countrycode: departure.slug.toLowerCase(),
                        country: departure.label_en,
                        country_es: departure.label_es
                    },
                    numTrip: 0,
                    products: prhash,
                    minPrice: { value: doc.pvp.b2b, currency: doc.pvp.currency },
                    countryimage: departure.mainImage
                };
                console.log(departure);
                if (doc.pvp.b2b > 0 && doc.pvp.b2b < middlehash[departure._id].minPrice.value) { 
                    middlehash[departure._id].minPrice = {
                        value: doc.pvp.b2b, currency: doc.pvp.currency
                    };
                }
            }) : null;
            doc.stopcountry != null && doc.stopcountry.length > 0 ? 
            _.each(doc.stopcountry, function (stop) {
                middlehash[stop._id] != null ? 
                middlehash[stop._id].products[doc.code] = doc.code : 
                middlehash[stop._id] = {
                    country: {
                        countrycode: stop.slug.toLowerCase(),
                        country: stop.label_en,
                        country_es: stop.label_es
                    },
                    numTrip: 0,
                    products: prhash,
                    minPrice: { value: doc.pvp.b2b, currency: doc.pvp.currency },
                    countryimage: stop.mainImage
                };
                
                if (doc.pvp.b2b > 0 && doc.pvp.b2b < middlehash[stop._id].minPrice.value) {
                    middlehash[stop._id].minPrice = {
                        value: doc.pvp.b2b, currency: doc.pvp.currency
                    };
                }
            }) : null;
            doc.sleepcountry != null && doc.sleepcountry.length > 0 ?  
            _.each(doc.sleepcountry, function (sleep) {
                middlehash[sleep._id] != null ? 
                middlehash[sleep._id].products[doc.code] = doc.code : 
                middlehash[sleep._id] = {
                    country: {
                        countrycode: sleep.slug.toLowerCase(),
                        country: sleep.label_en,
                        country_es: sleep.label_es
                    },
                    numTrip: 0,
                    products: prhash,
                    minPrice: { value: doc.pvp.b2b, currency: doc.pvp.currency },
                    countryimage: sleep.mainImage
                };
                
                if (doc.pvp.b2b > 0 && doc.pvp.b2b < middlehash[sleep._id].minPrice.value) {
                    middlehash[sleep._id].minPrice = {
                        value: doc.pvp.b2b, currency: doc.pvp.currency
                    };
                }
            }) : null;
        });

        querystream.on('error', function (err) {
            console.log(err);
            errormessages.push(err);
        });
                
        querystream.on('close', function () {
            
            var countryids = _.keys(middlehash);
            countryids != null && countryids.length > 0 ? 
            setImmediate(function () {
                var results = [];
                _.each(countryids, function (c_id) {
                    middlehash[c_id].numTrip = _.keys(middlehash[c_id].products).length;
                    
                    delete middlehash[c_id].products;
                    results.push(middlehash[c_id]);
                });
                results = _.sortBy(results, function (rs) { return -rs.numTrip; });
                cev.emit('all.done', results);
            }) : 
            setImmediate(function () { 
                cev.emit('all.done', { NoResults: true });
            });
        });
        
    });
    
   
    cev.on('dmc.listready', function (dmcs) {
        dmcs != null ? 
        setImmediate(function () {
            var codes = _.pluck(dmcs, '_id');
            var filterdmcs = { dmc: { $in: codes } };
            query.$and.push(filterdmcs);
            cev.emit('find.products');
        }) : 
        setImmediate(function () { 
            cev.emit('all.error', 'B2B|B2C Channel selection failed');
        });
    });
    
    cev.on('dmc.filterready', function (dmcfilter) {
        var dmcquery = { $and: [{ code: { $ne: null } }, dmcfilter, { status: 'valid' }] };
        core.list('DMCs').model.find(dmcquery)
        .select('_id code')
        .exec(function (err, dmcs) {
                err != null ? 
            setImmediate(function () {
                    //bad result
                    cev.emit('all.error', err);
                }) 
            : 
            setImmediate(function () {
                    cev.emit('dmc.listready', dmcs);
                });
            });
    });
    //filter dmcs
    //set filter...
    cev.on('channel.filters', function () { 
        var filterhash = { onlyb2b: { 'membership.b2bchannel': true }, onlyb2c: { 'membership.b2cchannel': true }, 'default': null }
        var filtername = 'default';
        filtername = (filter.b2bchannel == true && (filter.b2cchannel == null || filter.b2cchannel == false)) ? 'onlyb2b' : filtername;
        filtername = (filter.b2cchannel == true && (filter.b2bchannel == null || filter.b2bchannel == false)) ? 'onlyb2c' : filtername;
        
        filtername != 'default' ? cev.emit('dmc.filterready', filterhash[filtername]) : cev.emit('find.products');
    });

    setImmediate(function () {
        cev.emit('channel.filters');
    });

    //core.list('Exchange').model.find({ state: 'published' })
    //.exec(function (err, docs) {
    //    err != null ? process.nextTick(function () {
    //        errormessages.push(err);
    //        cev.emit('all.error');
    //    }) : process.nextTick(function () {
    //        exchanges = _.map(docs, function (exchange) { return exchange.toObject(); });
    //        cev.emit('channel.filters');
    //    });
    //});
}