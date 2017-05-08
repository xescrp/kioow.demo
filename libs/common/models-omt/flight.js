module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Flight = new yourttoocore.List('Flights', {
        map: { name: 'itinerary.token' },
        autokey: { path: 'slug', from: 'itinerary.token', unique: true },
        strict: false
    });
    
    Flight.add({
        itinerary: {
            itinerariesId: { type: Types.Arraystring, index: true },
            priceGroup: { type: Types.Number },
            token: { type: Types.Number, index: true},
            numAdult: { type: Types.Number },
            numChild: { type: Types.Number },
            numInfant: { type: Types.Number },
            price: { type: Types.Number },
            slug: { type: String, index: true }
        },
        locator: { type: String, index: true },// para servivuelo
        reference: { type: String, index: true },//para el usuario con el puede volar        
        idBooking: { type: String }//id de la booking asociada
    });
    
    Flight.schema.add({
        flight: { }
    });
    
    // booking de servivuelo
    Flight.schema.add({
        booking: { }
    });
    
    Flight.schema.virtual('to.semicolonstring').get(function () {
        return this.itinerary.itinerariesId.split(';');
    });
    
    Flight.schema.pre('save', function (next) {
        console.log(this);
        next();
    });
    
    Flight.addPattern('standard meta');
    Flight.defaultColumns = 'token, price';
    Flight.register(dbname);
}