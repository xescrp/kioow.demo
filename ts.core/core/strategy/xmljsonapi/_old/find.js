module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var _ = require('underscore');
    var mongo = core.mongo;
    var coreobj = core.corebase;
    var helper = require('./helpers');
    var exchanges = null;
    var common = require('yourttoo.common');
    var currencys = common.staticdata.currencys;
    var m_currentcurrency = 'EUR';
    var currentcurrency = null;
    var help = require('./helper');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
   
    var allowedcollections = help.constants.find.allowedcollections;
    var fields = help.constants.find.fields;
    var removefields = help.constants.find.removefields;
    var populate = help.constants.find.populate;

    var querycollections = {
        product: function () {
            return { code: { $in: options.codes } }
        },
        booking: function () {
            var bq = options.idBooking != null ?  { idBooking : options.idBooking } : null;
            bq = options.idBookingExt != null ?  { idBookingExt : options.idBookingExt } : bq;
            return bq;
        },
        countries: function () {
            var ccode = options.codes!= null ?  
            { slug: { $in: _.map(options.codes, function (code) { return code.toLowerCase() }) }, state: { $nin: ['excluded', 'b2bexcluded'] } } : 
            { state: { $nin: ['excluded', 'b2bexcluded'] } };
            return ccode;
        }
    };

    function getCurrencyExchanges() {
        helper.getExchangeCurrency(core, function (data) {
            exchanges = data;
            var fcr = _.filter(currencys, function (currency) {
                return currency.value == m_currentcurrency;
            });
            if (fcr != null && fcr.length > 0) {
                currentcurrency = fcr[0];
            }
            cev.emit('exchanges.builded', exchanges);
        });
    }
    
    cev.on('exchanges.builded', function (exchanges) {
        var collection = allowedcollections[options.datatype];
        var findquery = {
            collectionname: allowedcollections[options.datatype],
            query: querycollections[options.datatype](),
            fields: fields[options.datatype].join(' '),
            populate: populate[options.datatype],
            maxresults: options.maxresults || 50
        };
        options.datatype == 'countries' ? delete findquery.maxresults : null; //don't care if datatype is "countries"
        cev.emit('query.builded', findquery, exchanges);
    });

    cev.on('query.builded', function (query, exchanges) {
        mongo.find(query, function (results) {
            if (results.ResultOK == true) {
                var todo = (results.Data != null && results.Data.length > 0) ? results.Data.length : 0;
                var finalresults = [];
                var errors = [];
                (todo > 0) ? process.nextTick(function () {
                    _.each(results.Data, function (doc) {
                        //Decoration...
                        //exchange prices $ -> €
                        doc = require('../../decorator/priceexchangesync')({
                            document: doc, currency: m_currentcurrency, 
                            exchanges: exchanges, currentcurrency: currentcurrency
                        });
                        //drop prices with price = 0
                        doc = require('../../decorator/product.clearpricessync')(doc);
                        //affiliate price...
                        require('../../decorator/product.affiliate.price')({
                            core: core, document: doc, loggeduser: options.auth
                        }, 
                            function (document) {
                            document = options.datatype != 'countries' ?  document.toObject() : doc;
                            if (removefields[options.datatype] != null && removefields[options.datatype].length > 0) {
                                _.each(removefields[options.datatype], function (field) {
                                    console.log('removing ' + field);
                                    delete document[field];
                                });
                            }
                            finalresults.push(document);
                            todo--;
                            (todo == 0) ? callback(finalresults) : null;
                        }, 
                            function (err) {
                            errors.push(err);
                            todo--;
                            (todo == 0) ? errorcallback(errors) : null;
                        });
                    });
                }) : callback(results.Data);
            } else {
                errorcallback(results);
            }
        });
    });
    
    if (allowedcollections[options.datatype] != null && allowedcollections[options.datatype] != '') {
        if (options.auth != null && options.auth.user != null) {
            options.auth.user.isAffiliate ? 
        getCurrencyExchanges() //continue...
        : 
        process.nextTick(function () {
                errorcallback('You are not authorized to use the XML/JSON API.'); //Exit, the user is not an affiliate
            })
        } else {
            process.nextTick(function () {
                errorcallback('You must provide your credentials to access the system'); //Exit, credentials not provided
            });
        }
    } else { 
        process.nextTick(function () {
            errorcallback('The datatype ' + options.datatype + ' is not recognized or not allowed. ' + 
                'You can fetch this kind of datatypes: ' + 
                ' \"product\", \"booking\" and \"countries\"'); //Exit, incorrect collection selected
        });
    }
}
