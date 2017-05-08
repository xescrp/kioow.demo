module.exports = function (conf, callback) {
    var bookingids = conf.bookingids;
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var statics = { total: 0, done: 0, witherrors: 0, success: 0 };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var witherrors = [];

    var async = require('async');
    var fetchtasks = []; var queries = []; var quotes = []; var chats = [];
    var u_bookinghash = {};
    var bookingcodes = [];
    var bookingids = [];
    var c_bookinghash = {};
    var pushtasks = [];
    var counters = {
        queries: {
            total: 0,
            done:0
        },
        quotes: {
            total: 0,
            done: 0
        },
        chats: {
            total: 0,
            done: 0
        }
    };
    cev.on('save.docs', function () {
        console.log(u_bookinghash);
        console.log(c_bookinghash);
        _.each(u_bookinghash, function (ququ) {
            if (ququ.query != null && ququ.query.booking != null) {
                pushtasks.push(function (UQScallback) {
                    core.list('UserQueries').model.update({ code: ququ.query.code }, { booking: ququ.query.booking, oldbooking: ququ.query.booking.relatedbooking }, function (err, numAffected) {
                        counters.queries.done++;
                        var resultmessage = err != null ? err : 'query ' + ququ.query.code + ' updated successfully';
                        UQScallback(err, resultmessage);
                    });
                });
            }
            if (ququ.quote != null && ququ.quote.booking != null) {
                pushtasks.push(function (QScallback) {
                    core.list('Quotes').model.update({ code: ququ.quote.code }, { booking: ququ.quote.booking, oldbooking: ququ.quote.booking.relatedbooking }, function (err, numAffected) {
                        counters.quotes.done++;
                        var resultmessage = err != null ? err : 'quote ' + ququ.quote.code + ' updated successfully';
                        QScallback(err, resultmessage);
                    });
                });
            }
        });
        _.each(c_bookinghash, function (chat) {
            pushtasks.push(function (CHATcallback) {
                core.list('Chats').model.update({ code: chat.code }, { booking2: chat.booking2 }, function (err, numAffected) {
                    counters.chats.done++;
                    var resultmessage = err != null ? err : 'chat ' + chat.code + ' updated successfully';
                    CHATcallback(err, resultmessage);
                });
            });
        });

        async.parallel(pushtasks, function (err, results) {
            console.log('All tasks finished');
            console.log(counters);
            results.push(counters);
            conf.results = results;
            callback(err, conf);
        });
    });

    cev.on('fetch.bookings', function() {
        var query = { idBooking: { $in: bookingcodes } };
        var querychats = { relatedbooking: { $in: bookingids } };

        core.list('Bookings2').model.find({ $or: [query, querychats] })
            .select('_id idBooking code relatedbooking createdOn updatedOn')
            .exec(function (err, docs) {
                err != null ? callback(err, conf) : setImmediate(function () {
                    _.each(docs, function (book) {
                        u_bookinghash[book.idBooking] != null && u_bookinghash[book.idBooking].query != null ? (u_bookinghash[book.idBooking].query.booking = book, counters.queries.total++) : null;
                        u_bookinghash[book.idBooking] != null && u_bookinghash[book.idBooking].quote != null ? (u_bookinghash[book.idBooking].quote.booking = book, counters.quotes.total++) : null;
                        c_bookinghash[book.relatedbooking] != null ? (c_bookinghash[book.relatedbooking].booking2 = book, counters.chats.total++) : null;
                    });
                    cev.emit('save.docs');
                });
            });
    });
    //fetch booking on queries
    fetchtasks.push(function (Ucallback) {
        core.list('UserQueries').model.find({ idBooking: { $ne: null } })
            .select('_id code idBooking booking oldbooking')
            .exec(function (err, docs) {
                Ucallback(err, docs);
            });
    });
    //fetch booking on quotes
    fetchtasks.push(function (Qcallback) {
        core.list('Quotes').model.find({ idBooking: { $ne: null } })
            .select('_id code idBooking booking oldbooking')
            .exec(function (err, docs) {
                Qcallback(err, docs);
            });
    });
    //fetch booking on chats
    fetchtasks.push(function (Ccallback) {
        core.list('Chats').model.find({ booking: { $ne: null } })
            .select('_id code booking2 booking')
            .exec(function (err, docs) {
                Ccallback(err, docs);
            });
    });

    async.parallel(fetchtasks, function (err, results) {
        err != null ? callback(err, conf) : setImmediate(function () {
            queries = results[0];
            quotes = results[1];
            chats = results[2];
            _.each(queries, function (query) {
                u_bookinghash[query.idBooking] != null ? u_bookinghash[query.idBooking].query = query : u_bookinghash[query.idBooking] = { query: query };
                bookingcodes.push(query.idBooking);
            });
            _.each(quotes, function (quote) {
                u_bookinghash[quote.idBooking] != null ? u_bookinghash[quote.idBooking].quote = quote : u_bookinghash[quote.idBooking] = { quote: quote };
                bookingcodes.push(quote.idBooking);
            });
            _.each(chats, function (chat) {
                c_bookinghash[chat.booking] = chat;
                bookingids.push(chat.booking);
            });
            cev.emit('fetch.bookings');
        });
    });
}