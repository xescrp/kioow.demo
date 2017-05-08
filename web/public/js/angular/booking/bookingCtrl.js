app.controller("bookingCtrl",
	[
		'$scope',
		'$http',
		'$log',
		'$filter',
		'tools_service',
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
		'bookings_service',
        'StringUtils',
        'bookinghelpers',
		function(
			$scope,
			$http,
			$log,
			$filter,
			tools_service,
			$location,
			yto_session_service,
			yto_api,
			toaster,
			$window,
			http_service,
			$anchorScroll,
			anchorSmoothScroll,
			$timeout,
			$uibModal,
			bookings_service,
            StringUtils,
            bookinghelpers
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

			$scope.isWhiteLabel = isWhiteLabel;
            $scope.roomcodecount = {
                triple: 0,
                single: 0,
                double: 0,
                children : []
            };
            $scope.roompaxescount = {
                triple: 0,
                single: 0,
                double: 0, 
                children: [],
                total: 0
            };
            $scope.idBookingExt = '';
            $scope.agentid = '';
            $scope.meetingdata = '';
            $scope.selectedpaymentoption = 'transfer-100';
            $scope.paysplited = function () { return $scope.selectedpaymentoption == 'transfer-split'; }
            $scope.setPaymentoption = function () {
            $scope.currentfee = 0;
            $scope.budgetsave = false;
            };

            var dummyrooms = [{
                roomcode: 'double',
                paxlist: [{
                    name: 'test.name.1',
                    lastname: 'test.last.name.1',
                    birdthdate: '11/06/1978',
                    documenttype: 'dni/nif',
                    documentnumber: '443344556Y',
                    documentexpeditioncountry: 'ES',
                    country: 'ES'
                },
                    {
                        name: 'test.name.2',
                        lastname: 'test.last.name.2',
                        birdthdate: '18/05/1978',
                        documenttype: 'dni/nif',
                        documentnumber: '443322656Y',
                        documentexpeditioncountry: 'ES',
                        country: 'ES'
                    }]
            }];

            $scope.rooms = [];

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

			// diponible en el scope booking service
			$scope.bookings_service = bookings_service;
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

			// assign product var javascript to scope
			$scope.product = {};
			//
			$scope.content = {};
			//
			// unidad de comision de la agencia
			$scope.feeunit = '%';
			//
			$scope.dateNoMatch = false;
			// boolean control calendar is loaded
			$scope.initcalendar = false;

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


            $scope.newbooking = null;
            $scope.local = {
                pax: {
                    string: "",
                    number: 0,
                    double: 0,
                    triple: 0,
                    single: 0,
                    quad: 0
                },
                days: 0,
                currency: { "label": "Euro", "symbol": "�", "value": "EUR" },
                price: {
                    perperson: {
                        single: 0,
                        double: 0,
                        triple: 0,
                        quad: 0
                    },
                    perpersonOrig: {
                        single: 0,
                        double: 0,
                        triple: 0,
                        quad: 0
                    },
                    day: 0, // day price
                    total: 0, // total of booking
                    a40: 0 // fraction payment
                },
                priceAffiliate: {
                    perpersonNetAgency: {
                        single: 0,
                        double: 0,
                        triple: 0,
                        quad: 0
                    },
                    perpersonOrigNetAgency: {
                        single: 0,
                        double: 0,
                        triple: 0,
                        quad: 0
                    },
                    dayNetAgency: 0,
                    totalNetAgency: 0,
                    a40NetAgency: 0,
                    perpersonPVPAgency: {
                        single: 0,
                        double: 0,
                        triple: 0,
                        quad: 0
                    },
                    perpersonOrigPVPAgency: {
                        single: 0,
                        double: 0,
                        triple: 0,
                        quad: 0
                    },
                    dayPVPAgency: 0,
                    totalPVPAgency: 0,
                    a40PVPAgency: 0
                },
                aumontSelected: 100,
                toPay: 0,
                datePayEnd: new Date($scope.dateSelected.getFullYear(), $scope.dateSelected.getMonth(), 1),
                hasPayOptions: false,
                availability: $scope.product.availability,
                traveler: null,
                affiliate: null,
                user: null,
                firstPayPercent: 40 // set init to traveler
            };

            $scope.aceptChangeBudget = function () {
                // paso la reserva, el producto y la feca
                var url = brandPath + '/viaje/' + $scope.newbooking.products[0].slug_es + '?code=' + $scope.newbooking.products[0].code;

                var items = [url];

                var modalInstance = $uibModal
                    .open({
                        templateUrl: '/partials/modals/modal-info-budget.html.swig',
                        controller: 'aceptChangeBudgetCtrl',
                        size: '',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });

            };
       
            // escucha evento para lanzar modal
            $scope.$on('aceptChangeBudget', function (event) {
                $scope.aceptChangeBudget();

                //fill other budget data
                $scope.meetingdata = $scope.newbooking.meetingdata;
                $scope.idBookingExt = $scope.newbooking.idBookingExt;
                $scope.agentid = $scope.newbooking.agentid;
                $scope.observations = $scope.newbooking.observations != null ? $scope.newbooking.observations.observations : '';
            });


			//
			// booking holder
			//
            var settings = {
                currentcurrency: $scope.local.currency,
                product: $scope.product,
            };

            $scope.booking = bookings_service.buildNewBooking(settings);
            $scope.newbooking = bookbudget != null && bookbudget != '' ? bookbudget : null;
            bookbudget != null && bookbudget != '' ? $scope.booking.signin = $scope.newbooking.signin : null;
            $scope.newbooking != null ? $scope.$emit('aceptChangeBudget') : null;
            $scope.budget = bookbudget;
			//
			// Set Tab active in payment
			//
			$scope.tabActive = 'tpv';

			// local vars to show in layout
			

			/**
			 * inicia el iframe con el pago por tarjeta
			 */
			// SETEO variable que recibe la booking de api
			$scope.readyToPay = false;
			$scope.errorServerSave = false;
			// Default Birth Date
			$scope.defaultBirthDate = bookings_service.defaultBirthDate();





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





////////////////////////////////////////////////
///
// HELPERS Functions
////////////////////////////////////////////////
///
///
///


			var _getImage = function(url,imageSize){
				return tools_service.cloudinaryUrl(url,imageSize);
			};



////////////////////////////////////////////////
///
// BOOKING Functions
////////////////////////////////////////////////
///
///
///
            $scope.getbudget = function (callback) {
                console.log($scope.booking.start);
                $scope.booking != null && ($scope.booking.start != null &&
                        $scope.booking.start.month >= 0 &&
                        $scope.booking.start.day > 0 &&
                        $scope.booking.start.year > 0) ? getbudget(callback) : null;
            }

			/**
			 * Esta funcion carga el formulario del scope con los datos de
			 * nuestra reserva y calcula el numero de pax seleccionados
			 *
			 */
            $scope.loadBooking = function () {
                //$scope.rooms = getrooms();
                $scope.getbudget();

				$scope.local.pax = bookings_service.loadPaxs($scope.booking, $scope.local.pax);
				// si es un traveler
				($scope.load.traveler)? $scope.booking.traveler = $scope.local.traveler : null;

				// si es una agencia
				($scope.load.affiliate)? $scope.booking.affiliate = $scope.local.affiliate : null;

				//recalculo el precio de las habitaciones simples / triples por si no tuvieran precio dle dmc
				//_recalculatePriceSingleTriple();

				//recalcular el total
				//_setTotalPrices();

				//recalc side element - resumen
				document.dispatchEvent(new CustomEvent("sticky:recalc"));
			};

			/**
			 * calcula los precios totales de la reserva
			 */
			function _setTotalPrices(){

				console.log("---- _setTotalPrices INICIAL: ",$scope.local.priceAffiliate.perpersonPVPAgency);


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

						if($scope.local.aumontSelected === 100){
							$scope.booking.paymentmodel = "tpv-100";
						} else {
							$scope.booking.paymentmodel = "tpv-split";
						}

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

				$scope.booking.toConfirm = $scope.toConfirm;
				$scope.booking.amount.exchange.currency = $scope.local.currency;
				$scope.booking.netPrice.exchange.currency = $scope.local.currency;

				$scope.readyToPay = false;

			}

            $scope.setAumont = function () {
                console.log($scope.selectedpaymentoption);
				_setTotalPrices();
				document.dispatchEvent(new CustomEvent("sticky:recalc"));
			};


			/**
			 * funcion que debe de llamarse si se selecciona una habitacion simple o triple, para obtener el precio por pax
			 * de las habitaciones simples y triples en funci贸n de la logica definida por negocio
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

            function getrooms() {
                var rooms = null;
                if ($scope.rooms != null && $scope.rooms.length > 0) {
                    rooms = [];
                    _.each($scope.rooms, function (room) {
                        var nroom = {
                            name: room.roomCode,
                            roomcode: room.roomCode,
                            paxlist: []
                        };
                        
                        _.each(room.paxList, function (pax) {
                            var npax = {
                                name: pax.name,
                                lastname: pax.lastName,
                                documentnumber: pax.documentNumber,
                                documenttype: pax.documentType,
                                holder: false,
                                documentexpeditioncountry: 'ES',
                                birthdate: pax.birdthDate,
                                country: pax.country != null ? pax.country.countrycode : 'ES'
                            };
                            nroom.paxlist.push(npax);
                        });
                        rooms.push(nroom);
                    });
                }
                console.log(rooms);
                return rooms;
            }
        
        function onsavedbudget(err) {
            if (err == null) {
                toaster.pop('success', 'Presupuesto guardado correctamente.', 'Consulte mis presupuestos multidays. ' +
                    'Espere unos segundos mientras preparamos tu presupuesto para imprimir (.pdf)', 6000, 'trustedHtml');
                
                return bookinghelpers.downloadAffiliateBudget(yto_api, $scope.newbooking, $scope.product, loginsession.affiliate, $scope.local, function (result) {
                    tools_service.showPreloader($scope, 'hide');
                    //toaster.pop('success', 'Presupuesto guardado correctamente.', 'Consulte mis presupuestos multidays.' , 6000 , 'trustedHtml');
                });
            }
            else { 
                toaster.pop('error', "Error de conexi髇", "No se ha podido guardar tu reserva. Por favor intenta m醩 tarde.", 10000);
            }

        }

        $scope.setbudgettosaveandprint = function () {
            $scope.budgetsave = true;
            $scope.loadBooking();

        }

        $scope.feechanged = function (newfee) {
            console.log(newfee);
            $scope.currentfee = newfee;
            $scope.loadBooking();
            document.dispatchEvent(new CustomEvent("sticky:recalc"));
            $scope.toggle('editFee');
        }
        $scope.budgetrooms = function () {

            if ($scope.newbooking != null && $scope.newbooking.rooms != null && $scope.newbooking.rooms.length > 0) {
                console.log('adding rooms from budget...');
                
                $scope.rooms = [];
                _.each($scope.newbooking.rooms, function (room, index) {
                    var droom = {
                        numRoom: index,
                        roomCode: room.roomcode,
                        roomType: _.find(bookings_service.rooms, function (roomtype) { return room.roomcode.toLowerCase() == roomtype.roomCode.toLowerCase(); }),
                        typeRoom: _.find(bookings_service.rooms, function (roomtype) { return room.roomcode.toLowerCase() == roomtype.roomCode.toLowerCase(); }),
                        paxList: []
                    };

                    _.each(room.paxlist, function (paxslug, index) {
                        var rpax = _.find($scope.newbooking.paxes, function (bpax) {
                            return bpax.slug == paxslug;
                        });
                        if (rpax != null) {
                            var dpax = {
                                "name": rpax.name,
                                "lastName": rpax.lastname,
                                "typePax": 'adult',
                                "birdthDate": rpax.birdthdate != null ? new Date(rpax.birthdate) : bookings_service.defaultBirthDate(),
                                "country": rpax.country != null ? _findcounty(rpax.country.slug.toUpperCase()) : _findcounty('ES'),
                                "autocomplete": {
                                    "result": "",
                                    "options": {
                                        "types": '(regions)'
                                    },
                                    "details": ''
                                },
                                "documentType": rpax.documenttype,
                                "documentNumber": rpax.documentnumber,
                                "holder": index == 0 ? true : false
                            };
                            droom.paxList.push(dpax);
                        }
                    });
                    
                    $scope.rooms.push(droom);
                    console.log('a room from budget...');
                    console.log(droom);
                });

                $scope.loadBooking();
                document.dispatchEvent(new CustomEvent("sticky:recalc"));
            }
        }
        $scope.addRoom = function (code) {
            $scope.rooms = bookings_service.addRoom($scope.rooms, code);
            $scope.loadBooking();
            document.dispatchEvent(new CustomEvent("sticky:recalc"));
        }

		$scope.deleteRoom = function(index){
			$scope.rooms.splice(index, 1);
			$scope.loadBooking();
			// recalc side element - resumen
			document.dispatchEvent(new CustomEvent("sticky:recalc"));
		};

		/**
			* funcion que actualiza la habitacion (desplegable de sinple/doble/triple)
			*/
		$scope.updateTravelersRoom =  function(room,loadBooking){

			$scope.readyToPay = false;
			room = bookings_service.updateTravelersRoom(room);

			if(loadBooking){
				$scope.loadBooking();
			}

			return room;
		};


////////////////////////////////////////////////
///
// USER Events And functions
////////////////////////////////////////////////
///
///
///

			/**
			 * recupera la session del usuario logueado
			 */
			function recoverSession( callback ) {
                $scope.loggedsession = loginsession;
                $scope.local.user = loginsession.user;
                $scope.load.user = true;
                $scope.tabActive = 'tpv';
                $scope.local.affiliate = loginsession.affiliate;
                $scope.local.agencyid = loginsession.agencyid;
                $scope.local.firstPayPercent = 60;
                $scope.load.affiliate = true;
                tools_service.showPreloader($scope, 'hide');
                callback();
			}





            function getbudget(callback) {


            var bRQ = {
                    date: {
                        day: $scope.booking.start.day,
                        month: $scope.booking.start.month,
                        year: $scope.booking.start.year
                    },
                    signup: {
                        email: $scope.budgetsave ? null : $scope.booking.signin.email || loginsession.user.email,
                        username: [$scope.booking.signin.name, $scope.booking.signin.lastname].join('.') || (loginsession.affiliate != null ? loginsession.affiliate.name : loginsession.user.username),
                        phone: $scope.booking.signin.phone || 'xxxxx-xxx',
                        name: $scope.booking.signin.name || (loginsession.affiliate != null ? loginsession.affiliate.name : loginsession.user.username),
                        lastname: $scope.booking.signin.lastname || (loginsession.affiliate != null ? loginsession.affiliate.code : loginsession.user.code)
                    },
                    productcode: $scope.product.code,
                    bookingmodel: $scope.quote == null ? 'bookingb2b' : 'taylormadeb2b',
                    paymentmodel: $scope.selectedpaymentoption,
                    roomdistribution: getrooms() || dummyrooms,
                    observations: $scope.observations,
                    idBookingExt: $scope.idBookingExt,
                    agentid: $scope.agentid,
                    meetingdata: $scope.meetingdata,
                    fee: $scope.currentfee,
                    savebudget: $scope.budgetsave,
                    quote: $scope.quote != null && $scope.quote.code != '' ? $scope.quote.code : null
                };

                var rq = {
                    command: 'budget',
                    service: 'api',
                    request: {
                        bookrequest: bRQ, 
                        oncompleteeventkey: 'budget.done',
                        onerroreventkey: 'budget.error'
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    if (rsp != null) {
                        //the budget arrived..
                        console.log(rsp);
                        //actualizo el id de reserva
                        $scope.newbooking = rsp;
                        $scope.roomcodecount = $scope.roomcount();
                        $scope.paxescount();
                        console.log($scope.roomcodecount);
                        console.log($scope.roompaxescount);
                        $scope.budgetsave ? onsavedbudget() : null;
                        callback != null ? callback() : null;
                    } else {
                        //toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
                        //$log.error("Error al guardar la reseva en base de datos, con estado: " + $scope.booking.status);
                        //$scope.errorServerSave = true;
                    }

                });

                // response KO
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
                    //$scope.errorServerSave = true;
                    $log.error(err);
                    callback != null ? callback() : null;
                });

            }
            $scope.idbooking = null;
            
            //DO THE BOOKING...
            $scope.confirmBtn = function () {
                if ($scope._checkBooking()) {
                    tools_service.showPreloader($scope, 'show');
                    var bRQ = {
                        date: {
                            day: $scope.booking.start.day,
                            month: $scope.booking.start.month,
                            year: $scope.booking.start.year
                        },
                        signup: {
                            email: $scope.booking.signin.email,
                            username: [$scope.booking.signin.name, $scope.booking.signin.lastname].join('.'),
                            phone: $scope.booking.signin.phone,
                            name: $scope.booking.signin.name,
                            lastname: $scope.booking.signin.lastname
                        },
                        productcode: $scope.product.code,
                        bookingmodel: $scope.quote == null ? 'bookingb2b' : 'taylormadeb2b',
                        paymentmodel: $scope.selectedpaymentoption,
                        roomdistribution: getrooms() || dummyrooms,
                        observations: $scope.observations,
                        idBookingExt: $scope.idBookingExt,
                        agentid: $scope.agentid,
                        fee: $scope.currentfee,
                        meetingdata: $scope.meetingdata,
                        quote: $scope.quote != null && $scope.quote.code != '' ? $scope.quote.code : null
                    };

                    console.log(bRQ);
                    var url = '/booking/intent/';
                    
                    var rqCB = yto_api.post(url, bRQ);

                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        if (rsp != null) {
                            //the budget arrived..
                            tools_service.showPreloader($scope, 'hide');
                            console.log(rsp);
                            window.location = '/thankyou-transfer?bookingId=' + rsp.idBooking;
                            $scope.readyToPay = true;
                        } else {
                            tools_service.showPreloader($scope, 'hide');
                            toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
                            //$log.error("Error al guardar la reseva en base de datos, con estado: " + $scope.booking.status);
                            //$scope.errorServerSave = true;
                        }

                    });

                    // response KO
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, 'hide');
                        toaster.pop('error', "Error de conexi贸n",
                            "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
                        //$scope.errorServerSave = true;
                        $scope.readyToPay = false;
                        $log.error(err);
                        callback != null ? callback() : null;
                    });


                } else {
                    $scope.feedbackError();
                }
            };

           
