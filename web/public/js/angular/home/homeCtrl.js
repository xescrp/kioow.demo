app.controller('homeCtrl', ['$scope', '$rootScope',
    'toaster',
    '$location',
    '$cookieStore',
    '$cookies',
    'tools_service',
    'modals_service',
    'yto_api',
    '$log', 'tsImhotep',
    function ($scope, $rootScope,
        toaster,
        $location,
        $cookieStore,
        $cookies,
        tools_service,
        modals_service,
        yto_api,
        $log, tsImhotep) {

       
        // // ---- Modal for login    
        $scope.openlogin = function (nav) {
            var modalname = 'login_' + nav;
            modals_service.openmodal(modalname, $scope);
        };

    }]);