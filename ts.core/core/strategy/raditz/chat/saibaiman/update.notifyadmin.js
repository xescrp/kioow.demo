module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    
    var chat_edited = data.current;
    var chat_original = data.original;

    var mailer = conf.mailer;
    var msend = conf.msend;
    var sendData = conf.sendData;
    var mailtemplates = conf.mailtemplates;
    
    var utils = require('../../../../tools');

	setImmediate(function () {
        
        var mailTo = to.email;
        var template = mailtemplates.dmcchat
        
        var from = chat_edited.messages[chat_edited.messages.length - 1].from;
        var to = chat_edited.messages[chat_edited.messages.length - 1].to;
        sendData.from = from;

        if (chat_edited.booking != null) {
            sendData.booking = chat_edited.booking;
            sendData.idbooking = chat_edited.booking.idBooking;
            sendData.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + chat_edited.booking.idBooking;
            template = mailtemplates.adminchat;
            sendData.booking.affiliate = chat.affiliate;
            
            var product = JSON.parse(chat_edited.booking.product);
            sendData.hotelcats = utils._showHotelCats(product.itinerary, '_es');
            sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
            sendData.tags = utils._showTagsArray(product.tags);
            sendData.booking.traveler = chat_edited.traveler;
        }
        if(chat_edited.quote != null) {
            template = mailtemplates.adminChatTailor;
            sendData.request.affiliate = chat_edited.affiliate;
            sendData.quote.traveler = chat_edited.traveler;
            sendData.dmc = {
                company : {
                    name : to.name
                }
            };
            sendData.url = core.get('frontadminurl') + '/omt-response?code=' + data.original.quote.code; 
        }        	 
        
        targetmails = {
            affiliate : 'notifications@yourttoo.com',
            traveler : 'notifications@openmarket.travel'
        };
        
        mailTo = targetmails[from.type];
        
        //next step ready
        

        mailer.SetupEmail(
            mailTo,
		template,
		sendData,
		function (adminMail) {
                //send emails...
                msend.send(adminMail,
                function (ok) {
                    conf.results.push({
                        ResultOK: true,
                        Message: 'Mail sent to YTO Admin',
                        Mail: adminMail
                    });
                    
                    var auxMessages = chat_edited.messages;
                    auxMessages[auxMessages.length - 1].from.status = 'sent';
                    auxMessages[auxMessages.length - 1].to.status = 'new';
                    
                    var upd = {
                        $set : {
                            messages: auxMessages
                        }
                    };

                    helper.update({
                        core: core,
                        query: { code: chat_edited.code },
                        update: upd,
                        collectionname: 'Chats'
                    });    

                    callback(null, conf);
                },
                function (err) {
                    conf.results.push({
                        ResultOK: false,
                        Errors: err,
                    });
                    
                    var auxMessages = chat_edited.messages;
                    auxMessages[auxMessages.length - 1].from.status = 'error';
                    auxMessages[auxMessages.length - 1].to.status = 'new';
                    
                    var upd = {
                        $set : {
                            messages: auxMessages
                        }
                    };

                    helper.update({
                        core: core,
                        query: { code: chat_edited.code },
                        update: upd,
                        collectionname: 'Chats'
                    });   

                    callback(err, conf);
                });
            });
    })
	
}