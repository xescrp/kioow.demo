module.exports = function (conf, callback) {
    var bookingids = conf.bookingids;
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var statics = { total: 0, done: 0, witherrors: 0, success: 0 };
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var witherrors = [];

    var async = require('async');
    var pushtasks = []; 

    function checkuserexists(email, callback, errorcallback) {
        core.list('Users').model.find({ email: email }).count(function (err, count) {
            if (err != null) {
                console.log('Mongo mongolayer with error...');
                errorcallback(err);
            }
            if (count != null) {
                var result = (count > 0);
                callback(result);
            } else { callback(false); }
        });
    }
    function addaffiliate(options, callback, errorcallback) {
        console.log('Adding a new affiliate ');
        var affiliate = options.affiliate;
        affiliate.code = options.code;
        affiliate.user = options.user;
        console.log('Lets save model...');
        var aff = core.list('Affiliate').model(affiliate);
        aff.save(function (err, doc) {
            if (err != null) { console.log(err); callback(err); }
            else {
                console.log('Affiliate saved succesfully!');
                callback(doc);
            }

        });
    }
    function adduser(options, callback, errorcallback) {
        console.log('Adding new user');
        
        //first dummy
        require('../../../factory/codesgenerator')(core, 'signup', function (cbcode) {
            var code = 'AV' + cbcode;
            console.log('New code: ' + code);
            //first save user...
            var userkey = 'add user ' + options.email;
            var modelkey = 'add ' + options.kind + ' ' + options.email;
            options.code = code;

            var keysfactory = require('../../../factory/apikeys');

            var userdm = {
                username: options.username,
                email: options.email,
                code: code,
                phone: options.phone,
                photo: {
                    url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
                },
                password: options.password || options.phone,
                isDMC: false,
                isTraveler: false,
                isAdmin: false,
                isAffiliate: true,
                active: true,
                isLocal: true,
                isFacebookLinked: false,
                isTwitterLinked: false,
                isGoogleLinked: false,
                rolename: 'affiliate'
            };

            var user = core.list('Users').model(userdm);
            console.log('saving user model : ');
            //api key generation
            user.apikey = keysfactory.getAPIkey(user.email, user.password);
            //last step...
            user.save(function (err, doc) {
                if (err != null) { console.log(err); errorcallback(err); }
                else {
                    console.log('User saved succesfully!');
                    callback(doc);
                }
            });
        });  
    }

    var counters = {
        ok: 0,
        failed: 0,
        failedemails: [],
        repeatedemails: []
    };

    var affitoimport = conf.affiliatescsv;

    affitoimport != null && affitoimport.length > 0 ?
        _.each(affitoimport, function (csvaffidup) {

            console.log('pushing : ' + csvaffidup['Nombre Agencia']);

            pushtasks.push(function (callback) {
                var user = {
                    username: csvaffidup['Nombre Agencia'],
                    email: csvaffidup['E-mail'],
                    code: '',
                    phone: csvaffidup['Telefono'],
                    password: csvaffidup['Password']
                };

                var affiliate = {
                    code: "",
                    name: csvaffidup['Nombre Agencia'],
                    membershipDate: new Date(),
                    company: {
                        name: csvaffidup['Nombre Agencia'],
                        legalname: csvaffidup['Nombre legal de la Agencia'],
                        constitutionyear: csvaffidup['Año'],
                        phone: csvaffidup['Telefono'],
                        agencylic: csvaffidup['CIF'],
                        group: csvaffidup['Grupo'],
                        website: '',
                        taxid: csvaffidup['CIF'],
                        location: {
                            fulladdress: csvaffidup['Direccion'],
                            city: csvaffidup['Ciudad'],
                            stateorprovince: csvaffidup['Provincia'],
                            cp: csvaffidup['Codigo Postal'],
                            country: csvaffidup['Pais'],
                            countrycode: 'ES',
                            latitude: 0.0,
                            longitude: 0.0
                        },
                    },
                    contact: {
                        firstname: csvaffidup['Nombre'],
                        lastname: csvaffidup['PrimerApellido'],
                        email: csvaffidup['E-mail'],
                        position: csvaffidup['Cargo'],
                        skype: '',
                        bookingContact: {
                            email: csvaffidup['E-mail']
                        },
                        marketingContact: {
                            email: csvaffidup['E-mail']
                        },
                        paymentContact: {
                            firstname: "",
                            lastname: "",
                            phone: "",
                            email: "",
                            location: {
                                fulladdress: csvaffidup['Direccion'],
                                city: csvaffidup['Ciudad'],
                                stateorprovince: csvaffidup['Provincia'],
                                cp: csvaffidup['Codigo Postal'],
                                country: csvaffidup['Pais'],
                                countrycode: 'ES',
                                latitude: 0.0,
                                longitude: 0.0
                            },
                        }
                    },
                    images: {
                        photo: {
                            public_id: '',
                            url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
                        },
                        logo: {
                            public_id: '',
                            url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
                        },
                        splash: {
                            public_id: '',
                            url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
                        }
                    },
                    membership: {
                        acceptterms: true,
                        colaborationagree: true,
                        omtmargin: 3,
                        membershipDate: new Date(),
                        registervalid: false,
                        requestdelete: false,
                    },
                    currency: {
                        label: "Euro",
                        symbol: "€",
                        value: "EUR"
                    },
                    fees: {
                        unique: 0,
                        groups: 0,
                        tailormade: 0,
                        flights: 0

                    }
                };
                //check if user exists:
                checkuserexists(user.email, function (exists) {
                    exists ?
                        setImmediate(function () {
                            //user email exists: 
                            counters.repeatedemails.push(user.email);
                            callback(null, null);
                        }) :
                        setImmediate(function () {
                            //user email ok/enable to insert
                            adduser(user,
                                function (user) {
                                    //add the affiliate
                                    var config = { user: user, affiliate: affiliate, code: user.code };
                                    addaffiliate(config,
                                        function (savedaffi) {
                                            //affi added ok
                                            console.log('added: ' + user.email);
                                            counters.ok++;
                                            callback(null, savedaffi);

                                        },
                                        function (err) {
                                            //affi error adding
                                            console.error(err);
                                            counters.failed++;
                                            counters.failedemails.push(user.email);
                                            callback(err, null);
                                        });
                                },
                                function (err) {
                                    //user rejected...
                                    console.error(err);
                                    counters.failed++;
                                    counters.failedemails.push(user.email);
                                    callback(err, null);
                                });
                        });
                },
                    function (err) {
                        //error detecting mail
                        console.error(err);
                        counters.failed++;
                        counters.failedemails.push(user.email);
                        callback(err, null);
                    });
            });
        }) :
        pushtasks.push(function (callback) {
            setImmediate(function () {
                callback(null, { ResultOK: true, Message: 'nothing to do' });
            });
        });

    async.series(pushtasks, function (err, results) {
        err != null ? callback(err, conf) : setImmediate(function () {
            conf.results = results;
            conf.errors = err;
            conf.counters = counters;
            err != null ? callback(err, conf) : callback(null, conf);
        });
    })
}
