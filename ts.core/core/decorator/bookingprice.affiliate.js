var common = require('yourttoo.common');
var _ = require('underscore');
console.log('load bookingprice.affiliate.js');
module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var booking = options.booking;
    var currencys = common.staticdata.currencys;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    var complete = {
        data: {
            exchanges: null,
            dmccurrency: null,
            product: null,
            affiliate: null,
            dmcamounts: {
                totaldmccurrency: 0,
                totaldmceuro: 0,
                priceperpax: {
                    single: 0,
                    double: 0,
                    tripe: 0,
                    other: 0,
                    currency: {
                        label: '',
                        symbol: '',
                        value: ''
                    },
                    exchange: {
                        single: 0,
                        double: 0,
                        tripe: 0,
                        other: 0, 
                        currency: {
                            label: '',
                            symbol: '',
                            value: ''
                        }
                    }
                }
            },
            booking: booking,
            carrier: cev
        },
        errors: false,
        errormessages: [],
        product: false,
        affiliate: false,
        exchanges: false,
        done: function () { 
            (this.product && this.affiliate && this.exchanges) ? cev.emit('ready') : null;
        }
    };
    
    var dmccurrency = null;
    var bcproduct = JSON.parse(booking.product);
    
    cev.on('affiliate.error', function (err) {
        complete.errors = true;
        complete.errormessages.push(err);
        complete.affiliate = true;
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
        _getProductRoomPrices(booking, complete.data.product);
        complete.done();
    });
    
    cev.on('affiliate.ok', function (affiliate) {
        complete.data.affiliate = affiliate;
        complete.affiliate = true;
        complete.done();
    });

    cev.on('ready', function () { 
        complete.errors ? cev.emit('all.error'): cev.emit('data.ready');
    });
    
    cev.on('data.ready', function () { 
        doexchange(complete.data);
    });
    
    cev.on('exchange.done', function (exchangedbooking) {
        var totalammounts = doammounts(exchangedbooking); // , function (totalammounts) { 
        cev.emit('doammounts.done', { totals: totalammounts, booking: exchangedbooking });
        //});
    });
    
    cev.on('doammounts.done', function (totaldata) {
        var booking = totaldata.booking;
        var affiliate = totaldata.booking.affiliate;
        var totals = totaldata.totals;
        booking.omtmargin = affiliate.membership.omtmargin || 3;
        var omtmarginvalue = booking.omtmargin / 100;
        // ********************  AMOUNTS *********************************************
        console.log('Main data for ammounts...');
        console.log('amount for AFI in euros ' + totals.totaldmceuro);
        console.log('amount for AFI in dmc currency ' + totals.totaldmccurrency);
        console.log('amount for DMC in euros ' + totals.totaldmceurobrut);
        console.log('amount for DMC in dmc currency ' + totals.totaldmccurrencybrut);

		console.log("omtmarginvalue: " + omtmarginvalue);

        //Amount AAVV
        console.log("b2b comission: " + booking.b2bcommission);
        console.log("amount price [aavv][provider.currency](BEFORE): " + booking.netPrice.value);
        //booking.amount.value = totals.totaldmccurrency - (totals.totaldmccurrency * omtmarginvalue);
		booking.amount.value = totals.totaldmccurrency;
        console.log("amount price [aavv][provider.currency](AFTER): " + booking.netPrice.value);

        console.log("amount price [aavv][provider.eur](BEFORE): " + booking.netPrice.exchange.value);		
        //booking.netPrice.exchange.value = totals.totaldmceuro - (totals.totaldmceuro * omtmarginvalue); 
		booking.netPrice.exchange.value = totals.totaldmceuro; 
        console.log("amount price [aavv][provider.eur](AFTER): " + booking.netPrice.exchange.value);

        //set currency
        booking.netPrice.currency.label = complete.data.dmccurrency.label;
        booking.netPrice.currency.symbol = complete.data.dmccurrency.symbol;
        booking.netPrice.currency.value = complete.data.dmccurrency.value;

        //net price DMC

        console.log("net price [dmc][dmc.currency](BEFORE): " + totals.totaldmccurrencybrut);
        //booking.amount.value = totals.totaldmccurrencybrut - (totals.totaldmccurrencybrut * booking.b2bcommission / 100);
		booking.netPrice.value = totals.totaldmccurrencybrut - (totals.totaldmccurrencybrut * booking.b2bcommission / 100);
        console.log("net price [dmc][dmc.currency](AFTER): " + booking.amount.value);

        console.log("net price [dmc][dmc.eur](BEFORE): " + totals.totaldmceurobrut);
        //booking.amount.exchange.value = totals.totaldmceurobrut - (totals.totaldmceurobrut * booking.b2bcommission / 100);
		booking.netPrice.exchange.value = totals.totaldmceurobrut - (totals.totaldmceurobrut * booking.b2bcommission / 100);
        console.log("net price [dmc][dmc.eur](AFTER): " + booking.amount.exchange.value);

        //set currency
        booking.amount.currency.label = complete.data.dmccurrency.label;
        booking.amount.currency.symbol = complete.data.dmccurrency.symbol;
        booking.amount.currency.value = complete.data.dmccurrency.value;

        cev.emit('all.done', booking);

    });

    cev.on('all.error', function (err) {
        var errmsg = complete.errormessages.join('\r\n');
        errorcallback(errmsg);
    });
    
    cev.on('all.done', function (result) { 
        callback(result);
    });
    
    cev.on('exchange.error', function (err) {
        complete.errors = true;
        complete.errormessages.push(err);
        complete.exchanges = true;
        complete.done();
    });
    
    cev.on('exchange.ok', function (data) {
        data = _.map(data, function (exc) { return exc.toObject(); });
        complete.data.exchanges = data;
        if (data == null) { complete.errors = true; complete.errormessages.push('No currencies found for exchange'); }
        complete.exchanges = true;
        complete.done();
    });

    //first step - get product, get affiliate, and continue...
    core.list('DMCProducts').model.find({ code: bcproduct.code })
    .populate('dmc')
    .exec(function (err, docs) {
        (err != null || (docs == null || docs.length == 0)) ? cev.emit('product.error', err) : cev.emit('product.ok', docs[0]);
    });
    
    core.list('Affiliate').model.find({ _id: booking.affiliate })
    .populate('user')
    .exec(function (err, docs) {
        (err != null || (docs == null || docs.length == 0)) ? cev.emit('affiliate.error', err) : cev.emit('affiliate.ok', docs[0]);
    });
    
    core.list('Exchange').model.find({ state: 'published' })
    .exec(function (err, docs) {
        (err != null || (docs == null || docs.length == 0)) ? cev.emit('exchange.error', err) : cev.emit('exchange.ok', docs);
    });
    //AUX...
    function doexchange(options) {
        var product = options.product;
        var booking = options.booking;
        var dmccurrency = product.dmc.currency;
        var fcr = _.filter(currencys, function (currency) {
            return currency.value == dmccurrency.value;
        });
        fcr = (fcr != null && fcr.length > 0) ? fcr[0] : null;
        complete.data.dmccurrency = fcr || dmccurrency;
        booking.affiliate = options.affiliate || booking.affiliate;
        var carrier = options.carrier;
        console.log('product DMC Currency: ' + product.dmc.currency.value);
        console.log('booking TRA Currency: ' + booking.amount.exchange.currency.value);
        booking = _doexchangeAFI(product, booking, complete.data.dmccurrency, complete.data.exchanges);
        complete.data.dmcamounts = _doexchangeDMC(product, booking, complete.data.dmccurrency, complete.data.exchanges);

        cev.emit('exchange.done', booking);
    }

    function _doexchangeAFI(product, booking, dmccurrency, exchanges) {
        var needChange = (dmccurrency.value != booking.amount.exchange.currency.value);
        
        _.each(booking.roomDistribution, function (roomDistribution) {
            
            roomDistribution.pricePerPax.value = needChange ? 
            common.utils.convertValueToCurrency(roomDistribution.pricePerPax.exchange.value,
                booking.amount.exchange.currency.value, dmccurrency.value, exchanges)
            : 
            roomDistribution.pricePerPax.exchange.value;

            roomDistribution.pricePerPax.currency.label = dmccurrency.label;
            roomDistribution.pricePerPax.currency.symbol = dmccurrency.symbol;
            roomDistribution.pricePerPax.currency.value = dmccurrency.value;
        });

        return booking;
    }
    
    function _doexchangeDMC(product, booking, dmccurrency, exchanges) {
        var needChange = (dmccurrency.value != booking.amount.exchange.currency.value);
        
        _.each(booking.roomDistribution, function (roomDistribution) {
            
            complete.data.dmcamounts.priceperpax.exchange[roomDistribution.roomCode] = needChange ? 
            common.utils.convertValueToCurrency(complete.data.dmcamounts.priceperpax[roomDistribution.roomCode],
                dmccurrency.value, booking.amount.exchange.currency.value, exchanges)
            : 
            complete.data.dmcamounts.priceperpax[roomDistribution.roomCode];
            
            complete.data.dmcamounts.priceperpax.exchange.currency.label = booking.amount.exchange.currency.label;
            complete.data.dmcamounts.priceperpax.exchange.currency.symbol = booking.amount.exchange.currency.symbol;
            complete.data.dmcamounts.priceperpax.exchange.value = booking.amount.exchange.currency.value;
        });
        
        return complete.data.dmcamounts;
    }
    
    function _getProductRoomPrices(booking, product) {
        var _h = {
            single: product.included.trip.minpaxoperate || 1,
            double: 2,
            triple: 3,
            other: 4
        };
        var baseprice = getAvailabilityForDay(booking.start, product, 'double');
        complete.data.dmcamounts.priceperpax.double = baseprice;
        console.log('price base: ' + baseprice);
        _.each(booking.roomDistribution, function (roomDistribution) {
           
            complete.data.dmcamounts.priceperpax[roomDistribution.roomCode] = 
            (roomDistribution != null && roomDistribution.roomCode != null && roomDistribution.roomCode != '') ?
                getAvailabilityForDay(booking.start, product, roomDistribution.roomCode) : 0;
            console.log('price for ' + roomDistribution.roomCode + ' - ' + complete.data.dmcamounts.priceperpax[roomDistribution.roomCode]);
            //check zero values...
            complete.data.dmcamounts.priceperpax[roomDistribution.roomCode] = 
            (complete.data.dmcamounts.priceperpax[roomDistribution.roomCode] <= 0) ? 
                (baseprice * _h[roomDistribution.roomCode]) : complete.data.dmcamounts.priceperpax[roomDistribution.roomCode];
        });
        console.log(complete.data.dmcamounts);
    }
    
    //Deprecated...
    function _OLDdoexchange(product, booking, callback) {
        var roomcases = {
            double: function (room, productOriginal) {
                return (productOriginal.dmc.currency.value != booking.amount.exchange.currency.value) ?
                 getAvailabilityForDay(booking.start, productOriginal, 'double') : room.pricePerPax.exchange.value;
            },
            quad: function (room, productOriginal) {
                return (productOriginal.dmc.currency.value != booking.amount.exchange.currency.value) ?
                 getAvailabilityForDay(booking.start, productOriginal, 'quad') : room.pricePerPax.exchange.value;
            },
            triple: function (room, productOriginal) {
                var priceOr = getAvailabilityForDay(booking.start, productOriginal, 'triple');
                priceOr = (priceOr != null && priceOr > 0) ? priceOr : getAvailabilityForDay(booking.start, productOriginal, 'double');
                return (productOriginal.dmc.currency.value != booking.amount.exchange.currency.value) ? priceOr : room.pricePerPax.exchange.value;
            },
            single: function (room, productOriginal) {
                var priceOr = getAvailabilityForDay(booking.start, productOriginal, 'single');
                priceOr = (priceOr != null && priceOr > 0) ? priceOr : getAvailabilityForDay(booking.start, productOriginal, 'double');
                return (productOriginal.dmc.currency.value != booking.amount.exchange.currency.value) ? priceOr : room.pricePerPax.exchange.value;
            }
        };
        
        var totalR = booking.roomDistribution.length;
        _.each(booking.roomDistribution, function (roomDistribution) {
            roomDistribution.pricePerPax.value = roomcases[roomDistribution.roomCode](roomDistribution, product);
            totalR--;
            (totalR == 0) ? cev.emit('exchange.done', booking) : null;
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
                console.log('roomcode: %s', roomCode);
                console.log(av);
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
        var monthname = common.utils.getMonthNameEnglish(date.month);
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
        var totaldmccurrency = 0;
        var totaldmceuro = 0;
        var totaldmccurrencybrut = 0;
        var totaldmceurobrut = 0;
        //helper hash AFI
        var roomcasesAFI = {
            single: function (room) {
                totaldmccurrency += room.pricePerPax.value * 1;
                totaldmceuro += room.pricePerPax.exchange.value * 1;
            },
            double: function (room) {
                totaldmccurrency += room.pricePerPax.value * 2;
                totaldmceuro += room.pricePerPax.exchange.value * 2;
            },
            triple: function (room) {
                totaldmccurrency += room.pricePerPax.value * 3;
                totaldmceuro += room.pricePerPax.exchange.value * 3;
            },
            quad: function (room) {
                totaldmccurrency += room.pricePerPax.value * 4;
                totaldmceuro += room.pricePerPax.exchange.value * 4;
            }
        };
        //helper hash DMC
        var roomcasesDMC = {
            single: function (room) {
                totaldmccurrencybrut += complete.data.dmcamounts.priceperpax.single * 1;
                totaldmceurobrut += complete.data.dmcamounts.priceperpax.exchange.single * 1;
            },
            double: function (room) {
                totaldmccurrencybrut += complete.data.dmcamounts.priceperpax.double * 2;
                totaldmceurobrut += complete.data.dmcamounts.priceperpax.exchange.double * 2;
            },
            triple: function (room) {
                totaldmccurrencybrut += complete.data.dmcamounts.priceperpax.triple * 3;
                totaldmceurobrut += complete.data.dmcamounts.priceperpax.exchange.triple * 3;
            },
            other: function (room) {
                totaldmccurrencybrut += complete.data.dmcamounts.priceperpax.other * 4;
                totaldmceurobrut += complete.data.dmcamounts.priceperpax.exchange.other * 4;
            }
        };
        //do ammounts...
        var totalR = booking.roomDistribution.length;
        _.each(booking.roomDistribution, function (roomDistribution) {
            //amounts affiliate
            roomcasesAFI[roomDistribution.roomCode](roomDistribution);
            //amounts dmc
            roomcasesDMC[roomDistribution.roomCode](roomDistribution);
        });
        return {
            totaldmccurrency: totaldmccurrency, 
            totaldmceuro: totaldmceuro, 
            totaldmccurrencybrut: totaldmccurrencybrut, 
            totaldmceurobrut: totaldmceurobrut
        };
    }
}



