app.controller(
    'BookingCtrl',
    [
        '$scope',
        'toaster',
        '$uibModal',
        'modals_service',
        '$location',
        '$cookieStore',
        '$cookies',
        '$http',
        'yto_api',
        'openmarket_file_uploader',
        'yto_session_service',
        'tools_service',
        'http_service',
        '$timeout',
        'fileReader',
        '$sce',
        '$window',
        'productpreviewhelpers',
        'bookinghelpers',
        '$log',
        function ($scope,
            toaster,
            $uibModal,
            modals_service,
            $location,
            $cookieStore,
            $cookies,
            $http,
            yto_api,
            openmarket_file_uploader,
            yto_session_service,
            tools_service,
            http_service,
            $timeout,
            fileReader,
            $sce,
            $window,
            productpreviewhelpers,
            bookinghelpers,
            $log) {
            'use strict';
            function _generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                });

                return uuid;
            };

            $scope.convert = function (value, from, to) {
                return fx.convert(value, { from: from, to: to });
            }

            //Hashing
            // get hash for tab navigation
            var hash = $location.hash();
            // watch url hash for tab navigation
            //$scope.$watch(function () { return $location.hash(); }, function (url) {
            //    if (url) {
            //        $scope.selectTab($location.hash());
            //    } else {
            //        $scope.selectTab('tabdetails');
            //    }
            //});

            //$scope.selectTab = function (setTab) {
            //    $scope.tab = setTab;
            //    return true;
            //};
            //
            $scope.isSelected = function (checkTab) {
                return $scope.tab === checkTab;
            };

            $scope.gotoElement = function (eID) {
                anchorSmoothScroll.scrollTo(eID);
            };

            $scope.gotoTabAndId = function (tab, eID) {
                $scope.selectTab(tab);
                $timeout(function () {
                    $scope.gotoElement(eID);
                }, 150);
            };

            //downloads


            /**
	 * funcion genera los bonos
	 */
            $scope.downloadAffiliateVoucher = function () {

                tools_service.showPreloader($scope, 'show');

                var dmc = $scope.booking.dmc;
                var product = $scope.booking.products[0];

                // 1) generar el bono en html
                _getVoucherToPrint(dmc, product, $scope.booking, function (result) {

                    // 2) llamo al core para convertirlo en pdf
                    var namefile = 'bono-' + $scope.booking.idBooking;

                    var rqCB = yto_api.post('/download/getpdffromhtml', {
                        html: result,
                        type: 'voucheraffiliate',
                        namefile: namefile
                    });

                    //response OK
                    rqCB.on(rqCB.oncompleteeventkey, function (voucherPdf) {

                        if (voucherPdf != null && voucherPdf.url != null) {

                            // 3) guardo la ruta en la booking
                            $scope.booking.voucher = { url: voucherPdf.url };
                            $scope.justsave();
                            $window.open(voucherPdf.url, '_blank');
                            tools_service.showPreloader($scope, 'hide');

                        }
                        //error al generar factura 
                        else {
                            toaster.pop('error', "Error de conexión", "No se ha podido generar el bono de tu reserva. Por favor intenta más tarde.", 10000);
                            $log.error("Error al generar el bono de la reserva: " + $scope.booking.idBooking);
                            $scope.errorServerSave = true;
                            $window.location.href = "/bono?bookingId=" + $scope.booking.idBooking;
                        }

                    });
                    //response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                    });
                });
            };


            /**
             * funcion descarga el contrato en pdf para la reserva de afiliado
             */
            $scope.downloadAffiliateContract = function () {
                tools_service.showPreloader($scope, 'show');
                return bookinghelpers.downloadAffiliateContract('', yto_api, $scope.booking, function (result) {
                    tools_service.showPreloader($scope, 'hide');
                });
            };

            // redirecciona para obteneer el bono en html para convertirlo a pdf	
            function _getVoucherToPrint(dmc, product, booking, callback) {

                var fetch_url = '/voucher-to-print';

                var postdata = {
                    dmc: dmc,
                    product: product,
                    booking: booking
                }

                http_service.http_request(fetch_url, 'POST', null, postdata).then(
                    function (data) {
                        callback(data);
                    },
                    function (err) {
                        //alert("error");
                        console.log(err);
                    });
            };

            /**
	         * funcion que descarga la factura para el affiliado
	         */
            $scope.downloadAffiliateProforma = function () {
                tools_service.showPreloader($scope, 'show');
                return bookinghelpers.downloadAffiliateProforma('', yto_api, $scope.booking, function (result) {
                    tools_service.showPreloader($scope, 'hide');
                });
            };

            /**
	         * funcion que descarga el resumen de la booking
	         */
            $scope.downloadSummaryBooking = function () {
                tools_service.showPreloader($scope, 'show');
                return bookinghelpers.downloadSummaryBooking('', yto_api, $scope.booking, function (result) {
                    tools_service.showPreloader($scope, 'hide');
                });

            }

            ///HELP METHODS
            $scope.editTransferDetails = false;
            $scope.open = function ($event, kind, id) {

                $event.preventDefault();
                $event.stopPropagation();

                eval('$scope.' + kind)[id] = true;
            };
            $scope.toggle = function (aux) {
                eval("$scope." + aux + " = !$scope." + aux);
            };

            //toggle
            $scope.toggable = {
                chargesedit: false,
                paymentsedit: false
            };
            $scope.switchvisiblestate = function (what) {
                $scope.toggable[what] != null ? $scope.toggable[what] = !$scope.toggable[what] : null;
            }

            $scope.formatnumber = function (num) {
                return tools_service.formatNumber(num, 0);
            };
            $scope._get_age = function (born, now) {
                var age = bookinghelpers.get_age(born, now);
                return age;
            };
            $scope.hasTransport = function (booking) {
                return bookinghelpers.hasTransport(booking);
            };
            // devuelve el nombre en spanish del pais dado su codigo 
            $scope._findcounty = function (countrycode) {
                //return _.find($scope.nationalities, function (nat) { var ct = countrycode != null ? nat.countrycode.toUpperCase() == countrycode.toUpperCase() : false; return ct; });
                console.log('find this ct... ' + countrycode);
                var finded = bookinghelpers.findcounty(countrycode, $scope.nationalities);
                console.log('ct finded or not...');
                console.log(finded);
                return finded;
            };

            // devuelve el nombre en spanish  del pais dado su codigo
            $scope.findCountryByCode = function (countryCode) {
                return $scope._findcounty(countryCode).name_es;
            };
            // formatea correctamente el html
            $scope.trustHtml = function (html) {
                return $sce.trustAsHtml(html);
            };
            $scope.addHoursDate = function (initDate, hours) {
                return tools_service.addHoursDate(initDate, hours);
            };
            $scope.showRoomNameSpanish = function (code) {
                return bookinghelpers.showRoomNameSpanish(code);
            };
            /**
              * funcione que devulve la fecha de la booking en fecha javascript
              */
            $scope.transformToDate = function (dateObj) {
                if (dateObj != undefined) {
                    return tools_service.transformToDate(dateObj);
                }
            };
            //images helper
            $scope.getimage = function (url, imagename) {
                return tools_service.cloudinaryUrl(url, imagename);
            };


            // ************************
            // init datepicker settings
            //************************

            $scope.today = function () {
                $scope.dt = new Date();
            };

            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.toggleMin = function () {
                $scope.minDate = $scope.minDate ? null : new Date();
            };

            $scope.calendarOMT = [];
            $scope.calendar = [];

            $scope.open = function ($event, kind, id) {

                $event.preventDefault();
                $event.stopPropagation();

                eval('$scope.' + kind)[id] = true;
            };


            $scope.dateOptions = {
                'currentText': 'hoy',
                'clearText': 'limpiar',
                'closeText': 'cerrar'
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
            $scope.uuids = [];
            //************************
            // end datepicker settings
            //************************


            /////////////
            ///	TAB manager
            ///
            $scope.admintabs = [
                {
                    id: 'tabdetails',
                    active: true
                },
                {
                    id: 'tabpricing',
                    active: false
                },
                {
                    id: 'tabcobros',
                    active: false
                },
                {
                    id: 'tabprogram',
                    active: false
                },
                {
                    id: 'tabinvoice',
                    active: false
                },
                {
                    id: 'tabbono',
                    active: false
                },
                {
                    id: 'tabmessage',
                    active: false
                },
                {
                    id: 'tabhistory',
                    active: false
                }
            ];
            $scope.affiliatetabs = [
                {
                    id: 'tabdetails',
                    active: true
                },
                {
                    id: 'tabadmin',
                    active: false
                },
                {
                    id: 'tabprogram',
                    active: false
                },
                {
                    id: 'tabmessage',
                    active: false
                },
                {
                    id: 'tabhistory',
                    active: false
                }
            ];
            $scope.dmctabs = [
                {
                    id: 'tabdetails',
                    active: true
                },
                {
                    id: 'tabadmin',
                    active: false
                },
                {
                    id: 'tabprogram',
                    active: false
                },
                {
                    id: 'tabmessage',
                    active: false
                },
                {
                    id: 'tabhistory',
                    active: false
                }
            ];

            $scope.selectTab = function (id) {

                var tabname = loginsession != null && loginsession.user != null ? loginsession.user.rolename + 'tabs' : null;
                console.log('tab selected: ' + tabname);
                id = id || 'tabdetails';

                if (tabname != null) {
                    var hash = '';
                    $scope.tab = _.find($scope[tabname], function (tab) {
                        return tab.id == id;
                    });
                    $scope.tab.active = true;
                    hash = $scope.tab.id;
                    console.log('Selected tab...');
                    console.log($scope.tab);
                    
                };
            }


            function pricingcallback(err, data) {
                err == null ? refreshbooking(data) : null;
                tools_service.showPreloader($scope, 'hide');
            }

            $scope.pricemethod = {
                pvp: function () {
                    _.each($scope.booking.breakdown.roomsbyprice.agency.keys, function (pricekey) {
                        var editedpvp = $scope.booking.breakdown.roomsbyprice.agency[pricekey].price;
                        _.each($scope.booking.breakdown.roomsbyprice.agency[pricekey].slugs, function (paxslug) {
                            var pax = _.find($scope.booking.paxes, function (pax) { return pax.slug == paxslug; });
                            pax != null ? pax.price = editedpvp : null;
                        });
                    });
                    console.log($scope.booking);
                    $scope.pricingcall(false, true, pricingcallback);
                },
                fee: function () {
                    $scope.pricingcall(true, true, pricingcallback);
                    console.log($scope.booking);
                },
                paxes: function (changepvp) {
                    $scope.pricingcall(false, changepvp, pricingcallback);
                    console.log($scope.booking);
                }
            }

            //PRICING CONTROL 
            $scope.updatePrice = function (method, changepvp) {
                tools_service.showPreloader($scope, 'show');
                if (method != null && method != '' && $scope.pricemethod.hasOwnProperty(method)) {
                    $scope.pricemethod[method](changepvp);
                }
            }

            $scope.pricingcall = function (onlyfee, nochangepvp, callback) {
                var req = {
                    bookpricing: {
                        idbooking: $scope.booking.idBooking,
                        paxes: $scope.booking.paxes,
                        rooms: $scope.booking.rooms,
                    }
                };

                //fee: 18,
                //onlyfee: true

                onlyfee ? (req.bookpricing.onlyfee = true, req.bookpricing.fee = $scope.booking.breakdown.agency.fee) : null;
                nochangepvp && !onlyfee ? (req.bookpricing.pvpchange = true, req.bookpricing.fee = $scope.booking.pricing.fee) : req.bookpricing.pvpchange = false;

                var rq = {
                    command: 'pricing',
                    service: 'api',
                    request: req
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    console.log('pricing changed and booking saved properly');
                    toaster.pop('success', "Saved", "Price changed for booking, booking: " + $scope.booking.idBooking + " was saved", 10000);
                    if (callback != null && typeof (callback) === 'function') { callback(null, rsp); }
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.log(err, null);
                    toaster.pop('error', "Error changing price.", err, 10000);
                    if (callback != null && typeof (callback) === 'function') { callback(err, $scope.booking); }
                });
                return rqCB;
            }

            //PAYMENTS AND CHARGES

            $scope.changepaymentmodel = function (texttoreplace, replacestring) {
                $scope.booking.paymentmodel = $scope.booking.paymentmodel.replace(texttoreplace, replacestring);
                $scope.justsave();
            }

            $scope.nextpayment = {
                transferid: '',
                amount: 0,
                paymentmethod: 'transfer',
                date: new Date(),
                action: 'pay',
                paymenttarget: 'provider',
                currency: {

                }
            }

            $scope.nextcharge = {
                receiptnumber: '',
                amount: 0,
                paymentmethod: 'transfer',
                date: new Date(),
                action: 'charge',
                paymenttarget: 'travelersense',
                currency: {

                }
            }

            var rSourcehash = {
                'affiliate': 'agency',
                'dmc': 'provider',
                'admin': 'travelersense',
                'traveler': 'traveler'
            };

            var rTargethash = {
                'affiliate': 'travelersense',
                'dmc': 'travelersense',
                'travelersense': 'agency'
            }

            var modalhash = {
                'affiliate': 'affiliate',
                'dmc': 'provider',
                'admin': 'travelersense',
                'traveler': 'traveler'
            };

            $scope.uploadInvoiceProvider = function () {
                var items = [$scope.booking, $scope.dmcproduct, 'provider', 'travelersense'];
                var modalInstance = $uibModal
                    .open({
                        templateUrl: '/partials/invoice/checkinvoice-provider.html.swig?dt=' + new Date(),
                        controller: 'InvoiceCtrl',
                        size: '',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });
                //al llamar a modalinstace.close se llamara a esta funcion
                modalInstance.result.then(function (res) {
                    tools_service.showPreloader($scope, 'hide');
                    console.log('res ', res);
                    //close
                    switch (res.msg) {
                        case 'ok':
                            console.log('OK load invoice. Details: ', res);
                            toaster.pop('success', "Saved", "Invoice for booking: " + $scope.booking.idBooking + " was saved", 10000);
                            $scope.justsave();
                            break;
                        case 'connection error':
                            toaster.pop('error', "Error uploading the invoice.", "Conection error. Please try again later.", 10000);
                            break;
                        case 'error file':
                            toaster.pop('error', "Error uploading the invoice.", "Please select a correct file.", 10000);
                            break;
                        default:
                            console.log(res);
                    };
                }, function (reason) {
                    //dismiss
                    $log.info('Dismiss loading invoice modal. Details: ', reason);
                });
            }

            $scope.uploadInvoiceAgency = function () {
                var items = [$scope.booking, $scope.dmcproduct, 'agency', 'travelersense'];
                var modalInstance = $uibModal
                    .open({
                        templateUrl: '/partials/invoice/checkinvoice-affiliate.html.swig?dt=' + new Date(),
                        controller: 'InvoiceCtrl',
                        size: '',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });

                //al llamar a modalinstace.close se llamara a esta funcion
                modalInstance.result.then(function (res) {
                    tools_service.showPreloader($scope, 'hide');
                    console.log('res ', res);
                    //close
                    switch (res.msg) {
                        case 'ok':
                            console.log('OK load invoice. Details: ', res);
                            toaster.pop('success', "Saved", "Invoice for booking: " + $scope.booking.idBooking + " was saved", 10000);
                            $scope.justsave();
                            break;
                        case 'connection error':
                            toaster.pop('error', "Error uploading the invoice.", "Conection error. Please try again later.", 10000);
                            break;
                        case 'error file':
                            toaster.pop('error', "Error uploading the invoice.", "Please select a correct file.", 10000);
                            break;
                        default:
                            console.log(res);
                    };
                }, function (reason) {
                    //dismiss
                    $log.info('Dismiss loading invoice modal. Details: ', reason);
                });
            }

            $scope.uploadInvoiceTS = function () {
                var items = [$scope.booking, $scope.dmcproduct, 'travelersense', 'agency'];
                var modalInstance = $uibModal
                    .open({
                        templateUrl: '/partials/invoice/checkinvoice-travelersense.html.swig?dt=' + new Date(),
                        controller: 'InvoiceCtrl',
                        size: '',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });
                //al llamar a modalinstace.close se llamara a esta funcion
                modalInstance.result.then(function (res) {
                    tools_service.showPreloader($scope, 'hide');
                    console.log('res ', res);
                    //close
                    switch (res.msg) {
                        case 'ok':
                            console.log('OK load invoice. Details: ', res);
                            toaster.pop('success', "Saved", "Invoice for booking: " + $scope.booking.idBooking + " was saved", 10000);
                            $scope.justsave();
                            break;
                        case 'connection error':
                            toaster.pop('error', "Error uploading the invoice.", "Conection error. Please try again later.", 10000);
                            break;
                        case 'error file':
                            toaster.pop('error', "Error uploading the invoice.", "Please select a correct file.", 10000);
                            break;
                        default:
                            console.log(res);
                    };
                }, function (reason) {
                    //dismiss
                    $log.info('Dismiss loading invoice modal. Details: ', reason);
                });
            }

            $scope.deleteinvoice = function (collection, invoice) {
                var collname = 'invoices' + collection;
                $scope.booking[collname] != null && $scope.booking[collname].length > 0 ? (
                    $scope.booking[collname] = _.filter($scope.booking[collname], function (inv) {
                        return JSON.stringify(inv) != JSON.stringify(invoice);
                    }), $scope.justsave()
                ) : console.log('collection not found... ' + collname);
            }

            $scope.uploadInvoice = function () {
                var rolename = loginsession.user.rolename;
                var items = [$scope.booking, $scope.dmcproduct, rSourcehash[rolename], rTargethash[rolename]];

                var modalInstance = $uibModal
                    .open({
                        templateUrl: '/partials/invoice/checkinvoice-' + modalhash[rolename] + '.html.swig?dt=' + new Date(),
                        controller: 'InvoiceCtrl',
                        size: '',
                        resolve: {
                            items: function () {
                                return items;
                            }
                        }
                    });
                //al llamar a modalinstace.close se llamara a esta funcion
                modalInstance.result.then(function (res) {
                    tools_service.showPreloader($scope, 'hide');
                    console.log('res ', res);
                    //close
                    switch (res.msg) {
                        case 'ok':
                            console.log('OK load invoice. Details: ', res);
                            toaster.pop('success', "Saved", "Invoice for booking: " + $scope.booking.idBooking + " was saved", 10000);
                            $scope.savebooking();
                            break;
                        case 'connection error':
                            toaster.pop('error', "Error uploading the invoice.", "Conection error. Please try again later.", 10000);
                            break;
                        case 'error file':
                            toaster.pop('error', "Error uploading the invoice.", "Please select a correct file.", 10000);
                            break;
                        default:
                            console.log(res);
                    };
                }, function (reason) {
                    //dismiss
                    $log.info('Dismiss loading invoice modal. Details: ', reason);
                });
            }

            $scope.openGenerateInvoice = function (withrole) {
                var rolename = withrole || loginsession.user.rolename;
                var items = [$scope.booking, $scope.dmcproduct, rSourcehash[rolename], rTargethash[rolename]];

                var modalInstance = $uibModal.open({
                    templateUrl: '/partials/invoice/auto-' + modalhash[rolename] + '-invoice.html.swig?dt=' + new Date(),
                    controller: 'InvoiceCtrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return items;
                        }
                    }
                });
                //al llamar a modalinstace.close se llamara a esta funcion
                modalInstance.result.then(function (res) {
                    //close
                    tools_service.showPreloader($scope, 'hide');
                    console.log('res ', res);
                    //close
                    switch (res.msg) {
                        case 'ok':
                            //toaster.pop('success',"Sucess","Generating invoice for booking: "+$scope.booking.idBooking, 10000);		
                            toaster.pop('success', "Saved", "Invoice for booking: " + $scope.booking.idBooking + " was saved", 10000);
                            $window.open($scope.booking.invoiceProviderFile, "_blank");
                            break;
                        case 'save error':
                            console.log('error: ', res.err);
                            toaster.pop('error', "Error saving the invoice.", 'Error updating booking. Details: ' + res.err, 10000);
                            break;
                        case 'pdf error':
                            console.log("error, getting pdf from html in dmc invoice for booking: " + $scope.booking.idBooking);
                            toaster.pop('error', "Error saving the invoice.", "Generating invoice for booking: " + $scope.booking.idBooking + ". Please try again later.", 10000);
                        default:
                            console.log(res);
                    };
                }, function (reason) {
                    //dismiss
                    $log.info('Dismiss loading invoice modal. Details: ', reason);
                });
            };

            //invoices getter
            $scope.getinvoicefor = function (target, options) {
                var invoice = null;
                if (target != '' && $scope.booking != null && $scope.booking.invoices != null && $scope.booking.invoices.length > 0) {
                    invoice = _.find($scope.booking.invoices, function (invoice) {
                        return invoice.target.toLowerCase() == target.toLowerCase();
                    });
                }
                return invoice;
            }

            function refreshbooking(book) {
                $scope.booking = book;
                $scope.firstpaydate = new Date($scope.booking.createdOn);
                $scope.firstpaydate.setDate(($scope.firstpaydate.getDate() + 3));
                $scope.dmcproduct = $scope.booking.products[0];
                $scope.query = $scope.booking.query;
                $scope.quote = $scope.booking.quote;
                $scope.dmcproduct.dmc = $scope.booking.dmc;
            }

            $scope.removeitem = function (itemtype, item) {
                if (itemtype != null && itemtype != '' && item != null) {
                    var itemhash = {
                        payment: 'Payments'
                    };

                    var query = {
                        _id: item._id,
                    };
                    var req = {
                        query: query,
                        collection: itemhash[itemtype],
                        enabled: true
                    };
                    tools_service.showPreloader($scope, "show");

                    var rq = {
                        command: 'erase',
                        service: 'api',
                        request: req
                    };

                    var rqCB = yto_api.send(rq);

                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {

                        $scope.booking.payments = _.filter($scope.booking.payments, function (pay) {
                            return JSON.stringify(pay) != JSON.stringify(item);
                        });

                        $scope.savebooking();

                        callback != null ? callback(rsp) : null;
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, "hide");
                        console.error(err);
                        toaster.pop('error', 'Add payment', err)
                        errorcallback != null ? errorcallback(err) : null;
                    });

                    return rqCB;

                }
            }


            $scope.saveallpayments = function (callback) {
                if ($scope.booking.payments != null && $scope.booking.payments.length > 0) {
                    var updates = [];
                    var done = [];
                    _.each($scope.booking.payments, function (pay) {
                        updates.push(function (callback) {
                            var req = {
                                query: { _id: pay._id },
                                collectionname: 'Payments',
                                data: pay
                            };

                            done.push({ id: pay._id, done: false });

                            var rq = {
                                command: 'save',
                                service: 'api',
                                request: req
                            };

                            var rqCB = yto_api.send(rq);

                            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                                console.log('payment saved properly');
                                if (callback != null && typeof (callback) === 'function') { callback(null, rsp); }
                            });
                            //on response noOk
                            rqCB.on(rqCB.onerroreventkey, function (err) {
                                console.log(err, null);
                                if (callback != null && typeof (callback) === 'function') { callback(err, pay); }
                            });
                            return rqCB;
                        });
                    });

                    _.each(updates, function (payupdate) {
                        payupdate(function (err, payment) {
                            var donevalidation = _.find(done, function (donevalid) { return donevalid.id == payment._id; });
                            donevalidation.done = true;
                            var allsaved = _.every(done, function (donevalid) { return donevalid.done; });
                            allsaved ? $scope.savebooking() : null;
                        });
                    });

                }


            }

            $scope.justsave = function (callback) {
                tools_service.showPreloader($scope, "show");
                $scope.savebooking(function () {
                    console.log('saved...');
                    tools_service.showPreloader($scope, "hide");
                    $scope.editTransferDetails == true ?
                        setTimeout(function () {
                            console.log('add comment for this action...');
                            $scope.addComment($scope.rolename + ' ha modificado la informacion de traslados')
                        }, 700) : null;
                    $scope.editTransferDetails = false;
                    callback != null ? callback() : null;
                });
            }

            $scope.cancellBookingModal = function () {
                modals_service.openmodal('cancellbooking', $scope);
            };

            $scope.$on('cancellbookingaffiliate', function (event) {
                _cancellBooking();
            });

            /**
             * funcion que cancela la reserva
             */
            var _cancellBooking = function () {

                tools_service.showPreloader($scope, "show");


                var req = {
                    query: { idBooking: $scope.booking.idBooking },
                    collectionname: 'Bookings2',
                    newstatus: 'cancelled'
                };

                var rq = {
                    command: 'status',
                    service: 'api',
                    request: { statusrequest: req }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    refreshbooking(rsp);
                    toaster.pop('success', "Reserva Cancelada", "Se ha cancelado correctamente.");
                    tools_service.showPreloader($scope, "hide");
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "hide");
                    console.log(err);
                    toaster.pop('error', 'Status change', err);
                });
                return rqCB;
            }

            $scope.newComment = '';
            $scope.story = {
                modelrelated: 'Bookings2',
                storytype: 'comment', //historic, comment, 
                parentid: $scope.booking != null ? $scope.booking._id : '',
                date: new Date(),
                user: loginsession.user.email,
                usertype: loginsession.user.rolename,
                story: {
                    text: ''
                }
            };

            $scope.addComment = function (forcecomment, callback) {
                if ($scope.story.story.text != '' || forcecomment != '') {
                    tools_service.showPreloader($scope, "show");
                    forcecomment != null && forcecomment != '' ? $scope.story.story.text = forcecomment : null;
                    $scope.story.parentid = $scope.booking._id;
                    var req = {
                        collectionname: 'Stories',
                        data: $scope.story
                    };

                    var rq = {
                        command: 'save',
                        service: 'api',
                        request: req
                    };
                    var rqCB = yto_api.send(rq);

                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.booking.stories.push(rsp);
                        $scope.savebooking();
                        $scope.story.story.text = '';
                        toaster.pop('success', "Cambios Guardados", "comentario añadido");
                        if (callback != null && typeof (callback) === 'function') { callback(); }

                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, "hide");
                        console.log(err);
                        toaster.pop('error', 'Save booking comment', err);
                        if (callback != null && typeof (callback) === 'function') { callback(err); }
                    });
                    return rqCB;
                }

            }

            $scope.savebooking = function (callback) {
                var req = {
                    query: { idBooking: $scope.booking.idBooking  },
                    collectionname: 'Bookings2',
                    populate: [
                        { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }, { path: 'dmc' }, { path: 'traveler' },
                        { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
                        { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
                        { path: 'invoices' }, { path: 'relatedbooking' }],
                    data: $scope.booking
                };

                var rq = {
                    command: 'save',
                    service: 'api',
                    request: req
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    tools_service.showPreloader($scope, "hide");
                    refreshbooking(rsp);
                    toaster.pop('success', "Cambios Guardados", "Se han guardado los cambios correctamente");
                    if (callback != null && typeof (callback) === 'function') { callback(); }

                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "hide");
                    console.log(err);
                    toaster.pop('error', 'Save booking', err);
                    if (callback != null && typeof (callback) === 'function') { callback(err); }
                });
                return rqCB;
            }

            function sendpayment(payment, paymenttarget, callback, errorcallback) {
                tools_service.showPreloader($scope, "show");

                var paymentdata = payment || {
                    action: 'pay',
                    paymentmethod: 'transfer',
                    transferid: $scope.nextpayment.transferid, 
                    target: $scope.nextpayment.paymenttarget,
                    date: $scope.nextpayment.date,
                    amount: $scope.nextpayment.amount,
                    booking: $scope.booking,
                    currency: $scope.nextpayment.currency
                };

                var chargedata = payment || {
                    action: 'charge',
                    paymentmethod: 'transfer',
                    receiptnumber: $scope.nextcharge.receiptnumber,
                    target: 'travelersense',
                    date: $scope.nextcharge.date,
                    amount: $scope.nextcharge.amount,
                    booking: $scope.booking,
                    currency: $scope.nextcharge.currency
                }

                var rq = {
                    command: 'pay',
                    service: 'api',
                    request: {
                        paymentdata: (paymenttarget == 'pay') ? paymentdata : chargedata,
                        idbooking: $scope.booking.idBooking
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    refreshbooking(rsp);
                    toaster.pop('success', 'Add payment', 'Añadido correctamente');
                    tools_service.showPreloader($scope, "hide");
                    callback != null ? callback(rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "show");
                    console.error(err);
                    toaster.pop('error', 'Add payment', err);
                    errorcallback != null ? errorcallback(err) : null;
                });

                return rqCB;

            }


            $scope.addpayment = function () {
                //checks... 
                var alerts = [];
                var checks = [
                    function () {
                        var ok = false;
                        $scope.nextpayment.transferid == '' ? (alerts.push('Debe informar el Transfer ID'), ok = false) : ok = true;
                        return ok;
                    },
                    function () {
                        var ok = false;
                        $scope.nextpayment.amount == '' ? (alerts.push('El importe es menor o igual a 0'), ok = false) : ok = true;
                        return ok;
                    }
                ];
                var proceed = _.every(checks, function (validation) { return validation(); });
                proceed == true ? sendpayment(null, 'pay') : toaster.pop('error', 'Add payment', alerts.join('/r/n'));
            }

            $scope.addcharge = function () {
                //checks... 
                var alerts = [];
                var checks = [
                    function () {
                        var ok = false;
                        $scope.nextcharge.receiptnumber == '' ? (alerts.push('Debe informar el Receipt Number'), ok = false) : ok = true;
                        return ok;
                    },
                    function () {
                        var ok = false;
                        $scope.nextcharge.amount == '' ? (alerts.push('El importe es menor o igual a 0'), ok = false) : ok = true;
                        return ok;
                    }
                ];
                var proceed = _.every(checks, function (validation) { return validation(); });
                proceed == true ? sendpayment(null, 'charge') : toaster.pop('error', 'Add charge', alerts.join('/r/n'));
            }

            //END PAYMENTS AND CHARGES

            //ROOMS & PASSENGERS
            $scope.getpaxes = function (room) {
                var paxes = [];
                if (room.paxlist != null && room.paxlist.length > 0) {
                    _.each(room.paxlist, function (slug) {
                        var pax = _.find($scope.booking.paxes, function (pax) { return pax.slug == slug; });
                        pax != null ? paxes.push(pax) : null;
                    });
                }
                return paxes;
            }

            $scope.removeroom = function (room) {
                _.each(room.paxlist, function (paxslug) {
                    $scope.booking.paxes = _.filter($scope.booking.paxes, function (listpax) {
                        return paxslug != listpax.slug;
                    });
                });
                $scope.booking.rooms = _.filter($scope.booking.rooms, function (listroom) {
                    return JSON.stringify(listroom) != JSON.stringify(room);
                });
            }

            $scope.removepax = function (pax, room) {
                $scope.booking.paxes = _.filter($scope.booking.paxes, function (listpax) { return listpax.slug != pax.slug; });
                _.each($scope.booking.rooms, function (room) {
                    room.paxlist = _.filter(room.paxlist, function (paxslug) { return paxslug != pax.slug; });
                    if (room.paxlist == null || room.paxlist.length == 0) { $scope.removeroom(room); } else { rearrangeroom(room); }
                });
            }

            function rearrangeroom(room) {
                console.log('review rooms and paxs for room ');
                console.log(room);
                _.each(room.paxlist, function (paxslug) {
                    _.each($scope.booking.paxes, function (listpax) {
                        if (listpax.slug == paxslug) {
                            console.log('new price for pax');
                            console.log(listpax);
                            switch (room.paxlist.length.toString()) {
                                case '1': listpax.price = $scope.booking.pricing.rooms.single || 0; listpax.room = 'single'; break;
                                case '2': listpax.price = $scope.booking.pricing.rooms.double || 0; listpax.room = 'double'; break;
                                case '3': listpax.price = $scope.booking.pricing.rooms.triple || 0; listpax.room = 'triple'; break;
                                case '4': listpax.price = $scope.booking.pricing.rooms.quad || 0; listpax.room = 'quad'; break;
                            };
                        }
                    });
                });

                switch (room.paxlist.length) {
                    case 1: room.name = 'single'; room.roomcode = 'single'; room.priceperpax = ($scope.booking.pricing.rooms.single || 0); room.price = room.priceperpax; break;
                    case 2: room.name = 'double'; room.roomcode = 'double'; room.priceperpax = ($scope.booking.pricing.rooms.double || 0); room.price = room.priceperpax * 2; break;
                    case 3: room.name = 'triple'; room.roomcode = 'triple'; room.priceperpax = ($scope.booking.pricing.rooms.triple || 0); room.price = room.priceperpax * 3; break;
                    case 4: room.name = 'quad'; room.roomcode = 'quad'; room.priceperpax = ($scope.booking.pricing.rooms.quad || 0); room.price = room.priceperpax * 4; break;
                };
            }

            $scope.agregarPax = function (room) {
                // 1) agrego un pax nuevo
                var paxDummy = {
                    name: '',
                    lastname: '',
                    slug: _generateUUID(),
                    documentnumber: '',
                    documenttype: 'passport',
                    documentexpirationdate: new Date(),
                    holder: false,
                    birthdate: new Date(1985, 0, 1),
                    price: 0,
                    net: 0,
                    dmc: 0,
                    room: 'double',
                    documentexpeditioncountry: {
                        label_en: 'Spain',
                        label_es: 'España',
                        slug: 'es'
                    },
                    country: {
                        label_en: 'Spain',
                        label_es: 'España',
                        slug: 'es'
                    }
                };
                room.paxlist.push(paxDummy.slug);
                $scope.booking.paxes.push(paxDummy);

                //rearrangeroom(room);

                return paxDummy;
            };

            $scope.addRoom = function () {

                var dummyRoom = {
                    name: 'double',
                    price: 0,
                    priceperpax: 0,
                    net: 0,
                    netperpax: 0,
                    dmc: 0,
                    dmcperpax: 0,
                    roomcode: 'double',
                    paxlist: []
                };

                //adding two paxes...
                $scope.agregarPax(dummyRoom);
                $scope.agregarPax(dummyRoom);

                $scope.booking.rooms.push(dummyRoom);
            };

            $scope.getnationalitycountry = function(country){
                return { label_es: country.name_es, label_en: country.name_en, slug: country.countrycode };
            }

            

            function readHashTab() {
                var hash = $location.hash();
                hash != null && hash != '' ? $scope.selectTab(hash) : null;

                var hash = $location.hash() || 'tabdetails';
                console.log(hash);
                $scope.selectTab(hash);
            };

            function content(callback) {
                tools_service.showPreloader($scope, "show");
                bookinghelpers.getNationalities(function (natresponse) {
                    $scope.nationalities = natresponse;
                    console.log('nationalities is downloaded...');
                    callback != null ? (callback(), console.log('set booking callback...')) : (tools_service.showPreloader($scope, "hide"), console.log('no callback.. remove preload...'));
                });
            }

            function setBooking() {
                //readHashTab();
                tools_service.showPreloader($scope, "show");
                $scope.booking = editiondata;
                $scope.adminRevision = adminaccess;
                $scope.dmcproduct = editiondata.products[0];
                $scope.query = editiondata.query;
                $scope.quote = editiondata.quote;
                $scope.dmcproduct.dmc = editiondata.dmc;
                $scope.bookingIsWhiteLabel = (editiondata.bookingmodel == 'whitelabel');
                $scope.firstpaydate = new Date($scope.booking.createdOn);
                $scope.firstpaydate.setDate(($scope.firstpaydate.getDate() + 3));
                $scope.rolename = loginsession.user.rolename;
                $scope.currentsession = loginsession;
                loginsession.user.rolename == 'affiliate' ? $scope.affiliate = loginsession.affiliate : null;
                loginsession.user.rolename == 'dmc' ? $scope.dmc = loginsession.dmc : null;
                $scope.theuser = loginsession.user;
                readHashTab();
                tools_service.showPreloader($scope, "hide");
            };

            content(function () {
                setBooking();
            });
        }]);


app.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
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