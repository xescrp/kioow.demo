var common = require('yourttoo.common');
var _ = require('underscore');

var MailStack = function () {
    //the mail stack
    this.mailqueue = new common.queue.Queue();
    this.mongomailqueue = new common.queue.Queue();
    //reference to the smpt sender
    var nodemailer = require('nodemailer');
    var mandrillTransport = require('nodemailer-mandrill-transport');

    var configfile = '../configurations/mailstack.config';
    var conf = require(configfile);
    
    this.configuration = conf.configuration;
    var base = require('../base');
    this.core = new base.YourTTOOCore();

    this.core.start(function () {
        console.log('### MailDelivery Core worker - core ready and running...');
    });

    this.smtp = nodemailer.createTransport(mandrillTransport({
        auth: {
            apiKey: this.configuration.smtp.apikey
        }
    }));
    this.checkinterval = null;
    this.checkintervalmongo = null;
    this.checkintervalDBpull = null;

    this.icplistener = new common.icp.ICPlistener([{
            messagekey: 'command', 
            commandpropertyname: 'command', 
            oncompletepropertyname: 'oncompleteeventkey', 
            onerrorpropertyname: 'onerroreventkey'
        }]);
    this.errorhandler = { notassigned: true };
}

//inherits
var eventThis = common.eventtrigger;
eventThis.eventtrigger(MailStack);

MailStack.prototype.send = function (mailmessage, callback) {
    var rs = { ResultOK: false, Message: '' };
    if (mailmessage != null) {
        mailstack.smtp.sendMail(mailmessage, function (err, response) {
            if (err) {
                console.log('[SendingMail] : Error occured');
                console.log('[SendingMail] : ' + err.message);
                rs.ResultOK = false;
                rs.Message = err.message;
                if (callback) {
                    callback(rs);
                }
            } else {
                console.log('[SendingMail] : Message sent successfully! to ' + mailmessage.to + ' - ' + mailmessage.subject);
                console.log(response);
                rs.ResultOK = true
                rs.Message = 'Message sent successfully!';
                if (callback) {
                    callback(rs);
                }
            }
        });
    } else {
        rs.Message = 'El email es nulo';
        if (callback) {
            callback(rs);
        }
    }
}

MailStack.prototype.checkqueue = function () {
    mailstack.core.plugins.mxp.pull(function (mails) {
        _.each(mails, function (mail) {
            mailstack.mongomailqueue.enqueue(mail);
        });
    });
}

MailStack.prototype.start = function () {
    //start listening...
    mailstack.core.start();
    var remoteThis = common.remoteendpoint;
    remoteThis.RemoteServerEndPoint('Mailstack server Remote End Point', mailstack.configuration.port, mailstack);

    mailstack.remoteserver.listen();
    mailstack.remoteserver.io.on('connection', function (socket) { 
        console.log('new connection to mailstack...');
        var router = require('../socketroutes/mailing.actions')(mailstack, socket);
    });
    mailstack.remoteserver.io.on('disconnect', function (socket) {
        console.log('a client has disconnected');
    });
    //start the queue polling...
    mailstack.checkinterval = setInterval(function () {
        var mail = mailstack.mailqueue.dequeue();
        if (mail != null) {
            console.log('let\'s send mail...');
            try {
                mailstack.send(mail, function (result) {
                    if (result.ResultOK) {
                        console.log('Mail sended [' + mail.to + '] -> Subject: ' + mail.subject);
                    }
                    else {
                        console.log(result.Message);
                        mailstack.mailqueue.enqueue(mail);
                    }
                });
            }
            catch (err) {
                console.log(err);
                mailstack.mailqueue.enqueue(mail);
            }
        }
    }, 10000);

    mailstack.checkintervalmongo = setInterval(function () {
        var mail = mailstack.mongomailqueue.dequeue();
        if (mail != null) {
            console.log('let\'s send mail...');
            try {
                mailstack.send(mail.mailmessage, function (result) {
                    mail.serverresponse = result;
                    if (result.ResultOK) {
                        console.log('Mail sended [' + mail.to + '] -> Subject: ' + mail.subject);
                        mailstack.core.plugins.mxp.delivered(mail, function (doc) {
                            mailstack.dispatch(null, mail); 
                        });
                    }
                    else {
                        console.error(result.Message);
                        mailstack.dispatch(result.Message, mail);
                    }
                });
            }
            catch (err) {
                console.error(err);
                mailstack.dispatch(err, mail);
            }
        }
    }, 5000);

    mailstack.checkintervalDBpull = setInterval(function () {
        mailstack.checkqueue();
    }, 15000);

    mailstack.icplistener.on('command', function (socket) {
        var icprouter = require('../socketroutes/mailing.actions')(mailstack, socket);
    });

    //mailstack.errorhandler = new require('../middleware/unhandlederror').ExceptionHandler(mailstack);
}

var sconf = {
    subject: 'maildelivery',
    action: 'send'
};

MailStack.prototype.hermesassertion = function (dispatchmessage) {
    var self = this;
    var query = dispatchmessage != null ? { code: dispatchmessage.heventcode } : null;
    query != null ?
        setImmediate(function () {
            self.core.list('Hevents').model.find(query)
                .populate('subscribermessages')
                .exec(function (err, docs) {
                    err != null ? console.error(err) : null;
                    docs != null && docs.length > 0 ?
                        setImmediate(function () {
                            var hev = docs[0];
                            hev.subscribermessages.push(dispatchmessage);
                            hev.state = ['dispatch', dispatchmessage.state].join('.');
                            hev.readers.push('mailstack');
                            hev.subscriberids.push({ name: 'mailer/' + sconf.subject + '#' + sconf.action, date: new Date() });
                            hev.save(function (err, doc) {
                                err != null ? console.error(err) : console.log('maildelivery Task Tracking saved on Hevent: ' + hev.code);
                            });
                        }) : null;
                });
        }) :
        setImmediate(function () {
            console.error('no dispatched message for this maildelivery ended task');
        });
}

MailStack.prototype.dispatch = function (error, taskresults) {
    var self = this;
    var collectionname = 'SubscriptionMessages';

    var responseData = {
        code: common.utils.getToken(),
        subject: 'maildelivery',
        action: 'send',
        lasterrordate: (error) ? new Date() : null,
        commitdate: (!error) ? new Date() : null,
        subscribertaskdone: !error,
        state: (error) ? 'error' : 'done',
        subscriberslist: [{ name: 'mailer/' + sconf.subject + '#' + sconf.action }],
        errorslist: [],
        lastresults: [],
        heventcode: taskresults.hevent != null ? taskresults.hevent.code : null,
    };
    //console.log(taskresults);
    var message = self.core.list(collectionname).model(responseData);
    taskresults.data != null ? message.lastparams = [taskresults.data] : message.lastparams = [taskresults];

    (error) ? message.errorslist.push(error) : null;
    (!error) ? message.lastresults.push(taskresults) : null;

    console.log('Save tracking maildelivery task on mongo...');
    //console.log(message);
    message.save(function (err, doc) {
        err != null ?
            setImmediate(function () {
                console.error('maildelivery Task cannot be saved on mongo!');
                console.error(err);
            }) : setImmediate(function () {
                console.log('maildelivery Task saved on mongo - ' + doc.code);
                self.hermesassertion(message);
            });
    });
}


var mailstack = module.exports = exports = new MailStack;

