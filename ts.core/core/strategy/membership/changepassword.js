

module.exports = function (options, callback, errorcallback) { 
    var membership = options.membership;
    var oldpassword = options.oldpassword;
    var newpassword = options.newpassword;
    var email = options.email;
    var bCrypt = require("bcrypt-nodejs");
    var common = require('yourttoo.common');

    var crx = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    crx.on('password.changed', function (user) {
        var annex = require('./helpers');
        annex.recoverModelWithUser({ user: user, membership: membership }, function (member) {
            var mmed = require('../../mediator/hermes.mediator');
            var mediator = new mmed.HermesMediator();
            var subject = mediator.getsubject('Users');
            console.log('notify hermes subject: ' + subject);
            var commandkey = 'notify.suscribers';
            var hrq = {
                subject: subject,
                action: 'changepassword',
                data: member.toObject(),
                oncompleteeventkey: 'notify.suscribers.done',
                onerroreventkey: 'notify.suscribers.error'
            };
            
            mediator.send(commandkey, hrq, function (result) {
                console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
            });

        }, 
        function (err) {
            console.log('can not recover member for hermes notification');
            console.log(err);
        });
    });

    membership.mongo.findone({ collectionname: 'Users', query: { email: email } }, function (result) {
        if (result.ResultOK && result.Data != null) {
            var user = result.Data;
            user._.password.compare(oldpassword, function (err, valid) {
                if (valid) {
                    user.password = newpassword;
                    user.save(function (err, doc) {
                        (err != null) ? errorcallback({ ResultOK: false, Message: err }) : 
                                        callback({ ResultOK: true, Message: 'Password changed' });
                    });
                    crx.emit('password.changed', user);
                } else { 
                    errorcallback({ ResultOK: false, Message: 'The old password is incorrect' });
                }
            });
        } else { 
            errorcallback({ ResultOK: false, Message: 'Can not find an existing user with this mail: ' + mail });
        }
    });

}