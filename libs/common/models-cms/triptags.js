module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var schema = new yourttoocore.List('TripTags', { any: yourttoocore.mongoose.Types.Mixed });
    schema.add({
        categories: { type: Types.Relationship, ref: 'TripTagsCategory' }
    });
    schema.register(dbname);
}

