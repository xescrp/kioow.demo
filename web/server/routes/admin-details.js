
module.exports = function (app) {
    'use strict';
    //dependencies
    var utils = require('../utils');
    var _blanks = require('../utils/_blanks');

    var common = require('yourttoo.common');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    var BRAND = settings.get('brand');

    app.get('/edit/locations', function (req, res, next) {
        req.editcontent = {
            language: "en",
            title: "Destinations review/management - yourttoo",
            description: "Online Booking Platform",
            url: "http://www.yourttoo.com",
            editdata: null,
            edittemplatefile: filepaths.admindetails.destiny,
            editioname: 'destinations'
        };
        
        req.editcontent.adminrevision = req.session.ytologin.user.isAdmin;
        req.editcontent.adminrevision == null ? req.editcontent.adminrevision = false : null;

        var request = {
            collectionname: 'DestinationCountriesZones',
            query: { _id: { $ne: null } },
            fields: '_id key slug label_en label_es title_en title_es sortOrder promotionArea colorBg iconImage mainImage'
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            req.editcontent.editdata = { zones: result };
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

    app.get('/edit/locations', function (req, res, next) {
        var request = {
            collectionname: 'DestinationCountries',
            query: { _id: { $ne: null } },
            fields: '_id key slug label_en label_es title_en title_es state description_es zone description_en location.latitude location.longitude mainImage',
            populate: [
                { path: 'zone', select: '_id key slug label_en label_es' }]
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            req.editcontent.editdata.countries = result;
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

    app.get('/edit/locations', function (req, res, next) {
        var request = {
            collectionname: 'DestinationCities',
            query: { _id: { $ne: null } },
            fields: '_id key slug label_en label_es countrycode country state location.latitude location.longitude mainImage',
            populate: [
                { path: 'country', select: '_id key slug label_en label_es' }]
        };

        var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);
        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            req.editcontent.editdata.cities = result;
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

    app.get('/edit/booking', function (req, res, next) {
        req.editcontent = {
            language: "en",
            title: "Booking review/management - yourttoo",
            description: "Online Booking Platform",
            url: "http://www.yourttoo.com",
            editdata: null,
            dmcdata: null,
            edittemplatefile: filepaths.admindetails.booking,
            editioname: 'booking'
        }
        
        var code = req.query.code;

        req.editcontent.adminrevision = req.session.ytologin.user.isAdmin;
        req.editcontent.adminrevision == null ? req.editcontent.adminrevision = false : null;

        console.log('fetch data -> ' + code);
        code != null && code != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: 'Bookings2',
                    query: { idBooking: code },
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
                    req.editcontent.editdata = result;
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
                req.editcontent.editdata = _blanks.booking;
                next();
            });
    });

    app.get('/edit/request', function (req, res, next) {
        req.editcontent = {
            language: "en",
            title: "Tailor made review/management - yourttoo",
            description: "Online Booking Platform",
            url: "http://www.yourttoo.com",
            editdata: null,
            dmcdata: null,
            edittemplatefile: filepaths.admindetails.request,
            editioname: 'request',
            blankdata: _blanks.program
        }

        var code = req.query.code;

        req.editcontent.adminrevision = req.session.ytologin.user.isAdmin;
        req.editcontent.adminrevision == null ? req.editcontent.adminrevision = false : null;

        var quotematch = req.session.ytologin.user.isDMC ? { dmccode: req.session.ytologin.dmc.code } : null;
        quotematch = req.session.ytologin.user.isAffiliate ? { status: 'published' } : quotematch;
        var dmcmatch = req.session.ytologin.user.isDMC ? { code: req.session.ytologin.dmc.code } : null;

        console.log('fetch data -> ' + code);
        code != null && code != '' ?
            setImmediate(function () {
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
                            }, { path: 'booking' }, { path: 'dmc'}]
                        },
                        { path: 'dmcs', match: dmcmatch }, { path: 'traveler' },
                        { path: 'affiliate' }, { path: 'chats' }, { path: 'booking' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    req.editcontent.editdata = result;
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
                req.editcontent.editdata = _blanks.booking;
                next();
            });
    });

    app.get('/edit/program', function (req, res, next) {
        req.editcontent = {
            language: "en",
            title: "Program Edition from Suppliers - yourttoo",
            description: "Online Booking Platform",
            url: "http://www.yourttoo.com/suppliers",
            editdata: null,
            dmcdata: null,
            edittemplatefile: filepaths.admindetails.program,
            editioname: 'program'
        };

        var code = req.query.code;
        var dmccode = req.query.dmccode;
        var copyprogram = req.query.copyprogram || null;
        code = copyprogram || code;

        req.editcontent.adminrevision = req.session.ytologin.user.isAdmin;
        req.editcontent.adminrevision == null ? req.editcontent.adminrevision = false : null;
        req.editcontent.isacopy = (copyprogram != null && copyprogram != ''); 

        console.log('fetch data -> ' + code);
        code != null && code != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: 'DMCProducts',
                    query: { code: code },
                    populate: [
                        { path: 'dmc' },
                        { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    copyprogram != null && copyprogram != '' ? (
                        result.code = null,
                        result.name = 'New Program' + new Date(),
                        result.productvalid = false,
                        result.publishState = 'draft',
                        result.name = req.query.saveas,
                        delete result['prices'],
                        delete result['createdOn'],
                        delete result['updatedOn'],
                        delete result['_id'],
                        result.availability = _blanks.program.availability
                    ): null;
                    req.editcontent.editdata = result;
                    req.editcontent.dmcdata = result.dmc;
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
                var request = {
                    collectionname: 'DMCs',
                    query: { code: dmccode },
                    populate: [{ path: 'user' }]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done'); 
                    req.editcontent.dmcdata = result;
                    req.editcontent.editdata = _blanks.program;
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
    });

    app.get('/edit/program', function (req, res, next) {
        //get all the family for the product
        req.editcontent.editdata != null && (!common.utils.stringIsNullOrEmpty(req.editcontent.editdata.code) || !common.utils.stringIsNullOrEmpty(req.query.copyprogram)) ?
            setImmediate(function () {
                var request = {
                    collectionname: 'DMCProducts',
                    query: {
                        $and: [
                            { code: { $ne: req.editcontent.editdata.code || req.query.copyprogram } },
                            { parent: req.editcontent.editdata.parent || req.editcontent.editdata.code || req.query.copyprogram }]
                    },
                    populate: [
                        { path: 'dmc' },
                        { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' }, { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }]
                };
                //api call
                console.log('query get related...');
                console.log(JSON.stringify(request));
                var rq = utils.apicall('find', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    var parentone = null;
                    var copycurrent = null;
                    var includethecurrent = true;

                    if (result != null && result.length > 0) {
                        //check the first fetched program is the parent
                        req.editcontent.editdata.parent == null ?
                            (
                                //is the parent one
                                req.editcontent.editdata.relatedprograms = result
                            ) :
                            (
                                //find the parent one
                                parentone = _.find(result, function (related) {
                                    return related.parent == null;
                                }),
                                //copy the current fetched
                                copycurrent = JSON.parse(JSON.stringify(req.editcontent.editdata)),
                                parentone == null ? (parentone = copycurrent, parentone.code = parentone.code || req.query.copyprogram, includethecurrent = false) : null,
                                parentone.relatedprograms = _.filter(result, function (rel) { return rel.code != parentone.code; }),
                                includethecurrent ? parentone.relatedprograms.push(copycurrent) : null,
                                //set the main return results
                                req.editcontent.editdata = parentone
                            );
                        req.editcontent.isacopy ? delete req.editcontent.editdata['code'] : null,
                            req.editcontent.isacopy ? _.each(req.editcontent.editdata.relatedprograms, function (pr) {
                                delete pr['_id'];
                                delete pr['code'];
                                delete pr['prices'];
                                delete pr['parent'];
                                delete pr['createdOn'];
                                delete pr['updatedOn'];
                                pr.publishState = 'draft';
                                pr.availability = _blanks.program.availability;
                            }) : null;

                    }
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
                console.log('unreachable related programs...');
                next();
            });
    });

    app.get('/edit/account', function (req, res, next) {
        res.set('Content-Type', 'text/html');

        req.editcontent = {
            brand: BRAND,
            canonicalurl: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate',
            title: 'Cuenta de Agencia -  ' + BRAND.domain,
            description: 'Gestión y configuración de cuenta de Agencia',
            bc: [
                { url: '/home', label: 'Inicio' },
                { url: '', label: 'Configuración de cuenta' }
            ],
            editdata: null,
            edittemplatefile: filepaths.admindetails.account,
            editioname: 'account',
            editaccountusertype: '',
            adminrevision: false
        };

        var colls = {
            affiliate: 'Affiliate', dmc: 'DMCs',
        };

        var codequery = req.query.code;
        var usertypequery = req.query.usertype;

        req.editcontent.adminrevision = req.session.ytologin.user.isAdmin;
        req.editcontent.adminrevision == null ? req.editcontent.adminrevision = false : null;

        var code = codequery || req.session.ytologin.user.code;
        var usertype = usertypequery || req.session.ytologin.user.rolename;
        req.editcontent.editaccountusertype = usertype;

        console.log('fetch data -> ' + code);
        console.log('usertype -> ' + usertype);
        code != null && code != '' && usertype != null && usertype != '' ?
            setImmediate(function () {
                var request = {
                    collectionname: colls[usertype],
                    query: { code: code },
                    populate: [
                        { path: 'user' }, { path: 'wlcustom' }, { path: 'admin'}]
                };
                //api call
                var rq = utils.apicall('findone', request, req.session, req.ytoconnector, req);

                rq.on(request.oncompleteeventkey, function (result) {
                    console.log('api rq -> done');
                    req.editcontent.editdata = result;
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
                return next(new Error('Account edition not allowed for this user'));
            });
    });

    app.get('/edit/programs', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        req.editcontent = {
            language: "en",
            title: "Program Edition from Admin - yourttoo",
            description: "Online Booking Platform",
            url: "http://www.yourttoo.com/edit-programs",
            editdata: null,
            dmcdata: null,
            edittemplatefile: filepaths.admindetails.program,
            editioname: 'programs-load',
            blankdata: _blanks.program
        };

        next();

    });

    app.get('/edit/*', function (req, res) {
        _.extend(req.defaultcontent, req.editcontent);
        req.defaultcontent.editdata != null && req.defaultcontent.editdata.affiliate != null ? req.defaultcontent.sessionswitcher.candidate = req.defaultcontent.editdata.affiliate : null;
        var tmpl = swig.compileFile(req.editcontent.edittemplatefile);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);

    });

}
