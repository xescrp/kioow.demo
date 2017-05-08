module.exports = function (options, callback, errorcallback) { 
    var membership = options.membership;
    var userid = options.userid;
    var token = options.accesstoken;
    var annex = require('./helpers');
    console.log(options);

    annex.validateAccessToken(membership, userid, token, function (rs) {
        var result = {
            userid: userid, 
            accesstoken: token,
            valid: rs,
            date: new Date()
        };
        if (rs) {
            callback(result);
        }
        else { 
            errorcallback(result);
        }
    });

}