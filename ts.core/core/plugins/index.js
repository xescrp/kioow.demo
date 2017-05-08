module.exports = function (core, callback) {
    var _ = require('underscore');

    var plugins = { }; //plugin hash...
    var pluglist = [
        './currency.exchanger', //currency exchanger...
        './mailer.push',
        './backbone.internals'
    ];

    var async = require('async');
    var launchers = [];
    _.each(pluglist, function (plugpath) {
        launchers.push(function (callback) {
            var plug = require(plugpath)({ core: core });
            plug.initialize(function () {
                //plugin initialized...
                console.log(plug.name + ' initialized...');
                //push on the plugin list
                plugins[plug.id] = plug;
                callback(null, plug);
            });
        });
    });

    async.parallel(launchers, function (err, results) {
        console.log('Parallel plugin launcher finished...');
        callback != null ? callback(plugins) : null;
    });

    return plugins;
}