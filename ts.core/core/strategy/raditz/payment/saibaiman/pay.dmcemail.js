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
    var mailDmc = data.dmc.user.email;
    mailDmc = (data.dmc.contact != null && 
    data.dmc.contact.bookingContact != null && 
    data.dmc.contact.bookingContact.email != '') ? data.dmc.contact.bookingContact.email : mailDmc;

    // incluir el codigo de la query si es un tailormade
    if (data.queryCode != null) {
        sendData.query = { code : data.queryCode };
    }

	var ml = require('../../../../factory/mailing');
	var mailer = new ml.Mailer();
	var mmux = require('../../../../mediator/mailstack.mediator');
	var msend = new mmux.MailStackMediator();

    // add url Call to Action
    sendData.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + data.idBooking;

    // *************************
    //the mail for OMT/YTO Admins
    // *************************
	mailer.SetupEmail(
        mailDmc,
		mailtemplates.dmc,
		sendData,
		function (dmcMail) {
			//send emails...
			msend.send(dmcMail,
                function (ok) {
                	conf.results.push({
                		ResultOK: true,
                		Message: 'Mail sent to DMC',
                		Mail: dmcMail
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