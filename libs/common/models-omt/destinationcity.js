module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var Cities = new yourttoocore.List('DestinationCities', {
        map: { name: 'label_es' },
        nodelete : true,
        autokey: { path: 'slug', from: 'slug', unique: true }
    });
    
    Cities.add({
        label_es: { type: String, initial: true },
        label_en: { type: String, index: true, initial: true },
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
        country: { type: Types.Relationship, ref: 'DestinationCountries', initial: true },
        countrycode: { type: String, index: true },
        title_es: { type: String },
        title_en: { type: String },
        mainImage: { type: Types.CloudinaryImage },
        captionImage: { type: String },
        description_es: { type: String },
        description_en: { type: String },
        state: { type: String, index: true },
        publishedDate: { type: Types.Date, index: true },
        titleSEO_es : { type: String },
        metaDescription_es : { type: String },
        descriptionGooglePlus_es : { type: String },
        descriptionFacebook_es : { type: String },
        titleSEO_en : { type: String },
        metaDescription_en: { type: String },
        descriptionGooglePlus_en : { type: String },
        descriptionFacebook_en : { type: String },
        imageFacebook: { type: Types.CloudinaryImage },
        updatedOnUser: { type: String }
    });

    Cities.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    Cities.schema.index({ label_es: 'text', label_en: 'text' });
    Cities.defaultColumns = 'label_en|20%, label_es|20%, slug, country|20%, countrycode|20%';
    Cities.register(dbname);
}


