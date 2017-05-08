

module.exports = function (options, callback, errorcallback) { 
    var common = require('yourttoo.common');
    var membership = options.membership;
    //flux
    var crx = common.eventtrigger.eventcarrier(common.utils.getToken());
    var annex = require('./helpers');

    var email = options.email;
    var code = common.utils.getToken();
    var errormessage = null;

    var pending = {
        rqsaved: false,
        mailsready: false,
        done: function () { 
            return (this.rqsaved == true && this.mailsready == true)
        }
    };
    
    var finalresult = null;
    var haserrors = false;

    crx.on('generate.request', function (member) { 
        var rqmodel = {
            collectionname: 'OMTAdminRequests', 
            modelobject: {
                title: 'Password Recovery Request - User lost password',
                from: email,
                to: 'notifications@openmarket.travel',
                subject: 'Password Recovery Request',
                text: 'The user ' + email + ' send a recover password request',
                html: 'The user ' + email + ' send a recover password request',
                date: new Date(),
                type: 'UserRecoverPasswordRequest',
                key: code
            }
        };
        
        var rq = membership.mongo.getmodel(rqmodel);
        
        rq.save(function (err, doc) {
            console.log('request for changing password: ');
            console.log(doc);
            haserrors = (err != null);
            errormessage = err;
            haserrors ? crx.emit('all.ready', 'mailsready') : crx.emit('hermes.request', member, code);
            crx.emit('all.ready', 'rqsaved');
        });

    });

    crx.on('user.found', function (user) {
        annex.recoverModelWithUser({ user: user, membership: membership }, 
            function (member) {
            crx.emit('generate.request', member);
        },
            function (err) {
            haserrors = true;
            errormessage = err;
            crx.emit('all.ready', 'mailsready');
            crx.emit('all.ready', 'rqsaved');
        });
    });
    
    crx.on('hermes.request', function (member, key) {
        var templates = {
            dmc: 'dmcforgotpassword',
            traveler: 'userforgotpassword',
            yto: 'ytoaffiliateforgotpassword'
        };
        
        var mmed = require('../../mediator/hermes.mediator');
        var mediator = new mmed.HermesMediator();

        
        var data = {
            key : key,
            link: membership.mongo.core.get('fronturl')
        };
        var membertype = '';
        if (member.user.isDMC) { membertype = 'dmc'; data.link += 'new-password?key=' + key; data.dmc = member.name; }
        if (member.user.isAffiliate) { membertype = 'yto'; data.link += '/nueva-contrasena?key=' + key; data.affiliate = member.firstname }
        if (member.user.isAdmin) { membertype = 'yto'; data.link += '/nueva-contrasena?key=' + key; data.affiliate = member.name }
        if (member.user.isTraveler) { membertype = 'traveler'; data.link += '/nueva-contrasena?key=' + key; data.traveler = member.name}
        var template = templates[membertype];

        var subject = mediator.getsubject('Users');
        console.log('notify hermes subject: ' + subject);
        var action = 'forgotpassword';
        var rqh = {
            user: member.user,
            member:member,
            template: template,
            data: data
        };

        var commandkey = 'notify.suscribers';
        var hrq = {
            subject: subject,
            action: action,
            data: rqh,
            oncompleteeventkey: 'notify.suscribers.done',
            onerroreventkey: 'notify.suscribers.error'
        };
        console.log(JSON.stringify(hrq));
        mediator.send(commandkey, hrq, function (result) {
            console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
        });
        
        finalresult = {
            ResultOK: true,
            Message: 'Your request has been processed. Check your email to change your password'
        };
        crx.emit('all.ready', 'mailsready');
        
    });
    
    crx.on('user.notfound', function (err) {
        var msg = 'Can not find an existing user with this mail: ' + email;
        haserrors = true;
        errormessage = msg;
        crx.emit('all.ready', 'mailsready');
        crx.emit('all.ready', 'rqsaved');
    });
    
    crx.on('all.ready', function (taskdone) {
        pending[taskdone] = true;
        if (pending.done()) {
            var eventname = haserrors ? 'all.error' : 'all.done';
            finalresult = haserrors ? errormessage : finalresult;
            crx.emit(eventname, finalresult);
        }
    });

    crx.on('all.error', function (err) {
        errorcallback(err);
    });
    
    crx.on('all.done', function (result) {
        callback(result);
    });
    
    //lets find user...
    var query = { email: email };
    membership.mongo.findone({ collectionname: 'Users', query: query }, function (results) {
        (results != null && results.ResultOK == true && results.Data != null) ? 
       crx.emit('user.found', results.Data) : 
       crx.emit('user.notfound', results.Message);
    });

    
}