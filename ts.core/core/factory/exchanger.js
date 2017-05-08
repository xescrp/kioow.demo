var common = require('yourttoo.common');

module.exports.getonlinecurrentexchanges = function (date, callback) {
    var url = 'http://api.fixer.io/'; //yyyy-mm-dd || latest
    date == null ? url += 'latest' : [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');//api.fixer.io/2000-01-03

    var cnx = require('yourttoo.connector');
    var htt = require('yourttoo.connector').httpconnector.HTTPConnector;
    var rqcn = new htt();
    var cn = rqcn.get({ url: url });

    cn.on('request.done', function (content) {
        callback(JSON.parse(content));
    });

    cn.on('request.error', function (err) {
        console.error(err);
        cev.emit('users.data', c);
    });

}

module.exports.savecurrentexchanges = function (path, exchanges, callback) {
    var fs = require('fs');
    exchanges != null ?
        setImmediate(function () {
            fs.writeFile(path, JSON.stringify(exchanges, null, '\n'), function (err) {
                callback((err == null));
            });
            
        }) :
        setImmediate(function () { callback(false) });
}

module.exports.recovercurrentexchanges = function (path, callback) {
    var fs = require('fs');
    fs.readFile(path, function (err, data) {
        if (err != null) { throw err }
        callback(JSON.parse(data));
    });

}