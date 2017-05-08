module.exports = function (conf, callback) {
    console.log('quotation - validate input data...');
    var common = require('yourttoo.common');
    var _ = require('underscore');

    var assert = {
        noexceptions: true,
        rooms: true,
        messages: []
    };

    noexceptions = [
        function () {
            conf.quoterequest != null && conf.quoterequest.rooms != null ? null : assert.messages.push('No room data available on your request');
            return conf.quoterequest != null && conf.quoterequest.rooms != null;
        },
        function () {
            conf.dmccode != null && conf.dmccode != '' ? null : assert.messages.push('The DMC code is needed to get the quotation');
            return conf.dmccode != null && conf.dmccode != '';
        },
        function () {
            conf.comission != null && conf.comission >= 0 ? null : assert.messages.push('Comission for OMT can not be less than 0');
            return conf.comission != null && conf.comission >= 0;
        },
    ];

    roomvalidations = [
        function () {
            var ok = conf.quoterequest.rooms.single != null && conf.quoterequest.rooms.single.quantity > 0 && conf.quoterequest.rooms.single.net > 0;
            return ok;
        },
        function () {
            var ok = conf.quoterequest.rooms.double != null && conf.quoterequest.rooms.double.quantity > 0 && conf.quoterequest.rooms.double.net > 0;
            return ok;
        },
        function () {
            var ok = conf.quoterequest.rooms.triple != null && conf.quoterequest.rooms.triple.quantity > 0 && conf.quoterequest.rooms.triple.net > 0;
            return ok;
        },
        function () {
            var ok = conf.quoterequest.rooms.quad != null && conf.quoterequest.rooms.quad.quantity > 0 && conf.quoterequest.rooms.quad.net > 0;
            return ok;
        }
    ];

    //assertions
    assert.noexceptions = _.every(noexceptions, function (validate) { return validate(); });
    assert.noexceptions ? assert.roomvalidations = _.some(roomvalidations, function (validate) { return validate(); }) :null;
    assert.roomvalidations == false ? assert.messages.push('You need to put price on a room type at least') : null;
    //last assertion
    assert.noexceptions && assert.roomvalidations ? setImmediate(function () {
        callback(null, conf);
    }) : setImmediate(function () {
        callback({ message: 'Request data no valid', stack: assert.messages.join('\n') }, conf);
    });
}