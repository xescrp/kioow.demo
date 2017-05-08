module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    
    var ml = require('../../../../factory/mailing');
    var mailer = new ml.Mailer();
    var mmux = require('../../../../mediator/mailstack.mediator');
    var msend = new mmux.MailStackMediator();

    var helper = require('../../common/helpers');
    var who = data;

    var email = who.email;
    var options = {
        messageto: 'dmc@openmarket.travel', 
        messagefrom: 'sender@openmarket.travel', 
        subject: 'Delete Account Request', 
        content: 'The user with email: ' + email + ' requested for delete his account.', 
        ishtml: true
    };
    
    var mail = mailer.SetContent(options);

    msend.send(mail, 
                function (ok) {
        conf.results.push({
            ResultOK : true,
            Message : 'DMC requested for deleting account',
            Mail: mail
        });
        callback(null, conf);
    }, function (err) {
        conf.results.push({
            ResultOK: false,
            Errors: err,
        });
        callback(err, conf);
    });

}