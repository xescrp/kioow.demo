
var mongo = require('mongodb');
var objectid = require('mongodb').ObjectID;
var common = require('yourttoo.common');
var mongolayer = null;
var ytobase = require('../base');
var _ = require('underscore');

var MongoLayer = function (options) {
    this.core = null;
    this.configuration = { id : 'mongolayer_', mixedtypescollections: ['cms-openmarket'] };
    //if parameter string...
    if (options != null && options.configuration == null) {
        //configure all access to mongo
        this.core = new ytobase.YourTTOOCore();
        
        this.core.start(function (readyrs) {
            console.log('Mongo Layer connected to BBDD. Total: ' + readyrs.connectionsOK.length);
        });
    } else {
        //the parameter is the core...
        console.log('a core parameter arrived for mongo iso...');
        this.core = options;
    }
    this.configuration.id += this.core.id;
    mongolayer = this;
    return mongolayer;
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(MongoLayer);

//Daemon interface
MongoLayer.prototype.connect = function (connectionname, callback) {
    this.core = new ytobase.YourTTOOCore();
    if (connectionname == null || connectionname == '') {
        connectionname = 'mongodb';
    }
    this.core.start(connectionname, function () {
        console.log('Mongo Layer connected to BBDD ' + connectionname);
    });
}

MongoLayer.prototype.start = function (callback) {
    console.log('Daemon Mongolayer ready...');
    callback({ ResultOK: true, Message: 'Daemon Mongolayer ready...' });
}
//Modeling
MongoLayer.prototype.getmodel = function (opts, callback) {
    var m = mongolayer.core.list(opts.collectionname).model(opts.modelobject);
    if (callback) { callback(m); }
    return m;
}
//Mongoose Operations...
//OK
MongoLayer.prototype.distinct = function (filter, callback) {
    var results = {
        _date: new Date()
    };
    var result = {
        ResultOK: true,
        Data: null
    };
    if (filter != null && filter.fields != null && filter.fields.length > 0) {
        var ct = filter.fields.length;
        var fprom = mongolayer.core.list(filter.collectionname).model.find(filter.query);

        _.each(filter.fields, function (field) {
            results[field] = [];
            fprom.distinct(field, function (err, docs) {
                if (err) { console.log(err); result.ResultOK = false; result.Message = err; }
                docs = docs || [];
                docs.sort();
                results[field] = docs;
                ct--;
                if (ct == 0) {
                    result.Data = results;
                    callback(result);
                }
            });
        });

    }
    else { 
        callback(result);
    }
}
MongoLayer.prototype.find = function (filter, callback) {
    var results = [];
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: null
    };

    var page = filter.page != null && filter.page >= 0 ? (filter.page * filter.maxresults) : 0;

    var offset = filter.offset || page;
    console.log('offset on find... : ' + offset);
    //console.log('Query...');
    //console.log(filter);
    var convertobject = filter.convertobject || true;
    var querystream = mongolayer.core.list(filter.collectionname).model.find(filter.query)//, filter.fields)
    .select(filter.fields)
    //.populate(filter.populate.fieldname, filter.populate.fields.join(' '))
    .sort(filter.sortcondition)
    .limit(filter.maxresults)
    .skip(offset)
    .stream();
    
    querystream.on('data', function (doc) {
        var prDoc = doc;
        
        try {
            //an intent...
            if (mongolayer.configuration.mixedtypescollections.indexOf(doc.list.model.db.name) >= 0) { 
                //this is a document builded from a mixed.type mongoose model type... need to convert in an object
                if (convertobject) {
                    console.log('Mixed Type model conversion (find)...');
                    prDoc = doc.toObject();
                }
            } 
        }
        catch (err) {
            console.log(err);
            prDoc = doc;
        }
        results.push(prDoc);
    });
    
    querystream.on('error', function (err) {
        console.log('Mongo mongolayer with error...');
        console.log(err);
        processResult.ResultOK = false;
        processResult.Message = err;
    });
    
    querystream.on('close', function () {
        if (filter.populate != null) {
            mongolayer.core.list(filter.collectionname).model.populate(results, filter.populate, function (err, results) {
                if (err) {
                    console.error(err);
                    processResult.ResultOK = false;
                }
                processResult.Data = results;
                if (callback) {
                    callback(processResult);
                }
                switch (processResult.ResultOK) {
                    case true: mongolayer.emit('mongolayer.find.ok', processResult.Data); break;
                    case false: mongolayer.emit('mongolayer.find.error', processResult.Message); break;
                }
            });
        } else {
            processResult.Data = results;
            if (callback) {
                callback(processResult);
            }
            switch (processResult.ResultOK) {
                case true: mongolayer.emit('mongolayer.find.ok', processResult.Data); break;
                case false: mongolayer.emit('mongolayer.find.error', processResult.Message); break;
            }
        }
    });
}
//OK
MongoLayer.prototype.findone = function (filter, callback) {
    var results = [];
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: null
    };

    var max = filter.maxresults || 1;
    var sorting = filter.sortcondition || { createdOn: -1 };
    var convertobject = filter.convertobject || true;
    var returndoc = null;
    var querystream = mongolayer.core.list(filter.collectionname).model.find(filter.query)
    .select(filter.fields)
    //.populate(filter.populate.fieldname, filter.populate.fields.join(' '))
    .sort(sorting)
    .limit(max)
    .stream();
    
    querystream.on('data', function (doc) {
        console.log('first data:');
        //console.log(doc.code);
        //console.log(doc);
        //console.log(doc.dmc);
        var prDoc = doc;
        
        if (prDoc != null && returndoc == null) {
            try {
                //an intent...
                if (mongolayer.configuration.mixedtypescollections.indexOf(doc.list.model.db.name) >= 0) {
                    //this is a document builded from a mixed.type mongoose model type... need to convert in an object
                    if (convertobject) {
                        console.log('find one and convert...');
                        console.log('Mixed Type model conversion (findone)...');
                        prDoc = doc.toObject();
                    }
                }
            }
            catch (err) {
                console.log(err);
                prDoc = doc;
            }
            returndoc = prDoc;
        }
    });
    
    querystream.on('error', function (err) {
        console.error('Mongo mongolayer with error...');
        console.error(err);
        processResult.ResultOK = false;
        processResult.Message = err;
    });
    
    querystream.on('close', function () {
        if (filter.populate != null) {
            mongolayer.core.list(filter.collectionname).model.populate(returndoc, filter.populate, function (err, returndoc) {
                //console.log('populating...');
                //console.log(filter.populate);
                if (err) {
                    console.error(err);
                    processResult.ResultOK = false;
                }
                //console.log(returndoc);
                processResult.Data = returndoc;
                if (callback) {
                    callback(processResult);
                }
                switch (processResult.ResultOK) {
                    case true: mongolayer.emit('mongolayer.find.ok', processResult.Data); break;
                    case false: mongolayer.emit('mongolayer.find.error', processResult.Message); break;
                }
            });
        } else {
            console.log('no populating...');
            processResult.Data = returndoc;
            if (callback) {
                callback(processResult);
            }
            switch (processResult.ResultOK) {
                case true: mongolayer.emit('mongolayer.find.ok', processResult.Data); break;
                case false: mongolayer.emit('mongolayer.find.error', processResult.Message); break;
            }
        }
    });
}
//OK
MongoLayer.prototype.exists = function (filter, callback) {
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: false
    };
    mongolayer.core.list(filter.collectionname).model.find(filter.query, filter.fields).count(function (err, count) {
        if (err != null) {
            console.log('Mongo mongolayer with error...');
            console.log(err);
            processResult.ResultOK = false;
            processResult.Message = err;
            mongolayer.emit('mongolayer.find.error', processResult);
        }
        if (count != null) {
            processResult.Data = (count > 0);
            mongolayer.emit('mongolayer.find.ok', processResult);
        }
        if (callback) {
            callback(processResult);
        }
    });
}
//OK
MongoLayer.prototype.count = function (filter, callback) {
    var processResult = {
        ResultOK : true,
        Message: '',
        Data: false
    };
    mongolayer.core.list(filter.collectionname).model.find(filter.query).count(function (err, count) {
        if (err != null) {
            console.log('Mongo mongolayer with error...');
            console.log(err);
            processResult.ResultOK = false;
            processResult.Message = err;
            mongolayer.emit('mongolayer.find.error', processResult);
        }
        if (count != null) {
            processResult.Data = count;
            mongolayer.emit('mongolayer.find.ok', processResult);
        }
        if (callback) {
            callback(processResult);
        }
    });
}

