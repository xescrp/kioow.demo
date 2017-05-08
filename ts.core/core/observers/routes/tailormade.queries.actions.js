module.exports = function (subscriberworker, socket) {
    
    var common = require('yourttoo.common');

    socket.on('new', function (data) {
        //TASK ON NEW AFFILIATE:
        console.log('NEW QUERY SUBSCRIBER ACTIONS STUFF....');
        console.log(data);

        //1) Send EMAILS: **************** START *********************
        console.log('New Query: ' + data.code);

        var mailtemplates = {
            affiliate: 'ytoaffiliatenewrequest', //the mail for the affiliate
            yto: 'omtnewaffiliaterequest' //the mail for OM/YTO Admins
        };
        var helper = require('./affiliate.actions.helpers');
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        var alldone = {
            mails: 0,
            total: 2,
            mailbodys: []
        };
        
        
        // variable to send     
        var dataSend = {};
        dataSend.request = data;
        dataSend.querycode = data.code;
        dataSend.companyname= data.affiliate.company.name;
        
        //************
        // mail to OMT 
        //************
        // add url Call to Action ADMIN
        dataSend.url = subscriberworker.core.get('frontadminurl') +'/omt-response?code='+data.code;
        
        //the mail for OMT/YTO Admins
        mailer.SetupEmail(
            'notifications@yourttoo.com',        	
            mailtemplates.yto, 
            dataSend, 
            function (adminMail) {
            msend.send(adminMail, 
                function (ok) {
                alldone.mails++;
                alldone.mailbodys.push(adminMail);
                if (alldone.mails == alldone.total) {
                    subscriberworker.setfinished({
                        ResultOK: true,
                        Message: 'All mails sended to affiliate and omt',
                        Mails: alldone.mailbodys
                    });
                }
                
            }, function (err) {
                    subscriberworker.seterror(err);
            });
        });
        
        
        //*****************
        // mail to afiliado
        //*****************
        // variables a enviar
        var to;
        var dataToSend = {};
        dataToSend.request = data;
        dataToSend.querycode = data.code;
        
        if (data.affiliate.contact.bookingContact !== null && data.affiliate.contact.bookingContact !== undefined){
            to = data.affiliate.contact.bookingContact.email;
        } else {
            to = data.affiliate.contact.email;
        }
        console.log("++ mail afiliado: ",to);
        
        // add url Call to Action Affiliate
        dataToSend.url = subscriberworker.core.get('fronturl') +'/affiliate/request/'+data.code;
        //the mail for the affiliate
        mailer.SetupEmail(
            to, 
            mailtemplates.affiliate, 
            dataToSend, 
            function (afiMail) {
            //send emails...
                msend.send(afiMail, 
                function (ok) {
                    alldone.mailbodys.push(afiMail);                  
                                        
                  
                    
                    // actualizar el historic de la query
                    var historicYTO = {
                        date: new Date(),
                        state: data.state,
                        user: data.affiliate.user.email,
                        mailsend: [{ name: mailtemplates.affiliate, date: new Date() },{ name: mailtemplates.yto, date: new Date() }]
                    };
                    
                    helper.addhistoric({
                        core: subscriberworker.core,
                        userquery: data,  
                        historic: historicYTO
                    }, function (result) {
                    	
                    	 alldone.mails++;
                    	 console.log("++ enviado todos los correos correctamente.");
                        if (alldone.mails == alldone.total) {
                            subscriberworker.setfinished({
                                ResultOK: true,
                                Message: 'All mails sended to affiliate and omt',
                                Mails: alldone.mailbodys
                            });
                        }
                    }, function (err) {
                        alldone.mails++;
                        if (alldone.mails == alldone.total) {
                            subscriberworker.seterror({
                                ResultOK: false,
                                Message: err,
                                Mails: alldone.mailbodys
                            });
                        }
                    });
                }, 
                function (err) {
                    subscriberworker.seterror(err);
                });
            });
        
    });
    
    
    /**
     * si se produce una actualizacion de la query se lanza esto subscriber
     */
    socket.on('update', function (data) {
        
        console.log('A QUERY HAS BEEN UPDATED...');
        
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        var helper = require('./affiliate.actions.helpers');

        var query_edited = data.current;
        var query_original = data.original;
        
        //flux control
        var assertwatcher = common.eventtrigger.eventcarrier(common.utils.getToken());
        //completion
        
        //###### Complete properties to check - Add property name to force new checkings...
        var complete = {
            notifyCancellationAdmin: false
        };
        
        //
        // INIT CANCELATION notifications
        // 
        
        var mailtemplates = {
            cancellyto:        'ytoadmincancellquery' //the mail for OMT/YTO Admins
        };

        var completeresults = {
            errors: [],
            messages: [],
        };

        function checkandfinish() { 
            var completed = true;
            for (var prop in complete) { 
                completed = completed && complete[prop];
            }
            if (completed) { 
                assertwatcher.emit('done');
            }
        }
        

        assertwatcher.on('notifyCancellationAdmin', function () {
        	
            if (query_edited.cancelled != null && 
                query_edited.cancelled.cancelDate !== null && 
                (query_original.cancelled == null || query_original.cancelled.cancelDate !== query_edited.cancelled.cancelDate)) {
                console.log ('query '+query_original.code+' has been cancelled by affiliate.');
                // send notification to booking ADMIN
                // 
                var sendData = {};

                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/omt-response?code='+query_original.code,
                    txt : 'IR A LA SOLICITUD'
                };
                
                //********actializar las quotes  de la query a canceladas
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
                    core: subscriberworker.core,
                    query: { userqueryCode: query_edited.code },
                    update: upd,
                    collectionname: 'Quotes'
                });
                
                //***********************
                
                var historicQuery = {
                    date: new Date(),
                    state: query_edited.state,
                    user: query_edited.affiliate.user.email,
                    mailsend: [
                        { name: mailtemplates.cancellyto, date: new Date() }]
                };

                sendData.query = query_edited;

                sendData.url = subscriberworker.core.get('frontadminurl') +'/omt-response?code='+query_original.code;
                sendData.request = query_edited;
                sendData.querycode = query_edited.code;

                //the mail for OMT/YTO Admins
                mailer.SetupEmail(
                    'notifications@yourttoo.com',  
                    mailtemplates.cancellyto, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            helper.addhistoric({
                                core: subscriberworker.core,
                                userquery: query_edited,  
                                historic: historicQuery
                            }, function (res) { 
                                complete.notifyCancellationAdmin = true;
                                checkandfinish();
                            }, function (err) { 
                                complete.errors.push(err);
                                complete.notifyCancellationAdmin = true;
                                checkandfinish();
                            });
                    }, function (err) {
                            complete.errors.push(err);
                            complete.notifyCancellationAdmin = true;
                            checkandfinish();
                    });
                });

            } else {
                complete.notifyCancellationAdmin = true;
                checkandfinish();
            }
        });

        
        //####### START ############  --- check conditions and launch events...  ADD CODE HERE...
        assertwatcher.on('done', function () {
            (completeresults.errors.length > 0) ? subscriberworker.seterror(complete.errors) : subscriberworker.setfinished({
                ResultOK: true,
                Message: 'Affiliate update actions finished'
            });
        });
        //####### END ############  --- check conditions and launch events...  ADD CODE HERE...
        
        
        //exec assertions..
        for (var prop in complete) { 
            assertwatcher.emit(prop);
        }
    });

    socket.on('delete', function (data) {
        subscriberworker.setfinished();
    });
    socket.on('generic.action', function (data) {
        subscriberworker.setfinished();
    });
}