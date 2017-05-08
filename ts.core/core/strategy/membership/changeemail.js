
module.exports = function (options, callback, errorcallback) {
    
    var common = require('yourttoo.common');
    var membership = options.membership;
    //flux
    var crx = common.eventtrigger.eventcarrier(common.utils.getToken());
     
    var oldemail = options.oldemail;
    var newemail = options.newemail;
    
    crx.on('email.changed', function (user) {
        var annex = require('./helpers');
        annex.recoverModelWithUser({ user: user, membership: membership }, function (member) { 
            var mmed = require('../../mediator/hermes.mediator');
            var mediator = new mmed.HermesMediator();
            var subject = mediator.getsubject('Users');
            console.log('notify hermes subject: ' + subject);
            var commandkey = 'notify.suscribers';
            var hrq = {
                subject: subject,
                action: 'changeemail',
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

    crx.on('user.found', function (user) { 
        //change email
        user.email = newemail;
        user.save(function (err, doc) {
            if (err) {
                console.log(err);
                crx.emit('all.error', err);
            } else {
                crx.emit('all.done', { ResultOK: true, Message: 'Email changed' });
                crx.emit('email.changed', user);
            }
        });
    });
    
    crx.on('newemail.available', function () { 
        membership.mongo.findone({ collectionname: 'Users', query: query }, function (results) {
            (results != null && results.ResultOK == true && results.Data != null) ? 
            crx.emit('user.found', results.Data) : 
            crx.emit('user.notfound', results.Message);
        });
    });

    crx.on('user.notfound', function (err) {
        var msg = 'Can not find an existing user with this mail: ' + oldemail;
        crx.emit('all.error', msg);
    });

    crx.on('all.error', function (err) { 
        errorcallback(err);
    });

    crx.on('all.done', function (result) { 
        callback(result);
    });
    
    //lets find user...
    var query = { email: oldemail };
    var querynew = { email: newemail };

    membership.mongo.findone({ collectionname: 'Users', query: querynew }, function (results) {
        (results != null && (results.ResultOK == true && results.Data != null)) ? 
        crx.emit('all.error', 'The email ' + newemail + ' already exists. Please choose another one.') : 
        crx.emit('newemail.available');
    });
}