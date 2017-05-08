



(function(define) {

"use strict";

define(function(require, exports){
    var filemgr;
    var fs = require('fs');
    var conf = require('nconf');
    var files = require('../routes/filepaths').filepaths;

    conf.env().file({ file: files.configurationfile });

    
    filemgr = function()
    {
        this.filemgrversion = '1.1';

        filemgr.prototype.cloudinaryUpload = function (imagefile, callback) {
            var omtcore = require('../core');
            var cloudinary = require('cloudinary');

            cloudinary.config(omtcore.get('cloudinaryconfig'));
            cloudinary.uploader.upload(imagefile, function (result) {
                if (callback) {
                    callback(result);
                }
            });

        }

        filemgr.prototype.write = function (filepath, buffer, onwritefinishhandler) {
            fs.open(filepath, 'w', function (err, fd) {
                if (err) throw err;
                var buf = new Buffer(buffer);
                fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
                    if (err) throw err;
                    console.log(err, written, buffer);
                    fs.close(fd, function () {
                        console.log('Done');
                        if (onwritefinishhandler) {
                            onwritefinishhandler(fd);
                        }
                    });
                });
            });
        }

        filemgr.prototype.read = function (filepath, onreadfinishhandler) {
            fs.open(filepath, 'r', function (err, fd) {
                if (err) throw err;
                var stat = fs.statSync(filepath);
                var buf = new Buffer(stat.size);
                fs.read(fd, buf, 0, buf.length, null, function (err, bytesRead, buffer) {
                    if (err) throw err;
                    console.log(err, bytesRead, buffer);
                    fs.close(fd, function () {
                        console.log('Done');
                        if (onreadfinishhandler) {
                            onreadfinishhandler(buffer);
                        }
                    });
                });
            });
        }

        filemgr.prototype.writeText = function (filepath, data, onwritefinishhandler) {
            fs.writeFile(filepath, data, function (err) {
                if (err) throw err;
                //console.log('File write completed');
                if (onwritefinishhandler) {
                    onwritefinishhandler();
                }
            });
        }

        filemgr.prototype.appendText = function (filepath, data, onappendfinishhandler) {
            fs.appendFile(filepath, data, function (err) {
                if (err) throw err;
                //console.log('The data was appended to file!');
                if (onappendfinishhandler) {
                    onappendfinishhandler();
                }
            });
        }

        filemgr.prototype.readText = function (filepath, onreadfinishhandler) {
            fs.readFile(filepath, 'utf8', function (err, data) {
                if (err) { console.log(err); }
                if (onreadfinishhandler) {
                    onreadfinishhandler(data);
                }
            });
        }

        filemgr.prototype.createDirectory = function (directorypath) {
            if (!fs.existsSync(directorypath)) {
                fs.mkdirSync(directorypath);
            }
        }

        filemgr.prototype.delete = function (filepath, callback) {
                fs.unlink(filepath, function (err) {
                    if (err) {
                        callback(err);
                    } else { 
                        callback();
                    }
                });
        }
    }  



    module.exports.filemgr = filemgr;
});
})(
  typeof define === 'function' && define.amd ? define : function (factory) { factory(require, exports); }
);