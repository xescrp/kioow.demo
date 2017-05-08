module.exports = function (req, res, next) {

    var mongo = require('mongodb');
    var objectid = require('mongodb').ObjectID;
    var _ = require('underscore');

    var fetch = {
        push: function (section, key, value, callback) {
            req.storagehandler.db.collection(section, function (err, sectioncoll) {
                err != null ?
                    setImmediate(function () {
                        next(new Error(err));
                    }) :
                    setImmediate(function () {
                        sectioncoll.find({ key: key }).toArray(function (err, docs) {
                            docs != null && docs.length > 0 ?
                                setImmediate(function () {
                                    //performing an update
                                    sectioncoll.update({ key: key }, { $set: { item: value } }, function (err, doc) {
                                        callback != null ? callback(err, doc) : null;
                                    });
                                }) :
                                setImmediate(function () {
                                    //performing an insertion
                                    sectioncoll.insert({ key: key, item: value }, function (err, doc) {
                                        callback != null ? callback(err, doc) : null;
                                    });
                                });
                        });
                    });
            });
        },
        pull: function (section, key, callback) {
            req.storagehandler.db.collection(section, function (err, sectioncoll) {
                err != null ?
                    setImmediate(function () {
                        next(new Error(err));
                    }) :
                    setImmediate(function () {
                        sectioncoll.find({ key: key }).toArray(function (err, docs) {
                            docs != null && docs.length > 0 ?
                                setImmediate(function () {
                                    callback != null ? callback(err, docs[0].item) : null;
                                }) :
                                setImmediate(function () {
                                    callback != null ? callback(err, null) : null;
                                });
                        });
                    });
            });
        }
    }

    req.app.locals.storagehandler == null ?
        setImmediate(function () {
            var mongoconfig = {
                server: {
                    poolSize: 10,
                    autoReconnect: true,
                    socketOptions: {
                        keepAlive: 2000,
                    }
                }
            };

            mongo.connect(req.app.get('mongodbconfig'), mongoconfig, function (err, db) {
                if (err) { console.log(err); }
                console.log('Connected to Openmarket DB for STORAGE ... [OK]');
                req.app.locals.storagehandler = { db: db };
                _.extend(req.app.locals.storagehandler, fetch);
                req.storagehandler = req.app.locals.storagehandler;
                
                next();
            });
        }) :
        setImmediate(function () {
            req.storagehandler = req.app.locals.storagehandler;
            
            next();
        });
}