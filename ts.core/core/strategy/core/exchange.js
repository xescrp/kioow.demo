module.exports = function (options, callback, errorcallback) {

    var core = options.core.corebase; // conexion (core base)
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var flc = common.eventtrigger.eventcarrier(common.utils.getToken());

    var taskexec = {
        read: function () {
            setImmediate(function () {
                var currentexchanges = core.plugins['cux'].currentexchanges;
                callback(currentexchanges);
            });
        },
        write: function () {
            var newexchanges = options.newrates;
            core.plugins['cux'].savenewexchange(newexchanges, function () {
                callback(newexchanges);
            });
        }
    }

    var command = options.task;
    taskexec[command]();
   
    
}
