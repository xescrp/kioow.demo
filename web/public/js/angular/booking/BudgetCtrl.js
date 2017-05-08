//*******************************************************
//controler para el popup para modificar la lista de paxes de una bookiing
//*******************************************************

app.controller("affiliateBudgetLauncher", function (
	$scope,
	$uibModal,
	toaster,
	$location) {

    /**
     * funcion que guarda un presupuesto
     */
    $scope.saveBudget = function(){
    	
    	// si no hay fecha seleccionada
    	if(!$scope.dateNoMatch){
    		toaster.pop('error', 'Error, faltán datos.', 'Por favor seleccione una fecha con disponibilidad.');
    	}
    	else{
    		
    		// paso la reserva, el producto y la feca
    		//var items = [$scope.newbooking, $scope.product, $scope.dateSelected, $scope.urlapi, $scope.local.affiliate, $scope.local, $scope.nationalities];
            var items = [$scope];

    		var modalInstance = $uibModal
			.open({
				templateUrl : '/partials/booking/yto-bookingbudget.html.swig?v='+$scope.version,
				controller : 'affiliateBudgetCtrl',
				size : '',
				resolve : {
					items : function() {
						return items;
					}
				}
			});
    	}
    };

	/**
     * Muestra la ventana de aviso cuando es un budget multidays
     */

    $scope.aceptChangeBudget = function(){
    
		// paso la reserva, el producto y la feca
    	var path = $location.path();
		var slug = path.slice(path.indexOf("/booking/")+9);
		if (slug.indexOf("/") != -1){
			slug = slug.slice(0, slug.indexOf("/"));
		}
    	var url = '/viaje/'+slug;
    	
    	
		var items = [url];

		var modalInstance = $uibModal
		.open({
			templateUrl: '/partials/widgets/modal-info-budget.html.swig',					
			controller : 'aceptChangeBudgetCtrl',
			size : '',
			resolve : {
				items : function() {
					return items;
				}
			}
		});
		       
    };
    
    // escucha evento para lanzar modal
    $scope.$on('aceptChangeBudget', function (event) {
    	$scope.aceptChangeBudget();
	});

	/**
     * inicializa 
     */

    function _init () {
    	console.log(">: ");
	}
	_init();

});


