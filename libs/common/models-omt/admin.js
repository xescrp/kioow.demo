module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Admin = new yourttoocore.List('OMTAdmin', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true }
    });
    
    Admin.add({
        code: { type: String, required: true },
        name: { type: String, required: true },
        slug: { type: String, index: true },
        email: { type: Types.Email, index: true },
        skype: { type: String },
        location: {
            fulladdress: { type: String },
            city: { type: String },
            stateorprovince: { type: String },
            cp: { type: String, index: true },
            country: { type: String },
            countrycode: { type: String },
            continent: { type: String },
            latitude: { type: Types.Number },
            longitude: { type: Types.Number },
        },
        description: { type: Types.Html, wysiwyg: true, height: 250 },
        membershipDate: { type: Types.Date },
        images:
        {
            photo: { type: Types.CloudinaryImage, collapse: true },
            logo: { type: Types.CloudinaryImage, collapse: true },
            splash: { type: Types.CloudinaryImage, collapse: true }
        },
        user: { type: Types.Relationship, initial: true, ref: 'Users' }
    });
    
    Admin.schema.virtual('name.full').get(function () {
        return this.name.full || '';
    });
    
    /** 
        Relationships
        =============
    */

    Admin.addPattern('standard meta');
    Admin.defaultColumns = 'code, slug, name, email';
    Admin.register(dbname);
}