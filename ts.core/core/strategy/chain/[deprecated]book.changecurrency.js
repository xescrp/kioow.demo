module.exports = function (conf, callback) {

    var common = require('yourttoo.common');
    var _ = require('underscore');

    var booking = conf.booking;
    var tocurrency = conf.currentcurrency;
    var tocurrencyOb = conf.selectedcurrency;
    var core = conf.core;


    setImmediate(function () {
        if (booking.pricing.currency.value.toLowerCase() != tocurrency.toLowerCase()) {
            console.log('change booking currency: ' + booking.pricing.currency.value + ' -> ' + tocurrency);
            //amount - pricing
            booking.pricing.amount = common.utils.convertValueToCurrency(
                booking.pricing.amount,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            //rooms - pricing
            booking.pricing.rooms.double = common.utils.convertValueToCurrency(
                booking.pricing.rooms.double,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            booking.pricing.rooms.triple = common.utils.convertValueToCurrency(
                booking.pricing.rooms.triple,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            booking.pricing.rooms.single = common.utils.convertValueToCurrency(
                booking.pricing.rooms.single,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            //rooms snapshot -pricing
            booking.pricing.roomssnapshot.double = common.utils.convertValueToCurrency(
                booking.pricing.roomssnapshot.double,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            booking.pricing.roomssnapshot.triple = common.utils.convertValueToCurrency(
                booking.pricing.roomssnapshot.triple,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            booking.pricing.roomssnapshot.single = common.utils.convertValueToCurrency(
                booking.pricing.roomssnapshot.single,
                booking.pricing.currency.value,
                tocurrency,
                conf.exchanges);
            //paxes prices
            _.each(booking.paxes, function (pax) {
                pax.price = common.utils.convertValueToCurrency(
                    pax.price,
                    booking.pricing.currency.value,
                    tocurrency,
                    conf.exchanges);
            });
            //rooms prices
            _.each(booking.rooms, function (room) {
                room.price = common.utils.convertValueToCurrency(
                    room.price,
                    booking.pricing.currency.value,
                    tocurrency,
                    conf.exchanges);
            });
            booking.pricing.currency.value = tocurrencyOb.value;
            booking.pricing.currency.label = tocurrencyOb.label;
            booking.pricing.currency.symbol = tocurrencyOb.symbol;
            booking.breakdown = booking.getbreakdown();

            conf.booking = booking;
        }

        callback(null, conf);
    });
}