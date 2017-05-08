module.exports = function (core, socket) { 
    
    socket.on('find', function (conf) { 
        conf.core = core;
        
        var eventkey = conf.oncompleteeventkey || 'find.done';
        var erroreventkey = conf.onerroreventkey || 'find.error';
        var rq = {
            request: conf,
            method: 'find'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });


    socket.on('search', function (conf) {
        conf.core = core;
        
        var eventkey = conf.oncompleteeventkey || 'search.done';
        var erroreventkey = conf.onerroreventkey || 'search.error';
        var rq = {
            request: conf,
            method: 'search'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('book', function (conf) {
        conf.core = core;
        
        var eventkey = conf.oncompleteeventkey || 'book.done';
        var erroreventkey = conf.onerroreventkey || 'book.error';
        var rq = {
            request: conf,
            method: 'book'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('fetch', function (conf) {
        conf.core = core;
        
        var eventkey = conf.oncompleteeventkey || 'fetch.done';
        var erroreventkey = conf.onerroreventkey || 'fetch.error';
        var rq = {
            request: conf,
            method: 'fetch'
        };
        var rt = core.processrequest(rq);
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