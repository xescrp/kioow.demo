
var hours = 2;
var timeinterval = hours * ((60 * 60) * 1000);
var renewinterval = null;

module.exports.dologin = function (app, follow) {
    var _ = require('underscore');
    
    var config = app.get('ytoapiconfig');

    if (config.useanonymous) {
        var cnx = require('yourttoo.connector');
        console.log(cnx);
        var ytoclient = cnx.createAPIConnector(config);

        var sessionrequest = {
            query: { slug: config.anonymousdmc.slug }
        };

        sessionrequest.oncompleteeventkey = 'buildsession.done';
        sessionrequest.onerroreventkey = 'buildsession.error';
        console.log(sessionrequest);

        var rqlgn = {
            command: 'buildsession',
            request: sessionrequest,
            service: 'membership'
        };

        console.log('sending building session request to yto - omt');
        var rq = ytoclient.send(rqlgn);

        rq.on(sessionrequest.oncompleteeventkey, function (result) {
            if (result != null) {
                app.locals.ytologin = result.Session;
                //req.session.ytologin = result.Session;
            }
            if (follow != null) { follow(result.session); }
        });

        rq.on(sessionrequest.onerroreventkey, function (err) {
            console.log(err);
            if (follow != null) { follow(new Error(err)); }
        });

        rq.on('api.error', function (err) {
            console.log(err);
            if (follow != null) { follow(new Error(err)); }
        });
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            if (follow != null) { follow(new Error(tout)); }
        });

        return rq;
    } else {
        app.locals.ytologin = null;
    }

}

module.exports.enablesession = function (req, res, next) {
    var _ = require('underscore');

    var app = req.app;
    var ytoclient = app.get('ytoconnector');
    var config = app.get('ytoapiconfig');


    if (config.useanonymous) {
       

        var filterpaths = ['/no-home', '/img/', '/css/', '/fonts/', '/partials/', '/sass/', '/datadummy/', '/account-invalid', '/private', '/js/', '/pdfpartial'];
        var filtered = _.filter(filterpaths, function (fpath) { return req.path.indexOf(fpath.toLowerCase()) > -1; });

        function renewsession(follow) {
            req.session.renewonprocess = true;
            var sessionrequest = {
                email: config.anonymousdmc.email,
                password: config.anonymousdmc.password,
            };

            sessionrequest.oncompleteeventkey = 'login.done';
            sessionrequest.onerroreventkey = 'login.error';
            console.log(sessionrequest);

            var rqlgn = {
                command: 'login',
                request: sessionrequest,
                service: 'membership'
            };

            console.log('sending building session request to yto - omt');
            var rq = ytoclient.send(rqlgn);

            rq.on(sessionrequest.oncompleteeventkey, function (result) {
                req.session.renewonprocess = false;
                if (result != null) {
                    req.session.ytologin = result.Session;
                }
                if (follow != null) { follow(); }
            });

            rq.on(sessionrequest.onerroreventkey, function (err) {
                console.log(err);
                req.session.renewonprocess = false;
                //the sign up is not success
                req.session.ytologin = null;
                if (follow != null) { return follow(new Error(err)); }
            });

            rq.on('api.error', function (err) {
                console.log(err);
                req.session.renewonprocess = false;
                if (follow != null) { return follow(new Error(err)); }
            });
            rq.on('api.timeout', function (tout) {
                console.log(tout);
                req.session.renewonprocess = false;
                if (follow != null) { return follow(new Error(err)); }
            });

            return rq;
        }
        if (renewinterval == null) {
            renewinterval = setInterval(renewsession, timeinterval);
        }
        //set environment...

        //call the session
        setImmediate(function () {
            if (filtered != null && filtered.length > 0) {
                next();
                //continue.. 
            } else {
                !(req.session.renewonprocess) && (req.session.ytologin == null) ? setImmediate(function () {
                    console.log('renew session...' + req.path);
                    renewsession(next);
                }) : next();
            }
        });
            
    } else {
        setImmediate(function () { next(); });
    }
}

