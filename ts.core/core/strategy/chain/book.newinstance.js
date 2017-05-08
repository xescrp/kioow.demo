module.exports = function (conf, callback) {
    console.log('booking - instance a new booking');
    var core = conf.core;
    var bookingmodel = conf.bookingmodel;

    var mongo = conf.mongo; 
    require('../../factory/codesgenerator')(mongo, 'Bookings2', function (cbcode) {

        cbcode = require('../../factory/codesformatter')({
            code: cbcode,
            collectionname: 'Bookings2',
            document: { bookingmodel: conf.bookingmodel }
        });

        var booking = core.list('Bookings2').model({
            idBooking: cbcode,
            code: cbcode,
            idBookingExt: conf.idBookingExt,
            agentid: conf.agentid,
            exchanges: conf.exchanges,
            timezone: conf.timezone,
            bookingmodel: conf.bookingmodel,
            paymentmodel: conf.paymentmodel,
            dates: {
                start: conf.datesPool.start,
                end: conf.datesPool.end,
                finalpayment: conf.datesPool.finalpayment,
                finalcharge: conf.datesPool.finalcharge,
                firstcharge: conf.datesPool.firstcharge,
                paymentoption: conf.datesPool.paymentoption
            },
            chargefeatures: {
                first: { amount: 0, date: conf.datesPool.firstcharge.date },
                second: { amount: 0, date: conf.datesPool.finalcharge.date },
                third: { amount: 0, date: null },
                fourth: { amount: 0, date: null },
            },
            pricing: { margin: 3, iva: conf.bookingmodel == 'whitelabel' ? 21 : 0 },
            traveler: conf.traveler,
            dmc: conf.dmc,
            affiliate: conf.affiliate,
            query: conf.taylorrequest,
            quote: conf.taylorquote,
            signin: conf.signup,
            meetingdata: conf.meetingdata,
            observations: {
                label_es: conf.product.vouchernotes || conf.dmc.vouchernotes,
                label_en: '', //conf.product.vouchernotes || conf.dmc.vouchernotes,
                observations: conf.observations,
                signing: conf.affiliate != null ? 'affiliate' : 'traveler'
            },
            cancelpolicy: {
                _es: conf.dmc.membership != null && conf.dmc.membership.cancelpolicy != null ? conf.dmc.membership.cancelpolicy._es : '',
                _en: conf.dmc.membership != null && conf.dmc.membership.cancelpolicy != null ? conf.dmc.membership.cancelpolicy._en : '',
            },
            lastexchangeapplyed: core.plugins.cux.currentexchanges,
            status: 'onbudget'
        });

       
        conf.booking = booking;
        callback(null, conf);
    });
    
}