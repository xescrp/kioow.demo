module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Traveler = new yourttoocore.List('Travelers', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true }
    });
    
    Traveler.add({
        code: { type: String, required: true },
        firstname: { type: String },
        lastname: { type: String },
        slug: { type: String, index: true },
        phone: { type: String },
        email: { type: Types.Email, index: true },
        skype: { type: String, index: true },
        sendmenews: { type: Types.Boolean },
        dateofbirth: { type: Types.Date },
        location: {
            fulladdress: { type: String, index: true },
            city: { type: String, index: true },
            stateorprovince: { type: String, index: true },
            cp: { type: String, index: true },
            country: { type: String, index: true },
            countrycode: { type: String, index: true },
            continent: { type: String, index: true },
            latitude: { type: Types.Number, index: true },
            longitude: { type: Types.Number, index: true },
        },
        cif: { type: String, index: true },
        nif: { type: String, index: true },
        accountingnumber: { type: String },//numero de cuenta para contabilidad
        description: { type: Types.Html, wysiwyg: true, height: 250 },
        membershipDate: { type: Types.Date, index: true },
        images:
        {
            photo: { type: Types.CloudinaryImage, collapse: true },
            logo: { type: Types.CloudinaryImage, collapse: true },
            splash: { type: Types.CloudinaryImage, collapse: true }
        },
        user: { type: Types.Relationship, initial: true, ref: 'Users' },
        //queries: { type: Types.Relationship, ref: 'UserQueries', many: true, index: true },
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
        }
    });
    
    Traveler.schema.virtual('name.full').get(function () {
        return this.name.full || '';
    });
    
    /** 
        Relationships
        =============
    */

    Traveler.addPattern('standard meta');
    Traveler.defaultColumns = 'code, slug, name, phone|20%, weburl|20%, email';
    Traveler.register(dbname);
}