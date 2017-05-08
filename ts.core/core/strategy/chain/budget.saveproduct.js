module.exports = function (conf, callback) {
    console.log('budget - copy and save(snapshot) booked product');
    if (conf.savebudget == true) {
        var core = conf.core;
        var product = conf.product;
        var common = require('yourttoo.common');
        var sourceId = product._id;
        var sktlt = product.toObject();
        delete sktlt._id;
        delete sktlt.id;
        
        var bookedproduct = core.list('BookedProducts').model(sktlt);
        
        bookedproduct = common.utils.synchronyzeProperties(sktlt, bookedproduct, {
            schema: core.list('DMCProducts').schema
        });
        
        bookedproduct.save(function (err, doc) {
            err != null ? setImmediate(function () {
                console.error(err);
                callback(err, conf);
            }) : setImmediate(function () {
                conf.product = doc;
                core.list('BookedProducts').model.populate(doc, [
                    { path: 'dmc' },
                    { path: 'departurecity' },
                    { path: 'stopcities' },
                    { path: 'sleepcity' },
                    { path: 'departurecountry' },
                    { path: 'stopcountry' },
                    { path: 'sleepcountry' }], function (err, popproduct) {
                    err != null ?
                            setImmediate(function () {
                        console.error(err);
                        callback(err, conf);
                    }) :
                            setImmediate(function () {
                        conf.product = popproduct;
                        console.log('Booked product source: ' + sourceId + ' -> ' + conf.product._id);
                        callback(null, conf);
                    });
                });
            });
        });
    } else { setImmediate(function () { callback(null, conf); }); }
}
