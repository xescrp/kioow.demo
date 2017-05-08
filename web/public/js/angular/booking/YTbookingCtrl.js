app.controller("bookingCtrl",
	[
	'$scope',
	'$http',
	'$log',
	'$filter',
	'tools_service',
	'openmarket_google_service',
	'$location',
	'yto_session_service',
	'yto_api',
	'toaster',
	'$window',
	'http_service',
	'$anchorScroll',
    'anchorSmoothScroll',
    '$timeout',
    '$uibModal',    
	function(
		$scope,
		$http,
		$log,
		$filter,
		tools_service,
		openmarket_google_service,
		$location,		
		yto_session_service,
		yto_api,
		toaster,
		$window,
		http_service,
		$anchorScroll,
        anchorSmoothScroll,
        $timeout,
        $uibModal        
		)
	{
	'use strict';

////////////////////////////////////////////////
///	
//SET DEFAULT VARS
////////////////////////////////////////////////
///
///
///
	$scope.isWhiteLabel = false;
    if (typeof isWhiteLabel !== 'undefined') {
        $scope.isWhiteLabel = isWhiteLabel;
    }

	var brandpath = '';
    if (typeof brandPath !== 'undefined') {
        $scope.brandpath = brandPath;
    }

    $scope.version = new Date();
    if (typeof version !== 'undefined') {
        $scope.version = version;
    }
    
	var debug = $location.search().debug;
	$scope.debug = debug;

    if(debug)
        $log.log('in debug mode');

	//default vars
	$scope.userlogin = false;
	// set date actual default
	$scope.dateActual = new Date();
	$scope.dateActualServer = new Date();
	// set date selected default
	$scope.dateSelected = new Date();
	// Steps Visibility
	$scope.showStep = {
		s0 : false,
		s1 : true,
		s2 : true,
		s3 : true,
		s4 : true,
		s5 : true,
		sOff : false
	};
	$scope.hasTriple = false;
	$scope.hasSingle = false;
	$scope.editFee = false;
	$scope.feeEdited =0;

	// bool to able to pay  
	$scope.toConfirm = false;
	$scope.restDays = 30;
	// check load
	$scope.load = {
		user : false,
		traveler : false,
		affiliate : false,
		booking : false
	};
	// assign product var javascript to scope
	$scope.product = {};
	
	$scope.content = {};

	//Assing nationalities from nationalities in html
	$scope.countries = [];
	
	// unidad de comision de la agencia
	$scope.feeunit = '%';
	
	//get qoute 
	$scope.quote = {};
	
	//get budget 
	$scope.budget = {};
	
	// get query
	$scope.query = {};
	
	$scope.dateNoMatch = false;
	//
	$scope.initcalendar = false;
	//
	$scope.local ={
		pax : { 
			string: "",
			number : 0,
			double : 0,
			triple : 0,
			single : 0,
			quad: 0
		},
		days: 0,
		currency : {"label":"Euro","symbol":"€","value":"EUR"}, 
		price :{
			perperson : {
				single : 0,
				double : 0,
				triple : 0,
				quad : 0
			},
			perpersonOrig : {
				single : 0,
				double : 0,
				triple : 0,
				quad : 0
			},
			day : 0,
			total: 0,
			a40 : 0
		},
		priceAffiliate :{
			perpersonNetAgency : {
				single : 0,
				double : 0,
				triple : 0,
				quad : 0
			},
			perpersonOrigNetAgency : {
				single : 0,
				double : 0,
				triple : 0,
				quad : 0
			},
			dayNetAgency : 0,
			totalNetAgency: 0,
			a40NetAgency : 0,
			perpersonPVPAgency : {
				single : 0,
				double : 0,
				triple : 0,
				quad : 0
			},
			perpersonOrigPVPAgency : {
				single : 0,
				double : 0,
				triple : 0,
				quad : 0
			},
			dayPVPAgency : 0,
			totalPVPAgency: 0,
			a40PVPAgency : 0			
		},
		aumontSelected : 100,
		toPay : 0,
		datePayEnd : new Date($scope.dateSelected.getFullYear(), $scope.dateSelected.getMonth(), 1),
		hasPayOptions : false,
		availability : $scope.product.availability,
		rooms : [
			{"roomCode" : "single", "label": "Individual", "pax" : 1},
			{"roomCode" : "double", "label": "Doble", "pax" : 2},
			{"roomCode" : "triple", "label": "Triple", "pax" : 3}//,
			//{"roomCode" : "quad", "label": "Cuádruple", "pax" : 4}
		],
		traveler: null,
		affiliate : null,
        user: null,
        firstPayPercent : 40 // set init to traveler
	};

	// Default Birth Date
	//$scope.defaultBirthDate = new Date(1984, 0, 1)

	var defaultBirthTime = (new Date('January 1, 1985')).getTime();
	$scope.defaultBirthDate = new Date(defaultBirthTime);

	// 
	// New user structure
	// 

	$scope.newUser = {
	    name: '',
        firstname: '',
		lastname : '',
		email : '',
		reemail : '',
		phone : '',
		password : '',
		repassword : ''
	};

	
	//
	// booking model
	// 
	
	$scope.booking = {};

	//
	// Set Tab active in payment
	// 

	$scope.tabActive = 'default';


	//
	// Assign forms to angular objs
	// 


	$scope.setAccomodationForm = function (scope) {
        this.accomodation = scope;
    };
    $scope.setPayConditionsForm = function (scope) {
        this.payconditions = scope;
    };
    $scope.setPayForm = function (scope) {
         this.payform = scope;
    };

    $scope.setUpdatePhoneForm = function (scope) {
        this.updateuser = scope;
    };
    $scope.setInvoiceForm = function (scope) {
        this.invoiceform = scope;
    };
    $scope.setGeneralConditionsForm = function (scope) {
        this.generalconditions = scope;
    };


    /**
    * inicia el iframe con el pago por tarjeta
    */ 
    // SETEO variable que recibe la booking de api
    $scope.readyToPay = false;
    $scope.errorServerSave = false;



////////////////////////////////////////////////
///	
// BOOKING Functions
////////////////////////////////////////////////
///	
///	
///	


	var _buildNewBooking = function(){
		$scope.booking ={
			"status" : "",
			//"amount" : 0,
			"amount" : {
				"value":0,
				"currency" : $scope.product.dmc.currency,
				"exchange" :{
					"value":0,
					"currency": $scope.local.currency
				}
			},		
	    	//"netPrice" : 0,
			"netPrice" : {
				"value":0,
				"currency" : $scope.product.dmc.currency,
				"exchange" :{
					"value":0,
					"currency": $scope.local.currency
				}
			},
			"priceperperson" : angular.copy($scope.local.price.perperson),
			"pax" :  angular.copy($scope.local.pax),
	    	"comission" : $scope.product.dmc.membership.commission,
	    	"b2bcommission" : $scope.product.dmc.membership.b2bcommission,
	    	"start" : {
	    		"year": 0,
	        	"month": 0,                    
	        	"day": 0
	    	},
		    "end" : {
	    		"year": 0,
	        	"month": 0,                    
	        	"day": 0
	    	},
		    "productDmc" : $scope.product._id,
		    "traveler" : "",
		    "dmc" : $scope.product.dmc._id,
		    "createDate" : $scope.dateActualServer,
		    "isB2C" : true,
		    "isGroup":false,
		   // "currency" : $scope.local.currency,
		    "roomDistribution" : [],
		    "timeZone" : {
		        "label" : "(GMT+01:00) Madrid",
		        "useDaylightTime" : "0",
		        "value" : "+1"
		    },
		    "payStatus" : [ 
		        {
		            "payment" : 40,
		        }
		    ],
		    "productCode" : $scope.product.code,
		    "product" : JSON.stringify($scope.product),	    
		    "acceptcancell" : false,
		    "acceptgeneral" : false,
		    "userinvoicedata" : {
		    	"wantinvoice" : false,
		    	"name" : "",
		    	"city" : "",
		    	"cp" : "",
		    	"idnumber" : "",
		    	"address" : "",
		    	"country" : {}
		    },
		    "content" : $scope.content,
		    "toConfirm" : false,
		    "userTraveler" : {},
		    "userAffiliate" : {},
		    "meetingdata" : "", // transfer information
			"affiliateobservations" : "", // comments to yto admin
			"affiliateuser" : "", // agent or user dif to account 
			"idBookingExt": $scope.local.agencyid || "", // Expediente AAVV
			"holder" : ""
		};
		$scope.load.booking = true;
	};


	/**
	 * Esta funcion carga el formulario del scope con los datos de nuestra reserva
	 * 
	 * calcula el numero de pax seleccionados
	 * 
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
		
		

//		// **************************
//		// booking de  un presupuesto
//		// **************************
//		if($scope.budget && $scope.budget.idBooking !== null && $scope.budget.idBooking !== undefined){
//						
//			
//			console.log("****** load: ",$scope.load);
//			
//			// 1) calcular el numero total de pax y las habitacioens
//			for (var i = $scope.booking.roomDistribution.length-1; i >= 0; i--) {
//								
//				paxs = paxs+$scope.booking.roomDistribution[i].paxList.length;
//				switch ($scope.booking.roomDistribution[i].roomCode){
//					case 'single':
//						pax.single = pax.single + 1;
//						break;
//					case 'double':
//						pax.double = pax.double + 2;
//						break;
//					case 'triple':
//						pax.triple = pax.triple + 3;
//						break;
//					case 'quad':
//						pax.quad = pax.quad + 4;
//						break;
//				}
//				
//				// poner el holder y los tipos de pax
//				for (var j = $scope.booking.roomDistribution[i].paxList.length - 1; j >= 0; j--) {
//					
//					//el primer pax sera el holder y tendra el nombre/apellido introducido en el presupuesto
//					if((i == j) && (i==0)){
//						$scope.booking.roomDistribution[i].paxList[j].holder=true;
//						$scope.booking.roomDistribution[i].paxList[j].name = $scope.budget.budget.budgetName;
//						$scope.booking.roomDistribution[i].paxList[j].lastName = $scope.budget.budget.budgetLastName;						
//					}
//					
//					if ($scope.booking.roomDistribution[i].paxList[j].birdthDate){
//						var born = new Date($scope.booking.roomDistribution[i].paxList[j].birdthDate);
//						//$log.log(born);
//						var age=_get_age(born, $scope.dateActual);
//        				if (age<18){
//        					$scope.booking.roomDistribution[i].paxList[j].typePax = "child"
//        					kids = kids+1;
//        				}else {
//        					$scope.booking.roomDistribution[i].paxList[j].typePax = "adult"
//        					adults = adults+1;
//        				}
//					}
//				}
//			}
//			
//			var stringKids = "";
//			var stringAdults = "";	
//			adults = paxs;	
//					
//			// construir el texto de la distribucion (adultos y menores)
//			if (adults+kids == paxs){							
//				if(adults>1){
//					stringAdults = adults+" adultos";						
//				}
//				else{
//					stringAdults = "1 adulto";
//				}
//				if(stringKids && stringKids!=""){
//					$scope.local.pax.string = stringAdults+" y "+stringKids;	
//				}
//				else{
//					$scope.local.pax.string = stringAdults;
//				}
//				
//				$scope.local.pax.number = paxs;
//			} else{
//				$scope.local.pax.string = "error";
//				$scope.local.pax.number = 0;
//			}
//						
//			// si es un traveler
//			if ($scope.load.traveler){
//				$scope.booking.traveler = $scope.local.traveler._id;
//			}
//			// si es una agencia
//			else{
//				$scope.booking.affiliate = $scope.local.affiliate._id;
//			}
//			$scope.local.pax.single = pax.single;
//			$scope.local.pax.double = pax.double;
//			$scope.local.pax.triple = pax.triple;
//			$scope.local.pax.quad = pax.quad;
//			
//			$scope.booking.pax = angular.copy($scope.local.pax);		   	
//		
//			
//			console.log("**loadbooking, local: ",$scope.local);
//		   	//recalcular el total
//			_setTotalPrices();		
//			
//						
//			// seteo fecha correcta
//	    	$scope.dateNoMatch = true;
//		   	
//		   	//recalc side element - resumen
//		   	document.dispatchEvent(new CustomEvent("sticky:recalc"));
//		}	
		
		// *************************
		// booking de  un tailormade
		// *************************
		//else if($scope.quote && $scope.quote.code !== null && $scope.quote.code !== undefined){
		if($scope.quote && 
			$scope.quote.code !== null &&
			$scope.quote.code !== undefined){
			
			// 1) calcular el numero total de pax y las habitacioens
			for (var i = $scope.booking.roomDistribution.length-1; i >= 0; i--) {
				
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
				
				// poner el holder y los tipos de pax
				for (var j = $scope.booking.roomDistribution[i].paxList.length - 1; j >= 0; j--) {
					
					//el primer pax sera el holder
					if((i == j) && (i==0)){
						$scope.booking.roomDistribution[i].paxList[j].holder=true;
					}
					
					if ($scope.booking.roomDistribution[i].paxList[j].birdthDate){
						var born = new Date($scope.booking.roomDistribution[i].paxList[j].birdthDate);
						//$log.log(born);
						var age=_get_age(born, $scope.dateActual);
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
			
			var stringKids = "";
			var stringAdults = "";	
			adults = paxs;	
			
			
			// recorrer los ninios de la quote
			if($scope.quote.children && $scope.quote.children.length>0){
							
				
				for(var itCh=0; itCh <$scope.quote.children.length; itCh++){					
					kids += $scope.quote.children[itCh].quantity;
					adults -= $scope.quote.children[itCh].quantity;			
				}
				
				if(kids>1){
					stringKids = kids+" menores";						
				}
				else{
					stringKids = "1 menor";
				}
			}
			
			// construir el texto de la distribucion (adultos y menores)
			if (adults+kids == paxs){							
				if(adults>1){
					stringAdults = adults+" adultos";						
				}
				else{
					stringAdults = "1 adulto";
				}
				if(stringKids && stringKids!=""){
					$scope.local.pax.string = stringAdults+" y "+stringKids;	
				}
				else{
					$scope.local.pax.string = stringAdults;
				}
				
				$scope.local.pax.number = paxs;
			} else{
				$scope.local.pax.string = "error";
				$scope.local.pax.number = 0;
			}
						
			// si es un traveler
			if ($scope.load.traveler){
				$scope.booking.traveler = $scope.local.traveler._id;
			}
			// si es una agencia
			else{
				$scope.booking.affiliate = $scope.local.affiliate._id;
			}
			$scope.local.pax.single = pax.single;
			$scope.local.pax.double = pax.double;
			$scope.local.pax.triple = pax.triple;
			$scope.local.pax.quad = pax.quad;
			
			$scope.booking.pax = angular.copy($scope.local.pax);		   	
		
		   	//recalcular el total
			_setTotalPrices();		
			
			// seteo fecha correcta
	    	$scope.dateNoMatch = true;
		   	
		   	//recalc side element - resumen
		   	document.dispatchEvent(new CustomEvent("sticky:recalc"));
		}
		
		// *************************************
		// es una reserva de un producto cargado
		// *************************************
		else{
			
			for (var i = $scope.booking.roomDistribution.length - 1; i >= 0; i--) {
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
						
						// si es una booking de un presupuesto, pongo como holder el del nombre del presupuesto
						if($scope.budget && $scope.budget.idBooking !== null && $scope.budget.idBooking !== undefined){
							$scope.booking.roomDistribution[i].paxList[j].name = $scope.budget.roomDistribution[i].paxList[j].name;
							$scope.booking.roomDistribution[i].paxList[j].lastName = $scope.budget.roomDistribution[i].paxList[j].lastName;
						}
					}
					
					if ($scope.booking.roomDistribution[i].paxList[j].birdthDate){
						var born = new Date($scope.booking.roomDistribution[i].paxList[j].birdthDate);
						//$log.log(born);
						var age=_get_age(born, $scope.dateActual);
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
						
			// si es un traveler
			if ($scope.load.traveler){
				$scope.booking.traveler = $scope.local.traveler._id;
			}
			// si es una agencia
			else if ($scope.load.affiliate){
				$scope.booking.affiliate = $scope.local.affiliate._id;
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
				
		   	//recalc side element - resumen
		   	document.dispatchEvent(new CustomEvent("sticky:recalc"));
		}
	};

	/**
	 * calcula los precios totales de la reserva
	 */
    function _setTotalPrices(){
    	
    	console.log("---- _setTotalPrices INICIAL: ",$scope.local.priceAffiliate.perpersonPVPAgency);

    	// ********************************************************
    	// si es un tailormade, el importe total, viene en la quote
    	// ********************************************************    	    	
    	if($scope.quote.code!==undefined){
    		// ***********
    		// 1) importes
    		// ***********
    		
    		// 1.1) importes totales
    		$scope.local.priceAffiliate.totalNetAgency = $scope.quote.amount.exchange.value;
    		$scope.local.priceAffiliate.totalPVPAgency = $scope.quote.pvpAffiliate.exchange.value;
    			
    		$scope.local.priceAffiliate.a40NetAgency = $scope.local.priceAffiliate.totalNetAgency*$scope.local.firstPayPercent/100;    		
        	$scope.local.priceAffiliate.a40PVPAgency = $scope.local.priceAffiliate.totalPVPAgency*$scope.local.firstPayPercent/100;
        		
            $scope.local.priceAffiliate.dayNetAgency = Math.round(($scope.local.priceAffiliate.totalNetAgency/$scope.local.days)/$scope.local.pax.number);
            $scope.local.priceAffiliate.dayPVPAgency = Math.round(($scope.local.priceAffiliate.totalPVPAgency/$scope.local.days)/$scope.local.pax.number);
            	
    		// 1.2) importe neto DMC (total y divisa)            
            $scope.booking.netPrice.value = $scope.quote.netPrice.value;  
    		$scope.booking.netPrice.currency = $scope.quote.netPrice.currency;
    		$scope.booking.netPrice.exchange.value = $scope.quote.netPrice.exchange.value;  
    		$scope.booking.netPrice.exchange.currency = $scope.quote.netPrice.exchange.currency;
            
            // 1.3) importe neto agencia y divisa
    		$scope.booking.amount.value = $scope.quote.amount.value;
        	$scope.booking.amount.currency =   $scope.quote.amount.currency;
        	$scope.booking.amount.exchange.value = $scope.local.priceAffiliate.totalNetAgency;
        	$scope.booking.amount.exchange.currency =  $scope.quote.amount.exchange.currency;
        	
        	// 1.4) importe pvp affiliado
        	$scope.booking.pvpAffiliate = {		    			
    			"value":0,
    			"currency" : $scope.quote.amount.currency,
    			"exchange" :{
    				"value": $scope.local.priceAffiliate.totalPVPAgency,
    				"currency": $scope.local.currency
    			}
    		};	  
        		
        			
            // ********************************************************************************************	
        	// 2) Desglose y porcentaje a pagar (40 o 100) (ya no, el desglose se muestra siempre del 100%)
        	// ********************************************************************************************
	    	var priceDetail = {};
	    		    	
	    	// si tiene un importe seleccionado (15% /100%)
    		if ($scope.local.aumontSelected){
				$scope.booking.payStatus = [ 
					{
					    "payment" : $scope.local.aumontSelected,
					    "nextPaymentDate" : $scope.local.datePayEnd
					}
		   		 ];
				
				// si es un tailormade de grupos
				if($scope.query.group != null){										
		    		$scope.local.toPay = $scope.local.priceAffiliate.totalPVPAgency;
		    		priceDetail = {
						'fee': $scope.quote.fees.groups,
						'feeunit': $scope.feeunit,
						'price': {
							'net' :  $scope.local.priceAffiliate.totalNetAgency,
					    	'pvp' : $scope.local.priceAffiliate.totalPVPAgency,
					    	'currency' : $scope.local.currency
						}
					};
				}
				
				// si es un tailormade normal
				else{										
		    		$scope.local.toPay = $scope.local.priceAffiliate.totalPVPAgency;
		    		priceDetail = {
						'fee': $scope.quote.fees.tailormade,
						'feeunit': $scope.feeunit,
						'price': {
							'net' :  $scope.local.priceAffiliate.totalNetAgency,
					    	'pvp' : $scope.local.priceAffiliate.totalPVPAgency,
					    	'currency' : $scope.local.currency
						}
					};
				}
			}    		

    		
			// actualizar el desglose	    		
    		$scope.priceDetail = priceDetail;	
    		
    		// si es una booking de una quote, cargo los fees de la quote en la session
    		$scope.local.affiliate.fees = $scope.quote.fees;
    		
    		$scope.booking.toConfirm = false;
    		$scope.toConfirm = false;
			$scope.readyToPay = false;			
    	}
    	

    		
    	
    	
    	// *******************************************************************************
    	// si es un $scope.producto carga, el precio total viene por la distribucion seleccionada
    	// *******************************************************************************
    	else{

	    	//*********************************************************************************
	    	// si es afiliado, recalculo los totales porque seran netos agencias, a pvp agencias
	    	// OJO el precio si es afiliado ya esta en pvp agencia
	    	//*********************************************************************************
	    	if($scope.load.affiliate && $scope.load.affiliate==true){
	    		
	    			    		
	    		
	    		$scope.booking.priceperperson = angular.copy($scope.local.priceAffiliate.perpersonNetAgency);
	    			    		
		    	$scope.toConfirm = false;
		    	$scope.local.priceAffiliate.totalNetAgency = 0;
		    	$scope.local.priceAffiliate.totalPVPAgency = 0;		    	
		    	
		    	
		    	console.log("$scope.local.priceAffiliate.perpersonPVPAgenc: ",$scope.local.priceAffiliate.perpersonPVPAgency);
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
	    	}
	    	
	    	// **************
	    	// es un traveler
	    	// **************
	    	else{
	    		$scope.booking.priceperperson = angular.copy($scope.local.price.perperson);
		    	$scope.toConfirm = false;
		    	$scope.local.price.total = 0;
		    	if (debug)
		    		$log.log ('$scope.local.price. ',$scope.local.price);
		    	if ($scope.local.pax.double){
		    		if ($scope.local.price.perperson.double){
		    			$scope.local.price.total = $scope.local.price.perperson.double*$scope.local.pax.double;
		    		} else {
		    			$scope.toConfirm = true;
		    		}
		    	}
		    	if ($scope.local.pax.single){    		
		    		if ($scope.local.price.perperson.single){
		    			$scope.local.price.total = $scope.local.price.total+($scope.local.price.perperson.single*$scope.local.pax.single);
		    		} else{
		    			$scope.toConfirm = true;
		    		}
		    	}
		    	if ($scope.local.pax.triple){
		    		if ($scope.local.price.perperson.triple){
		    			$scope.local.price.total = $scope.local.price.total+($scope.local.price.perperson.triple*$scope.local.pax.triple);
		    		} else {
		    			$scope.toConfirm = true;
		    		}
		    	}
		    	$scope.local.price.a40 = $scope.local.price.total*$scope.local.firstPayPercent/100;
		
		    	$scope.local.price.day = Math.round(($scope.local.price.total/$scope.local.days)/$scope.local.pax.number);
		
		    	$scope.booking.amount.exchange.value = $scope.local.price.total;
				
				$scope.booking.netPrice.exchange.value = $scope.local.price.total-($scope.local.price.total * ($scope.booking.comission/100));
		
		    	if ($scope.local.aumontSelected){
					$scope.booking.payStatus = [ 
						{
						    "payment" : $scope.local.aumontSelected,
						    "nextPaymentDate" : $scope.local.datePayEnd
						}
			   		 ];
			   		if($scope.local.aumontSelected == 100){
			    		$scope.local.toPay = $scope.local.price.total;
			    	} else{
			    		$scope.local.toPay = $scope.local.price.a40;
			    	}
				}
	    	}
	    	
	    	
//	    	// ********************************************************************************************************************************************
//        	// si es una booking de un presupuesto, compruebo que el importe actual del producto no supere al del presupuesto, si es asi muestro una alerta
//        	// ********************************************************************************************************************************************
//    		if($scope.budget != null && $scope.budget.idBooking != null){
//    			console.log("--- pvp  calendario: ",$scope.booking.pvpAffiliate.exchange.value);
//    			console.log("--- pvp  presupuesto: ",$scope.budget.pvpAffiliate.exchange.value);
//    			
//    			if($scope.booking.pvpAffiliate.exchange.value != $scope.budget.pvpAffiliate.exchange.value ){
//    				toaster.pop('warning', 'El programa ha sufrido alguna modificación desde la fecha en que generaste el presupuesto.', 'Por favor revisa los detalles del mismo de nuevo.',6000);
//    			}
//    			
//    			
////    			 $scope.openNotify = function () {
////    	                var dialog = ngDialog.open({
////    	                    template:
////    	                        '<p>You can do whatever you want when I close, however that happens.</p>' +
////    	                        '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">Close Me</button></div>',
////    	                    plain: true
////    	                });
////    	                dialog.closePromise.then(function (data) {
////    	                    console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
////    	                });
////    	            };
//    		}    	
    		
	    	
			$scope.booking.toConfirm = $scope.toConfirm;
			$scope.booking.amount.exchange.currency = $scope.local.currency;
			$scope.booking.netPrice.exchange.currency = $scope.local.currency;
			
			$scope.readyToPay = false;			
			
    	}
	}

	$scope.setAumont = function(){		
		_setTotalPrices();
		document.dispatchEvent(new CustomEvent("sticky:recalc"));
	};


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
    		
    			// si es un traveler
    			if(!$scope.load.affiliate){
	    			//si no tiene precio definido par la triple, el precio sera el de la doble (precio por pax)
	    			if($scope.local.price.perpersonOrig.triple ===null || 
	    				$scope.local.price.perpersonOrig.triple === 0){
	    				$scope.local.price.perperson.triple = $scope.local.price.perperson.double;
	    			}
    			}
    			// si es una agencia
    			else{
    				//si no tiene precio definido par la triple, el precio sera el de la doble (precio por pax)
	    			if($scope.local.priceAffiliate.perpersonOrigNetAgency.triple ===null || 
	    				$scope.local.priceAffiliate.perpersonOrigNetAgency.triple === 0){	    				

	    				$scope.local.priceAffiliate.perpersonNetAgency.triple = $scope.local.priceAffiliate.perpersonNetAgency.double;
	    				$scope.local.priceAffiliate.perpersonPVPAgency.triple = $scope.local.priceAffiliate.perpersonPVPAgency.double;
	    			}
    			}
    		}
    		
    		// ****************
    		// si es una simple
    		// ****************
    		else if($scope.booking.roomDistribution[it].roomCode=="single"){
    			
    			// si la reserva es solo una habitacion y el dmc no tiene configurado minimo de operacion o esta es 2, el precio de la simple sera el de la doble
    			if($scope.booking.roomDistribution.length === 1 && 
    				($scope.product.included.trip.minpaxoperate === null || $scope.product.included.trip.minpaxoperate === 2)){
    				// si es un traveler
        			if(!$scope.load.affiliate){
        				$scope.local.price.perperson.single = ($scope.local.price.perperson.double * 2);
        			}
        			// si es una agencia
        			else{
        				$scope.local.priceAffiliate.perpersonNetAgency.single = ($scope.local.priceAffiliate.perpersonNetAgency.double * 2);
        				$scope.local.priceAffiliate.perpersonPVPAgency.single = ($scope.local.priceAffiliate.perpersonPVPAgency.double * 2);
        			}
        			
    			}
    			
    			// Si tiene precio para la simple lo cogeremos, si no pondremos el precio de la doble
    			else{
    				
    				// si es un traveler
        			if(!$scope.load.affiliate){        				
	    				if($scope.local.price.perpersonOrig.single === null || $scope.local.price.perpersonOrig.single === 0){
	        				$scope.local.price.perperson.single = ($scope.local.price.perperson.double * 2);        				
	        			}    
	    				//si tiene precio definido se usa el definido
	    				else{
	    					$scope.local.price.perperson.single = $scope.local.price.perpersonOrig.single;
	    				}
        			}
        			// si es una agencia
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
    }


  /**
     * agrega una habitacion a la seleccion
     */
    $scope.addRoom = function(){  	    
    	var numRoom = Number($scope.booking.roomDistribution.length);
    	var dummy = {
    			"numRoom" : numRoom,
	            "roomCode" : "double",
	            "roomType" : $scope.local.rooms[1],
	            "paxList" : []
	        };
	    dummy.typeRoom = $scope.local.rooms[1]; // doble	
	    
	    dummy = $scope.updateTravelersRoom(dummy,false); 
	    $scope.booking.roomDistribution.push(dummy);
	    
	    $scope.loadBooking();
	    // recalc side element - resumen
	    document.dispatchEvent(new CustomEvent("sticky:recalc"));
    };
   
    $scope.deleteRoom = function(index){
    	$scope.booking.roomDistribution.splice(index, 1);    	
    	$scope.loadBooking();
    	// recalc side element - resumen
    	document.dispatchEvent(new CustomEvent("sticky:recalc"));
    };
        
    /**
     * funcion que actualiza la habitacion (desplegable de sinple/doble/triple)
     */
    $scope.updateTravelersRoom =  function(room,loadBooking){ 
    	
    	$scope.readyToPay = false;
    	room.paxList = [];
    	    	
    	if(room.typeRoom != null && room.typeRoom.roomCode !=null){
    		room.roomCode = room.typeRoom.roomCode;    	
	    	room.roomType = $scope.local.rooms[room.typeRoom.pax-1];
	    	room.slug = room.typeRoom.roomCode+room.numRoom;
    	}
    	else{
    		if(room.roomCode == 'single'){
    			room.roomType = $scope.local.rooms[0];
    			room.typeRoom = $scope.local.rooms[0];
    		}
    		if(room.roomCode == 'double'){
    			room.roomType = $scope.local.rooms[1];
    			room.typeRoom = $scope.local.rooms[1];
    		}
    		if(room.roomCode == 'triple'){
    			room.roomType = $scope.local.rooms[2];
    			room.typeRoom = $scope.local.rooms[2];
    		}
    		if(room.roomCode == 'quad'){
    			room.roomType = $scope.local.rooms[3];
    			room.typeRoom = $scope.local.rooms[3];
    		}
    	}
    	
    	 
    	for (var i = 0; i< room.roomType.pax; i++) {
    		var travelerDummy = {
                    "name" : "",
                    "lastName" : "",
                    "typePax" : "",
                    "birdthDate" : $scope.defaultBirthDate,
                    "country" : _findcounty('ES'),
                    "autocomplete" : {
				        "result": "",
				        "options": {
				            "types": '(regions)'
				        },
				        "details": ''
				    },
				    "documentType" : "",
                    "documentNumber" : "",
                    "holder" : false                  
                };
    		room.paxList.push(travelerDummy);
	    }
    	
	    if(loadBooking){	    	
	    	$scope.loadBooking();
	    }
	    	   
	    return room;
    };
    
    // set traveler data to holder booking pax
   // $scope.checkUser = false;
    $scope.setUsertoFirstPax = function(element){
    	if(element){
	    	$scope.booking.roomDistribution[0].paxList[0] = {
	    		"name": $scope.local.traveler.firstname,
	        	"lastName": $scope.local.traveler.lastname,
	        	"typePax": "adult",
	        	"birdthDate": $scope.local.traveler.dateofbirth,
	        	"documentType": "",
	        	"documentNumber": "",
	        	"holder": true
	    	};
	    	if ($scope.local.traveler.location !== null) {
		    	if ($scope.local.traveler.location.countrycode){
		    		$scope.booking.roomDistribution[0].paxList[0].country = _findcounty($scope.local.traveler.location.countrycode);
		    	}	
	    	}
	    	
    	}
    };


////////////////////////////////////////////////
///	
// USER Events And functions
////////////////////////////////////////////////
///	
///	
///	

	$scope.$on('userlogged', function (event, session) {
	    console.log('User logged...! lets recover the traveler data...');
	    if (session) {	    	
	        recoverSession();
	    }
	});

	$scope.$on('userlogged_error', function (event, error) {
	    tools_service.showPreloader($scope, '');
	    if (error) {
	        toaster.pop('error', 'Error en identificacion', error.error);
	    }
	});

	$scope.$on('userlogedsocialmethod', function (event, session) {
	    console.log('User logged...! lets recover the traveler data...');
	    if (session) {
	        recoverSession();
	    }
	});

	$scope.$on('userlogedsocialmethod_error', function (event, error) {
	    console.log('social login...!');
	    console.log(error);
	    tools_service.showPreloader($scope, '');
	    toaster.pop(
                'error',
                'Identificacion',
                error.error);

	});



	/**
	 * recupera la session del usuario logueado
	 */
	function recoverSession( callback ) {
	    try {
	        tools_service.showPreloader($scope, 'show');
			yto_session_service.currentSession(function (session) {
            //openmarket_session_service.currentSession(function (session) {

                if (session != null) {
					$scope.local.user = session.user;
					$scope.load.user = true;

                	if (session.traveler != null){
	                    //pago por defecto tpv
	                    $scope.tabActive = 'tpv';
	                    $scope.local.traveler = session.traveler;
	                    $scope.load.traveler = true;
						if ($scope.local.traveler.phone) {
						    //console.log("_si tel_"+$scope.local.traveler.phone);
						    $scope.showStep.s0 = false;
						} else {
						    //console.log("_no tel_"+$scope.local.traveler.phone);
						    $scope.showStep.s0 = true;
						}
                    }
                    if (session.affiliate != null){                    	
                    	$scope.tabActive = 'transfer';
                    	$scope.showStep.s0 = false;
	                    $scope.local.affiliate = session.affiliate;
	                    $scope.local.agencyid = session.agencyid;
	                    $scope.local.firstPayPercent = 15;
	                    $scope.load.affiliate = true;
	                }

                    tools_service.showPreloader($scope, 'hide');
					
					if (angular.isFunction(callback)){
						callback();
					}

                } else {
                	$scope.tabActive = 'default';
                    tools_service.showPreloader($scope, 'hide');
                    
                    if (angular.isFunction(callback)){
						callback();
					}
                }

            });
	 
	    }
	    catch (err) {
	        console.log(err);
	    }
	}
	



  




////////////////////////////////////////////////
///	
// HELPERS FUNCTIONS
////////////////////////////////////////////////
///	
///	
///	

	$scope.toggle = function(aux) {
		eval("$scope." + aux + " = !$scope." + aux);
	};

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
	
	// devuelve el nombre en spanish  del pais dado su codigo
	$scope.findCountryByCode = function(countryCode){
		return _findcounty(countryCode).name_es;
	};





////////////////////////////////////////////////
///	
// Calendar Functions
////////////////////////////////////////////////
///	
///	
///	



    $scope.$on('selectDay', function(event, day) {    	
     	$scope.setDay(day);
 	});

    $scope.$on('dayNotAvailable', function(event) {
    	// $scope.toConfirm = true;
     	// $scope.dateNoMatch = false;
     	// console.log('not available',$scope.dateSelected);
 	});
	
    /**
     * funcion que seleccionado el dia,una vez cargado el calendario, con el dia seleccionado obtiene el precio por pax para ese dia
     * para los tipos de habitaicones que haya introducido el dmc 
     */
    $scope.setDay = function(day){   
    	console.log("\n\n####### setday: ",day);
        	    	    	
    	$scope.dateNoMatch = true;
    	$scope.readyToPay = false;    	
    	var local = $scope.local;
    	local.days = $scope.product.itinerary.length;
    	
    	
    	
    	//*************************************
    	// 1.1) setar los precios para afiliado
    	//*************************************    	
    	if($scope.load.affiliate && $scope.load.affiliate == true){
    		    		
    		
            if ($scope.local  && $scope.local.affiliate && $scope.local.affiliate.fees && $scope.local.affiliate.fees.unique !== null &&
            	$scope.local.affiliate.fees.unique !== undefined){                 
                        	
            	// calculamos los nuevos importes pvp en base al neto agencia (devuelto por la api, mas la comision del afiliado)
            	$scope.local.priceAffiliate.perpersonPVPAgency.single = tools_service.buildAffiliatePVPPrice(day.rooms.single.price,$scope.local.affiliate, "unique");
            	$scope.local.priceAffiliate.perpersonPVPAgency.double = tools_service.buildAffiliatePVPPrice(day.rooms.double.price,$scope.local.affiliate, "unique");
            	$scope.local.priceAffiliate.perpersonPVPAgency.triple = tools_service.buildAffiliatePVPPrice(day.rooms.triple.price,$scope.local.affiliate, "unique");
            	if(day.rooms.other && day.rooms.other.price){
            		$scope.local.priceAffiliate.perpersonPVPAgency.other  = tools_service.buildAffiliatePVPPrice(day.rooms.other.price,$scope.local.affiliate, "unique");
            	}
            	//los precios originales los conservamos seran nuestros netos agenci para el affiliado
            	$scope.local.priceAffiliate.perpersonOrigPVPAgency.single = tools_service.buildAffiliatePVPPrice(day.rooms.single.price,$scope.local.affiliate, "unique");
            	$scope.local.priceAffiliate.perpersonOrigPVPAgency.double = tools_service.buildAffiliatePVPPrice(day.rooms.double.price,$scope.local.affiliate, "unique");
            	$scope.local.priceAffiliate.perpersonOrigPVPAgency.triple = tools_service.buildAffiliatePVPPrice(day.rooms.triple.price,$scope.local.affiliate, "unique");
            	if(day.rooms.other && day.rooms.other.price){            		
            		$scope.local.priceAffiliate.perpersonOrigPVPAgency.other  = tools_service.buildAffiliatePVPPrice(day.rooms.other.price,$scope.local.affiliate, "unique");
            	}       
            	            	            	
            	// Guardamos el neto agencia original devuelto por la api
            	$scope.local.priceAffiliate.perpersonNetAgency.single = day.rooms.single.price,$scope.local.affiliate;
            	$scope.local.priceAffiliate.perpersonNetAgency.double = day.rooms.double.price,$scope.local.affiliate;
            	$scope.local.priceAffiliate.perpersonNetAgency.triple = day.rooms.triple.price,$scope.local.affiliate;
            	if(day.rooms.other && day.rooms.other.price){
            		$scope.local.priceAffiliate.perpersonNetAgency.other  = day.rooms.other.price,$scope.local.affiliate;
            	}
            	//los precios originales los conservamos seran nuestros netos agenci para el affiliado
            	$scope.local.priceAffiliate.perpersonOrigNetAgency.single = day.rooms.single.price,$scope.local.affiliate;
            	$scope.local.priceAffiliate.perpersonOrigNetAgency.double = day.rooms.double.price,$scope.local.affiliate;
            	$scope.local.priceAffiliate.perpersonOrigNetAgency.triple = day.rooms.triple.price,$scope.local.affiliate;
            	if(day.rooms.other && day.rooms.other.price){  
            		$scope.local.priceAffiliate.perpersonOrigNetAgency.other  = day.rooms.other.price,$scope.local.affiliate;
            	}    
            	
            } else {
                $log.log ('dont have fee unique');
            }
        } 
        
        //*************************************
    	// 1.2) setar los precios para traveler
    	//*************************************
        else{
        	local.price.perperson.single = day.rooms.single.price;
        	local.price.perperson.double = day.rooms.double.price;
        	local.price.perperson.triple = day.rooms.triple.price;
        	if(day.rooms.other && day.rooms.other.price){
        		local.price.perperson.other  = day.rooms.other.price;
        	}
        	local.price.perpersonOrig.single = day.rooms.single.price;
        	local.price.perpersonOrig.double = day.rooms.double.price;
        	local.price.perpersonOrig.triple = day.rooms.triple.price;
        	if(day.rooms.other && day.rooms.other.price){
        		local.price.perpersonOrig.other  = day.rooms.other.price;
        	}
        }
    	
    	//local.currency = day.rooms.currency;
		$scope.dateSelected = new Date(day.date);
		$scope.dateSelected.setHours($scope.dateSelected.getHours()+12);
		
		
		// fecha inicio booking
		$scope.booking.start = {
			"year": $scope.dateSelected.getFullYear(),
	    	"month": $scope.dateSelected.getMonth(),	    	
	    	"day": $scope.dateSelected.getDate(),
	    	"monthname_es" : tools_service.getMonthNameSpanish($scope.dateSelected.getMonth()),
	    	"monthname_en" : tools_service.getMonthNameEnglish($scope.dateSelected.getMonth())	    	
		};

		if(debug)
			$log.log('$scope.booking.start',$scope.booking.start)
		//fecha fin booking
		var auxDate = new Date($scope.dateSelected.getFullYear(), $scope.dateSelected.getMonth(), 1);
		auxDate.setDate($scope.dateSelected.getDate() + $scope.product.itinerary.length);

		$scope.booking.end = {
			"year": auxDate.getFullYear(),
	    	"month": auxDate.getMonth(),	    	
	    	"day": auxDate.getDate(),
	    	"monthname_es" : tools_service.getMonthNameSpanish(auxDate.getMonth()),
	    	"monthname_en" : tools_service.getMonthNameEnglish(auxDate.getMonth())
		};

		if(debug)
			$log.log('$scope.booking.end',$scope.booking.end);
		// check is affiliate to get days to divide payment
		if ($scope.local.user !== null && 
			$scope.local.user.isAffiliate !== undefined &&
			$scope.local.user.isAffiliate){
			$scope.restDays = _getPaymentOptionAffiliate();
		}
		if(debug)
			$log.log ('restDays ',$scope.restDays);

		local.datePayEnd = new Date(day.date);
		if (debug)
			$log.log("fecha segundo pago: ",local.datePayEnd);
		
		local.datePayEnd.setDate(local.datePayEnd.getDate() - $scope.restDays);
		
		if (debug)
			$log.log("fecha segundo pago- "+$scope.restDays+" días: ",local.datePayEnd);
				
		if(debug)
			$log.log ('local.datePayEnd ',local.datePayEnd);

		local.datePayEnd.setHours(12,0,0,0);
		$scope.dateActual.setHours(12,0,0,0);
		if (local.datePayEnd > $scope.dateActual){
			if(debug)
				$log.log("hay "+local.datePayEnd +" > "+ $scope.dateActual+" dias previos para fraccionar el pago")
			local.hasPayOptions = true;
		} else {
			//$log.log("no alcanza la diferncia de dias para fraccionar el pago")
			local.hasPayOptions = false;
			local.aumontSelected=100;
		}
		var dateURL = $filter('date')($scope.dateSelected, 'dd-MM-yyyy');
		var actual = $location.search('datein', dateURL);
		$scope.initcalendar = true;
		
				
		$scope.loadBooking();
    };








////////////////////////////////////////////////
///	
// LAYOUT Functions
////////////////////////////////////////////////
///	
///	
///	



	// manage tabs in payment step

	$scope.setTab = function(tab){		
		//$log.log($scope.tabActive);		
		if ($scope.tabActive != tab && $scope.tabActive != 'default'){			
			$scope.tabActive = tab;
			if($scope.booking.payStatus[0] !== null){
				$scope.booking.payStatus[0].paymentMethod=tab;				
				$scope.booking.payStatus[0].nextPaymentDate=$scope.local.datePayEnd;				
			}					
		}
	};


	 $scope.gotoElement = function(eID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $log.log(">>>>> hash : "+eID);
        $location.hash(eID);

        // call $anchorScroll()
        $timeout(function() {
            anchorSmoothScroll.scrollTo(eID);
        }, 150);
    };







////////////////////////////////////////////////
///	
// VALIDATION Functions
////////////////////////////////////////////////
///	
///	
///	


    function _formUpdateValid(){
    	if ($scope.updateuser.$valid){
    		return true;
    	} else {
    		return false;
 		}
    }

	$scope._checkBooking = function(){
				
		// check if data loaded
		if ($scope.load.booking){
			var bookingValid = false;
			var invoiceValid = true;
			var insurance = true;
			var valid = false;
			var localuser = false;
			if (debug)
				$log.log("$scope.load.affiliate _ ",$scope.load.affiliate, "\r",
					 	 "$scope.load.traveler _ ",$scope.load.traveler, "\r");

			// si es un usuario
			if ($scope.load.traveler){
				// si tenemos el telefono del usuario
				if($scope.local.traveler.phone){
					if (debug)
						$log.log($scope.local.traveler.phone, "$scope.local.traveler.phone");
					localuser = true;
				}
			}
			
			// si es una agencia
			else if($scope.load.affiliate){				
				if($scope.local.affiliate && $scope.local.affiliate.company && $scope.local.affiliate.company.phone){					
					if (debug)
						$log.log($scope.local.affiliate.company.phone, "$scope.local.affiliate.company.phone");
					localuser = true;				
				}				
			}
			
			if (debug)
				$log.log("$scope.accomodation.$valid", $scope.accomodation.$valid, "\r",
						 "$scope.generalconditions.$valid", $scope.generalconditions.$valid, "\r",
						 "$scope.payconditions.$valid", $scope.payconditions.$valid);
			if ($scope.accomodation.$valid && $scope.generalconditions.$valid && $scope.payconditions.$valid){
				bookingValid = true;
			}
			if ($scope.booking.userinvoicedata.wantinvoice){
				//$log.log($scope.invoiceform.$valid, "$scope.invoiceform.$valid")
				if ($scope.invoiceform.$valid){
					invoiceValid = true;
				} else {
					invoiceValid = false;
				}
			}
		
			if ($scope.insurance){
				insurance = true;
			} else {
				insurance = false;
			}

			if(bookingValid && invoiceValid && localuser && insurance){
				valid = true;
			}
			if (debug)
				$log.log("bookingValid", bookingValid, "\r",
						 "invoiceValid", invoiceValid, "\r",
						 "valid", valid);
			return valid;
		}else{
			return false;
		}
	};

	$scope.confirmBtn = function(){
		if ($scope._checkBooking()){
			$scope.sendBooking();
		} else {
			$scope.feedbackError();
		}
	};

	$scope.wantInvoice = function() {
		if ($scope.booking.userinvoicedata.wantinvoice === true) {
			$scope.booking.userinvoicedata.wantinvoice = false;	
			//recalc side element - resumen
			document.dispatchEvent(new CustomEvent("sticky:recalc"));
		} else {
			$scope.booking.userinvoicedata.wantinvoice = true;
			//recalc side element - resumen
			document.dispatchEvent(new CustomEvent("sticky:recalc"));
		}
	};

	$scope.feedbackError = function () {
		//alert('voy a reservar on request (feedbackRQ)');
		var errors = [];
		var title = 'Error en el formulario';
		if ($scope.bookingnewuser){
			if (!$scope.bookingnewuser.$valid){
				title = 'Registrate por favor';
				errors.push('Necesitamos tus datos de contacto.');
			}
		}
		if ($scope.updateuser){
			if (!$scope.updateuser.$valid){
				title = 'Actualiza tus datos';
				errors.push('Necesitamos un teléfono de contacto.');
			}
		}
		if (!$scope.accomodation.$valid){
			title = 'Error en el formulario';
			errors.push('Comprueba los datos de los pasajeros.');
		}
		if (!$scope.generalconditions.$valid){
			title = 'Error en el formulario';
			errors.push('Acepta las condiciones y política de cancelación.');
		}
		if ($scope.booking.userinvoicedata.wantinvoice){
			//$log.log($scope.invoiceform.$valid, "$scope.invoiceform.$valid")
			if (!$scope.invoiceform.$valid){
				title = 'Error en el formulario';
				errors.push('Comprueba los datos de facturación.');
			}
		}
		if (!$scope.insurance){
				title = 'Error en el formulario';
				errors.push('Debes confirmar la información de seguros.');
		}
		if (errors.length > 0) {
            toaster.pop('error', title, errors.join('<br>'),6000 ,'trustedHtml');
        }
    };


//    $scope.updateAccount = function () {
//    	//$log.log(_formUpdateValid())
//    	if (_formUpdateValid()){
//	    	openmarket_api_service.saveTraveler($scope.local.traveler, function (updatesession) {
//	    		yto_session_service.saveSession(updatesession.Session);
//	        	toaster.pop('success', 'Usuario Actualizado', 'Has agregado el teléfono a tu cuenta' , 6000 ,'trustedHtml');
//	        	$scope.showStep.s0 = false;
//	    	});
//		} else {
//			toaster.pop('error', 'Error', 'Error al actualizar usuario' , 6000 ,'trustedHtml');
//		}
//	};





////////////////////////////////////////////////
///	
// PAYMENT Functions
////////////////////////////////////////////////
///	
///	
///	



    /**
     * funcion que calcula la fecha del segundo pago de la reserva, en funcion de lo que haya configurado en el dmc
     */
    function _getPaymentOptionAffiliate(){
    	if ($scope.product.dmc.membership.paymentoption !== undefined){
	    	if (debug)
				$log.log('$scope.product.dmc.membership.paymentoption.slug ',$scope.product.dmc.membership.paymentoption.slug);
	    	switch($scope.product.dmc.membership.paymentoption.slug) {
	    	    case '28before':
	    	        return 28+7;
	    	    case '21before':
	    	        return 21+7;
				case '14before':
	    	        return 14+7;
				case '7before':
	    	        return 7+7;
				case 'arrival':
	    	        return 7;
				case 'departure':
	    	        return 7;
	    	    default:
	    	        return 30;
	    	}
    	} else {
    		console.log("No tiene configurado el pago el dmc: ",$scope.product.dmc.code);
    		return 30;
    	}
    }


    /**
     * esta funcion recibe un mensaje del controlador del iframe (clientPaymentTpvRetryCtrl) el cual cambia el valor de la variable para recargar el iframe
     */
    $scope.$on('reloadIframe', function() {
    	$scope.readyToPay = false;
    	//$scope.readyToPay = true;
      });
    


	 /**
     * obtiene la url del iframe del tpv de sabadell
     */
    $scope.getUrlTPVIframe = function (booking){    
    	
    	var urlok;
    	
    	// variable de retorno en funcion del total a pagar
    	if($scope.booking.payStatus[0].payment !== null){
    		if($scope.booking.payStatus[0].payment=='100'){
    			urlok = $location.protocol() + '://' + location.host +"/thankyou-complete?bookingId="+booking.idBooking;
    		}
    		else{
    			urlok = $location.protocol() + '://' + location.host + "thankyou-pre?bookingId="+booking.idBooking;
    		}
    	}
    	
    	//nombre del producto
    	var name = '';    	
    	if($scope.product  && $scope.product.title_es!=''){
    		name = $scope.product.title_es;
    	}
    	else if($scope.product && $scope.product.title != ''){
    		name = $scope.product.title;
    	}

    	return "/callPaymentTPV?amount="+booking.amount.exchange.value+"&bookingId="+booking.idBooking+"&totalPay="+$scope.booking.payStatus[0].payment+
    	"&productName="+name+"&urlpost="+$location.protocol() + '://' + location.host +"/returnPaymentTPV"+"&urlok="+urlok+"&urlko="+$location.protocol() + '://' + location.host +"/retry-payment"+"&debug=true";    	
    };
    
     
    
	/**
	 *  funcion que crea un pago ya sea tpv o transferencia
	 */
    $scope.sendBooking = function(){
    	
    	tools_service.showPreloader($scope, 'show');
        // sending booking
		$log.log("sending booking....");
				
		// transform pax date to UTC

		for ( var i = 0; i< $scope.booking.roomDistribution.length; i++){
			var room = $scope.booking.roomDistribution[i];
			for (var j = 0; j < room.paxList.length; j++) {
				// Add holder name in uppercase
				if (i == 0 && j == 0){
					$scope.booking.holder = room.paxList[j].name.toUpperCase() +' '+room.paxList[j].lastName.toUpperCase();
				}
				var browDate = new Date(room.paxList[j].birdthDate);
				var toServer = new Date(Date.UTC(browDate.getFullYear(), browDate.getMonth(),browDate.getDate()));
				$scope.booking.roomDistribution[i].paxList[j].birdthDate = toServer;
			}
		}

		
		//guardar las politicas de cancelacion en la booking
		if($scope.quote.rooms !== undefined){
			$scope.booking.cancelpolicy = $scope.quote.responseDetails.cancelpolicy;
		}
		else{
			$scope.booking.cancelpolicy = $scope.product.dmc.membership.cancelpolicy; 
		}
		  
		
		// 1ha seleccioado dos pagos y hay fecha tope de segundo pago		
		if($scope.booking.payStatus[0].payment<100){
			if($scope.local.hasPayOptions){				
				$scope.booking.payStatus[0].nextPaymentDate=$scope.local.datePayEnd;			
			}
			else{
				$scope.booking.payStatus[0].nextPaymentDate='';			
			}
	    }
		else{			
			$scope.booking.payStatus[0].nextPaymentDate='';
		}
		
		
		//********************************************
		//2) si es un afiliado, guardo sus estructuras	
		//********************************************		
		if($scope.load.affiliate){
			$scope.booking.isB2C = false; // es b2b
			
			$scope.booking.fees =  $scope.local.affiliate.fees;
			$scope.booking.traveler = null;
			// fecha final para pagar
			var auxDate = new Date();
			auxDate.setDate($scope.dateSelected.getDate() - _getPaymentOptionAffiliate());
			$scope.booking.finalDatePaymentAffiliate = auxDate;			
		}
		else{
			$scope.booking.isB2C = true; // es b2c
			$scope.booking.affiliate = null;
		}
			
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
				//si es una agencia
				if($scope.load.affiliate){
					dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.single;
					dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.single;
				}
				//es un traveler
				else{
					dummyPrice.exchange.value=$scope.local.price.perperson.single;
				}				
			}
			
			// habitacion doble
			else if ($scope.booking.roomDistribution[it].roomCode =='double'){
				//es una agencia
				if($scope.load.affiliate){
					dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.double;
					dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.double;
				}
				//es un traveler
				else{
					dummyPrice.exchange.value=$scope.local.price.perperson.double;
				}																
			}
			
			// habitacion triple
			else if ($scope.booking.roomDistribution[it].roomCode =='triple'){
				//es una agencia
				if($scope.load.affiliate){					
					dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.triple;
					dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.triple;
				}
				//es un traveler
				else{
					dummyPrice.exchange.value=$scope.local.price.perperson.triple;
				}							
			}
			
			// habitacion quad
			else if ($scope.booking.roomDistribution[it].roomCode =='quad'){
				//es una agencia
				if($scope.load.affiliate){
					dummyPrice.exchange.value=$scope.local.priceAffiliate.perpersonNetAgency.other;
					dummyAffiliatePrice.exchange.value=$scope.local.priceAffiliate.perpersonPVPAgency.other;
				}
				//es un traveler
				else{
					dummyPrice.exchange.value=$scope.local.price.perperson.other;
				}							
			}		
			$scope.booking.roomDistribution[it].pricePerPax = dummyPrice;
			//si es afiliado guardo el precio por pax pvp final para afiliado
			if($scope.load.affiliate){
				$scope.booking.roomDistribution[it].pvpAffiliatePerPax = dummyAffiliatePrice;
			}
		}
		
		
		
		// **********************************************************************************
		//2.1) es una reserva de un tailor made debo guardar la referencia a la query y quote
		// **********************************************************************************
		if($scope.quote!=null && $scope.quote.rooms!=null){			
			// el precio total de la booking, tiene que ser el total de sumar el priceperpax de cada pax de la distribucion
					
			
			// 2.2) setear si es grupo de tailormade
			if($scope.query!= null && $scope.query.group != null && $scope.query.group.adults !=null && $scope.query.group.adults >0){
				$scope.booking.isGroup=true;
			}
			
			// 2.3) copiar el contenido de room de quote en roomdistribution de la booking			
			for (var it=0; it <$scope.booking.roomDistribution.length; it++){				
				
				// habitacion simple
				if($scope.booking.roomDistribution[it].roomCode == 'single'){					
					if($scope.quote.rooms.single.quantity>0){
						//neto agencia
						$scope.booking.roomDistribution[it].pricePerPax ={							
			                value : ($scope.quote.rooms.single.amountPricePerPax.value), 
			                currency: $scope.quote.rooms.single.amountPricePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.single.amountPricePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.single.amountPricePerPax.exchange.currency,
			                }
						};
						// pvp
						$scope.booking.roomDistribution[it].pvpAffiliatePerPax = {
							value : ($scope.quote.rooms.single.pvpAffiliatePerPax.value), 
			                currency: $scope.quote.rooms.single.pvpAffiliatePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.single.pvpAffiliatePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.single.pvpAffiliatePerPax.exchange.currency,
			                }								
						}
					}					
				}
				// dobuble
				else if($scope.booking.roomDistribution[it].roomCode == 'double'){
					if($scope.quote.rooms.double.quantity>0){
						// neto agencia
						$scope.booking.roomDistribution[it].pricePerPax ={							
			                value : ($scope.quote.rooms.double.amountPricePerPax.value), 
			                currency: $scope.quote.rooms.double.amountPricePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.double.amountPricePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.double.amountPricePerPax.exchange.currency,
			                }
						};
						
						// pvp
						$scope.booking.roomDistribution[it].pvpAffiliatePerPax = {
							value : ($scope.quote.rooms.double.pvpAffiliatePerPax.value), 
			                currency: $scope.quote.rooms.double.pvpAffiliatePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.double.pvpAffiliatePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.double.pvpAffiliatePerPax.exchange.currency,
			                }								
						}
					}			
				} 
				else if($scope.booking.roomDistribution[it].roomCode == 'triple'){
					if($scope.quote.rooms.triple.quantity>0){
						// neto agencia
						$scope.booking.roomDistribution[it].pricePerPax ={							
			                value : ($scope.quote.rooms.triple.amountPricePerPax.value), 
			                currency: $scope.quote.rooms.triple.amountPricePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.triple.amountPricePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.triple.amountPricePerPax.exchange.currency,
			                }
						};
						
						// pvp
						$scope.booking.roomDistribution[it].pvpAffiliatePerPax = {
							value : ($scope.quote.rooms.triple.pvpAffiliatePerPax.value), 
			                currency: $scope.quote.rooms.triple.pvpAffiliatePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.triple.pvpAffiliatePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.triple.pvpAffiliatePerPax.exchange.currency,
			                }								
						}
					}			
				}
				else{
					if($scope.quote.rooms.quad.quantity>0){
						// neto agencia
						$scope.booking.roomDistribution[it].pricePerPax ={							
			                value : ($scope.quote.rooms.quad.amountPricePerPax.value ), 
			                currency: $scope.quote.rooms.quad.amountPricePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.quad.amountPricePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.quad.amountPricePerPax.exchange.currency,
			                }
						};
						
						// pvp
						$scope.booking.roomDistribution[it].pvpAffiliatePerPax = {
							value : ($scope.quote.rooms.quad.pvpAffiliatePerPax.value), 
			                currency: $scope.quote.rooms.quad.pvpAffiliatePerPax.currency,				                
			                exchange: { 
			                    value : ($scope.quote.rooms.quad.pvpAffiliatePerPax.exchange.value), 
			                    currency: $scope.quote.rooms.quad.pvpAffiliatePerPax.exchange.currency,
			                }								
						}
					}			
				}				
			}
						
			$scope.booking.holder = $scope.query.title;
			$scope.booking.quoteCode = $scope.quote.code;
			$scope.booking.queryCode = $scope.quote.userqueryCode;
			$scope.booking.start = $scope.quote.operationStart;
			
			// fecha fin del viaje
			var auxDate = new Date($scope.booking.start.year,$scope.booking.start.month,$scope.booking.start.day);			
			auxDate.setDate(auxDate.getDate() + parseInt($scope.query.dates.duration));						

			$scope.booking.end = {
				"year": auxDate.getFullYear(),
		    	"month": auxDate.getMonth(),	    	
		    	"day": auxDate.getDate(),
		    	"monthname_es" : tools_service.getMonthNameSpanish(auxDate.getMonth()),
		    	"monthname_en" : tools_service.getMonthNameEnglish(auxDate.getMonth())
			};
		}
		
		//****************************************************************************
		// si es una reserva de presupuesto guardo en la booking el id del presupuesto
		//****************************************************************************
		if($scope.budget!=null && $scope.budget.idBooking!=null){
      		$scope.booking.budgetCode = $scope.budget.idBooking;
		}
		
		
		//***************************************
		// 3.1) confirmar la reserva por pago tpv (NO SE USA, si se usase probar)
		//***************************************				
		if ($scope._checkBooking() && ($scope.booking.payStatus[0].paymentMethod=='tpv' || $scope.tabActive=='tpv')){
			
		
			// 1) status (sin estado)			
			$scope.booking.status='';			
	   		
			// 2) actualizo el metodo de pago
			$scope.booking.payStatus[0].paymentMethod='tpv';
			
			// 3) guardar la resreva en mongo (api nueva)
			var rq = {
				command: 'save', // command: 'list', 
				service: 'api',
				request: {
				  data: $scope.booking,
				  query: { idBooking: $scope.booking.idBooking },
				  collectionname: 'Bookings',
				  oncompleteeventkey: 'save.done',
				  onerroreventkey: 'save.error',
				} 
		    };
			
			var rqCB = yto_api.send(rq);

			// response OK
			rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	   if (rsp!=null){
        		   
        		   $log.info("Booking Save OK. IdBooking: ",rsp.idBooking);  ;
  	            	
  	            	//actualizo el id de reserva
  	            	$scope.booking.idBooking = rsp.idBooking;	   	            	
  	            	
  	            	//paso al pago por tpv
  	            	$scope.readyToPay= true;  	            			  
        		           	
  	            } else {
  	            	toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);
  	            	$log.error("Error al guardar la reseva en base de datos, con estado: "+$scope.booking.status);
  	            	$scope.errorServerSave = true;
  	            }
        	       	       
			});
           
			// response KO
			rqCB.on(rqCB.onerroreventkey, function (err) {  
        	   toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);	           
	           $scope.errorServerSave = true;	           
               $log.error('ERROR en guardar la booking en base de datos. Details: ',err);               
			});
		}
		
		//**************************************************
		// 3.2) confirmar reserva por pago por transferencia
		//**************************************************
		else if($scope._checkBooking() && $scope.tabActive =='transfer'){		
			//alert("por transfer!!");	
			
			// 1) actualizo el metodo de pago
			$scope.booking.payStatus[0].paymentMethod='transfer';
			$scope.booking.payStatus[0].date=new Date();//fecha de la transferencia
			
			// pongo el amount
			$scope.booking.payStatus[0].amount =  {
				"value": 0,
				"currency" : $scope.booking.amount.currency,
				"exchange" :{
					"value": ($scope.booking.amount.exchange.value * $scope.booking.payStatus[0].payment / 100) ,
					"currency": $scope.booking.amount.exchange.currency
				}
			};
			
			// 2) poner el estado de pagado por tranferencia
			if($scope.booking.payStatus[0]!=null && $scope.booking.payStatus[0].payment!='100'){				
				$scope.booking.status='transfer1-2';				
				
				
				// 2.1) inserto el segundo pago, para que omt solo tenga que validarlo pues, los afiliados haran las transferencias
				var dummyPayment = {
						"paymentMethod" : 'transfer',
						"payment": '85',
						"amount" : {
							"value": 0,
							"currency" : $scope.booking.amount.currency,
							"exchange" :{								
								"value": ($scope.booking.amount.exchange.value - $scope.booking.payStatus[0].amount.exchange.value),
								"currency": $scope.booking.amount.exchange.currency
							}
						}
				};
				$scope.booking.payStatus.push(dummyPayment);
			}
			else{				
				$scope.booking.status='transferok2-2';
			}			
						
			// 3)inicializo el estado en historico
			var  dummyHistoric = {};
			// si es una agencia
			if($scope.load.affiliate){
				dummyHistoric = {	  
						"date": new Date(),
						"state" : $scope.booking.status,
						"user" :  $scope.local.affiliate.contact.email //mail del traveler que hizo la reserva						
	           	};
			}
			// si es un traveler
			else{
				dummyHistoric = {	  
						"date": new Date(),
						"state" : $scope.booking.status,
						"user" :  $scope.local.traveler.email //mail del traveler que hizo la reserva						
	           	};
			}
           		           	
           	if($scope.booking.historic == null){
           		$scope.booking.historic=[];
           	}
           	$scope.booking.historic.push(dummyHistoric);
						
			
			// 4) guardar la reserva
			var postdata = {
    			booking : $scope.booking,
    			updatePrices : true
	    	}
												
			// guardo y actualizo los importes
			console.log("**** comision: ",$scope.booking.comision);
			console.log("**** isB2C: ",$scope.booking.isB2C);
			console.log("**** b2bcommission: ",$scope.booking.b2bcommission);
			console.log("**** omtmargin: ",$scope.booking.omtmargin);
			console.log("**** fees: ",$scope.booking.fees);
			console.log("**** affiliate: ",$scope.booking.affiliate);
			console.log("**** local.affiliate: ",$scope.local.affiliate);
			console.log("**** netPrice: ",$scope.booking.netPrice);
			console.log("**** amount: ",$scope.booking.amount);
			console.log("**** pvpAffiliate: ",$scope.booking.pvpAffiliate);
			console.log("**** roomDistribution: ",$scope.booking.roomDistribution);
			console.log("**** price: ",$scope.local.price);
			console.log("**** priceAffiliate: ",$scope.local.priceAffiliate);
			console.log("**** booking: ",$scope.booking);

			var rq = null;
			
			// si es una booking de tailormade, ya tengo los calculos hechos, solo tengo que guardar la booking
			if($scope.quote!=null && $scope.quote.rooms!=null){			
				
				rq = {
					command: 'save',
					service: 'api',
					request: {
						data: $scope.booking ,
						oncompleteeventkey: 'book.done',
						onerroreventkey: 'book.error',
						collectionname: 'Bookings',
						populate: [{path: 'affiliate'}, {path: 'dmc'}]
					}
				};	  
			}
			
			// es una booking de un producto cargado debo realiar calculos en el api
			else{
				rq = {
					command: 'book',
					service: 'api',
					request: {
						booking: $scope.booking ,
						oncompleteeventkey: 'book.done',
						onerroreventkey: 'book.error',
						populate: [{path: 'affiliate'}, {path: 'dmc'}]
					}
				};
			}

    	 
           var rqCB = yto_api.send(rq);

           // response OK
           rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	   if (rsp!=null){
  	            			  
        		    console.log("resreva guardada: ",rsp);
  	            	//actualizo el id de reserva
  	            	$scope.booking.idBooking = rsp.idBooking;
  	            	
  	            	//****************************************************************************
  	            	// si es una booking de un presupuesto, debo cambiar el estado del presupuesto
  	                //****************************************************************************
  	            	if($scope.budget!=null && $scope.budget.roomDistribution!=null){
  	            		$scope.budget.status= "budget.book";  	            		
  		       		  
    	    	        // 3) guardar la resreva en mongo (api nueva)
    	    			var rq = {
    	    				command: 'save', 
    	    				service: 'api',
    	    				request: {
    	    				  data: $scope.budget,
    	    				  query: { idBooking: $scope.budget.idBooking },
    	    				  collectionname: 'Bookings',
    	    				  oncompleteeventkey: 'save.done',
    	    				  onerroreventkey: 'save.error',
    	    				} 
    	    		    };
    	    			
    	    			var rqCB = yto_api.send(rq);

    	    			// response OK
    	    			rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
    	            	   if (rsp!=null){
    	            		   	console.log("Budget Save OK. IdBooking: ",rsp.idBooking);  ;
    	            		   	window.location = brandPath+'/thankyou-transfer'+'?bookingId='+$scope.booking.idBooking;
    	      	            } else {
    	      	            	console.log("Error al guardar el presupuesto en base de datos, con estado: "+$scope.budget.status);
    	      	            	window.location = brandPath+'/thankyou-transfer'+'?bookingId='+$scope.booking.idBooking;	      	            	  	            	
    	      	            }        	       	       
    	    			});
    	               
    	    			// response KO
    	    			rqCB.on(rqCB.onerroreventkey, function (err) {
    	    				console.log('ERROR en guardar el presupuesto en base de datos. Details: ',err);
    	    				window.location = brandPath+'/thankyou-transfer'+'?bookingId='+$scope.booking.idBooking;	                                  
    	    			});
  	            		
  	            	}
  	            	else{
  	            		$log.info("Guardada correctamente la reseva. IdBooking: ",$scope.booking.idBooking);  	            	
  	  	            	// redirecciono a la pagina de reserva creada
  	  	            	window.location = brandPath+'/thankyou-transfer'+'?bookingId='+$scope.booking.idBooking;  	            		
  	            	}
  	            	  	            	
  	            } else {
  	            	toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);
  	            	$log.error("Error al guardar la reseva en base de datos, con estado: "+$scope.booking.status);
  	            	$scope.errorServerSave = true;
  	            }
        	       	       
           });
           
           // response KO
           rqCB.on(rqCB.onerroreventkey, function (err) {  
        	   toaster.pop('error', "Error de conexión", "No se ha podido guardar tu reserva. Por favor intenta más tarde.", 10000);	           
	           $scope.errorServerSave = true;	           
               $log.error('ERROR en guardar la booking en base de datos. Details: ',err);               
           });			
		}
	};
	
	
	


