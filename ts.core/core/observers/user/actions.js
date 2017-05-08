module.exports = function (raditzseed, socket) {
    socket.on('login', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'login.done';
        var erroreventkey = 'login.error';
        var rq = {
            request: conf,
            method: 'login'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'login', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'login', data: data, result: rs }); });
    });
    
    socket.on('forgotpassword', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'forgotpassword.done';
        var erroreventkey = 'forgotpassword.error';
        var rq = {
            request: conf,
            method: 'forgotpassword'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'forgotpassword', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'forgotpassword', data: data, result: rs }); });
    });
    
    socket.on('changeemail', function (data) { 
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'changeemeail.done';
        var erroreventkey = 'changeemail.error';
        var rq = {
            request: conf,
            method: 'changeemail'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'changeemail', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'changeemail', data: data, result: rs }); });
    });
    
    socket.on('changepassword', function (member) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'changepassword.done';
        var erroreventkey = 'changepassword.error';
        var rq = {
            request: conf,
            method: 'changepassword'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'changepassword', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'changepassword', data: data, result: rs }); });
    });
    
    socket.on('delete', function (who) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'delete.done';
        var erroreventkey = 'delete.error';
        var rq = {
            request: conf,
            method: 'delete'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'delete', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'delete', data: data, result: rs }); });
    });

    socket.on('error', function (err) {
        raditzseed.trigger.emit('dispatch.error', { action: 'error', data: data, result: err });
    });
}