module.exports = function (req, res, next) {
    var storagestackname = 'sessionswitcher';
    if (req.session.sessionswitcher == null) {
        req.session.sessionswitcher = {
            activated: false,
            enabled: (req.session.login != null && req.session.login.user != null && req.session.login.user.isAdmin),
            recoverkey: '',
            redirectto: req.header('Referer'),
            switchedsession: null,
            switchcandidate: null,
            savecurrentsession: function () {
                var _this = this;
                var currentsession = req.session.login;
                _this.recoverkey = req.session.login.user.email;
                _this.switchedsession = req.session.login;
                _this.activated = true;
            },
            recovercurrentsession: function () {
                var _this = this;
                var currentsession = req.session.login;
                _this.switchedsession != null && _this.switchedsession.user != null ?
                    (req.session.login = JSON.parse(JSON.stringify(_this.switchedsession)), _this.switchedsession = null, _this.activated = false) : null;
            }
        }
        next();
    } else { req.session.sessionswitcher.redirectto = req.header('Referer'); next(); }
}