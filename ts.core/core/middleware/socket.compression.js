
module.exports = function (comphandler) {
    var decode = comphandler;
    
    return function authHandler(socket, next) {
        var handshake = socket.request;
        var common = require('yourttoo.common');
        
        var tracking = common.eventtrigger.eventcarrier(common.utils.getToken());
        tracking.on('decode.done', function (compressed) {
            console.log('compression checked [ok] - ' + compressed);
            socket.iscompressed = (compressed != null) ? compressed : false;
            next();
        });
        tracking.on('decode.error', function (err) {
            console.log('validation error [nook]');
            socket.iscompressederror = err;
            next();
        });
        //Check the query for the auth request..
        (handshake != null) ? process.nextTick(function () {
            var query = handshake._query;
            var needsDecode = false;
            needsDecode = (query.compression != null && 
                (query.compression == 'true' || query.compression == true));
            //check auth
            tracking.emit('decode.done', needsDecode);
        }) : process.nextTick(function () { tracking.emit('decode.done', false) });
    }


}

 