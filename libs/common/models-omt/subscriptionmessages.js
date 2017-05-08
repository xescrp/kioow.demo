
module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var SubscriptionMessages = new yourttoocore.List('SubscriptionMessages', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true }
    });
    
    SubscriptionMessages.add({
        code: { type: String, index: true },
        slug: { type: String, index: true },
        subject: { type: String, index: true },
        action: { type: String, index: true },
        lasterrordate: { type: Types.Date, index: true },
        commitdate: { type: Types.Date, index: true },
        createdonindexing: { type: String, index: true },
        subscribertaskdone: { type: Types.Boolean },
        state: { type: String, index: true },
        heventcode: { type: String, index: true }
    });
    
    SubscriptionMessages.schema.add({
        subscriberslist: {
            type: [{ name: { type: String } }]
        }
    });

    SubscriptionMessages.schema.add({
        errorslist: {
            
        }
    });
    
    SubscriptionMessages.schema.add({
        lastparams: {  }
    });
    
    SubscriptionMessages.schema.add({
        lastresults: {  }
    });
    
    SubscriptionMessages.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    SubscriptionMessages.schema.pre('save', function (next) {
        
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        
        
        this.createdonindexing = pad(
            pad(this.createdOn.getFullYear(), 4) + 
        pad(this.createdOn.getMonth(), 2) + 
        pad(this.createdOn.getDate(), 2) + 
        pad(this.createdOn.getHours(), 2) + 
        pad(this.createdOn.getMinutes(), 2), 10) + 
        '.' + pad(this.code, 20);
        next();
    });
    
    SubscriptionMessages.addPattern('standard meta');
    SubscriptionMessages.defaultColumns = 'title, slug, publishedDate|20%, description|20%';
    SubscriptionMessages.register(dbname);

}