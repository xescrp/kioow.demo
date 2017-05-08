module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Invoice = new yourttoocore.List('Invoices', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'name', unique: true }
    });
    
    Invoice.add({
        name: { type: String, required: true, index: true },
        slug: { type: String, index: true },
        code: { type: String, index: true },
        date: { type: Types.Date, index: true },
        invoicenumber: { type: String, index: true },
        target: { type: String, index: true }, //provider, agency, traveler, travelersense 
        source: { type: String, index: true }, //provider, agency, traveler, travelersense
        file: {
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
        city : { type: String },
        cp : { type: String },
        idnumber : { type: String },
        taxinvoice: { type: Types.Number },
        amount: { type: Types.Number },
        address : { type: String },
        country : {
            name_es: { type: String },
            name: { type: String },
            countrycode: { type: String }
        },
        booking: { type: Types.Relationship, initial: true, ref: 'Bookings2', index: true }
    });
    
    
    
    Invoice.addPattern('standard meta');
    Invoice.defaultColumns = 'name, slug, code, date, invoicenumber';
    Invoice.register(dbname);
}