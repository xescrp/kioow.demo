
var _layer = require('../interface/mongolayer');
var _core = require('../base');
var common = require('yourttoo.common');
var MongoIso = function (options) {
    
    this.mongoimp = null;
    this.configuration = options;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    this.core = new _core.YourTTOOCore();
    if (this.configuration == null || this.configuration.dbname == '') {
        this.configuration = {
            forkdblayer: false
        }
        options = this.configuration;
    } 
    this.core.start(function (readyrs) {
        console.log('Mongo ISO Own CORE connected to BBDD. Total: ' + readyrs.connectionsOK.length);
        self.emit('connected');
    });

    this.forkdblayer = this.configuration.forkdblayer;
    switch (options.forkdblayer) {
        case true:
            this.mongoimp = new _mongo_fork(this.configuration);
            break;
        case false:
            this.mongoimp = new _mongo_local(this.core);
            break;
    }
    var self = this;
}
//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(MongoIso);
//Mongoose Operations
MongoIso.prototype.connect = function (connectionname, callback) {
    this.mongoimp = null;
    var options = { dbname: connectionname };
    switch (this.forkdblayer) {
        case true:
            this.mongoimp = new _mongo_fork(options);
            break;
        case false:
            this.mongoimp = new _mongo_local(options);
            break;
    }
}
//GET MODEL
MongoIso.prototype.getmodel = function (opts, callback) { 
    var m = this.core.list(opts.collectionname).model(opts.modelobject);
    if (callback) { callback(m); }
    return m;
}
//METHODS - PROXY
//Reading
MongoIso.prototype.distinct = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'distinct',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.find = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'find',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.findone = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'findone',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.exists = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'exists',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.count = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'count',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
//CMS Operations
MongoIso.prototype.findtext = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'findtext',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.read = function (filter, callback) {
    var opts = {
        operation: 'reader',
        method: 'read',
        args: filter
    }
    this.mongoimp.do(opts, callback);
}
//Writing
MongoIso.prototype.save = function (options, callback) {
    var opts = {
        operation: 'writer',
        method: 'save',
        args: options
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.update = function (options, callback) {
    var opts = {
        operation: 'writer',
        method: 'update',
        args: options
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.updatemany = function (options, callback) {
    var opts = {
        operation: 'writer',
        method: 'updatemany',
        args: options
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.insert = function (options, callback) {
    var opts = {
        operation: 'writer',
        method: 'insert',
        args: options
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.insertmany = function (options, callback) {
    var opts = {
        operation: 'writer',
        method: 'insertmany',
        args: options
    }
    this.mongoimp.do(opts, callback);
}
MongoIso.prototype.bulkwrite = function (options, callback) {
    var opts = {
        operation: 'writer',
        method: 'bulkwrite',
        args: options
    }
    this.mongoimp.do(opts, callback);
}


//Subclases...
var _mongo_local = function (options) {
    this.mongo = new _layer.MongoLayer(options);
    //launcher method...
    this.do = function (options, callback) {
        this.mongo[options.method](options.args, function (results) { callback(results); });
    }
}

var _mongo_fork = function (options) {
    
    var common = require('yourttoo.common');
    
    //Create a reader...
    var readerpath = root + 'interface/mongoreader';
    var confRD = {
        taskpath: readerpath,
        start: true,
        createinstance: false,
        newinstancename: 'MongoReader',
        taskparameters: options.dbname
    };
    this.confrw_dm = new common.threading.daemon(confRD);
    
    //Create a writer...
    var writerpath = root + 'interface/mongowriter';
    var confWR = {
        taskpath: writerpath,
        start: true,
        createinstance: false,
        newinstancename: 'MongoWriter',
        taskparameters: options.dbname
    };
    this.confwr_dm = new common.threading.daemon(confWR);

    //launcher method...
    this.do = function (options, callback) {
        if (options.operation == 'reader') {
            var conf = {
                objectrequest : false,
                method: options.method,
                request: options.args
            };
            this.confrw_dm.exec(conf, function (results) { callback(results); });
        }
        if (options.operation == 'writer') {
            var conf = {
                objectrequest : false,
                method: options.method,
                request: options.args
            };
            this.confwr_dm.exec(conf, function (results) { callback(results); });
        }
    }
}

module.exports.MongoIso = MongoIso;