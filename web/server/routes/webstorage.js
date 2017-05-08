module.exports = function (app) {
    'use strict';
    //dependencies
    var _ = require('underscore');
    var common = require('yourttoo.common');

    app.post('/stack/push', function (req, res, next) {
        var key = req.body.key;
        var section = req.body.stackname;
        var value = req.body.item;

        req.storagehandler.push(section, key, value, function (err, item) {
            err != null ?
                setImmediate(function () {
                    console.error(err);
                    next(new Error(err));
                })
                :
                setImmediate(function () {
                    res.header("Content-Type", "application/json; charset=utf-8");
                    console.log(item);
                    res.send({ ResultOK: true, item: value });
                });
        });
    });

    app.get('/stack/pull', function (req, res, next) {
        var key = req.query.key;
        var section = req.query.stackname;

        req.storagehandler.pull(section, key, function (err, item) {
            err != null ?
                setImmediate(function () {
                    next(new Error(err));
                })
                :
                setImmediate(function () {
                    res.header("Content-Type", "application/json; charset=utf-8");
                    res.send(item);
                });
        });

    });

}