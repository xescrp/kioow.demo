module.exports = function(app){

    var utils = require('../utils');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var common = require('yourttoo.common');
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });

    app.get('/datamap/:code/', function (req, res, next) {

        var content  = {
            product:  null
        };

        var request = {
            collectionname : 'DMCProducts',
            query: { 'code': req.params.code },
            populate: [{ path: 'dmc', select: 'code name images company.name additionalinfo.description additionalinfo.description_es membership.b2bchanel membership.b2bcommission currency' }]
        };
        var command = 'findone';
    
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req); //req.ytoconnector.send(rqCMD);

        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            if (result != null) {
                content.product = result;
                content.BRAND = req.defaultcontent.brand;
                content.itinerarymap = utils._getMarkers(content.product.itinerary)
                res.json(content.itinerarymap);
            } else {
                console.log ('2 An unknown error has ocurred in results');
                 res.json(null);
            }
        });
        //request no success
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            res.status(500).send(err);
        });

    });


    app.get('/previewmap/:code/', function (req, res, next) {

        var content  = {
        };

        var request = {
            collectionname : 'DMCProducts',
            query: { 'code': req.params.code },
            populate: [{ path: 'dmc', select: 'code name images company.name additionalinfo.description additionalinfo.description_es membership.b2bchanel membership.b2bcommission currency' }]
        };
        var command = 'findone';
            
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req); //var rq = req.ytoconnector.send(rqCMD);
        //
        var tmpl = swig.compileFile(filepaths.static.previewmap);
        
        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            if (result != null) {
                content.site = 'yto';
                content.product = result;
                content.itinerarymap = utils._getMarkers(content.product.itinerary);
                _.extend(req.defaultcontent, content);
                var renderedHtml = tmpl(req.defaultcontent);
                res.send(renderedHtml);
            } else {
                console.log ('2 An unknown error has ocurred in results');
                _.extend(req.defaultcontent, content);
                var renderedHtml = tmpl(req.defaultcontent);
                res.send(renderedHtml);
            }
        });
        //request no success
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            res.status(500).send(err);
        });

    });

    // COUNTRYSELECT PARTIAL
    app.get('/countryselect', function (req, res, next) {

        var content = {
            allZonesCountries: []
        };
        
        var command = 'pull';
        var request = {
            Keys: ['continentAndCountriesListCACHE']
        };
        request.environment = 'yourttoo';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'memento',
        };
        
        if (req.session != null && req.session.login != null) {
            var auth = {
                userid: req.session.login.user._id,
                accessToken: req.session.login.accessToken
            };
            rqCMD.auth = auth;
        }
        
        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (results) {
            content.allZonesCountries = results['continentAndCountriesListCACHE'];
            var tmpl = swig.compileFile(filepaths.client.countryselect);
            var renderedHtml = tmpl(content);
            res.set({ 'content-type': 'application/json; charset=utf-8' })
            res.send(renderedHtml);
        });
        
        rq.on(request.onerroreventkey, function (err) { 
            res.status(500).send(err);
        });
        
        rq.on('api.error', function (err) {
            console.log(err);
            res.status(500).send(err);

        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(503).send("Server too busy right now, sorry.");
        });

    });

app.get('/viajes', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        
        var resultcontent = {
            canonicalurl: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url: utils._getAbsUrl(req) + req.originalUrl,
            navigationType: 'affiliate',
            title: 'Viajes - ' + req.defaultcontent.brand.domain,
            description: 'Encuentra tu viaje | yourttoo.com',
            currentDate : new Date(),
            alltags: {},
            metaimage : utils._getAbsUrl(req) + '/img/brand/logo.png',
            name : 'yourttoo.com',
            needscountrylanding: false,
            needstaglanding: false,
            needscitylanding : false,
            pageitems: [],
            pager: {},
            lastcode : '',
            filter: {},
            totalitems: {},
            allpages: {},
            allCities : [],
            tags : [],
            triptags : false,
            hotelcats : [],
            gotlandingtags: false,
            gotlandingzones: false,
            bc: [],
            daysFilter : [
                { slug : '1-5', label : '1-5 días', num : 0 },
                { slug : '6-10', label : '6-10 días', num : 0 },
                { slug : '11-15', label : '11-15 días', num : 0 },
                { slug : '15', label : '+ 15 días', num : 0 }
            ],
            kindFilter : [
                { slug : 'group', label : 'Viajes en grupo', num : 0 },
                { slug : 'private', label : 'Viajes privados', num : 0 },
            ],
            querystring : '',
            travelroot : false,
            pageurl : "",
            search : {}
        };
        var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
        //N - N - N (no filters, viajes landing) 
        if ((req.query.country == null || req.query.country == '') && 
            (req.query.cities == null || req.query.cities == '') && 
            (req.query.tags == null || req.query.tags == '')) {

            resultcontent.travelroot = true;
            resultcontent.bc.push({ url: "/", label: "yourttoo.com" }, { url: "", label: "Viajes" });
        }        
        
        cev.on('searchquery', function () { 
            var tmpl = swig.compileFile(filepaths.affiliate.results);
            _.extend(req.defaultcontent, resultcontent);
            var renderedHtml = tmpl(req.defaultcontent);
            
            res.send(renderedHtml);
        });
        
        cev.on('searchlanding', function () {
            res.redirect('/inicio');
        });

        resultcontent.travelroot ? cev.emit('searchlanding') : cev.emit('searchquery');

    });

