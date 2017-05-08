app.controller('filterDatesAndLikeSelector', ['$scope',
    '$location',
    'yto_api',
    'yto_session_service',
    '$rootScope',
    'tools_service',
    '$log',
    '$filter',
    '$http',
    'toaster',
    'ts_table_browser',
    function ($scope,
        $location,
        yto_api,
        yto_session_service,
        $rootScope,
        tools_service,
        $log,
        $filter,
        $http,
        toaster,
        ts_table_browser) {

        //models
        $scope.bookingdatestart = null;
        $scope.bookingdateend = null;
        $scope.tourdatestart = null;
        $scope.tourdateend = null;
        $scope.bookingchargestart = null;
        $scope.bookingchargeend = null;
        $scope.bookingpaystart = null;
        $scope.bookingpayend = null;

        $scope.selectedFilters = {
            dmcs: [],
            selecteddmcs: [],
            affiliates: [],
            selectedaffiliates:[]
        };

        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope[opened] = true;
        };

        $scope.today = function () {
            $scope.createdfrom = new Date();
            $scope.createdto = new Date();
        };


        $scope.clear = function () {
            $scope.createdfrom = null;
            $scope.createdto = null;
        };

        $scope.dateOptions = {
            'currentText': 'hoy',
            'clearText': 'limpiar',
            'closeText': 'cerrar'
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd-MM-yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];


        $scope.datestring = function (datest) {
            var d = new Date(datest);
            return d.toDateString();
        };

        var _resetDateBooking = function () {
            $scope.bookingdatestart = null;
            $scope.bookingdateend = null;
            $scope.tourdatestart = null;
            $scope.tourdateend = null;
            $scope.bookingchargestart = null;
            $scope.bookingchargeend = null;
            $scope.bookingpaystart = null;
            $scope.bookingpayend = null;
            
            $scope.datebooking.$setUntouched();
            $scope.datebooking.$setPristine();
            $scope.datetour.$setUntouched();
            $scope.datetour.$setPristine();

            $scope.datecharge.$setUntouched();
            $scope.datecharge.$setPristine();
            $scope.datepay.$setUntouched();
            $scope.datepay.$setPristine();

        };


        $scope.dateSearchBooking = function () {
            console.log('date booking search trace....');
            var bookinstart = $scope.bookingdatestart != null ? $filter('date')($scope.bookingdatestart, $scope.format) : null;
            var bookingend = $scope.bookingdateend != null ? $filter('date')($scope.bookingdateend, $scope.format) : null;
            ts_table_browser.removeQueryTerm('createdonindexing');
            bookinstart != null ? ts_table_browser.pushQueryTerm('createdonindexing', { $gte: buildBookingdatecriteriastring(bookinstart, true) }) : null;
            bookingend != null ? ts_table_browser.pushQueryTerm('createdonindexing', { $lte: buildBookingdatecriteriastring(bookingend, false) }) : null;
            console.log(bookinstart);
            console.log(bookingend);
            ts_table_browser.goPage(null, 0);
        };


        $scope.dateSearchTour = function () {
            console.log('date tour search trace....');
            var tourstart = $scope.tourdatestart != null ? $filter('date')($scope.tourdatestart, $scope.format) : null;
            var tourend = $scope.tourdateend != null ? $filter('date')($scope.tourdateend, $scope.format) : null;
            ts_table_browser.removeQueryTerm('startdateindexing');
            tourstart != null ? ts_table_browser.pushQueryTerm('startdateindexing', { $gte: buildBookingdatecriteriastring(tourstart, true) }) : null;
            tourend != null ? ts_table_browser.pushQueryTerm('startdateindexing', { $lte: buildBookingdatecriteriastring(tourend, false) }) : null;
            ts_table_browser.goPage(null, 0);
        };

        $scope.dateSearchPay = function () {
            console.log('date pay search trace....');
            var paystart = $scope.bookingpaystart != null ? $scope.bookingpaystart : null;
            var payend = $scope.bookingpayend != null ? $scope.bookingpayend : null;
            ts_table_browser.removeQueryTerm('dates.finalpayment.date');
            paystart != null ? ts_table_browser.pushQueryTerm('dates.finalpayment.date', { $gte: buildpayandchargedate(paystart, true) }) : null;
            payend != null ? ts_table_browser.pushQueryTerm('dates.finalpayment.date', { $lte: buildpayandchargedate(payend, false) }) : null;
            ts_table_browser.goPage(null, 0);
        }

        $scope.dateSearchCharge = function () {
            console.log('date pay search trace....');
            var chargestart = $scope.bookingchargestart != null ? $scope.bookingchargestart : null;
            var chargeend = $scope.bookingchargeend != null ? $scope.bookingchargeend : null;
            ts_table_browser.removeQueryTerm('dates.finalcharge.date');
            chargestart != null ? ts_table_browser.pushQueryTerm('dates.finalcharge.date', { $gte: buildpayandchargedate(chargestart, true) }) : null;
            chargeend != null ? ts_table_browser.pushQueryTerm('dates.finalcharge.date', { $lte: buildpayandchargedate(chargeend, false) }) : null;
            ts_table_browser.goPage(null, 0);
        }

        function buildBookingdatecriteriastring(datestring, isstart) {
            var c = datestring.split("-");
            var day = pad(c[0], 2);
            var month = pad(c[1] - 1, 2);
            var year = pad(c[2], 4);
            var fdate = [year, month, day].join('');
            var sufix = isstart ? '0000.0000000000' : '9999.ZZZZZZZZZZ';
            var str = fdate + sufix;
            return str;
        }

        function buildpayandchargedate(thedate, isstart) {
            var buildeddate = isstart ?
                new Date(thedate.getFullYear(), thedate.getMonth(), thedate.getDate(), 0, 0, 0) :
                new Date(thedate.getFullYear(), thedate.getMonth(), thedate.getDate(), 23, 59, 59);
            return buildeddate;
        }

        function buildTourdatecriteriastring(datestring, isstart) {
            var c = datestring.split("-");
            var day = pad(c[0], 2);
            var month = pad(c[1] - 1, 2);
            var year = pad(c[2], 4);
            var fdate = pad([year, month, day].join(''), 10);
            var sufix = isstart ? '.0000000000' : '.ZZZZZZZZZZ';
            var str = fdate + sufix;
            return str;
        }

        $scope.textSearch = '';

        $scope.textsearch = function () {
            //{ 'products': $scope.textSearch },

            var queryText = {
                $like: [{ 'idBooking': $scope.textSearch },
                    { 'idBookingExt': $scope.textSearch },
                    { 'holderindexing': $scope.textSearch },
                    { 'destinationindexing': $scope.textSearch },
                    { 'paxes.name': $scope.textSearch },
                    { 'paxes.lastname': $scope.textSearch },
                    { 'dmcindexing': $scope.textSearch },
                    { 'affiliateindexing': $scope.textSearch }] 
            };
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.pushQueryTerm('$like', queryText.$like);
            ts_table_browser.goPage(null, 0);
        }

        function affianddmcfilter() {
            ts_table_browser.removeQueryTerm('dmc');
            ts_table_browser.removeQueryTerm('affiliate');

            var qdmcs = [];
            $scope.selectedFilters.selecteddmcs != null && $scope.selectedFilters.selecteddmcs.length > 0 ?
                _.each($scope.selectedFilters.selecteddmcs, function (dmc) {
                    qdmcs.push(dmc._id);
                }) : null;
            qdmcs != null && qdmcs.length > 0 ?
                ts_table_browser.pushQueryTerm('dmc', { $in: qdmcs }) : null;
            var qaffis = [];
            $scope.selectedFilters.selectedaffiliates != null && $scope.selectedFilters.selectedaffiliates.length > 0 ?
                _.each($scope.selectedFilters.selectedaffiliates, function (affi) {
                    qaffis.push(affi._id);
                }) : null;
            qaffis != null && qaffis.length > 0 ?
                ts_table_browser.pushQueryTerm('affiliate', { $in: qaffis }) : null;
        }

        $scope.filterchanged = function () {
            affianddmcfilter();
            ts_table_browser.goPage(null, 0);
        }

        function recoverdmcs(callback) {
            console.log('recovering dmcs for filtering...');
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { code: { $ne: null } },
                    sortcondition: { 'company.name': 1 },
                    fields: '_id name company.name company.legalname status',
                    collectionname: 'DMCs'
                }
            };

            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                $scope.selectedFilters.dmcs = rsp;
                callback != null ? callback() : null;
            });
            rqCB.on(rqCB.onerroreventkey, function (err) {
                console.log(err);
                callback != null ? callback() : null;
            });
        }
        function recoveraffiliates(callback) {
            console.log('recovering affiliates for filtering...');
            var rq = {
                command: 'find',
                service: 'api',
                request: {
                    query: { code: { $ne: null } },
                    sortcondition: { 'company.name': 1 },
                    fields: '_id name company.name company.legalname status',
                    collectionname: 'Affiliate'
                }
            };

            var rqCB = yto_api.send(rq);
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                $scope.selectedFilters.affiliates = rsp;
                callback != null ? callback() : null;
            });
            rqCB.on(rqCB.onerroreventkey, function (err) {
                console.log(err);
                callback != null ? callback() : null;
            });
        }

        $scope.cleanandrefresh = function () {
            _resetDateBooking();
            $scope.selectedFilters.selecteddmcs = [];
            $scope.selectedFilters.selectedaffiliates = [];
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.removeQueryTerm('dmc');
            ts_table_browser.removeQueryTerm('affiliate');
            ts_table_browser.removeQueryTerm('createdonindexing');
            ts_table_browser.removeQueryTerm('startdateindexing');
            ts_table_browser.removeQueryTerm('dates.finalpayment.date');
            ts_table_browser.removeQueryTerm('dates.finalcharge.date');
            $scope.filterchanged();
        }

        console.log('filter controller loading...');

        //recoverdmcs(function () {
        //    recoveraffiliates(function () {
        //        console.log('filtering data fetched...');
        //    });
        //});
        
    }]);