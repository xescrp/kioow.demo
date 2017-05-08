module.exports = function (backbone, socket) { 

    socket.on('api.command', function (data) {
        console.log('a new request...');
        //decode compression
        var zip = require('yourttoo.connector').lzip;
        var compressed = socket.iscompressed; 
        data = compressed ? JSON.parse(zip.decompress(data)) : data;
        console.log(data);
        //check the service:
        var service = data.service;
        //get the cluster service
        var cluster = backbone.clusters.get(service);
        //pass the socket handler to the service (chain of responsability)
        data.socket = socket;
        //authorization...
        var authorized = (socket.ytonotauth == null);
        
        //add credentials to the request...
        if (socket.ytoauth != null) {
            data.request = (data.request == null) ? { auth : socket.ytoauth } : data.request;
            data.request.auth = socket.ytoauth;
        }
        //set default or selected currency...
        data.request.currentcurrency = data.currentcurrency || 'EUR';
        //continue...
        if (cluster != null && authorized) {
            var clRQ = cluster.sendrequest(data);
            clRQ.on('cluster.request.done', function (result) {
                console.log('cluster response [done]: ' + clRQ.id);
                backbone.track(clRQ, result, 'done');
            });
            clRQ.on('cluster.request.error', function (err) {
                console.log('cluster response [error]: ' + clRQ.id);
                backbone.track(clRQ, err, 'errors');
            });
            backbone.track(clRQ, { date: new Date(), message: 'Backbone tracking started' } ,'start');
        }
        else {
            //this service is not defined...or you are not authorized
            var emitevent = authorized ? 'not_authorized' : 'api.command.error';
            var rsp = authorized ? 'The service ' + service + 
                      ' does not exists on backbone definition or disabled. ' + 
                      'Please review the service name and try again' : socket.ytonotauth;
            socket.emit(emitevent, rsp);
        }
    });
    


    socket.on('backbone.command', function (conf) {
        console.log('a backbone command request...');
        console.log(conf);
        var eventkey = conf.oncompleteeventkey || conf.command + '.done';
        var erroreventkey = conf.onerroreventkey || conf.command + '.error';
        
        conf.request.backbone = backbone;
        conf.request.socket = socket;

        var rq = {
            request: conf.request,
            method: conf.command,
            forkprocess: false
        };

        backbone.processrequest(rq, function (rs) {
            socket.emit(eventkey, rs);
        }, function (rs) { 
            socket.emit(erroreventkey, rs);
        });
    });

    socket.on('error', function (err) {
        console.log('error en socket [Request failed]...');
        console.error(err.message);
        console.error(err.stack);
        socket.emit('uncaughtException', { error : err.message, stack: err.stack });
    });

}