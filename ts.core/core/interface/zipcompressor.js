
var zlib = require('zlib');


//compress method...
function deflate(item, callback) {
    var streamtosave = JSON.stringify(item);
    zlib.deflate(streamtosave, function (err, buffer) { 
        if (err) {
            console.log(err);
            throw err;
        }

        var rs = buffer.toString('base64');
        callback(rs);
    });
}
//uncompress method...
function unzip(jsonstring, callback) {
    var buffer = new Buffer(jsonstring, 'base64');
    zlib.unzip(buffer, function (err, rtbuffer) { 
        if (err) {
            console.log(err);
            throw err;
        }
        var item = JSON.parse(rtbuffer.toString());
        callback(item);
    });
}


//The call...
module.exports = function (method, item, callback) {
    switch (method) {
        case 'deflate': deflate(item, function (result) {
                callback(result);
            }); break;
        case 'unzip': unzip(item, function (result) {
                callback(result);
            }); break;
        default : return null; break;
    }
}