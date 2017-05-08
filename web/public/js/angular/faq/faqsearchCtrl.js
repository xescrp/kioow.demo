var app = angular.module("openMarketTravelApp");

app.controller("faqsearchCtrl", ['$scope','$http', '$location', function($scope, $http, $location){
	var path = $location.path();
	var url = "";

	if (path.indexOf('preguntas-frecuentes') > -1) {
		var url = '/preguntas-frecuentes/buscar/'
	} else {
		var url = '/faqs/search/'
	}

	$scope.searchval = function(){
		if ($scope.searchterm != null) {
			window.location.href = url+$scope.searchterm;
		}
      }
}]);