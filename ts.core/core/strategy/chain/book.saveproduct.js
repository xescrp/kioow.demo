module.exports = function (conf, callback) {
    console.log('booking - copy and save(snapshot) booked product');
    var core = conf.core;
    var product = conf.product;
    var booking = conf.booking;
    var common = require('yourttoo.common');
    var sourceId = product._id;
    var sktlt = booking.bookingmodel != 'taylormadeb2b' ? product.toObject() : conf.quote.products.toObject();
    delete sktlt._id;
    delete sktlt.id;
    delete sktlt.createOn;
    delete sktlt.updatedOn;

    var bookedproduct = core.list('BookedProducts').model(sktlt);

    bookedproduct.pvp.b2b = booking.pricing.rooms.double || booking.pricing.rooms.single || booking.pricing.rooms.triple;
    bookedproduct.pvp.b2c = booking.pricing.roomssnapshot.double || booking.pricing.roomssnapshot.single || booking.pricing.roomssnapshot.triple;
    bookedproduct.pvp.b2bperday = bookedproduct.pvp.b2b / bookedproduct.itinerary.length;
    bookedproduct.pvp.b2cperday = bookedproduct.pvp.b2c / bookedproduct.itinerary.length;

    bookedproduct = common.utils.synchronyzeProperties(sktlt, bookedproduct, {
        schema: core.list('DMCProducts').schema
    });

    bookedproduct.save(function (err, doc) {
        err != null ? setImmediate(function () {
            console.error(err);
            callback(err, conf);
        }) : setImmediate(function () {
                conf.product = doc; 
                core.list('BookedProducts').model.populate(doc, [
                    { path: 'dmc' },
                    { path: 'departurecity' },
                    { path: 'stopcities' },
                    { path: 'sleepcity' },
                    { path: 'departurecountry' },
                    { path: 'stopcountry' },
                    { path: 'sleepcountry' }], function (err, popproduct) {
                        err != null ?
                            setImmediate(function () {
                                console.error(err);
                                callback(err, conf);
                            }) :
                            setImmediate(function () {
                                conf.product = popproduct;
                                console.log('Booked product source: ' + sourceId + ' -> ' + conf.product._id);
                                callback(null, conf);
                            });
                    });
            });
    });
}
