module.exports = function (options) {
    
    var common = require('yourttoo.common');
    var doc = options.doc;
    var member = options.loggeduser;
    
    var priceoptions = {
        product: doc,
        switcher: affiliate,
        feekey: 'groups', //possible values: unique, groups, tailormade, flights
        switcherkey: 'affiliate'
    };
    
    booking.omtmargin = affiliate.membership.omtmargin || 3;

    var price = common.pricemachine(priceoptions);
    console.log('price machine...');
    console.log(price);
    doc.minprice.value = price.aavvnetprice;

    return doc;
}