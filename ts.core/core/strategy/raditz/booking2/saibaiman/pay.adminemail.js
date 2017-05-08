module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var sendData = conf.sendData;
    var booking = conf.booking;
    var mailtemplates = conf.mailtemplate;
    
	console.log('New Payment for booking [Admin Email]: ' + data.idBooking);

    // templates
    var toAdmin = data.affiliate != null ? 'notifications@yourttoo.com' : 'notifications@openmarket.travel';
    //toAdmin = 'xisco@openmarket.travel';
	
    booking.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + data.idBooking;

    // *************************
    //the mail for OM/YTO Admins
    // *************************
	conf.mailer.SetupEmailTemplate(
        toAdmin,
		mailtemplates.travelersense,
		booking,
		function (adminMail) {
			//send emails...
			conf.msend.send(adminMail,
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