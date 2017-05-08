
var kindshash = module.exports.kindshash = {
    DMC: 'DMCs',
    Affiliate: 'Affiliate',
    Traveler: 'Travelers',
    Admin: 'OMTAdmin'
}

var getrole = module.exports.getrole = function (mongo, rolename, callback) {
    mongo.find({ collectionname: 'Roles', query: { title: rolename } }, function (result) {

        if (result != null && result.ResultOK == true) {
            var role = result.Data[0];
            callback(role);
        } else {
            callback(null);
        }
    });
}

var getSufix = module.exports.getSufix = function (options) {
    var code = 'OMT';
    if (options.kind == 'DMC') {
        var dmc = options.dmc;
        if (dmc != null && dmc.company.location != null &&
            dmc.company.location.countrycode != null &&
            dmc.company.location.countrycode != '') {

            code = dmc.company.location.countrycode;

        } else {
            if (dmc.company.operatein != null && dmc.company.operatein.length > 0) {
                if (dmc.company.operatein[0].operateLocation.countrycode != null &&
                    dmc.company.operatein[0].operateLocation.countrycode != '') {

                    code = dmc.company.location.countrycode;

                }
            }
        }
    }
    if (options.kind == 'Affiliate') {
        code = 'AV';
    }
    if (options.kind == 'Traveler') {
        code = 'CLI';
    }

    return code;
}

var adduser = module.exports.adduser = function (options, callback) {
    console.log('Adding new user');

    //first dummy
    var keysfactory = require('../../factory/apikeys');
    var userdm = {
        username: options.username,
        email: options.email,
        code: options.code,
        phone: '',
        photo: {
            url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
        },
        password: options.password || options.phone,
        isDMC: false,
        isTraveler: false,
        isAdmin: false,
        isAffiliate: false,
        active: true,
        isLocal: true,
        isFacebookLinked: false,
        isTwitterLinked: false,
        isGoogleLinked: false
    };
    var roletoadd = options.kind;
    if (options.kind == 'Traveler') {
        userdm.isTraveler = true;
        roletoadd = {
            title: 'Traveler'
        };
        userdm.rolename = 'Traveler';
    }
    if (options.kind == 'DMC') {
        userdm.isDMC = true;
        roletoadd = {
            title: 'DMC'
        };
        userdm.rolename = 'DMC';
    }
    if (options.kind == 'Admin') {
        userdm.isAdmin = true;
        roletoadd = {
            title: 'Admin'
        };
        userdm.rolename = 'Admin';
    }
    if (options.kind == 'Affiliate') {
        userdm.isAffiliate = true;
        roletoadd = {
            title: 'Affiliate'
        };
        userdm.rolename = 'Affiliate';
    }
    if (options.mode == 'social.facebook') {
        userdm.photo.url = options.imageprofile;
        userdm.password = options.id;
        userdm.facebook = {
            id: options.id,
            token: options.accesstoken,
            email: options.email,
            name: options.username,
            link: options.fblink
        };
    }
    if (options.mode == 'social.google') {
        userdm.photo.url = options.imageprofile;
        userdm.password = options.id;
        userdm.google = {
            id: options.id,
            token: options.accesstoken,
            email: options.email,
            name: options.username,
            link: options.fblink
        };
    }
    console.log(userdm);
    var user = options.membership.mongo.getmodel({ collectionname: 'Users', modelobject: userdm });
    console.log('the model : ');
    console.log(user);
    //api key generation
    user.apikey = keysfactory.getAPIkey(user.email, user.password);
    //last step...
    getrole(options.membership.mongo, roletoadd.title, function (role) {
        if (role != null) {
            user.roles.push(role);
        }
        user.save(function (err, doc) {
            if (err != null) { console.log(err); }
            console.log('User saved succesfully!');
            callback(doc);
        });
    });
}

var addAdmin = module.exports.addAdmin = function (options, callback) {
    var admdm = {
        code: options.code,
        name: options.username,
        email: options.email,
        skype: '',
        location: {
            fulladdress: '',
            city: '',
            stateorprovince: '',
            cp: '',
            country: '',
            countrycode: '',
            continent: '',
            latitude: 0.0,
            longitude: 0.0,
        },
        description: '',
        membershipDate: new Date(),
        images:
        {
            photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
            logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
            splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
        },
        user: theuser
    };
    var admin = options.membership.mongo.getmodel({ collectionname: 'OMTAdmin', modelobject: admdm });
    admin.save(function (err, doc) {
        if (err != null) { console.log(err); }
        callback(doc);
    });
}

