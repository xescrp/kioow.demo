var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var coreobjcms = core.corebase;
    
    var months = common.staticdata.months_en;
    var currencys = common.staticdata.currencys;
    var currentcurrency = 'EUR';
    var selectedcurrency = null;
    
    var fcr = _.filter(currencys, function (currency) {
        return currency.value == currentcurrency;
    });
    if (fcr != null && fcr.length > 0) {
        selectedcurrency = fcr[0];
    }

    //event complete trigger
    var trigger = function () {
        this.name = 'Completed tasks emiter';
        this.done = function (eventname, assertcondition, data) {
            if (assertcondition) {
                this.emit(eventname, data);
            }
        }
    };
    common.eventtrigger.eventtrigger(trigger);
    var eventlauncher = new trigger();

    eventlauncher.on('cms.done', function (cmsdata) {
        update(cmsdata);
    });

    function hashcms() {
        var cms_required = {
            cities: true,
            countries: true,
            exchanges: false
        };
        var cms_data = {
            countries : new common.hashtable.HashTable(),
            cities: new common.hashtable.HashTable(),
            exchanges: []
        };
        //get countries in cms
        //var ct_querystream = coreobjcms.list('Countries').model.find().stream();
        //ct_querystream.on('data', function (doc) {
        //    if (doc != null && doc.slug != null && doc.slug != '') {
        //        cms_data.countries.set(doc.slug, doc);
        //    }
        //});
        //ct_querystream.on('error', function (err) {
        //    console.log(err);
        //    errorcallback(err);
        //});
        //ct_querystream.on('close', function (err) {
        //    cms_required.countries = true;
        //    eventlauncher.done('cms.done', (cms_required.countries && cms_required.cities && cms_required.exchanges), cms_data);
        //});
        ////get cities in cms
        //var tg_querystream = coreobjcms.list('Cities').model.find().stream();
        //tg_querystream.on('data', function (doc) {
        //    if (doc != null && doc.slug != null && doc.slug != '') {
        //        cms_data.cities.set(doc.slug, doc);
        //    }
        //});
        //tg_querystream.on('error', function (err) {
        //    console.log(err);
        //    errorcallback(err);
        //});
        //tg_querystream.on('close', function (err) {
        //    cms_required.cities = true;
        //    eventlauncher.done('cms.done', (cms_required.countries && cms_required.cities && cms_required.exchanges), cms_data);
        //});
        //get exchange for currency
        var ex_querystream = core.list('Exchange').model.find({ state: 'published' }).stream();
        ex_querystream.on('data', function (exx) { 
            cms_data.exchanges = exx.toObject();
        });
        ex_querystream.on('error', function (err) {
            console.log(err);
            errorcallback(err);
        });
        ex_querystream.on('close', function (err) {
            cms_required.exchanges = true;
            eventlauncher.done('cms.done', (cms_required.countries && cms_required.cities && cms_required.exchanges), cms_data);
        });
    }
    function update(cmsdata) {
        console.log('full update for product...' + options.code);
        var query = options.code != null ? { code: options.code } : { _id : options.id };
        var product = null;
        var querystream = core.corebase.list('DMCProducts').model.find(query)
        .populate('dmc', 'name code company.name company.legalname images membership.commission membership.b2bcommission')
        .stream();

        querystream.on('data', function (doc) {
            product = doc;
        });

        querystream.on('error', function (err) {
            console.log(err);
        });

        querystream.on('close', function () {
            if (product != null) {
                var prices = common.utils.getMinimumPrices(product);
                //set default...
                product.minprice.value = 0;
                product.minprice.currency.label = '';
                product.minprice.currency.symbol = '';
                product.minprice.currency.value = '';
                //price indexes ready
                var priceindexprefix = 'zzzz';
                var priceb2bindexprefix = 'zzzz';
                var priceindexsufix = product.code;
                var priceb2bindexsufix = product.code;
                if (prices != null && prices.length > 0) {
                    product.prices = prices;
                    var validprices = _.map(prices, function (price) {
                        var today = new Date();
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
                    currencies = _.filter(currencies, function (curr) { return (curr != null && curr.label != null && curr.label != '') });
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
                            product.minprice.currency.value, currentcurrency, [cmsdata.exchanges]);
                            product.minprice.exchange.currency = selectedcurrency;
                            
                            console.log('Exchange detected...');
                        }
                        //b2c
                        priceindexprefix = common.utils.pad(product.minprice.exchange.value, 10);
                        //priceindexsufix = product.code;
                        //b2b
                        var b2bcomission = (product.dmc != null && product.dmc.membership != null) ? 
                        (product.dmc.membership.b2bcommission != null) ?  product.dmc.membership.b2bcommission : 0 : 0;
                        var minpriceb2b = product.minprice.exchange.value - Math.round(product.minprice.exchange.value * b2bcomission / 100);
                        priceb2bindexprefix = common.utils.pad(minpriceb2b, 10);
                        priceb2bindexsufix = product.code;
                    }
                }   
                product.priceindexing = [priceindexprefix, priceindexsufix].join('.'); //#### price indexing b2c
                product.priceb2bindexing = [priceb2bindexprefix, priceb2bindexsufix].join('.'); 
                //#### check unpublished state
                var laststate = product.publishState;
                product.publishState = (priceindexprefix == 'zzzz' && product.publishState != 'draft') ? 'unpublished' : product.publishState;
 
                if (product.itinerary != null) {
                    product.itinerarylength = product.itinerary.length;
                    product.itinerarylengthindexing = common.utils.pad(product.itinerary.length, 5) + '.' + product.code;
                } else {
                    product.itinerarylength = 0;
                    product.itinerarylengthindexing = common.utils.pad(0, 5) + '.' + product.code;
                }
                //product = common.utils.updateproductcities(product, cmsdata.cities);

                product.save(function (err, doc) {
                    if (err) {
                        console.log('Error updating: ' + product.code);
                        console.log(err);
                        errorcallback(err);
                    }

                    if (doc) { 
                        console.log(
                            'Product updated! : ' + product.code + ' minprice: ' +
                                    product.minprice.value + ' ' + product.minprice.currency.label +
                                    ' month: ' + product.minprice.month + ' year: ' + +product.minprice.year);
                        callback({
                            product: product,
                            date: new Date(),
                            message: 'Product updated! - Minprice, Cities -  '
                        });
                    }
                });


            }
        });
    }

    hashcms(); 
}