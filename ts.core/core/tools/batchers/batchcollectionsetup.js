module.exports = function (collection) {
    var collectionname = collection || 'default';
    var common = require('yourttoo.common');

    var setup = {
        Bookings: {
            query: { _id: { $ne: null }, idBooking: { $ne: null } },
            fields: null,
            populate: [{ path: 'affiliate' }, { path: 'dmc' }, { path: 'traveler' }, { path: 'flights' }]
        },
        DMCProducts: {
            query: { _id: { $ne: null }, code: { $ne: null } },
            //query: { code: 'EC17031' },
            fields: null,
            populate: [{ path: 'dmc' }]
        },
        UserQueries: {
            query: { _id: { $ne: null }, code: { $ne: null } },
            fields: null,
            populate: [{ path: 'affiliate' }, { path: 'dmcs' }, { path: 'quotes' }, { path: 'chats' }]
        },
        Quotes: {
            query: { _id: { $ne: null }, code: { $ne: null } },
            fields: null,
            populate: [{ path: 'chats' }]
        },
        Affiliate: {
            query: {
                'company.group': common.utils.mp_conjunctive_regex('AIRMET'),
                $or: [{ 'membership.registervalid': null },
                        { 'membership.registervalid': false }] 
            },
            fields: null,
            populate: [{ path: 'user' }, { path: 'wlcustom' }],
            max: 1
        },
        "default" : {
            query: null,
            fields: null,
            populate: null
        }
    };
    var selected = setup[collection] || setup['default'];
    return selected;
}