var addTraveler = module.exports.addTraveler = function (options, callback) {
    var trvdm = {
        code: options.code,
        firstname: options.username,
        lastname: '',
        phone: options.phone,
        email: options.email,
        skype: '',
        location: {},
        cif: '',
        description: '',
        membershipDate: new Date(),
        sendmenews: false,
        images: {
            photo: {
                url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
            },
            logo: {
                url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
            },
            splash: {
                url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
            }
        }
    };
    if (options.mode != null && options.mode.indexOf('social.') >= 0) {
        trvdm.photo.url = options.imageprofile;
        trvdm.location = options.fulladdress;
        trvdm.firstname = options.first_name;
    }
    var traveler = options.membership.mongo.getmodel({ collectionname: 'Travelers', modelobject: trvdm });
    traveler.save(function (err, doc) {
        if (err != null) { console.log(err); }
        callback(doc);
    });

}

var addDMC = module.exports.addDMC = function (options, callback) {
    var dmDMC = options.dmc;
    dmDMC.code = options.code;
    dmDMC.membershipDate = new Date();
    delete dmDMC['user'];
    delete dmDMC['contactuser'];
    delete dmDMC['admin'];

    dmDMC.name = dmDMC.name != null && dmDMC.name != '' ? dmDMC.name : dmDMC.company.name;
    if (dmDMC.company == null) {
        dmDMC.company = {
            name: '',
            legalname: '',
            constitutionyear: new Date().getFullYear(),
            phone: '',
            emergencyphone: '',
            website: '',
            taxid: '',
            location: {
                fulladdress: '',
                city: '',
                stateorprovince: '',
                cp: '',
                country: '',
                countrycode: '',
                latitude: 0.0,
                longitude: 0.0
            },
            operatein: []
        };
    }
    if (dmDMC.contact == null) {
        dmDMC.bankinfo = {
            title: '',
            name: options.username,
            firstname: options.username,
            lastname: '',
            email: options.email,
            fax: '',
            skype: '',
            nif: '',
            position: ''
        };
    }
    if (dmDMC.additionalinfo == null) {
        dmDMC.additionalinfo = {
            description: '',
            recomenders: [],
            associations: [],
            registration: {
                url: ''
            },
            insurancepolicy: {
                url: ''
            },
            businessLicense: false,
            notpunished: false,
            paymenttaxes: false
        };
    }
    if (dmDMC.membership == null) {
        dmDMC.membership = {
            description: '',
            recomenders: [],
            associations: [],
            registration: {
                url: ''
            },
            insurancepolicy: {
                url: ''
            },
            businessLicense: false,
            notpunished: false,
            paymenttaxes: false
        };
    }
    if (dmDMC.images == null) {
        dmDMC.images = {
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
        };
    }
    if (dmDMC.expenditure == null || dmDMC.expenditure.length == 0) {
        dmDMC.expenditure = [
            {
                label: new Date().getFullYear(), months: [
                    { label: 'January', value: '' },
                    { label: 'February', value: '' },
                    { label: 'March', value: '' },
                    { label: 'April', value: '' },
                    { label: 'May', value: '' },
                    { label: 'Jun', value: '' },
                    { label: 'July', value: '' },
                    { label: 'August', value: '' },
                    { label: 'September', value: '' },
                    { label: 'October', value: '' },
                    { label: 'November', value: '' },
                    { label: 'December', value: '' }
                ]
            },
            {
                label: new Date().getFullYear() + 1, months: [
                    { label: 'January', value: '' },
                    { label: 'February', value: '' },
                    { label: 'March', value: '' },
                    { label: 'April', value: '' },
                    { label: 'May', value: '' },
                    { label: 'Jun', value: '' },
                    { label: 'July', value: '' },
                    { label: 'August', value: '' },
                    { label: 'September', value: '' },
                    { label: 'October', value: '' },
                    { label: 'November', value: '' },
                    { label: 'December', value: '' }
                ]
            }
        ];
    }

    var dmc = options.membership.mongo.getmodel({ collectionname: 'DMCs', modelobject: dmDMC });
    dmc.save(function (err, doc) {
        if (err != null) { console.log(err); }
        callback(doc);
    });
}

