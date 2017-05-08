var ytobase = require('../base');
var common = require('yourttoo.common');
var _ = require('underscore');

var AuthMediator = function () {
    this.core = null;
}

AuthMediator.prototype.start = function () {
    this.core = new ytobase.YourTTOOCore();
    this.core.start(function (readyrs) {
        console.log('Auth mediator connected to BBDD.');
    });
}

AuthMediator.prototype.validate = function (authoptions) {
    var self = this;
    var _validate = (function (authoptions) {

        return function (authoptions) {
            var userid = authoptions.userid;
            var token = authoptions.accesstoken;
            var ev_c = common.eventtrigger.eventcarrier(common.utils.getToken());

            ev_c.on('user.found', function (docs) {
                var user = (docs != null && docs.length > 0) ? docs[0] : null;
                user != null ? ev_c.emit('user.ready', user) : ev_c.emit('validate.error', 'user not found');
            });
            ev_c.on('user.ready', function (user) {
                var apikey = user.apikey;
                var email = user.email;
                var password = user.password;
                var keysfactory = require('../factory/apikeys');
                console.log('Data-> mail: ' + email + ' || apikey: ' + apikey + ' || pass: ' + password + ' || acctoken: ' + token);
                var valid = keysfactory.compareToken(email, password, apikey, token);
                valid ? ev_c.emit('token.valid', user) : ev_c.emit('validate.error', 'Your accessToken is innvalid or have expired. please try login again');
            });
            ev_c.on('token.valid', function (user) {
                var query = { code: user.code };
                var collectionname = 'Affiliate';

                if (user.isTraveler) {
                    collectionname = 'Travelers';
                }
                if (user.isDMC) {
                    collectionname = 'DMCs';
                }
                if (user.isAdmin) {
                    collectionname = 'OMTAdmin';
                }
                if (user.isAffiliate) {
                    collectionname = 'Affiliate';
                }

                self.core.list(collectionname).model.find(query)
                .exec(function (err, docs) {
                    err != null ? ev_c.emit('validate.error', err) : ev_c.emit('member.ready', docs);
                })
            });
            ev_c.on('member.ready', function (docs) {
                var member = (docs != null && docs.length > 0) ? docs[0] : null;
                member != null ? ev_c.emit('member.populate', member) : ev_c.emit('validate.error', err);
            });
            ev_c.on('member.populate', function (member) {
                var populatehash = {
                    Affiliate: [{ path: 'user' }],
                    DMCs: [{ path: 'user' }, { path: 'admin' }, { path: 'contactuser' }],
                    OMTAdmin: [{ path: 'user' }]
                }
                var modelname = (member != null && member.list != null && member.list.model != null) ? member.list.model.modelName : null;
                modelname != null ?
                self.core.list(modelname).model.populate(member, populatehash[modelname], function (err, member) {
                    err != null ? ev_c.emit('validate.error', err) : ev_c.emit('validate.done', member);
                }) : ev_c.emit('validate.error', 'We can not validate your credentials right now. please try again');

            });
            ev_c.on('validate.error', function (err) {
                ev_c.emit('auth.error', err);  //output event error
            });
            ev_c.on('validate.done', function (results) {
                ev_c.emit('auth.done', results);  //output event done
            });
            //first call
            self.core.list('Users').model.find({ _id: userid })
            .exec(function (err, docs) {
                err != null ? ev_c.emit('validate.error', err) : ev_c.emit('user.found', docs);
            });
            return ev_c;
        }

    })(authoptions);

    return _validate(authoptions);
}

module.exports.AuthMediator = AuthMediator;