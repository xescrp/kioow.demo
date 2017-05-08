module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var query = conf.bookingsquery || { $and: [{ idBooking: { $ne: null } }] }; //{ idBooking: '001483RY'}, 

    cev.on('bookingfetch.error', function (err) {
        console.error(err);
        conf.errors.push({
            code: 'BOOKING FETCH SAIBAIMAN FAILED',
            error: err,
            date: new Date()
        });

        callback(err, conf);
    });

    cev.on('bookingfetch.done', function (ids) {
        console.log('Fetched ' + ids.length.toString() + ' bookings ids');
        conf.bookingids = _.map(ids, function (booking) { return booking._id; });
        conf.bookingcodes = _.map(ids, function (booking) { return booking.idBooking; });
        callback(null, conf);
    });

    core.list('Bookings2').model.find(query)
        .select('_id idBooking createdOn chargefeatures breakdown dates dmc cancelpolicy')
        .populate('dmc')
        .sort({ 'dates.start.date': 1 })
        .exec(function (err, docs) {
            err != null ? cev.emit('bookingfetch.error', err) : cev.emit('bookingfetch.done', docs);
        });
}