module.exports = function (membership, socket) {
    
    socket.on('login', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'login.done';
        var erroreventkey = conf.onerroreventkey || 'login.error';
        var rq = {
            request: conf,
            method: 'login'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('signup', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'signup.done';
        var erroreventkey = conf.onerroreventkey || 'signup.error';
        var rq = {
            request: conf,
            method: 'signup'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { console.log('served: ' + rs); socket.emit(erroreventkey, rs); });
    });

    socket.on('validatetoken', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'validatetoken.done';
        var erroreventkey = conf.onerroreventkey || 'validatetoken.error';
        var rq = {
            request: conf,
            method: 'validatetoken'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('credentials', function (conf) { 
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'credentials.done';
        var erroreventkey = conf.onerroreventkey || 'credentials.error';
        var rq = {
            request: conf,
            method: 'credentials'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('buildsession', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'buildsession.done';
        var erroreventkey = conf.onerroreventkey || 'buildsession.error';
        var rq = {
            request: conf,
            method: 'buildsession'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('changepassword', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'changepassword.done';
        var erroreventkey = conf.onerroreventkey || 'changepassword.error';
        var rq = {
            request: conf,
            method: 'changepassword'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    
    socket.on('recoverpassword', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'recoverpassword.done';
        var erroreventkey = conf.onerroreventkey || 'recoverpassword.error';
        var rq = {
            request: conf,
            method: 'recoverpassword'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('removeaccount', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'removeaccount.done';
        var erroreventkey = conf.onerroreventkey || 'removeaccount.error';
        var rq = {
            request: conf,
            method: 'removeaccount'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('restorepassword', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'restorepassword.done';
        var erroreventkey = conf.onerroreventkey || 'restorepassword.error';
        var rq = {
            request: conf,
            method: 'restorepassword'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('changeemail', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'changeemail.done';
        var erroreventkey = conf.onerroreventkey || 'changeemail.error';
        var rq = {
            request: conf,
            method: 'changeemail'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('refreshsession', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'refreshsession.done';
        var erroreventkey = conf.onerroreventkey || 'refreshsession.error';
        var rq = {
            request: conf,
            method: 'refreshsession'
        };
        var rt = membership.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });
    
    socket.on('throw', function (conf) {
        conf.membership = membership;
        
        var eventkey = conf.oncompleteeventkey || 'throw.done';
        var erroreventkey = conf.onerroreventkey || 'throw.error';
        var rq = {
            request: conf,
            method: 'throw',
            socket: socket
        };
        var rt = membership.processrequest(rq);
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