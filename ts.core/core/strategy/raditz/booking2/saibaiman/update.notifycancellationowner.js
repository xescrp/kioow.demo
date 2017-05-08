module.exports = function (conf, callback) {
    var _ = require('underscore');
    var core = conf.core;
    var data = conf.data;
    var booking_edited = data.current;
    var booking_original = data.original;
    booking_edited.affiliate = booking_original.affiliate;// el afiliado viene populado en la reserva original, lo copio en la editada
    booking_edited.dmc = booking_original.dmc;// el dmc viene populado en la reserva original, lo copio en la editada
    
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
        
        console.log('* notifyCancellationOwner: booking: ' + booking_original.idBooking + ' cancelled'); 
        var owner = {};
        owner.is = ''; // affiliate or traveler
        owner.email = '';
        owner.mailtemplate = '';
        
        var sendData = {};
        
        if (booking_edited.affiliate != null) {
            owner.is = 'affiliate';
            owner.email = booking_edited.affiliate.contact.bookingContact != null ? 
            booking_edited.affiliate.contact.bookingContact.email : booking_edited.affiliate.contact.email;
            owner.mailtemplate = mailtemplates.cancellaffiliate;
            sendData.ca = {
                url : core.get('fronturl') + '/affiliate/booking-detail/?idbooking=' + booking_original.idBooking + '#tabadmin',
                txt : 'IR A ADMINISTRACIÓN'
            };
        }  
        if (booking_edited.traveler != null) {
            owner.is = 'traveler';
            owner.email = booking_edited.traveler.email;
            owner.mailtemplate = mailtemplates.cancelltraveler;
            sendData.ca = {
                url : subscriberworker.core.get('frontadminurl') + '/dmc-booking?idbooking=' + booking_original.idBooking,
                txt : 'IR A LA RESERVA'
            };
        } 
        
        sendData.booking = booking_edited;
        sendData.idbooking = booking_edited.idBooking;

        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();

        mailer.SetupEmail(
            owner.email, 
            owner.mailtemplate, 
            sendData, 
                function (adminMail) {
                msend.send(adminMail, 
                        function (ok) {
                    conf.results.push({
                        ResultOK : true,
                        Message : 'Cancellation Booking Owner mail sent',
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