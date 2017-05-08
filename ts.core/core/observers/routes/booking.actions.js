module.exports = function (subscriberworker, socket) {
    
    var common = require('yourttoo.common');
    var utils = require('../../tools');

    socket.on('new', function (data) {
        //TASK ON NEW AFFILIATE:
        console.log('NEW BOOKING SUBSCRIBER ACTIONS STUFF....');
        //console.log(" +++ dmc: ", data.dmc);
        //1) Send EMAILS: **************** START *********************
        console.log('New Booking: ' + data.idBooking);
        
        
        // templates
        var mailtemplates = {
            affiliate: 'ytoaffiliatebooking', //the mail for the affiliate
            yto: 'ytobooking', //the mail for OMT/YTO Admin reserva b2b
            omt: 'omtbooking', //the mail for OMT/YTO Admin reserva b2c
            dmc: 'dmcbooking'
        };
        var helper = require('./affiliate.actions.helpers');
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        var alldone = {
            mails: 0,
            total: 3,
            mailbodys: []
        };

        // ***********************************
        // si es una booking de un tailormade 
        // ***********************************
        if(data.queryCode != null){        	
        	
        	console.log("++ query updating: ",data.queryCode);
  	
	        var upd = {
	            $set : {
	                state: 'close',
	                idBooking : data.idBooking
	            }
	        };
	        	        
	        
	        // mail del afilida
	        var mail ='';
	        if(data.affiliate != null){
	        	if(data.affiliate.contact != null && data.affiliate.contact.bookingContact != null){
	        		mail = data.affiliate.contact.bookingContact.email;
	        	}
	        	else{
	        		mail = data.affiliate.contact.email;
	        	}
	        }
	        else{
	        	mail = data.traveler.email;
	        }
	        
	        
	        // *******************************************
	        // 1) actualizar query y quotes 
	        // query estado close y guardar idbooking y el historico
	        // quote estado y idebooking
	        // *******************************************
	        helper.updateQuotes({
	            core: subscriberworker.core,
	            query: { code: data.queryCode },
	            update: upd,
	            collectionname: 'UserQueries',
	            quotecode : data.quoteCode,// quitar
	            idBooking :  data.idBooking,// quitar
	            mail : mail// quitar
	        }, function (result) {
	        	
	        	
	        	console.log("++ query updated ok: ");
 
	        	// ******************************************************************************************************************
	        	// 2) recorrer las quotes y notificar por mail a los dmcs que respondieron al tailormade, que la query esta terminada
	        	// ******************************************************************************************************************
	        	// no se mandan mail a los dmcs por descartar o cancelar querys
//	        	for(var itQ=0; itQ < result.quotes.length; itQ++){
//	        		console.log("++ quote a procesar: ",result.quotes[itq].code,'- status: ',result.quotes[itq].code);
//	        			        		
//       			   // si es una quotes no ganadoras y estaban publicadas (published / under review) envio mail al dmc
//     			   if(result.quotes[itQ].code != data.quoteCode && (result.quotes[itQ].status == 'published' || result.quotes[itQ].status == 'under review' || result.quotes[itQ].status == 'draft')){
//     				                           				   
//     				   console.log("** quote: "+result.quotes[itQ].code+" status: "+result.quotes[itQ].status);
//     				   var quoteActual = result.quotes[itQ];
//     				   
//     				   var templateDmc;
//     				   var auxTo;                        				  
//     				   var salir=false;
//     				   var subjectDmc;
//     				   var sendData = {
//		   	 	            request : result,
//		   	 	            dmc : ''               				   	 	           
//				   	 	}; 
//     				   
//     				   // 7.1) TEMPLATE MAIL: quotes en estado draft mando mail --> query closed
//     				   if(!result.quotes[itQ].products || result.quotes[itQ].products==null || result.quotes[itQ].status == 'draft'){                        					   
//     					   templateDmc = 'dmcqueryclosed_en';
//     					   sendData.querycode = data.queryCode;
//     				   }
//     				   // under review o publisehd (tiene producto porque ha respondido) --> mando mail lost
//     				   else{
//     					   templateDmc = 'dmcquotelost_en';
//     					   sendData.quotecode = data.quoteCode;
//     				   }
//     					   
//     				   
//     				   // 7.2) ADDRESS TO:  busco el dmc asociado a la quote
//     				   for(var itDmc=0; itDmc < result.dmcs.length && !false; itDmc++){
//     					   
//     					   if(result.dmcs[itDmc].code == quoteActual.dmccode){                        						   
//     						  sendData.dmc = queryBD.dmcs[itDmc];
//         					  
//         					  if(result.dmcs[itDmc].contact.bookingContact!=null && result.dmcs[itDmc].contact.bookingContact.email!=null){
//         						  auxTo=result.dmcs[itDmc].contact.bookingContact.email;
//         					  } 
//         					  else{
//         						  auxTo=result.dmcs[itDmc].contact.email;
//         					  }
//     					   }
//     				   }
//     				   
//     				   // 7.3) SEND MAIL
//     				   console.log("direcion de contacto del dmc: ",auxTo);
//     				   console.log("subject: ",subjectDmc);
//     				   console.log("templateDmc: ",templateDmc);
// 				  
//				     
//				       mailer.SetupEmail(
//			    		   //auxTo,
//			    		   'antosango@gmail.com',
//			    		   templateDmc, 
//			               sendData, 
//			               function (dmcMailQuote) {
//			               msend.send(dmcMailQuote, 
//			                   function (ok) {                
//			   	                //alldone.mailbodys.push(dmcMailQuote);				   	               
//			   	                console.log("+++ Mail enviado a ADMIN for quote OK");
//			   	                
//			               }, function (err) {
//			               		console.log("ERROR sending mail to ADMIN for new booking. Details: ",err);
//			                      // subscriberworker.seterror(err);
//			               });
//			           });
//     			   }
//	        		
//	        		//*************
//	        	}	        	
	        	
	        	
	        	
	        	
	        }, function (err) {
	        	console.log("Error in update quote. Details: ",err);
	        });
	        console.log("++ query update succseccfully: ",data.queryCode);
        }
        

        
        //**************************************************
        
        console.log("++ continuo con la booking ");
        
        
        
        
        // rellenar los datos a enviar
        var sendData = {};        
        sendData.booking = data;

      
        //ad product, image, tags y hotelcats
        var product = JSON.parse(data.product);   
        sendData.product = product;        
        sendData.hotelcats = utils._showHotelCats(product.itinerary,'_es');
        sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
        sendData.tags = utils._showTagsArray(product.tags);
        sendData.idbooking = data.idBooking;
        
        // incluir el codigo de la query si es un tailormade
        if(data.queryCode!=null){
        	sendData.query = { code : data.queryCode};
        }
        
        // add url Call to Action        
        sendData.url = subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+data.idBooking;
                
       
        // **************************        
        //the mail for OMT/YTO Admin
        // **************************
        
        var templateAdmin ;
        var toAdmin;
        //es b2b
        if(sendData.booking.affiliate != null){
        	toAdmin = 'notifications@yourttoo.com';        
        }
        
        // es b2c
        else {
        	toAdmin = 'notifications@openmarket.travel';
        }        
      
        
        
        mailer.SetupEmail(
        	toAdmin,        	
        	mailtemplates.omt, 
            sendData, 
            function (adminMail) {
            msend.send(adminMail, 
                function (ok) {                
	                alldone.mailbodys.push(adminMail);
	                alldone.mails++;
	                console.log("+++ Mail enviado a ADMIN OK");
	                if (alldone.mails == alldone.total) {
	                    subscriberworker.setfinished({
	                        ResultOK: true,
	                        Message: 'All mails sended to affiliate, omt and dmc',
	                        Mails: alldone.mailbodys
	                    });
	                }
            }, function (err) {
            		console.log("ERROR sending mail to ADMIN for new booking. Details: ",err);
                    subscriberworker.seterror(err);
            });
        });
        
        
        // ****************        
        // the mail for DMC 
        // ****************
        var mailDmc ;
        // add url Call to Action
        sendData.url = subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+data.idBooking;
        
        if (data.dmc.contact.bookingContact !== null && data.dmc.contact.bookingContact !== undefined && data.dmc.contact.bookingContact.email !== null &&
        		data.dmc.contact.bookingContact.email !== undefined){
        	mailDmc = data.dmc.contact.bookingContact.email;
        } else{
        	mailDmc = data.dmc.user.email;
        }
        
        // incluir el codigo de la query si es un tailormade
        if(data.queryCode!=null){
        	sendData.query = { code : data.queryCode};
        }
               
        
        mailer.SetupEmail(
            mailDmc,        	
            mailtemplates.dmc, 
            sendData, 
            function (dmcMail) {
            msend.send(dmcMail, 
                function (ok) {
            		alldone.mailbodys.push(dmcMail);
            		alldone.mails++;
            		console.log("+++ Mail enviado a DMC OK");
	                if (alldone.mails == alldone.total) {
	                    subscriberworker.setfinished({
	                        ResultOK: true,
	                        Message: 'All mails sended to affiliate, omt and dmc',
	                        Mails: alldone.mailbodys
	                    });
	                }
            }, function (err) {
            		console.log("ERROR sending mail to DMC for new booking. Details: ",err);
                    subscriberworker.seterror(err);
            });
        });
        
        
        
        // *******************************
        // send the mail for the affiliate
        // *******************************
        var toAffiliate;
        // encontrar el mail de contacto del afiliado
        if (data.affiliate.contact.bookingContact !== null && data.affiliate.contact.bookingContact !== undefined){
        	toAffiliate = data.affiliate.contact.bookingContact.email;
        } else {
        	toAffiliate = data.affiliate.contact.email;
        }
        
        // add url Call to Action
        sendData.url = subscriberworker.core.get('fronturl') +'/affiliate/booking-detail/?idbooking='+data.idBooking+"#tabadmin";      
                
        mailer.SetupEmail(        		
        	toAffiliate,
            mailtemplates.affiliate, 
            sendData, 
            function (afiMail) {
            //send emails...
                msend.send(afiMail, 
                function (ok) {
                	
                	console.log("+++ Mail enviado a afiliado OK");
                    alldone.mailbodys.push(afiMail);
                    
                    // actualizar el historico de la booking con los mails enviados
                    var historicYTO = {
                        date: new Date(),
                        state: data.state,
                        user: data.affiliate.user.email,                     
                        mailsend: [{ name: mailtemplates.affiliate, date: new Date() },{name: templateAdmin, date: new Date()},{name:  mailtemplates.dmc, date: new Date()}]
                    };
                    helper.addhistoric({
                        core: subscriberworker.core,
                        booking: data,
                        historic: historicYTO
                    }, function (result) {
                        alldone.mails++;
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
                	console.log("ERROR sending mail to AFFILIATE for new booking. Details: ",err);
                    subscriberworker.seterror(err);
                });
            });
        
        
        
    });
    
    
    
    // ******************
    // reserva modificada
    // ******************
    socket.on('update', function (data) {
        
        console.log('A BOOKING HAS BEEN UPDATED...');
        
        var ml = require('../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        

        var booking_edited = data.current;
        var booking_original = data.original;
        booking_edited.affiliate = booking_original.affiliate;// el afiliado viene populado en la reserva original, lo copio en la editada
        booking_edited.dmc = booking_original.dmc;// el dmc viene populado en la reserva original, lo copio en la editada
       // booking_edited.product = JSON.parse(booking_edited.product);//farseo el producto del product
        
        
        
        //flux control
        var assertwatcher = common.eventtrigger.eventcarrier(common.utils.getToken());
        //completion
        
        //###### Complete properties to check - Add property name to force new checkings...
        var complete = {        		
            notifyCancellationOwner: false,
            notifyCancellationDMC: false,
            notifyCancellationAdmin: false,
            notifyTranferChangeDMC: false,
            notifyTransferChangeAdmin: false,
            notifyTravelersChangeDMC: false,
            notifyTravelersChangeAdmin: false
        };
        
        //
        // INIT CANCELATION notifications
        // 
        
        // templates de los mails
        var mailtemplates = {
            cancelltraveler:   'userbookingcancelled',
            cancelldmc:        'dmcbookingcancelled',
            cancellaffiliate:  'ytoaffiliatecancellbooking', //the mail for the affiliate
            cancellyto:        'ytoadmincancellbooking', //the mail for OMT/YTO Admins
            changesadmin :     'ytoadminbookingchange', //mail para notificar a ADMIN un cambio de pax por parte de afiliado
            changesdmc :       'dmcbookingchange',//mail para notificar a DMC un cambio de pax por parte de afiliado
            changesaffiliate : 'ytoaffiliateupdatedbooking'//mail para notificar a AFFILIATE un cambio de pax por parte de afiliado           
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
         * Si es cancelacion de una reserva por un traveler o afiliado
         */
        assertwatcher.on('notifyCancellationOwner', function () {
        	
        	var changed = false;
        	
            if (booking_edited.cancelDate !== null && booking_original.cancelDate !== booking_edited.cancelDate){
            	changed = true;
            }
            
            if(changed){ 
                console.log ('* notifyCancellationOwner: booking: '+booking_original.idBooking+' cancelled');                
                // send notification to booking OWNER
                var owner = {};
                owner.is =''; // affiliate or traveler
                owner.email = '';
                owner.mailtemplate ='';
                var sendData = {};
                if (booking_edited.traveler !== null && booking_edited.traveler !== undefined){
                    owner.is = 'traveler';
                    owner.email = booking_edited.traveler.email;
                    owner.mailtemplate = mailtemplates.cancelltraveler;
                    sendData.ca ={
                        url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                        txt : 'IR A LA RESERVA'
                    };
                } else if (booking_edited.affiliate !== null && booking_edited.affiliate !== undefined){
                    owner.is = 'affiliate';                    
                    
                    // encontrar el mail de contacto
                    if (booking_edited.affiliate.contact.bookingContact !== null && booking_edited.affiliate.contact.bookingContact !== undefined){
                        owner.email = booking_edited.affiliate.contact.bookingContact.email;
                    } else {
                        owner.email = booking_edited.affiliate.contact.email;
                    }
                                     
                    owner.mailtemplate = mailtemplates.cancellaffiliate;
                    sendData.ca ={                    		
                        url : subscriberworker.core.get('fronturl') +'/affiliate/booking-detail/?idbooking='+booking_original.idBooking+'#tabadmin',
                        txt : 'IR A ADMINISTRACIÓN'
                    };
                }

            
                sendData.booking = booking_edited;
                sendData.idbooking = booking_edited.idBooking;
                //the mail for owner
                mailer.SetupEmail(
                    owner.email,  
                    owner.mailtemplate, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyCancellationOwner = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                        }, function (err) {
                            completeresults.errors(err);
                            complete.notifyCancellationOwner = true;
                            //subscriberworker.seterror(err);
                            checkandfinish();
                    });
                });
                //
                //
            } else {
                complete.notifyCancellationOwner = true;
                checkandfinish();
            }
        });

        /**
         * reserva cancelada notificacion al dmc
         */
        assertwatcher.on('notifyCancellationDMC', function () {
        	var cancelled = false;
        	
            if (booking_edited.cancelDate !== null && booking_original.cancelDate !== booking_edited.cancelDate){
            	cancelled = true;
            }

            if(cancelled){
            	
                console.log ('* notifyCancellationDMC: booking'+booking_original.idBooking+' cancelled');
                
                // send notification to DMC               
                var maildmc = '';
              
                if (booking_original.dmc.contact.bookingContact !== null &&
                    booking_original.dmc.contact.bookingContact !== undefined &&
                 booking_original.dmc.contact.bookingContact.email !== null &&
                 booking_original.dmc.contact.bookingContact.email !== undefined){
                    maildmc = booking_original.dmc.contact.bookingContact.email;
                } else{
                    maildmc = booking_original.dmc.user.email;
                }
                               
                var sendData = {};
                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                    txt : 'GO TO CANCELLATION'
                };
                sendData.booking = booking_edited;
                sendData.idbooking = booking_edited.idBooking;
                
                //the mail for DMC
                mailer.SetupEmail(
                    maildmc,                	
                    mailtemplates.cancelldmc, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyCancellationDMC = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                        }, function (err) {
                            
                            //subscriberworker.seterror(err);
                            complete.notifyCancellationDMC = true;
                            completeresults.errors.push(err);
                            checkandfinish();
                    });
                });

            } else {
                complete.notifyCancellationDMC = true;
                checkandfinish();
            }
        });

        /**
         * notificacion de cancelacion para admin
         */
        assertwatcher.on('notifyCancellationAdmin', function () {
        	
        	var cancelled = false;
        	
            if (booking_edited.cancelDate !== null && booking_original.cancelDate !== booking_edited.cancelDate){
            	cancelled = true;
            }
           
            if(cancelled){
                console.log ('*notifyCancellationAdmin: booking'+booking_original.idBooking+' cancelled');
                // send notification to booking ADMIN
                // 
                var sendData = {};
                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                    txt : 'IR A LA RESERVA'
                };
                
                var product = JSON.parse(booking_edited.product);
                sendData.booking = booking_edited;
                sendData.product = JSON.parse(booking_edited.product);
                sendData.idbooking = booking_edited.idBooking;
                sendData.modification = "Información de traslados.";
                sendData.hotelcats = utils._showHotelCats(product.itinerary,'_es');
                sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
                sendData.tags = utils._showTagsArray(product.tags);                
                
                var adminMail = 'notifications@yourttoo.com';
                                
                //the mail for OMT/YTO Admins
                mailer.SetupEmail(
                	adminMail,                	
                    mailtemplates.cancellyto, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyCancellationAdmin = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                    }, function (err) {
                        //subscriberworker.seterror(err);
                            complete.notifyCancellationAdmin = true;
                            completeresults.errors.push(err);
                            checkandfinish();
                    });
                });
                // 
                // 
            } else {
                complete.notifyCancellationAdmin = true;
                checkandfinish();
            }
        });

        //
        // INIT TRANSFER notifications
        // 


        
        
        /**
         * notificar cambio de transfer al dmc
         */
         assertwatcher.on('notifyTranferChangeDMC', function () {
        	
        	var change = false;
            if (booking_original.meetingdata !== null && 
                booking_original.meetingdata !== undefined && 
                booking_original.meetingdata !== '' && 
                booking_original.meetingdata !== booking_edited.meetingdata){
            	change = true;
            }
                        
            if(change){
               
                // send notification to DMC 
                var maildmc = '';                

                if (booking_original.dmc.contact.bookingContact !== null &&
                    booking_original.dmc.contact.bookingContact !== undefined &&
                 booking_original.dmc.contact.bookingContact.email !== null &&
                 booking_original.dmc.contact.bookingContact.email !== undefined){
                    maildmc = booking_original.dmc.contact.bookingContact.email;
                } else{
                    maildmc = booking_original.dmc.user.email;
                }
                
                var sendData = {};
                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                    txt : 'GO TO BOOKING'
                };
                                
                sendData.idbooking = booking_edited.idBooking;
                sendData.booking = booking_edited;
                sendData.modification = "Transfer's information.";
                //the mail for OMT/YTO Admins
                mailer.SetupEmail(
                    maildmc,  
                    mailtemplates.changesdmc, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyTranferChangeDMC = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                    }, function (err) {
                        //subscriberworker.seterror(err);
                            complete.notifyTranferChangeDMC = true;
                            completeresults.errors.push(err);
                            checkandfinish();
                    });
                });
               
            } else {
                complete.notifyTranferChangeDMC = true;
                checkandfinish();
            }
        });
         
         
         /**
          *  mail al Admin OMT avisando del cambio de traslados
          */
         assertwatcher.on('notifyTransferChangeAdmin', function () {
        	 var change = false;
             if (booking_original.meetingdata !== null && 
                 booking_original.meetingdata !== undefined && 
                 booking_original.meetingdata !== '' && 
                 booking_original.meetingdata !== booking_edited.meetingdata){
             	change = true;
             }

             if(change){
            	
            	// send notification to admin
                var mailAdmin = 'notifications@yourttoo.com';
            	                
                var sendData = {};
                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                    txt : 'IR A LA RESERVA'
                };
                var product = JSON.parse(booking_edited.product);
                sendData.booking = booking_edited;
                sendData.product = JSON.parse(booking_edited.product);
                sendData.idbooking = booking_edited.idBooking;
                sendData.modification ={
                		text : "Información de traslados.",
                		type : "trans"
                };
                sendData.hotelcats = utils._showHotelCats(product.itinerary,'_es');
                sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
                sendData.tags = utils._showTagsArray(product.tags);
                
                //the mail for OMT/YTO Admins
                mailer.SetupEmail(
                		mailAdmin,  
                    mailtemplates.changesadmin, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyTransferChangeAdmin = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                        }, function (err) {
                            complete.notifyTransferChangeAdmin = true;
                            completeresults.errors.push(err);
                            checkandfinish();
                        //subscriberworker.seterror(err);
                    });
                });                
            } else {            	
                complete.notifyTransferChangeAdmin = true;
                checkandfinish();
            }
        });
         

        
        //
        // INIT TRAVELERS CHANGE notifications
        // 

         
         /**
          *  mail al owner (afiliado/traveler) avisando del cambio de travelers
          */
         assertwatcher.on('notifyTravelersChangeOwner', function () {
        	 
        	 // 1) detectar cambio en los pax
            var haveTravelerchange = false;
            console.log("*** (notifyTravelersChangeOwner) inicio de comprobacion cambio de pasajeros.");
            for (var i = booking_original.roomDistribution.length - 1; i >= 0; i--) {
            	console.log("--- pasageros book original: ",JSON.stringify(booking_original.roomDistribution[i].paxList));
            	console.log("--- pasageros book modificada: ",JSON.stringify(booking_edited.roomDistribution[i].paxList));
                if (JSON.stringify(booking_original.roomDistribution[i].paxList)
                    !== JSON.stringify(booking_edited.roomDistribution[i].paxList)){                	
                    haveTravelerchange = true;
                }
            }
      
            // 2) notificar al owner (afiliado o traveler)            
            if (haveTravelerchange){                
                
                
              // send notification to booking OWNER 
              var owner = {};
              owner.is =''; // affiliate or traveler
              owner.email = '';
              owner.mailtemplate ='';
              var sendData = {};
              if (booking_edited.traveler !== null && booking_edited.traveler !== undefined){
                  owner.is = 'traveler';
                  owner.email = booking_edited.traveler.email;
                  owner.mailtemplate = mailtemplates.cancelltraveler;
                  sendData.ca ={
                      url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                      txt : 'IR A LA RESERVA'
                  };
              } else if (booking_edited.affiliate !== null && booking_edited.affiliate !== undefined){
            	              	  
            	  console.log("*** afiliado: ",booking_edited.affiliate);
                  owner.is = 'affiliate';
                  
                  // obtener la direccion del afiliado
                  if (booking_edited.affiliate.contact.bookingContact !== null && booking_edited.affiliate.contact.bookingContact !== undefined){
                      owner.email = booking_edited.affiliate.contact.bookingContact.email;
                  } else {
                      owner.email = booking_edited.affiliate.contact.email;
                  }                  
                   
                  // cargar el template
                  owner.mailtemplate = mailtemplates.changesaffiliate;
                  sendData.ca ={
                      url : subscriberworker.core.get('fronturl') +'/affiliate/booking-detail/?idbooking='+booking_original.idBooking,
                      txt : 'IR A LA RESERVA'
                  };
                  
                  console.log("*** booking perteneciente a un afiliado");
                  console.log("*** mail: ",owner.email);
                  console.log("*** template: ",owner.mailtemplate);
              }

              
              sendData.idbooking = booking_edited.idBooking;
              sendData.modification = "Información de los pasajeros.";
              //the mail for OMT/YTO Admins
              mailer.SetupEmail(
            		  owner.email,  
            		  owner.mailtemplate, 
            		  sendData, 
            		  function (adminMail) {
            			  msend.send(adminMail, 
	                    		function (ok) {
                                complete.notifyTravelersChangeOwner = true;
                                completeresults.messages.push('Email Sent succesfully');
            				    checkandfinish();
            			  }, function (err) {
	                        //subscriberworker.seterror(err);
                            complete.notifyTravelersChangeOwner = true;
                            completeresults.errors.push(err);
                            checkandfinish();
            			  });
            		  });

            } else {
            	console.log("*** (notifyTravelersChangeOwner) NO detectado cambio de paxes");
                complete.notifyTravelersChangeOwner = true;
                checkandfinish();
            }
        });
         
         
         
         /**
          *  mail al Admin OMT avisando del cambio de travelers
          */
         assertwatcher.on('notifyTravelersChangeAdmin', function () {
            var haveTravelerchange = false;
            var originalPax = '';
            var finalPax = '';            
            
            // 1) detectar cambio en los pax
            for (var i = booking_original.roomDistribution.length - 1; i >= 0; i--) {
                     		         
                if (JSON.stringify(booking_original.roomDistribution[i].paxList)
                    !== JSON.stringify(booking_edited.roomDistribution[i].paxList)){                	
                    haveTravelerchange = true;
                }
            }
                    
            // 2) notificar al ADMIN
            if (haveTravelerchange){            	
            	
            	//obtener los nombres de los pax
            	for (var i = booking_original.roomDistribution.length - 1; i >= 0; i--) {
            		for (var j = booking_original.roomDistribution[i].paxList.length-1; j >=0; j--){
            			originalPax+= booking_original.roomDistribution[i].paxList[j].lastName+' '+booking_original.roomDistribution[i].paxList[j].name+", ";
            			finalPax+= booking_edited.roomDistribution[i].paxList[j].lastName+' '+booking_edited.roomDistribution[i].paxList[j].name+",";
            		}                     
            	}          	
            	
                // send notification to ADMIN
                var mailAdmin = 'notifications@yourttoo.com';                 
                
                var sendData = {};
                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                    txt : 'IR A LA RESERVA'
                };
                var product = JSON.parse(booking_edited.product);
                sendData.booking = booking_edited;
                sendData.product = JSON.parse(booking_edited.product);
                sendData.idbooking = booking_edited.idBooking;
                sendData.modification ={
                		text : "Información de pasajeros.",
                		type : "paxs"
                };             
                sendData.hotelcats = utils._showHotelCats(product.itinerary,'_es');
                sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
                sendData.tags = utils._showTagsArray(product.tags);
                sendData.oldPax = originalPax;
                sendData.newPax = finalPax;
                //the mail for OMT/YTO Admins
                mailer.SetupEmail(
                		mailAdmin,  
                    mailtemplates.changesadmin, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyTravelersChangeAdmin = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                    }, function (err) {
                        //subscriberworker.seterror(err);
                            complete.notifyTravelersChangeAdmin = true;
                            completeresults.errors.push(err);
                            checkandfinish();
                    });
                });
                // 
                // 
            } else {            	
                complete.notifyTravelersChangeAdmin = true;
                checkandfinish();
            }
        });
         
         
         /**
          *  mail al DMC avisando del cambio de travelers
          */
         assertwatcher.on('notifyTravelersChangeDMC', function () {
            var haveTravelerchange = false;            
            
            // 1) detectar cambio en los pax
            for (var i = booking_original.roomDistribution.length - 1; i >= 0; i--) {            	
                if (JSON.stringify(booking_original.roomDistribution[i].paxList)
                    !== JSON.stringify(booking_edited.roomDistribution[i].paxList)){                
                    haveTravelerchange = true;
                }
            }
            
            // 2) notificar al DMC          
            if (haveTravelerchange){
            	
                // send notification to DMC
                var maildmc = '';                
            
                if (booking_original.dmc.contact.bookingContact !== null &&
                    booking_original.dmc.contact.bookingContact !== undefined &&
                 booking_original.dmc.contact.bookingContact.email !== null &&
                 booking_original.dmc.contact.bookingContact.email !== undefined){
                    maildmc = booking_original.dmc.contact.bookingContact.email;
                } else{
                    maildmc = booking_original.dmc.user.mail;
                }
                                
                
                var sendData = {};
                sendData.ca ={
                    url : subscriberworker.core.get('frontadminurl') +'/dmc-booking?idbooking='+booking_original.idBooking,
                    txt : 'GO TO BOOKING'
                };
                sendData.booking = booking_edited;
                sendData.idbooking = booking_edited.idBooking;
                sendData.modification = "Passengers information.";
                //the mail for OMT/YTO Admins
                mailer.SetupEmail(
                    maildmc,  
                    mailtemplates.changesdmc, 
                    sendData, 
                    function (adminMail) {
                    msend.send(adminMail, 
                        function (ok) {
                            complete.notifyTravelersChangeDMC = true;
                            completeresults.messages.push('Email Sent succesfully');
                            checkandfinish();
                    }, function (err) {
                        //subscriberworker.seterror(err);
                            complete.notifyTravelersChangeDMC = true;
                            completeresults.errors.push(err);
                            checkandfinish();
                    });
                });
                // 
                // 
            } else {            	
                complete.notifyTravelersChangeDMC = true;
                checkandfinish();
            }
        });


        //####### START ############  --- check conditions and launch events...  ADD CODE HERE...
        assertwatcher.on('done', function () {
            (completeresults.errors.length > 0) ? subscriberworker.seterror(completeresults.errors) : subscriberworker.setfinished({
                ResultOK: true,
                Message: 'Affiliate update actions finished',
                Results: completeresults.messages
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