module.exports = function (conf, callback) {

	setImmediate(function () {
		var common = require('yourttoo.common');
		var utils = require('../../../../tools/emailhelpers');

		var core = conf.core;
		var data = conf.data;

        var mailtemplate = require('../../../../factory/mailtemplating');

        conf.mailtemplate = mailtemplate;
        console.log(conf._id);
		console.log('New Booking: ' + data.idBooking);
        var sendData = {};
        var product = data.products[0];
		sendData.booking = data;
		sendData.product = product;
		sendData.hotelcats = utils._showHotelCats(product.itinerary, '_es');
		sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
        sendData.tags = utils._showTagsArray(product.tags);
        sendData.countries = utils._showCountries(product.itinerary);
        sendData.idbooking = data.idBooking;
        sendData.lang = '_es';
        sendData.distribution = utils._showDistribution(data);
        sendData.urlViaje = '/viaje/' + product.slug;
        sendData.urlRestoPago = '/booking-pos?bookingId=' + data.idBooking;
        sendData.urlBono = '/bono?bookingId=' + data.idBooking;
		
		conf.sendData = sendData;

		callback(null, conf);
	});
	
}