module.exports = function (conf, callback) {
	var core = conf.core;
	var data = conf.data;
    
    var query_edited = data.current;
    var query_original = data.original;

    var helper = require('../../common/helpers');

    data.historic != null ? 
    setImmediate(function () {
        var historicQuery = data.historic;
        helper.addhistoric({
            core: core,
            userquery: query_edited,  
            historic: historicQuery
        }, function (res) {
            conf.results.push({
                ResultOK: true,
                Message: 'Query historic updated',
                data: result
            });
            delete data.historic;
            callback(null, conf);
        }, function (err) {
            conf.results.push({
                ResultOK: false,
                Errors: err,
            });
            delete data.historic;
            callback(err, conf);
        });
    }) 
    : 
    setImmediate(function () { 
        callback(null, conf);
    });
}