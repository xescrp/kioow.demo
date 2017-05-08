module.exports = function (conf, callback) {
    console.log('booking - adding payments...');
    var core = conf.core;
    var common = require('yourttoo.common');
    var _ = require('underscore');
    var affiliate = conf.affiliate;
    var quoterequest = conf.quoterequest;
    var comission = conf.comission || 0;
    
    var group = conf.group || false;
    var fee = 0;
    fee = affiliate != null && affiliate.fees != null ? affiliate.fees.tailormade || affiliate.fees.unique : 0;
    fee = group ? affiliate.fees.groups : fee;
    fee = conf.fee || fee;

    var pricing = {
        currency: conf.selectedcurrency,
        exchange: conf.exchanges,
        comission: comission,
        fee: fee,
        net: 0,
        amount: 0,
        pvp: 0,
        children: {
            net: 0,
            amount: 0,
            pvp: 0
        },
        rooms: {
            single: {
                count: 0,
                net: 0,
                amount: 0,
                pvp: 0
            },
            double: {
                count: 0,
                net: 0,
                amount: 0,
                pvp: 0
            },
            triple: {
                count: 0,
                net: 0,
                amount: 0,
                pvp: 0
            },
            quad: {
                count: 0,
                net: 0,
                amount: 0,
                pvp: 0
            },
            children: null
        }
    };
    //SINGLE
    var single = conf.quoterequest.rooms.single != null && conf.quoterequest.rooms.single.quantity > 0 ? conf.quoterequest.rooms.single.net : 0;
    var totalsingle = conf.quoterequest.rooms.single != null && conf.quoterequest.rooms.single.quantity > 0 ? conf.quoterequest.rooms.single.quantity * conf.quoterequest.rooms.single.net : 0;
    pricing.rooms.single.count = conf.quoterequest.rooms.single != null && conf.quoterequest.rooms.single.quantity > 0 ? conf.quoterequest.rooms.single.quantity : 0;
    pricing.rooms.single.net = single;
    pricing.rooms.single.amount = Math.round(single / (1 - (pricing.comission/100)));
    pricing.rooms.single.pvp = Math.round(pricing.rooms.single.amount /(1 - (fee/100)));
    //DOUBLE
    var double = conf.quoterequest.rooms.double != null && conf.quoterequest.rooms.double.quantity > 0 ? conf.quoterequest.rooms.double.net : 0;
    var totaldouble = conf.quoterequest.rooms.double != null && conf.quoterequest.rooms.double.quantity > 0 ? (conf.quoterequest.rooms.double.quantity * conf.quoterequest.rooms.double.net) * 2 : 0;
    pricing.rooms.double.count = conf.quoterequest.rooms.double != null && conf.quoterequest.rooms.double.quantity > 0 ? conf.quoterequest.rooms.double.quantity : 0;
    pricing.rooms.double.net = double;
    pricing.rooms.double.amount = Math.round(double / (1 - (pricing.comission / 100)));
    pricing.rooms.double.pvp = Math.round(pricing.rooms.double.amount / (1 - (fee / 100)));
    //TRIPLE
    var triple = conf.quoterequest.rooms.triple != null && conf.quoterequest.rooms.triple.quantity > 0 ? conf.quoterequest.rooms.triple.net : 0;
    var totaltriple = conf.quoterequest.rooms.triple != null && conf.quoterequest.rooms.triple.quantity > 0 ? (conf.quoterequest.rooms.triple.quantity * conf.quoterequest.rooms.triple.net) * 3 : 0;
    pricing.rooms.triple.count = conf.quoterequest.rooms.triple != null && conf.quoterequest.rooms.triple.quantity > 0 ? conf.quoterequest.rooms.triple.quantity : 0;
    pricing.rooms.triple.net = triple;
    pricing.rooms.triple.amount = Math.round(triple / (1 - (pricing.comission / 100)));
    pricing.rooms.triple.pvp = Math.round(pricing.rooms.triple.amount / (1 - (fee / 100)));
    //QUAD
    var quad = conf.quoterequest.rooms.quad != null && conf.quoterequest.rooms.quad.quantity > 0 ? conf.quoterequest.rooms.quad.net : 0;
    var totalquad = conf.quoterequest.rooms.quad != null && conf.quoterequest.rooms.quad.quantity > 0 ? (conf.quoterequest.rooms.quad.quantity * conf.quoterequest.rooms.quad.net) * 4 : 0;
    pricing.rooms.quad.count = conf.quoterequest.rooms.quad != null && conf.quoterequest.rooms.quad.quantity > 0 ? conf.quoterequest.rooms.quad.quantity : 0;
    pricing.rooms.quad.net = quad;
    pricing.rooms.quad.amount = Math.round(quad / (1 - (pricing.comission / 100)));
    pricing.rooms.quad.pvp = Math.round(pricing.rooms.quad.amount / (1 - (fee / 100)));
    //CHILDREN
    var totalchild = conf.quoterequest.rooms.children != null && conf.quoterequest.rooms.children.length > 0 ? _.reduce(conf.quoterequest.rooms.children, function (memo, current) { return memo + current.net }, 0) : 0;
    pricing.rooms.children = conf.quoterequest.rooms.children != null && conf.quoterequest.rooms.children.length > 0 ? _.map(conf.quoterequest.rooms.children, function (child) {
        return {
            net: child.net,
            amount: Math.round(child.net / (1 - (pricing.comission / 100))),
            pvp: Math.round(Math.round(child.net / (1 - (pricing.comission / 100))) / (1 - (fee / 100))),
            age: child.age
        };
    }) : null;
    pricing.children.net = totalchild;
    pricing.children.amount = totalchild + Math.round((totalchild * pricing.comission) / 100);
    pricing.children.pvp = totalchild + Math.round((totalchild * fee) / 100);
    //AMOUNTS
    pricing.net = totalsingle + totaldouble + totaltriple + totalquad + totalchild; //NETO DMC
    pricing.amount = Math.round(pricing.net / (1 - (pricing.comission / 100))); //NET AAVV
    pricing.pvp = Math.round(pricing.amount / (1 - (fee / 100))); //PVP AAVV

    conf.results = pricing;

    setImmediate(function () {
        callback(null, conf);
    });
}