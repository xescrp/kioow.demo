module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Booking = new yourttoocore.List('Bookings', {
        map: { name: 'idBooking' },
        autokey: { path: 'slug', from: 'idBooking', unique: true }
    });
    
    Booking.add({
    idBooking: { type: String, required: true, index:true },
    slug: { type: String, index: true },
    idBookingExt: { type: String },
    comission: { type: Types.Number },//comision b2c del DMC
    iva: { type: Types.Number },    
    //fecha de inicio de la reserva
    start: {
    	year: { type: Types.Number, index: true },//YYYY Date.getFullYear()
    	month: { type: Types.Number, index: true }, // 0-11  Date.getMonth()
    	monthname_es : { type: String},
    	monthname_en : { type: String},
    	day: {type: Types.Number, index: true }//1-31 Date.getDate()
    },    
    startdate : { type: Types.Date, index: true },
    startdateindexing : { type: String, index: true },
  //fecha de fin de la resrva    
    end: {
    	year: { type: Types.Number, index: true },//YYYY
    	month: { type: Types.Number, index: true }, // 0-11
    	monthname_es : { type: String},
    	monthname_en : { type: String},
    	day: {type: Types.Number, index: true }//1-31
    },
    enddate : { type: Types.Date, index: true },
    enddateindexing : { type: String, index: true },
    createdonindexing: { type: String, index: true },
    holderindexing : { type: String, index: true },
    destinationindexing: { type: String, index: true },
    destinationindexinges: { type: String, index: true },
    productDmc: { type: Types.Relationship, initial: true, ref: 'DMCProducts' },//referencia al product (NO USAR)
    product: { type: String },//este sera un string que contenga el productDMC tal cual en el momento de la reserva
    dmc : { type: Types.Relationship, initial: true, ref: 'DMCs', index:true },//referencia al dmc
    dmcindexing : { type: String, index: true },
    traveler: { type: Types.Relationship, initial: true, ref: 'Travelers', index:true }, //referencia al traveler
    affiliate: { type: Types.Relationship, initial: true, ref: 'Affiliate', index: true }, //referencia al afiliado
    affiliateindexing: { type: String, index: true },
    flights: { type: Types.Relationship, ref: 'Flights', index: true }, //referencia a los vuelos
    createDate: { type: Types.Date , index:true},
    cancelDate: { type: Types.Date , index:true },
    lastModifiedDate: { type: Types.Date },
    isGroup: { type: Types.Boolean },//indica si es una resreva tailormade de grupos
    isB2C: { type: Types.Boolean },
    b2bcommission: { type: Types.Number }, //es la comision b2b del dmc
    omtmargin: { type: Types.Number }, // es lo que OMT le puso como margen a ese afiliado
    fees: {
        unique: { type: Types.Number, index: true },
        groups: { type: Types.Number, index: true },
        tailormade: { type: Types.Number, index: true },
        flights: { type: Types.Number, index: true }
    },
    invoice: { type: String , index:true },    
    invoiceDate: { type: Types.Date },
    invoiceProvider: { type: String , index:true}, //factura del proveedor
    invoiceProviderDate: { type: Types.Date }, // fecha en la que se recibe la factura del proveedor    
    invoiceProviderFile: {type: String  }, // nombre del fichero de proveedor
    invoiceAffiliate: { type: String , index:true}, //numero de factura del affiliado
    invoiceAffiliateDate: { type: Types.Date }, // fecha en la que se crea la factura del affiliado    
    invoiceAffiliateFile: {type: String  }, // ruta a la factura del afiliado
    finalDatePaymentAffiliate : { type: Types.Date }, // es la fecha tope para que el afiliado pague a omt la booking
    
    voucherFile: { type: String  }, // ruta al bono descargado, si no lo ha descargado, estara vacio
    status: { type: String , index: true },
    meetingdata : { type: String }, 
    queryCode: { type: String },// si la reserva es de un tailormade debe almacenar el codigo de la query
    quoteCode: { type: String },//si la reserva es de un tailormade debe almacenar el codigo de la quote
    budgetCode: { type: String },//si la reserva es de un presupuesto debe almacenar el codigo del presupuesto
    budget : { type: Types.Boolean },// presupuesto si fuera presupuesto
    timeZone: {
        label: { type: String },
        useDaylightTime: { type: String },
        value: { type: String }
    },
    discount: {
        label: { type: String },
        value: { type: Types.Number },// %
        code: { type: String }
    },
    lastVisitUser: { type: Types.Date, index:true }, //ultima visualizacion de la reserva por parte del usuario
    lastVisitDMC: { type: Types.Date, index:true},//ultima visualizacion de la reserva por parte del DMC
    lastVisitOMT: { type: Types.Date, index:true },//ultima visualizacion de la reserva por parte de OMT,
});

