module.exports = function (app) {

    //dependencies
    var utils = require('../utils');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    
    // ========== FAQS / faqs ===========
    app.get('/faqs', function (req, res, next) {
        
        res.set('Content-Type', 'text/html');
        
        var faqscontent = {
            canonicalurl:   filepaths.rooturl + utils._getUrlBrand(req.route.path),
            url:            filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate',
            title:          'FAQs - ' + req.defaultcontent.brand.domain,
            description :   'FAQs - ' + req.defaultcontent.brand.domain,
            faqs: {}
        };
        var command = 'find';
        var request = {
            query: { slug: { $ne: null } ,state: 'published'  },
            populate: [{ path: 'categories', model: 'Affiliate FAQ Category' }],
            sortcondition: { slug: 1 },
            collectionname: 'Affiliate FAQs'
        }
        var tmpl = swig.compileFile(filepaths.faqs.faqs);
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            
            faqscontent.faqs = [];
            var cats = { };
            _.each(result, function(faq){
                _.each(faq.categories, function(cat){
                    cats[cat.slug] != null ? cats[cat.slug].faq.push(faq) : 
                    cats[cat.slug] = { cat: { name: cat.name, slug: cat.slug }, faq: [faq] };
                });
            });
            console.log(cats);
            for(var prop in cats){ faqscontent.faqs.push(cats[prop]); }
            _.extend(req.defaultcontent, faqscontent);
            console.log(faqscontent.faqs);
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
            //res.status(503).send("Server too busy right now, sorry.");
            res.status(500).send(err);
        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(503).send(tout);
        });
    });
    
    // ========== FAQ TO FAQS REDIRECTION / faq ===========
    app.get('/faq', function(req, res) {
        res.redirect('/faqs');
    });


    // ========== FAQ / faq/slug ===========
    app.get('/faq/:slug?', function (req, res, next) {
        
        res.set('Content-Type', 'text/html');
        
        var faqcontent = {
            canonicalurl:       filepaths.rooturl+"/faqs/"+req.param("slug"),
            navigationType:     'affiliate',
            title:              'FAQ - ' + req.defaultcontent.brand.domain,
            description :       'FAQ - ' + req.defaultcontent.brand.domain,
            login:              false,
            faq:                {}
        };

        var command = 'findone';
        var request = {
            query: { slug: req.params.slug, state: 'published' },
            populate: [{ path: 'categories', model: 'Affiliate FAQ Category' }],
            collectionname: 'Affiliate FAQs'
        };
        var tmpl = swig.compileFile(filepaths.faqs.faq);
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            //console.log(result);
            faqcontent.faq = result;
            _.extend(req.defaultcontent, faqcontent);
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
            //res.status(503).send("Server too busy right now, sorry.");
            res.status(500).send(err);
        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(503).send(tout);
        });

    });

    // ========== FAQ CATEGORY / faq/cat ===========
    app.get('/faqs/:cat?', function (req, res, next) {

        res.set('Content-Type', 'text/html');

        var faqcatcontent = {
            canonicalurl:   filepaths.rooturl + "/faqs/" + req.params.cat,
            url:            filepaths.rooturl + utils._getUrlBrand(req.route.path),
            navigationType: 'affiliate',
            title:          'FAQs - ' + req.defaultcontent.brand.domain,
            login:          false,
            faqcat:         {}
        };

        var command = 'findone';
        var request = {
            query: { slug:  req.params.cat },
            sortcondition: { name: 1 },
            collectionname: 'Affiliate FAQ Category'
        }
        var tmpl = swig.compileFile(filepaths.faqs.faqcat);
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            //console.log(result);
            faqcatcontent.faqcat = { id: result._id, cat: { name: result.name, slug: result.slug }, faq: [] };
            _.extend(req.defaultcontent, faqcatcontent);
            next();
        });
        //request is not success
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
            res.status(503).send(tout);
        });
    });

    app.get('/faqs/:cat?', function (req, res, next) {
        var command = 'find';
        var request = {
            query: { state: 'published' },
            sortcondition: { slug: 1 },
            collectionname: 'Affiliate FAQs'
        }
        var tmpl = swig.compileFile(filepaths.faqs.faqcat);
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        console.log(request);
        rq.on(request.oncompleteeventkey, function (result) {
            req.defaultcontent.faqcat.faq = _.filter(result, function(faq){
                return faq.categories[0].toString() == req.defaultcontent.faqcat.id.toString();
            });
            
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
            //res.status(503).send("Server too busy right now, sorry.");
            res.status(500).send(err);
        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(503).send(tout);
        });

    })

    // ========== FAQ SEARCH / faq/ ===========
    app.get('/faqs/search/:search?', function (req, res, next) {
        // http://openmarketdev.cloudapp.net:3000/cms/getDmcFaqs?category=how-can-i-become-a-supplier
        res.set('Content-Type', 'text/html');
        var faqsearchcontent = {
            canonicalurl:   filepaths.rooturl+"/faqs",
            url: filepaths.rooturl + utils._getUrlBrand(req.route.path),
            title: 'FAQs - ' + req.defaultcontent.brand.domain,
            description: 'FAQs - ' + req.defaultcontent.brand.domain,
            login:          false,
            faqsearch:      {},
            search:         req.param("search"),
            navigationType: 'affiliate'
        };



        var command = 'find';
        var request = {
            query: { title: req.params.search, "content.brief": req.params.search, "content.extended": req.params.search },
            populate: [{ path: 'categories', model: 'Affiliate FAQ Category' }],
            sortcondition: { slug: 1 },
            collectionname: 'Affiliate FAQs',
            visitor: 'like'
        }
        var tmpl = swig.compileFile(filepaths.faqs.faqs);
        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        //request success
        rq.on(request.oncompleteeventkey, function (result) {

            faqsearchcontent.faqsearch = [];
            var cats = {};

            faqsearchcontent.faqsearch = result;
            _.extend(req.defaultcontent, faqsearchcontent);
            console.log(faqsearchcontent.faqsearch);
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
            //res.status(503).send("Server too busy right now, sorry.");
            res.status(500).send(err);
        });
        //request timeout api not responding...
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(503).send(tout);
        });
       
    });


};
