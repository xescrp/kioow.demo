module.exports = function (options, callback, errorcallback) {
    var common = require('yourttoo.common');
    var core = options.core;
    var helper = require('../core/helpers');
    var mongo = core.mongo;
    var coreobj = core.corebase;
    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    var sourcebooking = options.booking;
    var member = options.auth;
    var bookproduct = options.product;

    var sourceproduct = null;

    var fees = null;
    var roomDistribution = options.roomDistribution;
    var exchanges = null;
    var currencys = common.staticdata.currencys;
    var m_currentcurrency = 'EUR';
    var currentcurrency = null;
    var dateToStart = options.date;
    
    //exportable candidates...
    var datesPool = {
        start: {},
        end: {},
        finalpayment: null
    };
    var paymentoption = {
        '28before' : 28 + 7,
        '21before': 21 + 7,
        '14before': 14 + 7,
        '7before': 7 + 7,
        'arrival': 7,
        'departure': 7,
        'default': 30
    };

    inputvalidations = [
        function () { //date input is ok
            var ok = (dateToStart != null && dateToStart.day != null && dateToStart.month != null && dateToStart.year != null);
            (!ok) ? valid.messages.push('the date input field is not valid. the correct form of this field is { day: , month: , year: }') 
            : null;
            return ok;
        },
        function () { //roomDistribution is not empty
            var ok = roomDistribution != null && roomDistribution.length > 0;
            (!ok) ? 
            valid.messages.push('no room distribution detected. please check the value for roomDistribution parameter on your request.') 
            : null;
            return ok;
        }
    ];
    
    datavalidations = [
        function () {
            var ok = options.fractionated ? canBookfractionatedPayment(datesPool.start, sourceproduct.dmc.membership.paymentoption.slug) 
            : true;
            (!ok) ? valid.messages.push('The option of fractionated payment is not available for this booking.') : null;
            return ok;
        }
    ];
    

    //validation...
    function checkInput() {
        var valid = {
            ok: true,
            messages: []
        };
        valid.ok = _.every(inputvalidations, function (validate) { return validate(); });
        return valid;
    }
    
    function checkData() {
        var valid = {
            ok: true,
            messages: []
        };
        valid.ok = _.every(datavalidations, function (validate) { return validate(); });
        return valid;
    }
    
    //fetch...
    function getCurrencyExchanges() {
        helper.getExchangeCurrency(core, function (data) {
            exchanges = data;
            var fcr = _.filter(currencys, function (currency) {
                return currency.value == m_currentcurrency;
            });
            if (fcr != null && fcr.length > 0) {
                currentcurrency = fcr[0];
            }
            cev.emit('exchanges.builded', exchanges);
        });
    }
    
    //structure...
    function canBookfractionatedPayment(dateSelected, paymentoptionslug) {
        var dateSelected = dateSelected; // date selected to book
        var dateNow = new Date(); // actual date
        var restDays = paymentoption[paymentoptionslug] || paymentoption.default; // by default 30 days is the min margin
        dateNow.setDate(dateNow.getDate() + restDays);

        return dateSelected > dateNow;
    }

    function buildDates() {
        var paycondition = sourceproduct.dmc.membership.paymentoption.slug || 'default';

        var start = new Date(dateToStart.year, dateToStart.month, dateToStart.day);
        var end = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        var final = new Date(dateToStart.year, dateToStart.month, dateToStart.day - paymentoption[paycondition]);
        end.setDate(end.getDate() + sourceproduct.itinerary.length);

        datesPool.start = {
            year: start.getFullYear(),
            month: start.getMonth(),
            day: start.getDate(),
            monthname_en: common.utils.getMonthNameEnglish(start.getMonth()),
            monthname_es: common.utils.getMonthNameSpanish(start.getMonth())
        };
        datesPool.end = {
            year: end.getFullYear(),
            month: end.getMonth(),
            day: end.getDate(),
            monthname_en: common.utils.getMonthNameEnglish(end.getMonth()),
            monthname_es: common.utils.getMonthNameSpanish(end.getMonth())
        };
        datesPool.finalpayment = final;
    }

    var rq = {
        date: {
            "day": 31, // (*) {Number} day [1-31] values
            "month": 4, // (*) {Number} month  [0-11] values
            "year": 2016 // (*) {Number} year [yyyy]
        },
        productCode: options.productCode, // (*) {String} product code to book
        product: '', // (*) {Object} full product Object
        roomDistribution : [ // (*) {Object} Array of Rooms
            {
                roomCode : "triple", // (*) {String} 3 posibilities: ['single', 'double', 'triple']
                paxList : [
                    {
                        //Pax 1 in a single, double and triple room
                        name : "", // (*) {String} First Name Pax
                        lastName : "", // (*) {String} Last Name Pax
                        birdthDate : "", // (*) {String} format dd: day, MM: month, yyyy: year
                        documentType : "", // (*) {String} 3 posibilities: ['dni/nif', 'nie', 'passport']
                        documentNumber : "", // (*) {String} Document Number
                        country : {
                            // (*) nationality of passanger can get full list from  http://www.yourttoo.com/data/nationalities.json
                            countrycode: ""// (*) {String} two leters country code
                        }
                    },
                    {
                        // Pax 2 in a double and triple room. Example:
                        name : "Juan",
                        lastName : "Gomez",
                        birdthDate : "21-05-1985",
                        documentType : "dni/nif",
                        documentNumber : "3333333L",
                        holder : false,
                        country : {
                            countrycode : "ES"
                        }
                    },
                    {
                        // Pax 3 in a triple room. Example:
                        name : "Isabella",
                        lastName : "Conti",
                        birdthDate : "18-03-1985",
                        documentType : "passport",
                        documentNumber : "A4993939",
                        holder : false,
                        country : {
                            countrycode : "IT"
                        }
                    }
                ]
            }
        ],
        meetingdata: '', // {String} if you need to add information about meting with DMC
        affiliateobservations : '', // {String} Info or comments to yourttoo.com admin
        affiliateuser: '', // {String} free use, (usually for agent name)
        idBookingExt : '', // {String} your booking code
        fractionated : false // {Boolean} if you want fractionated payment See [Payment Options](#payment)
    }
    
    cev.on('bookingmodel.ready', function (product, booking) {
        _.each(booking.roomDistribution, function (room, index) {
            index == 0 ? room.holder = true : null;

        });
    });
    
    cev.on('product.ready', function (product) { 
        sourceproduct = product;
        var booking = coreobj.list('Bookings').model({
            status : "",
            amount : {
                value: 0,
                currency : product.dmc.currency,
                exchange : {
                    value: 0,
                    currency : currentcurrency
                }
            },		
            netPrice : {
                value: 0,
                currency : product.dmc.currency,
                exchange : {
                    value: 0,
                    currency: currentcurrency
                }
            },
            priceperperson : null,
            comission : product.dmc.membership.commission,
            b2bcommission : product.dmc.membership.b2bcommission,
            start : datesPool.start,
            end : datesPool.end,
            productDmc : product._id,
            traveler : (member != null && member.user.isTraveler) ? member : null,
            affiliate: (member != null && member.user.isAffiliate) ? member : null,
            dmc : product.dmc,
            createDate : new Date(),
            fees: (member != null && member.user.isAffiliate) ? member.fees : null,
            isB2C : !member.user.isAffiliate,
            isGroup: false,
            roomDistribution : roomDistribution,
            timeZone : {
                label : "(GMT+01:00) Madrid",
                useDaylightTime : "0",
                value : "+1"
            },
            payStatus : [ 
            ],
            productCode : options.productCode,
            product : JSON.stringify(bookproduct),	    
            acceptcancell : true,
            acceptgeneral : true,
            userinvoicedata : {
                wantinvoice : false,
                name : "",
                city : "",
                cp : "",
                idnumber : "",
                address : "",
                country : {}
            },
            content : '',
            toConfirm : false,
            meetingdata : options.meetingdata, // transfer information
            affiliateobservations : options.affiliateobservations, // comments to yto admin
            affiliateuser : options.affiliateuser, // agent or user dif to account 
            idBookingExt: options.idBookingExt, // Expediente AAVV
            holder: "",
            finalDatePaymentAffiliate: null
        });
    });

    cev.on('product.found', function (product) { 
        product = require('../../decorator/priceexchangesync')({
            document: product, currency: m_currentcurrency, 
            exchanges: exchanges, currentcurrency: currentcurrency
        });
        require('../../decorator/product.affiliate.price')({
            core: core, document: product, loggeduser: options.auth
        }, function (document) { //found product OK
            product = document;
            cev.emit('product.ready', document);
        }, function (err) { //found product Error
            cev.emit('all.error', err);
        });
    });
    
    cev.on('exchanges.builded', function (exchanges) {
        //get product first
        coreobj.list('DMCProducts').model.find({ code: options.productCode })
        .populate('dmc')
        .exec(function (err, docs) {
            err != null ? 
            process.nextTick(function () {
                cev.emit('all.error', err)
            }) 
            : 
            process.nextTick(function () {
                var product = (docs != null && docs.length > 0) ? docs[0] : null;
                product != null ? cev.emit('all.error', 'Product not found!') : cev.emit('product.found', product);
            });
        });
    });
    
    cev.on('all.error', function (err) {
        errorcallback(err);
    });
    
    cev.on('all.done', function (result) {
        callback(result);
    });

    cev.on('booking.proceed', function () {
        getCurrencyExchanges();
    });

    var in_valid = checkInput();
    in_valid.ok ? cev.emit('booking.proceed') : cev.emit('all.error', validation.messages.join('\r\n'));
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    cev.on('saved.ok', function (hdata) {
        var mmed = require('../../mediator/hermes.mediator');
        var mediator = new mmed.HermesMediator();
        
        var action = 'new';
        var subject = mediator.getsubject('Bookings');

        console.log('notify hermes subject: ' + subject);
        var commandkey = 'notify.suscribers';
        var hrq = {
            subject: subject,
            action: action,
            data: hdata,
            oncompleteeventkey: 'notify.suscribers.done',
            onerroreventkey: 'notify.suscribers.error'
        };
        
        mediator.send(commandkey, hrq, function (result) {
            console.log('Hermes ' + subject + ' notified event: ' + hrq.action);
        });

    });

    cev.on('ready.beforesave', function (booking) {
        booking.save(function (err, doc) { 
            err != null ? cev.emit('all.error', err) : cev.emit('ready.aftersave', doc);
        });
    });
    
    cev.on('ready.aftersave', function (booking) {
        (options.populate != null) ?
            coreobj.list('Bookings').model.populate(booking, options.populate, function (err, booking) { 
                cev.emit('saved.ok', booking);
            })
        : cev.emit('saved.ok', booking);
        cev.emit('all.done', booking);
    });



    if (sourcebooking != null) { 
        require('../../factory/codesgenerator')(mongo, 'Bookings', function (cbcode) {
            //reformat the code 
            cbcode = require('../../factory/codesformatter')({
                code: cbcode,
                collectionname: 'Bookings',
                document: sourcebooking
            });
           
            sourcebooking.idBooking = cbcode;
            var booking = mongo.getmodel({ collectionname: 'Bookings', modelobject: sourcebooking });
            
            //cev.emit('ready.beforesave', booking);
            //recalculate...
            var decoratorswitch = (booking.affiliate != null) ? 'affiliate' : 'dmc';
            var decoratorname = ['bookingprice', decoratorswitch].join('.');
            require('../../decorator/' + decoratorname)({ core: coreobj, booking: booking }, 
                function (booking) { cev.emit('ready.beforesave', booking); }, 
                function (err) { cev.emit('all.error', err); });
        });
    }
    else {
        var err = 'You can not save empty data, please review your request, [booking] field is null or not defined';
        cev.emit('all.error', err);
    }

}