//historico de estados y mail enviado
Booking.schema.add({
	historic: {
    	type:[{
    		date: { type: Types.Date, index:true }, //fecha en que paso a ese estado
	    	state: { type: String, index:true }, //estado
	    	user: { type: String , index:true}, //usuario que inicio el cambio de estado
	    	mailSend: {               //mail enviados
	            type: [{
	                name: { type: String, index:true }, //nombre del mail (nombe del template en mailer.js)
	                date: { type: Types.Date, index:true } //fecha en que se envio el mail	                
	            }]
	        }	    		
    	}]
    }
});



//observaciones para el traveler, el dmc y omt/yto del affiliado
Booking.schema.add({
	observations: {
    	type:{
    		label_es: { type: String} , //texto en espanol (lo vera el traveler)
	    	label_en: { type: String } //mismo texto en ingles, lo vera el dmc	    		       
    	}
    },
    affiliateobservations : { type: String }, // observaciones del afiliado a yto/omt
    affiliateuser : { type: String } // usuario que firma la reserva
});

// politicas de cancelacion
Booking.schema.add({
	cancelpolicy:  {
		_es: { type: String },
	    _en: { type: String }
	}
});



//comentarios sobre las ediciones
Booking.schema.add({
	comments: {
    	type:[{
    		date: { type: Types.Date , index:true }, //fecha del comentario de la edicion
	    	text: { type: String }, //cometnario
	    	user: { type: String , index:true }, //usuario que hizo la modificacion
	    	type: { type: String } //si es affiliate, indica que es de affilido, vacio indica que es de omt
    	}]
    }
});

//pvpAffiliate pvp del afiliado final
Booking.schema.add({
	pvpAffiliate: {
    	// importe en la divisa del dmc
        value : { type: Types.Number, index: true }, 
        currency: {
            label: { type: String },
            symbol: { type: String },
            value: { type: String }
        }, 
        // valor en euros
        exchange: { 
            value : { type: Types.Number, index: true }, 
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            }
        }
    }
});


//amount en formato importes con divisa
Booking.schema.add({
	amount: {
    	// importe en la divisa del dmc
        value : { type: Types.Number, index: true }, 
        currency: {
            label: { type: String },
            symbol: { type: String },
            value: { type: String }
        }, 
        // valor en euros
        exchange: { 
            value : { type: Types.Number, index: true }, 
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            }
        }
    }
});


//total de los vuelos
Booking.schema.add({
	amountflights: {
  	// importe en la divisa del dmc
      value : { type: Types.Number, index: true }, 
      currency: {
          label: { type: String },
          symbol: { type: String },
          value: { type: String }
      }, 
      // valor en euros
      exchange: { 
          value : { type: Types.Number, index: true }, 
          currency: {
              label: { type: String },
              symbol: { type: String },
              value: { type: String }
          }
      }
  }
});


//netPrice en formato importes con divisa
Booking.schema.add({
	netPrice: {
    	// importe en la divisa del dmc
        value : { type: Types.Number, index: true }, 
        currency: {
            label: { type: String },
            symbol: { type: String },
            value: { type: String }
        }, 
        // valor en euros
        exchange: { 
            value : { type: Types.Number, index: true }, 
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            }
        }
    }
});


//datos de informacion para enviar la factura al cliente
Booking.schema.add({
	userinvoicedata:{
		wantinvoice : { type: Types.Boolean },
		invoicevalidate : { type: Types.Boolean },
		name : {type: String},
		city : {type: String},
		cp : {type: String},
		idnumber : {type: String},
		invoicenumber : {type: String},
		taxinvoice : { type: Types.Number},
		address : {type: String},
		invoicedate: { type: Types.Date },
		country : {	                	 
	        name_es: { type: String },
	        name: { type: String },
	        countrycode: { type: String }	                      
	   },
	   invoiceFile: {type: String  } // ruta del fichero de la factura
	}
});

