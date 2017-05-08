module.exports = function (app) {
    'use strict';
    //dependencies
    var utils = require('../utils');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    var enviroment = settings.get('enviroment');
    var BRAND = settings.get('brand');

    app.post('/affiliate-invoice-wl-to-print', function (req, res, next) {

        var params = req.body;
        console.log(params);
        console.log(params.booking);

        var content = {
            vat: params.vat,
            local: params.local,
            invoicenumber: params.invoicenumber,
            invoicedate: params.invoicedate,
            dmcproduct: params.dmcproduct,
            booking: params.booking,
            title: "Invoice " + params.booking.idBooking,
            description: "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate'
        };
        content.countries = utils._showCountries(params.dmcproduct.itinerary);
        //set Paxes into rooms
        _.each(content.booking.rooms, function (room) {
            room.paxes = [];
            _.each(room.paxlist, function (paxslug) {
                var pax = _.find(content.booking.paxes, function (pax) {
                    return pax.slug == paxslug;
                });
                if (pax != null) { room.paxes.push(pax); }
            });
        });
        var charges = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'charge';
        });
        var pays = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'pay';
        });
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytowlinvoicetoprint);
        utils._showCountriesEspanol(req, content.dmcproduct, function (rescountrys) {
            content.booking.destination = _.pluck(rescountrys, 'label_es');
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);
        });
    });

    app.post('/invoice-to-print', function (req, res, next) {
        var params = req.body;

        var content = {
            invoicenumber: params.invoicenumber,
            invoicedate: new Date(params.invoicedate),
            invoiceamount: params.invoiceamount,
            dmcproduct: params.dmcproduct,
            booking: params.booking,
            title: "Invoice " + params.booking.idBooking,
            description: "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate'
        };
        var source = params.invoicesource || 'travelersense';

        content.countries = utils._showCountries(params.dmcproduct.itinerary);
        //set Paxes into rooms
        _.each(content.booking.rooms, function (room) {
            room.paxes = [];
            _.each(room.paxlist, function (paxslug) {
                var pax = _.find(content.booking.paxes, function (pax) {
                    return pax.slug == paxslug;
                });
                if (pax != null) { room.paxes.push(pax); }
            });
        });
        var charges = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'charge';
        });
        var pays = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'pay';
        });
        _.extend(req.defaultcontent, content);
        var tmpl = source == 'travelersense' ? swig.compileFile(filepaths.affiliate.ytotsinvoicetoprint) : swig.compileFile(filepaths.affiliate.ytoprinvoicetoprint);
        utils._showCountriesEspanol(req, content.dmcproduct, function (rescountrys) {
            content.booking.destination = _.pluck(rescountrys, 'label_es');
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);
        });
    });

    app.post('/affiliate-invoice-to-print', function (req, res, next) {

        var params = req.body;
        console.log(params);
        console.log(params.booking);

        var content = {
            vat: params.vat,
            local: params.local,
            dmcproduct: params.dmcproduct,
            booking: params.booking,
            title: "Invoice " + params.booking.idBooking,
            description: "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate'
        };
        content.countries = utils._showCountries(params.dmcproduct.itinerary);
        //set Paxes into rooms
        _.each(content.booking.rooms, function (room) {
            room.paxes = [];
            _.each(room.paxlist, function (paxslug) {
                var pax = _.find(content.booking.paxes, function (pax) {
                    return pax.slug == paxslug;
                });
                if (pax != null) { room.paxes.push(pax); }
            });
        });
        var charges = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'charge';
        });
        var pays = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'pay';
        });
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytoinvoicetoprint);
        utils._showCountriesEspanol(req, content.dmcproduct, function (rescountrys) {
            content.booking.destination = _.pluck(rescountrys, 'label_es');
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);
        });
    });

    app.post('/affiliate-proforma-to-print', function (req, res, next) {

        var params = req.body;
        console.log(params);
        console.log(params.booking);

        var content = {
            vat: params.vat,
            local: params.local,
            dmcproduct: params.dmcproduct,
            booking: params.booking,
            title: "Invoice " + params.booking.idBooking,
            description: "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate'
        };
        content.countries = utils._showCountries(params.dmcproduct.itinerary);
        //set Paxes into rooms
        _.each(content.booking.rooms, function (room) {
            room.paxes = [];
            _.each(room.paxlist, function (paxslug) {
                var pax = _.find(content.booking.paxes, function (pax) {
                    return pax.slug == paxslug;
                });
                if (pax != null) { room.paxes.push(pax); }
            });
        });
        var charges = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'charge';
        });
        var pays = _.filter(content.booking.payments, function (payload) {
            return payload.action == 'pay';
        });
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytoinvoicetoprint);
        utils._showCountriesEspanol(req, content.dmcproduct, function (rescountrys) {
            content.booking.destination = _.pluck(rescountrys, 'label_es');
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);
        });
    });

    app.post('/affiliate-contract-to-print', function (req, res, next) {

        var params = req.body;

        var content = {
            vat: params.vat,
            local: params.local,
            dmcproduct: params.dmcproduct,
            booking: params.booking,
            title: "Contrato " + params.booking.idBooking,
            description: "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate'
        };

        _.each(content.booking.rooms, function (room) {
            room.paxes = [];
            _.each(room.paxlist, function (paxslug) {
                var pax = _.find(content.booking.paxes, function (pax) {
                    return pax.slug == paxslug;
                });
                if (pax != null) { room.paxes.push(pax); }
            });
        });
        console.log("\n\n ***************** estoy en contracto ");
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytocontracttoprint);
        console.log("\n\n ***************** swig: ", tmpl);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    app.post('/booking-summary-to-print', function (req, res) {

        var params = req.body;
        _.each(params.booking.rooms, function (room) {
            room.paxes = [];
            _.each(room.paxlist, function (paxslug) {
                var pax = _.find(params.booking.paxes, function (pax) {
                    return pax.slug == paxslug;
                });
                if (pax != null) { room.paxes.push(pax); }
            });
        });
        var content = {
            canonicalurl: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate',
            language: "es",
            product: params.product,
            booking: params.booking,
            title: "Bono de la reserva " + params.booking.idBooking,
            description: "Bono de la reserva de yourttoo.com"
        };
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytobookingsummarytoprint);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    app.post('/affiliate-budget-to-print', function (req, res, next) {
        

        var params = req.body;
        var content = {
            vat: params.vat, 
            local: params.local,
            product: params.dmcproduct,
            booking: params.booking,            
            description: "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),            
            navigationType: 'affiliate'
        };
        
        //rellenar los parametros
        content.countries = utils._showCountries(params.dmcproduct.itinerary);
        content.meals = utils._mealsIncluded(params.dmcproduct.itinerary);
        content.hasDrinks = utils._drinksincluded(params.dmcproduct.itinerary);
        content.hotelcats = utils._showHotelCats(params.dmcproduct.itinerary, '_es');
        content.productTags = utils._showTagsArrayPublished(params.dmcproduct.tags);
        content.local = params.local;
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytobudgettoprint);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    app.post('/booking/intent/', function (req, res, next) {
        var bookrequest = req.body;

        var request = {
            bookrequest: bookrequest
        };
        var command = 'book2';
        
        var rq = utils.apicall('book2', request, req.session, req.ytoconnector, req);
        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            //ready to build TPV REQUEST
            // 1) recuperar el fichero del proceso del pago por tpv
            res.send(result);
        });


        //request is not success
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            res.status(500).send(err);
        });

        //request error access to api...
        rq.on('api.error', function (err) {
            console.error(err);
            res.status(500).send(err);
        });

        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.error(tout);
            res.status(503).send("Server too busy right now, sorry.");
        });


    });

    app.get('/booking/:slug/', function (req, res, next) {
        console.log('book - get budget...' + req.query.budget);
        req.query.budget != null && req.query.budget != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: 'Bookings2',
                    query: { idBooking: req.query.budget },
                    populate: [
                        { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }, { path: 'dmc' }, { path: 'traveler' },
                        { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
                        { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
                        { path: 'invoices' }, { path: 'relatedbooking' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    req.defaultcontent.budget = result;
                    next();
                });
                rq.on(request.onerroreventkey, function (err) {
                    return next(new Error(err));
                });
                rq.on('api.error', function (err) {
                    return next(new Error(err));
                });
                rq.on('api.timeout', function (tout) {
                    return next(new Error(tout));
                });
            }) :
            setImmediate(function () {
                next();
            });
    });

    app.get('/booking/:slug/', function (req, res, next) {
        console.log('book - get quote...' + req.query.quote);
        req.query.quote != null && req.query.quote != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: 'Quotes',
                    query: { code: req.query.quote },
                    populate: [
                        {
                            path: 'products', populate: [
                                { path: 'dmc', model: 'DMCs' },
                                { path: 'sleepcountry' },
                                { path: 'departurecountry' },
                                { path: 'stopcountry' },
                                { path: 'sleepcity' },
                                { path: 'departurecity' },
                                { path: 'stopcities' }]
                        },
                        { path: 'dmc' },
                        { path: 'affiliate' },  { path: 'booking' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    req.defaultcontent.quote = result;
                    next();
                });
                rq.on(request.onerroreventkey, function (err) {
                    return next(new Error(err));
                });
                rq.on('api.error', function (err) {
                    return next(new Error(err));
                });
                rq.on('api.timeout', function (tout) {
                    return next(new Error(tout));
                });
            }) :
            setImmediate(function () {
                next();
            });
    });

    app.get('/booking/:slug/', function (req, res, next) {
        console.log('book - get query from quote...' + req.query.quote);
        req.defaultcontent.quote != null && req.defaultcontent.quote.userqueryCode != null && req.defaultcontent.quote.userqueryCode != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: 'UserQueries',
                    query: { code: req.defaultcontent.quote.userqueryCode },
                    populate: [
                        {
                            path: 'quotes', match: { code: req.defaultcontent.quote.code },
                            populate: [{
                                path: 'products', populate: [
                                    { path: 'dmc', model: 'DMCs' },
                                    { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' },
                                    { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }
                                ]
                            }, { path: 'booking' }]
                        },
                        { path: 'dmcs', match: { code: req.defaultcontent.quote.products.dmc.code } }, { path: 'traveler' },
                        { path: 'affiliate' }, { path: 'chats' }, { path: 'booking' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    req.defaultcontent.userquery = result;
                    next();
                });
                rq.on(request.onerroreventkey, function (err) {
                    return next(new Error(err));
                });
                rq.on('api.error', function (err) {
                    return next(new Error(err));
                });
                rq.on('api.timeout', function (tout) {
                    return next(new Error(tout));
                });
            }) :
            setImmediate(function () {
                next();
            });
    });

    
    app.get('/booking/:slug/', function (req, res, next) {
        var bookprod = {
            title:          "Reserva Segura | YOURTTOO",
            description:    "Reserva tu viaje",
            url:            filepaths.rooturl + "/booking/" + req.params.slug,
            disponible:     false,
            enviroment :    enviroment,
            dateActual :    new Date()
        };

        _.extend(req.defaultcontent, bookprod);

        var tmpl = swig.compileFile(filepaths.affiliate.payflow);
        console.log(req.defaultcontent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    
   
   
      // ========== CLIENT PAYMENT CONFIRM booking // ===========
    app.get('/thankyou', function (req, res, next) {
        var idBooking = req.query.bookingId;
        var rd = req.query.rd;
        var rdirect = null;
        if (rd != null) {
            if (rd != '') {
                rdirect = '/thankyou?bookingId=' + idBooking;
            }
        }

        // 1) rescatar la reserva de mongo, dado su id
        var request = {
            collectionname : 'Bookings',
            query : {
                'idBooking' : req.query.bookingId
            },
            populate: [{ path: 'affiliate' }, { path: 'traveler' }, { path: 'payments' }, { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }]
        };
        
        var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

        //request success
        rq.on(request.oncompleteeventkey, function (result) {
          if (result != null){

          // rescato la booking
          var bookingBD = result;
          var product = bookingBD.product[0];

          // cargar el swig de accion terminada (los mails ya se mandan en el api)
            var content = {
              navigationType:     'affiliate',
              idBooking: idBooking,
              booking : bookingBD,
              paxNumber : utils._getPaxNumber(bookingBD),
              unitPrice : utils._getUnitPriceAverage(bookingBD),
              language : "es",
              product : product,
              countries : utils._showCountries(product.itinerary),
              hotelcats : utils._showHotelCats(product.itinerary),
              title: "Reserva Realizada",
              description : "Muchas gracias por comprar en",
              newlocation: rdirect
            };


            _.extend(req.defaultcontent, content);
            var tmpl = swig.compileFile(filepaths.booking.thankyoupre);

            console.log ('content.booking.status ',content.booking.status);
            switch(content.booking.status) {
                case 'regular1-2':
                    tmpl = swig.compileFile(filepaths.booking.thankyoupre);
                    break;
                case 'regularok':
                    tmpl = swig.compileFile(filepaths.booking.thankyou);
                    break;
                default:
                    tmpl = swig.compileFile(filepaths.booking.paymenttpverror);
            };

            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);

          }
          //no results found
          else{
            var error = 'No booking found with id: '+idBooking;
            console.error (error);
            res.redirect(404, '/404');
          }
        });


        //request is not success
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            //res.status(500).send(err);
            res.status(500).send(err);
        });

        //request error access to api...
        rq.on('api.error', function (err) {
            console.error(err);
            //res.status(503).send("Server too busy right now, sorry.");
            //res.status(500).send(err);
            res.status(500).send(err);
        });

        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.error(tout);
            //res.status(503).send("Server too busy right now, sorry.");
            res.status(500).send(err);
        });


    });



    // ========== AFFILIATE PAYMENT CONFIRM booking transfer complete // ===========
    app.get('/thankyou-transfer', function (req, res, next) {

        var idBooking = req.param("bookingId");
        var rd = req.query.rd;
        var rdirect = null;
        if (rd != null) {
            if (rd != '') {
                rdirect = '/thankyou-pre?bookingId=' + idBooking;
            }
        }


        // 1) rescatar la reserva de mongo, dado su id
        var request = {
            collectionname: 'Bookings2',
            query: {
                'idBooking': req.param("bookingId")
            },
            populate: [
                { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }, { path: 'dmc' }, { path: 'traveler' },
                { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
                { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
                { path: 'invoices' }, { path: 'relatedbooking' }]
        };
        var command = 'findone';
        var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);
        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            if (result != null) {

                // rescato la booking
                var bookingBD = result;
                var product = bookingBD.products[0];


                // cargar el swig de accion terminada (los mails ya se mandan en el api)									
                var content = {
                    navigationType: 'affiliate',
                    idBooking: idBooking,
                    booking: bookingBD,
                    paxNumber: bookingBD.paxes.length,
                    unitPrice: bookingBD.pricing.amount / bookingBD.paxes.length,
                    language: "es",
                    product: product,
                    title: "Reserva Realizada",
                    description: "Muchas gracias por comprar en yourttoo.com",
                    newlocation: rdirect
                };

                //set Paxes into rooms
                _.each(bookingBD.rooms, function (room) {
                    room.paxes = [];
                    _.each(room.paxlist, function (paxslug) {
                        var pax = _.find(bookingBD.paxes, function (pax) {
                            return pax.slug == paxslug;
                        });
                        if (pax != null) { room.paxes.push(pax); }
                    });
                });
                var charges = _.filter(bookingBD.payments, function (payload) {
                    return payload.action == 'charge';
                });
                var pays = _.filter(bookingBD.payments, function (payload) {
                    return payload.action == 'pay';
                });

                var tmpl = swig.compileFile(filepaths.affiliate.thankyoutransfer);
                content.booking = bookingBD;
                _.extend(req.defaultcontent, content);
                var renderedHtml = tmpl(req.defaultcontent);
                res.send(renderedHtml);

            }
            //no results found
            else {
                var error = 'No booking found with id: ' + idBooking;
                console.error(error);
                res.redirect(404, '/404');
            }
        });


        //request is not success
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            //res.status(500).send(err);
            res.status(500).send(err);
        });

        //request error access to api...
        rq.on('api.error', function (err) {
            console.error(err);
            //res.status(503).send("Server too busy right now, sorry.");
            //res.status(500).send(err);
            res.status(500).send(err);
        });

        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.error(tout);
            //res.status(503).send("Server too busy right now, sorry.");
            res.status(500).send(err);
        });
    });


