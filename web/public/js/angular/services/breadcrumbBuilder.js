var app = angular.module("openMarketTravelApp");

// ===== Breadcrumb CONTROLLER
app.controller("bredcrumbBuilder", 
	['$scope',
    '$log',
    '$filter',
    '$location',
    'yto_api',
    'destinations_service',
    function ($scope,
    	$log,
    	$filter,
    	$location,
    	yto_api,
    	destinations_service) {

    	'use strict';
    	//init preloader variable
    	var protocol = $location.protocol();
    	var host = location.host;
    	var brandpath = '';
    	$scope.querystring = '';
    	$scope.bredCrumbArray = [];
    	$scope.asyncCrumbArray = [];
    	if (typeof brandPath !== 'undefined') {
				brandpath = brandPath;
		}
		var debug = false;
		if ($location.search().debug == 'true')
			debug = true;

		var endGetContentflag = false;

		// flag if bcs come from server
		var comesFromServer = false;

		function recoverCountryData(slug, callback) {
			var resp = destinations_service.findcountries({ search: slug, fieldname: 'slug'});
            if (debug)
            	$log.info ('search response country ',resp[0]);
            callback(resp[0]);
        }

		function recoverCityData(city, callback) {
			var resp = destinations_service.findcities({ search: city, fieldname: 'slug'});
            if (debug)
            	$log.info ('search response city ',resp[0]);
            callback(resp[0]);
        }


		function recoverTagData(slug, callback) {
			var resp = destinations_service.findtag({ search: slug, fieldname: 'slug'});
            if (debug)
            	$log.info ('search response triptag ',resp[0]);
            callback(resp[0]);
        }

		var get = {country : false, tag : false, city : false};

		$scope.makeAngularBread = function () {
	        // RESET breadcrumb object everytime you call makeangularbread
			$scope.bredCrumbArray = [
				{url: protocol+'://'+host+brandpath+'/inicio', label : 'Inicio'}//,
				//{url: protocol+'://'+host+brandpath+'/viajes', label : 'Viajes'}
    		];
	        get = {country : false, tag : false, city : false};

	        var jsonToParams = function(obj) {
		        var str = [];
		        for(var p in obj)
		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        return str.join("&");
		    };
	        
	        var countrypar = false;
	        var tagpar = false;
	        var citypar = false;
	        //
	        var countryObj;
	        var tagObj;
	        var cityObj;

	        var pushCountry = function(position) {
				if (countryObj !== null){
					$scope.bredCrumbArray.push({url: protocol+'://'+host+brandpath+'/viajes?'+jsonToParams({country : countrypar}), label:countryObj.label_es });
				}
			};
			var pushTag = function(position) {
				if (debug)
					$log.info ('tagObj ',tagObj);
			    if (position == 'end'){
			        $scope.bredCrumbArray.push({url: protocol+'://'+host+brandpath+'/viajes?'+jsonToParams({tags : tagpar}), label:tagObj.label});                
			    } else {
			        $scope.bredCrumbArray.push({url: protocol+'://'+host+brandpath+'/viajes?'+jsonToParams({country : countrypar, tags : tagpar}), label: tagObj.label+' en '+countryObj.label_es});
			    }
			};
			var pushCity = function(position) {
				$scope.bredCrumbArray.push({url: protocol+'://'+host+brandpath+'/viajes?'+jsonToParams({country : countrypar, cities : citypar}), label: cityObj.label_es });
			};

			var endGetContent = function(){
	       		if (debug)
	       			$log.info ('endGetContent ');
	       		// CO - TA - CI (all filters)
				if (countrypar && tagpar && citypar) {
				    pushCountry();
				    pushTag();
				    pushCity();
				}            
				// CO - N - N
				if (countrypar && !tagpar && !citypar) {
				    pushCountry("end");
				}
				// N - TA - N
				if (!countrypar && tagpar && !citypar) {
				    pushTag("end");
				}
				//N - N - CI (never)

				// CO - N - CI
				if (countrypar && !tagpar && citypar) {
				    pushCountry();
				    pushCity();
				}
				// CO - TA - CI
				if (countrypar && tagpar && !citypar) {
				    pushCountry();
				    pushTag("end");
				}

				$scope.bredCrumbArray = $scope.bredCrumbArray.concat($scope.asyncCrumbArray);
				if (debug)
					$log.info ('>>> bredCrumbArray ',$scope.bredCrumbArray);
	       };

	        var checkGetContent = function(){
	        	if (debug)
					$log.info ('checkGetContent', get);
		   		if (get.country && get.tag && get.city){
		   			if (!endGetContentflag){
		   				endGetContentflag = true;
						endGetContent();
					}
	       		}
	       	};


	        //COUNTRY just get slug if there's a country
	        var _checkCountry = function(){
	        	
	        	//$log.info("$location.search().country: ",$location.search().country);
		        if ($location.search() && $location.search().country) {
		            var allcountrypar = $location.search().country;
		            var cutcountryindex = allcountrypar.indexOf(",");
		            if (cutcountryindex != -1) {
		                return allcountrypar.substring(0, cutcountryindex);    
		            } else {
		                return allcountrypar;
		            }
		        } else {
		        	get.country = true;
		        	return false;
		        }
		    };

	        countrypar = _checkCountry();
			//countryObj = {label_es : countrypar};

			if (countrypar){
			    recoverCountryData (countrypar, function(data) {
	        		get.country = true;
	        		countryObj = data;
	        		checkGetContent();
	        	});
		    }
	        //TAG proper first tag in case it exists and there is more than one
	        var _checkTag = function(){
		        if ($location.search().tags) {
		            var alltagspar = $location.search().tags;
		            var cuttagindex = alltagspar.indexOf(",");
		            if (cuttagindex != -1) {
		                return alltagspar.substring(0, cuttagindex);    
		            } else {
		                return alltagspar;
		            }
		        } else {
		        	get.tag = true;
		        	return false;
		        }
		    };

		    tagpar = _checkTag();
		    //tagObj = {label : tagpar};
		    if (tagpar){
			    recoverTagData (tagpar, function(data) {
	        		get.tag = true;
	        		tagObj = data;
	        		checkGetContent();
	        	});
		    }
	        //CITY proper first city in case it exists an there is more than one
	        var _checkCity = function(){
		        if ($location.search().cities) {
		            var allcitiesspar = $location.search().cities;
		            var cutcityindex = allcitiesspar.indexOf(",");
		            if (cutcityindex != -1) {
		                return allcitiesspar.substring(0, cutcityindex);    
		            } else {
		                return allcitiesspar;
		            }
		        }else{
		        	get.city = true;
		        	return false;
		        }
		    };

		    citypar = _checkCity();

		    if (citypar){
				recoverCityData (citypar, function(data) {
					get.city = true;
					cityObj = data;
					checkGetContent();
				});
		    }

			
	        if(debug)
	        	$log.info ('countrypar:',countrypar,' tagpar:',tagpar,' citypar:',citypar);


			checkGetContent();
	    };

	    $scope.$on('addBred', function (event, params) {
     		if (debug)
     			$log.info('add bread trigger', params);
     		if (!comesFromServer){
     			$scope.asyncCrumbArray.push({url: params.url, label: params.label });
     			if (get.country && get.tag && get.city){
     				$scope.bredCrumbArray = $scope.bredCrumbArray.concat($scope.asyncCrumbArray);
     			}
     			//$scope.makeAngularBread();
     		}
		});

		var init = function(){
			$scope.makeAngularBread();
		};

		//launch bc builder
		$scope.$on('destinations.loaded', function (event, mass) {
			if(debug)
				$log.info ('BC destinations loaded...'); $log.info(mass);
			if (typeof BC !== 'undefined' && BC !== '[]') {
				if(debug)
					$log.info ('BC ',BC);
				var bctemp = JSON.parse(BC);
				if ( Object.prototype.toString.call( BC ) === '[object Array]'){
					bctemp = BC;
				} else {
					bctemp =  JSON.parse(BC);
				}
				comesFromServer = true;
				$scope.bredCrumbArray = bctemp;
				if(debug)
					$log.info ('$scope.bredCrumbArray ',$scope.bredCrumbArray);
			} else {
				init();
			}	        
	    });


	    
}]);

