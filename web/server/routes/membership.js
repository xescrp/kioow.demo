module.exports = function(app){

    var utils = require('../utils');
    var _blanks = require('../utils/_blanks');

    var common = require('yourttoo.common');
    var _ = require('underscore');
    var filepaths = require('./diskfilepaths').filepaths;
    var swig = require('swig');
    var settings = require('nconf');
    settings.env().file({ file: filepaths.configurationfile });
    var BRAND = settings.get('brand');

   app.get('/signup', function (req, res, next) {
		
		res.set('Content-Type', 'text/html');
		
		var content = {
			brand:          BRAND,
			canonicalurl:   filepaths.rooturl + utils._getUrlBrand(req.route.path),
			url:            filepaths.rooturl + utils._getUrlBrand(req.route.path),
			session:        req.omtsession,
			navigationType: 'affiliate',
			title:          'Registro de Agencias - ' + BRAND.domain,
			description :   'Regístrese como una Agencia - ' + BRAND.domain + ' - Gestione sus viajes como un touroperador',
			bc: [
				{ url: '/', label: 'Inicio' },
				{ url: '',  label: 'Registro de Agencias' }
			]
		};

        _.extend(req.defaultcontent, content);
		var tmpl = swig.compileFile(filepaths.affiliate.signup);
		var renderedHtml = tmpl(req.defaultcontent);

		res.send(renderedHtml);

	});
	// URL alternativa /signup
	app.get('/registro', function (req, res, next) {
		
		res.set('Content-Type', 'text/html');
		
		var content = {
			brand:          BRAND,
			canonicalurl:   filepaths.rooturl + utils._getUrlBrand(req.route.path),
			url:            filepaths.rooturl + utils._getUrlBrand(req.route.path),
			session:        req.omtsession,
			navigationType: 'affiliate',
			title:          'Registro de Agencias - ' + BRAND.domain,
			description :   'Regístrese como una Agencia - ' + BRAND.domain + ' - Gestione sus viajes como un touroperador',
			bc: [
				{ url: '/', label: 'Inicio' },
				{ url: '',  label: 'Registro de Agencias' }
			]
		};

        _.extend(req.defaultcontent, content);
		var tmpl = swig.compileFile(filepaths.affiliate.signup);
		var renderedHtml = tmpl(req.defaultcontent);

		res.send(renderedHtml);

	});


	// registro completo de afiliado

	app.get('/thanks', function (req, res, next) {
		
		res.set('Content-Type', 'text/html');

		var content = {
			brand:          BRAND,
			canonicalurl:   filepaths.rooturl + utils._getUrlBrand(req.route.path),
			url:            filepaths.rooturl + utils._getUrlBrand(req.route.path),
			session:        req.omtsession,
			navigationType: 'affiliate',
			title:          'Confirmación de registro de Agencia - ' + BRAND.domain,
			description :   'Gracias por registrarse'
		};

        _.extend(req.defaultcontent, content);
		var tmpl = swig.compileFile(filepaths.affiliate.signupthanks);
		var renderedHtml = tmpl(req.defaultcontent);

		res.send(renderedHtml);

	});

    app.get('/receptivo/:dmccode?/:dmcname?', function (req, res, next) {
		res.set('Content-Type', 'text/html');

		var dmcprofilecontent = {
			canonicalurl:   	filepaths.rooturl + utils._getUrlBrand(req.route.path),
			url:            	filepaths.rooturl + utils._getUrlBrand(req.route.path),
			navigationType: 	'affiliate',
			title:              "Receptivo - yourttoo.com",
			description:        "Tu herramienta para los viajes multidays ONLINE y A MEDIDA",
			metaimage : 		utils._getAbsUrl(req)+'/img/brand/logo.png',
			dmc: 				{},
		};

		var tmpl = swig.compileFile(filepaths.affiliate.dmcprofile);
		var request = {
            collectionname : 'DMCs',
            query : {
                'code' : req.params.dmccode,
                'membership.registervalid' : true
            }
        };
        console.log ('request ',request);
        var command = 'findone';
        request.environment = 'yourtoo';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';

        var rq = utils.apicall(command, request, req.session, req.ytoconnector, req);
        //var rq = req.ytoconnector.send(rqCMD);

        //request success
        rq.on(request.oncompleteeventkey, function (result) {
            //console.log(result);
            if (result != null){
                _showDMC(result);
            } else {
                next();
            }            
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


		var _showDMC = function(dmc){
			dmcprofilecontent.dmc = dmc;
			var dmcwebsite = dmcprofilecontent.dmc.company.website;
			var wwwindex = dmcwebsite.indexOf("www");
			var httpindex = dmcwebsite.indexOf("http");
			
			if (wwwindex == 0 || wwwindex == -1 ) {
				if(httpindex == -1) {
					dmcprofilecontent.dmc.company.website = "http://" + dmcprofilecontent.dmc.company.website;
				}
			} else {
				if (wwwindex >=7) {
					console.log(dmcwebsite + "valid link")
				}
			}    
			dmcprofilecontent.description = dmcprofilecontent.dmc.additionalinfo.description_es;
			if (dmcprofilecontent.description != null && dmcprofilecontent.description.length > 155){
				dmcprofilecontent.description = dmcprofilecontent.description.substring(0, 155) + '...';
			}
			dmcprofilecontent.url = dmcprofilecontent.canonicalurl;
			//render page after changing properties
			dmcprofilecontent.title =  "Receptivo - " + dmcprofilecontent.dmc.company.name;
            _.extend(req.defaultcontent, dmcprofilecontent);
			var renderedHtml = tmpl(req.defaultcontent);
			res.send(renderedHtml);
		};

	});
 
}