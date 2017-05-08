module.exports = function (options, callback, errorcallback) { 
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var helper = require('./helpers');
    var core = options.core;
    var hash = common.hashtable;
    var currencys = common.staticdata.currencys;
    //helper variables
    var currencyexchanges = null;
    var currentcurrencyfilter = '';
    var cmscountries = null;
    var countries = [];
    var results = [];
    var pendingpartials = 0;
    //event complete trigger
    var trigger = function () {
        this.name = 'Completed tasks emiter';
        this.done = function (eventname, assertcondition, data) {
            if (assertcondition) { 
                this.emit(eventname, data);
            }
        }
    };
    common.eventtrigger.eventtrigger(trigger);
    var eventlauncher = new trigger();

    function buildcountrystatistics(filter) {
        var done = [];
        var countriesfetch = {
            departure: false,
            stop: false,
            sleep: false,
            check: function () { 
                return this.departure && this.stop && this.sleep;
            }
        }
        var query = {
            $and: [
                { 'tags.slug': filter.slugTag },
                { publishState: 'published' }, 
                { 'minprice.value' : { $gt : 0 } }
            ]
        };
        if (filter.dmclist != null) {
            query.$and.push({ dmccode: { $in: filter.dmclist } });
        }

        var querystream = core.corebase.list('DMCProducts').model.find(query)
        .populate('dmc', 'name code company.name company.legalname images membership.b2bchannel membership.b2cchannel')
		.distinct('itinerary.departurecity.location.countrycode', function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i] != '') {
                        if (done.indexOf(docs[i].toLowerCase()) < 0) {
                            var c = cmscountries[docs[i].toLowerCase()];
                            if (c != null) {
                                
                                var rss = {
                                    country: {
                                        countrycode: docs[i].toLowerCase(),
                                        country: c.label_en,
                                        country_es: c.label_es
                                    },
                                    numTrip: 0,
                                    minPrice: null,
                                    countryimage: c.mainImage
                                };
                                done.push(docs[i].toLowerCase());
                                countries.push(rss);
                            }
                        }
                    }
                }
            }
            countriesfetch.departure = true;
            eventlauncher.done('countrystatistics.done', countriesfetch.check(), query);
        
        })
        .distinct('itinerary.sleepcity.location.countrycode', function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i] != '') {
                        if (done.indexOf(docs[i].toLowerCase()) < 0) {
                            var c = cmscountries[docs[i].toLowerCase()];
                            if (c != null) {
                                
                                var rss = {
                                    country: {
                                        countrycode: docs[i].toLowerCase(),
                                        country: c.label_en,
                                        country_es: c.label_es
                                    },
                                    numTrip: 0,
                                    minPrice: null,
                                    countryimage: c.mainImage
                                };
                                done.push(docs[i].toLowerCase());
                                countries.push(rss);
                            }
                        }
                    }
                }
            }
            countriesfetch.sleep = true;
            eventlauncher.done('countrystatistics.done', countriesfetch.check(), query);
        })
        .distinct('itinerary.stopcities.location.countrycode', function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i] != '') {
                        if (done.indexOf(docs[i].toLowerCase()) < 0) {
                            var c = cmscountries[docs[i].toLowerCase()];
                            if (c != null) {
                                
                                var rss = {
                                    country: {
                                        countrycode: docs[i].toLowerCase(),
                                        country: c.label_en,
                                        country_es: c.label_es
                                    },
                                    numTrip: 0,
                                    minPrice: null,
                                    countryimage: c.mainImage
                                };
                                done.push(docs[i].toLowerCase());
                                countries.push(rss);
                            }
                        }
                    }
                }
            }
            countriesfetch.stop = true;
            eventlauncher.done('countrystatistics.done', countriesfetch.check(), query);
        });

    }
    function completecountrydata(query) {
        pendingpartials = countries.length;
        if (pendingpartials == 0) {
            results = { NoResults : true };
            eventlauncher.done('results.done', true, null);
        }
        else {
            _.each(countries, function (rst) {
                var countryquery = common.utils.cloneObj(query);
                var countrycomplete = {
                    count: false,
                    price: false,
                    check: function () {
                        return this.count && this.price;
                    }
                };
                countryquery.$and.push(
                    {
                        $or: [
                            { 'itinerary.departurecity.location.countrycode': { $in: [rst.country.countrycode.toUpperCase()] } },
                            { 'itinerary.sleepcity.location.countrycode': { $in: [rst.country.countrycode.toUpperCase()] } },
                            { 'itinerary.stopcities.location.countrycode': { $in: [rst.country.countrycode.toUpperCase()] } }
                        ]
                    }
                );
                var querystream = core.corebase.list('DMCProducts').model.find(countryquery)
                .count(function (err, count) {
                    if (err != null) { console.log(err); }
                    rst.numTrip = count;
                    countrycomplete.count = true;
                    eventlauncher.done('partialresult.done', countrycomplete.check(), rst);
                })
                .distinct('minprice', function (err, docs) {
                    //check currency and convert..
                    if (err != null) { console.log(err); }
                    rst.minPrice = {
                        value: 0, 
                        currency: null
                    };
                    docs.sort(function (a, b) { return a.value - b.value; });
                    var mn = docs[0];
                    if (currentcurrency != null && mn != null && 
                            mn.currency != null && 
                            mn.currency.value != currentcurrency.value) {
                        rst.minPrice.value = common.utils.convertValueToCurrency(mn.value,
                                        mn.currency.value, currentcurrencyfilter, currencyexchanges);
                        rst.minPrice.currency = currentcurrency;
                    } else {
                        rst.minPrice = mn;
                    }
                    
                    countrycomplete.price = true;
                    eventlauncher.done('partialresult.done', countrycomplete.check(), rst);
                })
            });
        }

    }
    
    function firstfetch() { 
        var firstfetchcomplete = {
            dmcs: false,
            exchange: false,
            cmscountries: false,
            check: function () {
                return this.dmcs && this.exchange && this.cmscountries;
            }
        };
        filter.dmclistselectfield = 'code';
        helper.getDMCsListFilter(core, filter, function (dmclist) {
            filter.dmclist = dmclist;
            firstfetchcomplete.dmcs = true;
            eventlauncher.done('firstfectch.done', firstfetchcomplete.check(), null);
        });
        helper.getExchangeCurrency(core, function (exchanges) {
            currencyexchanges = exchanges;
            firstfetchcomplete.exchange = true;
            eventlauncher.done('firstfectch.done', firstfetchcomplete.check(), null);
        });
        helper.mementofetch(['CMSCountriesCACHE'], function (data) {
            cmscountries = data.Item.items;
            firstfetchcomplete.cmscountries = true;
            eventlauncher.done('firstfectch.done', firstfetchcomplete.check(), null);
        });
    }

    function exec() {
        //current currency
        if (filter != null && filter.currency != null) {
            currentcurrencyfilter = filter.currency;
            var fcr = _.filter(currencys, function (currency) {
                return currency.value == filter.currency;
            });
            if (fcr != null && fcr.length > 0) {
                currentcurrency = fcr[0];
            }
        }
        
        firstfetch();

        eventlauncher.on('firstfectch.done', function (query) { 
            completecountrydata(query)
        });

        eventlauncher.on('partialresult.done', function (ctresult) { 
            if (ctresult != null) {
                results.push(ctresult);
            }
            pendingpartials--;
            eventlauncher.done('results.done', (pendingpartials == 0), null);
        });

        eventlauncher.on('results.done', function () { 
            callback(results);
        });
    }
}