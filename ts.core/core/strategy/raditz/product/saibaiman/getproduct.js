module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    
    var core = conf.core;
    var code = conf.data;

    core.list('DMCProducts').model.find({ code: code }).exec(function (err, products) {
        err != null ? console.log(err) : console.log('lets process product ' + code);
        err != null ? cev.emit('product.next') : cev.emit('product.process', products[0]);
        err != null ? 
        setImmediate(function () {
            conf.product = products[0];
            conf.results.push({ ResultOK: true, Message: 'Product recovered successfuly', data : code });
            callback(null, conf);
        }) 
        : 
        setImmediate(function () { 
            conf.results.push({ ResultOK: true, Message: 'Error recovering product from mongo', data : err });
            callback(err, conf);
        });
    });
}