module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var OMTAdminRequests = new yourttoocore.List('OMTAdminRequests', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true }
    });
    
    OMTAdminRequests.add({
        title: { type: String, required: true },
        slug: { type: String, index: true },
        from: { type: String, index: true },
        to: { type: String, index: true },
        subject: { type: String },
        text: { type: String },
        html: { type: Types.Html, wysiwyg: true, height: 250 },
        date: { type: Types.Date },
        type: { type: String },
        key: { type: String }
    });
    
    
    OMTAdminRequests.schema.add({
        tags: {
            type: [{
                    title: { type: String },
                    publishedDate: { type: Types.Date },
                    description: { type: String }
                }]
        }
    });
    
    
    OMTAdminRequests.schema.virtual('to.full').get(function () {
        return this.to.split(';');
    });
    
    
    OMTAdminRequests.addPattern('standard meta');
    OMTAdminRequests.defaultColumns = 'title, slug, type, publishedDate|20%, subject|20%, date';
    OMTAdminRequests.register(dbname);
}