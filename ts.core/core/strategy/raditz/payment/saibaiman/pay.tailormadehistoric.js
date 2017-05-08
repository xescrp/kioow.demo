module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
	var sendData = conf.sendData;

	var helper = require('../../common/helpers');

	data.queryCode != null ?
	setImmediate(function () {
		console.log("++ query updating: ", data.queryCode);
		var upd = {
			$set: {
				state: 'close',
				idBooking: data.idBooking
			}
		};
		// mail del afilida
		var mail = null;

		if (data.affiliate != null) {
			mail = (data.affiliate.contact != null && data.affiliate.contact.bookingContact != null) ?
				data.affiliate.contact.bookingContact.email : data.affiliate.contact.email;
		}
		else {
			mail = data.traveler.email;
		}
		// *******************************************
		// 1) actualizar query y quotes 
		// query estado close y guardar idbooking y el historico
		// quote estado y idebooking
		// *******************************************
		helper.updateQuotes({
			core: subscriberworker.core,
			query: { code: data.queryCode },
			update: upd,
			collectionname: 'UserQueries',
			quotecode: data.quoteCode,// quitar
			idBooking: data.idBooking,// quitar
			mail: mail// quitar
		}, function (result) {
			console.log("++ query updated ok: ");
			conf.results.push({
				ResultOK: true,
				Message: 'User Query historic updated',
				Data: result
			});
			callback(null, conf);
		}, function (err) {
			console.log("Error in update quote. Details: ", err);
			conf.results.push({
				ResultOK: false,
				Errors: err,
			});
			callback(err, conf);
		});
	})
	:
	setImmediate(function () {
		callback(null, conf);
	});
}