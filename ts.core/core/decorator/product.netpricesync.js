var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options, callback, errorcallback) {
    var pricemodels = ['DMCProducts', 'MigrationProducts'];
    var product = options.document;
    var affiliate = options.loggeduser;
    var dmc = (product != null) ? product.dmc : null;
    var months = common.staticdata.months_en;

    var comissiontitles = {
        b2bcomission: 'b2bcommission',
        b2ccomission: 'commission'
    };

    var comissionname = !common.utils.stringIsNullOrEmpty(options.selectedcomission) ? options.selectedcomission + 'comission' : null;

    var omtmargin = (affiliate != null && affiliate.membership != null) ? affiliate.membership.omtmargin || 3 : 3;
    var comission = (!common.utils.stringIsNullOrEmpty(comissionname) && dmc != null && dmc.membership != null) ? 
    (!common.utils.stringIsNullOrEmpty(comissionname)) && (dmc.membership[comissiontitles[comissionname]] != null) ?  
    dmc.membership[comissiontitles[comissionname]] : 0 : 0;
    //console.log('comision ' + comissionname + ' -> ' + comission);
    comission == 0 ? console.log('comision 0 -> ' + dmc.membership) : null;
    var modelname = (product != null && product.list != null && product.list.model != null) ? product.list.model.modelName : null;
    if (pricemodels.indexOf(modelname) >= 0) {
        product.minprice.value = product.minprice.value - Math.round(product.minprice.value * comission / 100);
        //product.minprice.value = Math.round(product.minprice.value / (1 - (omtmargin / 100)));
        if (product.minprice.exchange != null) {
            product.minprice.exchange.value = product.minprice.exchange.value - Math.round(product.minprice.exchange.value * comission / 100);
            //product.minprice.exchange.value = Math.round(product.minprice.exchange.value / (1 - (omtmargin / 100)));
        }

    }
    if (callback) { callback(product); }
    return product;
}