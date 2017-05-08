module.exports = function (conf, callback) {
    console.log('payment - setting up booking stuff...');
    var common = require('yourttoo.common');
    var paymentdata = conf.paymentdata;

    conf.paymentoption = {
        '28before': 28 + 7,
        '21before': 21 + 7,
        '14before': 14 + 7,
        '7before': 7 + 7,
        'arrival': 7,
        'departure': 7,
        'default': 30
    };

    conf.timezone = {
        "label": "(GMT+01:00) Madrid",
        "useDaylightTime": "0",
        "value": "+1"
    };

    conf.collectionname = 'Payments';
    conf.currentcurrency = 'EUR';
    conf.currencys = common.staticdata.currencys;
    conf.paymentdata = conf.paymentdata;

    conf.bookingquery = conf.idbooking != null ? { idBooking: conf.idbooking } : null;
    conf.affiliate = conf.auth.user.isAffiliate ? conf.auth : null;
    conf.affiliatequery = conf.affiliate != null ? { code: conf.affiliate.code } : null;

    setImmediate(function () {
        callback(null, conf);
    });

}