module.exports = function (conf, callback) {
    console.log('Userquery - save builded Userquery');
    var core = conf.core;
    var userquery = conf.userquery;

    userquery != null ?
        setImmediate(function () {
            userquery.save(function (err, doc) {
                conf.userquery = doc;
                callback(err, conf);
            });
        }) :
        setImmediate(function () {
            callback(null, conf)
        });
   
}