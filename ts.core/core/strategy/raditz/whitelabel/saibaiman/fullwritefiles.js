module.exports = function (conf, callback) {
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var wlcustom = conf.wlcustomizationforsave;

    setImmediate(function () {
        var results = {
            Messages: [],
            ResultOK: true
        };
        var routes = require('../../../../local.routes');
        var fs = require('fs');

        var pathbase = routes.paths.public;
        var errors = [];
        var completion = { sass: false, header: false, footer: false };
        var sasspath = [pathbase, 'partials', 'wl', wlcustom.code, 'colours.scss'].join('/');
        var headerpath = [pathbase, 'partials', 'wl', wlcustom.code, 'header.html'].join('/');
        var footerpath = [pathbase, 'partials', 'wl', wlcustom.code, 'footer.html'].join('/');

        var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

        cev.on('all.done', function () { 
            conf.results.push(results);
            errors.length > 0 ? callback(errors, conf) : callback(null, conf);
        });

        cev.on('task.done', function (itemname) {
            completion[itemname] = true;
            var iscomplete = _.every(completion, function (taskdone) { return taskdone; });
            iscomplete ? cev.emit('all.done') : null;
        });

        cev.on('write.header', function (headertext, headerfile) {
            var dir = require('path').dirname(headerfile);
            common.utils.directoryExists(dir, 0777, function (err) {
                err != null ? 
                setImmediate(function () {
                    errors.push(err);
                    cev.emit('task.done', 'header');
                }) : 
                setImmediate(function () {
                    fs.writeFile(headerfile, headertext, function (errfile) {
                        errfile != null ? errors.push(errfile) : results.Messages.push('header file created -> ' + headerfile);
                        cev.emit('task.done', 'header');
                    });
                });
            }); 
        });
        cev.on('write.footer', function (footertext, footerfile) { 
            var dir = require('path').dirname(footerfile);
            common.utils.directoryExists(dir, 0777, function (err) {
                err != null ? 
                setImmediate(function () {
                    errors.push(err);
                    cev.emit('task.done', 'footer');
                }) : 
                setImmediate(function () {
                    fs.writeFile(footerfile, footertext, function (errfile) {
                        errfile != null ? errors.push(errfile) : results.Messages.push('footer file created -> ' + footerfile);
                        cev.emit('task.done', 'footer');
                    });
                });
            }); 
        });
        cev.on('write.sass', function (css, sassfile) { 
            var dir = require('path').dirname(sassfile);
            common.utils.directoryExists(dir, 0777, function (err) {
                err != null ? 
                setImmediate(function () {
                    errors.push(err);
                    cev.emit('task.done', 'sass');
                }) : 
                setImmediate(function () {
                    var elements = [];
                    for (var prop in css) {
                        var propname = '$' + common.utils.replaceAll(prop, '_', '-');
                        var textline = [propname, css[prop]].join(':');
                        elements.push(textline);
                    }
                    fs.writeFile(sassfile, elements.join('\n'), function (errfile) {
                        errfile != null ? errors.push(errfile) : results.Messages.push('sass file created -> ' + sassfile);
                        cev.emit('task.done', 'sass');
                    });
                });
            }); 
        });
        
        //start everything
        cev.emit('write.header', wlcustom.web.header, headerpath);
        cev.emit('write.footer', wlcustom.web.footer, footerpath);
        cev.emit('write.sass', wlcustom.css, sasspath);
    });
}