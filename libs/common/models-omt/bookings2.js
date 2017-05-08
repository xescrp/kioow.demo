module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;
    
    var Booking2 = new yourttoocore.List('Bookings2', {
        map: { name: 'idBooking' },
        autokey: { path: 'slug', from: 'idBooking', unique: true }
    });
    
    Booking2.add({
        idBooking: { type: String, required: true, index: true },
        slug: { type: String, index: true },
        idBookingExt: { type: String },
        code: { type: String, index: true },
        agentid: { type: String, index: true },
        agencyid: { type: String, index: true }, 
        bookingmodel: { type: String, index: true }, //bookingb2c, bookingb2b, budget, taylormadeb2c, taylormadeb2cgroups, taylormadeb2b, taylormadeb2bgroups, whitelabel,
        paymentmodel: { type: String, index: true }, //tpv-100, tpv-split, transfer-100, transfer-split
        dates: {
            start: {
                year: { type: Types.Number  },//YYYY Date.getFullYear()
                month: { type: Types.Number }, // 0-11  Date.getMonth()
                monthname_es : { type: String },
                monthname_en : { type: String },
                day: { type: Types.Number }, //1-31 Date.getDate()
                date: { type: Types.Date, index: true }
            },
            end: {
                year: { type: Types.Number },
                month: { type: Types.Number }, 
                monthname_es : { type: String },
                monthname_en : { type: String },
                day: { type: Types.Number },
                date: { type: Types.Date, index: true }
            },
            canceldate: {
                year: { type: Types.Number },
                month: { type: Types.Number },
                monthname_es: { type: String },
                monthname_en: { type: String },
                day: { type: Types.Number },
                date: { type: Types.Date, index: true }
            },
            finalpayment: {
                year: { type: Types.Number },
                month: { type: Types.Number },
                monthname_es: { type: String },
                monthname_en: { type: String },
                day: { type: Types.Number },
                date: { type: Types.Date, index: true }
            }, 
            firstcharge: {
                year: { type: Types.Number },
                month: { type: Types.Number },
                monthname_es: { type: String },
                monthname_en: { type: String },
                day: { type: Types.Number },
                date: { type: Types.Date, index: true }
            }, 
            finalcharge: {
                year: { type: Types.Number },
                month: { type: Types.Number },
                monthname_es: { type: String },
                monthname_en: { type: String },
                day: { type: Types.Number },
                date: { type: Types.Date, index: true }
            }, 
            lastvisituser: { type: Types.Date }, //ultima visualizacion de la reserva por parte del usuario
            lastvisitdmc: { type: Types.Date },//ultima visualizacion de la reserva por parte del DMC
            lastvisitomt: { type: Types.Date },//ultima visualizacion de la reserva por parte de OMT,
            lastvisitaffiliate: { type: Types.Date },//ultima visualizacion de la reserva por parte de OMT,
            paymentoption: { type: String }
        },
        programcode: { type: String, index: true },
        meetingdata: { type: String },
        previousstatus: { type: String, index: true },
        status: { type: String, index: true },
        chargestatus: { type: String, index: true },
        paystatusprovider: { type: String, index: true },
        paystatusagency: { type: String, index: true },
        startdateindexing : { type: String, index: true }, //explicit indexing for start date
        enddateindexing : { type: String, index: true }, //explicit indexing for end date
        createdonindexing: { type: String, index: true }, //explicit indexing for createdon date
        affiliateindexing: { type: String, index: true }, //explicit indexing for affilate
        dmcindexing : { type: String, index: true }, //explicit indexing for dmc
        destinationindexing: { type: Types.Arraystring, index: true },
        paxindexing: { type: Types.Arraystring, index: true },
        textindexing: { type: Types.Arraystring, index: true },
        updatedOnUser: { type: String },
        products: { type: Types.Relationship, initial: true, ref: 'BookedProducts', many: true }, //a copy of the product on a new collection
        dmc : { type: Types.Relationship, initial: true, ref: 'DMCs', index:true },
        traveler: { type: Types.Relationship, initial: true, ref: 'Travelers', index:true }, 
        affiliate: { type: Types.Relationship, initial: true, ref: 'Affiliate', index: true }, 
        query: { type: Types.Relationship, initial : true, ref: 'UserQueries', index: true },
        quote: { type: Types.Relationship, initial : true, ref: 'Quotes', index: true },
        payments: { type: Types.Relationship, initial: true, ref: 'Payments', index: true, many: true },
        stories: { type: Types.Relationship, initial: true, ref: 'Stories', index: true, many: true },
        signin: { type: Types.Relationship, initial: true, ref: 'SigninRegister', index: true },
        flights: { type: Types.Relationship, initial: true, ref: 'Flights', index: true }, 
        invoices: { type: Types.Relationship, initial: true, ref: 'Invoices', index: true, many: true },
        relatedbooking: { type: Types.Relationship, initial: true, ref: 'Bookings', index: true },
        pricing: {
            comission: { type: Types.Number, default: 0 },
            iva: { type: Types.Number, default: 0 },
            amount: { type: Types.Number, default: 0 }, // The total amount for this Room Pricing
            currency: {
                label: { type: String },
                symbol: { type: String },
                value: { type: String }
            },
            fee: { type: Types.Number },
            margin: { type: Types.Number },
            minpaxoperate: { type: Types.Number },
            rooms: {
                double: { type: Types.Number },
                single: { type: Types.Number },
                triple: { type: Types.Number },
                quad: { type: Types.Number },
                currency: { type: String }
            },
            roomsnet: {
                double: { type: Types.Number },
                single: { type: Types.Number },
                triple: { type: Types.Number },
                quad: { type: Types.Number },
                currency: { type: String }
            },
            roomssnapshot: {
                double: { type: Types.Number },
                single: { type: Types.Number },
                triple: { type: Types.Number },
                quad: { type: Types.Number },
                currency: { type: String }
            },
            parityprice:  { type: Types.Boolean },
            edited: {
                editedby: { type: String },
                date: { type: Types.Date },
                isedited: { type: Types.Boolean }
            }
        },
        chargefeatures: {
            first: {
                amount: { type: Types.Number },
                date: { type: Types.Date }
            },
            second: {
                amount: { type: Types.Number },
                date: { type: Types.Date }
            },
            third: {
                amount: { type: Types.Number },
                date: { type: Types.Date }
            },
            fourth: {
                amount: { type: Types.Number },
                date: { type: Types.Date }
            }
        },
        voucher:  {
                public_id: { type: String },
                version: { type: Types.Number },
                signature: { type: String },
                format: { type: String },
                resource_type: { type: String },
                url: { type: String },
                width: { type: Types.Number },
                height: { type: Types.Number },
                secure_url: { type: String }
        },
        timezone: {
            label: { type: String },
            useDaylightTime: { type: String },
            value: { type: String }
        },
        observations: {
            label_es: { type: String }, 
            label_en: { type: String }, 
            observations : { type: String },
            signing: { type: String }
        },
        cancelpolicy: {
            _en: { type: String },
            _es: { type: String }
        }
    });

    Booking2.schema.add({
        priceevolution: [{ }]
    });

    Booking2.schema.add({
        lastexchangeapplyed: { }
    });

    Booking2.schema.add({
        exchanges: {
            type:[{
                    origin: { type: String, default: 'EUR' },
                    change: { type: Types.Number, initial: true },
                    destination: { type: String, default: 'USD' },}]
        }
    });

    Booking2.schema.add({
        children: {
            type: [{
                age: { type: Types.Number },
                price: { type: Types.Number }
            }]
        }
    });

    Booking2.schema.add({
        mailing: {
            type: [{
                previousstatus: { type: String },
                currentstatus: { type: String },
                templatename: { type: String },
                to: { type: String },
                date: { type: Types.Date },
                notes: { type: String }
            }]
        }
    });

    //pax collection
    Booking2.schema.add({
        paxes: [{
                name: { type: String },
                lastname: { type: String },
                slug: { type: String },
                title: { type: String },
                birthdate: { type: Types.Date },
                country: {
                    label_es: { type: String },
                    label_en: { type: String },
                    name_es: { type: String },
                    name_en: { type: String },
                    slug: { type: String },
                    countryiso3: { type: String }
                },
                documentnumber: { type: String },
                documenttype: { type: String },
                documentexpirationdate: { type: Types.Date },
                documentexpeditioncountry: {              	 
                    label_es: { type: String },
                    label_en: { type: String },
                    name_es: { type: String },
                    name_en: { type: String },
                    slug: { type: String },
                    countryiso3: { type: String }
                },
                holder: { type: Types.Boolean },
                price: { type: Types.Number },
                pricecurrency: { type: String },
                net: { type: Types.Number },
                netcurrency: { type: String },
                dmc: { type: Types.Number },
                dmccurrency: { type: String },
                room: {type: String }
            }]
    });

    Booking2.schema.add({
        invoicesagency: { //WL COMISSION INVOICE
            type: [{
                invoicenumber: { type: String },
                code: { type: String },
                target: { type: String, index: true },
                source: { type: String, index: true },
                file: {
                    public_id: { type: String },
                    version: { type: Types.Number },
                    signature: { type: String },
                    format: { type: String },
                    resource_type: { type: String },
                    url: { type: String },
                    width: { type: Types.Number },
                    height: { type: Types.Number },
                    secure_url: { type: String }
                },
                taxinvoice: { type: Types.Number },
                amount: { type: Types.Number },
            }]
        },
        invoicesprovider: { //DMC INVOICE
            type: [{
                invoicenumber: { type: String },
                code: { type: String },
                target: { type: String, index: true },
                source: { type: String, index: true },
                file: {
                    public_id: { type: String },
                    version: { type: Types.Number },
                    signature: { type: String },
                    format: { type: String },
                    resource_type: { type: String },
                    url: { type: String },
                    width: { type: Types.Number },
                    height: { type: Types.Number },
                    secure_url: { type: String }
                },
                taxinvoice: { type: Types.Number },
                amount: { type: Types.Number },
            }]
        },
        invoicestravelersense: { //WL COMISSION INVOICE
            type: [{
                invoicenumber: { type: String },
                code: { type: String },
                target: { type: String, index: true },
                source: { type: String, index: true },
                file: {
                    public_id: { type: String },
                    version: { type: Types.Number },
                    signature: { type: String },
                    format: { type: String },
                    resource_type: { type: String },
                    url: { type: String },
                    width: { type: Types.Number },
                    height: { type: Types.Number },
                    secure_url: { type: String }
                },
                taxinvoice: { type: Types.Number },
                amount: { type: Types.Number },
            }]
        }
    });

    Booking2.schema.add({
        rooms: {
            type: [{
                    roomcode: { type: String },
                    name: { type: String },
                    slug: { type: String },
                    paxlist: [String],
                    price: { type: Types.Number },
                    pricecurrency: { type: String },
                    net: { type: Types.Number },
                    netcurrency: { type: String },
                    dmc: { type: Types.Number },
                    dmccurrency: { type: String },
                    priceperpax: { type: Types.Number },
                    priceperpaxcurrency: { type: String },
                    netperpax: { type: Types.Number },
                    netperpaxcurrency: { type: String },
                    dmcperpax: { type: Types.Number },
                    dmcperpaxcurrency: { type: String },
                }]
        }
    });

    Booking2.schema.add({
        breakdown: {}
    });
    
    function _getbreakdown() {
        var machine = require('../lib/book.pricemachine');
        return machine(this, yourttoocore);
    };

    Booking2.schema.methods.getbreakdown = function () {

        var machine = require('../lib/book.pricemachine');
        return machine(this, yourttoocore);
    };

    Booking2.schema.pre('init', function (next, booking, query) {
        var machine = require('../lib/book.pricemachine');
        var utils = require('../lib/utils');

        yourttoocore.list('Payments').model.find({ _id: { $in: booking.payments } }).exec(function (err, docs) {
            booking.payments = docs;
            var ct = booking.createdOn;
            var first = new Date(ct);
            first.setDate(ct.getDate() + 3);
            //review dates: 
            booking.dates != null && booking.dates.start != null && booking.dates.start.date == null ? booking.dates.start.date = new Date(booking.dates.start.year, booking.dates.start.month, booking.dates.start.day, 0, 0, 0) : null;
            booking.dates != null && booking.dates.end != null && booking.dates.end.date == null ? booking.dates.end.date = new Date(booking.dates.end.year, booking.dates.end.month, booking.dates.end.day, 23, 59, 59) : null;
            booking.dates != null && booking.dates.finalpayment != null && booking.dates.finalpayment.date == null ? booking.dates.finalpayment.date = new Date(booking.dates.finalpayment.year, booking.dates.finalpayment.month, booking.dates.finalpayment.day, 23, 59, 59) : null;
            booking.dates != null && booking.dates.finalcharge != null && booking.dates.finalcharge.date == null ? booking.dates.finalcharge.date = new Date(booking.dates.finalcharge.year, booking.dates.finalcharge.month, booking.dates.finalcharge.day, 23, 59, 59) : null;
            booking.dates != null && booking.dates.canceldate != null && booking.dates.canceldate.date == null ? booking.dates.canceldate.date = new Date(booking.dates.canceldate.year, booking.dates.canceldate.month, booking.dates.canceldate.day, 23, 59, 59) : null;
            booking.dates != null && booking.dates.firstcharge == null ? booking.dates.firstcharge = {
                year: first.getFullYear(),
                month: first.getMonth(),
                monthname_en: utils.getMonthNameEnglish(first.getMonth()),
                monthname_es: utils.getMonthNameSpanish(first.getMonth()),
                day: first.getDate(),
                date: first
            } : null;
            booking.dates != null && booking.dates.firstcharge != null && booking.dates.firstcharge.date == null ? booking.dates.firstcharge.date = new Date(booking.dates.firstcharge.year, booking.dates.firstcharge.month, booking.dates.firstcharge.day, 23, 59, 59) : null;
            
            booking.chargefeatures == null ?
                booking.chargefeatures = {
                    first: {
                        amount: booking.breakdown != null && booking.breakdown.agency != null && booking.breakdown.agency.net > 0 ? Math.round(booking.breakdown.agency.net * (15 / 100)) : 0,
                        date: booking.dates.firstcharge.date
                    },
                    second: {
                        amount: booking.breakdown != null && booking.breakdown.agency != null && booking.breakdown.agency.net > 0 ? Math.round(booking.breakdown.agency.net * (85 / 100)) : 0,
                        date: booking.dates.finalcharge.date
                    }
                } : (
                    booking.chargefeatures.first != null && booking.chargefeatures.first.amount <= 0 ?
                        booking.chargefeatures.first.amount = booking.breakdown != null && booking.breakdown.agency != null && booking.breakdown.agency.net > 0 ?
                            Math.round(booking.breakdown.agency.net * (15 / 100)) : 0 : null,
                    booking.chargefeatures.second != null && booking.chargefeatures.second.amount <= 0 ?
                        booking.chargefeatures.second.amount = booking.breakdown != null && booking.breakdown.agency != null && booking.breakdown.agency.net > 0 ?
                            Math.round(booking.breakdown.agency.net * (85 / 100)) : 0 : null
                    );

            ((booking.breakdown == null ||
                (booking.breakdown != null &&
                    booking.breakdown.charges != null && booking.breakdown.charges.first == null) || 
                (booking.breakdown != null &&
                    booking.breakdown.charges != null && booking.breakdown.charges.second == null)) &&
                booking.pricing != null && booking.pricing.rooms != null) ?
                _loaddmc(booking, function () {
                    booking.breakdown = machine(booking, yourttoocore);
                    //(booking.cancelpolicy == null || booking.cancelpolicy._es == null) && booking.dmc.membership != null && booking.dmc.membership.cancelpolicy != null ?
                    //    (booking.cancelpolicy._es = booking.dmc.membership.cancelpolicy._es, booking.cancelpolicy._en = booking.dmc.membership.cancelpolicy._en) : null;
                    next();
                }) : next();
        });
        
    });

    Booking2.schema.pre('save', function (next) {
            function pad(str, max) {
                str = str.toString();
                return str.length < max ? pad("0" + str, max) : str;
            }
            var _ = require('underscore');
            var dS = new Date();
            var eS = new Date();
            //start...
            dS.setDate(this.dates.start.day);
            dS.setMonth(this.dates.start.month);
            dS.setYear(this.dates.start.year);
            dS.setHours(0);
            dS.setMinutes(0);
            dS.setSeconds(0);
            dS.setMilliseconds(0);
            this.dates.start.date = dS;

            var cS = new Date();
            cS.setDate(this.dates.canceldate.day);
            cS.setMonth(this.dates.canceldate.month);
            cS.setYear(this.dates.canceldate.year);
            cS.setHours(0);
            cS.setMinutes(0);
            cS.setSeconds(0);
            cS.setMilliseconds(0);
            this.dates.canceldate.date = cS;

            var fS = new Date();
            fS.setDate(this.dates.finalpayment.day);
            fS.setMonth(this.dates.finalpayment.month);
            fS.setYear(this.dates.finalpayment.year);
            fS.setHours(0);
            fS.setMinutes(0);
            fS.setSeconds(0);
            fS.setMilliseconds(0);
            this.dates.finalpayment.date = fS;

            var indexingDS = pad(pad(this.dates.start.year, 4) + 
                pad(this.dates.start.month, 2) + pad(this.dates.start.day, 2), 10) + '.' + pad(this.idBooking, 10);
            //end
            eS.setDate(this.dates.end.day);
            eS.setMonth(this.dates.end.month);
            eS.setYear(this.dates.end.year);
            eS.setHours(23);
            eS.setMinutes(59);
            eS.setSeconds(59);
            eS.setMilliseconds(999);
            this.dates.end.date = eS;
            var indexingES = pad(pad(this.dates.end.year, 4) + 
                pad(this.dates.end.month, 2) + pad(this.dates.end.day, 2), 10) + '.' + pad(this.idBooking, 10);
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


            var prd = (this.products != null && this.products.length > 0) ? this.products[0] : null;
            prd = (prd != null && typeof prd.toObject === "function") ? prd.toObject() : prd;
        

            var self = this;
            console.log('indexing destinations...');
            console.log(this.destinationindexing);
            if (prd != null && prd.buildeditinerary != null && 
                prd.buildeditinerary.countriesfull_en != null && prd.buildeditinerary.countriesfull_en.length > 0) {
                this.destinationindexing = this.destinationindexing.slice(0, this.destinationindexing.length);
                var dstindex = [];
                _.each(prd.buildeditinerary.countriesfull_en, function (sleepcountry) {
                    dstindex.push([sleepcountry.toLowerCase(), pad(self.idBooking, 10)].join('.'));
                });
                _.each(prd.buildeditinerary.countriesfull_es, function (sleepcountry) {
                    dstindex.push([sleepcountry.toLowerCase(), pad(self.idBooking, 10)].join('.'));
                });

                if (prd != null && prd.buildeditinerary.sleepcities != null && prd.buildeditinerary.sleepcities > 0) {
                    _.each(prd.buildeditinerary.sleepcities, function (sleepcity) {
                        dstindex.push([sleepcity.label_en.toLowerCase(), pad(self.idBooking, 10)].join('.'));
                        dstindex.push([sleepcity.label_es.toLowerCase(), pad(self.idBooking, 10)].join('.'));
                    });
                }
                this.destinationindexing = _.uniq(dstindex); 
            } else {
                this.destinationindexing = this.destinationindexing == null ?
                    [['ZZZZZZZZZZ', pad(this.idBooking, 10)].join('.')] :
                    this.destinationindexing = _.uniq(this.destinationindexing);
            }
            console.log(this.destinationindexing);
            console.log('indexing paxes ');
            if (this.paxes != null && this.paxes.length > 0) {
                this.paxindexing = this.paxindexing.slice(0, this.paxindexing.length);
                var paxindex = [];
                _.each(this.paxes, function (pax) {
                    paxindex.push([pax.lastname.toLowerCase(), pax.name.toLowerCase(), pad(self.idBooking, 10)].join('.'));
                });
                this.paxindexing = _.uniq(paxindex);
            } else {
                this.paxindexing = this.paxindexing == null ?
                    [['', pad(this.idBooking, 10)].join('.')] :
                    _.uniq(this.paxindexing);
            }
            
            if (this.products != null && this.products.length > 1) {
                this.products = this.products.slice(0, 1);
            }
            
            if (this.stories != null && this.stories.length > 0) {
                this.stories = _.uniq(this.stories, function (item, key, a) {
                    if (item.hasOwnProperty('_id')) {
                        return item._id.toString();
                    } else {
                        return JSON.stringify(item);
                    }
                });
            }

            if (this.payments != null && this.payments.length > 0) {
                this.payments = _.uniq(this.payments, function (item, key, a) {
                    if (item.hasOwnProperty('_id')) {
                        return item._id.toString();
                    } else {
                        return JSON.stringify(item);
                    }
                });
            }

            if (this.invoices != null && this.invoices.length > 0) {
                this.invoices = _.uniq(this.invoices, function (item, key, a) {
                    if (item.hasOwnProperty('_id')) {
                        return item._id.toString();
                    } else {
                        return JSON.stringify(item);
                    }
                });
            }

            console.log('indexing affiliate');
            if (this.affiliate != null && this.affiliate.company != null) {
                var cname = this.affiliate.company.name || 'ZZZZZZZZZZ';
                this.affiliateindexing = [cname.toLowerCase(), pad(this.idBooking, 10)].join('.');
            }
            else {
                this.affiliateindexing = this.affiliateindexing == null ?
                    ['ZZZZZZZZZZ', pad(this.idBooking, 10)].join('.') : this.affiliateindexing;
            }

            var self = this;
            _loaddmc(self, function (dmc) {
                console.log('indexing dmc');
                if (self.dmc != null && self.dmc.name != null) {
                    var cname = self.dmc.name || 'ZZZZZZZZZZ';
                    self.dmcindexing = [cname.toLowerCase(), pad(self.idBooking, 10)].join('.');
                }
                else {
                    self.dmcindexing = self.dmcindexing == null ?
                        ['ZZZZZZZZZZ', pad(self.idBooking, 10)].join('.') : self.dmcindexing;
                }
                console.log('price machine operation...');
                var machine = require('../lib/book.pricemachine');
                self.breakdown = machine(self, yourttoocore);
                var brkcopy = JSON.parse(JSON.stringify(self.breakdown));
                //brkcopy.date = new Date();
                self.priceevolution.length > 30 ? self.priceevolution = self.priceevolution.slice(0, 20) : null;
                self.priceevolution.length > 20 ? self.priceevolution.shift() : null;
                self.priceevolution.push(brkcopy);
                //check the payments...
                self.chargefeatures == null ?
                    self.chargefeatures = {
                        first: {
                            amount: self.breakdown != null && self.breakdown.agency != null && self.breakdown.agency.net > 0 ? Math.round(self.breakdown.agency.net * (15 / 100)) : 0,
                            date: self.dates.firstcharge.date
                        },
                        second: {
                            amount: self.breakdown != null && self.breakdown.agency != null && self.breakdown.agency.net > 0 ? Math.round(self.breakdown.agency.net * (85 / 100)) : 0,
                            date: self.dates.finalcharge.date
                        }
                    } : (
                        self.chargefeatures.first != null && self.chargefeatures.first.amount <= 0 ?
                            self.chargefeatures.first.amount = self.breakdown != null && self.breakdown.agency != null && self.breakdown.agency.net > 0 ?
                                Math.round(self.breakdown.agency.net * (15 / 100)) : 0 : null,
                        self.chargefeatures.second != null && self.chargefeatures.second.amount <= 0 ?
                            self.chargefeatures.second.amount = self.breakdown != null && self.breakdown.agency != null && self.breakdown.agency.net > 0 ?
                                Math.round(self.breakdown.agency.net * (85 / 100)) : 0 : null
                    );

                console.log('exiting...');
                next();
            });

    });

    function _loaddmc(booking, callback) {
        yourttoocore.list('Bookings2').model.populate(booking, [{ path: 'payments'}, { path: 'dmc' }], function (err, poped) {
            booking.dmc = poped.dmc;
            booking.payments = poped.payments;
            booking.cancelpolicy == null ? booking.cancelpolicy = { _es: '', _en: '' } : null;
            (booking.cancelpolicy._es == null || booking.cancelpolicy._es == '') && poped.dmc.membership != null && poped.dmc.membership.cancelpolicy != null ?
                (booking.cancelpolicy._es = poped.dmc.membership.cancelpolicy._es, booking.cancelpolicy._en = poped.dmc.membership.cancelpolicy._en) : null;
            callback(poped.dmc);
        });
    }

    Booking2.addPattern('standard meta');
    Booking2.defaultColumns = 'idBooking, pricing, iva, comission, createDate';
    Booking2.register(dbname);
}