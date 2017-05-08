module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;

    var ml = require('../../../../factory/mailing');
    var mailer = new ml.Mailer();
    var mmux = require('../../../../mediator/mailstack.mediator');
    var msend = new mmux.MailStackMediator();
    var member = data;
    var sendData = {};
    sendData.contact = member.contact;
    sendData.company = member.company;
    sendData.link = core.get('fronturl') + '/affiliate/account?code=' + member.code + '#tabmessage';

    mailer.SetupEmail(
        member.user.email, 
            'ytoaffiliatechangepassword', 
            sendData, 
            function (changepassword) {
            console.log("++ Sending mail to " + member.user.email + "....");
            //send emails...
            msend.send(changepassword, 
                function (ok) {
                conf.results.push({
                    ResultOK : true,
                    Message : 'User password changed. User notified by email',
                    Mail: changepassword
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