////////////////////////////////////////////////
///
// HELPERS FUNCTIONS
////////////////////////////////////////////////
///
///
///
            

            $scope.roomcount = function (roomcode) {
                var count = {

                };
                if ($scope.newbooking != null &&
                    $scope.newbooking.rooms != null &&
                    $scope.newbooking.rooms.length > 0) {
                    var count = _.countBy($scope.newbooking.rooms, function (room) {
                        return room.name.toLowerCase();
                    });
                }
                return count;
            }

            $scope.paxescount = function () {
                $scope.roompaxescount.triple = $scope.doroompaxescount('triple');
                $scope.roompaxescount.double = $scope.doroompaxescount('double');
                $scope.roompaxescount.single = $scope.doroompaxescount('single');
                $scope.roompaxescount.quad = $scope.doroompaxescount('quad');
                $scope.roompaxescount.children = $scope.newbooking.children;

                $scope.roompaxescount.total = $scope.roompaxescount.triple +
                    $scope.roompaxescount.double + $scope.roompaxescount.single + $scope.roompaxescount.quad;
            }

            $scope.doroompaxescount = function (roomcode) {
                var rooms = _.filter($scope.newbooking.rooms, function (room) {
                    return room.name.toLowerCase() == roomcode.toLowerCase();
                });
                var total = 0;
                _.each(rooms, function (room) {
                    total += room.paxlist.length;
                });
                return total;
            };

			$scope.toggle = function(aux) {
				eval("$scope." + aux + " = !$scope." + aux);
			};
        
        $scope.showbreakdown = false;
        $scope.togglebreakdown = function () {
            console.log('$scope.showbreakdown ', $scope.showbreakdown);
            $scope.showbreakdown = $scope.showbreakdown === false ? true: false;
        }

			function _get_age(born, now) {
				return bookings_service.get_age(born, now)
			}

			function _findcounty(countrycode){
				return bookings_service.findcounty(countrycode);
			}

			// devuelve el nombre en spanish  del pais dado su codigo
			$scope.findCountryByCode = function(countryCode){
                var ct = bookings_service.findcounty(countryCode);
                return ct != null ? ct.name_es : null;
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
				console.log('not available',$scope.dateSelected);
			});

			/**
			 * funcion que seleccionado el dia,una vez cargado el calendario, con el dia seleccionado obtiene el precio por pax para ese dia
			 * para los tipos de habitaicones que haya introducido el dmc
			 */
			$scope.setDay = function(day){
				console.log("\n\n*** setday: ",day);

				$scope.dateNoMatch = true;
				$scope.readyToPay = false;
				var local = $scope.local;
				local.days = $scope.product.itinerary.length;

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
                $log.log('$scope.booking.start', $scope.booking.start)
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
                $log.log('$scope.booking.end', $scope.booking.end)
				// check is affiliate to get days to divide payment
				//if ($scope.local.user !== null &&
				//	$scope.local.user.isAffiliate !== undefined &&
				//	$scope.local.user.isAffiliate){
				//	$scope.restDays = _getPaymentOptionAffiliate($scope.product.dmc);
				//}
				$log.log ('restDays ',$scope.restDays);

				local.datePayEnd = new Date(day.date);
				if (debug)
					$log.log("fecha segundo pago: ",local.datePayEnd);
				local.datePayEnd.setDate(local.datePayEnd.getDate() - $scope.restDays);
				if (debug)
					$log.log("fecha segundo pago- 30 dias: ",local.datePayEnd);

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

            


			//$scope.confirmBtn = function(){
			//	if (customerDataIsValid() && $scope._checkBooking()){
			//		$scope.sendBooking();
			//	} else {
			//		$scope.feedbackError();
			//	}
			//};

			function customerDataIsValid(){
				//return StringUtils.emailIsValid($scope.booking.signin.email) && StringUtils.emailsAreEqual($scope.booking.signin.email, $scope.booking.signin.reemail);
			}

			$scope._checkBooking = function(){

				// check if data loaded
				if ($scope.load.booking){

					var bookingValid = false;
					var invoiceValid = true;
                    var insurance = true;
                    var visa = true;
					var valid = false;
					var localuser = false;
					if (debug)
						$log.log("$scope.load.affiliate _ ",$scope.load.affiliate, "\r",
							"$scope.load.traveler _ ",$scope.load.traveler, "\r");

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
                    insurance = $scope.insurance;
                    visa = $scope.visa;
                    

					if(bookingValid && invoiceValid && localuser && insurance && visa){
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

				
				if (!$scope.accomodation.$valid){
					title = 'Error en el formulario';
					errors.push('Comprueba los datos de los pasajeros.');
				}
				if (!$scope.generalconditions.$valid){
					title = 'Error en el formulario';
					errors.push('Acepta las condiciones y pol铆tica de cancelaci贸n.');
				}

                if (!$scope.visa) {
                    title = 'Error en el formulario';
                    errors.push('Debes confirmar la informaci贸n de visados.');
                }

				if (!$scope.insurance){
					title = 'Error en el formulario';
					errors.push('Debes confirmar la informaci贸n de seguros.');
                }

				if (errors.length > 0) {
					toaster.pop('error', title, errors.join('<br>'),6000 ,'trustedHtml');
				}
			};


            $scope.buildadate = function (ytodate) {
                var d = ytodate != null ? new Date(ytodate.year, ytodate.month, ytodate.day) : new Date();
                return d;
            }

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
			function _getPaymentOptionAffiliate(dmc){
				return bookings_service.getPaymentOptionAffiliate(dmc);
			}


			/**
			 * esta funcion recibe un mensaje del controlador del iframe (clientPaymentTpvRetryCtrl) el cual cambia el valor de la variable para recargar el iframe
			 */
			$scope.$on('reloadIframe', function() {
                $scope.readyToPay = false;
                setTimeout(function () {
                    $scope.readyToPay = true;
                }, 1000);
			});



			/**
			 * obtiene la url del iframe del tpv de sabadell
			 */
			$scope.getUrlTPVIframe = function (booking) {

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
					auxDate.setDate($scope.dateSelected.getDate() - _getPaymentOptionAffiliate($scope.product.dmc));
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


				//***************************************
				// 3.1) confirmar la reserva por pago tpv (NO SE USA, si se usase probar)
				//***************************************
				if ($scope._checkBooking() && ($scope.booking.payStatus[0].paymentMethod=='tpv' || $scope.tabActive=='tpv')){


					// 1) status (sin estado)
					$scope.booking.status='';

					// 2) actualizo el metodo de pago
					$scope.booking.payStatus[0].paymentMethod='tpv';
					$scope.booking.bookingmodel = "whitelabel";

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
							toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
							$log.error("Error al guardar la reseva en base de datos, con estado: "+$scope.booking.status);
							$scope.errorServerSave = true;
						}

					});

					// response KO
					rqCB.on(rqCB.onerroreventkey, function (err) {
						toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
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
										window.location = '/thankyou-transfer'+'?bookingId='+$scope.newbooking.idBooking;
									} else {
										console.log("Error al guardar el presupuesto en base de datos, con estado: "+$scope.budget.status);
										window.location = '/thankyou-transfer'+'?bookingId='+$scope.newbooking.idBooking;
									}
								});

								// response KO
								rqCB.on(rqCB.onerroreventkey, function (err) {
									console.log('ERROR en guardar el presupuesto en base de datos. Details: ',err);
									window.location = brandpath+'/thankyou-transfer'+'?bookingId='+$scope.booking.idBooking;
								});

							}
							else{
								$log.info("Guardada correctamente la reseva. IdBooking: ",$scope.booking.idBooking);
								// redirecciono a la pagina de reserva creada
								window.location = brandpath+'/thankyou-transfer'+'?bookingId='+$scope.booking.idBooking;
							}

						} else {
							toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
							$log.error("Error al guardar la reseva en base de datos, con estado: "+$scope.booking.status);
							$scope.errorServerSave = true;
						}

					});

					// response KO
					rqCB.on(rqCB.onerroreventkey, function (err) {
						toaster.pop('error', "Error de conexi贸n", "No se ha podido guardar tu reserva. Por favor intenta m谩s tarde.", 10000);
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
                
				if($scope.local.traveler){
					$scope.booking.userTraveler = angular.copy($scope.local.traveler);
				}
				else{
					$scope.booking.userAffiliate = angular.copy($scope.local.affiliate);
					$scope.booking.acceptgeneral = true;
				}

				$scope.load.booking = true;
				// ******************************************
				// 1) generar la distribucion para la reserva
				// ******************************************
                try {
                    $scope.quote == null ? $scope.addRoom() : setquotedistribution();
                    $scope.budget != null ? $scope.budgetrooms() : null;
                }
                catch (err) { console.error(err); }

                $scope.currentfee = $scope.local.affiliate != null && $scope.local.affiliate.fees != null ? $scope.local.affiliate.fees.unique || 0 : 0;
                $scope.currentfee = $scope.product != null && $scope.product.pvp != null ? $scope.product.pvp.fee : $scope.currentfee;
                $scope.currentfee = $scope.quote != null && $scope.quote.fees != null ? $scope.quote.fees.tailormade : $scope.currentfee;

				if (angular.isDate($scope.dateActualServer)){
					$scope.dateActual = $scope.dateActualServer;
				}

				if(!$scope.initcalendar && angular.isDate($scope.dateSelectedServer)){
					$scope.dateSelected = $scope.dateSelectedServer;
				}

				$scope.booking.userinvoicedata.country = bookings_service.findcounty('ES');

				if (angular.isFunction(callback)){
					callback();
				}

			}

            function addrooms(num, code) {
                for (var i = 0; i < num; i++)
                {
                    $scope.addRoom(code);
                }
            }

            function setquotedistribution() {
                $scope.quote.rooms.single.quantity > 0 ? addrooms($scope.quote.rooms.single.quantity, 'single') : null;
                $scope.quote.rooms.double.quantity > 0 ? addrooms($scope.quote.rooms.double.quantity, 'double') : null;
                $scope.quote.rooms.triple.quantity > 0 ? addrooms($scope.quote.rooms.triple.quantity, 'triple') : null;
                $scope.quote.rooms.quad.quantity > 0 ? addrooms($scope.quote.rooms.quad.quantity, 'quad') : null;
            }


////////////////////////////////////////////////
///
// LOAD Functions
////////////////////////////////////////////////
///
///
///
///

			// vars to check load complete
			var dataload = {
				content : false,
				product : false,
				dateActualServer : false,
				dateSelectedServer : false,
				nationalities : false,
				payment : false
			};
			// check load
			$scope.load = {
				user : false,
				traveler : false,
				affiliate : false,
				booking : false
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
            
            function _getQuote(callback) {
                $scope.quote = bookquote;

                $scope.product = $scope.quote.products;
                dataload.product = true;
                $scope.content.tags = $scope.product.tags;
                $scope.content.days = $scope.product.itinerary.length;
                $scope.content.countries = tools_service.showCountries($scope.product.itinerary);
                $scope.content.url = $location.protocol() + '://' + location.host + $location.path();
                $scope.content.mailimageurl = _getImage($scope.product.productimage.url, 'mainproductimagemail');
                $scope.content.mailimageurlretina = _getImage($scope.product.productimage.url, 'mainproductimageretinamail');
                $scope.product.release = (!$scope.product.release) ? 0 : $scope.product.release;
                dataload.content = true;
                $scope.dateActualServer = new Date();
                $scope.dateSelectedServer = new Date($scope.quote.operationStart.year, $scope.quote.operationStart.month, $scope.quote.operationStart.day, 0, 0, 0);
                dataload.dateSelectedServer = true;
                $scope.dateSelectedServer = $scope.dateSelectedServer;
                dataload.dateActualServer = true;
                $scope.booking.start = $scope.quote.operationStart;
                $scope.setDay({ date: $scope.dateSelectedServer.toISOString() });
                callback != null ? callback() : null;
            }

            var _getQuoteOLD = function (callback) {
                var quotecode = $location.search().quote;

                var quotequery = {
                    command: 'findone',
                    service: 'api',
                    request: {
                        query: { code: quotecode },
                        collectionname: 'Quotes',
                        populate: [{
                            path: 'dmc',
                            select: 'code name images company.name additionalinfo.description additionalinfo.description_es membership.b2bchanel membership.commission membership.b2bcommission membership.cancelpolicy._es membership.paymentoption membership.pvp currency'
                        },
                            { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }
                        ]
                    }
                };
                var rqCBProd = yto_api.send(rqprod);
                // response OK
                rqCBProd.on(rqCBProd.oncompleteeventkey, function (rsp) {
                    if (rsp != null && rsp.code != null) {
                        if (debug)
                            $log.log('quote :', rsp);
                        $scope.product = rsp.products;
                        dataload.product = true;
                        $scope.content.tags = $scope.product.tags;
                        $scope.content.days = $scope.product.itinerary.length;
                        $scope.content.countries = tools_service.showCountries($scope.product.itinerary);
                        $scope.content.url = $location.protocol() + '://' + location.host + $location.path();
                        $scope.content.mailimageurl = _getImage($scope.product.productimage.url, 'mainproductimagemail');
                        $scope.content.mailimageurlretina = _getImage($scope.product.productimage.url, 'mainproductimageretinamail');
                        $scope.quote = rsp;

                        if (debug)
                            $log.log('content', $scope.content);

                        // //MANUAL RELEASE
                        $scope.product.release = (!$scope.product.release) ? 0 : $scope.product.release;

                        if (debug)
                            $log.log('release', $scope.product.release);
                        dataload.content = true;
                        if (angular.isFunction(callback)) {
                            callback();
                        }

                    } else {
                        $log.log('error getting product')
                    }
                });

                // response KO
                rqCBProd.on(rqCBProd.onerroreventkey, function (err) {
                    dataload.product = false;
                    $log.error("error getting quote with code: ", slug, ' details: ', err);

                    tools_service.showConectionError($scope, "show");
                    if (angular.isFunction(callback)) {
                        callback();
                    }
                });


                // GET DATES SERVER
                //
                $scope.dateActualServer = new Date();

                if (typeof dateActualServer !== 'undefined') {
                    if (debug)
                        $log.log('dateActualServer ', dateActualServer);
                    var d = new Date(dateActualServer)
                    if (angular.isDate(d)) {
                        if (debug)
                            console.log('isDate ', dateActualServer);
                        $scope.dateActualServer = d;
                    }
                }
                if (debug)
                    $log.log('dateActualServer ', $scope.dateSelectedServer);
                dataload.dateActualServer = true;
                // GET DATE SELECTED SERVER
                $scope.dateSelectedServer = new Date($scope.quote.operationStart.year, $scope.quote.operationStart.month, $scope.quote.operationStart.day, 0,0,0);
                $scope.dateSelectedServer = $scope.dateSelectedServer;
                $scope.setDay({ date: $scope.dateSelectedServer.toISOString() });

                if (debug)
                    $log.log('dateSelectedServer ', $scope.dateSelectedServer);
                dataload.dateSelectedServer = true;
            }
			var _getProduct = function(callback){
				// GET PRODUCT

				//console.log ('$route.current.params', $routeParams);
				var path = $location.path();
				var slug = path.slice(path.indexOf("/booking/")+9);
				if (slug.indexOf("/") != -1){
					slug = slug.slice(0, slug.indexOf("/"));
				}

                var dataProduct = { slug: slug, currency: "EUR" };
                var programquery = bookbudget != null && bookbudget.products != null && bookbudget.products[0] != null ? { code: bookbudget.products[0].code } : { slug_es: slug };

				var rqprod = {
					command: 'findone',
					service: 'api',
					request: {
                        query: programquery,
						collectionname: 'DMCProducts',
                        populate: [{
                            path: 'dmc',
                            select: 'code buildeditinerary name images company.name additionalinfo.description additionalinfo.description_es membership.b2bchanel membership.commission membership.b2bcommission membership.cancelpolicy._es membership.paymentoption membership.pvp currency'
                        }]
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
						$scope.product.release = (!$scope.product.release) ? 0 : $scope.product.release;

						if (debug)
							$log.log('release', $scope.product.release);
						dataload.content = true;
						if (angular.isFunction(callback)){
							callback();
						}

					} else {
						$log.log('error getting product')
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
                $location.search().quote != null && $location.search().quote != '' ?
                    _getQuote(function () {
                        checkLoad();
                    }) :
                    _getProduct(function () {
                        checkLoad();
                    });
                bookings_service.loadNationalities(function () {
                    dataload.nationalities = true;
                    checkLoad();
                });

			};

            var checkLoad = function () {
                console.log(dataload);
				if(dataload.nationalities &&
					dataload.content &&
					dataload.product &&
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
			}

			//init load
			_load();



			/**
			 * funcion palanca al llamarla cambia el valor de la variable llamada
			 */
			$scope.toggle = function(aux) {
				eval("$scope." + aux + " = !$scope." + aux);
			};




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




