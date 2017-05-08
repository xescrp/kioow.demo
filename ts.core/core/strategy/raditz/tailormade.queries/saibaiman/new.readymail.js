module.exports = function (conf, callback) {

	setImmediate(function () {
		var common = require('yourttoo.common');
		var utils = require('../../../../tools');

		var core = conf.core;
		var data = conf.data;

		console.log('New Query: ' + data.code);
        var dataSend = {};
        dataSend.request = data;
        dataSend.querycode = data.code;
        dataSend.companyname = data.affiliate.company.name;

		conf.dataSend = dataSend;

		callback(null, conf);
	});
	
}