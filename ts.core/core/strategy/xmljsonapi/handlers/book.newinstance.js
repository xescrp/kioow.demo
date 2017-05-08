module.exports = function (conf, callback) {
    var core = conf.core;
    var mongoclass = require('../../../classes/mongoiso');
    var bookingmodel = conf.bookingmodel;

    var mongo = new mongoclass.MongoIso(core);
    require('../../../factory/codesgenerator')(mongo, 'Bookings', function (cbcode) { 
        var booking = core.list('Bookings').model({
            idBooking: cbcode,
            code: cbcode,
            status: '',
            exchanges: conf.exchanges
        });

        conf.booking = booking;
        callback(null, booking);
    });
    
}