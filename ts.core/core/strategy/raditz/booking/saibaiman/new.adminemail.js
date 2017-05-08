module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var sendData = conf.sendData;

	console.log('New Booking: ' + data.idBooking);

    // templates
    var mailtemplates = {
        affiliate: 'ytoaffiliatebooking', //the mail for the affiliate
        yto: 'ytobooking', //the mail for OMT/YTO Admin reserva b2b
        omt: 'omtbooking', //the mail for OMT/YTO Admin reserva b2c
        dmc: 'dmcbooking'
    };
    var toAdmin = data.affiliate != null ? 'notifications@yourttoo.com' : 'notifications@openmarket.travel';

	var ml = require('../../../../factory/mailing');
	var mailer = new ml.Mailer();
	var mmux = require('../../../../mediator/mailstack.mediator');
	var msend = new mmux.MailStackMediator();

    sendData.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + data.idBooking;

    // *************************
    //the mail for OM/YTO Admins
    // *************************
	mailer.SetupEmail(
        toAdmin,
		mailtemplates.yto,
		sendData,
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