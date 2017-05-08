
module.exports.templates = function (mailspath) { 
    var templates = {
        travelerthanks_es: mailspath + '/user/user-01-welcome.html',
        travelerthanks_en: mailspath + '/user/user-01-welcome.html',
        estravelermessage: mailspath + '/user/es-user-26-message.html.swig',
        entravelermessage: mailspath + '/user/en-user-26-message.html.swig',   
        
        dmcthanks_en: mailspath + '/dmc/en-dmc-01-thanks.html',
        dmcwelcome_en: mailspath + '/dmc/en-dmc-02-welcome.html',
        dmcemailconfirmed_en: mailspath + '/dmc/en-dmc-03-email-confirmed.html.swig',
        dmcemailautopublish_en: mailspath + '/dmc/en-dmc-03.1-you-can-publish.html.swig',
        dmcroomrqbooking_en: mailspath + '/dmc/en-dmc-11-new-booking-triple-single-room.html.swig',
        dmcthanks_es: mailspath + '/dmc/es-dmc-01-thanks.html',
        dmcwelcome_es: mailspath + '/dmc/es-dmc-02-welcome.html',
        dmcemailconfirmed_es: mailspath + '/dmc/es-dmc-03-email-confirmed.html',
        dmcforgotpassword: {
            path: mailspath +'/dmc/en-dmc-000-forgot.html.swig',
            subject: 'Password Recovery Request',
            sender: 'userinfo@openmarket.travel',
            replaces: null
        },
        dmcbooking: {
            path: mailspath + '/dmc/en-dmc-12-new-booking.html.swig', 
            subject: 'New Booking %idbooking%',
            sender: 'sender@openmarket.travel',
            replaces: ['idbooking']
        },
        dmcbookingcancelled: {
            path: mailspath + '/dmc/en-dmc-18-booking-cancell.html.swig', 
            subject: 'Booking %idbooking% has been CANCELLED',
            sender: 'sender@openmarket.travel',
            replaces: ['idbooking']
        },        
        dmcquotelost_en: {
            path: mailspath + '/dmc/en-dmc-14-quote-lost.html.swig', 
            subject: 'Your quote %quotecode% has been not selected.',
            sender: 'sender@openmarket.travel',
            replaces: ['quotecode']
        },        
        dmcqueryclosed_en: {
            path: mailspath + '/dmc/en-dmc-13-query-closed.html.swig', 
            subject:'The request %querycode% is canceled.',
            sender: 'sender@openmarket.travel',
            replaces: ['querycode']
        },                
        
        dmcnewrequest: mailspath + '/dmc/dmc-07-new-request.html.swig',
        dmcnewrequest_en: mailspath + '/dmc/en-dmc-07-new-request.html.swig',
        // change name to new api
        dmcnewquote_en: {
            path: mailspath + '/dmc/en-dmc-07-new-request.html.swig',
            subject: 'New Tailor Made request %querycode% from %username%',
            sender: 'sender@openmarket.travel',
            replaces: ['querycode','username']
        },        
        dmcquotewin_en: mailspath + '/dmc/en-dmc-15-quote-won.html.swig',        
        dmcquotediscard_en: mailspath + '/dmc/en-dmc-16-quote-discarded.html.swig',
        
        dmcquerycanceled_en: mailspath + '/dmc/en-dmc-17-query-canceled.html.swig',
        dmcbookingchange: {
            path: mailspath + '/dmc/en-dmc-19-booking-change.html.swig', 
            subject: 'Booking %idbooking% has been MODIFIED',
            sender: 'sender@openmarket.travel',
            replaces: ['idbooking']
        },
        
        dmcnewmessagetailormade: {
            path: mailspath + '/dmc/en-dmc-08-new-message.html.swig', 
            subject: 'New message Tailor Made ID:  %querycode%',
            sender: 'sender@openmarket.travel',
            replaces: ['querycode']
        },
               
        omtnewmessagetailormade: {
            path: mailspath + '/omt/omt-16-query-msg.html.swig', 
            subject: 'Nuevo mensaje Tailor Made ID: - %querycode%',
            sender: 'sender@yourttoo.com',
            replaces: ['querycode']
        },
        omtquotediscard: {
        	path: mailspath + '/omt/omt-13-quote-discarded.html.swig',        	  
            subject: 'Descartada una respuesta petición a medida:  %querycode%',
            sender: 'sender@yourttoo.com',
            replaces: ['querycode']
        },        
        omtquotecanceled: mailspath + '/omt/omt-14-query-canceled.html.swig',
        omtnewdmc: mailspath + '/omt/omt-01-new-dmc.html',
        omtdmcchanged: mailspath + '/omt/omt-02-dmc-changed-profile.html.swig',
        omtgunoca: mailspath + '/omt/omt-03-gu-noca.html.swig',
        omtmessage: mailspath + '/omt/omt-10-message.html.swig',
        ytoadminmessage: {
            path: mailspath + '/omt/38-admin-message.html.swig',
            subject: 'Nuevo mensaje de %name%',
            sender: 'sender@yourttoo.com',
            replaces: ['name']
        },
        omtroomrqbooking: mailspath + '/omt/omt-04-new-booking-triple-single-room.html.swig',
        omtroomrqcancelled: mailspath + '/omt/omt-11-triple-single-cancelled.html.swig',
        omtroomrqconfirmed: mailspath + '/omt/omt-12-triple-single-confirmed.html.swig',
        omtnewrequest: mailspath + '/omt/omt-07-new-request.html.swig',
        omtprebooking: mailspath + '/omt/omt-05-new-prebooking.html.swig',
        
        ytobooking:{
            path: mailspath + '/omt/36-admin-new-booking.html.swig', 
            subject: 'Nueva reserva de afiliado - %idbooking%',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },
        omtbooking:{
            path: mailspath + '/omt/omt-06-new-booking.html.swig', 
            subject: 'Nueva reserva de afiliado - %idbooking%',
            sender: 'sender@openmarket.travel',
            replaces: ['idbooking']
        },
        	
        omtnewaffiliate: {
            path: mailspath + '/omt/31-admin-new-agency.html.swig', 
            subject: 'Nuevo registro de afiliado - %company.name%',
            sender: 'sender@yourttoo.com',
            replaces: ['company.name']
        },
        omtnewaffiliaterequest: {
            path: mailspath + '/omt/omt-07-new-request.html.swig', 
            subject: 'Nueva solicitud de %companyname% ID: %querycode%',
            sender: 'sender@yourttoo.com',
            replaces: ['companyname', 'querycode']
        },
        userroomrqbooking: mailspath + '/user/user-22-request-booking-triple-single.html.swig',
        userprebooking: mailspath + '/user/user-19-prebooking.html.swig',
        userbookingtransfer: mailspath + '/user/user-24-booking-transfer.html.swig',
        userbooking: mailspath + '/user/user-21-booking-100.html.swig',
        userbookingcancelled: {
            path: mailspath + '/user/user-29-booking-cancelled.html.swig', 
            subject: 'Reserva %idbooking% cancelada',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },
        userforgotpassword: {
            path: mailspath + '/user/user-000-forgot.html.swig',
            subject: 'Password Recovery Request',
            sender: 'userinfo@openmarket.travel',
            replaces: null
        },
        userremember60: mailspath + '/user/user-20-booking-remember-60.html.swig',
        userroomrqcancelled: mailspath + '/user/user-22.1-request-triple-single-cancelled.html.swig',
        userroomrqconfirmed: mailspath + '/user/user-22.2-request-triple-single-confirmed.html.swig',
        userremembervoucher: mailspath + '/user/es-user-30-remember-voucher.html.swig',
        usernewrequest: mailspath + '/user/user-09-quote-sent.html.swig',
        usernewquote: mailspath + '/user/user-12-new-quote.html.swig',    
        usernewmessage: mailspath + '/user/user-17-new-chat-msg.html.swig',
        
        
        
        ytoaffiliatecontact: {
            path: mailspath + '/yto/00-message.html.swig', 
            subject: 'Gracias por tu mensaje',
            sender: 'sender@yourttoo.com',
            replaces: null
        },
        ytoaffiliatethanks: {
            path: mailspath + '/yto/01-account-welcome.html.swig', 
            subject: 'Gracias por registrarte',
            sender: 'sender@yourttoo.com',
            replaces: null
        },
        ytoaffiliateconfirmed: {
            path: mailspath + '/yto/02-account-email-confirmed.html.swig', 
            subject: 'Cuenta habilitada',
            sender: 'sender@yourttoo.com',
            replaces: null
        },
        ytoaffiliateforgotpassword: {
            path: mailspath + '/yto/03-account-password-forgotten.html.swig', 
            subject: 'Recuperar contraseña',
            sender: 'sender@yourttoo.com',
            replaces: null
        },
        ytoaffiliatechangeemail: {
            path: mailspath + '/yto/04-account-email-changed.html.swig', 
            subject: 'Correo electrónico confirmado.',
            sender: 'sender@yourttoo.com',
            replaces: null
        },
        ytoaffiliatechangepassword: {
            path: mailspath + '/yto/05-account-password-changed.html.swig', 
            subject: 'Contraseña restablecida.',
            sender: 'sender@yourttoo.com',
            replaces: null
        },
        ytoaffiliatebooking: {
            path: mailspath + '/yto/11-booking-new.html.swig', 
            subject: 'Reserva - %idbooking%',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },
        ytoaffiliatenewrequest: {
            path: mailspath + '/yto/22-tailormade-new.html.swig', 
            subject: 'Tu petición a medida ID: %querycode%',
            sender: 'sender@yourttoo.com',
            replaces: ['querycode']
        },
        ytoaffiliatenewquote: {
            path: mailspath + '/yto/23-tailormade-quote.html.swig', 
            subject: 'Nueva cotizacion para tu viaje a medida ID: %querycode%',
            sender: 'sender@yourttoo.com',
            replaces: ['querycode']
        },
        ytoaffiliatenewmessage: {
            path: mailspath + '/yto/23-tailormade-quote.html.swig', 
            subject: 'Nuevo mensaje de %dmccompanyname%',
            sender: 'sender@yourttoo.com',
            replaces: ['dmccompanyname']
        },
        ytoaffiliaterememberpayment: {
            path: mailspath + '/yto/12-booking-payment-second-pendending.html.swig', 
            subject: 'Completa el pago de la reserva - %idbooking%',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },
        ytoaffiliatecancellbooking: {
            path: mailspath + '/yto/13-booking-cancelled.html.swig', 
            subject: 'Reserva - %idbooking% cancelada',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },
        ytoaffiliateupdatedbooking: {
            path: mailspath + '/yto/15-booking-updated-by-affiliate.html.swig', 
            subject: 'Reserva - %idbooking% actualizada',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },        
        ytoadmincancellquery: {        
            path: mailspath + '/omt/omt-14-query-canceled.html.swig', 
            subject: 'Cancelación de solicitud - %querycode%',
            sender: 'sender@yourttoo.com',
            replaces: ['querycode']
        },
        ytoadmincancellbooking: {
        	 path: mailspath + '/omt/34-admin-booking-cancelled.html.swig', 
             subject: 'Reserva - %idbooking% cancelada',
             sender: 'sender@yourttoo.com',
             replaces: ['idbooking']
        },
        ytoadminbookingchange: {
            path: mailspath + '/omt/35-admin-booking-updated.html.swig', 
            subject: '[OMT]La Reseva %idbooking% ha sido MODIFICADA',
            sender: 'sender@openmarket.travel',
            replaces: ['idbooking']
        },
        ytoadminbookingchat: {
            path: mailspath + '/omt/37-admin-booking-chat-msg.html.swig', 
            subject: 'Nuevo Mensaje para la Reserva %idbooking%',
            sender: 'sender@yourttoo.com',
            replaces: ['idbooking']
        },
        
        
       
        //Debes realizar el pago de la reserva - %idbooking%
        generic: mailspath + '/omt/skeletonmail.html'
    };
    return templates;
};