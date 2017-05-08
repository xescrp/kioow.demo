app.controller('filterProducts', ['$scope',
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
    'modals_service',
    '$uibModal',
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
        modals_service,
        $uibModal,
        ts_table_browser) {

        $scope.mindays = 1;
        $scope.maxdays = 40;
        $scope.rolename = loginsession.user.rolename;

        console.log('initializing slider...');
        var durationSlider = new Slider("#programlengthSlider", {
            // initial options object
            min: $scope.mindays,
            max: $scope.maxdays,
            step: 1,
            value: [$scope.mindays, $scope.maxdays]
        });

        //triger event price slider change
        durationSlider.on('slideStop', function (slideEvt) {
            //console.log ('1on slideStop event, value: ',priceSlider.getValue());
            console.log('on slideStop event, value: ', slideEvt);
            var d = durationSlider.getValue();
            d.sort(function (a, b) { return b - a; });

            $scope.selectedFilters.duration.max = d[0];
            $scope.selectedFilters.duration.min = d[1];
            $scope.filterchanged();
        });

        var durationSliderDMC = new Slider("#programlengthSliderDMC", {
            // initial options object
            min: $scope.mindays,
            max: $scope.maxdays,
            step: 1,
            value: [$scope.mindays, $scope.maxdays]
        });

        //triger event price slider change
        durationSliderDMC.on('slideStop', function (slideEvt) {
            //console.log ('1on slideStop event, value: ',priceSlider.getValue());
            console.log('on slideStop event, value: ', slideEvt);
            var d = durationSliderDMC.getValue();
            d.sort(function (a, b) { return b - a; });

            $scope.selectedFilters.duration.max = d[0];
            $scope.selectedFilters.duration.min = d[1];
            $scope.filterchanged();
        });


        durationSlider.on('change', function (slideChangeEvt) {
            //console.log ('1on slideStop event, value: ',priceSlider.getValue());
            //console.log('on change event, value: ', slideChangeEvt);
        });   

        $scope.getimage = function (url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };

        function buildfilter() {
            ts_table_browser.removeQueryTerm('publishState');

            ts_table_browser.removeQueryTerm('itinerarylength');
            ts_table_browser.removeQueryTerm('itinerarylength');
            ts_table_browser.removeQueryTerm('sleepcountry');
            ts_table_browser.removeQueryTerm('$like');

            ts_table_browser.removeQueryTerm('dmc');

            console.log(ts_table_browser.queryconditions);

            //status
            var statusfilt = [];
            $scope.selectedFilters.duration.min > 1 ? ts_table_browser.pushQueryTerm('itinerarylength', { $gte: $scope.selectedFilters.duration.min }) : null;
            $scope.selectedFilters.duration.max < 40 ? ts_table_browser.pushQueryTerm('itinerarylength', { $lte: $scope.selectedFilters.duration.max }) : null;

            $scope.selectedFilters.status.published ? statusfilt.push('published') : null;
            $scope.selectedFilters.status.publishednodates ? statusfilt.push('published.noavail') : null;
            $scope.selectedFilters.status.underreview ? statusfilt.push('under review') : null;
            $scope.selectedFilters.status.unpublished ? statusfilt.push('unpublished') : null;
            $scope.selectedFilters.status.draft ? statusfilt.push('draft') : null;


            statusfilt != null && statusfilt.length > 0 ? ts_table_browser.pushQueryTerm('publishState', { $in: statusfilt }) : null;

            //countries operate in
            var qcountries = [];
            $scope.selectedFilters.selectedcountries != null && $scope.selectedFilters.selectedcountries.length > 0 ?
                _.each($scope.selectedFilters.selectedcountries, function (ct) {
                    console.log(ct);
                    qcountries.push(ct.id);
                }) : null;
            qcountries != null && qcountries.length > 0 ? 
                ts_table_browser.pushQueryTerm('sleepcountry', { $in: qcountries }) : null;
            //countries operate in
            var qdmcs = [];
            $scope.selectedFilters.selecteddmcs != null && $scope.selectedFilters.selecteddmcs.length > 0 ?
                _.each($scope.selectedFilters.selecteddmcs, function (dmc) {
                    qdmcs.push(dmc._id);
                }) : null;
            qdmcs != null && qdmcs.length > 0 ?
                ts_table_browser.pushQueryTerm('dmc', { $in: qdmcs }) : null;

        }

        $scope.selectedFilters = {
            countries: _.map(destinations_service.countries,
                function (ct) { return { country: ct.label_en, countrycode: ct.slug.toUpperCase(), id: ct._id } }),
            selectedcountries: [],
            dmcs: [],
            selecteddmcs: [],
            status: {
                published : false,
                publishednodates : false,
                underreview: false,
                unpublished: false,
                draft: false
            },
            duration: {
                min: 1,
                max:40
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
                    { 'title': $scope.textSearch },
                    { 'title_es': $scope.textSearch },
                    { 'description': $scope.textSearch },
                    { 'description_es': $scope.textSearch },
                    { 'itinerary.description_en': $scope.textSearch },
                    { 'itinerary.description_es': $scope.textSearch },
                    { 'dmcindexing': $scope.textSearch },
                    { 'dmccode': $scope.textSearch },
                    { 'destinationindexing': $scope.textSearch }]
            };
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.pushQueryTerm('$like', queryText.$like);
            ts_table_browser.goPage(null, 0);
        }


        function recoverdmcs(callback) {
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { code: { $ne: null } },
                    sortcondition: { 'company.name': 1 },
                    fields: '_id code name company.name company.legalname status currency',
                    collectionname: 'DMCs'
                }
            };

            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                $scope.selectedFilters.dmcs = rsp;
                callback != null ? callback() : null;
            });
            rqCB.on(rqCB.onerroreventkey, function (err) {
                console.log(err);
                callback != null ? callback() : null;
            });
        }

        var triggers = {
            new_program: function () {
                var selection = modals_service.openmodal('selectdmcforprogram', $scope, { selectprogram: false, dmcs: $scope.selectedFilters.dmcs });
                //location.href = '/edit/program';
            },
            copy_program: function () {
                var selection = modals_service.openmodal('selectdmcforprogram', $scope, { selectprogram: true, dmcs: $scope.selectedFilters.dmcs });
            }
        }

        $scope.triggeraction = function (actionname) {
            triggers[actionname]();
        }

        $scope.cleanandrefresh = function () {
            $scope.mindays = 1;
            $scope.maxdays = 40;
            $scope.selectedFilters.duration.max = 40;
            $scope.selectedFilters.duration.min = 1;
            $scope.selectedFilters.selectedcountries = [];
            $scope.selectedFilters.selecteddmcs = [];
            $scope.selectedFilters.status.published = false;
            $scope.selectedFilters.status.publishednodates = false;
            $scope.selectedFilters.status.underreview = false;
            $scope.selectedFilters.status.unpublished = false;
            $scope.selectedFilters.status.draft = false;

            $scope.filterchanged();
        }

        recoverdmcs();

    }]);