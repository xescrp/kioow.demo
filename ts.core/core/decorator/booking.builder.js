module.exports = function (conf, callback, errorcallback) {
    var common = require('yourttoo.common');

    var booking = conf.booking;
    var breakdown = common.bookpricemachine(booking.pricing);

    booking.breakdown = breakdown;
    
}