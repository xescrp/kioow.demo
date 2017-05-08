module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var memento = options.memento;
    
    var helper = require('./helpers');
    //recover data
    if (options.Keys != null && options.Keys.length > 0) {
        var keys = options.Keys.length;
        var results = {
            Date: new Date()
        };
        console.log('recover keys...');
        console.log('count: ' + keys);
        console.log(options.Keys);
        _.each(options.Keys, function (Key) {
            //recover...
            helper.recoverstorageitem(Key, memento.mongo, function (result) {
                if (result != null && result.item != null) {
                    //uncompress..
                    helper.uncompress(result.item, function (dziped) {
                        results[Key] = dziped;
                        keys--;
                        console.log('Pending keys...' + keys);
                        if (keys == 0) {
                            //finished... callback
                            callback(results);
                        }
                    });
                } else {
                    results[Key] = null;
                    keys--;
                    console.log('Pending keys...' + keys);
                    if (keys == 0) {
                        //finished... callback
                        callback(results);
                    }  
                }
            });

        });
    }
    else { 
        errorcallback('You must provide at least a [key name] to recover items');
    }
    
}