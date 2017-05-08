module.exports = function (app) {
    var swig = require('swig');
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var utils = require('../utils');

    app.post('/exchanges/save', function (req, res, next) {
        var newrates = req.body;
        app.locals.exchange = newrates;
        var filepath = app.locals.exchangefile;
        utils.writeJson(filepath, app.locals.exchange);

        var rqE = {
            task: 'write',
            newrates: newrates
        };

        var command = 'exchange';
        var rq = utils.apicall(command, rqE, req.session, req.ytoconnector, req); //req.ytoconnector.send(rqCMD);
        rq.on(rq.request.oncompleteeventkey, function (result) {
            res.send(result);
        });
        //request no success
        rq.on(rq.request.onerroreventkey, function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    });
}