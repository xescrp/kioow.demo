module.exports = function (conf, callback) {
    console.log('budget - save builded booking');
    if (conf.savebudget == true) {
        console.log('budget - save : ture');
        var core = conf.core;
        var booking = conf.booking;
        booking.timezone = conf.timezone != null ? conf.timezone : booking.timezone;
        booking.bookingmodel = 'budget';
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
                        conf.hermestriggers = [
                            { collectionname: 'Bookings2', action: 'budget', data: booking }];
                        callback(null, conf);
                    });
                });
            });
        });
    } else { setImmediate(function () { callback(null, conf); });}
    
}