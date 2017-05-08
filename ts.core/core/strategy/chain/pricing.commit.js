module.exports = function (conf, callback) {
    console.log('we have finished...');
    console.log('...exiting');
    //setImmediate(function () {
    //    console.log(conf.booking.getbreakdown());
    //    conf.booking.breakdown = conf.booking.getbreakdown();
    //    callback(null, conf.booking);
    //});
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