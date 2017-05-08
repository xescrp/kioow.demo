module.exports = function (conf, callback) {

    conf.constants = {
        find: {
            allowedcollections: {
                countries: 'DestinationCountries',
                cities: 'DestinationCities',
                tags: 'TripTags',
                providers: 'DMCs'
            },
            queries: {
                countries: { slug: { $ne: null } },
                cities: { countrycode: { $ne: null }, country: { $ne: null } },
                tags: { slug: { $ne: null } },
                providers: { 'membership.b2bchannel': true, 'membership.registervalid' : true }
            },
            fields: {
                countries: ['-_id', 'label_en', 'label_es', 'slug', 'location.longitude', 'location.latitude'].join(' '),
                cities: ['-_id', 'label_en', 'label_es', 'slug', 'countrycode', 'location.longitude', 'location.latitude'].join(' '),
                tags: ['-_id', 'label', 'label_en', 'slug'].join(' '),
                providers: ['-_id', 'code', 'company.name', 'company.operatein.zone', 'company.operatein.operateLocation.country', 'company.operatein.operateLocation.countrycode'].join(' ')
            },
            sort: {
                label_en: 1,
                'company.name' : 1
            },
            max: 1000 
        },
        fetch: {
            allowedcollections: {
                programs: 'DMCProducts',
                booking: 'Bookings'
            },
            fields: {
                programs: '_id code title title_es slug slug_es availability important_txt_es important_txt_en description_es ' +
                    'included itinerarylength release ' +
                    'dmc departurecity stopcities sleepcity departurecountry stopcountry sleepcountry buildeditinerary ' +
                    'categoryname minprice tags pvp prices ' +
                    'itinerary.daynumber itinerary.needflights itinerary.description_es itinerary.activities itinerary.hotel ' +
                    'itinerary.activities itinerary.flights ' +
                    'itinerary.sleepcity.cityid itinerary.departurecity.cityid itinerary.stopcities.cityid ' +
                    'itinerary.sleepcity.city_es itinerary.departurecity.city_es itinerary.stopcities.city_es ' +
                    'itinerary.sleepcity.city itinerary.departurecity.city itinerary.stopcities.city ' +
                    'itinerary.sleepcity.country itinerary.departurecity.country itinerary.stopcities.country ' +
                    'itinerary.sleepcity.slug itinerary.departurecity.slug itinerary.stopcities.slug ' +
                    'itinerary.sleepcity.countryid itinerary.departurecity.countryid itinerary.stopcities.countryid',
                product: ['_id', 'code', 'dmccode', 'dmc', 'important_txt_es', 'important_txt_en', 'description_en', 'description_es', 'pvp',
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
                    'prices', 'minprice', 'categoryname', 'included', 'languages', 'buildeditinerary'
                ],
                booking: ['-_id', 'status', 'dmc', 'product', 'meetingdata', 'affiliateobservations', 'affiliateuser', 'idBookingExt',
                    'idBooking', 'createdOn', 'payStatus', 'roomDistribution', 'amount', 'comments', 'cancelpolicy', 'end', 'start']
            },
            removefields: {
                product: ['departurecity', 'departurecountry', 'sleepcity', 'sleepcountry', 'stopcities', 'stopcountry'],
                booking: null,
                countries: null
            },
            populate: {
                programs: [{ path: 'dmc', select: '_id code additionalinfo.description company.name membership.commission membership.b2bcommission membership.pvp membership.cancelpolicy currency' },
                    { path: 'sleepcountry', select: '_id slug label_en label_es location.longitude location.latitude' },
                    { path: 'departurecountry', select: '_id slug label_en label_es location.longitude location.latitude' },
                    { path: 'stopcountry', select: '_id slug label_en label_es location.longitude location.latitude' },
                    { path: 'sleepcity', select: '_id slug countrycode label_en label_es location.longitude location.latitude' },
                    { path: 'departurecity', select: '_id slug countrycode label_en label_es location.longitude location.latitude' },
                    { path: 'stopcities', select: '_id slug countrycode label_en label_es location.longitude location.latitude' }
                ],
                booking: [{ path: 'dmc', select: '_id code additionalinfo.description company.name membership.commission membership.b2bcommission membership.pvp membership.cancelpolicy currency' }],
                countries: null,
                cities: null,
                tags: null
            }
        },
        book: {
            statusmap: {
                "transfer1-2": 'ok',
                "transferok2-2": 'ok',
                "regular1-2": 'ok',
                "regularend": 'ok',
                "cancelled": 'cancelled',
                "invalid": 'cancelled'
            }
        }
    }
    conf.dmcquery = { 'membership.b2bchannel': true };

    conf.mementofetch = function (keys, callback) {
        var cnx = require('yourttoo.connector');
        var connection = cnx.createAPIConnector({
            url: 'http://localhost:4000',   //url to the endpoint (could be any url...)
            endpointinterface: 'socket'       //endpointinterface: 'http' or 'socket'
        });

        var rq = connection.sendRequest({
            command: 'pull',
            request: {
                Keys: keys,
                oncompleteeventkey: 'pull.done'
            },
            service: 'memento'
        });

        rq.on('pull.done', function (rs) {
            callback(rs);
        });
    }
    var common = require('yourttoo.common');
    //names: months_en, months_es, timezones, currencys, bankcountries, assistancelanguages, paymentoptions, hermessuscriptions
    conf.hashdata = {
        'static': function (name) {
            return common.staticdata[name];
        }
    };
    conf.filter != null && conf.filter.countrynames != null && conf.filter.countrynames.length > 0 ? conf.countrynames = conf.filter.countrynames : null;
    conf.filter != null && conf.filter.citynames != null && conf.filter.citynames.length > 0 ? conf.citynames = conf.filter.citynames : null;
    conf.currency = 'EUR';
    setImmediate(function () { callback(null, conf); })

}