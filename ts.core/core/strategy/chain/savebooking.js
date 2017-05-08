module.exports = function (conf, callback) {
    console.log('booking - save booking');
    var core = conf.core;
    var booking = conf.booking;
    
    setImmediate(function () { 
        booking.save(function (err, savedbooking) {
            err != null ?
            setImmediate(function () {
                console.error('Error saving booking from payment...');
                console.error(err);
                console.error(booking); 
                callback(err, conf);
            })
            :
            setImmediate(function () {
                core.list('Bookings2').model.populate(savedbooking, [
                    { path: 'affiliate' }, { path: 'invoices' },
                    { path: 'products' }, { path: 'dmc' }, { path: 'traveler' },
                    { path: 'query' }, { path: 'quote' }, { path: 'payments' },
                    { path: 'signin' }, { path: 'stories' }], function (err, popdoc) {
                    err != null ?
                            setImmediate(function () {
                                console.error('Error populating booking ...');
                                callback(err, conf);
                        })
                        :
                        setImmediate(function () {
                            conf.hermestriggers != null && conf.hermestriggers.length > 0 ?
                                conf.hermestriggers.push({ collectionname: 'Bookings2', action: 'update', data: booking }) :
                                conf.hermestriggers = [{ collectionname: 'Bookings2', action: 'update', data: booking }];

                            booking = popdoc;
                            conf.booking = booking;
                            console.log('Booking saved ok!');
                            callback(null, conf);
                    });
                });
            });
        });
    });
    
}