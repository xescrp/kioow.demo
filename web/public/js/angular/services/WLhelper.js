app.service('whitelabelhelpers', function ($rootScope, tools_service, yto_api) {

    var wlservice = {
        defaultTemplate: null,
        defaultWLTemplate: function (callback, errorcallback) {
            return this.findoneWLCustom({ code: 'default_wl' }, callback, errorcallback);
        },
        newBlankWLCustom: function (affiliate) {
            if (affiliate == null) { throw 'The affiliate parameter can not be null' }
            return {
                code: affiliate.code,
                name: [affiliate.name, ' custom wl template'].join(' '),
                css: affiliate.wlcustom.css,
                web: affiliate.wlcustom.web
            };
        },
        saveWLCustom: function (wlcustom, callback, errorcallback) {
            if (wlcustom == null) { throw 'The White label customization parameter can not be null' }

            var rq = {
                command: 'save',
                service: 'api',
                request: {
                    data: wlcustom,
                    query: { code: wlcustom.code },
                    collectionname: 'WLCustomizations'
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
        findoneWLCustom: function (query, callback, errorcallback) {
            if (query == null) { throw 'The query parameter can not be null' }
            var rq = {
                command: 'findone',
                service: 'api',
                request: {
                    query: query,
                    collectionname: 'WLCustomizations'
                }
            };
            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                callback != null ? callback(rsp) : null;
            });
            rqCB.on(rqCB.onerroreventkey, function (err) {
                errorcallback != null ? errorcallback(err) : null;
            });

            return rqCB;
        },
        findWLCustom: function (query, callback, errorcallback) {
            if (query == null) { throw 'The query parameter can not be null' }
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: query,
                    collectionname: 'WLCustomizations'
                }
            };
            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                callback != null ? callback(rsp) : null;
            });
            rqCB.on(rqCB.onerroreventkey, function (err) {
                errorcallback != null ? errorcallback(err) : null;
            });

            return rqCB;
        }
    };

    wlservice.defaultWLTemplate(function (template) {
        wlservice.defaultTemplate = template;
        console.log('recovered wl def. template');
        console.log(template);
        $rootScope.$broadcast('whitelabel.helper.ready');
    }, function (err) { });
    
    return wlservice;
});