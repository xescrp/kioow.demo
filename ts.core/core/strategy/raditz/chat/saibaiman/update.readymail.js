module.exports = function (conf, callback) {

	setImmediate(function () {
		var common = require('yourttoo.common');
		var utils = require('../../../../tools');

		var core = conf.core;
        var data = conf.data;
        var chat = data;
        
        var chat_edited = data.current;
        var chat_original = data.original;

        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        var from = chat_edited.messages[0].from;
        var to = chat_edited.messages[0].to;

        var sendData = {};
        
        sendData.from = from;
        sendData.quote = chat_edited.quote;
        sendData.querycode = chat_edited.userquery != null ? chat_edited.userquery.code : null;
        sendData.request = chat_edited.userquery;
        sendData.content = chat_edited.messages[chat_edited.messages.length - 1];;

        conf.mailer = mailer;
        conf.msend = msend;
        conf.sendData = sendData;

        conf.mailtemplates = {
            adminchat: 'ytoadminbookingchat',
            dmcchat: 'dmcnewmessagetailormade',
            adminChatTailor : 'omtnewmessagetailormade'
        };

		callback(null, conf);
	});
	
}