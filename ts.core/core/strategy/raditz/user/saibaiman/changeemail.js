module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    
    var ml = require('../../../../factory/mailing');
    var mailer = new ml.Mailer();
    var mmux = require('../../../../mediator/mailstack.mediator');
    var msend = new mmux.MailStackMediator();

    var helper = require('../../common/helpers');
    var member = data;

    member.contact.email = member.user.email;
    
    var upd = {
        $set : {
            "contact.email": member.user.email
        }
    };
    
    helper.update({
        core: subscriberworker.core,
        query: { code: member.code },
        update: upd,
        collectionname: 'Affiliate'
    });     

    var sendData = {};
    sendData.contact = member.contact;
    sendData.url = core.get('fronturl') + '/affiliate/inicio';

    mailer.SetupEmail(
        member.user.email, 
            'ytoaffiliatechangeemail', 
            sendData, 
            function (changemail) {
            console.log("++ Sending mail to " + member.user.email + "....");
            //send emails...
            msend.send(changemail, 
                function (ok) {
                    conf.results.push({
                        ResultOK : true,
                        Message : 'User email changed. User notified by email',
                        Mail: changemail
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

}