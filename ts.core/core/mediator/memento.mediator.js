
var MementoMediator = function (mementoport) {
    this.port = 5000 || mementoport;
    this.url = 'http://localhost:' + this.port;
}

MementoMediator.prototype.push = function (key, item, callback, errorcallback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: 'push',
        request: {
            Key: key,
            Item: item,
            oncompleteeventkey: 'push.done',
            onerroreventkey: 'push.error',
        },
        url: this.url
    };

    var rqcommand = rqcn.send(rq);

    rqcommand.on(rq.request.oncompleteeventkey, function (result) {
        callback(result);
    });

    rqcommand.on(rq.request.onerroreventkey, function (err) {
        errorcallback(err);
    });
}

MementoMediator.prototype.pull = function (keys, callback, errorcallback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: 'pull',
        request: {
            Keys: keys,
            oncompleteeventkey: 'pull.done',
            onerroreventkey: 'pull.error',
        },
        url: this.url
    };

    var rqcommand = rqcn.send(rq, function (rs) {
        //callback(rs);
    }, function (err) {
        //errorcallback(err);
    });
    
    rqcommand.on(rq.request.oncompleteeventkey, function (result) {
        console.log('mediator ok pull');
        callback(result);
    });

    rqcommand.on(rq.request.onerroreventkey, function (err) {
        console.log('mediator nok pull');
        
    });

    console.log(rqcommand);
}

module.exports.MementoMediator = MementoMediator;