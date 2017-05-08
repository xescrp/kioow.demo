    module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Mail = new yourttoocore.List('Mails', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true }
    });
    
    Mail.add({
        code: { type: String, index: true },
        title: { type: String, required: true },
        slug: { type: String, index: true },
        from: { type: Types.Email, index: true },
        to: { type: String, index: true },
        subject: { type: String },
        text: { type: String },
        html: { type: Types.Html, wysiwyg: true, height: 250 },
        date: { type: Types.Date },
        type: { type: String },
        state: { type: String },
        hevent: { type: Types.Relationship, initial: true, ref: 'Hevents', index: true }
    });

    Mail.schema.add({
        mailmessage: {

        }
    });

    Mail.schema.add({
        serverresponse: {

        }
    });
    
    Mail.schema.add({
        tags: {
            type: [{
                    title: { type: String },
                    publishedDate: { type: Types.Date },
                    description: { type: String }
                }]
        }
    });
    
    
    Mail.schema.virtual('to.full').get(function () {
        return this.to.split(';');
    });
    
    
    Mail.addPattern('standard meta');
    Mail.defaultColumns = 'title, slug, type, publishedDate|20%, subject|20%, date';
    Mail.register(dbname);
}