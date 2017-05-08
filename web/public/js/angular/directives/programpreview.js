app.directive("programpreview", ['tools_service',
    '$uibModal', 'yto_api', '$sce',
    '$cookieStore', 'Lightbox', 'bookinghelpers', 'productpreviewhelpers', 'destinations_service', '$anchorScroll', '$location', 'modals_service', '$http', '$httpParamSerializerJQLike', '$window', 
    function (tools_service,
        $uibModal, yto_api, $sce,
        $cookieStore, Lightbox, bookinghelpers, productpreviewhelpers, destinations_service, $anchorScroll, $location, modals_service, $http, $httpParamSerializerJQLike, $window) {

        return {
            templateUrl: '/partials/programs/program-preview.html.swig?d=' + new Date(),
            scope: {
                dmcproduct: '=program',
                lang: '=language',
                quote: '=quote',
                openedit: '=openedit',
                dmcdata: '=dmcdata',
                removeedition: '=removeedition',
                removebuttons: '=removebuttons',
                booking: '=booking',
                showgetcopy: '=showgetcopy'
                //bindAttr: '='
            },
            link: function ($scope, el, attrs) {
                $anchorScroll.yOffset = 250;
                $scope.toggleedition = function () {
                    $scope.editionenabled = !$scope.editionenabled;
                    $location.hash('anchorpreviewpoint');
                    $anchorScroll();
                }

                $scope.$watch('dmcproduct', function () { reload(); });
                $scope.$watch('quote', function () { reload(); });

                function reload() {
                    console.log('Model change detected... reloading program...');
                    console.log($scope.dmcproduct);
                    $scope.editiontemplateurl = '/partials/programs/program-edition.html.swig?c=' + new Date();
                    $scope.lang = $scope.lang || 'ES';

                    $scope.editionenabled = $scope.openedit || false;
                    $scope.removeeditor = $scope.removeedition || false;
                    $scope.removeeditionbuttons = $scope.removebuttons || false;
                    //PROGRAM STUFF
                    $scope.markers = {};
                    $scope.gmapsready = false;
                    $scope.havemap = false;
                    $scope.gmap = null;
                    $scope.editDescription = false;
                    $scope.formvisible = $scope.openedit || false;

                    $scope.markers = _getMarkers($scope.dmcproduct.itinerary);
                    $scope.markers = _getMarkers($scope.dmcproduct.itinerary);
                    $scope.mapUpdate();

                    //$scope.callactionurl = '';
                    //$scope.callactionurl = $scope.quote != null ?
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-callaction.html.swig?dt=' + new Date() :
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-regular-' + $scope.lang + '-callaction.html.swig?dt=' + new Date();
                    //$scope.callactiontmdistributionurl = '';
                    //$scope.callactiontmdistributionurl = $scope.quote != null ?
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-callaction-distribution-detail.html.swig?dt=' + new Date() :
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-callaction-distribution-' + $scope.lang + '-detail.html.swig?dt=' + new Date();
                    //$scope.bootomcallactionurl_en = '';
                    //$scope.bootomcallactionurl_en = $scope.quote != null ?
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-bottom-callaction-en.html.swig?dt=' + new Date() :
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-regular-bottom-callaction-en.html.swig?dt=' + new Date();
                    //$scope.bootomcallactionurl_es = '';
                    //$scope.bootomcallactionurl_es = $scope.quote != null ?
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-bottom-callaction-es.html.swig?dt=' + new Date() :
                    //    '/partials/programs/' + loginsession.user.rolename + '-program-preview-regular-bottom-callaction-es.html.swig?dt=' + new Date();

                    //console.log('preview call action: ' + $scope.callactionurl);
                    //console.log('preview bottom call action (en): ' + $scope.bootomcallactionurl_en);
                    //console.log('preview bottom call action (es): ' + $scope.bootomcallactionurl_es);

                }

                $scope.blankproduct = {
                    name: 'New Program' + new Date().toJSON(),
                    title: '',
                    title_es: '',
                    languages: {
                        english: true,
                        spanish: false
                    },
                    productvalid: false,
                    description: '',
                    productimage: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
                    code: '',
                    dmccode: '',
                    publishState: 'draft',
                    adminsave: false,
                    important_txt_en: '',
                    important_txt_es: '',
                    categoryname: null,
                    location: {
                        fulladdress: '',
                        city: '',
                        stateorprovince: '',
                        cp: '',
                        country: '',
                        countrycode: '',
                        continent: '',
                        latitude: 0.0,
                        longitude: 0.0,
                    },
                    availability: [],
                    price: 0,
                    included: {
                        trip: {
                            grouptrip: false,
                            privatetrip: false,
                            minpaxoperate: 2
                        },
                        arrivaltransfer: false,
                        arrivalassistance: false,
                        arrivallanguage: {
                            spanish: false,
                            english: false,
                            french: false,
                            german: false,
                            italian: false,
                            portuguese: false
                        },
                        arrivalselectedlanguage: { language: { spanish: false } },
                        departuretransfer: false,
                        departureassistance: false,
                        departurelanguage: {
                            spanish: false,
                            english: false,
                            french: false,
                            german: false,
                            italian: false,
                            portuguese: false
                        },
                        departureselectedlanguage: { language: { spanish: false } },
                        tourescort: {
                            included: false,
                            language: {
                                spanish: false,
                                english: false,
                                french: false,
                                german: false,
                                italian: false,
                                portuguese: false
                            },
                            tourescortselectedlanguage: { language: { spanish: false } },
                        },
                        driveguide: {
                            included: false,
                            language: {
                                spanish: false,
                                english: false,
                                french: false,
                                german: false,
                                italian: false,
                                portuguese: false
                            }
                        },
                        transportbetweencities: {
                            bus: false,
                            domesticflight: false,
                            train: false,
                            boat: false,
                            van: false,
                            truck: false,
                            privatecarwithdriver: false,
                            privatecarwithdriverandguide: false,
                            fourxfour: false,
                            other: false,
                            otherdescription: ''
                        },
                        taxesinthecountry: false,
                        airporttaxes: false,
                        tips: false,
                        baggagehandlingfees: false
                    },
                    itinerary: [

                    ],
                    keys: [],
                    tags: [],
                    dmc: $scope.dmcdata,
                    flightsdmc: false,
                    flights: false
                };
                $scope.editiontemplateurl = '/partials/programs/program-edition.html.swig?=' + new Date();
                $scope.lang = $scope.lang || 'ES';
                //images helper
                $scope.getimage = function (url, imagename) {
                    return tools_service.cloudinaryUrl(url, imagename);
                };

                function _getMarkers(itinerary) {
                    return productpreviewhelpers.getMarkers(itinerary);
                }
                var now = new Date();

                //$scope.dmcproduct = $scope.program;
                $scope.dmcproduct == null ? $scope.dmcproduct = $scope.blankproduct : null;

                console.log($scope.program);
                console.log($scope.openedit);
                $scope.editionenabled = $scope.openedit || false;
                $scope.removeeditor = $scope.removeedition || false;
                $scope.removeeditionbuttons = $scope.removebuttons || false;
                //PROGRAM STUFF
                $scope.markers = {};
                $scope.gmapsready = false;
                $scope.havemap = false;
                $scope.gmap = null;
                $scope.editDescription = false;
                $scope.formvisible = $scope.openedit || false;
                $scope.today = new Date();
                //$scope.quoteexpired = 
                $scope.markers = _getMarkers($scope.dmcproduct.itinerary);
                console.log($scope.markers);

                $scope.$on('program.reload', function (event, programreloaded) {
                    $scope.dmcproduct = programreloaded;
                    $scope.markers = _getMarkers($scope.dmcproduct.itinerary);
                    $scope.mapUpdate();
                })
            //google.maps.event.addDomListener(document, 'load', function () {
            //    $scope.gmapsready = true;
            //    $scope.markers != null ? $scope.mapUpdate() : null;
            //    console.log('automap...');
            //});

            $scope.copyprogram = function () {
                var dmctosend = ($scope.quote != null) ? $scope.quote.dmc : null;
                console.log(dmctosend);
                var selection = modals_service.openmodal('selectdmcforprogram',
                    $scope,
                    { selectprogram: true, dmcs: null, dmc: dmctosend, singlecopy: true });
                }

            $scope.$on('program.singlecopy.done', function (e, program) {
                $scope.dmcproduct = program;
                $scope.markers = _getMarkers($scope.dmcproduct.itinerary);
                $scope.mapUpdate();
            });


            $scope.toggable = {
                productedit: false,
                chargesedit: false,
                paymentsedit: false
            }

            $scope.editProduct = function () {
                $scope.formvisible = !$scope.formvisible;
            }

            $scope.showDescriptions = function () {
                $scope.editDescription = !$scope.editDescription;
            }


            $scope.showPreviewEn = function () {
                return $scope.lang.toUpperCase() == 'EN';
            }

            $scope.showPreviewEs = function () {
                return $scope.lang.toUpperCase() == 'ES';
            }

            $scope.callactionurl = '';
            $scope.callactionurl = $scope.quote != null ?
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-callaction.html.swig?dt=' + new Date() :
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-regular-' + $scope.lang + '-callaction.html.swig?dt=' + new Date();
            $scope.callactiontmdistributionurl = '';
            $scope.callactiontmdistributionurl = $scope.quote != null ?
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-callaction-distribution-detail.html.swig?dt=' + new Date() :
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-callaction-distribution-' + $scope.lang + '-detail.html.swig?dt=' + new Date();
            $scope.bootomcallactionurl_en = '';
            $scope.bootomcallactionurl_en = $scope.quote != null ?
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-bottom-callaction-en.html.swig?dt=' + new Date() :
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-regular-bottom-callaction-en.html.swig?dt=' + new Date();
            $scope.bootomcallactionurl_es = '';
            $scope.bootomcallactionurl_es = $scope.quote != null ?
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-tailormade-bottom-callaction-es.html.swig?dt=' + new Date() :
                '/partials/programs/' + loginsession.user.rolename + '-program-preview-regular-bottom-callaction-es.html.swig?dt=' + new Date();

            console.log('preview call action: ' + $scope.callactionurl);
            console.log('preview bottom call action (en): ' + $scope.bootomcallactionurl_en);
            console.log('preview bottom call action (es): ' + $scope.bootomcallactionurl_es);

            $scope.quoteGetPaxes = function () {
                var totalpaxes = 0;
                if ($scope.quote != null && $scope.quote.rooms != null) {
                    var triple = 0;
                    var double = 0;
                    var single = 0;
                    var quad = 0;
                    $scope.quote.rooms.quad != null && $scope.quote.rooms.quad.quantity > 0 ? quad++ : null;
                    $scope.quote.rooms.triple != null && $scope.quote.rooms.triple.quantity > 0 ? triple += $scope.quote.rooms.triple.quantity : null;
                    $scope.quote.rooms.double != null && $scope.quote.rooms.double.quantity > 0 ? double += $scope.quote.rooms.double.quantity : null;
                    $scope.quote.rooms.single != null && $scope.quote.rooms.single.quantity > 0 ? single += $scope.quote.rooms.single.quantity : null;
                    totalpaxes = (quad * 4) + (double * 2) + (triple * 3) + (single * 1);
                } 
                return totalpaxes;
            }

            $scope.mapUpdate = function () {
                if ($scope.markers.length > 0) {
                    if ($scope.havemap == false) {
                        $scope.havemap = true;
                        //google.maps.event.addDomListener(window, 'load', function () {
                        //    $scope.lang.toUpperCase() != null || $scope.lang.toUpperCase() == 'EN' ? initMap($scope.markers, 'map_en') : initMap($scope.markers, 'map_es');
                        //});
                        $scope.gmap = $scope.lang.toUpperCase() == null || $scope.lang.toUpperCase() == 'EN' ? initMap($scope.markers, 'map_en') : initMap($scope.markers, 'map_es');
                    } else {
                        console.log('resize toggle...');
                        google.maps.event.trigger(map, 'resize');
                        setTimeout(function () {
                            console.log('again...');
                            google.maps.event.trigger(map, 'resize');
                        }, 2000)
                        
                    }
                    
                } else {
                    $scope.havemap = false;
                }
            };

            $scope.showAllCities = function () {
                var cities = [];
                var html = '';

                if ($scope.dmcproduct != null && $scope.dmcproduct.itinerary != null && $scope.dmcproduct.itinerary.length > 0) {
                    for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                        var it = $scope.dmcproduct.itinerary[i];
                        if (it.departurecity != null && it.departurecity.city != '') {

                            if (cities.indexOf(it.departurecity.city.split(',')[0]) == -1) {
                                cities.push(it.departurecity.city.split(',')[0])
                            }
                        }
                        for (var j = 0; j < it.stopcities.length; j++) {
                            var cit = it.stopcities[j];
                            if (cities.indexOf(cit.city.split(',')[0]) == -1) {
                                cities.push(cit.city.split(',')[0]);
                            }
                        }
                        if (it.sleepcity != null && it.sleepcity.city != '') {

                            if (cities.indexOf(it.sleepcity.city.split(',')[0]) == -1) {
                                cities.push(it.sleepcity.city.split(',')[0])
                            }
                        }
                    }
                }
                html = cities.join(', ');
                return html;
            }

            function _getContentToPrint(url, method, data, callback) {
                console.log(url);
                return $http({
                    method: method != null && method != '' ? method : 'GET',
                    url: url,
                    data: data,
                    headers: {}
                }).success(function (data) {
                    callback(data);
                }).error(function () {
                    alert("error");
                });
            }

            var url_fullpath = $location.$$absUrl;
            var url_mod = "";
            var feeunit = '%';

            if (url_fullpath.indexOf("?") != -1) {
                url_mod = url_fullpath.substr(0, url_fullpath.indexOf("?"));
            } else {
                url_mod = url_fullpath;
            }

            $scope.printLink = url_mod + '?print=true';
            $scope.printLinkOnePage = url_mod + '?print=true&onepage=true';

            $scope.printQuote = function () {
                var rq = {
                    quote: $scope.quote,
                    dmcproduct: $scope.dmcproduct
                };
                var url = '/tailormade-to-print';
                console.log('request to print', rq);
                _getContentToPrint(url, 'POST', rq, function (result) {
                    var namefile = 'yto-tailormade-' + $scope.quote.code;
                    var dataFooter = {
                        name: loginsession.affiliate.company.name,
                        logo: loginsession.affiliate.images.logo.url
                    };
                    var dataHeader = {
                        name: loginsession.affiliate.company.name,
                        logo: loginsession.affiliate.images.logo.url,
                        phone: loginsession.affiliate.company.phone,
                        web: loginsession.affiliate.company.website,
                        address: loginsession.affiliate.company.location.fulladdress,
                        cp: loginsession.affiliate.company.location.cp,
                        city: loginsession.affiliate.company.location.city
                    };
                    var urlLocal = 'http://' + location.host + '/' //'http://www.yourttoo.com/';
                    var footerurl = '\"' + urlLocal + 'pdfPartial?part=footer&' + $httpParamSerializerJQLike(dataFooter) + '\"';
                    var headerurl = '\"' + urlLocal + 'pdfPartial?part=header&' + $httpParamSerializerJQLike(dataHeader) + '\"';
                    var pageSettings = '-B 20mm -L 0mm -R 0mm -T 42mm --footer-html ' + footerurl + ' --header-html ' + headerurl;

                    var rqCB = yto_api.post('/download/getpdffromhtml', {
                        html: result,
                        pageSettings: pageSettings,
                        type: 'products',
                        namefile: namefile
                    });

                    rqCB.on(rqCB.oncompleteeventkey, function (productPdf) {

                        if (productPdf != null && productPdf.url != null) {
                            $window.open(productPdf.url, '_blank');
                        }
                        
                        else {
                            console.log("ERROR, getting pdf from html for productPdf: " + productSlug);
                            toaster.pop('error', "Error", "Error al generar PDF del producto, " + productSlug, 10000);
                        }

                        tools_service.showPreloader($scope, "hide");

                    });

                    //response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        toaster.pop('error', "Error", "Error al generar PDF del producto, " + productSlug, 10000);
                    });

                });

            }

            $scope.printTravel = function (productSlug, product) {
                console.log('print full Travel ', productSlug);
                console.log('print full Travel ', loginsession.affiliate.images.logo);
                tools_service.showPreloader($scope, 'show');
                var quotepvp = $scope.quote != null && $scope.quote.pvpAffiliate != null ? $scope.quote.pvpAffiliate.value : null;
                var url = '/viaje/' + product.slug_es + '?print=true&pvp=' + quotepvp;
                var namefile = '';

                //si el slug viene vacio pongo el numero de la quote
                if (productSlug == undefined || productSlug == null || productSlug == '' || productSlug == '  ') {
                    var ruta = $location.path().split('/');
                    console.log("quote name: ", ruta[ruta.length - 2]);
                    namefile = 'yto-viaje-' + ruta[ruta.length - 2];
                }
                else {
                    namefile = 'yto-viaje-' + productSlug;
                }

                // 1) obtener html a imprimir
                _getContentToPrint(url, 'GET', null, function (result) {
                    var dataFooter = {
                        name: loginsession.affiliate.company.name,
                        logo: loginsession.affiliate.images.logo.url
                    };
                    var dataHeader = {
                        name: loginsession.affiliate.company.name,
                        logo: loginsession.affiliate.images.logo.url,
                        phone: loginsession.affiliate.company.phone,
                        web: loginsession.affiliate.company.website,
                        address: loginsession.affiliate.company.location.fulladdress,
                        cp: loginsession.affiliate.company.location.cp,
                        city: loginsession.affiliate.company.location.city
                    };

                    if (typeof product !== 'undefined') {
                        dataHeader.tit = product.title_es;
                        if (product.categoryname !== null && product.categoryname !== undefined) {
                            dataHeader.cat = product.categoryname.label_es;
                        }
                    }
                    var urlLocal = 'http://' + location.host + '/' //'http://www.yourttoo.com/';

                    var footerurl = '\"' + urlLocal + 'pdfPartial?part=footer&' + $httpParamSerializerJQLike(dataFooter) + '\"';
                    var headerurl = '\"' + urlLocal + 'pdfPartial?part=header&' + $httpParamSerializerJQLike(dataHeader) + '\"';
                    var pageSettings = '-B 20mm -L 0mm -R 0mm -T 42mm --footer-html ' + footerurl + ' --header-html ' + headerurl;

                    console.log('footerurl :', footerurl);
                    console.log('headerurl :', headerurl);

                    console.log('pageSettings :', pageSettings);
                    // 2) llamo al core para convertirlo en pdf
                    var rqCB = yto_api.post('/download/getpdffromhtml', {
                        html: result,
                        pageSettings: pageSettings,
                        type: 'products',
                        namefile: namefile
                    });

                    //response OK
                    rqCB.on(rqCB.oncompleteeventkey, function (productPdf) {

                        if (productPdf != null && productPdf.url != null) {
                            $window.open(productPdf.url, '_blank');
                        }
                        //error al generar factura 
                        else {
                            console.log("ERROR, getting pdf from html for productPdf: " + productSlug);
                            toaster.pop('error', "Error", "Error al generar PDF del producto, " + productSlug, 10000);
                        }

                        tools_service.showPreloader($scope, "hide");

                    });

                    //response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        toaster.pop('error', "Error", "Error al generar PDF del producto, " + productSlug, 10000);
                    });
                });
            };

            $scope.showItinerariesHotelIncluded = function () {
                return productpreviewhelpers.printMeals($scope.dmcproduct);
            }

            $scope.showItineraryDrinksIncluded = function () {

                var htmlyes = '(Drinks per itinerarary)';
                var htmlno = '(No drinks)';
                var rt = htmlno;
                if ($scope.dmcproduct != null && $scope.dmcproduct.itinerary && $scope.dmcproduct.itinerary.length > 0) {
                    for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                        var it = $scope.dmcproduct.itinerary[i];
                        if (it.hotel.lunchdrinks | it.hotel.dinnerdrinks) {
                            rt = htmlyes;
                        }
                    }
                }
                return rt;
            }

            $scope.showCities = function (itinerary) {
                var html = '';
                var cities = [];
                var arestops = false;
                if (itinerary != null) {
                    if (itinerary.departurecity != null && itinerary.departurecity.city != '') {

                        //if (cities.indexOf(itinerary.departurecity.city.split(',')[0]) == -1) {

                        //}
                        var c = itinerary.departurecity.city;
                        //if (c.indexOf(',') == -1) {
                        //    if (itinerary.departurecity.location) {
                        //        c += ' (' + itinerary.departurecity.location.country + ')';
                        //    }
                        //}
                        cities.push(c);
                    }
                    if (itinerary.stopcities != null && itinerary.stopcities.length > 0) {
                        arestops = true;
                        for (var j = 0; j < itinerary.stopcities.length; j++) {
                            var cit = itinerary.stopcities[j];
                            var c = cit.city;
                            //if (c.indexOf(',') == -1) {
                            //    if (cit.location) {
                            //        c += ' (' + cit.location.country + ')';
                            //    }
                            //}

                            if (cities.indexOf(c) == -1) {
                                cities.push(c);
                            }
                        }
                    }
                    if (itinerary.sleepcity != null && itinerary.sleepcity.city != '') {
                        var c = itinerary.sleepcity.city;
                        //if (c.indexOf(',') == -1) {
                        //    if (itinerary.sleepcity.location) {
                        //        c += ' (' + itinerary.sleepcity.location.country + ')';
                        //    }
                        //}
                        if (arestops) {
                            cities.push(c);
                        }
                        else {
                            if (cities.indexOf(c) == -1) {
                                cities.push(c);
                            }
                        }
                    }


                }
                html = cities.join(' - ');
                return html;
            }

            $scope.loadflights = function (action, itinerary) {
                if (action) {
                    itinerary.flights = [];
                    itinerary.flights.push({ departure: '', arrival: '', recommendedflight: '' })
                } else {
                    itinerary.flights = [];
                }
            }

            function labelairport(item) {
                item != null && item.iata != null ? item.label = "(" + item.iata.toUpperCase() + ") " + item.city + " - " + item.name : null;
                return item;
            }

            $scope.airports = null;

            function recoverAirports(callback) {
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { name: { $ne: null } },
                            collectionname: 'Airports',
                            fields: '_id name city country iata latitude longitude',
                            sortcondition: { name: 1 }
                        }
                    };

                    var rqCB = yto_api.send(rq);

                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.airports = _.map(rsp, function (airp) { airp = labelairport(airp); return airp; });
                        $scope.airports = rsp;
                        callback != null ? callback(rsp) : null;
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        $log.error("error content airports");
                        $log.error(err);
                        errorcallback != null ? errorcallback(err) : null;
                    });

                    return rqCB;
            }

            recoverAirports();
            $scope.arrivalairportholder = '';
            $scope.departureairportholder = '';
            // flag arrival airport default false
            $scope.haveArrivalAirport = false;
            // flag departure airport default false
            $scope.haveDepartureAirport = false;

            $scope.removeflights = function (select) {
                if (select) {
                    for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                        $scope.dmcproduct.itinerary[i].needflights = false;
                        $scope.dmcproduct.itinerary[i].flights = [];
                    }
                };
            }

            $scope.loadflights = function (action, itinerary) {
                if (action) {
                    itinerary.flights = [];
                    itinerary.flights.push({ departure: '', arrival: '', recommendedflight: '' })
                } else {
                    itinerary.flights = [];
                }
            }

            $scope.deleteflights = function (index, itinerary) {
                itinerary.flights.splice(index, 1);
            }

            $scope.addflights = function (itinerary) {
                itinerary.flights.push({ departure: '', arrival: '', recommendedflight: '' })
            }


            $scope.selectAirport = function (airport, day, type) {
                if (airport != "" && airport != null) {
                    $scope.haveArrivalAirport = (type == 'arrival') ? true : false;
                    $scope.haveDepartureAirport = (type == 'departure') ? true : false;
                    day.flights = [];
                    day.needflights = false;
                    day.flights.push({ [type]: airport });
                    $scope.arrivalairportholder = '';
                    $scope.departureairportholder = '';
                }
            }
            /**
              * @ngdoc method
              * @name deleteAirport
              * @methodOf controller.DMCProductCtrl
              * @description 
              *
              * removes departure / arrival airport from itinerary
              * @param  {Object} day  itineary day
              * @param  {String} type 2 options "arrival" or "departure"
              */
            $scope.deleteAirport = function (day, type) {
                $scope.haveArrivalAirport = (type == 'arrival') ? false : true;
                $scope.haveDepartureAirport = (type == 'departure') ? false : true;
                day.flights = [];
                day.needflights = false;
                $scope.arrivalairportholder = '';
                $scope.departureairportholder = '';
            }

            $scope.productNeedFlights = function (itinerary) {
                return bookinghelpers.productNeedFlights(itinerary);
            }

            $scope.therearemeals = function (itinerary) {
                return productpreviewhelpers.therearemeals(itinerary);
            }

            $scope.showActivityResume = function (activity, lang) {
                return productpreviewhelpers.showActivityResume(activity, lang);
            }

            $scope.showLanguages = function (language, lang) {
                return productpreviewhelpers.showLanguages(language, lang);
            }

            $scope.arelanguages = function (language) {
                return productpreviewhelpers.arelanguages(language);
            }

            $scope.showTransportsIncluded = function (lang) {
                return productpreviewhelpers.showTransportsIncluded($scope.dmcproduct, lang)
            }

            $scope.hasDrinks = function () {
                return productpreviewhelpers.hasDrinks($scope.dmcproduct.itinerary);
            }

            //TODO
            $scope.calculatePriceMinimum = function () {
                var pricemin = 0;
                var today = new Date();
                var monthstart = 0;

                var indexyear = _indexOfYear(today.getFullYear());

                if ($scope.dmcproduct != null && $scope.dmcproduct.availability != null) {
                    //console.log('get the min price...');
                    for (var j = 0; j < $scope.dmcproduct.availability.length; j++) {
                        for (var i = monthstart; i <= 11; i++) {
                            var month = _getMonthNameEnglish(i);


                            if ($scope.dmcproduct.availability[j] != null) {

                                if ($scope.dmcproduct.availability[j][month]) {
                                    if ($scope.dmcproduct.availability[j][month].availability) {
                                        //for every avail...
                                        var avails = $scope.dmcproduct.availability[j][month].availability;

                                        if (avails != null && avails.length > 0) {
                                            for (var jj = 0; jj < avails.length; jj++) {

                                                if (avails[jj].rooms.double.price > 0) {
                                                    if (pricemin == 0) {
                                                        pricemin = avails[jj].rooms.double.price;
                                                    }
                                                    else {
                                                        if (avails[jj].rooms.double.price < pricemin) {
                                                            pricemin = avails[jj].rooms.double.price;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }

                        }

                    }

                }
                return pricemin;
            }

            $scope.formatnumber = function (num) {
                return tools_service.formatNumber(num, 0);
            }

            //*************************** New Availability Managing Methods...
            function buildAvailabilityRange(newrange) {
                if (newrange) {
                    var start = new Date(newrange.from.getFullYear(), newrange.from.getMonth(), newrange.from.getDate());
                    var end = new Date(newrange.to.getFullYear(), newrange.to.getMonth(), newrange.to.getDate());
                    var iterate = new Date(newrange.from.getFullYear(), newrange.from.getMonth(), newrange.from.getDate());
                    //start the road...
                    while (iterate <= end) {
                        //which year:
                        var indexyear = _indexOfYear(iterate.getFullYear());
                        //check we've found the availability for thuis year...
                        if (indexyear == -1) {
                            //if not add one...
                            $scope.dmcproduct.availability.push(_getNewAvailForYear(iterate.getFullYear()));
                            //..and get the index
                            indexyear = _indexOfYear(iterate.getFullYear());
                        }
                        //which month: 
                        var monthname = _getMonthNameEnglish(iterate.getMonth());
                        //which dayofweek
                        var day = _getDayOfWeek(iterate.getDay());
                        //which week:
                        var weekindex = getWeekOfMonth(iterate);
                        var week = _getWeekName(weekindex);

                        //now... find the day in the availability matrix...
                        var indexday = _indexOfDay(iterate, $scope.dmcproduct.availability[indexyear]);
                        if (indexday > -1) {
                            //the day is finded in the matrix...
                            //lets update...
                            if (newrange[day] == true) {
                                //is a day from week selected...
                                //manipulate....
                                if (newrange.available == true) {
                                    $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].date = iterate.toString();
                                    $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].day = iterate.getDate();
                                    $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].available = true;
                                    $scope.dmcproduct.availability[indexyear][monthname].availability[indexday].rooms =
                                        newrange.rooms;
                                    //Updated!!
                                }
                                else {
                                    //we have to remove this day...
                                    $scope.dmcproduct.availability[indexyear][monthname].availability.splice(indexday, 1);
                                    //done!
                                }
                            }
                        }
                        else {
                            //this day is not finded in the matrix...
                            //check if we have to add...
                            if (newrange[day] == true) {
                                if (newrange.available == true) {
                                    var range = {
                                        date: iterate.toString(),
                                        day: iterate.getDate(),
                                        publishedDate: new Date(),
                                        available: true,
                                        rooms: newrange.rooms
                                    }
                                    //push the day in availability matrix...
                                    $scope.dmcproduct.availability[indexyear][monthname].availability.push(range);
                                    //done!
                                }
                            }
                        }
                        //next day...
                        iterate.setDate(iterate.getDate() + 1);
                    }
                }
            }

            function setAvailabilityForDay(date) {
                //find the day in availability...
                if (date) {
                    //find year...
                    var indexyear = _indexOfYear(date.getFullYear());
                    //which month: 
                    var monthname = _getMonthNameEnglish(date.getMonth());
                    //find day...
                    var indexday = _indexOfDay(date, $scope.dmcproduct.availability[indexyear]);
                    if (indexday > -1) {
                        //we've found the day...
                        var av = $scope.dmcproduct.availability[indexyear][monthname].availability[indexday];
                        //update the calendar...
                        //get possitions..
                        var day = _getDayOfWeek(date.getDay());
                        var weekindex = getWeekOfMonth(date);
                        var week = _getWeekName(weekindex);
                        $scope.calendar[week][day].available = av.available;
                        $scope.calendar[week][day].rooms = av.rooms;
                    }
                    else {
                        //this day is not in availability...
                        //nothing to be done...
                    }
                }
            }

            function setAvailabilityInCalendar(year, month) {

                if ($scope.dmcproduct != null && $scope.dmcproduct.availability != null && $scope.dmcproduct.availability.length > 0) {
                    var start = new Date(year, month, 1);
                    var end = new Date(year, month, 1);
                    end.setMonth(start.getMonth() + 1);

                    var iterate = new Date(year, month, 1);
                    var indexyear = _indexOfYear(year);
                    if (indexyear > -1) {
                        //lets iterate...
                        while (iterate < end) {
                            //which
                            setAvailabilityForDay(iterate);
                            iterate.setDate(iterate.getDate() + 1);
                        }
                    }


                }

            }
            function _indexOfYear(year) {
                var index = -1;
                if ($scope.dmcproduct != null && $scope.dmcproduct.availability != null && $scope.dmcproduct.availability.length > 0) {
                    for (var i = 0; i < $scope.dmcproduct.availability.length; i++) {
                        if ($scope.dmcproduct.availability[i].year == year) {
                            index = i;
                            break;
                        }
                    }
                }
                return index;
            }
            function _indexOfDay(date, availyear) {
                var index = -1;
                var monthname = _getMonthNameEnglish(date.getMonth());
                var avails = availyear[monthname].availability;


                if (avails != null && avails.length > 0) {
                    for (var i = 0; i < avails.length; i++) {

                        if (avails[i].day == date.getDate()) {
                            index = i;
                            break;
                        }
                        
                    }
                }
                return index;
            }
            function getDayEnabledClass(calendarday) {
                if (calendarday.rooms.single.price > 0 |
                    calendarday.rooms.single.price > 0 |
                    calendarday.rooms.single.price > 0 |
                    calendarday.rooms.single.price > 0) {
                    return 'enabled';
                }
                else { return ''; }
            }
            function _getMonthNameSpanish(monthindex) {
                if (monthindex == 0) { return 'Enero'; }
                if (monthindex == 1) { return 'Febrero'; }
                if (monthindex == 2) { return 'Marzo'; }
                if (monthindex == 3) { return 'Abril'; }
                if (monthindex == 4) { return 'Mayo'; }
                if (monthindex == 5) { return 'Junio'; }
                if (monthindex == 6) { return 'Julio'; }
                if (monthindex == 7) { return 'Agosto'; }
                if (monthindex == 8) { return 'Septiembre'; }
                if (monthindex == 9) { return 'Octubre'; }
                if (monthindex == 10) { return 'Noviembre'; }
                if (monthindex == 11) { return 'Diciembre'; }
            }
            function _getMonthNameEnglish(monthindex) {
                if (monthindex == 0) { return 'January'; }
                if (monthindex == 1) { return 'February'; }
                if (monthindex == 2) { return 'March'; }
                if (monthindex == 3) { return 'April'; }
                if (monthindex == 4) { return 'May'; }
                if (monthindex == 5) { return 'June'; }
                if (monthindex == 6) { return 'July'; }
                if (monthindex == 7) { return 'August'; }
                if (monthindex == 8) { return 'September'; }
                if (monthindex == 9) { return 'October'; }
                if (monthindex == 10) { return 'November'; }
                if (monthindex == 11) { return 'December'; }
            }
            function _getWeekName(weekindex) {
                if (weekindex == 1) { return 'firstweek'; }
                if (weekindex == 2) { return 'secondweek'; }
                if (weekindex == 3) { return 'thirdweek'; }
                if (weekindex == 4) { return 'fourthweek'; }
                if (weekindex == 5) { return 'fifthweek'; }
                if (weekindex == 6) { return 'sixthweek'; }
            }
            function _getDayOfWeek(dayindex) {
                if (dayindex == 0) return 'sunday';
                if (dayindex == 1) return 'monday';
                if (dayindex == 2) return 'tuesday';
                if (dayindex == 3) return 'wednesday';
                if (dayindex == 4) return 'thursday';
                if (dayindex == 5) return 'friday';
                if (dayindex == 6) return 'saturday';

            }
            function getWeekOfMonth(adate) {
                var first = new Date(adate.getFullYear(), adate.getMonth(), 1, 0, 0, 0, 0);
                var iterator = first;
                var week = 1;
                for (var i = 1; i <= adate.getDate(); i++) {
                    iterator.setDate(i);
                    if (adate.getDate() == iterator.getDate()) {
                        break;
                    }
                    if (iterator.getDay() == 0) {
                        //sunday..
                        week++;
                    }
                }
                return week;
            };


            $scope.normalizeitineraryIds = function () {
                if ($scope.dmcproduct != null && $scope.dmcproduct.itinerary != null) {
                    _.each($scope.dmcproduct.itinerary, function (day) {
                        (day.departurecity != null && day.departurecity.cityid != null
                            && day.departurecity.cityid != '') ?
                            $scope.dmcproduct.departurecity.push(day.departurecity.cityid) : null;

                        (day.departurecity != null && day.departurecity.countryid != null
                            && day.departurecity.countryid != '') ?
                            $scope.dmcproduct.departurecountry.push(day.departurecity.countryid) : null;

                        (day.sleepcity != null && day.sleepcity.cityid != null
                            && day.sleepcity.cityid != '') ?
                            $scope.dmcproduct.sleepcity.push(day.sleepcity.cityid) : null;

                        (day.sleepcity != null && day.sleepcity.countryid != null
                            && day.sleepcity.countryid != '') ?
                            $scope.dmcproduct.sleepcountry.push(day.sleepcity.countryid) : null;

                        if (day.stopcities != null && day.stopcities.length > 0) {
                            _.each(day.stopcities, function (stopcity) {
                                (stopcity != null && stopcity.cityid != null
                                    && stopcity.cityid != '') ?
                                    $scope.dmcproduct.stopcities.push(stopcity.cityid) : null;

                                (stopcity != null && stopcity.countryid != null
                                    && stopcity.countryid != '') ?
                                    $scope.dmcproduct.stopcountry.push(stopcity.countryid) : null;
                            });
                        }
                    });

                    //unique ids...
                    $scope.dmcproduct.departurecity = _.uniq($scope.dmcproduct.departurecity);
                    $scope.dmcproduct.departurecountry = _.uniq($scope.dmcproduct.departurecountry);
                    $scope.dmcproduct.sleepcity = _.uniq($scope.dmcproduct.sleepcity);
                    $scope.dmcproduct.sleepcountry = _.uniq($scope.dmcproduct.sleepcountry);
                    $scope.dmcproduct.stopcities = _.uniq($scope.dmcproduct.stopcities);
                    $scope.dmcproduct.stopcountry = _.uniq($scope.dmcproduct.stopcountry);
                }
            }

            $scope.SaveProductChanges = function (callback) {
                $scope.normalizeitineraryIds();
                var collection = $scope.booking != null ? 'BookedProducts' : 'DMCProducts';
                var rq = {
                    command: 'save',
                    service: 'api',
                    request: {
                        data: $scope.dmcproduct,
                        collectionname: collection,
                        populate: [
                            { path: 'dmc' },
                            { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }],
                        query: { code: $scope.dmcproduct.code }
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    $scope.dmcproduct = rsp;
                    callback != null ? callback(rsp) : null;
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.error("error saving product");
                    console.error(err);
                    errorcallback != null ? errorcallback(err) : null;
                });

                return rqCB;
            }

            $scope.uuids = [];
            function _generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
                });

                if ($scope.uuids.indexOf(uuid) > -1) {
                    console.log('this uuid exists...');
                    uuid = _generateUUID();
                }
                else {
                    $scope.uuids.push(uuid);
                }

                return uuid;
            };
            $scope.deleteitinerary = function (itinerary) {
                for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                    if ($scope.dmcproduct.itinerary[i].uuid == itinerary.uuid) {
                        if ($scope.dmcproduct.itinerary[i].lastday == true) {
                            $scope.shownextday = true;
                        }
                        $scope.dmcproduct.itinerary.splice(i, 1);
                        break;
                    }
                }
                _rearrange_days();

            };

            $scope.adddeparturetoitinerary = function (uuid) {
                for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                    if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                        $scope.dmcproduct.itinerary[i].departurecity.city = $scope.dmcproduct.itinerary[i].citytoadd.city;
                        $scope.dmcproduct.itinerary[i].departurecity.citybehaviour = 'departure';
                        $scope.dmcproduct.itinerary[i].departurecity.order = 1;
                        $scope.dmcproduct.itinerary[i].departurecity.country = '';
                        break;
                    }
                    resetautocomplete();
                }
            };

            /**
             * anade un dia al itenerario
             */
            $scope.addsleeptoitinerary = function (itinerary, thecity) {
                console.log('______', thecity);
                var location = thecity.location;

                var city = {
                    city: location.city,
                    citybehaviour: 'sleep',
                    order: 0,
                    cityid: location.cityid,
                    countryid: location.countryid,
                    country: location.country,
                    location: location
                };
                console.log("itineario inicial: ", itinerary);
                if (itinerary) {
                    itinerary.sleepcity = city;
                    //add departure to next day if exists...
                    for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                        if ($scope.dmcproduct.itinerary[i].uuid === itinerary.uuid) {
                            if ($scope.dmcproduct.itinerary[i + 1] != null) {
                                $scope.dmcproduct.itinerary[i + 1].departurecity = city;
                                $scope.dmcproduct.itinerary[i + 1].departurecity.citybehaviour = 'departure';
                                $scope.dmcproduct.itinerary[i + 1].departurecity.order = 1;
                            }
                            break;
                        }
                    }
                    resetautocomplete();
                    $scope.mapUpdate();
                }
                else {
                    console.log('Itinerary not found...');
                }
                console.log("itineario entero: ", $scope.dmcproduct.itinerary);
                console.log("itineario final: ", itinerary);
            };

            $scope.removestopcitytoitinerary = function (itinerary, cityname) {
                for (var j = 0; j < itinerary.stopcities.length; j++) {
                    if (itinerary.stopcities[j].city === cityname) {
                        itinerary.stopcities.splice(j, 1);
                        break;
                    }
                }
            }

            $scope.removedeparturecitytoitinerary = function (uuid) {
                for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                    if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                        $scope.dmcproduct.itinerary[i].departurecity.city = '';
                        break;
                    }
                };
            }

            $scope.removesleepcitytoitinerary = function (itinerary) {
                itinerary.sleepcity.city = '';
                //find next day...
                //add departure to next day if exists...
                for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                    if ($scope.dmcproduct.itinerary[i].uuid === itinerary.uuid) {
                        if ($scope.dmcproduct.itinerary[i + 1] != null) {
                            $scope.dmcproduct.itinerary[i + 1].departurecity.city = '';
                            $scope.dmcproduct.itinerary[i + 1].departurecity.citybehaviour = 'departure';
                            $scope.dmcproduct.itinerary[i + 1].departurecity.order = 1;
                            $scope.dmcproduct.itinerary[i + 1].departurecity.country = '';
                        }
                        break;
                    }
                }
            };

            $scope.additineraryday = function (from) {

                if ($scope.dmcproduct.itinerary == null) {
                    $scope.dmcproduct.itinerary = [];
                }

                var daynumber = $scope.dmcproduct.itinerary.length + 1;
                if (from != null) {
                    if (from.sleepcity.city != null && from.sleepcity.city != '' &&
                        from.hotel.category != '') {
                        daynumber = from.daynumber + 1;

                        var itinerary = _additineraryday(daynumber, true, from);
                        if (from != null) {
                            $scope.dmcproduct.itinerary.splice(daynumber - 1, 0, itinerary);
                        } else {
                            $scope.dmcproduct.itinerary.push(itinerary);
                        }
                        _rearrange_days();

                    }
                    else {
                        toaster.pop('error', 'Add itinerary day', 'You must set the sleep city and hotel category' +
                            ' on the previous day');
                        //throw 'You must set the sleep city and hotel category';
                    }

                } else {
                    var itinerary = _additineraryday(daynumber, true, null);
                    $scope.dmcproduct.itinerary.push(itinerary);
                    _rearrange_days();
                }
            }
            function _rearrange_days() {
                if ($scope.dmcproduct.itinerary != null &&
                    $scope.dmcproduct.itinerary.length) {

                    for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                        $scope.dmcproduct.itinerary[i].daynumber = i + 1;
                        if (i > 0) {
                            if ($scope.dmcproduct.itinerary[i - 1] != null &&
                                $scope.dmcproduct.itinerary[i - 1].sleepcity) {

                                $scope.dmcproduct.itinerary[i].departurecity =
                                    $scope.dmcproduct.itinerary[i - 1].sleepcity;
                            }
                        }

                        if ($scope.dmcproduct.itinerary[i].uuid === null ||
                            $scope.dmcproduct.itinerary[i].uuid === '') {
                            $scope.dmcproduct.itinerary[i].uuid = _generateUUID();
                        }
                    }
                }
            }
            /**
             * generate a new day to add to itinerary
             */
            function _additineraryday(daynumber, isnotlast, before) {

                console.log("_additineraryday: dayNumber: ", daynumber);
                console.log("day: ", before);


                var itinerary = {
                    uuid: _generateUUID(),
                    isnotlastday: isnotlast,
                    lastday: !isnotlast,
                    name: new Date().getDay() + new Date().getMonth(),
                    daynumber: daynumber,
                    date: new Date(),
                    image: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' },
                    imageprogress: false,
                    showimage: false,
                    departurecity: {
                        city: '',
                        citybehaviour: '',
                        order: 1,
                        country: '',
                        location: {
                            fulladdress: '',
                            city: '',
                            stateorprovince: '',
                            cp: '',
                            country: '',
                            countrycode: '',
                            continent: '',
                            latitude: 0,
                            longitude: 0,
                        },
                    },
                    sleepcity: {
                        city: '',
                        citybehaviour: '',
                        order: 2,
                        country: '',
                        location: {
                            fulladdress: '',
                            city: '',
                            stateorprovince: '',
                            cp: '',
                            country: '',
                            countrycode: '',
                            continent: '',
                            latitude: 0,
                            longitude: 0,
                        },
                    },
                    stopcities: [],
                    hotel: {
                        name: '',
                        category: '',
                        locationkind: '',
                        incity: false,
                        insurroundings: false,
                        meals: false,
                        breakfast: false,
                        lunch: false,
                        lunchdrinks: false,
                        dinner: false,
                        dinnerdrinks: false,
                        selectedcategory: { text: '5*', category: '5*' }
                    },
                    description_en: '',
                    description_es: '',
                    activities: [],
                    citytoadd: {
                        city: '',
                        citybehaviour: 'departure',
                        order: '',
                        country: '',
                        location: {
                            fulladdress: '',
                            city: '',
                            stateorprovince: '',
                            cp: '',
                            country: '',
                            countrycode: '',
                            continent: '',
                            latitude: 0,
                            longitude: 0,
                        }
                    }
                };


                if (before != null) {
                    itinerary.departurecity.city =
                        before.sleepcity.city;
                    itinerary.departurecity.country =
                        before.sleepcity.country;
                    itinerary.departurecity.location =
                        before.sleepcity.location;
                    if (itinerary.departurecity.city && itinerary.departurecity.city.citybehaviour) {
                        itinerary.departurecity.city.citybehaviour = 'departure';
                    }
                    else {
                        itinerary.departurecity.citybehaviour = 'departure';
                    }
                    itinerary.departurecity.order = 1;
                }

                console.log("itienrario auxiliar creado: ", itinerary);
                return itinerary;
            }


            $scope.buildItinerary = function () {

                if ($scope.itinerarydays == 0) {
                    toaster.pop('error', 'Itinerary days', 'You have to set a days number greater than 0');
                }
                else {
                    $scope.dmcproduct.itinerary = [];
                    for (var i = 1; i <= $scope.itinerarydays; i++) {
                        var islast = !(i == $scope.itinerarydays);
                        _additineraryday(i, islast);
                    }
                    $scope.showlastdayaddcity = false;
                }

            };


            $scope.addcitytoitinerary = function (itinerary, thecity) {
                console.log('_____', thecity);
                var location = thecity.location;
                var city = {
                    city: location.city,
                    citybehaviour: 'stop',
                    order: itinerary.stopcities.length + 1,
                    cityid: location.cityid,
                    countryid: location.countryid,
                    country: location.country,
                    location: location
                };

                itinerary.stopcities.push(city);
                resetautocomplete();
            };

            function resetautocomplete() {
                angular.element(document.querySelector('.select-city')).val('');
            }

            $scope.addcitytoitinerarylastday = function (itinerary, thecity) {
                var location = thecity.location;
                var city = {
                    city: location.city,
                    citybehaviour: 'stop',
                    order: itinerary.stopcities.length + 1,
                    cityid: location.cityid,
                    countryid: location.countryid,
                    country: location.country,
                    location: location
                };
                itinerary.stopcities.push(city);
                $scope.showlastdayaddcity = false;
                resetautocomplete();
            };

            $scope.destinations = function () {
                return destinations_service.productcountriesnorm_en;
            };

            $scope.deleteactivity = function (itinerary, activity) {

                if (itinerary) {
                    var jindex = -1;
                    for (var j = 0; j < itinerary.activities.length; j++) {
                        if (itinerary.activities[j].uuid == activity.uuid) {
                            jindex = j;
                            break;
                        }
                    }
                    if (jindex > -1) {
                        itinerary.activities.splice(jindex, 1);
                    }
                }


            }

            $scope.addactivitytoitinerary = function (itinerary) {
                //var it = finditinerary(uuid);
                if (itinerary) {
                    var activity = {
                        uuid: _generateUUID(),
                        daynumber: itinerary.daynumber,
                        index: 1,
                        title: '',
                        title_es: '',
                        activitykind: '',
                        group: false,
                        individual: false,
                        ticketsincluded: false,
                        localguide: false,
                        language: {
                            spanish: false,
                            english: false,
                            french: false,
                            german: false,
                            italian: false,
                            portuguese: false
                        }
                    }
                    itinerary.activities.push(activity);
                }

            }

            $scope.initIncluded = function () {
                if ($scope.dmcproduct.included) {
                    if ($scope.dmcproduct.included.trip) {
                        if ($scope.dmcproduct.included.trip.privatetrip == true) {
                            $scope.included.tripisprivateorgroup = 'private';
                            $scope.dmcproduct.included.trip.grouptrip = false;
                        }
                        else {
                            $scope.included.tripisprivateorgroup = 'group';
                            $scope.dmcproduct.included.trip.privatetrip = false;
                        }
                    }
                }
            }

            $scope.activitykindchange = function (activity) {
                if (activity.activitykind == 'group') {
                    activity.group = true;
                    activity.individual = false;
                }
                if (activity.activitykind == 'individual') {
                    activity.individual = true;
                    activity.group = false;
                }
            }

            function _initFormPreloadedItinerary(itinerary) {
                if (itinerary != null && itinerary.length > 0) {
                    $scope.itinerarydays = itinerary.length;
                    for (var i = 0; i < itinerary.length; i++) {
                        itinerary[i].daynumber = i + 1;
                        itinerary[i].uuid = _generateUUID();
                        //itinerary[i].lastday = !itinerary[i].isnotlastday;
                        if (itinerary[i].image != null) {
                            if (itinerary[i].image.url != 'img/elements/img-empty.png'
                                && itinerary[i].image.url != '') {
                                itinerary[i].showimage = true;
                            }
                        }
                        else {
                            itinerary[i].image = { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png' };
                            itinerary[i].showimage = false;
                        }
                        if (itinerary[i].image.url == 'img/elements/img-empty.png') {
                            itinerary[i].image.url =
                                'http://res.cloudinary.com/open-market-travel/image/upload/v1426854292/assets/omtempty.png';
                        }

                        if (itinerary[i].hotel.incity == true) {
                            itinerary[i].hotel.locationkind = 'hotelcity';
                        }
                        if (itinerary[i].hotel.insurroundings == true) {
                            itinerary[i].hotel.locationkind = 'hotelsurr';
                        }

                        var cat = itinerary[i].hotel.category;

                        var fcat = findHotelCategory(cat)
                        itinerary[i].hotel.selectedcategory = fcat;


                        if (itinerary[i].activities && itinerary[i].activities.length > 0) {
                            for (var j = 0; j < itinerary[i].activities.length; j++) {
                                itinerary[i].activities[j].uuid = _generateUUID();
                                if (itinerary[i].activities[j].group) {
                                    itinerary[i].activities[j].activitykind = 'group';
                                    itinerary[i].activities[j].individual = false;
                                }
                                if (itinerary[i].activities[j].individual) {
                                    itinerary[i].activities[j].activitykind = 'individual';
                                    itinerary[i].activities[j].group = false;
                                }
                            }
                        }
                    }
                }
            }


            $scope.trustHtml = function (html) {
                return $sce.trustAsHtml(html);
            };

            function _initFormPreloadedMainImage() {
                if ($scope.dmcproduct.productimage != null &&
                    $scope.dmcproduct.productimage.url != 'img/elements/img-empty.png') {
                    $scope.showmainimage = true;
                }
            }
            $scope.changehotelkind = function (itinerary) {
                if (itinerary.hotel.locationkind === 'hotelcity') {
                    itinerary.hotel.incity = true;
                    itinerary.hotel.insurroundings = false;
                }
                else {
                    itinerary.hotel.incity = false;
                    itinerary.hotel.insurroundings = true;
                }
            }
            $scope.availablelanguages = [{ language: 'spanish' }, { language: 'english' },
                { language: 'french' }, { language: 'german' }, { language: 'italian' }, { language: 'portuguese' }];
            $scope.availablehotelcategory = [
                { category: '5*SUP', text: '5*SUP' },
                { category: '5*', text: '5*' },
                { category: '4*SUP', text: '4*SUP' },
                { category: '4*', text: '4*' },
                { category: '3*SUP', text: '3*SUP' },
                { category: '3*', text: '3*' },
                { category: '2*', text: '2*' },
                { category: '1*', text: '1*' },
                { category: 'unclassified *', text: 'unclassified *' }];

            function findHotelCategory(categorytext) {
                var cat = null;

                if ($scope.availablehotelcategory) {
                    for (var i = 0; i < $scope.availablehotelcategory.length; i++) {
                        if ($scope.availablehotelcategory[i].text == categorytext) {
                            cat = $scope.availablehotelcategory[i];
                            break;
                        }
                    }
                }
                return cat;
            }

            $scope.selectedlanguage = { language: 'spanish' };
            $scope.selectedcategory = { category: '5*', text: '5*' };


            $scope.changehotelcategory = function (selection, thescope) {

                thescope = selection.category;
            }
            $scope.changelanguage = function (selection, scope) {

                thescope = selection.language;
            }

            $scope.showHotels = function (product) {
                if (product.itinerary) {
                    return printcategories(product.itinerary);
                }
                else {
                    return '';
                }
            }

            function printcategories(itinerarymatrix) {
                var html = '';
                var hotels = [];

                for (var i = 0; i < itinerarymatrix.length; i++) {
                    var itinerary = itinerarymatrix[i];
                    if (itinerary) {
                        if (itinerary.hotel && itinerary.hotel.category != '') {
                            if (hotels.indexOf(itinerary.hotel.category) == -1) {
                                hotels.push(itinerary.hotel.category);
                            }

                        }
                    }
                }
                hotels.sort();
                hotels.reverse();
                html = hotels.join(', ');
                return html;
            }

            /**
             * funcion para mostrar los tags del producto de la lista valida de productos
             */
            $scope.showTags = function (product) {
                if (product) {
                    return printtags(product);
                } else {
                    return '';
                }
            }

            function printtags(product) {
                var tags = [];
                var slugs = [];
                var html = '';

                if (product != null && product.tags != null && product.tags.length > 0) {
                    for (var i = 0; i < product.tags.length; i++) {
                        var tag = product.tags[i];
                        if (tag != null) {
                            if (slugs.indexOf(tag.slug) == -1) {
                                tags.push(tag.label_en);
                                slugs.push(tag.slug);
                            }
                        }
                    }
                }

                html = tags.join(', ');
                return html;
            }

            $scope.included = {
                tripisprivateorgroup: ''
            };

            $scope.changeincludedtypetrip = function () {
                if ($scope.included.tripisprivateorgroup == 'private') {
                    $scope.dmcproduct.included.trip.privatetrip = true;
                    $scope.dmcproduct.included.trip.grouptrip = false;
                }
                else {
                    $scope.dmcproduct.included.trip.privatetrip = false;
                    $scope.dmcproduct.included.trip.grouptrip = true;
                }
            };

            //image uploading
            //images helper

            //break the bubble
            function cancelevent(e) {
                if (!e)
                    e = window.event;

                //IE9 & Other Browsers
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                //IE8 and Lower
                else {
                    e.cancelBubble = true;
                }
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }

            function bisuploadfile(itemtarget) {
                console.log(itemtarget);
            }

            $scope.uploadfile = function (itemtarget) {
                var file = document.getElementById('upfile');
                $scope.uploadfiletarget = '';
                $scope.uploadfiletarget = itemtarget;

                console.log('the target for the file is...' + $scope.uploadfiletarget);
                if ($scope.uploadfiletarget == 'main') {
                    $scope.mainimageprogress = true;
                }
                else {
                    var uuid = $scope.uploadfiletarget;
                    if ($scope.dmcproduct.itinerary != null &&
                        $scope.dmcproduct.itinerary.length > 0) {
                        for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                            if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                $scope.dmcproduct.itinerary[i].imageprogress = true;
                                break;
                            }
                        }
                    }
                }
            }


            $scope.buildid = function (prefix, idname) {
                if (idname == null || idname == '') {
                    idname = _generateUUID();
                }

                return prefix + idname.split('-').join('');
            }

            function updateProgress(evt) {
                // evt is an ProgressEvent.
                if (evt.lengthComputable) {
                    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                    // Increase the progress bar length.
                    console.log('Readed...' + percentLoaded + ' %');
                }
            }

            function readURL(input, callback) {
                console.log('Pushing image to read...');
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        console.log('image readed...');

                        callback(e.target.result);
                    }
                    reader.onprogress = updateProgress;

                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    callback(null);
                }

            }

            $scope.loadingprogress = 0;

            $scope.$on("fileProgress", function (e, progress) {
                $scope.loadingprogress = 100 * (progress.loaded / progress.total);
                console.log($scope.loadingprogress);
            });

            $scope.triggeruploadpreview = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.loadingprogress = 0;

                var file = document.getElementById('upfile');
                file.onchange = null;
                var upfile = file.files[0];

                if (upfile != null) {

                    if ($scope.uploadfiletarget == 'main') {
                        $scope.mainimageprogress = true;
                    }
                    else {
                        var uuid = $scope.uploadfiletarget;
                        if ($scope.dmcproduct.itinerary != null &&
                            $scope.dmcproduct.itinerary.length > 0) {
                            for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                                if ($scope.dmcproduct.itinerary[i].uuid == uuid) {
                                    $scope.dmcproduct.itinerary[i].imageprogress = true;
                                    break;
                                }
                            }
                        }
                    }

                    fileReader.readAsDataUrl(upfile, $scope)
                        .then(function (url) {
                            tmpurl = url;
                            console.log(tmpurl);
                            if (tmpurl != null && tmpurl != '') {
                                $scope.uploadfileitem.tempurl = url;
                            }


                        });
                }

            }

            $scope.$on('program.visible', function () {
                console.log('tab selected');
                $scope.mapUpdate();
            });

            /// END PROGRAM STUFF
            setTimeout(function () {
                //$scope.mapUpdate();
            }, 2000);
            

        }
    }

}]);