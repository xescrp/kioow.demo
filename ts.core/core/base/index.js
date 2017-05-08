//Dependencies...
var fs = require('fs'),
    _ = require('underscore'),
    path = require('../tools/path'),
    moment = require('moment'),
    numeral = require('numeral'),
    path = require('path'),
    common = require('yourttoo.common'),
    mongo = require('mongodb');
var yourttoocore = null;

//.ctor() 
var YourTTOOCore = function () {
    console.log('new instance for core...');
    this.lists = {};
    this.paths = {};
    this._pre = {
        routes: [],
        render: []
    };
    this.nativemongo = null;
    this.configuration = null;
    this.statics = {
        mongo: {
            acks: 0,
            nacks: 0
        }
    };
    //this.configuration = this.prototype.loadConfigurationFile();
    this.id = common.utils.getToken();
    this.dbconnections = new common.hashtable.HashTable();
    this.dbconnection = null;
    this.pendingconnections = 0;
    this.dbstatus = new common.hashtable.HashTable();
    
    this.readyresponse = {
        ready: false,
        connectionsOK: [],
        connectionsKO: [],
        errors: 0,
        hits: 0,
        onready: [],
        pendingconnections: 0
    };

    //the self reference...
    yourttoocore = this;
    yourttoocore.List = require('./list')(yourttoocore);
    yourttoocore.Field = require('./field');
    yourttoocore.Field.Types = require('./fieldTypes')(yourttoocore);
    
    yourttoocore.on('core.on.connection', function (conn) {
        yourttoocore.readyresponse.hits++;
        //yourttoocore.pendingconnections--;
        yourttoocore.readyresponse.connectionsOK.push(conn);

        var status = yourttoocore.dbstatus.get(conn.dbname);
        status = (status != null) ? 
        status 
        : 
        { ok : false, ondate: new Date(), setstatus: function (state) { this.ok = state; this.ondate = new Date(); } };
        status.setstatus(true);
        yourttoocore.dbstatus.set(conn.dbname, status);
        var okconns = _.filter(yourttoocore.dbstatus.values(), function (status) { return status.ok == true });
        yourttoocore.readyresponse.pendingconnections = yourttoocore.pendingconnections - okconns.length;
        //start control...
        console.log('connections left ' + yourttoocore.readyresponse.pendingconnections);
        if (yourttoocore.readyresponse.pendingconnections == 0) {
            console.log('all connections done...');
            console.log(yourttoocore.readyresponse.ready);
            if (yourttoocore.readyresponse.ready == false) {
                if (yourttoocore.readyresponse.ready == false && yourttoocore.readyresponse.onready.length > 0) {
                    yourttoocore.readyresponse.ready = true;
                    //call all registered callbacks...
                    _.each(yourttoocore.readyresponse.onready, function (readycall) { 
                        readycall != null ? readycall(yourttoocore.readyresponse) : null;
                    });
                    yourttoocore.emit('core.on.ready', yourttoocore.readyresponse);
                }
                else { console.log('no start callbacks registered..?'); }
                //core ready..
                yourttoocore.readyresponse.ready = true;
            }
        }
    });

    yourttoocore.on('core.on.error', function (conn) {
        yourttoocore.readyresponse.hits++;
        //yourttoocore.pendingconnections--;
        yourttoocore.readyresponse.connectionsKO.push(conn);
        yourttoocore.readyresponse.errors++;
        
        var status = yourttoocore.dbstatus.get(conn.dbname);
        status = (status != null) ? 
        status 
        : 
        { ok : false, ondate: new Date(), setstatus: function (state) { this.ok = state; this.ondate = new Date(); } };
        status.setstatus(false);
        yourttoocore.dbstatus.set(conn.dbname, status);
        var okconns = _.filter(yourttoocore.dbstatus.values(), function (status) { return status.ok == false });
        yourttoocore.readyresponse.pendingconnections = yourttoocore.pendingconnections - okconns.length;

        //start control...
        //if (yourttoocore.pendingconnections == 0) {
        //    console.log('all connections done [failed]...');
            
        //    if (!yourttoocore.readyresponse.ready && yourttoocore.readyresponse.onready != null) {
        //        yourttoocore.readyresponse.ready = true;
        //        yourttoocore.readyresponse.onready(yourttoocore.readyresponse);
        //    }
        //}
    });
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
    var routes = require('../local.routes');

    var configfile = routes.paths.core + 'configurations/settings.json';
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
        'frontadminurl': nconf.get('frontadminurl'),
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
        dbconnections: nconf.get('dbconnections'),
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
            errorsrecipient: nconf.get('mailing:errorsrecipient'),
            templates: nconf.get('mailing:templates')
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
    return common.utils.slug(input);
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

YourTTOOCore.prototype.start = function (onReady) {
    //var yourttoocore = this;
    if (!yourttoocore.mongoose)
        yourttoocore.connect(require('mongoose'));
    yourttoocore.loadConfigurationFile();
    // Connect to database
    var connections = yourttoocore.get('dbconnections');
    yourttoocore.pendingconnections = connections.length;
    yourttoocore.readyresponse.onready.push(onReady);

    //load plugins...
    yourttoocore.plugins = require('../plugins')(yourttoocore, function (plugins) {
        console.log('Plugins initialized...');
        console.log(yourttoocore.plugins);
    });

    _.each(connections, function (bbdd) { 

        var connection = 'mongodb.connection';
        var _cnmodels = 'mongodb.models';
        var _cnmodelspath = 'mongodb.modelspath';
        var cnmodels, cnmodelspath = '';
        
        if (bbdd != null && bbdd != '') {
            connection = bbdd + '.connection';
            _cnmodels = bbdd + '.models';
            _cnmodelspath = bbdd + '.modelspath';
        }
        
        var kaInterval = null;

        if (connection == 'mongodb.connection' || connection == 'cmsdb.connection' || connection == 'operationsdb.connection') { 
            var mongooseArgs = yourttoocore.get(connection);
            cnmodels = yourttoocore.get(_cnmodels);
            cnmodelspath = yourttoocore.get(_cnmodelspath);
            var mongoconfig = {
                server: {
                    poolSize: 10,
                    autoReconnect: true,
                    socketOptions: {
                        keepAlive: 2000,
                        //connectTimeoutMS: 40000,
                        //socketTimeoutMS: 40000
                    }
                }
            };
            var dbconnection = yourttoocore.mongoose.createConnection(mongooseArgs, mongoconfig);
            //connection ERROR
            dbconnection.on('error', function () {
                console.error(yourttoocore.get('name') + ' failed to launch: mongo connection error', arguments);
                var rs = {
                    Started: true, StartTime: new Date(), ConnectionOK: false, 
                    Message: 'failed to launch: mongo connection error' + arguments,
                    dbname: dbconnection.name
                };

                console.error('connection failed... BBDD: ' + dbconnection.name);
                console.error('connection failed... ID: ' + yourttoocore.id);
                yourttoocore.emit('core.on.error', rs);
                //retry connection...
                setTimeout(function () {
                    dbconnection = yourttoocore.mongoose.createConnection(mongooseArgs, mongoconfig);
                }, 1000);
            });
            //connection SUCCESSFUL
            dbconnection.on('open', function () {
                //add the opening connection when is open
                yourttoocore.dbconnections.set(bbdd, dbconnection);

                //load modeling classes and stuff...
                
                console.log('Connected to mongo...' + dbconnection.name);
                console.log(mongooseArgs);
                console.log('loading models ' + cnmodels + ' -> path: ' + cnmodelspath);
                common.models[cnmodels](yourttoocore, bbdd);
                //require(cnmodelspath);
                
                var rs = {
                    Started: true, StartTime: new Date(), ConnectionOK: true, 
                    Message: 'The connection with mongo is OK',
                    dbname: dbconnection.name
                };
                
                yourttoocore.emit('core.on.connection', rs);

                //keep alive the connection...
                kaInterval = setInterval(function () {
                    dbconnection.db.admin().ping(function (err, result) {
                        err != null ? process.nextTick(function () {
                            console.log('error pinging to db ' + dbconnection.name);
                            //try reconnect...
                            console.log('try reconnection...' + dbconnection.name);
                            dbconnection = yourttoocore.mongoose.createConnection(mongooseArgs, mongoconfig);
                        }): null;
                    });
                }, 20000);
            });

            
        } else {
            var mongoArgs = yourttoocore.get(connection);
            var mongoconfig = {
                server: {
                    poolSize: 10,
                    autoReconnect: true,
                    socketOptions: {
                        keepAlive: 2000,
                        //connectTimeoutMS: 40000,
                        //socketTimeoutMS: 40000
                    }
                }
            };
            mongo.connect(mongoArgs, mongoconfig, function (err, db) {
                if (err != null) {
                    console.error(yourttoocore.get('name') + ' failed to launch: mongo connection error', err);
                    var rs = {
                        Started: true, StartTime: new Date(), ConnectionOK: false, 
                        Message: 'failed to launch: mongo connection error' + err
                    };
                    
                    
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
                    
                    yourttoocore.emit('core.on.connection', rs);
                }
            });
        }
    });

}

/**
* The exports object is an instance of OpenMarketCore. */
 module.exports.YourTTOOCore = YourTTOOCore;


