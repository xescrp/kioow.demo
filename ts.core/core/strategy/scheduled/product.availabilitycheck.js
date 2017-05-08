module.exports = function (options, callback, errorcallback) {
    var logs = [];
    var rewrite_log = false;
    var _clog_prev = null;
    //set your own testing query
    var custom_query = null;

    console.logstatus = function (product, results) { 
        process.stdout.write('finished process for product ' + product.code + '\n');
        process.stdout.write('process state ## done        : ' + results.Processed + '/' + results.Queried + '\n');
        process.stdout.write('process state ## exchanged   : ' + results.Exchanged + '/' + results.Queried + '\n');
        process.stdout.write('process state ## unpublished : ' + results.Unpublished + '/' + results.Queried + '\n');
    }
    function _restore_log() { 
        console.log = _clog_prev;
    }
    function _rewritelog() {
        console.log('\r\n\r\n\r\n\r\n\r\n\r\n');
        _clog_prev = console.log;
        console.log = function (text) {
            //logs.push(text);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(text);
        //console.log(text);
        }
        
        console.logstatus = function (product, results) {
            process.stdout.clearLine();
            process.stdout.moveCursor(0, -4)
            process.stdout.cursorTo(0);
            
            process.stdout.clearLine();
            
            process.stdout.write('finished process for product ' + product.code + '\n');
            process.stdout.clearLine();
            process.stdout.write('process state ## done        : ' + results.Processed + '/' + results.Queried + '\n');
            process.stdout.clearLine();
            process.stdout.write('process state ## exchanged   : ' + results.Exchanged + '/' + results.Queried + '\n');
            process.stdout.clearLine();
            process.stdout.write('process state ## unpublished : ' + results.Unpublished + '/' + results.Queried + '\n');
        }
    }
    
    rewrite_log ? _rewritelog() : null;

    var core = options.core;
    var started = new Date();
    console.log('Scheduled task started at ' + started);
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var codes = [];
    var exchanges = null;
    var currentcurrency = 'EUR';
    var currencys = common.staticdata.currencys;
    var months = common.staticdata.months_en;
    var selectedcurrency = null;
    var findquery = custom_query || { publishState: 'published', origin: { $ne : 'tailormade' } };
    var priceindexsufix = '';
    var priceindexprefix = '';

    var results = { ResultOK: true, Queried: 0, Processed: 0, Unpublished: 0, Exchanged: 0 };

    cev.on('all.done', function () { 
        rewrite_log ? _restore_log() : null;
        callback(results);
    });
    cev.on('all.error', function (err) {
        rewrite_log ? _restore_log() : null;
        errorcallback(err);
    });
    
    cev.on('next.save', function (product) {
        product.save(function (err, doc) {
            err != null ? cev.emit('all.error') : setImmediate(function () {
                results.Processed++;
                console.logstatus(product, results);
                cev.emit('next');
            });
        });
    });

    cev.on('next.product', function (product) {
        product != null ? setImmediate(function () {
            var prices = common.utils.getMinimumPrices(product);
            //set default...
            product.minprice.value = 0;
            product.minprice.currency.label = '';
            product.minprice.currency.symbol = '';
            product.minprice.currency.value = '';
            
            priceindexprefix = 'zzzz';
            priceindexsufix = product.code;

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
                currencies = _.pluck(prices, 'currency');
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
                   
                    product.minprice.value = validprices[0].minprice
                    product.minprice.currency.label = cc.label;
                    product.minprice.currency.symbol = cc.symbol;
                    product.minprice.currency.value = cc.value;
                    product.minprice.month = validprices[0].month;
                    product.minprice.year = validprices[0].year;
                    product.minprice.day = validprices[0].day;

                    //currency change
                    if (product.minprice != null && product.minprice.currency != null && 
                        product.minprice.currency.value != currentcurrency) { //currentcurrency=EUR

                        product.minprice.exchange.value = common.utils.convertValueToCurrency(product.minprice.value, 
                            product.minprice.currency.value, currentcurrency, exchanges);
                        product.minprice.exchange.currency = selectedcurrency;
                        
                        console.log('Exchange detected...');
                        results.Exchanged++;
                    }
                    priceindexprefix = common.utils.pad(product.minprice.exchange.value, 10);
                    priceindexsufix = product.code;
                }
            }
            product.priceindexing = [priceindexprefix, priceindexsufix].join('.'); //#### price indexing
            //#### check unpublished state
            var laststate = product.publishState;
            product.publishState = (priceindexprefix == 'zzzz' && product.publishState != 'draft') ? 'unpublished' : product.publishState;
            (laststate != product.publishState && product.publishState == 'unpublished') ? results.Unpublished++ : null;
            cev.emit('next.save', product);
        }) : cev.emit('next');
    });
    
    cev.on('next.code', function (code) {
        core.list('DMCProducts').model.find({ code: code })
        .populate('dmc')
        .exec(function (err, prds) {
            err != null ? cev.emit('all.error') : setImmediate(function () { 
                prds != null ? cev.emit('next.product', prds.shift()): cev.emit('next');
            });
        });        
    });

    cev.on('next', function () {
        codes.length > 0 ? setImmediate(function () {
            var code = codes.shift();
            console.log('lets process product ' + code);
            cev.emit('next.code', code);
        }) : setImmediate(function () { 
            cev.emit('all.done');
        });
    });

    cev.on('codes.ready', function () {
        codes != null ? results.Queried = codes.length : console.log('No products found. Check Query...');
        codes != null && codes.length > 0 ? cev.emit('next') : cev.emit('all.done');
    });

    cev.on('exchanges.ready', function () { 
        core.list('DMCProducts').model.find(findquery)
        .select('_id code')
        .exec(function (err, docs) {
            err != null ? cev.emit('all.error', err) : setImmediate(function () {
                codes = _.pluck(docs, 'code');
                cev.emit('codes.ready');
            });
        });
    });
    

    core.list('Exchange').model.find({ state: 'published' })
    .exec(function (err, docs) {
        err != null ? setImmediate(function () {
            cev.emit('all.error', err);
        }) : setImmediate(function () {
            exchanges = docs;
            exchanges = _.map(exchanges, function (change) { 
                return change.toObject();
            });
            var fcr = _.filter(currencys, function (currency) {
                return currency.value == currentcurrency;
            });
            if (fcr != null && fcr.length > 0) {
                selectedcurrency = fcr[0];
            }
            cev.emit('exchanges.ready');
        });
    });
}