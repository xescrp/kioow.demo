module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    
    var core = conf.core;
    var code = conf.data;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var dmcproduct = conf.product;
    
    var hashcountries = conf.hashcountries;
    var hashcities = conf.hashcities;
    
    cev.on('process.done', function (results) {
        conf.results.push({ ResultOK: true, Message: 'Product cities and countries update for product', code: code });
        conf.product = results;
        callback(null, conf);
    });
    cev.on('process.error', function (err) {
        conf.results.push({ ResultOK: false, Message: 'Error updating cities prodcut', code: code, error: err });
        callback(err, conf);
    });

    dmcproduct != null ? 
    setImmediate(function () {

        var counter = {
            departure: 0,
            sleep: 0,
            stop: 0,
            departures: {},
            sleeps: {},
            stops: {},
            done: function () { return (this.departure == 0 && this.sleep == 0 && this.stop == 0); }
        };
        
        cev.on('product.process', function (result) {
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
                                itinerary.sleepcity.city_es = sleepcity.label_es || itinerary.sleepcity.city_es;
                                itinerary.sleepcity.slug = sleepcity.slug || itinerary.sleepcity.slug;
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
                                itinerary.departurecity.city_es = departurecity.label_es || itinerary.departurecity.city_es;
                                itinerary.departurecity.slug = departurecity.slug || itinerary.departurecity.slug;
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
                                        i_stopcity.city_es = stopcity.label_es || i_stopcity.city_es;
                                        i_stopcity.slug = stopcity.slug || i_stopcity.slug;
                                    }
                                }
                            });
                        }
                    });
                }
                
                result.original.save(function (err, doc) {
                    err != null ? console.log(err) : console.log('Product ' + doc.code + ' processed and saved');
                    err != null ? cev.emit('process.error', err) : cev.emit('process.done', doc);
                });
            }
            else {
                cev.emit('process.done', null);
            }
        });

        dmcproduct.getItineraryCollections(dmcproduct.code, function (itinerarycol) {
            console.log('process itinerary...');
            //console.log(itinerarycol);
            counter.departure = itinerarycol.departurecities.length || 0;
            counter.sleep = itinerarycol.sleepcities.length || 0;
            counter.stop = itinerarycol.stopcities.length || 0;
            counter.done() ?
                    process.nextTick(function () {
                cev.emit('product.process', { results: counter, original: dmcproduct });
            })
                     : 
                    process.nextTick(function () {
                _.each(itinerarycol.sleepcities, function (sleep) {
                    var sleepcity = hashcities[sleep.slug];
                    sleepcity != null ? counter.sleeps[sleepcity.slug] = sleepcity : null;
                    counter.sleep--;
                    counter.done() ? cev.emit('product.process', { results: counter, original: dmcproduct }): null;
                });
                _.each(itinerarycol.departurecities, function (departure) {
                    var departurecity = hashcities[departure.slug];
                    departurecity != null ? counter.departures[departurecity.slug] = departurecity : null;
                    counter.departure--;
                    counter.done() ? cev.emit('product.process', { results: counter, original: dmcproduct }): null;
                });
                _.each(itinerarycol.stopcities, function (stop) {
                    var stopcity = hashcities[stop.slug];
                    stopcity != null ? counter.stops[stopcity.slug] = stopcity : null;
                    counter.stop--;
                    counter.done() ? cev.emit('product.process', { results: counter, original: dmcproduct }): null;
                });
            });
        });
    }) 
    : 
    setImmediate(function () { 
        console.log('no product found with this code: ' + code);
        cev.emit('process.done', null);
    });

}