//Dependencies...
var fs = require('fs'),
    _ = require('underscore'),
    path = require('../tools/path'),
    moment = require('moment'),
    numeral = require('numeral'),
    path = require('path'),
    common = require('yourttoo.common'),
    mongo = require('mongodb');


//.ctor() 
var YourTTOOCore = function () {
    this.lists = {};
    this.paths = {};
    this._pre = {
        routes: [],
        render: []
    };
    this.nativemongo = null;
    this.configuration = null;
    this.configuration = this.loadConfigurationFile();
    this.id = common.utils.getToken();
}

//Inheritance for emiting events...
//inherits
var eventThis = require('yourttoo.common').eventtrigger;
eventThis.eventtrigger(YourTTOOCore);

//get the value of a configuration
YourTTOOCore.prototype.getConfig = function (key) {
    var keys = key.split('.');
    var cnf = {};
    if (keys && keys.length > 1) {
        cnf = this.configuration[keys[0]];
        return cnf[keys[1]];
    }
    else {
        return this.configuration[keys[0]];
    }
}

YourTTOOCore.prototype.loadConfigurationFile = function (configpath) {
    var nconf = require('nconf');
    var configfile = 'C:/development/node/yourttoo/core/yourttoo.core/configurations/settings.json';
    if (configpath != null && configpath != '') { 
        configfile = configpath;
    }
    

    nconf.env().file({ file: configfile });
    
    this.configuration = 
    {
        'name': nconf.get('name'),
        'brand': nconf.get('brand'),
        'compress': nconf.get('compress'),
        'headless': nconf.get('headless'),
        'logger': nconf.get('logger'),
        'auto update': nconf.get('auto update'),
        'cloudinary prefix': nconf.get('cloudinary prefix'),
        'deploydirectory': nconf.get('deploydirectory'),
        'sessionstorage': nconf.get('sessionstorage'),
        'google api key': nconf.get('google api key'),
        'apiurl': nconf.get('apiurl'),
        'fronturl': nconf.get('fronturl'),
        facebook: {
            applicationId: nconf.get('facebook:applicationId'),
            applicationSecret: nconf.get('facebook:applicationSecret'),
            callbackUrl : nconf.get('facebook:callbackUrl')
        },
        google: {
            clientId: nconf.get('google:clientId'),
            clientSecret: nconf.get('google:clientSecret'),
            callbackUrl: nconf.get('google:callbackUrl'),
            translatorServerKey: nconf.get('google:translatorServerKey'),
            translatorNavigatorKey: nconf.get('google:translatorNavigatorKey')
        },
        twitter: {
            consumerKey: nconf.get('twitter:consumerKey'),
            consumerSecret: nconf.get('twitter:consumerSecret'),
            callbackUrl: nconf.get('twitter:callbackUrl')
        },
        recaptcha: {
            publicKey: nconf.get('recaptcha:publicKey'),
            privateKey: nconf.get('recaptcha:privateKey')
        },
        mongodb : {
            server: nconf.get('mongodb:server'),
            port: nconf.get('mongodb:port'),
            dbname: nconf.get('mongodb:dbname'),
            connection: nconf.get('mongodb:connection'),
            modelspath: nconf.get('mongodb:modelspath'),
            models: nconf.get('mongodb:models')
        },
        cmsdb: {
            server: nconf.get('cmsdb:server'),
            port: nconf.get('cmsdb:port'),
            dbname: nconf.get('cmsdb:dbname'),
            connection: nconf.get('cmsdb:connection'),
            modelspath: nconf.get('cmsdb:modelspath'),
            models: nconf.get('cmsdb:models')
        },
        operationsdb: {
            server: nconf.get('operationsdb:server'),
            port: nconf.get('operationsdb:port'),
            dbname: nconf.get('operationsdb:dbname'),
            connection: nconf.get('operationsdb:connection'),
            modelspath: nconf.get('operationsdb:modelspath'),
            models: nconf.get('operationsdb:models')
        },
        mailing : {
            server: nconf.get('mailing:server'),
            port: nconf.get('mailing:port'),
            username: nconf.get('mailing:username'),
            password : nconf.get('mailing:password'),
            servicename: nconf.get('mailing:servicename'),
            from: nconf.get('mailing:from'),
            errorsfrom: nconf.get('mailing:errorsfrom'),
            errorsrecipient : nconf.get('mailing:errorsrecipient')
        },
        log: {
            sendmailonerrors: nconf.get('log:sendmailonerrors'),
            mode: nconf.get('log:mode'),
            filepath: nconf.get('log:filepath')
        },
        cloudinaryconfig: {
            cloud_name: nconf.get('cloudinaryconfig:cloud_name'),
            api_key: nconf.get('cloudinaryconfig:api_key'),
            api_secret: nconf.get('cloudinaryconfig:api_secret')
        },
        landing:
 {
            emailspanish: '/resources/landing/mail/confirmacion_registro_dmc.html',
            emailenglish: '/resources/landing/mail/confirmation_register_dmc.html',
            emailadmin: '/resources/landing/mail/confirmacion_registro_owners.html',
        }
    }
    return this.configuration;
}


