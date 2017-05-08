var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options, callback, errorcallback) {
    var pricemodels = ['DMCProducts', 'BookedProducts'];
    var product = options.document;
    var environment = options.environment;
    var affiliate = options.loggeduser;
    var dmc = (product != null) ? product.dmc : null;
    //var modelname = (product != null && product.list != null && product.list.model != null) ? product.list.model.modelName : null;
    //if (pricemodels.indexOf(modelname) >= 0) {
        
    //}
    var marginextra = 1;
    var months = common.staticdata.months_en;
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
        console.log('Price Parity: ' + parityprice);
        console.log('user code : ' + affiliate.code);

        console.log('calculate net min price for affiliate for.... \n');
        console.log('B2Bcommission: ' + b2bcomission + ' \n');
        console.log('OMTMargin: ' + omtmargin + ' \n');
        console.log('Fee: ' + fee + ' \n');
        console.log('pvp price before...' + ' \n');
        console.log('environment: ' + environment);

        console.log('calculate net min price for affiliate for.... \n');
        //MIN PRICE FIELD
        product.pvp.b2c = product.minprice.value;
        product.minprice.value = Math.ceil(product.minprice.value - (product.minprice.value * b2bcomission / 100)); //neto dmc
        product.minprice.value = product.minprice.value / (1 - (omtmargin / 100)); //neto affiliate
        product.pvp.net = Math.round(product.minprice.value);
        product.minprice.value = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
            product.minprice.value / (1 - (fee / 100)) :
            product.minprice.value;
        
        product.minprice.value = Math.round(product.minprice.value);
        product.minprice.currency = product.dmc.currency;
        product.minprice.currencycode = product.dmc.currency.value;

        //PVP FIELD
        product.pvp.b2b = product.minprice.value;
        if (product.itinerary != null && product.itinerary.length > 0) {
            product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);
            product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
        }
        product.pvp.currency = product.dmc.currency;
        product.pvp.currencycode = product.dmc.currency.value;
        product.pvp.comission = b2bcomission;
        product.pvp.margin = omtmargin;
        product.pvp.fee = fee;
        //if (product.minprice.exchange != null) {
        //    product.minprice.exchange.value = Math.round(product.minprice.exchange.value - (product.minprice.exchange.value * b2bcomission / 100));
        //    product.minprice.exchange.value = Math.ceil(product.minprice.exchange.value / (1 - (omtmargin / 100)));
        //    product.minprice.exchange.value = (environment != null && (environment == 'yourttoo' || environment == 'whitelabel')) ?
        //        product.minprice.exchange.value / (1 - (fee / 100)) :
        //        product.minprice.exchange.value;

        //    product.minprice.exchange.value = Math.ceil(product.minprice.exchange.value);
        //    product.pvp.b2b = product.minprice.exchange.value;
        //    product.pvp.currency = product.minprice.exchange.currency;
        //}

        console.log(product.pvp);
    }

    if (callback) { callback(product); }
    return product;
}