module.exports = function (app) {
    //Middleware Common... [headers response, ssl check, bypass OPTIONS, deny GET requests]
    app.all('*', function (req, res, next) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "OMTToken, X-File-Size, Origin, X-Requested-With, Content-Type, ytoUserId, ytoAccessToken, " + 
            "Accept, Methods, Access-Control-Allow-Origin, Access-Control-Allow-Methods");
        next();
    });
    
    app.all('*', function (req, res, next) { 
        if (app.restconfiguration.ssl.enabled) {
            if (req.secure) {
                next();
            } else { 
                res.status(500).send('call API with https://!');
            }
        } else { 
            next();
        }
    });

    app.all('*', function (req, res, next) { 
        //bypass the options requests...
        if (req.method == 'OPTIONS') {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
    
    app.all('*', function (req, res, next) { 
        //lock the GET method requests...
        if (req.method == 'GET') {
            res.status(500).send('You must call API with POST method!');
        }
        else {
            //to the next middleware...
            next();
        }
    });
    
    app.all('*', function (req, res, next) {
        //set the response method for auto convert..
        res.apiresponse = function (result) {
            var rsp = result;
            if (req.get('Accept') == 'application/xml' || req.get('Accept') == 'application/xhtml+xml') {
                var js2xmlparser = require("js2xmlparser");
                rsp = js2xmlparser("results", result);
            }
            res.send(rsp);
        };
        next();
    });

    //YourTTOO - MEMBERSHIP way Request
    app.post('/auth/login', function (req, res) {
        var loginrequest = req.body;

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
            req.session.login = result.Session;
            res.apiresponse({ userid: result.Session.userid, accessToken: result.Session.accessToken });
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
    
    
    app.post('/no.api/:apicommand', function (req, res) {
        var request = req.body;
        var command = req.params.apicommand;

        var hookprev = {
            request: request,
            command: command,
            auth: req.ytosession,
            execute: 'prev',
            service: 'core',
            ytoapiconnector: req.ytoconnector
        };

        var hooker = require('./hooks');
        var hookhanlder = hooker(hookprev);
        
        hookhanlder.on('hook.done', function (reqfixed) { 
            reqfixed.oncompleteeventkey = command + '.done';
            reqfixed.onerroreventkey = command + '.error';
            
            var rqCMD = {
                command: command,
                request: reqfixed,
                service: 'core',
                auth: req.ytosession
            };

        });
        hookhanlder.on('hook.error', function (err) {
            
        });

        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: req.ytocommand,
            request: req.ytorequest,
            service: 'core',
        };
        
        if (req.ytosession != null) {
            var auth = {
                userid: req.ytosession.userid,
                accessToken: req.ytosession.accessToken
            };
            rqCMD.auth = auth;
        }
        
        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            //request success
            res.apiresponse(result);
        });
        
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            //request is not success
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
    


    //YourTTOO - BACKBONE way Request
    app.post('/api/:apicommand', function (req, res) {
        var request = req.body;
        var command = req.params.apicommand;

        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: req.ytocommand,
            request: req.ytorequest,
            service: 'core',
        };
        
        if (req.ytosession != null) {
            var auth = {
                userid: req.ytosession.userid,
                accessToken: req.ytosession.accessToken
            };
            rqCMD.auth = auth;
        }

        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            //request success
            res.apiresponse(result);
        });
        
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            //request is not success
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

    app.post('/cms/:apicommand', function (req, res) {
        var request = req.body;
        var command = req.params.apicommand;
        
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        request.db = 'cms';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'core',
        };
        
        if (req.ytosession != null) {
            var auth = {
                userid: req.ytosession.userid,
                accessToken: req.ytosession.accessToken
            };
            rqCMD.auth = auth;
        }

        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            //request success
            res.apiresponse(result);
        });
        
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            //request is not success
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

    app.post('/cache/:apicommand', function (req, res) {
        var request = req.body;
        var command = req.params.apicommand;
        
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'memento',
        };
        
        if (req.ytosession != null) {
            var auth = {
                userid: req.ytosession.userid,
                accessToken: req.ytosession.accessToken
            };
            rqCMD.auth = auth;
        }
        
        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            //request success
            res.apiresponse(result);
        });
        
        rq.on(request.onerroreventkey, function (err) {
            console.log(err);
            //request is not success
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

}