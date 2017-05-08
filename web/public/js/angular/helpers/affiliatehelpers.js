app.service('affiliatehelpers', function (tools_service, yto_api) {
    return {
        getGroupsList: function (callback, errorcallback) { 
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { slug: { $ne : null }},
                    sortcondition: {sortOrder: 1},
                    fields : 'slug name',
                    collectionname: 'ManagementGroup'
                }
            };

            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                callback != null ? callback(rsp) : null;
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                errorcallback != null ? errorcallback(err) : null;
            });

            return rqCB;  
            
        },
        getCountryList: function (callback, errorcallback) { 
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { slug: { $ne : null }},
                    fields : 'slug label_es location',
                    collectionname: 'Countries'
                }
            };

            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                callback != null ? callback(rsp) : null;
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                errorcallback != null ? errorcallback(err) : null;
            });

            return rqCB;  
            
        }
    }
});