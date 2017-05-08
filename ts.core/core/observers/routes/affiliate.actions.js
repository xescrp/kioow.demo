module.exports = function (subscriberworker, socket) {
    
    var common = require('yourttoo.common');

    socket.on('new', function (data) {
        //TASK ON NEW AFFILIATE:
        console.log('NEW AFFILIATE SUBSCRIBER ACTIONS STUFF....');
        console.log(data);
        //1) Send EMAILS: **************** START *********************
        console.log('New Affiliate: ' + data.code);
        var mailtemplates = {
            affiliate: 'ytoaffiliatethanks', //the mail for the affiliate
            yto: 'omtnewaffiliate' //the mail for OM/YTO Admins
        };
        
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        var alldone = {
            mails: 0,
            total: 2,
            mailbodys: []
        };
        
        // add url Call to Action
        
        // ***************** 
        // mail al afiliado
        // *****************
      
        data.url = subscriberworker.core.get('fronturl') +'/affiliate/account/?code='+data.code;
        //the mail for the affiliate
        mailer.SetupEmail(
            data.user.email,        	
            mailtemplates.affiliate, 
            data, 
            function (afiMail) {
            //send emails...
            msend.send(afiMail, 
                function (ok) {
                alldone.mails++;
                alldone.mailbodys.push(afiMail);

                if (alldone.mails == alldone.total) {
                        subscriberworker.setfinished({
                        ResultOK: true,
                        Message: 'All mails sended to affiliate and omt',
                        Mails: alldone.mailbodys
                    });
                    }
                }, 
                function (err) { 
                    subscriberworker.seterror(err);
                });
            });


        // *************************
        //the mail for OM/YTO Admins
        // *************************
        mailer.SetupEmail(
            'notifications@yourttoo.com',
            mailtemplates.yto, 
            data, 
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
        //1) Send EMAILS: **************** END *********************
        
    });
    socket.on('update', function (data) {
        
        console.log('An AFFILIATE HAS BEEN UPDATED...');
        
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        

        var affiliate_edited = data.current;
        var affiliate_original = data.original;
        
        //flux control
        var assertwatcher = common.eventtrigger.eventcarrier(common.utils.getToken());
        //completion
        
        //###### Complete properties to check - Add property name to force new checkings...
        var complete = {
            registervalid: false,
            emailchanged: false           
            //suponemosalgo: false
        };
        var completeresults = {
            errors: [],
            messages: []
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
        
        //####### START ############  --- check conditions and launch events...  ADD CODE HERE...
        function checkregistervalid() {
            var dothisaction = false;            
            dothisaction = (
                (affiliate_original.membership.registervalid == null || affiliate_original.membership.registervalid == false) && 
                affiliate_edited.membership.registervalid == true);
            return dothisaction;
        }
        
        
      
        assertwatcher.on('registervalid', function () {
            if (checkregistervalid()) {            
                var templatename = 'ytoaffiliateconfirmed';
                affiliate_edited.url =  subscriberworker.core.get('fronturl') +'/affiliate/inicio';
                
                mailer.SetupEmail(
                		affiliate_edited.contact.email, 
                		templatename, 
                		affiliate_edited,
                function (afiMail) { 
                    msend.send(afiMail, 
                        function (ok) {
                        completeresults.messages.push('Affiliate Register Valid: Notification mail sent');
                        complete.registervalid = true;
                        checkandfinish();
                    }, function (err) {
                        completeresults.errors.push(err);
                        complete.registervalid = true;
                        checkandfinish();
                    });
                });
                //do action... send mail... and complete...
                
            } else {
                complete.registervalid = true;
                checkandfinish();
            }
        });
       
        
        //####### START DETEC EMAIL CHANGE
        function checkemailchanged() {
            var dothisaction = false;            
            console.log("++ afiliado actual: ",affiliate_original);
            console.log("++ EMail actual: ",affiliate_original.user.email);
            console.log("++ EMail modificado: ",affiliate_edited.user.email);
            console.log("++ afiliado modificado: ",affiliate_edited);
            dothisaction = (affiliate_original.user.email != affiliate_edited.user.email);
            return dothisaction;
        }

        assertwatcher.on('emailchanged', function () {
            if (checkemailchanged()) {            
                var templatename = 'ytoaffiliateconfirmed';
                

                mailer.SetupEmail(
                		affiliate_edited.contact.email,
                		//'antosango@gmail.com',
                		templatename, 
                		affiliate_edited,
                function (afiMail) { 
                    msend.send(afiMail, 
                        function (ok) {
                        completeresults.messages.push('Affiliate Register Updated Email: Notification mail sent');
                        complete.emailchanged = true;
                        checkandfinish();
                    }, function (err) {
                        completeresults.errors.push(err);
                        complete.emailchanged = true;
                        checkandfinish();
                    });
                });
                //do action... send mail... and complete...
                
            } else {
                complete.emailchanged = true;
                checkandfinish();
            }
        });
        
        
        
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