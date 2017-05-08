module.exports = function (conf, callback) {
    console.log('payment - setting up booking stuff...');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    conf.timezone = {
        "label": "(GMT+01:00) Madrid",
        "useDaylightTime": "0",
        "value": "+1"
    };

    conf.currentcurrency = conf.quotecurrency || 'EUR';
    conf.currencys = common.staticdata.currencys;
    conf.dmc = conf.dmccode || null;
    conf.dmcquery = conf.dmc != null ? { code: conf.dmc } : null;
    conf.affiliate = conf.affiliatecode || null;
    conf.affiliatequery = conf.affiliate != null ? { code: conf.affiliate } : null;

    setImmediate(function () {
        callback(null, conf);
    });

}

