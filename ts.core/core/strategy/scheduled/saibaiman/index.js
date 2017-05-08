var async = require('async');
module.exports = function (conf) {
    return {
        landingtagcontentsb2c : [
            async.apply(require('./landingtags.b2c.readyproces'), conf),
            require('./getcurrencyexchanges'),
            require('./gettriptags'),
            require('./getdmccodes'),
            require('./getcountries'),
            require('./cache.landingtags'),
            require('./pushmemento'),
            require('./finish.cache.landingtags')
        ],
        landingtagcontentswl : [
            async.apply(require('./landingtags.wl.readyproces'), conf),
            require('./getcurrencyexchanges'),
            require('./gettriptags'),
            require('./getdmccodes'),
            require('./getcountries'),
            require('./cache.landingtags'),
            require('./pushmemento'),
            require('./finish.cache.landingtags')
        ],
        landingzonecontentsb2c : [
            async.apply(require('./landingzones.b2c.readyproces'), conf),
            require('./getcurrencyexchanges'),
            require('./getzones'),
            require('./getdmccodes'),
            require('./getcountries'),
            require('./cache.landingzones'),
            require('./pushmemento'),
            require('./finish.cache.landingtags')
        ],
        landingzonecontentswl : [
            async.apply(require('./landingzones.wl.readyproces'), conf),
            require('./getcurrencyexchanges'),
            require('./getzones'),
            require('./getdmccodes'),
            require('./getcountries'),
            require('./cache.landingzones'),
            require('./pushmemento'),
            require('./finish.cache.landingtags')
        ],
        productupdate: [
            async.apply(require('./product.update.readyprocess'), conf),
            require('./getcurrencyexchanges'),
            require('./getdmcids'),
            require('./getproductcodesbydmc'),
            require('./processproductsbydmc'),
            require('./finish.product.update')
        ],
        bookingtransfer: [
            async.apply(require('./booking.transfer.readyprocess'), conf),
            require('./getbookingsids'),
            require('./getcountries'),
            require('./processoldbookingstransfer'),
            require('./finish.booking.transfer'),
        ],
        bookingtransferelements: [
            async.apply(require('./booking.transferelements.readyprocess'), conf),
            require('./getquotesids'),
            require('./getqueriesids'),
            require('./getchatsids'),
            require('./processbookingelements'),
            require('./finish.transferelements.transfer'),
        ],
        dmcsbatcher: [
            async.apply(require('./dmc.batch.readyprocess'), conf),
            require('./getdmcids'),
            require('./processdmcs'),
            require('./finish.dmc.batch'),
        ],
        csvaffiliateimport: [
            async.apply(require('./csvaffiliate.batch.readyprocess'), conf),
            require('./csvaffiliate.readcsv'),
            require('./csvaffiliate.batchprocess'),
            require('./finish.csvaffiliate.batch'),
        ],
        bookinginvoices: [
            async.apply(require('./booking.invoices.readyprocess'), conf),
            require('./getbookingsids'),
            require('./getcountries'),
            require('./process.invoices'),
            require('./finish.booking.invoices'),
        ],
    }
}