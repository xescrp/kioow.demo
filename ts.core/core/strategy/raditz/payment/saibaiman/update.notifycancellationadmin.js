module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    var booking_edited = data.current;
    var booking_original = data.original;
    booking_edited.affiliate = booking_original.affiliate;// el afiliado viene populado en la reserva original, lo copio en la editada
    booking_edited.dmc = booking_original.dmc;// el dmc viene populado en la reserva original, lo copio en la editada
    
    var utils = require('../../../../tools');

    var mailtemplates = {
        cancelltraveler: 'userbookingcancelled',
        cancelldmc: 'dmcbookingcancelled',
        cancellaffiliate: 'ytoaffiliatecancellbooking', //the mail for the affiliate
        cancellyto: 'ytoadmincancellbooking', //the mail for OMT/YTO Admins
        changesadmin : 'ytoadminbookingchange', //mail para notificar a ADMIN un cambio de pax por parte de afiliado
        changesdmc : 'dmcbookingchange',//mail para notificar a DMC un cambio de pax por parte de afiliado
        changesaffiliate : 'ytoaffiliateupdatedbooking'//mail para notificar a AFFILIATE un cambio de pax por parte de afiliado           
    };
	//1) **************** START *********************    
    var changed = (booking_edited.cancelDate != null && booking_original.cancelDate != booking_edited.cancelDate);
    
    (changed) ? 
    setImmediate(function () {
        
        console.log('* notifyCancellationAdmin: booking: ' + booking_original.idBooking + ' cancelled');
        var sendData = {};
        var product = JSON.parse(booking_edited.product);

        sendData.product = JSON.parse(booking_edited.product);
        sendData.modification = "Información de cancelacion.";
        sendData.hotelcats = utils._showHotelCats(product.itinerary, '_es');
        sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
        sendData.tags = utils._showTagsArray(product.tags);
        sendData.ca = {
            url : core.get('frontadminurl') + '/dmc-booking?idbooking=' + booking_original.idBooking,
            txt : 'IR A LA RESERVA'
        };

        var adminMail = 'notifications@yourttoo.com';
        
        sendData.booking = booking_edited;
        sendData.idbooking = booking_edited.idBooking;

        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();

        mailer.SetupEmail(
            adminMail, 
            mailtemplates.cancellyto, 
            sendData, 
                function (adminMail) {
                msend.send(adminMail, 
                        function (ok) {
                    conf.results.push({
                        ResultOK : true,
                        Message : 'Cancellation Booking Admin mail sent',
                        Mail: adminMail
                    });
                    callback(null, conf);
                }, function (err) {
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