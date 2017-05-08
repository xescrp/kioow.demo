module.exports = function (options, callback, errorcallback) {
    var user = options.document;
    var allowedmodels = ['Users']
    var modelname = (user != null && user.list != null && user.list.model != null) ? user.list.model.modelName : options.modelname;
    var loggeduser = options.loggeduser;

    if (allowedmodels.indexOf(modelname) >= 0) {
        delete user['password'];
        if (!loggeduser.user.isAdmin) {
            delete user['facebook'];
            delete user['google'];
            delete user['twitter'];
            delete user['isLocal'];
            delete user['isFacebookLinked'];
            delete user['isTwitterLinked'];
            delete user['isGoogleLinked'];
        }
    }

    return user;
}