module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var lines = [];

    
    setTimeout(function () {
        console.log('Exiting task...');
        //console.log(conf.results);
        callback(null, { ResultOK: true, result: conf.results });
    }, 3000);
}