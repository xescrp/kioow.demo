module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    var sendData = conf.sendData;

    console.log('New Booking: ' + data.idBooking);
    console.log('Lets send Affiliate Mail');
    var template = core.plugins.mxp.templatenames.booking2[conf.sendData.booking.bookingmodel]['affiliate']['new'];
    template.fullpath = core.plugins.mxp.templatenames.booking2._basepath + template.file;

    var mailto = sendData.booking.affiliate.user.email;

    sendData.booking.affiliate.contact != null && sendData.booking.affiliate.contact.bookingContact != null ?
        mailto = sendData.booking.affiliate.contact.bookingContact.email : null;
    
    core.plugins.mxp.rendertemplate({
        template: template,
        to: mailto,
        subject: template.subject + ' - ' + conf.sendData.booking.idBooking,
        parameter: sendData
    }, function (html) {
        console.log(html);

        core.plugins.mxp.push(html, null, function () {
            console.log('pushed Affiliate Mail properly...');
            callback(null, conf);
        });

    });
}