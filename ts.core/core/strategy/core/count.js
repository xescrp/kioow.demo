module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var _ = require('underscore');
    var mongo = core.mongo;
    var coreobj = core.corebase;
    var helper = require('./helpers');
    var exchanges = null;
    var common = require('yourttoo.common');
    var currencys = common.staticdata.currencys;
    var m_currentcurrency = options.currency || 'EUR';
    var currentcurrency = null;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    
    cev.on('exchanges.builded', function (exchanges) {
        mongo.find(options, function (results) {
            if (results.ResultOK == true) {
                var finalresults = [];
                _.each(results.Data, function (doc) {
                    
                    doc = require('../../decorator/product.affiliate.price.sync')({
                        core: core, document: doc, loggeduser: options.auth,
                        environment: options.environment
                    });

                    var selectedcurrency = options.currentcurrency;
                    doc = require('../../decorator/exchange.search')({ core: coreobj, program: doc, currentcurrency: selectedcurrency, auth: options.auth });

                    //doc = require('../../decorator/priceexchangesync')({
                    //    document: doc, currency: m_currentcurrency,
                    //    exchanges: exchanges, currentcurrency: currentcurrency
                    //});

                    doc = require('../../decorator/user/lightweight')({
                        document: doc, loggeduser: options.auth,
                        environment: options.environment
                    });

                    finalresults.push(doc);
                });
                callback(finalresults);

                //if (options.auth != null && options.auth.user != null) {
                //    options.auth.user.isAffiliate ? process.nextTick(function () {
                        

                //        //var todo = (results.Data != null && results.Data.length > 0) ? results.Data.length : 0;
                //        //var finalresults = [];
                //        //var errors = [];
                //        //(todo > 0) ? process.nextTick(function () {
                //        //    _.each(results.Data, function (doc) {

                //        //        doc = require('../../decorator/priceexchangesync')({
                //        //            document: doc, currency: m_currentcurrency, 
                //        //            exchanges: exchanges, currentcurrency: currentcurrency
                //        //        });
                //        //        doc = require('../../decorator/product.affiliate.price')({
                //        //            core: core, document: doc, loggeduser: options.auth,
                //        //            environment: options.environment
                //        //        }, 
                //        //    function (document) {
                //        //            finalresults.push(document);
                //        //            todo--;
                //        //            (todo == 0) ? callback(finalresults) : null;
                //        //        }, 
                //        //    function (err) {
                //        //            errors.push(err);
                //        //            todo--;
                //        //            (todo == 0) ? errorcallback(errors) : null;
                //        //        });
                //        //    });
                //        //}) : callback(results.Data);

                //    }) : callback(results.Data);
                //}
                //else {
                //    callback(results.Data);
                //}
            } else {
                console.error(results);
                errorcallback(results);
            }
        });
    });
    options.command = 'count';
    require('../../decorator/query/find')(options,
        function (query) {
            console.log(query);
            options.query = query;

            mongo.count(options, function (results) {
                if (results.ResultOK == true) {
                    callback({ count: results.Data });
                } else {
                    errorcallback(results);
                }
            });

        },
        function (err) {
            errorcallback(err);
        });
}
