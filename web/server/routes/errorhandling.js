module.exports = function (app) {
    'use strict';
    //dependencies
    var utils = require('../utils');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var _ = require('underscore');
    var common = require('yourttoo.common');

    app.get('/testerrorroutes', function (req, res) {
        res.send('Test ok!');
    });

    app.use(function (req, res, next) {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {

            var errorcontent = {
                session: req.session.ytologin,
                navigationType: 'traveler'
            };
            _.extend(req.defaultcontent, errorcontent);
            var tmpl = swig.compileFile(filepaths.static.error404);
            var renderedHtml = tmpl(req.defaultcontent);
            res.send(renderedHtml);
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });

    app.get('/404', function (req, res, next) {
        next();
    });

    // ========== 403 ===========
    app.get('/403', function (req, res, next) {
        var err = new Error('not allowed!');
        err.status = 403;
        next(err);
    });

    // ========== 500 ===========
    app.get('/500', function (req, res, next) {
        next(new Error('keyboard cat!'));
    });

    console.log('loading error handling routes.. [OK]');
};