//Native Mongo Operations...
MongoLayer.prototype.findtext = function (filter, callback) {
    mongolayer.core.nativemongo.collection(filter.collectionname, function (err, collection) {
        collection.find(filter.query, { score: { $meta: "textScore" } }, filter.fields)
        .sort({ score: { $meta: "textScore" } })
        .limit(filter.maxresults)
        .toArray(function (err, docs) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                console.log(err);
                mongolayer.emit('mongolayer.find.error', err);
                if (callback) {
                    callback({ ResultOK: false, Message: err, Data: null });
                }
            }
            if (docs != null) {
                mongolayer.emit('mongolayer.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: '', Data: docs });
                }
            }
            else {
                mongolayer.emit('mongolayer.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: 'No results', Data: docs });
                }
            }
        });
    });
}

MongoLayer.prototype.read = function (filter, callback) {
    mongolayer.core.nativemongo.collection(filter.collectionname, function (err, collection) {
        collection.find(filter.query, filter.fields)
        .sort(filter.sortcondition)
        .limit(filter.maxresults)
        .toArray(function (err, docs) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                console.log(err);
                mongolayer.emit('mongolayer.find.error', err);
                if (callback) {
                    callback({ ResultOK: false, Message: err, Data: null });
                }
            }
            if (docs != null) {
                mongolayer.emit('mongolayer.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: '', Data: docs });
                }
            }
            else {
                mongolayer.emit('mongolayer.find.ok', docs);
                if (callback) {
                    callback({ ResultOK: true, Message: 'No results', Data: docs });
                }
            }
        });
    });
}


