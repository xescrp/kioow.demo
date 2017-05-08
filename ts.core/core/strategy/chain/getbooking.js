module.exports = function (conf, callback) {
    console.log('chain - get a booking');

    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var query = conf.bookingquery;
    console.log('get booking..');
    console.log(query);
    query != null ? setImmediate(function () {
        core.list('Bookings2').model.find(query)
        .exec(function (err, docs) {
            err != null ? process.nextTick(function () {
                callback(err, conf);
            }) : process.nextTick(function () {
                    var booking = docs[0];
                    core.list('Bookings2').model.populate(booking, [
                        { path: 'affiliate' }, { path: 'invoices' },
                        { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }, { path: 'dmc' }, { path: 'traveler' },
                        { path: 'query' }, { path: 'quote' }, { path: 'payments' },
                        { path: 'signin' }, { path: 'stories'}], function (err, popdoc) {
                            err != null ?
                                setImmediate(function () {
                                    console.error('Error populating booking...');
                                    callback(err, conf);
                                })
                                :
                                setImmediate(function () {
                                    booking = popdoc;
                                    booking.breakdown == null ? booking.breakdown = booking.getbreakdown() : null;
                                    conf.booking = booking;
                                    callback(null, conf);
                                });
                        });                    
            });
        });
    }) : setImmediate(function () {
        callback(null, conf);
    });
}

