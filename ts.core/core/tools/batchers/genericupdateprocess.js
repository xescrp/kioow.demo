module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var core = options.core;
    var collection = options.collectionname;
    
    var query = options.query || { _id: { $ne: null } };
    var fields = options.fields;
    var populate = options.populate;
    var max = options.max;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var results = {
        name: 'Update Process for collection ' + collection,
        id: collection + '-' + common.utils.getToken(),
        resultOk: true,
        messages: [],
        errors: [],
        total: 0,
        processed: 0
    };
    
    var idbuffer = [];

    cev.on('update.done', function () {
        results.resultOk = true;
        results.messages.push('update process for collection ' + collection + ' done');
        callback(results);
    });
    cev.on('update.error', function (err) {
        results.resultOk = false;
        results.errors.push(err);
        errorcallback(err);
    });
    
    cev.on('next.get', function (id) {
        core.list(collection).model.find({ _id: id })
        .select(fields)
        .exec(function (err, docs) {
            err != null ? cev.emit('update.error', err) : setImmediate(function () {
                if (populate != null && populate.length > 0) {
                    core.list(collection).model.populate(docs, populate, function (err, pDocs) {
                        err != null ? cev.emit('update.error', err) : cev.emit('next.iteratee', pDocs.shift());
                    });
                } else {
                    cev.emit('next.iteratee', docs.shift());
                }
            });
        })
    });
    
    cev.on('next.iteratee', function (doc) {
        var iterators = { booking: false, product: false, affiliate: false };
        var iterateebooking = require('./iterators/bookingfileurlfixer');
        var iterateeproduct = require('./iterators/productfullupdatelauncher');
        var iterateaffiliate = require('./iterators/affiliate.validator');
        var cevit = common.eventtrigger.eventcarrier(common.utils.getToken());
        cevit.on('iterators.finished', function (iterateddoc) { 
            cev.emit('next.process', iterateddoc);
        });
        if (collection == 'Bookings') {
            iterateebooking({ booking: doc, core: core }, function (item) {
                doc = item.booking;
                iterators.booking = true;
                _.every(iterators, function (iterator) { return iterator; }) ? cevit.emit('iterators.finished', doc) : null;
            });
        } else {
            iterators.booking = true;
            _.every(iterators, function (iterator) { return iterator; }) ? cevit.emit('iterators.finished', doc) : null;
        }
        if (collection == 'DMCProducts') {
            iterateeproduct({ product: doc, core: core }, function (item) {
                doc = item.product;
                iterators.product = true;
                _.every(iterators, function (iterator) { return iterator; }) ? cevit.emit('iterators.finished', doc) : null;
            });
        } else {
            iterators.product = true;
            _.every(iterators, function (iterator) { return iterator; }) ? cevit.emit('iterators.finished', doc) : null;
        }
        if (collection == 'Affiliate') {
            iterateaffiliate({ affiliate: doc, core: core }, function (item) {
                doc = item.affiliate;
                iterators.affiliate = true;
                _.every(iterators, function (iterator) { return iterator; }) ? cevit.emit('iterators.finished', doc) : null;
            });
        } else {
            iterators.affiliate = true;
            _.every(iterators, function (iterator) { return iterator; }) ? cevit.emit('iterators.finished', doc) : null;
        }
    });
    
    cev.on('next.process', function (doc) {
        doc != null ? doc.save(function (errsaved, saved) {
            results.processed++;
            console.log('updated item ' + doc._id + ' on ' + collection + '. ' + results.processed + '/' + results.total);
            results.messages.push('updated item ' + doc._id + ' on ' + collection);
            errsaved != null ?  cev.emit('update.error', errsaved) : cev.emit('next');
        }) : cev.emit('next');
    });
    
    cev.on('next', function () {
        if (idbuffer != null && idbuffer.length > 0) {
            var doc = idbuffer.shift();
            cev.emit('next.get', doc);
        }
        else { cev.emit('update.done'); }
    });

    core != null && !common.utils.stringIsNullOrEmpty(collection) ? 
    setImmediate(function () {
        //do it...
        console.log('Start update for collection ' + collection);
        core.list(collection).model.find(query)
        .select('_id')
        .limit(max)
        .exec(function (err, ids) {
            err != null ? cev.emit('update.error', err) : setImmediate(function () {
                idbuffer = _.pluck(ids, '_id');
                results.total = ids.length;
                cev.emit('next');
            });
        });       
    }) : 
    setImmediate(function () { 
        //error...
        cev.emit('update.error','core and collectionname can not be null or empty');
    });
     
}