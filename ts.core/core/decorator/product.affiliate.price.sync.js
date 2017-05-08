var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options, callback, errorcallback) {
    var pricemodels = ['DMCProducts', 'BookedProducts'];
    var product = options.document;
    var affiliate = options.loggeduser;
    var environment = options.environment;
    console.log('Environment: ' + environment);
    var dmc = (product != null) ? product.dmc : null;
    var modelname = (product != null && product.list != null && product.list.model != null) ? product.list.model.modelName : null;
    if (pricemodels.indexOf(modelname) >= 0) {
        var months = common.staticdata.months_en;
        var marginextra = 1;
        var omtmargin = (affiliate != null && affiliate.membership != null) ? affiliate.membership.omtmargin || 5 : 5;
        omtmargin += marginextra;
        var b2bcomission = (dmc != null && dmc.membership != null) ? (dmc.membership.b2bcommission != null) ? dmc.membership.b2bcommission : 0 : 0;
        var fee = (affiliate != null && affiliate.fees != null) ? affiliate.fees.unique || 0 : 0;
        (environment != null && environment == 'whitelabel') ? omtmargin += 1 : null;

        //Price Parity
        var paritypriceAFI = (affiliate != null && affiliate.fees != null && affiliate.fees.pvpkeep != null) ? affiliate.fees.pvpkeep : false;
        var paritypriceDMC = (dmc != null && dmc.membership != null && dmc.membership.pvp != null) ?
            dmc.membership.pvp.keep : false;
        var paritypricePRD = (product != null && product.pvp != null && product.pvp.keep != null) ? product.pvp.keep : false;
        var parityprice = paritypriceDMC || paritypricePRD || paritypriceAFI;
        parityprice = parityprice && (environment != null && environment == 'whitelabel');
        parityprice ? (product.pvp.b2b = product.pvp.b2c, product.pvp.b2bperday = product.pvp.b2cperday) : null;

        if (affiliate != null && affiliate.user.isAffiliate && !parityprice) {
            //calculate min price...
            console.log('calculate net min price for affiliate for.... \n');
            console.log('B2Bcommission: ' + b2bcomission + ' \n');
            console.log('OMTMargin: ' + omtmargin + ' \n');
            console.log('Fee: ' + fee + ' \n');
            console.log('pvp price before...' + ' \n');
            console.log('environment: ' + environment);
            var actualdate = new Date();
            console.log(product.minprice);

            //product.pvp.b2c = product.minprice.exchange != null && product.minprice.exchange.value != null ? product.minprice.exchange.value : product.minprice.value;
            product.pvp.b2c = product.minprice.value;
            product.minprice.value = Math.ceil(product.minprice.value - (product.minprice.value * b2bcomission / 100));
            product.minprice.value = product.minprice.value / (1 - (omtmargin / 100));
            product.pvp.net = Math.round(product.minprice.value);

            console.log('whitelabel - check -> environment: ' + environment);
            console.log('before: ' + product.minprice.value);
            product.minprice.value = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
                product.minprice.value / (1 - (fee / 100)) :
                product.minprice.value;

            product.minprice.value = Math.round(product.minprice.value);
            console.log('after: ' + product.minprice.value);
            product.pvp.b2b = product.minprice.value;
            product.pvp.currency.label = dmc.currency.label;
            product.pvp.currency.value = dmc.currency.value;
            product.pvp.currency.symbol = dmc.currency.symbol;
            product.pvp.currencycode = dmc.currency.value;
            product.pvp.comission = b2bcomission;
            product.pvp.margin = omtmargin;
            product.pvp.fee = fee;

            //if (product.minprice.exchange != null) {
            //    console.log('EXCHANGE before: ' + product.minprice.exchange.value);
            //    product.minprice.exchange.value = Math.round(product.minprice.exchange.value - (product.minprice.exchange.value * b2bcomission / 100));
            //    product.minprice.exchange.value = Math.ceil(product.minprice.exchange.value / (1 - (omtmargin / 100)));
            //    product.minprice.exchange.value = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
            //        product.minprice.exchange.value / (1 - (fee / 100)) :
            //        product.minprice.exchange.value;
            //    console.log('EXCHANGE after: ' + product.minprice.exchange.value);

            //    product.minprice.exchange.value = Math.ceil(product.minprice.exchange.value);
            //    product.pvp.b2b = product.minprice.exchange.value;
            //    product.pvp.currency = product.minprice.exchange.currency;
            //}

            console.log('new min price...');
            console.log(product.minprice);
            //check prices (minprices)...
            if (product.prices != null && product.prices.length > 0) {
                for (var i = 0, len = product.prices.length; i < len; i++) {
                    product.prices[i].minprice = Math.ceil(product.prices[i].minprice - (product.prices[i].minprice * b2bcomission / 100));
                    product.prices[i].minprice = product.prices[i].minprice / (1 - (omtmargin / 100));
                    product.prices[i].netprice = Math.round(product.prices[i].minprice);
                    product.prices[i].minprice = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
                        product.prices[i].minprice / (1 - (fee / 100)) :
                        product.prices[i].minprice;
                    product.prices[i].minprice = Math.round(product.prices[i].minprice);
                }
            }

            if (product.itinerary != null && product.itinerary.length > 0) {
                product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);
                product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
            }
            //check availability
            if (product.availability != null && product.availability.length > 0) {

                _.each(product.availability, function (availyear) {
                    if (availyear.year >= actualdate.getFullYear()) {
                        _.each(months, function (month) {
                            if (availyear[month] != null &&
                                availyear[month].availability != null &&
                                availyear[month].availability.length > 0) {
                                _.each(availyear[month].availability, function (availday) {
                                    availday.rooms.triple.price = Math.ceil(availday.rooms.triple.price - (availday.rooms.triple.price * b2bcomission / 100));
                                    availday.rooms.triple.price = availday.rooms.triple.price / (1 - (omtmargin / 100));
                                    availday.rooms.triple.net = Math.round(availday.rooms.triple.price);
                                    availday.rooms.triple.price = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
                                        availday.rooms.triple.price / (1 - (fee / 100)) :
                                        availday.rooms.triple.price;
                                    availday.rooms.triple.price = Math.round(availday.rooms.triple.price);

                                    availday.rooms.double.price = Math.ceil(availday.rooms.double.price - (availday.rooms.double.price * b2bcomission / 100));
                                    availday.rooms.double.price = availday.rooms.double.price / (1 - (omtmargin / 100));
                                    availday.rooms.double.net = Math.round(availday.rooms.double.price);
                                    availday.rooms.double.price = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
                                        availday.rooms.double.price / (1 - (fee / 100)) :
                                        availday.rooms.double.price;
                                    availday.rooms.double.price = Math.round(availday.rooms.double.price);

                                    availday.rooms.single.price = Math.ceil(availday.rooms.single.price - (availday.rooms.single.price * b2bcomission / 100));
                                    availday.rooms.single.price = availday.rooms.single.price / (1 - (omtmargin / 100));
                                    availday.rooms.single.net = Math.round(availday.rooms.single.price);
                                    availday.rooms.single.price = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
                                        availday.rooms.single.price / (1 - (fee / 100)) :
                                        availday.rooms.single.price;
                                    availday.rooms.single.price = Math.round(availday.rooms.single.price);
                                });
                            }

                        });
                    }
                });
            }
        }
    }
    if (callback) {
        callback(product);
    }
    return product;
}