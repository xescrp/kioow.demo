app.controller(
	'RequestShowCtrl',
	[
			'$scope',
			'toaster',
			'$uibModal',
			'$location',
			'$http',
			'yto_api',			
			'yto_session_service',
			'tools_service',
			'http_service',
			'$log',
			'$filter',			
      		'modals_service',
      		'destinations_service',
      		'productpreviewhelpers',
			function($scope,
					toaster,
					$uibModal,
					$location,
					$http, 
					yto_api,					
					yto_session_service,
					tools_service,
					http_service,
					$log,
					$filter,					
          			modals_service,
          			destinations_service,
          			productpreviewhelpers) {

        'use strict';
    
    var brandpath = '';
    if (typeof brandPath !== 'undefined') {
        $scope.brandpath = brandPath;
    }
 	$scope.appversion = '';
    if (typeof appversion !== 'undefined') {
        $scope.appversion = appversion;
    }

    $scope.now = new Date();

    $scope.session = {};
    $scope.markers = {};
    $scope.havemap = false;
    
    var debug = $location.search().debug;

    var path = $location.path();
    var temp = path.split('/');

    $scope.userquerycode = ''; 
    $scope.userquery = {};
    $scope.quotes = [];
    $scope.allquotes = [];
    $scope.priceDetail={};

    //images helper
    $scope.getimage = function (url, imagename) {
       return tools_service.cloudinaryUrl(url, imagename);
    };
    // date helper
    $scope.transformToDate = function(dateObj){
      return tools_service.transformToDate(dateObj);
    };

    $scope.getResponses = function(query){
      var num = 0;
      for (var i = 0; i < query.quotes.length; i++) {
        // $log.log(query.quotes[i].code);
        if (query.quotes[i].status == 'published' || query.quotes[i].status == 'win' || query.quotes[i].status == 'lost' || query.quotes[i].status == 'discard'){
          num++;
        }        
      }
      return num;
     };

    $scope.go = function ( path ) {
      $location.path( path );
    };

    var _buildSummary = function(quote){
      if (debug)
            $log.log('_buildSummary :', quote.code);
      
      // get cant paxs
      var paxs = 0;
      if (quote.rooms != null && quote.rooms != undefined){
        if(quote.rooms.single && quote.rooms.single.quantity > 0){
      	  paxs += quote.rooms.single.quantity;    
        }
        if(quote.rooms.double && quote.rooms.double.quantity>0){
      	  paxs+= (2*quote.rooms.double.quantity);
        }
        if(quote.rooms.triple && quote.rooms.triple.quantity>0){
      	  paxs+= (3*quote.rooms.triple.quantity);
        }
        if(quote.rooms.quad && quote.rooms.quad.quantity>0){
      	  paxs+= (4*quote.rooms.quad.quantity);
        }    
      }
//      // ninios (no cuentan van incluidos en las habitaciones)
//      if(quote.children!= null && quote.children.length >0 ){
//    	  paxs+=quote.children.length;    	  
//      }
      quote.paxs = paxs;
      

      // get dmc
      for (var i = 0; i < $scope.userquery.dmcs.length; i++) {
        if ($scope.userquery.dmcs[i].code == quote.dmccode){
          quote.dmc = $scope.userquery.dmcs[i];
          if (debug)
            $log.log('DMC :', quote.dmc);
        }
      };

      // get hotels
      // get meals      
      quote.hotels = []
      var meals = { breakfast : 0, lunch : 0, dinner : 0};
      
      //recorro el itinerario para obtener categoria de hoteles y comidas
      if (quote.products !== null && quote.products !== undefined && quote.products.itinerary !== null && quote.products.itinerary !== undefined){
        for (var i = 0; i < quote.products.itinerary.length; i++) {
          
          if (quote.products.itinerary[i].hotel.breakfast){
              meals.breakfast++
          }
          if (quote.products.itinerary[i].hotel.lunch){
              meals.lunch++
          }
          if (quote.products.itinerary[i].hotel.dinner){
              meals.dinner++
          }

          // 
          var toCheck = '';
          if (quote.products.itinerary[i].hotel.category == 'unclassified *'){
            toCheck = 'otros alojamientos';
          } else{
            toCheck = quote.products.itinerary[i].hotel.category;
          }

          if (quote.hotels.indexOf(toCheck) == -1) {
            if (quote.products.itinerary[i].hotel.category == '' ||
                quote.products.itinerary[i].hotel.category == undefined ||
                quote.products.itinerary[i].hotel.category == null) {
              // nothing to do
            } else {
              quote.hotels.push(toCheck);
            }
          }

        };
      }
      quote.hotels = quote.hotels.join(', ');

      var txtbreakfast = '';
      var txtlunch = '';
      var txtdinner = '';
      quote.meals = '';

      if (meals.breakfast > 0){
        if (meals.breakfast == 1){
          txtbreakfast = '1 desayuno';
        } else {
          txtbreakfast = meals.breakfast+' desayunos';
        }
        quote.meals = txtbreakfast;
      }
     

      if (meals.lunch > 0){
        if (meals.lunch == 1){
          txtlunch = '1 comida';
        } else {
          txtlunch = meals.lunch+' comidas';
        }
        if(quote.meals != ''){
        	quote.meals = quote.meals+', '+txtlunch;
        }
        else{
        	quote.meals = quote.meals+txtlunch;  	
        }        
      }
      

      if (meals.dinner > 0){
        if (meals.dinner == 1){
          txtdinner = '1 cena';
        } else {
          txtdinner = meals.dinner+' cenas';
        }
        if(quote.meals != ''){
        	quote.meals = quote.meals+', '+txtdinner;
        }
        else{
        	quote.meals = quote.meals+txtdinner;  	
        }  
      }
     

      if (debug)
            $log.log('meals :', quote.meals);

      if (debug)
            $log.log('sleepscitys :', sleepscitys);


    };
    
   
    /**
     * funcion palanca al llamarla cambia el valor de la variable llamada
     */
    $scope.toggle = function(aux) {    	
		eval("$scope." + aux + " = !$scope." + aux);
	};
	
	/**
	 * inicializa la estructura pricedetail para mostrar en el desglose de la quote
	 */
	$scope.initPriceDetail = function(quote){
						
		// to show and hide price
		// $log.log ('1quote.showPriceDetail ',quote.showPriceDetail);
		if (quote.showPriceDetail === false || quote.showPriceDetail === undefined) {
			quote.showPriceDetail = true;
		}else{
			quote.showPriceDetail = false;
		}
		// quote.showPriceDetail = quote.showPriceDetail === (false || undefined) ? true: false;
		// $log.log ('2quote.showPriceDetail ',quote.showPriceDetail);
		// detectar la quote seleccionada

		for(var itQ = 0; itQ < $scope.quotes.length; itQ++){
						
			if($scope.quotes[itQ].code == quote.code){
				
				// TODO eliminar esta inicializacion. Se creo por si no tuviera la estructura pvpAffiliate, para quotes antiguas
				if(!$scope.quotes[itQ].pvpAffiliate || !$scope.quotes[itQ].pvpAffiliate.exchange || !$scope.quotes[itQ].pvpAffiliate.exchange.value){
					$scope.priceDetail = $scope.getMinPrice({net : $scope.quotes[itQ].amount.exchange.value, currency:  $scope.quotes[itQ].amount.exchange.currency });
				}
				else{
					
					// si es unt tailormade de un grupo, seteo el fee de grupos
					if($scope.userquery.group != null && $scope.userquery.group.adults !=null && $scope.userquery.group.adults >0){
						$log.log("*** fee de grupo: ",$scope.quotes[itQ].fees.groups);
						$scope.priceDetail = {
							fee :  $scope.quotes[itQ].fees.groups,
							feeunit: '%', 
							price : {
							   net: $scope.quotes[itQ].amount.exchange.value,
							   pvp: $scope.quotes[itQ].pvpAffiliate.exchange.value, 
							   currency: $scope.quotes[itQ].pvpAffiliate.exchange.currency 
							}
					   };			
					}

					// si es un tailormade normal, seteo su fee
					else{
						$log.log("*** fee de tailormade: ",$scope.quotes[itQ].fees.tailormade);
						$scope.priceDetail = {
							fee :  $scope.quotes[itQ].fees.tailormade,
							feeunit: '%', 
							price : {
							   net: $scope.quotes[itQ].amount.exchange.value,
							   pvp: $scope.quotes[itQ].pvpAffiliate.exchange.value, 
							   currency: $scope.quotes[itQ].pvpAffiliate.exchange.currency 
							}
					   };
					}
				}
			}else {
				$scope.quotes[itQ].showPriceDetail = false;
			}
		}
		// var salir = false;
		// for(var itQ = 0; itQ < $scope.quotes.length && !salir; itQ++){
			
		// 	if($scope.quotes[itQ].code == quote.code){
		// 		salir = true;
				
		// 		// TODO eliminar esta inicializacion. Se creo por si no tuviera la estructura pvpAffiliate, para quotes antiguas
		// 		if(!$scope.quotes[itQ].pvpAffiliate || !$scope.quotes[itQ].pvpAffiliate.exchange || !$scope.quotes[itQ].pvpAffiliate.exchange.value){
		// 			$scope.priceDetail = $scope.getMinPrice({net : $scope.quotes[itQ].amount.exchange.value, currency:  $scope.quotes[itQ].amount.exchange.currency });
		// 		}
		// 		else{
		// 			$scope.priceDetail = {
		// 					   fee :  $scope.quotes[itQ].fees.tailormade,
		// 					   feeunit: '%', 
		// 					   price : {
		// 						   net: $scope.quotes[itQ].amount.exchange.value,
		// 						   pvp: $scope.quotes[itQ].pvpAffiliate.exchange.value, 
		// 						   currency: $scope.quotes[itQ].pvpAffiliate.exchange.currency 
		// 					   }
		// 			   };
		// 		}
		// 	}
		// }
	};

    function _getContentToPrint(url, callback) {

        return $http({
            method: 'GET',
            url: url,
            data: null,
            headers: {}
        }).success(function (data) {
            callback(data);
        }).error(function () {
            alert("error");
        });
    }

    

    $scope.printTravel = function (productSlug, product) {
        console.log('print full Travel ', productSlug);
        console.log('print full Travel ', $scope.session.affiliate.images.logo);
        tools_service.showPreloader($scope, 'show');

        var url_fullpath = $location.$$absUrl;
        var url_mod = url_fullpath.replace("#" + $location.$$hash, '');
        var url = $scope.printLink;
        var namefile = '';

        //si el slug viene vacio pongo el numero de la quote
        if (productSlug == undefined || productSlug == null || productSlug == '' || productSlug == '  ') {
            var ruta = $location.path().split('/');
            console.log("quote name: ", ruta[ruta.length - 2]);
            namefile = 'yto-viaje-' + ruta[ruta.length - 2];
        }
        else {
            namefile = 'yto-viaje-' + productSlug;
        }

        // 1) obtener html a imprimir
        _getContentToPrint(url, function (result) {
            var dataFooter = {
                name: $scope.session.affiliate.company.name,
                logo: $scope.session.affiliate.images.logo.url
            };
            var dataHeader = {
                name: $scope.session.affiliate.company.name,
                logo: $scope.session.affiliate.images.logo.url,
                phone: $scope.session.affiliate.company.phone,
                web: $scope.session.affiliate.company.website,
                address: $scope.session.affiliate.company.location.fulladdress,
                cp: $scope.session.affiliate.company.location.cp,
                city: $scope.session.affiliate.company.location.city
            };

            if (typeof product !== 'undefined') {
                dataHeader.tit = product.title_es;
                if (product.categoryname !== null && product.categoryname !== undefined) {
                    dataHeader.cat = product.categoryname.label_es;
                }
            }
            var urlLocal = 'http://' + location.host + '/' //'http://www.yourttoo.com/';

            var footerurl = '\"' + urlLocal + 'pdfPartial?part=footer&' + $httpParamSerializerJQLike(dataFooter) + '\"';
            var headerurl = '\"' + urlLocal + 'pdfPartial?part=header&' + $httpParamSerializerJQLike(dataHeader) + '\"';
            var pageSettings = '-B 20mm -L 0mm -R 0mm -T 42mm --footer-html ' + footerurl + ' --header-html ' + headerurl;

            $log.info('footerurl :', footerurl);
            $log.info('headerurl :', headerurl);

            $log.info('pageSettings :', pageSettings);
            // 2) llamo al core para convertirlo en pdf
            var rqCB = yto_api.post('/download/getpdffromhtml', {
                html: result,
                pageSettings: pageSettings,
                type: 'products',
                namefile: namefile
            });

            //response OK
            rqCB.on(rqCB.oncompleteeventkey, function (productPdf) {

                if (productPdf != null && productPdf.url != null) {
                    $window.open(productPdf.url, '_blank');
                }
                //error al generar factura 
                else {
                    console.log("ERROR, getting pdf from html for productPdf: " + productSlug);
                    toaster.pop('error', "Error", "Error al generar PDF del producto, " + productSlug, 10000);
                }

                tools_service.showPreloader($scope, "hide");

            });

            //response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                console.log(err);
                toaster.pop('error', "Error", "Error al generar PDF del producto, " + productSlug, 10000);
            });
        });
    };
	
	
	/**
	 * funcion que guarda el precio modificado del fee
	 */
	$scope.savePrice = function(quote){		
		//	1) identificar la quote de la query
		var salir = false;
		for(var itQ = 0; itQ < $scope.quotes.length && !salir; itQ++){
			
			if($scope.quotes[itQ].code == quote.code){
				salir = true;
				$scope.quotes[itQ].showPriceDetail = false;
				// 2) actualizo la quote en el scope
				$scope.quotes[itQ] = quote;
				$log.log("quote encontrada, llamo a guardar fees: ",quote.fees);
				
				
				// 3) llamar al api para guardar
				var rq = {
						command: 'save', // command: 'list', 
						service: 'api',
						request: {
							data: quote,
							query: { code: quote.code },
							collectionname: 'Quotes',
							oncompleteeventkey: 'save.done',
							onerroreventkey: 'save.error',
						} 
				};

				var rqCB = yto_api.send(rq);
		          
				// response OK
				rqCB.on(rqCB.oncompleteeventkey, function (rsp) {		        	  
		  			$log.log("guardado la quote correctamente: ",rsp.code);	  			 
		  			 
				});
		          
		          // response KO
				rqCB.on(rqCB.onerroreventkey, function (err) {
					$log.error("error discard quote . Details: ",err);
					$log.log('ERROR in  discard quote. Details: ',err);
					$uibModalInstance.close($scope.reason);
					window.location = brandPath+'/request/'+$scope.quote.userqueryCode;
				}); 				
			}
		}
	};
	
    
    /**
     * funcion que actualiza el fee de un tailormade por el afiliado
     */
   $scope.updateFeeTailormade = function(quote,fee){
	   if(fee==null || fee <0){
		   fee=0;
	   }
	   var newFee = 0;
	   var pvp = 0;
	   
	   // 1) actualizar el fee si es de tailormade o grupo	   	   
	   // 1.1) si es unt tailormade de un grupo, seteo el fee de grupos
	   if($scope.userquery.group != null && $scope.userquery.group.adults !=null && $scope.userquery.group.adults >0){
			$log.log("fee antiguo de grupo: ",quote.fees.groups);
			quote.fees.groups = Math.round(fee);
			newFee = Math.round(fee);
			$log.log("fee redondeado de grupo: ",quote.fees.groups);
			
			// 2)calcular el pvp actual con ese fee	 
			$log.log("pvp viejo de grupo: ",quote.pvpAffiliate.exchange.value);
			pvp = Math.round(quote.amount.exchange.value / (1 - (quote.fees.groups / 100)));
			$log.log("pvp nuevo de grupo: ",pvp);					
	   }

	   // 1.2) si es un tailormade normal, seteo su fee
	   else{
			$log.log("fee antiguo de normal:  ",quote.fees.tailormade);
			quote.fees.tailormade = Math.round(fee);
			$log.log("fee redondeado de normal: ",quote.fees.tailormade);
			newFee = Math.round(fee);
			
			// 2)calcular el pvp actual con ese fee	 
			$log.log("pvp viejo: ",quote.pvpAffiliate.exchange.value);			
			pvp = Math.round(quote.amount.exchange.value / (1 - (quote.fees.tailormade / 100)));
			$log.log("pvp nuevo (calculado sobre el pvp antigua y el fee): ",pvp);
		}

	    // ********************************* 
		// 3) calcular el pvp por habitacion
	    // *********************************	   
		var pvpFinal = 0;
		// rooms
		if(quote.rooms.single && quote.rooms.single.quantity > 0){
			$log.log("1) pvp per pax simple antiguo: ",quote.rooms.single.pvpAffiliatePerPax.exchange.value);
			quote.rooms.single.pvpAffiliatePerPax.exchange.value = Math.round(quote.rooms.single.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
			pvpFinal += quote.rooms.single.pvpAffiliatePerPax.exchange.value * quote.rooms.single.quantity;
			$log.log("1) pvp per pax simple nuevo: ",quote.rooms.single.pvpAffiliatePerPax.exchange.value);		   
		}
		if(quote.rooms.double && quote.rooms.double.quantity>0){
			$log.log("2) pvp per pax doble antiguo: ",quote.rooms.double.pvpAffiliatePerPax.exchange.value);
			quote.rooms.double.pvpAffiliatePerPax.exchange.value = Math.round(quote.rooms.double.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
			pvpFinal += quote.rooms.double.pvpAffiliatePerPax.exchange.value * 2 * quote.rooms.double.quantity;
			$log.log("2) pvp per pax doble nuevo: ",quote.rooms.double.pvpAffiliatePerPax.exchange.value);
		}
		if(quote.rooms.triple && quote.rooms.triple.quantity>0){
			$log.log("3) pvp per pax triple antiguo: ",quote.rooms.triple.pvpAffiliatePerPax.exchange.value);
			quote.rooms.triple.pvpAffiliatePerPax.exchange.value = Math.round(quote.rooms.triple.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
			pvpFinal += quote.rooms.triple.pvpAffiliatePerPax.exchange.value * 3 * quote.rooms.triple.quantity;
			$log.log("3) pvp per pax triple nuevo: ",quote.rooms.triple.pvpAffiliatePerPax.exchange.value);
		}
		if(quote.rooms.quad && quote.rooms.quad.quantity>0){
			$log.log("4) pvp per pax quad antiguo: ",quote.rooms.quad.pvpAffiliatePerPax.exchange.value);
			quote.rooms.quad.pvpAffiliatePerPax.exchange.value = Math.round(quote.rooms.quad.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
			pvpFinal += quote.rooms.quad.pvpAffiliatePerPax.exchange.value * 4 * quote.rooms.quad.quantity;
			$log.log("4) pvp per pax quad nuevo: ",quote.rooms.quad.pvpAffiliatePerPax.exchange.value);
		}
		
		// si hay ninios el pvp no esta relacionado con las habitaciones, por tanto convierto el pvp con el nuevo fee
		if(quote.children != null && quote.children.length > 0){
			// pvp de child
			for(var itC = 0; itC < quote.children.length; itC++){
				$log.log("Niños) pvp per pax niño "+itC+" antiguo: ",quote.children[itC].pvpAffiliatePerPax.exchange.value);
				quote.children[itC].pvpAffiliatePerPax.exchange.value = Math.round(quote.children[itC].amountPricePerPax.exchange.value / (1 - (newFee / 100)));
				pvpFinal += quote.children[itC].pvpAffiliatePerPax.exchange.value;
				$log.log("Niños) pvp per pax niño "+itC+" nuevo: ",quote.children[itC].pvpAffiliatePerPax.exchange.value);
			}			
			// pvp final
			$log.log(" pvp final niños partiendo de la suma: ", pvp);
			quote.pvpAffiliate.exchange.value = pvp;			
		}
		
		// si no tiene ninios el pvp es fruto de la suma de los nuevos pvp por habitacion
		else{
			quote.pvpAffiliate.exchange.value = Math.round(pvpFinal);
			$log.log("pvp Affiliado final total): ",quote.pvpAffiliate.exchange.value);
		}

	   
	   $scope.priceDetail = {
			   fee :  newFee,
			   feeunit: '%', 
			   price : {
				   net: quote.amount.exchange.value,
				   pvp: quote.pvpAffiliate.exchange.value, 
				   currency: quote.pvpAffiliate.exchange.currency 
			   }
	   };
   } 
   
   $scope.getItineraryDay = function( day ){
   		return productpreviewhelpers.getItineraryDay(day);
   };

   
/**
 * funcion que rescata de cookie el id de reserva a mostrar los detalles
 */
   function _getsession(callback) {
       try{
	    	// recurperar el token
    	   yto_session_service.currentSession(function (session) {        	  
               if (session) {                  
                   $scope.session = session;
                   if (typeof(callback) == "function"){                	   
                	   callback();
                   }
               } else {                   
                   window.location = brandpath+'/requests';
                   
               }

           });			
	   }
       catch (err) {
    	   $log.log(err);
       }
   }


   /**
    * trae la query de mongo (usa api nueva)
    */
   var _getUserQuery = function(userquerycode){
	   	                
	   	var rq = {
            command: 'findone',
            service: 'api',
            request: {
                query: { code: userquerycode },
                collectionname: 'UserQueries',
                populate: [{path: 'affiliate'}, {path: 'quotes'}, {path: 'dmcs'}]
            },           
        };

        var rqCB = yto_api.send(rq);

        // response OK
        rqCB.on(rqCB.oncompleteeventkey, function (data) {          
        	if(debug)
        		$log.log('_getUserQuery response api : ',data);        	
        	if (data != null && data != ''){           	
               $scope.userquery = data;

               if(debug)
               	$log.log('query loaded : ',$scope.userquery);
               
               _getQuotes($scope.userquery._id);
               _getAllQuotes($scope.userquery._id);

                $scope.$broadcast('queryWasLoaded', $scope.userquery);

           } else {
           		$log.error('Error getting query : ',userquerycode);
           }       	
        });
        
        // response KO
        rqCB.on(rqCB.onerroreventkey, function (err) {                        	
        	$log.error('Error getting query : ',userquerycode, '. Details: ',err);
        });	
   };

   
   /**
    * para mostrar los mensajes de dmcs a traveler, si estos no tienen la quote published debo tener todas las quotes
    */
   var _getAllQuotes = function(userqueryid){
	   var rq = {
	        command: 'find',
	        service: 'api',
	        request: {
	            query: { userqueryId: userqueryid },
	            collectionname: 'Quotes',
	            
	        }
	    };
	
	    var rqCB = yto_api.send(rq);
	
	    // response OK
	    rqCB.on(rqCB.oncompleteeventkey, function (data) {
	    	
	    	if (data != null && data != ''){            	
                var quotes = data;	               
                for (var i = 0; i < quotes.length; i++) {	                  
                	$scope.allquotes.push(quotes[i]);                  
                };
                $log.log("allquotes length: ",$scope.allquotes.length);

            } else {
            	tools_service.showPreloader($scope, "hide");
            	if(data == null){            		            		
            		$log.error('Error getquotes for queryID1 : ',userqueryid);
            	}
            	else if(data.length == 0){
            		$log.log("No quotes for this queryID: ",userqueryid);
            	}
            }
	    });
	    
	    // response KO
	    rqCB.on(rqCB.onerroreventkey, function (err) {                        	
	    	$log.error('Error getquotes for queryID2 : ',userqueryid, '. Details: ',err);
	    });
   };
   
   
   /**
    * trae todas las quotes de la query (tira de a api nueva)
    */
   var _getQuotes = function(userqueryid){
      ///api/getQuotesByQueryId
	   	if(debug)
	   		$log.log('get quotes for queryid : ',userqueryid);
		var rq = {
	        command: 'find',
	        service: 'api',
	        request: {
	            query: { userqueryId: userqueryid },
	            collectionname: 'Quotes',
	            populate: [{path: 'dmc', select : 'code contact'}, {path: 'products'}]	           
	        }
	    };
	
	    var rqCB = yto_api.send(rq);
	
	    // response OK
	    rqCB.on(rqCB.oncompleteeventkey, function (data) {          
	    	if(debug)
	    		$log.log('_getQuotes response api : ',data);
	    	$log.log('_getQuotes response api : ',data);
	    	// si hay quotes
	    	if (data != null && data != ''){	         
	    		var quotes = data;	
	    			           
	    		for (var i = 0; i < quotes.length; i++) {
	    			if (quotes[i].status == 'published' || quotes[i].status == 'win' || quotes[i].status == 'lost' || quotes[i].status == 'discard'){
	    				$scope.quotes.push(quotes[i]);
	    			}
	    		}
	    		for (var i = 0; i < $scope.quotes.length; i++) {
	    			_buildSummary($scope.quotes[i]);
	    		}	
	    		tools_service.showPreloader($scope, "hide");	
	    	} else {
	    		tools_service.showPreloader($scope, "hide");
	    		if(data == null){            		            		
            		$log.error('Error getquotes for queryID3 : ',userqueryid);
            	}
            	else if(data.length == 0){
            		$log.log("No quotes for this queryID: ",userqueryid);
            	}
	    	}
	    });
	    
	    // response KO
	    rqCB.on(rqCB.onerroreventkey, function (err) {                        	
	    	$log.error('Error getquotes for query : ',userqueryid, '. Details: ',err);
	    });
   };


//**********************************************
  //  modal para cancelar la reserva
  //**********************************************
  $scope.cancellQueryModal = function(){	
    modals_service.openmodal('cancellquery', $scope);
    };
  $scope.$on('cancellqueryaffiliate', function (event) {
      _cancellQuery();
  }); 

  /**
   * funcion que cancela la reserva
   */
  var _cancellQuery = function() {
    
    tools_service.showPreloader($scope, "show");    
    $scope.userquery.state = 'cancelled';
        
     var dummyCancel = {
          cancelDate: new Date(),
          user : $scope.session.user.email,
          byTraveler: true
      };
      $scope.userquery.cancelled = dummyCancel;
      
    
        // 4) Actualizo  el estado en historico
        var  dummyHistoric = {    
        "date": new Date(),
        "state" : $scope.userquery.state,
        "user" :  $scope.session.user.email           
        };

        if($scope.userquery.historic == null){
          $scope.userquery.historic=[];
        }
        $scope.userquery.historic.push(dummyHistoric);
        
        for(var itQ=0; itQ < $scope.userquery.quotes.length; itQ++){
          $scope.userquery.quotes[itQ].status='cancelled';      
          $scope.userquery.quotes[itQ].cancelled = dummyCancel;
        }

        var toasterSettings = {
            type: 'success', 
            title: "Solicitud Cancelada",
            text: "Se ha cancelado correctamente.", 
            time: 5000
        };

        _saveQuery(function(){
        	//window.location = brandPath+'/requests';
        }, toasterSettings);


         // 5) guardar en base de datos en mongo, api nueva        
         var rq = {
             command: 'save',
             service: 'api',
             request: {
           	  data: $scope.userquery,
                 query: { code: $scope.userquery.code },
                 collectionname: 'UserQueries',
                 oncompleteeventkey: 'save.done',
	             onerroreventkey: 'save.error',
	             populate: [{path: 'affiliate'}]
             } 
         };

         var rqCB = yto_api.send(rq);
        
         // response OK
         rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
      	  
			 $log.log("guardado la quote correctamente: ",$scope.userquery.code);      			
						
			 // 6) cerrar el modal
		    // $uibModalInstance.close($scope.reason);
		    
		     // 7) redirigir a la web de la quer  		    
		     window.location = brandPath+'/requests';
         });
        
         // response KO
         rqCB.on(rqCB.onerroreventkey, function (err) {
       	  $log.error("error discard quote . Details: ",err);
       	  $log.log('ERROR in  discard quote. Details: ',err);
       	  //$uibModalInstance.close($scope.reason);
       	  window.location = brandPath+'/requests';
         });     
    
  };

  $scope.saveQuery = function(){
  	_saveQuery(null, null);
  };


  function _saveQuery(callback, toasterSettings){
  	if (!$scope.session.user.isAdmin){
  		var rq = {
            command: 'save',
            service: 'api',
            request: {
          	  data: $scope.userquery,
                query: { code: $scope.userquery.code },
                collectionname: 'UserQueries',
                oncompleteeventkey: 'save.done',
	            onerroreventkey: 'save.error',
	            populate: [{path: 'affiliate'}]
            } 
        };

        var rqCB = yto_api.send(rq);
        
        // response OK
        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	$log.log("guardado la query correctamente: ",rsp);
        	$scope.userquery = rsp;
			tools_service.showPreloader($scope, "hide");
            if (toasterSettings !== null && toasterSettings !== undefined){
                toaster.pop(toasterSettings.type, toasterSettings.title, toasterSettings.text, toasterSettings.time);
            } else {
                toaster.pop('success', "Solicitud Actualizada", "se han guardado los cambios.", 5000);
            }
			if (typeof callback === 'function'){
				callback();
			}
        });
        
        // response KO
        rqCB.on(rqCB.onerroreventkey, function (err) {
        	tools_service.showPreloader($scope, "hide");
			tools_service.showConectionError($scope, "show");
			$log.log(err);
			toaster.pop('error', "Error", "Problemas del servicio. Intente más tarde. " + err, 5000);
        });
    } else {
		tools_service.showFullError($scope, "show", 'error', 'Los administradores no pueden modificar datos, recarga la página.');
		}
  }

  /**
   * POPUP para descartar quote
   */
  $scope.askWhyDiscard = function(quote){
		  
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/partials/widgets/modal-ask-why-discard.html.swig',
        controller: 'askWhyDiscard',
        size: '',
        resolve: {
        	quote: function () {
        		return quote;
            },     
            query :function () {
            	return $scope.userquery;
            }
          }
      });

      modalInstance.result.then(function (reason) {
          // 
          $log.log('user discard qoute');
          $log.log('reason:', reason);

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        }
      );
  };





  $scope.getMinPrice = function(minPrice){
    if (debug)
        $log.log('session: ',$scope.session);
    if($scope.session != null && $scope.session.user.isAffiliate){
      return tools_service.buildAffiliateDetailPrice($scope.session.affiliate, '%',minPrice.net, minPrice.currency, "tailormade");
    }
  };

   /**
    * funcion que recupera la sesion y trae de mongo la query
    */
   var _init = function(){
   		if (debug)
   			$log.log('init request page for traveler');

      tools_service.showPreloader($scope, "show");
   		_getsession(function (){
        //$log.error($scope.session);
      });
   		var path = $location.path();
    	var temp = path.split('/');
    	$scope.userquerycode = temp[temp.length-1]; 
    	_getUserQuery($scope.userquerycode);
   };


   $scope.quoteview = quote;
   $scope.product = product;
   //_init();
	   	   
}]);


