module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;

    var Internals = new yourttoocore.List('Internals', {
        map: { name: 'key' },
        autokey: { path: 'slug', from: 'key', unique: true }
    });

    Internals.add({
        key: { type: String, required: true, index: true },
        slug: { type: String, index: true }
    });

    Internals.schema.add({
        item: { }
    });

    Internals.schema.virtual('content.display').get(function () {
        return this.name + ' - ' + this.mainindex || '';
    });


    Internals.addPattern('standard meta');
    Internals.defaultColumns = 'key, slug|20%, createdOn|20%, updatedOn|20%';
    Internals.register(dbname);
}