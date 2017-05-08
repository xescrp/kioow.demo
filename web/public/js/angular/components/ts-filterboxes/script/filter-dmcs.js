app.controller('filterDMCs', ['$scope',
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
            ts_table_browser.removeQueryTerm('status');

            ts_table_browser.removeQueryTerm('membership.b2bchannel');
            ts_table_browser.removeQueryTerm('membership.b2cchannel');

            ts_table_browser.removeQueryTerm('membership.toursmultidays');
            ts_table_browser.removeQueryTerm('membership.tailormade');
            ts_table_browser.removeQueryTerm('membership.groups');
            ts_table_browser.removeQueryTerm('$like');

            ts_table_browser.removeQueryTerm('company.operatein.operateLocation.countrycode');

            console.log(ts_table_browser.queryconditions);

            //status
            var statusfilt = [];
            $scope.selectedFilters.status.confirmed ? statusfilt.push('confirmed') : null;
            $scope.selectedFilters.status.valid ? statusfilt.push('valid') : null;
            $scope.selectedFilters.status.waiting ? statusfilt.push('waiting') : null;
            statusfilt != null && statusfilt.length > 0 ? ts_table_browser.pushQueryTerm('status', { $in: statusfilt }) : null;

            //channels
            if (!$scope.selectedFilters.channels.b2bchannel && !$scope.selectedFilters.channels.b2cchannel) {
                console.log('filter null for channel...');
            } else {
                ts_table_browser.pushQueryTerm('membership.b2bchannel', $scope.selectedFilters.channels.b2bchannel);
                ts_table_browser.pushQueryTerm('membership.b2cchannel', $scope.selectedFilters.channels.b2cchannel);
            }

            //segments
            if (!$scope.selectedFilters.segments.toursmultidays &&
                !$scope.selectedFilters.segments.tailormade &&
                !$scope.selectedFilters.segments.groups) {
                console.log('filter null for segment');
            }
            else {
                ts_table_browser.pushQueryTerm('membership.toursmultidays', $scope.selectedFilters.segments.toursmultidays);
                ts_table_browser.pushQueryTerm('membership.tailormade', $scope.selectedFilters.segments.tailormade);
                ts_table_browser.pushQueryTerm('membership.groups', $scope.selectedFilters.segments.groups);
            }
            
            //countries operate in
            var qcountries = [];
            $scope.selectedFilters.selectedcountries != null && $scope.selectedFilters.selectedcountries.length > 0 ?
                _.each($scope.selectedFilters.selectedcountries, function (ct) {
                    qcountries.push(ct.countrycode);
                }) : null;
            qcountries != null && qcountries.length > 0 ?
                ts_table_browser.pushQueryTerm('company.operatein.operateLocation.countrycode', { $in: qcountries }) : null;
        }

        $scope.selectedFilters = {
            countries: _.map(destinations_service.countries, function (ct) { return { country: ct.label_en, countrycode: ct.slug.toUpperCase() } }),
            selectedcountries: [],
            status: {
                confirmed : false,
                valid : false,
                waiting : false
            },
            channels : {
                b2bchannel : false,
                b2cchannel : false
            },
            segments : {
                toursmultidays : false,
                tailormade : false,
                groups : false
            }
        };

        $scope.filterchanged = function () {
            buildfilter();
            ts_table_browser.goPage(null, 0);
        }


        

        $scope.textSearch = '';

        $scope.textsearch = function () {
            var queryText = {
                $like: [{ 'code': $scope.textSearch },
                    { 'name': $scope.textSearch },
                    { 'company.name': $scope.textSearch },
                    { 'company.legalname': $scope.textSearch },
                    { 'company.operatein.operateLocation.country': $scope.textSearch },
                    { 'contact.email': $scope.textSearch },
                    { 'tags.label': $scope.textSearch }]
            };
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.pushQueryTerm('$like', queryText.$like);
            ts_table_browser.goPage(null, 0);
        }

        console.log(destinations_service);

    }]);