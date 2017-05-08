module.exports = function (conf, callback) {
    console.log('hermes notification');
    var common = require('yourttoo.common');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var mmed = require('../../mediator/hermes.mediator');
    var mediator = new mmed.HermesMediator();
    conf.hermesevented = [];
    var action = conf.action || 'nothingtodo';
    var subject = !common.utils.stringIsNullOrEmpty(conf.collectionname) ?
        mediator.getsubject(conf.collectionname) : null;

    var mactions = conf.hermestriggers || [{
        action: action,
        subject: subject,
        data: conf.data
    }];

    console.log('notify hermes subjects - total: ' + mactions.length);

    var commandkey = 'notify.suscribers';

    cev.on('hermes.next', function () {
        var hevent = mactions != null && mactions.length > 0 ? mactions.shift() : null;
        hevent != null ? cev.emit('send.message', hevent) : cev.emit('hermes.done');
    });

    cev.on('send.message', function (hevent) {
        hevent.action != 'nothingtodo' ? setImmediate(function () { 
            var hrq = {
                subject: mediator.getsubject(hevent.collectionname),
                action: hevent.action,
                data: hevent.data,
                oncompleteeventkey: 'notify.suscribers.done',
                onerroreventkey: 'notify.suscribers.error'
            };
            
            mediator.send(commandkey, hrq, function (result) {
                console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
                conf.hermesevented.push(result);
                cev.emit('hermes.next');
            });
        }) : 
        setImmediate(function () { 
            cev.emit('hermes.next');
        });
        
    });
    
    cev.on('hermes.done', function () {
        console.log('finished hermes tasks... exiting...');
        callback(null, conf);
    });

    cev.emit('hermes.next');
}