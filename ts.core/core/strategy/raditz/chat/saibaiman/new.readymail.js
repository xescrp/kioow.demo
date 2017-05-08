module.exports = function (conf, callback) {

	setImmediate(function () {
		var common = require('yourttoo.common');
		var utils = require('../../../../tools');

		var core = conf.core;
        var data = conf.data;
        var chat = data;
        
        var ml = require('../../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        
        var from = chat.messages[0].from;
        var to = chat.messages[0].to;

        var sendData = {};
        
        sendData.from = from;
        sendData.content = chat.messages[0];
        sendData.quote = chat.quote;
        sendData.querycode = chat.userquery != null ? chat.userquery.code : null;
        sendData.request = chat.userquery;
        sendData.content = chat.messages[0];

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