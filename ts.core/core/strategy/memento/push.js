module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var memento = options.memento;

    var helper = require('./helpers');
    //compress data
    helper.compress(options.Item, function (ziped) { 
        var storage = {
            key: options.Key,
            date: new Date(),
            item: ziped
        };
        //save data
        helper.savestorageitem(storage, memento.mongo, function (result) {
            var rsp = {
                Key : result.key,
                Date : new Date(),
                Item : { Message: 'Item stored/updated successfully!' }
            }
            callback(rsp);
        });    
    });
    
}