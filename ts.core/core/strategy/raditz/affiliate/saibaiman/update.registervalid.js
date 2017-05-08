module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    var affiliate_edited = data.current;
    var affiliate_original = data.original;
    
    function checkregistervalid() {
        return ((affiliate_original.membership.registervalid == null || affiliate_original.membership.registervalid == false) && 
                affiliate_edited.membership.registervalid == true);
    }
    
    checkregistervalid() ? 
    setImmediate(function () { //register valid - send mail
        var templatename = 'ytoaffiliateconfirmed';
        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        affiliate_edited.url = subscriberworker.core.get('fronturl') + '/affiliate/inicio';
        mailer.SetupEmail(
            affiliate_edited.contact.email, 
                		templatename, 
                		affiliate_edited,
                function (afiMail) {
                msend.send(afiMail, 
                        function (ok) {
                    conf.results.push({
                        ResultOK : true,
                        Message : 'Affiliate Register Valid: Notification mail sent'
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
    setImmediate(function () { //no need to send mail
        callback(nully, conf);
    });

}