var addAffiliate = module.exports.addAffiliate = function (options, callback, errorcallback) {
    console.log('Adding a new affiliate ');
    var affiliate = options.affiliate;
    affiliate.code = options.code;
    delete affiliate['user'];
    affiliate.membershipDate = new Date();
    if (affiliate.name == null || affiliate.name == '') {
        affiliate.name = options.username;
    }
    if (affiliate.company == null) {
        affiliate.company = {
            name: '',
            legalname: '',
            constitutionyear: new Date().getFullYear(),
            phone: '',
            website: '',
            taxid: '',
            location: {
                fulladdress: '',
                city: '',
                stateorprovince: '',
                cp: '',
                country: '',
                countrycode: '',
                latitude: 0.0,
                longitude: 0.0,
                route: ''
            }
        };
    }
    if (affiliate.contact == null) {
        affiliate.contact = {
            firstname: options.username,
            lastname: '',
            email: options.email,
            fax: '',
            skype: '',
            nif: '',
            position: '',
            marketingContact: {
                name: options.username,
                email: options.email,
            },
            bookingContact: {
                email: options.email,
            },
            paymentContact: {
                email: options.email
            }
        };
    }
    if (affiliate.membership == null) {
        affiliate.membership = {
            omtmargin: 3,
            acceptterms: true,
            membershipDate: new Date(),
            registervalid: false,
            requestdelete: false,
        };
    }
    if (affiliate.images == null) {
        affiliate.images = {
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
        };
    }
    if (affiliate.fees == null) {
        affiliate.fees = {
            unique: 0,
            groups: 0,
            tailormade: 0,
            flights: 0

        };
    }
    console.log('Lets save model...');
    var aff = options.membership.mongo.getmodel({ collectionname: 'Affiliate', modelobject: affiliate });
    console.log(aff);
    aff.save(function (err, doc) {
        if (err != null) { console.log(err); callback(err); }
        else {
            console.log('Affiliate saved succesfully!');
            callback(doc);
        }

    });
}

var addModel = module.exports.addModel = function (conf, callback) {
    if (conf.kind == 'Traveler') {
        addTraveler(conf, callback);
    }
    if (conf.kind == 'DMC') {
        addDMC(conf, callback);
    }
    if (conf.kind == 'Admin') {
        addAdmin(conf, callback);
    }
    if (conf.kind == 'Affiliate') {
        addAffiliate(conf, callback);
    }
}

var lastUpdate = module.exports.lastUpdate = function (options, callback) {
    if (options.kind == 'DMC') {
        options.model.admin = options.user;
        options.model.contactuser = options.user;
    }
    options.model.user = options.user;
    options.model.save(function (err, doc) {
        if (err != null) { console.log(err); }
        callback(doc);
    });
}

var buildSession = module.exports.buildSession = function (user, model) {

    var key = require('yourttoo.common').utils.getToken();

    var rsp = {
        Session: {
            key: key,
            date: new Date(),
            user: user.toObject(),
            dmc: null,
            traveler: null,
            admin: null,
            affiliate: null,
        },
        ResultOK: true,
        Messages: '',
        Token: key
    }
    if (user.isDMC) {
        rsp.Session.dmc = model.toObject();
    }
    if (user.isTraveler) {
        rsp.Session.traveler = model.toObject();
    }
    if (user.isAdmin) {
        rsp.Session.admin = model.toObject();
    }
    if (user.isAffiliate) {
        rsp.Session.affiliate = model.toObject();
    }

    console.log('generate token...');
    var keysfactory = require('../../factory/apikeys');
    rsp.Session.accessToken = keysfactory.getAccessToken(user.email, user.password, user.apikey);
    rsp.Session.userid = user.id;

    console.log('hide password...');
    rsp.Session.user.password = null;
    delete rsp.Session.user.password;
    return rsp;
}

var recoverModelForAuth = module.exports.recoverModelForAuth = function (options, callback, errorcallback) {
    var bCrypt = require("bcrypt-nodejs");
    var user = options.user;
    var membership = options.membership;

    var conf = {
        collectionname: '',
        query: { code: user.code }
    };
    if (user.isTraveler) {
        conf.collectionname = 'Travelers';
        conf.populate = [{ path: 'user' }];
    }
    if (user.isDMC) {
        conf.collectionname = 'DMCs';
        conf.populate = [{ path: 'user' }, { path: 'admin' }, { path: 'contactuser' }];
    }
    if (user.isAdmin) {
        conf.collectionname = 'OMTAdmin';
        conf.populate = [{ path: 'user' }];
    }
    if (user.isAffiliate) {
        conf.collectionname = 'Affiliate';
        conf.populate = [{ path: 'user' }, { path: 'wlcustom' }];
    }

    if (options.mode != null && options.mode.indexOf('social.') >= 0) {
        //is social login...
        membership.mongo.find(conf, function (rs) {
            console.log(rs);
            if (rs != null && rs.ResultOK == true) {
                if (rs.Data != null && rs.Data.length > 0) {
                    var model = rs.Data[0];
                    callback(model);
                }
                else {
                    errorcallback('User not found');
                }
            } else {
                errorcallback('User not found');
            }
        });

    } else {
        //check the password
        user._.password.compare(options.password, function (err, result) {
            if (err) {
                console.log(err);
                errorcallback(err);
            }
            if (result == true) {
                membership.mongo.find(conf, function (rs) {
                    if (rs != null && rs.ResultOK == true) {
                        if (rs.Data != null && rs.Data.length > 0) {
                            var model = rs.Data[0];
                            callback(model);
                        }
                        else {
                            errorcallback('User not found');
                        }
                    } else {
                        errorcallback('User not found');
                    }
                });

            } else {
                errorcallback('Your password does not match with the email registered');
            }
        });
    }
}

