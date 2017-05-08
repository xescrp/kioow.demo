module.exports = function (conf, callback) {
	var common = require('yourttoo.common');
	var _ = require('underscore');

	var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

	var product = conf.product;
	var months = common.staticdata.months_en;
	var currencys = common.staticdata.currencys;
	var exchanges = conf.exchanges;
	var currentcurrency = 'EUR';
	var selectedcurrency = null;
	//select the currency
	var fcr = _.filter(currencys, function (currency) {
		return currency.value == currentcurrency;
	});
	if (fcr != null && fcr.length > 0) {
		selectedcurrency = fcr[0];
	}

	product != null ?
	setImmediate(function () {
		var priceindexprefix = 'zzzz';
		var priceb2bindexprefix = 'zzzz';
		var priceindexsufix = product.code;
		var priceb2bindexsufix = product.code;

		var prices = common.utils.getMinimumPrices(product);
        var lastday = common.utils.getlastavailabilityday(product);

		if (prices != null && prices.length > 0) {
			product.prices = prices;
			var validprices = _.map(prices, function (price) {
                var today = new Date();
                datetoday = (product.release != null && product.release > 0) ?
                    today.getDate() + product.release : today.getDate();
                today.setDate(datetoday);
				var year = today.getFullYear();
				if (price.year > year) {
					return price
				}
				else {
                    if (months.indexOf(price.month) >= today.getMonth()) {
						return price;
					} else {
						return null;
					}
				}
			});


			validprices = _.filter(validprices, function (v) { return (v != null && v.minprice > 0); });
			var currencies = _.pluck(prices, 'currency');
			currencies = _.filter(currencies, function (curr) {
				return (curr != null && curr.label != null && curr.label != '')
			});
			var cc = null;
			if (currencies != null && currencies.length > 0) {
				cc = _.find(currencies, function (c) { return (c.label != null && c.label != ''); });
			}
			cc = cc || { label: '', value: '', symbol: '' };
			product.minprice.exchange = {
				value: product.minprice.value,
				currency: selectedcurrency
			};
            if (validprices != null && validprices.length > 0) {

                validprices.sort(function (a, b) { return a.minprice - b.minprice; });
                //b2c
                product.minprice.value = validprices[0].minprice
                product.minprice.currency.label = cc.label;
                product.minprice.currency.symbol = cc.symbol;
                product.minprice.currency.value = cc.value;
                product.minprice.currencycode = cc.value;
                product.minprice.month = validprices[0].month;
                product.minprice.year = validprices[0].year;
                product.minprice.day = validprices[0].day;
                product.minprice.exchange = {
                    value: product.minprice.value,
                    currency: product.minprice.currency
                };
                //currency change
                if (product.minprice != null && product.minprice.currency != null &&
                    product.minprice.currency.value != currentcurrency) { //currentcurrency=EUR

                    product.minprice.exchange.value = common.utils.convertValueToCurrency(product.minprice.value,
                        product.minprice.currency.value, currentcurrency, exchanges);
                    product.minprice.exchange.currency = selectedcurrency;

                    console.log('Exchange detected...');
                }
                //b2c
                priceindexprefix = common.utils.pad(product.minprice.exchange.value, 10);
                //priceindexsufix = product.code;
                //b2b
                var b2bcomission = (product.dmc != null && product.dmc.membership != null) ?
                    (product.dmc.membership.b2bcommission != null) ? product.dmc.membership.b2bcommission : 0 : 0;
                var minpriceb2b = product.minprice.exchange.value - Math.round(product.minprice.exchange.value * b2bcomission / 100);
                product.minprice.b2b = product.minprice.value - Math.round(product.minprice.value * b2bcomission / 100);
                product.minprice.exchange.b2b = minpriceb2b;
                priceb2bindexprefix = common.utils.pad(minpriceb2b, 10);

                product.pvp.b2c = product.minprice.value;
                product.pvp.b2b = product.minprice.b2b;
                product.pvp.currency.label = cc.label;
                product.pvp.currency.symbol = cc.symbol;
                product.pvp.currency.value = cc.value;
                product.pvp.currencycode = cc.value;
                product.pvp.month = product.minprice.month;
                product.pvp.year = product.minprice.year;
                product.pvp.day = product.minprice.day;

                product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
                product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);
                cev.emit('product.minprice.changed', product);
            } else {
                var today = new Date();
                var b2bcomission = (product.dmc != null && product.dmc.membership != null) ?
                    (product.dmc.membership.b2bcommission != null) ? product.dmc.membership.b2bcommission : 0 : 0;

                if (lastday != null) {
                    product.minprice.value = lastday.rooms.double.price;
                    product.minprice.b2b = lastday.rooms.double.price - Math.round(lastday.rooms.double.price * b2bcomission / 100);
                    product.minprice.currency.label = lastday.rooms.currency.label;
                    product.minprice.currency.symbol = lastday.rooms.currency.symbol;
                    product.minprice.currency.value = lastday.rooms.currency.value;
                    product.minprice.currencycode = lastday.rooms.currency.value;
                    //currency change
                    if (product.minprice != null && product.minprice.currency != null &&
                        product.minprice.currency.value != currentcurrency) { //currentcurrency=EUR

                        product.minprice.exchange.value = common.utils.convertValueToCurrency(product.minprice.value,
                            product.minprice.currency.value, currentcurrency, exchanges);
                        product.minprice.exchange.currency = selectedcurrency;

                        console.log('Exchange detected (no avail future)...');
                    }
                    product.minprice.day = lastday.cdate.getDate();
                    product.minprice.month = months[lastday.cdate.getMonth()];
                    product.minprice.year = lastday.cdate.getFullYear();
                }
                if (product.minprice != null) {
                    product.pvp.b2c = product.minprice.value || 0;
                    product.pvp.b2b = product.minprice.b2b || 0;
                    product.pvp.currency.label = product.minprice.currency.label;
                    product.pvp.currency.symbol = product.minprice.currency.symbol;
                    product.pvp.currency.value = product.minprice.currency.value;
                    product.pvp.currencycode = product.minprice.currency.value;
                    product.pvp.month = product.minprice.month;
                    product.pvp.year = product.minprice.year;
                    product.pvp.day = product.minprice.day || 1;

                    product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
                    product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);
                } else {
                    //set 0
                    console.log('minprice unreachable!!');
                    console.log('set null minprice!!');
                    product.minprice.value = 0;
                    product.minprice.b2b = 0;
                    product.pvp.b2c = product.minprice.value || 0;
                    product.pvp.b2b = product.minprice.b2b || 0;
                    product.pvp.currency.label = product.minprice.currency.label;
                    product.pvp.currency.symbol = product.minprice.currency.symbol;
                    product.pvp.currency.value = product.minprice.currency.value;
                    product.pvp.currencycode = product.minprice.currency.value;
                    product.pvp.month = product.minprice.month || 'January';
                    product.pvp.year = product.minprice.year || 2015;
                    product.pvp.day = product.minprice.day || 1;


                    product.pvp.b2cperday = Math.round(product.pvp.b2c / product.itinerary.length);
                    product.pvp.b2bperday = Math.round(product.pvp.b2b / product.itinerary.length);
                }
            }
        }
        
        if (product.pvp == null || product.pvp.b2b == null || product.pvp.b2b == 0) {
            console.log('PVP is null...');
            product.pvp = { b2c: 0, b2b: 0, currency: { label: '', symbol: '', value: '' }, currencycode : '', month: 0, year: 2017, day: 1 }
            product.pvp.b2c = product.minprice.value || 0;
            product.pvp.b2b = product.minprice.b2b || 0;
            product.pvp.currency.label = product.minprice.currency.label;
            product.pvp.currency.symbol = product.minprice.currency.symbol;
            product.pvp.currency.value = product.minprice.currency.value;
            product.pvp.currencycode = product.minprice.currency.value;
            product.pvp.month = product.minprice.month || 'January';
            product.pvp.year = product.minprice.year || 2016;
            product.pvp.day = product.minprice.day || 1;
        }

		product.priceindexing = [priceindexprefix, priceindexsufix].join('.'); //#### price indexing b2c
        product.priceb2bindexing = [priceb2bindexprefix, priceb2bindexsufix].join('.');

        lastday != null && lastday.cdate != null ?
            product.availabilitytill = new Date(lastday.cdate.getFullYear(),
                lastday.cdate.getMonth(), lastday.cdate.getDate(), 0, 0, 0) : product.availabilitytill = new Date(2015, 0, 1);
        console.log('last availability day : ' + product.availabilitytill);
        var laststate = product.publishState;
        var noallowed = ['published', 'published.noavail'];
        product.publishState = (priceindexprefix == 'zzzz' && product.publishState == 'published') ?
            'published.noavail' : product.publishState;

        //noallowed.indexOf(product.publishState) >= 0 && product.pvp != null && product.pvp.b2c == 0 ? product.publishState = 'unpublished.to0' : null;

        laststate != product.publishState ? cev.emit('product.state.changed', {
            product: product,
            previous: laststate,
            current: product.publishState
        }) : null;

        laststate != product.publishState ? console.log('Product ' + product.code + ' changed state : ' +
            laststate + ' -> ' + product.publishState) : null;

		if (product.itinerary != null) {
			product.itinerarylength = product.itinerary.length;
			product.itinerarylengthindexing = common.utils.pad(product.itinerary.length, 5) + '.' + product.code;
		} else {
			product.itinerarylength = 0;
			product.itinerarylengthindexing = common.utils.pad(0, 5) + '.' + product.code;
		}
		
        console.log(
            'Product updated! : ' + product.code + ' minprice: ' +
            product.minprice.value + ' ' + product.minprice.currency.label + ' day: ' + product.minprice.day +
            ' month: ' + product.minprice.month + ' year: ' + +product.minprice.year);

        callback(product);

	})
	:
	setImmediate(function () {
		callback(null);
	});
	

    return cev;

}