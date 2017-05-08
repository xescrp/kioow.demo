var HermesMediator = function (hermesport) {
    this.port = 7000 || hermesport;
    this.url = 'http://localhost:' + this.port;
}

HermesMediator.prototype.send = function (key, data, callback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: key,
        request: data,
        url: this.url
    };
    rq.request.oncompleteeventkey = key + '.done';
    rq.request.onerroreventkey = key + '.error';

    var rqcommand = rqcn.send(rq, function (results) {
        console.log('Hermes item sent succesfully...');
        console.log(results);
        if (callback) { 
            callback(results);
        }
    }, function (err) {
        console.log(err);
        if (callback) {
            callback(err);
        }
    });
}

HermesMediator.prototype.getsubject = function (collectionname) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var subject = null;
    var related = _.filter(common.staticdata.hermessuscriptions, function (subscription) {
        return (subscription.relatedcollections.indexOf(collectionname) >= 0);
    });

    subject = (related != null && related.length > 0) ? related[0].subject : 'allactions';
    return subject;
}

module.exports.HermesMediator = HermesMediator;