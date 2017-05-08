
module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Hevent = new yourttoocore.List('Hevents', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true }
    });
    
    Hevent.add({
        code: { type: String, index: true },
        slug: { type: String, index: true },
        subject: { type: String, index: true },
        action: { type: String, index: true },
        delivereddate: { type: Types.Date, index: true },
        state: { type: String, index: true },
        createdonindexing: { type: String, index: true },
        subscribermessages: { type: Types.Relationship, ref: 'SubscriptionMessages', initial: true, index: true, many: true },
        subscriberids: { type: Types.Arraystring, index: true }
    });

    Hevent.schema.add({
        readers: []
    });

    Hevent.schema.add({
        subscriberids: {
            type: [{
                name: { type: String },
                date: { type: Types.Date }
            }]
        }
    })
    
    Hevent.schema.add({
        data: { type: [yourttoocore.mongoose.Types.Mixed] }
    });
    
    Hevent.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    Hevent.schema.pre('save', function (next) {
        
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }

        //update...
        this.createdonindexing = pad(
            pad(this.createdOn.getFullYear(), 4) + 
        pad(this.createdOn.getMonth(), 2) + 
        pad(this.createdOn.getDate(), 2) + 
        pad(this.createdOn.getHours(), 2) + 
        pad(this.createdOn.getMinutes(), 2), 10) + 
        '.' + pad(this.code, 20);
        next();
    });
    
    Hevent.addPattern('standard meta');
    Hevent.defaultColumns = 'title, action, createdOn|20%, subject|20%';
    Hevent.register(dbname);

}