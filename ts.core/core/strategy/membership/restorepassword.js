
module.exports = function (options, callback, errorcallback) {
    var membership = options.membership;
    var email = options.email;
    var password = options.key;

    membership.mongo.findone({ collectionname: 'Users', query: { email: email } }, function (result) {
        if (result != null && result.ResultOK) {
            console.log(result.Data);
            var user = result.Data;
            if (user != null) {
                user.password = password;
                user.save(function (err, doc) { 
                    (err != null) ? errorcallback(err) : callback({ ResultOK: true, Message: 'Password changed' });
                });
            }
            else { 
                errorcallback({ ResultOK: false, Message: 'ERROR: no user found...' });
            }
        } else { 
            errorcallback(result);
        }
    });
}
