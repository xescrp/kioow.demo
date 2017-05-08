var _ = require('underscore');
var common = require('yourttoo.common');

module.exports = function (options, callback, errorcallback) {
    //listing...
    var core = options.core;
    
    var mongo = core.mongo;
    var coreobj = core.corebase;
    
    var completion = {
        filter: false,
        data: false
    };
    
    var results = {
        filter: null,
        pager: null
    };
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
    //global results...
    eventlauncher.on('list.done', function (rs) {
        callback(rs);
    });
    eventlauncher.on('list.error', function (err) {
        errorcallback(err);
    });
    //partial results...
    eventlauncher.on('data.done', function (pager) {
        completion.data = true;
        results.pager = pager;
        eventlauncher.done('list.done', (completion.data && completion.filter), results);
    });
    eventlauncher.on('filter.done', function (filter) {
        completion.filter = true;
        results.filter = filter;
        eventlauncher.done('list.done', (completion.data && completion.filter), results);
    });
    
    function databuilding(conf) {
        //generic
        var allproducts = [];
        var finded = 0;
        var pending = 0;
        var totalitems = 0;
        
        var listname = conf.listname; //names: dmcproducts, bookings, userqueries, dmcqueries
        
        var query = { code: { $ne: null } };
        
        //finded
        coreobj.list('Affiliate').model.find(query).count(function (err, total) {
            if (err) { console.log(err); }
            totalitems = total;
        });
        
        //pagination and sorting
        var sortcondition = { code: 1 };
        if (conf.lastcode != null && conf.lastcode != '') {
            if (conf.page != null && conf.page != '') {
                switch (conf.request.page) {
                    case 'next':
                        query.$and.push({
                            code: { $gt: conf.lastcode }
                        });
                        break;
                    case 'prev':
                        query.$and.push({
                            code: { $lt: conf.lastcode }
                        });
                        sortcondition = { code: -1 }
                        break;
                }
            }
            else {
                query.$and.push({
                    code: { $gt: conf.lastcode }
                });
            }
        
        }
        
       
        var itemsperpage = 12;
        if (conf.itemsperpage != undefined && conf.itemsperpage != null) {
            itemsperpage = conf.itemsperpage;
        }
        //Get the count for the query complete (paginated)
        coreobj.list('Affiliate').model.find(query).count(function (err, count) {
            if (err) { console.log(err); }
            finded = count;
        });
        //ready to query
        var querystream = coreobj.list('Affiliate').model.find(query)
        .populate('dmc', 'name code company.name company.legalname images membership contact.email')
        .sort(sortcondition)
        .limit(itemsperpage)
        .stream();
        //elementos pendientes...
        pending = itemsperpage;
        var codes = [];
        querystream.on('data', function (doc) {
            allbookings.push(doc);
        });
        querystream.on('error', function (err) {
            console.log(err);
            errorcallback(err);
        });
        //check finish results...
        querystream.on('close', function () {
            pending = allproducts.length;
            var result = [];
            if (allproducts != null && allproducts.length > 0) {
                _.each(allproducts, function (doc) {
                    
                    var from = new Date();
                    var to = new Date();
                    to.setYear(to.getFullYear() + 1);
                    codes.push(doc.code);
                    var t = {
                        code: doc.code,
                        price: doc.minprice,
                        itinerary: {
                            countries: [],
                            cities: [],
                            hotelcategories: [],
                            length: doc.itinerary.length
                        },
                        minprice : doc.minprice,
                        name: doc.name,
                        title: doc.title,
                        title_es: doc.title_es,
                        slug: doc.slug,
                        createdOn: doc.createdOn,
                        publishState: doc.publishState,
                        tags: doc.tags,
                        productimage: doc.productimage,
                        dmc: doc.dmc,
                        parent : doc['parent'],
                        categoryname : doc.categoryname
                    }
                    doc.getItineraryCollections(doc.code, function (colls) {
                        //console.log('collections for ' + doc.code);
                        //console.log(colls);
                        t.itinerary.countries = colls.countries;
                        t.itinerary.cities = colls.cities;
                        t.itinerary.hotelcategories = colls.hotelcategories;
                        
                        //let's add to results...
                        result.push(t);
                        if (sortcondition.code == -1) {
                            result.reverse();
                        }
                        pending--;
                        //console.log(t.code);
                        if (pending == 0) {
                            console.log('total: ' + totalitems);
                            console.log('finded: ' + finded);
                            codes.sort();
                            var cpage = (totalitems - finded) / 12;
                            var page = {
                                totalItems : totalitems,
                                pages: Math.ceil(totalitems / 12),
                                currentpage : cpage,
                                lastcode : codes[codes.length - 1],
                                items: result
                            };
                            eventlauncher.emit('data.done', page);
                        }
                    });
                });
            }
            else {
                eventlauncher.emit('data.done', null);
            }
        });
    }
    function filterbuilding(conf) {
        var filter = {
            destinations : [],
            tags : [],
            hotelcats : [],
            days : [
                { label : "1-7 days", value : "d1-7" },
                { label : "7-14 days", value : "d7-14" },
                { label : "< 14 days", value : "d14up" }
            ],
            status : [],
            dmcs: []
        };
        var filtercompletion = {
            dmcs: false,
            sleepdestinations: false,
            stopdestinations: false,
            status: false,
            tags: false,
            hotelcats: false
        };
        var hashdestinations = new common.hashtable.HashTable();
        //get dmcs...
        var dmcstream = coreobj.list('DMCs').model.find()
        .select('code name')
        .sort({ name : 1 })
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.dmcs = docs;
            }
            filtercompletion.dmcs = true;
            eventlauncher.done('filter.done', (filtercompletion.dmcs && filtercompletion.sleepdestinations && filtercompletion.stopdestinations && filtercompletion.status 
                && filtercompletion.tags && filtercompletion.hotelcats && filtercompletion.status), filter);
        });

        coreobj.list('Affiliate').model.find(query)
            .distinct('itinerary.sleepcity.location.countrycode', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    var cmt = options.cms_countries.get(docs[i].toLowerCase());
                    if (cmt != null) {
                        var ct = {
                            label: cmt.label_es,
                            code: cmt.slug.toUpperCase()
                        };
                        
                        hashdestinations.set(ct.code, ct);
                    }

                }
            }
            filter.destinations = hashdestinations.values();
            filtercompletion.sleepdestinations = true;
            eventlauncher.done('filter.done', (filtercompletion.dmcs && filtercompletion.sleepdestinations && filtercompletion.stopdestinations && filtercompletion.status 
                && filtercompletion.tags && filtercompletion.hotelcats && filtercompletion.status), filter);
        })
            .distinct('itinerary.stopcities.location.countrycode', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    var cmt = options.cms_countries.get(docs[i].toLowerCase());
                    
                    if (cmt != null) {
                        var ct = {
                            label: cmt.label_es,
                            code: cmt.slug.toUpperCase()
                        };
                        
                        hashdestinations.set(ct.code, ct);
                    }

                }
            }
            filter.destinations = hashdestinations.values();
            filtercompletion.stopdestinations = true;
            eventlauncher.done('filter.done', (filtercompletion.dmcs && filtercompletion.sleepdestinations && filtercompletion.stopdestinations && filtercompletion.status 
                && filtercompletion.tags && filtercompletion.hotelcats && filtercompletion.status), filter);
        })
            .distinct('tags.slug', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    var tag = options.cms_tags.get(docs[i]);
                    if (tag != null) {
                        var tg = {
                            label: tag.label,
                            label_en: tag.label_en,
                            slug: tag.slug,
                        };
                        filter.tags.push(tg);
                    }
                }
            }
            filtercompletion.tags = true;
            eventlauncher.done('filter.done', (filtercompletion.dmcs && filtercompletion.sleepdestinations && filtercompletion.stopdestinations && filtercompletion.status 
                && filtercompletion.tags && filtercompletion.hotelcats && filtercompletion.status), filter);
        })
            .distinct('itinerary.hotel.category', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            filter.hotelcats = docs;
            filtercompletion.hotelcats = true;
            eventlauncher.done('filter.done', (filtercompletion.dmcs && filtercompletion.sleepdestinations && filtercompletion.stopdestinations && filtercompletion.status 
                && filtercompletion.tags && filtercompletion.hotelcats && filtercompletion.status), filter);
        })
            .distinct('publishState', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            filter.status = docs;
            filtercompletion.status = true;
            eventlauncher.done('filter.done', (filtercompletion.dmcs && filtercompletion.sleepdestinations && filtercompletion.stopdestinations && filtercompletion.status 
                && filtercompletion.tags && filtercompletion.hotelcats && filtercompletion.status), filter);
        });

        
    }
    function hashcms() {
        var hashcompletion = { countries: false, tags: false };
        var cms_countries = new common.hashtable.HashTable();
        var cms_tags = new common.hashtable.HashTable();
        var ct_querystream = coreobj.list('Countries').find().stream();
        ct_querystream.on('data', function (cmsdoc) {
            var doc = cmsdoc.toObject();
            if (doc != null && doc.slug != null && doc.slug != '') {
                cms_countries.set(doc.slug, doc);
            }
        });
        ct_querystream.on('error', function (err) {
            console.log(err);
            errorcallback(err);
        });
        ct_querystream.on('close', function (err) {
            hashcompletion.countries = true;
            eventlauncher.done('hash.done', (hashcompletion.countries && hashcompletion.tags), { countries: cms_countries, tags: cms_tags });
        });

        var tg_querystream = coreobj.list('TripTags').find().stream();
        tg_querystream.on('data', function (cmsdoc) {
            var doc = cmsdoc.toObject();
            if (doc != null && doc.slug != null && doc.slug != '') {
                cms_tags.set(doc.slug, doc);
            }
        });
        tg_querystream.on('error', function (err) {
            console.log(err);
            errorcallback(err);
        });
        tg_querystream.on('close', function (err) {
            hashcompletion.tags = true;
            eventlauncher.done('hash.done', (hashcompletion.countries && hashcompletion.tags), { countries: cms_countries, tags: cms_tags });
        });
    }
    
    databuilding(options);
    eventlauncher.on('hash.done', function (hashes) {
        options.cms_countries = hashes.countries;
        options.cms_tags = hashes.tags;
        filterbuilding(options);
    });
    hashcms();

    
}