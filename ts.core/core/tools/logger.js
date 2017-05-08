var _fs = require('./filemgr');

var Logger;
var omtcore = require('../core');
var _dt = require('date-utils');
var _mail = require('../mailing/mailer');
var conf = require('nconf');
conf.env().file({ file: 'settings.json' });

(function(define) {

"use strict";

define(function(require, exports){
    

    
    Logger = function()
    {
        this._sendmailonerrors = (conf.get('log:sendmailonerrors') == 'true');
    }  

    Logger.prototype.Write = function (logtype, message, onwritefinishhandler)
    {
        var mode = conf.get('log:mode');
            
        var logmessage = omtcore.list('LogMessages').model(
            {
                message: '',
            });

        logmessage.message = message;
        logmessage.date = new Date();
        logmessage.type = logtype;
        logmessage.source = 'CORE';

        if (mode == 'fs') {
            
            //Log en modo Archivos...
            
            var fwrite = new _fs.filemgr();
            fwrite.createDirectory(conf.get('log:filepath'));
            var logfilename = conf.get('log:filepath') + '\\' + logmessage.date.toFormat('DD-MM-YYYY') +
                '.' + logmessage.type + '.log';
            fwrite.writeText(logfilename,
                '[' + logmessage.date.toFormat('DD-MM-YYYY') + '] - ' + logmessage.message,
                this.writefinishedhandler);
            
        }
        if (mode == 'bd')
        {
            logmessage.save();
        }
        if(this._sendmailonerrors && logtype == 'error')
        {
            
                var content = 'Se ha producido un error en openmarket.travel App: Revise el mensaje de error:\r\n' + 
                     logmessage.toString();
                var mbuilder = new _mail.Mailer();
                var mail = mbuilder.SetupMail(
                                                conf.get('mailing:errorsfrom'), 
                                                conf.get('mailing:errorsrecipient'), 
                                                'Error en app openmarket.travel', 
                                                logmessage.message, 
                                                true);
            
        }
        
    }

    module.exports.Logger = Logger;
});
})(
  typeof define === 'function' && define.amd ? define : function (factory) { factory(require, exports); }
);
