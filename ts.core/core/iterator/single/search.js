

module.exports = function (options) {
    
    var common = require('yourttoo.common');
    var depdate = new Date();
    var filter = options.filter;
    var doc = options.doc;

    if (filter.departuredate != null && filter.departuredate != '') {
        depdate.setDate(1);
        depdate.setMonth(parseInt(filter.departuredate.split('-')[1]) - 1);
        depdate.setFullYear(parseInt(filter.departuredate.split('-')[2]));
        
        var monthname = common.utils.getMonthNameEnglish(depdate.getMonth());
        var year = depdate.getFullYear();
        var prices = _.filter(doc.prices, function (price) {
            return (price.month == monthname && price.year == year && price.minprice > 0);
        });
        if (prices != null && prices.length > 0) {
            doc.minprice.currency = prices[0].currency;
            doc.minprice.year = prices[0].year;
            doc.minprice.month = prices[0].month;
            doc.minprice.value = prices[0].minprice;
        }
    }
    return doc;
}