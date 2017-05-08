var _ = require('underscore');
module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;


    var User = new yourttoocore.List('Users', {
        nodelete: true
    });
    
    User.add({
        username: { type: String, required: true, index: true },
        email: { type: Types.Email, initial: true, required: true, index: true },
        code: { type: String, index: true },
        phone: { type: String, width: 'short' },
        photo: { type: Types.CloudinaryImage, collapse: true },
        password: { type: Types.Password, initial: true, required: false },
        isDMC: { type: Types.Boolean, required: true },
        isTraveler: { type: Types.Boolean, required: true },
        isAdmin: { type: Types.Boolean },
        isAffiliate: { type: Types.Boolean },
        roles: { type: Types.Relationship, ref: 'Roles', many: true },
        active: { type: Types.Boolean, index: true },
        isLocal: { type: Types.Boolean, index: true },
        isFacebookLinked : { type: Types.Boolean, index: true },
        isTwitterLinked: { type: Types.Boolean, index: true },
        isGoogleLinked: { type: Types.Boolean, index: true },
        apikey: { type: String, index: true },
        facebook         : 
        {
            id           : String,
            token        : String,
            email        : String,
            name         : String,
            link         : String
        },
        twitter:
        {
            id           : String,
            token        : String,
            displayName  : String,
            username     : String,
            link         : String
        },
        google           : 
        {
            id           : String,
            token        : String,
            email        : String,
            name         : String,
            link         : String
        },
        timeZone: {
            ObjectgmtAdjustment: String ,
            label: String,
            timeZoneId: String,
            useDaylightTime: String,
            value: String
        },
        currency: {
            label: String,
            symbol: String,
            value: String
        }
    });
    
    
    
    
    /**
     * Relationships
     */

    User.relationship({ ref: 'Travelers', path: 'user' });
    User.relationship({ ref: 'DMCs', path: 'user' });
    User.relationship({ ref: 'Affiliate', path: 'user' });
    User.relationship({ ref: 'Admin', path: 'user' });
    User.relationship({ ref: 'DMCs', path: 'contactuser' });
    User.relationship({ ref: 'DMCs', path: 'admin' });
    
    User.schema.methods.wasActive = function () {
        this.lastActiveOn = new Date();
        return this;
    }

    User.schema.methods.userRole = function () {
        keys = ['isAdmin', 'isTraveler', 'isAffiliate', 'isDMC'];
        var t = _.pick(this, function (value, key, object) {
            return (value == true && keys.indexOf(key) >= 0);
        });
        var tt = _.map(_.keys(t), function (k) {
            return k.toLowerCase().replace('is', '');
        });
        var rname = tt != null && tt.length > 0 ? tt[0] : null;
        return rname;
    }
    
    var protect = function (path) {
        User.schema.path(path).set(function (value) {
            return (this.isProtected) ? this.get(path) : value;
        });
    }

    User.schema.pre('init', function (next, user, query) {
        keys = ['isAdmin', 'isTraveler', 'isAffiliate', 'isDMC'];
        var t = _.pick(user, function (value, key, object) {
            return (value == true && keys.indexOf(key) >= 0);
        });
        var tt = _.map(_.keys(t), function (k) {
            return k.toLowerCase().replace('is', '');
        });
        var rname = tt != null && tt.length > 0 ? tt[0] : null;
        user.rolename = rname;
        next();
    });

    _.each(['username', 'email'], protect);
    
    User.schema.path('password').set(function (value) {
        return (this.isProtected) ? '$2a$10$b4vkksMQaQwKKlSQSfxRwO/9JI7Fclw6SKMv92qfaNJB9PlclaONK' : value;
    });
    
    
    
    
    User.addPattern('standard meta');
    User.defaultColumns = 'username, email';
    User.register(dbname);
}