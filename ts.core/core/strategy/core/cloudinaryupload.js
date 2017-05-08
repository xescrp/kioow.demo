
module.exports = function (options, callback, errorcallback) {
    
    var cloudinary = require('cloudinary');
    
    cloudinary.config(options.cloudinaryconfig);
    cloudinary.uploader.upload(options.imagepath, function (result) {
        if (callback) {
            callback(result);
        }
    });
}