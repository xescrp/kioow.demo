module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;

    var wlcustom_edited = data.current;
    var wlcustom_edited_original = data.original;

    conf.wlcustomizationforsave = wlcustom_edited;
    conf.results = {
        messages: [],
        errors: []
    };

    setImmediate(function () { 
        callback(null, conf);
    });
}