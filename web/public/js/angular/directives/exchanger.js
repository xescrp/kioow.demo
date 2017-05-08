app.directive("exchanger", ['tools_service',
    '$uibModal', 'yto_api',
    '$cookieStore', 'Lightbox', '$anchorScroll', '$location', 'alertengine',
    function (tools_service,
        $uibModal, yto_api,
        $cookieStore, Lightbox, $anchorScroll, $location, alertengine) {


        return {
            templateUrl: '/js/angular/directives/views/exchanger.html?d=' + new Date(),
            scope: {

            },
            link: function ($scope, el, attrs) {
                el.bind('click', function (e) {
                    e.stopPropagation();
                })

                function apisave(callback) {
                    var rqCB = yto_api.post('/exchanges/save', exchangestable);

                    rqCB.on(rqCB.oncompleteeventkey, function (savedpreferences) {
                        console.log('your preferences has been saved', savedpreferences);
                        alertengine.showmessage('configuracion ratios de cambio', 'cambios en la configuracion guardados correctamente.');
                        callback != null ? callback() : null;
                    });

                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        alertengine.showerror('configuracion ratios de cambio - ERROR', err);
                        callback != null ? callback(err) : null;
                    });    	
                }

                function savecrosstables() {
                    _.each($scope.exchanges.currencies, function (curr) {
                        exchangestable.rates[curr.code] = curr.rate;
                    });
                }

                function crosstables(texchanges, tcurrencies) {
                    var crossed = [];
                    _.each(tcurrencies, function (curr) {
                        var change = {
                            code: curr.cc,
                            name: curr.name,
                            symbol: curr.symbol,
                            rate: texchanges.rates[curr.cc]
                        };
                        $scope.exchanges.currencies.push(change);
                    });
                }

                var exchangestable = loadedexchanges;
                var currencytable = loadedcurrencies;

                $scope.save = function () {
                    savecrosstables();
                    apisave(function (err) { console.log('finished saving exchanges...', err); })
                }

                $scope.exchanges = {
                    base: exchangestable.base,
                    currencies: []
                };

                crosstables(exchangestable, currencytable);
            }
        };

    }]);