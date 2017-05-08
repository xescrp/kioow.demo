module.exports = function (app) {

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

    app.get('/suppliers-signup/:lang?', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var lang = req.params.lang;
        var content = {
            language: lang,
            title: "Suppliers sign up",
            description: "Suppliers sign up - Online Booking Platform",
            canonicalurl: filepaths.rooturl + "/suppliers-signup",
            url: filepaths.rooturl + "/suppliers-signup",
            navigationType: 'dmc',
            bc: [
                { url: "/", label: "Home" },
                { url: "/suppliers", label: "Suppliers" },
                { url: "", label: "Suppliers Signup" }
            ],
            serverTripTags: {}
        };

        var tmpl = swig.compileFile(filepaths.provider.supplierssignup);

        switch (lang) {
            case 'es':
                content.title = "Registro de Proveedores";
                content.description = "Registro de Proveedores - Plataforma de Reservas Online";
                content.canonicalurl = filepaths.rooturl + "/suppliers-signup/es";
                content.url = filepaths.rooturl + "/suppliers-signup/es";
                content.navigationType = 'traveler';
                content.bc = [
                    { url: "/", label: "Inicio" },
                    { url: "", label: "Registro de Proveedores" }
                ];
                break;
        }

        var url = utils.api + '/cms/gettriptags';
        var data = {};
        _.extend(req.defaultcontent, content);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
        
    });

    app.get('/suppliers-thanks/:lang?', function (req, res, next) {
        res.set('Content-Type', 'text/html');
        var lang = req.params.lang;

        var content = {
            language: lang,
            title: "Suppliers confirmation sign up",
            description: "Suppliers sign up - thanks for register - Online Booking Platform",
            canonicalurl: filepaths.rooturl + "/suppliers-thanks",
            url: filepaths.rooturl + "/suppliers-thanks",
            navigationType: 'dmc'
        };

        switch (lang) {
            case 'es':
                content.title = "Confirmación Registro de Proveedores";
                content.description = "Confirmación Registro de Proveedores - Plataforma de Reservas Online";
                content.canonicalurl = filepaths.rooturl + '/suppliers-thanks/es';
                content.url = filepaths.rooturl + '/suppliers-thanks/es';
                content.navigationType = 'traveler';
                content.bc = [
                    { url: "/", label: "Inicio" },
                    { url: "", label: "Confirmación Registro de Proveedores" }
                ];
                break;
        }

        var tmpl = swig.compileFile(filepaths.provider.suppliersthanks);
        _.extend(req.defaultcontent, content);
        var renderedHtml = tmpl(req.defaultcontent);
        res.send(renderedHtml);
    });
}