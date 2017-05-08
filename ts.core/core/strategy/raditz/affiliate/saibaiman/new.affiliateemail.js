module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;

	//1) Send EMAILS: **************** START *********************
	console.log('New Affiliate: ' + data.code);

	var mailtemplates = {
		affiliate: 'ytoaffiliatethanks', //the mail for the affiliate
		yto: 'omtnewaffiliate' //the mail for OM/YTO Admins
	};

	var ml = require('../../../../factory/mailing');
	var mailer = new ml.Mailer();
	var mmux = require('../../../../mediator/mailstack.mediator');
	var msend = new mmux.MailStackMediator();

	data.url = core.get('fronturl') + '/affiliate/account/?code=' + data.code;

	// *************************
	//the mail for Affiliate 
	// *************************
	mailer.SetupEmail(
		data.user.email,
		mailtemplates.affiliate,
		data,
		function (afiMail) {
			//send emails...
			msend.send(afiMail,
                function (ok) {
                	conf.results.push({
                		ResultOK: true,
                		Message: 'Mail sent to the affiliate',
                		Mail: afiMail
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