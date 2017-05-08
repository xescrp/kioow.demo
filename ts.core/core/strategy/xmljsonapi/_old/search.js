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
        filter: true,
        data: false,
        dmclist: false,
        totalcount: false,
        finded: false
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
    var query = {
        $and: [
            { code: { $ne: null } }, 
            { publishState: 'published' }, 
            { origin: { $ne : 'tailormade' } }
        ]
    }; //fixed conditions
   

    var fixed = {
        currency : 'EUR',
        maxresults : options.maxresults || 12,
        lastcodeprop : options.orderby || 'priceindexing',
        ordinal : options.type || 'asc', 
        pageconditionway : options.page || 'next',
        lastcode: options.lastcode || null,
        collectionname: 'DMCProducts'
    };

    var b2b = true;  //(options.auth != null && options.auth.user != null && options.auth.user.isAffiliate) ? true : null;
    var b2c = false; //(options.auth != null && options.auth.user != null && options.auth.user.isTraveler) ? true : null;

    var filter = {
        tags : options.tags,
        countries : [options.country],
        cities : options.cities,
        categories : options.categories,
        mindays: options.mindays,
        maxdays: options.maxdays,
        departuredate : options.departuredate,
        b2bchannel : b2b,
        b2cchannel : b2c,
        pricemin: options.pricemin,
        pricemax: options.pricemax,
        dmccodes: options.providers,
        grouptrip: options.group,
        privatetrip: options.private,
        dmclist: null,
        exclusion: options.exclusion,
        parents: options.nocategories
    };

    var pagehash = {
        cursor: {
            asc: {
                next: {},
                prev: {}
            },
            desc: {
                next: {},
                prev: {}
            }
        },
        sorting: {
            asc: {
                next: {},
                prev: {}
            },
            desc: {
                next: {},
                prev: {}
            }
        },
        reverselist: {
            asc: {
                next: false,
                prev: true
            },
            desc: {
                next: false,
                prev: true
            }
        },
        findedpage: {
            asc: {
                next: {},
                prev: {}
            },
            desc: {
                next: {},
                prev: {}
            }
        }
    };
    pagehash.cursor.asc.next[fixed.lastcodeprop] = { $gt: fixed.lastcode };
    pagehash.cursor.asc.prev[fixed.lastcodeprop] = { $lt: fixed.lastcode };
    pagehash.cursor.desc.next[fixed.lastcodeprop] = { $lt: fixed.lastcode };
    pagehash.cursor.desc.prev[fixed.lastcodeprop] = { $gt: fixed.lastcode };
    
    pagehash.sorting.asc.next[fixed.lastcodeprop] = 1;
    pagehash.sorting.asc.prev[fixed.lastcodeprop] = -1;
    pagehash.sorting.desc.next[fixed.lastcodeprop] = -1;
    pagehash.sorting.desc.prev[fixed.lastcodeprop] = 1;
    
    pagehash.findedpage.asc.next[fixed.lastcodeprop] = { $gt: fixed.lastcode };
    pagehash.findedpage.asc.prev[fixed.lastcodeprop] = { $gte: fixed.lastcode };
    pagehash.findedpage.desc.next[fixed.lastcodeprop] = { $lt: fixed.lastcode };
    pagehash.findedpage.desc.prev[fixed.lastcodeprop] = { $lte: fixed.lastcode };
    
    var sortcondition = pagehash.sorting[fixed.ordinal][fixed.pageconditionway];
    var pagecondition = pagehash.cursor[fixed.ordinal][fixed.pageconditionway];
    var findedcondition = pagehash.findedpage[fixed.ordinal][fixed.pageconditionway];
    var reverselist = false || pagehash.reverselist[fixed.ordinal][fixed.pageconditionway];
    var codes = [];

    
    console.log('search started...');
    console.log('Search filter...');
    //console.log(filter);
    
    cev.on('all.done', function () {
        if (results.pager != null) {
            console.log('Total items: ' + totalitems);
            console.log('Finded items: ' + finded);
            console.log('Max per page: ' + fixed.maxresults);
            results.pager.totalItems = totalitems;
            var cpage = Math.ceil((totalitems - finded) / fixed.maxresults);
            results.pager.pages = Math.ceil(totalitems / fixed.maxresults);
            var npage = fixed.pageconditionway == 'next' ? 1 : 0;
            results.pager.currentpage = cpage + npage;
            (reverselist && results.pager.items != null) ? results.pager.items.reverse() : null;
            (reverselist && codes != null) ? codes.reverse() :  codes;
            results.pager.lastcode = codes[codes.length - 1];
            results.pager.prevcode = codes[0];
        } else {
            results.pager = {
                totalItems: 0,
                pages: 0,
                currentpage: 0,
                items: []
            };
        }
        console.log('search finished...');
        callback(results.pager);
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
        //filterbuilding();
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
        var condition = null;
        condition = (filter.dmccodes != null && filter.dmccodes.length > 0) ? 
             { $and: [{ _id: { $in: filter.dmccodes } }] } : { $and: [{ _id: { $ne: null } }] };
        condition.$and.push({ 'membership.b2bchannel': true });
        var rq = {
            collectionname: 'DMCs',
            query: condition ,
            fields: '_id code name'
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
                start.setMonth(parseInt(filter.date.split('-')[1]) - 1);
                start.setFullYear(parseInt(filter.date.split('-')[2]));
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
						flcountry.$or.push({ departurecountry: country });
						flcountry.$or.push({ sleepcountry: country });
						flcountry.$or.push({ stopcountry: country });
					}
					query.$and.push(flcountry);

                });
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
                        flcities.$or.push({ departurecity: city });
                        //and the conjunction
                        allcities.$and.push(flcities);
                    }
                });
                
                query.$and.push(allcities);
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
            
            //filter for hotel categories
            if (filter.categories != null) {
                var q = Object.prototype.toString.call(filter.categories) == '[object Array]' ? 
                 { 'itinerary.hotel.category': { $in: filter.categories } } : 
                 { 'itinerary.hotel.category': { $in: filter.categories.split(',') } };
                q['itinerary.hotel.category'].length > 0 ? query.$and.push(q) : null;
            }
            //exclusion filter
            if (filter.exclusion != null && (filter.parents == null || filter.parents == false)) {
                var q = Object.prototype.toString.call(filter.exclusion)== '[object Array]' ?
                 { 'parent': { $nin: filter.exclusion } } : 
                 { 'parent': { $nin: filter.exclusion.split(',') } };
                q['parent'].length > 0 ? query.$and.push(q) : null;
            }
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
        
        if (fixed.lastcode != null && fixed.lastcode != '') {
            query.$and.push(pagecondition);
            findedquery.$and.push(findedcondition);
        }
        
        
        //Get the count for the query complete (paginated)
        coreobj.list(fixed.collectionname).model.find(findedquery).count(function (err, count) {
            if (err) { console.log(err); }
            finded = count;
            cev.emit('data.finded');
        });
        
        //console.log(JSON.stringify(query));
        //console.log(sortcondition);
        var querystream = coreobj.list(fixed.collectionname).model.find(query)
        .select('-_id code name title title_es description_en description_es dmc dmccode ' + 
                'parent productimage.url included parent ' + 
                'prices.year prices.month prices.minprice prices.currency ' + 
                'dmc departurecity stopcities sleepcity departurecountry stopcountry sleepcountry ' + 
                'categoryname minprice itinerary tags.label tags.label_en')
        .populate('dmc', 'name -_id paymentoption')
        .sort(sortcondition)
        .limit(fixed.maxresults)
        .stream();
        
        querystream.on('data', function (doc) {
            if (fixed.currency != null && 
                        doc.minprice.currency != null && 
                        doc.minprice.currency.value != fixed.currency) {
                
                console.log('change currency...');
                doc.minprice.value = common.utils.convertValueToCurrency(doc.minprice.value,
                                        doc.minprice.currency.value, fixed.currency, exchanges);
                doc.minprice.currency = currentcurrency;
            } else {
                console.log('currency ok...');
            }
            
            doc = require('../../decorator/product.affiliate.price.search.sync')({
                core: core, document: doc, loggeduser: options.auth
            });
            console.log('affiliate price calculated...');

            codes.push(common.utils.getfieldvalue(fixed.lastcodeprop, doc));
            doc = doc.toObject();
            var removeproductfields = ['departurecity', 'departurecountry', 'sleepcity', 
                'sleepcountry', 'stopcities', 'stopcountry', 'itinerary'];
            _.each(removeproductfields, function (field) { 
                delete doc[field];
            });
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
    
    cev.on('fetch.country', function () {
        var cttofind = _.map(filter.countries, function (country) { 
            return country.toLowerCase();
        });
        coreobj.list('DestinationCountries').model.find({ slug: { $in: cttofind } })
        .exec(function (err, docs) {
            err != null ? cev.emit('all.error', err) : process.nextTick(function () {
                docs != null && docs.length > 0 ? filter.countries = [docs[0]._id] : filter.countries = null;
                filter.countries != null ? cev.emit('start.search') : cev.emit('all.error', 'No countries found with that countrycode');
            });
        });
    });

    cev.on('start.search', function () { 
        console.log('init search...');
        getCurrencyExchanges();
    });
    
    cev.on('bad.request', function () {
        setTimeout(function () {
            console.log('Bad request. search not allowed [parameterless]. You must provide the country for your search');
            cev.emit('all.error', 'Bad request. search not allowed [parameterless]. You must provide the country for your search');
        }, 500);
    });

    //first step...
    //getCurrencyExchanges();
    
    if (options.auth != null && options.auth.user != null) {
        options.auth.user.isAffiliate ? 
        process.nextTick(function () { 
            (filter.countries != null && filter.countries.length > 0) ? 
                cev.emit('fetch.country') : cev.emit('bad.request');
        }) //continue...
        : 
        process.nextTick(function () {
            cev.emit('all.error', 'You are not authorized to use the XML/JSON API.'); //Exit, the user is not an affiliate
        })
    } else {
        process.nextTick(function () {
            cev.emit('all.error', 'You must provide your credentials to access the system'); //Exit, credentials not provided
        });
    }

    
}