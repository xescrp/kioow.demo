module.exports = function (core, socket) {

    socket.on('findone', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'findone.done';
        var erroreventkey = conf.onerroreventkey || 'findone.error';
        var rq = {
            request: conf,
            method: 'findone'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('count', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'count.done';
        var erroreventkey = conf.onerroreventkey || 'count.error';
        var rq = {
            request: conf,
            method: 'count'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

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

    socket.on('list', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'list.done';
        var erroreventkey = conf.onerroreventkey || 'list.error';
        var rq = {
            request: conf,
            method: 'list'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('list2', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'list2.done';
        var erroreventkey = conf.onerroreventkey || 'list2.error';
        var rq = {
            request: conf,
            method: 'list2'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('update', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'update.done';
        var erroreventkey = conf.onerroreventkey || 'update.error';
        var rq = {
            request: conf,
            method: 'update'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('save', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'save.done';
        var erroreventkey = conf.onerroreventkey || 'save.error';
        var rq = {
            request: conf,
            method: 'save'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('adminstatistics', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'adminstatistics.done';
        var erroreventkey = conf.onerroreventkey || 'adminstatistics.error';
        var rq = {
            request: conf,
            method: 'adminstatistics'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('status', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'status.done';
        var erroreventkey = conf.onerroreventkey || 'status.error';
        var rq = {
            request: conf,
            method: 'status'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('pricing', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'pricing.done';
        var erroreventkey = conf.onerroreventkey || 'pricing.error';
        var rq = {
            request: conf,
            method: 'pricing'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('quotation', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'quotation.done';
        var erroreventkey = conf.onerroreventkey || 'quotation.error';
        var rq = {
            request: conf,
            method: 'quotation'
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

    socket.on('search2', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'search2.done';
        var erroreventkey = conf.onerroreventkey || 'search2.error';
        var rq = {
            request: conf,
            method: 'search2'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('oldsearch', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'oldsearch.done';
        var erroreventkey = conf.onerroreventkey || 'oldsearch.error';
        var rq = {
            request: conf,
            method: 'oldsearch'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('feed', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'feed.done';
        var erroreventkey = conf.onerroreventkey || 'feed.error';
        var rq = {
            request: conf,
            method: 'feed'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('inspiration', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'inspiration.done';
        var erroreventkey = conf.onerroreventkey || 'inspiration.error';
        var rq = {
            request: conf,
            method: 'inspiration'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('translate', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'translate.done';
        var erroreventkey = conf.onerroreventkey || 'translate.error';
        var rq = {
            request: conf,
            method: 'translate'
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
    
    socket.on('book2', function (conf) {
        conf.core = core;
        
        var eventkey = conf.oncompleteeventkey || 'book2.done';
        var erroreventkey = conf.onerroreventkey || 'book2.error';
        var rq = {
            request: conf,
            method: 'book2'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) {  socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('pay', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'pay.done';
        var erroreventkey = conf.onerroreventkey || 'pay.error';
        var rq = {
            request: conf,
            method: 'pay'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('budget', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'budget.done';
        var erroreventkey = conf.onerroreventkey || 'budget.error';
        var rq = {
            request: conf,
            method: 'budget'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('getdata', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'getdata.done';
        var erroreventkey = conf.onerroreventkey || 'getdata.error';
        var rq = {
            request: conf,
            method: 'getdata'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('email', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'email.done';
        var erroreventkey = conf.onerroreventkey || 'email.error';
        var rq = {
            request: conf,
            method: 'email'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('exchange', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'exchange.done';
        var erroreventkey = conf.onerroreventkey || 'exchange.error';
        var rq = {
            request: conf,
            method: 'exchange'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('distinct', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'distinct.done';
        var erroreventkey = conf.onerroreventkey || 'distinct.error';
        var rq = {
            request: conf,
            method: 'distinct'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('schedule', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'schedule.done';
        var erroreventkey = conf.onerroreventkey || 'schedule.error';
        var rq = {
            request: conf,
            method: 'schedule'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('test', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'test.done';
        var erroreventkey = conf.onerroreventkey || 'test.error';
        var rq = {
            request: conf,
            method: 'test'
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('throw', function (conf) {
        conf.core = core;

        var eventkey = conf.oncompleteeventkey || 'throw.done';
        var erroreventkey = conf.onerroreventkey || 'throw.error';
        var rq = {
            request: conf,
            method: 'throw',
            socket: socket
        };
        var rt = core.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('erase', function (conf) {
      conf.core = core;

      var eventkey = conf.oncompleteeventkey || 'erase.done';
      var erroreventkey = conf.onerroreventkey || 'erase.error';
      var rq = {
        request: conf,
        method: 'erase',
        socket: socket
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
