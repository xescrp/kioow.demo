module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var UserQuery = new yourttoocore.List('UserQueries', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true }
    });
    
    UserQuery.add({
        title: { type: String, index: true },
        slug: { type: String, index: true },
        name: { type: String },
        code: { type: String, index: true },
        travelercode: { type: String, index: true },
        affiliatecode: { type: String, index: true  },
        publishedDate: { type: Types.Date, index: true },
        createdonindexing: { type: String, index: true },
        startdateindexing: { type: String, index: true },
        destinationsindexing: { type: String, index: true },
        destinationsindexingen: { type: String, index: true },
        stateindexing: { type: String, index: true },
        holderindexing : { type: String, index: true },
        titleindexing : { type: String, index: true },
        affiliateindexing: { type: String, index: true },
        updatedOnUser: { type: String },
        description: { type: String },
        idBooking: { type: String },
        additionalinfo: {
            description: { type: String },
            trip: { type: String },
            regimen: { type: String },
            needs: { type: String },
            guide: {
                included : { type: Types.Boolean },
                language: {
                    spanish: { type: Types.Boolean },
                    english: { type: Types.Boolean },
                    french: { type: Types.Boolean },
                    german: { type: Types.Boolean },
                    italian: { type: Types.Boolean },
                    portuguese: { type: Types.Boolean }
                }
            }
        },
        dates: {
            knowingdates: { type: Types.Boolean },
            
            arrivaldate: { type: Types.Date },         
            
            arrival: {
                year: { type: Types.Number, index: true },//YYYY Date.getFullYear()
                month: { type: Types.Number, index: true }, // 0-11  Date.getMonth()
                monthname_es : { type: String },
                monthname_en : { type: String },
                day: { type: Types.Number, index: true }//1-31 Date.getDate()
            },
            
            month : {
                monthnumber: { type: Types.Number }, //month number, 1-based
                monthname: { type: String },
                monthyear: { type: Types.Number }
            },
            week: { type: String },
            alreadygotflights: { type: Types.Boolean },
            dataflightsIn : { type: String },
            dataflightsOut: { type: String }, 
            duration: { type: String },
            flexibility: {
                number: { type: Types.Number },
                range: { type: String }
            }
        },
        hosting :
        {
            hostingKind: { type: String },
            hostingKindNotes: { type: String },
            lowcosthotels: { type: Types.Boolean },
            standarhotels: { type: Types.Boolean },
            superiorhotels: { type: Types.Boolean },
            charmhotels: { type: Types.Boolean },
            luxuryhotels: { type: Types.Boolean },
        },
        budget: {
            cost: { type: Types.Number },
            currency: {
                label: String ,
                symbol: String,
                value: String
            },
            showmebestprices : { type: Types.Boolean }
        },
        group: {
            typeGroup: { type: String },
            adults: { type: Types.Number },
            comments: { type: String },
            rooms: {
                single: { type: Types.Number },
                double: { type: Types.Number },
                triple: { type: Types.Number }
            }
        },
        quotes: { type: Types.Relationship, index: true, ref: 'Quotes', many: true },
        selectedquote: { type: Types.Relationship, index: true, ref: 'Quotes' },
        traveler: { type: Types.Relationship, index: true, ref: 'Travelers', initial: true },
        affiliate: { type: Types.Relationship, index: true, ref: 'Affiliate', initial: true },
        dmcs: { type: Types.Relationship, index: true, ref: 'DMCs', many: true },
        chats: { type: Types.Relationship, index: true, ref: 'Chats', many: true },
        booking: { type: Types.Relationship, ref: 'Bookings2', index: true },
        oldbooking: { type: Types.Relationship, ref: 'Bookings', index: true },
        state: { type: String, index: true },
        affiliateuser: { type: String }
    });

    UserQuery.schema.add({
        quotesstates: {
            type: [{
                dmccode: { type: String, index: true },
                status: { type: String, index: true }
            }]
        },
    });
    
    UserQuery.schema.add({
        destinations: 
        {
            type: [{
                    fulladdress: { type: String },
                    city: { type: String, index: true },
                    stateorprovince: { type: String },
                    cp: { type: String },
                    country: { type: String, index: true },
                    countrycode: { type: String, index: true },
                    continent: { type: String },
                    latitude: { type: Types.Number },
                    longitude: { type: Types.Number }
                }]
        }
    });
    
    
    
    //Estructura que guarda la informacion de cuando se cancelo la query
    UserQuery.schema.add({
        cancelled: {
            cancelDate: { type: Types.Date, index: true },
            user : { type: String }, // usuario que cancela
            byTraveler: { type: Boolean },//true si es traveler/affiliate, false si es admin o dmc
            reason: { type: String, index: true }//motivo de la cancelacion      
        }
    });
    
    
    UserQuery.schema.add({
        whattodo: {
            type: [{
                    value: { type: String },
                    label: { type: String },
                    label_en: { type: String },
                    slug: { type: String, index: true }
                }]
        }
    });
    
    
    UserQuery.schema.add({
        roomDistribution: [
            {
                numRoom: { type: Types.Number },
                roomType: {
                    roomCode: { type: String },
                    label: { type: String },
                    pax: { type: Types.Number }
                },
                roomCode: { type: String }, //single, double, triple
                pricePerPax: { type: Types.Number },
                quantityPax: { type: Types.Number },//1 single, 2 double, 3 triple
                slug: { type: String },
                paxList: {
                    type: [{
                            name: { type: String },
                            age: { type: Types.Number },
                            lastName: { type: String },
                            title: { type: String },
                            typePax: { type: String }, 
                            birdthDate: { type: Types.Date },
                            country: {
                                name_es: { type: String },
                                name: { type: String },
                                countrycode: { type: String }
                            },
                            documentNumber: { type: String },
                            documentType: { type: String },
                            holder: { type: Types.Boolean }//si es titular
                        }]
                }
            }
        ]
    });
    
    
    //historico de estados y mail enviado
    UserQuery.schema.add({
        historic: {
            type: [{
                    date: { type: Types.Date, index: true }, //fecha en que paso a ese estado
                    state: { type: String, index: true }, //estado
                    user: { type: String , index: true }, //usuario que inicio el cambio de estado
                    mailSend: {
               //mail enviados
                        type: [{
                                name: { type: String, index: true }, //nombre del mail (nombe del template en mailer.js)
                                date: { type: Types.Date, index: true } //fecha en que se envio el mail	                
                            }]
                    }
                }]
        }
    });
    


	//comentarios sobre las ediciones
	UserQuery.schema.add({
		comments: {
		    type:[{
		    	date: { type: Types.Date , index:true }, //fecha del comentario de la edicion
		  	  	text: { type: String }, //cometnario
		  	  	user: { type: String , index:true }, //usuario que hizo la modificacion
		  	  	type: { type: String } //si es affiliate, indica que es de affilido, vacio indica que es de omt
		    }]
	    }
	});
 
    UserQuery.schema.add({
        passengers: {
           type: [ {
                traveling: {
                    alone: { type: Types.Boolean },
                    partner: { type: Types.Boolean },
                    family: { type: Types.Boolean },
                    friends: { type: Types.Boolean },
                    group: { type: Types.Boolean }
                },
                acomodattion: {
                    howmany: { type: Types.Number }
                }
            }]
        }
    });
    UserQuery.schema.virtual('content.full').get(function () {
        return this.title || '';
    });
    
    /** 
        Relationships
        =============
    */
