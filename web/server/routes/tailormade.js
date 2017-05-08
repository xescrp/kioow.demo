module.exports = function (app) {


    var utils = require('../utils');
    var _blanks = require('../utils/_blanks');

    var common = require('yourttoo.common');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    var BRAND = settings.get('brand');

    app.post('/tailormade-to-print', function (req, res, next) {

        var params = req.body;
        var content = {
            product: params.dmcproduct,
            quote: params.quote,
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

        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.ytotailormadetoprint);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    app.get('/viaje-a-medida', function (req, res, next) {
        var code = req.query.code;
        !common.utils.stringIsNullOrEmpty(code) ?
            setImmediate(function () {
                req.defaultcontent.adminrevision = req.session.login.user.isAdmin;
                req.defaultcontent.adminrevision == null ? req.editcontent.adminrevision = false : null;
                var quotematch = req.session.login.user.isDMC ? { dmccode: req.session.dmc.code } : null;
                var dmcmatch = req.session.login.user.isDMC ? { code: req.session.dmc.code } : null;

                var request = {
                    collectionname: 'UserQueries',
                    query: { code: code },
                    populate: [
                        {
                            path: 'quotes', match: quotematch,
                            populate: [{
                                path: 'products', populate: [
                                    { path: 'dmc', model: 'DMCs' },
                                    { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' },
                                    { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }
                                ]
                            }, { path: 'booking' }]
                        },
                        { path: 'dmcs', match: dmcmatch }, { path: 'traveler' },
                        { path: 'affiliate' }, { path: 'chats' }, { path: 'booking' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    req.defaultcontent.editdata = result;
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

    app.get('/viaje-a-medida', function (req, res) {

        res.set('Content-Type', 'text/html');

        var content = {
            canonicalurl: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate',
            title: 'Nueva petición de viaje a medida - ' + req.defaultcontent.brand.domain,
            description: 'Tu herramienta para los viajes multidays ONLINE y A MEDIDA',
        };
        _.extend(req.defaultcontent, content);
        var tmpl = swig.compileFile(filepaths.affiliate.requestform);
        var renderedHtml = tmpl(req.defaultcontent);

        res.send(renderedHtml);

    });


    app.get('/quote/:quotecode', function (req, res, next) {
        console.log('quote - get quote...' + req.params.quotecode);
        req.params.quotecode != null && req.query.quotecode != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: 'Quotes',
                    query: { code: req.params.quotecode },
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
                        { path: 'affiliate' }, { path: 'booking' }]
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

    app.get('/quote/:quotecode', function (req, res, next) {
        console.log('book - get query from quote...' + req.params.quotecode);
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
                                    { path: 'sleepcountry', model: 'DestinationCountries' },
                                    { path: 'departurecountry', model: 'DestinationCountries' },
                                    { path: 'stopcountry', model: 'DestinationCountries' },
                                    { path: 'sleepcity', model: 'DestinationCities' },
                                    { path: 'departurecity', model: 'DestinationCities' },
                                    { path: 'stopcities', model: 'DestinationCities' }
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

    app.get('/quote/:quotecode', function (req, res) {

        res.set('Content-Type', 'text/html');

        res.set('Content-Type', 'text/html');

        var paramsUrl = '';
        var paramsindex = req.originalUrl.indexOf('?');

        if (paramsindex >= 0) {
            var paramsUrl = req.originalUrl.slice(req.originalUrl.indexOf('?'));
        }

        var content = {
            canonicalurl: filepaths.rooturl,
            navigationType: 'affiliate',
            title: 'Respuesta de petición a medida',
            description: 'Tu herramienta para los viajes multidays ONLINE y A MEDIDA',
            requestdetails: {},
            bc: [],
            minPrice: 'No Disponible',
            dayprice: {
                value: 0,
                currency: ""
            },
            cities: [],
            meals: [],
            disponible: false,
            quote: req.defaultcontent.quote,
            product: req.defaultcontent.quote.products,
            productid: '',
            currentCountry: {},
            querystring: '',
            isquote: true,
            back: {}
        };

        // ===== back button ======
        var spl = req.originalUrl.split('?');
        content.querystring = spl[1];

        var tmpl = swig.compileFile(filepaths.affiliate.requestquote);
        if (req.query.print == 'true') {
            tmpl = swig.compileFile(filepaths.affiliate.producttoprinttailor);
        }
        //bc navigation
        content.bc.push({ label: 'Inicio', url: '/' });
        content.bc.push({
            label: (req.defaultcontent.loginsession.affiliate != null) ? req.defaultcontent.loginsession.affiliate.company.name : '',
            url: req.defaultcontent.brand.path + '/edit/account?code' + req.defaultcontent.loginsession.user.code + '&usertype=' + req.defaultcontent.loginsession.user.rolename
        });
        content.bc.push({ label: 'Tus solicitudes', url: '/admin/queries' });
        if (req.query.query) {
            content.bc.push({ label: 'Solicitud ' + req.query.query, url: '/edit/request?code=' + req.query.query });
            content.back = { label: 'volver a la solicitud', url: '/edit/request?code=' + req.query.query };
        }


        content.product = req.defaultcontent.quote.products;
        content.bc.push({ url: "", label: content.product.title_es });
        //PRODUCT DATA
        // old cities
        // Clone itinerary for avoid reference
        var iti = JSON.parse(JSON.stringify(content.product.itinerary));
        // content.cities = utils._showCities(content.product.itineray);
        //var update = utils._showCitiesById(
        //    iti,
        //    content.product.departurecity,
        //    content.product.stopcities,
        //    content.product.sleepcity
        //);
        //content.cities = update.cities;
        ////content.product.itinerary = update.itinerary;
        //content.countries = utils._showCountries(content.product.itinerary);
        //content.meals = utils._mealsIncluded(content.product.itinerary);
        //content.hasDrinks = utils._drinksincluded(content.product.itinerary);
        //content.hotelcats = utils._showHotelCats(content.product.itinerary, '_es');

        // get cant paxs
        content.paxs = 0;

        if (content.quote.rooms.single.quantity > 0) {
            content.paxs += content.quote.rooms.single.quantity;
        }
        if (content.quote.rooms.double.quantity > 0) {
            content.paxs += (2 * content.quote.rooms.double.quantity);
        }
        if (content.quote.rooms.triple.quantity > 0) {
            content.paxs += (3 * content.quote.rooms.triple.quantity);
        }
        if (content.quote.rooms.quad.quantity > 0) {
            content.paxs += (4 * content.quote.rooms.quad.quantity);
        }

        if (content.product.minprice != null) {
            //     
            if (content.product.minprice.currency.value == 'EUR') {
                content.minPrice = content.product.minprice;
            } else {
                content.minPrice = content.product.minprice.exchange;
            }
            //
            if (content.minPrice != null && content.minPrice.value > 0) {
                content.disponible = true;
                content.dayprice = utils._calculateDayPrice(content.minPrice.value,
                    content.minPrice.currency, content.product.itinerary);
            }
        }
        if (content.product != null && req.defaultcontent.quote != null) {
            content.product.pvp = {
                b2b: req.defaultcontent.quote != null ? req.defaultcontent.quote.pvpAffiliate.value : 0,
                currency: req.defaultcontent.quote.pvpAffiliate.currency
            }
        } 
        //SEO 
        content.title = content.product.title_es;
        if (content.product['description' + content.lang] != undefined) {
            if (content.product['description' + content.lang].length > 152) {
                content.description = content.product['description' + content.lang].substring(0, 152) + '...';
            } else {
                content.description = content.product['description' + content.lang];
            }
        } else {
            //content.description = "Viaje: " + content.product.title_es + " desde " + content.minPrice.value + "€";
        }
        // Search Date
        content.date = req.param.date;

        //GMAPS
        content.markers = utils._getMarkers(content.product.itinerary);

        content.citysAndHotelCats = utils._getCitiesAndHotelCats(content.product.itinerary);

        // RENDER
        _.extend(req.defaultcontent, content);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);

    });

}