app.controller('filterAffiliates', ['$scope',
    '$location',
    'yto_api',
    'yto_session_service',
    '$rootScope',
    'tools_service',
    'destinations_service',
    '$log',
    '$filter',
    '$http',
    'toaster',
    'ts_table_browser',
    function ($scope,
        $location,
        yto_api,
        yto_session_service,
        $rootScope,
        tools_service,
        destinations_service,
        $log,
        $filter,
        $http,
        toaster,
        ts_table_browser) {

        function buildfilter() {

            ts_table_browser.removeQueryTerm('membership.registervalid');
            ts_table_browser.removeQueryTerm('membership.registervalid');
            ts_table_browser.removeQueryTerm('company.group');

            ts_table_browser.removeQueryTerm('$like');

            ts_table_browser.removeQueryTerm('company.location.countrycode');
            ts_table_browser.removeQueryTerm('company.location.stateorprovince');

            console.log(ts_table_browser.queryconditions);

            //status
            var statusfilt = [];
            $scope.selectedFilters.status.valid ? ts_table_browser.pushQueryTerm('membership.registervalid', true) : null;
            $scope.selectedFilters.status.waiting ? ts_table_browser.pushQueryTerm('membership.registervalid', false) : null;

            //groups
            var qgroups = [];
            $scope.selectedFilters.selectedgroups != null && $scope.selectedFilters.selectedgroups.length > 0 ?
                _.each($scope.selectedFilters.selectedgroups, function (ct) {
                    qgroups.push(ct.name);
                }) : null;
            qgroups != null && qgroups.length > 0 ?
                ts_table_browser.pushQueryTerm('company.group', { $in: qgroups }) : null;

            //countries operate in
            var qcountries = [];
            $scope.selectedFilters.selectedcountries != null && $scope.selectedFilters.selectedcountries.length > 0 ?
                _.each($scope.selectedFilters.selectedcountries, function (ct) {
                    qcountries.push(ct.countrycode.toUpperCase());
                }) : null;
            qcountries != null && qcountries.length > 0 ?
                ts_table_browser.pushQueryTerm('company.location.countrycode', { $in: qcountries }) : null;

            $scope.selectedFilters.selectedprovinces != null && $scope.selectedFilters.selectedprovinces.length > 0 ?
                ts_table_browser.pushQueryTerm('company.location.stateorprovince', { $in: $scope.selectedFilters.selectedprovinces }) : null;
        }

        $scope.selectedFilters = {
            countries: _.map(destinations_service.countries, function (ct) { return { country: ct.label_en, countrycode: ct.slug.toUpperCase() } }),
            selectedcountries: [],
            provinces: [],
            selectedprovinces: [],
            groups: [],
            selectedgroups: [],
            status: {
                valid : false,
                waiting : false
            }
        };

        $scope.filterchanged = function () {
            buildfilter();
            ts_table_browser.goPage(null, 0);
        }

        
        $scope.textSearch = '';

        $scope.textsearch = function () {
            var queryText = {
                $like: [
                    { 'code': $scope.textSearch },
                    { 'name': $scope.textSearch },
                    { 'company.group': $scope.textSearch },
                    { 'company.legalname': $scope.textSearch },
                    { 'company.name': $scope.textSearch },
                    { 'contact.firstname': $scope.textSearch },
                    { 'contact.email': $scope.textSearch },
                    { 'contact.lastname': $scope.textSearch },
                    { 'company.location.city': $scope.textSearch },
                    { 'company.location.country': $scope.textSearch }
                ]
            };
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.pushQueryTerm('$like', queryText.$like);
            ts_table_browser.goPage(null, 0);
        }

        function getprovinces(callback, errorcallback) {
            var rq = {
                command: 'distinct',
                service: 'api',
                request: {
                    query: { slug: { $ne: null } },
                    fields: ['company.location.stateorprovince'],
                    sortcondition: { 'company.location.stateorprovince': 1 },
                    collectionname: 'Affiliate'
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

        function getgroups(callback, errorcallback) {
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { slug: { $ne: null } },
                    sortcondition: { sortOrder: 1 },
                    fields: 'slug name',
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

        }

        $scope.cleanandrefresh = function () {
            var groups = $scope.selectedFilters.groups;

            $scope.selectedFilters = {
                countries: _.map(destinations_service.countries, function (ct) { return { country: ct.label_en, countrycode: ct.slug.toUpperCase() } }),
                provinces: $scope.provinces,
                selectedprovinces: [],
                selectedcountries: [],
                groups: groups,
                selectedgroups: [],
                status: {
                    valid: false,
                    waiting: false
                }
            };

            $scope.filterchanged();
        }

        getgroups(function (groups) {
            $scope.selectedFilters.groups = groups;
        });

        getprovinces(function (provinces) {
            $scope.selectedFilters.provinces = _.sortBy(provinces['company.location.stateorprovince'], function (prov) { return prov; });
        });
    }]);