//distribucion de paxes
Booking.schema.add({
    roomDistribution: {
    	type:[{
	    	roomCode: { type: String }, //single, double, triple
	    	pricePerPax: {
            	// importe en la divisa del dmc
                value : { type: Types.Number, index: true }, 
                currency: {
                    label: { type: String },
                    symbol: { type: String },
                    value: { type: String }
                }, 
                // valor en euros
                exchange: { 
                    value : { type: Types.Number, index: true }, 
                    currency: {
                        label: { type: String },
                        symbol: { type: String },
                        value: { type: String }
                    } 
                }
            },
            pvpAffiliatePerPax: {
            	// importe en la divisa del dmc
                value : { type: Types.Number, index: true }, 
                currency: {
                    label: { type: String },
                    symbol: { type: String },
                    value: { type: String }
                }, 
                // valor en euros
                exchange: { 
                    value : { type: Types.Number, index: true }, 
                    currency: {
                        label: { type: String },
                        symbol: { type: String },
                        value: { type: String }
                    } 
                }
            },
	    	quantityPax: { type: Types.Number },//1 single, 2 double, 3 triple
	    	slug: { type: String }, //room.typeRoom.roomCode + room.numRoom
	    	paxList: {
	            type: [{
	                name: { type: String },
	                lastName: { type: String },
	                title: { type: String },
	                typePax: {type: String }, //adult,child,baby NO SE USA
	                birdthDate: { type: Types.Date },
	                country: {	                	 
	                     name_es: { type: String },
	                     name: { type: String },
	                     countrycode: { type: String },
	                     countryiso3: { type: String }
	                },
	                documentNumber: { type: String },
	                documentType: { type: String },
	                documentExpirationDate: { type: Types.Date },//fecha de expiracion del contenido para vuelos
	                documentExpeditionCountry: {	// pais de expecicion del documento para vueloes                	 
	                     name_es: { type: String },
	                     name: { type: String },
	                     countrycode: { type: String },
	                     countryiso3: { type: String }	                     
	                },
	                holder: { type: Types.Boolean }//si es titular
	            }]
	        }
    	}]
    }
});



// pagos del cliente
Booking.schema.add({
    payStatus: {
        type: [{
        	code : { type: String , index: true },//codigo
            payment: { type: Types.Number }, //25-75-100 (% del pago)
            paymentMethod: { type: String },// transfer, tpv, trustly, paypal
            receiptNumber:{ type: String },//numero de recibo si se ha emitodo un recibo            
            date: { type: Types.Date }, //fecha en la que se hizo el pago por parte del cliente
            validateDate: { type: Types.Date },  //(solo para transferencias) fecha de validacion por parte de omt . Si esta vacio, el cobro no esta validado
            nextPaymentDate: { type: Types.Date },//si el pago no es el 100% debera tener la fecha tope de pago del segundo plazo
            amount: {
            	// importe en la divisa del dmc
                value : { type: Types.Number, index: true }, 
                currency: {
                    label: { type: String },
                    symbol: { type: String },
                    value: { type: String }
                }, 
                // valor en euros
                exchange: { 
                    value : { type: Types.Number, index: true }, 
                    currency: {
                        label: { type: String },
                        symbol: { type: String },
                        value: { type: String }
                    } 
                }
            }
        }]
    }
});



// pagos al proveedor
Booking.schema.add({
    payProvider: {
        type: [{
        	code : { type: String },//codigo           
            payableDate: { type: Types.Date }, //fecha programada para efectuar el pago al proveedor
            date: { type: Types.Date }, //fecha en la que se realizo el pago
            transferId : { type: String }, //numero de transferencia o ducmento
          
            amount: {  //import payed to provider
            	// importe en la divisa del dmc
                value : { type: Types.Number }, 
                currency: {
                    label: { type: String },
                    symbol: { type: String },
                    value: { type: String }
                }, 
                // valor en euros
                exchange: { 
                    value : { type: Types.Number }, 
                    currency: {
                        label: { type: String },
                        symbol: { type: String },
                        value: { type: String }
                    }
                }
            }
        }]
    }
});



//informacion de los asientos generados
Booking.schema.add({
	accountingEntries: {
        type: [{
            typeEntry: { type: String }, //Tipo de apunte asientoCobro, asientoReserva
            date: { type: Types.Date }, // fecha de generacion
            entryData: { type: String }, //asiento generado, lo alamacenamos para consulta
            isFinal: { type: Types.Boolean }, //si es valido, es decir si se cancela este apunte, se anula y aqui se pone false
          
            // payStatusCode : { type: String }//codigo del pago asociado a este asiento (si lo tiene, si es asiento de reserva este codigo estara vacio)            
            //pago concreto asociado de la lista de pagos que hay en paystatus
            payStatus: {
            	code : { type: String},
            	payment: { type: Types.Number}, //25-75-100% del pago            
	            receiptNumber:{ type: String},//numero de recibo si se ha emitodo un recibo
	            date: { type: Types.Date}
	        }
        }]
    }
});

