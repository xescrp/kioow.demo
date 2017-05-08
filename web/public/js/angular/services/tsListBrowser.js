app.service("ts_table_browser",
    function ($rootScope,
        yto_api,
        tools_service,
        modals_service,
        destinations_service,
        Notification) {

            console.log('instance os tablebrowser...');
            function cancelevent(e) {
                if (!e)
                    e = window.event;

                //IE9 & Other Browsers
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                //IE8 and Lower
                else {
                    e.cancelBubble = true;
                }
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }

            function buildRequest(query, visitor, pagenumber) {
                var request = {
                    query: query,
                    fields: tstablebrowser.fields,
                    populate: tstablebrowser.populate,
                    collectionname: tstablebrowser.collection,
                    maxresults: tstablebrowser.maxresults,
                    orderby: tstablebrowser.orderby || 'createdOn',
                    type: tstablebrowser.sorting || 'asc',
                    page: pagenumber,
                };
                visitor != null ? request.visitor = visitor : null;
                visitor != null ? request.maxresults = 100 : null;
                return request;
            }

            function _setConfig(config) {
                tstablebrowser.collection = config.collectionname;
                tstablebrowser.maxresults = config.maxresults;
                tstablebrowser.orderby = config.orderby;
                tstablebrowser.sorting = config.sorting;
                tstablebrowser.fields = config.fields;
                tstablebrowser.populate = config.populate;
            }

            var hst = {
                'Affiliate': 'Users',
                'DMCs': 'Users'
            };

            function _checkallowdeletion(collection, item, callback) {
                var hs = {
                    'Affiliate': {
                        relatedcollections: ['Bookings2', 'UserQueries'],
                        queries: {
                            Bookings2: { affiliate: item._id },
                            UserQueries: { affiliate: item._id }
                        },
                        erasecollection: 'Users'
                    },
                    'DMCs': {
                        relatedcollections: ['Bookings2', 'UserQueries', 'DMCProducts'],
                        queries: {
                            Bookings2: { dmc: item._id },
                            UserQueries: { dmc: item._id },
                            DMCProducts: { dmc: item._id }
                        },
                        erasecollection: 'Users'
                    }
                };
                var messagesnotallowed = [];
                
                var series = [];
                var terms = hs[collection];
                
                var results = [];

                terms != null ? _.each(terms.relatedcollections, function (coll) {
                    series.push(function (fcallback) {
                        var query = {
                            collectionname: coll,
                            query: terms.queries[coll],
                            maxresults: 5
                        };

                        var rq = {
                            command: 'find',
                            service: 'api', request: query
                        }
                        var rqCB = yto_api.send(rq);
                        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                            var result = !(rsp != null && rsp.length > 0);
                            messagesnotallowed.push(coll + ': ' + rsp.length);
                            fcallback(null, result);
                        });
                        //on response noOk
                        rqCB.on(rqCB.onerroreventkey, function (err) {

                            console.error(err);
                            Notification.error({
                                message: err, title: 'Error al eliminar'
                            });
                            fcallback(err, false);
                        });

                    });

                }) : null;
                series != null && series.length > 0 ?
                    async.series(series, function (err, result) {
                        callback(_.every(result, function (rs) { return rs; }), messagesnotallowed);
                    }) :
                    callback(true);
            }

            function _remove(item, callback) {

                var req = {
                    query: { _id: item._id },
                    collection: tstablebrowser.collection,
                    enabled: true
                };
                tools_service.showPreloader($rootScope, "show");
                var rq = {
                    command: 'erase',
                    service: 'api',
                    request: req
                };
                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    tools_service.showPreloader($rootScope, "hide");
                    Notification.success({
                        message: 'Se ha eliminado correctamente ' + item._id, title: 'Exito al eliminar'
                    })
                    callback != null ? callback(null, rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($rootScope, "hide");
                    console.error(err);
                    Notification.error({
                        message: err, title: 'Error al eliminar'
                    });
                    callback != null ? callback(err, null) : null;

                });

                return rqCB;
            }

            function _deleteItem(item, $event, callback) {
                console.log($event);
                cancelevent();
                var t = hst[tstablebrowser.collection];
                var erasecoll = t != null && t != '' ? t : tstablebrowser.collection;
                modals_service.showconfirmationmodal(null, $rootScope, function (rs) {
                    rs ? _checkallowdeletion(tstablebrowser.collection, item, function (confirm, messagesnotallowed) {
                        console.log('item confirm delete: ', confirm);

                        confirm ? _remove(item, function () {
                            tstablebrowser.currentitems = _.filter(tstablebrowser.currentitems, function (titem) { return titem._id != item._id; });
                        }) : Notification.error({
                            message: 'No se puede eliminar este elemento, hay otros elementes dependientes o relacionados con el. Elimine previamente los elementos dependientes.<br />' + 
                            messagesnotallowed.join('<br />'),
                            title: 'No se puede eliminar'
                        });

                    }) : null;
                });
                
            }

            function _setCollection(collectionname) {
                tstablebrowser.collection = collectionname;
            }

            function _goPage(pagequery, pagenumber, callback, errorcallback) {
                tools_service.showPreloader($rootScope, 'show');

                tstablebrowser.currentquery = pagequery != null ? pagequery : getCurrentQuery();
                var visitor = null;
                _.each(tstablebrowser.currentquery.$and, function (term) {
                    var keys = _.keys(term);
                    visitor = keys.indexOf('$like') == -1 ? null : 'like2';
                });
                var query = buildRequest(tstablebrowser.currentquery, visitor, pagenumber);

                var rq = {
                    command: 'list2',
                    service: 'api',
                    request: query
                };
                console.log(rq);
                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (results) {

                    if (results && results.pager != null) {
                        tstablebrowser.currentitems = results.pager.items;

                        tstablebrowser.currentpage = results.pager.currentpage + 1;
                        tstablebrowser.totalitems = results.pager.totalItems;
                        tstablebrowser.pages = results.pager.pages;
                    }

                    callback != null ? callback(results) : null;
                    tools_service.showPreloader($rootScope, 'hide');
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($rootScope, "hide");
                    tools_service.showConectionError($rootScope, "show");
                    console.log(err);
                    errorcallback != null ? errorcallback(err) : null;
                });

            }
            var defaultcondition = { _id: { $ne: null } };

            function getCurrentQuery() {
                var conditions = (tstablebrowser != null &&
                    tstablebrowser.queryconditions != null &&
                    tstablebrowser.queryconditions.length > 0) ?
                    tstablebrowser.queryconditions : [defaultcondition];

                return { $and: conditions };
            }

            function removeterm(field) {
                var removecond = _.filter(tstablebrowser.queryconditions, function (cond) {
                    var keep = true;
                    var props = _.keys(cond, function (prop) { return prop; });
                    keep = props.indexOf(field) == -1;
                    return keep;
                });
                tstablebrowser.queryconditions = removecond;
            };

            function _setSorting(field, direction) {
                var oldorderby = tstablebrowser.orderby.toString();
                direction = direction || tstablebrowser.sorting;
                tstablebrowser.orderby = field;
                if (oldorderby == tstablebrowser.orderby) {
                    direction = tstablebrowser.sorting == 'asc' ? 'desc' : 'asc';
                }
                tstablebrowser.sorting = direction;
                _goPage(null, tstablebrowser.currentpage - 1);
            }

            function pushterm(field, query) {
                console.log('push term to query...');
                var condition = {}
                condition[field] = query;
                console.log(condition);
                tstablebrowser.queryconditions.push(condition);
                tstablebrowser.currentquery = getCurrentQuery();
            }

            var tstablebrowser = {
                setConfig: _setConfig,
                collection: '',
                maxresults: 12,
                currentpage: 0,
                currentitems: null,
                currentquery: getCurrentQuery(),
                queryconditions: [{ _id: { $ne: null } }],
                defaultcondition: defaultcondition,
                pages: 0,
                totalitems: 0,
                orderby: 'createdOn',
                sorting: 'asc',
                fields: null,
                populate: null,
                deleteItem: _deleteItem,
                goPage: _goPage,
                setSorting: _setSorting,
                setCollection: _setCollection,
                pushQueryTerm: pushterm,
                removeQueryTerm: removeterm,
                paginationhook: function () {
                    var pagenum = tstablebrowser.currentpage > 1 ? tstablebrowser.currentpage - 1 : 0;
                    console.log('cambio pagina...' + pagenum);
                    _goPage(null, pagenum);
                }
            };
            return tstablebrowser;
});