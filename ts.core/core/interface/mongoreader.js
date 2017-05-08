

var mongo = require('mongodb');
var objectid = require('mongodb').ObjectID;
    
var Reader = function (connectionname) {
    this.core = require('../base/standalone');
    if (connectionname == null || connectionname == '') { 
        connectionname = 'mongodb';
    }
    this.core.start(connectionname, function () {
        console.log('Mongo Reader connected to BBDD ' + connectionname);
    });
}
    
//inherits
var eventThis = require('yourttoo.common').eventtrigger;
eventThis.eventtrigger(Reader);
    
//Daemon interface
Reader.prototype.connect = function (connectionname, callback) { 
    this.core = require('../base/standalone');
    if (connectionname == null || connectionname == '') {
        connectionname = 'mongodb';
    }
    this.core.start(connectionname, function () {
        console.log('Mongo Reader connected to BBDD ' + connectionname);
    });
}
Reader.prototype.start = function (callback) {
    console.log('Daemon Mongoreader ready...');
    callback({ ResultOK: true, Message: 'Daemon Mongoreader ready...' });
}
//Modeling
Reader.prototype.getmodel = function(opts, callback) {
    var m = reader.core.list(opts.collectionname).model(opts.modelobject);
    if (callback) { callback(m); }
    return m;
}
//Mongoose Operations...
Reader.prototype.find = function (filter, callback) {
    var results = [];
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: null
    };
    console.log('Query...');
    console.log(filter);

    var querystream = reader.core.list(filter.collectionname).model.find(filter.query, filter.fields)
    //.populate(filter.populate.fieldname, filter.populate.fields.join(' '))
    .sort(filter.sortcondition)
    .limit(filter.maxresults)
    .stream();
        
    querystream.on('data', function (doc) {
        var prDoc = doc;
        if (filter.iteratestrategy != null) {
            prDoc = filter.iteratestrategy(doc);
        }
        results.push(prDoc);
    });

    querystream.on('error', function (err) {
        console.log('Mongo Reader with error...');
        console.log(err);
        processResult.ResultOK = false;
        processResult.Message = err;
    });

    querystream.on('close', function () {
        if (filter.populate != null) {
            reader.core.list(filter.collectionname).model.populate(results, filter.populate, function (err, results) {
                processResult.Data = results;
                if (callback) {
                    callback(processResult);
                }
                switch (processResult.ResultOK) {
                    case true: reader.emit('reader.find.ok', processResult.Data); break;
                    case false: reader.emit('reader.find.error', processResult.Message); break;
                }
            });
        } else { 
            processResult.Data = results;
            if (callback) {
                callback(processResult);
            }
            switch (processResult.ResultOK) {
                case true: reader.emit('reader.find.ok', processResult.Data); break;
                case false: reader.emit('reader.find.error', processResult.Message); break;
            }
        }
    });
}


Reader.prototype.exists = function (filter, callback) {
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: false
    };
    reader.core.list(filter.collectionname).model.find(filter.query, filter.fields).count(function (err, count) {
        if (err != null) {
            console.log('Mongo Reader with error...');
            console.log(err);
            processResult.ResultOK = false;
            processResult.Message = err;
            reader.emit('reader.find.error', processResult);
        }
        if (count != null) {
            processResult.Data = (count > 0);
            reader.emit('reader.find.ok', processResult);
        }
        if (callback) {
            callback(processResult);
        }
    });
}
    
Reader.prototype.count = function (filter, callback) {
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: false
    };
    reader.core.list(filter.collectionname).model.find(filter.query).count(function (err, count) {
        if (err != null) {
            console.log('Mongo Reader with error...');
            console.log(err);
            processResult.ResultOK = false;
            processResult.Message = err;
            reader.emit('reader.find.error', processResult);
        }
        if (count != null) {
            processResult.Data = count;
            reader.emit('reader.find.ok', processResult);
        }
        if (callback) {
            callback(processResult);
        }
    });
}
    
//Native Mongo Operations...
Reader.prototype.findtext = function (filter, callback) {
    reader.core.nativemongo.collection(filter.collectionname, function (err, collection) {
        collection.find(filter.query, { score: { $meta: "textScore" } }, filter.fields)
        .sort({ score: { $meta: "textScore" } })
        .limit(filter.maxresults)
        .toArray(function (err, docs) { 
            if (err != null) {
                console.log('Mongo Reader with error...');
                console.log(err);
                reader.emit('reader.find.error', err);
                if (callback) {
                    callback({ ResultOK: false, Message: err, Data: null });
                }
            }
            if (docs != null) {
                reader.emit('reader.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: '', Data: docs });
                }
            }
            else {
                reader.emit('reader.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: 'No results', Data: docs });
                }
            }
        });
    });
}

Reader.prototype.read = function (filter, callback) {
    reader.core.nativemongo.collection(filter.collectionname, function (err, collection) {
        collection.find(filter.query, filter.fields)
        .sort(filter.sortcondition)
        .limit(filter.maxresults)
        .toArray(function (err, docs) {
            if (err != null) {
                console.log('Mongo Reader with error...');
                console.log(err);
                reader.emit('reader.find.error', err);
                if (callback) {
                    callback({ ResultOK: false, Message: err, Data: null });
                }
            }
            if (docs != null) {
                reader.emit('reader.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: '', Data: docs });
                }
            }
            else {
                reader.emit('reader.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: 'No results', Data: docs });
                }
            }
        });
    });
}
    
var reader = module.exports = exports = new Reader;
return reader;

//Native mongo driver classes
