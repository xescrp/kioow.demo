module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    var dataSend = conf.dataSend;

    data.affiliate != null ? 
    setImmediate(function () { 
        // templates
        // templates
        var mailtemplates = {
            affiliate: 'ytoaffiliatenewrequest', //the mail for the affiliate
            yto: 'omtnewaffiliaterequest' //the mail for OM/YTO Admins
        };

        var toAffiliate = (data.affiliate.contact.bookingContact != null && data.affiliate.contact.bookingContact != '') ?
            data.affiliate.contact.bookingContact.email : data.affiliate.contact.email;
        

        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        // add url Call to Action
        dataSend.url = core.get('fronturl') + '/affiliate/request/' + data.code;
        
        // *************************
        //the mail for OM/YTO Admins
        // *************************
        mailer.SetupEmail(
            toAffiliate,
		    mailtemplates.affiliate,
		    dataSend,
		    function (afiMail) {
                    //send emails...
                    msend.send(afiMail,
                    function (ok) {
                        conf.results.push({
                            ResultOK: true,
                            Message: 'Mail sent to Affiliate',
                            Mail: afiMail
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
    })
    : 
    setImmediate(function () { //continue next...
        callback(null, conf);
    });
    
}