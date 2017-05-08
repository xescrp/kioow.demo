module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Role = new yourttoocore.List('Roles', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true }
    });
    
    Role.add({
        title: { type: String, required: true },
        slug: { type: String, index: true },
        permissions: { type: Types.Relationship, ref: 'Permissions', many: true },
        publishedDate: { type: Types.Date, index: true },
        description: { type: Types.Html, wysiwyg: true, height: 250 }
    });
    
    Role.relationship({ ref: 'Users', path: 'roles' });
    
    Role.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    /** 
        Relationships
        =============
    */

    Role.addPattern('standard meta');
    Role.defaultColumns = 'title, slug, author, publishedDate|20%, description|20%, permissions';
    Role.register(dbname);
}