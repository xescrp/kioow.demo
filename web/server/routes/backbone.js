module.exports = function (app) {
    var swig = require('swig');
    //YourTTOO - BACKBONE way Request
    app.post('/api/:apicommand', function (req, res) {
        var request = req.body;
        var command = req.params.apicommand;
        request.environment = 'yourttoo';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'core',
            currentcurrency: req.session.currentcurrency || 'EUR'
        };
        
        if (req.session != null && req.session.ytologin != null) {
            var auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
            rqCMD.auth = auth;
        }

        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            //console.log(result);
            console.log('api rq -> done');
            //request success
            res.send(result);
        });
        
        rq.on(request.onerroreventkey, function (err) {
            //console.log(err);
            console.log('api rq -> error');
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
    
    app.post('/membership/:apicommand', function (req, res) {
        var request = req.body;
        var command = req.params.apicommand;
        request.environment = 'yourttoo';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'membership',
        };
        
        if (req.session != null && req.session.ytologin != null) {
            var auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
            rqCMD.auth = auth;
        }
        
        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            //request success
            res.send(result);
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
        request.environment = 'environment';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        request.db = 'cms';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'core',
        };
        
        if (req.session != null && req.session.ytologin != null) {
            var auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
            rqCMD.auth = auth;
        }

        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            console.log(result);
            //request success
            res.send(result);
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
        request.environment = 'yourttoo';
        request.oncompleteeventkey = command + '.done';
        request.onerroreventkey = command + '.error';
        
        var rqCMD = {
            command: command,
            request: request,
            service: 'memento',
        };
        
        if (req.session != null && req.session.ytologin != null) {
            var auth = {
                userid: req.session.ytologin.user._id,
                accessToken: req.session.ytologin.accessToken
            };
            rqCMD.auth = auth;
        }
        
        var rq = req.ytoconnector.send(rqCMD);
        
        rq.on(request.oncompleteeventkey, function (result) {
            //console.log(result);
            console.log('cache rq -> done');
            //request success
            res.send(result);
        });
        
        rq.on(request.onerroreventkey, function (err) {
            //console.log(err);
            console.log('cache rq -> error');
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