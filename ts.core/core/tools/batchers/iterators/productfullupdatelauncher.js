module.exports = function (options, callback, errorcallback) { 
    var common = require('yourttoo.common');
    var product = options.product;
    var code = product != null ? product.code : null;

    var cev = options.eventcarrier;
    var core = { corebase: options.core };
    var rq = {
        core : core,
        code: code
    };
    if (product != null && code != '') {
        console.log('full update launch for product ' + code);
        var fullupdater = require('../../../strategy/product/fullupdate');
        fullupdater(rq, function (rs) {
            options.product = rs.product;
            callback != null ? callback(options) : null;
            cev != null ? cev.emit('productfullupdate.done', options) : null;
        });
    } else { 
        console.log('no product...');
        callback != null ? callback(options) : null;
        cev != null ? cev.emit('productfullupdate.done', options) : null;
    }
    return options;
}