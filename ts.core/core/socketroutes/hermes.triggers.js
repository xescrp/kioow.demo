var common = require('yourttoo.common');
module.exports = function (hermes, socket) {
    
    socket.on('product.fullupdate', function (data) {
        conf.core = hermes.core;
        
        var eventkey = conf.oncompleteeventkey || 'product.fullupdate.done';
        var erroreventkey = conf.onerroreventkey || 'product.fullupdate.error';
        var rq = {
            request: conf,
            method: 'fullupdate',
            service: 'product'
        };
        var rt = hermes.processrequest(rq);
        rt.on(eventkey, function (rs) { socket.emit(eventkey, rs); });
        rt.on(erroreventkey, function (rs) { socket.emit(erroreventkey, rs); });
    });

    socket.on('notify.suscribers', function (data) {
        //notify suscribers...
        data.code = common.utils.getToken();
        hermes.broadcastsubscribers(data);
        console.log('Hermes broadcast...');
        console.log(data);
        data.core = hermes.core;
        //save hevent..
        var _hev = {
            code: data.code,
            subject: data.subject,
            action: data.action,
            delivereddate: new Date(),
            readers: ['hermes'], 
            state: 'pushed'
        };
        var completeeventkey = data.oncompleteeventkey || 'notify.suscribers.done';
        var erroreventkey = data.onerroreventkey || 'notify.suscribers.error';

        var hevent = hermes.core.mongo.getmodel({ collectionname: 'Hevents', modelobject: _hev });
        hevent.data.push(data.data);
        hevent.save(function (err, doc) {
            if (err) {
                console.log('Hevent saved error: ');
                console.log(err);
                socket.emit(erroreventkey, err);
            }
            if (doc != null) {
                console.log('Hevent saved successfully');
                socket.emit(completeeventkey, doc);
            }
        });

    });
    
    socket.on('relaunch.event', function (data) {

        var completeeventkey = data.oncompleteeventkey || 'relaunch.event.done';
        var erroreventkey = data.onerroreventkey || 'relaunch.event.error';
        var results = {
            errors: 0, 
            relaunched: 0,
            messages: [],
            errormessages: []
        };
        console.log(data);
        var codes = (data != null && data.codes != null && data.codes.length > 0) ? data.codes : null;
        codes != null ? process.nextTick(function () {
            var repeat = setInterval(function () {
                if (codes.length > 0) {
                    var code = codes.shift();
                    var query = { code: code };

                    hermes.core.corebase.list('Hevents').model.find(query)
                    .exec(function (err, docs) {
                        err != null ? 
                        process.nextTick(function () {
                            results.errors++;
                            results.errormessages.push(err);
                        }) 
                        : 
                        null;
                        
                        (docs != null && docs.length > 0) ? 
                        process.nextTick(function () {
                            var hev = docs[0];
                            var rawhev = hev.toObject();
                            
                            var relaunchdata = (rawhev != null && rawhev.data != null && rawhev.data.length) > 0 ? 
                            rawhev.data[0] 
                            : 
                            null;
                            relaunchdata != null ? 
                            process.nextTick(function () {
                                var rlt = {
                                    subject: rawhev.subject,
                                    action: rawhev.action,
                                    data: relaunchdata,
                                    code: rawhev.code
                                };
                                hermes.broadcastsubscribers(rlt);
                                var msg = 'relaunched broadcast for event ' + rawhev.code;
                                console.log(msg);
                                results.relaunched++;
                                results.messages.push(msg);
                                results.messages.push(rlt);
                            }) 
                            : 
                            process.nextTick(function () {
                                results.errors++;
                                results.errormessages.push('No data saved in hevent for this hevent code : ' + code);
                            });
                        }) 
                        :
                        process.nextTick(function () {
                            results.errors++;
                            results.errormessages.push('Not found event with this code ' + code);
                        });
                    });
                } else { 
                    results.errors > 0 ? socket.emit(erroreventkey, results) : socket.emit(completeeventkey, results);
                }
            }, 2000);
        }) 
        : 
        socket.emit(erroreventkey, 'You must set the codes properties to relaunch hevents');
    });

    socket.on('error', function (err) {
        console.log('error en socket [Request failed]...');
        console.error(err.message);
        console.error(err.stack);
        socket.emit('uncaughtException', { error : err.message, stack: err.stack });
    });

}