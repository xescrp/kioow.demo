module.exports = function (conf, callback) {
    
    
    
    var core = conf.core;
    var data = conf.data;
    var sendData = conf.sendData;
    var booking = conf.booking;
    var mailtemplates = conf.mailtemplate;
    console.log('New Payment for booking: [DMC Email]' + data.idBooking);
    
    var mailDmc = data.dmc.user.email;
    mailDmc = (data.dmc.contact != null && 
    data.dmc.contact.bookingContact != null && 
    data.dmc.contact.bookingContact.email != '') ? data.dmc.contact.bookingContact.email : mailDmc;
    // templates
    mailDmc = 'notifications@yourttoo.com';
    //toAdmin = 'xisco@openmarket.travel';
    
    booking.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + data.idBooking;
    
    // *************************
    //the mail for OM/YTO Admins
    // *************************
    conf.mailer.SetupEmailTemplate(
        mailDmc,
		mailtemplates.dmc,
		booking,
		function (dmcEmail) {
            //send emails...
            conf.msend.send(dmcEmail,
                function (ok) {
                conf.results.push({
                    ResultOK: true,
                    Message: 'Mail sent to DMC ' + mailDmc,
                    Mail: dmcEmail
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