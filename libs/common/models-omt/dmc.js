module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var DMC = new yourttoocore.List('DMCs', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true },
    });
    
    DMC.add({
        code: { type: String, required: true, index: true },
        name: { type: String, required: true, index: true },
        status: { type: String, index: true },
        vouchername: { type: String },
        vouchernotes: { type: String },
        slug: { type: String, index: true },
        contact: {
            title: { type: String }, 
            name: { type: Types.Name, index: true },
            firstname: { type: String },
            lastname: { type: String },
            email: { type: Types.Email, index: true },
            fax: { type: String },
            skype: { type: String },
            nif: { type: String },
            position: { type: String },
            accountingContact : {
                name: { type: String },
                email: { type: String },
            },
            bookingContact : {
                email: { type: String },
            },
            prodContact : {
                email: { type: String }
            },
            reqFITContact : {
                email: { type: String }
            },
            reqGroupContact : {
                email: { type: String }
            }
        },
        bankinfo: {
            beneficiary: { type: String },
            iban: { type: String },
            accountingnumber: { type: String },//numero de cuenta para contabilidad
            accountnumber: { type: String },
            bankname: { type: String },
            bic: { type: String },
            routing: { type: String },
            bankaddress: { type: String },
            bankzip: { type: String },
            bankcity: { type: String },
            bankcountry: { label: { type: String }, value: { type: String } }
        },
        membershipDate: { type: Types.Date, index: true },
        membership: {
            b2bchannel: { type: Types.Boolean, index: true },
            b2cchannel: { type: Types.Boolean, index: true },
            commission: { type: Types.Number },
            b2bcommission: { type: Types.Number },
            acceptterms: { type: Types.Boolean },
            membershipDate: { type: Types.Date },
            registervalid: { type: Types.Boolean },
            publicprofilecomplete: { type: Types.Boolean },
            companyimagescomplete: { type: Types.Boolean },
            companycomplete: { type: Types.Boolean },
            paymentcomplete: { type: Types.Boolean },
            averagecomplete: { type: Types.Boolean },
            companytaxid: { type: Types.Boolean },
            emergencycomplete: { type: Types.Boolean },
            requestdelete: { type: Types.Boolean },
            toursmultidays: { type: Types.Boolean },
            tailormade: { type: Types.Boolean },
            groups: { type: Types.Boolean },
            payagreement: { type: String },
            autopublish: { type: Types.Boolean },
            confirmterms: { type: Boolean },
            paymentoption: {
                slug: { type: String },
                _en: { type: String },
                _es: { type: String }
            },
            cancelpolicy: {
                _es: { type: String },
                _en: { type: String }
            },
            pvp: {
                keep: { type: Types.Boolean }
            }
        },
        images: 
        {
            photo: { type: Types.CloudinaryImage, collapse: true },
            logo: { type: Types.CloudinaryImage, collapse: true },
            splash: { type: Types.CloudinaryImage, collapse: true }
        },
        currency: {
            label: String ,
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
        user: { type: Types.Relationship, initial: true, ref: 'Users', index: true },
        admin: { type: Types.Relationship, initial: true, ref: 'Users', index: true },
        contactuser: { type: Types.Relationship, initial: true, ref: 'Users', index: true }
    });
    
    DMC.schema.add({
        delegations: {
            type: [{
                    name: { type: String, required: true },
                    slug: { type: String, index: true },
                    email: { type: String, index: true },
                    phone: { type: String, index: true },
                    publishedDate: { type: Types.Date },
                    location: {
                        fulladdress: { type: String },
                        city: { type: String, index: true },
                        stateorprovince: { type: String },
                        cp: { type: String },
                        country: { type: String, index: true },
                        countrycode: { type: String, index: true },
                        continent: { type: String },
                        latitude: { type: Types.Number },
                        longitude: { type: Types.Number },
                    },
                    description: { type: String },
                }]
        }
    });
    
    DMC.schema.add({
        company: {
            legalname: { type: String, index: true },
            name: { type: String, index: true },
            constitutionyear: { type: Types.Number },
            taxid: { type: String },
            phone: { type: String },
            emergencyphone: { type: String },
            website: { type: String },
            operatein: {
                type: [{
                        operateLocation: {
                            fulladdress: { type: String },
                            city: { type: String },
                            stateorprovince: { type: String },
                            cp: { type: String },
                            country: { type: String, index: true },
                            countrycode: { type: String, index: true },
                            continent: { type: String },
                            latitude: { type: Types.Number },
                            longitude: { type: Types.Number },
                        },
                        zone: { type: String }
                    }]
            },
            location: {
                fulladdress: { type: String, index: true },
                city: { type: String, index: true },
                stateorprovince: { type: String },
                cp: { type: String },
                country: { type: String, index: true },
                countrycode: { type: String, index: true },
                continent: { type: String },
                latitude: { type: Types.Number },
                longitude: { type: Types.Number },
            }
        }
    });
    
    DMC.schema.add({
        additionalinfo:
        {
            description: { type: String },
            description_es: { type: String },
            recomenders: {
                type: [{
                        name: { type: String },
                        url: { type: String }
                    }]
            },
            tripadvisorurl: { type: String },
            associations: {
                type: [{
                        name: { type: String },
                        imageurl: { type: String },
                        image: {
                            public_id: { type: String },
                            version: { type: Types.Number },
                            signature: { type: String },
                            format: { type: String },
                            resource_type: { type: String },
                            url: { type: String },
                            width: { type: Types.Number },
                            height: { type: Types.Number },
                            secure_url: { type: String }
                        }
                    }]
            },
            registration: {
                url: { type: String }
            },
            insurancepolicy: {
                url: { type: String }
            },
            businessLicencense: { type: Types.Boolean },
            notpunished: { type: Types.Boolean },
            paymenttaxes: { type: Types.Boolean }
        }
    });
    
    DMC.schema.add({
        tourEscorts: {
            type: [
                {
                    fullname: { type: String },
                    biography: { type: String },
                    biography_es: { type: String },
                    imageUrl: { type: String },
                    image: {
                        public_id: { type: String },
                        version: { type: Types.Number },
                        signature: { type: String },
                        format: { type: String },
                        resource_type: { type: String },
                        url: { type: String },
                        width: { type: Types.Number },
                        height: { type: Types.Number },
                        secure_url: { type: String }
                    },
                    languages: {
                        type: [{
                                label: { type: String },
                                value: { type: String }
                            }]
                    }
                }
            ]
        }
    });
    
    DMC.schema.add({
        tags: {
            type: [{
                    value: { type: String },
                    label: { type: String },
                    label_en: { type: String },
                    slug: { type: String, index: true }
                }]
        }
    });
    
    DMC.schema.add({
        expenditure: {
            type: [{
                    label: { type: String },
                    months: {
                        type: [{
                                label: { type: String },
                                value: { type: Types.Number }
                            }]
                    }
                }]
        }
    });

    DMC.schema.pre('init', function (next, dmc, query) {
        dmc.name = dmc != null && dmc.company != null && dmc.company.name != '' ? dmc.company.name : dmc.name;
        setImmediate(function () { next(); });
    });

    DMC.schema.pre('save', function (next) {
        var _ = require('underscore');
        this.status = 'waiting';
        this.status = this.membership != null && this.membership.registervalid == true ? 'confirmed' : this.status;
        this.status = this.membership != null && this.membership.registervalid &&
            this.membership.publicprofilecomplete &&
            this.membership.companyimagescomplete &&
            this.membership.companycomplete &&
            this.membership.paymentcomplete &&
            this.membership.companytaxid &&
            this.membership.emergencycomplete ? 'valid' : this.status;
        next();
    });
    
    DMC.schema.virtual('content.full').get(function () {
        return this.code || '';
    });
    
    /** 
        Relationships
        =============
    */
    DMC.relationship({ ref: 'DMCProducts', path: 'dmc' });

    DMC.addPattern('standard meta');
    DMC.defaultColumns = 'code, slug, name, phone|20%, weburl|20%, email';
    DMC.register(dbname);
}