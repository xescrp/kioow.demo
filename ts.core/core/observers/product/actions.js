module.exports = function (raditzseed, socket) {
    socket.on('new', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        var eventkey = conf.oncompleteeventkey || 'new.done';
        var erroreventkey = conf.onerroreventkey || 'new.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'new',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'new', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'new', data: data, result: rs }); });
    });

    socket.on('update', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        var eventkey = conf.oncompleteeventkey || 'update.done';
        var erroreventkey = conf.onerroreventkey || 'update.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'update',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'update', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'update', data: data, result: rs }); });
    });
    
    socket.on('cityupdate', function (data) { 
        var conf = { core : raditzseed.core, data: data, results: [] };
        var eventkey = conf.oncompleteeventkey || 'cityupdate.done';
        var erroreventkey = conf.onerroreventkey || 'cityupdate.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'cityupdate',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'cityupdate', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'cityupdate', data: data, result: rs }); });
    });


    socket.on('delete', function (data) {
        var conf = { core : raditzseed.core, data: data, results: [] };
        var eventkey = conf.oncompleteeventkey || 'delete.done';
        var erroreventkey = conf.onerroreventkey || 'delete.error';
        
        conf.oncompleteeventkey = eventkey;
        conf.onerroreventkey = erroreventkey;
        var rq = {
            request: conf,
            method: 'delete',
        };
        var rt = raditzseed.processrequest(rq, function (rs) { console.log('finished callback'); });
        rt.on(eventkey, function (rs) { raditzseed.trigger.emit('dispatch.done', { action: 'delete', data: data, result: rs }); });
        rt.on(erroreventkey, function (rs) { raditzseed.trigger.emit('dispatch.error', { action: 'delete', data: data, result: rs }); });
    });

    socket.on('error', function (err) {
        raditzseed.trigger.emit('dispatch.error', { action: 'error', data: data, result: err });
    });
}