module.exports = function (conf, callback) {
    
    console.log('getting bookings');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var done = {
        count: false,
        last: false
    };

    function isdoneandexit() {
        var isdone = _.every(done);
        isdone ? callback(null, conf) : null;
    }

    cev.on('book.count', function () {
        done.count = true;
        isdoneandexit();
    });

    cev.on('book.last', function () {
        done.last = true;
        isdoneandexit();
    });

    var core = conf.core;

    core.list('Bookings2').model.find().count(function (err, count) {
        conf.results.bookings.total = count;
        cev.emit('book.count');
    })

    core.list('Bookings2').model.find({ $and: [{ status: { $nin: ['cancelled', 'error', 'onbudget'] } }, { bookingmodel: { $ne: 'budget' } }] })
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
        .limit(10)
        .sort({ createdOn : -1 })
        .exec(function (err, docs) {
            err != null ? console.error(err) : null;
            conf.results.bookings.last = docs;
            cev.emit('book.last');
        });
}