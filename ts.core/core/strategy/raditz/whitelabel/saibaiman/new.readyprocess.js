module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;

    conf.copyfile = function (source, target, cb) {
        var fs = require('fs');
        var cbCalled = false;

        var rd = fs.createReadStream(source);
        rd.on("error", function (err) {
            done(err);
        });

        var wr = fs.createWriteStream(target);
        wr.on("error", function (err) {
            done(err);
        });
        wr.on("close", function (ex) {
            done();
        });
        rd.pipe(wr);

        function done(err) {
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    };

    conf.wlcustomizationforsave = data;
    conf.results = {
        messages: [],
        errors: []
    };
    setImmediate(function () {
        callback(null, conf);
    });
}