app.controller("affiliateBudgetCtrl", function (
	$scope,
	$uibModalInstance,
	$http,
	items,
	tools_service,
	http_service,
	toaster,
	yto_api,
	bookinghelpers) {
    console.log(items);
    //_.extend($scope, items[0]);

	$scope.rooms = [
 		{"roomCode" : "single", "label": "Individual", "pax" : 1},
 		{"roomCode" : "double", "label": "Doble", "pax" : 2},
 		{"roomCode" : "triple", "label": "Triple", "pax" : 3}//,
 		//{"roomCode" : "quad", "label": "Cuádruple", "pax" : 4}
 	];
    $scope.items = items;
    //inicializo booking con lo que le paso desde la pantalla previa al modal
    //[$scope.newbooking, $scope.product, $scope.dateSelected, $scope.urlapi, $scope.local.affiliate, $scope.local, $scope.nationalities];
    $scope.booking = items[0].$parent.booking;
    $scope.product = items[0].$parent.product;
    $scope.urlapi = items[0].$parent.urlapi;
    $scope.affiliate = items[0].$parent.affiliate;
    $scope.nationalities = items[0].$parent.nationalities;
    $scope.addRoom = items[0].$parent.addRoom;
    $scope.deleteRoom = items[0].$parent.deleteRoom;
	 //$scope.product = items[1];
	 //$scope.selectedDate = items[2];
	 //$scope.urlapi = items[3];
	 //$scope.affiliate = items[4];
	 //$scope.local = items[5];
	 //$scope.nationalities= items[6];
	 //$scope.error = "";
  //  $scope.errorServerSave = false;
    
    
    $scope.selectedDate = items[0].$parent.dateSelected;

    $scope.error = "";
    $scope.errorServerSave = false;

	/**
	 * funcion que cierra/oculta el moodal
	 */
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /**
     * funcion que guarda un presupuesto
     */
    $scope.printBudget = function () { 
        
        items[0].$parent.setbudgettosaveandprint();
        $uibModalInstance.close();
    }
    
    $scope.printBudgetOLD = function(){
		console.log ('$scope.booking.roomDistribution ',$scope.booking.roomDistribution);
    	if($scope.localBudget.name == null || $scope.localBudget.lastName == null){
    		console.log("ERROR. Detalles :Por favor rellene el nombre del titular del presupuesto.");
    		$scope.errorServerSave = true;
    		$scope.error = "Por favor rellene el nombre del titular del presupuesto.";
    	}
    	else{

    		$uibModalInstance.close();
    		tools_service.showPreloader($scope, 'show');
    		buildBudget();
    		$scope.booking.idBooking = null;
    		$scope.booking.budget = true;

    		console.log("\n** voy a guardar el presupuesto: ",$scope.booking.idBooking);
	        // 3) guardar la resreva en mongo (api nueva)
			var rq = {
				command: 'bud',
				service: 'api',
				request: {
				  data: $scope.booking,
				  query: { idBooking: $scope.booking.idBooking },
				  collectionname: 'Bookings2',
				  oncompleteeventkey: 'save.done',
				  onerroreventkey: 'save.error',
				}
		    };

			var rqCB = yto_api.send(rq);

			// response OK
			rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	   if (rsp!=null){

        		   console.log("Booking Save OK. IdBooking: ",rsp.idBooking,' goint to print');  ;

  	            	//actualizo el id de reserva
  	            	$scope.booking.idBooking = rsp.idBooking;
	  	            	return bookinghelpers.downloadAffiliateBudget(brandPath, yto_api, $scope.booking, $scope.product,$scope.affiliate,$scope.local,function (result){
	  	            		tools_service.showPreloader($scope, 'hide');
	  	            		toaster.pop('success', 'Presupuesto guardado correctamente.', 'Consulte mis presupuestos multidays.' , 6000 ,'trustedHtml');
	  	      		});

  	            } else {
  	      			tools_service.showPreloader($scope, 'hide');
  	            	toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);
  	            	console.log("Error al guardar la reseva en base de datos, con estado: "+$scope.booking.status);
  	            }
			});

			// response KO
			rqCB.on(rqCB.onerroreventkey, function (err) {
	      	   tools_service.showPreloader($scope, 'hide');
        	   toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);
               console.log('ERROR en guardar la booking en base de datos. Details: ',err);
			});
