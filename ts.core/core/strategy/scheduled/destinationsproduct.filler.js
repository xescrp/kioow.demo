
module.exports = function (options, callback, errorcallback) {
    
    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var productCodes = [];
    var hashcountries = {};
    var hashcities = {};
    var flags = {
        hashcountries: false,
        hashcities: false,
        productsempty: false
    };
    var icts = {
        original: 0,
        migration: 0
    };
    var totalToProcess = 0;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var trackerrors = [];

    cev.on('product.processoriginal', function (result) { 
        if (result != null && result.original != null) {
            var ct = {
                dep_countries : [],
                sle_countries: [],
                stp_countries: []
            };
            console.log('empty countries from product...' + result.original.code);
            result.original.sleepcountry != null ? result.original.sleepcountry.splice(0, result.original.sleepcountry.length) : null;
            result.original.departurecountry != null ? result.original.departurecountry.splice(0, result.original.departurecountry.length) : null;
            result.original.stopcountry != null ? result.original.stopcountry.splice(0, result.original.stopcountry.length) : null;
            
            console.log('empty cities from product...' + result.original.code);
            result.original.sleepcity != null ? result.original.sleepcity.splice(0, result.original.sleepcity.length) : null;
            result.original.departurecity != null ? result.original.departurecity.splice(0, result.original.departurecity.length) : null;
            result.original.stopcities != null ? result.original.stopcities.splice(0, result.original.stopcities.length) : null;
            

            for (var sleepslug in result.results.sleeps) {
                var sleepcity = result.results.sleeps[sleepslug];
                (sleepcity != null) ? result.original.sleepcity.push(sleepcity): null;
                var slcountryid = (sleepcity != null && sleepcity.country != null) ? sleepcity.country : null;
                if (slcountryid != null && ct.sle_countries.indexOf(slcountryid.toString()) < 0) {
                    result.original.sleepcountry.push(sleepcity.country);
                    ct.sle_countries.push(slcountryid.toString());
                }
                //syncronyze itinerary
                _.each(result.original.itinerary, function (itinerary) {
                    if (itinerary.sleepcity != null && itinerary.sleepcity.location != null) {
                        var slsl = itinerary.sleepcity.city + ' ' + itinerary.sleepcity.location.countrycode;
                        var sl_slug = common.utils.slug(slsl);
                        if (sl_slug == sleepslug) {
                            itinerary.sleepcity.cityid = (sleepcity != null) ? sleepcity.id.toString() : null;
                            itinerary.sleepcity.countryid = slcountryid;
                            itinerary.sleepcity.city_es = (sleepcity != null) ? sleepcity.label_es : itinerary.sleepcity.city_es;
                            itinerary.sleepcity.slug = (sleepcity != null) ? sleepcity.slug : itinerary.sleepcity.slug;
                        }
                    }
                });

            }
            
            for (var departureslug in result.results.departures) {
                var departurecity = result.results.departures[departureslug];
                (departurecity != null) ? result.original.departurecity.push(departurecity): null;
                var dpcountryid = (departurecity != null && departurecity.country != null) ? departurecity.country : null;
                if (dpcountryid != null && ct.dep_countries.indexOf(dpcountryid.toString()) < 0) {
                    result.original.departurecountry.push(departurecity.country);
                    ct.dep_countries.push(dpcountryid.toString());
                }
                //syncronyze itinerary
                _.each(result.original.itinerary, function (itinerary) {
                    if (itinerary.departurecity != null && itinerary.departurecity.location != null) {
                        var dpsl = itinerary.departurecity.city + ' ' + itinerary.departurecity.location.countrycode;
                        var dep_slug = common.utils.slug(dpsl);
                        if (dep_slug == departureslug) {
                            itinerary.departurecity.cityid = (departurecity != null) ? departurecity.id.toString() : null;
                            itinerary.departurecity.countryid = dpcountryid;
                            itinerary.departurecity.city_es = (departurecity != null) ? departurecity.label_es : itinerary.departurecity.city_es;
                            itinerary.departurecity.slug = (departurecity != null) ? departurecity.slug : itinerary.departurecity.slug;
                        }
                    }
                });
            }
            
            for (var stopslug in result.results.stops) {
                var stopcity = result.results.stops[stopslug];
                (stopcity != null) ? result.original.stopcities.push(stopcity): null;
                var stcountryid = (stopcity != null && stopcity.country != null) ? stopcity.country : null;
                if (stcountryid != null && ct.stp_countries.indexOf(stcountryid.toString()) < 0) {
                    result.original.stopcountry.push(stopcity.country);
                    ct.stp_countries.push(stcountryid.toString());
                }
                //syncronyze itinerary
                _.each(result.original.itinerary, function (itinerary) {
                    if (itinerary.stopcities != null && itinerary.stopcities.length > 0) {
                        _.each(itinerary.stopcities, function (i_stopcity) {
                            if (i_stopcity != null && i_stopcity.location != null) {
                                var stsl = i_stopcity.city + ' ' + i_stopcity.location.countrycode;
                                var st_slug = common.utils.slug(stsl);
                                if (st_slug == stopslug) {
                                    i_stopcity.cityid = (stopcity != null) ? stopcity.id.toString() : null;
                                    i_stopcity.countryid = stcountryid;
                                    i_stopcity.city_es = (stopcity != null) ? stopcity.label_es : i_stopcity.city_es;
                                    i_stopcity.slug = (stopcity != null) ? stopcity.slug : i_stopcity.slug;
                                }
                            }
                        });
                    }
                });
            }
            
            result.original.save(function (err, doc) {
                err != null ? console.log(err) : console.log('Product ORIGINAL ' + doc.code + ' processed and saved');
                icts.original++;
                //cev.emit('product.next');
            });
        }
        else {
            //cev.emit('product.next');
            icts.original++;
        }
    });

    cev.on('product.ready', function (result) {
        if (result != null && result.product != null) {
            var ct = {
                dep_countries : [],
                sle_countries: [],
                stp_countries: []
            };
            for (var sleepslug in result.results.sleeps) {
                var sleepcity = result.results.sleeps[sleepslug];
                (sleepcity != null) ? result.product.sleepcity.push(sleepcity): null;
                var slcountryid = (sleepcity != null && sleepcity.country != null) ? sleepcity.country : null;
                if (slcountryid != null && ct.sle_countries.indexOf(slcountryid.toString()) < 0) {
                    result.product.sleepcountry.push(sleepcity.country);
                    ct.sle_countries.push(slcountryid.toString());
                }
                //syncronyze itinerary
                _.each(result.product.itinerary, function (itinerary) {
                    if (itinerary.sleepcity != null && itinerary.sleepcity.location != null) {
                        var slsl = itinerary.sleepcity.city + ' ' + itinerary.sleepcity.location.countrycode;
                        var sl_slug = common.utils.slug(slsl);
                        if (sl_slug == sleepslug) {
                            itinerary.sleepcity.cityid = (sleepcity != null) ? sleepcity.id.toString() : null;
                            itinerary.sleepcity.countryid = slcountryid;
                            itinerary.sleepcity.city_es = (sleepcity != null) ? sleepcity.label_es : itinerary.sleepcity.city_es;
                            itinerary.sleepcity.slug = (sleepcity != null) ? sleepcity.slug : itinerary.sleepcity.slug;
                        }
                    }
                });

            }

            for (var departureslug in result.results.departures) {
                var departurecity = result.results.departures[departureslug];
                (departurecity != null) ? result.product.departurecity.push(departurecity): null;
                var dpcountryid = (departurecity != null && departurecity.country != null) ? departurecity.country : null;
                if (dpcountryid != null && ct.dep_countries.indexOf(dpcountryid.toString()) < 0) {
                    result.product.departurecountry.push(departurecity.country);
                    ct.dep_countries.push(dpcountryid.toString());
                }
                //syncronyze itinerary
                _.each(result.product.itinerary, function (itinerary) {
                    if (itinerary.departurecity != null && itinerary.departurecity.location != null) {
                        var dpsl = itinerary.departurecity.city + ' ' + itinerary.departurecity.location.countrycode;
                        var dep_slug = common.utils.slug(dpsl);
                        if (dep_slug == departureslug) {
                            itinerary.departurecity.cityid = (departurecity != null) ? departurecity.id.toString() : null;
                            itinerary.departurecity.countryid = dpcountryid;
                            itinerary.departurecity.city_es = (departurecity != null) ? departurecity.label_es : itinerary.departurecity.city_es;
                            itinerary.departurecity.slug = (departurecity != null) ? departurecity.slug : itinerary.departurecity.slug;
                        }
                    }
                });
            }

            for (var stopslug in result.results.stops) {
                var stopcity = result.results.stops[stopslug];
                (stopcity != null) ? result.product.stopcities.push(stopcity): null;
                var stcountryid = (stopcity != null && stopcity.country != null) ? stopcity.country : null;
                if (stcountryid != null && ct.stp_countries.indexOf(stcountryid.toString()) < 0) {
                    result.product.stopcountry.push(stopcity.country);
                    ct.stp_countries.push(stcountryid.toString());
                }
                //syncronyze itinerary
                _.each(result.product.itinerary, function (itinerary) {
                    if (itinerary.stopcities != null && itinerary.stopcities.length > 0) {
                        _.each(itinerary.stopcities, function (i_stopcity) {
                            if (i_stopcity != null && i_stopcity.location != null) { 
                                var stsl = i_stopcity.city + ' ' + i_stopcity.location.countrycode;
                                var st_slug = common.utils.slug(stsl);
                                if (st_slug == stopslug) {
                                    i_stopcity.cityid = (stopcity != null) ? stopcity.id.toString() : null;
                                    i_stopcity.countryid = stcountryid;
                                    i_stopcity.city_es = (stopcity != null) ? stopcity.label_es : i_stopcity.city_es;
                                    i_stopcity.slug = (stopcity != null) ? stopcity.slug : i_stopcity.slug;
                                }
                            }
                        });
                    }
                });
            }

            result.product.save(function (err, doc) {
                err != null ? console.log(err) : console.log('Product ' + doc.code + ' processed and saved');
                cev.emit('product.next');
                icts.migration++;
            });
        }
        else {
            cev.emit('product.next');
            icts.migration++;
        }

    });

    cev.on('product.process', function (dmcproduct) {
        if (dmcproduct != null) {
            var _pr = dmcproduct.toObject();
            delete _pr.id;
            delete _pr._id;
            var product = core.list('MigrationProducts').model(_pr);
            var counter = {
                departure: 0,
                sleep: 0,
                stop: 0,
                departures: {},
                sleeps: {},
                stops: {},
                done: function () { return (this.departure == 0 && this.sleep == 0 && this.stop == 0); }
            };
            //console.log(product);
            dmcproduct.getItineraryCollections(product.code, function (itinerarycol) {
                console.log('process itinerary...');
                //console.log(itinerarycol);
                counter.departure = itinerarycol.departurecities.length || 0;
                counter.sleep = itinerarycol.sleepcities.length || 0;
                counter.stop = itinerarycol.stopcities.length || 0;
                counter.done() ?
                    process.nextTick(function(){
                        cev.emit('product.ready', { product: product, results: counter, original: dmcproduct });
                        cev.emit('product.processoriginal', { product: product, results: counter, original: dmcproduct });
                    })
                     : 
                    process.nextTick(function () { 
                    _.each(itinerarycol.sleepcities, function (sleep) {
                        var sleepcity = hashcities[sleep.slug];
                        sleepcity != null ? counter.sleeps[sleepcity.slug] = sleepcity : null;
                        counter.sleep--;
                        counter.done() ? cev.emit('product.ready', { product: product, results: counter, original: dmcproduct }): null;
                        counter.done() ? cev.emit('product.processoriginal', { product: product, results: counter, original: dmcproduct }): null;
                    });
                    _.each(itinerarycol.departurecities, function (departure) {
                        var departurecity = hashcities[departure.slug];
                        departurecity != null ? counter.departures[departurecity.slug] = departurecity : null;
                        counter.departure--;
                        counter.done() ? cev.emit('product.ready', { product: product, results: counter, original: dmcproduct }): null;
                        counter.done() ? cev.emit('product.processoriginal', { product: product, results: counter, original: dmcproduct }): null;
                    });
                    _.each(itinerarycol.stopcities, function (stop) {
                        var stopcity = hashcities[stop.slug];
                        stopcity != null ? counter.stops[stopcity.slug] = stopcity : null;
                        counter.stop--;
                        counter.done() ? cev.emit('product.ready', { product: product, results: counter, original: dmcproduct }): null;
                        counter.done() ? cev.emit('product.processoriginal', { product: product, results: counter, original: dmcproduct }): null;
                    });
                });
            });
        }
    });

    cev.on('product.get', function (code) {
        core.list('DMCProducts').model.find({ code: code })
        .exec(function (err, products) {
            err != null ? console.log(err) : console.log('lets process product ' + code);
            err != null ? cev.emit('product.next') : cev.emit('product.process', products[0]);
        });
    });
    
    cev.on('product.done', function () {
        console.log('no more product codes to process... lets finish');
        console.log(icts);
        setTimeout(function () { 
            cev.emit('finish.done', { ResultOK: true, Message: 'Cities and Countries loaded into products' });
        }, 4000);
    });

    cev.on('product.next', function () {
        var code = productCodes.shift();
        console.log('processing ' + productCodes.length + '/' + totalToProcess);
        (code != null && code != undefined) ? cev.emit('product.get', code) : cev.emit('product.done');
    });

    cev.on('product.codes', function (productcodes) {
        productCodes = _.pluck(productcodes, 'code') || [];
        totalToProcess = productCodes.length;
        (productCodes != null && productCodes.length > 0) ? cev.emit('product.next') : cev.emit('finish.error', 'No products found');
    });

    cev.on('product.start', function () { 
        core.list('DMCProducts').model.find().select('code').exec(function (err, productcodes) {
            (err != null) ? cev.emit('finish.error', err) : cev.emit('product.codes', productcodes);
        });
    });

    cev.on('destinations.ready', function (hashname) {
        flags[hashname] = true;
        (flags.hashcountries == true && flags.hashcities == true && flags.productsempty == true) ? 
            cev.emit('product.start') : null;
    });

    cev.on('country.get', function (countries) {
        var ct = countries.length;
        _.each(countries, function (country) {
            hashcountries[country.slug] = country;
            ct--;
            ct == 0 ? cev.emit('destinations.ready', 'hashcountries') : null;
        });
    });
    
    cev.on('city.get', function (cities) {
        var ct = cities.length;
        _.each(cities, function (city) {
            hashcities[city.slug] = city;
            ct--;
            ct == 0 ? cev.emit('destinations.ready', 'hashcities') : null;
        });
    });
    
    cev.on('products.empty', function (deleteresults) {
        console.log('Migration products collection empty...');
        console.log(deleteresults);
        cev.emit('destinations.ready', 'productsempty');
    });

    cev.on('finish.error', function (err) {
        console.log('scheduled task finished with errors : ');
        console.log(err);
        errorcallback(err);
    });

    cev.on('finish.done', function (results) {
        console.log('scheduled task finished : ');
        console.log(results);
        callback(results);
    });
    //find all countries
    core.list('DestinationCountries').model.find().exec(function (err, countries) {
        (err != null) ? cev.emit('finish.error', err) : cev.emit('country.get', countries);
    });
    //find all cities
    core.list('DestinationCities').model.find().exec(function (err, cities) {
        (err != null) ? cev.emit('finish.error', err) : cev.emit('city.get', cities);
    });

    core.list('MigrationProducts').model.find().remove().exec(function (err, deleteresults) {
        (err != null) ? cev.emit('finish.error', err) : cev.emit('products.empty', deleteresults);
    });
    
}