module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var dataSend = conf.dataSend;

	console.log('New Query: ' + data.code);

    // templates
    var mailtemplates = {
        affiliate: 'ytoaffiliatenewrequest', //the mail for the affiliate
        yto: 'omtnewaffiliaterequest' //the mail for OM/YTO Admins
    };

    var toAdmin = data.affiliate != null ? 'notifications@yourttoo.com' : 'notifications@openmarket.travel';

	var ml = require('../../../../factory/mailing');
	var mailer = new ml.Mailer();
	var mmux = require('../../../../mediator/mailstack.mediator');
	var msend = new mmux.MailStackMediator();

    dataSend.url = core.get('frontadminurl') + '/omt-response?code=' + data.code;

    // *************************
    //the mail for OM/YTO Admins
    // *************************
	mailer.SetupEmail(
        toAdmin,
		mailtemplates.yto,
		dataSend,
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