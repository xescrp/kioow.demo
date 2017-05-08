module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Payment = new yourttoocore.List('Payments', {
        map: { name: 'code' },
        autokey: { path: 'slug', from: 'code', unique: true }
    });

    Payment.add({
        code: { type: String, index: true },
        action: { type: String, index: true },
        payment: { type: Types.Number },  //25-75-100 (% del pago)
        paymentmethod: { type: String }, // transfer, tpv, trustly, paypal
        paymenttarget: { type: String }, //travelersense: payment from client; provider: payment for provider
        receiptnumber: { type: String },//numero de recibo si se ha emitodo un recibo,          
        transferid : { type: String }, //numero de transferencia o ducmento  
        date: { type: Types.Date },   //fecha en la que se hizo el pago por parte del cliente
        validatedate: { type: Types.Date },  //(solo para transferencias) fecha de validacion por parte de omt . Si esta vacio, el cobro no esta validado
        nextpaymentdate: { type: Types.Date },
        payabledate: { type: Types.Date }, //fecha programada para efectuar el pago al proveedor
        amount: { type: Types.Number },
        currency: {
            label: { type: String },
            symbol: { type: String },
            value: { type: String }
        },
        booking: { type: Types.Relationship, initial: true, ref: 'Bookings2', index: true }, 
    });

    Payment.addPattern('standard meta');
    Payment.defaultColumns = 'code, amount, date, payment, paymentTarget';
    Payment.register(dbname);

}