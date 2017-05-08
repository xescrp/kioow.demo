module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;

    var ml = require('../../../../factory/mailing');
    var mailer = new ml.Mailer();
    var mmux = require('../../../../mediator/mailstack.mediator');
    var msend = new mmux.MailStackMediator();
    var reminder = data;

    var swdata = reminder.member;
    swdata.url = reminder.data.link;

    mailer.SetupEmail(
        reminder.user.email, 
            reminder.template, 
            swdata, 
            function (recoverMail) {
            //send emails...
            msend.send(recoverMail, 
                function (ok) {
                conf.results.push({
                    ResultOK: true,
                    Message: 'User want to change password. User notified by email',
                    Mail: recoverMail
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