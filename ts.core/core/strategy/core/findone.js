module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var mongo = core.mongo;
    var coreobj = core.corebase;
    var _ = require('underscore');
    var helper = require('./helpers');
    var exchanges = null;
    var common = require('yourttoo.common');
    var currencys = common.staticdata.currencys;
    var m_currentcurrency = options.currency || 'EUR';
    var currentcurrency = null;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
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
        mongo.findone(options, function (results) {
            if (results.ResultOK == true) {

                
                results.Data = require('../../decorator/product.affiliate.price.sync')({
                    core: core, document: results.Data, loggeduser: options.auth,
                    environment: options.environment
                });

                var selectedcurrency = options.currentcurrency;
                doc = require('../../decorator/exchange.search')({ core: coreobj, program: results.Data, currentcurrency: selectedcurrency, auth: options.auth });
                //results.Data = require('../../decorator/priceexchangesync')({
                //    document: results.Data, currency: m_currentcurrency,
                //    exchanges: exchanges, currentcurrency: currentcurrency
                //});

                results.Data = require('../../decorator/user/lightweight')({
                    document: results.Data, loggeduser: options.auth,
                    environment: options.env 
                });

                callback(results.Data);
                //if (options.auth != null && options.auth.user != null) {
                //    options.auth.user.isAffiliate ? process.nextTick(function () {
                //        results.Data = require('../../decorator/priceexchangesync')({
                //            document: results.Data, currency: m_currentcurrency, 
                //            exchanges: exchanges, currentcurrency: currentcurrency
                //        });
                //        require('../../decorator/product.affiliate.price')({
                //            core: core, document: results.Data, loggeduser: options.auth
                //        }, 
                //        function (document) { callback(document); }, 
                //        function (err) { console.error(err); errorcallback(err); });
                //    }) : callback(results.Data);
                //} else {
                //    callback(results.Data);
                //}
            } else {
                console.error(results);
                errorcallback(results);
            }
        });
    });
    options.command = 'findone';
    require('../../decorator/query/find')(options,
        function (query) {
            console.log(query);
            options.query = query;
            getCurrencyExchanges();
        },
        function (err) {
            errorcallback(err);
        });
    
}
