module.exports = function (raditz, socket) {
    
    socket.on('info', function (conf) {
        var eventkey = conf.oncompleteeventkey || 'info.done';
        var erroreventkey = conf.onerroreventkey || 'info.error';
        var results = null;
        switch (conf.info) {
            case 'subscribers':
                results = _.map(raditz.subscribers.values(), function (subscriber) { return subscriber.configuration; });
                break;
            default:
                results = {
                    Raditz: raditz.configuration
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
        var subscriber = raditz.subscribers.get(sb);
        if (subscriber) {
            subscriber.process.command(rq);
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