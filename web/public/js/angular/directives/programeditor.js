app.directive("programeditorworklet", ['tools_service', 'Notification',
    '$uibModal', 'yto_api', '$rootScope', 
    '$cookieStore', 'Lightbox', 'productpreviewhelpers', 'destinations_service', '$anchorScroll', '$location', 'modals_service', '$http', '$httpParamSerializerJQLike', '$window',
    function (tools_service, Notification,
        $uibModal, yto_api, $rootScope,
        $cookieStore, Lightbox, productpreviewhelpers, destinations_service, $anchorScroll, $location, modals_service, $http, $httpParamSerializerJQLike, $window) {

        return {
            templateUrl: '/js/angular/directives/views/program-editor.html?d=' + new Date(),
            scope: {
                //dmcproduct: '=program',
                lang: '=language',
                quote: '=',
                quotesavecallback: '='
                //bindAttr: '='
            },
            link: function ($scope, el, attrs) {
                //constants

                var jsoneditor = null;
                $scope.rolename = loginsession.user.rolename;
                $scope.previewurl = '';

                $scope.jumptopreview = function () {
                    var slug = $scope.programs[$scope.selectedindexcategory].slug_es;
                    $scope.previewurl = $scope.quote != null ? '/quote/' + $scope.quote.code + '/?query=' + $scope.quote.userqueryCode : '/viaje/' + slug;
                    window.open($scope.previewurl);
                }

                $scope.months_en = ['January', 'February', 'March',
                    'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'];
                $scope.months_es = ['Enero', 'Febrero', 'Marzo',
                    'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

                $scope.availablelanguages = [
                    { language: 'spanish' },
                    { language: 'english' },
                    { language: 'french' },
                    { language: 'german' },
                    { language: 'italian' },
                    { language: 'portuguese' }];
                // available hotel categories var def
                $scope.availablehotelcategory = ['5*SUP', '5*', '4*SUP', '4*', '3*SUP', '3*', '2*', '1*', 'unclassified *'];
                    //{ category: '5*SUP', text: '5*SUP' },
                    //{ category: '5*', text: '5*' },
                    //{ category: '4*SUP', text: '4*SUP' },
                    //{ category: '4*', text: '4*' },
                    //{ category: '3*SUP', text: '3*SUP' },
                    //{ category: '3*', text: '3*' },
                    //{ category: '2*', text: '2*' },
                    //{ category: '1*', text: '1*' },
                    //{ category: 'unclassified *', text: 'unclassified *' }];
                $scope.currencies = null;
                $scope.releasedays = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 60, 90]; //(start in 3) for 45 days
                //Aux th
                function datestring(datest) {
                    var d = new Date(datest);
                    return d;
                };
                $scope.printDate = function (thedate, whois) {
                    thedate = thedate != null && thedate != '' ? datestring(thedate) : null;
                    var str = thedate != null ? [pad(thedate.getDate(), 2), pad(thedate.getMonth() + 1, 2), thedate.getFullYear()].join('/') : '';
                    return str;
                }

                $scope.printactivity = function (activity) {
                    var html = '';
                    if (activity) {
                        if (activity.ticketsincluded) {
                            html += 'tickets included - ';
                        }
                        if (activity.group) {
                            html += 'in a group - ';
                        }
                        if (activity.individual) {
                            html += 'individual - ';
                        }
                        if (activity.localguide) {
                            html += 'local guide in ' + activity.language;
                        }
                    }
                    return html;
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
                $scope.removeflights = function (select) {
                    if (select) {
                        for (var i = 0; i < $scope.dmcproduct.itinerary.length; i++) {
                            $scope.dmcproduct.itinerary[i].needflights = false;
                            $scope.dmcproduct.itinerary[i].flights = [];
                        }
                    };
                }
                $scope.onselecflights = function (val) {
                    console.log(val);
                    var selectedf = $scope.programs[$scope.selectedindexcategory].flights;
                    _.each($scope.programs, function (program) {
                        program.flights = selectedf;
                        if (program.itinerary != null && program.itinerary.length > 0) {
                            program.itinerary[0].flights == null || program.itinerary[0].flights.length == 0 ? program.itinerary[0].flights = [{ departure: '', arrival: '', recommendedflight: '' }] : null;
                            program.itinerary[0].flights[0] == null ? program.itinerary[0].flights[0] = { departure: '', arrival: '', recommendedflight: '' } : null;

                            program.itinerary[program.itinerary.length - 1].flights == null ? program.itinerary[program.itinerary.length - 1].flights = [{ departure: '', arrival: '', recommendedflight: '' }] : null;
                            program.itinerary[program.itinerary.length - 1].flights[0] == null ? program.itinerary[program.itinerary.length - 1].flights.push({ departure: '', arrival: '', recommendedflight: '' }) : null;
                        }
                    });

                }
                $scope.onselecflightsdmc = function (val) {
                    console.log(val);
                    var selectedf = $scope.programs[$scope.selectedindexcategory].flightsdmc;
                    _.each($scope.programs, function (program) {
                        program.flightsdmc = selectedf;
                        if (program.itinerary != null && program.itinerary.length > 0) {
                            program.itinerary[0].flights == null ? program.itinerary[0].flights = [{ departure: '', arrival: '', recommendedflight: '' }] : null;
                            program.itinerary[0].flights[0] == null ? program.itinerary[0].flights[0] = { departure: '', arrival: '', recommendedflight: '' } : null;

                            program.itinerary[program.itinerary.length - 1].flights == null ? program.itinerary[program.itinerary.length - 1].flights = [{ departure: '', arrival: '', recommendedflight: '' }] : null;
                            program.itinerary[program.itinerary.length - 1].flights[0] == null ? program.itinerary[program.itinerary.length - 1].flights[0] = { departure: '', arrival: '', recommendedflight: '' } : null;
                        }
                    });

                }
                $scope.loadflights = function (action, itinerary, program) {
                    if (action) {
                        itinerary.flights = [{ departure: '', arrival: '', recommendedflight: '' }];
                    } else {
                        itinerary.flights = [];
                    }
                    _.each($scope.programs, function (itprogram) {
                        if (itprogram._id != program._id) {
                            var dayindex = itinerary.daynumber - 1;
                            itprogram.itinerary[dayindex].needflights = action;
                            action ? itinerary.flights = [{ departure: '', arrival: '', recommendedflight: '' }] : itinerary.flights = [];
                        }
                    });
                }

                $scope.onSelectAirport = function ($item, $model, $label, itinerayObj, program, index, ondestination){
                  console.log($item,"-$item");
                  console.log( $model, "-$model");
                  console.log ('itinerayObj',itinerayObj);
                  console.log($label, "-$label");
                  console.log(program, "$program");
                  _.each($scope.programs, function (itprogram) {
                      if (program._id != itprogram._id) {

                          itprogram.itinerary[itinerayObj.daynumber - 1].flights == null || itprogram.itinerary[itinerayObj.daynumber - 1].flights.length == 0 ?
                              itprogram.itinerary[itinerayObj.daynumber - 1].flights = [{ departure: '', arrival: '', recommendedflight: '' }] : null;
                          itprogram.itinerary[itinerayObj.daynumber - 1].flights[index][ondestination] = getacopy($item);
                      }
                  });

               }

                $scope.deleteflights = function (index, itinerary, program) {
                    itinerary.flights.splice(index, 1);
                    _.each($scope.programs, function (itprogram) {
                        if (program._id != itprogram._id) {
                            itprogram.itinerary[itinerary.daynumber - 1].flights.splice(index, 1);
                        }
                    });
                }

                $scope.addflights = function (itinerary, program) {
                    itinerary.flights.push({ departure: '', arrival: '', recommendedflight: '' });
                    _.each($scope.programs, function (itprogram) {
                        if (program._id != itprogram._id) {
                            itprogram.itinerary[itinerary.daynumber - 1].flights == null ? itprogram.itinerary[itinerary.daynumber - 1].flights = [] : null;
                            itprogram.itinerary[itinerary.daynumber - 1].flights.push({ departure: '', arrival: '', recommendedflight: '' });
                        }
                    });
                }

                

                //img uploading
                $scope.uuids = [];

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
                $scope.buildid = function (prefix, idname) {
                    console.log(prefix);
                    console.log(idname);
                    if (idname == null || idname == '') {
                        idname = _generateUUID();
                    }

                    return prefix + idname.split('-').join('');
                }


                //end img uploading
                function _getCurrencies(callback) {
                    var rq = {
                        command: 'getdata',
                        service: 'api',
                        request: {
                            type: 'static',
                            name: 'currencys'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.currencies = rsp;
                        callback != null ? callback(rsp) : null;
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.error("error content currencies");
                        console.error(err);
                        errorcallback != null ? errorcallback(err) : null;
                    });

                    return rqCB;
                }
                $scope.cities = null;
                $scope.airports = null;
                
                function recoverCities(callback) {
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { country: { $ne: null } },
                            collectionname: 'DestinationCities',
                            fields: '_id label_en label_es countrycode slug country location.latitude location.longitude',
                            populate: [{ path: 'country', select: '_id label_en label_es slug location.latitude location.longitude' }],
                            sortcondition: { label_en: 1 }
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.cities = rsp;
                        callback != null ? callback(rsp) : null;
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.error("error content currencies");
                        console.error(err);
                        errorcallback != null ? errorcallback(err) : null;
                    });

                    return rqCB;
                }

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
                        console.error("error content airports");
                        console.error(err);
                        errorcallback != null ? errorcallback(err) : null;
                    });

                    return rqCB;
                }

                $scope.editionflow = {
                    admin: {

                    },
                    dmc: {

                    }
                }
                //edition flags
                $scope.actionliteral = null;
                $scope.currentaction = null;
                $scope.showcategoryselector = false;
                $scope.allinclusiveliteral = 'En Todo Incluido los servicios el dia de llegada y salida dependerán de las horas de check in y check out.';
                $scope.reset = function () {
                    $scope.programs = [];
                    $scope.dmc = null;
                    $scope.actionliteral = null;
                    $scope.currentaction = null;
                }
                //aux
                function labelairport(item) {
                    item != null && item.iata != null ? item.label = "(" + item.iata.toUpperCase() + ") " + item.city + " - " + item.name : null;
                    return item;
                }
                $scope.availablestates = ['unpublished', 'draft', 'under review', 'published', 'published.noavail'];
                $scope.selectedindexcategory = 0;
                $scope.copyprogramday = null;
                $scope.programs = [blankdata];
                $scope.copyprograms = [];
                $scope.copydaysprogramcode = { code: '', program: null };
                $scope.availableactions = ['newprogram', 'copyprogram', 'editprogram'];
                $scope.availableactionsliterals = {
                    newprogram: 'Loading a new program',
                    copyprogram: 'Copying a program',
                    editprogram: 'Editing a program'
                };
                $scope.selectedaction = null;
                $scope.$watch($scope.programs, function () {
                  
                    window.onbeforeunload = function (event) {
                        //controlo que no venga de un guardado
                        if (!$scope.programs) {

                            var message = 'If you leave you will lose your changes.\r\n' +
                                'Are you sure you want to quit?\r\n' +
                                'You can save your program as a draft at the end of the page, or at the next step button.';
                            if (typeof event == 'undefined') {
                                event = window.event;
                            }
                            if (event) {
                                event.returnValue = message;
                            }
                            return message;
                        }
                    }        	   

                });

                $scope.dateseed = new Date();
                //dmc
                $scope.validDMCs = [];
                $scope.dmc = loginsession.user.isDMC ? loginsession.dmc : null;
                $scope.dmcitemtemplateurl = '/js/angular/directives/views/programeditor-tabs/dmcitem.html?d=' + new Date();

                $scope.programtocopy = null;
                $scope.relatedprogramstocopy = null;
                $scope.dmcsearch = null;


                $scope.companynameaffiliate = function (affi, viewValue) {

                    return affi == viewValue;
                }
                $scope.$watch($scope.dmcsearch, function () {
                    console.log($scope.dmcsearch);
                });
                $scope.typeaheadDMCselect = function ($item, $model, $label) {
                    console.log($item);
                    console.log($model);
                    $scope.selectdmc($item);
                }

                $scope.typeaheadPROGRAMselect = function ($item, $model, $label) {
                    console.log($item);
                    console.log($model);
                    $scope.selectprogramforcopy($item);
                }

                $scope.selectdmc = function (dmc) {
                    $scope.dmc = dmc;
                    recoverprogramsfromdmc();
                    _.each($scope.programs, function (program) { program.dmc = dmc; });
                }

                $scope.findprogram = function (callback) {
                    tools_service.showPreloader($scope, 'show');
                    _findprogram($scope.copydaysprogramcode.code, function (program) {
                        $scope.copyprogramday = program;
                        tools_service.showPreloader($scope, 'hide');
                    });
                };

                function recoverquoteprogram() {
                    if ($scope.quote != null) {
                        var tab = null;
                        console.log('lets fetch the program from a quote', $scope.quote);
                        var code = $scope.quote.products != null ? $scope.quote.products.code : null;

                        code != null && code != '' ? $scope.selectprogramforedit(code, function (err, programs) {
                            console.log(err);
                            $scope.quote.products = programs[0];
                            $scope.currentaction = 'editprogram';
                            $scope.selectdmc($scope.dmc);
                            tab = $scope.tab.get('whattodo'); //lets go to the editor...
                            tab.next();
                            tools_service.showPreloader($scope, 'hide');
                        }) : (
                                $scope.quote.products = blankdata,
                                $scope.programs = [blankdata],
                                $scope.dmc = $scope.quote.dmc,
                                $scope.selectdmc($scope.dmc),
                                $scope.currentaction = 'editprogram', tab = $scope.tab.get('whattodo'), tab.next(), tools_service.showPreloader($scope, 'hide')
                                );
                    }
                }

                //BEGIN SAVE STUFF

                function pushcitiesandcountries(product) {
                    product.sleepcity = [];
                    product.sleepcountry = [];

                    product.departurecity = [];
                    product.departurecountry = [];

                    product.stopcities = [];
                    product.stopcountry = [];

                    _.each(product.itinerary, function (day) {
                        //sleep 
                        day.sleepcity != null && day.sleepcity.cityid != null ? product.sleepcity.push(day.sleepcity.cityid) : null;
                        day.sleepcity != null && day.sleepcity.countryid != null ? product.sleepcountry.push(day.sleepcity.countryid) : null;
                        //departure
                        day.departurecity != null && day.departurecity.cityid != null ? product.departurecity.push(day.departurecity.cityid) : null;
                        day.departurecity != null && day.departurecity.countryid != null ? product.departurecountry.push(day.departurecity.countryid) : null;
                        //stop
                        if (day.stopcities != null && day.stopcities.length > 0) {
                            _.each(day.stopcities, function (stp) {
                                stp != null && stp.cityid != null ? product.stopcities.push(stp.cityid) : null;
                                stp != null && stp.countryid != null ? product.stopcountry.push(stp.countryid) : null;
                            });
                        }
                    });

                    product.sleepcity = _.uniq(product.sleepcity);
                    product.departurecity = _.uniq(product.departurecity);
                    product.stopcities = _.uniq(product.stopcities);
                    product.sleepcountry = _.uniq(product.sleepcountry);
                    product.departurecountry = _.uniq(product.departurecountry);
                    product.stopcountry = _.uniq(product.stopcountry);
                    return product;
                }

                function _saveProgram(program, callback) {
                    var query = program._id != null && program._id != '' ? { _id: program._id } : null;
                    program.updatedOnUser = loginsession.user.email;
                    var rq = {
                        command: 'save',
                        service: 'api',
                        request: {
                            populate: [
                                { path: 'dmc', select: '_id code name company.name images updatedOn createdOn slug membership.pvp membership.b2bcommission currency' },
                                { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'stopcities' }, { path: 'departurecity' }],
                            collectionname: 'DMCProducts',
                            data: program
                        }
                    };

                    query != null ? rq.request.query = query : null;

                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rs) {
                        //rsp != null ? (delete rsp['_id'], delete rsp['code'], delete rsp['parent'], $scope.$broadcast('program.singlecopy.done', rsp)) : null;
                        console.log(rs);
                        program = rs;
                        callback != null ? callback(null, rs) : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback(err, null) : null;
                    });
                }
                $scope.savedasraft = function () {
                    $scope.save('draft', function (err, results) {
                        err != null ? Notification.error({ message: err, title: 'ERROR - Program Save' }) : Notification.success({ message: 'Program saved with publishState as DRAFT' });
                    });
                }
                $scope.savedraft = function () {
                    $scope.save('draft', function (err, results) {
                        err != null ? Notification.error({ message: err, title: 'ERROR - Program Save' }) : setTimeout(function () { location.href = "/admin/programs"; }, 1500);
                    });
                }

                $scope.save = function (pushthisstate, callback) {
                    pushthisstate = pushthisstate || 'under review';
                    _syncCategoriesPRESAVE();
                    var messages = [];
                    var errors = [];
                    var savechain = [];
                    tools_service.showPreloader($scope, 'show');
                    _.each($scope.programs, function (program) {
                        pushthisstate != null && pushthisstate != '' ? program.publishState = pushthisstate : null;
                        program.origin = $scope.quote != null ? 'tailormade' : null;
                        program = pushcitiesandcountries(program);
                        savechain.push(function (callback) {
                            _saveProgram(program, function (err, savedprogram) {
                                program = savedprogram != null ? savedprogram : program;
                                $scope.quote != null ? $scope.quote.products = program : null;
                                var catname = program.categoryname != null ? program.categoryname.label_es || program.categoryname.label_en : '';
                                err != null ? errors.push(err) : messages.push('Program ' + program.code + ' (' + catname + ') saved properly');
                                callback(err, program);                                
                            });
                        });
                    });

                    async.series(savechain, function (err, results) {
                        tools_service.showPreloader($scope, 'hide');
                        messages != null && messages.length > 0 ? Notification.success({ message: messages.join('<br />'), title: 'SUCCESS - Program Save' }) : null;
                        errors != null && errors.length > 0 ? Notification.error({ message: messages.join('<br />'), title: 'ERROR - Program Save' }) : null;
                        results != null && results.length > 0 ? $scope.programs = results : null;
                        callback != null ? callback(err, results) : null;
                        $scope.quote != null && $scope.quotesavecallback != null ? $scope.quotesavecallback($scope.quote) : null;
                    });
                }

                //END SAVE STUFF
                function _findprogram(prcode, callback) {
                    console.log($scope.copydaysprogramcode);
                    console.log(prcode);
                    var rq = {
                        command: 'findone',
                        service: 'api',
                        request: {
                            query: { code: prcode },
                            populate: [
                                { path: 'dmc', select: '_id code name company.name images updatedOn createdOn slug membership.pvp membership.b2bcommission currency' },
                                { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'stopcities' }, { path: 'departurecity' }],
                            collectionname: 'DMCProducts'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rs) {
                        //rsp != null ? (delete rsp['_id'], delete rsp['code'], delete rsp['parent'], $scope.$broadcast('program.singlecopy.done', rsp)) : null;
                        console.log(rs);
                        callback != null ? callback(rs) : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                }
                $scope.programsearch = null;
                $scope.selectprogramforcopy = function (program, callback) {
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { $or: [{ 'parent': program.code }, { 'code': program.code }] },
                            populate: [
                                { path: 'dmc', select: '_id code name company.name images updatedOn createdOn slug membership.pvp membership.b2bcommission currency' },
                                { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'stopcities' }, { path: 'departurecity' }],
                            collectionname: 'DMCProducts'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rs) {
                        //rsp != null ? (delete rsp['_id'], delete rsp['code'], delete rsp['parent'], $scope.$broadcast('program.singlecopy.done', rsp)) : null;
                        console.log(rs);
                        $scope.relatedprogramstocopy = rs;
                        $scope.programtocopy = _.find(rs, function (pr) { return program.code == pr.code; });
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                }

                $scope.selectprogramforedit = function (code, callback) {
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { $or: [{ 'parent': code }, { 'code': code }] },
                            populate: [
                                { path: 'dmc', select: '_id code name company.name images updatedOn createdOn slug membership.pvp membership.b2bcommission currency' },
                                { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'stopcities' }, { path: 'departurecity' }],
                            collectionname: 'DMCProducts'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rs) {
                        //rsp != null ? (delete rsp['_id'], delete rsp['code'], delete rsp['parent'], $scope.$broadcast('program.singlecopy.done', rsp)) : null;
                        console.log(rs);
                        $scope.programs = rs;
                        $scope.$broadcast('program.loaded');
                        $scope.dmc = rs != null && rs.length > 0 ? rs[0].dmc : null;
                        $scope.mapUpdate();
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback(null, rs) : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback(err, null) : null;
                    });
                }

                function recoverprogramsfromdmc(callback) {
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { $and: [{ dmc: { $in: [$scope.dmc._id] } }, { 'categoryname.categorybehaviour': { $ne: 'child' } }] },
                            sortcondition: { name: 1, title: 1 },
                            populate: [{ path: 'dmc', select: '_id code name company.name images updatedOn createdOn slug membership.pvp membership.b2bcommission currency' }],
                            fields: '_id code name title title_es name productimages publishState updatedOn slug slug_es itinerarylength pvp productimage dmc categoryname buildeditinerary.cities buildeditinerary.countriesfull_es',
                            collectionname: 'DMCProducts'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.copyprograms = _.map(rsp, function (pr) {
                            var country = pr.buildeditinerary != null && pr.buildeditinerary.countriesfull_es != null ? _.uniq(pr.buildeditinerary.countriesfull_es).join(',') : null;
                            var city = pr.buildeditinerary != null && pr.buildeditinerary.cities != null ? _.uniq(pr.buildeditinerary.cities).join(',') : null;
                            var name = pr.title_es || pr.title;
                            pr.finddestinationshortcut = ['(' + name + ' [' + pr.code + '])', [country, city].join(',')].join(' - ');
                            return pr;
                        });
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log(err);
                        tools_service.showPreloader($scope, 'hide');
                        callback != null ? callback() : null;
                    });
                }

                function recoverdmcs(callback) {
                    tools_service.showPreloader($scope, 'show');
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            query: { status: { $in: ['valid', 'confirmed'] } },
                            fields: '_id code name company currency membership user status additionalinfo images updatedOn createdOn slug',
                            collectionname: 'DMCs',
                            sortcondition: { 'company.name': 1 },
                            populate: [{ path: 'user' }]
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    // response OK
                    rqCB.on(rqCB.oncompleteeventkey, function (data) {

                        if (data != null && data != '') {
                            $scope.validDMCs = _.map(data, function (affi) {
                                affi.companyname = affi.company.name;
                                affi.opcountry = affi.company.operatein != null && affi.company.operatein.length > 0 ?
                                    _.reduce(affi.company.operatein, function (memo, op) { return _.uniq([memo, op.operateLocation.fulladdress]).join(',') }, '(' + affi.company.name + ')') : null;
                                return affi;
                            });
                            if (callback) {
                                callback(data);
                            }
                            tools_service.showPreloader($scope, 'hide');
                        } else {

                            tools_service.showPreloader($scope, 'hide');
                            tools_service.showFullError($scope, 'show', 'error', 'No Dmcs Related found.')
                        }
                    });

                    // response KO
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, 'hide');
                        tools_service.showConectionError($scope, 'show', 'en');
                        console.error('Error getting related DMCs : Details: ', err);
                    });
                }
                $scope.includedtoadd = null;
                $scope.tagoptions = [];
                $scope.publicTags = [];
                function getTripTags(callback, errorcallback) {
                    var rq = {
                        command: 'find',
                        service: 'api',
                        request: {
                            collectionname: 'TripTags',
                            query: { label: { $ne: null } },
                            sortcondition: { sortOrder: 1 },
                            fields: '_id label label_en slug state'
                        }
                    };
                    var rqCB = yto_api.send(rq);
                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        $scope.tagoptions = [];
                        _.each(rsp, function (tag) {
                            $scope.tagoptions.push(tag);
                            if (tag.state == 'published') {
                                $scope.publicTags.push(tag);
                            }
                        });
                        callback != null ? callback(rsp) : null;
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        console.log("error loading tripTags" + err);
                        errorcallback != null ? errorcallback(err) : null;
                    });

                    return rqCB;
                };

                $scope.getcategoryindex = function (catname) {
                    var idx;
                    _.find($scope.programs, function (program, voteIdx) {
                        if (program.categoryname != null && program.categoryname.label_es == catname) { idx = voteIdx; return true; };
                    });
                    return idx;
                }
                //images helper
                $scope.imageproductstretchcustom = function (url, size) {
                    if ("undefined" != typeof url) {
                        url != null && url.indexOf('assets/omtempty') >= 0 ? url = url.replace('assets/', '') : null;
                        var cl_transform = 'cs_no_cmyk/w_' + size + ',h_' + size + ',c_fill,g_face,q_90,f_auto/',
                            urlparts = url.split("/");
                        return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
                    }
                    return url;
                }
                $scope.imageproductstretch70 = function (url) {
                    if ("undefined" != typeof url) {
                        url != null && url.indexOf('assets/omtempty') >= 0 ? url = url.replace('assets/', '') : null;
                        var cl_transform = "cs_no_cmyk/w_70,h_70,c_fill,g_face,q_90,f_auto/",
                            urlparts = url.split("/");
                        return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
                    }
                    return url;
                }
                $scope.imageproductstretch = function (url) {
                    if ("undefined" != typeof url) {
                        url != null && url.indexOf('assets/omtempty') >= 0 ? url = url.replace('assets/', '') : null;
                        var cl_transform = "cs_no_cmyk/w_250,h_170,c_fill,g_face,q_90,f_auto/",
                            urlparts = url.split("/");
                        return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
                    }
                    return url;
                }
                $scope.getimage = function (url, imagename) {
                    return tools_service.cloudinaryUrl(url, imagename);
                }

                function lastavailday(program) {
                    var last = null;
                    var alldates = [];
                    if (program != null && program.availability != null) {
                        _.each(program.availability, function (avail) {
                            var year = avail.year;
                            var months = $scope.months_en;
                            _.each(months, function (month) {
                                var monthindex = months.indexOf(month);
                                var days = avail[month].availability;
                                days = _.filter(days, function (day) {
                                    day.cdate = new Date(year, monthindex, day.day, 0, 0, 0);
                                    return (day.available && day.rooms.double.price > 0);
                                });
                                alldates = _.union(alldates, days);
                            });
                        });
                        last = alldates != null && alldates.length > 0 ?
                            alldates.sort(function (a, b) { return b.cdate - a.cdate; })[0] : null;
                    }
                    return last;
                }

                $scope.calendartemplate = '/js/angular/directives/views/programeditor-tabs/program-price-calendar.html?d=' + new Date();
                $scope.pricepoptemplate = '/js/angular/directives/views/programeditor-tabs/program-price-modal.html?d=' + new Date();
                $scope.itinerarydaytemplateurl = '/js/angular/directives/views/programeditor-tabs/itinerarydays.html?d=' + new Date();

                $scope.dmcproduct = JSON.parse(JSON.stringify(blankdata));
                $scope.autolanguage = function () {
                    var lang_es = !$scope.programs[$scope.selectedindexcategory].languages.spanish ? 'EN' : 'ES';
                    var lang_en = !$scope.programs[$scope.selectedindexcategory].languages.english ? 'ES' : 'EN';
                    return lang_en || lang_es;
                }

                $scope.settabsvisible = function (tabnames, visibility) {
                    tabnames != null && tabnames.length > 0 ?
                        _.each(tabnames, function (tabname) { var findtab = _.find($scope.tabs, function (tab) { return tab.name == tabname; }); findtab != null ? findtab.visible = visibility : null; }) : null;
                }

                $scope.pushtabstate = function (nexttrigger, showtabs, hidetabs) {
                    showtabs != null && showtabs.length > 0 ? $scope.settabsvisible(showtabs, true) : null;
                    hidetabs != null && hidetabs.length > 0 ? $scope.settabsvisible(hidetabs, false) : null;
                    nexttrigger != '' ? $scope.tab.setTab(nexttrigger) : null;
                }

                $scope.processaction = function (actionname) {
                    $scope.currentaction = actionname;
                    var tab = $scope.tab.get('whattodo');
                    tab.next();
                }

                function getacopy(obj) {
                    var copy = (obj != null) ? JSON.parse(JSON.stringify(obj)) : null;
                    return copy;
                }
                $scope.selectedindexcategoryPREV = 0;

                $scope.changecategory = function() {
                    console.log('sync categories...', $scope.selectedindexcategory);
                    console.log('from ', $scope.selectedindexcategoryPREV);
                    _syncCategories();
                    $scope.selectedindexcategoryPREV = getacopy($scope.selectedindexcategory);
                }

                var syncfields = ['included', 'title', 'title_es', 'languages', 'updatedOnUser', 'dmccode', 'description_en', 'description_es', 'important_txt_en',
                    'important_txt_es', 'productimage', 'location', 'origin', 'flightsdmc', 'flights', 'includedtags', 'notincludedtags', 'tags', 'vouchernotes'];

                $scope.compareTag = function (obj1, obj2) {
                    return obj1.slug == obj2.slug;
                }

                function _uniqtags(program) {
                    var uniqtags = _.uniq(program.tags, function (tag) { return tag.slug; });
                    program.tags = JSON.parse(JSON.stringify(uniqtags));
                }

                function _syncCategoriesPRESAVE() {
                    var master = getacopy($scope.programs[$scope.selectedindexcategory]);
                    var parentcode = $scope.programs[0].code; //The first on the list
                    _.each($scope.programs, function (program) {
                        //if (program._id != master._id) {
                        if (program.code != parentcode) {
                            program.parent != null && program.parent != '' ? console.log('category parent ok') : program.parent = parentcode;
                        } 
                        _.each(syncfields, function (field) {
                            program[field] = getacopy(master[field]);
                        });
                        console.log(program.code + ' program category syncronized from ' + master.code);
                    });
                }

                function _syncCategories() {
                    if ($scope.selectedindexcategory >= 0) {
                        var master = getacopy($scope.programs[$scope.selectedindexcategoryPREV]);
                        var keep = master.pvp != null ? master.pvp.keep : false;
                        _.each($scope.programs, function (program) {
                            //if (program._id != master._id) {
                                _.each(syncfields, function (field) {
                                    program[field] = getacopy(master[field]);
                                    program['pvp']['keep'] = keep;
                                });
                                console.log(program.code + ' program category syncronized from ' + master.code);
                            //}
                            //var itinerary = getacopy(program.itinerary);
                            //var aval = getacopy(program.availability);
                            //var parent = program.parent;
                            //var category = getacopy(program.categoryname);
                            //var minprice = getacopy(program.minprice);
                            //var pvp = getacopy(program.pvp);
                            //var state = program.publishState;


                        });
                    }
                }

                $scope.tabs = [
                    {
                        name: 'whattodo',
                        title: 'Create or copy a program',
                        title_en: 'Create or copy a program',
                        labeldmc: 'Operation',
                        labeladmin: 'Operation',
                        icon: 'fa fa-check-circle',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/whattodo.html?d=' + new Date(),
                        nexttrigger: function () {
                            return $scope.rolename == 'admin' ?
                                'dmcselection' : $scope.currentaction != null && $scope.currentaction == 'copyprogram' ? 'programcopyselection' : 'titleanddescription';
                        },
                        next: function () {
                            var _this = this;
                            $scope.currentaction != null && $scope.currentaction != '' ? null : null;
                            var nexttab = $scope.rolename == 'admin' ? 'dmcselection' : 'titleanddescription';
                            var showtabs = [];
                            var hidetabs = ['programcategories', 'titleanddescription', 'programdates', 'programincludes', 'programitinerary', 'adminfeatures', 'preview'];
                            $scope.rolename == 'admin' ? showtabs = ['dmcselection'] : showtabs = ['titleanddescription'];

                            $scope.currentaction == 'copyprogram' ? showtabs = ['programcopyselection'] : null;
                            $scope.currentaction == 'editprogram' ? showtabs = ['programcategories', 'titleanddescription', 'programdates', 'programincludes', 'programitinerary', 'preview'] : null;
                            $scope.currentaction == 'editprogram' && $scope.quote != null ? showtabs = ['titleanddescription', 'programincludes', 'programitinerary', 'preview'] : null;
                            $scope.currentaction == 'editprogram' ? (hidetabs = ['programcopyselection'], nexttab = 'titleanddescription') : null;
                            $scope.currentaction == 'editprogram' && $scope.rolename == 'admin' ? showtabs.push('adminfeatures') : null;
                            $scope.currentaction != 'editprogram' ? $scope.programs = [blankdata] : null;
                            var validation = _this.validatetrigger();
                            validation.continue ? $scope.pushtabstate(nexttab, showtabs, hidetabs) : Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: true,
                        nextisvisible: false,
                        laterisvisible: false,
                        validatetrigger: function () {
                            return { continue: true };
                        }
                    },
                    {
                        name: 'dmcselection',
                        title: 'DMC selection',
                        labeldmc: 'DMC',
                        labeladmin: 'DMC',
                        icon: 'fa fa-user',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/dmcselection.html?d=' + new Date(),
                        nexttrigger: function () { return $scope.currentaction == 'copyprogram' ? 'programcopyselection' : 'titleanddescription'; },
                        next: function () {
                            var _this = this;
                            var showtabs = [];
                            var hidetabs = ['titleanddescription', 'programcategories', 'programdates', 'programincludes', 'programitinerary', 'adminfeatures', 'preview'];

                            $scope.currentaction == 'copyprogram' ? showtabs = ['programcopyselection'] : showtabs = ['titleanddescription'], hidetabs.splice(0, 1);
                            $scope.rolename == 'admin' ? (showtabs.push('adminfeatures'), hidetabs.splice(hidetabs.indexOf('adminfeatures'), 1)) : null;
                            $scope.showcategoryselector = true;
                            var nexttab = this.nexttrigger();
                            var validation = _this.validatetrigger();
                            validation.continue ? $scope.pushtabstate(nexttab, showtabs, hidetabs) : Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: $scope.rolename == 'admin',
                        nextisvisible: true,
                        laterisvisible: false,
                        validatetrigger: function () {
                            var rs = $scope.dmc == null ? { error: 'Please select a valid DMC first', continue: false } : { error: null, continue: true };
                            return rs;
                        }
                    },
                    {
                        name: 'programcopyselection',
                        title: 'Choose the program to be copied',
                        icon: 'fa fa-copy',
                        labeldmc: 'Copy',
                        labeladmin: 'Copy',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/programcopyselection.html?d=' + new Date(),
                        nexttrigger: function () { return 'titleanddescription' },
                        next: function () {
                            var _this = this;
                            var showtabs = ['titleanddescription'];
                            var hidetabs = ['adminfeatures', 'programcategories', 'programdates', 'programincludes', 'programitinerary', 'preview'];
                            var nexttab = this.nexttrigger();
                            //$scope.currentaction == 'copyprogram' ?
                            //    showtabs = ['programcategories', 'titleanddescription', 'programdates', 'programincludes', 'programitinerary', 'preview'] :
                            //    showtabs = ['titleanddescription'];
                            $scope.rolename == 'admin' ? (showtabs.push('adminfeatures'), hidetabs.splice(0, 1)) : null;

                            if ($scope.programtocopy != null) {
                                //$scope.programtocopy = _.find($scope.relatedprogramstocopy, function (pr) { return program.code == pr.code; });
                                //make a copy of the programs...
                                $scope.programs = [JSON.parse(JSON.stringify($scope.programtocopy))];
                                $scope.$broadcast('program.loaded');
                                $scope.quote == null ? _.each($scope.relatedprogramstocopy, function (pr) {
                                    if (pr.code != $scope.programtocopy.code) { $scope.programs.push(JSON.parse(JSON.stringify(pr))); }
                                }) : null; //only copy categories
                                var deletefields = ['_id', 'code', 'prices', 'parent', 'createdOn', 'updatedOn', '__v', 'slug', 'slug_es'];
                                _.each($scope.programs, function (prcopied) {
                                    _.each(deletefields, function (field) { delete prcopied[field]; });
                                    prcopied.availability = JSON.parse(JSON.stringify(blankdata.availability));
                                    prcopied.pvp = prcopied.minprice = null;
                                    prcopied.availabilitytill = null;
                                    prcopied.publishState = 'draft';
                                });
                                $scope.mapUpdate();
                                $scope.quote != null ? null : $scope.showcategoryselector = true;
                            }
                            var validation = _this.validatetrigger();
                            validation.continue ? $scope.pushtabstate(nexttab, showtabs, hidetabs) : Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: false,
                        nextisvisible: true,
                        laterisvisible: false,
                        validatetrigger: function () {
                            var rs = $scope.programtocopy == null ? { error: 'Please select a program to copy first', continue: false } : { error: null, continue: true };
                            return rs;
                        }
                    },
                    {
                        name: 'titleanddescription',
                        title: 'Provide a short, clear title. Provide a brief summary and save with your own code',
                        labeldmc: 'Description',
                        labeladmin: 'Description',
                        icon: 'fa fa-pencil',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/titleanddescription.html?d=' + new Date(),
                        nexttrigger: function () { var nexttab = $scope.quote == null ? 'programdates' : 'programincludes'; return nexttab; },
                        next: function () {
                            var _this = this;
                            var showtabs = ['preview'];
                            var hidetabs = null;

                            var nexttab = this.nexttrigger();
                            showtabs.push(nexttab);
                            var validation = _this.validatetrigger();
                            validation.continue ?
                                $scope.save('under review', function (err, results) { $scope.pushtabstate(nexttab, showtabs, null); }) :
                                Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: false,
                        nexttext: 'save & continue',
                        nextisvisible: true,
                        laterisvisible: true,
                        validatetrigger: function () {
                            var errors = [];
                            ($scope.programs[$scope.selectedindexcategory].title == null || $scope.programs[$scope.selectedindexcategory].title == '') &&
                                $scope.programs[$scope.selectedindexcategory].languages.english ? errors.push('A title(english) is needed') : null;
                            ($scope.programs[$scope.selectedindexcategory].title_es == '' || $scope.programs[$scope.selectedindexcategory].title_es == '') &&
                                $scope.programs[$scope.selectedindexcategory].languages.spanish ? errors.push('A title(spanish) is needed') : null;
                            ($scope.programs[$scope.selectedindexcategory].description_en == null || $scope.programs[$scope.selectedindexcategory].description_en == '') &&
                                $scope.programs[$scope.selectedindexcategory].languages.english ? errors.push('A brief description (english) is needed') : null;
                            ($scope.programs[$scope.selectedindexcategory].description_es == null || $scope.programs[$scope.selectedindexcategory].description_es == '') &&
                                $scope.programs[$scope.selectedindexcategory].languages.spanish ? errors.push('A brief description (spanish) is needed') : null;

                            var rs = errors.length > 0 ? { error: errors.join('<br />'), continue: false } : { error: null, continue: true };
                            return rs;
                        }
                    },
                    {
                        name: 'programdates',
                        title: 'Tour availability dates, Prices & Release',
                        labeldmc: 'Prices/Availability',
                        labeladmin: 'Prices/Availability',
                        icon: 'fa fa-calendar',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/programdates.html?d=' + new Date(),
                        nexttrigger: function () { return 'programincludes' },
                        next: function () {
                            var _this = this;
                            var showtabs = [];
                            var hidetabs = null;

                            var nexttab = this.nexttrigger();
                            showtabs.push(nexttab);
                            var validation = _this.validatetrigger();
                            validation.continue ?
                                $scope.save('under review', function (err, results) { $scope.pushtabstate(nexttab, showtabs, null) }) :
                                Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                            validation.continue && validation.warning != null && validation.warning != '' ?
                                Notification.warning({ message: validation.warning, title: 'Warning messages for dates' }) : null; 
                        },
                        visible: false,
                        nexttext: 'save & continue',
                        nextisvisible: true,
                        laterisvisible: true,
                        validatetrigger: function () {
                            var errors = [];
                            _.each($scope.programs, function (program) {
                                var lsAv = lastavailday(program);
                                var justnow = new Date();
                                var catname = program.categoryname != null ? program.categoryname.label_es || program.categoryname.label_en : '';
                                lsAv == null ? errors.push('Program ' + program.code + ' (' + catname + '): There is no availability set for this program') : null;
                                lsAv != null && lsAv <= justnow ? errors.push('Program ' + program.code + ' (' + catname + '): The last available day is: ' + lsAv) : null;
                            });

                            var rs = errors.length > 0 ? { warning: errors.join('<br />'), error: null, continue: true } : { warning: null, error: null, continue: true };
                            return rs;
                        }
                    },
                    {
                        name: 'programincludes',
                        title: 'Inclusions/Exclusions',
                        icon: 'fa fa-check',
                        labeldmc: 'Inclusions/Exclusions',
                        labeladmin: 'Inclusions/Exclusions',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/programincludes.html?d=' + new Date(),
                        nexttrigger: function () { return 'programitinerary' },
                        next: function () {
                            var _this = this;
                            var showtabs = [];
                            var hidetabs = null;

                            var nexttab = this.nexttrigger();
                            showtabs.push(nexttab);
                            var validation = _this.validatetrigger();
                            validation.continue ?
                                $scope.save('under review', function (err, results) { $scope.pushtabstate(nexttab, showtabs, null) }) :
                                Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: false,
                        nexttext: 'save & continue',
                        nextisvisible: true,
                        laterisvisible: true,
                        validatetrigger: function () {
                            var errors = [];
                            _.each($scope.programs, function (program) {
                                var catname = program.categoryname != null ? program.categoryname.label_es || program.categoryname.label_en : '';
                                program.included.trip.minpaxoperate == null ? errors.push('Program ' + program.code + ' (' + catname + '): Min pax operation not assigned') : null;
                                program.included.trip.minpaxoperate < 0 ? errors.push('Program ' + program.code + ' (' + catname + '): Check and select the min pax operation') : null;
                            });
                            var rs = errors.length > 0 ? { error: errors.join('<br />'), continue: false } : { error: null, continue: true };
                            return rs;
                        }
                    },
                    {
                        name: 'programitinerary',
                        title: 'Day by day itinerary',
                        labeldmc: 'Itinerary',
                        labeladmin: 'Itinerary',
                        icon: 'fa fa-map-marker',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/programitinerary.html?d=' + new Date(),
                        nexttrigger: function () {
                            var nexttab = $scope.quote == null ? 'programcategories' : '';
                            nexttab = $scope.rolename == 'admin' && $scope.quote != null ? 'adminfeatures' : nexttab;
                            return nexttab;
                        },
                        next: function () {
                            var _this = this;
                            var showtabs = [];
                            var hidetabs = null;

                            var nexttab = this.nexttrigger();
                            showtabs.push(nexttab);
                            var validation = _this.validatetrigger();
                            validation.continue ?
                                $scope.save('under review', function (err, results) {
                                    nexttab != '' && validation.continue ? $scope.pushtabstate(nexttab, showtabs, null) : null;
                                }) :
                                Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: false,
                        nexttext: 'save & continue',
                        nextisvisible: true,
                        laterisvisible: true,
                        validatetrigger: function () {
                            var errors = [];
                            _.each($scope.programs, function (program) {
                                program.itinerary != null && program.itinerary.length > 0 ?
                                    _.each(program.itinerary, function (day, index) {
                                        var catname = program.categoryname != null ? program.categoryname.label_es || program.categoryname.label_en : '';
                                        var last = (index + 1) == program.itinerary.length ? true : false;
                                        var valid = false;
                                        valid = day.sleepcity != null && day.sleepcity.city != '';
                                        last || valid ? null : errors.push('Program ' + program.code + ' (' + catname + '): Day ' + day.daynumber + ' does not have assigned any sleep city');
                                        valid = day.hotel.category != '';
                                        last || valid ? null : errors.push('Program ' + program.code + ' (' + catname + '): Day ' + day.daynumber + ' does not have hotel category assigned');
                                    }) :
                                    errors.push('Program ' + program.code + ': The itinerary days are empty');
                            });
                            var rs = errors.length > 0 ? { error: errors.join('<br />'), continue: false } : { error: null, continue: true };
                            return rs;
                        },
                    },
                    {
                        name: 'programcategories',
                        title: 'Do you sell different versions of this product with versions varying hotel categories, meal basis, activities…?',
                        labeldmc: 'Categories',
                        labeladmin: 'Categories',
                        icon: 'fa fa-bed',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/programcategories.html?d=' + new Date(),
                        nexttrigger: function () { var nexttab = $scope.rolename == 'admin' ? 'adminfeatures' : ''; return nexttab; },
                        next: function () {
                            var _this = this;
                            var showtabs = [];
                            var hidetabs = null;

                            var nexttab = this.nexttrigger();
                            showtabs.push(nexttab);
                            var validation = _this.validatetrigger();
                            validation.continue ?
                                $scope.save('under review', function (err, results) {
                                    nexttab != '' ? $scope.pushtabstate(nexttab, showtabs, null) : null;
                                }) :
                                Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: false,
                        nexttext: 'save',
                        nextisvisible: true,
                        laterisvisible: true,
                        validatetrigger: function () {
                            var errors = [];
                            if ($scope.programs.length > 1) {
                                _.each($scope.programs, function (program) {
                                    program.categoryname.label_en == null || program.categoryname.label_en == '' ? errors.push('Program ' + program.code + ': A category name(english) is needed, review categories names') : null;
                                    program.categoryname.label_es == null || program.categoryname.label_es == '' ? errors.push('Program ' + program.code + ': A category name(spanish) is needed, review categories names') : null;
                                });
                            }

                            var rs = errors.length > 0 ? { error: errors.join('<br />'), continue: false } : { error: null, continue: true };
                            return rs;
                        }
                    },
                    {
                        name: 'adminfeatures',
                        title: 'Admin (Traveler Sense) Management',
                        labeldmc: 'Admin YTO',
                        labeladmin: 'Admin YTO',
                        icon: 'fa fa-key',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/adminfeatures.html?d=' + new Date(),
                        nexttrigger: function () { return '' },
                        next: function () {
                            $scope.save('published', function (err, results) {
                                nexttab != '' && validation.continue ? $scope.pushtabstate(nexttab, showtabs, null) : null;
                            });
                            //Notification.error({ message: validation.error, title: 'Check step errors before continue' });
                        },
                        visible: false,
                        nexttext: 'save & publish',
                        nextisvisible: true,
                        laterisvisible: false,
                        validatetrigger: function () {

                        }
                    },
                    {
                        name: 'preview',
                        title: 'Preview',
                        labeldmc: 'Preview',
                        labeladmin: 'Preview',
                        icon: 'fa fa-eye',
                        templateurl: '/js/angular/directives/views/programeditor-tabs/empty.html?d=' + new Date(),
                        nexttrigger: function () { return '' },
                        visible: false,
                        nexttext: '',
                        nextisvisible: true,
                        laterisvisible: false,
                        validatetrigger: function () { }
                    }
                ];

                //category manager
                $scope.getbaseitinerary = function () {
                    var itinerary = JSON.parse(JSON.stringify($scope.programs[0].itinerary));
                    _.each(itinerary, function (day) {
                        delete day['_id'];
                        delete day['id']
                        day.hotel = {
                            name: '',
                            category: '',
                            insurroundings: false,
                            meals: false,
                            breakfast: false,
                            lunch: false,
                            lunchdrinks: false,
                            dinner: false,
                            dinnerdrinks: false
                        };
                    });
                    return itinerary;
                }

                function preparenewcategory(fromprogram) {
                    $scope.programs[$scope.programs.length - 1].code = null;
                    $scope.programs[$scope.programs.length - 1].parent = fromprogram.parent || $scope.programs[0].code;
                    $scope.programs[$scope.programs.length - 1].availability = JSON.parse(JSON.stringify(blankdata.availability));
                    $scope.programs[$scope.programs.length - 1].availabilitytill = null;
                    $scope.programs[$scope.programs.length - 1].pvp = $scope.programs.minprice = null;
                    delete $scope.programs[$scope.programs.length - 1].slug;
                    delete $scope.programs[$scope.programs.length - 1].slug_es;
                    delete $scope.programs[$scope.programs.length - 1].__v;
                    delete $scope.programs[$scope.programs.length - 1]._id;

                    $scope.programs[$scope.programs.length - 1].itinerary = $scope.getbaseitinerary();
                    //select features for copy
                    $scope.categorycopy.copyactivities ?
                        'already copied...' :
                        _.each($scope.programs[$scope.programs.length - 1].itinerary, function (day) { day.activities = []; });
                    $scope.categorycopy.copyhotels ?
                        _.each(fromprogram.itinerary, function (day, index) {
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.name = day.hotel.name;
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.category = day.hotel.category;
                        }) :
                        'nothing to do';
                    $scope.categorycopy.copymeals ?
                        _.each(fromprogram.itinerary, function (day, index) {
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.meals = day.hotel.meals;
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.breakfast = day.hotel.breakfast;
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.lunch = day.hotel.lunch;
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.lunchdrinks = day.hotel.lunchdrinks;
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.dinner = day.hotel.dinner;
                            $scope.programs[$scope.programs.length - 1].itinerary[index].hotel.dinnerdrinks = day.hotel.dinnerdrinks;
                        }) :
                        'nothing to do';
                }

                $scope.categorycopy = { copyactivities: false, copyhotels: false, copymeals: false };
                $scope.addcategory = function () {
                    $scope.programs.push(JSON.parse(JSON.stringify($scope.programs[0])));
                    $scope.programs[$scope.programs.length - 1].itinerary = $scope.getbaseitinerary();
                    preparenewcategory();
                }

                $scope.categorycopycount = 0;

                $scope.copycategory = function (program) {
                    $scope.categorycopycount == 0 ? $scope.categorycopycount = $scope.programs.length : null;
                    $scope.programs.push(JSON.parse(JSON.stringify(program)));
                    $scope.categorycopycount++;
                    var sufix = $scope.categorycopycount.toString();

                    $scope.programs[$scope.programs.length - 1].categoryname.label_en = 'Copy of ' + program.categoryname.label_en + '_' + sufix;
                    $scope.programs[$scope.programs.length - 1].categoryname.label_es = 'Copy of ' + program.categoryname.label_es + '_' + sufix;
                    preparenewcategory(program);
                }

                $scope.copydayinfotocategories = function (day, program) {
                    day != null ?
                        _.each($scope.programs, function (itprogram) {
                            var indexday = day.daynumber - 1;
                            if (itprogram._id != program._id) {
                                itprogram.itinerary[indexday].description_en = day.description_en;
                                itprogram.itinerary[indexday].description_es = day.description_es;
                                itprogram.itinerary[indexday].image = day.image;
                            }
                        }) :
                        _.each($scope.programs, function (itprogram) {
                            if (itprogram._id != program._id) {
                                _.each(program.itinerary, function (itday) {
                                    var indexday = itday.daynumber - 1;
                                    itprogram.itinerary[indexday].description_en = itday.description_en;
                                    itprogram.itinerary[indexday].description_es = itday.description_es;
                                    itprogram.itinerary[indexday].image = itday.image;
                                });
                            }
                        });

                    Notification.success({
                        message: 'Information successful copied', title: 'Categories information transfer'
                    });
                }

                $scope.removeprogram = function (program) {
                    var req = {
                        query: { _id: program._id },
                        collection: 'DMCProducts',
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
                        tools_service.showPreloader($scope, "hide");
                        Notification.success({
                            message: 'Se ha eliminado correctamente ' + program.title_es + '(' + program.code + ')', title: 'Successful deletion'
                        });
                        callback != null ? callback(null, rsp) : null;
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, "hide");
                        console.error(err);
                        Notification.error({
                            message: err, title: 'Error al eliminar'
                        });
                        callback != null ? callback(err, null) : null;

                    });

                }

                
                $scope.removecategory = function (program, index) {
                    $scope.programs = _.filter($scope.programs, function (listprogram) { return JSON.stringify(program) != JSON.stringify(listprogram); });
                    program._id != null && program._id != '' ? $scope.removeprogram(program) : 'this program dont have any id';
                }

                function _getMarkers(itinerary) {
                    return productpreviewhelpers.getMarkers(itinerary);
                }
                $scope.markers = [];
                //itinerary control
                $scope.mapUpdate = function () {
                    var idmap = 'map';
                    if ($scope.programs.length > 0 && $scope.programs[0] != null && $scope.programs[0].itinerary != null) {
                        $scope.markers = _getMarkers($scope.programs[0].itinerary);
                    }
                    initMap($scope.markers, idmap);
                };

                $scope.showCities = function (itinerary, index, itinerarylist) {
                    var html = '';
                    var cities = [];
                    var arestops = false;
                    if (itinerary != null) {
                        if (index > 0) {
                            var c = itinerarylist[index - 1] != null && itinerarylist[index - 1].sleepcity != null ? itinerarylist[index - 1].sleepcity.city : null;
                            c!= null ? cities.push(c): null;
                        }
                        if (itinerary.stopcities != null && itinerary.stopcities.length > 0) {
                            arestops = true;
                            for (var j = 0; j < itinerary.stopcities.length; j++) {
                                var cit = itinerary.stopcities[j];
                                var c = cit.city;
                                if (cities.indexOf(c) == -1) {
                                    cities.push(c);
                                }
                            }
                        }
                        if (itinerary.sleepcity != null && itinerary.sleepcity.city != '') {
                            var c = itinerary.sleepcity.city;
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
                $scope.selecteditineraryday = null;
                $scope.test = function (index, item, external, type) {
                    console.log('the test callback');
                    console.log(index);
                    console.log(event);
                    console.log(external);
                    console.log(item);
                    console.log(type);
                }
                $scope.ItinerarydragoverCallback = function (index, external, type) {

                }

                $scope.deletemoved = function (index, program) {
                    console.log('moved...', index);
                    program.itinerary.splice(index, 1);
                    var currentprogam = program._id;
                    _.each($scope.programs, function (program) {
                        if (program._id != currentprogam) {
                            program.itinerary.splice(index, 1);
                        }
                        _itineraryautovalues(program.itinerary);
                    });
                }

                $scope.ItinerarydropCallback = function (index, item, external, type) {
                    console.log('item droped: ', item);
                    $scope.ItinerarylogListEvent('dropped at', index, external, type);
                    var currentprogam = $scope.programs[$scope.selectedindexcategory]._id;
                    _.each($scope.programs, function (program) {
                        if (program._id != currentprogam) {
                            var findedday = type != 'copyfromanotherprogram' ? _.find(program.itinerary, function (day) { return day.daynumber == item.daynumber; }) : item;
                            program.itinerary.splice(index, 0, JSON.parse(JSON.stringify(findedday)));
                        }
                        _itineraryautovalues(program.itinerary);
                    });

                    // Return false here to cancel drop. Return true if you insert the item yourself.
                    return item;
                };
                $scope.ItinerarylogListEvent = function (action, index, external, type) {
                    var message = external ? 'External ' : '';
                    message += type + ' element was ' + action + ' position ' + index;
                    console.log(message);
                };
                
                $scope.removeTag = function (index) {
                    $scope.dmcproduct.tags.splice(index, 1);
                };
            
                $scope.tagtoadd = '';

                $scope.addTag = function () {
                    if (!_findTag($scope.tagtoadd)) {
                        _.each($scope.programs, function (program) {
                            program.tags.push($scope.tagtoadd);
                        });
                    }
                    $scope.tagtoadd = '';
                };

                function _findTag(tag) {
                    var finded = false;
                    var results = $scope.programs[$scope.selectedindexcategory].tags.filter(function (entry) { return entry.label_en === tag.label_en; });
                    if (results.length > 0) {
                        finded = true;
                    }
                    return finded;
                };

                $scope.daybydayedit = true;

                $scope.selectday = function (index, day) {
                    console.log(index);
                    console.log(day);
                    $scope.selecteditineraryday = index;
                    $scope.daybydayedit = true;
                }

                function parseCity(thecity) {
                    console.log(thecity);
                    var countrystr = thecity.country != null ? thecity.country.label_es || thecity.country.label_en : null;
                    var slg = thecity.country != null ? thecity.country.slug : null;
                    var city = {
                        city: thecity.label_es || thecity.label_en,
                        cityid: thecity._id,
                        country: countrystr,
                        countrycode: slg,
                        countryid: thecity.country._id,
                        fulladdress: thecity.label_es + ', ' + countrystr,
                        latitude: thecity.location.latitude,
                        longitude: thecity.location.longitude
                    };
                    return city;
                }

                function resetautocomplete() {
                    angular.element(document.querySelector('.select-city')).val('');
                }

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

                function setitinerarydestinations(fromprogram) {
                    _.each($scope.programs, function (program) {
                        if (program._id != fromprogram._id) {
                            _.each(fromprogram.itinerary, function (day, index) {
                                program.itinerary[index].sleepcity = JSON.parse(JSON.stringify(day.sleepcity));
                                program.itinerary[index].stopcities = JSON.parse(JSON.stringify(day.stopcities));
                                program.itinerary[index].departurecity = JSON.parse(JSON.stringify(day.departurecity));
                                _itineraryautovalues(program.itinerary);
                            });
                        }
                    });
                }

                $scope.addsleeptoitinerary = function (day, thecity, index, fromprogram) {
                    fromprogram = fromprogram || $scope.programs[$scope.selectedindexcategory];
                    var location = parseCity(thecity);

                    var cityid = thecity._id;
                    var countryid = thecity.country._id;

                    //location = _parseGmapsResult(thecity);
                    var city = {
                        city: location.city,
                        citybehaviour: 'sleep',
                        order: 0,
                        cityid: cityid,
                        countryid: countryid,
                        country: location.country,
                        location: location,
                    }
                    day.sleepcity = city;
                    _itineraryautovalues(fromprogram.itinerary);
                    setitinerarydestinations(fromprogram);
                    resetautocomplete();
                    $scope.mapUpdate();

                }

                /**
                 * anade una ciudad al stop city
                 */
                $scope.addcitytoitinerary = function (day, thecity, index, fromprogram) {
                    var location = parseCity(thecity);
                    fromprogram = fromprogram || $scope.programs[$scope.selectedindexcategory];
                    var cityid = thecity._id;
                    var countryid = thecity.country._id;

                    //location = _parseGmapsResult(thecity);

                    var city = {
                        city: location.city,
                        citybehaviour: 'stop',
                        order: day.stopcities.length + 1,
                        country: location.country,
                        cityid: cityid,
                        countryid: countryid,
                        location: location,
                    }

                    day.stopcities.push(city);
                    _itineraryautovalues(fromprogram.itinerary);
                    setitinerarydestinations(fromprogram);
                    resetautocomplete();
                    $scope.mapUpdate();
                }

                $scope.removesleepcitytoitinerary = function (day, itinerary, fromprogram) {
                    fromprogram = fromprogram || $scope.programs[$scope.selectedindexcategory];
                    day.sleepcity = null;
                    _itineraryautovalues(itinerary);
                    setitinerarydestinations(fromprogram);
                    $scope.mapUpdate();
                }
                $scope.removestopcitytoitinerary = function (day, city, itinerary, fromprogram) {
                    fromprogram = fromprogram || $scope.programs[$scope.selectedindexcategory];
                    day.stopcities = _.filter(day.stopcities, function (st) { return JSON.stringify(city) != JSON.stringify(st); });
                    _itineraryautovalues(itinerary);
                    setitinerarydestinations(fromprogram);
                    $scope.mapUpdate();
                }

                function _itineraryautovalues(itinerary) {
                    var lastnight = null;
                    itinerary != null && itinerary.length > 0 ? _.each(itinerary, function (day, dayindex) {
                        day.daynumber = dayindex + 1;
                        day.departurecity = lastnight;
                        lastnight = JSON.parse(JSON.stringify(day.sleepcity));
                        day.lastday = dayindex == itinerary.length;
                        day.isnotlastday = !day.lastday;
                    }) : null;
                }

                function _additineraryday(program) {

                    var itineraryday = {
                        isnotlastday: false,
                        lastday: true,
                        name: new Date().getDay() + new Date().getMonth(),
                        daynumber: program.itinerary != null ? program.itinerary.length + 1 : 1,
                        date: new Date(),
                        image: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1432562858/omtempty.png' },
                        imageprogress: false,
                        showimage: false,
                        departurecity: {
                            city: '',
                            citybehaviour: 'departure',
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
                            citybehaviour: 'sleep',
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
                            selectedcategory: { category: '5*', text: '5*' }
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
                    _.each($scope.programs, function (program) {
                        program.itinerary.push(JSON.parse(JSON.stringify(itineraryday)));
                        _itineraryautovalues(program.itinerary);
                    });
                    console.log("itienrario auxiliar creado: ", itineraryday);
                    return itineraryday;
                }

                $scope.additineraryday = function () {
                    _additineraryday($scope.programs[$scope.selectedindexcategory]);
                }
                $scope.itinerarylogEvent = function (text) {
                    console.log(text);
                }
                var rawjsoncontainerelement = null;
                $scope.reloadjson = function () {
                    jsoneditor.set($scope.programs[$scope.selectedindexcategory]);
                }
                $scope.savejson = function () {
                    $scope.programs[$scope.selectedindexcategory] = jsoneditor.get();
                }
                $scope.tab = {
                    progress: _.pluck($scope.tabs, 'name'),
                    controlprogress: [],
                    activeTab: 'whattodo',
                    lastTab: '',
                    isSet: function (checkTab) {
                        return this.activeTab === checkTab;
                    },
                    show: function (tab) {
                        var index = this.progress.indexOf(tab);
                        return this.controlprogress[index]
                    },
                    setTab: function (setTab) {
                        this.lastTab = this.activeTab.toString();
                        this.activeTab = setTab;
                        setTab == 'adminfeatures' && jsoneditor == null ? (
                            rawjsoncontainerelement = document.getElementById('rawjsoncontainer'),
                            console.log(rawjsoncontainerelement),
                            jsoneditor = new JSONEditor(rawjsoncontainerelement, {
                            }), jsoneditor.set($scope.programs[0])) : null;
                        setTab == 'preview' ? ($scope.jumptopreview(), this.activeTab = this.lastTab.toString()) : null; 
                    },
                    complete: function (checkTab) {
                        return this.controlprogress[this.progress.indexOf(checkTab)];
                    },
                    get: function (tabname) {
                        return _.find($scope.tabs, function (tab) { return tab.name.toLowerCase() == tabname.toLowerCase(); })
                    }
                };

                $scope.triggerTabEvent = function (name) {
                    //console.log('tab : ',index);
                    var tab = $scope.tab.get(name);
                    tab != null ? tab.next() : null;
                };

                //read the query string if we have load a program
                function readquerystring() {
                    if ($location.search() && $location.search().code != null && $location.search().code != '') {
                        tools_service.showPreloader($scope, 'show');
                        $scope.selectprogramforedit($location.search().code, function (program) {
                            //$scope.programs[program];
                            $scope.currentaction = 'editprogram';
                            $scope.showcategoryselector = true; 
                            var tab = $scope.tab.get('whattodo'); //lets go to the editor...
                            tab.next();
                            tools_service.showPreloader($scope, 'hide');
                        });
                    }
                }

                function _quoteload() {
                    $scope.quote != null ? recoverquoteprogram() : null;
                }

                $scope.tab.setTab('whattodo');
                initMap([], 'map', false);
                $scope.rolename == 'admin' ? recoverdmcs() : $scope.selectdmc(loginsession);
                getTripTags();
                recoverCities();
                recoverAirports();
                console.log($scope.quote);
                $scope.quote != null ? _quoteload() : readquerystring();   
            }
        };


    }]);