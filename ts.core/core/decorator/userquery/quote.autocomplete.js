var common = require('yourttoo.common');
var _ = require('underscore');
var async = require('async');
var _blanks = require('../../factory/_blanks');

module.exports = function (options, callback, errorcallback) {
    var core = options.core.corebase;
    var mongo = options.core.mongo;
    var query = options.document;
    var member = options.member;
    var affiliate = query.affiliate;
    var qcode = query != null && query.code != '' && query.code != 'NOCODE' ? query.code : null;
    var querymodels = ['UserQueries'];
    var modelname = (query != null && query.list != null && query.list.model != null) ? query.list.model.modelName : options.modelname;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    //check dmcs -> check each dmc quote -> check each product quote
    cev.on('all.done', function () {
        querymodels.indexOf(modelname) >= 0 && (query.quotes != null && query.quotes.length > 0) ?
            _.each(query.quotes, function (quote) {
                query.quotesstates == null ? query.quotesstates = [] : null;
                var qst = _.find(query.quotesstates, function (qstate) { return qstate.dmccode.toLowerCase() == quote.dmccode.toLowerCase(); });
                qst != null ? qst.status = quote.status : query.quotesstates.push({ dmccode: quote.dmccode, status: quote.status });
            }) : null;
        callback(query);
    });

    cev.on('all.error', function (err) {
        errorcallback(err);
    });

    cev.on('push.quoteproducts', function (quotes) {
        quotes != null && quotes.length > 0 ?
            setImmediate(function () {
                var saves = [];
                //there are quotes to check out
                _.each(quotes, function (quote) {
                    delete quote['__v'];
                    console.log('saving quote...' + quote.code);
                    console.log(quote);
                    saves.push(function (tcallback) {
                        console.log('quote push parallel task launched...');
                        if (typeof (quote.save) === 'function') {
                            quote.save(function (err, savedquote) {
                                err != null ? console.error(err) : console.log('quote ' + quote.code + ' saved properly...');
                                var existingQuote = _.find(query.quotes, function (fquote) { return fquote.code.toLowerCase() == savedquote.code.toLowerCase(); });
                                existingQuote == null ? query.quotes.push(savedquote) : null; //push into query
                                tcallback(err, savedquote);
                            });
                        } else { setImmediate(function () { tcallback(null, quote); }); }
                    });
                });

                async.parallel(saves, function (err, results) {
                    err != null ? errorcallback(err) : setImmediate(function () {
                        cev.emit('all.done', results);
                    });
                });
            }) :
            setImmediate(function () {
                //finish
                cev.emit('all.done');
            });
    });

    cev.on('check.quoteproducts', function (quotes) {
        quotes != null && quotes.length > 0 ?
            setImmediate(function () {
                var qprodtasks = [];
                _.each(quotes, function (quote) {
                    qprodtasks.push(function (callback) {
                        quote.products != null && !common.utils.stringIsNullOrEmpty(quote.products.code) ?
                            setImmediate(function () {
                                //already assigned
                                callback(null, quote);
                            }) :
                            setImmediate(function () {
                                //new dummy assigned
                                var program = core.list('DMCProducts').model(_blanks.blankquoteprogram);
                                quote.title_en = program.title_en;
                                quote.title_es = program.title_es;
                                delete program['__v'];
                                program.dmc = _.find(query.dmcs, function (dmc) {
                                    return quote.dmccode.toLowerCase() == dmc.code.toLowerCase();
                                });
                                console.log('program dmc: ');
                                console.log(program.dmc);
                                program.dmccode = quote.dmccode;
                                program.code = ['TM-PR', quote.dmccode, quote.code].join('-');
                                program.pvp = { b2b: quote.pvpAffiliate != null ? quote.pvpAffiliate.value : 0, currency: { value: 'EUR', symbol: '€', label: 'Eur' } } 
                                _.each(query.whattodo, function (tag) {
                                    program.tags.push({ value: tag.value, label: tag.label, label_en: tag.label_en, slug: tag.slug });
                                    program.keys != null && typeof(program.keys.push) == 'function' ? program.keys.push({ value: tag.value, label: tag.label, label_en: tag.label_en, slug: tag.slug }) : null;
                                });;
                                program.save(function (err, doc) {
                                    quote.products = doc;
                                    //product for tailor saved
                                    callback(null, quote);
                                });
                            });
                    });
                });
                async.parallel(qprodtasks, function (err, results) {
                    err != null ? errorcallback(err) : setImmediate(function () {
                        cev.emit('push.quoteproducts', results);
                    });
                });
            }) :
            setImmediate(function () {
                cev.emit('all.done');
            });
    });

    cev.on('check.quotes', function () {
        var quotesstack = [];
        _.each(query.dmcs, function (dmc) {
            quotesstack.push(function (callback) {
                var opSt = new Date();
                var vlSt = new Date();
                vlSt.setDate(vlSt.getDate() + 7);
                var finded = false;
                var quote = _.find(query.quotes, function (quote) { return quote.dmccode.toLowerCase() == dmc.code.toLowerCase(); });
                quote == null ? quote = core.list('Quotes').model({
                    dmccode: dmc.code,
                    status: 'new',
                    fees: query.affiliate != null ? query.affiliate.fees : null,
                    isB2C: query.affiliate == null,
                    userqueryCode: query.code,
                    name: '',
                    title_es: '',
                    title_en: '',
                    userqueryId: query._id,
                    travelercode: query.travelercode,
                    rooms: _blanks.blankquoterooms(dmc.currency),
                    affiliatecode: query.affiliate != null ? query.affiliate.code : null,
                    comission: 0,
                    b2bcommission: dmc.membership.b2bcommission || 0,
                    omtmargin: query.affiliate != null ? query.affiliate.membership.omtmargin : 0,
                    operationStart: {
                        year: opSt.getFullYear(),
                        month: opSt.getMonth(),
                        monthname_es: common.utils.getMonthNameEnglish(opSt.getMonth()),
                        monthname_en: common.utils.getMonthNameSpanish(opSt.getMonth()),
                        day: opSt.getDate()
                    },
                    operationStartDate: opSt,
                    quoteValidUntil: {
                        year: vlSt.getFullYear(),
                        month: vlSt.getMonth(),
                        monthname_es: common.utils.getMonthNameEnglish(vlSt.getMonth()),
                        monthname_en: common.utils.getMonthNameSpanish(vlSt.getMonth()),
                        day: vlSt.getDate()
                    },
                    quoteValidDate: vlSt,
                    amount: {
                        value: 0,
                        currency: dmc.currency
                    },
                    netPrice: {
                        value: 0,
                        currency: dmc.currency
                    },
                    pvpAffiliate: {
                        value: 0,
                        currency: dmc.currency
                    },
                    responseDetails: {
                        comments: '',
                        conditions: '',
                        cancelpolicy: {
                            _es: dmc.membership.cancelpolicy._es,
                            _en: dmc.membership.cancelpolicy._en
                        }
                    }
                }) : finded = true;
                if (!finded) {
                    //check room distribution
                    var roomcount = _.countBy(query.roomDistribution, function (room) {
                        return (room != null && room.roomType != null && room.roomType.roomCode != '') ? room.roomType.roomCode.toLowerCase() : 'unknown';
                    });
                    quote.rooms.single.quantity = roomcount.single != null ? roomcount.single : 0;
                    quote.rooms.double.quantity = roomcount.double != null ? roomcount.double : 0;
                    quote.rooms.triple.quantity = roomcount.triple != null ? roomcount.triple : 0;
                    quote.rooms.quad.quantity = roomcount.quad != null ? roomcount.quad : 0;
                    //check childs...
                    if (query.roomDistribution != null && query.roomDistribution.length > 0 && (quote.children == null || quote.children.length == 0)) {
                        _.each(query.roomDistribution, function (room) {
                            if (room.paxList != null && room.paxList.length > 0) {
                                _.each(room.paxList, function (pax) {
                                    //add the child
                                    pax.age < 12 ? quote.children.push({
                                        age: pax.age,
                                        quantity: 1, //numero de ninios
                                        pricePerPax: { value: 0, currency: dmc.currency },
                                        amountPricePerPax: { value: 0, currency: dmc.currency },
                                        pvpAffiliatePerPax: { value: 0, currency: dmc.currency }
                                    }) : null;
                                });
                            }
                        });
                    }

                    common.utils.stringIsNullOrEmpty(quote.code) ?
                        setImmediate(function () {

                            require('../../factory/codesgenerator')(mongo, 'Quotes', function (cbcode) {
                                //reformat the code 
                                cbcode = require('../../factory/codesformatter')({
                                    code: cbcode,
                                    collectionname: 'Quotes',
                                    document: quote
                                });
                                //very special case....
                                quote.code = cbcode;
                                callback(null, quote);
                            });
                        }) :
                        setImmediate(function () {
                            callback(null, quote);
                        });
                } else {
                    callback(null, quote);
                }
            });
        });

        async.parallel(quotesstack, function (err, results) {
            err != null ? errorcallback(err) : setImmediate(function () {
                cev.emit('check.quoteproducts', results);
            });
        });

    });

    cev.on('check.dmcs', function () {
        query.dmcs != null && query.dmcs.length > 0 ? cev.emit('check.quotes') : cev.emit('all.done'); 
    });

    cev.on('populate.query', function () {
        core.list('UserQueries').model.populate(query, [
            {
                path: 'quotes',
                populate: [{
                    path: 'products', populate: [
                        { path: 'dmc', model: 'DMCs' },
                        { path: 'sleepcountry' }, { path: 'departurecountry' }, { path: 'stopcountry' },
                        { path: 'sleepcity' }, { path: 'departurecity' }, { path: 'stopcities' }
                    ]
                }, { path: 'booking' }]
            },
            { path: 'dmcs' }, { path: 'traveler' },
            { path: 'affiliate' }, { path: 'chats' }, { path: 'booking' }],
            function (err, populatedQuery) {
                err != null ? cev.emit('all.error', err) : setImmediate(function () {
                    query = populatedQuery;
                    query.affiliate = query.affiliate || affiliate;
                    console.log(query);
                    query.quotes == null ? query.quotes = [] : null;
                    cev.emit('check.dmcs');
                });
            });
    });
    querymodels.indexOf(modelname) >= 0 && qcode != null ? cev.emit('populate.query') : cev.emit('all.done');
    
}