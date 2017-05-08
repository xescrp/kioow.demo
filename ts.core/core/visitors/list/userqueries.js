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
        var allbookings = [];
        var finded = 0;
        var pending = 0;
        var totalitems = 0;
        
        var listname = conf.listname; //names: dmcproducts, bookings, userqueries, dmcqueries
        
        var query = require('../factory/querybuilder').querylistbuilding(listname, conf);
        
        //finded
        coreobj.list('UserQueries').model.find(query).count(function (err, total) {
            if (err) { console.log(err); }
            totalitems = total;
        });
        
        //pagination and sorting
        var sortcondition = { createdonindexing: -1 };
        var pagecondition = null;
        var lastcodeprop = 'createdonindexing';
        
        if (conf.order != null && conf.order != '') {
            switch (conf.order) {
                case 'created':
                    lastcodeprop = 'createdonindexing';
                    sortcondition = {};
                    sortcondition[lastcodeprop] = -1;
                    break;
                case 'tourdate':
                    lastcodeprop = 'startdateindexing';
                    sortcondition = {};
                    sortcondition[lastcodeprop] = -1;
                    break;
            }
        }
        
        if (conf.type != null && conf.type != '') {
            if (conf.type == 'asc') {
                sortcondition[lastcodeprop] = -1;
            }
            else {
                sortcondition[lastcodeprop] = 1;
            }
        }
        if (conf.lastcode != null && conf.lastcode != '') {
            pagecondition = {
            };
            if (conf.page != null && conf.page != '') {
                switch (conf.page) {
                    case 'next':
                        if (sortcondition[lastcodeprop] == -1) {
                            pagecondition[lastcodeprop] = { $lt: conf.lastcode };
                            query.$and.push(pagecondition);
                        }
                        else {
                            pagecondition[lastcodeprop] = { $gt: conf.lastcode };
                            query.$and.push(pagecondition);
                        }
                        
                        break;
                    case 'prev':
                        if (sortcondition[lastcodeprop] == -1) {
                            pagecondition[lastcodeprop] = { $gt: conf.lastcode };
                            query.$and.push(pagecondition);
                        }
                        else {
                            pagecondition[lastcodeprop] = { $lt: conf.lastcode };
                            query.$and.push(pagecondition);
                        }
                        break;
                }
            }
            else {
                pagecondition[lastcodeprop] = { $lt: conf.lastcode }
                query.$and.push(pagecondition);
            }
        }
        
        //set the populate for quotes:
        var populateQuotes = {
            path: 'quotes',
            //match: { dmccode: conf.filter.dmccode },
            select: 'code status dmccode'
        }
        if (conf.dmccode != null && conf.dmccode != null) {
            populateQuotes.match = { dmccode: conf.dmccode }
        }

        var itemsperpage = 12;
        if (conf.itemsperpage != undefined && conf.itemsperpage != null) {
            itemsperpage = conf.itemsperpage;
        }
        //Get the count for the query complete (paginated)
        coreobj.list('UserQueries').model.find(query).count(function (err, count) {
            if (err) { console.log(err); }
            finded = count;
        });
        //ready to query
        var querystream = coreobj.list('UserQueries').model.find(query)
        .populate('traveler')
        .populate(populateQuotes)
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
            pending = allbookings.length;
            var result = [];
            if (allbookings != null && allbookings.length > 0) {
                _.each(allbookings, function (doc) {
                    
                    codes.push(doc[lastcodeprop]);
                    pending--;
                    
                    var cpage = (totalitems - finded) / 12;
                    if (pending == 0) {
                        if (sortcondition[lastcodeprop] == 1 && conf.type == 'asc') {
                            allbookings.reverse();
                            codes.reverse();
                        }
                        
                        var cpage = (totalitems - finded) / 12;
                        var page = {
                            totalItems : totalitems,
                            pages: Math.ceil(totalitems / 12),
                            currentpage : cpage,
                            lastcode : codes[codes.length - 1],
                            items: allbookings
                        };
                        eventlauncher.emit('data.done', page);
                    }

                });
            }
            else {
                eventlauncher.emit('data.done', null);
            }
        });
    }

    function filterbuilding(conf) {
        var filter = {
            dmcs : [],
            travelers : [],
            state : [],
            codes : [],
            destinations: []
        };
        var filtercompletion = {
            dmcs: false,
            travelers: false,
            status: false,
            codes: false,
            destinations: false
        };
        var query = { $and: [{ code: { $ne: null } }] };
        if (conf.dmcs != null && conf.dmcs != '') {
            var q = { 'dmcs' : { $in: conf.filter.dmcs.split(',') } };
            // var q = { 'dmcs' :  conf.filter.dmcs };         
            query.$and.push(q);
        }
        coreobj.list('Bookings').model.find(query)
        .distinct('dmc', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.dmcs = docs;
                coreobj.list('dmcs').model.find({ _id : { $in: docs } }, { "name": 1, "code": 1, "_id": 1 })
                .exec(function (err, dmcs) {
                    if (err) { console.log(err); }
                    filter.dmcs = dmcs;
                    filtercompletion.dmcs = true;
                    eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
                });
            } else {
                filtercompletion.dmcs = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
            }
        })
            .distinct('traveler', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.travelers = docs;
                coreobj.list('Travelers').model.find({ _id : { $in: docs } }, { code: 1, _id: 1, firstname: 1, lastname: 1, email: 1 })
                .exec(function (err, travelers) {
                    if (err) { console.log(err); }
                    filter.travelers = travelers;
                    filtercompletion.travelers = true;
                    eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
                });
            }
            else {
                filtercompletion.travelers = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
            }
        })
            .distinct('state', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.state = docs;
            }
            filtercompletion.status = true;
            eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
        })
            .distinct('destinations.countrycode', 
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
                        
                        hashdestinations.set(ct.code, cmt);
                    }

                }
                filter.destinations = hashdestinations.values();
                filtercompletion.destinations = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
            }
            else {
                filtercompletion.destinations = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
            }
        })
            .distinct('code', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.codes = docs;
            }
            filtercompletion.codes = true;
            eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.codes && 
                            filtercompletion.destinations), 
                        filter);
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