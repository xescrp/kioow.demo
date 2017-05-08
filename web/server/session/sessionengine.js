
var sessionEngine = function (req, res, next) {
    var _ = require('underscore');
    function _redirect_rules() {
        var _rt = null;
        //nosessionpaths = ['', '/'];
        //_rt = (req.path != '/' && req.path != '' && req.omtsession == null) ?
        //    '/private?redirecturl=' + url :
        //    req.omtsession != null && ((req.omtsession.user.isAdmin || (req.omtsession.user.isAffiliate && req.omtsession.affiliate.membership.registervalid))) ? null : '/account-invalid';
        return _rt;
    }
    function setrole(user) {
        var keys = ['isAdmin', 'isTraveler', 'isAffiliate', 'isDMC'];
        var t = _.pick(user, function (value, key, object) {
            return (value == true && keys.indexOf(key) >= 0);
        });
        var tt = _.map(_.keys(t), function (k) {
            return k.toLowerCase().replace('is', '');
        });
        var rname = tt != null && tt.length > 0 ? tt[0] : null;
        user.rolename = rname;
        console.log('user role set up');
    }
    
    var session = null;
    var filterpaths = ['/img/', '/css/', '/fonts/', '/partials/', '/sass/', '/datadummy/', '/account-invalid', '/private', '/js/'];
    var filtered = _.filter(filterpaths, function (fpath) { return req.path.indexOf(fpath.toLowerCase()) > -1; });
    //if ((req.path.indexOf('/img/') > -1) || 
    //    (req.path.indexOf('/css/') > -1) ||
    //    (req.path.indexOf('/fonts/') > -1) || 
    //    (req.path.indexOf('/partials/') > -1) ||
    //    (req.path.indexOf('/sass/') > -1) ||
    //    (req.path.indexOf('/datadummy/') > -1) ||
    //    (req.path.indexOf('/account-invalid') > -1) ||
    //    (req.path.indexOf('/js/') > -1)) {
    //    next();
    //}
    if (filtered != null && filtered.length > 0) { 
        next();
    }
    else {
        req.session.currentcurrency = req.session.currentcurrency != null && req.session.currentcurrency != '' ? req.session.currentcurrency : 'EUR';
        (req.session != null && req.session.login != null && req.session.login.user != null && (req.session.login.user.rolename == null || req.session.login.user.rolename == '')) ? setrole(req.session.login.user) : null;
        req.omtsession = (req.session != null && req.session.login != null) ? req.session.login : req.app.locals.ytologin;
        req.session.ytologin = (req.session != null && req.session.login != null) ? req.session.login : req.app.locals.ytologin;

        var config = req.app.get('ytoapiconfig');
        if (config.useanonymous && req.app.locals.ytologin != null) {
            req.session.ytologin = req.app.locals.ytologin;
            req.omtsession = req.app.locals.ytologin;
        }
        req.app.locals.externallogin != null ? req.omtsession.agencyid = req.app.locals.externallogin.agencyid : null;
        req.loginsession = req.omtsession;
        var url = encodeURIComponent(req.originalUrl);
        var imadmin = (req.omtsession != null && req.omtsession.user.isAdmin);
        var redirection = imadmin ? null : _redirect_rules();
        
        console.log('redirect to -> %s', redirection);
        (redirection===null) ? next() : res.redirect(redirection);
    }
};

module.exports.sessionEngine = sessionEngine;