module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var affiliate = options.affiliate;

    var originaldata = affiliate.toObject();

    var cev = options.eventcarrier;
    affiliate.membership.registervalid = true;
    affiliate.membership.omtmargin = 4;
    affiliate.membership.validateDate = new Date();

    affiliate.save(function (err, doc) {
        err != null ? errorcallback(err) : setImmediate(function () {
            var mmed = require('../../../mediator/hermes.mediator');
            var mediator = new mmed.HermesMediator();

            var action = 'update';
            originaldata = originaldata;

            var hresult = { current: doc, original: originaldata };
            var subject = mediator.getsubject('Affiliate');

            console.log('notify hermes subject: ' + subject);
            var commandkey = 'notify.suscribers';
            var hrq = {
                subject: subject,
                action: action,
                data: hresult,
                oncompleteeventkey: 'notify.suscribers.done',
                onerroreventkey: 'notify.suscribers.error'
            };

            mediator.send(commandkey, hrq, function (result) {
                console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
            });

            callback({ affiliate : doc });
        });
    });

}