var _ = require('underscore');
var common = require('yourttoo.common');

module.exports = function (options, callback, errorcallback) { 
    var core = options.core;
    
    var completion = {
        filter: false,
        data: false,
        totalcount: false,
        finded: false
    };
    
    var results = {
        filter: null,
        pager: null
    };
    
    //event complete trigger
    var trigger = function (options) {
        this.conf = options;
        this.name = 'Completed tasks emiter';
        this.done = function (eventname, assertcondition, data) {
            if (assertcondition) {
                this.emit(eventname, data);
            }
        }
    };
    common.eventtrigger.eventtrigger(trigger);
    var eventlauncher = new trigger({ date: new Date(), name: 'list_eventer_' + new Date() });
    //list events listeners...
    eventlauncher.on('data.count', function () {
        completion.totalcount = true;
        eventlauncher.done('all.done', (completion.filter && completion.data & completion.totalcount && completion.finded), results);
    });
    eventlauncher.on('data.finded', function () {
        completion.finded = true;
        eventlauncher.done('all.done', (completion.filter && completion.data & completion.totalcount && completion.finded), results);
    });
    eventlauncher.on('data.done', function (pager) {
        results.pager = pager;
        completion.data = true;
        eventlauncher.done('all.done', (completion.filter && completion.data & completion.totalcount && completion.finded), results);
    });
    eventlauncher.on('filter.done', function (filter) { 
        results.filter = filter;
        completion.filter = true;
        eventlauncher.done('all.done', (completion.filter && completion.data & completion.totalcount && completion.finded), results);
    });
    
    eventlauncher.on('all.done', function (result) {
        if (result.pager != null) {
            console.log('Total items: ' + totalitems);
            console.log('Finded items: ' + finded);
            console.log('Max per page: ' + max);
            result.pager.totalItems = totalitems;
            var cpage = Math.ceil((totalitems - finded) / max);
            result.pager.pages = Math.ceil(totalitems / max);
            var npage = pageconditionway == 'next' ? 1 : 0;
            result.pager.currentpage = cpage + npage;
            (reverselist && result.pager.items != null) ? result.pager.items.reverse() : null;
            (reverselist && codes != null) ? codes.reverse() :  codes;
            result.pager.lastcode = codes[codes.length - 1];
            result.pager.prevcode = codes[0];
        }
        callback(result);
    });
    
    eventlauncher.on('all.error', function (err) { 
        errorcallback(err);
    });

    var mongo = core.mongo;
    var coreobj = core.corebase;
    
    var totalitems = 0;
    var finded = 0;
    var _query = options.query || { _id : { $ne: null } };
    var query = { $and : [_query] };
    var max = options.maxresults || 12;
    var lastcode = options.lastcode;
    var lastcodeprop = options.orderby || '_id';
    
    var fields = options.fields || '*';
    fields = Array.isArray(fields) ? fields.join(' ') : fields;

    var filterfields = options.filterfields;

    var ordinal = options.type || 'asc';
    var pageconditionway = options.page || 'next';
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
                next:  false,
                prev:  true 
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
    pagehash.cursor.asc.next[lastcodeprop] = { $gt: lastcode };
    pagehash.cursor.asc.prev[lastcodeprop] = { $lt: lastcode };
    pagehash.cursor.desc.next[lastcodeprop] = { $lt: lastcode };
    pagehash.cursor.desc.prev[lastcodeprop] = { $gt: lastcode };
    
    pagehash.sorting.asc.next[lastcodeprop] = 1;
    pagehash.sorting.asc.prev[lastcodeprop] = -1;
    pagehash.sorting.desc.next[lastcodeprop] = -1;
    pagehash.sorting.desc.prev[lastcodeprop] = 1;
    
    pagehash.findedpage.asc.next[lastcodeprop] = { $gt: lastcode };
    pagehash.findedpage.asc.prev[lastcodeprop] = { $gte: lastcode };
    pagehash.findedpage.desc.next[lastcodeprop] = { $lt: lastcode };
    pagehash.findedpage.desc.prev[lastcodeprop] = { $lte: lastcode };
    
    var sortcondition = options.sortcondition || pagehash.sorting[ordinal][pageconditionway];
    var pagecondition = options.pagecondition || pagehash.cursor[ordinal][pageconditionway];
    var findedcondition = pagehash.findedpage[ordinal][pageconditionway];
    var reverselist = false || pagehash.reverselist[ordinal][pageconditionway];
    var codes = [];

    function databuilding() { 
        //finded
        coreobj.list(options.collectionname).model.find(query).count(function (err, total) {
            if (err) { console.log(err); }
            totalitems = total;
            eventlauncher.emit('data.count');
        });

        var alldata = [];
        var findedquery = JSON.parse(JSON.stringify(query));
 
        if (lastcode != null && lastcode != '') {
            query.$and.push(pagecondition);
            findedquery.$and.push(findedcondition);
        }
        

        //Get the count for the query complete (paginated)
        coreobj.list(options.collectionname).model.find(findedquery).count(function (err, count) {
            if (err) { console.log(err); }
            finded = count;
            eventlauncher.emit('data.finded');
        });

        console.log(JSON.stringify(query));
        console.log(sortcondition);
        var querystream = coreobj.list(options.collectionname, fields).model.find(query)
        .select(fields)
        .sort(sortcondition)
        .limit(max)
        .stream();
        
        querystream.on('data', function (doc) {
            codes.push(common.utils.getfieldvalue(lastcodeprop, doc));
            alldata.push(doc);
        });
        
        querystream.on('error', function (err) {
            console.log(err);
            errorcallback(err);
        });
        
        querystream.on('close', function () {
            pending = alldata.length;
            var codes = [];
            var result = [];
            if (alldata != null && alldata.length > 0) {
                var page = {
                    totalItems : 0,
                    pages: 0,
                    currentpage : 0,
                    items: alldata
                };

                options.populate == null ? 
                    eventlauncher.emit('data.done', page) //option 1
                    : 
                    coreobj.list(options.collectionname).model.populate(alldata, options.populate, function (err, alldata) { //option 2
                        if (err) { 
                            eventlauncher.emit('all.error', err);
                        } else { 
                            page.items = alldata;
                            eventlauncher.emit('data.done', page);
                        }});
            }
            else {
                eventlauncher.emit('data.done', null);
            }
        });
    }
    
    function filterbuilding() {
        var filter = {
            _date: new Date()
        };
        if (filterfields != null && filterfields.length > 0) {
            var ct = filterfields.length;
            
            var fprom = coreobj.list(options.collectionname).model.find(_query);
            _.each(filterfields, function (field) {
                filter[field] = [];
                fprom.distinct(field, function (err, docs) {
                    if (err) { console.log(err); }
                    docs = docs || [];
                    docs.sort();
                    filter[field] = docs;
                    ct--;
                    if (ct == 0) {
                        eventlauncher.emit('filter.done', filter);
                    }
                });
            });
        }
        else { 
            eventlauncher.emit('filter.done', null);
        }

    }
    function authfiltering() {
        require('../../decorator/query/find')(options,
            function (authquery) {
                console.log(authquery);
                options.query = authquery;
                query = authquery;
                eventlauncher.emit('auth.filt.done');
            },
            function (err) {
                eventlauncher.emit('all.error', err);
            });
        eventlauncher.emit();
    }

    eventlauncher.on('auth.filt.done', function () {
        filterbuilding();
        databuilding();
    });

    authfiltering();
}