﻿module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var schema = new yourttoocore.List('Files', { any: yourttoocore.mongoose.Types.Mixed });
    schema.register(dbname);
}

