module.exports = function (conf, callback) {

    conf.downshash = {

    };

    conf.uploadfile = function (targetpath) {
        var common = require('yourttoo.common');
        var hashdest = common.utils.slug(targetpath);
        var cloudinary = require('cloudinary');
        var cevup = common.eventtrigger.eventcarrier(common.utils.getToken());
        var cloudconfig = {
            prefix: "yto",
            cloud_name: "openmarket-travel",
            api_key: "132679458498144",
            api_secret: "veAU6c6z7Xwt7emYsBa7_H0kLW4"
        };
        cloudinary.config(cloudconfig);
        console.log('uploading to cloudinary...');
        cloudinary.uploader.upload(targetpath, function (result) {
            console.log('uploaded to cloudinary...');
            conf.downshash[hashdest].cloud = result;
            cevup.emit(targetpath + '.uploaded', result);
        }, { tags: 'booking,docs' });
        return cevup;
    }

    conf.downloadfile = function (url, filename) {
        var common = require('yourttoo.common');
        var downloadbasepath = 'C:/yourttoo.work/downloads';

        return (function (url, filename) {
            var cevdown = common.eventtrigger.eventcarrier(common.utils.getToken());
            var http = require('http');
            var fs = require('fs');
            var retry = 2;
            var tout = false;
            var download = function (url, cdown, cb) {
                tout = false;
                var dest = [downloadbasepath, filename].join('/');
                var hashdest = common.utils.slug(dest);
                try {

                    var timeout_wrapper = function (req) {
                        return function () {
                            console.log('time out on request...' + url);
                            tout = true;
                            req.abort();
                            //try again 
                            console.log('try again...' + url);
                            retry--;
                            retry > 0 ? download(url, cevdown) : cdown.emit(filename + '.error', 'Cant download file...' + url + ' no more retries, timeout!');
                        };
                    };

                    var file = fs.createWriteStream(dest);
                    var request = http.get(url, function (response) {
                        response.pipe(file);
                        file.on('finish', function () {
                            clearTimeout(timeout);
                            file.close(cb);  // close() is async, call cb after close completes.
                            conf.downshash[hashdest] = {
                                name: filename,
                                url: url,
                                cloud: null
                            };
                            cdown.emit(filename + '.downloaded', dest);
                        });
                    }).on('error', function (err) { // Handle errors
                        clearTimeout(timeout);
                        fs.unlink(dest); // Delete the file async. (But we don't check the result)
                        if (cb) cb(err.message);
                        tout ? null : cdown.emit(filename + '.error', err);
                    });
                }
                catch (err) {
                    clearTimeout(timeout);
                    cdown.emit(filename + '.error', err);
                }
                // generate timeout handler
                var fn = timeout_wrapper(request);
                // set initial timeout
                var timeout = setTimeout(fn, 10000);
            };
            download(url, cevdown);
            
            return cevdown;
        })(url, filename);
    };

    conf.currentcurrency = 'EUR';
    conf.errors = [];
    conf.reports = [];
    conf.messages = [];
    setImmediate(function () {
        callback(null, conf);
    });
}