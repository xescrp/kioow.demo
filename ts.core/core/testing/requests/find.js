module.exports = function (url, member) {
    return {
        command: 'findone',
        request: {
            query: { idBooking: '001893RY'  },
            oncompleteeventkey: 'findone.done',
            onerroreventkey: 'findone.error',
            populate: [{ path: 'products', populate: [{ path: 'dmc', model: 'DMCs' }] }, { path: 'dmc' }, { path: 'traveler' },
                { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
                { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
                { path: 'invoices' }, { path: 'relatedbooking' } ],
            collectionname: 'Bookings2',
            auth: member
        },
        url: url
    };
}