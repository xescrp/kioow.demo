app.controller('shortcutPrograms', ['$scope',
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

        $scope.rolename = loginsession.user.rolename;
        $scope.dmcurlnewprogram = '/edit/program?dmccode=' + loginsession.user.code;
        $scope.getimage = function (url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };

        $scope.selectedFilters = {
            countries: _.map(destinations_service.countries,
                function (ct) { return { country: ct.label_en, countrycode: ct.slug.toUpperCase(), id: ct._id } }),
            selectedcountries: [],
            dmcs: [],
            selecteddmcs: [],
            status: {
                published: false,
                publishednodates: false,
                underreview: false,
                unpublished: false,
                draft: false
            },
            duration: {
                min: 1,
                max: 40
            }
        };



        function recoverdmcs(callback) {
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

        recoverdmcs();

    }]);