module.exports = function (conf, callback) {

    var core = conf.core;
    var data = conf.data;
    var sendData = conf.sendData;
    var booking = conf.booking;
    var mailtemplates = conf.mailtemplate;
    console.log('New Payment for booking: [Affiliate Email]' + data.idBooking);

    var toAffiliate = (data.affiliate.contact.bookingContact != null && data.affiliate.contact.bookingContact != '') ?
            data.affiliate.contact.bookingContact.email : data.affiliate.contact.email;
    // templates
    toAffiliate = 'notifications@yourttoo.com';
    //toAdmin = 'xisco@openmarket.travel';
    
    booking.url = core.get('fronturl') + 
            '/affiliate/booking-detail/?idbooking=' + data.idBooking + "#tabadmin"; 
    
    // *************************
    //the mail for OM/YTO Admins
    // *************************
    conf.mailer.SetupEmailTemplate(
        toAffiliate,
		mailtemplates.affiliate,
		booking,
		function (affiliateEmail) {
            //send emails...
            conf.msend.send(affiliateEmail,
                function (ok) {
                conf.results.push({
                    ResultOK: true,
                    Message: 'Mail sent to Affiliate ' + toAffiliate,
                    Mail: affiliateEmail
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