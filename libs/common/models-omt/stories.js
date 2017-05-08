module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var schema = new yourttoocore.List('Stories', { any: yourttoocore.mongoose.Types.Mixed });
    
    schema.add({
        code: { type: String, index: true },
        modelrelated: { type: String, index: true },
        storytype: { type: String, index: true }, //historic, comment, 
        parentid: { type: String, index: true },
        date: { type: Types.Date, index: true },
        user: { type: String, index: true },
        usertype: { type: String, index: true }
    });

    schema.schema.add(
        { story: { } }
    );

    //schema.schema.pre('save', function (next) {
    //    //var self = this;
    //    //this.modelrelated != null && this.modelrelated != '' ?
    //    //    setImmediate(function () {
    //    //        yourttoocore.list(self.modelrelated).model.find({ _id: self.parentid })
    //    //            .exec(function (err, docs) {
    //    //                if (docs != null && docs.length > 0) {
    //    //                    var model = docs[0];
    //    //                    model.stories.push(self);
    //    //                    model.save(function (err, doc) {
    //    //                        next();
    //    //                    });
    //    //                } else { next(); } 
    //    //            });
    //    //    }) : setImmediate(function () {
    //    //        next();
    //    //    });
    //});

    schema.addPattern('standard meta');
    schema.defaultColumns = 'code, date, modelrelated, storytype';
    schema.register(dbname);
}