////////////////////////////////////////////////
///	
// INIT Functions
////////////////////////////////////////////////
///	
///	
///	


	/**
	 * inicializa el objeto booking, y setea la distribucion (roomdistribution ) del tailormade o presupuesto si fuera el caso
	 */
    function _init( callback ) {
    	    	
    	_buildNewBooking();

        if($scope.local.traveler){
        	$scope.booking.userTraveler = angular.copy($scope.local.traveler);	
        }
        else{
        	$scope.booking.userAffiliate = angular.copy($scope.local.affiliate);
        	$scope.booking.acceptgeneral = true;
        }
		
		
		
		// ****************************************** 
		// 1) generar la distribucion para la reserva
		// ******************************************
        
		// *****************************************************************************
		// 1.1) si es una booking de un presupuesto, cargo la distribucion en la booking
		// *****************************************************************************
		if($scope.budget!=null && $scope.budget.roomDistribution!=null){						
						
			//copio la distribucion del presupuesto en la de la booking de la sesison
			$scope.booking.roomDistribution = [];
			$scope.booking.roomDistribution  = angular.copy($scope.budget.roomDistribution);
			
			//actualizar los pax ( pais y fecha de nacimiento correcta para rellenar el formulario)			
			for(var itR = 0 ; itR < $scope.booking.roomDistribution.length; itR++){
				$scope.booking.roomDistribution[itR] = $scope.updateTravelersRoom($scope.booking.roomDistribution[itR],false);	
			}
			//emito evento para mostrar popup
			//popup aceptar cambios budget
			//
			$scope.$broadcast('aceptChangeBudget');
		}
		
		// *****************************************************************************
		// 1.2) si es una booking de un tailormade, cargo la distribucion de quote.rooms
		// *****************************************************************************
		else if($scope.quote!=null && $scope.quote.rooms!=null){
							
			var numberRoom = 0;
			
			// si la query tiene agente introducido lo pongo en la booking
			if($scope.query != null && $scope.query.affiliateuser != null){
				$scope.booking.affiliateuser = $scope.query.affiliateuser;				
			}
			
						//poner la comision de la quote
			$scope.booking.comission = $scope.quote.comission;
			
			// tiene habitacion/es simple/s
			if($scope.quote.rooms.single.quantity>0){
				
				for(var itSimple = 0; itSimple < $scope.quote.rooms.single.quantity; itSimple++){
				
					var dummy = {
			    			"numRoom" : numberRoom,
				            "roomCode" : "single",
				            "roomType" : $scope.local.rooms[0],//simple
				            "paxList" : []
				        };
				    dummy.typeRoom = $scope.local.rooms[0]; // simple	  
				    dummy = $scope.updateTravelersRoom(dummy,false); 
				    $scope.booking.roomDistribution.push(dummy);
				    //$scope.loadBooking();
				    // recalc side element - resumen
				    //document.dispatchEvent(new CustomEvent("sticky:recalc"));
				    numberRoom++;
				}
			}
			
			// tiene habitacion/es dobles/s
			if($scope.quote.rooms.double.quantity>0){
				
				for(var itDoble = 0; itDoble < $scope.quote.rooms.double.quantity; itDoble++){
				
					var dummy = {
			    			"numRoom" : numberRoom,
				            "roomCode" : "double",
				            "roomType" : $scope.local.rooms[1],//double
				            "paxList" : []
				        };
				    dummy.typeRoom = $scope.local.rooms[1]; // double  
				    dummy = $scope.updateTravelersRoom(dummy,false); 
				    $scope.booking.roomDistribution.push(dummy);
				    //$scope.loadBooking();
				    // recalc side element - resumen
				    //document.dispatchEvent(new CustomEvent("sticky:recalc"));
				    
				    numberRoom++;
				}
			}
			
			// tiene habitacion/es triple/s
			if($scope.quote.rooms.triple.quantity>0){
				
				for(var itTriple = 0; itTriple < $scope.quote.rooms.triple.quantity; itTriple++){
				
					var dummy = {
			    			"numRoom" : numberRoom,
				            "roomCode" : "triple",
				            "roomType" : $scope.local.rooms[2],//triple
				            "paxList" : []
				        };
				    dummy.typeRoom = $scope.local.rooms[2]; // triple  
				    dummy = $scope.updateTravelersRoom(dummy,false); 
				    $scope.booking.roomDistribution.push(dummy);
				    //$scope.loadBooking();
				    // recalc side element - resumen
				    //document.dispatchEvent(new CustomEvent("sticky:recalc"));
				    
				    numberRoom++;
				}
			}
			
			
			// tiene habitacion/es cuadruples/s
			if($scope.quote.rooms.quad.quantity>0){
				
				for(var itQuad = 0; itQuad < $scope.quote.rooms.quad.quantity; itQuad++){
									
					var dummy = {
			    			"numRoom" : numberRoom,
				            "roomCode" : "quad",	
				            "paxList" : []
				    };				
					dummy.typeRoom = {"roomCode" : "quad", "label": "Cuádruple", "pax" : 4};
				    dummy = $scope.updateTravelersRoom(dummy,false); 
				    
				    // setear el tipo
				    dummy.roomType = {"roomCode" : "quad", "label": "Cuádruple", "pax" : 4};
				    $scope.booking.roomDistribution.push(dummy);
				    //$scope.loadBooking();
				    // recalc side element - resumen
				    //document.dispatchEvent(new CustomEvent("sticky:recalc"));
				    console.log("$scope.booking.roomDistribution: ", $scope.booking.roomDistribution);
				    
			
				    numberRoom++;
				}
			}			
		}
		
		// **************************************************************************************************
		// 1.3) si es una reserva de un $scope.producto precargado, inicializo la distribucion con una double
		// **************************************************************************************************
		else{			
			$scope.addRoom();
			$scope.feeEdited = $scope.local.affiliate.fees.unique;
		}
		
		if (angular.isDate($scope.dateActualServer)){
			$scope.dateActual = $scope.dateActualServer;
		}

		if(!$scope.initcalendar && angular.isDate($scope.dateSelectedServer)){
			$scope.dateSelected = $scope.dateSelectedServer;
		} 

		$scope.booking.userinvoicedata.country = _findcounty('ES');

		if (angular.isFunction(callback)){
			callback();
		}

	}



