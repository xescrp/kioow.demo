
module.exports = function (url, member) {
    return {
        command: 'book2',
        request:
        {
            bookrequest:
            {
                "date": {
                    "day": 11,
                    "month": 4,
                    "year": 2017
                },
                "signup": {
                    "email": "ksdmk@oop.com",
                    "username": "xisco.prueba1",
                    "phone": "xxxxx-xxx",
                    "name": "xisco",
                    "lastname": "prueba1"
                },
                "productcode": "OMT276660",
                "bookingmodel": "bookingb2b",
                "paymentmodel": "transfer-100",
                "roomdistribution": [
                    {
                        "name": "single",
                        "roomcode": "single",
                        "paxlist": [
                            {
                                "name": "sddsa",
                                "lastname": "sadasd",
                                "documentnumber": "sadsadsad",
                                "documenttype": "dni/nif",
                                "holder": false,
                                "documentexpeditioncountry": "ES",
                                "birthdate": "1984-12-31T23:00:00.000Z",
                                "country": "ES"
                            }
                        ]
                    }
                ],
                "idBookingExt": "sdsdsd",
                "agentid": "sdsdsd",
                "meetingdata": "aaasdsdssdsd",
                "fee": 15,
                "quote": null
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

