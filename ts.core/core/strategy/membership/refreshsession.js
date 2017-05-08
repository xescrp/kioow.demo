module.exports = function (options, callback, errorcallback) {
    var membership = options.membership;
    var userid = options.userid;
    
    var annex = require('./helpers');
    console.log(options);
    
    annex.recoverCredentials({ membership: membership, userid: userid }, function (member) {
        if (member != null) {
            var session = annex.buildSession(member.user, member);
            callback(session);
        }
        else {
            errorcallback('Something went wrong...');
        }
    }, function (err) {
        errorcallback(err);
    });

}