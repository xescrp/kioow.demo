module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var sendData = conf.sendData;

    console.log('New Booking Prepare Admin Mail for Booking: ' + data.idBooking);
    console.log('Lets send Admin Mail');

    var template = core.plugins.mxp.templatenames.booking2[conf.sendData.booking.bookingmodel]['admin']['new'];
    template.fullpath = core.plugins.mxp.templatenames.booking2._basepath + template.file;

    core.plugins.mxp.rendertemplate({
        template: template,
        to: 'notifications@yourttoo.com',
        subject: template.subject + ' - ' + conf.sendData.booking.idBooking,
        parameter: sendData
    }, function (html) {
        console.log(html);

        core.plugins.mxp.push(html, null, function () {
            console.log('pushed properly ADMIN Mail...');
            callback(null, conf);
        });

    });
}