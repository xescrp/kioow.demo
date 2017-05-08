module.exports = function (subscriberworker, socket) {

    socket.on('login', function (session) {
        console.log('User logged in: ');
        console.log(session);
        subscriberworker.setfinished();
    });
    
    socket.on('forgotpassword', function (reminder) {
        console.log(reminder);
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        var swdata = reminder.member;
        swdata.url = reminder.data.link;
        mailer.SetupEmail(
            reminder.user.email, 
            reminder.template, 
            swdata, 
            function (recoverMail) {
                //send emails...
                msend.send(recoverMail, 
                function (ok) {
                    var finalresult = {
                        ResultOK: true,
                        Message: 'Your request has been processed. Check your email to change your password'
                    };

                    subscriberworker.setfinished({
                        ResultOK: true,
                        Message: 'User want to change password. User notified by email'
                    });
                
                }, function (err) {
                    var finalerror = {
                        ResultOK: false,
                        Message: err
                    };

                    subscriberworker.seterror(err);
                });
            
            });

    });
    
    
    /**
     * evento cambiar de mail por parte del afiliado
     */
    socket.on('changeemail', function (member) { 
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var helper = require('./affiliate.actions.helpers');
        var msend = new mmux.MailStackMediator();
        
        
        // *******************************************
        // 1) actualizar affiliado con el contact.email al user.email
        // *******************************************        
        member.contact.email = member.user.email;
        
        var upd = {
            $set : {
                "contact.email": member.user.email
            }
         };
                   
         helper.update({
            core: subscriberworker.core,
            query: { code: member.code },
            update: upd,
            collectionname: 'Affiliate'
         });     
    
      
        
            
        // 2) mandar mail al afiliado con el cambio de mail
        //informacion a enviar
        var sendData = {};
        sendData.contact = member.contact;
        //sendData.url = subscriberworker.core.get('fronturl') +'/affiliate/account?code='+member.code;
        sendData.url = subscriberworker.core.get('fronturl') +'/affiliate/inicio';
            
        mailer.SetupEmail(
            member.user.email, 
            'ytoaffiliatechangeemail', 
            sendData, 
            function (changemail) {
            	console.log("++ Sending mail to " + member.user.email +"....");
                //send emails...
                msend.send(changemail, 
                function (ok) {
                	console.log("++ Email send ok");
                    var finalresult = {
                        ResultOK: true,
                        Message: 'Your new email has been changed. Check your new email.'
                    };

                    subscriberworker.setfinished({
                        ResultOK: true,
                        Message: 'User email changed. User notified by email'
                    });
                
                }, function (err) {
                    var finalerror = {
                        ResultOK: false,
                        Message: err
                    };

                    subscriberworker.seterror(err);
                });            
            });
    });
    
    
    /**
     * evento cambiar de password por parte del afiliado
     */
    socket.on('changepassword', function (member) {
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();        
        console.log("++++++ change password  member: ",member);
                
      //informacion a enviar
        var sendData = {};
        sendData.contact = member.contact;
        sendData.company = member.company;
        sendData.link = subscriberworker.core.get('fronturl') +'/affiliate/account?code='+member.code+'#tabmessage';
        
                        
        mailer.SetupEmail(
            member.user.email, 
            'ytoaffiliatechangepassword', 
            sendData, 
            function (changepassword) {
            	console.log("++ Sending mail to " + member.user.email +"....");
                //send emails...
                msend.send(changepassword, 
                function (ok) {
                	console.log("++ Email send ok");
                    var finalresult = {
                        ResultOK: true,
                        Message: 'Your new password has been changed. Check your new email.'
                    };

                    subscriberworker.setfinished({
                        ResultOK: true,
                        Message: 'User password changed. User notified by email'
                    });
                
                }, function (err) {
                    var finalerror = {
                        ResultOK: false,
                        Message: err
                    };

                    subscriberworker.seterror(err);
                });            
            });
    });
    
    

    socket.on('delete', function (who) {
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        var email = who.email;
        var options = {
            messageto: 'dmc@openmarket.travel', 
            messagefrom: 'sender@openmarket.travel', 
            subject: 'Delete Account Request', 
            content: 'The user with email: ' + email + ' requested for delete his account.', 
            ishtml: true
        };

        var mail = mailer.SetContent(options);

        msend.send(mail, 
                function (ok) {
            var finalresult = {
                ResultOK: true,
                Message: 'Your request for deletion has been processed.'
            };

            subscriberworker.setfinished();
                
        }, function (err) {
            var finalerror = {
                ResultOK: false,
                Message: err
            };

            subscriberworker.seterror(err);
        });
            

    });
}