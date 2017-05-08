var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options) {
    var pricemodels = ['DMCProducts', 'BookedProducts'];

    var doc = options.document;
    var m_currentcurrency = options.currency;
    var exchanges = options.exchanges;
    var currentcurrency = options.currentcurrency;
    var months = common.staticdata.months_en;
    var modelname = (doc != null && doc.list != null && doc.list.model != null) ? doc.list.model.modelName : null;
    console.log('model: ' + modelname);

    if (pricemodels.indexOf(modelname) >= 0) {

        console.log('change currency for price decorator : ACTUAL CURRENCY...');
        console.log(doc.minprice.currency);
        console.log('change to -> ');
        console.log(currentcurrency);

        if (doc.origin != 'tailormade' && doc.minprice != null && doc.minprice.currency != null && 
            doc.minprice.currency.value != m_currentcurrency) {
            
            console.log('change currency...');
            console.log('change currency minprice...');
            console.log('currency change for pvp.b2c');
            doc.pvp.b2c = common.utils.convertValueToCurrency(
                doc.minprice.value, //current value
                doc.minprice.currency.value, //current currency
                m_currentcurrency, //to a new currency
                exchanges); //exchanges
            console.log('currency change for pvp.b2b');
            doc.pvp.b2b = common.utils.convertValueToCurrency(
                doc.minprice.value, //current value
                doc.minprice.currency.value, //current currency
                m_currentcurrency, //to a new currency
                exchanges); //exchanges
            if (doc.pvp.net != null) {
                doc.pvp.net = common.utils.convertValueToCurrency(
                    doc.pvp.net, //current value
                    doc.minprice.currency.value, //current currency
                    m_currentcurrency, //to a new currency
                    exchanges);
            };
            doc.minprice.currency = currentcurrency;


            if (doc.itinerary != null && doc.itinerary.length > 0) {
                doc.pvp.b2bperday = Math.round(doc.pvp.b2b / doc.itinerary.length);
                doc.pvp.b2cperday = Math.round(doc.pvp.b2c / doc.itinerary.length);
            }
            
            console.log('pvp original currency: ' + doc.pvp.currency);
            doc.pvp.currency.label = currentcurrency.label;
            doc.pvp.currency.symbol = currentcurrency.symbol;
            doc.pvp.currency.value = currentcurrency.value;
            console.log('pvp changed currency: ' + doc.pvp.currency);
            console.log(doc.pvp);
            console.log('change currency prices...');
            if (doc.prices != null && doc.prices.length > 0) {
                for (var i = 0, len = doc.prices.length; i < len; i++) {
                    doc.prices[i].minprice = doc.prices[i].minprice && doc.prices[i].currency != null > 0 ? 
										common.utils.convertValueToCurrency(doc.prices[i].minprice,
											doc.prices[i].currency.value, m_currentcurrency, exchanges) 
											: 
										doc.prices[i].minprice;	
                    doc.prices[i].currency = currentcurrency;
                }
            }
            console.log('change currency availability...');
            if (doc.availability != null && doc.availability.length > 0) {
                _.each(doc.availability, function (availyear) {
                    _.each(months, function (month) {
                        if (availyear[month] != null && 
                    availyear[month].availability != null && 
                    availyear[month].availability.length > 0) {
                            _.each(availyear[month].availability, function (availday) {

                                availday.rooms.triple.price = availday.rooms.triple.price > 0 ? 
                                    common.utils.convertValueToCurrency(availday.rooms.triple.price,
                                        availday.rooms.currency.value, m_currentcurrency, exchanges) : 0

                                availday.rooms.double.price = availday.rooms.double.price > 0 ? 
                                    common.utils.convertValueToCurrency(availday.rooms.double.price,
                                        availday.rooms.currency.value, m_currentcurrency, exchanges) : 0
                                
                                availday.rooms.single.price = availday.rooms.single.price > 0 ? 
                                    common.utils.convertValueToCurrency(availday.rooms.single.price,
                                        availday.rooms.currency.value, m_currentcurrency, exchanges) : 0

                                availday.rooms.currency = currentcurrency;
                            });
                        }

                    });
                });
            }

        } else {
            console.log('currency ok...');
        }
    }

    return doc;
}