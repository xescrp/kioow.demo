module.exports = function (app) {
    'use strict';
    //dependencies
    var utils = require('../utils');
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    var BRAND = settings.get('brand');

    app.get('/admin/programs', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Programs - ' + BRAND.domain,
            description: 'Programs List - ' + BRAND.domain,
            listname: 'products',
            collection: 'DMCProducts'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.productlist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/bookings', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Bookings - ' + BRAND.domain,
            description: 'Bookings List - ' + BRAND.domain,
            listname: 'bookings',
            collection: 'Bookings2'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.bookinglist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/budgets', function (req, res) {
        res.set('Content-Type', 'text/html');
         
        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Budgets - ' + BRAND.domain,
            description: 'Budgets List - ' + BRAND.domain,
            listname: 'budgets',
            collection: 'Bookings2'
        };
        _.extend(req.defaultcontent, homecontent);
        
        var tmpl = swig.compileFile(filepaths.admin.bookinglist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/billings', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Billings - ' + BRAND.domain,
            description: 'Billings List - ' + BRAND.domain,
            listname: 'billings',
            collection: 'Billing'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.billinglist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/dmcs', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'DMCs - ' + BRAND.domain,
            description: 'DMCs List - ' + BRAND.domain,
            listname: 'dmcs',
            collection: 'DMCs'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.dmclist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/queries', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'User Queries - ' + BRAND.domain,
            description: 'User Queries List - ' + BRAND.domain,
            listname: 'queries',
            collection: 'UserQueries'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.querylist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/quotes', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Quotes - ' + BRAND.domain,
            description: 'Quotes List - ' + BRAND.domain,
            listname: 'quotes',
            collection: 'Quotes'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.quotelist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/affiliates', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Affiliates - ' + BRAND.domain,
            description: 'Affiliates List - ' + BRAND.domain,
            listname: 'affiliates',
            collection: 'Affiliate'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.affiliatelist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/travelers', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Travelers - ' + BRAND.domain,
            description: 'Travelers List - ' + BRAND.domain,
            listname: 'travelers',
            collection: 'Travelers'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.travelerslist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
    app.get('/admin/hevents', function (req, res) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Events Traveler Sense - ' + BRAND.domain,
            description: 'Events Traveler Sense - ' + BRAND.domain,
            listname: 'hevents',
            collection: 'Hevents'
        };
        _.extend(req.defaultcontent, homecontent);

        var tmpl = swig.compileFile(filepaths.admin.heventslist);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
}