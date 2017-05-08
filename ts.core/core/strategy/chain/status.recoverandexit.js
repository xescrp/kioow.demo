module.exports = function (conf, callback) {
    console.log('we have finished...');
    console.log('...exiting');

    var ender = {
        Bookings2: function () {
            var core = conf.core;
            core.list('Bookings2').model.find({ idBooking: conf.booking.idBooking })
                .exec(function (err, docs) {
                    //populating...
                    core.list('Bookings2').model.populate(docs, [
                        { path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }, { path: 'dmc' }, { path: 'traveler' },
                        { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
                        { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
                        { path: 'invoices' }, { path: 'relatedbooking' }], function (err, popdocs) {
                            //exiting...
                            err != null ?
                                setImmediate(function () {
                                    callback(err, conf);
                                })
                                :
                                setImmediate(function () {
                                    callback(null, popdocs[0]);
                                });
                        });


                });
        },
        UserQueries: function () {
            var core = conf.core;
            core.list('UserQueries').model.find({ code: conf.userquery.code })
                .exec(function (err, docs) {
                    //populating...
                    core.list('UserQueries').model.populate(docs, [
                        { path: 'quotes', populate: [{ path: 'products', model: 'DMCProducts' }] },
                        { path: 'selectedquote', populate: [{ path: 'products', model: 'DMCProducts' }] },
                        { path: 'dmc' }, 
                        { path: 'affiliate' }, { path: 'chats' }, { path: 'booking' }], function (err, popdocs) {
                            //exiting...
                            err != null ?
                                setImmediate(function () {
                                    callback(err, conf);
                                })
                                :
                                setImmediate(function () {
                                    callback(null, popdocs[0]);
                                });
                        });


                });
        },
        Quotes: function () {
            var core = conf.core;
            core.list('Quotes').model.find({ code: conf.quote.code })
                .exec(function (err, docs) {
                    //populating...
                    core.list('Quotes').model.populate(docs, [
                        { path: 'products', populate: [
                        { path: 'dmc', model: 'DMCs' },
                        { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' },
                        { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }
                        ]
                    }, { path: 'booking' }], function (err, popdocs) {
                            //exiting...
                            err != null ?
                                setImmediate(function () {
                                    callback(err, conf);
                                })
                                :
                                setImmediate(function () {
                                    callback(null, popdocs[0]);
                                });
                        });


                });
        }
    };
    //recover and exit...
    ender[conf.collection] != null ? ender[conf.collection]() : setImmediate(null, conf);

}