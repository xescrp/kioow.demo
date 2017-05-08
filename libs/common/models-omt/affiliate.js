module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;

    var Affiliate = new yourttoocore.List('Affiliate', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true },
    });
    
    Affiliate.add({
        code: { type: String, required: true, index: true },
        name: { type: String, required: true, index: true },
        slug: { type: String, index: true },
        company: {
            legalname: { type: String, index: true },
            name: { type: String, index: true },
            constitutionyear: { type: Types.Number },
            taxid: { type: String },
            phone: { type: String },
            celphone: { type: String },
            agencylic: { type: String },
            emergencyphone: { type: String },
            website: { type: String },
            group: { type: String, index: true },
            location: {
                fulladdress: { type: String },
                city: { type: String, index: true },
                stateorprovince: { type: String, index: true },
                cp: { type: String, index: true },
                country: { type: String, index: true },
                countrycode: { type: String, index: true },
                continent: { type: String },
                latitude: { type: Types.Number },
                longitude: { type: Types.Number },
                route: { type: String },
            }
        },
        contact: {
            firstname: { type: String, index: true },
            lastname: { type: String, index: true },
            email: { type: Types.Email, index: true },
            fax: { type: String },
            skype: { type: String },
            position: { type: String },
            status: { type: String, index: true },
            marketingContact : {
                name: { type: String },
                email: { type: String },
            },
            bookingContact : {
                email: { type: String },
            },
            paymentContact : {
                firstname: { type: String },
                lastname: { type: String },
                phone: { type: String },
                email: { type: String },
                location: {
                    fulladdress: { type: String},
                    city: { type: String},
                    stateorprovince: { type: String },
                    cp: { type: String },
                    country: { type: String},
                    countrycode: { type: String},
                    continent: { type: String },
                    latitude: { type: Types.Number },
                    longitude: { type: Types.Number },
                    route: { type: String },
                }
            }
        },
        bankinfo: {
            beneficiary: { type: String },
            iban: { type: String },
            accountingnumber: { type: String },
            accountnumber: { type: String },
            bankname: { type: String },
            bic: { type: String },
            routing: { type: String },
            bankaddress: { type: String },
            bankzip: { type: String },
            bankcity: { type: String },
            bankcountry: { label: { type: String }, value: { type: String } }
        },
        membership: {
            omtmargin: { type: Types.Number },
            acceptterms: { type: Types.Boolean, index: true },
            membershipDate: { type: Types.Date, index: true },
            validateDate: { type: Types.Date},
            registervalid: { type: Types.Boolean, index: true },
            requestdelete: { type: Types.Boolean },
            colaborationagree: { type: Types.Boolean },
            wlcollaborationagree: { type: Types.Boolean }
        },
        images: 
        {
            photo: { type: Types.CloudinaryImage, collapse: true },
            logo: { type: Types.CloudinaryImage, collapse: true },
            splash: { type: Types.CloudinaryImage, collapse: true }
        },
        currency: {
            label: String,
            symbol: String,
            value: String
        },
        timeZone: {
            gmtAdjustment: String,
            label: String,
            timeZoneId: String,
            useDaylightTime: String,
            value: String
        },
        omtcomment : { type: String },
        fees: {
            unique: { type: Types.Number, index: true },
            groups: { type: Types.Number, index: true },
            tailormade: { type: Types.Number, index: true },
            flights: { type: Types.Number, index: true },
            pvpkeep: { type: Types.Boolean }
        },
        companynameindexing : { type: String, index: true },
        contactnameindexing : { type: String, index: true },
        companylocationindexing : { type: String, index: true },
        user: { type: Types.Relationship, initial: true, ref: 'Users', index: true },
        wlcustom: { type: Types.Relationship, initial: true, ref: 'WLCustomizations', index: true}
    });
    
    Affiliate.schema.pre('save', function (next) {
    
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        var _ = require('underscore');

        if (this.company != null && this.company.name != null) {
            var cname = this.company.name || 'ZZZZZZZZZZ';
            this.companynameindexing = [cname.toLowerCase(), pad(this.code, 10)].join('.');
        } else {
            this.companynameindexing = ['ZZZZZZZZZZ', pad(this.code, 10)].join('.');
        }

        if (this.contact != null && this.contact.firstname != null && this.contact.lastname != null) {
            var prev = [this.contact.lastname.toLowerCase(), this.contact.firstname.toLowerCase()].join('.');
            this.contactnameindexing = [prev.toLowerCase(), pad(this.code, 10)].join('.');
        }
        else {
            this.contactnameindexing = ['ZZZZZZZZZZ', pad(this.code, 10)].join('.');
        }

        if (this.company.location != null) {
            this.companylocationindexing = [this.company.location.city.toLowerCase(), pad(this.code, 10)].join('.');
        }
        else {
            this.companylocationindexing = ['ZZZZZZZZZZ', pad(this.code, 10)].join('.');
        }

        next();
    }); 
   
    Affiliate.schema.virtual('content.full').get(function () {
        return this.code || '';
    });
    
    /** 
        Relationships
        =============
    */

    Affiliate.addPattern('standard meta');
    Affiliate.defaultColumns = 'code, slug, name, phone|20%, weburl|20%, email';
    Affiliate.register(dbname);
}