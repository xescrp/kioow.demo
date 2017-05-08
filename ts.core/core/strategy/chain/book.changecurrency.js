module.exports = function (conf, callback) {

    var common = require('yourttoo.common');
    var _ = require('underscore');

    var booking = conf.booking;
    var currencies = {
        EUR: { value: 'EUR', symbol: '€', label: 'Euro' },
        USD: { value: 'USD', symbol: 'US$', label: 'USD' },
    };

    var targetcurrency = conf.currentcurrency;
    var sourcecurrency = booking.pricing.currency.value;
    //
    var core = conf.core;
    var member = conf.auth;
    if (!member.user.isAdmin && sourcecurrency != null) {
        //AMOUNT PVP AAVV and PVP ROOMS AAVV
        booking.pricing.amount = core.plugins.cux.convert(booking.pricing.amount, sourcecurrency, targetcurrency);
        booking.pricing.currency.label = currencies[targetcurrency].label;
        booking.pricing.currency.value = currencies[targetcurrency].value;
        booking.pricing.currency.symbol = currencies[targetcurrency].symbol;

        booking.pricing.rooms.double = core.plugins.cux.convert(booking.pricing.rooms.double, sourcecurrency, targetcurrency);
        booking.pricing.rooms.triple = core.plugins.cux.convert(booking.pricing.rooms.triple, sourcecurrency, targetcurrency);
        booking.pricing.rooms.single = core.plugins.cux.convert(booking.pricing.rooms.single, sourcecurrency, targetcurrency);
        booking.pricing.rooms.quad = core.plugins.cux.convert(booking.pricing.rooms.quad, sourcecurrency, targetcurrency);
        booking.pricing.rooms.currency = targetcurrency;
        //ROOMS NET AAVV
        booking.pricing.roomsnet.double = core.plugins.cux.convert(booking.pricing.roomsnet.double, sourcecurrency, targetcurrency);
        booking.pricing.roomsnet.triple = core.plugins.cux.convert(booking.pricing.roomsnet.triple, sourcecurrency, targetcurrency);
        booking.pricing.roomsnet.single = core.plugins.cux.convert(booking.pricing.roomsnet.single, sourcecurrency, targetcurrency);
        booking.pricing.roomsnet.quad = core.plugins.cux.convert(booking.pricing.roomsnet.quad, sourcecurrency, targetcurrency);
        booking.pricing.roomsnet.currency = targetcurrency;

        //ROOMS AAVV AND NET AAVV
        _.each(booking.rooms, function (room) {
            room.price = core.plugins.cux.convert(room.price, sourcecurrency, targetcurrency);
            room.pricecurrency = targetcurrency;

            room.net = core.plugins.cux.convert(room.net, sourcecurrency, targetcurrency);
            room.netcurrency = targetcurrency;

            room.priceperpax = core.plugins.cux.convert(room.priceperpax, sourcecurrency, targetcurrency);
            room.priceperpaxcurrency = targetcurrency;
            room.netperpax = core.plugins.cux.convert(room.netperpax, sourcecurrency, targetcurrency);
            room.netperpaxcurrency = targetcurrency;
        });
        var pax_amounts = [];
        _.each(booking.paxes, function (pax) {
            pax.price = core.plugins.cux.convert(pax.price, sourcecurrency, targetcurrency);
            pax.pricecurrency = targetcurrency;
            pax_amounts.push(pax.price);
            pax.net = core.plugins.cux.convert(pax.net, sourcecurrency, targetcurrency);
            pax.netcurrency = targetcurrency;
        });
        var checktotal = 0;
        _.each(pax_amounts, function (amount) {
            checktotal += amount;
        });
        booking.pricing.amount = checktotal;
        conf.booking = booking;
    }

    setImmediate(function () {
        callback(null, conf);
    });

}