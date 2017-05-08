module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Sequence = new yourttoocore.List('Sequences', {
        map: { name: 'name' },
        autokey: { path: 'slug', from: 'name', unique: true }
    });
    
    Sequence.add({
        name: { type: String, required: true },
        slug: { type: String, index: true },
        publishedDate: { type: Types.Date, index: true },
        mainindex: { type: Types.Number },
        productindex: { type: Types.Number },
        queryindex: { type: Types.Number },
        bookingindex: { type: Types.Number }
    });
    
    
    Sequence.schema.virtual('content.display').get(function () {
        return this.name + ' - ' + this.mainindex || '';
    });
    
    
    Sequence.addPattern('standard meta');
    Sequence.defaultColumns = 'name, slug|20%, publishedDate|20%, mainindex|20%';
    Sequence.register(dbname);
}