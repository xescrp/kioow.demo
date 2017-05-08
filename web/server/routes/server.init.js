module.exports = function (app) {
    'use strict';
    //dependencies
    var utils = require('../utils');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    var cloudinary = require('cloudinary');
    settings.env().file({ file: filepaths.configurationfile });
    var BRAND = settings.get('brand');
    var currencies = require('../utils/currencies');
    console.log('Web server warming up... ');
    console.log('Loading brand... ');
    console.log(BRAND);
    //full index control

    app.all('*', function (req, res, next) {

        var nconf = require('nconf');
        nconf.env().file({ file: filepaths.configurationfile });

        var maintain = nconf.get('maintenance');
        if (maintain == 'true') {
            res.status(503);
            var tmpl = swig.compileFile(filepaths.static.maintenance);
            var html = tmpl();
            res.send(html);
        }
        else {
            if (req.method == 'OPTIONS') {
                console.log('options method... lets pass...');
                res.send(200);
            }
            else {
                next();
            }
        }

    });

    app.all('*', function (req, res, next) {
        req.defaultcontent = {
            brand: BRAND,
            prefix: 'admin',
            dateseed: new Date(),
            brandprefix: app.get('ytoapiconfig').brandprefix,
            css: app.get('ytoapiconfig').css,
            footerprefix: app.get('ytoapiconfig')['footer-prefix'],
            appversion: app.get('appversion'),
            appseed: [app.get('appversion'), new Date().toISOString()],
            session: req.omtsession,
            navigationType: req.omtsession != null && req.omtsession.user != null ? req.omtsession.user.rolename : 'affiliate',
            googlePlusApi: filepaths.googlePlusApi,
            facebookAppId: filepaths.facebookAppId,
            loginsession: req.omtsession,
            title: 'Gestiona tus viajes como un TTOO - ' + BRAND.domain,
            description: 'Gestiona tus viajes como un TTOO - ' + BRAND.domain,
            metadescription: BRAND.domain,
            metaimage: utils._getAbsUrl(req) + '/img/brand/logo.png',
            name: BRAND.domain,
            substring: utils._substring,
            addNumSeps: utils._addNumSeps,
            currencies: currencies,
            sliceText: utils._sliceText,
            getUrlCloudinary: utils._cloudinary_url,
            cloudinary: cloudinary,
            isWhiteLabel: false,
            adminrevision: false,
            sessionswitcher: req.session.sessionswitcher != null ?
                {
                    enabled: req.session.sessionswitcher.enabled,
                    candidate: req.session.sessionswitcher.switchcandidate,
                    redirectto: req.session.sessionswitcher.redirectto,
                    active: req.session.sessionswitcher.activated
                } : null,
            currentcurrency: req.session.currentcurrency || 'EUR',
            exchanges: app.locals.exchange
        };
        next();
    });

    console.log('Server initialization done...');
}