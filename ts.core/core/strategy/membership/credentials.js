module.exports = function (options, callback, errorcallback) { 
    var membership = options.membership;
    var userid = options.userid;
    
    var annex = require('./helpers');
    console.log(options);

    annex.recoverCredentials({ membership: membership, userid: userid }, function (rs) {
        if (rs) {
            callback(rs);
        }
        else {
            errorcallback('Something went wrong...');
        }
    }, function (err) { 
        errorcallback(err);
    });

}