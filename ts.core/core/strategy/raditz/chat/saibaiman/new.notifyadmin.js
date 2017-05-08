module.exports = function (conf, callback) {
    var core = conf.core;
    var data = conf.data;
    
    var chat = data;
    var from = chat.messages[0].from;
    var to = chat.messages[0].to;
    var mailer = conf.mailer;
    var msend = conf.msend;
    var sendData = conf.sendData;
    var mailtemplates = conf.mailtemplates;
    
    var utils = require('../../../../tools');

	setImmediate(function () {
        
        var mailTo = to.email;
        var template = mailtemplates.dmcchat
        
        if (chat.booking != null) {
            sendData.booking = chat.booking;
            sendData.idbooking = chat.booking.idBooking;
            sendData.url = core.get('frontadminurl') + '/dmc-booking?idbooking=' + chat.booking.idBooking;
            template = mailtemplates.adminchat;
            sendData.booking.affiliate = chat.affiliate;
            
            var product = JSON.parse(chat.booking.product);
            sendData.hotelcats = utils._showHotelCats(product.itinerary, '_es');
            sendData.mainImageProduct = utils.cloudinary_url(product.productimage.url, 'mainproductimage');
            sendData.tags = utils._showTagsArray(product.tags);
            sendData.booking.traveler = chat.traveler;
        }
        if(chat.quote != null) {
            sendData.quote = chat.quote;
            sendData.querycode = chat.userquery.code;
            sendData.request = chat.userquery;
            template = mailtemplates.adminChatTailor;
            sendData.request.affiliate = chat.affiliate;
            sendData.quote.traveler = chat.traveler;
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
                    
                    var auxMessages = chat.messages;
                    auxMessages[0].from.status = 'sent';
                    auxMessages[0].to.status = 'new';
                    
                    var upd = {
                        $set : {
                            messages: auxMessages
                        }
                    };

                    helper.update({
                        core: core,
                        query: { code: chat.code },
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
                    
                    var auxMessages = chat.messages;
                    auxMessages[0].from.status = 'error';
                    auxMessages[0].to.status = 'new';
                    
                    var upd = {
                        $set : {
                            messages: auxMessages
                        }
                    };

                    helper.update({
                        core: core,
                        query: { code: chat.code },
                        update: upd,
                        collectionname: 'Chats'
                    });   

                    callback(err, conf);
                });
            });
    })
	
}