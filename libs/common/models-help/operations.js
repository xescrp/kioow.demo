module.exports = function (yourttoocore, dbname) {
    Types = yourttoocore.Field.Types;
    
    var Memento = new yourttoocore.List('Mementos', {
        map: { name: 'key' }
    });
    Memento.add({
        key: { type: String, index: true },
        item: { type: String },    
        date: { type: Types.Date, index: true }
    });

    Memento.addPattern('standard meta');
    Memento.defaultColumns = 'key, date';
    Memento.register(dbname);
}

