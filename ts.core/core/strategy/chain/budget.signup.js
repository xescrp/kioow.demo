module.exports = function (conf, callback) {
    console.log('budget - signup passenger or check traveler...[' + conf.bookingmodel + ']');
    conf.signuponbudget = true;
    if (conf.savebudget == true) {
        var common = require('yourttoo.common');
        var core = conf.core;
        var signup = conf.signup;
        var booktype = conf.bookingmodel;
        var cev = common.eventtrigger.eventcarrier(common.utils.getToken());

        var dummymail = [common.utils.getToken(), 'yourttoo.com'].join('@');
        signup.email = signup.email || dummymail;

        booktypehash = {
            bookingb2c: 'traveler',
            bookingb2b: 'signup',
            budget: 'signup',
            taylormadeb2c: 'traveler',
            taylormadeb2cgroups: 'traveler',
            taylormadeb2b: 'signup',
            taylormadeb2bgroups: 'signup',
            xmlapi: 'signup',
            whitelabel: 'signup',
        };
        
        cev.on('all.error', function (err) {
            console.error(err);
            callback(err, conf);
        });
        cev.on('all.done', function () {
            callback(null, conf);
        });
        
        cev.on('member.found', function (member) {
            conf.traveler = member;
            cev.emit('all.done', member);
        });
        
        cev.on('user.found', function (user) {
            core.list('Travelers')
        });
        
        cev.on('user.notfound', function () {
            var _med = require('../../mediator/membership.mediator');
            var member = new _med.MembershipMediator();
            
            var req = {
                email: signup.email,
                username: signup.username,
                name: signup.name,
                lastname: signup.lastname,
                password: signup.phone,
                phone: signup.phone,
                nif: signup.nif,
                kind: 'Traveler'
            };
            
            member.signup(req,
            function (result) {
                cev.emit('member.found', result);
            },
            function (err) {
                cev.emit('all.error', err);
            });
        });
        
        cev.on('traveler', function () {
            //recover the user
            core.list('Users').model.find({ email: signup.email })
            .select('_id code email')
            .exec(function (err, docs) {
                err != null ? cev.emit('all.error', err) : setImmediate(function () {
                    docs != null && docs.length > 0 ? cev.emit('user.found', docs[0]) : cev.emit('user.notfound');
                });
            });
        });
        
        cev.on('new.signup', function () {
            var newsignup = core.list('SigninRegister').model(signup);
            require('../../factory/codesgenerator')(conf.mongo, 'signup', function (code) {
                newsignup.code = ['TS', 'SGN', code].join('-');
                newsignup.kind = booktype;
                newsignup.save(function (err, doc) {
                    err != null ? cev.emit('all.error', err) : (conf.signup = doc, cev.emit('all.done'));
                });
            });
        });
        
        cev.on('signup.done', function (sgn) {
            conf.signup = sgn;
            cev.emit('all.done');
        });
        
        cev.on('signup', function () {
            //bookingb2c, taylormadeb2c, taylormadeb2cgroups, [TRAVELER]
            //bookingb2b,taylormadeb2b, taylormadeb2bgroups, budget [SIGNUP]
            //whitelabel,[SIGNUP]
            core.list('SigninRegister').model.find({ email: signup.email })
            .select('_id code email')
            .exec(function (err, docs) {
                err != null ? cev.emit('all.error', err) : setImmediate(function () {
                    docs != null && docs.length > 0 ? cev.emit('signup.done', docs[0]) : cev.emit('new.signup');
                });
            });
        });
        //check booking type...
        var booktype = booktypehash[booktype];
        !common.utils.stringIsNullOrEmpty(booktype) ?
        cev.emit(booktype)
        :
        cev.emit('all.error', 'booking model not found or not recognized');
    }
    else { setImmediate(function () { callback(null, conf); }); }
	
}