module.exports = function (options, callback, errorcallback) {
    
    var fs = require('fs');
    var tmp_path = options.filepath;
    var utils = require('yourttoo.common').utils;
    var filename = utils.getToken() + '.' + utils.getfileextension(tmp_path);
    var target_path = options.targetpath + filename;
    utils.copyfile(tmp_path, target_path, function (err) {
        var rs = {
            ResultOK: (err == null),
            Message: err,
            sourcefile: tmp_path,
            targetfile: target_path
        };
        callback(rs);
    });
}