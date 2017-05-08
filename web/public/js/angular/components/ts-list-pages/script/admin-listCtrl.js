app.controller("adminListController",
    ['$scope',
        '$timeout',
        '$log',
        'http_service',
        'tools_service', 'ts_table_browser','tsImhotep',
        function ($scope,
            $timeout,
            $log,
            http_service,
            tools_service, ts_table_browser, tsImhotep) {

            $scope.init = function () {
                console.log('init test');
            };

            $scope.getimage = function (url, imagename) {
                return tools_service.cloudinaryUrl(url, imagename);
            };

            $scope.loginsession = loginsession;
            $scope.queryservice = ts_table_browser;

            $scope.openDatePicker = function ($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope[opened] = true;
            };

            $scope.testdate = new Date();

            $scope.dateOptions = {
                formatYear: 'yyyy',
                startingDay: 1
            };

            $scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            console.log(ts_table_browser);
            $scope.rolename = loginsession.user.rolename;
            $scope.queryservice = ts_table_browser;
            $scope.currentconfiguration = tsImhotep.getCollectionConfig(admin_collectionname);
            console.log($scope.currentconfiguration);
            $scope.queryservice.setConfig($scope.currentconfiguration.list.tableconfiguration);
            $scope.currentconfiguration.list.startHook != null && typeof ($scope.currentconfiguration.list.startHook) === 'function' ?
                $scope.currentconfiguration.list.startHook($scope.queryservice) : $scope.queryservice.goPage(null, 0);


            $scope.selectPage = function (number, $event) {

            }
        }]);
