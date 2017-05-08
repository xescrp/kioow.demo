module.exports = function (conf, callback) {
    var wl = conf.wlcustomizationforsave;
    var fs = require('fs');

    var wlpath = conf.whitelabelpath;
    var publicpath = conf.publicpath;
    var basepath = conf.workingbasepath;
    var wloriginalfile = basepath + 'wl-footer.html.swig';

    setImmediate(function () {
        var footerpath = [wlpath, 'wl-footer.html.swig'].join('/');
        fs.existsSync(footerpath) ? callback(null, conf) : conf.copyfile(wloriginalfile, footerpath, function (err) {
            err != null ? setImmediate(function () {
                conf.results.errors.push(err);
                callback(err, conf);
            }) : setImmediate(function () {
                conf.results.messages.push('footer file created: ' + footerpath);
                callback(null, conf);
            });
        });
    });
}