module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var helper = require('./helpers');
    var core = options.core;
    var hash = common.hashtable;
    var currencys = common.staticdata.currencys;
    var currentcurrency = null;
    var exchanges = null;
    var cms_countries = new hash.HashTable();
    var cms_tags = new hash.HashTable();
    var destinations = new hash.HashTable();
    var dmcsfilter = new hash.HashTable();
    var codes = [];
    var finded = 0;
    var pendingdocs = 0;
    var totalitems = 0;
    //results
    var store = {
        filter: null,
        data: null
    };
    //pending tasks
    var pending = {
        filters: false,
        data: false,
        cmstags: false,
        exchanges: false,
        dmclist: false
    };
    
    //event complete trigger
    var trigger = function () {
        this.name = 'Completed tasks emiter';
        this.error = false;
        this.errormessage = null;
        this.done = function (eventname, assertcondition, data) {
            if (assertcondition) {
                this.emit(eventname, data);
            }
        }
    };
    common.eventtrigger.eventtrigger(trigger);
    var eventlauncher = new trigger();
    

    var filter = {
        tags : options.tags,
        country : options.country,
        cities : options.cities,
        categories : options.categories,
        days : options.days,
        departuredate : options.departuredate,
        date: options.date,
        currency : options.currency,
        order : options.order,
        type : options.type,
        b2bchannel : options.b2bchannel,
        b2cchannel : options.b2cchannel,
        kindtrip : options.kind,
        pricemin: options.pricemin,
        pricemax: options.pricemax,
        maxcount: options.maxcount,
        dmccode: options.dmccode,
        codes : options.codes,
        debug : options.debug
    };
    //for getting dmc list...
    filter.dmclistselectfield = '_id';

    var request = {
        lastcode: options.lastcode,
        page: options.page
    };
    console.log('Search filter... ');
    console.log(filter);

    //parse and set the country value for filtering
    if (filter.country != null && filter.country != '') {
        filter.country = filter.country.toUpperCase();
        filter.country = filter.country.split(',');
    }

    //currency exchanges...
    eventlauncher.on('exchanges.builded', function (data) {
        console.log('exchanges ready...');
        exchanges = data;
        pending.exchanges = true;
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), filter);
    });
    //all data pushed for the pager...
    //all data pager ready...
    eventlauncher.on('data.pushed', function (allproducts) {
        console.log('data pushed for pager...');
        console.log('total: ' + totalitems);
        console.log('finded: ' + finded);
        //reorder codes...
        if (filter.type == 'asc') {
            codes.sort();
        } else {
            codes.sort();
            codes.reverse();
        }
        var cpage = (totalitems - finded) / 12;
        var page = {
            totalItems: totalitems,
            pages: Math.ceil(totalitems / 12),
            currentpage: cpage,
            lastcode: codes[codes.length - 1],
            items: allproducts
        };
        eventlauncher.emit('data.builded', page);
    });
    //all data pager ready...
    eventlauncher.on('data.builded', function (pager) {
        console.log('data ready...');
        store.pager = pager;
        pending.data = true;
        eventlauncher.done('all.done', (pending.data && pending.filters), store);
    });
    //all filter for results ready...
    eventlauncher.on('filter.builded', function (filter) {
        console.log('filter-request ready...');
        store.filter = filter;
        pending.filters = true;
        eventlauncher.done('all.done', (pending.data && pending.filters), store);
    });
    //the fetch from cms is ready...
    eventlauncher.on('cmsdata.builded', function (tags) {
        console.log('cms data ready...');
        cms_tags = tags;
        pending.cmstags = true;
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), filter);
    });
    //the list of dmcs (b2c or b2b channel request...) is ready...
    eventlauncher.on('dmclist.builded', function (dmclist) {
        console.log('dmc list ready...');
        filter.dmclist = dmclist;
        pending.dmclist = true;
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), filter);
    });
    //when all is ready...
    eventlauncher.on('all.ready', function () {
        console.log('all ready, buid data and request filter...');
        if (!eventlauncher.error) {
            filter = querybuilder();
            databuilding(filter);
            filterbuilding(filter);
        }
        else { 
            eventlauncher.emit('all.done');
        }
    });
    //when all is done...
    eventlauncher.on('all.done', function (return_results) {
        console.log('all done for callback...');
        if (!eventlauncher.error) {
            console.log('no errors...');
            callback(return_results);
        } else {
            console.log('something went wrong...');
            errorcallback(eventlauncher.errormessage);
        }
    });
    
    
    //currency exchanges...
    eventlauncher.on('exchanges.error', function (err) {
        eventlauncher.error = true;
        eventlauncher.errormessage = err;
        pending.exchanges = true;
        //errorcallback(err);
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), err);
    });
    //all data pager error...
    eventlauncher.on('data.error', function (err) {
        eventlauncher.error = true;
        eventlauncher.errormessage = err;
        pending.data = true;
        //errorcallback(err);
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), err);
    });
    //all filter for results error...
    eventlauncher.on('filter.error', function (err) {
        eventlauncher.error = true;
        eventlauncher.errormessage = err;
        pending.filters = true;
        //errorcallback(err);
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), err);
    });
    //the fetch from cms is error...
    eventlauncher.on('cmsdata.error', function (err) {
        eventlauncher.error = true;
        eventlauncher.errormessage = err;
        pending.cmstags = true;
        //errorcallback(err);
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), err);
    });
    //the list of dmcs (b2c or b2b channel request...) is ready...
    eventlauncher.on('dmclist.error', function (err) {
        eventlauncher.error = true;
        eventlauncher.errormessage = err;
        pending.dmclist = true;
        //errorcallback(err);
        eventlauncher.done('all.ready', (pending.exchanges && pending.cmstags && pending.dmclist), err);
    });
    //ok
    function querybuilder() { 
        var query = { $and: [{ code: { $ne: null } }] };
        if (filter != null) {
            if (filter.dmclist != null) {
                query.$and.push({ dmc: { $in: filter.dmclist } });
            }
            //current currency
            if (filter != null && filter.currency != null) {
                var fcr = _.filter(currencys, function (currency) {
                    return currency.value == filter.currency;
                });
                if (fcr != null && fcr.length > 0) {
                    currentcurrency = fcr[0];
                }
            }
            //console.log('current currency...');
            //console.log(currentcurrency);
            //set dates...
            var start = new Date();
            console.log('From: ' + start);
            var end = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
            console.log('From: ' + end);
            if (filter.departuredate != null && filter.departuredate != '') {
                var months = [];
                start.setDate(1);
                start.setMonth(parseInt(filter.departuredate.split('-')[1]) - 1);
                start.setFullYear(parseInt(filter.departuredate.split('-')[2]));
                end.setDate(30);
                end.setMonth(start.getMonth());
                end.setFullYear(start.getFullYear());
            }
            //building the dates range..
            var iterate = new Date(start.getFullYear(), start.getMonth(), 1);
            var datescondition = {
                $or: []
            }
            while (iterate < end) {
                var monthname = common.utils.getMonthNameEnglish(iterate.getMonth());
                var mnfield = monthname + '.availability.0';
                var c = {
                    year : iterate.getFullYear(),
                };
                c[mnfield] = { $exists: true };
                var dcondition = { availability: { $elemMatch: c } }
                
                datescondition.$or.push(dcondition);
                iterate.setMonth(iterate.getMonth() + 1);
            }
            query.$and.push(datescondition);

            //filter for state
            query.$and.push({ origin: { $ne : 'tailormade' } });
            if (filter.states != null && filter.states.length > 0) {
                query.$and.push({ publishState: { $in: filter.states } });
            } else {
                query.$and.push({ publishState: 'published' });
            }
            
            //filter for tags...
            if (filter.tags != null && filter.tags != '') {
                var q = { 'tags.slug': { $in: filter.tags.split(',') } };
                query.$and.push(q);
            }
            
            //filter for codes (product code)
            if (filter.codes != null && filter.codes != '') {
                var codes = filter.codes.split(',');
                var cd = { code: { $in: codes } };
                query.$and.push(cd);
            }
            //filter for price range
            if (filter.pricemin != null && filter.pricemin != '') {
                var pricemin = parseInt(filter.pricemin);
                var q = { 'minprice.value' : { $gte: pricemin } };
                query.$and.push(q)
            }

            if (filter.pricemax != null && filter.pricemax != '') {
                var pricemax = parseInt(filter.pricemax);
                var q = { 'minprice.value' : { $lte: pricemax } };
                query.$and.push(q)
            }
            //filter destination
            if (filter.country != null && filter.country.length > 0) {
                var lc = null;
                if (filter.cities != null && filter.cities != '') {
                    filter.cities = filter.cities.split(',');
                    lc = {
                        $and: []
                    };
                    for (var i = 0, len = filter.cities.length; i < len; i++) {
                        var city = filter.cities[i];
                        var ctcond = {
                            $or: []
                        };
                        ctcond.$or.push(
                            {
                                itinerary: {
                                    $elemMatch : {
                                        'sleepcity.city' : city, 
                                        'sleepcity.location.countrycode' : { $in: filter.country }
                                    }
                                }
                            });
                        ctcond.$or.push(
                            {
                                itinerary: {
                                    $elemMatch : {
                                        'stopcities.city' : city, 
                                        'stopcities.location.countrycode' : { $in: filter.country }
                                    }
                                }
                            });
                        lc.$and.push(ctcond);
                    }
                } else {
                    lc = {
                        $or: [
                            { 'itinerary.departurecity.location.countrycode': { $in: filter.country } },
                            { 'itinerary.sleepcity.location.countrycode': { $in: filter.country } },
                            { 'itinerary.stopcities.location.countrycode': { $in: filter.country } }
                        ]
                    };
                }
                //push the filter condition
                if (lc != null) {
                    query.$and.push(lc);
    							
                }
            }
            //filter for kind of trip
            if (filter.kindtrip != null && filter.kindtrip != '') {
                var kdt = {
                    'included.trip.grouptrip': false,
                    'included.trip.privatetrip': false
                };
                if (filter.kindtrip == 'private') {
                    kdt['included.trip.privatetrip'] = true;
                }
                if (filter.kindtrip == 'group') {
                    kdt['included.trip.grouptrip'] = true;
                }
                query.$and.push(kdt);
            }
            //filter for trip duration
            if (filter.days != null && filter.days != '') {
                var ds = filter.days.split(',');
                var dayscond = {
                    $or: []
                };
                
                if (ds != null && ds.length > 0) {
                    for (var ii = 0, len = ds.length; ii < len; ii++) {
                        var dtf = ds[ii];
                        var fdt = null;
                        if (dtf == '1-5') {
                            var dstart = {
                                'itinerary.0' : { $exists: true },
                            };
                            var dend = {
                                'itinerary.5' : { $exists: false }
                            };
                            
                            fdt = {
                                $and: [dstart, dend]
                            }
                        }
                        if (dtf == '6-10') {
                            days = 7;
                            var dstart = {
                                'itinerary.5' : { $exists: true },
                            };
                            var dend = {
                                'itinerary.10' : { $exists: false }
                            };
                            
                            fdt = {
                                $and: [dstart, dend]
                            }
                        }
                        if (dtf == '11-15') {
                            days = 7;
                            var dstart = {
                                'itinerary.10' : { $exists: true },
                            };
                            var dend = {
                                'itinerary.15' : { $exists: false }
                            };
                            
                            fdt = {
                                $and: [dstart, dend]
                            }
                        }
                        if (dtf == '15') {
                            days = 14;
                            var dstart = {
                                'itinerary.15' : { $exists: true },
                            };
                            
                            fdt = dstart;
                        }
                        dayscond.$or.push(fdt);
                    
                    }
                    if (dayscond != null && dayscond.$or != null && dayscond.$or.length > 0) {
                        query.$and.push(dayscond);
                    }
                }
            }
            //filter for hotel categories
            if (filter.categories != null && filter.categories != '') {
                var ht = {
                    'itinerary.hotel.category': { $in: filter.categories.split(',') }
                };
                query.$and.push(ht);
            }
        }
            //end condition filter...
        return query;
    }
    //ok
    function getCurrencyExchanges() {
        helper.getExchangeCurrency(core, function (data) {
            exchanges = data;
            eventlauncher.emit('exchanges.builded', exchanges);
        });
    }
    //ok
    function databuilding(query) {
        var allproducts = [];
        var alldocs = [];

        var lastcodeprop = 'code';
        
        //navigation...
        var sortcondition = { code: 1 };
        var pagecondition = null;
        
        //Get total items..
        core.corebase.list('DMCProducts').model.find(query).count(function (err, total) {
            if (err) { console.log(err); }
            totalitems = total;
        });
        
        //Order type...
        if (filter != null && filter.order != '') {
            switch (filter.order) {
                case 'price':
                    lastcodeprop = 'priceindexing';
                    if (filter.type != null && filter.type == 'asc') {
                        sortcondition = { priceindexing: 1 };
                        if (request != null &&
                                        (request.lastcode != null && request.lastcode != '')) {
                            pagecondition = {
                                priceindexing: { $gt: request.lastcode }
                            }
                            if (request.page == 'prev') {
                                pagecondition = {
                                    priceindexing: { $lt: request.lastcode }
                                }
                            }
                            query.$and.push(pagecondition);
                        }
                    }
                    else {
                        sortcondition = { priceindexing: -1 };
                        if (request != null &&
                                    (request.lastcode != null && request.lastcode != '')) {
                            pagecondition = {
                                priceindexing: { $lt: request.lastcode }
                            }
                            if (request.page == 'prev') {
                                pagecondition = {
                                    priceindexing: { $gt: request.lastcode }
                                }
                            }
                            query.$and.push(pagecondition);
                        }
                    }
                    break;
                case 'duration':
                    lastcodeprop = 'itinerarylengthindexing';
                    if (filter.type != null && filter.type == 'asc') {
                        sortcondition = { itinerarylengthindexing: 1 };
                        if (request != null &&
                                    (request.lastcode != null && request.lastcode != '')) {
                            pagecondition = {
                                itinerarylengthindexing: { $gt: request.lastcode }
                            }
                            if (request.page == 'prev') {
                                pagecondition = {
                                    itinerarylengthindexing: { $lt: request.lastcode }
                                }
                            }
                            query.$and.push(pagecondition);
                        }
                    }
                    else {
                        sortcondition = { itinerarylengthindexing: -1 };
                        if (request != null &&
                                    (request.lastcode != null && request.lastcode != '')) {
                            pagecondition = {
                                itinerarylengthindexing: { $lt: request.lastcode }
                            }
                            if (request.page == 'prev') {
                                pagecondition = {
                                    itinerarylengthindexing: { $gt: request.lastcode }
                                }
                            }
                            query.$and.push(pagecondition);
                        }
                    }
                    break;
            }
        } else {
            pagecondition = null;
        }
        //set the start index for search...
        if (request != null && request.lastcode != null && request.lastcode != '') {
            if (pagecondition == null) {
                query.$and.push({
                    code: { $gt: request.lastcode }
                });
            }
        }
        
        //Get the count for the query complete (paginated)
        core.corebase.list('DMCProducts').model.find(query).count(function (err, count) {
            if (err) { console.log(err); }
            finded = count;
        });
        //do it
        var querystream = core.corebase.list('DMCProducts').model.find(query)
				.populate('dmc', 'name code company.name company.legalname images membership.commission membership.b2bcommission')
				.sort(sortcondition)
				.limit(12)
				.stream();
        
        //for each element...
        querystream.on('data', function (doc) {
            alldocs.push(doc);
        });
        
        querystream.on('error', function (err) {
            console.log(err);
            eventlauncher.emit('data.error', err);
        });
        
        querystream.on('close', function () {
            console.log('Mongo query stream closed...');
            
            //lets finish...
            if (alldocs != null && alldocs.length > 0) {
                pendingdocs = alldocs.length;
                //iterate...
                _.each(alldocs, function (doc) {
                    
                    var from = new Date();
                    var to = new Date();
                    var days = 0;
                    if (doc.itinerary != null && doc.itinerary.length > 0) {
                        days = doc.itinerary.length;
                    }
                    to.setYear(to.getFullYear() + 1);
                    switch (lastcodeprop) {
                        case 'code':
                            codes.push(doc.code);
                            break;
                        case 'itinerarylengthindexing':
                            codes.push(doc.itinerarylengthindexing);
                            break;
                        case 'priceindexing':
                            codes.push(doc.priceindexing);
                            break;
                    }
                    
                    var t = {
                        code: doc.code,
                        itinerary: {
                            countries: [],
                            cities: [],
                            hotelcategories: [],
                            length: doc.itinerary.length,
                            meals: _mealsIncluded(doc.itinerary),
                            days: doc.itinerary.length
                        },
                        minprice: doc.minprice,
                        included: doc.included,
                        name: doc.name,
                        title: doc.title,
                        title_es: doc.title_es,
                        slug: doc.slug,
                        slug_en : doc.slug_en,
                        slug_es : doc.slug_es,
                        createdOn: doc.createdOn,
                        publishState: doc.publishState,
                        tags: doc.tags,
                        productimage: doc.productimage,
                        dmc: doc.dmc, 
                        parent: doc.parent
                    }
                    
                    //check currency and convert..
                    console.log('checking currency...');
                    //console.log(currentcurrency);
                    //console.log(t.minprice.currency);
                    if (currentcurrency != null && 
                        t.minprice.currency != null && 
                        t.minprice.currency.value != currentcurrency.value) {

                        console.log('change currency...');
                        t.minprice.value = common.utils.convertValueToCurrency(t.minprice.value,
                                        t.minprice.currency.value, filter.currency, exchanges);
                        t.minprice.currency = currentcurrency;
                    } else {
                        console.log('currency ok...');
                    }
                    
                    doc.getItineraryCollections(doc.code, function (colls) {
                        t.itinerary.countries = colls.countries;
                        t.itinerary.cities = colls.cities;
                        t.itinerary.hotelcategories = colls.hotelcategories;
                        t.itinerary.sleepcities = colls.sleepcities;
                        t.itinerary.departurecities = colls.departurecities;
                        t.itinerary.stopcities = colls.stopcities;
                        t.itinerary.countries.sort();
                        t.itinerary.cities.sort();
                        t.itinerary.hotelcategories.sort();
                        
                        if (options.auth != null && options.auth.user != null & options.auth.user.isAffiliate) {
                            require('../../decorator/product.affiliate.price')({
                                document: t, loggeduser: options.auth
                            }, 
                            function (document) { //let's add to results...
                                allproducts.push(document);
                                pendingdocs--;
                                if (pendingdocs == 0) {
                                    eventlauncher.emit('data.pushed', allproducts);
                                }
                            }, 
                            function (err) { //let's add to results...
                                allproducts.push(t);
                                pendingdocs--;
                                if (pendingdocs == 0) {
                                    eventlauncher.emit('data.pushed', allproducts);
                                }
                            });
                        } else { 
                            //let's add to results...
                            allproducts.push(t);
                            pendingdocs--;
                            if (pendingdocs == 0) { 
                                eventlauncher.emit('data.pushed', allproducts);
                            }
                        }
                    });

                });
            } else {
                eventlauncher.emit('data.builded', {
                    NoResults : true,
                    items: { length: 0 }
                });
            }

        });
    }
    //ok
    function filterbuilding(query) {
        var countries = [];
        var pagefilter = {
            countries: [],
            cities : [],
            tags : [],
            hotelcats : [],
            days : [
                { label : "1-5 days", value : "d1-5" },
                { label : "6-10 days", value : "d6-10" },
                { label : "10-15 days", value : "d10-15" },
                { label : "< 15 days", value : "d15up" }
            ]
        };
        var filterready = {
            cities: false,
            tags: false,
            hotelcategory: false,
            countries: false
        };
        function _fillcountries(callback) {
            if (filter.country == null || filter.country.length == 0) {
                core.corebase.list('Countries').model.find(
                    { slug: { $in: countries } }, 
                    { _id: 1, label_en: 1, label_es: 1, slug: 1, title_es: 1, title_en: 1 })
                .exec(function (err, docs) {
                    console.log('Error getting countries for filter search...');
                    console.log(err);
                    pagefilter.countries = docs;
                    _endThis('countries', pagefilter);
                });
            } else { 
                _endThis('countries', pagefilter);
            }
        }
        function _endThis(what, data) {
            filterready[what] = true;
            var isfinished = filterready.cities && filterready.tags && filterready.hotelcategory && filterready.countries;
            if (isfinished) { 
                eventlauncher.emit('filter.builded', pagefilter);
            } 
        }

        var querystream = core.corebase.list('DMCProducts').model.find(query)
        .distinct('itinerary.sleepcity', 
                function (err, docs) {
            if (docs != null && docs.length > 0) {
                var filtcities = [];
                var cities = [];
                for (i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i].location != null) {
                        if (docs[i].city != null && docs[i].city != '') {
                            var cityname = docs[i].city;
                            var cityname_es = cityname;
                            if (docs[i].city_es != null && docs[i].city_es != '') {
                                cityname_es = docs[i].city_es;
                            }
                            if (filtcities.indexOf(cityname) < 0) {
                                var cityfilter = { city_en: cityname, city_es: cityname_es };
                                if (docs[i].location != null) {
                                    cityfilter.country = docs[i].location.countrycode;
                                    if (countries.indexOf(docs[i].location.countrycode.toLowerCase()) < 0) {
                                        countries.push(docs[i].location.countrycode.toLowerCase());
                                    }
                                }
                                cities.push(cityfilter);
                                filtcities.push(cityname);
                            }
                        }
                    }
                }
                if (cities != null && cities.length > 0) {
                    cities = _.uniq(cities);
                    cities = _.sortBy(cities, 'city_es');
                }
            }
            pagefilter.cities = cities;
            _endThis('cities', pagefilter, callback);
            _fillcountries();
        })
        .distinct('tags.slug', 
                function (err, docs) {
            console.log(err);
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    var tag = cms_tags.get(docs[i]);
                    if (tag != null) {
                        var tg = {
                            label: tag.label,
                            label_en: tag.label_en,
                            slug: tag.slug,
                            state: tag.state
                        };
                        pagefilter.tags.push(tg);
                    }
                }
            }
            _endThis('tags', pagefilter, callback);
        })
        .distinct('itinerary.hotel.category', 
                function (err, docs) {
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    if (docs[i] != null && docs[i] != '') {
                        pagefilter.hotelcats.push(docs[i]);
                        pagefilter.hotelcats.sort();
                    }
                }
            }
            _endThis('hotelcategory', pagefilter, callback);
        })
    }
    //ok
    function getCMSData() { 
        var rq = {
            collectionname: 'TripTags',
            query: { state: { $ne: null } },
            sortcondition: { sortOrder: 1 }
        };
        core.mongo.find(rq, function (rs) {
            if (rs.ResultOK == true) {
                var tags = rs.Data;
                for (var i = 0, len = tags.length; i < len; i++) {
                    var ct = tags[i];//.toObject();
         
                    if (ct != null && ct.slug != '') {
                        
                        cms_tags.set(ct.slug, ct);
                    }
                }
                eventlauncher.emit('cmsdata.builded', cms_tags);
            } else {
                console.log(rs.Message);
                eventlauncher.emit('cmsdata.error', rs.Message);
            }
        })
    }
    //ok
    function _mealsIncluded(itinerary) {
        var breakfastcount = 0;
        var lunchcount = 0;
        var dinnercount = 0;
        var html = '';
        if (itinerary && itinerary.length > 0) {
            for (var i = 0, len = itinerary.length; i < len; i++) {
                var it = itinerary[i];
                
                if (it.hotel.breakfast) {
                    breakfastcount++;
                }
                if (it.hotel.lunch) {
                    lunchcount++;
                }
                if (it.hotel.dinner) {
                    dinnercount++;
                }
            }
        }
        var items = {};
        if (breakfastcount > 0) {
            items.breakfast = breakfastcount;
        }
        if (lunchcount > 0) {
            items.lunch = lunchcount;
        }
        if (dinnercount > 0) {
            items.dinner = dinnercount;
        }
        return items;
    }
    //ok
    function getDMCsListDATA() {
        var dmccase = 'all';
        var condition = null;
        if ((filter.b2bchannel != null && filter.b2bchannel == true) &&
            (filter.b2cchannel == null || filter.b2cchannel == false)) {
            dmccase = 'onlyb2b';
        }
        if ((filter.b2cchannel != null && filter.b2cchannel == true) &&
            (filter.b2bchannel == null || filter.b2bchannel == false)) {
            dmccase = 'onlyb2c';
        }
        switch (dmccase) {
            case 'all':
                condition = null;
                break;
            case 'onlyb2b':
                condition = 
						{ 'membership.b2bchannel': true }
                break;
            case 'onlyb2c':
                condition =
    					{ 'membership.b2cchannel': true }
                break;
        }
        if (condition != null) {
            var rq = {
                collectionname: 'DMCs',
                query: condition,
                fields: '_id'
            };
            core.mongo.find(rq, function (rs) {
                if (rs.ResultOK == true) {
                    eventlauncher.emit('dmclist.builded', rs.Data);
                } else {
                    console.log(rs.Message);
                    eventlauncher.emit('dmclist.error', rs.Message);
                }
            });
        } else { 
            var rq = {
                collectionname: 'DMCs',
                query: { _id : { $ne: null } }, fields: '_id'
            };
            core.mongo.find(rq, function (rs) {
                if (rs.ResultOK == true) {
                    eventlauncher.emit('dmclist.builded', rs.Data);
                } else {
                    console.log(rs.Message);
                    eventlauncher.emit('dmclist.error', rs.Message);
                }
            });
        }
    }
    //ok
    function exec() {
        getCMSData();
        getDMCsListDATA();
        getCurrencyExchanges();
        //wait for completion...
    }
    
    //run...!
    exec();
}