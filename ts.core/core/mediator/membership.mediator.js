var MembershipMediator = function (membershipport) {
    this.port = 6000 || membershipport;
    this.url = 'http://localhost:' + this.port;
}

MembershipMediator.prototype.signup = function(data, callback, errorcallback){
	var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: 'signup',
        request: data,
        url: this.url
    };
    rq.request.oncompleteeventkey = 'signup.done';
    rq.request.onerroreventkey = 'signup.error';
	
	var rqcommand = rqcn.send(rq);
	rqcommand.on(rq.request.oncompleteeventkey, function (results) {
        console.log('Membership signup item sent succesfully...');
        console.log(results);
        callback(results);
    });

    rqcommand.on(rq.request.onerroreventkey, function (err) {
        console.log(err);
        errorcallback(err);
    });
}

MembershipMediator.prototype.validatetoken = function (data, callback, errorcallback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: 'validatetoken',
        request: data,
        url: this.url
    };
    rq.request.oncompleteeventkey = 'validatetoken.done';
    rq.request.onerroreventkey = 'validatetoken.error';
    
    var rqcommand = rqcn.send(rq);
    rqcommand.on(rq.request.oncompleteeventkey, function (results) {
        console.log('Membership validation item sent succesfully...');
        console.log(results);
        callback(results);
    });

    rqcommand.on(rq.request.onerroreventkey, function (err) {
        console.log(err);
        errorcallback(err);
    });
}

MembershipMediator.prototype.credentials = function (userid, callback, errorcallback) {
    var rqcn = require('yourttoo.connector').connector;
    var rq = {
        command: 'credentials',
        request: { userid: userid },
        url: this.url
    };
    rq.request.oncompleteeventkey = 'credentials.done';
    rq.request.onerroreventkey = 'credentials.error';
    
    var rqcommand = rqcn.send(rq, function (results) {
        console.log('Membership credentials item sent succesfully...');
        console.log(results);
        callback(results);
    }, function (err) {
        console.log(err);
        errorcallback(err);
    });
}

module.exports.MembershipMediator = MembershipMediator;