////////////////////////////////////////////////
///	
// LOAD Functions
////////////////////////////////////////////////
///	
///	
///
///


    var dataload = {
		content : false,
    	product : false,
    	quote : false,
    	dateActualServer : false,
    	dateSelectedServer : false,
    	nationalities : false,
    	payment : false
    };

    var _getImage = function(url,imageSize){
    	return tools_service.cloudinaryUrl(url,imageSize);
    };

    
   
    
    /**
     * recupera el contenido necesario:
     * producto original 
     * quote/query si es un tailormade
     * budget si es un presupuesto
     * 
     * contenido estatico:
     * nacionalidades
     */
    var _getContent = function(callback){

    	if(debug)
    		$log.log('_getContent');

    	// GET NATIONALITIES

    	var nationalitiesUrl = $location.protocol()+'://'+location.host+'/data/nationalities.json';
    	
		$http.get(nationalitiesUrl)
		.then(function(response) {
			if (response.data != null){
				if (debug)
					$log.log('nationalities', response.data);    				
				$scope.nationalities = response.data;
				dataload.nationalities = true;
				if (angular.isFunction(callback)){
		            	callback();
		            }
			} else {
				dataload.nationalities = false;
				$log.error("error getting nationalities");
				throw 'error getting nationalities';
			}

	    }, function(response) {
	    	dataload.nationalities = false;
			$log.error("error getting nationalities");
			throw 'error getting nationalities';
		});

		// GET PAYMENT OPTIONS
		var paymentoptionsUrl = $location.protocol() + '://' + location.host + '/statics/getstaticcontent?contentkey=paymentoptions';		

		
		http_service.http_request(paymentoptionsUrl, 'GET', null, null)
		.then(function(response) {
			if (debug)
				$log.log('paymentoptions', response);
			dataload.payment = true;
			$scope.content.paymentoptions = response;

		}, function(response) {
	    	dataload.payment = false;
			$log.error("error getting paymentoptions");
			throw 'error getting paymentoptions';
		});

		// GET PRODUCT

		//console.log ('$route.current.params', $routeParams);
		var path = $location.path();
		var slug = path.slice(path.indexOf("/booking/")+9);
		if (slug.indexOf("/") != -1){
			slug = slug.slice(0, slug.indexOf("/"));
		}
		if (debug)
			$log.log ('slug ',slug);
		var dataProduct = { slug: slug, currency: "EUR" };


		var rqprod = {
	        command: 'findone',
	        service: 'api',
	        request: {
	            query: { slug_es: slug, publishState : 'published' },
	            collectionname: 'DMCProducts',
	            populate : [{path: 'dmc', select : 'code name images company.name additionalinfo.description additionalinfo.description_es membership.b2bchanel membership.commission membership.b2bcommission membership.cancelpolicy._es membership.paymentoption currency'}]
	        }
	    };
		var rqCBProd = yto_api.send(rqprod);

        // response OK
        rqCBProd.on(rqCBProd.oncompleteeventkey, function (rsp) {
			if (rsp!=null && rsp.code != null){
				if (debug)
					$log.log('product :', rsp);
				$scope.product = rsp;
    			dataload.product = true;
    			$scope.content.tags = $scope.product.tags;
				$scope.content.days = $scope.product.itinerary.length;
				$scope.content.countries = tools_service.showCountries($scope.product.itinerary);
				$scope.content.url =  $location.protocol()+'://'+location.host+$location.path();
				$scope.content.mailimageurl = _getImage($scope.product.productimage.url ,'mainproductimagemail');
				$scope.content.mailimageurlretina = _getImage($scope.product.productimage.url  ,'mainproductimageretinamail');
    			if (debug)
					$log.log('content', $scope.content);

				// //MANUAL RELEASE
				(!$scope.product.release)? $scope.product.release = 0 : null;

				if (debug)
					$log.log('release', $scope.product.release);
    			dataload.content = true;
    			if (angular.isFunction(callback)){
					callback();
				}
      	       	       
	       	} else {
	       		
	       		// si vengo de un presupuesto, y ya no existe el programa, debo actualizar el estado del presupuesto y mostrar una advertencia
	       		if (budgetId !== undefined && budgetId !== ''){
	       				       			
	       			// guardar el presupuesto a cancelado
	       			$scope.deleteBudget = true;
	       			tools_service.showPreloader($scope, 'hide');
      			 	toaster.pop('error', 'Lo sentimos. Este programa ya no está disponible.', 'Consúltanos.',10000);
	       		}
	       		else{	       		
	       			$log.log('product not found or product is not published');
	       			window.location = "/404";
	       		}
	       	}
       	});
       
       // response KO
       	rqCBProd.on(rqCBProd.onerroreventkey, function (err) {
    	   	dataload.product = false;
			$log.error("error getting product with slug_es: ",slug,' details: ',err);
			
			tools_service.showConectionError($scope, "show");

			// if (angular.isFunction(callback)){
			// 	callback();
			// }        	                  
       	});

       	// *********
		// GET QUOTE
        // *********
		var quoteCode = $location.search().quote;
		if (quoteCode !== undefined && quoteCode !== ''){
			if (debug)
				$log.log('have quote :',quoteCode );
			
			var rq = {
		        command: 'findone',
		        service: 'api',
		        request: {
		            query: { code: quoteCode },
		            collectionname: 'Quotes',
		            populate: [{path: 'products'}, {path: 'chat'}]
		        }
		    };
			var rqCB = yto_api.send(rq);

            // response OK
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
        	   if (rsp!=null){
        		   if (debug)
        			   $log.log('quote', rsp);
    		   		$scope.quote = rsp;
    		   		dataload.quote = true;
    		   		
    		   		
    		   		// ******************
    		   		// recuperar la query
    		   		// ******************
    		   		var rq = {
				        command: 'findone',
				        service: 'api',
				        request: {
				            query: { code: $scope.quote.userqueryCode },
				            collectionname: 'UserQueries'//,
				           // populate: [{path: 'products'}, {path: 'chat'}]
				        }
				    };
    		   		
    		   		var rqCB = yto_api.send(rq);
    		   		
    		   		
    		   		// get query ok
    		   		rqCB.on(rqCB.oncompleteeventkey, function (response) {
    		   			
    		   			// get query 
    		   			if (response!=null){
    		   				$scope.query = response;    		   			
    	    		   		if (angular.isFunction(callback)){
    	    		   			callback();
    	    		   		}  	
    		   			}
    		   			else {
	    		       	   	$log.log('no query was found with code: ',$scope.quote.userqueryCode);
	    			   		if (angular.isFunction(callback)){
	    			   			callback();
	    			   		}
	    	            }  
    		   		});
    		   		
    		   		// error getting query
    		   		rqCB.on(rqCB.onerroreventkey, function (err) {
    	        	   	dataload.quote = false;
    					$log.error("error getting query with code: ",$scope.quote.userqueryCode,' details: ',err);
    					tools_service.showConectionError($scope, "show");	                  
    		   		});
    		   		
    		   		
   		   		// no quote wahs found
  	            } else {
		       	   	$log.log('no quote was found with code: ',quoteCode);			   		
			   		dataload.quote = true;
			   		if (angular.isFunction(callback)){
			   			callback();
			   		}
  	            }        	       	       
           });
           
           // response KO
           rqCB.on(rqCB.onerroreventkey, function (err) {
        	   	dataload.quote = false;
				$log.error("error getting quote with code: ",quoteCode,' details: ',err);
				tools_service.showConectionError($scope, "show");	                  
           });
		} else {
			
			
			// ********
			// budget
			//*********
			var budgetId = $location.search().budget;
			if (budgetId !== undefined && budgetId !== ''){
				console.log("********** es un presupuesto: ",budgetId);
				
				//rescatar el presupuesto (booking)
				var rq = {
			        command: 'findone',
			        service: 'api',
			        request: {
			            query: { idBooking: budgetId },
			            collectionname: 'Bookings',
			            populate: [{path: 'dmc'},{path: 'affiliate'}]
			        }
			    };
				var rqCB = yto_api.send(rq);

	            // response OK
	            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
	        	   if (rsp!=null){
	        		   if (debug)
	        			   $log.log('budget: ', rsp);
	    		   		$scope.budget = rsp;
	    		   		dataload.quote = true;
	    		   		
	    		   		
	    		   		// ********************************************************************
	    		   		// si el presupuesto es para eliminarlo poruqe ya no existe el programa
	    		   	    // ********************************************************************
	    		   		if($scope.deleteBudget){
	    		   			$scope.budget.status = "budget.cancel";
	    		       		  
	    	    	        // 3) guardar la resreva en mongo (api nueva)
	    	    			var rq = {
	    	    				command: 'save', 
	    	    				service: 'api',
	    	    				request: {
	    	    				  data: $scope.budget,
	    	    				  query: { idBooking: $scope.budget.idBooking },
	    	    				  collectionname: 'Bookings',
	    	    				  oncompleteeventkey: 'save.done',
	    	    				  onerroreventkey: 'save.error',
	    	    				} 
	    	    		    };
	    	    			
	    	    			var rqCB = yto_api.send(rq);

	    	    			// response OK
	    	    			rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
	    	            	   if (rsp!=null){
	    	            		   	console.log("Budget Save OK. IdBooking: ",rsp.idBooking,' Not found this program for the budget.');  ;
	       	       			 		window.location = brandPath+'/requests/multidays';
	    	      	            } else {
	    	      	            	console.log("Error al guardar el presupuesto en base de datos, con estado: "+$scope.budget.status);
	    	      	      			window.location = brandPath+'/requests/multidays';	      	            	  	            	
	    	      	            }        	       	       
	    	    			});
	    	               
	    	    			// response KO
	    	    			rqCB.on(rqCB.onerroreventkey, function (err) {
	    	    				console.log('ERROR en guardar el presupuesto en base de datos. Details: ',err);
	    	    	      	   	window.location = brandPath+'/requests/multidays';	                                  
	    	    			});
	    		   		}
	    		   		else{	    		   		
		    		   		// devolver el control   		   			
		    		   		if (angular.isFunction(callback)){
		    		   			callback();
		    		   		} 	
	    		   		}
	    		   		
	   		   		// no budget wahs found
	  	            } else {
			       	   	$log.log('no budget was found with code: ',budgetId);			   		
				   		dataload.quote = true;
				   		if (angular.isFunction(callback)){
				   			callback();
				   		}
	  	            }        	       	       
	           });
	           
	           // response KO
	           rqCB.on(rqCB.onerroreventkey, function (err) {
	        	   	dataload.quote = false;
					$log.error("error getting budget with code: ",budgetId,' details: ',err);
					tools_service.showConectionError($scope, "show");	                  
	           });
			}
			else{
				dataload.quote = true;	
			}
		}



		// GET DATES SERVER
		// 
		$scope.dateActualServer = new Date();

		if (typeof dateActualServer !== 'undefined'){
			if (debug)
				$log.log ('dateActualServer ',dateActualServer);
			var d =  new Date(dateActualServer)
			if (angular.isDate(d)){
				if (debug)
					console.log ('isDate ',dateActualServer);
				$scope.dateActualServer = d;
			}
		}
		if (debug)
			$log.log('dateActualServer ',$scope.dateSelectedServer);
		dataload.dateActualServer = true;
		// GET DATE SELECTED SERVER
		$scope.dateSelectedServer = new Date();
		var dateParameter = $location.search().datein;
		if (dateParameter !== undefined){
			$scope.dateSelectedServer = tools_service.dateConvert($location.search().datein);
		}

		if (debug)
			$log.log('dateSelectedServer ',$scope.dateSelectedServer);
		dataload.dateSelectedServer = true;    		
    };
    
    
    
    
    // carga inicial del producto
    var _load = function(){
    	
    	if (debug)
    		$log.log('loading data ...');
    	// trigger loading page ui
    	tools_service.showPreloader($scope, 'show');
    	// get all content
    	_getContent(function(){
		   	if (debug)
		   		$log.log('load >>>',dataload);
       		if(dataload.nationalities &&
    		   dataload.content &&
    		   dataload.product &&
			   dataload.quote &&
			   dataload.dateActualServer &&
			   dataload.dateSelectedServer
    		   ){
    		   	// get session
				recoverSession( function (){
					// init logic
					_init( function (){
						// trigger bookingcalendarCtrl init
						// disparo el evento para que cargue el calendario
						console.log("*** lanzo evento para cargar calendario");
						$scope.$broadcast('loadDataComplete');
					});
				});
			}        			
    	});
    	
    };

    //init load
    _load();

