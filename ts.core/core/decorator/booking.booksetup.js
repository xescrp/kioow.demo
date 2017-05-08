var common = require('yourttoo.common');
var _ = require('underscore');

module.exports = function (options, callback, errorcallback) {
    var bookingmodel = options.bookingmodel;
    var bookhandler = require('./booksetup')(bookingmodel);
    bookhandler(options, 
        function (book) { 
        callback(book);
    }, 
        function (err) { 
        errorcallback(err);
    });
}