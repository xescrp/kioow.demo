app.controller("listPageCtrl",
    ['$scope',
        '$timeout',
        '$log',
        'http_service',
        'tools_service',
        'ts_table_browser',
        function ($scope,
            $timeout,
            $log,
            http_service,
            tools_service, ts_table_browser) {

            $scope.init = function () {
                console.log('init test');
            };

            $scope.queryservice = ts_table_browser;

            $scope.openDatePicker = function ($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope[opened] = true;
            };

            $scope.testdate = new Date();

            $scope.dateOptions = {
                formatYear: 'yyyy',
                startingDay: 1
            };

            $scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            console.log(ts_table_browser);

            $scope.queryservice = ts_table_browser;

            var pagesconfigurations = [
                {
                    name: 'Bookings',
                    title: 'Reservas',
                    filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-dates-like.html',
                    filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/shortcut-buttons.html',
                    tableconfiguration: {
                        tableitemtemplate: '/js/angular/components/ts-tables/templates/testitem.html',
                        onitemclick: function () { },
                        columns: [
                            {
                                label: 'idBooking',
                                modelproperty: 'idBooking',
                                value: function (item) { return item['idBooking']; },
                                sortable: true,
                                onclick: function () { }
                            },
                            {
                                label: 'Agencia',
                                modelproperty: 'affiliate',
                                modelvalue: function (item) { var affi = item.affiliate != null ? item.affiliate.name : ''; return affi; },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'Exp.Agencia',
                                modelproperty: 'createdOn',
                                value: function (item) { return item['idBookingExt']; },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'F.Creacion',
                                modelproperty: 'createdOn',
                                value: function (item) { return item['createdOn']; },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'F.Salida',
                                modelproperty: 'dates',
                                value: function (item) { return item['dates']['start']['date']; },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'Titular',
                                modelproperty: 'signin',
                                value: function (item) { var titular = (item.signin != null) ? item['signin']['name'] + item['signin']['lastname'] : ''; return titular },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'Destino',
                                modelproperty: 'destinationindexing',
                                value: function (item) { var dest = (item.products[0].buildeditinerary.countriesfull_es != null && item.products[0].buildeditinerary.countriesfull_es.length > 0) ? item.products[0].buildeditinerary.countriesfull_es.split(', ') : ''; return dest },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'DMC',
                                modelproperty: 'dmc',
                                value: function (item) { return item['dmc']['company']['name']; },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'Estado',
                                modelproperty: 'status',
                                class: null,
                                value: function (item) { return item['status']; },
                                sortable: true,
                                onclick: function () { },
                            },
                            {
                                label: 'Pago',
                                class: null,
                                modelproperty: 'paystatusprovider',
                                value: function (item) { return item['paystatusprovider']; },
                                sortable: true,
                                onclick: function () { },
                            }],

                    },
                    startHook: function () {
                        ts_table_browser.setCollection('Bookings2');
                        ts_table_browser.goPage(null, 0);
                    }
                }];

            $scope.currentconfiguration = pagesconfigurations[0];

        }]);
