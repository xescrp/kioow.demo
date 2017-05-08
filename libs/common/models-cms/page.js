
module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var schema = new yourttoocore.List('Page', { any: yourttoocore.mongoose.Types.Mixed });
    schema.add({
        categories: { type: Types.Relationship, ref: 'PageCategories' }
    });
    schema.register(dbname);
};
