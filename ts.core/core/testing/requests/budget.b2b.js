module.exports = function (url, member) {
    return {
        command: 'budget',
        request:
        {
            bookrequest:
            {
                "date": {
                    "day": 30,
                    "month": 5,
                    "year": 2017
                },
                "signup": {
                    "email": null,
                    "username": "xisco.prueba1",
                    "phone": "xxxxx-xxx",
                    "name": "xisco",
                    "lastname": "prueba1"
                },
                "productcode": "ES5534740",
                "bookingmodel": "bookingb2b",
                "paymentmodel": "transfer-100",
                "roomdistribution": [
                    {
                        "name": "double",
                        "roomcode": "double",
                        "paxlist": [
                            {
                                "name": "",
                                "lastname": "",
                                "documentnumber": "",
                                "documenttype": "",
                                "holder": false,
                                "documentexpeditioncountry": "ES",
                                "birthdate": "1984-12-31T23:00:00.000Z",
                                "country": "ES"
                            },
                            {
                                "name": "",
                                "lastname": "",
                                "documentnumber": "",
                                "documenttype": "",
                                "holder": false,
                                "documentexpeditioncountry": "ES",
                                "birthdate": "1984-12-31T23:00:00.000Z",
                                "country": "ES"
                            }
                        ]
                    }
                ],
                "idBookingExt": "",
                "agentid": "",
                "meetingdata": "",
                "fee": 10,
                "savebudget": true,
                "quote": null
            },
            oncompleteeventkey: 'budget.done',
            onerroreventkey: 'budget.error',
            environment: 'yourttoo',
            auth: member
        },
        service: 'core',
        url: url
    };
}