/**
 * controller del POPUP para descartar quote
 */
app.controller('askWhyDiscard', function ($scope, $uibModalInstance, quote, yto_api, query, http_service, $log, tools_service,toaster) {

  $scope.quote = quote;
  $scope.reason = '';  

  
  
  
  $scope.discard = function () {	
	  
	 // no se escogido un motivo de cancelacion 
	 if(!$scope.reason || $scope.reason==null){
		$uibModalInstance.close($scope.reason);
        toaster.pop('error', "Por favor escoga un motivo.", "Debe seleccionar un motivo para descartar la cotización.", 5000);
	 } 
	 else{
	
		// 0) loader
		tools_service.showPreloader($scope, 'show');
		
		// 1) generar el texto del motivo
		var textReason = '';
		if($scope.reason=='price'){
			textReason = 'The customer does not like the price.';
		}
		else if($scope.reason=='services'){
			textReason = 'The customer does not like services.';
		}
		else{
			textReason = 'Other reasons.';
		}	
		
				
		// 2)  actualizar la quote
		var dummyCancel;
		
		// si es un afiliado
		if(query.affiliate != null){			
			dummyCancel = {
					cancelDate: new Date(),
					user : query.affiliate.contact.email,
					byTraveler: true,
					reason: $scope.reason    
			}
		}
		
		// si es un traveler
		else if (query.traveler != null){			
			dummyCancel = {
					cancelDate: new Date(),
					user : query.traveler.email,
					byTraveler: true,
					reason: $scope.reason    
			}
		}
				
		
		$scope.quote.status = 'discard';
		$scope.quote.cancelled = dummyCancel;
		
		
		// 3) llamar al api para guardar
		  var rq = {
                  command: 'save', // command: 'list', 
                  service: 'api',
                  request: {
                	  data: $scope.quote,
                      query: { code: $scope.quote.code },
                      collectionname: 'Quotes',
                      oncompleteeventkey: 'save.done',
		              onerroreventkey: 'save.error',
                  } 
              };

          var rqCB = yto_api.send(rq);
          
          // response OK
          rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	  
  			$log.log("guardado la quote correctamente: ",$scope.quote.code);      			
  			
  			// *********************************
  			// 4) mandar mail al dmc de la quote
  			// *********************************
  			var contentObj = {
  	            request : query,
  	            quote : $scope.quote,
  	            textReason:  textReason
  	        };
  			
  			  			
  			var postdata = {
  				to : [$scope.quote.dmc.contact.reqFITContact.email],            
  	            subject: "[OMT] Your quote over the query "+$scope.quote.userqueryCode+" has been discarded.",
  	            mailtemplate: 'dmcquotediscard_en',
  	            mailparameter: contentObj
  	        };
  			
  	        //http_service.http_request(openmarket_api_service.apiCoreServiceUrl() + 'omt/SendEmailNotification', 'POST', '', postdata).then(
  	        //function (res) {
  	        //    if (res.ResultOK){
  	        //        $log.info("Send Notification OK");             
  	        //    } else {
  	        //        $log.error(res.Message);                         
  	        //    }            
  	        //});
  	
  			
  			// ********************
  			// 5) mandar mail a omt
  			// ********************
  			var contentObj = {
	            request : query,
	            quote : $scope.quote,
	            textReason:  textReason
	        };
			var postdata = {
				to: ['notifications@openmarket.travel'],  					
			    //to : ['antosango@gmail.com'], // ONLY FOR TEST            
	            subject: "[OMT] Descartada una respuesta petición a medida:  "+$scope.quote.userqueryCode,
	            mailtemplate: 'omtquotediscard',
	            url: 'http://openmarket.travel/omt-response?code='+$scope.quote.userqueryCode,
	            mailparameter: contentObj
	        };
			
	        //http_service.http_request(openmarket_api_service.apiCoreServiceUrl() + 'omt/SendEmailNotification', 'POST', '', postdata).then(
	        //function (res) {
	        //    if (res.ResultOK){
	        //        $log.info("Send Notification OK");             
	        //    } else {
	        //        $log.error(res.Message);	
	        //        toaster.pop('error', "Error al mandar notificacion.", "Por favor intentelo más tarde, o pongase en contacto con Openmarket.travel.", 5000);
	        //    }            
	        //});
  			
  			
  			// 6) cerrar el modal
  		    $uibModalInstance.close($scope.reason);
  		    
  		    // 7) redirigir a la web de la quer  		    
  		    window.location = brandPath+'/request/'+$scope.quote.userqueryCode;  		    
          });
          
          // response KO
          rqCB.on(rqCB.onerroreventkey, function (err) {
        	  $log.error("error discard quote . Details: ",err);
        	  $log.log('ERROR in  discard quote. Details: ',err);
        	  $uibModalInstance.close($scope.reason);
        	  window.location = brandPath+'/request/'+$scope.quote.userqueryCode;
          });    
       }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});



