module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var mongo = core.mongo;
    var coreobj = core.corebase;
    var type = options.type;
    var name = options.name;

    var help = require('./helpers');
    var errors = null;
    var result = null;

    errors = (help.hashdata[type] != null) ? null : 'this type name [' + type + '] its not supported';

    (errors != null) ? 
        errorcallback(errors) : 
        process.nextTick(function () {
            result = help.hashdata[type](name);
            callback(result);
    });
}
