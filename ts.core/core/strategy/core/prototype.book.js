module.exports = function (options, callback, errorcallback) {
    
    var core = options.core;
    
    var mongo = core.mongo;
    var coreobj = core.corebase;
    
    mongo.find(options, function (results) {
        if (results.ResultOK == true) {
            callback(results.Data);
        } else {
            errorcallback(results);
        }

    });


    //TODO: implementation...
    callback({
        notimplemented: 'in progress...'
    });
}