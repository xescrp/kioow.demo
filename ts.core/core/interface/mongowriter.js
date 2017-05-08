
//Native mongo driver classes
var mongo = require('mongodb');
var objectid = require('mongodb').ObjectID;

var Writer = function (connectionname) {
    this.core = require('./base/standalone');
    this.core.start(connectionname, function () { 
        console.log('Mongo Writer connected to BBDD ' + connectionname);
    });
}

//inherits
var eventThis = require('yourttoo.common').eventtrigger;
eventThis.eventtrigger(Writer);

//Modeling
Writer.prototype.getmodel = function (opts, callback) {
    var m = writer.core.list(opts.collectionname).model(opts.modelobject);
    if (callback) { callback(m); }
    return m;
}

//Mongoose Operations...
Writer.prototype.save = function (objectmodel, callback) {
    if (objectmodel != null) {
        objectmodel.save(function (err, doc) {
            if (err != null) {
                console.log('Mongo Writer with error...');
                console.log(err);
                writer.emit('writer.save.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (doc != null) {
                writer.emit('writer.save.ok', doc);
                if (callback) {
                    callback({ ResultOK : true, Data: doc });
                }
            }
        });
    }
}

Write.prototype.updatemodel = function (updatecondition, callback) {
    var cond = {
        collectionname: updatecondition.collectionname,
        modelobject: null
    };
    var model = writer.getmodel(cond, null);
    model.update(
        updatecondition.query, 
        updatecondition.update, 
        null, 
        function (err, rawresponse) {
            if (err != null) {
                console.log('Mongo Writer with error...');
                console.log(err);
                writer.emit('writer.update.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (rawresponse) {
                writer.emit('writer.update.ok', result.ops[0]);
                if (callback) {
                    callback({ ResultOK : true, Data: result.ops[0] });
                } else {
                    writer.emit('writer.update.error', 'Some items cannot be saved');
                    if (callback) {
                        callback({ ResultOK : false, Message: 'Some items cannot be saved' });
                    }
                }
            }
    });
}

//Native Mongo Operations...
Writer.prototype.update = function (updatecondition, callback) {
    writer.core.nativemongo.collection(updatecondition.collectionname, function (err, collection) {
        collection.updateOne(
            updatecondition.query, 
            updatecondition.update, 
            { upsert: true, w: 1 }, 
            function (err, result) {
                if (err != null) {
                    console.log('Mongo Writer with error...');
                    console.log(err);
                    writer.emit('writer.update.error', err);
                    if (callback) {
                        callback({ ResultOK : false, Message: err });
                    }
                }
                if (result.matchedCount == 1 || result.upsertedCount == 1) {
                    writer.emit('writer.update.ok', result.ops[0]);
                    if (callback) {
                        callback({ ResultOK : true, Data: result.ops[0] });
                    }
                } else {
                    writer.emit('writer.update.error', 'Some items cannot be saved');
                    if (callback) {
                        callback({ ResultOK : false, Message: 'Some items cannot be saved' });
                    }
                }
            
        });
    });
}

Writer.prototype.updatemany = function (updatecondition, callback) {
    writer.core.nativemongo.collection(updatecondition.collectionname, function (err, collection) {
        collection.updateMany(
            updatecondition.query, 
            updatecondition.update, 
            { w: 1, multi: true }, 
            function (err, result) {
                if (err != null) {
                    console.log('Mongo Writer with error...');
                    console.log(err);
                    writer.emit('writer.update.error', err);
                    if (callback) {
                        callback({ ResultOK : false, Message: err });
                    }
                }
                if (result.matchedCount > 0) {
                    writer.emit('writer.update.ok', result.ops[0]);
                    if (callback) {
                        callback({ ResultOK : true, Data: result.ops[0] });
                    }
                }
            
            });
    });
}

Writer.prototype.insert = function (options, callback) {
    writer.core.nativemongo.collection(options.collectionname, function (err, collection) {
        collection.insertOne(options.document, { w: 1}, function (err, result) {
            if (err != null) { 
                console.log('Mongo Writer with error...');
                console.log(err);
                writer.emit('writer.save.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (result.insertedCount == 1) { 
                writer.emit('writer.save.ok', result.ops[0]);
                if (callback) {
                    callback({ ResultOK : true, Data: result.ops[0] });
                }
            }
        });
    });
}

Writer.prototype.insertmany = function (options, callback) {
    writer.core.nativemongo.collection(options.collectionname, function (err, collection) {
        collection.insertMany(options.documents, { w: 1},  function (err, result) {
            if (err != null) {
                console.log('Mongo Writer with error...');
                console.log(err);
                writer.emit('writer.save.error', err);
                if (callback) {
                    callback({ ResultOK : false, Message: err });
                }
            }
            if (result.insertedCount > 0) {
                writer.emit('writer.save.ok', result.ops);
                if (callback) {
                    callback({ ResultOK : true, Data: result.ops });
                }
            }
        });
    });
}

Writer.prototype.bulkwrite = function (bulkconfiguration, callback) {
    writer.core.nativemongo.collection(bulkconfiguration.collectionname.toLowerCase(), function (err, doccollection) {
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

var writer = module.exports = exports = new Writer;