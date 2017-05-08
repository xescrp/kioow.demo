app.controller("affiliateRequestFormCtrl", [
    '$scope',
    '$http',
    'toaster',
    '$location',
    '$timeout',
    'yto_session_service',
    'yto_api',
    'tools_service', 
    '$log',
    'http_service',
    '$uibModal',
    '$anchorScroll',
    'anchorSmoothScroll',
    'destinations_service',
    function($scope,
        $http,
        toaster,
        $location,
        $timeout,
        yto_session_service,
        yto_api,
        tools_service, 
        $log,
        http_service,
        $uibModal,
        $anchorScroll,
        anchorSmoothScroll,
        destinations_service) {

        'use strict';

        //
        //
        //
        // DEFINE VARS
        //
        //
        //
        var brandpath = '';
        if (typeof brandPath !== 'undefined') {
            $scope.brandpath = brandPath;
        }
        var debug = $location.search().debug;
        $scope.debug = debug;

        if(debug)
            $log.log('in debug mode');
        // inital settings
        // currency default
        $scope.selectedcurrency = {label: "Euro",symbol: "€",value: "EUR"};
         // OLD API default
        //$scope.urlapi = openmarket_api_service.apiCoreServiceUrl();
        // triptags
        $scope.tripTags = [];

        $scope.local ={
            tags: [],
            pax : { 
                string: "",
                number : 0,
                double : 0,
                triple : 0,
                single : 0
            },
            rooms : [
                {"roomCode" : "single", "label": "Individual", "pax" : 1},
                {"roomCode" : "double", "label": "Doble", "pax" : 2},
                {"roomCode" : "triple", "label": "Triple", "pax" : 3}
            ]
        };
        // session holder
        $scope.session = {};
        ////
        $scope.selectnewmonth = { year: new Date().getFullYear(), monthindex: new Date().getMonth() };
        //
        // related product to email
        $scope.relatedproduct = [];
        // flags for load tags
        $scope.showErrorLoadTags = false;
        $scope.showLoadTags = false;
        // EMPTY QUERY
        $scope.QUERY = {
            title: '',
            name: '',
            code: 'NOCODE',
            publishedDate: new Date(),
            isnew : true,
            description: 'New Query...',
            additionalinfo: {
                description: '',
                trip : '',
                regimen : '',
                needs :'',
                guide : {
                    included : false,
                    language : {
                        spanish : false,
                        english : false,
                        french : false,
                        german : false,
                        italian : false,
                        portuguese : false
                    }
                }
            },
            dates: {
                knowingdates: false,
                arrivaldate: new Date(),
                arrival : {
                	"year": (new Date()).getFullYear(),
        	    	"month": (new Date()).getMonth(),	    	
        	    	"day": (new Date()).getDate()
                },
                month: {
                    monthnumber: new Date().getMonth() + 1, //month number, 1-based
                    monthname: _getMonthNameSpanish(new Date().getMonth()),
                    monthyear: new Date().getFullYear()
                },
                week : 0,
                alreadygotflights: false,
                dataflightsIn : '',
                dataflightsOut : '',
                duration: 0,
                flexibility: {
                    number: 0,
                    range: 'days'
                }
            },
            hosting: {
                // hostingKind: '',
                hostingKindNotes: '',
                lowcosthotels: false,
                standarhotels: false,
                superiorhotels: false,
                charmhotels: false,
                luxuryhotels: false,
            },
            budget: {
                cost: '',
                currency: {label: "Euro",symbol: "€",value: "EUR"},
                // showmebestprices: false
            },
            travelercode: null,
            traveler: null,
            destinations: [],
            whattodo: [],
            roomDistribution : [],
            group : null,
            passengers: [
                {
                    // traveling: {
                    //     alone: false,
                    //     partner: false,
                    //     family: false,
                    //     friends: false,
                    //     group: false
                    // },
                    acomodattion: {
                        howmany: 0
                    }
                }
            ],
            state: 'requested'
        };
        //Related Search
        $scope.queryRelated = {
            destinations: [],
            tags : [],
            hotelcats : [],
            days : [],
            date : "",
            kind : "",
            order : "",
            type : "",
            price : null,
            step: "",
            isUpdate : false
        };

        

        $scope.findcity = null;
        // markers 
        $scope.mapmarkers = [];
        // availablemonths in form
        $scope.availablemonths = [];
        //Sign Up | Login stuff

        // New user structure
        $scope.newUser = {
            name: '',
            firstname: '',
            lastname: '',
            email: '',
            reemail: '',
            phone: '',
            password: '',
            repassword: ''
        };
        // login form data
        $scope.logininfo = {
            email: '',
            password: ''
        };


        //LIKE LOCATIONS MODEL
        var destinationdummy = {
            fulladdress: '',
            city: '',
            stateorprovince: '',
            cp: '',
            country: '',
            countrycode: '',
            continent: '',
            latitude: 0.0,
            longitude: 0.0
        };
        // otions date picker angular ui
        $scope.dateOptions = {'show-weeks': false};
        // today date
        $scope.today = new Date();

        // Budget vars
        //
        $scope.minBudgetValues =[];
        $scope.minBudgetResult = 0;
        $scope.showLoadBudget = true;
        $scope.loadMinBudget = false;

        //
        //
        // Flag to show popup warning dates
        //
        $scope.showWaringDates = false;
        //
        // FLAGS API SEND
        $scope.rqSended = false;
        $scope.rqSavedOK = false;
        //
        // Flag to check if a group
         $scope.checkGroup = false;
        // 
        // 
        // 
        //
        //// FLAG LEAVE PAGE WITHOUT SAVE        
        //
        $scope.changeswithoutsave = true;
        /**
         * Flag for show when dont have city or destination
         */
         $scope.showNoCity = false;
        //
        //  COMMON HELPERS
        //
        var arrayUnique = function(a) {
            return a.reduce(function(p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
            }, []);
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

        // TODO ?????
        $scope.openfrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedfrom = true;
        };

        //
        // QUERY FORM HELPERS
        //
        //
        //  Return string rooms and paxs
        $scope.accomodationStr = function(){

            var str = '';
            var dummy =[];
            var paxs = 0;
            var single = 0;
            var double = 0;
            var triple = 0;

            for (var i = 0; i < $scope.QUERY.roomDistribution.length; i++) {
                if ($scope.QUERY.roomDistribution[i].roomType.roomCode == "single"){
                    single++
                }
                if ($scope.QUERY.roomDistribution[i].roomType.roomCode == "double"){
                    double++
                }
                if ($scope.QUERY.roomDistribution[i].roomType.roomCode == "triple"){
                    triple++
                }
            };
            if (single>=1){
                var txt = ' individuales';
                if (single == 1){
                    txt = ' individual';
                };
                dummy.push(single+txt);
                paxs = paxs+1*single;
            }
            if (double>=1){
                var txt = ' dobles';
                if (double == 1){
                    txt = ' doble';
                };
                dummy.push(double+txt);
                paxs = paxs+2*double;
            }
            if (triple>=1){
                var txt = ' triples';
                if (triple == 1){
                    txt = ' triple';
                };
                dummy.push(triple+txt);
                paxs = paxs+3*triple;
            }

            var txtpax = ' pasajeros';
            if (paxs == 1){
                txtpax = ' pasajero';
            }
            str = 'Habitacion/es: '+dummy.join(', ') +' | '+paxs+txtpax;

            $scope.QUERY.passengers[0].acomodattion.howmany = paxs;
            
            return str;
        };
        //
        //
        // return destinations in query 
        $scope.showDestinations = function(){

            var destinationstr = '';

            for (var i = 0,length = $scope.QUERY.destinations.length; i < length; i++) {
                var destination = $scope.QUERY.destinations[i];
                if (destination.city==''){
                    destinationstr = destination.fulladdress
                }else {
                    destinationstr = destination.city+', '+destination.country;
                }
            };
            
            return destinationstr;
         };
        //
        // return activities ',' separated
        $scope.showTags = function () {         
            if ($scope.QUERY.whattodo.length >0){
                var httags = '';
                var tags = [];
                for (var i = 0; i < $scope.QUERY.whattodo.length; i++) {
                    tags.push($scope.QUERY.whattodo[i].label);
                }
                httags = tags.join(', ');
                return httags;
            }else {
                return 'Sin actividades seleccionadas';
            }
            
        };

        $scope.showDates = function () {
            var ht = '';
            if ($scope.QUERY.dates.knowingdates) {
                
                var dt = [
                    $scope.QUERY.dates.arrivaldate.getDate(),
                    $scope.QUERY.dates.arrivaldate.getMonth() + 1,
                    $scope.QUERY.dates.arrivaldate.getFullYear()
                ];
                ht = dt.join('/');
            }
            else{
               
               ht = $scope.QUERY.dates.month.monthname + ' ' + $scope.QUERY.dates.month.monthyear;
            }

            ht += ' - ' + $scope.QUERY.dates.duration.toString() + ' días';
            return ht;
        };
        
        $scope.showHosting = function () {
            var ht = '';
            var hotels = [];
            if($scope.QUERY.hosting.lowcosthotels){
                hotels.push('Económico (1*, 2*, lodge, camping, rural, otros)');
            }
            // DEPRECATED
            // if($scope.QUERY.hosting.standarhotels){
            //     hotels.push('Hoteles de categoria estandar');
            // }
            if($scope.QUERY.hosting.superiorhotels){
                hotels.push('Confort (3*,3*SUP, 4*)');
            }
            // DEPRECATED
            // if($scope.QUERY.hosting.charmhotels){
            //     hotels.push('Hoteles de encanto');
            // }
            if($scope.QUERY.hosting.luxuryhotels){
                hotels.push('Lujo (4*SUP, 5*, 5*SUP)');
            }

            ht = hotels.join(', ');
            return ht;
        };

        // Show cities return string
        $scope.showCities = function () {
            var htcities = '';
            var cities = [];
            if ($scope.QUERY.destinations != null && $scope.QUERY.destinations.length > 0) {
                for (var i = 0; i < $scope.QUERY.destinations.length; i++) {
                    if(cities.indexOf($scope.QUERY.destinations[i].city) > -1){
                        cities.push($scope.QUERY.destinations[i].city);
                    }
                }
            }
            htcities = cities.join(', ');
            return htcities;
        };

        $scope.showBudget = function(){
            var ht = '';
            if ($scope.QUERY.budget.showmebestprices){
                ht = "Quiero que me ofrezcan el mejor precio."
            } else{
                ht = $scope.QUERY.budget.cost+" "+$scope.QUERY.budget.currency.symbol
            }
            return ht;
        };

        $scope.showAdditionalinfo = function(){
            var trip = '';
            // king trip
            switch ($scope.QUERY.additionalinfo.trip) {
                case 'privatetrip':
                    trip = 'Viajo por mi cuenta';
                    break;
                case 'grouptrip':
                    trip = 'Viaje en grupo';
                    break;
            };
            var regimen = '';
            // regimen
            switch ($scope.QUERY.additionalinfo.regimen) {
                case 'ol':
                    regimen = "Solo alojamiento";
                    break;
                case 'bb':
                    regimen = "Alojamiento y desayuno";
                    break;
                case 'hb':
                    regimen = "Media pensión";
                    break;
                case 'fb':
                    regimen = "Pensión completa";
                    break;
                case 'ai':
                   regimen = "Todo incluido";
                    break;
            }
            //guide
            var guide = '';
            if ($scope.QUERY.additionalinfo.guide.included){
                var guides = [];
                if ($scope.QUERY.additionalinfo.guide.language.spanish){
                    guides.push('español');
                }
                if ($scope.QUERY.additionalinfo.guide.language.english){
                    guides.push('inglés');
                }
                if ($scope.QUERY.additionalinfo.guide.language.french){
                    guides.push('frances');
                }
                if ($scope.QUERY.additionalinfo.guide.language.german){
                    guides.push('alemán');
                }
                if ($scope.QUERY.additionalinfo.guide.language.italian){
                    guides.push('italiano');
                }
                if ($scope.QUERY.additionalinfo.guide.language.portuguese){
                    guides.push('portugués');
                }
                guide = 'Visitas con guías en: '+guides.join(', ');
            }

            var needs = '';
            switch ($scope.QUERY.additionalinfo.needs) {
                case 'onlyhotel':
                    needs = "Solo hoteles";
                    break;
                case 'rentacar':
                    needs = "Coche de alquiler";
                    break;
                case 'caranddriver':
                    needs = "Coche y conductor";
                    break;
            }

            var response = {
                trip : trip,
                regimen : regimen,
                guide : guide,
                needs : needs
            } 

            return response;
        };

        $scope.getimage = function (url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };

        function _getMonthNameEnglish(monthindex) {
           $log.log('tools_service.getMonthNameEnglish(monthindex)',tools_service.getMonthNameEnglish(monthindex));
           return tools_service.getMonthNameEnglish(monthindex);
        }
        function _getMonthNameSpanish(monthindex) {
            $log.log('tools_service.getMonthNameSpanish(monthindex)',tools_service.getMonthNameSpanish(monthindex));
            return tools_service.getMonthNameSpanish(monthindex);
        }
        // add tags to local tags (path query data with cms data)
        function initTags() {
            
            for (var j = $scope.QUERY.whattodo.length - 1; j >= 0; j--) {
                for (var i = $scope.tripTags.length - 1; i >= 0; i--) {
                    if ($scope.QUERY.whattodo[j].slug == $scope.tripTags[i].slug) {
                        $scope.local.tags.push($scope.tripTags[i]);
                        break;
                    }
                }
            }
        }

        /// return query code from URL
        function _initLoadQueryString() {
            var code = null;
            if ($location.search()) {
                if ($location.search().code != null && $location.search().code != '') {
                    code = $location.search().code;
                }
            }
            return code;
        }

        ///
        /// LAYOUT HELPERS
        ///

        $scope.gotoId = function(eID) {
            $timeout(function() {
                $location.hash(eID);
                anchorSmoothScroll.scrollTo(eID);
            }, 80);
        };

        $scope.gotoCero = function(){
            $timeout(function() {
                anchorSmoothScroll.gotoPosition(0)
            }, 80);

        };
        // jump to query details
        $scope.gotoRequest = function(){
            if ($scope.QUERY.code) {
                window.location = '/edit/request?code=' + $scope.QUERY.code;
            } else {
                toaster.pop('error', 'Ups!', 'Error desconocido, ponte en contacto.');
                $log.error('no query code');
            }
            
        };

        //  WATCH: LEAVE PAGE WITHOUT SAVE        
        $scope.$watch('QUERY', function () {
            if ($scope.changeswithoutsave){
                window.onbeforeunload = function (event) {
                    var message = 'Tienes cambios en la peticion sin enviar. Estos se perderan si abandonas la pagina en estos momentos.\r\n' +
                    'Estas seguro de que quieres salir?\r\n';
                    if (typeof event == 'undefined') {
                        event = window.event;
                    }
                    if (event) {
                        event.returnValue = message;
                    }
                    return message;
                };
            }
        }, true);

        $scope.$on ('disabledStop', function(){
            console.log('___ disabled js stop');
        });


        ///
        /// OLD AUTOCOMPLETE GOOGLE
        ///


        //** Autocomplete aux..
        // $scope.result1 = '';
        // $scope.options1 = {
        //     types: 'geocode',
        //     language: 'EN'
        // };
        // $scope.details1 = '';

        $scope.destinations = function (){
          //console.log ('$scope.destinations ',destinations_service.tailorcountriesnorm_es);
            return destinations_service.tailorcountriesnorm_es;
        };

        function resetautocomplete() {
            angular.element(document.querySelector('#finddestination')).val('');
        }



        ///
        /// ACTIONS
        ///        
        // OLD change currency  
        $scope.changeCurrency = function (select) {
            $scope.QUERY.budget.currency = $scope.selectedcurrency;
        };
        /**
         * anade una ciudad al tailormade
         */
         $scope.addCityToDestinations = function(dest){
        //$scope.addDestination = function() {
        	var location = {};
            console.log ('itinerary.citytoadd.city ',$scope.itinerary.citytoadd.city);
            if ($scope.itinerary.citytoadd.city.location !== undefined){
                location = $scope.itinerary.citytoadd.city.location;
                $scope.QUERY.destinations.push(location);
                var marker = {
                    fulladdress: location.fulladdress,
                    city : location.city,
                    nights : 1,
                    country : location.country,
                    position: {
                        lat: location.latitude, lng: location.longitude
                    }
                };
                if (location.city ==='') {
                    marker.city = location.country;
                };
                $scope.mapmarkers.push(marker);
                initMap($scope.mapmarkers);
                
                resetautocomplete();
                _getRelatedProdDestination();
                //console.log("fin add ciudad");
            } else{
                $scope.showNoCity = true;
            }

        };
        /**
         * quita una ciudad al tailormade
         */
        $scope.deleteDestination = function (destination) {
            var index = -1;
            for (var i = 0; i < $scope.mapmarkers.length; i++) {
                if ($scope.mapmarkers[i].fulladdress == destination.fulladdress) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                $scope.mapmarkers.splice(index, 1);
            }
            index = -1;
            for (var i = 0; i < $scope.QUERY.destinations.length; i++) {
                if ($scope.QUERY.destinations[i].fulladdress == destination.fulladdress) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                $scope.QUERY.destinations.splice(index, 1);
            }
            
            if ($scope.mapmarkers.length == 0){
                console.log('Sin markers',$scope.mapmarkers);
                initMap([], 3, false);
            }else {
                initMap($scope.mapmarkers);
            }
            _getRelatedProdDestination();
        };


        // Launch Related Search
        var _getRelatedProdDestination = function(){
            $scope.queryRelated.destinations = [];
            for (var i = 0; i < $scope.QUERY.destinations.length; i++) {
                if ($scope.QUERY.destinations[i].countrycode){
                   var dummy = {cc : $scope.QUERY.destinations[i].countrycode, city : ''};
                   if ($scope.QUERY.destinations[i].city != ""){
                        dummy.city = $scope.QUERY.destinations[i].city;
                   }
                   $scope.queryRelated.destinations.push(dummy);
                   // permito que se busque de nuevo min budget

                   $scope.loadMinBudget = false;
                }
            };
            $scope.queryRelated.step = 'dest';
            $scope.$broadcast('relatedSearch', $scope.queryRelated);
        };

        //Build data for month selector 
        function _buildAvailableMonths() {
            var today = new Date();
            var lastmonth = new Date(today.getFullYear() + 2, 11, 1, 0, 0, 0, 0);


            var iterator = new Date(today.getFullYear(), today.getMonth(), 1);
            var tt = true;
            while (lastmonth >= iterator) {
                var availmonth = {
                    monthname: _getMonthNameSpanish(iterator.getMonth()),
                    monthindex: iterator.getMonth(),
                    year: iterator.getFullYear(),
                    selectiontext: _getMonthNameSpanish(iterator.getMonth()) + ' ' + iterator.getFullYear()
                };

                if (tt) { $scope.selectnewmonth = availmonth; tt = false; }

                $scope.availablemonths.push(availmonth);
                iterator.setMonth(iterator.getMonth() + 1);

            }
        }
         // FIX WEEK TO DAYS 
        function _getDayOfweek(week){
            var day = 1;
            switch(week) {
                case '1':
                    day = 1;
                    break;
                case '2':
                    day = 8;
                    break;
                case '3':
                    day = 15;
                    break;
                case '4':
                    day = 22;
                    break;
                default:
                    day = 1;
            }
            return day;
        }

        $scope.newmonthselected = function () {
            // old structure
            $scope.QUERY.dates.month.monthnumber = Number($scope.selectnewmonth.monthindex)+ 1;
            $scope.QUERY.dates.month.monthname = _getMonthNameSpanish($scope.selectnewmonth.monthindex);
            $scope.QUERY.dates.month.monthyear = $scope.selectnewmonth.year;
            
            // new date structure
            //$log.log('$scope.QUERY.dates.week',$scope.QUERY.dates.week);
            if ($scope.QUERY.dates.week != 0 && $scope.QUERY.dates.week != null && $scope.QUERY.dates.week != undefined){
                $scope.QUERY.dates.arrivaldate = new Date($scope.QUERY.dates.month.monthyear,$scope.selectnewmonth.monthindex, _getDayOfweek($scope.QUERY.dates.week));
                $scope.QUERY.dates.arrival.day = _getDayOfweek($scope.QUERY.dates.week);
            } else {
                $scope.QUERY.dates.arrivaldate = new Date($scope.QUERY.dates.month.monthyear,$scope.selectnewmonth.monthindex, 1);
                $scope.QUERY.dates.arrival.day = 1;
            }
            $scope.QUERY.dates.arrival.month = $scope.selectnewmonth.monthindex;
            $scope.QUERY.dates.arrival.year = $scope.selectnewmonth.year;
            $scope.QUERY.dates.arrival.monthname_en = _getMonthNameEnglish($scope.selectnewmonth.monthindex);
            $scope.QUERY.dates.arrival.monthname_es = _getMonthNameSpanish($scope.selectnewmonth.monthindex);
            $log.error('>>>>>> dates : ',$scope.QUERY.dates);
        };

        $scope.buildAccomodation = function(){
            // set paxs
            
            var paxs = 0;
            var pax = {
                single: 0,
                double: 0,
                triple: 0
            };
            var adults = 0;
            var kids = 0;
            for (var i = $scope.QUERY.roomDistribution.length - 1; i >= 0; i--) {
                paxs = paxs+$scope.QUERY.roomDistribution[i].paxList.length;
                switch ($scope.QUERY.roomDistribution[i].roomCode){
                    case 'single':
                        pax.single = pax.single + 1;
                        break;
                    case 'double':
                        pax.double = pax.double + 2;
                        break;
                    case 'triple':
                        pax.triple = pax.triple + 3;
                        break;
                }
                    for (var j = $scope.QUERY.roomDistribution[i].paxList.length - 1; j >= 0; j--) {
                        
                        //el primer pax sera el holder
                        if((i == j) && (i==0)){
                            $scope.QUERY.roomDistribution[i].paxList[j].holder=true;                      
                        }
                        var age = $scope.QUERY.roomDistribution[i].paxList[j].age;
                        if (age == -1){
                            $scope.QUERY.roomDistribution[i].paxList[j].typePax = "adult"
                            adults = adults+1;
                        }else if (age<18){
                            $scope.QUERY.roomDistribution[i].paxList[j].typePax = "child"
                            kids = kids+1;
                        }else {
                            $scope.QUERY.roomDistribution[i].paxList[j].typePax = "adult"
                            adults = adults+1;
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
            //
            //
        };

        $scope.addRoom = function(setRoom){
            var noage = true;
            var numRoom = Number($scope.QUERY.roomDistribution.length);
            if (setRoom == undefined){
               setRoom = $scope.local.rooms[1];
               noage = false;
            }
            var dummy = {
                    "numRoom" : numRoom,
                    "roomType" : setRoom,
                    "paxList" : []
                };
            dummy = $scope.updateTravelersRoom(dummy, noage);
            $scope.QUERY.roomDistribution.push(dummy);
            $scope.buildAccomodation();
        };
       
        $scope.deleteRoom = function(index){
            $scope.QUERY.roomDistribution.splice(index, 1);
            $scope.buildAccomodation();
        };

        $scope.updateTravelersRoom =  function(room, noage){
            //$log.log("updateTravelersRoom", room);
            room.paxList = [];
            room.roomType = $scope.local.rooms[room.roomType.pax-1];
            room.slug = room.roomType.roomCode+room.numRoom;
            for (var i = 0; i< room.roomType.pax; i++) {
                var travelerDummy = {};
                if (noage){
                    travelerDummy = {
                        "typePax" : "",
                        "age" : -1
                    };
                } else {
                    travelerDummy = {
                        "typePax" : "",
                        "age" : 30
                    };
                }
                room.paxList.push(travelerDummy);
            }
            $scope.buildAccomodation();
            return room;
        };

        /**
         * obtiene el precio minimo para el viaje indicado (tirando del api nueva)
         */
        $scope.getMinBudgetValues = function(){
            // get min day price for country 
            $scope.minBudgetValues =[];

            var element = 0;
            var arrCc = [];
            for (var i = $scope.QUERY.destinations.length - 1; i >= 0; i--) {
                arrCc.push($scope.QUERY.destinations[i].countrycode);
            }
            
            arrCc = arrayUnique(arrCc);            
            for (var i = 0; i < arrCc.length; i++) {
                // convertir el country code a minuscula, si no no lo encuentra pues los codigos en cms son en minuscula
                var str =  arrCc[i];
                var res = str.toLowerCase();                
                var rq = {
                         command: 'findone',
                         service: 'api',
                         request: {
                             query: { slug: res },
                             collectionname: 'Countries'
                         }
                     };

                 var rqCB = yto_api.send(rq);

                 // response OK
                 rqCB.on(rqCB.oncompleteeventkey, function (data) {                
                     element++;
                     if (data.averageEuro != null && data.averageEuro != undefined){
                         $scope.minBudgetValues.push(data.averageEuro);
                     } else {
                         // aplico el mínimo
                         $scope.minBudgetValues.push(50);
                     }
                     $scope.calculateMinBudget(element);
                     $scope.loadMinBudget = true;            
                 });
                 // response KO
                 rqCB.on(rqCB.onerroreventkey, function (err) {                         
                     console.log(error);
                     $scope.calculateMinBudget(); 
                     $scope.showLoadBudget = false;
                     $scope.loadMinBudget = true;
                 });
            }         
        };
        
        /**
         * calcular el precio minimo
         */
        $scope.calculateMinBudget = function(lastElement){
            var minBudgetResult = 0;
            if (lastElement == $scope.minBudgetValues.length){
                for (var i = 0; i <  $scope.minBudgetValues.length; i++) {
                    minBudgetResult = minBudgetResult + $scope.minBudgetValues[i];
                }
                minBudgetResult = (minBudgetResult/$scope.minBudgetValues.length) * $scope.QUERY.dates.duration;
                $scope.minBudgetResult = minBudgetResult;
                $scope.showLoadBudget = false;

            } else {
                minBudgetResult = 50 * $scope.QUERY.dates.duration;
                $scope.minBudgetResult = minBudgetResult;
            }            
        };

        $scope.lessThanMinBudget = function(){
            if ($scope.minBudgetResult > $scope.QUERY.budget.cost){
                return true;
            } else {
                return false;
            }
        };



        // Modal warning dates clientModalWarningDatesCtrl

         $scope.openWarningDates = function () {
            // flag to know if the user see the alert popup
            if ($scope.showWaringDates || !$scope.QUERY.dates.knowingdates){
                $scope.triggerTabEvent('date');
            } else {
                var modalData = {
                    arrivaldate : $scope.QUERY.dates.arrivaldate,
                    destinationstr : $scope.showDestinations()
                };

                var modalInstance = $uibModal.open({
                  templateUrl: '/partials/modals/taylormade-modal-warning-dates.html.swig',
                  controller: 'clientModalWarningDatesCtrl',
                  size: '',
                  resolve: {
                    data: function () {
                      return modalData;
                    }
                  }
                });

                modalInstance.result.then(function (group) {
                        $scope.triggerTabEvent('date');
                        $scope.showWaringDates = true;
                    }, function () {
                        //$log.log('cancelado modal');
                        $scope.showWaringDates = true;
                });
            }

        };




        //
        //
        // RELATED PRODUCT EVENT
        //
        //
        $scope.$on('relatedproduct', function(event, related){
            $scope.relatedproduct = related;
            if (debug)
                console.log('main related event : ', $scope.relatedproduct);
        });
        
        //
        //
        // LOGIN USER
        //
        //

        $scope.$on('userlogged', function (event, session) {
            console.log('User logged...! lets recover the traveler data...');
            if (session) {
                recoverTraveler();
                $scope.triggerTabEvent('confirm');
            }
        });

        $scope.$on('userlogged_error', function (event, error) {
            tools_service.showPreloader($scope, '');
            if (error) {
                toaster.pop('error', 'Error en identificacion', error.error);
            }
        });


//        $scope.signUp = function () {
//            if ($scope.newUser.password == $scope.newUser.repassword) {
//                _sign_up($scope.newUser, function (session) {
//                    recoverTraveler();
//                });
//            } else {
//                toaster.pop(
//                    'error',
//                    'Sign Up',
//                    'Las contraseñas no coinciden. Por favor revisa los campos de contraseña y confirma contraseña');
//            }
//        };
        //Sign Up procedure 
        $scope.$on('userlogedsocialmethod', function (event, session) {
            //console.log('social login...!');
            //console.log(session);
            recoverTraveler();
            tools_service.showPreloader($scope, '');
            $scope.triggerTabEvent('confirm');
        });

        $scope.$on('userlogedsocialmethod_error', function (event, error) {
            // console.log('social login...!');
            //console.log(error);
            tools_service.showPreloader($scope, '');
            toaster.pop(
                    'error',
                    'Identificacion',
                    error.error);
        });
        
        /**
         * devuelve true si esta loguado como traveler o affiliate
         */
        $scope.userlogged = function () {
            return ($scope.QUERY.traveler !== null || $scope.QUERY.affiliate !== null);
        };


        $scope.loginTraveler = function () {
            _login($scope.logininfo.email, $scope.logininfo.password);
        };

        // Only for omt
        $scope.forgotpassword = function (lang) {
            if (lang == 'ES') {
                window.location = '/cambiar-contrasena';
            }
            else {
                window.location = '/reset-password';
            }  
        };

        

        //
        //
        // VALIDATIONS FUNCTIONS
        // 
        // 
        var _validateOwner = function(){
            if ($scope.QUERY.title.length > 0){
                return true;
            } else{
                toaster.pop('error','Identifica la petición', 'Necesitas un nombre de referencia para solicitar presupuesto')
                return false;
            }
        };

        var _validateDestinations = function(){
            if ($scope.QUERY.destinations.length > 0){
                //$log.log("destinos OK");
                return true;
            } else{
                toaster.pop('error','Agrega un destino', 'Necesitas al menos un destino para solicitar presupuesto')
                return false;
            }
        };
        var _validateTags = function(){
            if ($scope.QUERY.whattodo.length > 0){
                return true;
            } else {
                $log.log("NO tags");
                return false;
            }
        }
        var _validatePax = function(){
            if ($scope.QUERY.passengers[0].acomodattion.howmany > 0){
                return true;
            } else {
                toaster.pop('error','Cantidad de Pasajeros', 'Debes decirnos cuantos quieren viajar');
                return false;
            }
        }
        var _validateDates = function(){
            //$log.log($scope.QUERY.dates);
            // compruebo que la duración sea mayor a 0
            if ($scope.QUERY.dates.duration > 0){
                // compruebo si conoce fechas
                if ($scope.QUERY.dates.knowingdates){
                    // compruebo si tiene vuelos
                    if ($scope.QUERY.dates.alreadygotflights){
                        // compruebo si si ha completado los datos de ida y vuelta con minimo 3 caracteres
                        if ($scope.QUERY.dates.dataflightsIn.length > 3 && $scope.QUERY.dates.dataflightsOut.length > 3){
                            return true;
                        } else{
                            toaster.pop('error','Falta Información', 'Debes decirnos los datos de tu vuelo');
                        }
                    }else{
                        if ($scope.QUERY.dates.duration > 0){
                            return true;
                        } else{
                            toaster.pop('error','Duración Incorrecta', 'Debes decirnos una duración del viaje');
                        }
                    }
                } else {
                    $scope.QUERY.dates.arrivaldate = null;
                    return true;
                }
            } else{
                toaster.pop('error','Duración Incorrecta', 'Debes decirnos una duración del viaje');
            }           
        }
        var _validateHotcats = function(){
            if( $scope.QUERY.hosting.lowcosthotels ||
                $scope.QUERY.hosting.standarhotels ||
                $scope.QUERY.hosting.superiorhotels ||
                $scope.QUERY.hosting.charmhotels ||
                $scope.QUERY.hosting.luxuryhotels){
                return true;
            }else{
                toaster.pop('error','Categoría de hotel', 'Por favor, dinos que tipo de alojamiento deseas.');
            }
            
        }
        var _validateBudget = function(){
            if ($scope.QUERY.group != null && $scope.QUERY.budget.cost > 0){
                return true;
            } else {
                if ($scope.QUERY.budget.cost > 0){
                    if(!$scope.lessThanMinBudget()){
                        return true;
                    }
                } else {
                    if ($scope.QUERY.budget.cost <= 0){
                        toaster.pop('error','Presupuesto', 'Por favor, ingresa un valor máximo por persona.');
                    } else {
                        toaster.pop('error','Presupuesto', 'Por favor, introduce una cantidad válida');
                        return false;
                    }
                }
            }
            //  else if(!$scope.lessThanMinBudget()){
            //     return true;
            // }else if ($scope.QUERY.budget.cost <= 0){
            //     toaster.pop('error','Presupuesto', 'Por favor, ingresa un valor máximo por persona.');
            // } else {
            //     toaster.pop('error','Presupuesto', 'Por favor, ingresa un valor mayor o igual al mínimo.');
            // }
        }
        var _validateAdditionalInfo = function(){
            var valid = false;
            if ($scope.QUERY.additionalinfo.trip == 'grouptrip' || $scope.QUERY.additionalinfo.trip == 'privatetrip'){
                valid = true;
            } else {
                valid = false;
            }
            if (valid && $scope.QUERY.additionalinfo.regimen.length == 2){
                valid = true;
            } else {
                valid = false;
            }

            if (valid){
               return true;
            } else {
               toaster.pop('error','Información Adicional', 'Por favor, completa las preguntas.');
            }
        };




        //
        //
        // STEP EVENTS
        //
        //


        $scope.triggerTabEvent = function (index) {
            //console.log('tab : ',index);
            var indexTabSelected = $scope.tab.progress.indexOf(index);
            var valid = false;
            switch(index) {
                // title of the request tailormade
                case 'owner':
                    if (_validateOwner()){
                        $scope.tab.controlprogress[indexTabSelected] = true;
                        valid = true;
                        $scope.gotoCero();
                    };
                    break;
                // destinations 
                case 'dest':
                    if (_validateDestinations()){
                        $scope.tab.controlprogress[indexTabSelected] = true;
                        valid = true;
                        $scope.gotoCero();
                    };
                    break;
                // trip tag steps
                case 'tags':
                    $scope.tab.controlprogress[indexTabSelected] = true;
                    valid = true;
                    if (_validateTags()){
                        //$scope.tab.controlprogress[indexTabSelected] = true;
                        //valid = true;
                        $scope.gotoCero();
                        // call related product
                        //*// NO DELETE  
                        // delayed until more product
                        // $scope.queryRelated.tags = [];
                        // if ($scope.QUERY.whattodo.length>0){
                        //     for (var i = 0; i < $scope.QUERY.whattodo.length; i++) {
                        //         if ($scope.QUERY.whattodo[i].slug){
                        //            $scope.queryRelated.tags.push($scope.QUERY.whattodo[i].slug);
                        //         } else {
                        //          $scope.queryRelated.tags = [];
                        //         }
                        //     }
                        //     $scope.queryRelated.step = 'tags';
                        //     $scope.$broadcast('relatedSearch', $scope.queryRelated);
                        // }
                        //*// END NO DELETE
                    } else{
                        //*// NO DELETE 
                        // delayed until more product
                        // $scope.queryRelated.tags = [];
                        // $scope.queryRelated.step = 'tags';
                        // $scope.$broadcast('relatedSearch', $scope.queryRelated);
                        //$scope.tab.controlprogress[indexTabSelected] = true;
                        //*// END NO DELETE
                        valid = true;
                        
                    }
                    break;
                case 'pax':
                    if (_validatePax()){
                        $scope.tab.controlprogress[indexTabSelected] = true;
                        valid = true;
                        $scope.gotoCero();
                    }
                    break;
                case 'date':
                    if (_validateDates()){

                        $scope.tab.controlprogress[indexTabSelected] = true;
                        valid = true;
                        $scope.gotoCero();
                        // call related product
                        if (!$scope.QUERY.dates.knowingdates){
                            var numMonth = '';
                            if ($scope.QUERY.dates.month.monthnumber < 10){
                                numMonth = '0'+$scope.QUERY.dates.month.monthnumber;
                            } else {
                                numMonth = $scope.QUERY.dates.month.monthnumber;
                            }
                            $scope.queryRelated.date = '01-'+numMonth+'-'+$scope.QUERY.dates.month.monthyear;
                        } else {

                            if (angular.isDate($scope.QUERY.dates.arrivaldate)){
                                $log.log('is date : ', $scope.QUERY.dates.arrivaldate);
                                var numMonth = Number($scope.QUERY.dates.arrivaldate.getMonth())+1;
                                if (numMonth < 10){
                                    numMonth = '0'+numMonth;
                                } else {
                                    numMonth = numMonth;
                                }
                                $scope.queryRelated.date = '01-'+numMonth+'-'+$scope.QUERY.dates.arrivaldate.getFullYear();
                            }
                        }

                        $scope.queryRelated.days = $scope.QUERY.dates.duration;
                        $scope.queryRelated.step = 'date';
                        $scope.$broadcast('relatedSearch', $scope.queryRelated);
                    }
                    break;
                case 'hotcat':
                    if (_validateHotcats()){
                        valid = true;
                        $scope.gotoCero();
                        //

                        //
                        // call related product
                        if( $scope.QUERY.hosting.lowcosthotels){
                            $scope.queryRelated.tags.push("economicos");
                        }
                        if( $scope.QUERY.hosting.standarhotels){
                            $scope.queryRelated.tags.push("confort");
                        }
                        if( $scope.QUERY.hosting.superiorhotels){
                            $scope.queryRelated.tags.push("confort");
                        }
                        if( $scope.QUERY.hosting.charmhotels){
                            $scope.queryRelated.tags.push("confort");
                        }
                        if( $scope.QUERY.hosting.luxuryhotels){
                            $scope.queryRelated.tags.push("lujo");
                        }
                        // array unique
                        $scope.queryRelated.tags = unique($scope.queryRelated.tags);
                        $scope.queryRelated.step = 'tags';
                        $scope.$broadcast('relatedSearch', $scope.queryRelated);
                        // search min budget values
                    }
                    break;
                case 'budget':
                    if (_validateBudget()){
                        $scope.queryRelated.price = $scope.QUERY.budget.cost;
                        $scope.queryRelated.step = 'budget';
                        $scope.$broadcast('relatedSearch', $scope.queryRelated);
                        valid = true;
                        $scope.gotoCero();
                    }
                    break;
                case 'info':
                    if(_validateAdditionalInfo()){
                        if ($scope.QUERY.additionalinfo.trip == 'grouptrip'){
                            $scope.queryRelated.kind = 'group';
                        } else if ($scope.QUERY.additionalinfo.trip == 'privatetrip'){
                            $scope.queryRelated.kind = 'private';
                        }
                        $scope.queryRelated.step = 'info';
                        $scope.$broadcast('relatedSearch', $scope.queryRelated);
                        valid = true;
                        $scope.gotoCero();
                    }
                    break;
                case 'login':
                        valid = true;
                        $scope.gotoCero();
                    break;
                case 'confirm':
                        valid = true;
                        $scope.gotoCero();
                    break;
                case 'complete':
                        valid = true;
                        $scope.gotoCero();
                    break;
                default:
                   //
            }
            if(valid){
                
                //// first true all to show resume window
                $scope.tab.controlprogress[0] = true;
                // se actual tab to valid
                $scope.tab.controlprogress[indexTabSelected] = true;
                //console.log('set tab ',index+1);
                $scope.tab.setTab($scope.tab.progress[indexTabSelected+1]);
            }
        };

     

        //
        //
        //
        //  GROUP FUNCTIONS
        //
        //

        $scope.openGroup = function () {
            
            var modalInstance = $uibModal.open({
              templateUrl: '/partials/modals/taylormade-modal-group.html.swig',
              controller: 'clientModalGroupCtrl',
              size: '',
              resolve: {
                group: function () {
                  return $scope.QUERY.group;
                }
              }
            });

            modalInstance.result.then(function (group) {
                    $scope.QUERY.group = group;
                    //$log.log('$scope.QUERY.group', $scope.QUERY.group)
                    updateGroupBooking();               
                    $scope.checkGroup = true;
                    $scope.QUERY.additionalinfo.trip = 'grouptrip';
                }, function () {
                    $scope.checkGroup = false;
                    $scope.QUERY.group = null;
                    $scope.QUERY.roomDistribution = [];
                    $scope.addRoom();
                });

        };

        function updateGroupBooking(){

            if ($scope.checkGroup){
                 if ($scope.QUERY.group.rooms.single > 0){
                    for (var i = 0; i< $scope.QUERY.group.rooms.single; i++){
                        $scope.addRoom ($scope.local.rooms[0]);
                    }
                 };
                 if ($scope.QUERY.group.rooms.double > 0){
                 for (var i = 0; i< $scope.QUERY.group.rooms.double; i++){
                        $scope.addRoom ($scope.local.rooms[1]);
                    }
                 }
                 if ($scope.QUERY.group.rooms.triple > 0){
                 for (var i = 0; i< $scope.QUERY.group.rooms.triple; i++){
                        $scope.addRoom ($scope.local.rooms[2]);
                    }
                 }
            };
            $scope.accomodationStr();
            $scope.triggerTabEvent('pax');
        };

        $scope.isAGroup = function(check){
            if (check){
                $scope.QUERY.roomDistribution = [];
                $scope.openGroup();
            } else {
                $scope.QUERY.group = null;
                $scope.QUERY.roomDistribution = [];
                $scope.addRoom();
            }
        }




        //
        //  
        // 
        // TAB MANAGER
        // 
        // 
        $scope.tab = {
            progress :['all','owner', 'dest', 'tags', 'date', 'hotcat', 'pax','info','budget','login','confirm','complete'],
            controlprogress : [],
            activeTab : 'owner',
            isSet : function(checkTab) {
              return this.activeTab === checkTab;
            },
            show : function(tab){
                var index = this.progress.indexOf(tab);
                return this.controlprogress[index]
            },
            setTab : function(setTab) {
                var prev = this.progress.indexOf(setTab)-1;
                if (setTab == 'budget'){
                    $scope.getMinBudgetValues();
                };

                if (setTab == 'login'){
                    if ($scope.userlogged()){
                        setTab = 'confirm'
                    };
                }

                if(!$scope.rqSavedOK){
                    if (setTab != 'confirm'){
                        if(this.controlprogress[prev]){
                            this.activeTab = setTab;
                        } else {
                             toaster.pop('error', 'Ups!', 'por favor completa el paso anterior');
                        }
                    } else {
                        this.activeTab = setTab;
                    }
                } else {
                    this.activeTab = 'complete';
                }
            },
            complete : function(checkTab){
                return this.controlprogress[this.progress.indexOf(checkTab)];
            }
        }


        //
        //
        //
        // SAVE QUERY
        //
        //

        
        /**
         * funcion que guarda la query en mongo
         */
        $scope.sendQUERY = function () {
        	//console.log("voy a salavar la query1");
            $scope.changeswithoutsave = false;
            window.onbeforeunload = null;
            if ($scope.session.agencyid){
                $scope.QUERY.affiliateuser = $scope.session.agencyid;
            }
            if($scope.QUERY.affiliate!=null && $scope.QUERY.affiliate.code !=null ){
            	$scope.QUERY.affiliatecode = $scope.QUERY.affiliate.code;            	
            }
            
            // convertir la fecha de salida  en dia mes ano
            if($scope.QUERY.dates.arrivaldate != null && angular.isDate($scope.QUERY.dates.arrivaldate)){
                
                $scope.QUERY.dates.arrival = {
                        "year": $scope.QUERY.dates.arrivaldate.getFullYear(),
                        "month": $scope.QUERY.dates.arrivaldate.getMonth(),         
                        "day": $scope.QUERY.dates.arrivaldate.getDate()
                };      
            }
            tools_service.showPreloader($scope, 'show');
            try{
            	
            	//console.log("voy a salavar la query: ",$scope.QUERY);
            	 var rq = {
    	            command: 'save',
    	            service: 'api',
    	            request: {
    	            	data : $scope.QUERY,
    	            	query: {code : $scope.QUERY.code},
	                    collectionname: 'UserQueries',
	                    oncompleteeventkey: 'save.done',
                        onerroreventkey: 'save.error',
                        populate: [{path: 'affiliate'}]
    	            }
    	        };
    	        var rqCB = yto_api.send(rq);
    	        
    	        // on response OK
		        rqCB.on(rqCB.oncompleteeventkey, function (query) {
		        	console.log("Respuesta: ",query);
	        		if (debug){
	        			$log.log('save recibo : ',query)
	        		}
	        		$scope.QUERY.code = query.code;					
					
	        		
	        		// ******************************
	        		// si es una query de un traveler
	        		// ******************************
	        		if ($scope.QUERY.traveler != null && $scope.QUERY.traveler.email){
//	        			
//	        			// 1) mail a openmarket noficando la request
//	        			if ($scope.QUERY.isnew){
//	        				var subject = "Nueva petición a medida "+$scope.QUERY.code+" de "+$scope.QUERY.traveler.firstname + ($scope.QUERY.traveler.lastname!=null ? (" "+$scope.QUERY.traveler.lastname) : "");
//	        			} else {
//	        				var subject = "Modificación de petición a medida "+$scope.QUERY.code+" de "+$scope.QUERY.traveler.firstname + ($scope.QUERY.traveler.lastname!=null ? (" "+$scope.QUERY.traveler.lastname) : "");
//	        			}
//					
//					
//	        			var CAclienteUrl = location.protocol+'//'+location.host+'/client-request/'+$scope.QUERY.code;
//	        			var CAadminUrl = location.protocol+'//'+location.host+'/omt-response?code='+$scope.QUERY.code;
//	        			if (debug) {
//	        				$log.log('CAadminUrl : ',CAadminUrl)
//	        				$log.log('CAclienteUrl : ',CAclienteUrl)
//	        			}
//	        			
//	        			var to = ['requests@openmarket.travel'];
//	        			var contentObj = {
//	        				ca : {
//	        					url : CAadminUrl,
//	        					txt : 'VER PETICIÓN'
//	        				},
//	        				request : $scope.QUERY,
//	        				related : $scope.relatedproduct
//	        			};
//	        			
	        			// 2.1) si es admin
	        			if ($scope.session.user.isAdmin){					
	        				$log.error('Admin - notification not sent');
	        				$log.log('sending... : ', $scope.QUERY);					
	        			}
	        			// 2.2) si no es admin anotar el evento en google analytics
	        			else {					
	        				// google analytics event to track action
	        				ga('send', {
	        					'hitType': 'event',          // Required.
	        					'eventCategory': 'Request',   // Required.
	        					'eventAction': 'ok',      // Required.
	        					'eventLabel': 'Request Tailor made',
	        					'eventValue': 1
	        				});
	        				// end google analytics event to track action
					
	        				// 2.3) enviar mail al traveler y OMT  notificando la nueva request
//	        				$scope.notification('[OMT] ' +  subject, 'omtnewrequest', contentObj, to, function(response){
//	        					if (response){
//	        						to = [$scope.QUERY.traveler.email];
//	        						contentObj.ca.url = CAclienteUrl;
//					
//	        						if ($scope.QUERY.isnew){
//	        							subject = "Tu petición a medida: "+$scope.QUERY.code
//	        						} else{
//	        							subject = "Modificación de tu petición a medida: "+$scope.QUERY.code;
//	        						}
//	        						$scope.notification('[OMT] ' +  subject, 'usernewrequest', contentObj, to, function(response){
//	        							if (response){
//	        								$log.log("send ok - notification booking request");
//	        							} else{
//	        								$log.error("error - notification user fail");
//	        							}
//	        						})
//	        					} else{
//	        						$log.error("error - notification OMT fail");
//				              	}
//				          	});   
				      	}
				  	} 
        		
	        		
	        		// ******************************
	        		// si es una query de un afiliado
	        		// ******************************	        		
	        		else if ($scope.QUERY.affiliate != null && $scope.QUERY.affiliate.contact && $scope.QUERY.affiliate.contact.email){
	        			console.log("Es un afiliado: ",$scope.QUERY.affiliate);
	        			
//	        			// 1) crear los subject de los mail
//	        			if ($scope.QUERY.isnew){
//	        				var subject = "Nueva petición a medida (FRONT) "+$scope.QUERY.code+" de "+$scope.QUERY.affiliate.company.name;
//	        				var subjectOmt = "Nueva petición a medida (FRONT)"+$scope.QUERY.code+" del afiliado "+$scope.QUERY.affiliate.company.name;
//	        			} else {
//	        				var subject = "Modificación de petición a medida "+$scope.QUERY.code+" de "+$scope.QUERY.affiliate.company.name;
//	        				var subjectOmt = "Modificación de petición a medida "+$scope.QUERY.code+" del afiliado "+$scope.QUERY.affiliate.company.name;
//	        			}
//					
//						        			
//	        			var CAclienteUrl = location.protocol+'//'+location.host+'/affiliate/request/'+$scope.QUERY.code;
//	        			var CAadminUrl = location.protocol+'//'+location.host+'/omt-response?code='+$scope.QUERY.code;
//	        			if (debug) {
//	        				$log.log('CAadminUrl : ',CAadminUrl)
//	        				$log.log('CAclienteUrl : ',CAclienteUrl)
//	        			}
//	        			
//	        			var to = ['requests@openmarket.travel'];	        			
//	        			var contentObj = {
//	        				ca : {
//	        					url : CAadminUrl,
//	        					txt : 'VER PETICIÓN'
//	        				},
//	        				request : $scope.QUERY,
//	        				related : $scope.relatedproduct
//	        			};
	        			
	        			// 2.1) si es admin
	        			if ($scope.session.user.isAdmin){					
	        				$log.error('Admin - notification not sent');
	        				$log.log('sending... : ', $scope.QUERY);					
	        			}
	        			// 2.2) si no es admin anotar el evento en google analytics
	        			else {					
	        				// google analytics event to track action
	        				ga('send', {
	        					'hitType': 'event',          // Required.
	        					'eventCategory': 'Request',   // Required.
	        					'eventAction': 'ok',      // Required.
	        					'eventLabel': 'Request Tailor made',
	        					'eventValue': 1
	        				});
	        				// end google analytics event to track action
					
//	        				// 2.3) enviar mail a OMT 
//	        				$scope.notification('[OMT] ' +  subjectOmt, 'omtnewrequest', contentObj, to, function(response){
//	        					if (response){
//	        						to = [$scope.QUERY.affiliate.contact.email];
//	        						contentObj.ca.url = CAclienteUrl;
//					
//	        							        						
//	        						// enviar mail al afiliado
//	        						$scope.notification('[OMT] ' +  subject, 'usernewrequest', contentObj, to, function(response){
//	        							if (response){
//	        								$log.log("send ok - notification booking request");
//	        							} else{
//	        								$log.error("error - notification user fail");
//	        							}
//	        						})
//	        					} else{
//	        						$log.error("error - notification OMT fail");
//					              }
//					        });   
					    }	        			
	        		}
        			// no es traveler ni afiliado, o le falta informacion al usuario
	        		else {
					      $log.error("error - not email user");
					}
					
					if($scope.QUERY.isnew){
						toaster.pop('success', 'Petición recibida', 'Muchas gracias!');
					} else {
						toaster.pop('success', 'Petición modificada', 'Cambios guardados');
					}
					$scope.rqSended = true;
					$scope.rqSavedOK = true;
					tools_service.showPreloader($scope, '');
					//$scope.triggerTabEvent('complete');
					$scope.triggerTabEvent('confirm');
					$scope.changeswithoutsave = false;		              
		        });
		        
		        //on response KO
		        rqCB.on(rqCB.onerroreventkey, function (err) {
		        	console.log(err);
		        	tools_service.showPreloader($scope, '');
                    toaster.pop('error', 'Ocurrió un error al enviar la solicitud');

                    if (!$scope.session.user.isAdmin){
                        // google analytics event to track action
                        ga('send', {
                          'hitType': 'event',          // Required.
                          'eventCategory': 'Request',   // Required.
                          'eventAction': 'error',      // Required.
                          'eventLabel': 'Request Tailor made',
                          'eventValue': 1
                        });
                        // end google analytics event to track action
                    };	        		
		        });
            }
            catch (err) {
                tools_service.showPreloader($scope, '');
                toaster.pop('error', 'Ocurrió un error al enviar la solicitud', err);
                if (!$scope.session.user.isAdmin){
                    // google analytics event to track action
                    ga('send', {
                      'hitType': 'event',          // Required.
                      'eventCategory': 'Request',   // Required.
                      'eventAction': 'error',      // Required.
                      'eventLabel': 'Request Tailor made',
                      'eventValue': 1
                    });
                    // end google analytics event to track action
                };
            }            
        }


        function _dateFix(){
            $scope.QUERY.dates.duration = Number($scope.QUERY.dates.duration);
            // check kind of date / aprox o exact
            if ($scope.QUERY.dates.knowingdates){
                // have exact date
                if ($scope.QUERY.dates.arrival != null){
                    // is new structure made for request a new date
                    //$log.log('$scope.QUERY.dates.arrival',$scope.QUERY.dates.arrival);
                    $scope.QUERY.dates.arrivaldate = new Date($scope.QUERY.dates.arrival.year, $scope.QUERY.dates.arrival.month, $scope.QUERY.dates.arrival.day);
                } else {
                    // is old structure made from date query
                    $scope.QUERY.dates.arrivaldate = new Date($scope.QUERY.dates.arrivaldate);
                   /// $log.log('$scope.QUERY.dates.arrivaldate',angular.isDate($scope.QUERY.dates.arrivaldate));
                    if (!angular.isDate($scope.QUERY.dates.arrivaldate)){
                        $scope.QUERY.dates.arrivaldate = new Date();
                        //$log.log('empty date : new one',  $scope.QUERY.dates.arrivaldate);
                    } else {
                        // copy to new structure
                        $scope.QUERY.dates.arrival = {
                            year : $scope.QUERY.dates.arrivaldate.getFullYear(),
                            month : $scope.QUERY.dates.arrivaldate.getMonth(),
                            day : $scope.QUERY.dates.arrivaldate.getDate(),
                            monthname_es : _getMonthNameSpanish($scope.QUERY.dates.arrivaldate.getMonth()),
                            monthname_en : _getMonthNameEnglish($scope.QUERY.dates.arrivaldate.getMonth())
                        };
                    };
                }
            } else {
               
                // have aproximated date
                $scope.QUERY.dates.arrivaldate = new Date($scope.QUERY.dates.month.monthyear, $scope.QUERY.dates.month.monthnumber -1, $scope.QUERY.dates.week*7);
                $scope.QUERY.dates.arrival = {
                    year : $scope.QUERY.dates.month.monthyear,
                    month : $scope.QUERY.dates.month.monthnumber -1,
                    day : _getDayOfweek($scope.QUERY.dates.week),
                    monthname_es : _getMonthNameSpanish($scope.QUERY.dates.month.monthnumber -1),
                    monthname_en : _getMonthNameEnglish($scope.QUERY.dates.month.monthnumber -1)
                };
                
            }
            for (var i=0, leng = $scope.availablemonths.length; i < leng; i++){
               if($scope.availablemonths[i].monthindex == $scope.QUERY.dates.arrival.month && $scope.availablemonths[i].year == $scope.QUERY.dates.arrival.year ){
                    $scope.selectnewmonth = $scope.availablemonths[i];
                }
            }
        }


        function _canEditQuery(query){
            return true
           // return $scope.session.user.isAdmin ||  ($scope.session.user.isAffiliate && query.affiliate != undefined && ($scope.session.user.code == query.affiliate.code));
        }

        //
        //
        //  GET QUERY
        //
        //

        /**
         * recupera la query mediante su codigo (usando api nueva)
         */
         function _recoverQUERY(code) {
            if (code != null){
                try {
                    tools_service.showPreloader($scope, 'show');

                    var rq = {
                        command: 'findone',
                        service: 'api',
                        request: {
                            query: { code: code },
                            collectionname: 'UserQueries'
                        }
                    };

                    var rqCB = yto_api.send(rq);

                    // response OK
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        
                    	if(_canEditQuery(rsp)){
                            $scope.QUERY = rsp;
                            
                            $scope.tab.controlprogress = [true,true,true,true,true,true,true,true,true,true,true]
                            initTags();
                            //$log.log('antes de tratar dates --->',$scope.QUERY.dates);
                            //
                            _dateFix();
                            if($scope.QUERY.group != null && $scope.QUERY.group.adults != null){
                                $scope.checkGroup = true;
                            }
                            //
                            //$log.log('luego de tratar dates --->',$scope.QUERY.dates);
                            tools_service.showPreloader($scope, 'hide');
                            $scope.queryRelated.isUpdate = true;
                        } else{
                            tools_service.showPreloader($scope, 'hide');
                            tools_service.showFullError($scope, "show", 'error', 'No tienes permiso para editar esta solicitud.');
                        }
                        
                    });
                    // response KO
                    rqCB.on(rqCB.onerroreventkey, function (err) {                
                        $log.error("error in _recoverQUERY. Details: ",err);
                        console.log('ERROR en _recoverQUERY. Details: ',err);                        
                    });                    
                }
                catch (err) {
                    console.error(err);
                }
            } else {
                 tools_service.showPreloader($scope, 'hide');
                 $log.log('query code null')
            }
            
        }


         function _editQuery() {
             if (editiondata != null && editiondata != '') {
                 tools_service.showPreloader($scope, 'show');
                 $scope.QUERY = editiondata != null && typeof (editiondata) == 'object' ? editiondata : $scope.QUERY;
                 $scope.tab.controlprogress = [true, true, true, true, true, true, true, true, true, true, true];
                 initTags();
                 _dateFix();
                 if ($scope.QUERY.group != null && $scope.QUERY.group.adults != null) {
                     $scope.checkGroup = true;
                 }
                 tools_service.showPreloader($scope, 'hide');
                 $scope.queryRelated.isUpdate = true;
             }
         }

        //
        //
        //  GET USER
        //
        //
        
        function recoverTraveler(callback) {
            try {
                tools_service.showPreloader($scope, 'show');
                var code = null;
                $scope.session = loginsession;
                $scope.QUERY.traveler = $scope.session.user.rolename == 'traveler' ? loginsession.traveler : null;
                $scope.QUERY.affiliate = $scope.session.user.rolename == 'affiliate' ? loginsession.affiliate : null;
                tools_service.showPreloader($scope, 'hide');

                callback != null ? callback() : null;
            }
            catch (err) {
                console.error(err);
                callback != null ? callback() : null;
            };

        };

        //
        //
        //  GET TRIPTAGS
        //
        //

        /**
         *  Get trip tags content... (tirando de api nuevo)
         */        
        function _getTripTagsContent(callback){         
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { state: 'published' },
                    sortcondition: {sortOrder: 1},
                    collectionname: 'TripTags'
                }
            };

            var rqCB = yto_api.send(rq);

            // response OK
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {               
                var prepare = [];
                for (var i = 0; i < rsp.length; i++) {
                    var dummy = {};
                    dummy = {
                        _id: rsp[i]._id,
                        slug: rsp[i].slug,
                        label: rsp[i].label,
                        label_en: rsp[i].label_en
                    };
                    prepare.push(dummy);
                 };
                 $scope.tripTags = prepare;
                 $scope.showLoadTags = false;
                 if(callback != null){
                     callback();
                 }                
            });
            // response KO
            rqCB.on(rqCB.onerroreventkey, function (err) {                
                $log.error("error tripTags");
                console.log('ERROR en _getTripTagsContent. Details: ',err);
                $scope.showErrorLoadTags = true;
                $scope.showLoadTags = false;
                if (callback) { callback(null); }
            });       
        }



        ///
        ///
        ///INIT
        ///
        ///
        /**
         * inicializa la sesion
         */
        function _init(){
            tools_service.showPreloader($scope, 'show');
            initMap([], 3, false);
            _getTripTagsContent(function(){
                recoverTraveler(function () {
                    _editQuery();
                    //_recoverQUERY(_initLoadQueryString());
                })
            });
        };
        //Build the calendar
        _buildAvailableMonths();
        // add a room default accomodation
        $scope.addRoom();

        _init();

    }]);

