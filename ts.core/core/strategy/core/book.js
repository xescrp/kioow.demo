module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var core = options.core;
    
    var mongo = core.mongo;
    var coreobj = core.corebase;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var sourcebooking = options.booking;
    
    cev.on('saved.ok', function (hdata) {
        var mmed = require('../../mediator/hermes.mediator');
        var mediator = new mmed.HermesMediator();
        
        var action = 'new';
        var subject = mediator.getsubject('Bookings');

        console.log('notify hermes subject: ' + subject);
        var commandkey = 'notify.suscribers';
        var hrq = {
            subject: subject,
            action: action,
            data: hdata,
            oncompleteeventkey: 'notify.suscribers.done',
            onerroreventkey: 'notify.suscribers.error'
        };
        
        mediator.send(commandkey, hrq, function (result) {
            console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
        });

    });

    cev.on('ready.beforesave', function (booking) {
        booking.save(function (err, doc) { 
            err != null ? cev.emit('all.error', err) : cev.emit('ready.aftersave', doc);
        });
    });
    
    cev.on('ready.aftersave', function (booking) {
        (options.populate != null) ?
            coreobj.list('Bookings').model.populate(booking, options.populate, function (err, booking) { 
                cev.emit('saved.ok', booking);
            })
        : cev.emit('saved.ok', booking);
        cev.emit('all.done', booking);
    });

    cev.on('all.error', function (err) { 
        errorcallback(err);
    });
    
    cev.on('all.done', function (result) { 
        callback(result);
    });
    
    cev.on('check.affiliate', function (booking) {
        (booking.affiliate != null && typeof booking.affiliate == "string") ? 
        setImmediate(function () {
            coreobj.list('Affiliate').model.find({ _id: booking.affiliate })
                .exec(function (err, affis) {
                err != null ? cev.emit('all.error', err) : booking.affiliate = affis[0], cev.emit('ready.beforesave', booking);
            });
        }) : 
        setImmediate(function () { 
            cev.emit('ready.beforesave', booking);
        });
    });

    if (sourcebooking != null) { 
        require('../../factory/codesgenerator')(mongo, 'Bookings', function (cbcode) {
            //reformat the code 
            cbcode = require('../../factory/codesformatter')({
                code: cbcode,
                collectionname: 'Bookings',
                document: sourcebooking
            });
           
            sourcebooking.idBooking = cbcode;
            var booking = mongo.getmodel({ collectionname: 'Bookings', modelobject: sourcebooking });
            
            //cev.emit('ready.beforesave', booking);
            //recalculate...
            var decoratorswitch = (booking.affiliate != null) ? 'affiliate' : 'dmc';
            var decoratorname = ['bookingprice', decoratorswitch].join('.');
            require('../../decorator/' + decoratorname)({ core: coreobj, booking: booking }, 
                function (booking) { cev.emit('check.affiliate', booking); }, 
                function (err) { cev.emit('all.error', err); });
        });
    }
    else {
        var err = 'You can not save empty data, please review your request, [booking] field is null or not defined';
        cev.emit('all.error', err);
    }

}