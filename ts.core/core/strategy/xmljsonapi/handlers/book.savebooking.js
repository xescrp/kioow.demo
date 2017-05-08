module.exports = function (conf, callback) {
    var core = conf.core;
    var booking = conf.booking;

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
            callback(null, conf);
        });
    });
}