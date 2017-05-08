var app = angular.module("openMarketTravelApp");

app.controller("cookiewarnCtrl", ['$scope','$cookies', function($scope, $cookies){

  // Retrieving a cookie
  $scope.accepted =  $cookies.get('OMTaccepted') || "";
  //$cookies.OMTaccepted || "";

  $scope.navigationType = navigationType;

  $scope.acceptCookies = function() {
	  // Setting a cookie
	  $scope.agree = true;
	  var date = new Date();
    date.setDate(date.getDate()+60);
    $cookies.put('OMTaccepted', 'ok', {expires : date.toGMTString()});
    //document.cookie = 'OMTaccepted=ok;expires='+date.toGMTString();
   };

    //console.log('$cookies.OMTaccepted',$cookies.OMTaccepted);

}]);	
