module.exports = function (conf, callback) {
 
    var core = conf.core;
    var data = conf.data;
    var sendData = conf.sendData;
    var booking = conf.booking;
    var mailtemplates = conf.mailtemplate;
    console.log('New Payment for booking: [Traveler Email]' + data.idBooking);
    
    var mailTraveler = data.signin.email;
    // templates
    mailTraveler = 'notifications@yourttoo.com';
    
    booking.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + data.idBooking;

    conf.mailer.SetupEmailTemplate(
        mailTraveler,
		mailtemplates.traveler,
		booking,
		function (travelerEmail) {
            //send emails...
            conf.msend.send(travelerEmail,
                function (ok) {
                conf.results.push({
                    ResultOK: true,
                    Message: 'Mail sent to Traveler ' + mailTraveler,
                    Mail: travelerEmail
                });
                callback(null, conf);
            },
                function (err) {
                conf.results.push({
                    ResultOK: false,
                    Errors: err,
                });
                callback(err, conf);
            });
        });
}