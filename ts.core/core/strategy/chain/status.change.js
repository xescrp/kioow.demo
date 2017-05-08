module.exports = function (conf, callback) {
    console.log('status change - changing...');
    var core = conf.core;
    
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var collection = conf.collection;
    var today = new Date();
    var err = null;
    var setter = {
        Bookings2: function () {
            var booking = conf.booking;
            var newstatus = conf.newstatus;

            statushash = {
                cancelled: function () {

                    booking.dates.canceldate.year = today.getFullYear();
                    booking.dates.canceldate.month = today.getMonth();
                    booking.dates.canceldate.day = today.getDate();
                    booking.dates.canceldate.monthname_en = common.utils.getMonthNameEnglish(today.getMonth());
                    booking.dates.canceldate.monthname_es = common.utils.getMonthNameSpanish(today.getMonth());
                    booking.dates.canceldate.date = today;

                    booking.previousstatus = booking.status.toString();
                    booking.status = 'cancelled';

                    conf.story = {
                        code: ['status.change', 'cancelled', common.utils.getToken()].join('-'),
                        description: 'Reserva cancelada por ' + conf.auth.user.email,
                        previousstate: booking.previousstatus,
                        currentstate: booking.status
                    };
                    conf.hermestriggers = [
                        { collectionname: 'Bookings2', action: 'status', data: booking }];

                    conf.story.currentstate = booking.status;
                    conf.booking = booking;
                },

            };

            statushash[newstatus]();
        },
        UserQueries: function () {
            var userquery = conf.userquery;
            var newstatus = conf.newstatus;
            var reason = conf.statusdata;
            statushash = {
                cancelled: function () {
                    var today = new Date();

                    userquery.state = 'cancelled';
                    userquery.cancelled.cancelDate = today;
                    userquery.cancelled.user = reason.user;
                    userquery.cancelled.byTraveler = reason.byTraveler;
                    userquery.cancelled.reason = reason.reason;

                    userquery.historic.push({
                        date: today,
                        state: 'cancelled',
                        user: reason.user
                    });
                    userquery.comments.push({
                        date: today,
                        text: 'Query cancelada',
                        user: reason.user
                    });


                },

            };

            statushash[newstatus]();
        },
        Quotes: function () {
            var quote = conf.quote;
            var newstatus = conf.newstatus;
            var reason = conf.statusdata;
            statushash = {
                cancelled: function () {
                    var today = new Date();

                    quote.status = 'cancelled';
                    quote.cancelled.cancelDate = today;
                    quote.cancelled.user = reason.user;
                    quote.cancelled.byTraveler = reason.byTraveler;
                    quote.cancelled.reason = reason.reason;

                    conf.hermestriggers = [
                        { collectionname: 'taylormade.quotes', action: 'status', data: booking }];

                    conf.quote = quote;
                }
            }
        }
    }

    setter[collection]();

    setImmediate(function () {
        callback(err, conf);
    });


}