app.directive("quoteeditor", ['tools_service',
    '$uibModal', 'yto_api', '$timeout', 'toaster',
    '$cookieStore', 'Lightbox', 'productpreviewhelpers', 'destinations_service', '$anchorScroll', '$location', 'pricehelpers',
    function (tools_service,
        $uibModal, yto_api, $timeout, toaster,
        $cookieStore, Lightbox, productpreviewhelpers, destinations_service, $anchorScroll, $location, pricehelpers) {

        return {
            templateUrl: '/partials/admin/edit/quote/admin-quote-edition.html.swig?d=' + new Date(),
            scope: {
                role: '=rolename',
                quote: '=quote',
                dmc: '=provider',
                userquery: '=userquery'
            },
            link: function ($scope, el, attrs) {
                $scope.dmcresponse = $scope.quote;
                $scope.theuser = loginsession.user;
                $scope.themember = loginsession[loginsession.user.rolename];

                //currency
                $scope.exchanges = null;
                $scope.exchangeValue = function (value, currencySource, currencyTarget) {
                    return pricehelpers.exchangeValue(value, currencySource, currencyTarget);
                }

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

                function extractQuotationData() {
                    var quoterequest = null;
                    if ($scope.dmcresponse.rooms != null) {
                        var qt = {
                            quotecurrency: $scope.dmcresponse.netPrice.currency.value,
                            dmccode: $scope.dmcresponse.dmccode,
                            affiliatecode: $scope.dmcresponse.affiliatecode,
                            comission: $scope.dmcresponse.comission,
                            quoterequest: {
                                rooms: {
                                    single: {
                                        quantity: $scope.dmcresponse.rooms.single.quantity,
                                        net: $scope.dmcresponse.rooms.single.pricePerPax.value
                                    },
                                    double: {
                                        quantity: $scope.dmcresponse.rooms.double.quantity,
                                        net: $scope.dmcresponse.rooms.double.pricePerPax.value
                                    },
                                    triple: {
                                        quantity: $scope.dmcresponse.rooms.triple.quantity,
                                        net: $scope.dmcresponse.rooms.triple.pricePerPax.value
                                    },
                                    quad: {
                                        quantity: $scope.dmcresponse.rooms.quad.quantity,
                                        net: $scope.dmcresponse.rooms.quad.pricePerPax.value
                                    },
                                    children: null
                                }
                            }
                        };
                        if ($scope.dmcresponse.children && $scope.dmcresponse.children.length > 0) {
                            qt.quoterequest.rooms.children = _.map($scope.dmcresponse.children, function (child) {
                                return { net: child.pricePerPax.value, quantity: 1, age: child.age };
                            });
                        }
                        quoterequest = qt;
                    }
                    return quoterequest;
                }

                $scope.recalculatePVP = function () {

                    var quoterq = extractQuotationData();
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
                        $scope.dmcresponse.rooms.single.amountPricePerPax = {
                            value: result.rooms.single.amount, currency: result.currency
                        };
                        $scope.dmcresponse.rooms.single.pvpAffiliatePerPax = {
                            value: result.rooms.single.pvp, currency: result.currency
                        };
                        //double
                        $scope.dmcresponse.rooms.double.amountPricePerPax = {
                            value: result.rooms.double.amount, currency: result.currency
                        };
                        $scope.dmcresponse.rooms.double.pvpAffiliatePerPax = {
                            value: result.rooms.double.pvp, currency: result.currency
                        };
                        //triple
                        $scope.dmcresponse.rooms.triple.amountPricePerPax = {
                            value: result.rooms.triple.amount, currency: result.currency
                        };
                        $scope.dmcresponse.rooms.triple.pvpAffiliatePerPax = {
                            value: result.rooms.triple.pvp, currency: result.currency
                        };
                        //quad
                        $scope.dmcresponse.rooms.quad.amountPricePerPax = {
                            value: result.rooms.quad.amount, currency: result.currency
                        };
                        $scope.dmcresponse.rooms.quad.pvpAffiliatePerPax = {
                            value: result.rooms.quad.pvp, currency: result.currency
                        };
                        //childs
                        result.rooms.children != null && result.rooms.children.length > 0 ?
                            _.each(result.rooms.children, function (child, index) {
                                $scope.dmcresponse.children[index].amountPricePerPax = {
                                    value: child.amount, currency: result.currency
                                };
                                $scope.dmcresponse.children[index].pvpAffiliatePerPax = {
                                    value: child.pvp, currency: result.currency
                                };
                            }) : null;
                        //total amounts
                        //ts
                        $scope.dmcresponse.amount = {
                            value: result.amount, currency: result.currency
                        };
                        //dmc 
                        $scope.dmcresponse.netPrice = {
                            value: result.net, currency: result.currency
                        };
                        //aavv
                        $scope.dmcresponse.pvpAffiliate = {
                            value: result.pvp, currency: result.currency
                        };
                    });

                    // response KO
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.error("Error getting the PVP: ", rq, 'error: ', err);
                        toaster.pop('error', 'Quote not saved properly', 'Your data is not saved...');
                    });

                };

                $scope.saveQuote = function(quote, callback) {
                    tools_service.showPreloader($scope, "show");
                    quote.operationStartDate = quote.operationStartDate != null && typeof (quote.operationStartDate) === 'string' ?
                        new Date(quote.operationStartDate) : quote.operationStartDate;
                    quote.operationStartDate != null ? quote.operationStart = {
                        day: quote.operationStartDate.getDate(),
                        month: quote.operationStartDate.getMonth(),
                        year: quote.operationStartDate.getFullYear(),
                        monthname_es: tools_service.getMonthNameSpanish(quote.operationStartDate.getMonth()),
                        monthname_en: tools_service.getMonthNameEnglish(quote.operationStartDate.getMonth()),
                    } : null;

                    quote.quoteValidDate = quote.quoteValidDate != null && typeof (quote.quoteValidDate) === 'string' ?
                        new Date(quote.quoteValidDate) : quote.quoteValidDate;
                    quote.quoteValidUntil != null ? quote.quoteValidUntil = {
                        day: quote.quoteValidDate.getDate(),
                        month: quote.quoteValidDate.getMonth(),
                        year: quote.quoteValidDate.getFullYear(),
                        monthname_es: tools_service.getMonthNameSpanish(quote.quoteValidDate.getMonth()),
                        monthname_en: tools_service.getMonthNameEnglish(quote.quoteValidDate.getMonth()),
                    } : null;

                    var APIquery = (quote._id != null) ? { _id: quote._id } : null;
                    $scope.publishquote ? quote.status = 'published' : null;
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
                        toaster.pop('success', 'Quote saved properly', 'Your data is saved...');
                        tools_service.showPreloader($scope, "hide");
                        if (callback) {
                            callback(result);
                        }
                    });

                    // response KO
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, "hide");
                        console.error("Error saving quote: ", quote, 'error: ', err);
                        tools_service.showPreloader($scope, "hide");
                        toaster.pop('error', 'Quote not saved properly', 'Your data is not saved...');
                    });
                }
                

            }
        }
    }]);