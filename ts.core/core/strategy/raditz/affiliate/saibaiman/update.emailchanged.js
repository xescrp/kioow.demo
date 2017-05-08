module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    var affiliate_edited = data.current;
    var affiliate_original = data.original;
	//1) **************** START *********************
    console.log("++ afiliado actual: ", affiliate_original);
    console.log("++ EMail actual: ", affiliate_original.user.email);
    console.log("++ EMail modificado: ", affiliate_edited.user.email);
    console.log("++ afiliado modificado: ", affiliate_edited);
    
    (affiliate_original.user.email != affiliate_edited.user.email) ? 
    setImmediate(function () { 
        var templatename = 'ytoaffiliateconfirmed';
        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
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
    setImmediate(function () { 
        callback(null, conf);
    });
}