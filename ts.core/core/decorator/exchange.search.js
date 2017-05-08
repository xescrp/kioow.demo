var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options) {
    var pricemodels = ['DMCProducts', 'BookedProducts'];

    var currencies = {
        EUR: { value: 'EUR', symbol: '€', label: 'Euro' },
        USD: { value: 'USD', symbol: 'US$', label: 'USD' },
    };

    var months = common.staticdata.months_en;
    var doc = options.program;
    var targetcurrency = options.currentcurrency;
    var sourcecurrency = doc != null && doc.pvp != null ? doc.pvp.currencycode : null;
    sourcecurrency == null ? sourcecurrency = (doc != null && doc.pvp != null && doc.pvp.currency != null) ? doc.pvp.currency.value : null : null;
    sourcecurrency == null ? (doc != null && doc.dmc != null && doc.dmc.currency != null && doc.pvp != null) ? (doc.pvp.currency = doc.dmc.currency, sourcecurrency = doc.pvp.currency.value) : null : null;
    var member = options.auth;

    //check if is a query with quotes..
     

    if (member != null && member.user != null && !member.user.isAdmin && sourcecurrency != null) {
        var core = options.core;
        doc.minprice.value = core.plugins.cux.convert(doc.minprice.value, sourcecurrency, targetcurrency);
        doc.pvp.b2b = core.plugins.cux.convert(doc.pvp.b2b, sourcecurrency, targetcurrency);
        doc.pvp.b2c = core.plugins.cux.convert(doc.pvp.b2c, sourcecurrency, targetcurrency);
        doc.pvp.b2bperday = core.plugins.cux.convert(doc.pvp.b2bperday, sourcecurrency, targetcurrency);
        doc.pvp.b2cperday = core.plugins.cux.convert(doc.pvp.b2cperday, sourcecurrency, targetcurrency);
        doc.pvp.net = core.plugins.cux.convert(doc.pvp.net, sourcecurrency, targetcurrency);
        doc.pvp.currencycode = targetcurrency;
        doc.pvp.currency.label = currencies[targetcurrency].label;
        doc.pvp.currency.value = currencies[targetcurrency].value;
        doc.pvp.currency.symbol = currencies[targetcurrency].symbol;
        
        //minprice field
        doc.minprice.exchange == null ? doc.minprice.exchange = {
            value: doc.pvp.b2b, currency: currencies[targetcurrency]
        } : null;
        doc.minprice.exchange.value = doc.pvp.b2b;
        doc.minprice.exchange.currency.label = currencies[targetcurrency].label;
        doc.minprice.exchange.currency.value = currencies[targetcurrency].value;
        doc.minprice.exchange.currency.symbol = currencies[targetcurrency].symbol;
        doc.minprice.exchange.currencycode = targetcurrency;

        doc.prices != null && doc.prices.length > 0 ? _.each(doc.prices, function (price) {
            price.minprice = core.plugins.cux.convert(price.minprice, sourcecurrency, targetcurrency);
            price.net = core.plugins.cux.convert(price.minprice, sourcecurrency, targetcurrency);
        }) : null;

        doc.availability != null && doc.availability.length > 0 ? _.each(doc.availability, function (availyear) {
            _.each(months, function (month) {
                if (availyear[month] != null &&
                    availyear[month].availability != null &&
                    availyear[month].availability.length > 0) {
                    //each month and day...
                    _.each(availyear[month].availability, function (availday) {

                        availday.rooms.triple.price = availday.rooms.triple.price > 0 ?
                            core.plugins.cux.convert(availday.rooms.triple.price, sourcecurrency, targetcurrency) : 0;
                        availday.rooms.triple.net = availday.rooms.triple.net > 0 ?
                            core.plugins.cux.convert(availday.rooms.triple.net, sourcecurrency, targetcurrency) : 0;

                        availday.rooms.double.price = availday.rooms.double.price > 0 ?
                            core.plugins.cux.convert(availday.rooms.double.price, sourcecurrency, targetcurrency) : 0;
                        availday.rooms.double.net = availday.rooms.double.net > 0 ?
                            core.plugins.cux.convert(availday.rooms.double.net, sourcecurrency, targetcurrency) : 0;

                        availday.rooms.single.price = availday.rooms.single.price > 0 ?
                            core.plugins.cux.convert(availday.rooms.single.price, sourcecurrency, targetcurrency) : 0;
                        availday.rooms.single.net = availday.rooms.single.net > 0 ?
                            core.plugins.cux.convert(availday.rooms.single.net, sourcecurrency, targetcurrency) : 0;

                        availday.rooms.currency = currencies[targetcurrency];

                    });
                }
            });
        }) : null;
    }
    if (doc != null && doc.rooms != null && doc.amount != null && doc.pvpAffiliate != null) {
        var quote = doc;
        var core = options.core;
        
        if (quote != null) {
            var sourcecurrency = quote != null && quote.dmc != null && quote.dmc.currency != null ? quote.dmc.currency.value : null;
            sourcecurrency = quote != null && (sourcecurrency == null || sourcecurrency == '') && (quote.products != null && quote.products.dmc != null && quote.products.dmc.currency != null) ? quote.products.dmc.currency.value : sourcecurrency;
            targetcurrency = options.currentcurrency;
            //double
            quote.rooms != null && quote.rooms.double != null && quote.rooms.double.amountPricePerPax != null ?
                (quote.rooms.double.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.double.amountPricePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.double.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.double.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.double.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
            quote.rooms != null && quote.rooms.double != null && quote.rooms.double.pvpAffiliatePerPax != null ?
                (quote.rooms.double.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.double.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.double.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.double.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.double.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

            //triple
            quote.rooms != null && quote.rooms.triple != null && quote.rooms.triple.amountPricePerPax != null ?
                (quote.rooms.triple.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.triple.amountPricePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.triple.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.triple.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.triple.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
            quote.rooms != null && quote.rooms.triple != null && quote.rooms.triple.amountPricePerPax ?
                (quote.rooms.triple.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.triple.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.triple.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.triple.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.triple.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

            //quad
            quote.rooms != null && quote.rooms.quad != null && quote.rooms.quad.amountPricePerPax != null ?
                (quote.rooms.quad.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.quad.amountPricePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.quad.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.quad.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.quad.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
            quote.rooms != null && quote.rooms.quad != null && quote.rooms.quad.pvpAffiliatePerPax != null ?
                (quote.rooms.quad.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.quad.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.quad.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.quad.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.quad.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

            //single
            quote.rooms != null && quote.rooms.single != null && quote.rooms.single.amountPricePerPax != null ?
                (quote.rooms.single.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.single.amountPricePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.single.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.single.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.single.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
            quote.rooms != null && quote.rooms.single != null && quote.rooms.single.pvpAffiliatePerPax != null ?
                (quote.rooms.single.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.single.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                    quote.rooms.single.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                    quote.rooms.single.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                    quote.rooms.single.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

            //NET AAVV AMOUNT
            quote.amount != null ? (quote.amount.value = core.plugins.cux.convert(quote.amount.value, sourcecurrency, targetcurrency),
                quote.amount.currency.label = currencies[targetcurrency].label,
                quote.amount.currency.value = currencies[targetcurrency].value,
                quote.amount.currency.symbol = currencies[targetcurrency].symbol) : null;
            //PVP AFFILIATE 
            quote.pvpAffiliate != null ? (quote.pvpAffiliate.value = core.plugins.cux.convert(quote.pvpAffiliate.value, sourcecurrency, targetcurrency),
                quote.pvpAffiliate.currency.label = currencies[targetcurrency].label,
                quote.pvpAffiliate.currency.value = currencies[targetcurrency].value,
                quote.pvpAffiliate.currency.symbol = currencies[targetcurrency].symbol) : null;
        }

        doc = quote;

    }
    //check if is a query with quotes..
    if (doc != null && doc.quotes != null && doc.quotes.length > 0 && !member.user.isAdmin) {
        var core = options.core;
        _.each(doc.quotes, function (quote) {
            var sourcecurrency = quote != null && quote.dmc != null && quote.dmc.currency != null ? quote.dmc.currency.value : null;
            sourcecurrency = quote != null && (sourcecurrency == null || sourcecurrency == '') && (quote.products != null && quote.products.dmc != null && quote.products.dmc.currency != null) ? quote.products.dmc.currency.value : sourcecurrency;
            targetcurrency = options.currentcurrency;

            if (quote != null) {
                //double
                quote.rooms != null && quote.rooms.double != null && quote.rooms.double.amountPricePerPax != null ?
                    (quote.rooms.double.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.double.amountPricePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.double.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.double.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.double.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol)  : null;
                quote.rooms != null && quote.rooms.double != null && quote.rooms.double.pvpAffiliatePerPax != null ?
                    (quote.rooms.double.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.double.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.double.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.double.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.double.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

                //triple
                quote.rooms != null && quote.rooms.triple != null && quote.rooms.triple.amountPricePerPax != null ?
                    (quote.rooms.triple.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.triple.amountPricePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.triple.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.triple.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.triple.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
                quote.rooms != null && quote.rooms.triple != null && quote.rooms.triple.amountPricePerPax ?
                    (quote.rooms.triple.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.triple.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.triple.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.triple.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.triple.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

                //quad
                quote.rooms != null && quote.rooms.quad != null && quote.rooms.quad.amountPricePerPax != null ?
                    (quote.rooms.quad.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.quad.amountPricePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.quad.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.quad.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.quad.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
                quote.rooms != null && quote.rooms.quad != null && quote.rooms.quad.pvpAffiliatePerPax != null ?
                    (quote.rooms.quad.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.quad.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.quad.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.quad.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.quad.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

                //single
                quote.rooms != null && quote.rooms.single != null && quote.rooms.single.amountPricePerPax != null ?
                    (quote.rooms.single.amountPricePerPax.value = core.plugins.cux.convert(quote.rooms.single.amountPricePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.single.amountPricePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.single.amountPricePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.single.amountPricePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;
                quote.rooms != null && quote.rooms.single != null && quote.rooms.single.pvpAffiliatePerPax != null ?
                    (quote.rooms.single.pvpAffiliatePerPax.value = core.plugins.cux.convert(quote.rooms.single.pvpAffiliatePerPax.value, sourcecurrency, targetcurrency),
                        quote.rooms.single.pvpAffiliatePerPax.currency.label = currencies[targetcurrency].label,
                        quote.rooms.single.pvpAffiliatePerPax.currency.value = currencies[targetcurrency].value,
                        quote.rooms.single.pvpAffiliatePerPax.currency.symbol = currencies[targetcurrency].symbol) : null;

                //NET AAVV AMOUNT
                quote.amount != null ? (quote.amount.value = core.plugins.cux.convert(quote.amount.value, sourcecurrency, targetcurrency),
                    quote.amount.currency.label = currencies[targetcurrency].label,
                    quote.amount.currency.value = currencies[targetcurrency].value,
                    quote.amount.currency.symbol = currencies[targetcurrency].symbol) : null;
                //PVP AFFILIATE 
                quote.pvpAffiliate != null ? (quote.pvpAffiliate.value = core.plugins.cux.convert(quote.pvpAffiliate.value, sourcecurrency, targetcurrency),
                    quote.pvpAffiliate.currency.label = currencies[targetcurrency].label,
                    quote.pvpAffiliate.currency.value = currencies[targetcurrency].value,
                    quote.pvpAffiliate.currency.symbol = currencies[targetcurrency].symbol) : null;        
            }
        });
    }

    return doc;
}