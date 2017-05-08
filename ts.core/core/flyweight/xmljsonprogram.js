module.exports = function (doc) {
    var _ = require('underscore');
    function _flyweight(programcopy) {
        var pt = {
            id: programcopy._id,
            code: programcopy.code,
            categoryname: programcopy.categoryname != null ? programcopy.categoryname.label_es || programcopy.categoryname.label_en : null,
            title: programcopy.title_es || programcopy.title,
            description: programcopy.description_es || programcopy.description_en,
            release: programcopy.release,
            notes: programcopy.important_txt_es || programcopy.important_txt_en,
            minpaxoperation: programcopy.included != null && programcopy.included.trip != null ? programcopy.included.trip.minpaxoperate : 1,
            canoperategroups: programcopy.included != null && programcopy.included.trip != null ? programcopy.included.trip.grouptrip : null,
            pvp: programcopy.pvp.b2b,
            net: programcopy.pvp.net,
            currency: programcopy.pvp.currency.value,
            itinerary: [],
            included: ['Hoteles, Régimen Alimenticio, Visitas y guías según se especifique o no, en el itinerario'],
            availability: []
        };
        //included 
        programcopy.included != null && programcopy.included.arrivaltransfer ?
            programcopy.included.arrivalassistance ? pt.included.push('Traslado de llegada con asistencia') : pt.included.push('Traslado de llegada')
            : null;
        programcopy.included != null && programcopy.included.departuretransfer ?
            programcopy.included.departureassistance ? pt.included.push('Traslado de salida con asistencia') : pt.included.push('Traslado de salida')
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.bus ? pt.included.push('Transporte entre ciudades - bus') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.domesticflight ? pt.included.push('Transporte entre ciudades - vuelo domestico') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.train ? pt.included.push('Transporte entre ciudades - tren') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.boat ? pt.included.push('Transporte entre ciudades - barco') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.van ? pt.included.push('Transporte entre ciudades - minivan') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.truck ? pt.included.push('Transporte entre ciudades - camion') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.privatecarwithdriver ? pt.included.push('Transporte entre ciudades - coche privado con counductor') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.privatecarwithdriverandguide ? pt.included.push('Transporte entre ciudades - coche privado con conductor y guía') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.fourxfour ? pt.included.push('Transporte entre ciudades - 4x4') : null
            : null;
        programcopy.included != null && programcopy.included.transportbetweencities && programcopy.included.transportbetweencities.included ?
            programcopy.included.transportbetweencities.other ? pt.included.push('Transporte entre ciudades - ' + programcopy.included.transportbetweencities.otherdescription) : null
            : null;
        programcopy.included != null && programcopy.included.tourescort && programcopy.included.tourescort.included ?
            programcopy.included.tourescort.language != null && programcopy.included.tourescort.language.spanish != null ? pt.included.push('Guia turistico - Español') : null
            : null;
        programcopy.included != null && programcopy.included.tourescort && programcopy.included.tourescort.included ?
            programcopy.included.tourescort.language != null && programcopy.included.tourescort.language.english != null ? pt.included.push('Guia turistico - Ingles') : null
            : null;
        programcopy.included != null && programcopy.included.tourescort && programcopy.included.tourescort.included ?
            programcopy.included.tourescort.language != null && programcopy.included.tourescort.language.french != null ? pt.included.push('Guia turistico - Frances') : null
            : null;
        programcopy.included != null && programcopy.included.tourescort && programcopy.included.tourescort.included ?
            programcopy.included.tourescort.language != null && programcopy.included.tourescort.language.german != null ? pt.included.push('Guia turistico - Aleman') : null
            : null;
        programcopy.included != null && programcopy.included.tourescort && programcopy.included.tourescort.included ?
            programcopy.included.tourescort.language != null && programcopy.included.tourescort.language.italian != null ? pt.included.push('Guia turistico - Italiano') : null
            : null;
        programcopy.included != null && programcopy.included.tourescort && programcopy.included.tourescort.included ?
            programcopy.included.tourescort.language != null && programcopy.included.tourescort.language.portuguese != null ? pt.included.push('Guia turistico - Portugues') : null
            : null;

        //programcopy.buildeditinerary != null && programcopy.buildeditinerary.meals != null ? 
        //itinerary
        pt.itinerary = programcopy.itinerary != null && programcopy.itinerary.length > 0 ? _.each(programcopy.itinerary, function (day) {
            var itday = {
                departure: day.departure != null ? { city: day.departure.city_es || day.departure.city, id: day.departure.cityid, countryid: day.departure.countryid, country: day.departure.country } : null,
                sleep: day.sleep != null ? { city: day.sleep.city_es || day.sleep.city, id: day.sleep.cityid, countryid: day.sleep.countryid, country: day.sleep.country } : null,
                stops: day.stopcities != null && day.stopcities.length > 0 ? _.map(day.stopcities, function (stop) {
                    return {
                        city: stop.city_es || stop.city, id: stop.cityid, countryid: stop.countryid, country: stop.country
                    }
                }) : null,
                hotel: day.hotel != null ? day.hotel : null,
                activities: day.activities != null && day.activities.length > 0 ? _.map(day.activities, function (act) {
                    return {
                        title: act.title_es || act.title,
                        group: act.group,
                        ticketsincluded: act.ticketsincluded,
                        localguide: act.localguide,
                        languages: act.language
                    }
                }) : null
            }
        }) : null;
        //avail
        pt.availability = programcopy.availability != null && programcopy.availability.length > 0 ? _.each(programcopy.availability, function (availyear) {
            return {
                year: availyear.year,
                months: [
                    {
                        month: 'January', days: _.map(
                            _.filter(availyear.January.availability, function (avday) {
                                return avday != null && avday.available;
                        }), function (avail) {
                            return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'February', days: _.map(
                            _.filter(availyear.February.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'March', days: _.map(
                            _.filter(availyear.March.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'April', days: _.map(
                            _.filter(availyear.April.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'May', days: _.map(
                            _.filter(availyear.May.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'June', days: _.map(
                            _.filter(availyear.June.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'July', days: _.map(
                            _.filter(availyear.July.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'August', days: _.map(
                            _.filter(availyear.August.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'September', days: _.map(
                            _.filter(availyear.September.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'October', days: _.map(
                            _.filter(availyear.October.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'November', days: _.map(
                            _.filter(availyear.December.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    },
                    {
                        month: 'December', days: _.map(
                            _.filter(availyear.November.availability, function (avday) {
                                return avday != null && avday.available;
                            }), function (avail) {
                                return {
                                    day: avail.day,
                                    single: avail.rooms != null && avail.rooms.single != null ? avail.rooms.single.price : 0,
                                    double: avail.rooms != null && avail.rooms.double != null ? avail.rooms.double.price : 0,
                                    triple: avail.rooms != null && avail.rooms.triple != null ? avail.rooms.triple.price : 0,
                                };
                            }),
                    }
                ]
            };
        }) : null;
        //provider
        pt.provider = programcopy.dmc != null ? {
            code: programcopy.dmc.code,
            //description: programcopy.dmc != null && programcopy.dmc.additionalinfo != null && programcopy.dmc.additionalinfo.description != null ? programcopy.additionalinfo.description : null,
            company: {
                name: programcopy.dmc.company.name
            },
            membership: {
                cancelpolicy: programcopy.dmc.membership != null ? programcopy.dmc.membership.cancelpolicy : null
            }
        } : null;
        return pt;
    }

    var prdcopy = doc != null ? typeof (doc.toObject) === 'function' ?  doc.toObject() : doc : null;
    var prd = null;

    prd = prdcopy != null ? _flyweight(prdcopy) : null;

    return prd;    
}