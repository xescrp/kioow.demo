
module.exports = function (app) {
    var cloudconfig = app.uploadconfiguration.cloudinary;
    var uploadconfig = app.uploadconfiguration.upload;
    var whitelabelbasepath = app.uploadconfiguration.whitelabelpath;

    var common = require('yourttoo.common');
    //Upload files management..
    var swig = require('swig');
    var utils = common.utils;
    var iutils = require('../utils');
    var _ = require('underscore');

    app.get('/download/whitelabel/:downfiletype', function (req, res, next) {
        //loginsession.affiliate.wlcustom.code != 'default_wl' ?
        var fs = require('fs');
        var files = { headerfile: 'wl-header.html.swig', footerfile: 'wl-footer.html.swig' };
        var downfiles = { headerfile: 'wl-header.html', footerfile: 'wl-footer.html' };

        var filename = files[req.params.downfiletype];
        var userfile = downfiles[req.params.downfiletype];

        var loginsession = req.defaultcontent.loginsession;
        var filepath = 
                loginsession != null && loginsession.affiliate != null &&
                loginsession.affiliate.wlcustom != null &&
                loginsession.affiliate.wlcustom.code != '' ?
                [whitelabelbasepath, loginsession.affiliate.code, filename].join('/') : [whitelabelbasepath, filename].join('/');
        filepath = fs.existsSync(filepath) ? filepath : [whitelabelbasepath, filename].join('/');
        //res.setHeader('Content-disposition', 'attachment; filename=' + userfile);
        res.download(filepath, userfile);
    });

    app.post('/download/getpdffromhtml', function (req, res) {
    	console.log('request html -> pdf');
        var fs = require('fs');
        var exec = require('child_process').exec;                
        var params = req.body;        
        var filepath = uploadconfig.path + params.type + '/' + params.namefile;
        var pathPDF = filepath + '.pdf';
        var pathHTML = filepath + '.html';
        var htmlcontent = params.html || '<html><head></head><body><h2>Test content</h2><p>this is a test content.. for testing pourposes</p></body></html>';
        var pageSettings = params.pageSettings || '--page-size A4';
        
        console.log("* pathHTML: ",pathHTML);
        console.log("* pathPDF: ",pathPDF);        
        console.log("* type file: ",params.type);

        fs.writeFile(pathHTML, htmlcontent, function (err) {
            if (err) {
                console.log('ERROR saving file in html for file: ' + params.namefile + '. Details: ', err);
                res.send(null);
            } else {
                var commandline = 'wkhtmltopdf ' + pageSettings + ' ' + pathHTML + ' ' + pathPDF;
                console.log(commandline);
                exec(commandline, function (file) {
                    console.log('fichero guardado en pdf');                    
                    console.log('borrar fichero html....');
                    fs.unlinkSync(pathHTML);

                    var cloudinary = require('cloudinary');
                    cloudinary.config(cloudconfig);
                    cloudinary.uploader.upload(pathPDF, function (result) {
                        res.send(result);
                    });
                    //var fileurl = '/resources/file?file=' + params.namefile + '.pdf' + '&type=' + params.type;
                    
                    //console.log('finished process [HTML -> PDF]. urls: ', fileurl);
                    //var rtobject = { url: fileurl };
                    //res.send(rtobject);
                });
            }
        }); 
    });

    app.get('/download/affiliatesreport', function (req, res, next) {
        var csv = '';
        var lines = [];
        var request = {
            collectionname: 'Bookings',
            query: { affiliate: { $ne: null } },
            fields: '_id idBooking affiliate budget createdOn',
            sort: { affiliate: 1 },
            populate: [
                { path: 'affiliate', select: '_id code' }]
        };
        //api call
        var rq = iutils.apicall('find', request, req.session, req.ytoconnector, req);

        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            var bookings = result;
            req.bookings = {};
            req.budgets = {};
            _.each(bookings, function (booking) {
                if (booking.budget) {
                    req.budgets[booking.affiliate.code] == null ?
                        req.budgets[booking.affiliate.code] = 1 : req.budgets[booking.affiliate.code]++;
                }
                else {
                    req.bookings[booking.affiliate.code] == null ?
                        req.bookings[booking.affiliate.code] = 1 : req.bookings[booking.affiliate.code]++;
                }
                
            });
            next();
        });
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });
    app.get('/download/affiliatesreport', function (req, res, next) {
        var csv = '';
        var lines = [];
        var request = {
            collectionname: 'UserQueries',
            query: { affiliate: { $ne: null } },
            fields: '_id code affiliate affiliatecode',
            sort: { affiliate: 1 },
            populate: [
                { path: 'affiliate', select: '_id code' }]
        };
        //api call
        var rq = iutils.apicall('find', request, req.session, req.ytoconnector, req);

        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            var queries = result;
            req.queries = {};
            _.each(queries, function (query) {
                query.affiliatecode != null && req.queries[query.affiliatecode] == null ?
                    req.queries[query.affiliatecode] = 1 : req.queries[query.affiliatecode]++;
            });
            next();
        });
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });
    app.get('/download/affiliatesreport', function (req, res, next) {
        var csv = '';
        var lines = [];
        var request = {
            collectionname: 'Affiliate',
            query: { 'membership.registervalid' : true },
            populate: [
                { path: 'user' }]
        };
        //api call
        var rq = iutils.apicall('find', request, req.session, req.ytoconnector, req);

        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            var affiliates = result;
            _.each(result, function (affiliate) {
                var fieldsvalues = [];
                affiliate.createdOn = new Date(affiliate.createdOn);
                fieldsvalues.push(affiliate.code);
                fieldsvalues.push([affiliate.createdOn.getDate(), affiliate.createdOn.getMonth() + 1, affiliate.createdOn.getFullYear()].join('/'));
                fieldsvalues.push(affiliate.company.name);
                fieldsvalues.push(affiliate.company.group);
                fieldsvalues.push(affiliate.membership.omtmargin);
                fieldsvalues.push(affiliate.company.agencylic);
                fieldsvalues.push(affiliate.contact.firstname);
                fieldsvalues.push(affiliate.contact.lastname);
                fieldsvalues.push(affiliate.contact.email);
                fieldsvalues.push(affiliate.contact.marketingContact.email);
                fieldsvalues.push(affiliate.contact.skype);
                fieldsvalues.push(affiliate.company.phone);
                fieldsvalues.push(affiliate.company.phone);
                fieldsvalues.push(affiliate.company.location.city);
                fieldsvalues.push(affiliate.company.location.stateorprovince);
                fieldsvalues.push(affiliate.company.location.cp);
                fieldsvalues.push(affiliate.company.location.country);
                fieldsvalues.push(affiliate.fees.unique);
                fieldsvalues.push(affiliate.fees.tailormade);
                fieldsvalues.push(affiliate.fees.groups);
                fieldsvalues.push((affiliate.images.logo != null && affiliate.images.logo.url != '' && affiliate.images.logo.url.indexOf('avatar.jpg') < 0) ? 'SI' : 'NO');
                fieldsvalues.push((affiliate.membership.colaborationagree != null && affiliate.membership.colaborationagree == true) ? 'SI' : 'NO');
                fieldsvalues.push(req.bookings[affiliate.code]);//reservas
                fieldsvalues.push(req.queries[affiliate.code]);//a medidas
                fieldsvalues.push(req.budgets[affiliate.code]);//p.multidays
                fieldsvalues.push(affiliate.company.legalname);
                fieldsvalues.push(affiliate.omtcomment != null ? affiliate.omtcomment.replace(/(\r\n|\n|\r)/gm, "") : '');
                lines.push(fieldsvalues.join(';'));
            });
            csv = lines.join('\r\n');
             
            req.csvdownload = csv;
            next();
        });
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });
    app.get('/download/affiliatesreport', function (req, res, next) {
        res.setHeader('Content-disposition', 'attachment; filename=validaffiliate.csv');
        res.send(req.csvdownload);
    });


    function _showCountries(product) {
        var itinerary = product != null ? product.itinerary : null;
        var countries = [];
        if (itinerary) {
            _.each(itinerary, function (day) {
                day.sleepcity != null && day.sleepcity.country != null ? countries.push(day.sleepcity.country) : null;
            });
        }
        return _.uniq(countries);
    };

    app.get('/download/bookingsreport', function (req, res, next) {
        var csv = '';
        var lines = [];
        var request = {
            collectionname: 'Bookings',
            fields: 'idBooking createdOn startdate start end affiliate dmc roomDistribution netPrice amount pvpAffiliate productDmc status',
            query: { $and: [{ idBooking: { $ne: null } }, { $or: [{ budget: false }, { budget: null }] }] },
            sort: { createdOn: 1 },
            populate: [
                { path: 'affiliate', select: '_id code company name' },
                { path: 'dmc', select: '_id code company name' },
                { path: 'productDmc', select: '_id code itinerary'}
            ]
        };
        //api call
        var rq = iutils.apicall('find', request, req.session, req.ytoconnector, req);

        rq.on(request.oncompleteeventkey, function (result) {
            console.log('api rq -> done');
            var bookings = result;
            var titles = ['id booking', 'agencia', 'f. creacion', 'f. salida', 'nº pax', 'destino', 'dmc', 'status', 'Neto DMC', 'PVP'];
  
            lines.push(titles.join(';'));
            console.log('finded ' + bookings.length);
            _.each(bookings, function (booking) {
                var fieldsvalues = [];
                var paxes = 0;
                var product = booking.productDmc;
                //try { product = JSON.parse(booking.product); } catch (err) { console.error(err); }
                fieldsvalues.push(booking.idBooking);
                booking.affiliate != null ? fieldsvalues.push(booking.affiliate.company.name) : fieldsvalues.push('-');
                booking.createdOn = new Date(booking.createdOn);
                booking.startdate = new Date(booking.startdate);
                fieldsvalues.push([booking.createdOn.getDate(), booking.createdOn.getMonth() + 1, booking.createdOn.getFullYear()].join('/'));
                fieldsvalues.push([booking.startdate.getDate(), booking.startdate.getMonth() + 1, booking.startdate.getFullYear()].join('/'));
                _.each(booking.roomDistribution, function (room) { paxes += room.paxList.length; });
                fieldsvalues.push(paxes);
                fieldsvalues.push(_showCountries(product));
                fieldsvalues.push(booking.dmc.company.name);
                fieldsvalues.push(booking.status);
                fieldsvalues.push(booking.netPrice.value + ' ' + booking.netPrice.currency.symbol);
                booking.affiliate != null ? fieldsvalues.push(booking.pvpAffiliate.exchange.value + ' ' + booking.pvpAffiliate.exchange.currency.symbol) : fieldsvalues.push(booking.amount.exchange.value + ' ' + booking.amount.exchange.currency.symbol);
                lines.push(fieldsvalues.join(';')); 
            });
            csv = lines.join('\r\n');

            req.csvdownload = csv;
            res.setHeader('Content-disposition', 'attachment; filename=bookingsreport.csv');
            res.send(req.csvdownload);

        });
        rq.on(request.onerroreventkey, function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.error', function (err) {
            console.error(err);
            return next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            return next(new Error(tout));
        });
    });

    app.get('/resources/file', function (req, res) {
        var type = req.query.type;
        var file = req.query.file;
        var subpath = type + '/' + file;
        var targetfile = uploadconfig.path + subpath;
        res.download(targetfile);
    });
}