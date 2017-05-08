module.exports = function (options) {
    
    var mapping = {
        post: {
            core: {
            },
            auth: {
            },
            'default': require('/hooks/post/default')
        },
        pre: {
            core:{
                book: require('/hooks/pre/core.book'),
                search: require('/hooks/pre/core.search'),
                find: require('/hooks/pre/core.find')
            },
            auth: {
            },
            'default': require('/hooks/pre/default')
        }
    };

    var _exec = (function (options) {
        return function (options) { 
            var _ = require('underscore');
            var common = require('yourttoo.common');
            var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

            var command = options.command;
            var service = options.service;
            var execute = options.execute;
            
            var opt = {
                request: options.request,
                connect: options.ytoapiconnector,
                auth: options.auth
            };
            
            var hook = mapping[execute][service][command] || mapping[execute][service]['default'];

            process.nextTick(function () {
                hook(opt, 
                function (fixed) { //hook -> OK
                    cev.emit('hook.done', fixed);
                }, 
                function (err) { //hook -> NOOK
                    cev.emit('hook.error', err);
                })
            });

            return cev;
        }
    })(options);
    
    return _exec(options);
}