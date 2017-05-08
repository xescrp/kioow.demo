module.exports = function (conf, callback) {
    console.log('booking - add stories');
    var core = conf.core;
    var booking = conf.booking;

    var common = require('yourttoo.common');

    var story = core.list('Stories').model({
        code: common.utils.getToken(),
        modelrelated: 'Bookings2',
        storytype: 'historic', //historic, comment, 
        parentid: booking._id,
        date: new Date(),
        user: (conf.auth != null && conf.auth.user != null) ? conf.auth.user.code : null,
        story: {
            description: 'new booking is requested -> this booking is on ' + booking.status + ' state',
            previousstate: '',
            currentstate: booking.status,
        }
    });

    story.save(function (err, doc) {
        err != null ? setImmediate(function () {
            conf.booking.stories.push(story);
            callback(err, conf);
        }) :
            setImmediate(function () {
                callback(null, conf);
        });
    });
}