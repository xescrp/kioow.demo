module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var Countries = new yourttoocore.List('DestinationCountries', {
        map: { name: 'label_es' },
        nodelete : true,
        autokey: { path: 'slug', from: 'slug', unique: true }
    });

    Countries.add({
        label_es: { type: String, required: true, initial: true },
        label_en: { type: String, required: true, initial: true },
        slug: { type: String, index: true, initial: true },
        key_es: { type: String },
        key_en: { type: String },
        location: {
            country: { type: String }, 
            name: { type: String }, 
            number: { type: String }, 
            postcode: { type: String }, 
            state: { type: String }, 
            street1 : { type: String }, 
            street2: { type: String }, 
            suburb: { type: String },
            latitude: { type: Types.Number },
            longitude: { type: Types.Number }
        },
        zone: { type: Types.Relationship, ref: 'DestinationCountriesZones', initial: true },
        title_es: { type: String,  initial: true },
        title_en: { type: String, initial: true },
        mainImage: { type: Types.CloudinaryImage },
        captionImage: { type: String },
        description_es: { type: String },
        description_en: { type: String },
        averageEuro: { type: Types.Number },
        state: { type: String, index: true },
        publishedDate: { type: Types.Date, index: true },
        titleSEO_es : { type: String },
        metaDescription_es : { type: Types.Textarea },
        descriptionGooglePlus_es : { type: String },
        descriptionFacebook_es : { type: String },
        titleSEO_en : { type: String },
        metaDescription_en: { type: String },
        descriptionGooglePlus_en : { type: String },
        descriptionFacebook_en : { type: String },
        imageFacebook: { type: Types.CloudinaryImage },
        updatedOnUser: { type: String }
    });

    Countries.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    Countries.defaultColumns = 'slug, label_es|20%, label_en|20%, title_es|25%, title_en|25%';
    Countries.register(dbname);
}

