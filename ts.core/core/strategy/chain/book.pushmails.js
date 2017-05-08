module.exports = function (conf, callback) {

    var common = require('yourttoo.common');
    var _ = require('underscore');
    var async = require('async');

    var booking = conf.booking; 
    var core = conf.core;

    var hevents = conf.hermesevented;

    if (hevents != null && hevents.length > 0) {
        var newbookingevent = _.find(hevents, function (hev) {
            return hev.subject == 'booking' && hev.action == 'new';
        });

        //newbookingevent != null && (booking.bookingmodel.indexOf('') || ? setImmediate() : setImmediate();

        //for white label
        newbookingevent != null && booking.bookingmodel == 'whitelabel' ?
            setImmediate(function () {

                var paralleltasks = [];
                console.log('pushing the email for affiliate ...');
                paralleltasks.push(function (callback) {
                    //affiliate ...
                    core.plugins.mxp.rendertemplate({
                        templatename: 'wl_affiliate_new_booking',
                        to: 'xisco@yourttoo.com',
                        subjectappend: 'idBooking',
                        parameter: data
                    }, function (html) {
                        console.log(html);

                        core.plugins.mxp.push(html, hevent, function () {
                            console.log('pushed properly...');
                        });

                    });
                });
                console.log('pushing the email for dmc ...');
                paralleltasks.push(function (callback) {
                    //dmc ...
                    core.plugins.mxp.rendertemplate({
                        templatename: 'wl_dmc_new_booking',
                        to: 'xisco@yourttoo.com',
                        subjectappend: 'idBooking',
                        parameter: data
                    }, function (html) {
                        console.log(html);

                        core.plugins.mxp.push(html, hevent, function () {
                            console.log('pushed properly...');
                        });

                    });
                });
                console.log('pushing the email for traveler ...');
                paralleltasks.push(function (callback) {
                    //traveler ...
                    core.plugins.mxp.rendertemplate({
                        templatename: 'wl_traveler_new_booking',
                        to: 'xisco@yourttoo.com',
                        subjectappend: 'idBooking',
                        parameter: data
                    }, function (html) {
                        console.log(html);

                        core.plugins.mxp.push(html, hevent, function () {
                            console.log('pushed properly...');
                        });

                    });
                });
                console.log('pushing the email for admin ...');
                paralleltasks.push(function (callback) {
                    //admin ...
                    core.plugins.mxp.rendertemplate({
                        templatename: 'wl_admin_new_booking',
                        to: 'xisco@yourttoo.com',
                        subjectappend: 'idBooking',
                        parameter: data
                    }, function (html) {
                        console.log(html);

                        core.plugins.mxp.push(html, hevent, function () {
                            console.log('pushed properly...');
                        });

                    });
                });
                //launch everything...
                console.log('pushing the email for traveler...');
                async.parallel(paralleltasks, function (err, results) {
                    err != null ? console.error(err) : null;
                    conf.mailerresults = results;
                    conf.mailererrors = err;

                    callback(null, conf);
                });
                
            }) :
            setImmediate(function () {
                callback(null, conf);
            });
    }

}