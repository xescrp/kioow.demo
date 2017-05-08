module.exports = function (conf, callback) { 
    var core = conf.core;
    var data = conf.data;

    var session = data;
    console.log(session);

    setImmediate(function () { 
        conf.results.push({
            ResultOK : true,
            Message : 'Login successful',
            Session: session
        });
        callback(null, conf);
    });

}