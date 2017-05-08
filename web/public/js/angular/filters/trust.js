'use strict';
(function(){

    var app = angular.module("openMarketTravelApp");
    app
        .filter('trustURL', TrustURL);

    function TrustURL($sce) {

        return function(url) {
          return $sce.trustAsResourceUrl(url);
        }
    }

})();
