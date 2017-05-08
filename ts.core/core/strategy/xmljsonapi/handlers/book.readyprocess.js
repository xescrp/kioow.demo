module.exports = function (conf, callback) {
    var common = require('yourttoo.common');

    conf.paymentoption = {
        '28before' : 28 + 7,
        '21before': 21 + 7,
        '14before': 14 + 7,
        '7before': 7 + 7,
        'arrival': 7,
        'departure': 7,
        'default': 30
    };
    
    conf.datesPool = {
        start: {},
        end: {},
        finalpayment: null
    };
    
    conf.timezone = {
        "label" : "(GMT+01:00) Madrid",
        "useDaylightTime" : "0",
        "value" : "+1"
    };

    conf.bookingmodel = conf.bookingmodel || 'bookingb2b';

    conf.currentcurrency = 'EUR';
    conf.currencys = common.staticdata.currencys;

}