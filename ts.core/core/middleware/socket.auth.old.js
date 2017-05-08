module.exports = function (socket, next) {
    var handshake = socket.request;
    var common = require('yourttoo.common');
    //authroutes indicates the service (as a property) and the commands (into array of string) that require authentication 
    var authroutes = {
        core: ['list', 'feed', 'save', 'search', 'findone', 'find', 'book'],
        membership: ['validatetoken', 'refreshsession'],
        mailstack: ['push'],
        memento: ['push', 'pull']
    };
    var tracking = common.eventtrigger.eventcarrier(common.utils.getToken());
    tracking.on('auth.done', function (authcredentials) {
        socket.ytoauth = authcredentials;
        next();
    });
    tracking.on('auth.error', function (err) {
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

        needsAuth ? process.nextTick(function () { 
            //This command needs authentication for that service...
            var mediator = require('../mediator/membership.mediator');
            var membership = new mediator.MembershipMediator();
            var request = { userid: query.userid, accesstoken: query.accesstoken };
            console.log('user validation...');
            console.log(query);
            //console.log(request);
            membership.validatetoken(request, 
                function (result) {
                if (result) {
                    membership.credentials(query.userid, function (rscred) {
                        socket.ytoauth = rscred;
                        //Authorized!
                        tracking.emit('auth.done', rscred);
                    }, function (err) {
                        //Not Authorized!
                        tracking.emit('auth.error', 'not authorized. we can\'t recover your credentials at this moment. try again.');
                    });
                } else {
                    //Not Authorized!
                    tracking.emit('auth.error','not authorized. review your credentials for this operation/command.');
                }
            }, 
            //Validation error!
            function (err) {
                tracking.emit('auth.error','not authorized. we can\'t check your credentials at this moment. try again');
            });
        }) : tracking.emit('auth.done');

    }) : 
    tracking.emit('auth.done');
    

    
}