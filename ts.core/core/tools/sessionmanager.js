
var sessionManager;
var omtcore = require('../core');

sessionManager = function ()
{
    this.sessions = new Array();

    sessionManager.prototype.updateSession = function (loginsession, callback)
    {
        if (omtcore.get('sessionstorage') == 'full') {
            loginsession.save(function (err, docs) {
                omtcore.list('LoginSessions').model
                    .find({ _id: docs.id })
                    .populate('user')
                    .populate('traveler')
                    .populate('dmc')
                    .exec(function (err, logins) {
                        callback(logins[0]);
                    });
            })
        }
        else {
            callback(this);
        }
    }

    sessionManager.prototype.recoverSessionByToken = function (token, callback)
    {
        omtcore.list('LoginSessions').model
                    .find({ token: token })
                    .populate('user')
                    .populate('traveler')
                    .populate('dmc')
                    .exec(function (err, logins) {
                        callback(logins[0]);
                    });
    }

    sessionManager.prototype.recoverSessionByEmail = function (email, callback) {
        omtcore.list('Users').model
            .find({ email: email })
            .exec(function (err, users)
            {
                var foo = users[0];
                omtcore.list('LoginSessions').model
                    .find({ user: foo.id })
                    .populate('user')
                    .populate('traveler')
                    .populate('dmc')
                    .exec(function (err, logins) {
                        callback(logins[0]);
                    });

            });

        
    }
}

module.exports.sessionManager = sessionManager;