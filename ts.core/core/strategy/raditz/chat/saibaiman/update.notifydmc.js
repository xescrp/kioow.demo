module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var chat_edited = data.current;
    var chat_original = data.original;


	var mailer = conf.mailer;
	var msend = conf.msend;
	var sendData = conf.sendData;
	var mailtemplates = conf.mailtemplates;


	(chat.booking == null && to.type == 'dmc') ?
	setImmediate(function () {
        var from = chat_edited.messages[chat_edited.messages.length - 1].from;
        var to = chat_edited.messages[chat_edited.messages.length - 1].to;
        sendData.from = from;

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