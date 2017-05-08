var common = require('yourttoo.common');
var _ = require('underscore');
module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var booking = options.booking;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var complete = {
        data: {
            product: null,
            exchanges: null,
            booking: booking,
            carrier: cev
        },
        errors: false,
        errormessages: [],
        product: false,
        exchange: true,
        done: function () { 
            (this.product && this.exchange) ? cev.emit('ready') : null;
        }
    };

    var bcproduct = JSON.parse(booking.product);
    
    cev.on('exchanges.error', function (err) {
        complete.errors = true;
        complete.errormessages.push(err);
        complete.exchange = true;
        complete.done();
    });
    cev.on('product.error', function (err) {
        complete.errors = true;
        complete.errormessages.push(err);
        complete.product = true;
        complete.done();
    });

    cev.on('product.ok', function (product) {
        complete.data.product = product; 
        complete.product = true;
        complete.done();
    });

    cev.on('ready', function () { 
        complete.errors ? cev.emit('all.error'): cev.emit('data.ready');
    });
    
    cev.on('data.ready', function () { 
        doexchange(complete.data);
    });
    
    cev.on('exchange.done', function (exchangedbooking) {
        doammounts(exchangedbooking, function (totalammounts) { 
            cev.emit('doammounts.done', { totals: totalammounts, booking: exchangedbooking });
        });
    });
    
    cev.on('doammounts.done', function (totaldata) {
        var booking = totaldata.booking;
        var totals = totaldata.totals;

        booking.amount.value = totals.totaldmc;
        booking.amount.exchange.value = totals.totaluser;
        console.log("total [provider][prodider.currency]: " + booking.amount.value);
        console.log("total [user][user.currency]: " + booking.amount.exchange.value);
        //net price DMC
        console.log("comission: " + booking.comission);
        console.log("net price [provider][prodider.currency](BEFORE): " + booking.netPrice.value);
        booking.netPrice.value = booking.amount.value - (Math.round(booking.amount.value * booking.comission / 100));
        console.log("net price [provider][prodider.currency](AFTER): " + booking.netPrice.value);
        //net price TRAVELER
        console.log("net price [user][user.currency](BEFORE): " + booking.netPrice.exchange.value);
        booking.netPrice.exchange.value = booking.amount.exchange.value - 
            (Math.round(booking.amount.exchange.value * (booking.comission / 100)));
        console.log("net price [user][user.currency](AFTER): " + booking.netPrice.exchange.value);
        
        cev.emit('all.done', booking);

    });

    cev.on('all.error', function (err) {
        var errmsg = complete.errormessages.join('\r\n');
        errorcallback(errmsg);
    });
    
    cev.on('all.done', function (result) { 
        callback(result);
    });
    
    //first step - get product, and continue...
    core.list('DMCProducts').model.find({ code: bcproduct.code })
    .populate('dmc')
    .exec(function (err, docs) {
        (err != null || (docs == null || docs.length == 0)) ? cev.emit('product.error', err) : cev.emit('product.ok', docs[0]);
    })

    //AUX...
    function doexchange(options) {
        var product = options.product;
        var booking = options.booking;
        var carrier = options.carrier;
        
        (product.dmc.currency.value != booking.amount.exchange.currency.value) ? 
        _doexchange(exchanges, product, booking, function (booking) {
            carrier.emit('exchange.done', booking);
        }) : carrier.emit('exchange.done', booking);
    }
    
    function _doexchange(exchanges, product, booking, callback) {
        var roomcases = {
            double: function (room, productOriginal) {
                return (room.pricePerPax.value == null || room.pricePerPax.value == 0) ?
                 getAvailabilityForDay(booking.start, productOriginal, 'double') : room.pricePerPax.value;
            },
            quad: function (room, productOriginal) {
                return (room.pricePerPax.value == null || room.pricePerPax.value == 0) ?
                 getAvailabilityForDay(booking.start, productOriginal, 'quad') : room.pricePerPax.value;
            },
            triple: function (room, productOriginal) {
                var priceOr = getAvailabilityForDay(booking.start, productOriginal, 'triple');
                priceOr = (priceOr != null && priceOr > 0) ? priceOr : getAvailabilityForDay(booking.start, productOriginal, 'doble');
                return (room.pricePerPax.value == null || room.pricePerPax.value == 0) ? priceOr : room.pricePerPax.value;
            },
            single: function () {
                var priceOr = getAvailabilityForDay(booking.start, productOriginal, 'single');
                priceOr = (priceOr != null && priceOr > 0) ? priceOr : getAvailabilityForDay(booking.start, productOriginal, 'doble');
                return (room.pricePerPax.value == null || room.pricePerPax.value == 0) ? priceOr : room.pricePerPax.value;
            }
        };
        
        var totalR = booking.roomDistribution.length;
        _.each(booking.roomDistribution, function (roomDistribution) {
            roomDistribution.pricePerPax.value = roomcases[roomDistribution.roomCode](roomDistribution, product);
            totalR--;
            (totlR == 0) ? cev.emit('exchange.done', booking) : null;
        });


    }
    
    function getAvailabilityForDay(date, product, roomCode) {
        var price = -1;
        //find the day in availability...
        if (date) {
            //find index of year...		     
            var indexyear = _indexOfYear(date.year, product.availability);
            // find month name..
            var monthname = common.utils.getMonthNameEnglish(date.month);
            //find day...
            var indexday = _indexOfDay(date, product.availability[indexyear]);
            if (indexday > -1) {
                //we've found the day...
                var av = product.availability[indexyear][monthname].availability[indexday];
                if (roomCode == 'quad') {
                    price = av.rooms['other'].price;
                }
                else {
                    price = av.rooms[roomCode].price;
                }
            }
        }
        return price;
    }
    
    function _indexOfYear(year, availability) {
        
        var index = -1;
        if (availability != null && availability.length > 0) {
            for (var i = 0; i < availability.length; i++) {
                if (availability[i].year == year) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    
    function _indexOfDay(date, availyear) {
        var index = -1;
        var monthname = _getMonthNameEnglish(date.month);
        var avails = null;
        if (availyear != null) {
            if (availyear[monthname] != null) {
                avails = availyear[monthname].availability;
            }
        }
        if (avails != null && avails.length > 0) {
            for (var i = 0; i < avails.length; i++) {
                
                if (avails[i].day == date.day) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    
    function doammounts(booking, callback) {
        var totaldmc = 0;
        var totaluser = 0;
        var roomcases = {
            single: function (room) { totaldmc += room.pricePerPax.value * 1; totaluser += room.pricePerPax.exchange.value * 1; },
            double: function (room) { totaldmc += room.pricePerPax.value * 2; totaluser += room.pricePerPax.exchange.value * 2; },
            triple: function (room) { totaldmc += room.pricePerPax.value * 3; totaluser += room.pricePerPax.exchange.value * 3; },
            quad: function (room) { totaldmc += room.pricePerPax.value * 4; totaluser += room.pricePerPax.exchange.value * 4; }
        };
        var totalR = booking.roomDistribution.length;
        _.each(booking.roomDistribution, function (roomDistribution) {
            
            roomcases[roomDistribution.roomCode](roomDistribution);
            
            totalR--;
            (totalR == 0) ? callback({ totaldmc: totaldmc, totaluser: totaluser }) : null;
        });
    }
}



