module.exports = function (doc) {
    var flprd = require('./xmljsonprogram');
    var _ = require('underscore');

    function _flyweight(bookingcopy) {
        var pt = {
            id: bookingcopy._id,
            locator: bookingcopy.idBooking,
            datecreation: bookingcopy.createdOn,
            info: {
                meetingdata: bookingcopy.meetingdata,
                observations: bookingcopy.observations != null ? bookingcopy.observations.observations : null
            },
            program: flprd(bookingcopy.products[0]),
            paxes: _.map(bookingcopy.paxes, function (pax) {
                return {
                    roomkey: pax.slug,
                    name: pax.name,
                    lastname: pax.lastname,
                    birthdate: pax.birthdate,
                    iddocument: pax.documentnumber,
                    iddocumenttype: pax.documenttype,
                    country: pax.country,
                    room: pax.room
                };
            }),
            rooms: _.map(bookingcopy.rooms, function (room) {
                return {
                    code: room.roomcode,
                    name: room.name,
                    paxlist: room.paxlist
                };
            }),
            pricing: {
                netprice: bookingcopy.breakdown.net,
                currency: bookingcopy.pricing.currency.value
            }
        };
        
        return pt;
    }

    var prdcopy = doc != null ? doc.toObject() : null;
    var prd = null;

    prd = prdcopy != null ? _flyweight(prdcopy) : null;

    return prd;    
}