// ========== CLIENT PAYMENT 60% booking process// ===========
    app.get('/booking-pos', function (req, res, next) {

        var idBooking = req.param("bookingId");
        // var rd = req.query.rd;
        // var rdirect = null;
        // if (rd != null) {
        //     if (rd != '') {
        //         rdirect = '/thankyou-complete?bookingId=' + idBooking;
        //     }
        // }


         //rescatar la reserva de mongo para mostrarla
         var url = utils.api + '/api/getBookingByIdBooking';
         var data = { idBooking: idBooking };
         var renderedHtml;

         if (idBooking == undefined){
            console.log ('Error : The idBooking can not be empty! : '+idBooking);
            next();

         } else {

         utils.http.Get(url, data, utils.headers, function (results) {
              if (results) {
                  if (results.responseBody) {
                       var jsonresponse = JSON.parse(results.responseBody);
                       if (jsonresponse.NoResults){
                          res.send({NoResults: true});
                       }else{

                           var booking = jsonresponse;

                           //************************************************
                           // comprobar que no haya realizado el segundo pago
                           //************************************************
                           if(booking.payStatus!=null && booking.payStatus.length > 0){

                        	   var total = 0;
                        	   var valid = false;
                        	   for(var it = 0; it < booking.payStatus.length; it++){
                        		   total += booking.payStatus[it].payment;
                        		   //si tiene recibo
                        		   if(booking.payStatus[it].receiptNumber!=null && booking.payStatus[it].amount!=null){
                        			   valid = true;
                        		   }
                        	   }

                        	   //**************************************************************************************
                        	   // Si hay un pago validado y no esta 100% pagado (con o sin validar) voy al segundo pago
                        	   //**************************************************************************************
                        	   if(valid && total>0 && total < 100){

                        		   var content = {
                                       appversion : filepaths.appversion,
                                       getUrlCloudinary: utils._cloudinary_url,
                                       booking : {},
                                       language : "es",
                                       description : "Completa tu reserva",
                                       session: req.session.ytologin,
                                       navigationType: 'traveler',
                                       newlocation: rdirect,
                                       bc:[]
                                   }
                        		   var tmpl = swig.compileFile(filepaths.product.client.bookingpos);
                        		   content.booking = jsonresponse;
                        		   content.product = JSON.parse(jsonresponse.product);
                                   content.countries = utils._showCountries(content.product.itinerary);
                                   content.hotelcats = utils._showHotelCats(content.product.itinerary);
                                   content.bc = [{ url: "/", label: "Inicio" },{ url: "/viajes" , label: 'Viajes' } , { url: "/viaje/"+content.product.slug, label: content.product.title_es }],
                                   renderedHtml = tmpl(content);
                                   res.send(renderedHtml);
                        	   }

                        	   //***********************************
                        	   // ir a la web de la reserva concreta
                        	   //***********************************
                        	   else{
                        		   var content = {
                                    appversion : filepaths.appversion,
                    		        	  bookinglist: {},
                    		            language: "es",
                    		            title: "Booking Details " + req.param("idbooking"),
                    		            description: "Online Booking Platform",
                    		            session: req.session.ytologin,
                    		            navigationType: 'traveler'
                    		        };
	                		        var tmpl = swig.compileFile(filepaths.client.clientbooking);
	                		        renderedHtml = tmpl(content);
	                		        res.send(renderedHtml);
                        	   }
                           }
                           // ir a la web de la reserva concreta
                           else{
                        	   var content = {
                                appversion : filepaths.appversion,
                   		        	bookinglist: {},
                                language: "es",
                                title: "Booking Details " + req.param("idbooking"),
                                description: "Online Booking Platform",
                                session: req.session.ytologin,
                                navigationType: 'traveler'
                   		        }

               		        var tmpl = swig.compileFile(filepaths.client.clientbooking);
               		        renderedHtml = tmpl(content);
               		        res.send(renderedHtml);
                           }
                       }
                  }
                  else{
                     console.log ('1 An unknown error has ocurred in getbooking: '+idBooking);
                     next();
                 }
             }
             else{
                 console.log ('1 An unknown error has ocurred in getbooking: '+idBooking);
                 next();
             }
         });

        }
    });

    app.get('/bono', function (req, res, next) {
        
        var idBooking = req.query.bookingId;
       
        var content = {
 
            canonicalurl:       filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url:                filepaths.rooturl + utils._getUrlBrand(req.route.path),
            session:            req.session.ytologin,
            navigationType:     'affiliate',
            getUrlCloudinary: utils._cloudinary_url,
            booking : {},
            language : "es",
            title: "Descarga el bono",
            description : "Descarga tu bono de la reserva",
            bc:[]
        };
         var tmpl = swig.compileFile(filepaths.booking.userbonook);
       
         if (idBooking == undefined){
            console.log ('Error : The idBooking can not be empty! : '+idBooking);
            next();
         } else {
             
             // api nueva
             var request = {
                collectionname : 'Bookings',
                query : {
                    'idBooking' : idBooking
                },
                populate: [{ path: 'affiliate' }, { path: 'dmc' }, { path: 'products', populate: [{ path: 'dmc', model: 'DMCs'}] }, { path: 'payments' }]
            };
            var command = 'findone';
            request.oncompleteeventkey = command + '.done';
            request.onerroreventkey = command + '.error';

            var rqCMD = {
                command : command,
                request : request,
                service : 'core',
            };

            var auth = null;
            if (req.session != null && req.session.ytologin != null) {
                auth = {
                    userid: req.session.ytologin.user._id,
                    accessToken: req.session.ytologin.accessToken
                };
            }
            rqCMD.auth = auth;

            var rq = req.ytoconnector.send(rqCMD);

            // request success
            rq.on(request.oncompleteeventkey, function(result) {
                if (result) {
                    //console.log('results.responseBody', results.responseBody)
                    content.booking = result;
                    var product = JSON.parse(result.product);
                    content.product = product;
                    
                    var renderedHtml = tmpl(content);
                    res.send(renderedHtml);          
                }          
                else{
                    console.log ('1 An unknown error has ocurred in getbooking: '+idBooking);
                    next();
                }
            });

            // request is not success
            rq.on(request.onerroreventkey, function (err) {
                console.log(err);
                res.status(500).send(err);              
            });
            
            //request error access to api...
            rq.on('api.error', function (err) {
                console.log(err);
                //res.status(503).send("Server too busy right now, sorry.");
                res.status(500).send(err);
            });
            
            //request timeout api not responding...
            rq.on('api.timeout', function (tout) {
                console.log(tout);
                res.status(503).send("Server too busy right now, sorry.");
            });

        }     
    });
    // web solo con el bono para poder imprimir
    app.post('/voucher-to-print', function (req, res) {

    	var params = req.body;

        var content = {
            appversion : filepaths.appversion,
            language: "en",
            dmc:  params.dmc,
            product: params.product,
            booking:  params.booking,
            title: "Bono de la reserva " + params.booking.idBooking,
            getUrlCloudinary: utils._cloudinary_url,
            description: "Bono de la reserva",
            session: req.session.ytologin,
            navigationType: 'traveler'
        };

        var tmpl = swig.compileFile(filepaths.affiliate.ytovouchertoprint);
        var renderedHtml = tmpl(content);
        res.send(renderedHtml);
    });

   }
