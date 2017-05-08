module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var helper = require('./helpers');

    var core = options.core;
    var coreobj = core.corebase;

    var hash = common.hashtable;
    var currencys = common.staticdata.currencys;
    var currentcurrency = null;
    var exchanges = null;
    //flux
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var completion = {
        filter: false,
        data: false,
        dmclist: false,
        totalcount: false,
    };
    
   
    var completeflux = {
        errormessages: [],
        complete: function (propname) {
            completion[propname] = true;
        },
        done: function () {
            var isdone = true;
            for (var prop in completion) {
                isdone = isdone && completion[prop];
                if (!isdone) {
                    break;
                }
            }
            console.log(completion);
            return isdone;
        }
    };

    var results = {
        filter: null,
        pager: null
    };

    var codes = [];
    var finded = 0;
    var pendingdocs = 0;
    var totalitems = 0;
    var publishcriteria = options.environment != null && options.environment != 'yourttoo' ? ['published'] : ['published', 'published.noavail'];
    var query = {
        $and: [
            { code: { $ne: null } }, 
            { publishState: { $in: publishcriteria } }, 
            { origin: { $ne : 'tailormade' } }
        ]
    }; //fixed conditions
   
    var orderbycriteria = (options.auth != null && options.auth.user != null && (options.auth.user.isDMC || options.auth.user.isTraveler)) ? 'pvp.b2c' : 'pvp.b2b';

    var pricecriteria = {};
    pricecriteria[orderbycriteria] = { $gt: 0 };
    query.$and.push(pricecriteria);

    var fixed = {
        currency : options.currency || 'EUR',
        maxresults : options.maxresults || 12,
        lastcodeprop: options.orderby || orderbycriteria,
        ordinal : options.sort || 'asc', 
        pageconditionway : options.page || 0,
        collectionname: 'DMCProducts'
    };

    var b2b = (options.auth != null && options.auth.user != null && options.auth.user.isAffiliate) ? true : null;
    var b2c = (options.auth != null && options.auth.user != null && (options.auth.user.isTraveler)) ? true : null;

    var filter = {
        tags : options.tags,
        countries : options.countries,
        cities : options.cities,
        categories : options.categories,
        mindays: options.mindays,
        maxdays: options.maxdays,
        departuredate : options.departuredate,
        b2bchannel :  b2b,
        b2cchannel :  b2c,
        pricemin: options.pricemin,
        pricemax: options.pricemax,
        dmccodes: options.providers,
        grouptrip: options.group,
        privatetrip: options.private,
        dmclist: null,
        exclusion: options.exclusion,
        parents: options.nocategories,
        operationdays: options.operationdays,
        $like: options.$like
    };


    var sorter = {};
    sorter[fixed.lastcodeprop] = fixed.ordinal == 'asc' ? 1 : -1;
    var sortcondition = sorter;
    var offset =  fixed.maxresults * fixed.pageconditionway;
    
    
    console.log('search started...');
    console.log('Search filter...');
    console.log(filter);
    
    cev.on('all.done', function () {
        if (results.pager != null) {
            console.log('Total items: ' + totalitems);
            console.log('Max per page: ' + fixed.maxresults);
            results.pager.totalItems = totalitems;
            var cpage = fixed.pageconditionway;
            results.pager.pages = Math.ceil(totalitems / fixed.maxresults);
            results.pager.currentpage = cpage;
        }
        console.log('search finished...');
        callback(results);
    });
    
    cev.on('all.error', function (err) {
        errorcallback(err);
    });
    
    cev.on('data.count', function () {
        completion.totalcount = true;
        completeflux.done() ? cev.emit('all.done') : null;
    });
    
    cev.on('data.finded', function () {
        completion.finded = true;
        completeflux.done() ? cev.emit('all.done') : null;
    });

    cev.on('filter.done', function (filter) {
        completion.filter = true;
        results.filter = filter;
        completeflux.done() ? cev.emit('all.done') : null;
    });

    cev.on('data.done', function (page) {
        completion.data = true;
        results.pager = page;
        console.log('check results pager...');
        
        completeflux.done() ? cev.emit('all.done') : null;
    });
    //the list of dmcs (b2c or b2b channel request...) is ready...
    cev.on('dmclist.builded', function (dmclist) {
        console.log('dmc list ready...');
        completeflux.complete('dmclist');
        filter.dmclist = dmclist;
        filter.dmcids = _.pluck(dmclist, '_id');
        querybuilding();
        databuilding();
        filterbuilding();
    });
    cev.on('dmclist.error', function (err) {
        completeflux.complete('dmclist');
        completeflux.errormessages.push(err);
        //end...
        cev.emit('all.error', err);
    });
    
    cev.on('exchanges.builded', function (exchanges) { 
        getDMCsListDATA();
    });

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
        
        condition = (filter.dmccodes != null && filter.dmccodes.length > 0) ? 
             { $and: [{ _id: { $in: filter.dmccodes } }] } : { $and: [{ _id: { $ne: null } }] };
        switch (dmccase) {
            case 'all':
                condition = condition;
                break;
            case 'onlyb2b':
                condition.$and.push({ 'membership.b2bchannel': true });
                break;
            case 'onlyb2c':
                condition.$and.push({ 'membership.b2cchannel': true });
                break;
        }
        
        var rq = {
            collectionname: 'DMCs',
            query: condition ,
            fields: '_id code name company.name'
        };
        core.mongo.find(rq, function (rs) {
            if (rs.ResultOK == true) {
                cev.emit('dmclist.builded', rs.Data);
            } else {
                console.log(rs.Message);
                cev.emit('dmclist.error', rs.Message);
            }
        });
    }
    
    function getCurrencyExchanges() {
        helper.getExchangeCurrency(core, function (data) {
            exchanges = data;
            var fcr = _.filter(currencys, function (currency) {
                return currency.value == fixed.currency;
            });
            if (fcr != null && fcr.length > 0) {
                currentcurrency = fcr[0];
            }
            cev.emit('exchanges.builded', exchanges);
        });
    }

    function querybuilding() {
        if (filter != null) { 
            //dmcs...
            if (filter.dmcids != null) {
                query.$and.push({ dmc: { $in: filter.dmcids } });
            }
            //dates...
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
            }
            //filter for tags...
            if (filter.tags != null) {
                var tgs = null;
                tgs = Object.prototype.toString.call(filter.tags) == '[object Array]' ? 
                 filter.tags : 
                 filter.tags.split(',');
                _.each(tgs, function (tag) {
                    if (tag != null && tag != '') {
                        var q = { 'tags.slug' : tag };
                        query.$and.push(q)
                    }
                });
                //var q = Object.prototype.toString.call(filter.tags) == '[object Array]' ? 
                // { 'tags.slug': { $in: filter.tags } } : 
                // { 'tags.slug': { $in: filter.tags.split(',') } };
                //q['tags.slug'].$in.length > 0 ? query.$and.push(q) : null;
            }
            //filter for price range...
            if (filter.pricemin != null && filter.pricemin != '') {
                var pricemin = parseInt(filter.pricemin.toString());
                var q = { 'minprice.value' : { $gte: pricemin } };
                query.$and.push(q);
            }
            if (filter.pricemax != null && filter.pricemax != '') {
                var pricemax = parseInt(filter.pricemax.toString());
                var q = { 'minprice.value' : { $lte: pricemax } };
                query.$and.push(q);
            }
            //filter for days...
            if (filter.mindays != null && filter.mindays != '') {
                var mindays = parseInt(filter.mindays.toString());
                var q = { 'itinerarylength' : { $gte: mindays } };
                query.$and.push(q);
            }
            if (filter.maxdays != null && filter.maxdays != '') {
                var maxdays = parseInt(filter.maxdays.toString());
                var q = { 'itinerarylength' : { $lte: maxdays } };
                query.$and.push(q);
            }
            //filter for country
            if (filter.countries != null && filter.countries.length > 0) {
                _.each(filter.countries, function (country) {
					var flcountry = { $or: [] };
					if(country != null && country != ''){
						//flcountry.$or.push({ departurecountry: country });
						flcountry.$or.push({ sleepcountry: country });
						flcountry.$or.push({ stopcountry: country });
					}
					query.$and.push(flcountry);
                    // if (country != null && country != '') { 
                        // query.$and.push({ sleepcountry: country });
                    // }
                });
                //query.$and.push({ sleepcountry: { $in: filter.countries } });
                //query.$and.push({
                //    $or: [{ sleepcountry: { $in: filter.countries } },
                //          { departurecountry: { $in: filter.countries } }, 
                //          { stopcountry: { $in: filter.countries } }
                //    ]
                //});
            }
            //filter for city
            if (filter.cities != null && filter.cities.length > 0) {
                var allcities = {
                    $and: []
                };

                var flcities = { $in: filter.cities };
                var flslep = { $in: filter.cities };
                var flsdep = { $in: filter.cities };

                _.each(filter.cities, function (city) {
                    //check each city in components
                    var flcities = { $or: [] };
                    if (city != null && city != '') {
                        flcities.$or.push({ sleepcity: city });
                        flcities.$or.push({ stopcities: city });
                        //flcities.$or.push({ departurecity: city });
                        //and the conjunction
                        allcities.$and.push(flcities);
                    }
                });
                
                query.$and.push(allcities);
                //var flallcities = { $or: [flsdep, flslep, flstop] };
                //query.$and.push(flallcities);
                //_.each(filter.cities, function (city) {
                //    if (city != null && city != '') {
                //        query.$and.push({ sleepcity: city });
                //    }
                //});
                //query.$and.push({ sleepcity: { $in: filter.cities } });
                //query.$and.push({
                //    $or: [
                //        { sleepcity: { $in: filter.cities } },
                //        { departurecity: { $in: filter.cities } },  
                //        { stopcities: { $in: filter.cities } }
                //    ]
                //});
            }
            //filter for kind of trip
            if (filter.grouptrip != null && filter.grouptrip == true) {
                var q = { 'included.trip.grouptrip' : true };
                query.$and.push(q);
            }
            if (filter.privatetrip != null && filter.privatetrip == true) {
                var q = { 'included.trip.privatetrip' : true };
                query.$and.push(q);
            }
            if (filter.parents != null && filter.parents == true) {
                var q = { parent : null };
                query.$and.push(q);
            }
            if (filter.operationdays != null && filter.operationdays.length > 0) {
                var q = { operationdays: { $in: filter.operationdays } };
                query.$and.push(q);
            }
            //filter for hotel categories
            if (filter.categories != null) {
                var q = Object.prototype.toString.call(filter.categories) == '[object Array]' ? 
                 { 'itinerary.hotel.category': { $in: filter.categories } } : 
                 { 'itinerary.hotel.category': { $in: filter.categories.split(',') } };
                q['itinerary.hotel.category'].length > 0 ? query.$and.push(q) : null;
            }
            //exclusion filter
            //if (filter.exclusion != null && (filter.parents == null || filter.parents == false)) {
            //    var q = Object.prototype.toString.call(filter.exclusion)== '[object Array]' ?
            //     { 'parent': { $nin: filter.exclusion } } : 
            //     { 'parent': { $nin: filter.exclusion.split(',') } };
            //    q['parent'].length > 0 ? query.$and.push(q) : null;
            //}
            if (filter.$like != null && filter.$like != '') {
                var rgEx = common.utils.mp_conjunctive_regex(filter.$like);
                //var mngrgexp = { $regex: rgEx, $options: "i" };
                var mngrgexp = { $regex: rgEx };
                query.$and.push({ title_es: mngrgexp });
                fixed.maxresults = 50;
            }
            query.$and.push({ 'categoryname.categorybehaviour': { $ne: 'child' } })
        }
    }

    function databuilding() {
        //finded
        coreobj.list(fixed.collectionname).model.find(query).count(function (err, total) {
            if (err) { console.log(err); }
            totalitems = total;
            cev.emit('data.count');
        });
        
        var alldata = [];
        var findedquery = JSON.parse(JSON.stringify(query));
        console.log(JSON.stringify(query));
        var querystream = coreobj.list(fixed.collectionname).model.find(query)
            .select('_id code name title title_es slug slug_es slug_en publishState dmccode buildeditinerary ' +
            'parent productimage included priceindexing itinerarylength itinerarylengthindexing ' +
            'productvalid dmc origin departurecity stopcities sleepcity departurecountry stopcountry sleepcountry ' +
            'categoryname minprice itinerary tags pvp operationdays')
            .populate('dmc', 'name code company.name company.legalname images membership.commission membership.b2bcommission membership.pvp currency')
            .populate('sleepcountry', '_id slug label_en label_es')
            .populate('departurecountry', '_id slug label_en label_es')
            .populate('stopcountry', '_id slug label_en label_es')
            .populate('sleepcity', '_id slug countrycode label_en label_es')
            .populate('departurecity', '_id slug countrycode label_en label_es')
            .populate('stopcities', '_id slug countrycode label_en label_es')
            .sort(sortcondition)
            .limit(fixed.maxresults)
            .skip(offset)
            .lean()
            .stream();
        
        querystream.on('data', function (doc) {
            //price affiliate change... 
            doc = require('../../decorator/product.affiliate.price.search.sync')({
                core: core,
                document: doc,
                loggeduser: options.auth,
                environment: options.environment
            });
            //price currency change...
            var selectedcurrency = options.currentcurrency;
            doc = require('../../decorator/exchange.search')({ core: coreobj, program: doc, currentcurrency: selectedcurrency, auth: options.auth });
            //doc = require('../../decorator/priceexchangesync')({
            //    document: doc,
            //    currency: fixed.currency,
            //    exchanges: exchanges,
            //    currentcurrency: currentcurrency,
            //    environment: options.environment
            //});
            alldata.push(doc);
        });
        
        querystream.on('error', function (err) {
            console.log(err);
            cev.emit('data.error', err);
        });
        
        querystream.on('close', function () {
            pending = alldata.length;
            var codes = [];
            var result = [];
            var page = {
                totalItems : 0,
                pages: 0,
                currentpage : 0,
                items: alldata
            };
            cev.emit('data.done', page);
        });
    }

    function filterbuilding() {
        
        var pagefilter = {
            countries: [],
            cities : [],
            tags : [],
            hotelcats : [],
            days : { min: 0, max: 0 },
            price: { min: 0, max: 0 },
            dmcs: [],
            catexclussions: []
        };
        
        var firststep = {
            tags: false,
            hotelcat: false,
            minprice: false,
            itinerarylength: false,
            sleepcountry: false,
            stopcountry: false,
            depcountry: true,
            sleepcity: false,
            stopcity: false,
            depcity: true,
            dmc: false
        };

        var filtercomplete = {
            firststepdone: function () {
                var isdone = true;
                for (var prop in firststep) {
                    isdone = firststep[prop] && isdone;
                    if (!isdone) { break; }
                }
                return isdone;
            }
        };
        //TODO HERE!
        cev.on('filter.firststepdone', function () {
            //get the real values...
            pagefilter.countries = _.uniq(_.map(pagefilter.countries, function(id){ return id.toString(); })).sort();
            pagefilter.cities = _.uniq(_.map(pagefilter.cities, function(id){ return id.toString(); })).sort();
            pagefilter.hotelcats = _.filter(pagefilter.hotelcats, function (cat) { return cat != '' }).sort();
            pagefilter.tags.sort();
            pagefilter.dmcs = _.map(pagefilter.dmcs, function (id) { return id.toString(); });
            pagefilter.dmcs = _.filter(filter.dmclist, function (dmc) { return pagefilter.dmcs.indexOf(dmc._id.toString()) >= 0; });
            cev.emit('filter.done', pagefilter);
        });

        coreobj.list(fixed.collectionname).model.find(query)
        .distinct('tags.slug', function (err, tags) {
            err != null ? console.log(err) : null;
            (tags != null && tags.length > 0) ?  pagefilter.tags = tags : null;
            firststep.tags = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        .distinct('itinerary.hotel.category', function (err, docs) {
            err != null ? console.log(err) : null;
            if (docs != null && docs.length > 0) {
                pagefilter.hotelcats = docs;
            }
            firststep.hotelcat = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        .distinct('minprice.value', function (err, prices) {
            err != null ? console.log(err) : null;
            if (prices != null && prices.length > 0) {
                prices.sort(function (a, b) { return b - a });
                pagefilter.price.min = 0;//prices[prices.length - 1];
                pagefilter.price.max = prices[0];
                var ln = pagefilter.price.max.toString().length;
                var dv = Math.pow(10, (ln - 1));
                var rs = (Math.ceil(pagefilter.price.max / dv)) * dv;
                pagefilter.price.max = rs;
            }
            firststep.minprice = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        .distinct('itinerarylength', function (err, dayslength) {
            err != null ? console.log(err) : null;
            if (dayslength != null && dayslength.length > 0) {
                dayslength.sort(function (a, b) { return b - a });
                pagefilter.days.min = dayslength[dayslength.length - 1];
                pagefilter.days.max = dayslength[0];
            }
            firststep.itinerarylength = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        .distinct('sleepcountry', function (err, countryids) {
            err != null ? console.log(err) : null;
            if (countryids) {
                pagefilter.countries = pagefilter.countries.concat(countryids);
            }
            firststep.sleepcountry = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        .distinct('stopcountry', function (err, countryids) {
            err != null ? console.log(err) : null;
            if (countryids) {
                pagefilter.countries = pagefilter.countries.concat(countryids);
            }
            firststep.stopcountry = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        //.distinct('departurecountry', function (err, countryids) {
        //    err != null ? console.log(err) : null;
        //    if (countryids) {
        //        pagefilter.countries = pagefilter.countries.concat(countryids);
        //    }
        //    firststep.depcountry = true;
        //    filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        //})
        .distinct('sleepcity', function (err, cityids) {
            err != null ? console.log(err) : null;
            if (cityids) {
                pagefilter.cities = pagefilter.cities.concat(cityids);
            }
            firststep.sleepcity = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        .distinct('stopcities', function (err, cityids) {
            err != null ? console.log(err) : null;
            if (cityids) {
                pagefilter.cities = pagefilter.cities.concat(cityids);
            }
            firststep.stopcity = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
        //.distinct('departurecity', function (err, cityids) {
        //    err != null ? console.log(err) : null;
        //    if (cityids) {
        //        pagefilter.cities = pagefilter.cities.concat(cityids);
        //    }
        //    firststep.depcity = true;
        //    filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        //})
        .distinct('dmc', function (err, dmcids) {
            err != null ? console.log(err) : null;
            if (dmcids) {
                pagefilter.dmcs = dmcids;
            }
            firststep.dmc = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        });
    }
    
    cev.on('start.search', function () { 
        console.log('init search...');
        //getCurrencyExchanges();
        getDMCsListDATA();
    });
    
    cev.on('bad.request', function () {
        setTimeout(function () {
            console.log('search not allowed [parameterless]...');
            cev.emit('all.done');
        }, 500);
    });

    //first step...
    //getCurrencyExchanges();
    ((filter.tags != null && filter.tags.length > 0) || 
     (filter.countries != null && filter.countries.length > 0) || 
        (filter.cities != null && filter.cities.length > 0) ||
        (filter.$like != null && filter.$like != '')) ? 
        cev.emit('start.search') : cev.emit('bad.request');

    
}