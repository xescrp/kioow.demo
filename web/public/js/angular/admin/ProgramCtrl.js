/**
 * @ngdoc controller
 * @name controller.DMCProductCtrl
 * @requires toaster
 * @requires $uibModal
 * @requires $location
 * @requires $cookieStore
 * @requires $cookies
 * @requires openmarket_api_service
 * @requires openmarket_file_uploader
 * @requires openmarket_session_service
 * @requires tools_service
 * @requires http_service
 * @requires $timeout
 * @requires fileReader
 * @requires $http
 * @requires $log
 * @requires $anchorScroll
 * @requires anchorSmoothScroll
 * @requires destinations_service
 * @requires productpreviewhelpers
 * @requires bookinghelpers
 *
 * @description
 * Load and modify products
 */

app.controller('EDITProgramCtrl', 
        ['$scope',
        'toaster',
        '$uibModal',
        '$location',
        '$cookieStore',
        '$cookies',
        'openmarket_file_uploader',
        'tools_service',
        'http_service',
        '$timeout',
        'fileReader',
        '$http',
        '$log',
        '$anchorScroll',
        'anchorSmoothScroll',
        'destinations_service',
        'productpreviewhelpers',
        'bookinghelpers',
        'yto_api',
        'yto_session_service',
         function ($scope,
          toaster,
          $uibModal,
          $location,
          $cookieStore,
          $cookies,
          openmarket_file_uploader,
          tools_service,
          http_service,
          $timeout,
          fileReader,
          $http,
          $log,
          $anchorScroll,
          anchorSmoothScroll,
          destinations_service,
          productpreviewhelpers,
          bookinghelpers,
         yto_api,
         yto_session_service) {

      'use strict';

           //UID
           $scope.uuids = [];

           function _generateUUID() {
               var d = new Date().getTime();
               var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                   var r = (d + Math.random() * 16) % 16 | 0;
                   d = Math.floor(d / 16);
                   return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
               });

               if ($scope.uuids.indexOf(uuid) > -1) {
                   console.log('this uuid exists...');
                   uuid = _generateUUID();
               }
               else {
                   $scope.uuids.push(uuid);
               }
               
               return uuid;
           };

            //
            $scope.load = {
              currencies : false
            }
            //
            $scope.content =  {
              currencies : []
            }
            //
            function _getCurrencies(callback) {
                var rq = {
                    command: 'getdata',
                    service: 'api',
                    request: {
                        type: 'static',
                        name: 'currencys'
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    $scope.content.currencies = rsp;
                    callback != null ? callback(rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    $log.error("error content currencies");
                    $log.error(err);
                    errorcallback != null ? errorcallback(err) : null;
                });

                return rqCB;
           }
            $scope.cities = null;
            $scope.airports = null;

            function recoverCities(callback) {
                var rq = {
                    command: 'find',
                    service: 'api',
                    request: {
                        query: { country: { $ne: null }},
                        collectionname: 'DestinationCities',
                        fields: '_id label_en label_es countrycode slug country location.latitude location.longitude',
                        populate: [{ path: 'country', select: '_id label_en label_es slug location.latitude location.longitude' }],
                        sortcondition: { label_en: 1 }
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    $scope.cities = rsp;
                    callback != null ? callback(rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    $log.error("error content currencies");
                    $log.error(err);
                    errorcallback != null ? errorcallback(err) : null;
                });

                return rqCB;
            }

            function recoverAirports(callback) {
                var rq = {
                    command: 'find',
                    service: 'api',
                    request: {
                        query: { name: { $ne: null }},
                        collectionname: 'Airports',
                        fields: '_id name city country iata latitude longitude',
                        sortcondition: { name: 1 }
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    $scope.airports = _.map(rsp, function (airp) { airp = labelairport(airp); return airp; });
                    $scope.airports = rsp;
                    callback != null ? callback(rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    $log.error("error content airports");
                    $log.error(err);
                    errorcallback != null ? errorcallback(err) : null;
                });

                return rqCB;
            }
           // INIT Vars
            recoverCities();
            recoverAirports();

            function labelairport(item) {
                item != null && item.iata != null ? item.label = "(" + item.iata.toUpperCase() + ") " + item.city + " - " + item.name : null;
                return item;
            }
          // available languages var def
          $scope.availablelanguages = [
                { language: 'spanish' },
                { language: 'english' },
                { language: 'french' },
                { language: 'german' },
                { language: 'italian' },
                { language: 'portuguese' }];
          // available hotel categories var def
          $scope.availablehotelcategory = [
                { category: '5*SUP', text: '5*SUP' },
                { category: '5*', text: '5*' },
                { category: '4*SUP', text: '4*SUP' },
                { category: '4*', text: '4*' },
                { category: '3*SUP', text: '3*SUP' },
                { category: '3*', text: '3*' },
                { category: '2*', text: '2*' },
                { category: '1*', text: '1*' },
                { category: 'unclassified *', text: 'unclassified *' }];

          $scope.changeCategoryName = false;
          
          //$scope.showPageLoad = false;

          function loadingPage (status) {
              // tools_service.showPreloader($scope, 'show');

              // $scope.bodyStyle = { 'overflow': 'hidden' };
              // $scope.showPageLoad = true;
              //break;

              // $scope.bodyStyle = { 'overflow': 'hidden' };
              // $scope.showPageLoad = true;
              // break;
              
              switch (status) {
                 case 'show':
                     tools_service.showPreloader($scope, 'show');
                     // $scope.bodyStyle = { 'overflow': 'hidden' };
                     // $scope.showPageLoad = true;
                     break;
                 default:
                    tools_service.showPreloader($scope, '');
                     // $scope.bodyStyle = {}
                     // $scope.showPageLoad = false;
              }

          }

           $scope.serverdmcproduct = {};
           $scope.included = {
               tripisprivateorgroup: ''
           };

           $scope.changeincludedtypetrip = function () {
               if ($scope.included.tripisprivateorgroup == 'private') {
                   $scope.dmcproduct.included.trip.privatetrip = true;
                   $scope.dmcproduct.included.trip.grouptrip = false;
               }
               else {
                   $scope.dmcproduct.included.trip.privatetrip = false;
                   $scope.dmcproduct.included.trip.grouptrip = true;
               }
           };

           
           $scope.hideOmtPanel = false;
           
           $scope.dmcproduct = {
               name: 'New Program' + new Date().toJSON(),
               title: '',
               title_es: '',
               languages: {
                   english: true,
                   spanish: false
               },
               productvalid: false,
               description: '',
               productimage: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
               code: '',
               dmccode: '',
               publishState: 'draft',
               adminsave: false,
               important_txt_en: '',
               important_txt_es: '',
               categoryname: null,
               // categoryname: {
               // 		label_es: 'Básica',
               //  	label_en: 'Basic'
               // },
               location: {
                   fulladdress: '',
                   city: '',
                   stateorprovince: '',
                   cp: '',
                   country: '',
                   countrycode: '',
                   continent: '',
                   latitude: 0.0,
                   longitude: 0.0,
               },
               availability: [],
               price: 0,
               included: {
                   trip: {
                       grouptrip: false,
                       privatetrip: false,
                       minpaxoperate : 2
                   },
                   arrivaltransfer: false,
                   arrivalassistance: false,
                   arrivallanguage: {
                       spanish: false,
                       english: false,
                       french: false,
                       german: false,
                       italian: false,
                       portuguese: false
                   },
                   arrivalselectedlanguage: { language: { spanish: false } },
                   departuretransfer: false,
                   departureassistance: false,
                   departurelanguage: {
                       spanish: false,
                       english: false,
                       french: false,
                       german: false,
                       italian: false,
                       portuguese: false
                   },
                   departureselectedlanguage: { language: { spanish: false } },
                   tourescort: {
                       included: false,
                       language: {
                           spanish: false,
                           english: false,
                           french: false,
                           german: false,
                           italian: false,
                           portuguese: false
                       },
                       tourescortselectedlanguage: { language: { spanish: false } },
                   },
                   driveguide: {
                       included: false,
                       language: {
                           spanish: false,
                           english: false,
                           french: false,
                           german: false,
                           italian: false,
                           portuguese: false
                       }
                   },
                   transportbetweencities: {
                       bus: false,
                       domesticflight: false,
                       train: false,
                       boat: false,
                       van: false,
                       truck: false,
                       privatecarwithdriver: false,
                       privatecarwithdriverandguide: false,
                       fourxfour: false,
                       other: false,
                       otherdescription: ''
                   },
                   taxesinthecountry: false,
                   airporttaxes: false,
                   tips: false,
                   baggagehandlingfees: false
               },
               itinerary: [
                   
               ],
               keys: [],
               tags: [],
               dmc: {},
               flightsdmc: false,
               flights: false
           };
           
           /**
            * categorias iniciales
            */
           $scope.workspaces =
           [
       			{ id: 0, dmcproduct: $scope.dmcproduct , active:true  }
           ];
           
           
           $scope.printactivity = function (activity) {
               var html = '';
               if (activity) {
                   if (activity.ticketsincluded) {
                       html += 'tickets included - ';
                   }
                   if (activity.group) {
                       html += 'in a group - ';
                   }
                   if (activity.individual) {
                       html += 'individual - ';
                   }
                   if (activity.localguide) {
                       html += 'local guide in ' + activity.language;
                   }
               }


               return html;
           }


         //****************************************************************************************
         //**************************** funcionalidad para categorias *****************************
         //****************************************************************************************
           /**
       	 * inactiva todas las categorias para activar la nueva
       	 */
           var setAllInactive = function() {
               angular.forEach($scope.workspaces, function(workspace) {
                   workspace.active = false;
               });
           };
           
        
           /**
            * funcion que crea una nueva categoria
            */
           var addNewWorkspace = function() {
        	   
        	   $scope.hideOmtPanel = true;//oculto el panel omt
        	   //si es la primera categoria que creo, guardo el producto original en la posicion cero
        	   if($scope.workspaces!=null && $scope.workspaces.length == 1){
        		   $scope.workspaces[0].dmcproduct = $scope.dmcproduct;
        	   }        	   
        	  
        	   //el id sera el siguiente al id ultimo
               var id = $scope.workspaces.length;
               id = $scope.workspaces[id-1].id;
               id +=1;               
                              
               
               // 1) copiar el producto actual
               var product = angular.copy($scope.dmcproduct);
               
               // 2) resetear el codigo para que se le asigne uno nuevo
               product.code = '';
               
               // 3) pongo el padre de este producto al padre original
               product.parent = $scope.dmcproduct.code;
               
               // 4) resetear disponibilidad
               product.availability = [];
               for(var itYear = 0; itYear < $scope.dmcproduct.availability.length; itYear++){        	
               	var avail = _fillYear($scope.dmcproduct.availability[itYear].year);        	
                   product.availability.push(avail);
               }
               
               // 5) quitar hoteles de itinerario
               for(var it=0; it < product.itinerary.length; it++){
            	   product.itinerary[it].hotel = {
            			   name: '',
                           category: '',
                           locationkind: '',
                           incity: false,
                           insurroundings: false,
                           meals: false,
                           breakfast: false,
                           lunch: false,
                           lunchdrinks: false,
                           dinner: false,
                           dinnerdrinks: false,
                           selectedcategory: { text: '5*', category: '5*' }
            	   };
               }
               
               // 6) pongo el nombre de la categoria        
               var dummyCategory = {
               		label_es: "opción"+id,
                  label_en: "option"+id
               };
               product.categoryname = dummyCategory;
               
               
               // 7) guardar en scope
               $scope.workspaces.push({
                   id: id,
                   dmcproduct: product,
                   active: true
               });
                              
               // 8) poner el producto seleccionado a el actual
               $scope.dmcproduct = product;
               
               // 9) resetear calendario
               _reset_calendar();
               buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               
               // 10) itinerario
               if ($scope.dmcproduct.itinerary) {
                   _initFormPreloadedItinerary($scope.dmcproduct.itinerary);
               }
               
               // 11) inicializar ventanas a mostrar
               
               $scope.statusVisible = false;
               $scope.StepZeroVisible = false;
               $scope.categoryEditingVisible = false;
               $scope.StepOneVisible = false;               
               $scope.releaseDaysVisible = false;
               $scope.StepThreeVisible = false;
               $scope.StepFiveVisible = false;
               $scope.StepSixVisible = false;
               $scope.StepSevenVisible = false;
               $scope.StepEightVisible = false;

               // 12) scroll to categories
                $scope.gotoId('step2startpoint', 200);
           };
           
           /**
            * funcion que se llama cuando se selecciona una categoria
            */
          $scope.selectCategory = function (categoryId, scroll) {
        	   
        	  $log.info('INIT scope.itinerario activo',$scope.dmcproduct.itinerary);
        	// si es una categoria oculto el panel de omt  
        	if(categoryId && categoryId >0){
        		$scope.hideOmtPanel = true;
        	}
        	else{
        		$scope.hideOmtPanel = false;
        	}
            // 1) seleccionar la pestana de categoria corrspondiente
            setAllInactive();
            var posCategory = 0;
            var salir = false;

            // 2) obtener la posicion de la categoria seleccionada
            for(var itCat = 0; itCat < $scope.workspaces.length && !salir; itCat++){
             if($scope.workspaces[itCat].id == categoryId){
               posCategory = itCat;
               salir = true;
             }
            }

            // 3) activar la pestana de la categoria
            $scope.workspaces[posCategory].active=true;
        	           	   
             // 4) seleccionar el producto actual
            $scope.dmcproduct = $scope.workspaces[posCategory].dmcproduct;
            $log.info('MID scope.itinerario pestaña',$scope.dmcproduct.itinerary);
            // 5) resetear calendario
            _reset_calendar();
            buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
            setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);


            // 6) comprobar si estamos creando el producto o ya estaba creado
            if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {

              // 7) mostrar los distintos menus de la creacion del programa
              if(categoryId > 0){
                $scope.statusVisible = false;
                $scope.StepZeroVisible = false;
                $scope.categoryEditingVisible = false;
                $scope.StepOneVisible = false;
                $scope.releaseDaysVisible=false;
                $scope.StepThreeVisible = false;
                $scope.StepFiveVisible = false;        		   
                $scope.StepSixVisible = false;
                $scope.StepSevenVisible = false;
                $scope.StepEightVisible = false;
              }
              else{
                $scope.statusVisible = true;
                $scope.StepZeroVisible = true;
                $scope.categoryEditingVisible = true;
                $scope.StepOneVisible = true;
                $scope.releaseDaysVisible=true;
                $scope.StepThreeVisible = true;
                $scope.StepFiveVisible = true;
                $scope.StepSixVisible = true;
                $scope.StepSevenVisible = true;
                $scope.StepEightVisible = true;
              }
             

              // 8) recargar el itinerario
              $log.info('LAST scope.itinerario',$scope.dmcproduct.itinerary);
              _initFormPreloadedItinerary($scope.dmcproduct.itinerary);

              if (scroll){
                $scope.gotoId('step2startpoint', 200);
              }             

            }
          };

          function removeproductcategoryDB(code, callback, errorcallback) {
              if (code != null && code != '') {
                  var query = {
                      code: code,
                  };
                  var req = {
                      query: query,
                      collection: 'DMCProducts',
                      enabled: true
                  };
                  tools_service.showPreloader($scope, "show");

                  var rq = {
                      command: 'erase',
                      service: 'api',
                      request: req
                  };

                  var rqCB = yto_api.send(rq);

                  rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                      toaster.pop('error', 'Category deleted', '', 10000, 'trustedHtml');

                      callback != null ? callback(rsp) : null;
                  });
                  //on response noOk
                  rqCB.on(rqCB.onerroreventkey, function (err) {
                      tools_service.showPreloader($scope, "hide");
                      console.error(err);
                      toaster.pop('error', 'Category Deletion.', err);
                      errorcallback != null ? errorcallback(err) : null;
                  });

                  return rqCB;
              }
              else { errorcallback('No category code provided, or it can not be set up.'); }
          }

           /**
            * elimina la categoria seleccionada
            */
           $scope.deleteCategory = function(categoryId){        	   
	           	// 1) compruebo que no sea la tarifa original (basic) en tal caso no se puede borrar
//        	   console.log("workespaces antes de borrar: ",$scope.workspaces.length);
//        	   console.log("showCategoriesTab: ",$scope.showCategoriesTab);
        	   
	           	if($scope.workspaces.length > 1 && categoryId > 0) {
		           		
	                // 2) rescatar la posicion de la categoria a eliminar en el vector de categorias
	                var posCategory = 0;
	                var salir = false;
	
	                //obtener la categoria seleccionada
	                for(var itCat = 0; itCat < $scope.workspaces.length && !salir; itCat++){
	                 if($scope.workspaces[itCat].id == categoryId){
	                   posCategory = itCat;
	                   salir = true;
	                 }
	                }	         	  
	                         	  
	                // 3) elimniar el producto de mongo si estuviera guardado previamente
                    if ($scope.workspaces[posCategory].dmcproduct.code != null && $scope.workspaces[posCategory].dmcproduct.code != '') {

                        removeproductcategoryDB($scope.workspaces[posCategory].dmcproduct.code,
                            function (ok) {
                                toaster.pop('error', 'Category deleted', '', 10000, 'trustedHtml');

                                // 4) eliminar el producto del scope	            	 
                                $scope.workspaces.splice(posCategory, 1);

                                //	            	console.log("workespaces antes de borrar: ",$scope.workspaces.length);
                                //	            	console.log("showCategoriesTab: ",$scope.showCategoriesTab);

                                // 5) si solo queda la categoria basica la selecciono
                                if ($scope.workspaces.length == 1) {

                                    // elimino el nombre de la categoria base, si solo hay una
                                    $scope.workspaces[0].dmcproduct.categoryname.label_es = null;
                                    $scope.workspaces[0].dmcproduct.categoryname.label_en = null;
                                    $scope.workspaces[0].dmcproduct.categoryname = null;

                                    // selecciono el producto base
                                    $scope.selectCategory(0, true);
                                    //oculatar el panel de categorias
                                    $scope.showCategoriesTab = false;
                                }
                                //si hay mas de una selecciona la segunda
                                else {
                                    $scope.selectCategory($scope.workspaces[1].id, true);
                                }

                            },
                            function (err) {
                            }
                        );
	                }
	                
                    
	           	}
	           	else{
	           		toaster.pop('error', 'There must be at least one category.', 'Your category is not deleted.');
	           	}

              $scope.gotoId('step2startpoint', 200);
           }
           
           /**
            * funcion para scope que crea una nueva categoria
            */
           $scope.addWorkspace = function () {  
               console.log('Adding a new category...');            
               setAllInactive();
               addNewWorkspace();
           };       
        
          
           /**
            * funcion que guarda la categoria creada en mongo
            */
           $scope.saveCategories = function(){        	   
       	   
        	   var ok = $scope.validateCategories();
        	   $scope.hideOmtPanel = false;

        	   if(ok){
            	   $scope.selectCategory(0, true);
            	   //guardo las categorias en mongo
                  loadingPage('show');
            	   saveAllCategories(function(result){
            		  
            		   if(result){
            			   loadingPage ();
            			   toaster.pop('success', 'Category has been saved',
                                   'All information was saved successfully', 3000);
            		   }
            		   else{
            			   toaster.pop('error', 'Categories not been saved', 'Please check all fields.', 10000, 'trustedHtml');
            			   loadingPage ();
            		   }
            	   });            	   
        	   }
           };

           $scope.validCategoryName = function(workspace){
            if (workspace.dmcproduct.categoryname.label_es != undefined && 
                workspace.dmcproduct.categoryname.label_es.length > 1 &&
                workspace.dmcproduct.categoryname.label_en != undefined && 
                workspace.dmcproduct.categoryname.label_en.length > 1){
              workspace.changeCategoryName = false;
              return false;
            }else {
              toaster.pop('error', 'Review your program', '<b>Step 2: </b>you need a valid category name', 10000, 'trustedHtml');
              workspace.changeCategoryName = true;
              return true;
            }
           };
           
           
           /**
            * funcion que valida que las nuevas categorias esten rellenadas correctamente
            */
           $scope.validateCategories = function(){
        	   
        	   
               // **********************************************************
    		   // 1) validar que esten rellenas correctamente las categorias
           	   // **********************************************************
    		      var messages = [];
              var tmpok = false;
              var validFinal = true;               
              var itCat = 1; 
               
    		        //no guardo la categoria principal, esta se guarda en publish final
               while(itCat < $scope.workspaces.length && validFinal){
        	   
            	   //setear el producto a revisar            	   
            	   $scope.dmcproduct= $scope.workspaces[itCat].dmcproduct;
	               //valid availability
	               tmpok = $scope.StepTwoValid();
	               
	               if (!tmpok) {
	                   messages.push('<b>Step 2: </b>You need to add availability to show minimum prices in category '+$scope.workspaces[itCat].dmcproduct.categoryname.label_en+'. <br>');
	               }
	               validFinal = validFinal & tmpok;
	               
	               
	               //comprobar que hay itenerario (puede ser un producto nuevo y no tener creado el itinerario aun)
	               if ($scope.workspaces[itCat].dmcproduct.itinerary && $scope.workspaces[itCat].dmcproduct.itinerary.length > 0) {	               
		               //valid hotel's itinerary
		               tmpok = $scope.StepFourValid();
		               if (!tmpok) {
		                   messages.push('<b>Step 4: </b>your itinerary is not complete in category '+$scope.workspaces[itCat].dmcproduct.categoryname.label_en+
		                       '. You must insert the Hotel Categories<br>');
		               }
		               validFinal = validFinal & tmpok;
	               }
                 // console.log ('$scope.workspaces[itCat].dmcproduct.categoryname.label_es ',$scope.workspaces[itCat].dmcproduct.categoryname.label_es);
                 if ($scope.workspaces[itCat].dmcproduct.categoryname.label_es == undefined || 
                  $scope.workspaces[itCat].dmcproduct.categoryname.label_es.length < 2
                  ){
                    messages.push('<b>Step 2: </b>you need a valid spanish category name.');
                    $scope.workspaces[itCat].changeCategoryName = true;
                    validFinal = validFinal & false;
                 }

                  if ($scope.workspaces[itCat].dmcproduct.categoryname.label_en == undefined || 
                  $scope.workspaces[itCat].dmcproduct.categoryname.label_en.length < 2){
                    messages.push('<b>Step 2: </b>you need a valid english category name.');
                    $scope.workspaces[itCat].changeCategoryName = true;
                    validFinal = validFinal & false;
                 }

	               if(validFinal){
	            	   itCat++;
	               }
               }               
               
        	
               // si todo va ok, redirigo a la categoria basica y deuvelvo ok
        	   if( validFinal){
        		    $scope.selectCategory(0);
          		  return true;
        	   }
        	   
        	   //faltan algun parametro
        	   else{
        		   $scope.selectCategory($scope.workspaces[itCat].id, true);
                   var text = messages.join('\r\n');                  
                   toaster.pop('error', 'Review your program', text, 10000, 'trustedHtml');
                   return false;
        	   }
           };
           
           /**
            * funcion que copia el programa que se le pasa como parametro en todas las categorias  de scope
            * excepto code
            * 		  parent
            *         categoryname
            *         avalibility
            *         itinerary[x].hotel
            *         para esos campos mantiene los originales
            *         
            */

           function saveAllCategories(callback){        	   
        	   // si tiene mas catergorias ademas de la basica
        	   if($scope.workspaces!=null && $scope.workspaces.length > 1){
        		           		   
        		   console.log("Total de categorias a guardar: "+($scope.workspaces.length-1));        		   
        		
        		   // Guardar estas categorias nuevas en mongo
        		   var  pending = $scope.workspaces.length;
                   var categoriesToSave = [];
                   var taskCategoriesSavePool = [];

                   _.each($scope.workspaces, function (it_workspace) {
                       console.log("** categoria a guardar: " + it_workspace.dmcproduct.categoryname.label_es + " padre: " + it_workspace.dmcproduct.parent);
                       if (it_workspace.dmcproduct.parent != null) {
                           //desactivar la categoria
                           it_workspace.active = false;

                           //*****************************************************************************************
                           //********copiar el producto principal en la categoria para estar sincronizados ***********
                           //*****************************************************************************************
                           var auxProduct = angular.copy($scope.dmcproduct);
                           delete auxProduct['_id'];
                           delete auxProduct['slug_es'];
                           delete auxProduct['slug'];
                           delete auxProduct['__v'];
                           auxProduct.code = it_workspace.dmcproduct.code;
                           auxProduct.parent = $scope.dmcproduct.code;
                           auxProduct.categoryname = it_workspace.dmcproduct.categoryname;
                           auxProduct.availability = it_workspace.dmcproduct.availability;

                           //codigo del dmc
                           if ($scope.dmcproduct.dmccode == null) {
                               auxProduct.dmccode = auxProduct.dmc.code;
                           }
                           else {
                               auxProduct.dmccode = $scope.dmcproduct.dmccode;
                           }

                           //copiar los hoteles del itinearario de la categoria (el itinerario estara sincronizado en scope)
                           for (var itH = 0; itH < auxProduct.itinerary.length; itH++) {
                               auxProduct.itinerary[itH].hotel = it_workspace.dmcproduct.itinerary[itH].hotel;
                           }

                           it_workspace.dmcproduct = auxProduct;
                           //*****************************************************************************


                           categoriesToSave.push(it_workspace.dmcproduct);
                           pending--;

                           taskCategoriesSavePool.push(async.apply(function (workspace, waterfallcallback) {
                               console.log('About to save... ' + workspace.dmcproduct.code);
                               var prquery = workspace.dmcproduct.code != null && workspace.dmcproduct.code != '' ? { code: workspace.dmcproduct.code } : null;
                               workspace.dmcproduct != null ? delete workspace.dmcproduct['__v'] : null;
                               workspace.dmcproduct = pushcitiesandcountries(workspace.dmcproduct);
                               var rq = {
                                   command: 'save',
                                   service: 'api',
                                   request: {
                                       data: workspace.dmcproduct,
                                       collectionname: 'DMCProducts',
                                       populate: [
                                           { path: 'dmc', populate: [{ path: 'user', model: 'Users' }] },
                                           { path: 'sleepcountry' },
                                           { path: 'departurecountry' },
                                           { path: 'stopcountry' },
                                           { path: 'sleepcity' },
                                           { path: 'departurecity' },
                                           { path: 'stopcities' }],
                                       query: prquery
                                   }
                               };

                               var rqCB = yto_api.send(rq);

                               rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                                   console.log('Saved .. ' + workspace.dmcproduct._id);
                                   workspace.dmcproduct = rsp;
                                   toaster.pop(
                                       'success',
                                       'Category saved',
                                       'Category ' + rsp.categoryname.label_es + ' were saved properly',
                                       10000,
                                       'trustedHtml');
                                   waterfallcallback != null && typeof (waterfallcallback) === 'function' ? waterfallcallback(null, workspace.dmcproduct) : null;
                               });
                               //on response noOk
                               rqCB.on(rqCB.onerroreventkey, function (err) {
                                   console.error('Error saving .. ' + workspace.dmcproduct._id);
                                   console.error("error saving product");
                                   console.error(err);
                                   toaster.pop(
                                       'error',
                                       'Category ' + workspace.dmcproduct.categoryname.label_es + ' not saved properly! please review program',
                                       err,
                                       10000,
                                       'trustedHtml');
                                   waterfallcallback != null && typeof (waterfallcallback) === 'function' ? waterfallcallback(err, workspace.dmcproduct) : null;
                               });

                           }, it_workspace));

                       }
                   });


                   async.series(taskCategoriesSavePool, function (err, results) {
                       err != null ?
                           toaster.pop(
                               'error',
                               'Error saving categories',
                               err,
                               10000,
                               'trustedHtml') :
                           toaster.pop(
                               'success',
                               'Categories saved',
                               'Categories were saved properly',
                               10000,
                               'trustedHtml');
                       console.log('finished save all categories...');
                       tools_service.showPreloader($scope, 'hide');   
                       callback(err);
                   });

        	   }
        	   else{
        		   callback(null);
        	   }
            // loadingPage()
           }
           

           /**
            * funcion que resetea la disponibilidad de un ano un producto, al crear una copia para una categoria nueva
            */
           function _fillYear(year) {
               var avail = {
                   name: year,
                   publishedDate: new Date(),
                   year: year,
                   January: {
                       availability: [{
                               date: new Date(year, 0, 1),
                               available: false,
                               rooms: {
                                   single: {
                                       price: 0
                                   },
                                   double: {
                                       price: 0
                                   },
                                   triple: {
                                       price: 0
                                   },
                                   other: {
                                       price: 0
                                   },
                                   currency: '€ Euro'
                               }
                       }]
                   },
                   February: {
                       availability: [{
                           date: new Date(year, 1, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   March: {
                       availability: [{
                           date: new Date(year, 2, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   April: {
                       availability: [{
                           date: new Date(year, 3, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   May: {
                       availability:  [{
                               date: new Date(year, 4, 1),
                               available: false,
                               rooms: {
                                   single: {
                                       price: 0
                                   },
                                   double: {
                                       price: 0
                                   },
                                   triple: {
                                       price: 0
                                   },
                                   other: {
                                       price: 0
                                   },
                                   currency: '€ Euro'
                               }
                       }]
                   },
                   June: {
                       availability: [{
                           date: new Date(year, 5, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   July: {
                       availability: [{
                           date: new Date(year, 6, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   August: {
                       availability: [{
                           date: new Date(year, 7, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   September: {
                       availability:  [{
                               date: new Date(year, 8, 1),
                               available: false,
                               rooms: {
                                   single: {
                                       price: 0
                                   },
                                   double: {
                                       price: 0
                                   },
                                   triple: {
                                       price: 0
                                   },
                                   other: {
                                       price: 0
                                   },
                                   currency: '€ Euro'
                               }
                       }]
                   },
                   October: {
                       availability: [{
                           date: new Date(year, 9, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   November: {
                       availability: [{
                           date: new Date(year, 10, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   },
                   December: {
                       availability: [{
                           date: new Date(year, 11, 1),
                           available: false,
                           rooms: {
                               single: {
                                   price: 0
                               },
                               double: {
                                   price: 0
                               },
                               triple: {
                                   price: 0
                               },
                               other: {
                                   price: 0
                               },
                               currency: '€ Euro'
                           }
                       }]
                   }
               }
               return avail;
           }

       $scope.gotoId = function(eID, delay) {
            if(typeof delay == 'number'){
              $timeout(function() {
                  $scope.gotoElement(eID)
              }, delay);
            } else {
              $timeout(function() {
                  $scope.gotoElement(eID)
              }, 150);
            }
            
        }


        $scope.gotoElement = function(eID) {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            //$log.log("hash : "+eID);
            $location.hash(eID);

            // call $anchorScroll()
            anchorSmoothScroll.scrollTo(eID);

        };

        $scope.showCategoriesTab = false;

        $scope.goAndAddNewCategory = function(){

          var rs = validateAll();

          if (rs.result) {
            $scope.dmcproduct.categoryname = {
              label_es: 'Básica',
              label_en: 'Basic'
            };
            _save(null);
            $scope.gotoId('step2startpoint',100);
            $scope.showCategoriesTab = true;
          } else {
              var text = rs.messages.join('\r\n');
              toaster.pop('error', 'Please, first finish your tour', text, 5000, 'trustedHtml');
          }
          
         };
           
          
           //************************************************************************************************
           //************************************************************************************************
           //************************************************************************************************



           $scope.selectedday = new Date();

           /**
            * abre un modal para editar el precio de la habitacino
            */
           $scope.opencalendar = function (day) {

               
               $scope.selectedday = day;

               var modalInstance = $uibModal.open({
                   templateUrl: 'myModalContent.html',
                   controller: ModalInstanceCtrl,
                   size: '',
                   resolve: {
                    stuff: function () {
                       return {theday: $scope.selectedday, currencies : $scope.dmcproduct.dmc.currency, commission : $scope.dmcproduct.dmc.membership.b2bcommission}
                    }
                   }
               });
               modalInstance.opened.then(function () {
                  // console.log('modal abierto...');
                   //$('.modal').show();
               });
               modalInstance.result.then(function (selectionrange) {
                   
                   buildAvailabilityRange(selectionrange);
                   //_buildAvailabilityRanges(selectionrange);
                   _reset_calendar();
                   buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                   setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
                   //_setAvailInCalendar(
                   //     $scope.selectnewmonth.year,
                   //     $scope.selectnewmonth.monthindex);
               }, function () {
                   //$log.info('Modal dismissed at: ' + new Date());
               });
           }

           var ModalInstanceCtrl = function ($scope, $uibModalInstance, stuff) {
               
               //$scope.items = items;
               //console.log(stuff.theday);
               $scope.isTranslateEs = function(){
                  var transActive = $cookies.googtrans;
                  console.log('transActive', transActive)
                  if (transActive != undefined && transActive != null){
                     return true 
                  }else {
                    return false
                  }
                };
               //console.log(stuff.currencies);
               $scope.commission = stuff.commission;
               var today = stuff.theday.date;
               var fulldatefrom = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
               var fulldateto = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + (new Date().getDate() + 1);

               var _max = new Date(today.getFullYear() + 2, 11, 31);
               var maxstring = _max.getFullYear() + "-" + _max.getMonth() + "-" + _max.getDate();
               var _min = new Date(today.getFullYear(), today.getMonth(), 1);
               var minstring = _min.getFullYear() + "-" + _min.getMonth() + "-" + _min.getDate();

               function MarkDayOfWeek(dayindex) {
                   if (dayindex == 0) {
                       $scope.modifier.sunday = true;
                       return 'sunday';
                   }
                   if (dayindex == 1) {
                       $scope.modifier.monday = true;
                       return 'monday';
                   }
                   if (dayindex == 2) {
                       $scope.modifier.tuesday = true;
                       return 'tuesday';
                   }
                   if (dayindex == 3) {
                       $scope.modifier.wednesday = true;
                       return 'wednesday';
                   }
                   if (dayindex == 4) {
                       $scope.modifier.thursday = true;
                       return 'thursday';
                   }
                   if (dayindex == 5) {
                       $scope.modifier.friday = true;
                       return 'friday';
                   }
                   if (dayindex == 6) {
                       $scope.modifier.saturday = true;
                       return 'saturday';
                   }

               }
               $scope.currencies = stuff.currencies;
               $scope.openedfrom = false;
               $scope.openedto = false;
               $scope.openfrom = function ($event) {
                   $event.preventDefault();
                   $event.stopPropagation();

                   $scope.openedfrom = true;
               };

               $scope.opento = function ($event) {
                   $event.preventDefault();
                   $event.stopPropagation();

                   $scope.openedto = true;
               };

               $scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
               $scope.format = $scope.formats[0];

               $scope.dateOptions = {
                   formatYear: 'yyyy',
                   startingDay: 1
               };

               $scope.modifier = {
                   from: new Date(stuff.theday.date.getFullYear(), stuff.theday.date.getMonth(), stuff.theday.date.getDate()),
                   to: new Date(stuff.theday.date.getFullYear(), stuff.theday.date.getMonth(), stuff.theday.date.getDate()),
                   min: _min,
                   max: _max,
                   available: stuff.theday.available,
                   rooms: {
                       single: { price: stuff.theday.rooms.single.price },
                       double: { price: stuff.theday.rooms.double.price },
                       triple: { price: stuff.theday.rooms.triple.price },
                       currency: '€ euro'
                   },
                   monday: false,
                   tuesday: false,
                   wednesday: false,
                   thursday: false,
                   friday: false,
                   saturday: false,
                   sunday: false,
                   morerooms: false
               };
               $scope.showmorerooms = function () {
                   $scope.modifier.morerooms = true;
               };
               $scope.allchecked = {
                   checked: false
               };

               function checkall() {
                   return ($scope.modifier.monday &
                       $scope.modifier.tuesday &
                       $scope.modifier.wednesday &
                       $scope.modifier.thursday &
                       $scope.modifier.friday &
                       $scope.modifier.saturday &
                       $scope.modifier.sunday);
               }

               $scope.onechanged = function () {
                   if (checkall()) { $scope.allchecked.checked = true; }
                   else {
                       $scope.allchecked.checked = false;
                   }  
               };

               $scope.allchanged = function () {
                   if ($scope.allchecked.checked) {
                       $scope.modifier.monday = true;
                       $scope.modifier.tuesday = true;
                       $scope.modifier.wednesday = true;
                       $scope.modifier.thursday = true;
                       $scope.modifier.friday = true;
                       $scope.modifier.saturday = true;
                       $scope.modifier.sunday = true;
                   }
                   else {
                       $scope.modifier.monday = false;
                       $scope.modifier.tuesday = false;
                       $scope.modifier.wednesday = false;
                       $scope.modifier.thursday = false;
                       $scope.modifier.friday = false;
                       $scope.modifier.saturday = false;
                       $scope.modifier.sunday = false;
                   }
               }



               $scope.btnavail = { active: false, disabled: true };
               $scope.btnnotavail = { active: true, disabled: false };
               $scope.priceclass = '';
               //buttons available
               $scope.setavailable = function () {
                   $scope.modifier.available = true;
                   //buttons
                   $scope.btnavail.active = true;
                   $scope.btnavail.disabled = false;

                   $scope.btnnotavail.active = false;
                   $scope.btnnotavail.disabled = true;

               };

               $scope.setnotavailable = function () {
                   $scope.modifier.available = false;

                   //buttons
                   $scope.btnavail.active = false;
                   $scope.btnavail.disabled = true;

                   $scope.btnnotavail.active = true;
                   $scope.btnnotavail.disabled = false;
               };


               $scope.modifyAvailability = function () {
                   var today = new Date();
                   if ($scope.modifier.from > $scope.calendar.modifier.to) {
                       throw 'The start date must be previous to the end date';
                   }

                   if ($scope.modifier.from < today) {
                       throw 'The start date cannot be previous to the current day';
                   }

                   var start = $scope.modifier.from;
                   var end = $scope.modifier.to;
                   var iterator = start;
                   while (iterator <= end) {

                   }
               };

               function isNumber(n) {
                   return !isNaN(parseFloat(n)) && isFinite(n);
               }

               $scope.ok = function () {
                   var info = $scope.modifier;
                   info.from = new Date($scope.modifier.from);
                   info.to = new Date($scope.modifier.to);

                   if ($scope.modifier.from > $scope.modifier.to) {
                       toaster.pop('error', 'Review your dates',
                           'The start date must be lower than the end date');
                       throw 'The start date must be lower than the end date';
                   }
                   if ($scope.modifier.available) {
                       if ($scope.modifier.rooms.double.price == '' ||
                           $scope.modifier.rooms.double.price == 0 ||
                           isNumber($scope.modifier.rooms.double.price) == false) {
                           toaster.pop('error', 'Review your prices',
                           'You must set a price for your rooms, and it must be a number');

                           throw 'You must set a price for your rooms';
                       }
                       if ($scope.modifier.rooms.currency == null || $scope.modifier.rooms.currency == '') {
                           toaster.pop('error', 'Review your prices',
                           'You must set a currency for the price');

                           throw 'You must set a currency for the price';
                       }
                   }
                   
                   $uibModalInstance.close(info);
               };

               $scope.cancel = function () {
                   $uibModalInstance.dismiss('cancel');
               };

               MarkDayOfWeek(today.getDay());
               $scope.btnavail.active = stuff.theday.available;
               $scope.btnavail.disabled = !$scope.btnavail.active;
               $scope.btnnotavail.active = !$scope.btnavail.active;
               $scope.btnnotavail.disabled = !$scope.btnnotavail.active;
               
           };

           

           $scope.calendar = {
               currentmonth: '',
               currentmonthnumber: 0,
               firstdaymonth: new Date(),
               today: new Date(),
               firstweek: {
                   monday: {
                       name: 'monday',
                       index: 1,
                       number: 1,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   tuesday: {
                       name: 'tuesday',
                       index: 2,
                       number: 2,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   wednesday: {
                       name: 'wednesday',
                       index: 3,
                       number: 3,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   thursday: {
                       name: 'thursday',
                       index: 4,
                       number: 4,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   friday: {
                       name: 'friday',
                       index: 5,
                       number: 5,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   saturday: {
                       name: 'saturday',
                       index: 6,
                       number: 6,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   sunday: {
                       name: 'sunday',
                       index: 7,
                       number: 7,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               },
               secondweek: {
                   monday: {
                       name: 'monday',
                       index: 1,
                       number: 8,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   tuesday: {
                       name: 'tuesday',
                       index: 2,
                       number: 9,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   wednesday: {
                       name: 'wednesday',
                       index: 3,
                       number: 10,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   thursday: {
                       name: 'thursday',
                       index: 4,
                       number: 11,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   friday: {
                       name: 'friday',
                       index: 5,
                       number: 12,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   saturday: {
                       name: 'saturday',
                       index: 6,
                       number: 13,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   sunday: {
                       name: 'sunday',
                       index: 7,
                       number: 14,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               },
               thirdweek: {
                   monday: {
                       name: 'monday',
                       index: 1,
                       number: 15,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   tuesday: {
                       name: 'tuesday',
                       index: 2,
                       number: 16,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   wednesday: {
                       name: 'wednesday',
                       index: 3,
                       number: 17,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   thursday: {
                       name: 'thursday',
                       index: 4,
                       number: 18,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   friday: {
                       name: 'friday',
                       index: 5,
                       number: 19,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   saturday: {
                       name: 'saturday',
                       index: 6,
                       number: 20,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   sunday: {
                       name: 'sunday',
                       index: 7,
                       number: 21,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               },
               fourthweek: {
                   monday: {
                       name: 'monday',
                       index: 1,
                       number: 22,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   tuesday: {
                       name: 'tuesday',
                       index: 2,
                       number: 23,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   wednesday: {
                       name: 'wednesday',
                       index: 3,
                       number: 24,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   thursday: {
                       name: 'thursday',
                       index: 4,
                       number: 25,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   friday: {
                       name: 'friday',
                       index: 5,
                       number: 26,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   saturday: {
                       name: 'saturday',
                       index: 6,
                       number: 27,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   sunday: {
                       name: 'sunday',
                       index: 7,
                       number: 29,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               },
               fifthweek: {
                   monday: {
                       name: 'monday',
                       index: 1,
                       number: 30,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   tuesday: {
                       name: 'tuesday',
                       index: 2,
                       number: 31,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   wednesday: {
                       name: 'wednesday',
                       index: 3,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   thursday: {
                       name: 'thursday',
                       index: 4,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   friday: {
                       name: 'friday',
                       index: 5,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   saturday: {
                       name: 'saturday',
                       index: 6,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   sunday: {
                       name: 'sunday',
                       index: 7,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               },
               sixthweek: {
                   monday: {
                       name: 'monday',
                       index: 1,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   tuesday: {
                       name: 'tuesday',
                       index: 2,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   wednesday: {
                       name: 'wednesday',
                       index: 3,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   thursday: {
                       name: 'thursday',
                       index: 4,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   friday: {
                       name: 'friday',
                       index: 5,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   saturday: {
                       name: 'saturday',
                       index: 6,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   },
                   sunday: {
                       name: 'sunday',
                       index: 7,
                       number: 0,
                       date: null,
                       available: false,
                       rooms: {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               },
               getMonthNameSpanish: _getMonthNameSpanish,
               getMonthNameEnglish: _getMonthNameEnglish,
               getDayOfWeek: _getDayOfWeek
           }



           $scope.shownextday = false;
           $scope.showmainimage = false;
           $scope.itinerarydays = 0;
           $scope.changehotelkind = function (itinerary) {
               if (itinerary.hotel.locationkind === 'hotelcity') {
                   itinerary.hotel.incity = true;
                   itinerary.hotel.insurroundings = false;
               }
               else {
                   itinerary.hotel.incity = false;
                   itinerary.hotel.insurroundings = true;
               }
           }

           $scope.old_changehotelkind = function (uuid) {
               if ($scope.dmcproduct.itinerary != null &&
                   $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       if ($scope.dmcproduct.itinerary[i].uuid = uuid) {
                           if ($scope.dmcproduct.itinerary[i].hotel.locationkind == 'hotelcity') {
                               $scope.dmcproduct.itinerary[i].hotel.incity = true;
                               $scope.dmcproduct.itinerary[i].hotel.insurroundings = false;
                               break;
                           }
                           else {
                               $scope.dmcproduct.itinerary[i].hotel.incity = false;
                               $scope.dmcproduct.itinerary[i].hotel.insurroundings = true;
                           }
                       }
                   }
               }
           }
           $scope.istherealastday = function () {
               var exist = false;
               if ($scope.dmcproduct.itinerary != null &&
                  $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       if ($scope.dmcproduct.itinerary[i].lastday) {
                           exist = true;
                       }
                   }
               }
               return exist;
           };


           /**
            *  solo esta activo el check de last day, si es el ultimo dia del itinarario
            */
           $scope.checkdisabled = function (itinerary) {        	
               var dis = true;
               if (itinerary.lastday) {            	   
                   dis = false;
               }
               if (itinerary.daynumber == $scope.dmcproduct.itinerary.length) {            	  
                   dis = false;
               }
               return dis;
           };
           
           /**
            * al clickar lastday elimino el sleepcity del ultimo dia, si esta setado a true
            */
           $scope.deleteLastDay = function (itinerary) {        	 
        	         	  
        	   // si es ultimo dia borro la sleepcity y hotel 
        	   if (itinerary.lastday) {
        		   $log.log("borro el útlimo dia, lo inicializo");
        		   //si no es el ultimo dia borro la categoria y nombre de hotel por si tuviera algo guardado
        		   itinerary.hotel.category ='';
            	 itinerary.hotel.name ='';    
        		   itinerary.hotel.locationkind='';
        		   itinerary.hotel.incity= false;
        		   itinerary.hotel.insurroundings= false;
        		   itinerary.hotel.meals= false;
        		   itinerary.hotel.breakfast= false;
        		   itinerary.hotel.lunch= false;
        		   itinerary.hotel.dinnerdrinks= false;
        		   itinerary.hotel.dinner = false;
        		   itinerary.hotel.lunchdrinks= false;
        		   itinerary.description_en =  '';
        		   itinerary.description_es =  '';
        		   itinerary.activities = [];
               itinerary.flights = [];

        		   var sleepcityAux = {
                       city: '',
                       citybehaviour: '',
                       order: 2,
                       country: '',
                       location: {
                           fulladdress: '',
                           city: '',
                           stateorprovince: '',
                           cp: '',
                           country: '',
                           countrycode: '',
                           continent: '',
                           latitude: 0,
                           longitude: 0,
                       }
                   };        		   
        		   itinerary.sleepcity = sleepcityAux;
        		   console.log("dia modificado: ", itinerary);
        	   }

        	   
        	   
        	   // *************************************************
               // actualizar las categorias con el nuevo itinerario
        	   // *************************************************
        	   if($scope.workspaces!=null && $scope.workspaces.length > 1){
	        	   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
	                   if ($scope.dmcproduct.itinerary[i].uuid == itinerary.uuid) {
	                	   console.log("posicion del itinerario: ", i);
                    	   //recorrerlas todas y eliminar el dia
                    	   angular.forEach($scope.workspaces, function(workspace) {                    		 
                               workspace.dmcproduct.itinerary.splice(i, 1,itinerary);                             
                           });                    	  
                    	   break;
                       }                       
                   }
               }        	   
           }
           
           
           /**
            * Reordena los días y asigna la sleepcity del día siguiente
            * al departure del anterior al borrado
            *  
            */
           function _rearrange_days() {
              if ($scope.dmcproduct.itinerary != null && 
                 $scope.dmcproduct.itinerary.length) {

                function fixSleepAndDeparture(itinerary){
                  for (var i = 0; i < itinerary.length; i++) {
                     itinerary[i].daynumber = i + 1;
                     if (i > 0) {
                         if(itinerary[i - 1] != null && 
                             itinerary[i - 1].sleepcity) {

                             itinerary[i].departurecity =
                                 itinerary[i - 1].sleepcity;
                         }
                     }

                     if (itinerary[i].uuid === null || itinerary[i].uuid === '') {
                         itinerary[i].uuid = _generateUUID();
                         console.log('uuid regenerado...');
                     }
                  }
                }
                  
                fixSleepAndDeparture($scope.dmcproduct.itinerary);

                if($scope.workspaces!=null && $scope.workspaces.length > 1){
                    for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
                         fixSleepAndDeparture($scope.workspaces[itWork].dmcproduct.itinerary);
                    };
                }


               }
           }

      
           /** 
            * funcion que anade un dia al itenerario
            */
           $scope.additineraryday = function (from) {
               
               if ($scope.dmcproduct.itinerary == null) {
                   $scope.dmcproduct.itinerary = [];
               }

               var validflights = function(itineraryitem){
                var valid = true;
                if (itineraryitem.needflights){
                  for (var i = 0; i < itineraryitem.flights.length; i++) {
                    if (valid && itineraryitem.flights[i].departure != "" &&
                      itineraryitem.flights[i].departure != null){
                      valid = true;
                    } else {
                      valid = false;
                    }
                    if (valid && itineraryitem.flights[i].arrival != "" &&
                      itineraryitem.flights[i].arrival != null){
                      valid = true;
                    } else {
                      valid = false;
                    }
                  };
                }
                return valid
               }

               // si no es el primer dia
               var daynumber = $scope.dmcproduct.itinerary.length + 1;
               if (from != null) {
            	   
                   if (from.sleepcity.city != null && from.sleepcity.city != '' &&
                       from.hotel.category != '' && validflights(from)) {
                       daynumber = from.daynumber + 1;

                       var itinerary = _additineraryday(daynumber, true, from);
                       if (from != null) {
                           $scope.dmcproduct.itinerary.splice(daynumber - 1, 0, itinerary);
                           
                           //anadir el dia del itinerario al resto de categorias si existieran( revisado 04/04/2016)                           
                           if($scope.workspaces!=null && $scope.workspaces.length > 1){
                        	                           	   
                        	   //anadir el dia a las categorias (copia del dia)
                        	   for(var itC = 1; itC < $scope.workspaces.length; itC ++){
                        		   $scope.workspaces[itC].dmcproduct.itinerary.splice(daynumber - 1, 0, _additineraryday(daynumber, true, from));
                        	   }
                        	   
                           }          
                       } else {
                           $scope.dmcproduct.itinerary.push(itinerary);
                           
                           //anadir el dia a las categorias (copia del dia)
                    	   for(var itC = 1; itC < $scope.workspaces.length; itC ++){
                    		   $scope.workspaces[itC].dmcproduct.itinerary.push(_additineraryday(daynumber, true, from));
                    	   }     
                       }
                       
                       // reordeno los dias (producto principal y categorias si tuviera)(revisado 04/04/2016)
                       _rearrange_days();
                   }
                   else {

                       toaster.pop('error', 'Add day to the itinerary', 'You must set the sleeping place and the hotel category' +
                           ' on the previous day');
                       if (!validflights(from)){
                        toaster.pop('error', 'Add day to the itinerary', 'You must set the domestic flights');
                       }
                   }
               } 
               else {
            	   
                   var itinerary = _additineraryday(daynumber, true, null);
                   $scope.dmcproduct.itinerary.push(itinerary);
                   
                   
                   //anadir el dia del itinerario al resto de categorias si existieran (revisado 04/04/2016)
                   if($scope.workspaces!=null && $scope.workspaces.length > 1){
                	   //anadir el dia a las categorias (copia del dia)
                	   for(var itC = 1; itC < $scope.workspaces.length; itC ++){
                		   $scope.workspaces[itC].dmcproduct.itinerary.push(_additineraryday(daynumber, true, from));
                	   }
                   }
                   
                   // reordeno los dias (producto principal y categorias si tuviera) (revisado 04/04/2016)
                   _rearrange_days();
               }
               
               
               //****************
               for(var it=0; it < $scope.workspaces.length; it ++){
            	   console.log("****categoria ",it,': ',$scope.workspaces[it].dmcproduct.itinerary);
               }
           }

         
           
           function _additineraryday(daynumber, isnotlast, before) {
               var itinerary = {
                   uuid: _generateUUID(),
                   isnotlastday: isnotlast,
                   lastday: !isnotlast,
                   name: new Date().getDay() + new Date().getMonth(),
                   daynumber: daynumber,
                   date: new Date(),
                   image: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
                   imageprogress: false,
                   showimage: false,
                   departurecity: {
                       city: '',
                       citybehaviour: '',
                       order: 1,
                       country: '',
                       location: {
                           fulladdress: '',
                           city: '',
                           stateorprovince: '',
                           cp: '',
                           country: '',
                           countrycode: '',
                           continent: '',
                           latitude: 0,
                           longitude: 0,
                       }
                   },
                   sleepcity: {
                       city: '',
                       citybehaviour: '',
                       order: 2,
                       country: '',
                       location: {
                           fulladdress: '',
                           city: '',
                           stateorprovince: '',
                           cp: '',
                           country: '',
                           countrycode: '',
                           continent: '',
                           latitude: 0,
                           longitude: 0,
                       },
                   },
                   stopcities: [],
                   needflights: false,
                   flights: [],
                   hotel: {
                       name: '',
                       category: '',
                       locationkind: '',
                       incity: false,
                       insurroundings: false,
                       meals: false,
                       breakfast: false,
                       lunch: false,
                       lunchdrinks: false,
                       dinner: false,
                       dinnerdrinks: false,
                       selectedcategory: { text: '5*', category: '5*' }
                   },
                   description_en: '',
                   description_es: '',
                   activities: [],
                   citytoadd: {
                       city: '',
                       citybehaviour: 'departure',
                       order: '',
                       country: '',
                       location: {
                           fulladdress: '',
                           city: '',
                           stateorprovince: '',
                           cp: '',
                           country: '',
                           countrycode: '',
                           continent: '',
                           latitude: 0,
                           longitude: 0,
                       }
                   }
               };
               $log.log ('itinerary.departurecity.city.citybehaviour ',itinerary.departurecity.city.citybehaviour);
               $log.log ('itinerary ',itinerary);

               if (before != null) {
                   itinerary.departurecity.city = before.sleepcity.city;
                   itinerary.departurecity.citybehaviour = 'departure';
                   itinerary.departurecity.country = before.sleepcity.country;
                   itinerary.departurecity.location = before.sleepcity.location;
                   itinerary.departurecity.order = 1;
               }
               
               return itinerary;
           }


          /**
           * Old Auto complete google places
           */

           function resetautocomplete() {
            angular.element(document.querySelector('.select-city')).val('');
           }
           /**
            * New destinations autocomplete
            */

           $scope.adddeparturetoitinerary = function (uuid) {
               for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                   if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                       $scope.dmcproduct.itinerary[i].departurecity.city = $scope.dmcproduct.itinerary[i].citytoadd.city;
                       $scope.dmcproduct.itinerary[i].departurecity.citybehaviour = 'departure';
                       $scope.dmcproduct.itinerary[i].departurecity.order = 1;
                       $scope.dmcproduct.itinerary[i].departurecity.country = '';
                       break;
                   }
                   resetautocomplete();
               }
           }

           $scope.destinations = function(){
              return destinations_service.productcountriesnorm_en;
           };
           /**
            * funcion que anade una ciudad para dormir mas al itinerario
            */
           function parseCity(thecity) {
               var city = {
                   city: thecity.label_es || thecity.label_en,
                   cityid: thecity._id,
                   country: thecity.country.label_es,
                   countrycode: thecity.country.slug,
                   countryid: thecity.country._id,
                   fulladdress: thecity.label_es + ', ' + thecity.country.label_es,
                   latitude: thecity.location.latitude,
                   longitude: thecity.location.longitude
               };
               return city;
           }

           function pushcitiesandcountries(product) {
               product.sleepcity = [];
               product.sleepcountry = [];

               product.departurecity = [];
               product.departurecountry = [];

               product.stopcities = [];
               product.stopcountry = [];

               _.each(product.itinerary, function (day) {
                   //sleep 
                   day.sleepcity != null && day.sleepcity.cityid != null ? product.sleepcity.push(day.sleepcity.cityid) : null;
                   day.sleepcity != null && day.sleepcity.countryid != null ? product.sleepcountry.push(day.sleepcity.countryid) : null;
                   //departure
                   day.departurecity != null && day.departurecity.cityid != null ? product.departurecity.push(day.departurecity.cityid) : null;
                   day.departurecity != null && day.departurecity.countryid != null ? product.departurecountry.push(day.departurecity.countryid) : null;
                   //stop
                   if (day.stopcities != null && day.stopcities.length > 0) {
                       _.each(day.stopcities, function (stp) {
                           stp != null && stp.cityid != null ? product.stopcities.push(stp.cityid) : null;
                           stp != null && stp.countryid != null ? product.stopcountry.push(stp.countryid) : null;
                       });
                   }
               });

               product.sleepcity = _.uniq(product.sleepcity);
               product.departurecity = _.uniq(product.departurecity);
               product.stopcities = _.uniq(product.stopcities);
               product.sleepcountry = _.uniq(product.sleepcountry);
               product.departurecountry = _.uniq(product.departurecountry);
               product.stopcountry = _.uniq(product.stopcountry);
               return product;
           }

           $scope.addsleeptoitinerary = function (itinerary, thecity) {
        	   
               var auxItinearary = angular.copy(itinerary);
               var location = parseCity(thecity);                              
               auxItinearary.hotel.selectedcategory = {};//inicializarla

               var cityid = thecity._id;
               var countryid = thecity.country._id;

               //location = _parseGmapsResult(thecity);
               var city = {
                   city: location.city,
                   citybehaviour: 'sleep',
                   order: 0,
                   cityid: cityid,
                   countryid: countryid,
                   country: location.country,
                   location: location,
               }

               if (auxItinearary) {
                   auxItinearary.sleepcity.city = city.city;
                   auxItinearary.sleepcity.citybehaviour = 'sleep';
                   auxItinearary.sleepcity.country = city.location.country;
                   //actualizo el dia
                   itinerary.sleepcity = city;

                   // si el itinerario tiene mas dias, pongo la salida del siguiente en la ciudad introducida
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       if ($scope.dmcproduct.itinerary[i].daynumber == auxItinearary.daynumber) {
                    	   
                           if ($scope.dmcproduct.itinerary[i + 1] != null) {
                        	   console.log("** dia: ",$scope.dmcproduct.itinerary[i].daynumber,' encontrado dia: ',auxItinearary.daynumber);
                               $scope.dmcproduct.itinerary[i + 1].departurecity.city = city.city;
                               $scope.dmcproduct.itinerary[i + 1].departurecity.citybehaviour = 'departure';
                               $scope.dmcproduct.itinerary[i + 1].departurecity.order = 1;
                               $scope.dmcproduct.itinerary[i + 1].departurecity.country = city.location.country;
                               $scope.dmcproduct.itinerary[i + 1].departurecity.location = city.location;
                           }
                           break;
                       }
                   }

                   resetautocomplete();
                   $scope.mapUpdate();

                   //actualizo las categorias
                   for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
                	   for (var i = 0; i < $scope.workspaces[itWork].dmcproduct.itinerary.length; i++) {            		   
                		   //console.log("Posicion del dia a quitar sleepcity:",itinerary.daynumber);
                		   //console.log("Posicion del dia del itienarior de la categoria: ",$scope.workspaces[itWork].dmcproduct.itinerary[i].daynumber);
                           if ($scope.workspaces[itWork].dmcproduct.itinerary[i].daynumber === auxItinearary.daynumber) {
                        	                       	   
                        	   console.log("Este es el dia del itineariro a borrar: ",auxItinearary.daynumber);
                        	   // 1) quito la sleep city
                        	   //$scope.workspaces[itWork].dmcproduct.itinerary[i].sleepcity.city = '';
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i].sleepcity.city = angular.copy(city.city);
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i].sleepcity.citybehaviour = 'sleep';
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i].sleepcity.country = city.location.country;
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i].sleepcity.location = angular.copy(location);
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i].hotel = {};
                        	   
                        	   
                        	   
                        	   
                        	   // 2) quito la ciudad de salida del siguiente dia
                               if ($scope.workspaces[itWork].dmcproduct.itinerary[i + 1] != null) {

                            	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.city = angular.copy(city.city);
                            	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.citybehaviour = 'departure';
                            	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.order = 1;
                            	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.country = city.location.country;
                            	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.location = angular.copy(city.location);
                               }
                               break;
                           }
                       }
                   }
                   $scope
                   //_copiItineraryInCategories();
                   console.log("itinerary dmcproduct final: ",$scope.dmcproduct.itinerary);
               }
               else {
                   console.log('Itinerary not found...');
               }
           }

           /**
            * anade una ciudad al stop city
            */
           $scope.addcitytoitinerary = function (itinerary, thecity) {
               var location = parseCity(thecity);   
               
               var cityid = thecity._id;
               var countryid = thecity.country._id;

               //location = _parseGmapsResult(thecity);

               var city = {
                   city: location.city,
                   citybehaviour: 'stop',
                   order: itinerary.stopcities.length + 1,
                   country: location.country,
                   cityid: cityid,
                   countryid: countryid,
                   location: location,
               }

               itinerary.stopcities.push(city);
               resetautocomplete();
               _copiItineraryInCategories();

           }           
           /**
            * funcion que anade un stopping place al itinerario
            * @param {Object} itinerary el día del itinerario en cuestión
            * @param {Object} thecity la ciudad del autocomplete
            */
           $scope.addcitytoitinerarylastday = function (itinerary, thecity) {
               var location = parseCity(thecity);

               var cityid = thecity._id;
               var countryid = thecity.country._id;

               var city = {
                   city: location.city,
                   citybehaviour: 'stop',
                   order: itinerary.stopcities.length + 1,
                   country: location.country,
                   cityid: cityid,
                   countryid: countryid,
                   location: location,
               }
               itinerary.stopcities.push(city);
               $scope.showlastdayaddcity = false;
               resetautocomplete();
           }


           $scope.removestopcitytoitinerary = function (itinerary, cityname) {
               for (var j = 0; j < itinerary.stopcities.length; j++) {
                   if (itinerary.stopcities[j].city === cityname) {
                       itinerary.stopcities.splice(j, 1);
                       break;
                   }
               }
           }

           // $scope.old_removestopcitytoitinerary = function (uuid, cityname) {
           //     for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
           //         if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
           //             for (var j = 0; j < $scope.dmcproduct.itinerary[i].stopcities.length; j++) {
           //                 if ($scope.dmcproduct.itinerary[i].stopcities[j].city == cityname) {
           //                     $scope.dmcproduct.itinerary[i].stopcities.splice(j, 1);
           //                     break;
           //                 }
           //             }
           //             break;
           //         }
           //     };
           // }

           $scope.removedeparturecitytoitinerary = function (uuid) {
               for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                   if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                       $scope.dmcproduct.itinerary[i].departurecity.city = '';
                       break;
                   }
               };
           }

           /**
            * elimina una sleepcity del dia seleccionado del itinerario
            */
           $scope.removesleepcitytoitinerary = function (itinerary) {
        	   
        	  	// quitar la sleppcity actual
               itinerary.sleepcity.city = '';
               //find next day...
               //add departure to next day if exists...
               
               
               // quitar la ciudad de salida del siguiente dia
               for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                   if ($scope.dmcproduct.itinerary[i].uuid === itinerary.uuid) {
                       if ($scope.dmcproduct.itinerary[i + 1] != null) {
                           $scope.dmcproduct.itinerary[i + 1].departurecity.city = '';
                           $scope.dmcproduct.itinerary[i + 1].departurecity.citybehaviour = 'departure';
                           $scope.dmcproduct.itinerary[i + 1].departurecity.order = 1;
                           $scope.dmcproduct.itinerary[i + 1].departurecity.country = '';
                       }
                       break;
                   }
               }
               
               //actualizo las categorias
               for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
            	   for (var i = 0; i < $scope.workspaces[itWork].dmcproduct.itinerary.length; i++) {            		   
            		   //console.log("Posicion del dia a quitar sleepcity:",itinerary.daynumber);
            		   //console.log("Posicion del dia del itienarior de la categoria: ",$scope.workspaces[itWork].dmcproduct.itinerary[i].daynumber);
                       if ($scope.workspaces[itWork].dmcproduct.itinerary[i].daynumber === itinerary.daynumber) {
                    	                       	   
                    	   //console.log("Este es el dia del itineariro a borrar.");
                    	   // 1) quito la sleep city
                    	   $scope.workspaces[itWork].dmcproduct.itinerary[i].sleepcity.city = '';
                    	   
                    	   // 2) quito la ciudad de salida del siguiente dia
                           if ($scope.workspaces[itWork].dmcproduct.itinerary[i + 1] != null) {
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.city = '';
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.citybehaviour = 'departure';
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.order = 1;
                        	   $scope.workspaces[itWork].dmcproduct.itinerary[i + 1].departurecity.country = '';
                           }
                           break;
                       }
                   }
			   }
               
               //_copiItineraryInCategories();
           }

          

           $scope.buildItinerary = function () {
               
               if ($scope.itinerarydays == 0) {
                   toaster.pop('error', 'Days of the Itinerary', 'You have to set a days number greater than 0');
               }
               else {
                   $scope.dmcproduct.itinerary = [];
                   for (var i = 1; i <= $scope.itinerarydays; i++) {
                       var islast = !(i == $scope.itinerarydays);
                       _additineraryday(i, islast);
                   }
                   $scope.showlastdayaddcity = false;
               }

           }

           

           /**
            * funcion que copia el itenerario de dmcproduct.itinerary en el de las categorias
            */
           function _copiItineraryInCategories(){
        	         	  
        	   if($scope.workspaces != null && $scope.workspaces.length>1){
        		   
        		   
        		   // recorro el itinerario original
        		   for(var itOr = 0; itOr < $scope.dmcproduct.itinerary.length; itOr++){
        			   console.log("dmc itinerary  inicial pos: ",itOr,' --- ',$scope.dmcproduct.itinerary[itOr].sleepcity);
        			   
        			   //si existe ese itinerario en las demas categorias (compruebo con la primera es resto son iguales)
        			   if($scope.workspaces[1].dmcproduct.itinerary[itOr] != null){
        				   
        				   console.log("Catergoria:  itinerario: ",itOr,' ---', $scope.workspaces[1].dmcproduct.itinerary[itOr].sleepcity);
        				   
        				   // Si el sleepcity es igual, copio pero con el hotel de la categoria
        				   if($scope.dmcproduct.itinerary[itOr].sleepcity != null && $scope.dmcproduct.itinerary[itOr].sleepcity.city != $scope.workspaces[1].dmcproduct.itinerary[itOr].sleepcity.city){
        					   console.log("no coincide Sleepcity:  con el en las categorias. LO inserto nuevo.");
        					   
	        				   // actualizo las categorias
	        				   for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
	        					   
	        					   //inicializar esa posicion del itinerario	        					  
	        					   var auxit = angular.copy($scope.dmcproduct.itinerary[itOr]);
	        					   auxit.hotel = {
	        	            			   name: '',
	        	                           category: '',
	        	                           locationkind: '',
	        	                           incity: false,
	        	                           insurroundings: false,
	        	                           meals: false,
	        	                           breakfast: false,
	        	                           lunch: false,
	        	                           lunchdrinks: false,
	        	                           dinner: false,
	        	                           dinnerdrinks: false,
	        	                           selectedcategory: { text: '5*', category: '5*' }
	        	            	   };
	        					   
	        					  $scope.workspaces[itWork].dmcproduct.itinerary.splice(itOr,0,auxit);
	        				   }	        				  
        				   }
        				   else{
        					   // si es diferente el stop o departure, mantengo la categoria del hotel antigua y e inserto el itineario
        					   if(($scope.dmcproduct.itinerary[itOr].departurecity != null && $scope.dmcproduct.itinerary[itOr].departurecity.city != $scope.workspaces[1].dmcproduct.itinerary[itOr].departurecity.city)
        							   || ($scope.dmcproduct.itinerary[itOr].stopcities != null && $scope.dmcproduct.itinerary[itOr].stopcities.length != $scope.workspaces[1].dmcproduct.itinerary[itOr].stopcities.length)){
        						       
        						   console.log("no coincide stoppcity o departure: ",itOr, " con el en las categorias. LO inserto manteniendo el hotel antiguo: ", $scope.workspaces[1].dmcproduct.itinerary[itOr]);
        						   // actualizo las categorias manteniendo el hotel original
    	        				   for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
  
    	        					   var auxit = angular.copy($scope.dmcproduct.itinerary[itOr]);    	           					
    	        					   auxit.hotel = $scope.workspaces[itWork].dmcproduct.itinerary[itOr].hotel;    	        					 
    	        					   $scope.workspaces[itWork].dmcproduct.itinerary.splice(itOr,1,auxit);
    	        				   }    	        				  
        					   }
        				   }        				   
        			   }
        			   
        			   //debemos anadir ese itinerario en las categorias
        			   else{        	
        				   console.log("copio el itinerario: ",itOr, " en las categorias");        				   
        				   // recorro los workspaces
        				   for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
        					   var auxit = angular.copy($scope.dmcproduct.itinerary[itOr]);
        					   auxit.hotel = {
        	            			   name: '',
        	                           category: '',
        	                           locationkind: '',
        	                           incity: false,
        	                           insurroundings: false,
        	                           meals: false,
        	                           breakfast: false,
        	                           lunch: false,
        	                           lunchdrinks: false,
        	                           dinner: false,
        	                           dinnerdrinks: false,
        	                           selectedcategory: { text: '5*', category: '5*' }
        	            	   };
        					   $scope.workspaces[itWork].dmcproduct.itinerary.splice(itOr,0,auxit);        					  
        				   }        				  
        			   }
        		   }        		   
        	   }
           } 
           
           

           

           $scope.printcitybehaviourline = function (behaviour) {
               if (behaviour != 'sleep') {
                   return '-'
               }
           }

           /**
            * elimina un dia del itinerario
            * se le pasa como paramtro el indice del dia en el itinerario
            */
          $scope.deleteitinerary = function (i) {
            $log.log(i,'tengo ',$scope.dmcproduct.itinerary);
            $log.log(i,'voy a borrar ',$scope.dmcproduct.itinerary[i]);
            
            console.log ('$scope.dmcproduct.code ',$scope.dmcproduct.code);
            // if is last day
            if ($scope.dmcproduct.itinerary[i].lastday != null && $scope.dmcproduct.itinerary[i].lastday == true) {
              $scope.shownextday = true;
            }
            // if is first day
            if (i == 0){
              // si es el primer día quito la departure del siguiente
              $scope.dmcproduct.itinerary[0].departurecity = null;
            }
            //delete day in scope
            $scope.dmcproduct.itinerary.splice(i, 1);
            $log.log('luego de quitar ',$scope.dmcproduct.itinerary)
            // delete day in categories
            if($scope.workspaces!=null && $scope.workspaces.length > 1){
              for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
                    console.log ('workspace code ',$scope.workspaces[itWork].dmcproduct.code);
                    $scope.workspaces[itWork].dmcproduct.itinerary.splice(i, 1);
                     // if is first day
                     if (i == 0){
                      $scope.workspaces[itWork].dmcproduct.itinerary[0].departurecity = null;
                      }
                 };
              $log.log('cat luego de quitar ',$scope.workspaces)
            }
            $log.log('antes de rerdenar ',$scope.dmcproduct.itinerary)
            $log.log('cat antes de rerdenar ',$scope.workspaces)
            _rearrange_days();
            $log.log('luego de rerdenar ',$scope.dmcproduct.itinerary)
            $log.log('cat luego de rerdenar ',$scope.workspaces)
           }
           

           $scope.showlastdayaddcity = false;

           $scope.addlastdaystop = function () {
               $scope.showlastdayaddcity = true;
           }


         

          /*                *\
                Activities
          \*                */


           $scope.deleteactivity = function (itinerary, activity) {

               if (itinerary) {
                   var jindex = -1;
                   for (var j = 0 ; j < itinerary.activities.length; j++) {
                       if (itinerary.activities[j].uuid == activity.uuid) {
                           jindex = j;
                           break;
                       }
                   }
                   if (jindex > -1) {
                       itinerary.activities.splice(jindex, 1);
                   }
               }


           }

           $scope.addactivitytoitinerary = function (itinerary) {
               //var it = finditinerary(uuid);
               if (itinerary) {
                   var activity = {
                       uuid: _generateUUID(),
                       daynumber: itinerary.daynumber,
                       index: 1,
                       title: '',
                       title_es: '',
                       activitykind: '',
                       group: false,
                       individual: false,
                       ticketsincluded: false,
                       localguide: false,
                       language: {
                           spanish: false,
                           english: false,
                           french: false,
                           german: false,
                           italian: false,
                           portuguese: false
                       }
                   }
                   itinerary.activities.push(activity);
               }

           }

           $scope.activitykindchange = function (activity) {
               if (activity.activitykind == 'group') {
                   activity.group = true;
                   activity.individual = false;
               }
               if (activity.activitykind == 'individual') {
                   activity.individual = true;
                   activity.group = false;
               }
           }

           $scope.actions = {};

           $scope.reset = function () {
               $scope.dmcproduct = {
                   name: 'New Program' + new Date().toJSON(),
                   title: 'New Program',
                   code: '',
                   productimage: {},
                   location: {
                       fulladdress: '',
                       city: '',
                       stateorprovince: '',
                       cp: '',
                       country: '',
                       countrycode: '',
                       continent: '',
                       latitude: 0.0,
                       longitude: 0.0,
                   },
                   availability: [],
                   included: {
                       trip: {
                           grouptrip: false,
                           privatetrip: true,
                           minpaxoperate: 2
                       },
                       arrivaltransfer: false,
                       arrivalassistance: false,
                       arrivallanguage: '',
                       departuretransfer: false,
                       departureassistance: false,
                       departurelanguage: '',
                       tourescort: {
                           included: false,
                           language: ''
                       },
                       transportbetweencities: {
                           included: false,
                           bus: false,
                           domesticflight: false,
                           train: false,
                           boat: false,
                           truck: false,
                           van: false,
                           privatecarwithdriver: false,
                           privatecarwithdriverandguide: false,
                           fourxfour: false,
                           other: false,
                           otherdescription: ''
                       },
                       taxesinthecountry: false,
                       airporttaxes: false,
                       tips: false,
                       baggagehandlingfees: false
                   },
                   itinerary: [],
                   keys: [],
                   dmc: {}
               };
           }

           //images helper
           $scope.getimage = function (url, imagename) {
               return tools_service.cloudinaryUrl(url, imagename);
           }

           //break the bubble
           function cancelevent(e) {
               if (!e)
                   e = window.event;

               //IE9 & Other Browsers
               if (e.stopPropagation) {
                   e.stopPropagation();
               }
                   //IE8 and Lower
               else {
                   e.cancelBubble = true;
               }
               if (e.preventDefault) {
                   e.preventDefault();
               } else {
                   e.returnValue = false;
               }
           }

           function bisuploadfile(itemtarget) {
               console.log(itemtarget);
           }

           $scope.uploadfile = function (itemtarget) {
               var file = document.getElementById('upfile');
               $scope.uploadfiletarget = '';
               $scope.uploadfiletarget = itemtarget;
               
               console.log('the target for the file is...' + $scope.uploadfiletarget);
               if ($scope.uploadfiletarget == 'main') {
                       $scope.mainimageprogress = true;
                   }
                   else {
                       var uuid = $scope.uploadfiletarget;
                       if ($scope.dmcproduct.itinerary != null &&
                                               $scope.dmcproduct.itinerary.length > 0) {
                           for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                               if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                   $scope.dmcproduct.itinerary[i].imageprogress = true;
                                   break;
                               }
                           }
                       }
                   }
               //if ($scope.uploadfiletarget != null && $scope.uploadfiletarget != '') {
                   
               //    $timeout(function () {
               //        var evt = document.createEvent("MouseEvents");
               //        evt.initEvent("click", true, false);

               //        file.onchange = $scope.triggeruploadpreview;

               //        file.dispatchEvent(evt);
               //    }, 100);

                   //var evt = document.createEvent("MouseEvents");
                   //evt.initEvent("click", true, false);

                   //file.onchange = $scope.triggeruploadpreview;

                   //file.dispatchEvent(evt);
               //}
               
           }


           $scope.buildid = function (prefix, idname) {
               if (idname == null || idname == '') {
                   idname = _generateUUID();
               }
               
               return prefix + idname.split('-').join('');
           }

           function updateProgress(evt) {
               // evt is an ProgressEvent.
               if (evt.lengthComputable) {
                   var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                   // Increase the progress bar length.
                   console.log('Readed...' + percentLoaded + ' %');
               }
           }

           function readURL(input, callback) {
               console.log('Pushing image to read...');
               if (input.files && input.files[0]) {
                   var reader = new FileReader();

                   reader.onload = function (e) {
                       console.log('image readed...');
                       
                       callback(e.target.result);
                   }
                   reader.onprogress = updateProgress;

                   reader.readAsDataURL(input.files[0]);
               }
               else {
                   callback(null);
               }

           }

           $scope.loadingprogress = 0;

           $scope.$on("fileProgress", function (e, progress) {
               $scope.loadingprogress = 100 * (progress.loaded / progress.total);
               console.log($scope.loadingprogress);
           });

           $scope.triggeruploadpreview = function ($event) {
               $event.preventDefault();
               $event.stopPropagation();

               $scope.loadingprogress = 0;

               var file = document.getElementById('upfile');
               file.onchange = null;
               var upfile = file.files[0];

               if (upfile != null) {

                   if ($scope.uploadfiletarget == 'main') {
                       $scope.mainimageprogress = true;
                   }
                   else {
                       var uuid = $scope.uploadfiletarget;
                       if ($scope.dmcproduct.itinerary != null &&
                                               $scope.dmcproduct.itinerary.length > 0) {
                           for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                               if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                   $scope.dmcproduct.itinerary[i].imageprogress = true;
                                   break;
                               }
                           }
                       }
                   }

                   fileReader.readAsDataUrl(upfile, $scope)
                   .then(function (url) {
                       tmpurl = url;
                       console.log(tmpurl);
                       if (tmpurl != null && tmpurl != '') {
                           $scope.uploadfileitem.tempurl = url;
                       }
                       
                       
                   });
               }
               
           }

           

           $scope.canceluploadfile = function (itemtarget) {
               if ($scope.uploadfiletarget == 'main') {
                   $scope.mainimageprogress = false;
               }
               else {
                   var uuid = $scope.uploadfiletarget;
                   if ($scope.dmcproduct.itinerary != null &&
                                           $scope.dmcproduct.itinerary.length > 0) {
                       for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                           if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                               $scope.dmcproduct.itinerary[i].imageprogress = false;
                               break;
                           }
                           
                       }
                   }
               }
               $scope.resetfile();
           }

           $scope.commituploadfile = function (itemtarget) {
               console.log($scope.uploadfileitem);
               if ($scope.uploadfileitem.stream != null) {

                   //loadingPage('show');
                   var upfile = $scope.uploadfileitem.stream;

                   openmarket_file_uploader.uploadFile(upfile,
                   function (evt) {
                       //The file is upload correctly : get a cloudinary file
                       var status = null;
                       console.log('file uploaded...' + upfile);
                       try {
                           status = evt.target.status;
                       }
                       catch (e) {
                           return;
                       }

                       if (((status >= 200 && status < 300) || status == 304)) {

                           var rs = evt.target.response;
                           if (rs != null && rs != '') {
                               try {
                                   cancelevent(evt);
                                   //file.onchange += $scope.triggerupload;
                                   var jj = JSON.parse(rs);
                                   console.log(jj);
                                   //toaster.pop('success', 'File uploaded OK', 'Your file has uploaded correctly. <br><img src=\"' +
                                   //        jj.url + '\" style=\"width:200px;height:200px;\">', 10000, 'trustedHtml');

                                   if ($scope.uploadfiletarget == 'main') {

                                       $scope.dmcproduct.productimage = jj;
                                       $scope.showmainimage = true;
                                       $scope.mainimageprogress = false;
                                       loadingPage();
                                       toaster.pop('success', 'File uploaded OK',
                                           'Image added to main description...', 6000);
                                       
                                   } else {

                                       var uuid = $scope.uploadfiletarget;
                                       console.log('Image for ' + uuid + ' added...');

                                       if ($scope.dmcproduct.itinerary != null &&
                                           $scope.dmcproduct.itinerary.length > 0) {
                                           for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                                               if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                                   $scope.dmcproduct.itinerary[i].showimage = true;
                                                   $scope.dmcproduct.itinerary[i].imageprogress = false;
                                                   $scope.dmcproduct.itinerary[i].image = jj;
                                                   loadingPage();
                                                   toaster.pop('success', 'File uploaded OK',
                                                       'Image added to itinerary ' +
                                                       $scope.dmcproduct.itinerary[i].daynumber +
                                                       ' description...', 6000);
                                                   break;
                                               }
                                           }
                                       }
                                   }
                                   $scope.resetfile();
                               }
                               catch (err) { console.log(err); }
                               var clfile = rs;
                               $scope.resetfile();
                           }

                       }

                   }, function (err) {
                       //An error has ocurred on uploading
                       console.log(err);
                   }, function (e) {
                       //progress of upload...

                       var percentage = Math.round((e.loaded * 100) / e.total);
                       console.log(percentage + '%...');

                       if ($scope.uploadfiletarget == 'main') {
                           $scope.mainimageprogress = true;
                       }
                       else {

                           var uuid = $scope.uploadfiletarget;
                           for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                               if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                   $scope.dmcproduct.itinerary[i].imageprogress = true;
                                   break;
                               }
                           }
                       }

                       return percentage;
                   });

               }
               

           }

           $scope.uploadfiletarget = null;
           $scope.mainimageprogress = false;

           $scope.uploadfileitem = {
               file: null,
               filename: '',
               tempurl: '',
               stream: null
           }

           $scope.resetfile = function () {
               $scope.uploadfileitem = {
                   file: null,
                   filename: '',
                   tempurl: '',
                   stream: null
               }
           }

           $scope.showToaster = function (messagetype, title, message) {
               if (messagetype == null || messagetype == '') {
                   messagetype = 'warning';
               }
               toaster.pop(messagetype, title, message);
           }
      
           $scope.triggerupload = function ($event) {
               
               $event.preventDefault();
               $event.stopPropagation();
               console.log($event);
               
               var file = document.getElementById('upfile');
               file.onchange = null;
               var upfile = file.files[0];
               console.log(file.value);
               console.log(upfile);
               console.log(event);
               openmarket_file_uploader.uploadFile(upfile,
                   function (evt) {
                       //The file is upload correctly : get a cloudinary file
                       var status = null;

                       try {
                           status = evt.target.status;
                       }
                       catch (e) {
                           return;
                       }

                       if (((status >= 200 && status < 300) || status == 304)) {
                           
                           var rs = evt.target.response;
                           if (rs != null && rs != '') {
                               try {
                                   cancelevent(evt);
                                   //file.onchange += $scope.triggerupload;
                                   var jj = JSON.parse(rs);
                                   console.log(jj);
                                   //toaster.pop('success', 'File uploaded OK', 'Your file has uploaded correctly. <br><img src=\"' +
                                   //        jj.url + '\" style=\"width:200px;height:200px;\">', 10000, 'trustedHtml');


                                   if ($scope.uploadfiletarget == 'main') {
                                       
                                       $scope.dmcproduct.productimage = jj;
                                       $scope.showmainimage = true;
                                       $scope.mainimageprogress = false;
                                       toaster.pop('success', 'File uploaded OK', 'Image added to main description...', 6000);
                                   } else {

                                       var uuid = $scope.uploadfiletarget;
                                       console.log('Image for ' + uuid + ' added...');
                                       
                                       if ($scope.dmcproduct.itinerary != null &&
                                           $scope.dmcproduct.itinerary.length > 0) {
                                           for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                                               if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                                   $scope.dmcproduct.itinerary[i].showimage = true;
                                                   $scope.dmcproduct.itinerary[i].imageprogress = false;
                                                   $scope.dmcproduct.itinerary[i].image = jj;
                                                   toaster.pop('success', 'File uploaded OK',
                                                       'Image added to itinerary ' +
                                                       $scope.dmcproduct.itinerary[i].daynumber +
                                                       ' description...', 6000);
                                                   break;
                                               }
                                           }
                                       }
                                   }
                               }
                               catch (err) { console.log(err); }
                               var clfile = rs;
                           }

                       }

                   }, function (err) {
                       //An error has ocurred on uploading
                       console.log(err);
                   }, function (e) {
                       //progress of upload...

                       var percentage = Math.round((e.loaded * 100) / e.total);
                       console.log(percentage + '%...');

                       if ($scope.uploadfiletarget == 'main') {
                           $scope.mainimageprogress = true;
                       }
                       else {

                           var uuid = $scope.uploadfiletarget;
                           for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                               if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                   $scope.dmcproduct.itinerary[i].imageprogress = true;
                                   break;
                               }
                           }
                       }

                       return percentage;
                   });


           }


           $scope.translatetitle = function (text) {
               openmarket_api_service.translate(text, 'EN', 'ES', 'google', function (translations) {
                   
                   if (translations.ResultOK) {
                       $scope.dmcproduct.title_es = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + text + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translatetitle_es = function (text) {
               openmarket_api_service.translate(text, 'ES', 'EN', 'google', function (translations) {

                   if (translations.ResultOK) {
                       $scope.dmcproduct.title = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + text + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translateactivity = function (activity) {
               openmarket_api_service.translate(activity.title, 'EN', 'ES', 'google', function (translations) {
                   
                   if (translations.ResultOK) {
                       activity.title_es = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + activity.title + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translateactivity_es = function (activity) {
               openmarket_api_service.translate(activity.title_es, 'ES', 'EN', 'google', function (translations) {

                   if (translations.ResultOK) {
                       activity.title = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + activity.title + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translatemaindescription = function (text) {
               openmarket_api_service.translate(text, 'EN', 'ES', 'google', function (translations) {
                   
                   if (translations.ResultOK) {
                       $scope.dmcproduct.description_es = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + text + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translatemaindescription_es = function (text) {
               openmarket_api_service.translate(text, 'ES', 'EN', 'google', function (translations) {

                   if (translations.ResultOK) {
                       $scope.dmcproduct.description_en = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + text + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translateitinerary = function (itinerary) {
               openmarket_api_service.translate(itinerary.description_en, 'EN', 'ES', 'google', function (translations) {
                   
                   if (translations.ResultOK) {
                       itinerary.description_es = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + itinerary.description + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translateitinerary_es = function (itinerary) {
               openmarket_api_service.translate(itinerary.description_es, 'ES', 'EN', 'google', function (translations) {

                   if (translations.ResultOK) {
                       itinerary.description_en = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + itinerary.description + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translateimportantenotes_es = function (text) {
               openmarket_api_service.translate(text, 'EN', 'ES', 'google', function (translations) {

                   if (translations.ResultOK) {
                       $scope.dmcproduct.important_txt_es = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + itinerary.description + ' was unable to translate. Try again');
                   }
               });
           }
           $scope.translateimportantenotes = function (text) {
               openmarket_api_service.translate(text, 'ES', 'EN', 'google', function (translations) {

                   if (translations.ResultOK) {
                       $scope.dmcproduct.important_txt_en = translations.Translation[0];
                   }
                   else {
                       toaster.pop('error', 'Error translating text', 'The text ' + itinerary.description + ' was unable to translate. Try again');
                   }
               });
           }

          /*                *\
              Tags manager
          \*                */
         
           
          $scope.tagoptions = undefined;
          $scope.tagspecials = undefined;

          //Get tripTags
          function _checkTags() {
              if ($scope.dmcproduct.tags != null && $scope.dmcproduct.tags.length > 0) {
                  for (var i = 0; i < $scope.dmcproduct.tags.length; i++) {
                      var tag = _findTripTag($scope.dmcproduct.tags[i].slug);
                      if (tag != null) {
                          $scope.dmcproduct.tags[i] = tag;
                      }
                  }
              }
              $scope.$broadcast('tagsandproductloaded');
          }

          function _removeDuplicateTags() {
              var checkedslugs = [];
              var checkedtags = [];
              if ($scope.dmcproduct.tags != null && $scope.dmcproduct.tags.length > 0) {
                  for (var i = 0; i < $scope.dmcproduct.tags.length; i++) {
                      var tag = $scope.dmcproduct.tags[i];
                      if (tag != null) {
                          var slug = $scope.dmcproduct.tags[i].slug;
                          if (slug != null && slug != '') {
                              if (checkedslugs.indexOf(slug) == -1) {
                                  checkedslugs.push(slug);
                                  checkedtags.push($scope.dmcproduct.tags[i]);
                              }
                          }
                      }
                  }
              }
              $scope.dmcproduct.tags = checkedtags;
          }

          function _findTripTag(slug) {
              var tag = null;
              if ($scope.tagoptions != null && $scope.tagoptions.length > 0) {
                  for (var i = 0; i < $scope.tagoptions.length; i++) {
                      if ($scope.tagoptions[i].slug == slug) {
                          tag = $scope.tagoptions[i];
                          break;
                      }
                  }
              }
              return tag;
          }
          // var to set typea head
          $scope.publicTags = [];


          function _getTripTags(callback, errorcallback) {

              var rq = {
                  command: 'find',
                  service: 'api',
                  request: {
                      collectionname: 'TripTags',
                      query: { label: { $ne: null } },
                      sortcondition: { sortOrder : 1 }
                  }
              };

              var rqCB = yto_api.send(rq);

              rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                  $scope.tagoptions = [];
                  _.each(rsp, function (tag) {
                      $scope.tagoptions.push(tag);
                      if (tag.state == 'published') {
                          $scope.publicTags.push(tag);
                      }
                  });
                  callback != null ? callback(rsp) : null;
              });
              //on response noOk
              rqCB.on(rqCB.onerroreventkey, function (err) {
                  console.log("error loading tripTags" + err);
                  errorcallback != null ? errorcallback(err) : null;
              });

              return rqCB;
          };

          // delete tags of list

          $scope.removeTag = function(index){
            $scope.dmcproduct.tags.splice(index, 1);
          };

          // Call get trip tags
          

          $scope.tagtoadd = '';

          $scope.addTag = function () {
            // console.log($scope.tagtoadd);
            // console.log("____>"+_findTag($scope.tagtoadd));
            if (!_findTag($scope.tagtoadd)) {
               $scope.dmcproduct.tags.push($scope.tagtoadd);
            }
            $scope.tagtoadd = '';
          };

          function _findTag(tag) {
             var finded = false;
             var results = $scope.dmcproduct.tags.filter(function (entry) { return entry.label_en === tag.label_en; });
             if (results.length > 0){
                finded = true;
             }
             return finded;
           };


          /*                    *\
              Publish manager
          \*                    */



           /**
            * funcion save and publis para omt
            *  actons value : syp "save an publish", s "save only"
            */           
          $scope.saveCanPublish = function (action) {
 	 
            if (!$scope.dmcproduct.parent || $scope.dmcproduct.parent == null){ 
            	tools_service.showPreloader($scope, 'show');
            	
            	// 1) validar producto base
            	var rs = validateAll();
              if (rs.result) {            	   
              	   // 2) validar las categorias si tiene
              	   var validCategory = true;
              	   if($scope.workspaces!=null && $scope.workspaces.length > 1){
              		   validCategory = $scope.validateCategories();
              	   }
              	   
              	   // 2.1) falta algun campo en las categorias no guardo
              	   if(!validCategory){

              			   loadingPage ();

              	   }else{
                    // 2.2) estan validadas las categorias
    		        	  // *****************
    		        	  // Salvar y publicar
    		        	  // *****************
    		              if (action=="syp"){
    		            	  
    		            	  // cambiar estado del producto original
    		                  $scope.dmcproduct.publishState = "published";               
    		                  
    		                  // 1.1) ver si tiene categorias y poner a published las categorias                  
    		                  if($scope.workspaces!=null && $scope.workspaces.length > 1){
    		                	  
    		                	  // 2) actualizar el estado del producto a published
    		                	  for(var itCat = 0, len = $scope.workspaces.length; itCat < len; itCat++){                		  
    		                		  $scope.workspaces[itCat].dmcproduct.publishState = "published";
    		                      }; 
    		                	  
    		
    		                	  // 3) guardo el producto padre
    		                	  _save(function (doc) {
    		                		  
    			                		// actualizo el producto de scope con el codigo obtenido 
    				               		$scope.dmcproduct.code = doc.code;
    				               	 
    				               		// 4) guardo las categorias de ese producto
    			               		    saveAllCategories(function (result) {    
    			               		    	
    			                   		   if(result){
    			                   			  toaster.pop('note', 'Publish settings', 'Product can be published: ' +
    				                                  $scope.dmcproduct.productvalid);
    			                   			  window.location = '/edit/program?code='+ $scope.dmcproduct.code;
    			                   		   }
    			                   	   });
    		                		  
    		                	  });
    		                  }else{// 1.2) solo es un producto, no tiene categorias
    		                	  _save(function (doc) {
    		                		  
    		                          toaster.pop('note', 'Publish settings', 'Product can be published: ' +
    		                              $scope.dmcproduct.productvalid);
    		                          loadingPage ();
    		                      }); 
    		                  }
    		              } else if (action=="s"){
                        // ******
                        // salvar
                        // ******
    		            	  // actualizar estado
    		                  $scope.dmcproduct.publishState = "unpublished";
    		
    		                  // guardar producto
    		                  // 1.1) ver si tiene categorias y poner a published las categorias                  
    		                  if($scope.workspaces!=null && $scope.workspaces.length > 1){
    		                    
    		                    // 2) actualizar el estado del producto a published
    		                    for(var itCat = 0, len = $scope.workspaces.length; itCat < len; itCat++){                     
    		                      $scope.workspaces[itCat].dmcproduct.publishState = "unpublished";
    		                    }; 
    		                    
    		                    // 3) guardo el producto apdre
    		                    _save(function (doc) {
    		                      
    		                      // actualizo el producto de scope con el codigo obtenido 
    		                      $scope.dmcproduct.code = doc.code;
    		                     
    		                      // 4) guardo las categorias de ese producto
    		                        saveAllCategories(function (result) {    
    		                          
    		                           if(result){
    		                            toaster.pop('note', 'Publish settings', 'Product can be published: ' +
    		                                      $scope.dmcproduct.productvalid);
    		                            window.location = '/edit/program?code='+ $scope.dmcproduct.code;
    		                           }		                         
    		                         });		                      
    		                    });
    		                  }
    		                  // 1.2) solo es un producto, no tiene categorias
    		                  else{
    		                    _save(function (doc) {
    		                    	  loadingPage ();
    		                          toaster.pop('note', 'Publish settings', 'Product can be published: ' +
    		                              $scope.dmcproduct.productvalid);
    		                      }); 
    		                  }
    		              }
	          		}
	            }else {
              // *************************************
              // NO esta relleno el producto principal
              // *************************************
	               loadingPage ();
	               var text = rs.messages.join('\r\n');
	               toaster.pop('warning', 'You only can save as a draft', '', 11000, 'trustedHtml');
	               toaster.pop('error', 'Review your tour', text, 10000, 'trustedHtml');
	            }          	   
	         } 
	         // intentar guardar una categoria    
	         else{
	           toaster.pop('error', 'Publish settings', 'Solo se puede guardar y publicar desde la categoria principal');
	         }// end if is parent         
          }

          
          /**
           * funcion que solo guarda, no actualiza el scope ni muestra un toaster
           */
          function _save_only(callback) {
              //Saving DMCProduct to BBDD
              //Call api...
              
              _syncChangesToServer(function (doc) {
                  console.log(doc);                
                  if (callback) {                	 
                      callback(doc);
                  }
              }, function (err) {
                  toaster.pop('error', 'Product not saved properly', 'Your data is not saved...' + err);
              });
          }


           function _save(callback) {
               //Saving DMCProduct to BBDD
               //Call api...
               
               _syncChangesToServer(function (doc) {
            	   //console.log("--- _save: ",doc);
                //   console.log(doc);
                   window.onbeforeunload = null;
                   //$scope.serverdmcproduct = doc;
                   //$scope.dmcproduct.code = doc.code;
                   toaster.pop('success', 'Product has been saved', 'Your data is saved correctly!');
                   if (callback) {
                       callback(doc);
                   }
               }, function (err) {
                   toaster.pop('error', 'Product not saved properly', 'Your data is not saved...' + err);
               });
           }

           $scope.titleisempty = false;
           $scope.preloaded = false;
           $scope.scratchprogram = function () {

               //start a new product...
               $scope.dmcproduct.title = '';
               $scope.dmcproduct.title_es = '';
               _buildAvailableMonths();
               _reset_calendar();
               //buildAnEmptyCalendar();
               buildAMonthCalendar(new Date().getFullYear(), new Date().getMonth());
               setAvailabilityInCalendar(new Date().getFullYear(), new Date().getMonth());

               $scope.StepZeroVisible = true;
               $scope.StepZeroVisibleButtons = true;
               $scope.formvisible = true;
               //toaster.pop('success', 'File uploaded OK', 'Your file has uploaded correctly. <br><img src=\"http://res.cloudinary.com/openmarket-travel/image/upload/v1409820125/d3x4owes2ktibspd2jke.gif\" style=\"width:200px;height:200px;\">', 5000, 'trustedHtml');

           }
           $scope.formvisible = false;

           $scope.StepZeroValid = function () {
               var ok = $scope.dmcproduct.languages.english || $scope.dmcproduct.languages.spanish;
               return ok;
           }

           $scope.StepZeroCommit = function () {
               //console.log($scope.dmcproduct.languages);
               //finished commit stuff
               var ok = $scope.dmcproduct.languages.english || $scope.dmcproduct.languages.spanish
               if (!ok ) {
                   toaster.pop('error', 'Languages required', 'You must check at least one language.', 5000);
               }
               else {
                   
                   //toaster.pop('success', 'Step 0 Finished', 'Selection language is correct');
                   $scope.StepOneVisible = true;
                   $scope.StepZeroVisibleButtons = false;
                   $scope.StepOneVisibleButtons = true;
                   //showandhide($scope.StepTwoVisible, $scope.StepOneVisible);
                   console.log($scope.dmcproduct);
                   document.getElementById('step1startpoint').scrollIntoView();
                   _save(function (doc) {
                       console.log(doc);
                       
                   });
               }

           }
           $scope.StepZeroVisible = false;
           $scope.releaseDaysVisible=true;
           $scope.statusVisible = true;
           $scope.categoryEditingVisible = true; 
           
           $scope.StepZeroVisibleButtons = false;

           $scope.StepOneValid = function () {
               var ok = true;
               if ($scope.dmcproduct.languages.english) {
                   if ($scope.dmcproduct.title == 'New Program' || $scope.dmcproduct.title == '') {
                       toaster.pop('error', 'Tour name required',
                           'You must provide a name (english) for this new program.', 5000);
                       $scope.titleisempty = true;
                       ok = false;
                   }
               }
               if ($scope.dmcproduct.languages.spanish) {
                   if ($scope.dmcproduct.title_es == 'New Program' || $scope.dmcproduct.title_es == '') {
                       toaster.pop('error', 'Tour name required',
                           'You must provide a name (spanish) for this new program.', 5000);
                       $scope.titleisempty = true;
                       ok = false;
                   }
               }
               return ok;
           }

           $scope.StepOneCommit = function () {

               //finished commit stuff
               var ok = true;
               if ($scope.dmcproduct.languages.english) {
                   if ($scope.dmcproduct.title == 'New Program' || $scope.dmcproduct.title == '') {
                       toaster.pop('error', 'Tour name required',
                           'You must provide a name (english) for this new program.', 5000);
                       $scope.titleisempty = true;
                       ok = false;
                   }
               }
               if ($scope.dmcproduct.languages.spanish) {
                   if ($scope.dmcproduct.title_es == 'New Program' || $scope.dmcproduct.title_es == '') {
                       toaster.pop('error', 'Tour name required',
                           'You must provide a name (spanish) for this new program.', 5000);
                       $scope.titleisempty = true;
                       ok = false;
                   }
               }

               if (ok) {
                   if ($scope.dmcproduct.title != null && $scope.dmcproduct.title != '') {
                       $scope.dmcproduct.name = $scope.dmcproduct.title;
                   }
                   else {
                       $scope.dmcproduct.name = $scope.dmcproduct.title_es;
                   }
                   $scope.dmcproduct.name = $scope.dmcproduct.title;
                   //toaster.pop('success', 'Step 1 Finished', 'This title is correct');
                   $scope.titleisempty = false;
                   $scope.StepTwoVisible = true;
                   $scope.StepOneVisibleButtons = false;
                   $scope.StepTwoVisibleButtons = true;
                   //showandhide($scope.StepTwoVisible, $scope.StepOneVisible);
                   console.log($scope.dmcproduct);
                   document.getElementById('step2startpoint').scrollIntoView();
                   _save(function (doc) {
                       //console.log('response ', doc);
                       $location.search('code', doc.code);
                   });
               }

           }
           $scope.StepOneVisible = false;
           $scope.StepOneVisibleButtons = false;

           $scope.StepTwoValid = function () {
               var ok = false;
               if ($scope.dmcproduct.availability != null || $scope.dmcproduct.availability.length > 0) {
                   for (var year = 0; year < $scope.dmcproduct.availability.length; year++) {
                       for (var index_month = 0; index_month <= 11; index_month++) {
                           var month = _getMonthNameEnglish(index_month);
                           for (var day = 0; day < $scope.dmcproduct.availability[year][month].availability.length; day++) {
                               if ($scope.dmcproduct.availability[year][month].availability[day].available) {
                                   ok = true;
                                   break;
                               }
                           }
                       }
                   }
                   
               }
               return ok;
           }
           $scope.StepTwoCommit = function () {

               //finished commit stuff
               //if ($scope.dmcproduct.availability == null || $scope.dmcproduct.availability.length == 0) {
               //    toaster.pop('error', 'Step 2 not finished', 'There is not departure rate prices added.<br />' +  
               //        'You need to complete this section to show minimum prices');
               //}
               //else {
               //    toaster.pop('success', 'Step 2 Finished', 'Availability checked');
               //    $scope.StepThreeVisible = true;
               //    console.log($scope.dmcproduct);
               //    document.getElementById('step3startpoint').scrollIntoView();
               //    $scope.StepTwoVisibleButtons = false;
               //    $scope.StepThreeVisibleButtons = true;
               //}

               //toaster.pop('success', 'Step 2 Finished', 'Availability checked');
               $scope.StepThreeVisible = true;
               console.log($scope.dmcproduct);
               document.getElementById('step3startpoint').scrollIntoView();
               $scope.StepTwoVisibleButtons = false;
               $scope.StepThreeVisibleButtons = true;
               _save(function (doc) {
                   console.log(doc);
                   
               });
           }
           $scope.StepTwoVisible = false;
           $scope.StepTwoVisibleButtons = false;

           /**
            * funcion para validar el paso 3 (informacion del producto viaje privado o grupo)
            */
           $scope.StepThreeCommit = function () {

               //toaster.pop('success', 'Step 3 Finished', 'Your data is saved OK');
               $scope.StepFourVisible = true;
               console.log($scope.dmcproduct);
               document.getElementById('step4startpoint').scrollIntoView();
               $scope.StepThreeVisibleButtons = false;
               $scope.StepFourVisibleButtons = true;
               $scope.shownextday = true;
               $scope.additineraryday();
               _save(function (doc) {
                   console.log(doc);
                   
               });

           }
           $scope.StepThreeVisible = false;
           $scope.StepThreeVisibleButtons = false;

           $scope.StepFourValid = function () {
               return validateitinerary().result;
           }

           $scope.StepFourCommit = function () {
               
                   //finished commit stuff
                   //toaster.pop('success', 'Step 4 Finished', 'Your data is saved OK');
                   $scope.StepFiveVisible = true;
                   console.log($scope.dmcproduct);
                   document.getElementById('step5startpoint').scrollIntoView();
                   $scope.StepFourVisibleButtons = false;
                   $scope.StepFiveVisibleButtons = true;
                   _save(function (doc) {
                       console.log(doc);
                       
                   });

           }

           $scope.StepFourVisible = false;
           $scope.StepFourVisibleButtons = false;

           $scope.StepFiveValid = function () {
               return ($scope.dmcproduct.productimage != null & $scope.dmcproduct.productimage.url != '' &
                   $scope.dmcproduct.productimage.url.indexOf('img-empty.png') == -1);
           }

           $scope.StepFiveCommit = function () {

               //finished commit stuff
               
                   $scope.StepSixVisible = true;
                   console.log($scope.dmcproduct);
                   document.getElementById('step6startpoint').scrollIntoView();
                   $scope.StepFiveVisibleButtons = false;
                   $scope.StepSixVisibleButtons = true;
                   _save(function (doc) {
                       console.log(doc);
                       
                   });
               
           }
           $scope.StepFiveVisible = false;
           $scope.StepFiveVisibleButtons = false;

           $scope.StepSixValid = function () {
               return ($scope.dmcproduct.tags != null && $scope.dmcproduct.tags.length > 0);
           }

           $scope.StepSixCommit = function () {
                
               //finished commit stuff
               //toaster.pop('success', 'Step 6 Finished', 'Your data is saved OK');
               $scope.StepSevenVisible = true;
               //console.log($scope.dmcproduct);
               //document.getElementById('step7startpoint').scrollIntoView();
               $scope.StepSixVisibleButtons = false;
               $scope.StepSevenVisibleButtons = true;
               _save(function (doc) {
                   //console.log(doc);
                   $scope.mapUpdate();
               });
           }
           $scope.StepSixVisible = false;
           $scope.StepSixVisibleButtons = false;

           $scope.StepSevenCommit = function () {

               //finished commit stuff
               //toaster.pop('success', 'Step 7 Finished', 'Your data is saved OK');
               $scope.StepEightVisible = true;
               //console.log($scope.dmcproduct);
               document.getElementById('step8startpoint').scrollIntoView();
               $scope.StepSevenVisibleButtons = false;
               $scope.StepEightVisibleButtons = true;
               _save(function (doc) {
                   //console.log(doc);
                   
               });
           }
           $scope.StepSevenVisible = false;
           $scope.StepSevenVisibleButtons = false;

           /*                                      *\
              Validate departure and arrival flights  itinerarylength
           \*                                      */
           $scope.intFlightValid = function (){
              console.log ('$scope.dmcproduct.flights ',$scope.dmcproduct.flights);
              if ($scope.dmcproduct.flights){
                // check if have arrival airport
                var arrivalAirport = ($scope.dmcproduct.itinerary[0].flights[0] && $scope.dmcproduct.itinerary[0].flights[0].arrival && $scope.dmcproduct.itinerary[0].flights[0].arrival.iata)? true : false ;
                var departureAirport = ($scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1].flights[0] && $scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1].flights[0].departure && $scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1].flights[0].departure.iata)? true : false ;
                console.log ('arrivalAirport ',arrivalAirport);
                console.log ('departureAirport ',departureAirport);
                if (arrivalAirport &&
                departureAirport){
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }
           }
           /**
            * guardar el producto en mongo como unpublish
            */
           $scope.StepEightCommitUnpublish = function () {
               loadingPage ('show');
                              
               // 1) validar el programa principal
               var rs = validateAll();

               if (rs.result) {    
            	   
            	   // 2) validar las categorias si tiene
            	   var validCategory = true;
            	   if($scope.workspaces!=null && $scope.workspaces.length > 1){
            		   validCategory = $scope.validateCategories();
            	   }
            	   
            	   // 2.1) falta algun campo en las categorias no guardo
            	   if(!validCategory){
            			   loadingPage ();
            	   }
            	   
            	   // 3) todo validado
            	   else{	                   
	                   $scope.StepEightVisible = true;
	                   $scope.dmcproduct.publishState = 'unpublished';
	                   console.log($scope.dmcproduct);
	                   $scope.StepEightVisibleButtons = true;
	                   
	                   
	                   // ****************************************************
                       // 4) debo guardar mas categorias (ademas de la basica)
                       // ****************************************************
                       if($scope.workspaces!=null && $scope.workspaces.length > 1){
                    	   
                    	   // pongo el estado unpublished a las categorias
                    	   for(var itCat = 0, len = $scope.workspaces.length; itCat < len; itCat++){                     
                               $scope.workspaces[itCat].dmcproduct.publishState = "unpublished";
                           };
                    	   console.log("SAVE product as UNPUBLISH. Code: ",$scope.dmcproduct.code);
                    	   
                    	   // 4.1) guardo el producto original, para tener el codigo en caso de no tenerlo
                    	   _save(function (doc){
                    		   
                    		   console.log("Producto original guardado, code: "+doc.code);
                    		   
                    		   // 4.2) actualizo el producto de scope con el codigo obtenido 
                    		   $scope.dmcproduct.code = doc.code;
                    		   
                    		   // 4.3) guardo las categorias de ese producto
                               saveAllCategories(function (result) {      
                                   toaster.pop('success', 'Changes saved',
                                       'All information was saved successfully', 3000);      
                                   tools_service.showPreloader($scope, 'hide');            		
                        		   //if(result){
                        			  // if($scope.isAdmin){
                        				 //  window.location = '/omt-list/product';                        				   
                        			  // }
                        			  // else{
                        				 //  window.location = '/dmc-programs';
                        			  // }
                        		   //}
                        	   });
                           });
                    	   
                       }         
                       
                       // *********************************************************
                       // 5) si no tiene categorias adicionales, guardo el producto
                       // *********************************************************
                       else{                           
                           _save(function (doc) {
                               console.log(doc);
                               toaster.pop('success', 'Category has been saved',
                                   'All information was saved successfully', 3000);
                               tools_service.showPreloader($scope, 'hide');
                      //         if($scope.isAdmin){
                				  // window.location = '/omt-list/product';                        				   
                			   //}
                			   //else{
                				  // window.location = '/dmc-programs';
                			   //}                               
                           });
                       } 	               
            	   }
               } else {
                   loadingPage ();
                   var text = rs.messages.join('\r\n');
                   toaster.pop('warning', 'You only can save as a draft', '', 11000, 'trustedHtml');
                   toaster.pop('error', 'Review your tour', text, 10000, 'trustedHtml');
                   tools_service.showPreloader($scope, 'hide');   
               }

           }
           
           /**
            * publicar el producto como publish
            */
           $scope.StepEightCommitPublish = function () {
        	     
               loadingPage ('show');

               // 1) validar el programa principal
               var rs = validateAll();

               if (rs.result) {            	   
            	   
            	   // 2) validar las categorias si tiene
            	   var validCategory = true;
            	   if($scope.workspaces!=null && $scope.workspaces.length > 1){
            		   validCategory = $scope.validateCategories();
            	   }
            	   
            	   // 2.1) falta algun campo en las categorias no guardo
            	   if(!validCategory){
            			   loadingPage ();
            	   }
            		  
        		   // 2.2) estan rellenas voy a guardar
        		   else{
        			   // 3) termino de conformar el producto a guardar
                       $scope.StepEightVisible = true;
                       if (($scope.dmcproduct.dmc.membership.autopublish != null && 
                           $scope.dmcproduct.dmc.membership.autopublish == true) || ($scope.session && $scope.session.user.isAdmin) ) {
                           $scope.dmcproduct.publishState = 'published';
                           
                           //comprobar si tiene mas categorias para ponerlas a published                          
                           if($scope.workspaces!=null && $scope.workspaces.length > 1){
                        	   for(var itWork = 1 ; itWork < $scope.workspaces.length; itWork ++){
                        		   console.log("categoria: "+itWork+" "+$scope.workspaces[itWork].dmcproduct.code);
                        		                       			           			           			  
                            	   //no es el procuto base, si no una categoria, la pongo a published
                            	   if($scope.workspaces[itWork].dmcproduct.parent != null){
                            		   $scope.workspaces[itWork].dmcproduct.publishState = 'published';
                            	   }                        		   
                        	   }
                           }
                       }
                       else {
                           $scope.dmcproduct.publishState = 'under review';
                       }
                       console.log($scope.dmcproduct);
                       $scope.StepEightVisibleButtons = true;
                       
                       // ****************************************************
                       // 4) debo guardar mas categorias (ademas de la basica)
                       // ****************************************************
                       if($scope.workspaces!=null && $scope.workspaces.length > 1){
                    	   console.log("Save product as PUBLISH. code: ",$scope.dmcproduct.code);
                    	   
                    	   // 4.1) guardo el producto original, para tener el codigo en caso de no tenerlo
                    	   _save(function (doc){
                    		   
                    		   console.log("Producto original guardado, code: "+doc.code);
                    		   
                    		   // 4.2) actualizo el producto de scope con el codigo obtenido 
                    		   $scope.dmcproduct.code = doc.code;
                    		   
                    		   // 4.3) guardo las categorias de ese producto
                    		   saveAllCategories(function (result) {                        		
                        		   if(result){
                                       toaster.pop('success', 'Category has been saved',
                                           'All information was saved successfully', 3000);
                                       tools_service.showPreloader($scope, 'hide');
                              //         if ($scope.isAdmin) {
                              //             toaster.pop('success', 'Category has been saved',
                              //                 'All information was saved successfully', 3000);

                        				  // //window.location = '/omt-list/product';                        				   
                        			   //}
                              //         else {
                              //             toaster.pop('success', 'Category has been saved',
                              //                 'All information was saved successfully', 3000);
                        				  // window.location = '/dmc-programs';
                        			   //}
                        		   }
                        	   });
                           });
                    	   
                       }         
                       
                       // *********************************************************
                       // 5) si no tiene categorias adicionales, guardo el producto
                       // *********************************************************
                       else{                           
                           _save(function (doc) {
                               console.log(doc);
                               toaster.pop('success', 'Category has been saved',
                                   'All information was saved successfully', 3000);
                               tools_service.showPreloader($scope, 'hide');
                      //         if($scope.isAdmin){
                				  // window.location = '/omt-list/product';                        				   
                			   //}
                			   //else{
                				  // window.location = '/dmc-programs';
                			   //}                               
                           });
                       }        		  
            	   }
               }
               // ****************************************
               // 6) no esta relleno el producto principal
               // ****************************************
               else {
                   loadingPage ();
                   var text = rs.messages.join('\r\n');
                   toaster.pop('warning', 'You only can save as a draft', '', 11000, 'trustedHtml');
                   toaster.pop('error', 'Review your tour', text, 10000, 'trustedHtml');
               }
           }

           /**
            * funcion que guarda un producto en mongo como draft
            */
           $scope.StepEightCommitDraft = function () {
               loadingPage ('show');
               $scope.StepEightVisible = true;
               $scope.dmcproduct.publishState = 'draft';
               console.log($scope.dmcproduct);
               $scope.StepEightVisibleButtons = true;
               
               // ****************************************************
               // 4) debo guardar mas categorias (ademas de la basica)
               // ****************************************************
               if($scope.workspaces!=null && $scope.workspaces.length > 1){
            	   
            	   // pongo el estado unpublished a las categorias
            	   for(var itCat = 0, len = $scope.workspaces.length; itCat < len; itCat++){                     
                       $scope.workspaces[itCat].dmcproduct.publishState = "draft";
                   };
            	   
            	   console.log("Save as DRAFT product. Code: ",$scope.dmcproduct.code);
            	   
            	   // 4.1) guardo el producto original, para tener el codigo en caso de no tenerlo
            	   _save(function (doc){
            		   
            		   console.log("Producto original guardado, code: "+doc.code);
            		   
            		   // 4.2) actualizo el producto de scope con el codigo obtenido 
            		   $scope.dmcproduct.code = doc.code;
            		   
            		   // 4.3) guardo las categorias de ese producto
            		   saveAllCategories(function (result) {                        		
                           if (result) {
                               toaster.pop('success', 'Category has been saved',
                                   'All information was saved successfully', 3000);
                               tools_service.showPreloader($scope, 'hide');
                			   //if($scope.isAdmin){
                				  // window.location = '/omt-list/product';                        				   
                			   //}
                			   //else{
                				  // window.location = '/dmc-programs';
                			   //}
                		   }
                	   });
                   });
            	   
               }         
               
               // *********************************************************
               // 5) si no tiene categorias adicionales, guardo el producto
               // *********************************************************
               else{                           
                   _save(function (doc) {
                       console.log(doc);
                       toaster.pop('success', 'Category has been saved',
                           'All information was saved successfully', 3000);
                       tools_service.showPreloader($scope, 'hide');
              //         if($scope.isAdmin){
        				  // window.location = '/omt-list/product';                        				   
        			   //}
        			   //else{
        				  // window.location = '/dmc-programs';
        			   //}
                   });
               } 	        

           }

           $scope.StepEightVisible = false;
           $scope.StepEightVisibleButtons = false;

           function validateAll() {
               var validation = { result: true, messages: [] };
               var tmpok = false;
               //valid step 0
               tmpok = $scope.StepZeroValid();
               if (!tmpok) {
                   validation.messages.push('<b>Step 1: </b>You must check almost one language.<br>');
               }
               validation.result = validation.result & tmpok;

               //valid step 1
               tmpok = $scope.StepOneValid();
               if (!tmpok) {
                   if ($scope.dmcproduct.languages.english) {
                       validation.messages.push('<b>Step 1: </b>You must provide a name (english) for this tour.<br>');
                   }
                   if ($scope.dmcproduct.languages.spanish) {
                       validation.messages.push('<b>Step 1: </b>You must provide a name (spanish) for this tour.<br>');
                   }
               }
               validation.result = validation.result & tmpok;

               //valid step 2
               tmpok = $scope.StepTwoValid();
               if (!tmpok) {
                   validation.messages.push('<b>Step 2: </b>You need to add availability to show minimum prices.<br>');
               }
               validation.result = validation.result & tmpok;

               //valid step 4
               tmpok = $scope.StepFourValid();
               if (!tmpok) {
                   validation.messages.push('<b>Step 4: </b>your itinerary is not complete. ' +
                       'You must insert all the SLEEP PLACE and ' +
                       'the Hotel Categories<br>');
               }
               validation.result = validation.result & tmpok;

               //valid step 5
               tmpok = $scope.StepFiveValid();
               if (!tmpok) {
                   validation.messages.push('<b>Step 5: </b>You must upload some image in main description<br>');
               }
               validation.result = validation.result & tmpok;

               //valid step 6
               tmpok = $scope.StepSixValid();
               if (!tmpok) {
                   validation.messages.push('<b>Step 6: </b>You must provide some tags to improve searchs<br>');
               }
               validation.result = validation.result & tmpok;

               tmpok = $scope.intFlightValid();
               if (!tmpok) {
                   validation.messages.push('<b>Step 4: </b>You must provide Arrival and Departure airports<br>');
               }
               validation.result = validation.result & tmpok;

               return validation;
           }



           //Helpers
           $scope.getcloudinaryimageurl = function (url, imagetype) {
               var climg = tools_service.cloudinaryUrls(url);
               return climg[imagetype];
           }

           $scope.logchange = function ($event) {
               $log.info('logchange',$event)
           }

           function validateLastDayItinerary() {
               var ok = false;
               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       if ($scope.dmcproduct.itinerary[i].lastday) {
                           ok = true;
                       }
                   }
               }
               return ok;
           }

           function validateitinerary() {
               
               var res = {
                   result: true,
                   messages: []
               };
               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       if (!$scope.dmcproduct.itinerary[i].lastday) {
                           if ($scope.dmcproduct.itinerary[i].sleepcity != null && 
                        		   $scope.dmcproduct.itinerary[i].sleepcity.city != null &&
                               $scope.dmcproduct.itinerary[i].sleepcity.city != '') {
                               if ($scope.dmcproduct.itinerary[i].hotel.category == null ||
                                   $scope.dmcproduct.itinerary[i].hotel.category == '') {
                                   res.result = false;
                                   res.messages.push('Select one category for the hotel in day ' + (i + 1));
                               }
                           }
                           else {
                               res.result = false;
                               res.messages.push('Day ' +
                                   $scope.dmcproduct.itinerary[i].daynumber +
                                   ' needs to add a sleep place');
                           }
                       }
                   }
               }
               else {
                   res.result = false;
                   res.messages.push('The number of days can not be 0');
               }
               return res;

           }

           $scope.needsLastDayItinerary = function () {
               var ok = true;
               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       if ($scope.dmcproduct.itinerary[i].lastday == true) {
                           ok = false;
                       }
                   }
               }
               return ok & $scope.StepFourVisible;
           }

           //// **************************** CALENDAR AND DATE METHODS ***************************** //
           //// **************************** this is a really headache ***************************** //
           //// **************************** do not touch if you're not sure what are you doing..*** //
           //THIS IS OK
           function buildAnEmptyCalendar() {
        	
               var today = new Date();

               var monthname = _getMonthNameEnglish(today.getMonth());

               $scope.calendar.currentmonthnumber = today.getMonth();
               $scope.calendar.currentmonth = monthname;

               var first = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);

               var iterate = first;
               var weekindex = 0;
               var startflag = true;

               for (var i = 1; i <= 31; i++) {

                   var theday = new Date(iterate.getFullYear(), iterate.getMonth(), iterate.getDate(), 0, 0, 0, 0);

                   var day = _getDayOfWeek(iterate.getDay());
                   var weekindex = getWeekOfMonth(iterate);
                   var week = _getWeekName(weekindex);

                   $scope.calendar[week][day].date = theday;
                   $scope.calendar[week][day].number = theday.getDate();
                   $scope.calendar[week][day].rooms = {
                       single: {
                           price: 0
                       },
                       double: {
                           price: 0
                       },
                       triple: {
                           price: 0
                       },
                       other: {
                           price: 0
                       },
                       currency: '€ euro'
                   }
                   //iterate the day
                   var inc = iterate.setDate(i);
                   iterate = new Date(inc);
               }
           }
           function _reset_calendar() {
               $scope.calendar.currentmonth = '';
               $scope.calendar.currentmonthnumber = 0;
               for (var i = 1; i < 7; i++) {
                   for (var d = 0; d < 7; d++) {
                       var day = _getDayOfWeek(d);
                       var week = _getWeekName(i);
                       $scope.calendar[week][day].date = null;
                       $scope.calendar[week][day].number = '';
                       $scope.calendar[week][day].available = false;
                       $scope.calendar[week][day].rooms = {
                           single: {
                               price: 0
                           },
                           double: {
                               price: 0
                           },
                           triple: {
                               price: 0
                           },
                           other: {
                               price: 0
                           },
                           currency: '€ euro'
                       }
                   }
               }
           }

           //THIS IS OK
           function buildAMonthCalendar(year, month) {
               var currentdate = new Date(year, month, 1, 0, 0, 0, 0);
               var monthname = _getMonthNameEnglish(currentdate.getMonth());

               $scope.calendar.currentmonthnumber = currentdate.getMonth();
               $scope.calendar.currentmonth = monthname;
               $scope.calendar.firstdaymonth = new Date(year, month, 1);

               var iterate = new Date(year, month, 1);
               var last = new Date(year, month, 1);
               last.setMonth(month + 1);

               weekindex = 0;
               var startflag = true;

               while (last > iterate) {
                   var day = _getDayOfWeek(iterate.getDay());
                   var weekindex = getWeekOfMonth(iterate);
                   var week = _getWeekName(weekindex);

                   $scope.calendar[week][day].date =
                       new Date(
                           iterate.getFullYear(),
                           iterate.getMonth(),
                           iterate.getDate()
                       );
                   $scope.calendar[week][day].number = iterate.getDate();
                   $scope.calendar[week][day].rooms = {
                       single: {
                           price: 0
                       },
                       double: {
                           price: 0
                       },
                       triple: {
                           price: 0
                       },
                       other: {
                           price: 0
                       },
                       currency: '€ euro'
                   }
                   iterate.setDate(iterate.getDate() + 1);
                   
               }
               
           }

           //*************************** New Availability Managing Methods...
           function buildAvailabilityRange(newrange) {
               if (newrange) {
                   var start = new Date(newrange.from.getFullYear(), newrange.from.getMonth(), newrange.from.getDate());
                   var end = new Date(newrange.to.getFullYear(), newrange.to.getMonth(), newrange.to.getDate());
                   var iterate = new Date(newrange.from.getFullYear(), newrange.from.getMonth(), newrange.from.getDate());
                   //start the road...
                   while (iterate <= end) {
                       //which year:
                       var indexyear = _indexOfYear(iterate.getFullYear());
                       //check we've found the availability for thuis year...
                       if (indexyear == -1) {
                           //if not add one...
                           $scope.dmcproduct.availability.push(_getNewAvailForYear(iterate.getFullYear()));
                           //..and get the index
                           indexyear = _indexOfYear(iterate.getFullYear());
                       }
                       //which month: 
                       var monthname = _getMonthNameEnglish(iterate.getMonth());
                       //which dayofweek
                       var day = _getDayOfWeek(iterate.getDay());
                       //which week:
                       var weekindex = getWeekOfMonth(iterate);
                       var week = _getWeekName(weekindex);

                       //now... find the day in the availability matrix...
                       var indexday = _indexOfDay(iterate, $scope.dmcproduct.availability[indexyear]);
                       if (indexday > -1) {
                           //the day is finded in the matrix...
                           //lets update...
                           if (newrange[day] == true) {
                               //is a day from week selected...
                               //manipulate....
                               if (newrange.available == true) {
                                   $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].date = iterate.toString();
                                   $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].day = iterate.getDate();
                                   $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].available = true;
                                   $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].rooms =
                                       newrange.rooms;
                                   //Updated!!
                               }
                               else {
                                   //we have to remove this day...
                                   $scope.dmcproduct.availability[indexyear][monthname].availability.splice(indexday, 1);
                                   //done!
                               }
                           }
                       }
                       else {
                           //this day is not finded in the matrix...
                           //check if we have to add...
                           if (newrange[day] == true) {
                               if (newrange.available == true) {
                                   var range = {
                                       date: iterate.toString(),
                                       day: iterate.getDate(),
                                       publishedDate: new Date(),
                                       available: true,
                                       rooms: newrange.rooms
                                   }
                                   //push the day in availability matrix...
                                   $scope.dmcproduct.availability[indexyear][monthname].availability.push(range);
                                   //done!
                               }
                           }
                       }
                       //next day...
                       iterate.setDate(iterate.getDate() + 1);
                   }
               }
           }

           /**
            * funcion que contruye el calendario para el dia en funcion del producto seleccionado
            */
           function setAvailabilityForDay(date) {        	   
               //find the day in availability...
               if (date) {
                   //find year...
                   var indexyear = _indexOfYear(date.getFullYear());
                   //which month: 
                   var monthname = _getMonthNameEnglish(date.getMonth());
                   //find day...
                   var indexday = _indexOfDay(date, $scope.dmcproduct.availability[indexyear]);
                   if (indexday > -1) {
                       //we've found the day...
                       var av = $scope.dmcproduct.availability[indexyear][monthname].availability[indexday];
                       //update the calendar...
                       //get possitions..
                       var day = _getDayOfWeek(date.getDay());
                       var weekindex = getWeekOfMonth(date);
                       var week = _getWeekName(weekindex);
                       $scope.calendar[week][day].available = av.available;
                       $scope.calendar[week][day].rooms = av.rooms;
                   }
                   else {
                       //this day is not in availability...
                       //nothing to be done...
                   }
               }
           }

           function setAvailabilityInCalendar(year, month) {

               if ($scope.dmcproduct.availability != null && $scope.dmcproduct.availability.length > 0) {
                   var start = new Date(year, month, 1);
                   var end = new Date(year, month, 1);
                   end.setMonth(start.getMonth() + 1);

                   var iterate = new Date(year, month, 1);
                   var indexyear = _indexOfYear(year);
                   if (indexyear > -1) {
                       //lets iterate...
                       while (iterate < end) {
                           //which
                           setAvailabilityForDay(iterate);
                           iterate.setDate(iterate.getDate() + 1);
                       }
                   }


               }

           }

           function _indexOfYear(year) {
               var index = -1;
               if ($scope.dmcproduct.availability != null && $scope.dmcproduct.availability.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.availability.length; i++) {
                       if ($scope.dmcproduct.availability[i].year == year) {
                           index = i;
                           break;
                       }
                   }
               }
               return index;
           }
           function _indexOfDay(date, availyear) {
               var index = -1;
               var monthname = _getMonthNameEnglish(date.getMonth());
               var avails = availyear[monthname].availability;


               if (avails != null && avails.length > 0) {
                   for (var i = 0; i < avails.length; i++) {

                       if (avails[i].day == date.getDate()) {
                           index = i;
                           break;
                       }

                       //if (avails[i].date instanceof Date) {
                       //    if (date.getDate() == avails[i].date.getDate() &&
                       //              date.getMonth() == avails[i].date.getMonth()
                       //                 && date.getFullYear() == avails[i].date.getFullYear()) {
                       //        index = i;
                       //        console.log('dia encontrado...' + i);
                       //        break;
                       //    }
                       //}
                       //else {
                       //    if (avails[i] != null && avails[i].date != null && avails[i].date != '') {
                       //        var avdate = new Date(avails[i].date.split('T')[0]);
                       //        console.log(avdate);
                       //        if (date.getDate() == avdate.getDate() &&
                       //              date.getMonth() == avdate.getMonth()
                       //                 && date.getFullYear() == avdate.getFullYear()) {
                       //            index = i;
                       //            console.log('dia encontrado...' + i);
                       //            break;
                       //        }
                       //    }
                       //}


                   }
               }
               return index;
           }
           function getDayEnabledClass(calendarday) {
               if (calendarday.rooms.single.price > 0 |
                   calendarday.rooms.single.price > 0 |
                   calendarday.rooms.single.price > 0 |
                   calendarday.rooms.single.price > 0) {
                   return 'enabled';
               }
               else { return ''; }
           }
           function _getMonthNameSpanish(monthindex) {
               if (monthindex == 0) { return 'Enero'; }
               if (monthindex == 1) { return 'Febrero'; }
               if (monthindex == 2) { return 'Marzo'; }
               if (monthindex == 3) { return 'Abril'; }
               if (monthindex == 4) { return 'Mayo'; }
               if (monthindex == 5) { return 'Junio'; }
               if (monthindex == 6) { return 'Julio'; }
               if (monthindex == 7) { return 'Agosto'; }
               if (monthindex == 8) { return 'Septiembre'; }
               if (monthindex == 9) { return 'Octubre'; }
               if (monthindex == 10) { return 'Noviembre'; }
               if (monthindex == 11) { return 'Diciembre'; }
           }
           function _getMonthNameEnglish(monthindex) {
               if (monthindex == 0) { return 'January'; }
               if (monthindex == 1) { return 'February'; }
               if (monthindex == 2) { return 'March'; }
               if (monthindex == 3) { return 'April'; }
               if (monthindex == 4) { return 'May'; }
               if (monthindex == 5) { return 'June'; }
               if (monthindex == 6) { return 'July'; }
               if (monthindex == 7) { return 'August'; }
               if (monthindex == 8) { return 'September'; }
               if (monthindex == 9) { return 'October'; }
               if (monthindex == 10) { return 'November'; }
               if (monthindex == 11) { return 'December'; }
           }
           function _getWeekName(weekindex) {
               if (weekindex == 1) { return 'firstweek'; }
               if (weekindex == 2) { return 'secondweek'; }
               if (weekindex == 3) { return 'thirdweek'; }
               if (weekindex == 4) { return 'fourthweek'; }
               if (weekindex == 5) { return 'fifthweek'; }
               if (weekindex == 6) { return 'sixthweek'; }
           }
           function _getDayOfWeek(dayindex) {
               if (dayindex == 0) return 'sunday';
               if (dayindex == 1) return 'monday';
               if (dayindex == 2) return 'tuesday';
               if (dayindex == 3) return 'wednesday';
               if (dayindex == 4) return 'thursday';
               if (dayindex == 5) return 'friday';
               if (dayindex == 6) return 'saturday';

           }
           function getWeekOfMonth(adate) {
               var first = new Date(adate.getFullYear(), adate.getMonth(), 1, 0, 0, 0, 0);
               var iterator = first;
               var week = 1;
               for (var i = 1; i <= adate.getDate() ; i++) {
                   iterator.setDate(i);
                   if (adate.getDate() == iterator.getDate()) {
                       break;
                   }
                   if (iterator.getDay() == 0) {
                       //sunday..
                       week++;
                   }
               }
               return week;
           };

           //// **************************** CALENDAR AND DATE METHODS ***************************** //
           //// **************************** watch out what are you doing... *********************** //
           //// **************************** do not touch if you're not sure what are you doing..*** //
           //*************************** End New Availability Managing Methods...

           function _getNewAvailDay(date, available, pricesingle, pricedouble, pricetriple, priceother, currency) {
               var day = {
                   date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                   available: available,
                   rooms: {
                       single: {
                           price: pricesingle
                       },
                       double: {
                           price: pricedouble
                       },
                       triple: {
                           price: pricetriple
                       },
                       other: {
                           price: priceother
                       },
                       currency: currency
                   }
               }
           }

           function _getNewAvailForYear(year) {
               var avail = {
                   name: year,
                   publishedDate: new Date(),
                   year: year,
                   January: {
                       availability: []
                   },
                   February: {
                       availability: []
                   },
                   March: {
                       availability: []
                   },
                   April: {
                       availability: []
                   },
                   May: {
                       availability: []
                   },
                   June: {
                       availability: []
                   },
                   July: {
                       availability: []
                   },
                   August: {
                       availability: []
                   },
                   September: {
                       availability: []
                   },
                   October: {
                       availability: []
                   },
                   November: {
                       availability: []
                   },
                   December: {
                       availability: []
                   }
               }
               return avail;

           }

           

           function _syncChangesToServer(callback, errorcallback) {

               $scope.serverdmcproduct.name = $scope.dmcproduct.name;
               $scope.serverdmcproduct.title = $scope.dmcproduct.title;
               $scope.serverdmcproduct.title_es = $scope.dmcproduct.title_es;
               $scope.serverdmcproduct.description_en = $scope.dmcproduct.description_en;
               $scope.serverdmcproduct.description_es = $scope.dmcproduct.description_es;
               $scope.serverdmcproduct.languages = $scope.dmcproduct.languages;
               $scope.serverdmcproduct.productimage = $scope.dmcproduct.productimage;
               $scope.serverdmcproduct.location = $scope.dmcproduct.location;
               $scope.serverdmcproduct.code = $scope.dmcproduct.code;
               $scope.serverdmcproduct.publishState = $scope.dmcproduct.publishState;
               $scope.serverdmcproduct.publishedDate = $scope.dmcproduct.publishedDate;
               $scope.serverdmcproduct.price = $scope.dmcproduct.price;
               $scope.serverdmcproduct.included = $scope.dmcproduct.included;
               $scope.serverdmcproduct.productimage = $scope.dmcproduct.productimage;
               $scope.serverdmcproduct.itinerary = $scope.dmcproduct.itinerary;
               $scope.serverdmcproduct.availability = $scope.dmcproduct.availability;
               $scope.serverdmcproduct.keys = $scope.dmcproduct.keys;
               $scope.serverdmcproduct.tags = $scope.dmcproduct.tags;
               $scope.serverdmcproduct.productvalid = $scope.dmcproduct.productvalid;
               $scope.serverdmcproduct.adminsave = $scope.dmcproduct.adminsave;
               $scope.serverdmcproduct.release = $scope.dmcproduct.release;
               $scope.serverdmcproduct.important_txt_en = $scope.dmcproduct.important_txt_en;
               $scope.serverdmcproduct.important_txt_es = $scope.dmcproduct.important_txt_es;               
               $scope.serverdmcproduct.flights = $scope.dmcproduct.flights;
               $scope.serverdmcproduct.flightsdmc = $scope.dmcproduct.flightsdmc;
               if ($scope.dmcproduct.pvp != null) {
                   $scope.serverdmcproduct.pvp = { keep : $scope.dmcproduct.pvp.keep };
               }
               else {
                   $scope.dmcproduct.pvp = {
                       keep: ($scope.sessiondmc.membership != null && $scope.sessiondmc.membership.pvp != null) ?
                           $scope.sessiondmc.membership.pvp.keep || false : false
                   };
                   $scope.serverdmcproduct.pvp = { keep: $scope.dmcproduct.pvp.keep };
               }
               if($scope.dmcproduct.categoryname != null && $scope.dmcproduct.categoryname != undefined){
                  $scope.serverdmcproduct.categoryname = {
                    label_es : $scope.dmcproduct.categoryname.label_es,
                    label_en : $scope.dmcproduct.categoryname.label_en
                  }
               }
               else{            	
            	   $scope.serverdmcproduct.categoryname=null;
               }
               
               console.log('Lets save product...');
               //$scope.sessiondmc = $scope.dmcproduct.dmc;
               $scope.serverdmcproduct.dmc = $scope.sessiondmc;
               $scope.serverdmcproduct.dmccode = $scope.sessiondmc.code;
               console.log($scope.serverdmcproduct);

               delete $scope.serverdmcproduct['__v'];
               $scope.serverdmcproduct = pushcitiesandcountries($scope.serverdmcproduct);
               var rq = {
                   command: 'save',
                   service: 'api',
                   request: {
                       data: $scope.serverdmcproduct,
                       collectionname: 'DMCProducts',
                       populate: [
                           { path: 'dmc', populate: [{ path: 'user', model: 'Users' }] },
                           { path: 'sleepcountry' },
                           { path: 'departurecountry' },
                           { path: 'stopcountry' },
                           { path: 'sleepcity' },
                           { path: 'departurecity' },
                           { path: 'stopcities' }],
                       query : { code: $scope.serverdmcproduct.code }
                   }
               };

               var rqCB = yto_api.send(rq);

               rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                   $scope.serverdmcproduct = rsp;
                   $scope.dmcproduct = rsp;
                   callback != null ? callback(rsp) : null;
               });
               //on response noOk
               rqCB.on(rqCB.onerroreventkey, function (err) {
                   $log.error("error saving product");
                   $log.error(err);
                   errorcallback != null ? errorcallback(err) : null;
               });

               return rqCB;
           }
           function _syncChangesToModel(callback) {
               $scope.dmcproduct.name = $scope.serverdmcproduct.name;
               $scope.dmcproduct.title = $scope.serverdmcproduct.title;
               $scope.dmcproduct.title_es = $scope.serverdmcproduct.title_es;
               $scope.dmcproduct.description_en = $scope.serverdmcproduct.description_en;
               $scope.dmcproduct.description_es = $scope.serverdmcproduct.description_es;
               $scope.dmcproduct.important_txt_en = $scope.serverdmcproduct.important_txt_en;
               $scope.dmcproduct.important_txt_es = $scope.serverdmcproduct.important_txt_es;

               if ($scope.serverdmcproduct.languages != null) {
                   $scope.dmcproduct.languages = {
                       english: $scope.serverdmcproduct.languages.english,
                       spanish: $scope.serverdmcproduct.languages.spanish
                   }
               }
               else {
                   $scope.dmcproduct.languages.english = false;
                   $scope.dmcproduct.languages.spanish = false;
               }
               $scope.dmcproduct.release = $scope.serverdmcproduct.release;
               $scope.dmcproduct.productvalid = $scope.serverdmcproduct.productvalid;
               $scope.dmcproduct.code = $scope.serverdmcproduct.code;
               $scope.dmcproduct.publishedDate = $scope.serverdmcproduct.publishedDate;
               $scope.dmcproduct.publishState = $scope.serverdmcproduct.publishState;
               $scope.dmcproduct.productimage = $scope.serverdmcproduct.productimage;
               $scope.dmcproduct.location = $scope.serverdmcproduct.location;
               $scope.dmcproduct.price = $scope.serverdmcproduct.price;
               $scope.dmcproduct.included = $scope.serverdmcproduct.included;
               $scope.dmcproduct.availability = $scope.serverdmcproduct.availability;
               $scope.dmcproduct.itinerary = $scope.serverdmcproduct.itinerary;
               // fix migration angular 1.2 to 1.4 
               if ($scope.serverdmcproduct.pvp != null) {
                   $scope.dmcproduct.pvp = { keep: $scope.serverdmcproduct.pvp.keep || false };
               }
               else {
                   $scope.serverdmcproduct.pvp = {
                       keep: ($scope.sessiondmc.membership != null && $scope.sessiondmc.membership.pvp != null) ?
                           $scope.sessiondmc.membership.pvp.keep || false : false
                   };
                   $scope.dmcproduct.pvp = { keep: $scope.serverdmcproduct.pvp.keep || false };
               }
               if ($scope.serverdmcproduct.included.trip.minpaxoperate != undefined){
                  $scope.dmcproduct.included.trip.minpaxoperate =  $scope.serverdmcproduct.included.trip.minpaxoperate.toString();
               }
               if ($scope.serverdmcproduct.categoryname != null && $scope.serverdmcproduct.categoryname != undefined){
                 $scope.dmcproduct.categoryname = {
               		  label_es : $scope.serverdmcproduct.categoryname.label_es,
               		  label_en : $scope.serverdmcproduct.categoryname.label_en
                  }
                }
               
               $scope.dmcproduct.keys = $scope.serverdmcproduct.keys;
               if ($scope.serverdmcproduct.tags == null ||
                   $scope.serverdmcproduct.tags.length == 0) {
                   console.log('transfer tags');
                   if ($scope.serverdmcproduct.keys != null && $scope.serverdmcproduct.keys.length > 0) {
                       $scope.dmcproduct.tags = [];
                       for (var i = 0; i < $scope.serverdmcproduct.keys.length; i++) {
                           var tg = $scope.serverdmcproduct.keys[i];
                           var ntg = {
                               label: tg.title,
                               value: tg.title
                           }
                           $scope.dmcproduct.tags.push(ntg);
                       }
                   }
               } else {
                   $scope.dmcproduct.tags = $scope.serverdmcproduct.tags;
               }
               $scope.dmcproduct.dmc = dmcdata;
               $scope.dmcproduct.productimage = $scope.serverdmcproduct.productimage;
               $scope.dmcproduct.flights = $scope.serverdmcproduct.flights;
               $scope.dmcproduct.flightsdmc = $scope.serverdmcproduct.flightsdmc;
               console.log($scope.dmcproduct);
               if (callback) {
                   callback();
               }
           }
           //Helper Methods

           function printRoomPrices(calendarday) {
               var html = '';
               if (calendarday.rooms.single.price > 0) {
                   html += '<em>p/p single ' + calendarday.rooms.single.price + '</em>';
               }
               if (calendarday.rooms.single.price > 0) {
                   html += '<em>p/p double ' + calendarday.rooms.double.price + '</em>';
               }
               if (calendarday.rooms.single.price > 0) {
                   html += '<em>p/p triple ' + calendarday.rooms.triple.price + '</em>';
               }
               if (calendarday.rooms.single.price > 0) {
                   html += '<em>p/p other ' + calendarday.rooms.other.price + '</em>';
               }
               return html;
           };






           function findHotelCategory(categorytext) {
               var cat = null;
               
               if ($scope.availablehotelcategory) {
                   for (var i = 0; i < $scope.availablehotelcategory.length; i++) {
                       if ($scope.availablehotelcategory[i].text == categorytext) {
                           cat = $scope.availablehotelcategory[i];
                           break;
                       }
                   }
               }
               return cat;
           }

           $scope.selectedlanguage = { language: 'spanish' };
           $scope.selectedcategory = { category: '5*', text: '5*' };


           $scope.changehotelcategory = function (selection, thescope) {
               
               thescope = selection.category;
           }
           $scope.changelanguage = function (selection, scope) {
               
               thescope = selection.language;
           }

           $scope.availablemonths = [];
           $scope.selectnewmonth = { year: new Date().getFullYear(), monthindex: new Date().getMonth() };
           $scope.newmonthselected = function (select) {
               
               _reset_calendar();
               buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
           }
        
        $scope.setnewmonth = function (year, month) {
            var d = new Date(year, month, 1);
            var m = _getAvailableMonth(d.getFullYear(), d.getMonth());
            console.log(m);
            if (m != null) {
                $scope.selectnewmonth = m;
            }
            
            _reset_calendar();
            buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
            setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);

        }

           $scope.addmonth = function () {
               var d = new Date($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex, 1);
               d.setMonth(d.getMonth() + 1);
               var m = _getAvailableMonth(d.getFullYear(), d.getMonth());
               
               if (m != null) {
                   $scope.selectnewmonth = m;
               }

               _reset_calendar();
               buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               //_setAvailInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
           }

           $scope.removemonth = function () {
               var d = new Date($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex, 1);
               d.setMonth(d.getMonth() - 1);
               var m = _getAvailableMonth(d.getFullYear(), d.getMonth());
               
               if (m != null) {
                   $scope.selectnewmonth = m;
               }

               _reset_calendar();
               buildAMonthCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               setAvailabilityInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);
               //_setAvailInCalendar($scope.selectnewmonth.year, $scope.selectnewmonth.monthindex);

           }

           function _buildAvailableMonths() {
               var today = new Date();
               var lastmonth = new Date(today.getFullYear() + 2, 11, 1, 0, 0, 0, 0);


               var iterator = new Date(today.getFullYear(), 0, 1);
               var tt = true;
               while (lastmonth >= iterator) {
                   var availmonth = {
                       monthname: _getMonthNameEnglish(iterator.getMonth()),
                       monthindex: iterator.getMonth(),
                       year: iterator.getFullYear(),
                       selectiontext: _getMonthNameEnglish(iterator.getMonth()) + ' ' + iterator.getFullYear()
                   };

                   if (tt) { $scope.selectnewmonth = availmonth; tt = false; }

                   $scope.availablemonths.push(availmonth);
                   iterator.setMonth(iterator.getMonth() + 1)


               }




           }

           function _getAvailableMonth(year, month) {
               var avmonth = null;
               if ($scope.availablemonths) {
                   for (var i = 0; i < $scope.availablemonths.length; i++) {
                       if ($scope.availablemonths[i].year == year &&
                           $scope.availablemonths[i].monthindex == month) {
                           avmonth = $scope.availablemonths[i];
                           break;
                       }
                   }
               }
               return avmonth;
           }

           $scope.sessiondmc = null;
           function _getsession() {

               var token = yto_session_service.currentSession();
               if (token != null && token.user != null) {
                   if (token.user.isAdmin) {
                       $scope.dmcproduct.adminsave = true; 
                   }
                   if (token.user.isTraveler) {
                       window.location = '/';
                   }
               }
               else {
                   window.location = '/';
               }
           }

           //end login and session

           //Preview
           $scope.showTransportsIncluded = function () {

               var tr = [];
               var html = '';
               if ($scope.dmcproduct.included.transportbetweencities.included) {
                   if ($scope.dmcproduct.included.transportbetweencities.boat) {
                       tr.push('Boat/Ferry');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.van) {
                       tr.push('Van/Minivan');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.truck) {
                       tr.push('Truck');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.train) {
                       tr.push('Train');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.bus) {
                       tr.push('Bus');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.domesticflight) {
                       tr.push('Domestic flight');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.fourxfour) {
                       tr.push('4x4');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.privatecarwithdriver) {
                       tr.push('Private car with driver');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.privatecarwithdriverandguide) {
                       tr.push('Private car with driver and guide');
                   }
                   if ($scope.dmcproduct.included.transportbetweencities.other) {
                       tr.push('Other');
                   }
                   html = tr.join(', ');
               }
               return html;

           }

           function calculatePriceMinimumDates(from, to, availability) {
               var pricemin = 0;
               if (availability == null || availability.length == 0) {
                   return pricemin;
               }

               var monthstart = from.getMonth();
               var monthend = _getMonthNameEnglish(to.getMonth());
               var iterate = new Date(from.getFullYear(), from.getMonth(), 1);

               while (iterate <= to) {
                   var indexyear = _indexOfYear(iterate.getFullYear());
                   if (indexyear > -1) {
                       for (var j = indexyear ; j < availability.length; j++) {
                           for (var i = monthstart; i <= 11; i++) {
                               var month = _getMonthNameEnglish(i);
                               if (availability[j] != null) {
                                   var avails = availability[j][month].availability;
                                   if (avails != null && avails.length > 0) {
                                       for (var jj = 0; jj < avails.length; jj++) {

                                           if (avails[jj].rooms.double.price > 0) {
                                               if (pricemin == 0) {
                                                   pricemin = avails[jj].rooms.double.price;
                                               }
                                               else {
                                                   if (avails[jj].rooms.double.price < pricemin) {
                                                       pricemin = avails[jj].rooms.double.price;
                                                   }
                                               }
                                           }
                                       }
                                   }
                               }
                           }
                       }
                   }


                   return pricemin;
               }
           }

           $scope.calculatePriceMinimum = function () {
               var pricemin = 0;
               var today = new Date();
               var monthstart = 0;

               var indexyear = _indexOfYear(today.getFullYear());

               if ($scope.dmcproduct.availability != null &&
                   $scope.dmcproduct.availability.length > 0) {
                   //console.log('get the min price...');
                   for (var j = 0 ; j < $scope.dmcproduct.availability.length; j++) {
                       for (var i = monthstart; i <= 11; i++) {
                           var month = _getMonthNameEnglish(i);
                           

                           if ($scope.dmcproduct.availability[j] != null) {
                               
                               if ($scope.dmcproduct.availability[j][month]) {
                                   if ($scope.dmcproduct.availability[j][month].availability) {
                                       //for every avail...
                                       var avails = $scope.dmcproduct.availability[j][month].availability;

                                       if (avails != null && avails.length > 0) {
                                           for (var jj = 0; jj < avails.length; jj++) {

                                               if (avails[jj].rooms.double.price > 0) {
                                                   if (pricemin == 0) {
                                                       pricemin = avails[jj].rooms.double.price;
                                                   }
                                                   else {
                                                       if (avails[jj].rooms.double.price < pricemin) {
                                                           pricemin = avails[jj].rooms.double.price;
                                                       }
                                                   }
                                               }
                                           }
                                       }

                                   }
                               }
                           }

                       }

                   }

               }
               return pricemin;
           }

           $scope.formatnumber = function (num) {
               return tools_service.formatNumber(num, 0);
           }

           $scope.showAllCities = function () {
               var cities = [];
               var html = '';
               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       var it = $scope.dmcproduct.itinerary[i];
                       if (it.departurecity != null && it.departurecity.city != '') {

                           if (cities.indexOf(it.departurecity.city.split(',')[0]) == -1) {
                               cities.push(it.departurecity.city.split(',')[0])
                           }
                       }
                       for (var j = 0; j < it.stopcities.length; j++) {
                           var cit = it.stopcities[j];
                           if (cities.indexOf(cit.city.split(',')[0]) == -1) {
                               cities.push(cit.city.split(',')[0]);
                           }
                       }
                       if (it.sleepcity != null && it.sleepcity.city != '') {

                           if (cities.indexOf(it.sleepcity.city.split(',')[0]) == -1) {
                               cities.push(it.sleepcity.city.split(',')[0])
                           }
                       }
                   }
               }
               html = cities.join(', ');
               return html;
           }

           $scope.showCities = function (itinerary) {
               var html = '';
               var cities = [];
               var arestops = false;
               if (itinerary) {
                   if (itinerary.departurecity != null && itinerary.departurecity.city != '') {

                       //if (cities.indexOf(itinerary.departurecity.city.split(',')[0]) == -1) {
                           
                       //}
                       var c = itinerary.departurecity.city;
                       //if (c.indexOf(',') == -1) {
                       //    if (itinerary.departurecity.location) {
                       //        c += ' (' + itinerary.departurecity.location.country + ')';
                       //    }
                       //}
                       cities.push(c);
                   }
                   if (itinerary.stopcities != null && itinerary.stopcities.length > 0) {
                       arestops = true;
                       for (var j = 0; j < itinerary.stopcities.length; j++) {
                           var cit = itinerary.stopcities[j];
                           var c = cit.city;
                           //if (c.indexOf(',') == -1) {
                           //    if (cit.location) {
                           //        c += ' (' + cit.location.country + ')';
                           //    }
                           //}

                           if (cities.indexOf(c) == -1) {
                               cities.push(c);
                           }
                       }
                   }
                   if (itinerary.sleepcity != null && itinerary.sleepcity.city != '') {
                       var c = itinerary.sleepcity.city;
                       //if (c.indexOf(',') == -1) {
                       //    if (itinerary.sleepcity.location) {
                       //        c += ' (' + itinerary.sleepcity.location.country + ')';
                       //    }
                       //}
                       if (arestops) {
                           cities.push(c);
                       }
                       else {
                           if (cities.indexOf(c) == -1) {
                               cities.push(c);
                           }
                       }
                   }


               }
               html = cities.join(' - ');
               return html;
           }

           $scope.arelanguages = function(language){
               var ok = false;
               if (language) {
                   if (language.spanish) {
                       ok = true;
                   }
                   if (language.english) {
                       ok = true;
                   }
                   if (language.french) {
                       ok = true;
                   }
                   if (language.german) {
                       ok = true;
                   }
                   if (language.italian) {
                       ok = true;
                   }
                   if (language.portuguese) {
                       ok = true;
                   }
               }
               return ok;
           }

           $scope.showLanguages = function (language) {
               var lang = [];
               var html = '';
               if (language) {
                   if (language.spanish) {
                       lang.push('spanish');
                   }
                   if (language.english) {
                       lang.push('english');
                   }
                   if (language.french) {
                       lang.push('french');
                   }
                   if (language.german) {
                       lang.push('german');
                   }
                   if (language.italian) {
                       lang.push('italian');
                   }
                   if (language.portuguese) {
                       lang.push('portuguese');
                   }
               }

               html = lang.join(', ');
               return html;

           }

           function _showHotelIncluded() {
               
               var hotel = this;
               var included = [];
               var html = '';
               if (hotel) {
                   if (hotel.breakfast) {
                       included.push('<span>Breakfast</span>');
                   }
                   if (hotel.lunch) {
                       if (hotel.lunchdrinks) {
                           included.push('<span>Lunch <em>(drinks included)</em></span>');
                       }
                       else { included.push('<span>Lunch</span>'); }
                   }
                   if (hotel.dinner) {
                       if (hotel.dinnerdrinks) {
                           included.push('<span>Dinner <em>(drinks included)</em></span>');
                       }
                       else {
                           included.push('<span>Dinner<(span>');
                       }
                   }
               }
               html = included.join(' - ');
               return html;
           }

           $scope.showItinerariesHotelIncluded = function () {
               var breakfastcount = 0;
               var lunchcount = 0;
               var dinnercount = 0;
               var html = '';
               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       var it = $scope.dmcproduct.itinerary[i];

                       if (it.hotel && it.hotel.breakfast) {
                           breakfastcount++;
                       }
                       if (it.hotel && it.hotel.lunch) {
                           lunchcount++;
                       }
                       if (it.hotel && it.hotel.dinner) {
                           dinnercount++;
                       }
                   }
               }
               var items = [];
               if (breakfastcount > 0) {
                   items.push(breakfastcount + ' Breakfast');
               }
               if (lunchcount > 0) {
                   items.push(lunchcount + ' Lunch');
               }
               if (dinnercount > 0) {
                   items.push(dinnercount + ' Dinner');
               }
               html = items.join(' - ');
               return html;
           }

           $scope.hasDrinks = function () {
               var ok = false;

               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       var it = $scope.dmcproduct.itinerary[i];
                       if (it.hotel && (it.hotel.lunchdrinks | it.hotel.dinnerdrinks)) {
                           ok = true;
                       }
                   }
               }
               return ok;
           }
           $scope.showItineraryDrinksIncluded = function () {

               var htmlyes = '(Drinks per itinerarary)';
               var htmlno = '(No drinks)';
               var rt = htmlno;
               if ($scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                   for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                       var it = $scope.dmcproduct.itinerary[i];
                       if (it.hotel.lunchdrinks | it.hotel.dinnerdrinks) {
                           rt = htmlyes;
                       }
                   }
               }
               return rt;
           }

           $scope.showActivitiesResume = function () {

           }

           $scope.autolanguage = function () {
               var lang_es = !$scope.dmcproduct.languages.spanish ? 'EN' : 'ES';
               var lang_en = !$scope.dmcproduct.languages.english ? 'ES' : 'EN';
               return lang_en || lang_es;
           }

           $scope.showPreviewEn = function () {

               return $scope.dmcproduct.languages.english;

           }
           $scope.showPreviewEs = function () {
               return $scope.dmcproduct.languages.spanish && (!$scope.dmcproduct.languages.english);
           }

           $scope.showActivityResume = function (activity) {
               var html = '';
               var items = [];
               if (activity) {
                   if (activity.group) {
                       items.push('in a group');
                   }
                   if (activity.individual) {
                       items.push('private');
                   }

                   if (activity.localguide) {
                       items.push('Local guide in ' + $scope.showLanguages(activity.language))
                   }

                   if (activity.ticketsincluded) {
                       items.push('tickets included');
                   }

                   html = items.join(' - ');

               }
               return html;
           }
           $scope.therearemeals = function (itinerary) {
               var ok = false;
               if (itinerary && itinerary.hotel) {
                   ok = itinerary.hotel.breakfast | itinerary.hotel.lunch | itinerary.hotel.dinner;
               }
               return ok;
           }

           /**
            *  Esta funcion rescata el producto indicado a mostrar y todos sus categorias
            *  
            *  NEW: si el producto es una categoria, rescato al producto padre
            */
          
           function _initFormPreloadedItinerary(itinerary) {
               if (itinerary != null && itinerary.length > 0) {
                   $scope.itinerarydays = itinerary.length;
                   for (var i = 0; i < itinerary.length; i++) {
                       itinerary[i].daynumber = i + 1;
                       itinerary[i].uuid = _generateUUID();
                       //itinerary[i].lastday = !itinerary[i].isnotlastday;
                       if (itinerary[i].image != null) {
                           if (itinerary[i].image.url != 'img/elements/img-empty.png'
                           && itinerary[i].image.url != '') {
                               itinerary[i].showimage = true;
                           }
                       }
                       else {
                           itinerary[i].image = { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' };
                           itinerary[i].showimage = false;
                       }
                       if (itinerary[i].image.url == 'img/elements/img-empty.png') {
                           itinerary[i].image.url =
                           'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
                       }

                       if (itinerary[i].hotel != null &&itinerary[i].hotel.incity == true) {
                           itinerary[i].hotel.locationkind = 'hotelcity';
                       }
                       if (itinerary[i].hotel != null &&itinerary[i].hotel.insurroundings == true) {
                           itinerary[i].hotel.locationkind = 'hotelsurr';
                       }

                       var cat = itinerary[i].hotel.category;
                       
                       var fcat = findHotelCategory(cat)
                       itinerary[i].hotel.selectedcategory = fcat;
                       

                       if (itinerary[i].activities && itinerary[i].activities.length > 0) {
                           for (var j = 0; j < itinerary[i].activities.length; j++) {
                               itinerary[i].activities[j].uuid = _generateUUID();
                               if (itinerary[i].activities[j].group) {
                                   itinerary[i].activities[j].activitykind = 'group';
                                   itinerary[i].activities[j].individual = false;
                               }
                               if (itinerary[i].activities[j].individual) {
                                   itinerary[i].activities[j].activitykind = 'individual';
                                   itinerary[i].activities[j].group = false;
                               }
                           }
                       }
                   }
               }
           }

           function _initFormPreloadedMainImage() {
               if ($scope.dmcproduct.productimage != null &&
                   $scope.dmcproduct.productimage.url != 'img/elements/img-empty.png') {
                   $scope.showmainimage = true;
               }
           }

           function _initFormPreloaded() {        	   
        	 
               //Start the form...
        	   
        	   //copia los cambios del producto recuperado al producto del scope
               _syncChangesToModel();
               _buildAvailableMonths();
               _reset_calendar();
               _removeDuplicateTags();
               _checkTags();
               _getCurrencies();
            //buildAnEmptyCalendar();

               buildAMonthCalendar(new Date().getFullYear(), new Date().getMonth());
            setAvailabilityInCalendar(new Date().getFullYear(), new Date().getMonth());
            $scope.setnewmonth(new Date().getFullYear(), new Date().getMonth());
               if ($scope.dmcproduct.itinerary) {
                   _initFormPreloadedItinerary($scope.dmcproduct.itinerary);
               }
               
               if ($scope.dmcproduct.included) {
                   if ($scope.dmcproduct.included.trip) {
                       if ($scope.dmcproduct.included.trip.privatetrip == true) {
                           $scope.included.tripisprivateorgroup = 'private';
                           $scope.dmcproduct.included.trip.grouptrip = false;
                       }
                       else {
                           $scope.included.tripisprivateorgroup = 'group';
                           $scope.dmcproduct.included.trip.privatetrip = false;
                       }
                   }
                   if ($scope.dmcproduct.included.driveguide == null) {
                       $scope.dmcproduct.included.driveguide = {
                           included: false,
                           language: {
                               spanish: false,
                               english: false,
                               french: false,
                               german: false,
                               italian: false,
                               portuguese: false
                           }
                       };
                   }
               }
               _initFormPreloadedMainImage();
               //show buttons and steps..
               $scope.StepZeroVisible = true;
               $scope.StepOneVisible = true;
               $scope.StepTwoVisible = true;
               $scope.StepThreeVisible = true;
               $scope.StepFourVisible = true;
               $scope.StepFiveVisible = true;
               $scope.StepSixVisible = true;
               $scope.StepSevenVisible = true;
               $scope.StepEightVisible = true;
               $scope.StepEightVisibleButtons = true;
               $scope.formvisible = true;
               $scope.mapUpdate();

               //alert("aaaa")
               loadingPage();
               $scope.workspaces = [
                       { id: 0, dmcproduct: $scope.dmcproduct, active: true } ];

               if ($scope.dmcproduct.relatedprograms != null && $scope.dmcproduct.relatedprograms.length > 0) {
                   for (var itCat = 0; itCat < $scope.dmcproduct.relatedprograms.length; itCat++) {
                       var dummyCat = {
                           id: itCat + 1,
                           dmcproduct: $scope.dmcproduct.relatedprograms[itCat],
                           active: false
                       }
                       console.log("Codigo de producto de la categoria: " + $scope.dmcproduct.relatedprograms[itCat].code);
                       $scope.workspaces.push(dummyCat);
                   }
               }

               $scope.$broadcast('program.reload', $scope.dmcproduct);
           }
           // Aqui se inicia la pagina - INICIO DE SESION
           _getTripTags(function(){  	   
               _getsession();
               $scope.serverdmcproduct = editiondata;
               $scope.dmcproduct = editiondata;
               $scope.serverdmcproduct.dmc = editiondata.dmc;
               $scope.serverdmcproduct.dmccode = dmcdata.code;
               $scope.dmcproduct.dmc = dmcdata;
               $scope.dmcproduct.dmccode = dmcdata.code;
               $scope.sessiondmc = dmcdata;
               $scope.preloaded = true;
               console.log(editiondata);
               _initFormPreloaded();
           });
           
           $scope.isAdmin = false; 
           function checkifIsAdmin() {
               var sess = yto_session_service.currentSession();
               if (sess.admin != null) {
                   if (sess.admin.code != null && sess.admin.code != '') {
                       $scope.isAdmin = true;
                       $scope.dmcproduct.adminsave = true;
                   }
               }
           }

           checkifIsAdmin();

           $scope.$watch('dmcproduct', function () {        	   
        	 
        	   
               window.onbeforeunload = function (event) {
            	   //controlo que no venga de un guardado
            	   if(!$scope.dmcproduct || !$scope.dmcproduct.noShowModal || $scope.dmcproduct.noShowModal == false){	            	   
	            	   
	                   var message = 'If you leave you will lose your changes.\r\n' +  
	                   'Are you sure you want to quit?\r\n' +  
	                   'You can save your program as a draft at the end of the page, or at the next step button.';
	                   if (typeof event == 'undefined') {
	                       event = window.event;
	                   }
	                   if (event) {
	                       event.returnValue = message;
	                   }
	                   return message;
	               }            	   
       		   }        	   
        	   
           }, true);

          // mount select for releases
          $scope.releasedays = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,28,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,60,90]; //(start in 3) for 45 days
          $scope.dmcproduct.release = 7;

          // controller de modal to new program by copy
          
          $scope.copyProgramName = "";

          $scope.open = function (size) {
            $scope.copyProgram = { name : $scope.dmcproduct.name};
            var modalInstance = $uibModal.open({
              templateUrl: 'copyProgramModal.html',
              controller: 'copyProgram',
              size: size,
              resolve: {
                content: function () {
                  return $scope.copyProgram;
                }
              }
            });

            modalInstance.result.then(function (newName) {
              $scope.copyProgramName = newName;
              $scope.copyModalCallback();
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
                //reject new copy...
                
            });
          };

          // *************************************************
          // a la vuelta de copiar el programa guardo la copia
          // *************************************************
          $scope.copyModalCallback = function(){
        	  console.log("** inicio copy");
              //$log.info('Modal close, new name: '+  $scope.copyProgramName);
              $scope.dmcproduct.code = '';
              $scope.dmcproduct.name = $scope.copyProgramName;
              $scope.dmcproduct.publishState = 'draft';
              
              tools_service.showPreloader($scope, 'show');
              // ****************************************************
              // 1) debo guardar mas categorias (ademas de la basica)
              // ****************************************************
              if($scope.workspaces!=null && $scope.workspaces.length > 1){
            	  
            	  // 1.1) ponemos los codigos de los productos categorias a nulo, para que se copien
	        	  angular.forEach($scope.workspaces, function(workspace) {
	                  workspace.dmcproduct.code = '';
	              }); 
           	   	             	   
           	    
           	   	  // 1.2) guardo el producto original, para tener el codigo en caso de no tenerlo
           	   	  _save_only(function (doc){
           	   	             		 
           	   		  //tools_service.showPreloader($scope, 'show');
           	   		  console.log("** Producto original guardado, code: "+doc.code);
           		   
           	   		  // 1.3) actualizo el producto de scope con el codigo obtenido 
           	   		  $scope.dmcproduct.code = doc.code;           	   		  
           	   		  $scope.dmcproduct.noShowModal = true;
           		   
           	   		  // 1.4) guardo las categorias de ese producto
           	   		  saveAllCategories(function (result) {
           	   			  //tools_service.showPreloader($scope, 'show');             		 
           	   			  console.log("** categorias del producto: "+doc.code+" guardadas.");
                                      if (result) {
                                          toaster.pop('success', 'Category has been saved',
                                              'All information was saved successfully', 3000);
                                          tools_service.showPreloader($scope, 'hide');
		           	   //			if($scope.isAdmin){
		         				  // window.location = '/omt-list/product';                        				   
		         			   //}
		         			   //else{
		         				  // window.location = '/dmc-programs';
		         			   //}
           	   			  }
           	   		  });
                 });           	   
              }         
              
              // *********************************************************
              // 2) si no tiene categorias adicionales, guardo el producto
              // *********************************************************
              else{                           
            	  _save_only(function (doc) {
                      console.log(doc);                         
                      $scope.dmcproduct.noShowModal = true;
                      toaster.pop('success', 'Category has been saved',
                          'All information was saved successfully', 3000);
                      tools_service.showPreloader($scope, 'hide');
	             //     if($scope.isAdmin){
	       				  // window.location = '/omt-list/product';                        				   
	       			   //}
	       			   //else{
	       				  // window.location = '/dmc-programs';
	       			   //}
                  });
              }
          }
          
          
          /*                    *\
                  Flights
          \*                    */

          // flag to block dmcproduct.flights
          $scope.blockflights = false;
          /**
           * @ngdoc method
           * @name onselecflightsdmc
           * @methodOf controller.DMCProductCtrl
           * @description 
           *
           * on chage actions check box admin to dmc flights
           * if val is true change dmcproduct.flights to false and disabled
           * @param {Boolean} val if is true checked if is false unchecked
           *     
           */
          $scope.onselecflightsdmc= function(val){
            if (val){
              $scope.dmcproduct.flights = false;
              $scope.blockflights = true;
            } else {
              $scope.blockflights = false;
            }
            $scope.dmcproduct.itinerary[0].flights = [];
            if ($scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1] != null){
              $scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1].flights = [];
            }
          }
          /**
           * @ngdoc method
           * @name onselecflights
           * @methodOf controller.DMCProductCtrl
           * @description 
           *
           * on chage actions check box admin to flights
           * if val is false change dmcproduct.itinerary[0] and 
           * dmcproduct.itinerary[dmcproduct.itinerary.length] 
           * to empty array
           * @param {Boolean} val if is true checked if is false unchecked
           *     
           */
          $scope.onselecflights= function(val){
            if (!val){
              $scope.dmcproduct.itinerary[0].flights = [];
              if ($scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1] != null){
                $scope.dmcproduct.itinerary[$scope.dmcproduct.itinerary.length-1].flights = [];
              }
            }
          }
          /**
           * @ngdoc method
           * @name getAirport
           * @methodOf controller.DMCProductCtrl
           * @description 
           *
           * Search airports in keystone list airports
           * @param {String} val string to search
           * @return {Object} array of objects with airports match      
           */
          $scope.getAirport = function(val) {
            if (val.length > 2){
              return $http.get($scope.urlapi+'cms/getAirports', {
              //return $http.get('http://localhost:3000/cms/getAirports', {
                params: {
                  search: val,
                }
              }).then(function(response){
            	  
            	  if(response != null && response.data!=null && response.data.length >0){
            	  
	                return response.data.map(function(item){
	                  item.label = "("+item.iata.toUpperCase()+") "+item.city+" - "+item.name
	                  return item
	                });
            	  }
            	  else{
            		  return "";
            	  }
              });
            }
          };
          // airport holders
          $scope.arrivalairportholder = '';
          $scope.departureairportholder = '';
          // flag arrival airport default false
          $scope.haveArrivalAirport = false;
          // flag departure airport default false
          $scope.haveDepartureAirport = false;
         /**
           * @ngdoc method
           * @name selectAirport
           * @methodOf controller.DMCProductCtrl
           * @description 
           *
           * add departure / arrival airport from itinerary
           * @param {Object} airport Airport from airport keystone list
           * @param  {Object} day  itineary day
           * @param  {String} type 2 options "arrival" or "departure"
           */
          $scope.selectAirport = function(airport, day, type){
            if (airport != "" && airport != null){
              $scope.haveArrivalAirport = (type == 'arrival')? true : false;
              $scope.haveDepartureAirport = (type == 'departure')? true : false;
              day.flights = [];
              day.needflights = false;
              day.flights.push ({[type] : airport});
              $scope.arrivalairportholder = '';
              $scope.departureairportholder = '';
            }
          }
         /**
           * @ngdoc method
           * @name deleteAirport
           * @methodOf controller.DMCProductCtrl
           * @description 
           *
           * removes departure / arrival airport from itinerary
           * @param  {Object} day  itineary day
           * @param  {String} type 2 options "arrival" or "departure"
           */
          $scope.deleteAirport = function(day, type){
            $scope.haveArrivalAirport = (type == 'arrival')? false : true;
            $scope.haveDepartureAirport = (type == 'departure')? false : true;
            day.flights = [];
            day.needflights = false;
            $scope.arrivalairportholder = '';
            $scope.departureairportholder = '';
          }

          // $scope.onSelectAirport = function($item, $model, $label, itinerayObj){
          //    console.log($item,"-$item");
          //    console.log( $model, "-$model");
          //    console.log ('itinerayObj',itinerayObj);
          //    console.log($label,"-$label");
          // }

          /*                *\
            Domestic flights
          \*                */

           /**
            * @ngdoc method
            * @name removeflights
            * @methodOf controller.DMCProductCtrl
            * @description 
            *
            * Removes all domestic flights from itinerary
            * @param  {Boolean} select (true: remove | false : do nothing )
            *         
            */
           $scope.removeflights = function (select) {
            if (select){
              for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                $scope.dmcproduct.itinerary[i].needflights = false;
                $scope.dmcproduct.itinerary[i].flights = [];
              }
            };
           }

           $scope.loadflights = function (action , itinerary) {
            if (action){
              itinerary.flights = [];
              itinerary.flights.push({departure: '', arrival: '', recommendedflight: ''})
            } else {
              itinerary.flights = [];
            }
           }

           $scope.deleteflights = function (index, itinerary) {
            itinerary.flights.splice(index, 1);
           }

           $scope.addflights = function(itinerary){
            itinerary.flights.push({departure: '', arrival: '', recommendedflight: ''})
           }


          /**
           * @ngdoc method
           * @name productNeedFlights
           * @methodOf controller.DMCProductCtrl
           * 
           * @description 
           * Check if we need to show domestic Flights
           * @param {Object} [itinerary] full itineray product
           * @return {Boolean} True if is necesary show
           */
          $scope.productNeedFlights = function (itinerary){
            return bookinghelpers.productNeedFlights(itinerary);
          }

          /*                    *\
              default vars maps
          \*                    */

          // markers holder
          $scope.markers = {};
          // flag to show map
          $scope.havemap = false;
          // flag to check if google maps ready 
          $scope.gmapsready = false;
          /*                    *\
                Map functions
          \*                    */
          /**
           * @ngdoc method
           * @name _getMarkers
           * @methodOf controller.DMCProductCtrl
           * 
           * @description 
           * helper get markers for google maps
           * @param {Object} [itinerary] full itineray product
           * @return {Object} Array of markers
           */
          function _getMarkers(itinerary) {
              return productpreviewhelpers.getMarkers(itinerary);
          }
          /**
           * @ngdoc method
           * @name mapUpdate
           * @methodOf controller.DMCProductCtrl
           * 
           * @description 
           * init maps in product preview 
           * 
           */
          $scope.mapUpdate = function(){
            var idmap = null;

            // Empty markers
            $scope.markers = [];
            // Add markers from itinerary to scope
            if ($scope.dmcproduct.itinerary.length > 0){
               $scope.markers = _getMarkers($scope.dmcproduct.itinerary);
            }

            if ($scope.markers.length && $scope.gmapsready){
              // enable map div
              $scope.havemap = true;

              if ($scope.showPreviewEn() && 
                  document.getElementById("map_en")){
                  idmap = "map_en"
                } else if ($scope.showPreviewEs() &&
                  document.getElementById("map_es")){
                  idmap = "map_es";
                }
              // trigger map load
              if (idmap)
                initMap($scope.markers, idmap);

            } else {
              $scope.havemap = false;
            }
          };

          // if not instence map because google delay
          google.maps.event.addDomListener(window, 'load', function(){
              $scope.gmapsready = true;
          });

          $scope.isTranslateEs = function(){
            var transActive = $cookies.googtrans;
            //console.log('transActive', transActive)
            if (transActive != undefined && transActive != null){
               return true 
            }else {
              return false
            }
          };
          loadingPage ('show');

       }]);




// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('copyProgram', function ($scope, $uibModalInstance, content) {

  $scope.productName = content.name + ' - copy';

  $scope.ok = function () {
    $uibModalInstance.close($scope.productName);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});