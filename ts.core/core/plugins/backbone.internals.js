module.exports = function (options) {
    var core = options.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');

    var plugin = {
        name: 'Backbone Internals',
        id: 'bin',
        get: function (key, callback) {
            core.list('Internals').model.find({ key: key })
                .exec(function (err, docs) {
                    var val = docs != null && docs.length > 0 ? docs[0].item : null;
                    callback != null ? callback(err, val) : null;
                });
        },
        set: function (key, value, callback) {
            var obj = {
                key: key,
                item: value
            };
            core.list('Internals').model.update({ key: key }, obj, { upsert: true, setDefaultsOnInsert: true }, function (err, res) {
                callback != null ? callback(err, res) : null;
            });
        },
        initialize: function (callback) {
            //initialize internals plugin... 
            setImmediate(function () {
                //nothing to do.. just make a safe async op
                callback();
            });
        },
    };

    return plugin;
}