module.exports = function (conf, callback) {
    console.log('booking - setting up booking stuff...');
    var common = require('yourttoo.common');

    var offset = 7;
    conf.paymentoption = {
        '28before': 28 + offset,
        '21before': 21 + offset,
        '14before': 14 + offset,
        '7before': 7 + offset,
        'arrival': 7 + offset,
        'departure': 7 + offset,
        'default': 30
    };
    //white label has fixed condition
    conf.paymentoption = conf.bookingmodel == 'whitelabel' ? {
        '28before': 30,
        '21before': 30,
        '14before': 30,
        '7before': 30,
        'arrival': 30,
        'departure': 30,
        'default': 30
    } : conf.paymentoption;

    conf.paymentoptionprovider = {
        '28before': 28,
        '21before': 21,
        '14before': 14,
        '7before': 7,
        'arrival': 7,
        'departure': 7,
        'default': 30
    };
    
    conf.datesPool = {
        start: {},
        end: {},
        finalpayment: null,
        finalcharge: null
    };
    
    conf.timezone = {
        "label" : "(GMT+01:00) Madrid",
        "useDaylightTime" : "0",
        "value" : "+1"
    };

    conf.bookingmodel = conf.bookingmodel || 'bookingb2b';
    conf.collectionname = 'Bookings';
    conf.currentcurrency = 'EUR';
    conf.currencys = common.staticdata.currencys;

    conf.productquery = { code: conf.productcode };
    conf.affiliate = conf.auth.user.isAffiliate ? conf.auth : null;
    conf.affiliatequery = conf.affiliate != null ? { code: conf.affiliate.code } : null;
    conf.userqueryquery = conf.userquery != null ? { code: conf.userquery } : null;
    conf.quotequery = conf.quote != null ? { code: conf.quote } : null;
    setImmediate(function () { 
        callback(null, conf);
    });

}