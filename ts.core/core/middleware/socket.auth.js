module.exports = function (authhandler) {
    var auth = authhandler;

    return function authHandler(socket, next) {
        var handshake = socket.request;
        var common = require('yourttoo.common');
        //authroutes indicates the service (as a property) and the commands (into array of string) that require authentication 
        var authroutes = {
            core: [
                'list', 'list2', 'feed', 'save', 'search', 'count',
                'search2', 'findone', 'find', 'book', 'book2',
                'inspiration', 'budget', 'pay', 'status', 'pricing', 
                'quotation', 'update', 'translate', 'adminstatistics', 'erase'],
            xmljsonapi: [
                'list', 'list2', 'feed', 'save',
                'search', 'search2', 'findone', 'find',
                'book', 'book2', 'inspiration', 'budget',
                'pay', 'fetch'],
            membership: ['validatetoken', 'refreshsession'],
            mailstack: ['push'],
            memento: ['push', 'pull']
        };
        
        var tracking = common.eventtrigger.eventcarrier(common.utils.getToken());
        tracking.on('auth.done', function (authcredentials) {
            console.log('validation done [ok]');
            socket.ytoauth = authcredentials;
            next();
        });
        tracking.on('auth.error', function (err) {
            console.log('validation error [nook]');
            socket.ytonotauth = err;
            next();
        });
        //Check the query for the auth request..
        (handshake != null) ? process.nextTick(function () {
            var query = handshake._query;
            var needsAuth = false;
            var commands = authroutes[query.service];
            if (commands != null && commands.length > 0) {
                needsAuth = (commands.indexOf(query.command.toLowerCase()) >= 0);
            }
            //check auth
            needsAuth ? process.nextTick(function () {
                //This command needs authentication for that service...
                var request = { userid: query.userid, accesstoken: query.accesstoken };
                console.log('user validation...');
                console.log(query);
                var cfl = auth.validate(request);
                cfl.on('auth.done', function (rscred) { 
                    tracking.emit('auth.done', rscred);
                });
                cfl.on('auth.error', function (err) { 
                    tracking.emit('auth.error', err);
                });
            }) : tracking.emit('auth.done', null);

        }) : tracking.emit('auth.done', null);
    }


}

 