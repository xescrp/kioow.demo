module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
	var sendData = conf.sendData;

	var helper = require('../../common/helpers');
	var mailtemplates = {
		affiliate: 'ytoaffiliatenewrequest', //the mail for the affiliate
		yto: 'omtnewaffiliaterequest' //the mail for OM/YTO Admins
	};

	var historicYTO = {
		date: new Date(),
		state: data.state,
		user: data.affiliate.user.email,
		mailsend: [{ name: mailtemplates.affiliate, date: new Date() }, { name: mailtemplates.yto, date: new Date() }]
	};

	helper.addhistoric({
		core: core,
		userquery: data,
		historic: historicYTO
	}, function (result) {
		conf.results.push({
			ResultOK: true,
			Message: 'Query historic updated',
			data: result
		});
		callback(null, conf);
	}, function (err) {
		conf.results.push({
			ResultOK: false,
			Errors: err,
		});
		callback(err, conf);
	});
}