Booking.schema.pre('save', function (next) {
    
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        var _ = require('underscore');
        var dS = new Date();
        var eS = new Date();
        //start...
        dS.setDate(this.start.day);
        dS.setMonth(this.start.month);
        dS.setYear(this.start.year);
        dS.setHours(0);
        dS.setMinutes(0);
        dS.setSeconds(0);
        dS.setMilliseconds(0);
        var indexingDS = pad(pad(this.start.year, 4) + pad(this.start.month, 2) + pad(this.start.day, 2), 10) + '.' + pad(this.idBooking, 10);
        //end
        eS.setDate(this.end.day);
        eS.setMonth(this.end.month);
        eS.setYear(this.end.year);
        eS.setHours(23);
        eS.setMinutes(59);
        eS.setSeconds(59);
        eS.setMilliseconds(999);
        var indexingES = pad(pad(this.end.year, 4) + pad(this.end.month, 2) + pad(this.end.day, 2), 10) + '.' + pad(this.idBooking, 10);
        //update...
        this.startdate = dS;
        this.enddate = eS;
        this.startdateindexing = indexingDS;
        this.enddateindexing = indexingES;
        this.createdonindexing = pad(
            pad(this.createdOn.getFullYear(), 4) + 
            pad(this.createdOn.getMonth(), 2) + 
            pad(this.createdOn.getDate(), 2) + 
            pad(this.createdOn.getHours(), 2) + 
            pad(this.createdOn.getMinutes(), 2), 10) + 
            '.' + pad(this.idBooking, 10);
        var pax = '';
        var roompax = (this.roomDistribution != null && this.roomDistribution.length > 0) ? 
            this.roomDistribution[0].paxList[0] : { lastName : '', name: '' };
        var prevpax = [roompax.lastName.toLowerCase(), roompax.name.toLowerCase()].join('.');
        pax = [prevpax, pad(this.idBooking, 10)].join('.');
        this.holderindexing = pax;

        if (this.affiliate != null && this.affiliate.company != null) {
            var cname = this.affiliate.company.name || 'ZZZZZZZZZZ';
            this.affiliateindexing = [cname.toLowerCase(), pad(this.idBooking, 10)].join('.');
        }
        else {
            this.affiliateindexing = ['ZZZZZZZZZZ', pad(this.idBooking, 10)].join('.');
        }

        if (this.dmc != null) {
            var cname = this.dmc.name || 'ZZZZZZZZZZ';
            this.dmcindexing = [cname.toLowerCase(), pad(this.idBooking, 10)].join('.');
        }
        else {
            this.dmcindexing = ['ZZZZZZZZZZ', pad(this.idBooking, 10)].join('.');
        }

        var ccountries = null;
        var ccs = [];
        //
        var self = this;
        var ctsen = [];
        var prd = (this.product != null) ? JSON.parse(this.product) : null;
        
        if (prd != null && prd.itinerary != null && prd.itinerary.length > 0) {
            
            var sleeps = _.map(prd.itinerary, function (day) {
                return day.sleepcity;
            });
            
            ccountries = _.map(sleeps, function (city) {
                var country = (city != null && city.country != null && city.country != '') ? city.country : ''; 
                (country != null && city.location != null && city.location.countrycode != null && city.location.countrycode != '') ? ccs.push(city.location.countrycode.toLowerCase()) : null; 
                return country.toLowerCase();
            });
            ccountries = _.filter(ccountries, function(it){ return it != ''; });
            ccountries = _.uniq(ccountries);
            var previndex = (ccountries != null && ccountries.length > 0) ? ccountries.sort().join('.') : 'ZZZZZZZZZZ';
            this.destinationindexing = [previndex, pad(this.idBooking, 10)].join('.');
            
            yourttoocore.list('DestinationCountries').model.find({ slug : {$in : ccs}})
            .exec(function (err, docs) {
                _.each(docs, function(item){
                    (item.label_es != null)? ctsen.push(item.label_es.toLowerCase().trim()): null;
                });
                var ctsenflat = ctsen.sort().join('.');
                self.destinationindexinges = [ctsenflat, pad(self.idBooking, 10)].join('.');
                next();
            }); 
        }

        
        //next();
});

Booking.addPattern('standard meta');
Booking.defaultColumns = 'idBooking, amount, iva, comission, createDate';
    Booking.register(dbname);
}