module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var membership = options.membership;
    //flux
    var crx = common.eventtrigger.eventcarrier(common.utils.getToken());
    var annex = require('./helpers');
    
    var email = options.email;
    var code = common.utils.getToken();
    console.log(email + ' requested for deletion...');

    var mmed = require('../../mediator/hermes.mediator');
    var mediator = new mmed.HermesMediator();
    
    
    var subject = mediator.getsubject('Users');
    console.log('notify hermes subject: ' + subject);
    var action = 'delete';

    var rq = {
        email: email,
    };
    
    var commandkey = 'notify.suscribers';
    var hrq = {
        subject: subject,
        action: action,
        data: rq,
        oncompleteeventkey: 'notify.suscribers.done',
        onerroreventkey: 'notify.suscribers.error'
    };
    
    mediator.send(commandkey, hrq, function (result) {
        console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
    });

    var result = {
        ResultOK: true,
        Message: 'Your account has been requested for deletion.'
    };

    process.nextTick(function () { callback(result); });

    console.log('finished remove account...');
};