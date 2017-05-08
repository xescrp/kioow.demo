module.exports = function (conf, callback) {
    var wl = conf.wlcustomizationforsave;
    var fs = require('fs');

    var publicpath = require('../../../../local.routes').paths.public;
    var common = require('yourttoo.common');
    var wlbasepath = publicpath + 'partials/wl/';
    var wlpath = publicpath + 'partials/wl/' + wl.code;
    conf.publicpath = publicpath;
    conf.workingpath = require('../../../../local.routes').paths.baseworks;
    conf.workingbasepath = wlbasepath;

    wl.code != 'default_wl' ? 
    setImmediate(function () {
        common.utils.directoryExists(wlpath, 0744, function (err) {
            err != null ? setImmediate(function () {
                conf.results.errors.push(err);
                console.error(err);
                callback(err, conf);
            }) : 
            setImmediate(function () { 
                conf.results.messages.push('Directory for WL checked: ' + wlpath);
                conf.whitelabelpath = wlpath;
                callback(null, conf);
            });
        });
    }) : 
    setImmediate(function () {
        callback(null, conf);
    });

}