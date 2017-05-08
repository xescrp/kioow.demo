//WEB (EX)PORTABLE SERVER Version 3.1.1 YTO-WEB

// Commpression at top
var compression = require('compression');
//Initialize express dependencies and stuff...
var express = require('express');
var http = require('http');
var https = require('https');
var favicon = require('serve-favicon');
var fs = require('fs');

var path = require('path');
var morgan = require('morgan');
var swig = require('swig');
var cookieParser = require('cookie-parser');
var session = require('./session/sessionengine');
var ytoanon = require('./session/ytoanonymous');
var cache = require('./cache/cacheengine');
var wwwredirect = require('./redirection/wwwredirect');
var ytoapiclient = require('yourttoo.connector').expressconnector;
var common = require('yourttoo.common');
var storagehandler = require('./storage/storagehandler');
var switchsessionhandler = require('./session/sessionswitcher');
var app = express();
var utils = require('./utils');
//Get the configuration file...

var filepaths = require('./routes/diskfilepaths').filepaths;
var nconf = require('nconf');
var ex_session = require('express-session');
var MongoStore = require('connect-mongo')(ex_session);
var brand = nconf.get('brand');
nconf.env().file({ file: filepaths.configurationfile });
var apisettings = nconf.get('ytoapiclient');
app.set('ytoapiconfig', apisettings);
// all environments
app.set('port', nconf.get('port'));
app.set('view engine', 'html');
app.set('views', nconf.get('publicdirectory'));
app.set('appversion', brand.appversion);
app.set('mongodbconfig', nconf.get('mongodb').connection);
swig.setDefaults({ locals: nconf.get('brand') });
swig.setDefaults({ cache: false, varControls: ['{?', '?}'] });
var enviroment = nconf.get('enviroment');
(enviroment == 'dev') ? swig.setDefaults({ cache: false }) : swig.setDefaults({ cache: 'memory' });

var bodyParser = require('body-parser');
// compression at Top
app.use(compression());
app.use(wwwredirect.wwwredirect);
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(morgan('dev'));
var brandprefix = apisettings['favicon-prefix'] || 'yto';
var faviconpath = nconf.get('publicdirectory') + '/img/brand/' + brandprefix + '-favicon.ico';
app.use(favicon(faviconpath));

app.use(cookieParser('omt secret', { limit: '500mb' }));

app.use(cache.cacheEngine);
app.use(ex_session({
    secret: "kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig",
    store: new MongoStore({ url: nconf.get('mongodb').connection }),
    resave: false,
    saveUninitialized: true
}));

var methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'));
//omt middleware
app.use(ytoapiclient(apisettings.url, apisettings.endpointinterface));
ytoanon.dologin(app, function () { console.log('anonymous login initialized...'); });
app.use(ytoanon.enablesession);
app.use(session.sessionEngine);
app.use(express.static(nconf.get('publicdirectory'), { maxAge: 2 * 86400000 }));
app.use(express.static(nconf.get('datadirectory'), { maxAge: 2 * 86400000 }));
app.set('datadirectory', nconf.get('datadirectory'));
app.set('publicdirectory', nconf.get('publicdirectory'));

var exchangefile = nconf.get('datadirectory') + '/data/exchange.json';
app.locals.exchange = utils.getJson(exchangefile);
app.locals.exchangefile = exchangefile;

app.uploadconfiguration = {
    cloudinary: nconf.get('cloudinaryconfig'),
    upload: nconf.get('uploads'),
    whitelabelpath: nconf.get('whitelabelcustomspath')
};
app.disable('etag');
app.use(storagehandler);
app.use(switchsessionhandler);
var needsAuth = nconf.get('basicAuth');
if (needsAuth == "true") {
    var basicAuth = require('basic-auth-connect');
    app.use(basicAuth(function (user, pass) {
        return 'yourttoo' == user && '&ourtt00' == pass;
    }));
}

var routes = require('./routes')(app);

var cloudinary = require('cloudinary');
cloudinary.config(app.uploadconfiguration.cloudinary);
// set global filter Swig 
// divide 1000 as 1.000
swig.setFilter('numberFractions', common.swigtools.numberFractions);
// to change numbers decimal from dots to comma
swig.setFilter('decimales', common.swigtools.decimales);
// remove decimals number
swig.setFilter('removeDecimal', common.swigtools.removeDecimal);
swig.setFilter('toFixed', common.swigtools.toFixed);
// round decimals
swig.setFilter('ceil', common.swigtools.ceil);

app.httplisten = function () {
    //Start Listening HTTP Requests...
    //HTTP Listening
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
    //HTTPS Listening
    var ssl = nconf.get('ssl');
    if (ssl.enabled) {
        var ssloptions = {
            key: fs.readFileSync(ssl.keyfile),
            cert: fs.readFileSync(ssl.certfile),
        };
        https.createServer(ssloptions, app).listen(443, function () {
            console.log('Express server listening on SSL');
        });
    }
}

module.exports = app;