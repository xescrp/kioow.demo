var app = angular.module("openMarketTravelApp");

app.controller('bookingProformaDownloadCtrl',
	[
	'$scope',
	'$rootScope',
	'$http',
	'$log',
	'$filter',
	'tools_service',
	'openmarket_google_service',
	'$location',	
	'yto_api',	
	'toaster',
	'$window',
	'bookinghelpers',
	'http_service',
	function(
		$scope,
		$rootScope,
		$http,
		$log,
		$filter,
		tools_service,
		openmarket_google_service,
		$location,		
		yto_api,	
		toaster,
		$window,
		bookinghelpers,
		http_service
		)
	{
	'use strict';
	
	var brandpath = '';
    if (typeof brandPath !== 'undefined') {
        $scope.brandpath = brandPath;
    }
	
	// set date actual default
	$scope.dateActual = new Date();
	// set date selected default
	$scope.booking = booking;
	$scope.dmcproduct = product;
	$scope.showdownloadlink = false;

	
	/**
	 * funcion que descarga el resumen de la booking
	 */
	$scope.downloadSummaryBooking = function(){		
		tools_service.showPreloader($scope, 'show');
		return bookinghelpers.downloadSummaryBooking(brandPath, yto_api, $scope.booking, function (result){
			
			tools_service.showPreloader($scope, 'hide');
			
		});
		
	}
	

	/**
	 * funcion que descarga la factura para el affiliado
	 */
	$scope.downloadProforma = function(){		
		tools_service.showPreloader($scope, 'show');
		 return bookinghelpers.downloadAffiliateProforma(brandPath, yto_api, booking, function (result){			
			tools_service.showPreloader($scope, 'hide');			
		});			
	};


    
    /**
	 * obtiene la cantidad total de pax
	 */
	$scope.getPaxNumber = function(){
		
		var totalPax = 0;
		if($scope.booking!=null && $scope.booking.roomDistribution!=null){
			for(var it=0; it < $scope.booking.roomDistribution.length; it++){
				totalPax+=$scope.booking.roomDistribution[it].paxList.length;
			}			
			return totalPax;			 
		}
		return 0;
	};
		
}]);
