module.exports = function (conf, callback) {
    //file helpers...
    var fs = require('fs');
    //check file exists...
    function fileExists(filepath, callback) {
        fs.access(filepath, fs.F_OK, function (err) {
            err != null ? callback(false) : callback(true);
        });
    }
    //pooling checkin for file exists.. if not, then run outputhandler
    function poolchecker(filepath, outputhandler) { 
        fileExists(filepath, function (exists) {
            exists ? 
            setImmediate(function () { 
                //we just have to wait...
                setTimeout(function () { poolchecker(filepath, outputhandler); }, 1000);
            }) : 
            setImmediate(function () { 
                //dir not locked...
                outputhandler();
            });
        })
    }

    var path = require('path');

    var templatepath = 'gruntconfigtemplate.js';
    var common = require('yourttoo.common');
    var taskpath = conf.workingpath + 'tasks';

    var localfilepath = module.filename.toLowerCase();
    var currfilename = path.basename(localfilepath);
    var gruntfilename = common.utils.getToken() + '.js';
    templatepath = common.utils.replaceAll(localfilepath, currfilename, templatepath); //normalize path -> backslashes

    fs.readFile(templatepath, 'utf8', function (err, data) {
        err != null ? 
        setImmediate(function () {
            console.error(err);
            conf.results.errors.push(err);
            callback(err, conf);
        }) : setImmediate(function () {
            var scsstemplate = data;
            scsstemplate = common.utils.replaceAll(scsstemplate, '%inputsass%', '\"' + conf.SASSfile + '\"');
            scsstemplate = common.utils.replaceAll(scsstemplate, '%outputcss%', '\"' + conf.CSSfile + '\"');
            var gruntfile = [taskpath, gruntfilename].join('/');
            
            poolchecker(gruntfile, function () { 
                fs.writeFile(gruntfile, scsstemplate, function (err2) {
                    err2 != null ? 
                setImmediate(function () {
                        conf.results.errors.push(err2);
                        console.error(err2);
                        callback(err2, conf);
                    }) : 
                setImmediate(function () {
                        conf.gruntfile = gruntfile;
                        conf.results.messages.push('grunt config file created: ' + gruntfile);
                        callback(null, conf);
                    });
                });
            });

        });
        
    });
}