//Mongoose Operations...
MongoLayer.prototype.save = function (objectmodel, callback) {
    if (objectmodel != null) {
        objectmodel.save(function (err, doc) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                console.log(err);
                mongolayer.emit('mongolayer.save.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (doc != null) {
                mongolayer.emit('mongolayer.save.ok', doc);
                if (callback) {
                    callback({ ResultOK : true, Data: doc });
                }
            }
        });
    }
}

MongoLayer.prototype.updatemodel = function (updatecondition, callback) {
    var cond = {
        collectionname: updatecondition.collectionname,
        modelobject: null
    };
    var model = mongolayer.getmodel(cond, null);
    model.update(
        updatecondition.query, 
        updatecondition.update, 
        null, 
        function (err, rawresponse) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                console.log(err);
                mongolayer.emit('mongolayer.update.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (rawresponse) {
                mongolayer.emit('mongolayer.update.ok', result.ops[0]);
                if (callback) {
                    callback({ ResultOK : true, Data: result.ops[0] });
                } else {
                    mongolayer.emit('mongolayer.update.error', 'Some items cannot be saved');
                    if (callback) {
                        callback({ ResultOK : false, Message: 'Some items cannot be saved' });
                    }
                }
            }
        });
}

//Native Mongo Operations...
MongoLayer.prototype.update = function (updatecondition, callback) {
    mongolayer.core.nativemongo.collection(updatecondition.collectionname, function (err, collection) {
        collection.updateOne(
            updatecondition.query, 
            updatecondition.update, 
            { upsert: true, w: 1 }, 
            function (err, result) {
                if (err != null) {
                    console.log('Mongo mongolayer with error...');
                    console.log(err);
                    mongolayer.emit('mongolayer.update.error', err);
                    if (callback) {
                        callback({ ResultOK : false, Message: err });
                    }
                }
                if (result.matchedCount == 1 || result.upsertedCount == 1) {
                    mongolayer.emit('mongolayer.update.ok', result.ops[0]);
                    if (callback) {
                        callback({ ResultOK : true, Data: result.ops[0] });
                    }
                } else {
                    mongolayer.emit('mongolayer.update.error', 'Some items cannot be saved');
                    if (callback) {
                        callback({ ResultOK : false, Message: 'Some items cannot be saved' });
                    }
                }
            
            });
    });
}

