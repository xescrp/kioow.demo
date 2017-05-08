module.exports = function (options, callback, errorcallback) { 

    var membership = options.membership;
    var email = options.email;
    var password = options.password;
    var annex = require('./helpers');
    var query = { email: email };
    var common = require('yourttoo.common');

    membership.mongo.find({ collectionname: 'Users', query: query, populate: [{ path: 'roles' }] }, function (rs) {
        if (rs != null && rs.ResultOK == true) {
            if (rs.Data != null && rs.Data.length > 0) {
                var user = rs.Data[0];
                var authoptions = {
                    user: user,
                    membership: membership,
                    password: password
                };
                
                var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
                //Hermes
                cev.on('login.complete', function (hdata) {
                    var data = hdata;
                    var collection = 'Users';
                    
                    var mmed = require('../../mediator/hermes.mediator');
                    var mediator = new mmed.HermesMediator();
                    
                    var subject = mediator.getsubject(collection);
                    console.log('notify hermes subject: ' + subject);
                    var commandkey = 'notify.suscribers';
                    var hrq = {
                        subject: subject,
                        action: 'login',
                        data: data,
                        oncompleteeventkey: 'notify.suscribers.done',
                        onerroreventkey: 'notify.suscribers.error'
                    };
                    
                    mediator.send(commandkey, hrq, function (result) {
                        console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
                    });
                });

                annex.recoverModelForAuth(authoptions, function (model) {
                    if (model != null) {
                        //SUCCESSFULL LOGIN!!
                        var session = annex.buildSession(user, model);
                        console.log(session);
                        callback(session);
                        cev.emit('login.complete', session);
                    }
                    else {
                        errorcallback({ ResultOK : false, Message: 'Your email or password is invalid. Please try again' });
                    }
                }, function (err) {
                    errorcallback({ ResultOK: false, Message: err });
                });
            }
            else {
                errorcallback({ ResultOK : false, Message: 'Your email or password is invalid. Please try again' });
            }
                
        } else {
            errorcallback({ ResultOK: false, Message: 'We have some problems accessing database, please try again'});
        }
    });

}