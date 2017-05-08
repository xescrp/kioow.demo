app.controller('filterDatesAndLikeDMCAFFISelector', ['$scope',
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
        $scope.rolename = loginsession.user.rolename;
        $scope.listname = list_name;

        console.log($scope.rolename);
        console.log($scope.listname);

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
            
            $scope.datebooking.$setUntouched();
            $scope.datebooking.$setPristine();
            $scope.datetour.$setUntouched();
            $scope.datetour.$setPristine();
        };


        $scope.dateSearchBooking = function () {
            console.log('date booking search trace....');
            var bookinstart = $scope.bookingdatestart != null ? $filter('date')($scope.bookingdatestart, $scope.format) : null;
            var bookingend = $scope.bookingdateend != null ? $filter('date')($scope.bookingdateend, $scope.format) : null;
            ts_table_browser.removeQueryTerm('createdonindexing');
            ts_table_browser.removeQueryTerm('$like');
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
            ts_table_browser.removeQueryTerm('$like');
            tourstart != null ? ts_table_browser.pushQueryTerm('startdateindexing', { $gte: buildTourdatecriteriastring(tourstart, true) }) : null;
            tourend != null ? ts_table_browser.pushQueryTerm('startdateindexing', { $lte: buildTourdatecriteriastring(tourend, false) }) : null;
            ts_table_browser.goPage(null, 0);
        };

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

        function buildTourdatecriteriastring(datestring, isstart) {
            var c = datestring.split("-");
            var day = pad(c[0], 2);
            var month = pad(c[1] - 1, 2);
            var year = pad(c[2], 4);
            var fdate = [year, month, day].join('');
            var sufix = isstart ? '.0000000000' : '.ZZZZZZZZZZ';
            var prefix = '00';
            var str = prefix + fdate + sufix;
            return str;
        }
        

        //function buildTourdatecriteriastring(datestring, isstart) {
        //    var c = datestring.split("-");
        //    var day = pad(c[0], 2);
        //    var month = pad(c[1] - 1, 2);
        //    var year = pad(c[2], 4);
        //    var fdate = pad([year, month, day].join(''), 10);
        //    var sufix = isstart ? '.0000000000' : '.ZZZZZZZZZZ';
        //    var str = fdate + sufix;
        //    return str;
        //}

        $scope.textSearch = '';

        $scope.textsearch = function () {
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.removeQueryTerm('dmc');
            ts_table_browser.removeQueryTerm('affiliate');
            ts_table_browser.removeQueryTerm('createdonindexing');
            ts_table_browser.removeQueryTerm('startdateindexing');

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

            queryText = $scope.listname == 'queries' ? {
                $like: [{ 'destinationsindexing': $scope.textSearch }, { 'destinationsindexingen': $scope.textSearch },
                    { 'title': $scope.textSearch }, { 'titleindexing': $scope.textSearch }, { 'code': $scope.textSearch },
                    { 'additionalinfo.description': $scope.textSearch }, { 'affiliateindexing': $scope.textSearch }]
            } : queryText;

            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.pushQueryTerm('$like', queryText.$like);
            ts_table_browser.goPage(null, 0);
        }

        function affianddmcfilter() {
            ts_table_browser.removeQueryTerm('$like');
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
            $scope.filterchanged();
        }

        console.log('filter controller loading...');

        recoverdmcs(function () {
            console.log('filtering data fetched...DMCS');
        });
        recoveraffiliates(function () {
            console.log('filtering data fetched...AAVV');
        });
    }]);