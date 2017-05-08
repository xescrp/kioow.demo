module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var async = require('async');

    var urlMgmt = require("url");
    

    var destinationcountries = conf.destinationcountries;
    var launcherevents = ['findinvoicesprovider', 'findinvoicesaffiliate', 'checkpayments.charges',
        'checkpayments.payments', 'checkstories.comments', 'checkstories.stories', 'getrooms',
        'get.query', 'get.quote', 'product.save', 'pricing', 'voucherfile'];

    var booktypehash = {
        bookingb2c: 'traveler',
        bookingb2b: 'signup',
        budget: 'signup',
        taylormadeb2c: 'traveler',
        taylormadeb2cgroups: 'traveler',
        taylormadeb2b: 'signup',
        taylormadeb2bgroups: 'signup',
        xmlapi: 'signup',
        whitelabel: 'signup',
    };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

    var paymentoption = {
        '28before': 28 + 7,
        '21before': 21 + 7,
        '14before': 14 + 7,
        '7before': 7 + 7,
        'arrival': 7 + 7,
        'departure': 7 + 7,
        'default': 30 + 7
    };

    var paymentoptionprovider = {
        '28before': 28,
        '21before': 21,
        '14before': 14,
        '7before': 7,
        'arrival': 7,
        'departure': 7,
        'default': 30
    };

    var asyncstuff = {
        invoicesprovider: false,
        invoicesagency: false,
        quote: false,
        query: false,
        product: false,
        charges: false,
        payments: false,
        rooms: false,
        signin: false,
        comments: false,
        stories: false,
        pricing: false,
        voucher: false
    };

    function pricerooms(scoperooms, booking) {
        var paxescount = 0;
        _.each(scoperooms, function (room) {
            paxescount += (room.paxList != null && room.paxList.length > 0) ? room.paxList.length : 0;
        });

        var rooms = {
            roomssnapshot: {
                triple: booking.affiliate != null ? booking.netPrice.value / paxescount : booking.amount.value / paxescount,
                double: booking.affiliate != null ? booking.netPrice.value / paxescount : booking.amount.value / paxescount,
                single: booking.affiliate != null ? booking.netPrice.value / paxescount : booking.amount.value / paxescount,
                quad: booking.affiliate != null ? booking.netPrice.value / paxescount : booking.amount.value / paxescount,
                currency: booking.dmc.currency.value
            },
            roomspricing: {
                triple: booking.affiliate != null ? booking.pvpAffiliate.exchange.value / paxescount : booking.amount.exchange.value / paxescount,
                double: booking.affiliate != null ? booking.pvpAffiliate.exchange.value / paxescount : booking.amount.exchange.value / paxescount,
                single: booking.affiliate != null ? booking.pvpAffiliate.exchange.value / paxescount : booking.amount.exchange.value / paxescount,
                quad: booking.affiliate != null ? booking.pvpAffiliate.exchange.value / paxescount : booking.amount.exchange.value / paxescount,
                currency: 'EUR'
            }
        };


        //if (booking.affiliate != null) {

        //}


        //if (scoperooms != null && scoperooms.length > 0) {
        //    _.each(scoperooms, function (room) {
        //        if (room != null) {
        //            rooms.roomssnapshot[room.roomCode] = room.pricePerPax != null && room.pricePerPax.value != null ? room.pricePerPax.value : 0;
        //            rooms.roomssnapshot[room.roomCode] = room.pricePerPax != null && room.pricePerPax.exchange != null && room.pricePerPax.exchange.value != null ?
        //                room.pricePerPax.exchange.value : rooms.roomssnapshot[room.roomCode];

        //            rooms.roomspricing[room.roomCode] = room.pvpAffiliatePerPax != null && room.pvpAffiliatePerPax.value != null ? room.pvpAffiliatePerPax.value : rooms.roomssnapshot[room.roomCode];
        //            rooms.roomspricing[room.roomCode] = room.pvpAffiliatePerPax != null && room.pvpAffiliatePerPax.exchange != null && room.pvpAffiliatePerPax.exchange.value != null ?
        //                room.pvpAffiliatePerPax.exchange.value : rooms.roomspricing[room.roomCode];
        //        }
        //    });
        //}
        return rooms;
    }

    function getrooms(scoperooms, booking) {
        var rooms = null;

        var paxescount = 0;
        _.each(scoperooms, function (room) {
            paxescount += (room.paxList != null && room.paxList.length > 0) ? room.paxList.length : 0;
        });

        if (scoperooms != null && scoperooms.length > 0) {
            rooms = [];

            _.each(scoperooms, function (room) {
                var nroom = {
                    name: room.roomCode,
                    roomcode: room.roomCode,
                    paxlist: [],

                };

                _.each(room.paxList, function (pax) {
                    var npax = {
                        name: pax.name,
                        lastname: pax.lastName,
                        documentnumber: pax.documentNumber,
                        documenttype: pax.documentType,
                        holder: pax.holder,
                        documentexpeditioncountry: 'ES',
                        birthdate: pax.birdthDate,
                        country: pax.country != null ? pax.country.countrycode : 'ES',
                        price: 0,
                        pricecurrency: 'EUR',
                        dmc: 0,
                        dmccurrency: 'EUR',
                        net: 0,
                        netcurrency: 'EUR',
                        room: room.roomCode
                    };
                    //PRICE FIELD
                    //VALUE
                    npax.price = booking.amount != null && booking.amount.value != null ? Math.round(booking.amount.value / paxescount) : 0; 
                    npax.price = booking.pvpAffiliate != null && booking.pvpAffiliate.value != null ? Math.round(booking.pvpAffiliate.value / paxescount) : npax.price;
                    npax.pricecurrency = booking.amount != null && booking.amount.currency != null ? booking.amount.currency.value : 'EUR';
                    npax.pricecurrency = booking.pvpAffiliate != null && booking.pvpAffiliate.currency != null ? booking.pvpAffiliate.currency.value : npax.pricecurrency;
                    //EXCHANGE VALUE
                    npax.price = booking.amount != null && booking.amount.exchange != null && booking.amount.exchange.value != null ? Math.round(booking.amount.exchange.value / paxescount) : npax.price;
                    npax.price = booking.pvpAffiliate != null && booking.pvpAffiliate.exchange != null && booking.pvpAffiliate.exchange.value != null ? Math.round(booking.pvpAffiliate.exchange.value / paxescount) : npax.price;
                    npax.pricecurrency = booking.amount != null && booking.amount.exchange.currency != null ? booking.amount.exchange.currency.value : npax.pricecurrency;
                    npax.pricecurrency = booking.pvpAffiliate != null && booking.pvpAffiliate.exchange.currency != null ? booking.pvpAffiliate.exchange.currency.value : npax.pricecurrency;

                    //NET FIELD
                    //VALUE
                    npax.net = booking.amount != null && booking.amount.value != null ? Math.round(booking.amount.value / paxescount) : 0;
                    npax.netcurrency = booking.amount != null && booking.amount.currency != null ? booking.amount.currency.value : 'EUR';
                    //EXCHANGE VALUE
                    npax.net = booking.amount != null && booking.amount.exchange != null ? Math.round(booking.amount.exchange.value / paxescount) : npax.net;
                    npax.netcurrency = booking.amount != null && booking.amount.exchange.currency != null ? booking.amount.exchange.currency.value : npax.netcurrency;

                    //DMC FIELD
                    //VALUE
                    npax.dmc = booking.netPrice != null && booking.netPrice.value != null ? Math.round(booking.netPrice.value / paxescount) : 0;
                    npax.dmccurrency = booking.netPrice != null && booking.netPrice.currency != null ? booking.netPrice.currency.value : booking.dmc.currency.value;

                    nroom.priceperpax = npax.price;
                    nroom.priceperpaxcurrency = npax.pricecurrency;
                    nroom.pricecurrency = npax.pricecurrency;

                    nroom.dmcperpax = npax.dmc;
                    nroom.dmcperpaxcurrency = npax.dmccurrency;
                    nroom.dmccurrency = npax.dmccurrency;

                    nroom.netperpax = npax.net;
                    nroom.netperpaxcurrency = npax.netcurrency;
                    nroom.netcurrency = npax.netcurrency;
                    ////EXCHANGE VALUE
                    //npax.dmc = booking.amount != null && room.amount.exchange != null ? room.amount.exchange.value : 0;
                    //npax.dmccurrency = booking.amount != null && room.amount.exchange.currency != null ? room.amount.exchange.currency.value : 0;

                    //npax.price = booking.pvpAffiliate != null && room.pvpAffiliate.value != null ? room.pvpAffiliate.value : 0;

                    //npax.price = room.pvpAffiliatePerPax != null && room.pvpAffiliatePerPax.value != null ? room.pvpAffiliatePerPax.value : npax.price;

                    //npax.price = room.pricePerPax != null && room.pricePerPax.value != null ? room.pricePerPax.value : 0;
                    //npax.price = room.pricePerPax != null && room.pricePerPax.exchange != null && room.pricePerPax.exchange.value != null ?
                    //    room.pricePerPax.exchange.value : npax.price;

                    //npax.price = room.pvpAffiliatePerPax != null && room.pvpAffiliatePerPax.value != null ? room.pvpAffiliatePerPax.value : npax.price;
                    //npax.price = room.pvpAffiliatePerPax != null && room.pvpAffiliatePerPax.exchange != null && room.pvpAffiliatePerPax.exchange.value != null ?
                    //    room.pvpAffiliatePerPax.exchange.value : npax.price;
                    console.log(npax);
                    nroom.paxlist.push(npax);
                });
                nroom.price = nroom.priceperpax > 0 ? nroom.priceperpax * nroom.paxlist.length : 0;
                nroom.net = nroom.netperpax > 0 ? nroom.netperpax * nroom.paxlist.length : 0;
                nroom.dmc = nroom.dmcperpax > 0 ? nroom.dmcperpax * nroom.paxlist.length : 0;
                rooms.push(nroom);
            });
        }
        console.log(rooms);
        return rooms;
    }

    function pushrooms(roomdistribution) {
        function _get_age(born) {
            var now = new Date();
            var birthday = new Date(born.getFullYear(), born.getMonth(), born.getDate());
            var age = now.getFullYear() - born.getFullYear();
            return age;
        }
        var holderfinded = false;
        _.each(roomdistribution, function (room) {
            var e_room = {
                roomcode: room.roomcode,
                name: room.roomcode,
                paxlist: [],
                price: room.price,
                priceperpax: room.priceperpax,
                pricecurrency: room.pricecurrency,
                priceperpaxcurrency: room.priceperpaxcurrency,
                net: room.net,
                netperpax: room.netperpax,
                netcurrency: room.netcurrency,
                netperpaxcurrency: room.netperpaxcurrency,
                dmc: room.dmc,
                dmcperpax: room.dmcperpax,
                dmccurrency: room.dmccurrency,
                dmcperpaxcurrency: room.dmcperpaxcurrency
            };
            _.each(room.paxlist, function (pax) {
                var paxn = {
                    name: pax.name,
                    slug: common.utils.slug([pax.name, common.utils.getToken()].join('-')),
                    lastname: pax.lastname,
                    birthdate: pax.birthdate,
                    documentnumber: pax.documentnumber,
                    documenttype: pax.documenttype,
                    documentexpirationdate: pax.documentexpirationdate,
                    documentexpeditioncountry: pax.documentexpeditioncountry,
                    holder: pax.holder != null ? pax.holder : false,
                    country: pax.country,
                    room: room.roomcode,
                    price: pax.price,
                    dmc: pax.dmc,
                    net: pax.net,
                    pricecurrency: pax.pricecurrency,
                    dmccurrency: pax.dmccurrency,
                    netcurrency: pax.netcurrency
                };

                paxn.country = destinationcountries[pax.country.toLowerCase()] || null;
                paxn.documentexpeditioncountry = paxn.documentexpeditioncountry != null ?
                    destinationcountries[paxn.documentexpeditioncountry.toLowerCase()] : null;
                holderfinded = holderfinded || pax.holder;
                e_room.paxlist.push(paxn.slug);
                booking2.paxes.push(paxn);
            });
            //set holder if not exists..
            !holderfinded ? booking2.paxes[0].holder = true : null; //on the first room, first pax
            cev.emit('push.signin', booking2.paxes[0]);
            booking2.rooms.push(e_room);
        });
    }

    cev.on('populate.booking', function () {
        core.list('Bookings2').model.populate(booking2, [
            { path: 'dmc' },
            { path: 'affiliate' },
            { path: 'traveler' },
            { path: 'products', select: 'name title title_es _id itinerary sleepcountry sleepcity' },
            { path: 'payments' },
            { path: 'signin' },
            { path: 'invoices' },
            { path: 'relatedbooking' }
        ]);
    });

    cev.on('process.done', function (thebooking) {
        console.log('iterator finished... return results');
        console.log('BOOKING TRANSFERRED ON ITERATOR -> ' + thebooking.idBooking);
        thebooking.paymentmodel = paymentmodel;
        conf.tranferredbooking = thebooking;
        callback(thebooking);
    });

    function checkfinished(eventname) {
        console.log('check finished from...' + eventname);
        var left = [];
        _.every(asyncstuff) ? cev.emit('process.done', booking2) : console.log('stuff done...');
        //for (var prop in asyncstuff) { asyncstuff[prop] == false ? console.log(prop + ' -> not ready') : null; }
    }

    var booking = conf.booking;
    var core = conf.core;
    var bookingmodel = 'b2c';

    var bookingtype = booking.queryCode != null ? 'taylormade' : 'booking';
    var channel = booking.affiliate != null ? 'b2b' : bookingmodel;;
    var groupstring = booking.isGroup ? 'groups' : '';
    //to get data...
    var status = 'commited';
    var jsonproduct = booking.product;
    var product = jsonproduct != null && jsonproduct != '' ? JSON.parse(jsonproduct) : null;
    var quotecode = booking.quoteCode;
    var querycode = booking.queryCode;
    var finaldate = booking.finalDatePaymentAffiliate;
    var finaldateprov = finaldate;
    finaldateprov != null ? finaldateprov.setDate(finaldateprov.getDate() - 7) : null;
    var comission = booking.affiliate != null ? booking.b2bcommission : booking.comission;
    var fee = booking.fees != null ? booking.fees.unique : 0;
    fee = bookingtype == 'taylormade' && booking.fees != null ? booking.fees.tailormade || 0 : fee;
    var paycondition = booking.dmc.membership.paymentoption != null ? booking.dmc.membership.paymentoption.slug || 'default' : 'default';

    var finalcharge = new Date(booking.start.year, booking.start.month, booking.start.day);
    var finalpaymen = new Date(booking.start.year, booking.start.month, booking.start.day);

    finalcharge.setDate(finalcharge.getDate() - paymentoption[paycondition]);
    finalpaymen.setDate(finalpaymen.getDate() - paymentoptionprovider[paycondition]);

    //var finalpayment = finaldate != null ? {
    //    year: finaldate.getFullYear(), month: finaldate.getMonth(),
    //    monthname_es: common.utils.getMonthNameEnglish(finaldate.getMonth()),
    //    monthname_en: common.utils.getMonthNameSpanish(finaldate.getMonth()),
    //    day: finaldate.getDate()
    //} : null;
    //var finalpaymentprov = finaldateprov != null ? {
    //    year: finaldateprov.getFullYear(), month: finaldateprov.getMonth(),
    //    monthname_es: common.utils.getMonthNameEnglish(finaldateprov.getMonth()),
    //    monthname_en: common.utils.getMonthNameSpanish(finaldateprov.getMonth()),
    //    day: finaldateprov.getDate()
    //} : null;

    var paymentmodel = (channel == 'b2c') ? 'tpv-100' : 'transfer-100';
    bookingmodel = [bookingtype, channel, groupstring].join('');
    bookingmodel = booking.budget == true ? 'budget' : bookingmodel;

    var booking2 = core.list('Bookings2').model({
        idBooking: booking.idBooking,
        code: booking.idBooking,
        idBookingExt: booking.idBookingExt,
        exchanges: null,
        slug: booking.slug,
        timezone: booking.timeZone,
        bookingmodel: bookingmodel,
        createdOn: booking.createdOn,
        updatedOn: booking.updatedOn,
        dates: {
            start: {
                day: booking.start.day,
                month: booking.start.month,
                year: booking.start.year,
                monthname_en: booking.start.monthname_en,
                monthname_es: booking.start.monthname_es,
                date: new Date(booking.start.year, booking.start.month, booking.start.day, 0,0,0),
            },
            end: {
                day: booking.end.day,
                month: booking.end.month,
                year: booking.end.year,
                monthname_en: booking.end.monthname_en,
                monthname_es: booking.end.monthname_es,
                date: new Date(booking.end.year, booking.end.month, booking.end.day, 0,0,0)
            },
            finalpayment: {
                year: finalpaymen.getFullYear(), month: finalpaymen.getMonth(),
                monthname_es: common.utils.getMonthNameEnglish(finalpaymen.getMonth()),
                monthname_en: common.utils.getMonthNameSpanish(finalpaymen.getMonth()),
                day: finalpaymen.getDate(),
                date: finalpaymen
            },
            finalcharge: {
                year: finalcharge.getFullYear(), month: finalcharge.getMonth(),
                monthname_es: common.utils.getMonthNameEnglish(finalcharge.getMonth()),
                monthname_en: common.utils.getMonthNameSpanish(finalcharge.getMonth()),
                day: finalcharge.getDate(),
                date: finalcharge
            },
            lastvisituser: booking.lastVisitUser,
            lastvisitdmc: booking.lastVisitDMC,
            lastvisitaffiliate: booking.lastVisitOMT,
            paymentoption: paycondition
        },
        pricing: {
            margin: booking.omtmargin, comission: comission, fee: fee, iva: booking.iva, edited: {
                editedby: 'booking.transfer.process@yourttoo.com',
                date: new Date(),
                isedited: true
            } },
        traveler: booking.traveler,
        dmc: booking.dmc,
        affiliate: booking.affiliate,
        flighs: booking.flights,
        meetingdata: booking.meetingdata,
        observations: {
            label_es: booking.observations != null ? booking.observations.label_es : '',
            label_en: booking.observations != null ? booking.observations.label_en : '',
            observations: booking.affiliateobservations,
            agencyuser: booking.affiliateuser,
            signing: 'travelersense'
        },
        cancelpolicy: {
            _en: booking.cancelpolicy != null ? booking.cancelpolicy._en || '' : '',
            _es: booking.cancelpolicy != null ? booking.cancelpolicy._es || '' : '',
        },
        status: status,
        relatedbooking: booking
    });

    cev.on('voucherfile', function () {
        booking.voucherFile != null && booking.voucherFile != '' ?
            setImmediate(function () {
                var urlfile = 'http://yourttoo.com' + booking.voucherFile;
                
                console.log('download the voucher for booking: ' + urlfile);

                var urlparts = urlMgmt.parse(urlfile, true);
                var filename = common.utils.replaceAll(urlparts.query.file, '/', '');
                filename = common.utils.replaceAll(filename, '\\', '');
                filename = common.utils.replaceAll(filename, '//', '');

                var downcev = conf.downloadfile(urlfile, filename);
                downcev.on(filename + '.downloaded', function (filepath) {
                    console.log('downloaded ' + urlfile);
                    var upcev = conf.uploadfile(filepath);
                    upcev.on(filepath + '.uploaded', function (cloudfile) {
                        console.log('uploaded ' + urlfile);
                        booking.voucher = cloudfile;
                        booking.voucher.public_id = cloudfile.public_id;
                        booking.voucher.version = cloudfile.version;
                        booking.voucher.format = cloudfile.format;
                        booking.voucher.resource_type = cloudfile.resource_type;
                        booking.voucher.secure_url = cloudfile.secure_url;
                        booking.voucher.url = cloudfile.url;
                        asyncstuff.voucher = true;
                        checkfinished('voucherfile.ok');
                    });

                    upcev.on(filepath + '.error', function (err) {
                        console.error('Error uploading to cloudinary : ' + err);
                    });

                });
                downcev.on(filename + '.error', function (err) {
                    console.error(err);
                    asyncstuff.voucher = true;
                    checkfinished('voucherfile.ok');
                    err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                });
            }) :
            setImmediate(function () {
                asyncstuff.voucher = true;
                checkfinished('voucherfile.ko');
            });
    });

    cev.on('findinvoicesprovider', function () {
        booking.invoiceProvider != null && booking.invoiceProvider != '' ?
            setImmediate(function () {
                var urlfile = 'http://yourttoo.com' + booking.invoiceProviderFile;
                
                console.log('download the invoice for provider: ' + urlfile);

                var urlparts = urlMgmt.parse(urlfile, true);
                var filename = common.utils.replaceAll(urlparts.query.file, '/', '');
                filename = common.utils.replaceAll(filename, '\\', '');
                filename = common.utils.replaceAll(filename, '//', '');

                var downcev = conf.downloadfile(urlfile, filename);

                downcev.on(filename + '.downloaded', function (filepath) {
                    console.log('downloaded ' + urlfile);
                    var upcev = conf.uploadfile(filepath);
                    upcev.on(filepath + '.uploaded', function (cloudfile) {
                        console.log('uploaded ' + urlfile);
                        var invoiceprov = core.list('Invoices').model({
                            name: booking.invoiceProvider,
                            code: 'PROVIDER-INVOICE-' + booking.dmc.code + '#' + booking.idBooking,
                            date: booking.invoiceProviderDate,
                            createdOn: booking.invoiceProviderDate || new Date(),
                            invoicenumber: booking.invoiceProvider,
                            target: 'provider',
                            file: cloudfile,
                            city: '',
                            cp: '',
                            idnumber: booking.invoiceProvider,
                            taxinvoice: '',
                            address: '',
                            country: {
                                name_es: '',
                                name: '',
                                countrycode: ''
                            },
                            booking: booking
                        });
                        invoiceprov.save(function (err, doc) {
                            err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                            doc != null ? booking2.invoicesprovider.push(invoiceprov) : null;
                            asyncstuff.invoicesprovider = true;
                            checkfinished('findinvoicesprovider.ok');
                        });
                    });

                    upcev.on(filepath + '.error', function (err) {
                        console.error('Error uploading to cloudinary : ' + err);
                        console.error(err);
                    });
                });

                downcev.on(filename + '.error', function (err) {
                    console.error(err);
                    asyncstuff.invoicesprovider = true;
                    checkfinished('findinvoicesprovider.ok');
                    err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                });

                
            }) :
            setImmediate(function () {
                asyncstuff.invoicesprovider = true;
                checkfinished('findinvoicesprovider.ko');
            });
    });

    cev.on('findinvoicesaffiliate', function () {
        booking.invoiceAffiliate != null && booking.invoiceAffiliate != '' ?
            setImmediate(function () {

                var urlfile = 'http://yourttoo.com' + booking.invoiceAffiliateFile;
                
                console.log('download the invoice for agency: ' + urlfile);

                var urlparts = urlMgmt.parse(urlfile, true);
                var filename = common.utils.replaceAll(urlparts.query.file, '/', '');
                filename = common.utils.replaceAll(filename, '\\', '');
                filename = common.utils.replaceAll(filename, '//', '');
                var downcev = conf.downloadfile(urlfile, filename);

                downcev.on(filename + '.downloaded', function (filepath) {
                    console.log('downloaded ' + urlfile);
                    var upcev = conf.uploadfile(filepath);
                    upcev.on(filepath + '.uploaded', function (cloudfile) {
                        console.log('uploaded ' + urlfile);
                        var invoiceaff = core.list('Invoices').model({
                            name: booking.invoiceAffiliate,
                            code: 'AGENCY-INVOICE-' + booking.affiliate.code + '#' + booking.idBooking,
                            date: booking.invoiceAffiliateDate,
                            invoicenumber: booking.invoiceAffiliate,
                            createdOn: booking.invoiceAffiliateDate || new Date(),
                            file: cloudfile,
                            target: 'agency',
                            city: '',
                            cp: '',
                            idnumber: booking.invoiceAffiliate,
                            taxinvoice: '',
                            address: '',
                            country: {
                                name_es: '',
                                name: '',
                                countrycode: ''
                            },
                            booking: booking
                        });
                        invoiceaff.save(function (err, doc) {
                            err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                            doc != null ? booking2.invoicestravelersense.push(invoiceaff) : null;
                            asyncstuff.invoicesagency = true;
                            checkfinished('findinvoicesaffiliate.ok');
                        });
                    });
                    upcev.on(filepath + '.error', function (err) {
                        console.error('Error uploading to cloudinary : ' + err);
                    });
                });

                downcev.on(filename + '.error', function (err) {
                    console.error(err);
                    asyncstuff.invoicesagency = true;
                    checkfinished('findinvoicesaffiliate.ko');
                    err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                });

            }) :
            setImmediate(function () {
                asyncstuff.invoicesagency = true;
                checkfinished('findinvoicesaffiliate.ko');
            });
    });

    cev.on('checkpayments.charges', function () {
        var totalpercent = 0;

        var amount = (booking.amount != null && booking.amount != null && booking.amount.value > 0) ? booking.amount.value : 0;
        amount = (booking.amount != null && booking.amount.exchange != null && booking.amount.exchange.value > 0) ? booking.amount.exchange.value : amount;

        amount = (booking.affiliate != null && booking.affiliate.code != null && booking.pvpAffiliate != null && booking.pvpAffiliate.exchange != null) ?
            booking.pvpAffiliate.exchange.value : amount;
        
        booking.payStatus != null && booking.payStatus.length > 0 ?
            setImmediate(function () {
                var paymentspush = [];
                _.each(booking.payStatus, function (payment) {
                    var paymentaumount = payment.amount && payment.amount.value > 0 ? payment.amount.value : 0;
                    paymentaumount = payment.amount != null && payment.amount.exchange != null && payment.amount.exchange.value > 0 ? payment.amount.exchange.value : paymentaumount;

                    var p_totalpercent = Math.round((paymentaumount * 100) / amount);
                    totalpercent += p_totalpercent;
                    if (payment.receiptNumber != null && payment.receiptNumber != '') {
                        paymentspush.push(function (callback) {
                            var item = core.list('Payments').model({
                                code: payment.code,
                                payment: p_totalpercent,
                                action: 'charge',
                                paymentmethod: payment.paymentMethod || 'tpv',
                                paymenttarget: 'travelersense',
                                receiptnumber: payment.receiptNumber,
                                transferid: payment.receiptNumber,
                                date: payment.date,
                                createdOn: payment.date || new Date(),
                                validatedate: payment.validateDate,
                                nextpaymentdate: payment.nextPaymentDate,
                                amount: paymentaumount,
                                currency: {
                                    label: payment.amount && payment.amount.exchange != null ? payment.amount.exchange.currency.label : payment.amount.currency.label,
                                    symbol: payment.amount && payment.amount.exchange != null ? payment.amount.exchange.currency.symbol : payment.amount.currency.symbol,
                                    value: payment.amount && payment.amount.exchange != null ? payment.amount.exchange.currency.value : payment.amount.currency.value
                                },
                                booking: booking2
                            });
                            totalpercent += item.payment;
                            paymentmodel = item.paymentmethod || paymentmodel;

                            item.save(function (err, doc) {
                                err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                                err != null ? console.error(err) : null;
                                callback(null, doc);
                            });

                        });
                    }
                });
                async.parallel(paymentspush, function (err, results) {
                    err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                    var charges = _.filter(results, function (ch) { return ch != null; });
                    _.each(charges, function (charge) { booking2.payments.push(charge); });
                    booking2.chargestatus = totalpercent >= 100 ? 'ok.charges' : 'pending.charges';
                    booking2.paystatusagency = totalpercent >= 100 ? 'ok.payment' : 'pending.payment';
                    asyncstuff.charges = true;
                    checkfinished('checkpayments.charges.ok');
                });
            }) :
            setImmediate(function () {
                asyncstuff.charges = true;
                booking2.chargestatus = 'pending.charges';
                checkfinished('checkpayments.charges.ko');
            });
    });

    cev.on('checkpayments.payments', function () {
        var totalpercent = 0;

        var amount = (booking.netPrice != null && booking.netPrice.value > 0) ? booking.netPrice.value : 0;
        amount = (amount == 0 && booking.netPrice != null && booking.netPrice.exchange != null && booking.netPrice.exchange.value > 0) ? booking.netPrice.exchange.value : amount;
        
        booking.payProvider != null && booking.payProvider.length > 0 ?
            setImmediate(function () {
                var paymentspush = [];
                _.each(booking.payProvider, function (payment) {
                    var paymentaumount = payment.amount && payment.amount.value > 0 ? payment.amount.value : 0;
                    paymentaumount = paymentaumount == 0 && payment.amount != null && payment.amount.exchange != null && payment.amount.exchange.value > 0 ? payment.amount.exchange.value : paymentaumount;

                    var p_totalpercent = Math.round((paymentaumount * 100) / amount);
                    totalpercent += p_totalpercent;
                    if (payment.transferId != null && payment.transferId != '') {
                        paymentspush.push(function (callback) {
                            var item = core.list('Payments').model({
                                code: payment.code,
                                action: 'pay',
                                payment: p_totalpercent,
                                paymentmethod: payment.paymentMethod || 'transfer',
                                paymenttarget: 'provider',
                                receiptnumber: payment.transferId,
                                transferid: payment.transferId,
                                date: payment.date,
                                createdOn: payment.date || new Date(),
                                validatedate: payment.validateDate,
                                payabledate: payment.payableDate,
                                nextpaymentdate: payment.nextPaymentDate,
                                amount: paymentaumount,
                                currency: {
                                    label: payment.amount && payment.amount.value > 0 ? payment.amount.currency.label : payment.amount.exchange.currency.label,
                                    symbol: payment.amount && payment.amount.value > 0 ? payment.amount.currency.symbol : payment.amount.exchange.currency.symbol,
                                    value: payment.amount && payment.amount.value > 0 ? payment.amount.currency.value : payment.amount.exchange.currency.value
                                },
                                booking: booking2
                            });
                            totalpercent += item.payment;
                            item.save(function (err, doc) {
                                err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                                err != null ? console.error(err) : null;
                                callback(null, doc);
                            });

                        });
                    }
                });
                async.parallel(paymentspush, function (err, results) {
                    err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                    var pays = _.filter(results, function (py) { return py != null; });
                    _.each(pays, function (pay) { booking2.payments.push(pay); });
                    booking2.paystatusprovider = totalpercent >= 100 ? 'ok.payment' : 'pending.payment';
                    asyncstuff.payments = true;
                    checkfinished('checkpayments.payments.ok');
                });
            }) :
            setImmediate(function () {
                asyncstuff.payments = true;
                booking2.paystatusprovider = 'pending.payment';
                checkfinished('checkpayments.payments.ko');
            });
    });

    cev.on('checkstories.comments', function () {
        booking.comments != null && booking.comments.length > 0 ?
            setImmediate(function () {
                var commentspusher = [];
                _.each(booking.comments, function (comment) {
                    commentspusher.push(function (callback) {
                        var item = core.list('Stories').model({
                            code: common.utils.getToken(),
                            modelrelated: 'Bookings2',
                            storytype: 'comment',
                            parentid: booking2._id,
                            date: new Date(),
                            user: comment.user,
                            story: {
                                text: comment.text
                            }
                        });

                        item.save(function (err, doc) {
                            err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                            callback(null, doc);
                        });
                    });
                });
                async.parallel(commentspusher, function (err, results) {
                    err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                    var comms = _.filter(results, function (cm) { return cm != null; });
                    _.each(comms, function (com) { booking2.stories.push(com); });
                    asyncstuff.comments = true;
                    checkfinished('checkstories.comments.ok');
                });
            }) :
            setImmediate(function () {
                asyncstuff.comments = true;
                checkfinished('checkstories.comments.ko');
            });
    });

    cev.on('checkstories.stories', function () {
        booking.historic != null && booking.historic.length > 0 ?
            setImmediate(function () {
                var storiespusher = [];
                _.each(booking.historic, function (history) {
                    storiespusher.push(function (callback) {
                        var item = core.list('Stories').model({
                            code: common.utils.getToken(),
                            modelrelated: 'Bookings2',
                            storytype: 'historic',
                            parentid: booking2._id,
                            date: new Date(),
                            user: history.user,
                            story: {
                                mailSend: history.mailSend
                            }
                        });

                        item.save(function (err, doc) {
                            err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                            callback(null, doc);
                        });
                    });
                });
                async.parallel(storiespusher, function (err, results) {
                    err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                    var hists = _.filter(results, function (hs) { return hs != null; });
                    _.each(hists, function (hi) { booking2.stories.push(hi); });
                    asyncstuff.stories = true;
                    checkfinished('checkstories.stories.ok');
                });
            }) :
            setImmediate(function () {
                asyncstuff.stories = true;
                checkfinished('checkstories.stories.ko');
            });
    })

    cev.on('getrooms', function () {
        var rooms = getrooms(booking.roomDistribution, booking);
        rooms != null && rooms.length > 0 ?
            setImmediate(function () {
                pushrooms(rooms);
                var signin = booking2.paxes != null && booking2.paxes.length > 0 ? booking2.paxes[0] : null;
                cev.emit('signin.save', signin);
                asyncstuff.rooms = true;
                checkfinished('getrooms.ok');
            }) :
            setImmediate(function () {
                var signin = booking2.paxes != null && booking2.paxes.length > 0 ? booking2.paxes[0] : null;
                cev.emit('signin.save', signin);
                asyncstuff.rooms = true;
                checkfinished('getrooms.ko');
            });
    });

    cev.on('get.query', function () {
        booking.queryCode != null && booking.queryCode != '' ?
            setImmediate(function () {
                var query = { code: booking.queryCode };
                core.list('UserQueries').model.find(query)
                    .exec(function (err, docs) {
                        err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                        docs != null ? booking2.query = docs[0] : null;
                        asyncstuff.query = true;
                        checkfinished('get.query.ok');
                    });
            }) :
            setImmediate(function () {
                asyncstuff.query = true;
                checkfinished('get.query.ko');
            });
        
    });

    cev.on('get.quote', function () {
        booking.quoteCode != null && booking.quoteCode != '' ?
            setImmediate(function () {
                var query = { code: booking.quoteCode };
                core.list('Quotes').model.find(query)
                    .exec(function (err, docs) {
                        err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                        docs != null ? booking2.quote = docs[0] : null;
                        asyncstuff.quote = true;
                        checkfinished('get.quote.ok');
                    })
            }) :
            setImmediate(function () {
                asyncstuff.quote = true;
                checkfinished('get.quote.ko');
            });
    });

    cev.on('product.save', function () {
        product != null ?
            setImmediate(function () {
                //delete product['createdOn'];
                //delete product['updatedOn'];
                delete product['_id'];
                var bookproduct = core.list('BookedProducts').model(product);
                bookproduct.save(function (err, doc) {
                    err != null ? cev.emit('transfer.booking.error', { code: booking.idBooking, error: err }) : null;
                    doc != null ? setImmediate(function () {
                        booking2.products.push(doc);
                        asyncstuff.product = true;
                        checkfinished('product.save.ok');
                    })
                        :
                        setImmediate(function () {
                            asyncstuff.product = true;
                            checkfinished('product.save.ko');
                        });
                });
            }) :
            setImmediate(function () {
                asyncstuff.product = true;
                checkfinished('product.save.ko');
            });
    });

    cev.on('signin.save', function (signin) {
        signin = signin == null ? booking.traveler : signin;
        signin != null ?
            setImmediate(function () {
                var lastname = signin.lastName || signin.lastname;
                var name = signin.user != null ? signin.firstname : (signin.name + '-' + lastname);
                var req = {
                    email: signin.email || 'zzzz@zzzz',
                    username: name || signin.username,
                    name: name,
                    lastname: signin.lastName || signin.lastname,
                    password: signin.phone || 'xx-xx-xxxxxxxx',
                    phone: signin.phone || 'xx-xx-xxxxxxxx',
                    kind: booktypehash[bookingmodel]
                };
                
                var newsignup = core.list('SigninRegister').model(req);
                require('../../../factory/codesgenerator')(core, 'signup', function (code) {
                    newsignup.code = ['TS', 'SGN', code].join('-');
                    console.log('SIGNUP : ' + newsignup.code);
                    newsignup.email = newsignup.email == 'zzzz@zzzz' ? [newsignup.email, newsignup.code].join('.') : newsignup.email;
                    newsignup.save(function (err, doc) {
                        err != null ? cev.emit('transfer.booking.error', { code: booking2.idBooking, error: err }) : null;
                        doc != null ? booking2.signin = doc : null;
                        asyncstuff.signin = true;
                        checkfinished('signin.save.ok');
                    });
                });
            }) :
            setImmediate(function () {
                asyncstuff.signin = true;
                checkfinished('signin.save.ko');
            });
    });

    cev.on('pricing', function () {
        booking2.pricing.amount = (booking.amount != null && booking.amount.exchange != null && booking.amount.exchange.value != null) ? booking.amount.exchange.value : booking.amount.value;
        booking2.pricing.amount =
            (booking.affiliate != null && booking.affiliate.code != null && booking.pvpAffiliate != null && booking.pvpAffiliate.exchange != null && booking.pvpAffiliate.exchange.value != null) ?
                booking.pvpAffiliate.exchange.value : booking2.pricing.amount;
        booking2.pricing.iva = booking.iva;

        var currencybook = (booking.amount != null && booking.amount.exchange != null && booking.amount.exchange.value != null) ? booking.amount.exchange.currency : booking.amount.currency;
        currencybook = (booking.affiliate != null && booking.affiliate.code != null && booking.pvpAffiliate != null && booking.pvpAffiliate.exchange != null && booking.pvpAffiliate.exchange.value != null) ?
            booking.pvpAffiliate.exchange.currency : currencybook;

        booking2.pricing.currency.label = currencybook.label;
        booking2.pricing.currency.symbol = currencybook.symbol;
        booking2.pricing.currency.value = currencybook.value;

        booking2.pricing.fee = booking.fees != null ? booking.fees.unique || 0 : 0;
        booking2.pricing.margin = booking.omtmargin || 3;
        booking2.pricing.minpaxoperate = (product != null && product.included != null) ? product.included.trip.minpaxoperate || 1 : 1;

        var roompricing = pricerooms(booking.roomDistribution, booking);
        
        booking2.pricing.roomssnapshot.double = roompricing.roomssnapshot.double;
        booking2.pricing.roomssnapshot.single = roompricing.roomssnapshot.single;
        booking2.pricing.roomssnapshot.triple = roompricing.roomssnapshot.triple;
        booking2.pricing.roomssnapshot.quad = roompricing.roomssnapshot.quad;
        booking2.pricing.roomssnapshot.currency = roompricing.roomssnapshot.currency;

        booking2.pricing.rooms.double = roompricing.roomspricing.double;
        booking2.pricing.rooms.single = roompricing.roomspricing.single;
        booking2.pricing.rooms.triple = roompricing.roomspricing.triple;
        booking2.pricing.rooms.quad = roompricing.roomspricing.quad;
        booking2.pricing.rooms.currency = roompricing.roomspricing.currency;

        asyncstuff.pricing = true;
        checkfinished('pricing.ok');
    });

    _.each(launcherevents, function (eventname) {
        console.log('launching ' + eventname + ' for booking ' + booking.idBooking);
        cev.emit(eventname);
    });

    return cev;
}