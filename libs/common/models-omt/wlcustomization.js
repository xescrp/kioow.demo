module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var WLcustom = new yourttoocore.List('WLCustomizations', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true }
    });

    WLcustom.add({
        code: { type: String, required: true, index: true },
        name: { type: String, required: true, index: true },
        slug: { type: String, index: true },
        css: {
            brand_background: { type: String },
            brand_primary: { type: String },
            brand_alternate: { type: String },
            brand_info: { type: String },
            brand_warning: { type: String },
            brand_danger: { type: String }
        },
        web: {
            header: { type: String },
            footer: { type: String }
        }
    });

    WLcustom.addPattern('standard meta');
    WLcustom.defaultColumns = 'code, name, createdOn';
    WLcustom.register(dbname);
}