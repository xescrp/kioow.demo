var common = require('yourttoo.common');
var _ = require('underscore');
console.log('load bookingprice.affiliate.js');
module.exports = function (options, callback, errorcallback) { 
    var core = options.core;
    var booking = options.booking;
    var product = options.product;
    var member = options.member;

    var currencys = common.staticdata.currencys;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());


}