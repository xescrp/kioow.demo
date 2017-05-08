
var MailStackMediator = function (mailstackport) {
    this.port = 8000 || mailstackport;
    this.url = 'http://localhost:' + this.port;
}

MailStackMediator.prototype.send = function (message, callback, errorcallback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: 'push',
        request: message,
        url: this.url
    };
    rq.request.oncompleteeventkey = 'push.done';
    rq.request.onerroreventkey = 'push.error';

    var rqcommand = rqcn.send(rq);
    
    rqcommand.on(rq.request.oncompleteeventkey, function (rs) { 
        callback(rs);
    });

    rqcommand.on(rq.request.onerroreventkey, function (err) {
        errorcallback(err);
    });
}

module.exports.MailStackMediator = MailStackMediator;