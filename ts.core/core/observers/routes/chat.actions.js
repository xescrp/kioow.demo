module.exports = function (subscriberworker, socket) {
    var common = require('yourttoo.common');
    var utils = require('../../tools');
    
    
    socket.on('new', function (data) {
        
        console.log('NEW CHAT SUBSCRIBER ACTIONS STUFF....');
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');        
        var msend = new mmux.MailStackMediator();
        var helper = require('./affiliate.actions.helpers');
        
        var chat = data;
        
        // templates
        var mailtemplates = {
        	adminchat: 'ytoadminbookingchat',
        	dmcchat: 'dmcnewmessagetailormade',
        	adminChatTailor : 'omtnewmessagetailormade'
        };
     
        var assertwatcher = common.eventtrigger.eventcarrier(common.utils.getToken());
        
        // tareas
        var complete = {
        	notifyAdmin: false,
            notifyDmc: false,
        };
        
        //resultaods
        var completeresults = {
            errors: [],                
            messages: []
        };
                       
        // comprobar que todas las tareas han sido completadas
        function checkandfinish() {
            var completed = true;
            for (var prop in complete) {
                completed = completed && complete[prop];
            }
            if (completed) {
                assertwatcher.emit('done');
            }
        }
        
        
        /**
         *  notificar a Dmc del mensaje nuevo
         *  si es una booking solo se notifica a admin
         *  si es una quote se notifica a dmc y admin
         */
        assertwatcher.on('notifyDmc', function () { 
        	
        	 console.log("+++ NUEVO chat original (notificar DMC): ");     
        	 
        	 // ****************************************************************
        	 //  1) si es un mensaje de una booking, no hay que notificar al dmc
        	 // ****************************************************************
        	 if(chat.booking2 != null){
        		 console.log("Fin del chat nuevo (notifyDmc) es de una booking solo se notifica a omt.");        		 
        		 complete.notifyDmc = true;
        		 checkandfinish();
        	 }
        	 
        	 // ********************************
        	 //  1.2) es un mensaje de una quote
        	 // ********************************           
        	 else{
        		 // variable a enviar
        		 var from = chat.messages[0].from;
            	 var to = chat.messages[0].to;
            	 var sendData = {};
            	 
            	 sendData.from = from;
            	 sendData.content = chat.messages[0];
        		 sendData.quote = chat.quote;        		 
        		 sendData.querycode = chat.userquery.code;
        		 sendData.request = chat.userquery;	 
        		 // no necesita url, la construye en el swig
        	 
        		 // *****************************
            	 // 1.3) detectar el destinatario
            	 // *****************************   
            	 var mailTo;
            	 var template;
            	 
            	 // 2.3) si lo manda un afiliado a un dmc
            	 if(to.type == 'dmc'){
            		 mailTo = to.email;
            		 template = mailtemplates.dmcchat;
            		 
            		 
            		 // ******************
                	 // 2.4) enviar el mensaje
                     // ******************
                     mailer.SetupEmail(
                         mailTo,
                    	 //'antosango@gmail.com',
                         template, 
                         sendData, 
                         function (adminMail) {
                         msend.send(adminMail, 
                             function (ok) {
                                 complete.notifyDmc = true;                                 
                                 completeresults.messages.push('Email Sent succesfully to ',to);                                
                                 checkandfinish();
                             }, function (err) {
                            	 console.log("Error sending mail to ",mailTo,'. Details: ',err);
                                 completeresults.errors(err);
                                 complete.notifyDmc = true;                               
                                 checkandfinish();
                         });
                     });
            	 } 
            	 
            	 //2.3.2) destinatario no es admin TODO
            	 else{
            		 console.log("ERROR: Detectado mail a un destinatario no procesado.");
            		 console.log("fin el chat es de una booking solo se notifica a omt")        		 
            		 complete.notifyDmc = true;
            		 checkandfinish();
            	 }        	
        	 }    
        });
        
        
        /**
         *  notificar a admin del mensaje nuevo
         */
        assertwatcher.on('notifyAdmin', function () { 
        	
        	 console.log("+++ NUEVO chat original (notificar admin).");            	 
        	 var from = chat.messages[0].from;
        	 var to = chat.messages[0].to;
        	 
        	 // variable a enviar
        	 var mailTo;
        	 var template;
        	 var sendData = {};
        	 sendData.from = from;
        	 sendData.content = chat.messages[0];
        	         	
        	 
        	 // ***********************************
        	 //  1) si es un mensaje de una booking
        	 // ***********************************
        	 if(chat.booking2 != null){            		 
        		 sendData.booking = chat.booking2;
        		 sendData.idbooking = chat.booking2.idBooking;        		 
        		 sendData.url =  subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+chat.booking2.idBooking;
        		 template = mailtemplates.adminchat;
        		 sendData.booking.affiliate = chat.affiliate;
        		 
        		         		         		 
        		 //informacion para el mensaje
                 if (chat.booking2 != null && chat.booking2.products != null && chat.booking2.products.length > 0){
                     var product = chat.booking2.products[0];
                     sendData.hotelcats = product != null && product.itinerary != null && product.itinerary.length > 0 ? utils._showHotelCats(product.itinerary, '_es') : [];
                     sendData.mainImageProduct = product != null && product.productimage != null ? utils.cloudinary_url(product.productimage.url, 'mainproductimage') : '';
                     sendData.tags = product != null && product.tags != null && product.tags.length > 0 ? utils._showTagsArray(product.tags) : [];
        		 }
        		 else{
        			 console.log("ERROR, booking del chat no viene populado.");
        		 }
        	 }
        	 
        	 // ********************************
        	 //  1.2) es un mensaje de una quote
        	 // ********************************            	 
        	 else if(chat.quote != null){
        		 sendData.quote = chat.quote;        		 
        		 sendData.querycode = chat.userquery.code;
        		 sendData.request = chat.userquery;
        		 template = mailtemplates.adminChatTailor;
        		 sendData.request.affiliate = chat.affiliate;
        	 }        	 
        	 
        	 // ***************************
        	 //2)  detectar el destinatario
        	 // ***************************
        	 
        	 // 2.1) si lo manda un afiliado
        	 if(from.type=='affiliate'){
        		 mailTo = 'notifications@yourttoo.com';
        		 
        	 }
        	 // 2.2) si lo manda un traveler
        	 else if(from.type=='traveler'){ 
        		 mailTo = 'notifications@openmarket.travel';  
        		 if(chat.booking2 != null){   
        			 sendData.booking.traveler = chat.traveler; 
        		 }
        		 else{
        			 sendData.quote.traveler = chat.traveler;
        		 }
        	 }        	  
        	 
        	 //2.4) destinatario no es admin TODO
        	 else{
        		 console.log("ERROR: Detectado mail a un destinatario no procesado.");
        	 }
        	 
         	
        	 
        	 // ******************
        	 // 3) enviar el mensaje
             // ******************
              console.log("*** voy a enviar mansaje a admin");
             mailer.SetupEmail(
                 mailTo,
            	 //'antosango@gmail.com',
                 template, 
                 sendData, 
                 function (adminMail) {
                 msend.send(adminMail, 
                     function (ok) {
                         complete.notifyAdmin = true;                         
                         completeresults.mails++;
                         
                        //*******************************************************
                   		// 4.1)  actializar el chat con el estado de los mensajes
                      	//*******************************************************        	 
               			var auxMessages = chat.messages;
               			auxMessages[0].from.status = 'sent';
               			auxMessages[0].to.status = 'new';
                   		
                           var upd = {
                              $set : {
                                  messages: auxMessages
                              }
                           };
                                     
                           helper.update({
                              core: subscriberworker.core,
                              query: { code: chat.code },
                              update: upd,
                              collectionname: 'Chats'
                           });                         
                         completeresults.messages.push('Email Sent succesfully to ',to);                        
                         checkandfinish();
                     }, function (err) {
                         completeresults.errors(err);
                         complete.notifyAdmin = true;
                         
                         //*******************************************************
                    	 // 4.1)  actializar el chat con el estado de los mensajes
                       	 //*******************************************************        	 
                		 var auxMessages = chat.messages;
                		 auxMessages[0].from.status = 'error';
                		 auxMessages[0].to.status = 'new';
                    		
                         var upd = {
                             $set : {
                                  messages: auxMessages
                             }
                         };
                                      
                         helper.update({
                        	 core: subscriberworker.core,
                        	 query: { code: chat.code },
                        	 update: upd,
                        	 collectionname: 'Chats'
                         });                         
                         
                         // fin
                         checkandfinish();
                 });
             });           
        });

        
        //####### START ############  --- check conditions and launch events...  ADD CODE HERE...
        assertwatcher.on('done', function () {
        	if(completeresults.errors.length > 0){
        		 subscriberworker.seterror(completeresults.errors);
        	}
        	else{
                console.log("Subcriber new finished sucseccfully.");
    			// termino el evento
    			subscriberworker.setfinished({
                    ResultOK: true,
                    Message: 'Chat New actions finished',
                    Results: completeresults.messages
                });
        	}        	          
        });
        
        
        //exec assertions..
        for (var prop in complete) {
            assertwatcher.emit(prop);
        }  
    });
        
        
        
      

     
    
    /**
     * subscriber update chat
     */
    socket.on('update', function (data) {
    	     	
        console.log('UPDATE CHAT SUBSCRIBER ACTIONS STUFF....');
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        var helper = require('./affiliate.actions.helpers');
        
        var chat_edited = data.current;
        var chat_original = data.original;
                
       
        // templates
        var mailtemplates = {
        	adminchat: 'ytoadminbookingchat',
        	dmcchat: 'dmcnewmessagetailormade',
        	adminChatTailor : 'omtnewmessagetailormade'
        };
        
        var assertwatcher = common.eventtrigger.eventcarrier(common.utils.getToken());
        var complete = {
        	notifyAdmin: false,
            notifyDmc: false,
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
        
        /**
         *  notificar al dmc del mensaje nuevo de un tailormade ( si es booking no hay que notificar)
         */
        assertwatcher.on('notifyDmc', function () { 
        	
        	 // ***********************************
        	 //  1) si es un mensaje de una booking
        	 // ***********************************
        	 if(data.current.booking2 != null) {
        		 console.log("Fin del chat Update(notifyDmc), es una booking solo se notifica a omt.");        		 
        		 complete.notifyDmc = true;
        		 checkandfinish();
        	 }

        	 // ******************************
        	 //  2) ver si hay mensajes nuevos
        	 // ******************************        	 
        	 else if(data.original.messages != null && data.original.messages.length != data.current.messages.length){
            	 
            	 var from = data.current.messages[data.current.messages.length-1].from;
            	 var to = data.current.messages[data.current.messages.length-1].to;
            	 
            	 // variable a enviar
            	 var sendData = {};
            	 sendData.from = from;
            	 sendData.content = data.current.messages[data.current.messages.length-1];
                        	
            	 
            	 // ******************************
            	 //  1.2) es un mensaje de una quote
            	 // ******************************            	 
            	 if(data.current.quote != null){            		
            		 sendData.quote = data.original.quote;
            		 sendData.querycode = data.current.userquery.code;
            		 sendData.request = data.current.userquery;
            		 
            	
            	             	 
	            	 // ***************************
	            	 //2)  detectar el destinatario
	            	 // ***************************  
	            	 var to = to.email;
	            	 var template = mailtemplates.dmcchat;	            	
	            	 
	            	 
	            	 // ******************
	            	 // 3) enviar el mensaje
	                 // ******************
	                 mailer.SetupEmail(
	                     to,
	                	 //'antosango@gmail.com',
	                     template, 
	                     sendData, 
	                     function (adminMail) {
	                     msend.send(adminMail, 
	                         function (ok) {
	                             complete.notifyDmc = true;
	                             completeresults.messages.push('Email Sent succesfully to ',to);
	                             checkandfinish();
	                         }, function (err) {
	                             completeresults.errors(err);
	                             complete.notifyDmc = true;
	                             checkandfinish();
	                     });
	                 });
            	 }
             }    
        	 // no hay mensajes nuevos
        	 else{        	        		 
        		 complete.notifyDmc = true;
        		 checkandfinish();
        	 }
        });
        
        /**
         *  notificar a admin del mensaje nuevo
         */
        assertwatcher.on('notifyAdmin', function () { 
        	
                   
             if(data.original.messages != null && data.original.messages.length != data.current.messages.length) {
            	 
            	 var from = data.current.messages[data.current.messages.length-1].from;
            	 var to = data.current.messages[data.current.messages.length-1].to;
            	 
            	 // variable a enviar
            	 var sendData = {};
            	 var toEmail;             	
            	 var template;
            	 sendData.from = from;
                 sendData.content = data.current.me
                 ssages[data.current.messages.length - 1];
            
            	 // ***********************************
            	 //  1) si es un mensaje de una booking
            	 // ***********************************
            	 if(data.current.booking2 != null){            		 
            		 sendData.booking = data.current.booking2;
            		 sendData.idbooking = data.current.booking2.idBooking;
            		 sendData.url =  subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking=' + data.current.booking2.idBooking;
            		 sendData.booking.affiliate = data.current.affiliate;
            		 
            		 //informacion para el mensaje   
                      
                     
                     if (data.original.booking2 != null && data.original.booking2.products != null && data.original.booking2.products.length > 0) {
                         var product = data.original.booking2.products[0];
                         sendData.hotelcats = product != null && product.itinerary != null && product.itinerary.length > 0 ? utils._showHotelCats(product.itinerary, '_es') : [];
                         sendData.mainImageProduct = product != null && product.productimage != null ? utils.cloudinary_url(product.productimage.url, 'mainproductimage') : '';
                         sendData.tags = product != null && product.tags != null && product.tags.length > 0 ? utils._showTagsArray(product.tags) : [];
                     };
                     template = mailtemplates.adminchat;
            	 }
            	 
            	 // ******************************
            	 //  1.2) es un mensaje de una quote
            	 // ******************************            	 
            	 else if(data.current.quote != null){            		
            		 sendData.quote = data.original.quote;
            		 sendData.querycode = data.current.userquery.code;
            		 sendData.request = data.current.userquery;
            		 sendData.request.affiliate = data.current.affiliate;
            		 sendData.dmc = {
            				 company : {
            					 name : to.name
            				 }
            		 }
            		 sendData.url = subscriberworker.core.get('frontadminurl') +'/omt-response?code='+data.original.quote.code; 
            		 template = mailtemplates.adminChatTailor;
            	 }
            	 
            	 
            	 // ***************************
            	 //2)  detectar el destinatario
            	 // ***************************            	 
            	 // 2.1) si lo manda un afiliado para admin
                 toEmail = to.email;
            	 if(from.type == 'affiliate'){
            		 toEmail = 'notifications@yourttoo.com';
            	 }
            	 // 2.2) si lo manda un traveler para admin (no funcionara hasta que omt use api nueva)
            	 else if(from.type=='traveler'){
            		 toEmail = 'notifications@openmarket.travel';
            		 template = mailtemplates.adminchat;
            		 if(data.current.booking2 != null){ 
            			 sendData.booking.traveler = data.current.traveler;
            		 }
            		 else{ 
            			 sendData.quote.traveler = data.current.traveler;            		 
            		 }
            	 }          	 
            	 
            	 //2.4) destinatario no es admin TODO            	 
            	 else{
            		 console.log("Detectado mail a un destinatario no procesado");
            	 }
            	 
            	 
            	     
                
            	 
            	 
            	 
            	 // ******************
            	 // 3) enviar el mensaje
                 // ******************
                 mailer.SetupEmail(
                	 toEmail,
                		 //'antosango@gmail.com',
                     template, 
                     sendData, 
                     function (adminMail) {
                     msend.send(adminMail, 
                         function (ok) {
                    	 

	                     	//****************************************************
	                  		// 4.1) actializar el chat con el estado de los mensajes
	                     	//****************************************************
	              			var auxMessages = data.current.messages;
	              			auxMessages[auxMessages.length-1].from.status = 'sent';
	              			auxMessages[auxMessages.length-1].to.status = 'new';
	              			         		
	                          var updat = {
	                             $set : {
	                             	messages: auxMessages
	                             }
	                          };
	
	                                        
	                          helper.update({
	                             core: subscriberworker.core,                    
	                             query: { code: data.current.code },
	                             update: updat,
	                             collectionname: 'Chats'
	                          });
                             complete.notifyAdmin = true;
                             completeresults.messages.push('Email Sent succesfully to ',to);
                             checkandfinish();
                         }, function (err) {
                        	 
                        	//******************************************************
 	                  		// 4.2) actializar el chat con el estado de los mensajes
 	                     	//******************************************************
 	              			var auxMessages = data.current.messages;
 	              			auxMessages[auxMessages.length-1].from.status = 'error';
 	              			auxMessages[auxMessages.length-1].to.status = 'new';
 	              			 	              			         		
 	                        var updat = {
 	                             $set : {
 	                             	messages: auxMessages
 	                             }
 	                        };
 	
 	                                        
 	                        helper.update({
 	                             core: subscriberworker.core,                    
 	                             query: { code: data.current.code },
 	                             update: updat,
 	                             collectionname: 'Chats'
 	                        });
                        	 
                            completeresults.errors(err);
                            complete.notifyAdmin = true;                            
                            checkandfinish();
                     });
                 });            	 
             }  
             // no hay mensajes nuevos
        	 else{        	        		 
        		 complete.notifyAdmin = true;
        		 checkandfinish();
        	 }
        });

        
        //####### START ############  --- check conditions and launch events...  ADD CODE HERE...
        assertwatcher.on('done', function () {
            (completeresults.errors.length > 0) ? subscriberworker.seterror(completeresults.errors) : subscriberworker.setfinished({
                ResultOK: true,
                Message: 'Chat update actions finished',
                Results: completeresults.messages
            });
        });
        //exec assertions..
        for (var prop in complete) {
            assertwatcher.emit(prop);
        }

    });

    socket.on('delete', function (data) {
        subscriber.setfinished();
    });
}