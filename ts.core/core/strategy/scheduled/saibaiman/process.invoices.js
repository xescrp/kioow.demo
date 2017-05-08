module.exports = function (conf, callback) {
    var bookingids = conf.bookingids;
    var core = conf.core;
    console.log(core);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var statics = { total: 0, done: 0, witherrors: 0, success: 0 };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var witherrors = [];

    var async = require('async');
    var fetchtasks = []; 
    var u_bookinghash = {};
    var bookingcodes = conf.bookingcodes || [];
    var bookingids = conf.bookingids || [];
    var c_bookinghash = {};
    var pushtasks = [];

   
    cev.on('fetch.bookings', function() {
        var query = { idBooking: { $in: bookingcodes } };
        console.log('fetch bookings ', bookingcodes);
        core.list('Bookings2').model.find(query)
            .populate('products')
            .populate('stories')
            .populate('payments')
            .populate('invoices')
            .populate('affiliate')
            .populate('dmc')
            .populate('traveler')
            .populate('query')
            .populate('quote')
            .populate('signin')
            .populate('flights')
            .exec(function (err, docs) {
                err != null ? callback(err, conf) : setImmediate(function () {
                    docs != null && docs.length > 0 ?
                        setImmediate(function () {
                            //process all bookings... 
                            statics.total = docs.length;
                            _.each(docs, function (book) {
                                //push the task on the series processor...
                                fetchtasks.push(function (fetchcallback) {
                                    var downloadurl = conf.invoicedownloadurl;
                                    var invoicenumber = 0;
                                    var prefix = 'YT';
                                    var year = new Date().getFullYear().toString();

                                    core.plugins.bin.get('invoicesequence', function (err, seq) {
                                        err != null ? fetchcallback(err, conf) : invoicenumber = [prefix, year, common.utils.pad(seq[year], 4)].join('');

                                        //lets prepare request
                                        var htt = require('yourttoo.connector').httpconnector.HTTPConnector;
                                        var rqcn = new htt();
                                        var req = {
                                            url: downloadurl,
                                            request: {
                                                booking: book,
                                                dmcproduct: book.products != null && book.products.length > 0 ? book.products[0] : null,
                                                invoicenumber: invoicenumber,
                                                invoicedate: new Date(),
                                                invoiceamount: book.breakdown.agency.net
                                            },
                                            method: 'post'
                                        };
                                        //get the HTML from the invoice
                                        var cn = rqcn.send(req);

                                        cn.on('request.done', function (content) {
                                            //lets download pdf
                                            var pdfurl = conf.invoicepdfdownlurl;

                                            var reqpdf = {
                                                url: pdfurl,
                                                request: {
                                                    html: content,
                                                    type: 'invoiceaffiliate',
                                                    namefile: 'TS-' + book.idBooking + '-' + invoicenumber + '.pdf'
                                                },
                                                method: 'post'
                                            };

                                            var cnpdf = rqcn.send(reqpdf);

                                            cnpdf.on('request.done', function (clfile) {
                                                console.log('cloudinary file got');
                                                var invoice = {
                                                    name: 'TS-' + book.idBooking + '-' + invoicenumber + '.pdf',
                                                    date: new Date(),
                                                    invoicenumber: invoicenumber,
                                                    target: 'agency', //provider, agency, traveler, travelersense 
                                                    source: 'travelersense', //provider, agency, traveler, travelersense
                                                    file: clfile,
                                                    amount: book.breakdown.agency.net,
                                                    taxinvoice: 0,
                                                    booking: { _id: book._id, idBooking: book.idBooking }
                                                };

                                                var inv = core.list('Invoices').model(invoice);

                                                inv.save(function (err, doc) {
                                                    book.invoicestravelersense.push(inv);
                                                    book.invoices.push(inv);
                                                    
                                                    book.save(function (err, savedbook) {
                                                        seq[year]++;
                                                        core.plugins.bin.set('invoicesequence', seq, function (err, seqres) {
                                                            statics.done++;
                                                            statics.success++;
                                                            fetchcallback(err, savedbook);
                                                        });
                                                    });

                                                });

                                            });

                                            cnpdf.on('request.error', function (err) {
                                                statics.done++;
                                                fetchcallback(err, null);
                                                witherrors.push({ id: book.idBooking, err: err });
                                            });

                                        });

                                        cn.on('request.error', function (err) {
                                            statics.done++;
                                            fetchcallback(err, null);
                                            witherrors.push({ id: book.idBooking, err: err });
                                        });
                                    });
                                });

                            });
                            //process the booking serie...
                            async.series(fetchtasks, function (err, results) {
                                err != null ? callback(err, conf) : setImmediate(function () {
                                    statics.witherrors = witherrors.length;
                                    var result = {
                                        ResultOK: true,
                                        Messages: ['Bookings processed...'],
                                        Errors: witherrors,
                                        counters: statics
                                    };
                                    callback(null, result);
                                });
                            });
                        }) :
                        setImmediate(function () {
                            //nothing to do...
                            callback(null, { ResultOK:  true, Message: 'No bookings to process'})
                        });
                });
            });
    });

    cev.emit('fetch.bookings');
    
}