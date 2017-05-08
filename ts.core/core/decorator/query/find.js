module.exports = function (options, callback, errorcallback) { 
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var filter_auth = common.schemadefinitions;
    var behaviour = null;
    var core = options.core;
    var command = options.command;
    //check auth
    var loggeduser = options.auth;
    var rolename = (loggeduser != null && loggeduser.user != null) ? loggeduser.user.rolename : null;
    //check collectionname
    var collection = options.collectionname;
    //check environment
    var environment = options.environment;

    //helper closure
    var permissions = {
        'none': function (query, selfq, field) {
            console.log('user with no permissions for this collection');
            errorcallback('You don\'t have permissions to fetch this collection');
        },
        '*': function (query, selfq, field) {
            console.log('user allowed for this collection');
            callback(query);
        },
        'self': function (query, selfq, field) {
            console.log('user restricted (own items) for this collection');
            var sl_q = (selfq != null && typeof (selfq)) === 'function' ? selfq(loggeduser[field], rolename) : null;
            sl_q != null ? query.$and.push(sl_q) : null;
            callback(query);
        },
        'sample': function (query, selfq, field) {
            console.log('user restricted (findone only) for this collection');
            command == 'findone' ? callback(query) : errorcallback('You don\'t have permissions to fetch this collection');
        }
    };

    //check auth behaviour
    behaviour = filter_auth.schemadefaultbehaviour[collection];
    behaviour != null ?
        setImmediate(function () {
            var rolepermission = _.filter(behaviour.roles, function (role) {
                return rolename == role.role;
            });
            var query = options.query != null ? { $and: [options.query] } : { $and: [] };
            var fn_auth_check = permissions[rolepermission[0].permission];
            fn_auth_check(query, behaviour.selfquery, behaviour.selfqueryfield);
        }) :
        setImmediate(function () {
            callback(options.query);
        });
}