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
    var prices = null;
    var dates = conf.datesPool;
    var affiliate = conf.affiliate;

    var proceed = false;
    var proceederror = null;

    booking.pricing.comission = product.dmc.membership.b2bcommission || 0; //#### SET COMISSION
    booking.pricing.fee = 0;
    booking.pricing.margin = 3;
    booking.pricing.minpaxoperate = product.included.trip.minpaxoperate || 1;
    booking.pricing.parityprice = parityprice;
    var room_amounts = [];

    var avail = _.find(product.availability, function (avyear) { 
        return dates.start.year.toString() == avyear.year.toString(); //find the avail year
    });
    
    //proceederror = booking.pricing.comission != null && booking.pricing.comission > 0 ? proceederror : 'this dmc has not been configured for b2b channel;';
    proceederror = avail != null  ? proceederror : proceederror + '\nNo availability for this date;';
    console.log(dates);
    var month = dates.start.monthname_en;
    var av_month = avail != null ? avail[month].availability : null;
    
    var dayprices = av_month != null && av_month.length > 0 ? 
        _.find(av_month, function (day) {
            return (day != null &&
                day.day != null &&
                day.day.toString() ==
                dates.start.day.toString() &&
                day.available == true);
        }) : null;
    var roomprices = dayprices != null  ? dayprices.rooms : null;
    proceederror = roomprices != null ? proceederror : proceederror + '\nNo availability days for this date;';

    proceed = proceederror == null;
    //do it
    if (proceed) { //find the month and day for avail
        var av_month = avail != null ? avail[month].availability : null;
        
        var dayprices = av_month != null && av_month.length > 0 ? 
            _.find(av_month, function (day) {
                return (day != null &&
                    day.day != null &&
                    day.day.toString() ==
                    dates.start.day.toString() &&
                    day.available == true);
            }) : null;
        var roomprices = dayprices != null ? dayprices.rooms : null;

        //Price Parity
        
        var parityprice = true;
        booking.pricing.parityprice = parityprice;
        if (roomprices != null) {
            //getting room amounts...
            var roomcodes = ['single', 'double', 'triple'];
            booking.pricing.roomssnapshot.single = roomprices['single'] != null && roomprices['single'].price > 0 ?
                roomprices['single'].price : roomprices['double'].price;
            booking.pricing.roomssnapshot.double = roomprices['double'].price;
            booking.pricing.roomssnapshot.triple = roomprices['triple'] != null && roomprices['triple'].price > 0 ?
                roomprices['triple'].price : roomprices['double'].price;
            booking.pricing.roomssnapshot.quad = roomprices['quad'] != null && roomprices['quad'].price > 0 ?
                roomprices['quad'].price : roomprices['double'].price;

            roomprices.currency = roomprices.currency;
            //get the net price for DMC (E)
            var pricingrooms = {
                double: Math.ceil(booking.pricing.roomssnapshot.double - (booking.pricing.roomssnapshot.double * booking.pricing.comission / 100)),
                single: Math.ceil(booking.pricing.roomssnapshot.single - (booking.pricing.roomssnapshot.single * booking.pricing.comission / 100)),
                triple: Math.ceil(booking.pricing.roomssnapshot.triple - (booking.pricing.roomssnapshot.triple * booking.pricing.comission / 100)),
                quad: Math.ceil(booking.pricing.roomssnapshot.quad - (booking.pricing.roomssnapshot.quad * booking.pricing.comission / 100)),
				currency: dmc.currency.value
            };
            var dmcpricingrooms = JSON.parse(JSON.stringify(pricingrooms));
            //get the net price for AAVV (H)
            pricingrooms.double = Math.round(pricingrooms.double / (1 - (booking.pricing.margin / 100)));
            pricingrooms.single = Math.round(pricingrooms.single / (1 - (booking.pricing.margin / 100)));
            pricingrooms.triple = Math.round(pricingrooms.triple / (1 - (booking.pricing.margin / 100)));
            pricingrooms.quad = Math.round(pricingrooms.quad / (1 - (booking.pricing.margin / 100)));

            //get the pvp price for AAVV (J)
            booking.pricing.rooms.double = !parityprice ? Math.round(pricingrooms.double / (1 - (booking.pricing.fee / 100))) : booking.pricing.roomssnapshot.double;
            booking.pricing.rooms.single = !parityprice ? Math.round(pricingrooms.single / (1 - (booking.pricing.fee / 100))) : booking.pricing.roomssnapshot.single;
            booking.pricing.rooms.triple = !parityprice ? Math.round(pricingrooms.triple / (1 - (booking.pricing.fee / 100))) : booking.pricing.roomssnapshot.triple;
            booking.pricing.rooms.quad = !parityprice ? Math.round(pricingrooms.quad / (1 - (booking.pricing.fee / 100))) : booking.pricing.roomssnapshot.quad;
			booking.pricing.rooms.currency = dmc.currency.value;

            //check the minpax 
            booking.pricing.roomssnapshot.single = booking.pricing.minpaxoperate > 1 && booking.rooms.length == 1 ? booking.pricing.roomssnapshot.double * 2 : booking.pricing.roomssnapshot.single;
            pricingrooms.single = booking.pricing.minpaxoperate > 1 && booking.rooms.length == 1 ? pricingrooms.double * 2 : pricingrooms.single;
            booking.pricing.rooms.single = booking.pricing.minpaxoperate > 1 && booking.rooms.length == 1 ? booking.pricing.rooms.double * 2 : booking.pricing.rooms.single;

            //cross all the rooms from roomtype and amount..
            _.each(booking.rooms, function (room) {
                var roomprice = booking.pricing.rooms[room.roomcode.toLowerCase()]; //PVP
                var roomnetrice = pricingrooms[room.roomcode.toLowerCase()]; //NET AAVV
                var roomdmcprice = dmcpricingrooms[room.roomcode.toLowerCase()]; //NET DMC

                var paxnumber = room.paxlist.length;
                var roomamount = roomprice * paxnumber;
                var roomamountnet = roomnetrice * paxnumber;
                var roomamountdmc = roomdmcprice * paxnumber;

                room.price = roomamount; //info //PVP
                room.net = roomamountnet; //info //NET AAVV
                room.dmc = roomamountdmc; //info //DMC NET

                room.priceperpax = roomprice;
                room.netperpax = roomnetrice; //info
                room.dmcperpax = roomdmcprice;
                

                room_amounts.push(roomamount);
                _.each(room.paxlist, function (slug) {
                    var roompax = _.find(booking.paxes, function (pax) { 
                        return pax.slug == slug;
                    });
                    roompax != null ? roompax.price = roomprice : null;
                    roompax != null ? roompax.net = roomnetrice : null;
                    roompax != null ? roompax.dmc = roomdmcprice : null;
                    roompax != null ? roompax.room = room.roomcode : null;
                });
            });
            //currency
            booking.pricing.currency.label = roomprices.currency.label;
            booking.pricing.currency.symbol = roomprices.currency.symbol;
            booking.pricing.currency.value = roomprices.currency.value;
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
            cev.emit('all.error', 'No availability for this date');
        }
    } else { 
        cev.emit('all.error', proceederror);
    }
}