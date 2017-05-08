module.exports = function (options, callback, errorcallback) {

    var common = require('yourttoo.common');
    var booking = options.booking;
    var urlparser = require('url');
    var cev = options.eventcarrier;
    var antipattern = '/resources/file';
    
    function rewriteurl(url, filetype) {
        url = url.toLowerCase();
        
        if (url.indexOf(antipattern < 0)) {
            var prs = url.indexOf('http:') == 0 ? urlparser.parse(url, true) : { query: { file: url, type: filetype } };
            prs.query.type = prs.query.type || filetype;
            var params = ['file=' + prs.query.file, 'type=' + prs.query.type].join('&');
            url = [antipattern, params].join('?');
        }
        console.log(url);
        return url;
    }
    //pattern ?file=%1%&type=%2%   != /resources/file ... 
    if (booking != null) {
        booking.voucherFile = !common.utils.stringIsNullOrEmpty(booking.voucherFile) ? 
        rewriteurl(booking.voucherFile, 'voucherclient'): booking.voucherFile;
        booking.invoiceProviderFile = !common.utils.stringIsNullOrEmpty(booking.invoiceProviderFile) ? 
        rewriteurl(booking.invoiceProviderFile, 'invoiceprovider'): booking.invoiceProviderFile;
        
        setImmediate(function () {
            options.booking = booking;
            callback != null ? callback(options) : null;
            cev != null ? cev.emit('bookingfileurlfixer.done', options) : null;
        });
    } else { 
        setImmediate(function () {
            callback != null ? callback(options) : null;
            cev != null ? cev.emit('bookingfileurlfixer.done', options) : null;
        });
    }

    return options;
}