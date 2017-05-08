module.exports = function (booking) {
    var _ = require('underscore');

    var avail = _.find(product.availability, function (avyear) {
        return datesPool.start.year == avyear.year; //find the avail year
    });
    var month = dates.monthname_en;
    var av_month = avail != null ? avail[month].availability : null;
    
    var dayprices = av_month != null && av_month.length > 0 ? 
            _.find(av_month, function (day) { return day.day.toString() == datesPool.start.day.toString() && day.available == true }) : null;
    var roomprices = dayprices != null  ? dayprices.rooms : null;
    //getting room amounts...
    var roomcodes = ['single', 'double', 'triple'];
    //cross all the rooms from roomtype and amount..
    _.each(booking.rooms, function (room) {
        var roomprice = roomprices[room.roomcode.toLowerCase()] != null ? roomprices[room.roomcode].price : -1;
        var paxnumber = (room.roomcode == 'single') ? product.included.trip.minpaxoperate || 1 : room.paxlist.length;
        var roomamount = roomprice * paxnumber;
        room.price = roomamount; //info
        room.priceperpax = roomprice; //info
        room_amounts.push(roomamount);
        _.each(room.paxlist, function (slug) {
            var roompax = _.find(booking.paxes, function (pax) {
                return pax.slug == slug;
            });
            roompax != null ? roompax.price = roomprice : null;
        });
    });
    //currency
    booking.pricing.currency = roomprices.currency;
    //got room amounts
    _.each(room_amounts, function (ramount) {
        booking.pricing.amount += ramount;  //#### TOTAL AMOUNT
    });
    //got net price from amount/dmc
    booking.pricing.netamount = booking.pricing.amount - (booking.pricing.amount * booking.pricing.comission / 100);
    return booking;
}