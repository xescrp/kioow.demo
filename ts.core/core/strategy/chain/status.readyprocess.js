module.exports = function (conf, callback) {
    console.log('status change - setting up status stuff...');
    var common = require('yourttoo.common');
    
    
    conf.timezone = {
        "label" : "(GMT+01:00) Madrid",
        "useDaylightTime" : "0",
        "value" : "+1"
    };

    conf.collectionname = conf.collectionname;
    conf.collection = conf.collectionname;
    conf.currentcurrency = 'EUR';
    conf.currencys = common.staticdata.currencys;
    var hjs = {
        Bookings2: function () { conf.bookingquery = conf.query; },
        UserQueries: function () { conf.userqueryquery = conf.query; },
        Quotes: function () { conf.quotequery = conf.query; }
    };

    hjs[conf.collectionname]();

    setImmediate(function () { 
        callback(null, conf);
    });

}