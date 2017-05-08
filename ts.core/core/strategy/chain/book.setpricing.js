module.exports = function (conf, callback) {
    console.log('booking - set pricing');
    var core = conf.core;
    var pricingsetup = require('../../decorator/booking.booksetup');
    pricingsetup != null ? setImmediate(function () { 
        pricingsetup(conf, 
        function (book) {
            conf.booking = book;
            callback(null, conf);
        }, 
        function (err) {
            callback(err, conf);
        });
    }) : 
    setImmediate(function () { 
        callback('This booking model is unknown. please review your request', conf);
    });
    
   
}