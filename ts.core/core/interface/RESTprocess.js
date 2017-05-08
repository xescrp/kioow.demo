var express = require('express');
var _ = require('underscore');
var common = require('yourttoo.common');

var RESTprocess = function () {
    this.configuration = {
        port: 3000,
        publicdirectory: 'C:/development/node/yourttoo/core/yourttoo.core/httproutes/help',
        resourcesdirectory: '',
        routespaths: [],
        ssl: {
            enabled: false,
            keyfile: 'C:/development/node/yourttoo/resources/ssl/ytokey.pem',
            certfile: 'C:/development/node/yourttoo/resources/ssl/ytocert.pem'
        },
        api: {
            url: 'https://localhost:6033',
            endpointinterface: 'socket'
        }
    }; 
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(RESTprocess);

RESTprocess.prototype.setconfiguration = function (config) { 
    this.configuration = config;
}

RESTprocess.prototype.start = function (callback) {
    //compression middleware...
    var compression = require('compression');

    var http = require('http');
    var https = require('https');
    var ytoapiclient = require('yourttoo.connector').expressconnector;
    var apisettings = restprocess.configuration.api;
    //middlewares..
    var bodyParser = require('body-parser');
    var logger = require('morgan');
    var methodOverride = require('method-override');
    var cookieParser = require('cookie-parser');
    var identityMW = require('../httproutes/middleware/identity');
    //var multer = require('multer');
    //Express settings...
    console.log('Initializing express...');
    restprocess.app = express();
    restprocess.app.set('port', restprocess.configuration.port);
    restprocess.app.use(compression());
    restprocess.app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
    restprocess.app.use(bodyParser.json({ limit: '500mb' }));
    restprocess.app.use(logger('dev'));
    restprocess.app.use(cookieParser('omt secret', { limit: '500mb' }));
    restprocess.app.use(methodOverride('X-HTTP-Method-Override'));
    restprocess.app.use(identityMW);
    restprocess.app.use(ytoapiclient(apisettings.url, apisettings.endpointinterface));
    //restprocess.app.use(multer());
    //resources and cache...
    restprocess.app.use(express.static(restprocess.configuration.publicdirectory));
    restprocess.app.use(express.static(restprocess.configuration.resourcesdirectory));
    restprocess.app.disable('etag');
    restprocess.app.restconfiguration = restprocess.configuration;
    //Configure routes for app
    if (restprocess.configuration.routespaths != null && restprocess.configuration.routespaths.length > 0) {
        for (var i = 0, len = restprocess.configuration.routespaths.length; i < len; i++) {
            require(restprocess.configuration.routespaths[i])(this.app);
        }
    }
    
    //Start Listening HTTP Requests...
    //HTTP Listening
    http.createServer(restprocess.app).listen(restprocess.configuration.port, function () {
        console.log('Express server listening on port ' + restprocess.app.get('port'));
    });
    //HTTPS Listening
    var ssl = restprocess.configuration.ssl;
    if (ssl.enabled) {
        var fs = require('fs');
        var ssloptions = {
            key: fs.readFileSync(ssl.keyfile),
            cert: fs.readFileSync(ssl.certfile),
        };
        https.createServer(ssloptions, restprocess.app).listen(443, function () {
            console.log('Express server listening on SSL');
        });
    } else { 
        if (callback != null && 'function' == typeof callback) {
            callback();
        }
    }
}

var restprocess = module.exports = exports = new RESTprocess;