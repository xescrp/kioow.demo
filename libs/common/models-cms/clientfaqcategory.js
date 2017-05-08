module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var schema = new yourttoocore.List('Client FAQ Category', { any: yourttoocore.mongoose.Types.Mixed });
    schema.register(dbname);
}

