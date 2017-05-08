module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;

    var sendData = conf.sendData;

	console.log('New Booking: ' + data.idBooking + ' - traveler notify');
    var toAdmin = data.affiliate != null ? 'notifications@yourttoo.com' : 'notifications@openmarket.travel';

    var parameterSwig = {
    	booking: bookingBD,
    	product: product,
    	countries: utils._showCountries(product.itinerary),
    	tags: utils._showTagsArray(product.tags),
    	hotelcats: utils._showHotelCats(product.itinerary, '_es'),
    	lang: '_es',
    	distribution: utils._showDistribution(bookingBD.roomDistribution),
    	urlViaje: filepaths.rooturl + "/viaje/" + product.slug,
    	urlRestoPago: filepaths.rooturl + "/booking-pos?bookingId=" + bookingBD.idBooking,
    	mainImageProduct: utils._cloudinary_url(product.productimage.url, 'mainproductimage'),
    	urlBono: filepaths.rooturl + "/bono?bookingId=" + bookingBD.idBooking,
    	query: queryBD,
    	iatas: utils._getIatas()
    };

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