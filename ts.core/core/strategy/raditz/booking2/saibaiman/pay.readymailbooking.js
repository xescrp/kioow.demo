module.exports = function (conf, callback) {

	setImmediate(function () {
		var common = require('yourttoo.common');
		var utils = require('../../../../tools/emailhelpers');

		var core = conf.core;
		var data = conf.data;

        var mailtemplate = require('../../../../factory/mailtemplating');
        
        
        var ml = require('../../../../factory/mailing');
        conf.mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        conf.msend = new mmux.MailStackMediator();
        
        conf.stories = [];

        console.log('New Payment for Booking: ' + data.idBooking);
        //chek if its first payment..
        conf.mailtemplate = (data.payments != null && data.payments.length == 1) ?  
            mailtemplate.Bookings[data.bookingmodel].new : mailtemplate.Bookings[data.bookingmodel].pay;
        
        console.log('Is the : ' + data.payments.length.toString() + ' payment for this booking');
        console.log('Payment model : ' + data.paymentmodel);
        conf.booking = data;
        var sendData = {};
        var product = data.products[0];
		sendData.booking = data;
		sendData.product = product;
        conf.booking.hotelcats = utils._showHotelCats(product.itinerary, '_es');
        conf.booking.mainImageProduct = utils._cloudinary_urls(product.productimage.url, 'mainproductimage');
        conf.booking.tags = utils._showTagsArray(product.tags);
        conf.booking.countries = utils._showCountries(product.itinerary);
        conf.booking.idbooking = data.idBooking;
        conf.booking.lang = '_es';
        conf.booking.distribution = utils._showDistribution(data);
        conf.booking.urlViaje = '/viaje/' + product.slug;
        conf.booking.urlRestoPago = '/booking-pos?bookingId=' + data.idBooking;
        conf.booking.urlBono = '/bono?bookingId=' + data.idBooking;
		
		conf.sendData = sendData;

		callback(null, conf);
	});
	
}