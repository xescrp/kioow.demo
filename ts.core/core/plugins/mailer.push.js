module.exports = function (options) {
    var common = require('yourttoo.common');

    var plugin = {
        name: 'Mailer Pusher',
        id: 'mxp',
        templatesbasepath: options.core.get('mailing').templates,
        templatenames: require('./mailer.templates'),
        initialize: function (callback) {
            console.log('mail pusher plugin initialized...');
            callback != null ? callback() : null;
        },
        rendertemplate: function (options, callback) { //{ subject: , from: , to: , templatename: }
            var swig = require('swig');
            var self = this;

            swig.setDefaults({ cache: false });
            var template = options.template;

            swig.invalidateCache();
            swig.setFilter('numberFractions', common.swigtools.numberFractions);
            var templatepath = template.fullpath || self.templatesbasepath + '/' + template.file;

            var mailcontent = swig.renderFile(templatepath, options.parameter, function (err, output) {
                if (err) { console.log('Error rendering swig mail...:'); console.log(err); }
                var mailoptions = {
                    from: template.sender,
                    to: options.to,
                    subject: options.subject || template.subject + options.parameter[options.subjectappend],
                    html: output
                };
                //inline css style
                var juice = require('juice');
                mailoptions.html = juice(mailoptions.html);
                //ready!!
                callback != null ? callback(mailoptions) : null;
            });
        },
        pull: function (callback) {
            var core = options.core;
            core.list('Mails').model.find({ state: 'pushed' })
                .populate('hevent')
                .exec(function (err, docs) {
                    err != null ? callback(null) : callback(docs);
                });
        }, 
        delivered: function (mail, callback) {
            var core = options.core;
            mail.state = 'delivered';
            mail.date = new Date();
            mail.save(function (err, doc) {
                err != null ? console.error(err) : setImmediate(function () {
                    core.list('Mails').model.populate(doc, [{ path: 'hevent' }], function (err, poped) {
                        callback(poped);
                    });
                });
            });
        },
        push: function (mail, hevent, callback) {
            var core = options.core;
            var mail = core.list('Mails').model({
                title: 'New mail push from plugin MXP.core.yto',
                from: mail.from,
                to: mail.to,
                subject: mail.subject,
                text: mail.text,
                html: mail.html,
                state: 'pushed',
                mailmessage: mail, 
                hevent: hevent
            });

            mail.save(function (err, doc) {
                err != null ? callback(err) : callback();
            });
        }
    };

    return plugin;
}