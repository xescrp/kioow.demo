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
            err != null ? setImmediate(function () {
                callback(err, conf);
            }) :
                setImmediate(function () {
                    callback(null, docs[0]);
            });
    });
}