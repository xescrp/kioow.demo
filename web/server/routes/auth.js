'use strict';

module.exports = function (app) {
    var swig = require('swig');
    //internal WebServer Session Management
    app.get('/auth/recoverSession', function (req, res) {
        if (req.session != null && req.session.ytologin != null) {
            res.send(req.session.ytologin);
        } else { 
            res.send(null);
        }
    });
    
    app.post('/auth/recoverSession', function (req, res) {
        if (req.session != null && req.session.ytologin != null) {
            res.send(req.session.ytologin);
        } else {
            res.send(null);
        }
    });
    
    app.get('/auth/refreshsession', function (req, res) {
        if (req.session != null && req.session.ytologin != null) {
            var refreshrequest = {
                command: 'refreshsession',
                service: 'membership',
                request: {
                    userid: req.session.ytologin.user._id,
                    oncompleteeventkey : 'refreshsession.done',
                    onerroreventkey : 'refreshsession.error'
                }
            }
            var auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
            refreshrequest.auth = auth;

            var rq = req.ytoconnector.send(refreshrequest);
            rq.on(refreshrequest.request.oncompleteeventkey, function (result) {
                console.log(result);
                //the login is success
                if (result != null) {
                    req.session.ytologin = result.Session;
                    res.send(result.Session);
                }
                else {
                    res.status(500).send('empty response from api');
                }
            });
            
            rq.on(refreshrequest.request.onerroreventkey, function (err) {
                console.log(err);
                //the sign up is not success
                res.status(500).send(err);
            });
            
            rq.on('api.error', function (err) {
                console.log(err);
                res.status(500).send(err);
            });
            rq.on('api.timeout', function (tout) {
                console.log(tout);
                res.status(500).send(tout);
            });

        } else {
            res.send(null);
        }
    });
    
    app.post('/auth/refreshsession', function (req, res) {
        if (req.session != null && req.session.ytologin != null) {
            console.log('lets refresh session...');
            var refreshrequest = {
                command: 'refreshsession',
                service: 'membership',
                request: {
                    userid: req.session.ytologin.user._id,
                    oncompleteeventkey : 'refreshsession.done',
                    onerroreventkey : 'refreshsession.error'
                }
            }
            var auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
            refreshrequest.auth = auth;

            var rq = req.ytoconnector.send(refreshrequest);
            rq.on(refreshrequest.request.oncompleteeventkey, function (result) {
                console.log(result);
                //the login is success
                if (result != null) {
                    req.session.ytologin = result.Session;
                    res.send(result.Session);
                }
                else {
                    res.status(500).send('empty response from api');
                }
            });
            
            rq.on(refreshrequest.request.onerroreventkey, function (err) {
                console.log(err);
                //the sign up is not success
                res.status(500).send(err);
            });
            
            rq.on('api.error', function (err) {
                console.log(err);
                res.status(500).send(err);
            });
            rq.on('api.timeout', function (tout) {
                console.log(tout);
                res.status(500).send(tout);
            });

        } else {
            res.send(null);
        }
    });
    
    app.get('/auth/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(null);
            }
            else {
                res.send(null);
            }
        })
    });

    
    app.post('/auth/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(null);
            }
            else {
                res.send(null);
            }
        })
    });

    //YourTTOO - BACKBONE way Request
    app.post('/auth/logIn', function (req, res) {
        var loginrequest = req.body;
        console.log(loginrequest);
        loginrequest.environment = 'yourttoo';
        loginrequest.oncompleteeventkey = 'login.done';
        loginrequest.onerroreventkey = 'login.error';
        var rqlgn = {
            command: 'login',
            request: loginrequest,
            service: 'membership',
        };
        var rq = req.ytoconnector.send(rqlgn);
        rq.on(loginrequest.oncompleteeventkey, function (result) {
            console.log(result);
            //the login is success
            if (result != null) {
                req.session.login = result.Session;
                req.session.sessionswitcher != null ? req.session.sessionswitcher.enabled = (req.session.login != null && req.session.login.user != null && req.session.login.user.isAdmin) : null;
                res.send(result.Session);
            }
            else { 
                res.status(500).send('empty response from api');
            }
        });
        
        rq.on(loginrequest.onerroreventkey, function (err) {
            console.log(err);
            //the sign up is not success
            res.status(500).send(err);
        });
        
        rq.on('api.error', function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(500).send(tout);
        });

    });
    
    app.post('/auth/validatetoken', function (req, res) {
        
        var validaterequest = {
            userid: '',
            accesstoken: ''
        };
        var sess = req.session.ytologin;
        validaterequest.environment = 'yourttoo';
        validaterequest.userid = sess.user._id;
        validaterequest.accesstoken = sess.accessToken;
        validaterequest.oncompleteeventkey = 'validatetoken.done';
        validaterequest.onerroreventkey = 'validatetoken.error';
        var rqlgn = {
            command: 'validatetoken',
            request: validaterequest,
            service: 'membership',
        };
        var rq = req.ytoconnector.send(rqlgn);
        rq.on(validaterequest.oncompleteeventkey, function (result) {
            console.log(result);
            //the validation is success
            res.send(result);
        });
        
        rq.on(validaterequest.onerroreventkey, function (err) {
            console.log(err);
            //the sign up is not success
            res.status(500).send(err);
        });
        
        rq.on('api.error', function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(500).send(tout);
        });

    });
    
    app.post('/auth/signup', function (req, res) {
        var signuprequest = req.body;
        signuprequest.environment = 'yourttoo';
        signuprequest.oncompleteeventkey = 'signup.done';
        signuprequest.onerroreventkey = 'signup.error';
        
        var rqsgn = {
            command: 'signup',
            request: signuprequest,
            service: 'membership',
        };
        
        var rq = req.ytoconnector.send(rqsgn);
        
        rq.on(signuprequest.oncompleteeventkey, function (result) {
            console.log(result);
            //the sign up is success
            req.session.login = result.Session;
            res.send(result.Session);
        });
        
        rq.on(signuprequest.onerroreventkey, function (err) {
            console.log(err);
            //the sign up is not success
            res.status(500).send(err);
        });
        
        rq.on('api.error', function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(500).send(tout);
        });

    });

    app.post('/auth/external', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        var loginrequest = req.body;
        console.log(loginrequest);

        res.set('Content-Type', 'text/html');

        //var tmpl = swig.compileFile(filepaths.affiliate.externallogin);

        loginrequest.oncompleteeventkey = 'login.done';
        loginrequest.onerroreventkey = 'login.error';
        var rqlgn = {
            command: 'login',
            request: loginrequest,
            service: 'membership',
        };
        var rq = req.ytoconnector.send(rqlgn);

        rq.on(loginrequest.oncompleteeventkey, function (result) {
            console.log(result);
            //the login is success
            if (result != null) {
                req.session.externallogin = result.Session;
                if (req.query.agencyid != null) {
                    req.session.externallogin.agencyid = req.query.agencyid;
                    req.session.login = req.session.login || result.Session;
                } else {
                    req.session.login = result.Session;
                    //req.omtsession = result.Session;
                    req.session.externallogin = result.Session;
                }
                res.redirect('/inicio');
            }
            else {
                //content.message = 'empty response from api';
                //content.error = 'empty';
                // var renderedHtml = tmpl(content);
                // res.status(500).send(renderedHtml);
                next(new Error('your credentials are wrong'));
            }
        });

        rq.on(loginrequest.onerroreventkey, function (err) {
            console.log(err);
            //the sign up is not success
            //content.message = err;
            //content.error = 'errorlogin';
            next(new Error(err));
            // var renderedHtml = tmpl(content);
            // res.status(500).send(renderedHtml);
        });

        rq.on('api.error', function (err) {
            console.log(err);
            //content.message = err;
            //content.error = 'errorapi';
            // var renderedHtml = tmpl(content);
            // res.status(500).send(renderedHtml);
            next(new Error(err));
        });
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            //content.message = tout;
            //content.error = 'timeout';
            // var renderedHtml = tmpl(content);
            // res.status(500).send(renderedHtml);
            next(new Error(err));
        });

    });

    app.get('/auth/redirectsession', function (req, res, next) {
        var slugaffi = req.query.slug;
        var redirectto = req.session.sessionswitcher.redirectto || req.query.redirectto;

        res.set('Content-Type', 'text/html');

        var sessionrequest = {
            query: { slug: slugaffi }
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
        var rq = req.ytoconnector.send(rqlgn);

        rq.on(rq.request.oncompleteeventkey, function (result) {
            console.log(result);
            //the login is success
            if (result != null) {
                req.session.sessionswitcher.switchedsession = JSON.parse(JSON.stringify(req.session.login));
                req.session.sessionswitcher.activated = true;
                req.session.login = JSON.parse(JSON.stringify(result.Session));
                console.log('switched: ', req.session.sessionswitcher.switchedsession);
                setImmediate(function () {
                    res.redirect(redirectto);
                });
            }
            else {
                res.status(500).send('empty response from api');
            }
        });

        rq.on(rq.request.onerroreventkey, function (err) {
            console.log(err);
            //the sign up is not success
            res.status(500).send(err);
        });

        rq.on('api.error', function (err) {
            console.log(err);
            res.status(500).send(err);
        });
        rq.on('api.timeout', function (tout) {
            console.log(tout);
            res.status(500).send(tout);
        });

    });

    app.get('/auth/switchadmin', function (req, res, next) {
        req.session.login = JSON.parse(JSON.stringify(req.session.sessionswitcher.switchedsession));
        req.session.sessionswitcher.activated = false;
        req.session.sessionswitcher.candidate = null;
        var redirectto = req.session.sessionswitcher.redirectto || req.query.redirectto;
        console.log(req.session.login);
        setImmediate(function () {
            res.redirect(redirectto);
        });
    });
}