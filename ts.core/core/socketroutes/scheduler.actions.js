module.exports = function (scheduler, socket) {
    
    socket.on('schedule', function (conf) {
        conf.scheduler = scheduler;
        
        var eventkey = conf.oncompleteeventkey || 'schedule.done';
        var erroreventkey = conf.onerroreventkey || 'schedule.error';
        var rq = {
            request: conf,
            method: 'schedule'
        };
        var rt = scheduler.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });


    socket.on('error', function (err) {
        console.log('error en socket [Request failed]...');
        console.error(err.message);
        console.error(err.stack);
        socket.emit('uncaughtException', { error : err.message, stack: err.stack });
    });
}