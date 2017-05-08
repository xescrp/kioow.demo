app.controller('getRelatedProduct', 
	['$scope',
	'toaster',
	'$location',
    'yto_session_service',
    'yto_api',
    'tools_service',
    '$log',
    'http_service',
    '$filter',
    'destinations_service',
    function(
    	$scope, toaster,
    	$location,
        yto_session_service,
        yto_api,
        tools_service,
        $log,
        http_service,
        $filter,
        destinations_service) {
    	
    	'use strict';
		/**
		 * define Default vars
		 */
    	var debug = false;
    	if ($location.search().debug == "true"){
    		debug = true;
    	}
    	// holder response api
    	$scope.pager = {};
    	// history of querys with results
    	$scope.queryhistoric = [];
    	// holder results of a query with results
		$scope.resultItems = [];
		//	holder of results to show
	    $scope.resultItemsShow = [];
	    // Flag to show the column related product | true = show
    	$scope.showRelated = false;
		// flag to show load animation | true = show
    	$scope.loadingRelated = false;
    	// url to jump to search
    	$scope.jumpUrl = '';
    	// Flag to show search related link
    	$scope.jumpUrlReady = false;

    	//$scope.noProduct = false;
    	// Flag to first time search
		var first = true;

		// flags for cities fails
		$scope.fail = {
			cities : false,
			tags : false,
		};

		// default filter search
		$scope.filtersearch = {
	        currency: 'EUR', //default
	        maxresults: 3,
	        orderby: "priceindexing",
			ordinal: "asc",
			page: "next",
			prevcode: null,
	        countries: [], // _id string,
	        cities: [], // _id string,
	        tags: [], // {slugs} string,
			pricemin: 0,
			pricemax: 0,
			maxdays: 0,
			mindays: 1,
			b2bchannel: null, //solo si es true
			b2cchannel: null, //solo si es true
			nocategories : true,
			departuredate: '' // string'dd-mm-yyyy' 
	        //lastcode: ??,
		};
		

		/**
		 * Helpers 
		 */

		$scope.getimage = function (url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };

        var unique = function(origArr) {
            var newArr = [],
                origLen = origArr.length,
                found, x, y;

            for (x = 0; x < origLen; x++) {
                found = undefined;
                for (y = 0; y < newArr.length; y++) {
                    if (origArr[x] === newArr[y]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    newArr.push(origArr[x]);
                }
            }
            return newArr;
        };


        /**
         * EVENTS
         */

         /**
          * [description]
          * @param  {[type]} event  [description]
          * @param  {[type]} query) {			$scope.query [description]
          * @return {[type]}        [description]
          */
		$scope.$on('relatedSearch', function(event, query) {
			$scope.query = query;
			console.log ('query ',query);
	    	//$scope.setFilter(query);
	    	$scope.setFilterData(query);
	    });

        /**
         * Filters Function
         * @return {[type]} [description]
         */
        $scope.resetFilter = function resetFilter(){
	        $log.log("resetFilter");
	        $scope.filtersList = {
	                    country: [],
	                    countries : [],
	                    cities :[],
	                    tags : [],
	                    hotelcats : [],
	                    days : [],
	                    date : [],
	                    kind : [],
	                    order : "",
	                    type : ""
	        };

	        $scope.filtersearch.maxresults = 3;
	        $scope.filtersearch.orderby = 'priceindexing';
	        $scope.filtersearch.ordinal = 'asc';
	        $scope.filtersearch.page = 'next';
	        $scope.filtersearch.prevcode = null;
	        $scope.filtersearch.countries = [];
	        $scope.filtersearch.cities = [];
	        $scope.filtersearch.tags = []; // {slugs} string;
			$scope.filtersearch.pricemin = 0;
			$scope.filtersearch.pricemax = 0;
			$scope.filtersearch.maxdays = 0;
			$scope.filtersearch.mindays = 1;
			$scope.filtersearch.departuredate = '';

	    };


		/**
		 * [setFilter description]
		 * @param {[type]} query [description]
		 */
		$scope.setFilterData = function setFilterData(query) {
			console.log ('query ',query);

			if (angular.isUndefined(query)){
				query = $scope.query;
			}
			
			if (first){
				$scope.showRelated = true;
				first = false;
			}
			$scope.loadingRelated = true;
			
			var valid = true;

			// check if a update query If is false cancell requests
			if (query.isUpdate){
				$scope.showRelated = false;
				valid = false;
			}

			switch(query.step) {
			    case 'dest':
					$scope.filtersearch.countries = [];
					$scope.filtersearch.cities = [];
					// fix destinations to search model
					
					// COUNTRY
					for (var i = 0; i < query.destinations.length; i++) {
						var tempcountry = destinations_service.findcountries({ search: query.destinations[i].cc.toLowerCase(), fieldname: 'slug'});
						$scope.filtersearch.countries.push(tempcountry[0]._id);
					}
					$scope.filtersearch.countries = unique($scope.filtersearch.countries);

					// CITYS

					for (var i = 0; i < query.destinations.length; i++) {
						var toPushCity = '';
						if (query.destinations[i].city == ''){
							if (debug)
								console.log ('query.destinations[i] ',query.destinations[i]);
						} else{
							if (debug){
								console.log ('query.destinations[i].city ',query.destinations[i].city);
							}
							// check if city is in cities.json if not not push to query
							var tempcity = destinations_service.findcities({ search: [query.destinations[i].city], fieldname: 'label_es'});
							if (tempcity.length <= 0){
								tempcity = destinations_service.findcities({ search: [query.destinations[i].city], fieldname: 'label_en'});
								if (debug){
									console.log ('tempcity_en ',tempcity);
								}
							} else {
								if (debug){
									console.log ('tempcity_es ',tempcity);								
								}
							}
							if(tempcity.length <= 0){
								//not found city in product 
								if (debug){
									console.log ('not found city:',query.destinations[i].city,' in products');	
								}
							} else {
								toPushCity = tempcity[0]._id;
								$scope.filtersearch.cities.push(toPushCity);
							}
							
						}
					}

					$scope.filtersearch.cities = unique($scope.filtersearch.cities);
					if (debug){
						console.log ('$scope.fail.cities=',$scope.fail.cities, '$scope.filtersearch.cities ',$scope.filtersearch.cities);
					}
					// if search by city fails change var citiesFail to true
					if (valid && $scope.fail.cities){
					   	$scope.filtersearch.cities.pop();
					}


					console.log ('query countries ',query);
					///console.log ('No destinations $scope.filtersearch.countries.length ',$scope.filtersearch.countries.length);
					// set country filter
			        if ($scope.filtersearch.countries.length > 0){
			            valid = true;
			        } else {
			            $scope.resultItemsShow =[];
			            first = true;
			            valid = false;
			        }

					break;
			    case 'tags':
			        // tags filter
			        if (valid && query.tags.length > 0){
			            //var arrStr = query.tags.toString();
			            $scope.filtersearch.tags =  query.tags;
			        } else{
			            $scope.filtersearch.tags = null;
			        }
			        break;
				case 'date':
			        // days filter
			        if (valid && query.days > 0){
			            $scope.filtersearch.maxdays = query.days+2;  
			            $scope.filtersearch.mindays = query.days-1;
			        } else {
			            $scope.filtersearch.maxdays = null;  
			            $scope.filtersearch.mindays = null;
			        }
					// date filter
			        if (valid && query.date){
			            var str = query.date.toString();
			            $scope.filtersearch.departuredate = str;
			        } else{
			            $scope.filtersearch.departuredate = null;
			        }
			        break;
			    case 'budget':
			        // price
					if (valid && query.price > 0){
						if (query.price < 100){
							$scope.filtersearch.pricemin = query.price;
						} else{
							$scope.filtersearch.pricemin = query.price-100;
						}
						$scope.filtersearch.pricemax = query.price+100;
					}
			        break;
				case 'hotcat':
			        /// call triptags
			        break;
			    case 'info':
			        // kind filter
			        if (valid && query.kind){  
			            $scope.filtersearch[query.kind] = true;
			        }
			        break;
			    default:
			        //noting
			}
			if(debug)
	        	console.log ('$scope.filtersearch ',$scope.filtersearch);

	        if (valid){
	        	$scope.showRelated = true; 
	        	$scope.searchProduct();
	        } else{
	        	$scope.showRelated = false;
	        	$scope.jumpUrl = '/viajes/?';
	        }

	    };









////////////////////// OLD ////////////////////////////////////////

		/**
		 * Buid filter to search
		 * @param {object} query [description]
		 */
		$scope.setFilter = function setFilter(query) {
			console.log ('query ',query);
			if (angular.isUndefined(query)){
				query = $scope.query;
			}
			if (first){
				$scope.showRelated = true;
				first = false;
			}
			$scope.loadingRelated = true;
			

			//$scope.resetFilter();

			var valid = false;
			$scope.filtersearch.countries = [];
			$scope.filtersearch.cities = [];
			// fix destinations to search model
			var arrCc = [];
			for (var i = 0; i < query.destinations.length; i++) {
				arrCc.push(query.destinations[i].cc);

				var tempcountry = destinations_service.findcountries({ search: query.destinations[i].cc.toLowerCase(), fieldname: 'slug'});
				$scope.filtersearch.countries.push(tempcountry[0]._id);
	
			}
			$scope.filtersearch.countries = unique($scope.filtersearch.countries);
			query.country = unique(arrCc);

			//var arrCity = [];
			for (var i = 0; i < query.destinations.length; i++) {
				var toPushCity = '';
				if (query.destinations[i].city == ''){
					//console.log ('query.destinations[i] ',query.destinations[i]);
				} else{
					//console.log ('query.destinations[i].city ',query.destinations[i].city);
					var tempcity = destinations_service.findcities({ search: [query.destinations[i].city], fieldname: 'label_es'});
					if (tempcity.length <= 0){
						tempcity = destinations_service.findcities({ search: [query.destinations[i].city], fieldname: 'label_en'});
						toPushCity = tempcity[0]._id;
					} else {
						toPushCity = tempcity[0]._id;
					}
					$scope.filtersearch.cities.push(toPushCity);
				}
			}
			$scope.filtersearch.cities = unique($scope.filtersearch.cities);
			//query.cities = unique(arrCity);

			// set country filter
	        if (query.country.length > 0){
	            var arrStr = query.country.toString();
	            //$scope.filtersearch.country = arrStr;
	            valid = true;
	        } else {
	            //$scope.filtersearch.country = null;
	            $scope.resultItemsShow =[];
	            first = true;
	        }


	        // if search by city fails change var citiesFail to true
	        // if (valid && !$scope.fail.cities){
		       //  if (query.cities.length > 0){
		       //      // var arrCityStr = [];
		       //      // for (var i =0; i < query.cities.length; i++){
		       //      //     arrCityStr.push(query.cities[i]);
		       //      // }
		       //      // arrCityStr = arrCityStr.join(',');
		       //      // $scope.filtersearch.cities = arrCityStr;
		       //      /// WARNING this was rewriting below for english cities
		       //  } else {
		       //      $scope.filtersearch.cities = null;
		       //  }
	        // }

	        // tags filter
	        if (valid && query.tags.length > 0){
	            //var arrStr = query.tags.toString();
	            $scope.filtersearch.tags =  query.tags;
	        } else{
	            $scope.filtersearch.tags = null;
	        }
	        // days filter
	        if (valid && query.days > 0){
	            $scope.filtersearch.maxdays = query.days+4;  
	            $scope.filtersearch.mindays = query.days;
	        } else {
	            $scope.filtersearch.maxdays = null;  
	            $scope.filtersearch.mindays = null;
	        }
	        // kind filter
	        if (valid && query.kind){  
	            $scope.filtersearch[query.kind] = true;
	        }
	        // date filter
	        if (valid && query.date){
	            var str = query.date.toString();
	            $scope.filtersearch.departuredate = str;
	        } else{
	            $scope.filtersearch.departuredate = null;
	        }
	        // price
	        if (valid && query.price > 0){
	        	if (query.price < 100){
	        		$scope.filtersearch.pricemin = query.price;
	        	} else{
	        		$scope.filtersearch.pricemin = query.price-100;
	        	}
	        	$scope.filtersearch.pricemax = query.price+100;
	        }

	        $scope.filtersearch.page = null;
	        $scope.filtersearch.currency = 'EUR';

	        //console.log ('$scope.filtersearch ',$scope.filtersearch);

	        if (valid){
	        	$scope.showRelated = true; 
	        	$scope.searchProduct();
	        } else{
	        	$scope.showRelated = false;
	        	$scope.jumpUrl = '/viajes/?';
	        }

	    };

////////////////////// END OLD ////////////////////////////////////////



	    $scope.searchProduct = function(){

	    	//$scope.noProduct = false;
	    	if ($scope.showRelated){

	    		//temp until categories search fix
	    		$scope.filtersearch.parent = null;

	    		var rq = {
					command: 'search2',
					service: 'api',
					request: $scope.filtersearch
				};

				var rqCB = yto_api.send(rq);

				console.log ('$scope.filtersearch ',$scope.filtersearch);
				// response OK
				rqCB.on(rqCB.oncompleteeventkey, function (data) {
					if(debug)
						console.log ('api response ',data);

					if (data != null && data.pager != null && data.pager.totalItems > 0){
						$scope.pager = data.pager;
						$scope.showFirstItems();
						$scope.queryhistoric.push($scope.filtersearch);
					} else{
						$scope.resultItems = [];
						if (debug)
							console.log('No results api response __ ');
						$scope.pager = [];
						$scope.loadingRelated = false;
						//reverse change url to find product related
						// if last step is dest
						if ($scope.query.step == 'dest' && $scope.fail.cities){
							if (debug)
								console.log('Search whitout last city');
							$scope.fail.cities = true;
							$scope.setFilterData();
						} else {
							// set the last query with results as default
							$scope.filtersearch = $scope.queryhistoric[$scope.queryhistoric.length-1];
						}

					}
					
					
					$scope.jumpUrlReady = false;
					
				});
				// response KO
				rqCB.on(rqCB.onerroreventkey, function (err) { 
					$scope.showRelated = true;
				});

	    	}	    	
	    };



	    $scope.showFirstItems = function(){

	    	//$scope.noProduct = false;
	    	$scope.resultItems = [];
	    	var getPrice = function (item){
	    		var ret = '';
	    		var symbol = '';
	    		if (item.minprice.currency.value == 'EUR'){
	    			ret = item.minprice.value;
	    			symbol = item.minprice.currency.symbol;
	    		} else{
	    			ret = item.minprice.exchange.value;
	    			symbol = item.minprice.exchange.currency.symbol;
	    		}
	    		// return ret;
	    		var pricedot = $filter('number')(tools_service.buildAffiliatePVPPrice(ret, $scope.session.affiliate, 'unique'), 0);
	    		return pricedot+symbol;
	    	};
	    	var getPriceValue = function (item){
	    		var ret = '';
	    		if (item.minprice.currency.value == 'EUR'){
	    			ret = item.minprice.value;
	    		} else{
	    			ret = item.minprice.exchange.value;
	    		}
	    		//return ret;
	    		return tools_service.buildAffiliatePVPPrice(ret, $scope.session.affiliate, 'unique');
	    	};

	    	console.log ('$scope.pager.items ',$scope.pager.items);

	    	for (var i = 0; i < $scope.pager.items.length && i < 3; i++) {

	    		var arrTags = [];
	    		var trest = 0;
	    		var tand = '';
	    		var published = _.filter($scope.pager.items[i].tags, function(tag){ return tag.state == 'published'; });
	    		for (var j = 0; j < published.length; j++) {
	    			if (j<3){
	    				arrTags.push(published[j].label);
	    			}else{
	    				trest++;
	    			}
	    		}
	    		if (trest >= 1){
	    			tand = '...';
	    		}

	    		
                var arrCity = [];
                var slpct = _.first($scope.pager.items[i].buildeditinerary.sleepcities, 3);
                arrCity = _.pluck(slpct, 'city_es');

                var rest = $scope.pager.items[i].buildeditinerary.sleepcities.length - 3;
	    		var and = '';
	    		//console.log ('$scope.pager.items[i].sleepcity ',$scope.pager.items[i].sleepcity);
	    		//for (var k = 0; k < $scope.pager.items[i].sleepcity.length; k++) {
	    		//	if (k<4){
	    		//		//console.log('id to search', $scope.pager.items[i].sleepcity[k]);
	    		//		var toPushCity = destinations_service.findcities({search : [$scope.pager.items[i].sleepcity[k]], fieldname : '_id'});
	    		//		//console.log ('FIND: ',toPushCity,'   toPushCity.length',toPushCity.length);
	    		//		if (toPushCity.length > 0 ){
	    		//			if (toPushCity[0].label_es ===''){
		    	//				arrCity.push(toPushCity[0].label_en);
		    	//			}else{
		    	//				arrCity.push(toPushCity[0].label_es);
		    	//			}	
	    		//		} else{
	    		//			rest++;
	    		//		}
	    				
	    		//	} else{
	    		//		rest++;
	    		//	}
	    		//}
	    		if (rest >= 1){
	    			and = ' y '+ rest + ' más.';
	    		}

	    		var dummy = {
	    			code : $scope.pager.items[i].code,
		    		url : '/viaje/'+$scope.pager.items[i].slug_es,
		    		// TODO absurl : openmarket_api_service.apiWebServiceUrl()+'viaje/'+$scope.pager.items[i].slug_es,
		    		image : $scope.getimage($scope.pager.items[i].productimage.url, 'resultimage'),
		    		cities : arrCity.join(', ')+and,
		    		tags : arrTags.join(', ')+tand,
		    		duration : $scope.pager.items[i].itinerarylength,
		    		//price : getPrice($scope.pager.items[i]),
		    		//priceval : getPriceValue($scope.pager.items[i]),
                    title: $scope.pager.items[i].title_es,
                    pvp: $scope.pager.items[i].pvp
		    	};

	    		$scope.resultItems.push(dummy);
	    	}
	    	_showItems();
	    	$scope.pager = [];
	    };

	    var _showItems = function(){
	    	//if de carga inicial

	    	if ($scope.resultItemsShow.length <= 0){
	    		for (var i = 0; i < $scope.resultItems.length; i++) {
	    			$scope.resultItemsShow.push($scope.resultItems[i]);
	    		}
	    		$scope.$emit('relatedproduct', $scope.resultItemsShow);
	    		if ($scope.resultItemsShow.length < 3){
					if (debug)
	    				console.log ('needs new search length result :',$scope.resultItemsShow.length);		
	    		}
	    	} else {
	    	// si no es carga inicial
		    	for (var h = 0; h < $scope.resultItems.length; h++) {
		    		var length = $scope.resultItemsShow.length;
		    		for (var j = 0; j < $scope.resultItemsShow.length; j++) {
			    		if($scope.resultItems[h].code != $scope.resultItemsShow[j].code){
			    			//console.log("no match")
			    			$scope.resultItemsShow.unshift($scope.resultItems[h]);
			    			$scope.resultItemsShow = $scope.resultItemsShow.slice(0, 3);
			    			break;
			    		} else {
			    			//console.log("match");
			    		}
			    	}

		    	}
		    	$scope.resultItemsShow = $filter('orderBy')($scope.resultItemsShow, 'priceval', false);
		    	$scope.$emit('relatedproduct', $scope.resultItemsShow);
	    	}
	    	$scope.loadingRelated = false;
	    	//$scope.showRelated = true;

	    };

	    $scope.goTo = function(url){
	    	if (debug)
	    		console.log('goTo : ',url);
	    	//$scope.$emit('disabledStop');
	    	window.location = url;
	    };

	    var _recoverSession = function(){
	    	yto_session_service.currentSession(function (session) {
                console.log('get session...',session);
                if (session){
	                if (session.Session != null){
	                    $scope.session = session.Session;
	                } else {
	                	$scope.session = session;
	                }
	                $scope.session.user.isAffiliate ? $scope.filtersearch.b2bchannel = true : null;
					$scope.session.user.isTraveler ? $scope.filtersearch.b2cchannel = true : null;
            	} else{
            		$scope.filtersearch.b2cchannel = true;
            	}
            });
	    };

	    // init whit session
	    // 
	    _recoverSession();


	 //   // TEST
		// $scope.filtersearch = {
	 //        currency: 'EUR', //default
	 //        maxresults: 12,
	 //        orderby: 'priceindexing',
	 //        ordinal: 'asc',
	 //        page: 'next',
	 //        //lastcode: ??,
	 //        //countries: ['56979b1572f4abc42cae9777'], // _id string,
	 //        cities: ['56979b1572f4abc42cae9777'], // _id string, solo roma
	 //        tags: [], // {slugs} string,
		// 	pricemin: 0,
		// 	pricemax: 0,
		// 	maxdays: 0,
		// 	mindays: 1,
		// 	b2bchannel: true, //solo si es true
		// 	//b2cchannel: true, //solo si es true
		// 	departuredate: '' // string'dd-mm-yyyy' 
		// };


		// var rq = {
		// 	command: 'search',
		// 	service: 'api',
		// 	request: $scope.filtersearch
		// };

		// var rqCB = yto_api.send(rq);

		// // response OK
		// rqCB.on(rqCB.oncompleteeventkey, function (data) {
		// 	console.log ('>>>>>> data ',data);
		// });




}]);