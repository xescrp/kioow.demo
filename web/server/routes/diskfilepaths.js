'use strict';
var common = require('yourttoo.common');
var nconf = require('nconf');
//get current dir and file
var localfilepath = module.filename.toLowerCase();
localfilepath = common.utils.replaceAll(localfilepath, '\\', '/'); //normalize path -> backslashes
localfilepath = common.utils.replaceAll(localfilepath, 'routes/diskfilepaths.js', ''); //pointer to the web root path

var envpath = process.env.TS_ADMINPATH || localfilepath;
var rootpath = envpath.toLowerCase();
var configname = 'settings.json';

var configfilepath = [rootpath, configname].join('');
//var configfilepath = './settings.json';
nconf.env().file({ file: configfilepath });
//Put all file paths here....

var base = nconf.get('publicdirectory');
var _filepaths = {
    appversion: '3.1.1',
    publicdirectory: base,
    client: {
        dmcprofile: base + '/client-dmc-profile.html.swig',
        clientevouchertoprint: base + '/client-voucher-to-print.html.swig',
        countryselect: base + '/partials/yto/widgets/yto-modal-countryselect.html.swig'
    },
    affiliate: {
        account: base + '/yto-account.html.swig',
        accountinvalid: base + '/yto-account-invalid.html.swig',
        booking: base + '/yto-booking.html.swig',
        bookings: base + '/yto-list-bookings.html.swig',
        budgets: base + '/yto-list-budgets.html.swig',
        dmcprofile: base + '/yto-dmc-profile.html.swig',
        externallogin: base + '/yto-externallogin.html.swig',
        // forgotpassword:         base + '/client-forgot-change-es.html.swig',
        // forgotpasswordrequest:  base + '/client-forgot-request-es.html.swig',
        home: base + '/yto-home.html.swig',
        homeaffiliate: base + '/yto-affiliate-home.html.swig',
        product: base + '/yto-product.html.swig',
        producttoprint: base + '/yto-product-toprint.html.swig',
        producttoprinttailor: base + '/yto-product-toprint-tailormade.html.swig',
        producttoprintonepage: base + '/yto-product-toprint-one-page.html.swig',
        requestform: base + '/yto-request-form.html.swig',
        requests: base + '/yto-list-requests.html.swig',
        request: base + '/yto-request.html.swig',
        requestquote: base + '/yto-request-quote.html.swig',
        results: base + '/yto-results.html.swig',
        resultslanding: base + '/yto-tours-landing.html.swig',
        signup: base + '/yto-sign-up.html.swig',
        signupthanks: base + '/yto-register-thanks.html.swig',
        payflow: base + '/yto-shopping-payflow.html.swig',
        thankyoutransfer: base + '/yto-shopping-payflow-confirmation-transfer.html.swig',
        paymenterror: base + '/yto-shopping-payflow-error.html.swig',
        billing: base + '/yto-billing.html.swig',
        // bookingpos:             base + '/client-shopping-payflow-pos.html.swig',
        ytobonook: base + '/yto-download-voucher.html.swig',
        ytovouchertoprint: base + '/yto-voucher-to-print.html.swig',
        ytoinvoicetoprint: base + '/yto-booking-invoice-to-print.html.swig',
        ytotsinvoicetoprint: base + '/yto-booking-ts-invoice-to-print.html.swig',
        ytoprinvoicetoprint: base + '/yto-booking-pr-invoice-to-print.html.swig',
        ytowlinvoicetoprint: base + '/yto-booking-invoice-wl-to-print.html.swig',
        ytobudgettoprint: base + '/yto-booking-budget-to-print.html.swig',
        ytocontracttoprint: base + '/yto-booking-contract-to-print.html.swig',
        ytobookingsummarytoprint: base + '/yto-booking-summary-to-print.html.swig',
        ytotailormadetoprint: base + '/yto-product-toprint-tailormade.html.swig',
        speciallanding: base + '/yto-special-landing.html.swig',
        pdfHeader: base + '/partials/pdf/header.html.swig',
        pdfFooter: base + '/partials/pdf/footer.html.swig',
        pdfHeaderContract: base + '/partials/pdf/header-contract.html.swig',
        pdfFooterContract: base + '/partials/pdf/footer-contract.html.swig'
        
    },
    faqs: {
        faqs: base + '/yto-faqs.html.swig',
        faq: base + '/yto-faq.html.swig',
        faqcat: base + '/yto-faqcat.html.swig',
    },
    provider: {
        supplierssignup: base + '/dmc-sign-up.html.swig',
        suppliersthanks: base + '/dmc-sign-up-thanks.html.swig',
    },
    "static": {
        pagcat: base + '/yto-pagecat.html.swig',
        statictext: base + '/yto-statictext.html.swig',
        staticcontent: base + '/partials/cms/yto-static-common.html.swig',
        error404: base + '/yto-404.html.swig',//
        error500: base + '/yto-500.html.swig',//
        "private": base + '/yto-private.html.swig',//
        contacta: base + '/yto-contacta.html.swig',//
        forgotsend: base + '/yto-forgot-1-send.es.html.swig',
        forgotsent: base + '/yto-forgot-2-sent.es.html.swig',
        forgotchange: base + '/yto-forgot-3-change.es.html.swig',
        forgotok: base + '/yto-forgot-4-ok.es.html.swig',
        //emailconfirmed:     base + '/client-email-confirmado.html.swig',
        badrequest: base + '/yto-bad-request.html.swig',
        maintenance: base + '/yto-index-maintain.html',
        previewmap: base + '/partials/widgets/product-map-iframe.html.swig',
        robots: base + nconf.get('brand').robotsfile,
        supplierlanding: base + '/dmc-landing.html.swig',
        supplieradvantages: base + '/dmc-static-advantages.html.swig',
        modalcountryselect: base + '/partials/modals/yto-modal-countryselect.html.swig'
    },
    data: {
        dummy: {
            content: base + '/datadummy/content.json',
            product: base + '/datadummy/product.json',
            inspirate: base + '/datadummy/inspirate.json',
            inspirate2: base + '/datadummy/inspirate2.json',
            theuser: base + '/datadummy/theuser.json'
        }
    },
    product: {
        //paymentTPV:         base + '/client-shopping-payment-tpv.html.swig',            
        //thankyou:           base + '/client-shopping-payflow-confirmation.html.swig',            
        //paymenttpverror:    base + '/client-shopping-payflow-error-tpv.html.swig',
        //retrypaymenttpv:    base + '/client-shopping-payflow-retry.html.swig',
        //messagerqerror:     base + '/client-booking-rq-error.html.swig',
        //messagerqok:        base + '/client-booking-rq-ok.html.swig',
        thankyoupre: base + '/client-shopping-payflow-confirmation-pre.html.swig'
    },
    admin: {
        home: base + '/yto-admin-home.html.swig',
        default: base + '/yto-admin-default.html.swig',
        dmclist: base + '/admin-list-base.html.swig',
        affiliatelist: base + '/admin-list-base.html.swig',
        travelerslist: base + '/admin-list-base.html.swig',
        bookinglist: base + '/admin-list-base.html.swig',
        querylist: base + '/admin-list-base.html.swig',
        quotelist: base + '/admin-list-base.html.swig',
        billinglist: base + '/admin-list-base.html.swig',
        productlist: base + '/admin-list-base.html.swig',
        heventslist: base + '/admin-list-base.html.swig',
        checkdata: base + '/checkdata.html.swig',
        
    },
    admindetails: {
        program: base + '/admin-edit-base.html.swig',
        account: base + '/admin-edit-base.html.swig',
        booking: base + '/admin-edit-base.html.swig',
        request: base + '/admin-edit-base.html.swig',
        destiny: base + '/admin-edit-base.html.swig'
    },
    template: base + '/yto-template.html',
    configurationfile: configfilepath,
    test: base + '/test.html.swig'
};

var filepaths = module.exports.filepaths = _filepaths;

