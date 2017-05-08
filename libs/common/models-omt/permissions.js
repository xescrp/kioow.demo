module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    var Permission = new yourttoocore.List('Permissions', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true }
    });
    
    Permission.add({
        title: { type: String, required: true },
        slug: { type: String, index: true },
        publishedDate: { type: Types.Date, index: true },
        description: { type: Types.Html, wysiwyg: true, height: 250 }
    });
    
    Permission.relationship({ ref: 'Roles', path: 'permissions' });
    
    Permission.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    /** 
        Relationships
        =============
    */

    Permission.addPattern('standard meta');
    Permission.defaultColumns = 'title, slug|20%, publishedDate|20%, description|20%';
    Permission.register(dbname);
}