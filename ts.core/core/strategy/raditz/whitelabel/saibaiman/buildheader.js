module.exports = function (conf, callback) {
    var wl = conf.wlcustomizationforsave;
    var fs = require('fs');

    var wlpath = conf.whitelabelpath;
    var publicpath = conf.publicpath;
    var basepath = conf.workingbasepath;
    var wloriginalfile = basepath + 'wl-header.html.swig';

    setImmediate(function () {
        var headerpath = [wlpath, 'wl-header.html.swig'].join('/');
        fs.existsSync(headerpath) ? callback(null, conf) : conf.copyfile(wloriginalfile, headerpath, function (err) {
            err != null ? setImmediate(function () {
                conf.results.errprs.push(err);
                callback(err, conf);
            }) : setImmediate(function () {
                conf.results.messages.push('header file created: ' + headerpath);
                callback(null, conf);
            });
        });
    });
}