/**
 * @ngdoc directive
 * @name directive.whiteLablePrices
 * @requires $scope
 * @requires http_service
 * @description
 * 
 * Call api get fees for affilate recalculate price
 */
'use strict';
app.factory('affiliateSlug', ['$location', function ($location) {
    var host = $location.host();
    if (host.indexOf('.') < 0) 
        return null;
    else
        return host.split('.')[0];
}]);
app.directive('whiteLabelPrices',['$http', function ($http) {
    return {
        restrict: 'A',
        template: '{{price}}',
        scope: {
            netprice: '=pricedata',
            margin: '=margin',
            fee: '=fee'
        },
        controller: ['$scope',
                    '$filter',
                    function($scope,
                        $filter
                        ) {

            $scope.price = 'error';
            $scope._init = function(pvp) {
                $scope.price = $filter('number')(pvp, 0);
            };
        

        }],
        link: function(scope, iElement, iAttrs, $filter) {
            var netprice = scope.netprice;
            var margin = scope.margin/100;
            var fee = scope.fee/100;
            var netAavv = netprice/(1-margin);
            var pvp = netAavv/(1-fee);
            scope._init(pvp);
        }
    }
}]);
