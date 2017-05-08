module.exports = function (conf, callback) {
    console.log('booking - add stories');
    var core = conf.core;
    var booking = conf.booking;
    var story = conf.story || null;

    var common = require('yourttoo.common');
    story != null ?
        setImmediate(function () {
            var _story = core.list('Stories').model({
                code: story.code || common.utils.getToken(),
                modelrelated: 'Bookings2',
                storytype: 'historic', //historic, comment, 
                parentid: booking._id,
                date: new Date(),
                user: (conf.auth != null && conf.auth.user != null) ? conf.auth.user.email : null,
                usertype: (conf.auth != null && conf.auth.user != null) ? conf.auth.user.email : 'unknown',
                story: {
                    description: story.description,
                    previousstate: story.previousstate,
                    currentstate: story.currentstate,
                }
            });

            _story.save(function (err, doc) {
                err != null ? setImmediate(function () {
                    console.error('Error saving history for booking..');
                    console.error(err);
                    callback(err, conf);
                }) :
                    setImmediate(function () {
                        conf.booking.stories.push(_story);
                        callback(null, conf);
                    });
            });
        }) :
        setImmediate(function () {
            callback(null, conf);
        });
}