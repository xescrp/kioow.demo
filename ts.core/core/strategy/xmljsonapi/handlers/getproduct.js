module.exports = function (conf, callback) {
    var core = conf.core;
    var code = conf.productcode;
    var m_currentcurrency = conf.currentcurrency;

    core.list('DMCProducts').model.find({ code: code })
    .populate('dmc')
    .exec(function (err, docs) {
        err != null ? process.nextTick(function () { 
            callback(err, null);
        }) : process.nextTick(function () {
            conf.product = docs[0];
            
            conf.product = require('../../../decorator/priceexchangesync')({
                document: conf.product, currency: m_currentcurrency, 
                exchanges: exchanges, currentcurrency: currentcurrency
            });
            
            require('../../../decorator/product.affiliate.price')({
                core: core, document: conf.product, loggeduser: conf.auth
            }, function (document) { //found product OK
                conf.product = document;
                callback(null, conf);
            }, function (err) { //found product Error
                callback(err, conf);
            });
        });
    });
}
