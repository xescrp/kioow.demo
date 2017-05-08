module.exports = function (conf, callback) {
    console.log('ready to push on memento...');
    var mmed = require('../../../mediator/memento.mediator');
    var mediator = new mmed.MementoMediator();
    conf.pushmementoconfig != null ? setImmediate(function () { 
        mediator.push(conf.pushmementoconfig.key, conf.pushmementoconfig.item, function (rs) {
            console.log('Push ok, key: ' + conf.pushmementoconfig.key);
            callback(null, conf);
        }, function (err) {
            console.log('Push ko, key: ' + conf.pushmementoconfig.key);
            console.log(err);
            callback(err, conf);
        });
    }) 
    : 
    setImmediate(function () { 
        callback(null, conf);
    });
    
}