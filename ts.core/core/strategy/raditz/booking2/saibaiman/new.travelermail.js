module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    var sendData = conf.sendData;

    console.log('New Booking: ' + data.idBooking);
    console.log('Lets send Traveler Mail');
    var template = conf.sendData.booking.bookingmodel == 'whitelabel' ? core.plugins.mxp.templatenames.booking2[conf.sendData.booking.bookingmodel]['traveler']['new'] : null;
    template != null ? template.fullpath = core.plugins.mxp.templatenames.booking2._basepath + template.file : null;

    template != null ?
        setImmediate(function () {
            core.plugins.mxp.rendertemplate({
                template: template,
                to: sendData.booking.signin.email || 'notifications@yourttoo.com',
                subject: template.subject + ' - ' + conf.sendData.booking.idBooking,
                parameter: sendData
            }, function (html) {
                console.log(html);

                core.plugins.mxp.push(html, null, function () {
                    console.log('pushed Traveler Mail properly...');
                    callback(null, conf);
                });

            });
        }) :
        setImmediate(function () {
            callback(null, conf);
        });
}