module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var CountriesZones = new yourttoocore.List('DestinationCountriesZones', {
        map: { name: 'label_es' },
        autokey: { from: 'slug', path: 'key' },
        sortable : true
    });
    
    CountriesZones.add({
        label_es: { type: String, initial: true },
        label_en: { type: String, initial: true },
        slug: { type: String, required: true, initial: true },
        promotionArea : { type: Boolean },
        promotionOrder: { type: Types.Number },
        title_es: { type: String, initial: true },
        title_en: { type: String, initial: true },
        mainImage: { type: Types.CloudinaryImage },
        captionImage: { type: String },
        iconImage: { type: Types.CloudinaryImage },
        colorBg: { type: String },
        updatedOnUser: { type: String }
    });
    
    CountriesZones.relationship({ ref: 'DestinationCountries', path: 'zone' });
    CountriesZones.defaultColumns = 'label_es, label_en, slug|20%';
    CountriesZones.register(dbname);
}

