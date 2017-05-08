var app = angular.module("openMarketTravelApp");

app.controller("affiliateProductCtrl", ['$scope',
	'toaster',
	'$http',
	'$timeout',
	'$location',
	'yto_api',
	'$window',
	'tools_service',
	'yto_session_service',
	'$log',
	'$httpParamSerializerJQLike',
	function($scope,
			toaster,
			$http,
			$timeout,
			$location,
			yto_api,
			$window,
			tools_service,
			yto_session_service,
			$log,
			$httpParamSerializerJQLike){

	'use strict';
	var debug = $location.search().debug;
	$scope.markers = markers;
	$scope.havemap = false;
	$scope.priceDetail = {};
	$scope.showPriceDetail = false;
    $scope.isWhiteLabel = isWhiteLabel || false;

    $scope.theprogram = JSON.parse(JSON.stringify(product));

    console.log($scope.theprogram);

	var url_fullpath = $location.$$absUrl;
	var url_mod = "";
	var feeunit = '%';

	if (url_fullpath.indexOf("?")!=-1){
		url_mod = url_fullpath.substr(0,url_fullpath.indexOf("?"));
	} else {
		url_mod = url_fullpath;
	}

	$scope.printLink=url_mod + '?print=true';
	$scope.printLinkOnePage=url_mod + '?print=true&onepage=true';

	// Dispara evento para descargar un archivo 
	function eventFire(el, etype){
		if (el.fireEvent) {
			el.fireEvent('on' + etype);
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	}


	function _getContentToPrint(url, callback) {

		return $http({
			method: 'GET',
			url: url,
			data: null,
			headers: {}
		}).success(function(data){
			callback(data);
		}).error(function(){
			alert("error");
		});
	}

	// print pdf from product for OMT
	$scope.printFullTravel = function(productSlug){
		
		tools_service.showPreloader($scope, 'show');
		var url_fullpath = $location.$$absUrl;
		var url_mod = url_fullpath.replace("#" + $location.$$hash,'');
		var url = $scope.printLink;	
		var namefile = 'omt-viaje-' + productSlug;


		//llamada api nueva 
		_getContentToPrint(url, function(result){			
			var pageSettings = '--page-size A4';
			
    		// 3) llamo al core para convertirlo en pdf
    		var rqCB = yto_api.post('/download/getpdffromhtml', {
    		    html: result,
    		    pageSettings : pageSettings,
    		    type: 'products',
    		    namefile: namefile
    		});
    		    		
    		//response OK
    		rqCB.on(rqCB.oncompleteeventkey, function (productPdf) {
    		        		    
                if (productPdf != null && productPdf.url != null) {  
                    console.log('here!');
                    console.log(productPdf);
	    			$window.open(productPdf.url, '_blank');
    			}
    			//error al generar factura 
    			else{    				
    				console.log("ERROR, getting pdf from html for productPdf: "+productSlug);	    				
    				toaster.pop('error',"Error", "Error al generar PDF del producto, "+productSlug, 10000);    				
    			}	
    			
    			tools_service.showPreloader($scope, "hide");
    		    
    		});
    		
    		//response noOk
    		rqCB.on(rqCB.onerroreventkey, function (err) {
    		    console.log(err);
    		    toaster.pop('error',"Error", "Error al generar PDF del producto, "+productSlug, 10000);    			
    		});
		});
	};

	// print pdf from product for YTO
	$scope.printTravel = function(productSlug){
		console.log ('print full Travel ',productSlug);
		console.log ('print full Travel ',$scope.session.affiliate.images.logo);
		tools_service.showPreloader($scope, 'show');
	
		var url_fullpath = $location.$$absUrl;
		var url_mod = url_fullpath.replace("#" + $location.$$hash,'');
		var url = $scope.printLink;
		var namefile='';
		
		//si el slug viene vacio pongo el numero de la quote
		if(productSlug == undefined || productSlug == null || productSlug== ''|| productSlug== '  '){			
			var ruta = $location.path().split('/');
			console.log("quote name: ",ruta[ruta.length -2]);				
			namefile = 'yto-viaje-' + ruta[ruta.length -2];
		}
		else{		
			namefile = 'yto-viaje-' + productSlug;
		}
		
		// 1) obtener html a imprimir
		_getContentToPrint(url, function(result){
			var dataFooter ={
				name : $scope.session.affiliate.company.name,
				logo : $scope.session.affiliate.images.logo.url
			};
			var dataHeader ={
				name : $scope.session.affiliate.company.name,
				logo : $scope.session.affiliate.images.logo.url,
				phone : $scope.session.affiliate.company.phone,
				web : $scope.session.affiliate.company.website,
				address : $scope.session.affiliate.company.location.fulladdress,
				cp : $scope.session.affiliate.company.location.cp,
				city : $scope.session.affiliate.company.location.city
			};

			if (typeof product !== 'undefined') {
				dataHeader.tit = product.title_es;
				if(product.categoryname !== null && product.categoryname !== undefined ){
					dataHeader.cat = product.categoryname.label_es;
				}
			}
            var urlLocal = 'http://' + location.host + '/' //'http://www.yourttoo.com/';

			var footerurl = '\"'+urlLocal+'pdfPartial?part=footer&'+$httpParamSerializerJQLike(dataFooter)+'\"';
			var headerurl = '\"'+urlLocal+'pdfPartial?part=header&'+$httpParamSerializerJQLike(dataHeader)+'\"';
			var pageSettings = '-B 20mm -L 0mm -R 0mm -T 42mm --footer-html '+footerurl+' --header-html '+headerurl;
				
			$log.info ('footerurl :',footerurl);
			$log.info ('headerurl :',headerurl);

			$log.info ('pageSettings :',pageSettings);
    		// 2) llamo al core para convertirlo en pdf
    		var rqCB = yto_api.post('/download/getpdffromhtml', {
    		    html: result,
    		    pageSettings: pageSettings,
    		    type: 'products',
    		    namefile: namefile
    		});
    		    		
    		//response OK
    		rqCB.on(rqCB.oncompleteeventkey, function (productPdf) {
    		        		    
    			if(productPdf!=null && productPdf.url != null ){  
	    			$window.open(productPdf.url, '_blank');
    			}
    			//error al generar factura 
    			else{    				
    				console.log("ERROR, getting pdf from html for productPdf: "+productSlug);	    				
    				toaster.pop('error',"Error", "Error al generar PDF del producto, "+productSlug, 10000);    				
    			}	
    			
    			tools_service.showPreloader($scope, "hide");
    		    
    		});
    		
    		//response noOk
    		rqCB.on(rqCB.onerroreventkey, function (err) {
    		    console.log(err);
    		    toaster.pop('error',"Error", "Error al generar PDF del producto, "+productSlug, 10000);    			
    		});
		});
	};
	
	
	/**
     * funcion palanca al llamarla cambia el valor de la variable llamada
     */
    $scope.toggle = function(aux) {    	
		eval("$scope." + aux + " = !$scope." + aux);
	};
	
	/**
	 * funcion que actualiza el fee de un producto cargado para reservarlo
	 */
	 $scope.updateFeeProduct = function(product,fee){
		 console.log("Actualizar fee de prdoctco");
		 
	 };
	 
	 /**
	 * funcion que guarda el fee de un producto cargado para reservarlo
	 */
	 $scope.savePrice = function(product,fee){
		 if (typeof quote === null || typeof quote === 'undefined'){
			 
			 console.log("fee: ",fee);
			 $scope.priceDetail = tools_service.buildAffiliateDetailPrice($scope.session.affiliate, '%',minPrice.net, minPrice.currency, "unique");				
				
		}
		 
		 
		 console.log("SAVE fee de prdoctco");
		 $scope.showPriceDetail = false;
	 }
	 
	 /**
	 * funcion que inicializa el precio del producto
	 */
	 $scope.initPriceDetail = function(product){
		 console.log("initPriceDetail");	
		 $scope.changeValueShowPrice();
	 }
	 
	 
	 /**
	 * funcion que inicializa el precio del producto
	 */
	 $scope.changeValueShowPrice = function(){
		 console.log("initPriceDetail");	
		 if ($scope.showPriceDetail === false || $scope.showPriceDetail === undefined) {
		 $scope.showPriceDetail = true;
		}else{
			$scope.showPriceDetail = false;
		}
	 };
	 
	 

	// print pdf in one page from product for YTO
	$scope.printTravelOnePage = function(productSlug){
		console.log ('print one page Travel ',productSlug);
		tools_service.showPreloader($scope, 'show');
		var url_fullpath = $location.$$absUrl;
		var url_mod = url_fullpath.replace("#" + $location.$$hash,'');
		var url = $scope.printLinkOnePage;

				
		var namefile = 'carteleria-' + productSlug;

		// 1) obtener el html a imprimir
		_getContentToPrint(url, function(result){

			var pageSettings = '-B 8mm -L 10mm -R 10mm -T 7mm --footer-center "Organización Técnica AVBAL/657" --footer-font-size 8';
			
			// 2) llamo al core para convertirlo en pdf
    		var rqCB = yto_api.post('/download/getpdffromhtml', {
    		    html: result,
    		    pageSettings: pageSettings,
    		    type: 'products',
    		    namefile: namefile
    		});
    		    		
    		//response OK
    		rqCB.on(rqCB.oncompleteeventkey, function (productPdf) {
    			
    			    		        		    
    			if(productPdf!=null && productPdf.url != null ){  
	    			$window.open(productPdf.url, '_blank');
    			}
    			//error al generar factura 
    			else{    				
    				console.log("ERROR, getting pdf from html for productPdf: "+productSlug);	    				
    				toaster.pop('error',"Error", "Error al generar PDF del producto, "+productSlug, 10000);    				
    			}	
    			
    			tools_service.showPreloader($scope, "hide");
    		    
    		});
    		
    		//response noOk
    		rqCB.on(rqCB.onerroreventkey, function (err) {
    		    console.log(err);
    		    toaster.pop('error',"Error", "Error al generar PDF del producto, "+productSlug, 10000);    			
    		});
		});
	};
	function _getsession(callback) {		
    	//
    	tools_service.showPreloader($scope, "show");
    	//
        var token = yto_session_service.currentSession(function (token) {
            
            if (token) {
                $scope.session = token;
            } else {
                //nothing to do
                //window.location = '/';
            }

            console.log('token : ',token);
            if (callback) { callback(); }
        });
    }

    ///
    /// Helpers
    ///
    /**
     * funcion que la fecha en formato date del objeto de mongo
     * @return "date javascript"
     */
    $scope.transformToDate = function(dateObj){
        return tools_service.transformToDate(dateObj);
    };

	$scope.init = function(){
		if (markers.length){
			$scope.havemap = true;
			initMap(markers);
			// google.maps.event.addDomListener(window, 'load', function(){
			// 	initMap(markers);
			// });
		}else{
			$scope.havemap = false;
		}
		// add bredcrumb
		if (typeof product !== 'undefined') {
			var bc = {url : url_fullpath, label : product.title_es};
			$scope.$broadcast('addBred', bc);
		}
		// $timeout(function(){
		// 	console.log (' brodcast addBred ', bc );
		// 	$scope.$broadcast('addBred', bc);
		// }, 1000);
		// 
		//Si es afiliado, actualizar el desglose del precio
		//	
		if($scope.session != null && $scope.session.user.isAffiliate){
			
			// ******************************
			// si es un producto de una quote
			// ******************************
			if (typeof quote !== 'undefined' && quote != ''){				
				
				
				// 1) rescatar la query para ver si es un grupo         	   
         	   var rq = {
     		        command: 'findone',
     		        service: 'api',
     		        request: {
     		            query: { code: quote.userqueryCode },
     		            collectionname: 'UserQueries'     		            
     		        }
         	   };
         	   var rqCB = yto_api.send(rq);
                
               // response OK
               rqCB.on(rqCB.oncompleteeventkey, function (result) {            	   
            	   
            	   // si la query es de un grupo            	  
            	   if(result.group != null && result.group.adults !=null && result.group.adults >0){           		   
            		   
            		   $scope.priceDetail = {
       						'fee': quote.fees.groups,
       						'feeunit': feeunit,
       						'price': {
       							'net' : quote.amount.exchange.value,
       					    	'pvp' : quote.pvpAffiliate.exchange.value,
       					    	'currency' : quote.pvpAffiliate.exchange.currency
       						}
       					};
            	   }
            	   else{
	       				
            		   $scope.priceDetail = {
      						'fee': quote.fees.tailormade,
       						'feeunit': feeunit,
       						'price': {
       							'net' : quote.amount.exchange.value,
       					    	'pvp' : quote.pvpAffiliate.exchange.value,
       					    	'currency' : quote.pvpAffiliate.exchange.currency
       						}
       					};           					
            	   }          	   
               });
               
               // response KO
               rqCB.on(rqCB.onerroreventkey, function (err) {
            	   	tools_service.showPreloader($scope, "hide");
                   	console.log("Error getting userquery by code : ",quote.userqueryCode,' Details: ',err);
                	tools_service.showConectionError($scope, "show");
            		toaster.pop('error', 'Error', 'Problemas con el servicio. Por favor intente más tarde.');                 	  
               });				
			}
			
			// es un producto cargado
			else{
				$scope.priceDetail = tools_service.buildAffiliateDetailPrice($scope.session.affiliate, '%',minPrice.net, minPrice.currency, "unique");
			}			
		}
	};
	/**
		  * se llama al iniciar la pagina
		  */
	    _getsession(function () {
	    	tools_service.showPreloader($scope, "hide");
			if (debug)
            	$log.log('session : ',$scope.session);
            $scope.init();
        });
      	
}]);

                           
