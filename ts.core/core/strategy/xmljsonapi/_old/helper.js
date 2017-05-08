module.exports.constants = {
    find: {
        allowedcollections : {
            product: 'DMCProducts',
            booking: 'Bookings', 
            countries: 'DestinationCountries'
        },
        fields: {
            product: ['-_id', 'code', 'dmccode', 'dmc', 'important_txt_es', 'important_txt_en', 'description_en', 'description_es',
            'release', 'title_es', 'title', 'name', 'tags.label', 'tags.label_en', 'availability.name', 'availability.year',
            'availability.December.availability.day', 'availability.December.availability.available', 
            'availability.December.availability.rooms.currency', 'availability.December.availability.rooms.triple', 
            'availability.December.availability.rooms.double', 'availability.December.availability.rooms.single',
            'availability.November.availability.day', 'availability.November.availability.available', 
            'availability.November.availability.rooms.currency', 'availability.November.availability.rooms.triple', 
            'availability.November.availability.rooms.double', 'availability.November.availability.rooms.single',
            'availability.October.availability.day', 'availability.October.availability.available', 
            'availability.October.availability.rooms.currency', 'availability.October.availability.rooms.triple', 
            'availability.October.availability.rooms.double', 'availability.October.availability.rooms.single',
            'availability.September.availability.day', 'availability.September.availability.available', 
            'availability.September.availability.rooms.currency', 'availability.September.availability.rooms.triple', 
            'availability.September.availability.rooms.double', 'availability.September.availability.rooms.single',
            'availability.August.availability.day', 'availability.August.availability.available', 
            'availability.August.availability.rooms.currency', 'availability.August.availability.availability.rooms.triple', 
            'availability.August.availability.rooms.double', 'availability.August.availability.rooms.single',
            'availability.July.availability.day', 'availability.July.availability.available', 
            'availability.July.availability.rooms.currency', 'availability.July.availability.rooms.triple', 
            'availability.July.availability.rooms.double', 'availability.July.availability.rooms.single',
            'availability.June.availability.day', 'availability.June.availability.available', 
            'availability.June.availability.rooms.currency', 'availability.June.availability.availability.rooms.triple', 
            'availability.June.availability.rooms.double', 'availability.June.availability.rooms.single',
            'availability.May.availability.day', 'availability.May.availability.available', 
            'availability.May.availability.rooms.currency', 'availability.May.availability.rooms.triple', 
            'availability.May.availability.rooms.double', 'availability.May.availability.rooms.single',
            'availability.April.availability.day', 'availability.April.availability.available', 
            'availability.April.availability.rooms.currency', 'availability.April.availability.rooms.triple', 
            'availability.April.availability.rooms.double', 'availability.April.availability.rooms.single',
            'availability.March.availability.day', 'availability.March.availability.available', 
            'availability.March.availability.rooms.currency', 'availability.March.availability.rooms.triple', 
            'availability.March.availability.rooms.double', 'availability.March.availability.rooms.single',
            'availability.February.availability.day', 'availability.February.availability.available', 
            'availability.February.availability.rooms.currency', 'availability.February.availability.rooms.triple', 
            'availability.February.availability.rooms.double', 'availability.February.availability.rooms.single',
            'availability.January.availability.day', 'availability.January.availability.available', 
            'availability.November.availability.January.currency', 'availability.January.availability.rooms.triple', 
            'availability.January.availability.rooms.double', 'availability.January.availability.rooms.single',
            'itinerary.daynumber', 'itinerary.needflights', 'itinerary.description_en', 'itinerary.description_es', 
            'itinerary.activities', 'itinerary.hotel', 'itinerary.sleepcity', 'itinerary.stopcities', 'itinerary.departurecity',
            'itinerary.flights', 
            'departurecity', 'departurecountry', 'sleepcity', 'sleepcountry', 'stopcities', 'stopcountry',
            'prices', 'minprice', 'categoryname', 'included', 'languages'
            ],
            booking: ['-_id', 'status', 'dmc', 'product', 'meetingdata', 'affiliateobservations', 'affiliateuser', 'idBookingExt',
                    'idBooking', 'createdOn', 'payStatus', 'roomDistribution', 'amount', 'comments', 'cancelpolicy', 'end', 'start'],
            countries: ['-_id', 'label_en', 'label_es', 'slug']
        },
        removefields: {
            product: ['departurecity', 'departurecountry', 'sleepcity', 'sleepcountry', 'stopcities', 'stopcountry'],
            booking: null,
            countries: null
        },
        populate: {
            product: [{ path: 'dmc', select: 'name membership.cancelpolicy' }],
            booking: [{ path: 'dmc', select: 'company.name company.name company.legalname company.emergencyphone company.location' }],
            countries: null
        }
    },
    book: {
        statusmap: {
            "transfer1-2" : 'ok',
            "transferok2-2": 'ok', 
            "regular1-2": 'ok', 
            "regularend": 'ok',
            "cancelled" : 'cancelled', 
            "invalid" : 'cancelled'
        }
    }

}
