module.exports = function (options, callback, errorcallback) {
    var core = options.core;
    
    var mongo = core.mongo;
    var coreobj = core.corebase;

    var likedquery = { $or: [] };
    var common = require('yourttoo.common');
    console.log(options.query);
    for (var prop in options.query) {
        var text = options.query[prop];
        
        var cond = {};
        var rgEx = common.utils.mp_conjunctive_regex(text);
        //var mngrgexp = { $regex: rgEx, $options: "i" };
        var mngrgexp = { $regex: rgEx };
        cond[prop] = mngrgexp;
        likedquery.$or.push(cond);
    }
    console.log(JSON.stringify(likedquery));
    options.query = likedquery;
    mongo.find(options, function (results) {
        if (results.ResultOK == true) {
            callback(results.Data);
        } else {
            errorcallback(results);
        }

    });
}
