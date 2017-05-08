app.directive("sessionswitcher", ['tools_service',
    '$uibModal', 'yto_api',
    '$cookieStore', 'Lightbox', '$anchorScroll', '$location',
    function (tools_service,
        $uibModal, yto_api,
        $cookieStore, Lightbox, $anchorScroll, $location) {


        return {
            templateUrl: '/js/angular/directives/views/sessionswitcher.html?d=' + new Date(),
            scope: {

            },
            link: function ($scope, el, attrs) {
                el.bind('click', function (e) {
                    e.stopPropagation();
                    
                });
                $scope.switchtoaffiliate = function () {
                    $scope.sessionswitcher != null && $scope.sessionswitcher.candidate != null ?
                        location.href = '/auth/redirectsession?slug=' + $scope.sessionswitcher.candidate.slug : null;
                }
                $scope.switchtoadmin = function () {
                    $scope.sessionswitcher != null && $scope.sessionswitcher.candidate != null ?
                        location.href = '/auth/switchadmin' : null;
                }
                $scope.sessionswitcher = sessionswitch;
            }
        };

    }]);