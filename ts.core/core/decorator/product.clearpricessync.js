
var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (product) {
    var productmodels = ['DMCProducts', 'MigrationProducts'];
    var modelname = (product != null && product.list != null && product.list.model != null) ? product.list.model.modelName : null;
    if (modelname != null && productmodels.indexOf(modelname) >= 0) {
        //check prices...
        console.log('Remove prices with 0');
        product.prices = _.filter(product.prices, function (price) { return (price != null && price.minprice > 0); });
        if (product.availability != null && product.availability.length > 0) {
            _.each(product.availability, function (avail) {
                var months = common.staticdata.months_en;
                _.each(months, function (monthname) {
                    var monthdays = (avail[monthname] != null) ? avail[monthname].availability : null;
                    if (monthdays != null && monthdays.length > 0) {
                        avail[monthname].availability = _.filter(monthdays, function (day) {
                            return(day.rooms.double.price > 0 || 
                                day.rooms.single.price > 0 || day.rooms.triple.price > 0 || 
                                day.rooms.other.price > 0)
                        });
                    }
                })
            });
        }
    }

    return product;
}