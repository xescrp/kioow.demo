
module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var schema = new yourttoocore.List('Promotion', { any: yourttoocore.mongoose.Types.Mixed });
    schema.add({
        finishAt: { type: Types.Date, index: true }
    });
    schema.register(dbname);
}

