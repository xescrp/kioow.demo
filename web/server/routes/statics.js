module.exports = function (app) {
    'use strict';

    //dependencies
    var utils = require('../utils');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });

    // ========== Suppliers ===========
    app.get('/suppliers', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var content = {
            language: "en",
            title: "Suppliers - " + app.get('brand').name,
            description: "Online Booking Platform",
            canonicalurl: filepaths.rooturl + "/suppliers",
            url: filepaths.rooturl + "/suppliers",
            session: req.omtsession,
            navigationType: 'dmc'
        };
        var tmpl = swig.compileFile(filepaths.static.supplierlanding);
        var renderedHtml = tmpl(content);
        res.send(renderedHtml);
    });

    app.get('/suppliers-advantages', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var content = {
            language: "en",
            title: "Suppliers Advantages -" + app.get('brand').name,
            description: "Suppliers Advantages - Online Booking Platform",
            canonicalurl: filepaths.rooturl + "/suppliers-advantages",
            url: filepaths.rooturl + "/suppliers-advantages",
            session: req.omtsession,
            navigationType: 'dmc'
        };
        var tmpl = swig.compileFile(filepaths.static.supplieradvantages);
        var renderedHtml = tmpl(content);
        res.send(renderedHtml);
    });

    app.get('/statics/getfullstaticcontent', function (req, res) {
        res.set('Content-Type', 'application/json');
        res.send(
            {
                currency: common.staticdata.currencys,
                timezones: common.staticdata.timezones,
                bankcountries: common.staticdata.bankcountries,
                assistancelanguages: common.staticdata.assistancelanguages,
                paymentoptions: common.staticdata.paymentoptions
            });
    });

    app.get('/statics/getstaticcontent', function (req, res) {
        res.set('Content-Type', 'application/json');
        var what = req.query.contentkey;
        res.send(common.staticdata[what]);
    });

    // ========== GENERIC PAGE for DMC /pages/page-slug =================
    app.get('/page/:title?', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            canonicalurl: filepaths.rooturl + "/pagina/" + req.param("title"),
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            session: req.omtsession,
            navigationType: 'dmc',
            login: false,
            page: {}
        };

        var tmpl = swig.compileFile(filepaths.static.statictext);

        var data = { "page": req.param("title") };

        var auth = null;
        if (req.session.ytologin != null) {
            auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
        }

        utils._getContent(req, { "slug": req.params.title }, 'Page', auth, function (pages) {
            if (pages != null && pages.length > 0) {
                pagecontent.page = pages[0];
                if (pagecontent.page.Profile == "Client") {
                    pagecontent.navigationType = 'traveler';
                }
                if (pagecontent.page.Profile == "Affiliate") {
                    pagecontent.navigationType = 'affiliate';
                }
                pagecontent.title = pagecontent.page.title || pagecontent.title;
                pagecontent.page.specificTemplate && pagecontent.page.templateUrl != null ?
                    tmpl = swig.compileFile(filepaths.publicdirectory + '/' + pagecontent.page.templateUrl) : null;
                _.extend(req.defaultcontent, pagecontent);
                var renderedHtml = tmpl(req.defaultcontent);
                res.send(renderedHtml);
            } else {
                next();
            }

        });



    });


    // ========== FAQ CATEGORY / faq/cat ===========
    app.get('/pages/:cat?', function (req, res, next) {

        res.set('Content-Type', 'text/html');
        var pagcatcontent = {
            appversion: filepaths.appversion,
            title: "Categoria de Páginas",
            canonicalurl: "http://www.openmarket.travel/paginas/" + req.param("cat"),
            login: false,
            language: "es",
            pagcat: {},
            session: req.session.ytologin,
            navigationType: 'dmc',
            substring: utils._substring,
            getUrlCloudinary: utils._cloudinary_url,
        };
        var api = utils.api;
        var tmpl = swig.compileFile(filepaths.static.pagcat);
        var url = api + '/cms/getPages';
        var data = { "category": req.param("cat") };

        utils.http.Get(url, data, utils.headers, function (results) {
            if (results) {
                if (results.responseBody) {
                    pagcatcontent.pagcat = JSON.parse(results.responseBody);
                    pagcatcontent.pagcat = pagcatcontent.pagcat[0];
                    _.extend(req.defaultcontent, pagcatcontent);
                    var renderedHtml = tmpl(req.defaultcontent);
                    res.send(renderedHtml);
                }
                else {
                    console.log("An unknown error has ocurred in responseBody");
                    next();
                }
            }
            else {
                console.log("An unknown error has ocurred in results");
                next();
            }
        });

    });


    // ========== GENERIC PAGE for Affiliate/ pages/page-slug ===========
    app.get('/pagina/:title?', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            canonicalurl: filepaths.rooturl + "/pagina/" + req.param("title"),
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            session: req.omtsession,
            navigationType: 'affiliate',
            login: false,
            page: {}
        };
        
        var tmpl = swig.compileFile(filepaths.static.statictext);
        
        var data = { "page": req.param("title")};

        var auth = null;
        if (req.session.ytologin != null) {
            auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
        }

        utils._getContent(req, { "slug": req.params.title }, 'Page', auth, function (pages) {
            if (pages != null && pages.length > 0) {
                pagecontent.page = pages[0];
                if (pagecontent.page.Profile == "Client") {
                    pagecontent.navigationType = 'traveler';
                }
                if (pagecontent.page.Profile == "Affiliate") {
                    pagecontent.navigationType = 'affiliate';
                }
                pagecontent.title = pagecontent.page.title || pagecontent.title;
                pagecontent.page.specificTemplate && pagecontent.page.templateUrl != null ?
                    tmpl = swig.compileFile(filepaths.publicdirectory + '/' + pagecontent.page.templateUrl) : null;
                _.extend(req.defaultcontent, pagecontent);
                var renderedHtml = tmpl(req.defaultcontent);
                res.send(renderedHtml);
            } else {
                next();
            }

        });

       

    });


    // ========== FAQ CATEGORY / faq/cat ===========
    app.get('/paginas/:cat?', function (req, res, next) {
        // http://openmarketdev.cloudapp.net:3000/cms/getDmcFaqs?category=how-can-i-become-a-supplier
        res.set('Content-Type', 'text/html');
        var pagcatcontent = {
            appversion : filepaths.appversion,
            title: "Categoria de Páginas",
            canonicalurl: "http://www.openmarket.travel/paginas/"+req.param("cat"),
            login: false,
            language: "es",
            pagcat: {},
            session: req.session.ytologin,
            navigationType: 'dmc',
            substring: utils._substring,
            getUrlCloudinary: utils._cloudinary_url,
        };
        var api = utils.api;
        var tmpl = swig.compileFile(filepaths.static.pagcat);
        var url = api + '/cms/getPages';
        var data = { "category": req.param("cat")};

        utils.http.Get(url, data, utils.headers, function (results) {
            if (results) {
                if (results.responseBody) {
                    pagcatcontent.pagcat = JSON.parse(results.responseBody);
                    pagcatcontent.pagcat = pagcatcontent.pagcat[0];
                    _.extend(req.defaultcontent, pagcatcontent);
                    var renderedHtml = tmpl(req.defaultcontent);
                    res.send(renderedHtml);
                }
                else {
                    console.log("An unknown error has ocurred in responseBody");
                    next();
                }
            }
            else {
                console.log("An unknown error has ocurred in results");
                next();
            }
        });

    });

    // ========== CLIENT FORGOT 1 SEND / /reset-password ===========
    app.get('/reset-password', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "en",
            title: "Reset password",
            canonicalurl: "http://www.openmarket.travel/reset-password",
            session: req.session.ytologin,
            navigationType: 'dmc'
        };
        _.extend(req.defaultcontent, pagecontent);
        var tmpl = swig.compileFile(filepaths.static.clientforgotsend);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== DMC FORGOT 2 SENT / /enlace-contrasena-enviado ===========
    app.get('/password-link-sent', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "en",
            title: "Password Link Sent",
            canonicalurl: "http://www.openmarket.travel/password-link-sent",
            session: req.session.ytologin,
            navigationType: 'dmc'
        };
        _.extend(req.defaultcontent, pagecontent);
        var tmpl = swig.compileFile(filepaths.static.clientforgotsent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== DMC FORGOT 3 CHANGE / /new-password ===========
    app.get('/new-password', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "en",
            title: "New Password",
            canonicalurl: "http://www.openmarket.travel/new-password",
            session: req.session.ytologin,
            navigationType: 'dmc'
        };

        var url = utils.api + '/api/recoverAdminRequest';
        var data = { key: req.query.key };

        utils.http.Get(url, data, utils.headers, function (results) {

            var tmpl = swig.compileFile(filepaths.static.clientforgotchange);

            if (results) {
                if (results.responseBody) {
                    var rs = JSON.parse(results.responseBody);
                    if (rs.ResultOK) {
                        pagecontent.email = rs.Request.from;
                        // var renderedHtml = tmpl(pagecontent);
                        // res.end(renderedHtml);
                    }
                    else {
                        tmpl = swig.compileFile(filepaths.static.en.badrequest);
                        // var renderedHtml = tmpl(pagecontent);
                        // res.end(renderedHtml);
                    }
                } else {
                    tmpl = swig.compileFile(filepaths.static.en.badrequest);
                    // var renderedHtml = tmpl(pagecontent);
                    // res.end(renderedHtml);
                }
            } else {
                tmpl = swig.compileFile(filepaths.static.en.badrequest);
                // var renderedHtml = tmpl(pagecontent);
                // res.end(renderedHtml);
            }
            _.extend(req.defaultcontent, pagecontent);
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);
        });
    });

    // ========== CLIENT FORGOT 4 OK / /password-confirmed ===========
    app.get('/password-confirmed', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "en",
            title: "Password Confirmed",
            canonicalurl: "http://www.openmarket.travel/password-confirmed",
            session: req.session.ytologin,
            navigationType: 'dmc'
        };
        var tmpl = swig.compileFile(filepaths.static.clientforgotok);
        _.extend(req.defaultcontent, pagecontent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== Transactional emails tester ===========
    app.get('/te/:cat?/:title?', function (req, res, next) {

        res.set('Content-Type', 'text/html');
        var content = {
            
        };

        var myswig = new swig.Swig({ varControls: ['{{', '}}'] });

        var title = req.param("title") ? req.param("title") : '_index';
        var cat = req.param("cat") ? req.param("cat") + '/' : '';
        (cat == 'wl/' && !common.utils.stringIsNullOrEmpty(title) && title != '_index') ?
            title = ['templates', title, title].join('/') : null;
        var tmpl = myswig.compileFile([settings.get('mailing').templates, cat + title + '.html.swig'].join('/'));

        // ACCOUNT EMAILs
        // content = utils.readJsonFileSync("../public/datadummy/affiliate.json");

        // BOOKING & TAILORMADE EMAILs
        content = (cat != 'wl/') ?
            utils.readJsonFileSync(settings.get('publicdirectory') + '/datadummy/mail.json') :
            require(settings.get('publicdirectory') + '/datadummy/booking2');

        var contentmail = content;
        _.extend(req.defaultcontent, contentmail);
        var renderedHtml = tmpl(req.defaultcontent);

        res.send(renderedHtml);

    });

    app.get('/modal-contryselect-empty', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        setImmediate(function () {
            res.send('');
        });
    });
    
    app.get('/modal-contryselect', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var content = {
            allZonesCountries: [],
            sleepcity: [],
            sleepcountry: []
        };
        var request = {
            collectionname: 'DestinationCountriesZones',
            query: { _id: { $ne: null } },
            fields: '_id key slug label_en label_es title_en title_es sortOrder promotionArea colorBg iconImage mainImage',
            sortcondition: { sortOrder: 1 }
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {

            console.log('api rq -> done');
            content.allZonesCountries = result; 

            _.extend(req.defaultcontent, content);
            next();
        });

        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });

    app.get('/modal-contryselect', function (req, res, next) {
        
        var request = {
            collectionname: 'DMCProducts',
            query: { origin: { $ne: 'tailormade' }, publishState: { $in: ['published', 'published.noavail'] } },
            fields: 'sleepcountry',
            populate: [{ path: 'sleepcity', select: '_id slug label_en label_es countrycode' }, { path: 'sleepcountry', select: '_id slug label_en label_es' }]
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            _.each(result, function (prd) {
                //prd.sleepcity != null && prd.sleepcity.length > 0 ? _.each(prd.sleepcity, function (slcity) { req.defaultcontent.sleepcity.push(slcity.slug); }) : null;
                prd.sleepcountry != null && prd.sleepcountry.length > 0 ? _.each(prd.sleepcountry, function (slcountry) { req.defaultcontent.sleepcountry.push(slcountry.slug); }) : null;
            });
            //req.defaultcontent.sleepcity = _.uniq(req.defaultcontent.sleepcity);
            req.defaultcontent.sleepcountry = _.uniq(req.defaultcontent.sleepcountry);
            next();
        });

        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });

    app.get('/modal-contryselect', function (req, res, next) {

        var request = {
            collectionname: 'DestinationCountries',
            query: { $and: [{ _id: { $ne: null } }, { slug: { $in: req.defaultcontent.sleepcountry } }] },
            fields: '_id key slug label_en label_es title_en title_es state zone',
            populate: [
                { path: 'zone', select: '_id key slug label_en label_es', model: 'DestinationCountriesZones' }]
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            var tmpl = swig.compileFile(filepaths.static.modalcountryselect);
            console.log('api rq -> done');
            var ObjectID = require("mongodb").ObjectID;

            //req.defaultcontent.countriesid = _.map(req.defaultcontent.countriesid, function (id) { return ObjectID(id); });
            console.log(req.defaultcontent);
            console.log(result);
            _.each(req.defaultcontent.allZonesCountries, function (zone) {
                zone.countries = _.filter(result, function (ct) {
                    var prop = new String(ct._id).valueOf();
                    return (ct.zone != null && ct.zone.slug == zone.slug);
                });
                zone.countries = _.sortBy(zone.countries, function (ct) { return ct.label_es; });
            });
            //console.log(req.defaultcontent.allZonesCountries);
            //req.defaultcontent.allZonesCountries[0].countries = result;
            var renderedHtml = tmpl(req.defaultcontent);
            var fs = require('fs');
            fs.writeFile([app.get('publicdirectory'), 'partials/modals/generated/yto-modal-countryselect-generated.html.swig'].join('/'), renderedHtml, function (err) {
                err == null ? res.send(renderedHtml) :  next(new Error(err));
            });
            

        });

        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });

    app.get('/scheduledestinationsfiles', function (req, res, next) {
        var request = {
            interval: 500,
            schedulekeys: ['DESTINATIONS.FILES']
        };
        var rq = utils.apicall('schedule', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            setTimeout(function () {
                res.send({
                    ResultOK: true,
                    Messages: 'Los destinos se actualizaran en unos instantes'
                });
            }, 7000);
        });

        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });

    });

    app.get('/rebuilddestinationsjson', function (req, res, next) {
        req.defaultcontent.sleepcity = [];
        req.defaultcontent.sleepcountry = [];

        var request = {
            collectionname: 'DMCProducts',
            query: { origin: { $ne: 'tailormade' }, publishState: { $in: ['published', 'published.noavail'] } },
            fields: 'sleepcity sleepcountry',
            populate: [{ path: 'sleepcity', select: '_id slug label_en label_es countrycode' }, { path: 'sleepcountry', select: '_id slug label_en label_es' }]
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            _.each(result, function (prd) {
                prd.sleepcity != null && prd.sleepcity.length > 0 ? _.each(prd.sleepcity, function (slcity) { req.defaultcontent.sleepcity.push(slcity.slug); }) : null;
                prd.sleepcountry != null && prd.sleepcountry.length > 0 ? _.each(prd.sleepcountry, function (slcountry) { req.defaultcontent.sleepcountry.push(slcountry.slug); }) : null;
            });
            req.defaultcontent.sleepcity = _.uniq(req.defaultcontent.sleepcity);
            req.defaultcontent.sleepcountry = _.uniq(req.defaultcontent.sleepcountry);
            next();
        });

        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });

    app.get('/rebuilddestinationsjson', function (req, res, next) {
        req.defaultcontent.allcountries = [];
        req.defaultcontent.allcities = [];

        var request = {
            collectionname: 'DestinationCountries',
            query: { $and: [{ _id: { $ne: null } }, { slug: { $in: req.defaultcontent.sleepcountry } }] },
            fields: '_id key slug label_en label_es title_en title_es state zone location',
            populate: [
                { path: 'zone', select: '_id key slug label_en label_es', model: 'DestinationCountriesZones' }]
        };
        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);

        rq.on(request.oncompleteeventkey, function (result) {
            _.each(result, function (country) {
                var c = {
                    id: country._id.toString(),
                    name: country.label_en,
                    name_es: country.label_es,
                    countrycode: country.slug.toUpperCase(),
                    cities: [],
                    location: country.location
                };
                req.defaultcontent.allcountries.push(c);
            });
            next();
        });

        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });

    });

    app.get('/rebuilddestinationsjson', function (req, res, next) {
        var request = {
            collectionname: 'DestinationCities',
            query: { $and: [{ _id: { $ne: null } }, { slug: { $in: req.defaultcontent.sleepcity } }] },
            fields: '_id key slug label_en label_es countrycode country state location',
            populate: [
                { path: 'country', select: '_id key slug label_en label_es' }]
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            _.each(result, function (city) {
                var c = {
                    id: city._id.toString(),
                    city_en: city.label_en,
                    city_es: city.label_es,
                    slug: city.slug,
                    countrycode: city.countrycode,
                    country: city.country,
                    location: city.location
                };
                c.country != null ? req.defaultcontent.allcities.push(c) : null;
            });
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
    });

    app.get('/rebuilddestinationsjson', function (req, res, next) {
        var jsonfilecontent = [];
        //push all countries
        _.each(req.defaultcontent.allcountries, function (country) {
            var crnorm_es = {
                name: country.name_es,
                latinized: common.utils.accentsTidy(country.name_es),
                query: '&country=' + country.countrycode.toLowerCase(),
                location: {
                    fulladdress: country.name_es,
                    city: '',
                    country: country.name_es,
                    countrycode: country.countrycode,
                    countryid: country.id,
                    longitude: country.location.longitude,
                    latitude: country.location.latitude
                }
            };
            jsonfilecontent.push(crnorm_es);
        });
        //push all cities
        _.each(req.defaultcontent.allcities, function (city) {
            var name_es = city.city_es || city.city_en;
            var name_en = city.city_en;
            var ctnorm_es = {
                name: name_es + ", " + city.country.label_es,
                latinized: common.utils.accentsTidy(name_es + ", " + city.country.label_es),
                query: '&country=' + city.countrycode.toLowerCase() + '&cities=' + city.slug,
                location: {
                    fulladdress: common.utils.accentsTidy(name_es + ", " + city.country.label_es),
                    city: name_es,
                    country: city.country.label_es,
                    countrycode: city.countrycode,
                    countryid: city.country._id,
                    cityid: city.id,
                    longitude: city.location.longitude,
                    latitude: city.location.latitude
                }
            };
            jsonfilecontent.push(ctnorm_es);
        });

        var fs = require('fs');
        fs.writeFile([app.get('datadirectory'), 'data/productcountrieslatnorm_es.json'].join('/'), JSON.stringify(jsonfilecontent), function (err) {
            err == null ? res.send(jsonfilecontent) : next(new Error(err));
        });
        

    });

    // ========== CONTACTA /page/contacta ===========
    app.get('/contacta', function (req, res, next) {

        res.set('Content-Type', 'text/html');

        var pagecontent = {
            canonicalurl: filepaths.rooturl + "/contacta",
            session: req.omtsession,
            navigationType: 'affiliate',
            title: 'Contacta - ' + req.defaultcontent.brand.domain,
            description: 'Contacta - ' + req.defaultcontent.brand.domain,
        };
        _.extend(req.defaultcontent, pagecontent);
        var tmpl = swig.compileFile(filepaths.static.contacta);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });  

    // ========== GARANTÍAS / page/garantias ===========
    app.get('/garantias', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "es",
            title: "Garantías",
            canonicalurl: "http://www.openmarket.travel/garantias",
            session: req.session.ytologin,
            navigationType: 'traveler'
        };
        var tmpl = swig.compileFile(filepaths.static.es.garantias);
        _.extend(req.defaultcontent, pagecontent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== VENTAJAS / page/ventajas ===========
    app.get('/ventajas', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "es",
            title: "Ventajas",
            canonicalurl: "http://www.openmarket.travel/ventajas",
            session: req.session.ytologin,
            navigationType: 'traveler'
        };
        var tmpl = swig.compileFile(filepaths.static.es.ventajas);
        _.extend(req.defaultcontent, pagecontent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    

    // ========== ENCUENTRA TU VUELO / page/encuentra-tu-vuelo ===========
    app.get('/encuentra-tu-vuelo', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "es",
            title: "Encuentra tu vuelo",
            canonicalurl: "http://www.openmarket.travel/encuentra-tu-vuelo",
            session: req.session.ytologin,
            navigationType: 'traveler'
        };
        var tmpl = swig.compileFile(filepaths.static.es.encuentratuvuelo);
        _.extend(req.defaultcontent, pagecontent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== SEGUROS Y VISAS / page/seguros-y-visas ===========
    app.get('/seguros-y-visados', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            appversion : filepaths.appversion,
            language: "es",
            title: "Seguros y Visados",
            canonicalurl: "http://www.openmarket.travel/seguros-y-visados",
            session: req.session.ytologin,
            navigationType: 'traveler'
        };
        _.extend(req.defaultcontent, pagecontent);
        var tmpl = swig.compileFile(filepaths.static.es.segurosyvisados);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });


    // ========== CLIENT FORGOT 1 SEND / /cambiar-contrasena ===========
    app.get('/cambiar-contrasena', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            title: "Cambiar Contraseña"
        };
        _.extend(req.defaultcontent, pagecontent);
        var tmpl = swig.compileFile(filepaths.static.forgotsend);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== CLIENT FORGOT 2 SENT / /enlace-contrasena-enviado ===========
    app.get('/enlace-contrasena-enviado', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            title: "Enlace de Contraseña Enviado"
        };
        _.extend(req.defaultcontent, pagecontent);
        var tmpl = swig.compileFile(filepaths.static.forgotsent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });

    // ========== CLIENT FORGOT 3 CHANGE / /nueva-contrasena ===========
    app.get('/nueva-contrasena', function (req, res, next) {
        res.set('Content-Type', 'text/html');

        var pagecontent = {
            title: "Nueva Contraseña"
        };

        var tmpl = swig.compileFile(filepaths.static.forgotchange);

        var request = {
            collectionname: 'OMTAdminRequests',
            query: {
                'key': req.query.key
            }
        };
        var command = 'findone';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';

        var rqCMD = {
            command: command,
            request: request,
            service: 'core',
        };
        console.log('request ', request);

        var rq = req.ytoconnector.send(rqCMD);

        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            if (result != null) {
                
                tmpl = swig.compileFile(filepaths.static.forgotchange);
                pagecontent.email = result.from;
            } else {
                tmpl = swig.compileFile(filepaths.static.badrequest);
            }
            _.extend(req.defaultcontent, pagecontent);
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);

        });
        //request is not success
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        //request error access to api...
        rq.on('api.error', function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(503).send(tout);
        });

    });

    // ========== CLIENT FORGOT 4 OK / /contrasena-confirmada ===========
    app.get('/contrasena-confirmada', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var pagecontent = {
            title: "Contraseña Confirmada"
        };
        var tmpl = swig.compileFile(filepaths.static.forgotok);
        _.extend(req.defaultcontent, pagecontent);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });


    app.get('/clear-template-cache', function (req, res, next) {
        swig.invalidateCache();
        console.log ('cache cleaned');
        res.send('cache cleaned');
    });

    app.get('/test/:test?', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var content = {
            test : req.params.test,
            language: "es",
            title: "prueba wl",
            session: req.session.ytologin,
            navigationType: 'traveler'
        };
        var tmpl = swig.compileFile(filepaths.test);
        var renderedHtml = tmpl(content);
        res.send(renderedHtml);
    });


    // ========== GENERIC PAGE / pages/page-slug ===========
    app.get('/paginaswl/:slug?', function (req, res, next) {

        res.set('Content-Type', 'text/html');
        var pagecontent = {
            login: false,
            canonicalurl: filepaths.rooturl + "/page/"+req.params.slug,
            language: "en",
            page: {},
            session: req.session.ytologin,
            navigationType: 'dmc'
        };

        var tmpl = swig.compileFile(filepaths.static.statictext);
        var auth = null;
        if (app.locals.ytologin != null) {
            auth = {
                userid: app.locals.ytologin.user._id,
                accessToken: app.locals.ytologin.accessToken
            };
        }

        utils._getContent(req, { "slug": req.params.slug}, 'Page', auth, function(pages){
            if (pages != null && pages.length > 0){
                pagecontent.page = pages[0];
                if(pagecontent.page.Profile == "Client"){
                    pagecontent.navigationType = 'traveler';
                }
                pagecontent.title = pagecontent.page.title;
                _.extend(req.defaultcontent, pagecontent);
                var renderedHtml = tmpl(req.defaultcontent);
                res.send(renderedHtml);
            }else{
                next();
            }

        });

    });

    // ========== PDF PARTIALS ===================

    app.get('/pdfPartial', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        // console.log ('******************** req.query',req.query);
        // console.log ('******************** req.query.page',req.query.page);

        var partValue = req.query.part.toString();
        var nameValue = req.query.name;
        var phoneValue = req.query.phone;
        var webValue = req.query.web;
        var logoValue = req.query.logo;
        var addressValue = req.query.address;
        var cpValue = req.query.cp;
        var cityValue = req.query.city;
        var titleValue = req.query.tit;
        var categoryValue = req.query.cat;
        var page = req.query.page;
        var topage = req.query.topage;

        // 1)  rescatar el swig (header o footer) 
        var tmpl = swig.compileFile(filepaths.affiliate.pdfHeader);
        if (partValue == 'footer') {
            tmpl = swig.compileFile(filepaths.affiliate.pdfFooter);
            //console.log ('******************** footer');
        } else {
            //console.log ('******************** header');
        }

        var content = {
            navigationType: 'affiliate',
            name: nameValue,
            phone: phoneValue,
            web: webValue,
            date: new Date(),
            logo: logoValue,
            address: addressValue,
            cp: cpValue,
            city: cityValue,
            title: titleValue,
            topage: topage,
            page: page,
            category: categoryValue,
            language: "es",
        };
        _.extend(req.defaultcontent, content);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);

    });

    app.get('/pdfPartialContract', function (req, res, next) {
        res.set('Content-Type', 'text/html');

        var partValue = req.query.part.toString();
        var bookingIdValue = req.query.bookingId;
        var page = req.query.page;
        var topage = req.query.topage;

        // 1)  rescatar el swig (header o footer) 
        var tmpl = swig.compileFile(filepaths.affiliate.pdfHeaderContract);
        if (partValue == 'footer') {
            tmpl = swig.compileFile(filepaths.affiliate.pdfFooterContract);
            console.log("*********** es footer");
        }

        var content = {
            navigationType: 'affiliate',
            language: "es",
            topage: topage,
            page: page,
            date: new Date(),
            bookingId: bookingIdValue
        };
        _.extend(req.defaultcontent, content);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);

    });
};