MongoLayer.prototype.updatemany = function (updatecondition, callback) {
    mongolayer.core.nativemongo.collection(updatecondition.collectionname, function (err, collection) {
        collection.updateMany(
            updatecondition.query, 
            updatecondition.update, 
            { w: 1, multi: true }, 
            function (err, result) {
                if (err != null) {
                    console.log('Mongo mongolayer with error...');
                    console.log(err);
                    mongolayer.emit('mongolayer.update.error', err);
                    if (callback) {
                        callback({ ResultOK : false, Message: err });
                    }
                }
                if (result.matchedCount > 0) {
                    mongolayer.emit('mongolayer.update.ok', result.ops[0]);
                    if (callback) {
                        callback({ ResultOK : true, Data: result.ops[0] });
                    }
                }
            
            });
    });
}

MongoLayer.prototype.insert = function (options, callback) {
    mongolayer.core.nativemongo.collection(options.collectionname, function (err, collection) {
        collection.insertOne(options.document, { w: 1 }, function (err, result) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                console.log(err);
                mongolayer.emit('mongolayer.save.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (result.insertedCount == 1) {
                mongolayer.emit('mongolayer.save.ok', result.ops[0]);
                if (callback) {
                    callback({ ResultOK : true, Data: result.ops[0] });
                }
            }
        });
    });
}

MongoLayer.prototype.insertmany = function (options, callback) {
    mongolayer.core.nativemongo.collection(options.collectionname, function (err, collection) {
        collection.insertMany(options.documents, { w: 1 }, function (err, result) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                console.log(err);
                mongolayer.emit('mongolayer.save.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (result.insertedCount > 0) {
                mongolayer.emit('mongolayer.save.ok', result.ops);
                if (callback) {
                    callback({ ResultOK : true, Data: result.ops });
                }
            }
        });
    });
}

MongoLayer.prototype.bulkwrite = function (bulkconfiguration, callback) {
    mongolayer.core.nativemongo.collection(bulkconfiguration.collectionname.toLowerCase(), function (err, doccollection) {
        if (doccollection != null) {
            
            var batchresult = {
                ResultOK: false, 
                Message: 'Nothing done yet...'
            }
            
            var batch = doccollection.initializeUnorderedBulkOp();
            if (bulkconfiguration.updates != null && bulkconfiguration.updates.length > 0) {
                for (var i = 0, len = bulkconfiguration.updates.length; i < len; i++) {
                    var upd = bulkconfiguration.updates[i];
                    if (upd != null && upd.query != null && upd.update != null) {
                        batch.find(upd.query).updateOne(upd.update);
                    }
                }
            }
            if (bulkconfiguration.inserts != null && bulkconfiguration.inserts.length > 0) {
                for (var i = 0, len = bulkconfiguration.inserts.length; i < len; i++) {
                    batch.insert(bulksave.inserts[i]);
                }
            }
            
            console.log('Execute intent...');
            batch.execute(function (err, result) {
                if (err) { console.log(err); }
                batchresult = result;
                callback(batchresult);
            });
        }
        else {
            callback({ ResultOK: false, Message: bulksave.collectionname + ' collection not found or allowed...' });
        }
    });
}


module.exports.MongoLayer = MongoLayer;