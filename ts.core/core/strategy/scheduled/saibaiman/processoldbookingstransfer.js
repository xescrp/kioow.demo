module.exports = function (conf, callback) {
    var bookingids = conf.bookingids;
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var statics = { total: 0, done: 0, witherrors: 0, success: 0 };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var witherrors = [];
    function addwitherror(code) {
        witherrors.indexOf(code) >= 0 ? witherrors.push(code) : null;
    }
    cev.on('process.done', function () {
        conf.results = {
            code: 'Bookings Transfered',
            messages: conf.messages,
            statics: statics,
            witherrors: witherrors  
        };
        callback(null, conf);
    });

    cev.on('process.booking', function (booking, products) {
        var iterator = require('../iterators/booking.transferdata');
        var checker = iterator({
            booking: booking,
            core: core,
            destinationcountries: conf.destinationcountries,
            downloadfile: conf.downloadfile,
            uploadfile: conf.uploadfile
        },
            function (booking2) {
                console.log('callback iterator...lets save booking: ' + booking2.idBooking);
                booking2 != null ?
                    core.list('Bookings2').model.populate(booking2, { path: 'products' }, function (err, booking2pop) {
                        booking2pop.save(function (err, doc) {
                            statics.done++;
                            if (err) {
                                statics.witherrors++;
                                console.log('Error transfering: ' + booking2.idBooking);
                                console.error('Error transfering: ' + booking2.idBooing);
                                console.error(err);
                                //console.error(err);
                                addwitherror(booking2.idBooing);
                                conf.errors.push({
                                    code: booking2.idBooking,
                                    error: err
                                });
                                cev.emit('next.booking');
                            }

                            if (doc && err == null) {
                                statics.success++;
                                console.log('Booking2 saved! : ' + booking2.idBooking);
                                conf.messages.push('Booking2 saved! : ' +
                                    '<a href=\"http://openmarket.travel/dmc-booking?idbooking=' + booking2.idBooking + '\">' +
                                    booking2.idBooking + '</a>');
                                cev.emit('next.booking');
                            }
                        })
                    })
                    :
                    (cev.emit('report.bookingerror',
                        { id: booking2.idBooking, error: 'Iterator not working' }), cev.emit('next.booking'));
            });
        //checker.on('product.state.changed', function (booking) {
        //    var item = {
        //        code: prdupdate.product.code,
        //        lastavailabilityday: common.utils.getlastavailabilityday(prdupdate.product),
        //        dmc: {
        //            code: prdupdate.product.dmc.code,
        //            name: prdupdate.product.dmc.name || prdupdate.product.dmc.company.name
        //        },
        //        title: prdupdate.product.title,
        //        previous: prdupdate.previous,
        //        current: prdupdate.current
        //    };
        //    conf.reports.push(item);
        //    var msg = 'Booking < a href=\"http://openmarket.travel/booking/' + booking.idBooking + '\">' +
        //        booking.idBooking + '</a> for dmc ' + item.dmc.name + ' reported a state change';
        //    console.log(msg);
        //    conf.messages.push(msg);
        //});
        //checker.on('product.minprice.changed', function (prd) {
        //    conf.messages.push('Product updated! : ' +
        //        '<a href=\"http://openmarket.travel/viaje/' +
        //        prd.slug_es + '\">' + prd.code + ' </a> minprice: ' +
        //        prd.minprice.value + ' ' + prd.minprice.currency.label + ' day: ' + prd.minprice.day +
        //        ' month: ' + prd.minprice.month + ' year: ' + + prd.minprice.year);
        //});
    });


    cev.on('transfer.booking.error', function (bookingreport) {
        console.error('Error on booking transfer...' + bookingreport.code);
        //console.error(bookingreport.error);
        addwitherror(booking2.idBooing);
        conf.errors.push({ code: 'BOOKING TRANSFER FAILED FOR ' + bookingreport.code, error: bookingreport.error });
        //cev.emit('next.booking');
    });

    cev.on('booking.id', function (bookingid) {
        var query = {
            _id: bookingid
        };
        core.list('Bookings').model.find(query)
            .populate('dmc')
            .populate('traveler')
            .populate('affiliate')
            .populate('flights')
            .exec(function (err, docs) {
                err != null ?
                    cev.emit('report.bookingerror', { id: bookingid, error: err }) :
                    cev.emit('process.booking', docs[0]);
            });

    });

    cev.on('next.booking', function () {
        var bookingid = bookingids != null && bookingids.length > 0 ? bookingids.shift() : null;
        console.log('processing: ' + (statics.done + 1) + '/' + statics.total);
        bookingid != null ? cev.emit('booking.id', bookingid) : cev.emit('process.done');
    });

    bookingids != null && bookingids.length > 0 ?
        setImmediate(function () {
            statics.total = bookingids.length;
            cev.emit('next.booking');
        })
        :
        setImmediate(function () {
            console.log('nothing to do');
            conf.results = {
                code: 'Booking transfer : OLD -> NEW',
                messages: ['Process finished without any booking processed']
            };
            cev.emit('process.done');
        });
}