YourTTOOCore.prototype.list = function (list) {
    if (list && list.constructor == yourttoocore.List) {
        this.lists[list.key] = list;
        this.paths[list.path] = list.key;
        return list;
    }
    return this.lists[list] || this.lists[this.paths[list]];
};

YourTTOOCore.prototype.set = function (key, value) {
    
    if (arguments.length == 1)
        return this.getConfig(key);
    
    this.configuration[key] = value;
    return this;
};
YourTTOOCore.prototype.get = YourTTOOCore.prototype.set;

YourTTOOCore.prototype.slug = function (input) {
    return utils.slug(input);
}

YourTTOOCore.prototype.getPath = function (key) {
    var path = yourttoocore.get(key);
    path = ('string' == typeof path && path.substr(0, 1) != '/') ? process.cwd() + '/' + path : path;
    return path;
}

YourTTOOCore.prototype.pre = function (event, fn) {
    if (!this._pre[event]) {
        throw new Error('openmarket.pre() Error: event ' + event + 'does not exist.');
    }
    this._pre[event].push(fn);
}


YourTTOOCore.prototype.connect = function () {
    
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i].constructor.name == 'Mongoose') {
            
            this.mongoose = arguments[i];
        } else if (arguments[i].name == 'app') {
            
            this.app = arguments[i];
        }
    }
    return this;
}

YourTTOOCore.prototype.start = function (bbdd, onReady) {
    //var yourttoocore = this;
    if (!this.mongoose)
        this.connect(require('mongoose'));

    // Connect to database
    var connection = 'mongodb.connection';
    var _cnmodels = 'mongodb.models';
    var _cnmodelspath = 'mongodb.modelspath';
    var cnmodels, cnmodelspath = '';

    if (bbdd != null && bbdd != '') {
        connection = bbdd + '.connection';
        _cnmodels = bbdd + '.models';
        _cnmodelspath = bbdd + '.modelspath';
    }
    //switch with mongodb driver or mongoose driver...
    if (connection == 'mongodb.connection' || connection == 'cmsdb.connection') {
        var mongooseArgs = this.get(connection);
        cnmodels = this.get(_cnmodels);
        cnmodelspath = this.get(_cnmodelspath);
        this.mongoose.connect.apply(this.mongoose, 
        Array.isArray(mongooseArgs) ? mongooseArgs : [mongooseArgs]);
        
        
        //Handle connection...
        this.mongoose.connection.on('error', function () {
            console.error(yourttoocore.get('name') + ' failed to launch: mongo connection error', arguments);
            var rs = {
                Started: true, StartTime: new Date(), ConnectionOK: false, 
                Message: 'failed to launch: mongo connection error' + arguments
            };
            if (onReady != null) {
                onReady(rs);
            }
            
            yourttoocore.emit('core.on.error', rs);
        });
        this.mongoose.connection.on('open', function () {
            //load modeling classes and stuff...
            
            console.log('Connected to mongo...');
            console.log(mongooseArgs);
            console.log('loading models ' + cnmodels + ' -> path: ' + cnmodelspath);
            common.models[cnmodels](yourttoocore);
            //require(cnmodelspath);
            
            var rs = {
                Started: true, StartTime: new Date(), ConnectionOK: true, 
                Message: 'The connection with mongo is OK'
            };
            if (onReady != null) {
                onReady(rs);
            }
            
            yourttoocore.emit('core.on.connection', rs);
        });
    } else {
        var mongoArgs = this.get(connection);
        mongo.connect(mongoArgs, function (err, db) {
            if (err != null) {
                console.error(yourttoocore.get('name') + ' failed to launch: mongo connection error', err);
                var rs = {
                    Started: true, StartTime: new Date(), ConnectionOK: false, 
                    Message: 'failed to launch: mongo connection error' + err
                };
                if (onReady != null) {
                    onReady(rs);
                }
                
                yourttoocore.emit('core.on.error', rs);
            }
            if (db != null) {
                yourttoocore.nativemongo = db;
                console.log('Connected to mongo...');
                console.log(mongoArgs);
                var rs = {
                    Started: true, StartTime: new Date(), ConnectionOK: true, 
                    Message: 'The connection with mongo is OK'
                };
                if (onReady != null) {
                    onReady(rs);
                }
                
                yourttoocore.emit('core.on.connection', rs);
            }
        });
    }
}

/**
* The exports object is an instance of OpenMarketCore. */
var yourttoocore = module.exports = exports = new YourTTOOCore;


yourttoocore.List = require('./list');
yourttoocore.Field = require('./field');
yourttoocore.Field.Types = require('./fieldTypes');