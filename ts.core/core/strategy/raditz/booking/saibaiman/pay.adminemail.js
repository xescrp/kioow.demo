module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var sendData = conf.sendData;
    var booking = conf.booking;
    var mailtemplates = conf.mailtemplate;
	console.log('New Booking: ' + data.idBooking);

    // templates
    var toAdmin = data.affiliate != null ? 'notifications@yourttoo.com' : 'notifications@openmarket.travel';
    toAdmin = 'xisco@openmarket.travel';
	var ml = require('../../../../factory/mailing');
	var mailer = new ml.Mailer();
	var mmux = require('../../../../mediator/mailstack.mediator');
	var msend = new mmux.MailStackMediator();

    booking.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + data.idBooking;

    // *************************
    //the mail for OM/YTO Admins
    // *************************
	mailer.SetupEmail(
        toAdmin,
		mailtemplates.travelersense,
		booking,
		function (adminMail) {
			//send emails...
			msend.send(adminMail,
                function (ok) {
                	conf.results.push({
                		ResultOK: true,
                		Message: 'Mail sent to YTO Admin',
                		Mail: adminMail
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