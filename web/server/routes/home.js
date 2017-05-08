module.exports = function (app) {
    'use strict';
    //dependencies
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    var BRAND = settings.get('brand');

    // ========== HOME / affiliate-home
    app.get('/', function (req, res, next) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Gestiona tus viajes como un TTOO - ' + req.defaultcontent.brand.domain,
            description: 'Gestiona tus viajes como un TTOO - ' + req.defaultcontent.brand.domain
        };
        _.extend(req.defaultcontent, homecontent);
        console.log('on affiliate home...');
        var tmpl = swig.compileFile(filepaths.affiliate.home);
        var renderedHtml = tmpl(req.defaultcontent);
        req.defaultcontent.loginsession != null && req.defaultcontent.loginsession.user != null ?
            res.redirect('/home') : res.send(renderedHtml);
    });

    app.homerender = function (req, res, next) {
        res.set('Content-Type', 'text/html');

        var homecontent = {
            url: filepaths.rooturl + '/',
            title: 'Gestiona tus viajes como un TTOO - ' + BRAND.domain,
            description: 'Gestiona tus viajes como un TTOO - ' + BRAND.domain
        };
        console.log(req.defaultcontent);
        _.extend(req.defaultcontent, homecontent);
        console.log('on a logged home...');
        var tmpl = swig.compileFile(filepaths.admin.home);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    }

    app.get('/inicio', app.homerender);
    app.get('/home', app.homerender);
}