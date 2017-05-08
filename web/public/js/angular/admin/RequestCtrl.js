/**
 * @ngdoc controller
 * @name openMarketTravelApp.controller:affiliateRequestDetailCtrl
 * @requires $log
 * @requires $scope
 * @requires $filter
 * @requires toaster
 * @requires tools_service
 * @requires queryhelpers
 * @requires bookinghelpers
 * @description
 * 
 * Load query data in widget yto-request-detail.html
 */

app.controller('RequestCtrl', [
  '$log',
  '$scope',
  '$filter',
  'toaster',
    'tools_service',
    '$location',
  'queryhelpers',
    'bookinghelpers',
    'productpreviewhelpers',
    'pricehelpers',
    'yto_api',
    'yto_session_service', 
    'modals_service',
   function (
    $log,
    $scope,
    $filter,
    toaster,
    tools_service,
    $location,
    queryhelpers,
    bookinghelpers,
    productpreviewhelpers,
    pricehelpers,
    yto_api,
    yto_session_service,
    modals_service) {
    "use strict";

    $scope.exchanges = null;
    $scope.exchangeValue = function (value, currencySource, currencyTarget) {
        return pricehelpers.exchangeValue(value, currencySource, currencyTarget);
    }
    $scope.currentfee = 0;
       //show stuff ////////////////////////
    $scope.getResponses = function (query) {
        var num = 0;
        for (var i = 0; i < query.quotes.length; i++) {
            // $log.log(query.quotes[i].code);
            if (query.quotes[i].status == 'published' || query.quotes[i].status == 'win' || query.quotes[i].status == 'lost' || query.quotes[i].status == 'discard') {
                num++;
            }
        }
        return num;
    };
    $scope.getTotalDistribution = function (dmcresponse) {


        var text = '';
        if (dmcresponse.rooms && dmcresponse.rooms.single.quantity > 0) {
            text += dmcresponse.rooms.single.quantity + ' Single Room';
        }
        if (dmcresponse.rooms && dmcresponse.rooms.double.quantity > 0) {
            if (text != '') {
                text += ', ';
            }
            text += dmcresponse.rooms.double.quantity + ' Double Room';
        }
        if (dmcresponse.rooms && dmcresponse.rooms.triple.quantity > 0) {
            if (text != '') {
                text += ', ';
            }
            text += dmcresponse.rooms.triple.quantity + ' Triple Room';
        }
        if (dmcresponse.rooms && dmcresponse.rooms.quad.quantity > 0) {
            if (text != '') {
                text += ', ';
            }
            text += dmcresponse.rooms.quad.quantity + ' Quad Room';
        }
        return text;
    }
    $scope.getTotalPax = function () {

        var totalAdult = 0;
        var totalChild = 0;
        var text = '';

        if ($scope.query.roomDistribution && $scope.query.roomDistribution.length > 0) {
            for (var it = 0; it < $scope.query.roomDistribution.length; it++) {

                //recorro la lista de pasajeros
                if ($scope.query.roomDistribution[it].paxList && $scope.query.roomDistribution[it].paxList.length > 0) {
                    for (var itPax = 0; itPax < $scope.query.roomDistribution[it].paxList.length; itPax++) {

                        // comprobar si es ninio
                        if ($scope.query.roomDistribution[it].paxList[itPax].age < 12) {
                            totalChild++;
                        }
                        else {
                            totalAdult++;
                        }
                    }
                }
            }
        }
        text += 'They are ' + (totalAdult + totalChild) + ' pax: ' + totalAdult + ' adults';
        if (totalChild > 0) {
            if (totalChild > 1) {
                text += ' - ' + totalChild + ' children';
            }
            else {
                text += ' - ' + totalChild + ' child';
            }
        }
        return text;
    }

    /**          
     *  Devuelve el numero total de paxes de la respuesta (QUOTE) proporcionada por el dmc
     */
    function getNumberPax(dmcresponse) {

        var total = 0;
        if (dmcresponse && dmcresponse.rooms) {
            if (dmcresponse.rooms.single.quantity > 0) {
                total += dmcresponse.rooms.single.quantity;
            }
            if (dmcresponse.rooms.double.quantity > 0) {
                total += (dmcresponse.rooms.double.quantity * 2);
            }
            if (dmcresponse.rooms.triple.quantity > 0) {
                total += (dmcresponse.rooms.triple.quantity * 3);
            }
            if (dmcresponse.rooms.quad.quantity > 0) {
                total += (dmcresponse.rooms.quad.quantity * 4);
            }
        }

        if (total == 0) {
            console.log("ERROR numero total de pax es cero");
        }
        return total;
    }
       //QUOTE FACILITIES

    //*****************************
    //*** calendarios de fechas ***
    //*****************************
    //
    $scope.datePicker = {
        openedfrom: false,
        openedto: false
    }
    // $scope.openedfrom = false;
    // $scope.openedto = false;

    // evento para modificar la fecha de operation start
    $scope.openOperation = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $timeout(function () {
            $scope.datePicker.openedfrom = true;
        }, 50);
    };

    $scope.openValid = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $timeout(function () {
            $scope.datePicker.openedto = true;
        }, 50);
    };

    /**
     * funcion que comprueba que ha se ha introducido una fecha de validz
     */
    $scope.checkDateOperation = function ($event) {
        $scope.datePicker.openedfrom = false;
    };

    /**
     * funcion que comprueba que hay una semana mas con respecto a la fecha de operacion
     */
    $scope.checkDateValidUntil = function ($event) {
        $scope.datePicker.openedto = false;

        if ($scope.dmcresponse.quoteValidDate) {

            var numDays = daydiff(new Date(), $scope.dmcresponse.quoteValidDate);
            if (numDays < 7) {
                toaster.pop('error', 'The minimum validity is one week.',
                    'Please make sure the validation date is greater than one week.');
                $scope.dmcresponse.quoteValidDate = null;
            }
        }
    };


    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    /**
     * diferencia de dias entre dos fechas
     */
    function daydiff(first, second) {
        console.log("daydiff ");
        console.log("first: ", first);
        console.log("second: ", second);
        console.log("diferencia: ", (new Date(second) - new Date(first)) / (1000 * 60 * 60 * 24));
        return (new Date(second) - new Date(first)) / (1000 * 60 * 60 * 24);
    }

    $scope.quoteGetPaxes = function (quote) {
        var totalpaxes = 0;
        if (quote != null && quote.rooms != null) {
            var triple = 0;
            var double = 0;
            var single = 0;
            var quad = 0;
            quote.rooms.quad != null && quote.rooms.quad.quantity > 0 ? quad++ : null;
            quote.rooms.triple != null && quote.rooms.triple.quantity > 0 ? triple += quote.rooms.triple.quantity : null;
            quote.rooms.double != null && quote.rooms.double.quantity > 0 ? double += quote.rooms.double.quantity : null;
            quote.rooms.single != null && quote.rooms.single.quantity > 0 ? single += quote.rooms.single.quantity : null;
            totalpaxes = (quad * 4) + (double * 2) + (triple * 3) + (single * 1);
        }
        return totalpaxes;
    }

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.getItineraryDay = function (day) {
        return productpreviewhelpers.getItineraryDay(day);
    };

    $scope.toggle = function (aux) {
        eval("$scope." + aux + " = !$scope." + aux);
    };

    $scope.cancellQueryModal = function () {
        modals_service.openmodal('cancellquery', $scope);
    };
    $scope.$on('cancellqueryaffiliate', function (event) {
        _cancellQuery();
    }); 

    var _cancellQuery = function () {

        tools_service.showPreloader($scope, "show");


        var req = {
            query: { code: $scope.userquery.code },
            collectionname: 'UserQueries',
            newstatus: 'cancelled',
            statusdata: {
                cancelDate: new Date(),
                user: loginsession.user.email,
                byTraveler: false,
                reason: '--'
            }
        };

        var rq = {
            command: 'status',
            service: 'api',
            request: { statusrequest: req }
        };

        var rqCB = yto_api.send(rq);

        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            $scope.userquery = rsp;
            toaster.pop('success', "Peticion Cancelada", "Se ha cancelado correctamente.");
            tools_service.showPreloader($scope, "hide");
        });
        //on response noOk
        rqCB.on(rqCB.onerroreventkey, function (err) {
            tools_service.showPreloader($scope, "hide");
            console.log(err);
            toaster.pop('error', 'Status change', err);
        });
        return rqCB;
    }

    var _buildSummary = function (quote) {

        // get cant paxs
        var paxs = 0;
        if (quote.rooms != null && quote.rooms != undefined) {
            if (quote.rooms.single && quote.rooms.single.quantity > 0) {
                paxs += quote.rooms.single.quantity;
            }
            if (quote.rooms.double && quote.rooms.double.quantity > 0) {
                paxs += (2 * quote.rooms.double.quantity);
            }
            if (quote.rooms.triple && quote.rooms.triple.quantity > 0) {
                paxs += (3 * quote.rooms.triple.quantity);
            }
            if (quote.rooms.quad && quote.rooms.quad.quantity > 0) {
                paxs += (4 * quote.rooms.quad.quantity);
            }
        }
        //      // ninios (no cuentan van incluidos en las habitaciones)
        //      if(quote.children!= null && quote.children.length >0 ){
        //    	  paxs+=quote.children.length;    	  
        //      }
        quote.paxs = paxs;


        // get dmc
        for (var i = 0; i < $scope.userquery.dmcs.length; i++) {
            if ($scope.userquery.dmcs[i].code == quote.dmccode) {
                quote.dmc = $scope.userquery.dmcs[i];
            }
        };

        // get hotels
        // get meals      
        quote.hotels = []
        var meals = { breakfast: 0, lunch: 0, dinner: 0 };

        //recorro el itinerario para obtener categoria de hoteles y comidas
        if (quote.products !== null && quote.products !== undefined && quote.products.itinerary !== null && quote.products.itinerary !== undefined) {
            for (var i = 0; i < quote.products.itinerary.length; i++) {

                if (quote.products.itinerary[i].hotel.breakfast) {
                    meals.breakfast++
                }
                if (quote.products.itinerary[i].hotel.lunch) {
                    meals.lunch++
                }
                if (quote.products.itinerary[i].hotel.dinner) {
                    meals.dinner++
                }

                // 
                var toCheck = '';
                if (quote.products.itinerary[i].hotel.category == 'unclassified *') {
                    toCheck = 'otros alojamientos';
                } else {
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

        if (meals.breakfast > 0) {
            if (meals.breakfast == 1) {
                txtbreakfast = '1 desayuno';
            } else {
                txtbreakfast = meals.breakfast + ' desayunos';
            }
            quote.meals = txtbreakfast;
        }


        if (meals.lunch > 0) {
            if (meals.lunch == 1) {
                txtlunch = '1 comida';
            } else {
                txtlunch = meals.lunch + ' comidas';
            }
            if (quote.meals != '') {
                quote.meals = quote.meals + ', ' + txtlunch;
            }
            else {
                quote.meals = quote.meals + txtlunch;
            }
        }


        if (meals.dinner > 0) {
            if (meals.dinner == 1) {
                txtdinner = '1 cena';
            } else {
                txtdinner = meals.dinner + ' cenas';
            }
            if (quote.meals != '') {
                quote.meals = quote.meals + ', ' + txtdinner;
            }
            else {
                quote.meals = quote.meals + txtdinner;
            }
        }

    };
       //end show stuff ////////////////////////


    $scope.showChatAgency = false;
    $scope.query = {};
    // rooms

    $scope.roomString = '';
    $scope.paxSingle = 0;
    $scope.paxDouble = 0;
    $scope.paxTriple = 0;
    // destinations

    $scope.destinationStrEs = '';
    $scope.destinationStrEn = '';
    $scope.showTranslateDest = false;
    $scope.LT = false;

    //
    
    // hotel     
    $scope.hotelString = '';
    $scope.hostingKindNotes_es = '';

    // service 

    $scope.serviceString = '';

    // guides
    // 
    $scope.guidestr = '';

    // group comments
    $scope.showTranslateGroupComm = false;
    $scope.groupCommStrEn = '';

    // functions

    var _showService = function(){
      var service = $scope.query.additionalinfo != null ? $scope.query.additionalinfo.regimen : '';
      var str = '';
      switch (service) {
          case 'ol':
              str = "Solo alojamiento";
              break;
          case 'bb':
              str = "Alojamiento y Desayuno";
              break;
          case 'hb':
              str = "Media pensión";
              break;
          case 'fb':
              str = "Pensión completa";
              break;
          case 'ai':
             str = "Todo incluido";
              break;
      }
      $scope.serviceString = str;
    };


    // hotel     

    var _showHotelCategory = function(){
      var hotels = $scope.query.hosting;
      var str = '';
      var arr =[];
      if (hotels != null && hotels.lowcosthotels){
        arr.push('1*, 2*');
      }
      if (hotels != null && hotels.superiorhotels){
        arr.push('3*,3*SUP, 4*');
      }
      if (hotels != null && hotels.luxuryhotels){
        arr.push('4*SUP, 5*, 5*SUP');
      }
      //DEPRECATED
      if (hotels != null && hotels.standarhotels){
        arr.push('standard <small class="italic">(2*, 3*, 3*SUP)</small>');
      }
      if (hotels != null && hotels.charmhotels){
        arr.push('con encanto <small class="italic">(especials)</small>');
      }
      // END //DEPRECATED
      $scope.hotelString = arr.join(', ');
    };

    // rooms


    var _showRooms = function(){
      var roomDistribution = $scope.query.roomDistribution || [];
      var arr = [];
      var str = '';
      var single = $filter('filter')(roomDistribution, {$: 'single'});
      var double = $filter('filter')(roomDistribution, {$: 'double'});
      var triple = $filter('filter')(roomDistribution, {$: 'triple'});
      $scope.paxSingle = single.length;
      $scope.paxDouble = double.length*2;
      $scope.paxTriple = triple.length*3;
      if (single.length >0){
        arr.push(single.length+" individual");
      }
      if (double.length >0){
        arr.push(double.length+" doble");
      }
      if (triple.length >0){
        arr.push(triple.length+" triple");
      }
      $scope.roomString =  arr.join(', ')+" habitacione/s";
    };

    // PAXs
    //

    var _summarize = function () {
        $scope.userquery != null && $scope.userquery.quotes != null ? _.each($scope.userquery.quotes, function (quote) { _buildSummary(quote); }) : null;
        $scope.query != null && $scope.query.quotes != null ? _.each($scope.query.quotes, function (quote) { _buildSummary(quote); }) : null;
    }

    $scope.getQueryPax = function(roomDistribution){
      if (roomDistribution != undefined){
        return bookinghelpers.getTotalPaxInRoomroomDistribution(roomDistribution);
      }
    };

    var _showDestination = function(){
      var destinations = $scope.query.destinations || [];
      var arrStr = [];
      for (var i = 0; i < destinations.length; i++) {
        if (destinations[i].city && destinations[i].country){
          arrStr.push(destinations[i].city + ', ' + destinations[i].country);
        } else if (destinations[i].stateorprovince && destinations[i].country) {
          arrStr.push(destinations[i].fulladdress + ', ' + destinations[i].country);
        } else {
          arrStr.push(destinations[i].fulladdress);
        }
      }
      var es_destinationStr = arrStr.join(' | ');
      $scope.destinationStrEs = es_destinationStr;
    };


    $scope.monthStrL_en = function(index){
      return tools_service.getMonthNameEnglish(index,'long');
    };

    $scope.monthStrS_en = function(index){
      return tools_service.getMonthNameEnglish(index, 'short');
    };

    $scope.monthStrL_es = function(index){
      return tools_service.getMonthNameSpanish(index,'long');
    };

    $scope.monthStrS_es = function(index){
      return tools_service.getMonthNameSpanish(index, 'short');
    };

    var _showGuides = function(){
        var guides = $scope.query.additionalinfo != null && $scope.query.additionalinfo.guide != null ? $scope.query.additionalinfo.guide.language : null;
      var arrStr = [];
      if ($scope.query.additionalinfo != null && $scope.query.additionalinfo.guide != null && $scope.query.additionalinfo.guide.included && guides != null){
        for (var prop in guides) {
          
            if (guides[prop]){
              
              switch (prop){
                case 'french' :
                  arrStr.push('francés');
                break;
                case 'spanish' :
                  arrStr.push('español');
                break;
                case 'english' :
                  arrStr.push('inglés');
                break;
                case 'german' :
                  arrStr.push('alemán');
                break;
                case 'italian' :
                  arrStr.push('italiano');
                break;
                case 'portuguese' :
                  arrStr.push('portugués');
                break;
              }
              
            }

          
        }
      }
      $scope.guidestr = arrStr.join(', ');
    };
   
   $scope.getUniqueCountries = function(query){
      return queryhelpers.getUniqueCountries(query);
    };
    /**
     * funcion que la fecha en formato date del objeto de mongo
     * @return "date javascript"
     */
    $scope.transformToDate = function(dateObj){
        return tools_service.transformToDate(dateObj);
    };

       //DMC Managing..
    $scope.validDMCs = [];
    $scope.selectedDMCs = [];
    function _getRelatedDmcs(callback) {
        $scope.selectedDMCs = $scope.userquery.dmcs != null && $scope.userquery.dmcs.length > 0 ? JSON.parse(JSON.stringify($scope.userquery.dmcs)) : [];
        var mongoquery = { $and: [] };

        //1)  pais de operaciones sea el de la user query
        if ($scope.userquery.destinations != null && $scope.userquery.destinations.length > 0) {
            var destinations = [];
            for (var i = 0, len = $scope.userquery.destinations.length; i < len; i++) {
                var dest = $scope.userquery.destinations[i];
                if (dest != null && dest.countrycode != null && dest.countrycode != '') {
                    destinations.push(dest.countrycode);
                }
            }
            if (destinations.length > 0) {
                mongoquery.$and.push({ 'company.operatein.operateLocation.countrycode': { $in: destinations } });
            }
        }

        // 2) el dmc acept peticiones a medida
        mongoquery.$and.push({ 'membership.tailormade': { '$ne': null } });
        mongoquery.$and.push({ 'membership.tailormade': { '$ne': '' } });
        mongoquery.$and.push({ 'membership.tailormade': true });

        // 3) quito los dmc ya seleccionados
        var selectedDMCsCodes = _.map($scope.selectedDMCs, function (item) {
            return item.code;
        });

        mongoquery.$and.push({ 'code': { '$ne': selectedDMCsCodes } });

        var rq = {
            command: 'find',
            service: 'api',
            request: {
                query: mongoquery,
                collectionname: 'DMCs',
                populate: [{ path: 'user' }]
            }
        };

        var rqCB = yto_api.send(rq);

        // response OK
        rqCB.on(rqCB.oncompleteeventkey, function (data) {
            $log.log('related DMCs response api : ', data);
            if (data != null && data != '') {

                $log.log('related DMCs response api lenght : ', data.length);
                $scope.validDMCs = data;
                if (callback) {
                    callback(data);
                }
                tools_service.showPreloader($scope, 'hide');
            } else {
                $log.error('Error related DMCs ');
                tools_service.showPreloader($scope, 'hide');
                tools_service.showFullError($scope, 'show', 'error', 'No Dmcs Related found.')
            }
        });

        // response KO
        rqCB.on(rqCB.onerroreventkey, function (err) {
            tools_service.showPreloader($scope, 'hide');
            tools_service.showConectionError($scope, 'show', 'en');
            $log.error('Error getting related DMCs : Details: ', err);
        });
    }
    /**
 * añade un dmc de la lista de posibles,
 * a la lista de definitivos
 */
    $scope.addDmcToList = function (dmc, index) {
        console.log(dmc);
        $scope.selectedDMCs.push(JSON.parse(JSON.stringify(dmc)));
        $scope.validDMCs = _.filter($scope.validDMCs, function (vdmc) { return vdmc.code != dmc.code; });
    };

    /**
    * quita un dmc de la lista de posibles, a la lista de dfinitivos
    */
    $scope.removeDmcToList = function (dmc, index) {
        console.log(dmc);
        $scope.validDMCs.push(JSON.parse(JSON.stringify(dmc)));
        $scope.selectedDMCs = _.filter($scope.selectedDMCs, function (vdmc) { return vdmc.code != dmc.code; });
    }

   $scope.$watch('userquery', function() {
       if ($scope.userquery != null && $scope.userquery.code != '') {
           $scope.query = $scope.userquery;
       }
    });

   $scope.noSendToDMCs = function () {
       toaster.pop('error', 'No DMC\'s selected to notificate.', 'Please select at least, one DMC.', 3000);
   }

   $scope.sendToDMCs = function () {
       var forpush = false; //flag to trigger a save
       console.log('lets push new dmcs..');
       var seriestopush = [];
       $scope.userquery.dmcs == null ? $scope.userquery.dmcs = [] : null;
       _.each($scope.selectedDMCs, function (dmc) {
           console.log('check if its added ' + dmc.code );
           var finded = _.find($scope.userquery.dmcs, function (sdmc) { return sdmc.code == dmc.code; });
           finded == null ? ($scope.userquery.dmcs.push(dmc), forpush = true, console.log('new dmc added ' + dmc.code)) : null;
       });
       console.log(forpush);
       if (forpush) {
           //lets save Query
           saveQuery(
               function (result) {
                   toaster.pop('success', 'DMCs Añadidos correctamente.', 'Se ha actualizado el inventario de Proveedores para esta solicitud');
               },
               function (err) {
                   console.log("Error al guardar la query. ", err);
                   toaster.pop('error', 'Error al guardar Query', 'Ocurrio un error inesperado, intentelo de nuevo', 5000);
               });
       }
   }

   $scope.getimage = function (url, imagename) {
       return tools_service.cloudinaryUrl(url, imagename);
   };
   // date helper

   $scope.getdmcbyquote = function (quote) {
       var dmc = $scope.userquery.dmcs != null && $scope.userquery.dmcs.length > 0 ? _.find($scope.userquery.dmcs, function (dmc) {
           return dmc.code == quote.dmccode;
       }) : null;
       return dmc;
   };

   $scope.addComment = function (comment) {
       var dummy = { date: new Date(), text: comment, user: loginsession.user.email };

       if ($scope.query.comments == null) {
           $scope.query.comments = [];
       }
       $scope.query.comments.push(dummy);
       // guardar la query          
       saveQuery(
           function (result) {
               toaster.pop('success', 'Histórico actualizado correctamente.', 'Se ha añaido el comentario al histórico');
           },
           function (err) {
               console.log("Error al guardar la query, al descartar la quote. ", result);
               toaster.pop('error', 'Error al guardar el comentario en el histórico', 'Por favor inténtelo más tarde', 5000);
           });
       $scope.newComment = "";
   };

   $scope.saveQuery = function () {
       saveQuery(
           function () {
               console.log('query saved properly...');
           },
           function (err) {
               console.error(err);
           });
   }

   function saveQuery(callback, errorcallback) {
       tools_service.showPreloader($scope, "show");
       var rq = {
           command: 'save',
           service: 'api',
           request: {
               data: $scope.userquery,
               collectionname: 'UserQueries',
               populate: [
               {
                   path: 'quotes',
                   populate: [{
                       path: 'products', populate: [
                           { path: 'dmc', model: 'DMCs' },
                           { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' },
                           { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }
                       ]
                   }, { path: 'booking' }, { path: 'dmc' }]
               },
               { path: 'dmcs' }, { path: 'traveler' },
               { path: 'affiliate' }, { path: 'chats' }, { path: 'booking' }],
               query: { code: $scope.userquery.code }
           }
       };

       var rqCB = yto_api.send(rq);

       rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
           $scope.userquery = $scope.query = rsp;
           callback != null ? callback(rsp) : null;
           tools_service.showPreloader($scope, "hide");
       });
       //on response noOk
       rqCB.on(rqCB.onerroreventkey, function (err) {
           console.error("error saving product");
           console.error(err);
           errorcallback != null ? errorcallback(err) : null;
           tools_service.showPreloader($scope, "hide");
       });

       return rqCB;
   }

   function content(callback) {
       setTimeout(callback, 500);
   }

   /////////////
   ///	TAB manager
   ///
   function readHashTab() {
       var hash = $location.hash() || 'tabdetails';
       console.log(hash);
       $scope.selectTab(hash);
   };

   $scope.selectTab = function (id) {
       var tabname = loginsession.user.rolename + 'tabs';
       id = id || 'tabdetails';
       var hash = '';
       for (var i = $scope[tabname].length - 1; i >= 0; i--) {
           if ($scope[tabname][i].id == id) {
               $scope[tabname][i].active = true;
               hash = $scope[tabname][i].id;
           }
       }
       if (id == 'tabquote') {
           $scope.$broadcast('program.visible');
       }
       $location.hash(hash);
   }

   $scope.admintabs = [
       {
           id: 'tabdetails',
           active: false
       },
       {
           id: 'tabdmcsselection',
           active: false
       },
       {
           id: 'tabquote',
           active: false
       },
       {
           id: 'tabcompare',
           active: false
       },
       {
           id: 'tabhistoric',
           active: false
       }
   ];
   $scope.affiliatetabs = [
       {
           id: 'tabdetails',
           active: false
       },
       
   ];


   $scope.feechanged = function (quote, newfee) {
       console.log(newfee);
       quote.fees.tailormade = newfee;
       
       $scope.toggle('editFee');
   }

   function extractQuotationData(quote) {
       var quoterequest = null;
       if (quote.rooms != null) {
           var qt = {
               quotecurrency:quote.netPrice.currency.value,
               dmccode: quote.dmccode,
               affiliatecode: quote.affiliatecode,
               comission: quote.comission,
               quoterequest: {
                   rooms: {
                       single: {
                           quantity: quote.rooms.single.quantity,
                           net: quote.rooms.single.pricePerPax.value
                       },
                       double: {
                           quantity: quote.rooms.double.quantity,
                           net: quote.rooms.double.pricePerPax.value
                       },
                       triple: {
                           quantity: quote.rooms.triple.quantity,
                           net: quote.rooms.triple.pricePerPax.value
                       },
                       quad: {
                           quantity: quote.rooms.quad.quantity,
                           net: quote.rooms.quad.pricePerPax.value
                       },
                       children: null
                   }
               }
           };
           if (quote.children && quote.children.length > 0) {
               qt.quoterequest.rooms.children = _.map(quote.children, function (child) {
                   return { net: child.pricePerPax.value, quantity: 1, age: child.age };
               });
           }
           quoterequest = qt;
       }
       return quoterequest;
   }

   $scope.recalculatePVP = function (quote) {

       var quoterq = extractQuotationData(quote);
       console.log(quoterq);
       var rq = {
           command: 'quotation',
           service: 'api',
           request: quoterq
       };

       var rqCB = yto_api.send(rq);

       // response OK
       rqCB.on(rqCB.oncompleteeventkey, function (result) {
           console.log('quotation:', result);
           //single
           quote.rooms.single.amountPricePerPax = {
               value: result.rooms.single.amount, currency: result.currency
           };
           quote.rooms.single.pvpAffiliatePerPax = {
               value: result.rooms.single.pvp, currency: result.currency
           };
           //double
           quote.rooms.double.amountPricePerPax = {
               value: result.rooms.double.amount, currency: result.currency
           };
           quote.rooms.double.pvpAffiliatePerPax = {
               value: result.rooms.double.pvp, currency: result.currency
           };
           //triple
           quote.rooms.triple.amountPricePerPax = {
               value: result.rooms.triple.amount, currency: result.currency
           };
           quote.rooms.triple.pvpAffiliatePerPax = {
               value: result.rooms.triple.pvp, currency: result.currency
           };
           //quad
           quote.rooms.quad.amountPricePerPax = {
               value: result.rooms.quad.amount, currency: result.currency
           };
           quote.rooms.quad.pvpAffiliatePerPax = {
               value: result.rooms.quad.pvp, currency: result.currency
           };
           //childs
           result.rooms.children != null && result.rooms.children.length > 0 ?
               _.each(result.rooms.children, function (child, index) {
                   quote.children[index].amountPricePerPax = {
                       value: child.amount, currency: result.currency
                   };
                   quote.children[index].pvpAffiliatePerPax = {
                       value: child.pvp, currency: result.currency
                   };
               }) : null;
           //total amounts
           //ts
           quote.amount = {
               value: result.amount, currency: result.currency
           };
           //dmc 
           quote.netPrice = {
               value: result.net, currency: result.currency
           };
           //aavv
           quote.pvpAffiliate = {
               value: result.pvp, currency: result.currency
           };
       });

       // response KO
       rqCB.on(rqCB.onerroreventkey, function (err) {
           console.error("Error getting the PVP: ", rq, 'error: ', err);
           toaster.pop('error', 'Quote not saved properly', 'Your data is not saved...');
       });

   };

   function saveQuote(quote) {

       var APIquery = (quote._id != null) ? { _id: quote._id } : null;

       var rq = {
           command: 'save',
           service: 'api',
           request: {
               data: quote,
               query: APIquery,
               collectionname: 'Quotes',
               populate: [
                   { path: 'products' }
               ]
           }
       };

       var rqCB = yto_api.send(rq);

       // response OK
       rqCB.on(rqCB.oncompleteeventkey, function (result) {
           console.log('quote saved. result:', result);
           if (callback) {
               callback(result);
           }
       });

       // response KO
       rqCB.on(rqCB.onerroreventkey, function (err) {
           tools_service.showPreloader($scope, "hide");
           console.error("Error saving quote: ", quote, 'error: ', err);
           toaster.pop('error', 'Quote not saved properly', 'Your data is not saved...');
       });
   }


   function saveQuote(quote) {

       var APIquery = (quote._id != null) ? { _id: quote._id } : null;

       var rq = {
           command: 'save',
           service: 'api',
           request: {
               data: quote,
               query: APIquery,
               collectionname: 'Quotes',
               populate: [
                   { path: 'products' }
               ]
           }
       };

       var rqCB = yto_api.send(rq);

       // response OK
       rqCB.on(rqCB.oncompleteeventkey, function (result) {
           console.log('quote saved. result:', result);
           if (callback) {
               callback(result);
           }
       });

       // response KO
       rqCB.on(rqCB.onerroreventkey, function (err) {
           tools_service.showPreloader($scope, "hide");
           console.error("Error saving quote: ", quote, 'error: ', err);
           toaster.pop('error', 'Quote not saved properly', 'Your data is not saved...');
       });
   } 

   function setRequest() {
       tools_service.showPreloader($scope, "show");
       $scope.userquery = $scope.query = editiondata;
       $scope.userquerycode = $scope.userquery.code; 
       $scope.quotes = [];
       $scope.allquotes = [];
       $scope.priceDetail = {};
      
       $scope.adminRevision = adminaccess;

       $scope.rolename = loginsession.user.rolename;
       loginsession.user.rolename == 'affiliate' ? $scope.affiliate = loginsession.affiliate : null;
       loginsession.user.rolename == 'dmc' ? $scope.dmc = loginsession.dmc : null;
       $scope.theuser = loginsession.user;
       $scope.themember = loginsession[loginsession.user.rolename];
       $scope.currentfee = loginsession.user.rolename == 'affiliate' ? loginsession.affiliate.fees.tailormade || 0 : 0;
       $scope.currentfee = loginsession.user.rolename == 'affiliate' ? loginsession.affiliate.fees.groups || 0 : $scope.currentfee;
       _getRelatedDmcs();
       _showDestination();
       _showRooms();
       _showHotelCategory();
       _showService();
       _showGuides();
       _summarize();
       readHashTab();
       console.log($scope.userquery);
       tools_service.showPreloader($scope, "hide");
   }
   content(function () {
       setRequest();
   });

}]);
/**
  * @ngdoc directive  
  * @name directive.capitalize
  * @restrict 'AC' 
  * @element ANY 
  **/
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