module.exports = function (options, callback, errorcallback) { 
    
    var membership = options.membership;
    var annex = require('./helpers');
    var common = require('yourttoo.common');
    options.username = options.username || options.email.split('@')[0];
    
    membership.mongo.exists({ collectionname: 'Users', query: { email: options.email } }, function (rs) {
        if (rs != null && rs.ResultOK == true) {
            var exists = rs.Data;
            if (exists == false) {
                var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
                //Hermes
                cev.on('signup.complete', function (hdata) { 
                    var data = hdata;
                    var collection = annex.kindshash[options.kind];
                    
                    var mmed = require('../../mediator/hermes.mediator');
                    var mediator = new mmed.HermesMediator();
                    
                    var subject = mediator.getsubject(collection);
                    console.log('notify hermes subject: ' + subject);
                    var commandkey = 'notify.suscribers';
                    var hrq = {
                        subject: subject,
                        action: 'new',
                        data: data,
                        oncompleteeventkey: 'notify.suscribers.done',
                        onerroreventkey: 'notify.suscribers.error'
                    };
                    
                    mediator.send(commandkey, hrq, function (result) {
                        console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
                    });
                });

                //do all stuff
                var prefix = annex.getSufix(options);
                var code = prefix;
                require('../../factory/codesgenerator')(membership.mongo, 'signup', 
                    function (cbcode) {
                        
                        code += cbcode;
                        console.log('New code: ' + code);
                        //first save user...
                        var userkey = 'add user ' + options.email;
                        var modelkey = 'add ' + options.kind + ' ' + options.email;
                        options.code = code;
                        var tasks = [
                            {
                                key: userkey,
                                method: annex.adduser,
                                args: options
                            },
                            {
                                key: modelkey,
                                method: annex.addModel,
                                args: options
                            }
                        ];
                    
                        common.threading.forkpool(tasks, function (results) {
                        //All saved... update models...
                            console.log('Pool finished.. lets do last step..');
                            console.log(JSON.stringify(results));
                            var user = results.get(userkey);
                            var model = results.get(modelkey);
                            model.user = user;
                            options.model = model;
                            options.user = user;
                            if (options.model != null && options.user != null) {
                                console.log('user code: ' + user.code);
                                console.log('model code: ' + model.code);
                                annex.lastUpdate(options, function (doc) {
                                    //SUCCESSFULL SIGNUP!!
                                    var session = annex.buildSession(user, model);
                                    callback(session);
                                    cev.emit('signup.complete', model);
                                });
                            }
                            else { 
                                rs.ResultOK = false;
                                rs.Message = 'Sorry, we have problems to complete your sign up request. please, try again';
                                errorcallback(rs);
                            }
                        });
                    //end function code...
                });
                

            } else {
                rs.ResultOK = false;
                rs.Message = 'The email you are trying to register already exists...(' + options.email + ')';
                errorcallback(rs);
            }
        } else {
            errorcallback(rs);
        }
    });

}