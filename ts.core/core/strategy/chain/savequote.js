module.exports = function (conf, callback) {
    console.log('Quote - save builded qupte');
    var core = conf.core;
    var quote = conf.quote;

    quote != null ?
        setImmediate(function () {
            quote.save(function (err, doc) {
                conf.quote = doc;
                callback(err, conf);
            });
        }) :
        setImmediate(function () {
            callback(null, conf)
        });
   
}