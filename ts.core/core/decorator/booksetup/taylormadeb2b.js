module.exports = function (conf, callback, errorcallback) {
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    cev.on('all.done', function (result) {
        callback(result);
    });
    cev.on('all.error', function (err) { 
        errorcallback(err);
    });

    var core = conf.core;
    var product = conf.product;
    var dmc = product.dmc;
    var booking = conf.booking;
    var quote = conf.quote;
    var dates = conf.datesPool;
    var affiliate = conf.affiliate;
    var marginextra = 1;

    var proceed = false;
    var proceederror = null;

    booking.pricing.comission = product.dmc.membership.b2bcommission || 0; //#### SET COMISSION
    booking.pricing.comission = quote.comission || booking.pricing.comission;
    booking.pricing.fee = affiliate.fees.tailormade || 0;
    booking.pricing.margin = affiliate.membership.omtmargin || 5;
    booking.pricing.margin += marginextra;
    booking.pricing.minpaxoperate = product.included.trip.minpaxoperate || 1;
    var checkPVPFee = false;
    //check a fee change...
    (quote != null && quote.fees != null && quote.fees > 0) ? booking.pricing.fee = quote.fees.tailormade : null;
    (conf.fee != null && conf.fee > 0) ? (booking.pricing.fee = conf.fee, checkPVPFee = true) : null;
    var room_amounts = [];
   
    var validatedate = new Date(quote.quoteValidUntil.year, quote.quoteValidUntil.month, quote.quoteValidUntil.day);
    var today = new Date();
    proceed = quote != null && validatedate > today;
    //do it
    if (proceed) { //find the month and day for avail
        
        if (quote.rooms != null) {
            //getting room amounts...
            var roomcodes = ['single', 'double', 'triple', 'quad'];
            booking.pricing.roomssnapshot.single = quote.rooms.single.pricePerPax.value;
            booking.pricing.roomssnapshot.double = quote.rooms.double.pricePerPax.value;
            booking.pricing.roomssnapshot.triple = quote.rooms.triple.pricePerPax.value;
            booking.pricing.roomssnapshot.quad = quote.rooms.quad.pricePerPax.value;
            booking.pricing.roomssnapshot.currency = quote.rooms.quad.pricePerPax.currency.value;

            booking.pricing.roomsnet.single = quote.rooms.single.amountPricePerPax.value;
            booking.pricing.roomsnet.double = quote.rooms.double.amountPricePerPax.value;
            booking.pricing.roomsnet.triple = quote.rooms.triple.amountPricePerPax.value;
            booking.pricing.roomsnet.quad = quote.rooms.quad.amountPricePerPax.value;
            booking.pricing.roomsnet.currency = quote.rooms.quad.amountPricePerPax.currency.value;

            booking.pricing.rooms.single = quote.rooms.single.pvpAffiliatePerPax.value;
            booking.pricing.rooms.double = quote.rooms.double.pvpAffiliatePerPax.value;
            booking.pricing.rooms.triple =quote.rooms.triple.pvpAffiliatePerPax.value;
            booking.pricing.rooms.quad = quote.rooms.quad.pvpAffiliatePerPax.value;
            booking.pricing.rooms.currency = quote.rooms.quad.pvpAffiliatePerPax.currency.value;

            if (checkPVPFee) {
                booking.pricing.rooms.single = Math.round(quote.rooms.single.amountPricePerPax.value / (1 - (booking.pricing.fee / 100)));
                booking.pricing.rooms.double = Math.round(quote.rooms.double.amountPricePerPax.value / (1 - (booking.pricing.fee / 100)));
                booking.pricing.rooms.triple = Math.round(quote.rooms.triple.amountPricePerPax.value / (1 - (booking.pricing.fee / 100)));
                booking.pricing.rooms.quad = Math.round(quote.rooms.quad.amountPricePerPax.value / (1 - (booking.pricing.fee / 100)));
            }

            quote.children != null && quote.children.length > 0 ? _.each(quote.children, function (child) {
                booking.children.push({
                    age: child.age,
                    price: checkPVPFee ? Math.round(child.amountPricePerPax.value / (1 - (booking.pricing.fee / 100))) : child.pvpAffiliatePerPax.value
                })
            }) : null;

            //cross all the rooms from roomtype and amount..
            _.each(booking.rooms, function (room) {
                var roomprice = booking.pricing.rooms[room.roomcode.toLowerCase()]; //PVP
                var roompricecurrency = booking.pricing.rooms.currency;

                var roomnetrice = booking.pricing.roomsnet[room.roomcode.toLowerCase()]; //NET AAVV
				var roomnetricecurrency = booking.pricing.roomsnet.currency;                

				var roomdmcprice = booking.pricing.roomssnapshot[room.roomcode.toLowerCase()]; //NET DMC
				var roomdmcpricecurrency = booking.pricing.roomssnapshot.currency;

                var paxnumber = room.paxlist.length;
                var roomamount = roomprice * paxnumber;
                var roomamountnet = roomnetrice * paxnumber;
                var roomamountdmc = roomdmcprice * paxnumber;

                room.price = roomamount; //info //PVP
                room.pricecurrency = roompricecurrency;
                room.net = roomamountnet; //info //NET AAVV
                room.netcurrency = roomnetricecurrency;
                room.dmc = roomamountdmc; //info //DMC NET
                room.dmccurrency = roomdmcpricecurrency;

                room.priceperpax = roomprice;
                room.priceperpaxcurrency = roompricecurrency;
                room.netperpax = roomnetrice; 
                room.priceperpaxcurrency = roomnetricecurrency;
                room.dmcperpax = roomdmcprice;
                room.dmcperpaxcurrency = roomdmcpricecurrency;
                

                room_amounts.push(roomamount);
                _.each(room.paxlist, function (slug) {
                    var roompax = _.find(booking.paxes, function (pax) { 
                        return pax.slug == slug;
                    });
                    roompax != null ? (roompax.price = roomprice, roompax.pricecurrency = roompricecurrency) : null;
                    roompax != null ? (roompax.net = roomnetrice, roompax.netcurrency = roomnetricecurrency) : null;
                    roompax != null ? (roompax.dmc = roomdmcprice, roompax.dmccurrency = roomdmcpricecurrency) : null;
                    roompax != null ? roompax.room = room.roomcode : null;
                });
            });

            //currency
            booking.pricing.currency.label = quote.pvpAffiliate.currency.label;
            booking.pricing.currency.symbol = quote.pvpAffiliate.currency.symbol;
            booking.pricing.currency.value = quote.pvpAffiliate.currency.value;
            //got room amounts
            _.each(room_amounts, function (ramount) {
                booking.pricing.amount += ramount;  //#### TOTAL AMOUNT
            });
            //got net price from amount/dmc
            //finished?
            cev.emit('all.done', booking);
        }
        else {
            //there is error.. callback
            cev.emit('all.error', 'The quote has expired his valid period time');
        }
    } else { 
        cev.emit('all.error', proceederror);
    }
}