//
//    		$uibModalInstance.close();
//    		tools_service.showPreloader($scope, 'show');
//
//    		console.log("** voy a llamar a bookinghelper.");
//    		return bookinghelpers.downloadAffiliateBudget(brandPath, yto_api, $scope.booking, $scope.product,$scope.affiliate,$scope.local,function (result){
//    			tools_service.showPreloader($scope, 'hide');
//    		});
    	}
    };


    /**
     * funcion que rellena el objeto booking con la informacion  necesaria para guardar en bd
     */
    function buildBudget(){
    	console.log("*** booking original: ",$scope.booking);
        $scope.booking.roomDistribution[0].paxList[0].name = $scope.localBudget.name
        $scope.booking.roomDistribution[0].paxList[0].lastName = $scope.localBudget.lastName

        // 1)cambiar las horas y el hoelder
        $scope.booking.holder = $scope.booking.roomDistribution[0].paxList[0].name.toUpperCase() +' '+$scope.booking.roomDistribution[0].paxList[0].lastName.toUpperCase();

        var browDate = new Date($scope.booking.roomDistribution[0].paxList[0].birdthDate);
		var toServer = new Date(Date.UTC(browDate.getFullYear(), browDate.getMonth(),browDate.getDate()));
		$scope.booking.roomDistribution[0].paxList[0].birdthDate = toServer;

        // 2) guardar informacion del afiliado
        $scope.booking.isB2C = false; // es b2b
		$scope.booking.fees =  $scope.local.affiliate.fees;
		$scope.booking.traveler = null;

		//*************************
		//3) guardar precio por pax
		//*************************
		for(var it=0; it < $scope.booking.roomDistribution.length; it++){

			var dummyPrice = {
				"value" : 0,
		        "currency" : $scope.product.dmc.currency,
		        "exchange" :{
		        	 "value" : 0,
		             "currency": $scope.local.currency
		        }
		    };
			var dummyAffiliatePrice = {
				"value" : 0,
		        "currency" : $scope.product.dmc.currency,
		        "exchange" :{
		        	 "value" : 0,
		             "currency": $scope.local.currency
		        }
		    };

			// habitacion simple
			if($scope.booking.roomDistribution[it].roomCode =='single'){
				dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.single;
				dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.single;
			}

			// habitacion doble
			else if ($scope.booking.roomDistribution[it].roomCode =='double'){
				dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.double;
				dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.double;
			}

			// habitacion triple
			else if ($scope.booking.roomDistribution[it].roomCode =='triple'){
				dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.triple;
				dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.triple;
			}

			// habitacion quad
			else if ($scope.booking.roomDistribution[it].roomCode =='quad'){
				dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.other;
				dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.other;
			}
			$scope.booking.roomDistribution[it].pricePerPax = dummyPrice;
			$scope.booking.roomDistribution[it].pvpAffiliatePerPax = dummyAffiliatePrice;
		}


        // 2) rellenar la booking con los datos de presupuesto
        $scope.booking.status ="budget.new";
    	console.log("*** booking final: ",$scope.booking);
    }

    /**
	 * funcion que guarda el presupuesto
	 */
    $scope.saveBudget = function () {
    	if($scope.localBudget.lastName== null || $scope.localBudget.name == null){
    		console.log("ERROR");
    		$scope.errorServerSave = true;
    		$scope.error = "Por favor rellene el nombre del titular del presupuesto.";
    		//toaster.pop('error', 'Faltan parámetros.','Por favor rellene el nombre del titular del presupuesto.' );
    	}
    	else{
	        buildBudget();
	        $scope.booking.idBooking = null;
	        $scope.booking.budget = true;
	        console.log("**** voy a salvar el presupuesto: ",$scope.booking);

	        // 3) guardar la resreva en mongo (api nueva)
			var rq = {
				command: 'save',
				service: 'api',
				request: {
				  data: $scope.booking,
				  query: { idBooking: $scope.booking.idBooking },
				  collectionname: 'Bookings2',
				  oncompleteeventkey: 'save.done',
				  onerroreventkey: 'save.error',
				}
		    };
			var rqCB = yto_api.send(rq);

			// response OK
			rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	   if (rsp!=null){

        		   console.log("Booking Save OK. IdBooking: ",rsp.idBooking);  ;
  	            	//actualizo el id de reserva
  	            	$scope.booking.idBooking = rsp.idBooking;
  	            	$uibModalInstance.close();
                        toaster.pop('success', 'Presupuesto guardado correctamente.',
                            'Consulte mis presupuestos multidays. Espere unos segundos mientras preparamos tu presupuesto para imprimir (.pdf)', 6000, 'trustedHtml');

  	            } else {
  	            	$uibModalInstance.close();
  	            	toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);
  	            	console.log("Error al guardar la reseva en base de datos, con estado: "+$scope.booking.status);
  	            }

			});

			// response KO
			rqCB.on(rqCB.onerroreventkey, function (err) {
			   $uibModalInstance.close();
        	   toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);
               console.log('ERROR en guardar la booking en base de datos. Details: ',err);
			});

    	}
    };





    /**
     * funcion que elimina una habitacion de la distribucion
     */
    $scope.deleteRoom = function(index){
    	$scope.booking.roomDistribution.splice(index, 1);
    	$scope.loadBooking();
    	// recalc side element - resumen
    	//document.dispatchEvent(new CustomEvent("sticky:recalc"));
    };



    /**
	 * funcion que precarga una reseva partiendo de un $scope.producto
	 */
	$scope.loadBooking = function(){

		// set paxs
		var paxs = 0;
		var pax = {
			single: 0,
			double: 0,
			triple: 0,
			quad: 0
		};
		var adults = 0;
		var kids = 0;


		for (var i = $scope.booking.roomDistribution.length - 1; i >= 0; i--) {
			console.log("-- loadBooking distribucion tipo: ",$scope.booking.roomDistribution[i].roomCode,' num pax: ',$scope.booking.roomDistribution[i].paxList.length)
			paxs = paxs+$scope.booking.roomDistribution[i].paxList.length;
			switch ($scope.booking.roomDistribution[i].roomCode){
				case 'single':
					pax.single = pax.single + 1;
					break;
				case 'double':
					pax.double = pax.double + 2;
					break;
				case 'triple':
					pax.triple = pax.triple + 3;
					break;
				case 'quad':
					pax.quad = pax.quad + 4;
					break;
			}

			for (var j = $scope.booking.roomDistribution[i].paxList.length - 1; j >= 0; j--) {

				//el primer pax sera el holder
				if((i == j) && (i==0)){
					$scope.booking.roomDistribution[i].paxList[j].holder=true;
				}

				if ($scope.booking.roomDistribution[i].paxList[j].birdthDate){
					var born = new Date($scope.booking.roomDistribution[i].paxList[j].birdthDate);
					//$log.log(born);
					var age=_get_age(born, new Date());
    				if (age<18){
    					$scope.booking.roomDistribution[i].paxList[j].typePax = "child"
    					kids = kids+1;
    				}else {
    					$scope.booking.roomDistribution[i].paxList[j].typePax = "adult"
    					adults = adults+1;
    				}
				}
			}
		}

		if (adults+kids == paxs){
			var stringKids = "";
			switch (kids){
				case 0:
					stringKids = "";
					break;
				case 1:
					stringKids = "1 menor";
					break;
				default:
					stringKids = kids+" menores";
			}
			var stringAdults = "";
			switch (adults){
				case 0:
					stringAdults = "";
					break;
				case 1:
					stringAdults = "1 adulto";
					break;
				default:
					stringAdults = adults+" adultos";
			}
			$scope.local.pax.string = stringAdults+" "+stringKids;
			$scope.local.pax.number = paxs;
		} else{
			$scope.local.pax.string = "error";
			$scope.local.pax.number = 0;
		}

		$scope.local.pax.single = pax.single;
		$scope.local.pax.double = pax.double;
		$scope.local.pax.triple = pax.triple;
		$scope.local.pax.quad = pax.quad;

		$scope.booking.pax = angular.copy($scope.local.pax);

		//recalculo el precio de las habitaciones simples / triples por si no tuvieran precio dle dmc
		_recalculatePriceSingleTriple();

	   	//recalcular el total
		_setTotalPrices();
	};

	/**
	 * calcula los precios totales de la reserva para afiliado
	 */
    function _setTotalPrices(){


		$scope.booking.priceperperson = angular.copy($scope.local.priceAffiliate.perpersonNetAgency);

    	$scope.local.priceAffiliate.totalNetAgency = 0;
    	$scope.local.priceAffiliate.totalPVPAgency = 0;

    	//doble
    	if ($scope.local.pax.double){
    		//neto agencia
    		if ($scope.local.priceAffiliate.perpersonNetAgency.double){
    			$scope.local.priceAffiliate.totalNetAgency = $scope.local.priceAffiliate.perpersonNetAgency.double * $scope.local.pax.double;
    		}
    		else {
    			$scope.toConfirm = true;
    		}
    		//pvp agencia
    		if ($scope.local.priceAffiliate.perpersonPVPAgency.double){
    			$scope.local.priceAffiliate.totalPVPAgency = $scope.local.priceAffiliate.perpersonPVPAgency.double * $scope.local.pax.double;
    		}
    		else {
    			$scope.toConfirm = true;
    		}
    	}

    	//simple
    	if ($scope.local.pax.single){

    		//neto agencia
    		if ($scope.local.priceAffiliate.perpersonNetAgency.single){
    			$scope.local.priceAffiliate.totalNetAgency += $scope.local.priceAffiliate.perpersonNetAgency.single * $scope.local.pax.single;
    		} else{
    			$scope.toConfirm = true;
    		}
    		//pvp agencia
    		if ($scope.local.priceAffiliate.perpersonPVPAgency.single){
    			$scope.local.priceAffiliate.totalPVPAgency += $scope.local.priceAffiliate.perpersonPVPAgency.single * $scope.local.pax.single;
    		} else{
    			$scope.toConfirm = true;
    		}
    	}
    	//triple
    	if ($scope.local.pax.triple){
    		// neto agencia
    		if ($scope.local.priceAffiliate.perpersonNetAgency.triple){
    			$scope.local.priceAffiliate.totalNetAgency += $scope.local.priceAffiliate.perpersonNetAgency.triple * $scope.local.pax.triple;
    		} else {
    			$scope.toConfirm = true;
    		}
    		// pvp agencia
    		if ($scope.local.priceAffiliate.perpersonPVPAgency.triple){
    			$scope.local.priceAffiliate.totalPVPAgency += $scope.local.priceAffiliate.perpersonPVPAgency.triple * $scope.local.pax.triple;
    		} else {
    			$scope.toConfirm = true;
    		}
    	}

    	//precio del primer pago
    	$scope.local.priceAffiliate.a40NetAgency = $scope.local.priceAffiliate.totalNetAgency * $scope.local.firstPayPercent/100;
    	$scope.local.priceAffiliate.a40PVPAgency = $scope.local.priceAffiliate.totalPVPAgency * $scope.local.firstPayPercent/100;

    	// precio dia
    	$scope.local.priceAffiliate.dayNetAgency = Math.round(($scope.local.priceAffiliate.totalNetAgency / $scope.local.days) / $scope.local.pax.number);
    	$scope.local.priceAffiliate.dayPVPAgency = Math.round(($scope.local.priceAffiliate.totalPVPAgency / $scope.local.days) / $scope.local.pax.number);

    	//en el total de la booking guardaremos el neto agencia, dejando vacio el neto y comision (se rellenaran en la api)
    	$scope.booking.amount.exchange.value = $scope.local.priceAffiliate.totalNetAgency;

    	// setear el total pvpaffiliado
    	$scope.booking.pvpAffiliate = {
			"value":0,
			"currency" : $scope.product.dmc.currency,
			"exchange" :{
				"value": $scope.local.priceAffiliate.totalPVPAgency,
				"currency": $scope.local.currency
			}
		};


    	var priceDetail = {};


    	// setear el porcentaje de pago y total a pagar
    	if ($scope.local.aumontSelected){
			$scope.booking.payStatus = [
				{
				    "payment" : $scope.local.aumontSelected,
				    "nextPaymentDate" : $scope.local.datePayEnd
				}
	   		 ];

			// pagar 100%
    		$scope.local.toPay = $scope.local.priceAffiliate.totalPVPAgency;

    		priceDetail = {
				'fee': $scope.local.affiliate.fees.unique,
				'feeunit': $scope.feeunit,
				'price': {
					'net' :  $scope.local.priceAffiliate.totalNetAgency,
			    	'pvp' : Math.round($scope.local.priceAffiliate.totalPVPAgency),
			    	'currency' : $scope.local.currency
				}
			};
		}

		// actualizar el desglose
		$scope.priceDetail = priceDetail;
		$scope.booking.amount.exchange.currency = $scope.local.currency;
		$scope.booking.netPrice.exchange.currency = $scope.local.currency;


		console.log("*** Settotal prices local: ",$scope.local);

	}

    function _get_age(born, now) {
        var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
        if (now >= birthday)
          return now.getFullYear() - born.getFullYear();
        else
          return now.getFullYear() - born.getFullYear() - 1;
      }

	function _findcounty(countrycode){
		for (var i = $scope.nationalities.length - 1; i >= 0; i--) {
			if ($scope.nationalities[i].countrycode == countrycode){
				return $scope.nationalities[i];
			}
		}
	}

	/**
     * funcion que debe de llamarse si se selecciona una habitacion simple o triple, para obtener el precio por pax
     * de las habitaciones simples y triples en función de la logica definida por negocio
     */
    function _recalculatePriceSingleTriple(){
    	for (var it=0; it <$scope.booking.roomDistribution.length; it++){

    		// *************************************************************************************************************************
    		//si es habitacion triple - si el DMC no tiene precio definido para la triple, el precio sera el de la doble (precio por pax)
    		// *************************************************************************************************************************
    		if($scope.booking.roomDistribution[it].roomCode=="triple"){
				//si no tiene precio definido par la triple, el precio sera el de la doble (precio por pax)
    			if($scope.local.priceAffiliate.perpersonOrigNetAgency.triple ===null ||
    				$scope.local.priceAffiliate.perpersonOrigNetAgency.triple === 0){

    				$scope.local.priceAffiliate.perpersonNetAgency.triple = $scope.local.priceAffiliate.perpersonNetAgency.double;
    				$scope.local.priceAffiliate.perpersonPVPAgency.triple = $scope.local.priceAffiliate.perpersonPVPAgency.double;
    			}
    		}

    		// ****************
    		// si es una simple
    		// ****************
    		else if($scope.booking.roomDistribution[it].roomCode=="single"){

    			// si la reserva es solo una habitacion y el dmc no tiene configurado minimo de operacion o esta es 2, el precio de la simple sera el de la doble
    			if($scope.booking.roomDistribution.length === 1 &&
    				($scope.product.included.trip.minpaxoperate === null || $scope.product.included.trip.minpaxoperate === 2)){

    				$scope.local.priceAffiliate.perpersonNetAgency.single = ($scope.local.priceAffiliate.perpersonNetAgency.double * 2);
    				$scope.local.priceAffiliate.perpersonPVPAgency.single = ($scope.local.priceAffiliate.perpersonPVPAgency.double * 2);
    			}

    			// Si tiene precio para la simple lo cogeremos, si no pondremos el precio de la doble
    			else{
    				if($scope.local.priceAffiliate.perpersonOrigNetAgency.single === null || $scope.local.priceAffiliate.perpersonOrigNetAgency.single === 0){
        				$scope.local.priceAffiliate.perpersonNetAgency.single = ($scope.local.priceAffiliate.perpersonNetAgency.double * 2);
        				$scope.local.priceAffiliate.perpersonPVPAgency.single = ($scope.local.priceAffiliate.perpersonPVPAgency.double * 2);
        			}
    				//si tiene precio definido se usa el definido
    				else{
    					$scope.local.priceAffiliate.perpersonNetAgency.single = ($scope.local.priceAffiliate.perpersonOrigNetAgency.single);
        				$scope.local.priceAffiliate.perpersonPVPAgency.single = ($scope.local.priceAffiliate.perpersonOrigPVPAgency.single);
    				}
    			}
    		}
    	}
    }


	/**
     * inicializa totales,netos e impuestos de la reserva
     */
    function _init () {
    	// copio en local
    	console.log("*** roomdistribution original: ",$scope.booking.roomDistribution);
    	console.log("*** local inicial : ",$scope.local);

	}
	_init();

});

//*******************************************************
//controler para el popup que avisa que puede haber sufrido cambios
//*******************************************************


app.controller("aceptChangeBudgetCtrl", function (
	$scope,
	$uibModalInstance,
	$http,
	items,
	tools_service,
	http_service,
	toaster,
	yto_api,
	bookinghelpers) {
	
	 //inicializo booking con lo que le paso desde la pantalla previa al modal
	 $scope.url = items[0];

    //another one
    $scope.ok = function () {
        $uibModalInstance.dismiss();
    };

    //out 
    $scope.exit = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.openthemodal = function() {
        $uibModalInstance.close();
    };

});