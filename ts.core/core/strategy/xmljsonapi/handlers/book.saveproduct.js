module.exports = function (conf, callback) {
    var core = conf.core;
    var product = conf.product;
    
    var sourceId = product._id;
    
    delete product._id;
    delete product.id;
    var sktlt = product.toObject();

    var bookedproduct = core.list('BookedProducts').model(sktlt);
    bookedproduct.save(function (err, doc) {
        err != null ? setImmediate(function () {
            console.error(err);
            callback(err, conf);
        }) : setImmediate(function () {
            conf.product = doc;
            console.log('Booked product source: ' + sourceId + ' -> ' + product._id);
            callback(null, conf);
        });
    });
}