//*******************************************************************
    
    		
    /**
	 * funcion que actualiza el fee de un producto cargado para reservarlo
	 */
	 $scope.updateFeeProduct = function(){
		 console.log("Actualizar fee de prdoctco");
	 }
	 
	
	 
	 /**
	 * funcion que guarda el fee de un producto cargado para reservarlo
	 */
	 $scope.savePrice = function(fee){
		 		 
		 if(fee==null || fee <0){
			 fee=0;
		 }
		 var isQuote = ($scope.quote.code!==undefined)? true : false;
		 // *****************************************************
		 // si es una modificacion del fee de un producto cargado
		 // *****************************************************
		// if ($scope.quote === null || typeof $scope.quote === 'undefined'){
		if (!isQuote){
			 console.log('Original fee: ',$scope.local.affiliate,'fee: ',fee);
			 var newFee = Math.round(fee);
			 $scope.local.affiliate.fees.unique = newFee;
			 $scope.feeEdited = newFee;
			 console.log('New fee setted: ', $scope.feeEdited);
	
			 // seteo la fecha seleccionada			
			 $scope.newDateFee = $scope.dateSelected;			 
			 $scope.$broadcast('initCalendar');				
		 }
		 // ************************************
		 // es un cambio de fee de un tailormade
		 //*************************************
		 else{
			 console.log("****soy una booking de un tailormade");
			 console.log("***local: ",$scope.local);

			 console.log('Original fee: ',$scope.local.affiliate,'fee: ',fee);
			 var newFee = Math.round(fee);
			 var pvp = 0;
			 $scope.feeEdited = newFee;
			 console.log('New fee setted: ', $scope.feeEdited);
			   
			 // 1) actualizar el fee si es de tailormade o grupo	   	   
			 // 1.1) si es unt tailormade de un grupo, seteo el fee de grupos
			if($scope.query.group != null && $scope.query.group.adults !=null && $scope.query.group.adults >0){
				$log.log("fee antiguo de grupo: ",$scope.quote.fees.groups);
				$scope.quote.fees.groups = newFee;
				$log.log("fee redondeado de grupo: ",$scope.quote.fees.groups);
				
				// 2)calcular el pvp actual con ese fee	 
				$log.log("pvp viejo de grupo: ",$scope.quote.pvpAffiliate.exchange.value);
				pvp = Math.round($scope.quote.amount.exchange.value / (1 - ($scope.quote.fees.groups / 100)));
				$log.log("pvp nuevo de grupo: ",pvp);					
			}
			// 1.2) si es un tailormade normal, seteo su fee
			else{
				$log.log("fee antiguo de normal:  ",$scope.quote.fees.tailormade);
				$scope.quote.fees.tailormade = newFee;
				$log.log("fee redondeado de normal: ",$scope.quote.fees.tailormade);
				
				// 2)calcular el pvp actual con ese fee	 
				$log.log("pvp viejo: ",$scope.quote.pvpAffiliate.exchange.value);			
				pvp = Math.round($scope.quote.amount.exchange.value / (1 - ($scope.quote.fees.tailormade / 100)));
				$log.log("pvp nuevo (calculado sobre el pvp antigua y el fee): ",pvp);
			}

			// 2) guardar el fee 
			$scope.local.affiliate.fees = $scope.quote.fees;
			
		    // ********************************* 
			// 3) calcular el pvp por habitacion
		    // *********************************	   
			var pvpFinal = 0;
			// rooms
			if($scope.quote.rooms.single && $scope.quote.rooms.single.quantity > 0){
				$log.log("1) pvp per pax simple antiguo: ",$scope.quote.rooms.single.pvpAffiliatePerPax.exchange.value);
				$scope.quote.rooms.single.pvpAffiliatePerPax.exchange.value = Math.round($scope.quote.rooms.single.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
				pvpFinal += $scope.quote.rooms.single.pvpAffiliatePerPax.exchange.value * $scope.quote.rooms.single.quantity;
				$log.log("1) pvp per pax simple nuevo: ",$scope.quote.rooms.single.pvpAffiliatePerPax.exchange.value);		   
			}
			if($scope.quote.rooms.double && $scope.quote.rooms.double.quantity>0){
				$log.log("2) pvp per pax doble antiguo: ",$scope.quote.rooms.double.pvpAffiliatePerPax.exchange.value);
				$scope.quote.rooms.double.pvpAffiliatePerPax.exchange.value = Math.round($scope.quote.rooms.double.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
				pvpFinal += $scope.quote.rooms.double.pvpAffiliatePerPax.exchange.value * 2 * $scope.quote.rooms.double.quantity;
				$log.log("2) pvp per pax doble nuevo: ",$scope.quote.rooms.double.pvpAffiliatePerPax.exchange.value);
			}
			if($scope.quote.rooms.triple && $scope.quote.rooms.triple.quantity>0){
				$log.log("3) pvp per pax triple antiguo: ",$scope.quote.rooms.triple.pvpAffiliatePerPax.exchange.value);
				$scope.quote.rooms.triple.pvpAffiliatePerPax.exchange.value = Math.round($scope.quote.rooms.triple.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
				pvpFinal += $scope.quote.rooms.triple.pvpAffiliatePerPax.exchange.value * 3 * $scope.quote.rooms.triple.quantity;
				$log.log("3) pvp per pax triple nuevo: ",$scope.quote.rooms.triple.pvpAffiliatePerPax.exchange.value);
			}
			if($scope.quote.rooms.quad && $scope.quote.rooms.quad.quantity>0){
				$log.log("4) pvp per pax quad antiguo: ",$scope.quote.rooms.quad.pvpAffiliatePerPax.exchange.value);
				$scope.quote.rooms.quad.pvpAffiliatePerPax.exchange.value = Math.round($scope.quote.rooms.quad.amountPricePerPax.exchange.value / (1 - (newFee / 100)));
				pvpFinal += $scope.quote.rooms.quad.pvpAffiliatePerPax.exchange.value * 4 *$scope.quote.rooms.quad.quantity;
				$log.log("4) pvp per pax quad nuevo: ",$scope.quote.rooms.quad.pvpAffiliatePerPax.exchange.value);
			}
			
			// si hay ninios el pvp no esta relacionado con las habitaciones, por tanto convierto el pvp con el nuevo fee
			if($scope.quote.children != null && $scope.quote.children.length > 0){
				// pvp de child
				for(var itC = 0; itC < $scope.quote.children.length; itC++){
					$log.log("Niños) pvp per pax niño "+itC+" antiguo: ",$scope.quote.children[itC].pvpAffiliatePerPax.exchange.value);
					$scope.quote.children[itC].pvpAffiliatePerPax.exchange.value = Math.round($scope.quote.children[itC].amountPricePerPax.exchange.value / (1 - (newFee / 100)));
					pvpFinal += $scope.quote.children[itC].pvpAffiliatePerPax.exchange.value;
					$log.log("Niños) pvp per pax niño "+itC+" nuevo: ",$scope.quote.children[itC].pvpAffiliatePerPax.exchange.value);
				}			
				// pvp final
				$log.log(" pvp final niños partiendo de la suma: ", pvp);
				$scope.quote.pvpAffiliate.exchange.value = pvp;			
				$scope.local.priceAffiliate.totalPVPAgency = $scope.quote.pvpAffiliate.exchange.value;
			}
			
			// si no tiene ninios el pvp es fruto de la suma de los nuevos pvp por habitacion
			else{
				$scope.quote.pvpAffiliate.exchange.value = Math.round(pvpFinal);
				$scope.local.priceAffiliate.totalPVPAgency = $scope.quote.pvpAffiliate.exchange.value;
				$log.log("pvp Affiliado final total): ",$scope.quote.pvpAffiliate.exchange.value);
			}
			
			console.log("\n------------ fee actualziaod en pricdetails");
			$scope.priceDetail = {
					'fee': newFee,
					'feeunit': $scope.feeunit,
					'price': {
						'net' :  $scope.local.priceAffiliate.totalNetAgency,
				    	'pvp' : Math.round($scope.local.priceAffiliate.totalPVPAgency),
				    	'currency' : $scope.local.currency
					}
				};
		 }
		 		 
		
		 $scope.showbreakdown = false;
		 $scope.editFee = $scope.editFee === false ? true: false;
	 }
 
	/**
     * funcion palanca al llamarla cambia el valor de la variable llamada
     */
    $scope.toggle = function(aux) {    	
		eval("$scope." + aux + " = !$scope." + aux);
	};

	$scope.showbreakdown = false;
    $scope.togglebreakdown = function(){
    	console.log ('$scope.showbreakdown ',$scope.showbreakdown);
    	$scope.showbreakdown = $scope.showbreakdown === false ? true: false;
    }




}]);

app.controller("datePickerCtrl",
	[
	'$scope',
	'$log',
	function(
		$scope,
		$log
		)
	{

//////// init datepicker settings

	$scope.today = function() {
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		'currentText': 'hoy',
		'clearText': 'limpiar',
		'closeText': 'cerrar'
	};

	$scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

/////////// END datepicker settings 


}]);

app.directive('capitalize', function() {
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
           if(inputValue == undefined) inputValue = '';
           var capitalized = inputValue.toUpperCase();
           if(capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }         
            return capitalized;
         }
         modelCtrl.$parsers.push(capitalize);
         capitalize(scope[attrs.ngModel]);  // capitalize initial value
     }
   };
});



//*******************************************************
//controler para el popup para modificar la lista de paxes de una bookiing
//*******************************************************
// moved to /resources/public/js/angular/affiliate/affiliateBudgetCtrl.js

	
