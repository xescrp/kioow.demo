module.exports = function (conf, callback) {
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var lines = [];

    conf.reports != null && conf.reports.length > 0 ?
        _.each(conf.reports, function (report) {
            var line = '<p><b>' + report.code + '</p></b>';
            lines.push(line.toString());
            line = '<span>Booking ' + report.title + ' from dmc ' +
                report.booking.name + ' (' + report.booking.code + ')';
            lines.push(line.toString());
            line = '<span>last availability day : ' + report.lastavailabilityday;
            lines.push(line.toString());
            line = '<span>Previous State: ' + report.previous + ' -> Current State: ' + report.current;
            lines.push(line.toString());
        }) : null;

    lines.push('<h4>' + conf.results.code + '</h4>');
    conf.results.filehash = conf.downshash;
    conf.results.messages != null && conf.results.messages.length > 0 ?
        _.each(conf.results.messages, function (message) { lines.push(message); }) : null;

    if (lines != null && lines.length > 0) {
        console.log('Getting ready for sending mail...');

        var html = lines.join('<br />');
        //console.log(html);
        var utils = require('../../../tools/emailhelpers');

        var mailtemplate = require('../../../factory/mailtemplating');

        var ml = require('../../../factory/mailing');
        var mailer = new ml.Mailer();
        var mmux = require('../../../mediator/mailstack.mediator');
        var msend = new mmux.MailStackMediator();
        var mailtemplate = mailtemplate.Generic.template;
        var data = {
            mailbodycontent: html,
            process: 'Booking transfer Massive Updater - [booking->booking2]'
        };

        mailer.SetupEmailTemplate(
            'xisco@openmarket.travel',
            mailtemplate,
            data,
            function (reportmail) {
                //send emails...
                msend.send(reportmail,
                    function (ok) {
                        console.log('Report mail sent ...');
                        console.log(ok);
                    },
                    function (err) {
                        console.error('Error sending report mail...');
                        console.error(err);
                    });
            });
    }

    setTimeout(function () {
        console.log('Exiting task...');
        //console.log(conf.results);
        callback(null, { ResultOK: true, result: conf.results });
    }, 3000);
}