module.exports = function (hiperion, socket) { 
    
    socket.on('info', function (conf) { 
        var eventkey = conf.oncompleteeventkey || 'info.done';
        var erroreventkey = conf.onerroreventkey || 'info.error';
        var results = null;
        switch (conf.info) {
            case 'subscribers':
                results = _.map(hiperion.subscribers.values(), function (subscriber) { return subscriber.configuration; });
                break;
            default: 
                results = {
                    Hiperion: hiperion.configuration
                }
        }

        if (results) {
            socket.emit(eventkey, results);
        } else { 
            socket.emit(erroreventkey, results);
        }
    });
    
    socket.on('processrequest', function (rq) {
        var sb = rq.subject;
        var subscriber = hiperion.subscribers.get(sb);
        if (subscriber) { 
            subscriber.trigger.emit(rq.action, rq);
        }
        socket.emit('processrequest.done', { ResultOK : true, Message: 'Started process...' });
    })

    socket.on('error', function (err) {
        console.log('error en socket [Request failed]...');
        console.error(err.message);
        console.error(err.stack);
        socket.emit('uncaughtException', { error : err.message, stack: err.stack });
    });
}