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
        coreobj.list('Bookings').model.find(query).count(function (err, total) {
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
        var itemsperpage = 12;
        if (conf.itemsperpage != undefined && conf.itemsperpage != null) {
            itemsperpage = conf.itemsperpage;
        }
        //Get the count for the query complete (paginated)
        coreobj.list('Bookings').model.find(query).count(function (err, count) {
            if (err) { console.log(err); }
            finded = count;
        });
        //ready to query
        var querystream = coreobj.list('Bookings').model.find(query)
        .populate('dmc', 'id _id name code company.name company.legalname images membership')
        .populate('traveler')
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
            status : [],
            products : [],
            codes: []
        };
        var filtercompletion = {
            dmcs: false,
            travelers: false,
            status: false,
            products: false,
            codes: false
        };
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
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
                });
            } else {
                filtercompletion.dmcs = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.products && 
                            filtercompletion.codes), 
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
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
                });
            }
            else {
                filtercompletion.travelers = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
            }
        })
            .distinct('status', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.status = docs;
            }
            filtercompletion.status = true;
            eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
        })
            .distinct('productDmc', 
                function (err, docs) {
            if (err) {
                console.log(err);
            }
            if (docs != null && docs.length > 0) {
                filter.products = docs;
                coreobj.list('dmcproducts').model.find({ _id : { $in: docs } }, { code: 1, _id: 1 })
                .exec(function (err, products) {
                    if (err) { console.log(err); }
                    filter.products = products;
                    filtercompletion.products = true;
                    eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
                })
            }
            else {
                filtercompletion.products = true;
                eventlauncher.done('filter.done', 
                        (filtercompletion.dmcs && 
                            filtercompletion.travelers && 
                            filtercompletion.status && 
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
            }
        })
            .distinct('idBooking', 
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
                            filtercompletion.products && 
                            filtercompletion.codes), 
                        filter);
        });
    }
    
    
    databuilding(options);
    filterbuilding(options);
}