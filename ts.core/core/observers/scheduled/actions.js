module.exports = function (scheduler, socket) {
    socket.on(scheduler.configuration.scheduledfile, function (data) {
        
        var eventkey = scheduler.configuration.scheduledfile + '.done';
        var erroreventkey = scheduler.configuration.scheduledfile + '.error';
        
        if (data == null) {
            data = {
                oncompleteeventkey: '',
                onerroreventkey: '',
            };
        }
        data.oncompleteeventkey = eventkey;
        data.onerroreventkey = erroreventkey;
        data.core = scheduler.core;

        var rq = {
            request: data,
            method: scheduler.configuration.scheduledfile
        };

        var rt = scheduler.processrequest(rq);

        rt.on(eventkey, function (rs) { console.log(rs); scheduler.setfinished(rs); });
        rt.on(erroreventkey, function (err) { console.log(err); scheduler.seterror(err); });

    });

    socket.on('error', function (err) {
        raditzseed.trigger.emit('dispatch.error', { action: 'error', data: data, result: err });
    });
}