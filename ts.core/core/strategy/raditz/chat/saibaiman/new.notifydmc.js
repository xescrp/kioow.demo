module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;

	var chat = data;
	var from = chat.messages[0].from;
	var to = chat.messages[0].to;
	var mailer = conf.mailer;
	var msend = conf.msend;
	var sendData = conf.sendData;
	var mailtemplates = conf.mailtemplates;


	(chat.booking == null && to.type == 'dmc') ?
	setImmediate(function () {

		var mailTo = to.email;
		var template = mailtemplates.dmcchat

		mailer.SetupEmail(
        mailTo,
		template,
		sendData,
		function (adminMail) {
			//send emails...
			msend.send(adminMail,
                function (ok) {
                	conf.results.push({
                		ResultOK: true,
                		Message: 'Mail sent to DMC',
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
	})
	:
	setImmediate(function () {
		callback(null, conf);
	});
}