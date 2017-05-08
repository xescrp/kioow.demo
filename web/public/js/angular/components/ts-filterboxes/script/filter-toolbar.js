app.controller('filtertoolbar', ['$scope',
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

        $scope.rolename = loginsession.user.rolename;
        $scope.listname = list_name;

        //console.log($scope.rolename);
        //console.log($scope.listname);

        $scope.listfilter = {
            products: function () {

            },
            bookings: function () {
                ts_table_browser.removeQueryTerm('affiliate');
                ts_table_browser.removeQueryTerm('status');
                ts_table_browser.removeQueryTerm('$or');
                ts_table_browser.removeQueryTerm('paystatusagency');
                ts_table_browser.removeQueryTerm('paystatusprovider');
                ts_table_browser.removeQueryTerm('chargestatus');
                ts_table_browser.removeQueryTerm('bookingmodel');
                ts_table_browser.removeQueryTerm('$like');
                //env
                $scope.activebuttons.environment.all == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', { $ne: "budget" }) : null;
                $scope.activebuttons.environment.b2b == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', { $in: ['bookingb2b', 'taylormadeb2b', 'taylormadeb2bgroups'] }) : null;
                $scope.activebuttons.environment.b2c == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', { $in: ['bookingb2c', 'taylormadeb2c', 'taylormadeb2cgroups'] }) : null;
                $scope.activebuttons.environment.whitelabel == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', 'whitelabel') : null;

                var filtstatus = null;
                var filtpaystatus = null;
                var filtchargestatus = null;


                if ($scope.activebuttons.status.all == false) {
                    filtstatus = [];
                    filtpaystatus = [];
                    filtchargestatus = [];
                    $scope.activebuttons.status.new ? (filtstatus.push('onprocess')) : null;
                    $scope.activebuttons.status.cancelled ? (filtstatus.push('cancelled'), filtstatus.push('discard'), filtstatus.push('onbudget')) : null;
                    $scope.activebuttons.status.commited ? (filtstatus.push('commited'), filtstatus.push('ok.charges'), filtstatus.push('onprocess'), filtstatus.push('end')) : null;
                    $scope.activebuttons.status.pendingpayment ? filtpaystatus.push('pending.payment') : null;
                    $scope.activebuttons.status.pendingcharges ? filtchargestatus.push('pending.charges') : null;
                    filtstatus.length == 0 ? filtstatus = null : null;
                    filtpaystatus.length == 0 ? filtpaystatus = null : null;
                    filtchargestatus == 0 ? filtchargestatus = null : null;
                }
                filtstatus != null ? ts_table_browser.pushQueryTerm('status', { $in: filtstatus }) : null;
                filtpaystatus != null ? ts_table_browser.pushQueryTerm('$or', [{ paystatusagency: { $in: filtpaystatus } }, { paystatusprovider: { $in: filtpaystatus } }]) : null;
                filtchargestatus != null ? ts_table_browser.pushQueryTerm('chargestatus', { $in: filtchargestatus }) : null;

                ts_table_browser.goPage(null, 0);

            },
            billings: function () {
                ts_table_browser.removeQueryTerm('affiliate');
                ts_table_browser.removeQueryTerm('status');
                ts_table_browser.removeQueryTerm('$or');
                ts_table_browser.removeQueryTerm('paystatusagency');
                ts_table_browser.removeQueryTerm('paystatusprovider');
                ts_table_browser.removeQueryTerm('chargestatus');
                ts_table_browser.removeQueryTerm('bookingmodel');
                ts_table_browser.removeQueryTerm('$like');
                ts_table_browser.removeQueryTerm('breakdown.charges.pending');
                ts_table_browser.removeQueryTerm('breakdown.payments.pendingagency');
                ts_table_browser.removeQueryTerm('breakdown.payments.pending');
                //env
                $scope.activebuttons.environment.all == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', { $ne: "budget" }) : null;
                $scope.activebuttons.environment.b2b == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', { $in: ['bookingb2b', 'taylormadeb2b', 'taylormadeb2bgroups'] }) : null;
                $scope.activebuttons.environment.b2c == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', { $in: ['bookingb2c', 'taylormadeb2c', 'taylormadeb2cgroups'] }) : null;
                $scope.activebuttons.environment.whitelabel == true ?
                    ts_table_browser.pushQueryTerm('bookingmodel', 'whitelabel') : null;

                var filtstatus = null;
                var filtpaystatus = null;
                var filtchargestatus = null;
                ts_table_browser.pushQueryTerm('status', { $nin: ["onbudget", "cancelled", "discard", "error"] });

                if ($scope.activebuttons.status.all == false) {
                    filtstatus = [];
                    filtpaystatus = [];
                    filtchargestatus = [];
                    $scope.activebuttons.status.new ? (filtstatus.push('onprocess')) : null;
                    $scope.activebuttons.status.cancelled ? (filtstatus.push('cancelled'), filtstatus.push('discard'), filtstatus.push('onbudget')) : null;
                    $scope.activebuttons.status.commited ? (filtstatus.push('commited'), filtstatus.push('ok.charges'), filtstatus.push('onprocess'), filtstatus.push('end')) : null;
                    $scope.activebuttons.status.pendingpaymentaavv ? (ts_table_browser.pushQueryTerm('breakdown.payments.pendingagency', { $gte: 0 }),
                        ts_table_browser.pushQueryTerm('bookingmodel', { $in: ['whitelabel'] })) : null;
                    $scope.activebuttons.status.pendingpaymentdmc ? ts_table_browser.pushQueryTerm('breakdown.payments.pending', { $gte: 0 }) : null;
                    $scope.activebuttons.status.pendingcharges ? ts_table_browser.pushQueryTerm('breakdown.charges.pending', { $gte: 0 }) : null;
                    filtstatus.length == 0 ? filtstatus = null : null;
                    filtpaystatus.length == 0 ? filtpaystatus = null : null;
                    filtchargestatus == 0 ? filtchargestatus = null : null;
                }
                filtstatus != null ? ts_table_browser.pushQueryTerm('status', { $in: filtstatus }) : null;
                filtpaystatus != null ? ts_table_browser.pushQueryTerm('$or', [{ paystatusagency: { $in: filtpaystatus } }, { paystatusprovider: { $in: filtpaystatus } }]) : null;
                filtchargestatus != null ? ts_table_browser.pushQueryTerm('chargestatus', { $in: filtchargestatus }) : null;

                ts_table_browser.goPage(null, 0);

            },
            dmcs: function () {

            },
            queries: function () {
                ts_table_browser.removeQueryTerm('affiliate');
                ts_table_browser.removeQueryTerm('state');
                
                
                $scope.activebuttons.environment.b2b == true && $scope.activebuttons.environment.b2c == false ?
                    ts_table_browser.pushQueryTerm('affiliate', { $ne: null }) : null;
                $scope.activebuttons.environment.b2c == true && $scope.activebuttons.environment.b2b == false ?
                    ts_table_browser.pushQueryTerm('affiliate', { $eq: null }) : null;

                var filtstatus = null;
                
                if ($scope.activebuttons.status.all == false) {
                    filtstatus = [];
                    $scope.activebuttons.status.new ? (filtstatus.push('new'), filtstatus.push('requested')) : null;
                    $scope.activebuttons.status.cancelled ? filtstatus.push('cancelled') : null;
                    $scope.activebuttons.status.onprocess ? (filtstatus.push('new'), filtstatus.push('waiting user'), filtstatus.push('waiting dmc'), filtstatus.push('quoted'), filtstatus.push('requested')) : null;
                    $scope.activebuttons.status.waitinguser ? filtstatus.push('waiting user') : null;
                    $scope.activebuttons.status.underreview ? filtstatus.push('quoted') : null;
                    filtstatus.length == 0 ? filtstatus = null : null;
                }
                filtstatus != null ? ts_table_browser.pushQueryTerm('state', { $in: filtstatus }) : null;

                ts_table_browser.goPage(null, 0);
            },
            affiliates: function () {

            },
            quotes: function () {

            },
            travelers: function () {

            },
            hevents: function () {

            }
        }

        $scope.refresh = function () {
            ts_table_browser.goPage(null, 0);
        }

        $scope.activebuttons = {
            environment: {
                b2b: false,
                b2c: false,
                whitelabel: false,
                all: true
            },
            status: {
                all: true,
                new: false,
                cancelled: false,
                onprocess: false,
                waitinguser: false,
                underreview: false,
                commited: false,
                pendingpayment: false,
                pendingcharges: false,
                pendingchargesaavv: false,
                pendingchargesdmc: false
            }
        };

        function resetstatusbuttons() {
            $scope.activebuttons.status.new = false;
            $scope.activebuttons.status.cancelled = false;
            $scope.activebuttons.status.onprocess = false;
            $scope.activebuttons.status.waitinguser = false;
            $scope.activebuttons.status.underreview = false;
            $scope.activebuttons.status.commited = false;
            $scope.activebuttons.status.pendingpayment = false;
            $scope.activebuttons.status.pendingcharges = false;
            $scope.activebuttons.status.pendingpaymentaavv = false;
            $scope.activebuttons.status.pendingpaymentdmc = false;
        }

        $scope.toggleenvironment = function (environment) {
            $scope.activebuttons.environment[environment] = !$scope.activebuttons.environment[environment];
            environment == 'all' ? ($scope.activebuttons.environment.b2c = false, $scope.activebuttons.environment.whitelabel = false, $scope.activebuttons.environment.b2b = false) : null;
            environment == 'b2b' ? ($scope.activebuttons.environment.b2c = false, $scope.activebuttons.environment.whitelabel = false, $scope.activebuttons.environment.all = false) : null;
            environment == 'b2c' ? ($scope.activebuttons.environment.b2b = false, $scope.activebuttons.environment.whitelabel = false, $scope.activebuttons.environment.all = false) : null;
            environment == 'whitelabel' ? ($scope.activebuttons.environment.b2b = false, $scope.activebuttons.environment.b2c = false, $scope.activebuttons.environment.all = false) : null;
            $scope.listfilter[list_name]();
        }

        $scope.togglestatusfilter = function (status) {
            $scope.activebuttons.status[status] = !$scope.activebuttons.status[status];
            status == 'all' ? resetstatusbuttons() : $scope.activebuttons.status.all = false;
            $scope.listfilter[list_name]();
        }

        $scope.togglepayfilter = function (cstate) {
            $scope.activebuttons.status.all = false;
            var sthash = {
                'pending.charges': function () {
                    $scope.activebuttons.status.pendingcharges = !$scope.activebuttons.status.pendingcharges;

                },
                'pending.payment.aavv': function () {
                    $scope.activebuttons.status.pendingpaymentaavv = !$scope.activebuttons.status.pendingpaymentaavv;
                },
                'pending.payment.dmc': function () {
                    $scope.activebuttons.status.pendingpaymentdmc = !$scope.activebuttons.status.pendingpaymentdmc;
                }, 
                'pending.payment': function () {
                    $scope.activebuttons.status.pendingpayment = !$scope.activebuttons.status.pendingpayment
                }
            };
            sthash[cstate]();
            $scope.listfilter[list_name]();
        }

    }]);