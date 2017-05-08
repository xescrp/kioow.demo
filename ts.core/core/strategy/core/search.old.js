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
        currency : options.currency || 'EUR',
        maxresults : options.maxresults || 12,
        lastcodeprop : options.orderby || 'priceindexing',
        ordinal : options.type || 'asc', 
        pageconditionway : options.page || 'next',
        lastcode: options.lastcode || null,
        collectionname: 'DMCProducts'
    };

    var b2b = (options.auth != null && options.auth.user != null && options.auth.user.isAffiliate) ? true : null;
    var b2c = (options.auth != null && options.auth.user != null && options.auth.user.isTraveler) ? true : null;

    var filter = {
        tags : options.tags,
        countries : options.countries,
        cities : options.cities,
        categories : options.categories,
        mindays: options.mindays,
        maxdays: options.maxdays,
        departuredate : options.departuredate,
        b2bchannel : options.b2bchannel || b2b,
        b2cchannel : options.b2cchannel || b2c,
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
    console.log(filter);
    
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
        //if (results.pager != null && results.pager.items != null && results.pager.items.length > 0) {
        //    var pricetotal = results.pager.items.length;
        //    var priceerrors = [];
        //    function pricesdone() { return (pricetotal == 0); }
        //    _.each(results.pager.items, function (doc) {
        //        require('../../decorator/product.affiliate.price')({ core: core, document: doc, loggeduser: options.auth }, 
        //            function (document) {
        //            console.log('affiliate price calculated...');
        //            doc = document;
        //            pricetotal--;
        //            if (pricesdone()) {
        //                priceerrors.length == 0 ? cev.emit('all.done') : cev.emit('all.error', priceerrors.join('/r/n'));
        //            }
        //        }, 
        //            function (err) {
        //            console.log('affiliate price calculated ERROR...');
        //            console.log(err);
        //            priceerrors.push(err);
        //            pricetotal--;
        //            if (pricesdone()) {
        //                priceerrors.length == 0 ? cev.emit('all.done') : cev.emit('all.error', priceerrors.join('/r/n'));
        //            }
        //        });
        //    })
        //} else { 
        //    cev.emit('all.done');
        //}
        cev.emit('all.done');
        //completeflux.done() ? cev.emit('all.done') : null;
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
                condition = null;
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
                    if (country != null && country != '') { 
                        query.$and.push({ sleepcountry: country });
                    }
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
                        flcities.$or.push({ departurecity: city });
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
        .select('_id code name title title_es slug slug_es slug_en publishState dmccode ' + 
                'parent productimage included priceindexing itinerarylength itinerarylengthindexing ' + 
                'productvalid dmc origin departurecity stopcities sleepcity departurecountry stopcountry sleepcountry ' + 
                'categoryname minprice itinerary tags')
        .populate('dmc', 'name code company.name company.legalname images membership.commission membership.b2bcommission')
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
            depcountry: false,
            sleepcity: false,
            stopcity: false,
            depcity: false,
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
        .distinct('departurecountry', function (err, countryids) {
            err != null ? console.log(err) : null;
            if (countryids) {
                pagefilter.countries = pagefilter.countries.concat(countryids);
            }
            firststep.depcountry = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
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
        .distinct('departurecity', function (err, cityids) {
            err != null ? console.log(err) : null;
            if (cityids) {
                pagefilter.cities = pagefilter.cities.concat(cityids);
            }
            firststep.depcity = true;
            filtercomplete.firststepdone() ? cev.emit('filter.firststepdone') : null;
        })
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
        getCurrencyExchanges();
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
     (filter.cities != null && filter.cities.length > 0)) ? 
        cev.emit('start.search') : cev.emit('bad.request');

    
}