//UserQuery.relationship({ ref: 'Travelers', path: 'queries' });
//UserQuery.relationship({ ref: 'Quotes', path: 'userQuery' });

    UserQuery.schema.pre('save', function (next) {

        function pad(str, max) {
            str = (str != null) ? str.toString() : '0';
            return str.length < max ? pad("0" + str, max) : str;
        }
        // arrival date index
        if (this != null && this.dates != null && this.dates.arrival != null) {
            this.startdateindexing = pad(
                pad(this.dates.arrival.year, 4) + 
            pad(this.dates.arrival.month, 2) + 
            pad(this.dates.arrival.day, 2) + 
            '0000', 10) + 
            '.' + pad(this.code, 10);
        }
        // createdOn date index
        if (this != null && this.createdOn != null) {
            this.createdonindexing = pad(
                pad(this.createdOn.getFullYear(), 4) + 
            pad(this.createdOn.getMonth(), 2) + 
            pad(this.createdOn.getDate(), 2) + 
            pad(this.createdOn.getHours(), 2) + 
            pad(this.createdOn.getMinutes(), 2), 10) + 
            '.' + pad(this.code, 10);
        }
        // state index
        if (this != null && this.state != null) {
            this.stateindexing = [this.state, pad(this.code, 10)].join('.');
        }

        // holder index
        var pax = (this.traveler != null) ? [this.traveler.firstname, this.traveler.lastname].join('.') : null;
        pax = pax || this.title || 'zz';
        
        var prevpax = [pax, pad(this.code, 10)].join('.');
        this.holderindexing = prevpax.toLowerCase();
        // affiliate index
        if (this.affiliate != null && this.affiliate.company != null) {
            var cname = this.affiliate.company.name || 'ZZZZZZZZZZ';
            this.affiliateindexing = [cname.toLowerCase(), pad(this.code, 10)].join('.');
        }
        else {
            this.affiliateindexing = ['ZZZZZZZZZZ', pad(this.code, 10)].join('.');
        }
        // traveler index
        if (this.traveler != null){
            this.title = this.traveler.firstname+' '+this.traveler.lastname;
        }
        // title index
        var titleindex = this.title || 'ZZZZZZZZZZ';
        this.titleindexing = [titleindex, pad(this.code, 10)].join('.');
        // num pax
        // duration
        // destinations index
        var ccs = [];
        if (this != null && this.destinations != null && this.destinations.length > 0) {
            var cts = ['zz'];
            for (var i = 0, len = this.destinations.length; i < len; i++) {
                var dst = 'zz';
                if (this.destinations[i] != null) {
                    ccs.push(this.destinations[i].countrycode.toLowerCase());
                    dst = this.destinations[i].country.toLowerCase() || this.destinations[i].countrycode.toLowerCase();
                }
                cts.push(dst);
            }
            var ctsflat = cts.sort().join('.');
            this.destinationsindexing = [ctsflat, pad(this.code, 10)].join('.');

        }
        var _ = require('underscore');
        var self = this;
        var ctsen = [];
        yourttoocore.list('DestinationCountries').model.find({ slug : {$in : ccs}})
        .exec(function (err, docs) {
            _.each(docs, function(item){
                (item.label_en != null)? ctsen.push(item.label_en.toLowerCase().trim()): null;
            });
            var ctsenflat = ctsen.sort().join('.');
            self.destinationsindexingen = [ctsenflat, pad(self.code, 10)].join('.');
            next();
        }); 
    });

    
    UserQuery.addPattern('standard meta');
    UserQuery.defaultColumns = 'title, slug, publishedDate|20%, description|20%';
    UserQuery.register(dbname);

}