var recoverModelWithUser = module.exports.recoverModelWithUser = function (options, callback, errorcallback) {
    var bCrypt = require("bcrypt-nodejs");
    var user = options.user;
    var membership = options.membership;

    var conf = {
        collectionname: '',
        query: { code: user.code }
    };
    if (user.isTraveler) {
        conf.collectionname = 'Travelers';
        conf.populate = [{ path: 'user' }];
    }
    if (user.isDMC) {
        conf.collectionname = 'DMCs';
        conf.populate = [{ path: 'user' }, { path: 'admin' }, { path: 'contactuser' }];
    }
    if (user.isAdmin) {
        conf.collectionname = 'OMTAdmin';
        conf.populate = [{ path: 'user' }];
    }
    if (user.isAffiliate) {
        conf.collectionname = 'Affiliate';
        conf.populate = [{ path: 'user' }, { path: 'wlcustom' }];
    }
    membership.mongo.find(conf, function (rs) {
        console.log(rs);
        if (rs != null && rs.ResultOK == true) {
            if (rs.Data != null && rs.Data.length > 0) {
                var model = rs.Data[0];
                callback(model);
            }
            else {
                errorcallback('Member not found');
            }
        } else {
            errorcallback('Member not found');
        }
    });
}

var validateAccessToken = module.exports.validateAccessToken = function (membership, userid, token, callback) {
    membership.mongo.find({ collectionname: 'Users', query: { _id: userid } }, function (result) {
        if (result != null && result.ResultOK == true) {
            var doc = result.Data[0];
            var apikey = doc.apikey;
            var email = doc.email;
            var password = doc.password;
            var keysfactory = require('../../factory/apikeys');
            console.log('Data-> mail: ' + email + ' || apikey: ' + apikey + ' || pass: ' + password + ' || acctoken: ' + token);
            var valid = keysfactory.compareToken(email, password, apikey, token);
            console.log('Token from request: ' + token);
            //console.log('Token from BBDDusr: ' + _token);
            //check token
            //var valid = _token == token;
            //cb the result...
            callback(valid);
        } else {
            callback(false);
        }
    });
}

var recoverModel = module.exports.recoverModel = function (options, callback, errorcallback) {
    var membership = options.membership;

    membership.mongo.find(options, function (rs) {
        if (rs != null && rs.ResultOK == true) {
            if (rs.Data != null && rs.Data.length > 0) {
                var model = rs.Data[0];
                callback(model);
            }
            else {
                errorcallback('User not found');
            }
        } else {
            errorcallback('User not found');
        }
    });


}

var recoverCredentials = module.exports.recoverCredentials = function (options, callback, errorcallback) {
    var membership = options.membership;
    var userid = options.userid;

    membership.mongo.find({ collectionname: 'Users', query: { _id: userid } }, function (result) {
        if (result != null && result.ResultOK == true) {
            var user = result.Data[0];
            //get query ready...
            options.query = { code: user.code };
            if (user.isTraveler) {
                options.collectionname = 'Travelers';
                options.populate = [{ path: 'user' }];
            }
            if (user.isDMC) {
                options.collectionname = 'DMCs';
                options.populate = [{ path: 'user' }, { path: 'admin' }, { path: 'contactuser' }];
            }
            if (user.isAdmin) {
                options.collectionname = 'OMTAdmin';
                options.populate = [{ path: 'user' }];
            }
            if (user.isAffiliate) {
                options.collectionname = 'Affiliate';
                options.populate = [{ path: 'user' }, { path: 'wlcustom' }];
            }

            recoverModel(options, function (model) {
                //all ok!
                callback(model);
            }, function (err) {
                //somthing went wrong...
                errorcallback(err);
            });

        } else {
            errorcallback(null);
        }
    });

}