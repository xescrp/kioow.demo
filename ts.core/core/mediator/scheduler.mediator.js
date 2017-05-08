var SchedulerMediator = function (schedulerport) {
    this.port = schedulerport || 9000;
    this.url = 'http://localhost:' + this.port;
}

SchedulerMediator.prototype.send = function (key, data, callback, errorcallback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: key,
        request: data,
        url: this.url
    };
    rq.request.oncompleteeventkey = key + '.done';
    rq.request.onerroreventkey = key + '.error';

    var rqcommand = rqcn.send(rq);

    rqcommand.on(rq.request.oncompleteeventkey, function (result) {
        callback != null ? callback(result) : null;
    });

    rqcommand.on(rq.request.onerroreventkey, function (err) {
        errorcallback != null ? errorcallback(err) : null;
    });
}

SchedulerMediator.prototype.getsubject = function (collectionname) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var subject = null;
    var related = _.filter(common.staticdata.hermessuscriptions, function (subscription) {
        return (subscription.relatedcollections.indexOf(collectionname) >= 0);
    });

    subject = (related != null && related.length > 0) ? related[0].subject : 'allactions';
    return subject;
}

module.exports.SchedulerMediator = SchedulerMediator;