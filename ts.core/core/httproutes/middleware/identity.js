var identityMW = function (req, res, next) {
    var _ = require('underscore');

    function _nocheck_rules() {
        var filterpaths = ['/auth/', '/help'];
        var rules = [
            function () { // 1. rule 1 #Excluded paths# - check route is excluded
                var filtered = _.filter(filterpaths, function (fpath) { return req.path.indexOf(fpath.toLowerCase()) > -1; });
                return (filtered != null && filtered.length > 0);
            }
        ];
        //run the rules...
        return _.every(rules, function (rule) { 
            return rule();
        });
    }

    //check if we can bypass the request, or load the credentials into the request...
    _nocheck_rules() ?  next() : setImmediate(function () {  
        if (req.headers != null && req.headers.userid != '' && req.headers.accesstoken != '') {
            req.ytosession = {
                userid: req.headers.userid,
                accessToken: req.headers.accesstoken
            };
            next();
        } else { 
            res.status(500).send('set your credentials on your request header : userid and accesstoken');
        }
    });
};

module.exports.identityMW = identityMW;