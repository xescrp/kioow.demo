app.directive("selectdmc", [
    '$location',
    'yto_api',
    'yto_session_service',
    '$rootScope',
    'tools_service',
    '$log',
    '$filter',
    '$http',
    'toaster',
    'ts_table_browser',
    function (
        $location,
        yto_api,
        yto_session_service,
        $rootScope,
        tools_service,
        $log,
        $filter,
        $http,
        toaster,
        ts_table_browser) {

        return {
            templateUrl: '/js/angular/directives/views/select-dmc-program.html?d=' + new Date(),
            scope: {
                dmclist: '=dmclist',
                onlydmc: '=onlydmc',
                singlecopy: '=singlecopy',
                dmc: '=dmc'
            },
            link: function ($scope, el, attrs) {
                $scope.saveas = '';
                $scope.getimage = function (url, imagename) {
                    return tools_service.cloudinaryUrl(url, imagename);
                };
                $scope.onlydmc = $scope.onlydmc || false;
                $scope.rolename = loginsession.user.rolename;

                $scope.selectionfilters = {
                    dmcs: $scope.dmclist,
                    selecteddmcs: [],
                    programs: [],
                    selectedprogram: [],
                };
                
                $scope.filterchanged = function () {
                    ($scope.selectionfilters.selecteddmcs != null && $scope.selectionfilters.selecteddmcs.length > 0) ? recoverprograms() : $scope.selectionfilters.programs = [];
                }

                $scope.textSearch = '';

                $scope.textsearch = function () {
                    var queryText = {
                        $like: [{ 'code': $scope.textSearch },
                            { 'name': $scope.textSearch },
                            { 'title': $scope.textSearch },
                            { 'title_es': $scope.textSearch },
                            { 'description': $scope.textSearch },
                            { 'description_es': $scope.textSearch },
                            { 'itinerary.description_en': $scope.textSearch },
                            { 'itinerary.description_es': $scope.textSearch }]
                    };
                    ts_table_browser.removeQueryTerm('$like');
                    ts_table_browser.pushQueryTerm('$like', queryText.$like);
                    ts_table_browser.goPage(null, 0);
                }

                $scope.imageproductstretch = function(url) {
                    if ("undefined" != typeof url) {
                        var cl_transform = "cs_no_cmyk/w_70,h_70,c_fill,g_face,q_90/",
                            urlparts = url.split("/");
                        return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
                    }
                    return url;
                }

                $scope.newprogram = function (dmccode) {
                    console.log('open edit new program for dmc ' + dmccode);
                    dmccode != null && dmccode != '' ?
                        location.href = '/edit/program?dmccode=' + dmccode : null;
                }
                $scope.copyprogram = function (programcode) {
                    console.log('open copy for program ' + programcode);
                    if ($scope.saveas != '') {
                        programcode != null && programcode != '' ?
                            location.href = '/edit/program?copyprogram=' + programcode + '&saveas=' + $scope.saveas : null;
                    } else { alert('You must complete the \"save as\" field first'); }
                }

                $scope.accesurl = function (url) {
                    location.href = url;
                }

                function recoverprograms(callback) {
                    var qdmcs = [];
                    _.each($scope.selectionfilters.selecteddmcs, function (dmc) {
                        qdmcs.push(dmc._id);
                    });
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { $and: [{ dmc: { $in: qdmcs } }, { 'categoryname.categorybehaviour': { $ne: 'child' } }] },
                            sortcondition: { 'title': 1, title_es: 1 },
                            populate: [{ path: 'dmc', select: '_id code name company.name membership.pvp membership.b2bcommission currency' }],
                            fields: '_id code name title title_es name productimages publishState updatedOn slug slug_es itinerarylength pvp productimage dmc categoryname',
                            collectionname: 'DMCProducts'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.selectionfilters.programs = rsp;
                        console.log(rsp);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });

                }

                function recoveroneprogram(code) {
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'findone',
                        service: 'api',
                        request: {
                            query: { code: code },
                            populate: [
                                { path: 'dmc', select: '_id code name company.name membership.pvp membership.b2bcommission currency' },
                                { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'stopcities' }, { path: 'departurecity' }],
                            collectionname: 'DMCProducts'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        rsp != null ? (delete rsp['_id'], delete rsp['code'], delete rsp['parent'], $scope.$broadcast('program.singlecopy.done', rsp)) : null;
                        console.log(rsp);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                }

                function recoverdmcs(callback) {
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { code: { $ne: null } },
                            sortcondition: { 'company.name': 1 },
                            fields: '_id code name company.name company.legalname status',
                            collectionname: 'DMCs'
                        }
                    };

                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        tools_service.showPreloader($scope, 'hide');
                        $scope.selectionfilters.dmcs = rsp;
                        callback != null ? callback() : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, 'hide');
                        console.log(err);
                        callback != null ? callback() : null;
                    });
                }

                $scope.selectionfilters.dmcs == null ? recoverdmcs() : null;
                
                loginsession.user.rolename == 'dmc' ? $scope.selectionfilters.selecteddmcs.push(loginsession.dmc) : null;
                loginsession.user.rolename == 'dmc' ? (recoverprograms()) : null;
                console.log($scope.dmc);
                $scope.dmc != null ? $scope.rolename = 'dmc' : null;
                $scope.dmc != null ? $scope.selectionfilters.selecteddmcs.push($scope.dmc) : null;
            }
            
        };

        

    }]);