var app = angular.module("openMarketTravelApp");

app.controller('adminHomeCtrl', ['$scope', '$rootScope', '$location', 'yto_api', 'tools_service',
    function ($scope, $rootScope, $location, yto_api, tools_service) {
    
        $scope.load ={};
        $scope.session = loginsession;
        $scope.affiliate = loginsession.affiliate;
        $scope.dmc = loginsession.dmc;
        $scope.admin = loginsession.admin;
        $scope.loginsession = loginsession;
        console.log(loginsession);

        function datestring(datest) {
            var d = new Date(datest);
            return d;
        };
        $scope.printDate = function (thedate) {
            thedate = thedate != null && thedate != '' ? datestring(thedate) : null;
            var str = thedate != null ? [pad(thedate.getDate(), 2), pad(thedate.getMonth() + 1, 2), thedate.getFullYear()].join('/') : '';
            return str;
        }
        $scope.openwindow = function (url) {
            window.open(url);
        }
        $scope.goToWhiteLabel = function () {
            window.location.assign('/edit/account?code=' + loginsession.user.code + '&usertype=' + loginsession.user.rolename + '#whiteLabel');
        }

        $scope.statistics = {
            bookings: { total: 0, last: [] },
            programs: { total: 0, published: 0, publishednoavail: 0 },
            dmcs: { total: 0 },
            taylormades: { total: 0, last: [] },
            affiliates: { total: 0 }
        };

        $scope.destinations = function (item) {
            var dst = item.destinations != null && item.destinations.length > 0 ? _.map(item.destinations, function (ct) { return ct.country; }) : [];
            dst.sort();
            var str = _.uniq(dst).join(', ');
            return str;
        };

        function statistics(callback, errorcallback) {
            tools_service.showPreloader($rootScope, 'show');
            var rq = {
                command: 'adminstatistics',
                service: 'api',
                request: {
                    getall: true
                }
            };

            var rqCB = yto_api.send(rq);

            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                $scope.statistics = rsp;
                tools_service.showPreloader($rootScope, 'hide');
                callback != null ? callback(rsp) : null;
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                $log.error(err);
                tools_service.showPreloader($rootScope, 'hide');
                errorcallback != null ? errorcallback(err) : null;
            });

            return rqCB;
        }

        $scope.admin != null ? statistics() : null;

    }]);