
var common = require('yourttoo.common');

function get_mail_resource(filetosend, callback) {
    var fs = require('fs');
    fs.readFile(filetosend, function (err, content) {
        callback(content);
    });
}



var Mailer = function () {
    var conf = require('../configurations/mailstack.config').configuration;
    this.configuration = {
        templatespath: conf.templatespath,
        mailfrom: conf.mailfrom
    };
    this.templates = common.mailtemplates.templates(conf.templatespath);
}

Mailer.prototype.SetupEmailTemplate = function (messageto, mailtemplate, parameter, callback) {
    var swig = require('swig');
    
    swig.setDefaults({ cache: false });
    var template = mailtemplate;
    
    swig.invalidateCache();
    swig.setFilter('numberFractions', common.swigtools.numberFractions);
    var subject = template.subject;
    if (template.replaces != null && template.replaces.length > 0) {
        for (var i = 0, len = template.replaces.length; i < len; i++) {
            subject = subject.replace('%' + template.replaces[i] + '%', common.utils.getfieldvalue(template.replaces[i], parameter))
        }
    }
    var mailcontent = swig.renderFile(template.path, parameter, function (err, output) {
        if (err) { console.log('Error rendering swig mail...:'); console.log(err); }
        var mailoptions = {
            from: template.sender,
            to: messageto,
            subject: subject,
            html: output
        };
        //inline css style
        var juice = require('juice');
        mailoptions.html = juice(mailoptions.html);
        //ready!!
        callback(mailoptions);

    });
}

Mailer.prototype.SetupEmail = function (messageto, mailtemplate, parameter, callback) {
    var swig = require('swig');
    
    swig.setDefaults({ cache: false });
    var template = this.templates[mailtemplate];
    
    swig.invalidateCache();
    swig.setFilter('numberFractions', common.swigtools.numberFractions);
    var subject = template.subject;
    if (template.replaces != null && template.replaces.length > 0) {
        for (var i = 0, len = template.replaces.length; i < len; i++) { 
            subject = subject.replace('%' + template.replaces[i] + '%', common.utils.getfieldvalue(template.replaces[i], parameter))
        }
    }
    var mailcontent = swig.renderFile(template.path, parameter, function (err, output) {
        if (err) { console.log('Error rendering swig mail...:'); console.log(err); }
        var mailoptions = {
            from: template.sender,
            to: messageto,
            subject: subject,
            html: output
        };
        //inline css style
        var juice = require('juice');
        mailoptions.html = juice(mailoptions.html);
        //ready!!
        callback(mailoptions);

    });
}

Mailer.prototype.SetContent = function (options) {
   
    var messageto = options.messageto, 
        messagefrom = options.messagefrom, 
        subject = options.subject, 
        content = options.content, 
        ishtml = options.ishtml;
    
    var mailoptions = {
        from: messagefrom,
        to: messageto,
        subject: subject,
    };

    ishtml ? mailoptions.html = content : mailoptions.text = content;

    return mailoptions;

}

Mailer.prototype.OLDSetupEmail = function (messagefrom, messageto, messagesubject, mailtemplate, parameter, callback) {
    
    var swig = require('swig');
    
    swig.setDefaults({ cache: false });
    var file = this.templates[mailtemplate];
    swig.invalidateCache();
    swig.setFilter('numberFractions', numberFractions);
    

    var mailcontent = swig.renderFile(file, parameter, function (err, output) {
        if (err) { console.log('Error rendering swig mail...:'); console.log(err); }
        var mailoptions = {
            from: messagefrom,
            to: messageto,
            subject: messagesubject,
            html: output
        };
        //inline css style
        var juice = require('juice');
        mailoptions.html = juice(mailoptions.html);
        //ready!!
        callback(mailoptions);

    });
}


module.exports.Mailer = Mailer;