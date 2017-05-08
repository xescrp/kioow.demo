module.exports = function (conf, callback) {
    console.log('we have finished...');
    console.log('...exiting');

    var core = conf.core;
    core.list('Bookings2').model.find({ idBooking: conf.booking.idBooking })
        .populate('products')
        .populate('stories')
        .populate('payments')
        .populate('invoices')
        .populate('affiliate')
        .populate('dmc')
        .populate('traveler')
        .populate('query')
        .populate('quote')
        .populate('signin')
        .populate('flights')
        .exec(function (err, docs) {
            console.log('Booking saved and populated on commit');
            err != null ? setImmediate(function () {
                callback(err, conf);
            }) :
                setImmediate(function () {
                    var rtbook = docs[0].toObject();
                    rtbook.breakdown = docs[0].getbreakdown();
                    callback(null, rtbook);
            });
    });
}