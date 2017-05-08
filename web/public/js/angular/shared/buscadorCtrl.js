var app = angular.module("openMarketTravelApp");

// ===== WIDGET CONTROLLER
app.controller("buscadorCtrl", 
	['$scope',
	'$rootScope',
	'$http',
	'$uibModal',
    '$log',
    '$filter',
    'yto_api',
    '$window',
    'tools_service',
    '$location',
    'destinations_service',
    function ($scope,
    	$rootScope,
    	$http,
    	$uibModal,
    	$log,
    	$filter,
    	yto_api,
    	$window,
    	tools_service,
    	$location,
    	destinations_service) {

    	'use strict';
    	//init preloader variable
	    $scope.searchbtnloading = false;
	    $scope.selecteditem = {
	    	name: "",
	    	query: ""
	    };

	//MONTH STUFF
	// print months
	function _printfromcurrentdate() {
	    var months = new Array("Enero", "Febrero", "Marzo",
	    "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
	    "Octubre", "Noviembre", "Diciembre");
	    var current = new Date();
	    var end = new Date(current.getFullYear() + 1, 9, 1);
	    var iterator = new Date(current.getFullYear(), current.getMonth(), 1);
	    var filterMonths = [];
	    while (iterator <= end) {
	        var datestr = (months[iterator.getMonth()] + ' ' + iterator.getFullYear());
	        var dateFilter = new Date(iterator);
	        var dd = dateFilter.getDate();
	        var mm = dateFilter.getMonth()+1; //January is 0!
	        var yyyy = dateFilter.getFullYear();
	        if(dd<10){
	            dd='0'+dd;
	        } 
	        if(mm<10){
	            mm='0'+mm;
	        } 
	        var dateFilter = dd+'-'+mm+'-'+yyyy;
	        var item = { name : datestr, query : '&date='+dateFilter}
	        filterMonths.push(item);
	        iterator.setMonth(iterator.getMonth() + 1);
	    }
	    return filterMonths;        
	}


	// assign printed to next var
	$scope.nextmonths = _printfromcurrentdate();
	$scope.monthselector = "";

	$scope.allitems = [];
	$scope.destbychar = {};
	$scope.selecteditem = "";
	$scope.searchwarn = false;

	//when you click dropdown option will set input value
	$scope.selectMonth = function(message) {
		$scope.monthselector = message;
		//$log.log($scope.monthselector);
	};

    $scope.destinations = function(){
		return destinations_service.productcountriesnorm_es;
	};

	$scope.jumptosearch = function () {
	    
	    var url = '/viajes/?';

	    if (typeof brandPath != 'undefined') {
	    	if (brandPath != null &&brandPath != ''){
	    		url = brandPath+'/viajes/?';
	    	}
	    }
		

		if (!angular.isUndefined($scope.selecteditem.query)) {
			$scope.searchbtnloading = true;
		} else {
			$scope.searchbtnloading = false;
		}

		//if both match
		if (!angular.isUndefined($scope.selecteditem.query) && !angular.isUndefined($scope.monthselector.query) ){
			url = url+$scope.selecteditem.query;
			url = url+$scope.monthselector.query;
			// $log.log(url);
			$window.location.href = url; 			
		} 
		//if only destination matches
		else if (!angular.isUndefined($scope.selecteditem.query) && angular.isUndefined($scope.monthselector.query) ) {
			url = url+$scope.selecteditem.query;
			$window.location.href = url;
		} else {
			$scope.searchwarn = true;
		}		
	};

	$scope.modalCountryselectGenerated = angular.element(document.querySelector('#destinationsgenerated')).html();

	// NEW MODAL, OPENS GENERATED STATIC HTML
	$scope.opencsGenerated = function (size) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  //templateUrl: '/partials/widgets/modal-countryselect-generated.html.swig',
		  template : $scope.modalCountryselectGenerated,
		  controller: 'opencsGeneratedInstanceCtrl',
		  size: size,
		  resolve: {
			data : function() {
		    	// var data = {
		    	// 	"destinations" : $scope.destinations,
		    	// 	"destbychar" : $scope.destbychar
		    	// }
		    	// return data;
		    }        
		  }
		});

	    modalInstance.result.then(function (item) {
	      $scope.selecteditem = item;
	      $scope.jumptosearch();

	    }, function () {});
	}; 


	// SEARCH DATE FILL
	$scope.searchdateParam;
	//get table of all months
	$scope.monthtable = _printfromcurrentdate();
	//get searched date from express
	if (typeof searchdate !== 'undefined') {
			// the variable is defined
			$scope.searchdateParam = searchdate;
	}
	//$log.log('$scope.searchdateParam', $scope.searchdateParam);
	//filter table with parameter
	$scope.filteredDate = $filter('filter')($scope.monthtable, $scope.searchdateParam);
	//put var available
	$scope.filteredDate = $scope.filteredDate[0].name;

	var match = function(productcountries){
		var countrycode = "";
		var city = "";
		var date = "";
		if ($location.search().country) {
			countrycode = $location.search().country;	
			$scope.selecteditem = $filter('filter')(productcountries, {countrycode: countrycode})
			$scope.selecteditem = $scope.selecteditem[0];
			$scope.selecteditem.name = $scope.selecteditem.name_es;
			$scope.selecteditem.query = "&country="+$scope.selecteditem.countrycode.toLowerCase();		
		};
		if ($location.search().cities) {
			city = $location.search().cities;	
			// $scope.selecteditem.city = $filter('filter')($scope.selecteditem.cities, city)
			for (var i = 0; i < $scope.selecteditem.cities.length; i++) {
				if ($scope.selecteditem.cities[i].city_en == city) {
					var city = '';
					if ($scope.selecteditem.cities[i].city_es != '' && $scope.selecteditem.cities[i].city_es != undefined){
						city = $scope.selecteditem.cities[i].city_es;
					} else {
						city = $scope.selecteditem.cities[i].city_en;
					}
					$scope.selecteditem.name = city +", "+$scope.selecteditem.name;
					$scope.selecteditem.query = $scope.selecteditem.query +"&cities="+$scope.selecteditem.cities[i].city_en;
					break;
				}
			}
		}
		if ($location.search().date) {
			date = $location.search().date;
			$scope.monthselector = $filter('filter')($scope.nextmonths, date);
			$scope.monthselector = $scope.monthselector[0];
		}
	};


	 $scope.onSelect = function ($item, $model, $label) {
	 	// console.log("onselectitem", $item)
	 	// console.log("onselectmodel", $model)
	 	// console.log("onselectlabel", $label)
	 	$scope.selecteditem.query = $item.query;
	};		

	$rootScope.$on('productcountries_loaded', function (event, productcountries) {
     	match(productcountries);
	});

	var init = function init () {
	};
	init();

}]);


app.controller('opencsGeneratedInstanceCtrl', function ($scope, $uibModalInstance, data) {

	$scope.ok = function (item) {
		$uibModalInstance.close(item);
	};
	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
	};
});


