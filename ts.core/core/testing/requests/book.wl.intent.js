

module.exports = function (url, member) {
    return {
        command: 'book2',
        request:
        {
            bookrequest:
            {
                "date": {
                    "day": 29,
                    "month": 2,
                    "year": 2017
                },
                "signup": {
                    "email": "xisco@hotmail.com",
                    "username": "wqewqe.sdasda",
                    "phone": "324234532543",
                    "name": "wqewqe",
                    "lastname": "sdasda",
                    "nif": "543534543543"
                },
                "productcode": "ES5534740",
                "bookingmodel": "whitelabel",
                "paymentmodel": "tpv-100",
                "roomdistribution": [
                    {
                        "name": "single",
                        "roomcode": "single",
                        "paxlist": [
                            {
                                "name": "sdfsdfsdf",
                                "lastname": "sdfsdfsdf",
                                "documentnumber": "sadfdssdfsdfsdf",
                                "documenttype": "dni/nif",
                                "holder": false,
                                "documentexpeditioncountry": "ES",
                                "birthdate": "1985-01-13T23:00:00.000Z",
                                "country": "ES"
                            }
                        ]
                    }
                ],
                "meetingdata": "dfsdfsdfdsfsfsdfdsfs",
                "observations": "",
                "idbookingext": "BOOKING-EXT-OMT133009"
            },
            oncompleteeventkey: 'book2.done',
            onerroreventkey: 'book2.error',
            environment: 'yourttoo',
            auth: member
        },
        service: 'core',
        url: url
    };
}


