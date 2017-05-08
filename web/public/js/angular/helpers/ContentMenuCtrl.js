var app = angular.module("openMarketTravelApp");

app.controller('affiliateContentMenuCtrl', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) { 
        
        $scope.getClass = function (path) {
          if ($location.path().substr(0, path.length) === path) {
            return 'active';
          } else {
            return '';
          }
        };
    }]);

app.controller('staticContentCtrl', ['$scope', '$rootScope', '$location', 'modals_service',
    function ($scope, $rootScope, $location, modals_service) {

        $scope.fullimage = function (image) {
            $scope.fullimagepopup = image;
            modals_service.openmodal('image_full', $scope);
        };

    }]);