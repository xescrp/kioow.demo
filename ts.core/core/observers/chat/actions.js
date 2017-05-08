module.exports = function (raditzseed, socket) {
    socket.on('new', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'new.done';
        var erroreventkey = 'new.error';
        var rq = {
            request: conf,
            method: 'new'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'new', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'new', data: data, result: rs }); });
    });
    
    socket.on('update', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        
        var eventkey = 'update.done';
        var erroreventkey = 'update.error';
        var rq = {
            request: conf,
            method: 'update'
        };
        var rt = raditzseed.processrequest(rq);
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'update', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'update', data: data, result: rs }); });
    });
    
    socket.on('error', function (err) {
        raditzseed.trigger.emit('dispatch.error', { action: 'error', data: data, result: err });
    });
    
    socket.on('delete', function (data) {
        //TODO
    });
    socket.on('generic.action', function (data) {
        //TODO
    });
}