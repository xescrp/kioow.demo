var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options, callback, errorcallback) {
    var pricemodels = ['DMCProducts', 'BookedProducts'];
    var product = options.document;
    var affiliate = options.loggeduser;
    var fee = options.fee || 0;
    var dmc = (product != null) ? product.dmc : null;
    var months = common.staticdata.months_en;
    var omtmargin = (affiliate != null && affiliate.membership != null) ? affiliate.membership.omtmargin || 3 : 3;
    var b2bcomission = (dmc != null && dmc.membership != null) ? (dmc.membership.b2bcommission != null) ?  dmc.membership.b2bcommission : 0 : 0;
    var modelname = (product != null && product.list != null && product.list.model != null) ? product.list.model.modelName : null;
    if (pricemodels.indexOf(modelname) >= 0) {
        //calculate min price...
        console.log('calculate net min price for affiliate.... ');
        console.log('B2Bcommission: ' + b2bcomission);
        console.log('OMTMargin: ' + omtmargin);
        console.log('pvp price before...');
        var actualdate = new Date();
        console.log(product.minprice);

        product.minprice.value = product.minprice.value - Math.round(product.minprice.value * b2bcomission / 100);
        product.minprice.value = Math.round(product.minprice.value / (1 - (omtmargin / 100)));
        if (product.minprice.exchange != null) {
            product.minprice.exchange.value = product.minprice.exchange.value - Math.round(product.minprice.exchange.value * b2bcomission / 100);
            product.minprice.exchange.value = Math.round(product.minprice.exchange.value / (1 - (omtmargin / 100)));
        }
        console.log('new min price...');
        console.log(product.minprice);
        //check prices (minprices)...
        if (product.prices != null && product.prices.length > 0) {
            for (var i = 0, len = product.prices.length; i < len; i++) {
                product.prices[i].minprice = product.prices[i].minprice - Math.round(product.prices[i].minprice * b2bcomission / 100);
                product.prices[i].minprice = Math.round(product.prices[i].minprice / (1 - (omtmargin / 100)));
            }
        }
        //check availability
        var complete = {
            totals: {
                avails: 0,
                months: 0,
                days: 0
            },
            avails: function () { return this.totals.avails == 0; },
            months: function () { return this.totals.months == 0; },
            days: function () { return this.totals.days == 0; },
            done: function () { return this.avails() && this.months() && this.days(); }
        };
        if (product.availability != null && product.availability.length > 0) {
            complete.totals.avails += product.availability.length;
            _.each(product.availability, function (availyear) {
                complete.totals.months += months.length;
                _.each(months, function (month) {
                    if (availyear[month] != null && 
                    availyear[month].availability != null && 
                    availyear[month].availability.length > 0) {
                        complete.totals.days += availyear[month].availability.length;
                        _.each(availyear[month].availability, function (availday) {
                            availday.rooms.triple.price = availday.rooms.triple.price - Math.round(availday.rooms.triple.price * b2bcomission / 100);
                            availday.rooms.triple.price = Math.round(availday.rooms.triple.price / (1 - (omtmargin / 100)));
                            availday.rooms.double.price = availday.rooms.double.price - Math.round(availday.rooms.double.price * b2bcomission / 100);
                            availday.rooms.double.price = Math.round(availday.rooms.double.price / (1 - (omtmargin / 100)));
                            availday.rooms.single.price = availday.rooms.single.price - Math.round(availday.rooms.single.price * b2bcomission / 100);
                            availday.rooms.single.price = Math.round(availday.rooms.single.price / (1 - (omtmargin / 100)));
                            complete.totals.days--;
                            complete.done() ? callback(product) : null;
                        });
                    }
                    complete.totals.months--;
                    complete.done() ? callback(product) : null;
                });
                complete.totals.avails--;
                complete.done() ? callback(product) : null;
            });
        }
    } else { 
        //return the document as is... (no decoration needed or allowed)
        callback(options.document);
    }

    return product;
}