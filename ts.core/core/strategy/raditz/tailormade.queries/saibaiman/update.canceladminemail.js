module.exports = function (conf, callback) { 
    var core = conf.core;
    var data = conf.data;

    var query_edited = data.current;
    var query_original = data.original;
    
    var helper = require('../../common/helpers');

    var ml = require('../../../../factory/mailing');
    var mailer = new ml.Mailer();
    var mmux = require('../../../../mediator/mailstack.mediator');
    var msend = new mmux.MailStackMediator();

    var mailtemplates = {
        cancellyto: 'ytoadmincancellquery' //the mail for OMT/YTO Admins
    };

    var changed = (query_edited.cancelled != null && query_edited.cancelled.cancelDate != null && 
                (query_original.cancelled == null || query_original.cancelled.cancelDate != query_edited.cancelled.cancelDate));

    changed ? 
    setImmediate(function () {
        console.log('query ' + query_original.code + ' has been cancelled by affiliate.');
        var sendData = {};
        sendData.ca = {
            url : core.get('frontadminurl') + '/omt-response?code=' + query_original.code,
            txt : 'IR A LA SOLICITUD'
        };

        sendData.query = query_edited;
        
        sendData.url = core.get('frontadminurl') + '/omt-response?code=' + query_original.code;
        sendData.request = query_edited;
        sendData.querycode = query_edited.code;
        
        var adminMail = 'notifications@yourttoo.com';
        
        
        var upd = {
            $set : {
                status: 'cancelled',
                'cancelled.cancelDate': query_edited.cancelled.cancelDate,
                'cancelled.user' : query_edited.cancelled.user,
                'cancelled.byTraveler': query_edited.cancelled.byTraveler,
                'cancelled.reason': query_edited.cancelled.reason
            }
        };
        helper.update({
            core: core,
            query: { userqueryCode: query_edited.code },
            update: upd,
            collectionname: 'Quotes'
        });

        conf.historic = {
            date: new Date(),
            state: query_edited.state,
            user: query_edited.affiliate.user.email,
            mailsend: [
                { name: mailtemplates.cancellyto, date: new Date() }]
        };

        mailer.SetupEmail(
            adminMail, 
            mailtemplates.cancellyto, 
            sendData, 
                function (adminMail) {
                msend.send(adminMail, 
                        function (ok) {
                    conf.results.push({
                        ResultOK : true,
                        Message : 'Cancellation User Query Admin mail sent',
                        Mail: adminMail
                    });
                    callback(null, conf);
                }, function (err) {
                    conf.results.push({
                        ResultOK: false,
                        Errors: err,
                    });
                    callback(err, conf);
                });
            });

    })
    :
    setImmediate(function () { 
        callback(null, conf);
    });
}