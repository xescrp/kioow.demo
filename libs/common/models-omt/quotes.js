module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Quote = new yourttoocore.List('Quotes', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title_es', unique: true }
    });
    
    Quote.add({
        title_en: { type: String },
        title_es: { type: String },
        code: { type: String, index: true },
        slug: { type: String, index: true },
        publishedDate: { type: Types.Date, index: true },
        description: { type: Types.Html, wysiwyg: true, height: 250 },
        name: { type: String, index: true },
        createdonindexing: { type: String, index: true },
        updatedOnUser: { type: String },
        responseDetails:
        {
            comments: { type: String },
            conditions: { type: String },
            cancelpolicy: {
                _es: { type: String },
                _en: { type: String }
            }
        },
        products: { type: Types.Relationship, ref: 'DMCProducts', index: true },
        booking: { type: Types.Relationship, ref: 'Bookings2', index: true },
        oldbooking: { type: Types.Relationship, ref: 'Bookings', index: true },
        // version con referencias cruzadas *****************************    
        //userquery: { type: Types.Relationship, initial: true, ref: 'UserQueries', index: true },
        
        
        // version probada *********************************************
        userqueryCode: { type: String, index: true },
        userqueryId: { type: String, index: true },
        //**************************************************************
        
        //booking: { type: Types.Relationship, initial: true, ref: 'Bookings', index: true },
        idBooking: { type: String, index: true },
        //traveler: { type: Types.Relationship, initial: true, ref: 'Travelers', index: true  },
        dmc: { type: Types.Relationship, ref: 'DMCs', initial: true, index: true },
        affiliate: { type: Types.Relationship, ref: 'Affiliate', initial: true, index: true },
        travelercode: { type: String, index: true },
        affiliatecode: { type: String, index: true },
        dmccode: { type: String, index: true },
        
        // fecha de proporcionada por el dmc para el inicio de la query del usuario
        operationStart: {
            year: { type: Types.Number, index: true },//YYYY Date.getFullYear()
            month: { type: Types.Number, index: true }, // 0-11  Date.getMonth()
            monthname_es : { type: String },
            monthname_en : { type: String },
            day: { type: Types.Number, index: true }//1-31 Date.getDate()
        },
        operationStartDate: { type: Types.Date, index: true },
        
        // fecha de validez de la oferta del dmc
        quoteValidUntil: {
            year: { type: Types.Number, index: true },//YYYY Date.getFullYear()
            month: { type: Types.Number, index: true }, // 0-11  Date.getMonth()
            monthname_es : { type: String },
            monthname_en : { type: String },
            day: { type: Types.Number, index: true }//1-31 Date.getDate()
        },
        quoteValidDate: { type: Types.Date, index: true },
        chat: { type: Types.Relationship, index: true, ref: 'Chats' },
        status: { type: String, index: true },
        comission: { type: Types.Number }, //comission omt aplicado al producto
        isB2C: { type: Types.Boolean }, //para sabar si es b2b o b2c        
        b2bcommission: { type: Types.Number }, //es la comision b2b del dmc
        omtmargin: { type: Types.Number } // es lo que OMT le puso como margen a ese afiliado      
    });
    
 // fees del affiliado para la quote
    Quote.schema.add({
    	
    	 fees: {
            unique: { type: Types.Number },
            groups: { type: Types.Number },
            tailormade: { type: Types.Number },
            flights: { type: Types.Number }
        }
    });

    
    // precios del dmc para todas sus combinaciones
    Quote.schema.add({
        
        rooms: {
            single : {
                quantity: { type: Types.Number },//number of romms
                // precio neto introducido por el dmc
                pricePerPax: {
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
                },
                //precio total a mostrar al usuario
                amountPricePerPax: {
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
                },
                //pvp affiliado 
                pvpAffiliatePerPax: {                    
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
            },
            double : {
                quantity: { type: Types.Number },//number of romms
                pricePerPax: {
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
                },
                //precio total a mostrar al usuario
                amountPricePerPax: {
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
                },
                //pvp affiliado 
                pvpAffiliatePerPax: {                    
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
            },
            triple : {
                quantity: { type: Types.Number },//number of romms
                pricePerPax: {
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
                },
                //precio total a mostrar al usuario
                amountPricePerPax: {
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
                },
                //pvp affiliado 
                pvpAffiliatePerPax: {              
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
            },
            quad : {
                quantity: { type: Types.Number },//number of romms
                pricePerPax: {
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
                },
                //precio total a mostrar al usuario
                amountPricePerPax: {
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
                },
                //pvp affiliado 
                pvpAffiliatePerPax: {                   
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
            }
        }
    });
    
    
    // ninios de la quote
    Quote.schema.add({
        children: {
            type: [{
                age: { type: Types.Number },
                quantity: { type: Types.Number }, //numero de ninios
                pricePerPax: {
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
                },
                //precio total del ninio a mostrar al usuario
                amountPricePerPax: {
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
                },
                //pvp affiliado 
                pvpAffiliatePerPax: {           
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
    
    
    
    //netPrice en formato importes con divisa
    Quote.schema.add({
        netPrice: {
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
    });
    
    
    //amount en formato importes con divisa  amount = (100 * neto) /(100-comision)
    Quote.schema.add({
        amount: {
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
    });
    
   //pvpAffiliate pvp del afiliado final
    Quote.schema.add({
    	pvpAffiliate: {    	
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
    });
    
    
    //Estructura que guarda la informacion de cuando se cancelo la quote
    Quote.schema.add({
        cancelled: {
            cancelDate: { type: Types.Date, index: true },
            user : { type: String }, // usuario que cancela
            byTraveler: { type: Boolean },//true si es traveler, false si es admin o dmc
            reason: { type: String, index: true }//motivo de la cancelacion      
        }
    });
    
    //Quote.relationship({ ref: 'UserQueries', path: 'quotes' });
    
    Quote.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    Quote.schema.pre('save', function (next) {
        
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }

        if (this != null && this.createdOn != null) {
            this.createdonindexing = pad(
                pad(this.createdOn.getFullYear(), 4) + 
            pad(this.createdOn.getMonth(), 2) + 
            pad(this.createdOn.getDate(), 2) + 
            pad(this.createdOn.getHours(), 2) + 
            pad(this.createdOn.getMinutes(), 2), 10) + 
            '.' + pad(this.code, 10);
        }

        next();       
    });
        
    Quote.addPattern('standard meta');
    Quote.defaultColumns = 'title, slug, publishedDate|20%, description|20%';
    Quote.register(dbname);
}
