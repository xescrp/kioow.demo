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
    var changed = (booking_original.meetingdata != booking_edited.meetingdata);
    
    (changed) ? 
    setImmediate(function () {
        
        console.log('* notifyTransferchangeDMC: booking: ' + booking_original.idBooking + ' cancelled'); 
        var maildmc = (booking_original.dmc.contact != null && booking_original.dmc.contact.bookingContact != null) ? 
            booking_original.dmc.contact.bookingContact.email : booking_original.dmc.user.email;
        
        var sendData = {};
        sendData.ca = {
            url : core.get('frontadminurl') + '/dmc-booking?idbooking=' + booking_original.idBooking,
            txt : 'GO TO BOOKING'
        };
        
        sendData.booking = booking_edited;
        sendData.idbooking = booking_edited.idBooking;

        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();

        mailer.SetupEmail(
            maildmc, 
            mailtemplates.changesdmc, 
            sendData, 
                function (adminMail) {
                msend.send(adminMail, 
                        function (ok) {
                    conf.results.push({
                        ResultOK : true,
                        Message : 'Transfer change Booking DMC mail sent',
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