app.controller('filterHevents', ['$scope',
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

        var staticdataname = 'hermessuscriptions';

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

        $scope.selectedFilters = {
            subjects: [],
            selectedsubjects: [],
            actions: [],
            selectedactions: []
        };

        $scope.datestring = function (datest) {
            var d = new Date(datest);
            return d.toDateString();
        };

        var _resetDateBooking = function () {
            $scope.bookingdatestart = null;
            $scope.bookingdateend = null;
            
            
            $scope.datebooking.$setUntouched();
            $scope.datebooking.$setPristine();
        };


        $scope.dateSearch = function () {
            console.log('date booking search trace....');
            var bookinstart = $scope.bookingdatestart != null ? $filter('date')($scope.bookingdatestart, $scope.format) : null;
            var bookingend = $scope.bookingdateend != null ? $filter('date')($scope.bookingdateend, $scope.format) : null;
            //bookinstart != null ? ts_table_browser.pushQueryTerm('createdOn', { $gte: buildBookingdatecriteriastring(bookinstart, true) }) : null;
            //bookingend != null ? ts_table_browser.pushQueryTerm('createdOn', { $lte: buildBookingdatecriteriastring(bookingend, false) }) : null;
            bookinstart != null ? ts_table_browser.pushQueryTerm('createdOn', { $gte: $scope.bookingdatestart }) : null;
            bookingend != null ? ts_table_browser.pushQueryTerm('createdOn', { $lte: $scope.bookingdateend }) : null;
            console.log(bookinstart);
            console.log(bookingend);
        };

        function buildfilter() {
            ts_table_browser.removeQueryTerm('createdOn');
            ts_table_browser.removeQueryTerm('subject');
            ts_table_browser.removeQueryTerm('action');

            ts_table_browser.removeQueryTerm('$like');

            $scope.dateSearch();
            $scope.selectedFilters.selectedsubjects != null && $scope.selectedFilters.selectedsubjects.length > 0 ? ts_table_browser.pushQueryTerm('subject', { $in: $scope.selectedFilters.selectedsubjects }) : null;
            $scope.selectedFilters.selectedactions != null && $scope.selectedFilters.selectedactions.length > 0 ? ts_table_browser.pushQueryTerm('action', { $in: $scope.selectedFilters.selectedactions }) : null;
        }

        $scope.filterchanged = function () {
            buildfilter();
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

        

        $scope.textSearch = '';

        $scope.textsearch = function () {
            var queryText = {
                $like: [{ 'code': $scope.textSearch },
                    { 'subject': $scope.textSearch },
                    { 'action': $scope.textSearch },
                    { 'data': $scope.textSearch },
                    { 'data.current': $scope.textSearch },
                    { 'data.original': $scope.textSearch }]
            };
            ts_table_browser.removeQueryTerm('$like');
            ts_table_browser.pushQueryTerm('$like', queryText.$like);
            ts_table_browser.goPage(null, 0);
        }

        function gethermesdata(callback, errorcallback) {
            var rq = {
                command: 'getdata',
                service: 'api',
                request: {
                    type: 'static',
                    name: staticdataname
                }
            };

            var rqCB = yto_api.send(rq);

            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                callback != null ? callback(rsp) : null;
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                errorcallback != null ? errorcallback(err) : null;
            });

            return rqCB;
        }

        gethermesdata(function (hdata) {
            _.each(hdata, function (hv) {
                $scope.selectedFilters.subjects.push(hv.subject);
                _.each(hv.actions, function (action) {
                    $scope.selectedFilters.actions.push(action);
                });
            });
            $scope.selectedFilters.actions = _.uniq($scope.selectedFilters.actions.sort());
            $scope.selectedFilters.subjects = _.uniq($scope.selectedFilters.subjects.sort());

        });

    }]);