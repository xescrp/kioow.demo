module.exports = function (memento, socket) { 
    
    socket.on('push', function (conf) {
        conf.memento = memento;
        
        var eventkey = conf.oncompleteeventkey || 'push.done';
        var erroreventkey = conf.onerroreventkey || 'push.error';
        var rq = {
            request: conf,
            method: 'push'
        };
        var rt = memento.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('pull', function (conf) {
        conf.memento = memento;
        
        var eventkey = conf.oncompleteeventkey || 'pull.done';
        var erroreventkey = conf.onerroreventkey || 'pull.error';
        var rq = {
            request: conf,
            method: 'pull'
        };
        var rt = memento.processrequest(rq);
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