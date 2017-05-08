module.exports = function (url, member) {
    return {
        command: 'budget',
        request:
        {
            bookrequest:
            {
                date: {
                    "day": 31,
                    "month": 4,
                    "year": 2017
                },
                signup: {
                    "email": "",
                    "username": ".",
                    "phone": "",
                    "name": "",
                    "lastname": ""
                },
                productcode: 'ES5534740',
                bookingmodel: 'whitelabel',
                paymentmodel: 'tpv-100',
                roomdistribution: [
                    {
                        "name": "single",
                        "roomcode": "single",
                        "paxlist": [
                            {
                                "name": "",
                                "lastname": "",
                                "documentnumber": "",
                                "documenttype": "",
                                "holder": false,
                                "documentexpeditioncountry": "ES",
                                "country": "ES"
                            }
                        ]
                    }
                ],
                meetingdata: 'A meeting data text of example',
                observations: 'An observations data text of example',
                idbookingext: 'BOOKING-EXT-OMT133009'
            },
            oncompleteeventkey: 'budget.done',
            onerroreventkey: 'budget.error',
            environment: 'whitelabel',
            auth: member
        },
        service: 'core',
        url: url
    };
}