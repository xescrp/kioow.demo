var wwwredirect = function (req, res, next) {
    var isWWW = false; //Xisco say: SET THIS TO FALSE ON LOCAL OR TEST ENVIRONMENTS
    var hostname = '';
    
    if (isWWW) {
        if (req.headers != null && req.headers.host != '') {
            hostname = req.headers.host;
            var dummy = req.headers.host;
            dummy = dummy.toLowerCase();
            dummy = dummy.slice(0, 4);
            if (dummy === 'www.') {
                next();
            } else {
                console.log('redirecting to www');
                return res.redirect(301, req.protocol + '://www.' + hostname + req.originalUrl);
            }
        }
        else { 
            next();
        }
    } else { 
        next();
    }
}
module.exports.wwwredirect = wwwredirect;