app.controller('clientModalGroupCtrl', function ($scope, $uibModalInstance, group) {

    $scope.showErrorCant = false;

    $scope.group ={
        typeGroup : '',
        adults : 0,
        rooms : {
            single : 0,
            double : 0,
            triple : 0
        },
        comments : ''
    };
    
    if (group != null){
        $scope.group = group;
    }
    
    $scope.ok = function () {
        var valid = false;

        if ($scope.group.typeGroup != ''){
            valid = true;
        } else {
            $scope.showErrorType = true;
            valid = false;
        }

        if (valid && $scope.group.adults > 14 ){
            valid = true;
        } else {
            if ($scope.group.adults < 15 ){
                $scope.showErrorCant = true;
            }
            valid = false;
        }

        if (valid){
            $uibModalInstance.close($scope.group);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.getStringTypeGroup = function(){
        var gtype = 'Selecciona un tipo de grupo';
        switch ($scope.group.typeGroup) {
            case 'club':
                gtype = 'Club'
                break;
            case 'students':
                gtype = 'Estudiantes'
                break;
            case 'other':
                gtype = 'Otro'
                break;                
            case 'company':
                gtype = 'Empresas'
                break;                
        };

        return gtype;
    };

    $scope.accomodationStr = function(){

        var str = '';
        var count = 0;
        if ($scope.group.rooms.single>=1){
            str = $scope.group.rooms.single+' individuales';
            count = count+1*$scope.group.rooms.single;
        }
        if ($scope.group.rooms.double>=1){
            str = str +', '+$scope.group.rooms.double+' dobles';
            count = count+2*$scope.group.rooms.double;
        }
        if ($scope.group.rooms.triple>=1){
            str = str +', '+$scope.group.rooms.triple+' triples';
            count = count+3*$scope.group.rooms.triple;
        }

        str = str +': '+count+' pasajeros';
        
        $scope.group.adults = count;
        return str
    };
});


app.controller('clientModalWarningDatesCtrl', function ($scope, $uibModalInstance, data) {

    $scope.destinationstr = data.destinationstr;
    $scope.arrivaldate = data.arrivaldate;
    
    $scope.ok = function () {
            $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

 });

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