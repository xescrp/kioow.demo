module.exports = function (conf, callback) {
    console.log('booking - save builded booking');
    var core = conf.core;
    var booking = conf.booking;

    booking != null ?
        setImmediate(function () {
            booking.timezone = conf.timezone != null ? conf.timezone : booking.timezone;

            conf.product != null && conf.booking != null ? booking.products.push(conf.product) : null; //set the bookedproduct (you need to run book.saveproduct previously)
            core.list('Bookings2').model.populate(booking, [
                { path: 'affiliate' }, { path: 'invoices' },
                { path: 'products' }, { path: 'dmc' }, { path: 'traveler' },
                { path: 'query' }, { path: 'quote' }, { path: 'payments' },
                { path: 'signin' }, { path: 'stories' }], function (err, popdoc) {
                    err != null ?
                        setImmediate(function () {
                            console.error('Error populating booked product ...');
                            callback(err, conf);
                        })
                        :
                        setImmediate(function () {
                            booking = popdoc;
                            booking.status == 'onbudget' &&
                                (booking.bookingmodel == 'bookingb2b' || booking.bookingmodel == 'taylormadeb2b') ?
                                booking.status = 'commited' : null;

                            console.log(booking.idBooking);
                            booking.save(function (err, savedbooking) {
                                err != null ?
                                    setImmediate(function () {
                                        //wrong save...
                                        console.error('Error saving booking...');
                                        console.error(err);
                                        callback(err, conf);
                                    }) :
                                    setImmediate(function () {
                                        //successfull save...
                                        conf.booking = savedbooking;
                                        console.log('Booking saved ok!');
                                        console.log(savedbooking._id);
                                        conf.hermestriggers = booking.status != 'onbudget' ?  [
                                            { collectionname: 'Bookings2', action: 'new', data: booking }] : null;
                                        callback(null, conf);
                                    });
                            });
                        });
                });
        }) :
        setImmediate(function () {
            callback(null, conf);
        });
}