app.get('/viaje/:slug_es/:datein?', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var datein = new Date();
        var pvp = req.query.pvp;
        pvp != null && pvp != '' ? pvp = parseInt(pvp.toString()) : null;
        if (req.query.date == undefined) {
           datein = new Date();
        } else {
           datein = new Date(req.params.datein);
        }

        var paramsUrl = '';
        var paramsindex = req.originalUrl.indexOf('?');

        if (paramsindex >= 0){
            var paramsUrl = req.originalUrl.slice(req.originalUrl.indexOf('?'));
        };

        var productcontent = {
            canonicalurl:       filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url:                filepaths.rooturl + "/viaje/" + req.params.slug_es+'/'+paramsUrl,
            navigationType:     'affiliate',
            title:              'Viaje de yourttoo.com',
            description:        'Viaje de yourttoo.com',
            bc:                 [],
            seocontent:         {},
            minPrice:           {
                                net : null,
                                pvp : null,
                                currency : null
                                },
            dayprice:           {
                                    net : null,
                                    pvp : null,
                                    currency: ""
                                },
            pax:                2,
            cities:             [],
            meals:              [],
            disponible:         true,
            product:            {},
            currentCountry:     {},
            querystring:        '',
            currency:           { "label": "Euro", "symbol": "€", "value": "EUR" },
            fees:               { "unique" : 0, "groups" : 0, "tailormade" : 0, "flights" : 0 }
        };
        //== IF is affiliate 
        //
        if (req.defaultcontent.loginsession.user.isAffiliate){
            if (req.defaultcontent.loginsession.affiliate.currency != null){
                 productcontent.currency = req.defaultcontent.loginsession.affiliate.currency;
            }
            productcontent.fees = req.defaultcontent.loginsession.affiliate.fees;
        }
        //

        
        // ===== back button ======
        var spl = req.originalUrl.split('?');
        productcontent.querystring = spl[1];

        var tmpl = swig.compileFile(filepaths.affiliate.product);

        //event complete trigger
        var trigger = function () {
            this.name = 'Completed tasks emiter';
            this.error = false;
            this.errormessage = null;
            this.returnstatus = 200;
            this.done = function (eventname, assertcondition, data) {
                if (assertcondition) {
                    this.emit(eventname, data);
                }
            };
        };
        //events...
        common.eventtrigger.eventtrigger(trigger);
        var eventlauncher = new trigger();
        var prd_query = req.query.code != null && req.query.code != '' ?
            { code: req.query.code } :  //, publishState: { $in: ['published', 'published.noavail'] }
            { slug_es: req.params.slug_es }; //, publishState: { $in: ['published', 'published.noavail'] }
        var request = {
            collectionname : 'DMCProducts',
            query: prd_query,           
            populate : [{
                path: 'dmc', 
                select : 'code name images company.name additionalinfo.description additionalinfo.description_es membership.b2bchanel membership.b2bcommission membership.pvp currency membership.cancelpolicy._es currency'}]
        };
        console.log ('request ',request);
        var command = 'findone';
        
       
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        //var rq = req.ytoconnector.send(rqCMD);

        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            if (result != null){
                 _prepareToPrint(result);
            } else {
                next();
            }
        });
        //request is not success
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            //res.status(500).send(err);
            eventlauncher.error = true;
            eventlauncher.errormessage = err;
            eventlauncher.returnstatus = 500;
            eventlauncher.emit('search.error', err);
        });
        //request error access to api...
        rq.on('api.error', function (err) {
            console.log(err);
            eventlauncher.error = true;
            eventlauncher.errormessage = "Server too busy right now, sorry.";
            eventlauncher.returnstatus = 503;
            eventlauncher.emit('search.error', err);
        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            eventlauncher.error = true;
            eventlauncher.errormessage = "Server too busy right now, sorry.";
            eventlauncher.returnstatus = 503;
            eventlauncher.emit('search.error', tout);
        });



        var _prepareToPrint = function(product){
            if (req.query.print == 'true') {          	
            	// si es en una pagina
            	if(req.query.onepage && req.query.onepage =='true'){
            		tmpl = swig.compileFile(filepaths.affiliate.producttoprintonepage);
            	}
            	else{            		
            		tmpl = swig.compileFile(filepaths.affiliate.producttoprint);
            	}                
                utils._showCountriesEspanol(req, product, _showProduct);
            } else {
                _showProduct(null, null, product);
            }
        };


        var _showProduct = function(countries, err, product){
            console.log ('err ',err);
            productcontent.product = product;
            //
            //
            //PRODUCT DATA
            productcontent.countries = countries;
            productcontent.cities = utils._showCities(productcontent.product.itinerary);
            productcontent.meals = utils._mealsIncluded(productcontent.product.itinerary);
            productcontent.hasDrinks = utils._drinksincluded(productcontent.product.itinerary);
            productcontent.hotels = utils._showHotelCats(productcontent.product.itinerary,'_es');
            var day = productcontent.product.pvp.day || '01';
            var month = utils._getMonthNumberEnglish(productcontent.product.pvp.month);
            var year = productcontent.product.pvp.year;
            productcontent.date = day + '-' + month + '-' + year;

            //SEO 
            productcontent.title = productcontent.product.title_es;
            if (productcontent.product['description' + productcontent.lang] != undefined){
                if (productcontent.product['description' + productcontent.lang].length > 152){
                    productcontent.description = productcontent.product['description' + productcontent.lang].substring(0, 152) + '...';
                } else{
                    productcontent.description = productcontent.product['description' + productcontent.lang];
                }
            } else {
                productcontent.description = "Viaje: "+productcontent.product.title_es;
            }

            //GMAPS
            productcontent.markers = utils._getMarkers(productcontent.product.itinerary);

            productcontent.citysAndHotelCats =  utils._getCitiesAndHotelCats(productcontent.product.itinerary);
            // check if have categories
            // 
            var code = productcontent.product.parent || productcontent.product.code;
            console.log(productcontent.product.pvp);
            _getFamily(code);
        };

        var _getFamily = function(code){

            var request = {
            collectionname : 'DMCProducts',
            query : {
                $or: [{ 'parent': code }, { 'code': code }],
                $and: [{ 'publishState': { $in: ['published', 'published.noavail'] } }]
                },
            populate: [{ path: 'dmc', select: 'code name images company.name additionalinfo.description additionalinfo.description_es membership.pvp membership.b2bchanel membership.b2bcommission currency'}]
            };
            var command = 'find';
            request.oncompleteeventkey = command + '.done';
            request.onerroreventkey = command + '.error';

            var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
            //var rq = req.ytoconnector.send(rqCMD);

            //request success
            rq.on(request.oncompleteeventkey, function (result) {
                if (result != null && result.length > 1){
                    productcontent.related = result;
                    var compare = utils.comparepriceproducts;
                    productcontent.related.sort(compare);
                    if (pvp!= null && pvp > 0) {
                        productcontent.product.pvp = { b2b: pvp, currency: { value: 'EUR', symbol: '€', label: 'Eur' } };
                    }
                    //  RENDER 
                    _.extend(req.defaultcontent, productcontent);
                    var renderedHtml = tmpl(req.defaultcontent);
                    res.send(renderedHtml);
                } else {
                    //  RENDER 
                    if (pvp != null && pvp > 0) {
                        productcontent.product.pvp = { b2b: pvp, currency: { value: 'EUR', symbol: '€', label: 'Eur' } };
                    }
                    productcontent.related = null;
                    _.extend(req.defaultcontent, productcontent);
                    var renderedHtml = tmpl(req.defaultcontent);
                    res.send(renderedHtml);
                }
                
            });
            //request is not success
            rq.on(request.onerroreventkey, function (err) {
                console.log(err);
                //res.status(500).send(err);
                eventlauncher.error = true;
                eventlauncher.errormessage = err;
                eventlauncher.returnstatus = 500;
                eventlauncher.emit('search.error', err);
            });
            //request error access to api...
            rq.on('api.error', function (err) {
                console.log(err);
                eventlauncher.error = true;
                eventlauncher.errormessage = "Server too busy right now, sorry.";
                eventlauncher.returnstatus = 503;
                eventlauncher.emit('search.error', err);
            });
            //request timeout api not responding...
            rq.on('api.timeout', function (tout) {
                console.log(tout);
                eventlauncher.error = true;
                eventlauncher.errormessage = "Server too busy right now, sorry.";
                eventlauncher.returnstatus = 503;
                eventlauncher.emit('search.error', tout);
            });
             
        };
        
    });

}