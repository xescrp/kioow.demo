/**
 * @ngdoc service
 * @name bookings_service
 * @requires $http
 * @requires $location
 * @requires $log
 * @requires $window
 * @requires tools_service
 * @description
 * Auxiliars functions to book a trip
 */
app.service('bookings_service', function (
    $http,
    $location,
    $log,
    $window,
    http_service,
    tools_service) {
    'use strict';
    
    /**
     * [_rooms description]
     * rooms available in TS plataform
     * @type {Array}
     */
    var _rooms = [
            {"roomCode" : "single", "label": "Individual", "pax" : 1},
            {"roomCode" : "double", "label": "Doble", "pax" : 2},
            {"roomCode" : "triple", "label": "Triple", "pax" : 3}//,
            //{"roomCode" : "quad", "label": "Cuádruple", "pax" : 4}
        ];

    var _nationalities = [],
        _paymentoptions = [];
    /**
     * [_defaultBirthDate description]
     * @return {Date} date _defaultBirthTime in js
     */
    function _defaultBirthDate(){
        return new Date('January 1, 1985');
    }

    function _newTraveler(){
        return {
            "name" : "",
            "lastName" : "",
            "typePax" : "",
            "birdthDate" : _defaultBirthDate(),
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
    }

    /**
     * [_buildNewBooking description]
     * @param  {Object} settings contains the product and current currency
     * @return {[type]}          a new booking
     */
    function _buildNewBooking(settings){
        var defaultSettings = {
            currentcurrency : {}, 
            product: {},
        };
        var settings = settings || defaultSettings;
        return {
            "status" : "",
            "amount" : {
                "value":0,
                "currency" : '', //settings.product.dmc.currency,
                "exchange" :{
                    "value":0,
                    "currency": settings.currentcurrency
                }
            },
            "netPrice" : {
                "value":0,
                "currency" : '',//settings.product.dmc.currency,
                "exchange" :{
                    "value":0,
                    "currency": settings.currentcurrency
                }
            },
            "priceperperson" : 0,
            "comission" : 0,//settings.product.dmc.membership.commission,
            "b2bcommission" : 0,//settings.product.dmc.membership.b2bcommission,
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
            "productDmc" : '',//settings.product._id,
            "dmc" : '',//settings.product.dmc._id,
            "createDate" : new Date(),
            "isB2C" : false,
            "isGroup": false,
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
            "signin" : {
                "name": "",
                "lastname": "",
                "phone": "",
                "email": ""
            },
            "productCode" : '',//settings.product.code,
            "product" : '', //settings.product,
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
            "content" : {},
            "toConfirm" : false,
            "traveler" : {},
            "affiliate" : {},
            "meetingdata" : "", // transfer information
            "affiliateobservations" : "", // comments to yto admin
            "affiliateuser" : "", // agent or user dif to account
            "idBookingExt": "", // Expediente AAVV
            "holder" : "",
            "cancelpolicy" : ''//settings.product.dmc.membership.cancelpolicy
        };
    };
    /**
     * agrega una habitacion a la seleccion
     */
     function _addRoom(roomDistribution, code){
        
        var numRoom = Number(roomDistribution.length);
        // add a double by default
        var defroom = _rooms[1];
        defroom = code != null && code != '' ? _.find(_rooms, function (room) { return code.toLowerCase() == room.roomCode.toLowerCase(); }) : defroom;

        var dummy = {
                "numRoom" : numRoom,
                "roomCode" : code || "double",
                "roomType" : defroom,
                "paxList" : []
            };
        dummy.typeRoom = _rooms[1]; // doble

        dummy = _updateTravelersRoom(dummy);
        roomDistribution.push(dummy);
        return roomDistribution;
    };

    /**
     * funcion que actualiza la habitacion (desplegable de sinple/doble/triple)
     */
    function _updateTravelersRoom(room){

        room.paxList = [];

        if(room.typeRoom != null && room.typeRoom.roomCode !=null){
            room.roomCode = room.typeRoom.roomCode;
            room.roomType = _rooms[room.typeRoom.pax-1];
            room.slug = room.typeRoom.roomCode+room.numRoom;
        }
        else{
            if(room.roomCode == 'single'){
                room.roomType = _rooms[0];
                room.typeRoom = _rooms[0];
            }
            if(room.roomCode == 'double'){
                room.roomType = _rooms[1];
                room.typeRoom = _rooms[1];
            }
            if(room.roomCode == 'triple'){
                room.roomType = _rooms[2];
                room.typeRoom = _rooms[2];
            }
            if (room.roomCode == 'quad') {
                room.roomType = _rooms[3];
                room.typeRoom = _rooms[3];
            }
        }


        for (var i = 0; i< room.roomType.pax; i++) {
            room.paxList.push(_newTraveler());
        }

        return room;
    };


    /**
     * funcion que calcula la fecha del segundo pago de la reserva, en funcion de lo que haya configurado en el dmc
     */
    function _getPaymentOptionAffiliate(dmc){
        if (dmc != null) {
            if (dmc.membership.paymentoption !== undefined){
                $log.log('dmc.membership.paymentoption.slug ',dmc.membership.paymentoption.slug);
                switch(dmc.membership.paymentoption.slug) {
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
                console.log("No tiene configurado el pago el dmc: ",dmc.code);
                return 30;
            }
        }
    }

    function _findcounty(countrycode){
        return _.find(bookings_service.nationalities, function(item){
            return item.countrycode == countrycode;
        });
    }




    function _loadNationalities(callback){

        var nationalitiesUrl = $location.protocol()+'://'+location.host+'/data/nationalities.json';

        $http.get(nationalitiesUrl)
        .then(function(response) {
            if (response.data != null){
                $log.log('nationalities', response.data);
                bookings_service.nationalities = response.data;
                //dataload.nationalities = true;
                //scope.$emit('loadNationalities', true);
                if (angular.isFunction(callback)){
                    callback();
                }
            } else {
                //dataload.nationalities = false;
                //scope.$emit('loadNationalities', false);
                $log.error("error getting nationalities");
                throw 'error getting nationalities';
            }

        }, function(response) {
            //dataload.nationalities = false;
            //scope.$emit('loadNationalities', false);
            $log.error("error getting nationalities");
            throw 'error getting nationalities';
        });
    }
    
    function _loadPaymentoptions(callback){
        // GET PAYMENT OPTIONS
        var paymentoptionsUrl = $location.protocol() + '://' + location.host + '/statics/getstaticcontent?contentkey=paymentoptions';


        http_service.http_request(paymentoptionsUrl, 'GET', null, null)
        .then(function(response) {
            $log.log('paymentoptions', response);
            //dataload.payment = true;
            //scope.$emit('loadPaymentOptions', true);
            bookings_service.paymentoptions = response;
            if (angular.isFunction(callback)){
                callback();
            }

        }, function(response) {
            //dataload.payment = false;
            //scope.$emit('loadPaymentOptions', false);
            $log.error("error getting paymentoptions");
            throw 'error getting paymentoptions';
        });
    }

    /**
     * [_loadPaxs description]
     * @param  {Object} booking   the complete booking
     * @param  {Object} paxholder  the pax object ussualy local.pax
     * @return {Object}           updated pax object
     */
    function _loadPaxs(booking, paxholder){
        
        var paxobj = paxholder;
        // cantidad de pasajeros
        paxobj.number = 0;
        paxobj.double = 0;
        paxobj.triple = 0;
        paxobj.quad = 0;
        paxobj.single = 0;

        var adults = 0;
        var kids = 0;

        _.map(booking.roomDistribution, function(room){
            paxobj.number = paxobj.number+room.paxList.length;
            switch (room.roomCode){
                case 'single':
                    paxobj.single = paxobj.single + 1;
                    break;
                case 'double':
                    paxobj.double = paxobj.double + 2;
                    break;
                case 'triple':
                    paxobj.triple = paxobj.triple + 3;
                    break;
                case 'quad':
                    paxobj.quad = paxobj.quad + 4;
                    break;
            }
            _.map(room.paxList, function (pax){
                if (pax.birdthDate){
                    var born = new Date(pax.birdthDate);
                    //$log.log(born);
                    var age=_get_age(born, new Date());
                    if (age<18){
                        pax.typePax = "child";
                        kids = kids+1;
                    }else {
                        pax.typePax = "adult";
                        adults = adults+1;
                    }
                }
            });

            if (adults+kids == paxobj.number){
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
                paxobj.string = stringAdults+" "+stringKids;
            }

        });
        console.log ('$scope.local.pax ',paxobj);
        return paxobj;
        
    }

    function _get_age(born, now) {
      var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
      if (now >= birthday)
        return now.getFullYear() - born.getFullYear();
      else
        return now.getFullYear() - born.getFullYear() - 1;
    }




    var bookings_service = {
        rooms : _rooms,
        newTraveler : _newTraveler,
        defaultBirthDate : _defaultBirthDate,
        nationalities : _nationalities,
        paymentoptions : _paymentoptions,
        buildNewBooking : _buildNewBooking,
        updateTravelersRoom : _updateTravelersRoom,
        addRoom : _addRoom,
        getPaymentOptionAffiliate : _getPaymentOptionAffiliate,
        findcounty : _findcounty,
        loadNationalities : _loadNationalities,
        loadPaymentoptions : _loadPaymentoptions,
        loadPaxs : _loadPaxs,
        get_age : _get_age
    };
    return bookings_service;
});


