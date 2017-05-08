module.exports = function (conf, callback) {
    var core = conf.core;
    var code = conf.productcode;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var m_currentcurrency = conf.currentcurrency;
    var currencys = common.staticdata.currencys;
    console.log('fetching exchanges from cms');
    core.list('Exchange').model.find({ state: 'published' })
    .exec(function (err, docs) {
        err != null ? process.nextTick(function () {
            callback(err, null);
        }) : process.nextTick(function () {
            conf.exchanges = _.map(docs, function (exchange) { return exchange.toObject(); });
            var fcr = _.filter(currencys, function (currency) {
                return currency.value == m_currentcurrency;
            });
            if (fcr != null && fcr.length > 0) {
                conf.selectedcurrency = fcr[0];
            }
            callback(null, conf);
        });
    });
}
