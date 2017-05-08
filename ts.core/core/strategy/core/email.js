module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var core = options.core;
    var _ = require('underscore');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var to = options.to;
    var subject = options.subject;
    var mailtemplate = options.mailtemplate;
    var mailparameter = options.mailparameter;

    var mailcontent = options.mailcontent;
    var from = options.from || 'notifications@yourttoo.com';

    var ml = require('../../factory/mailing');
    var mailer = new ml.Mailer();
    var mmux = require('../../mediator/mailstack.mediator');
    var msend = new mmux.MailStackMediator();

    var pending = to.length;
    var errors = [];
    var messages = [];
    var results = [];

    cev.on('work.done', function () {
        var rs = {
            ResultOK: errors.length == 0, 
            Message: '',
            Results: results,
            Error: ''
        };

        rs.Message += messages.join('\r\n');
        rs.Error += errors.join('\r\n'); 
        errors.length == 0 ? cev.emit('all.done', rs) : cev.emit('all.error', rs);
    });

    cev.on('all.done', function (rs) { 
        callback(rs);
    });
    
    cev.on('all.error', function (err) { 
        callback(err);
    });
    

    _.each(to, function (receipt) { 
        mailer.SetupEmail(
            receipt,        	
            mailtemplate, 
            mailparameter, 
            function (mail) {
                    //send emails...
                    msend.send(mail, 
                    function (ok) {
                        messages.push('Email for' + receipt + ' pushed to send');
                        results.push(ok);
                        pending--;
                        pending == 0 ? cev.emit('work.done'): null;
                    }, 
                    function (err) {
                        errors.push(err);
                        pending--;
                        pending == 0 ? cev.emit('work.done'): null;
                    });
            });
    });
    
}