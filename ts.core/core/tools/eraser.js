console.time('deletion.process.time');
var common = require('yourttoo.common');
var _ = require('underscore');

//************* REVIEW CONFIG BEFORE YOU RUN THIS SCRIPT!!!!! (under your responsability) ***********************
var config = {
    enabled: false, //protect the deletion (true: delete allowed, false: lock deletions) 
    query: { _id: '561e31011c7dbcd80c45b140' }, //your match query for removing documents... 
    collection: 'UserQueries' //the collection name where you want to remove documents...
};
var config = {
    enabled: true, //protect the deletion (true: delete allowed, false: lock deletions) 
    query: { code: null }, //your match query for removing documents... 
    collection: 'Users' //the collection name where you want to remove documents...
};
var config = {
    enabled: true, //protect the deletion (true: delete allowed, false: lock deletions) 
    query: { code: '' }, //your match query for removing documents... 
    collection: 'UserQueries' //the collection name where you want to remove documents...
};
//***************************************************************************************************************
var flc = common.eventtrigger.eventcarrier(common.utils.getToken());

var base = require('../base');
var core = new base.YourTTOOCore();

var eraserCases = {
    'default': function (delconfig) {
        core.list(delconfig.collection).model.remove(delconfig.query, function (err) {
            err != null ? flc.emit('delete.error', err) : flc.emit('delete.done', { ResultOK: true, Message: 'Document deleted' });
        });
    },
    Quotes: function (delconfig) {
        var onfinishdone = delconfig.onfinishdone || 'delete.done';
        var onfinisherror = delconfig.onfinisherror || 'delete.error';
        flc.on('quote.readytoremove', function () { 
            core.list(delconfig.collection).model.remove(delconfig.query, function (err) {
                err != null ? flc.emit('delete.error', err) : flc.emit(onfinishdone, { ResultOK: true, Message: 'Document deleted' });
            });
        });
        flc.on('product.ok', function (id) {
            id != null && id != '' ? setImmediate(function () { 
                core.list('DMCProducts').model.remove({ _id: id }, function (err) {
                    err != null ? flc.emit(onfinisherror, err) 
                    : flc.emit('quote.readytoremove');
                });
            }) : flc.emit('quote.readytoremove');
        });
        flc.on('products.related', function (ids) {
            var id = (ids != null && ids.length > 0) ? ids[0] : null;
            id == null ? flc.emit('quote.readytoremove') : flc.emit('product.ok', id);
        });
        
        core.list(delconfig.collection).model.find(delconfig.query)
        .distinct('products')
        .exec(function (err, docs) {
            err != null ? flc.emit(onfinisherror, err) : flc.emit('products.related', docs);
        });
    },
    UserQueries: function (delconfig) { 
        var self = this;
        var onfinishdone = delconfig.onfinishdone || 'delete.done';
        var onfinisherror = delconfig.onfinisherror || 'delete.error';
        flc.on('query.readytoremove', function () {
            core.list(delconfig.collection).model.remove(delconfig.query, function (err) {
                err != null ? flc.emit('delete.error', err) : flc.emit(onfinishdone, { ResultOK: true, Message: 'Document deleted' });
            });
        });
        flc.on('quotes.removed', function () { 
            flc.emit('query.readytoremove');
        });
        flc.on('quotes.ok', function (quoteconfig) {
            self.Quotes(quoteconfig);
        });
        flc.on('quotes.related', function (ids) {
            var delquoteconfig = (ids != null && ids.length > 0) ? {
                onfinishdone: 'quotes.removed',
                query: {
                    _id : { $in: ids }
                }, 
                collection: 'Quotes'
            } : null;
            delquoteconfig == null ? flc.emit('query.readytoremove') : flc.emit('quotes.ok', delquoteconfig);
        });
        
        core.list(delconfig.collection).model.find(delconfig.query)
        .distinct('quotes')
        .exec(function (err, docs) {
            err != null ? flc.emit(onfinisherror, err) : flc.emit('quotes.related', docs);
        });
    },
    Users: function (delconfig) { 
        var onfinishdone = delconfig.onfinishdone || 'delete.done';
        var onfinisherror = delconfig.onfinisherror || 'delete.error';
        
        if (typeof delconfig.query.code == 'string' &&
            delconfig.query.code != ''){


            flc.on('profile.related', function (doc) {

                var doc = (doc != null && doc.length > 0) ? doc[0] : null;

                var collection = '';
                var eraseConfig = null;

                if (doc == null){
                    flc.emit('user.nothingtoremove');
                }
                else
                {
                    if (doc.isAffiliate){
                        collection = 'Affiliates';
                    }
                    if (doc.isDMC){
                        collection = 'DMCs';
                    }
                    if (doc.isTraveler){
                        collection = 'Travelers';
                    } 
                    if (doc.isAdmin){
                        collection = 'OMTAdmin';
                    } 
                    
                    eraseConfig = {collection : collection, doc: doc};

                    flc.emit('profile.ok', eraseConfig);
                }
                 
            });

            flc.on('profile.ok', function (config) {
                var collectioUser = config.collection || null;
                var code = (config.doc.code == delconfig.query.code)? delconfig.query.code : null;
                collectioUser != null && collectioUser != '' && code != null && code != '' ? setImmediate(function () { 
                    core.list(collectioUser).model.remove(delconfig.query, function (err) {
                        err != null ? flc.emit(onfinisherror, err) 
                        : flc.emit('user.readytoremove');
                    });
                }) : flc.emit('user.readytoremove');
            });

            flc.on('user.readytoremove', function () { 
                core.list(delconfig.collection).model.remove(delconfig.query, function (err) {
                    err != null ? flc.emit('delete.error', err) : flc.emit(onfinishdone, { ResultOK: true, Message: 'Document deleted' });
                });
            });
            flc.on('user.nothingtoremove', function(){
                flc.emit(onfinishdone, { ResultOK: true, Message: 'Nothing to remove' })
            })
            //init
            
            core.list(delconfig.collection).model.find(delconfig.query)
            .exec(function (err, docs) {
                err != null ? flc.emit(onfinisherror, err) : flc.emit('profile.related', docs);
            });

        } else {
            flc.emit(onfinisherror, { ResultOK: false, Message: 'Query is not a string or empty code' });
        }
        

    }
};

if (config.collection == null || config.collection == '') {
    config.enabled = false;
    console.log('Review {\'config.collection\'}. You must provide a valid Collection Name.');
}
if (config.query == null || Object.getOwnPropertyNames(config.query).length == 0) {
    config.enabled = false;
    console.log('Review {\'config.query\'}. You must provide a valid Query condition. ' + 
        'Be aware, empty queries could cause a full collection deletion');
}

config.enabled ? 
setImmediate(function () {
    console.log('Let\'s delete things...');
    core.start(function () { 
        //core is ready
        var erasecasename = eraserCases.hasOwnProperty(config.collection) ? config.collection : 'default';
        flc.on('delete.done', function (result) {
            console.log('Deletion Complete Successful');
            console.timeEnd('deletion.process.time');
        });
        flc.on('delete.error', function (err) {
            console.error('There was an error deleting documents');
            console.error(err);
            console.timeEnd('deletion.process.time');
        });
        //do it...
        eraserCases[erasecasename](config);
    });
}) : 
setImmediate(function () {
    console.log('Review {\'config.enabled\'}. The protection is enabled');
    console.timeEnd('deletion.process.time');
});