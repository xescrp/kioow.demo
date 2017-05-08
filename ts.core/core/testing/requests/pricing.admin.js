module.exports = function (url, member) {
    return {
        command: 'pricing',
        request: {
            bookpricing: {
                idbooking: '001893RY',
                paxes: [
                    {
                        "name": "sadsad",
                        "slug": "sadsad-9f4410ad-3907-48db-cd27-38118820cfa3",
                        "lastname": "asd",
                        "birthdate": "1984-12-31T23:00:00.000Z",
                        "documentnumber": "sadsadsa",
                        "documenttype": "nie",
                        "holder": true,
                        "price": 763,
                        "net": 700,
                        "dmc": 628, 
                        "room": "double",
                        "_id": "5873e18cc3d305b84b19eaf9",
                        "documentexpeditioncountry": {
                            "slug": "es",
                            "label_en": "Spain",
                            "label_es": "España"
                        },
                        "$$hashKey": "object:67"
                    },
                    {
                        "name": "asdasd",
                        "slug": "asdasd-54b06e69-cd27-4304-d565-680096493139",
                        "lastname": "asdsad",
                        "birthdate": "1984-12-31T23:00:00.000Z",
                        "documentnumber": "sadsadsad",
                        "documenttype": "dni/nif",
                        "holder": false,
                        "price": 763,
                        "net": 700,
                        "dmc": 628, 
                        "room" : "double",
                        "_id": "5873e18cc3d305b84b19eafa",
                        "documentexpeditioncountry": {
                            "slug": "es",
                            "label_en": "Spain",
                            "label_es": "España"
                        },
                        "$$hashKey": "object:68"
                    }
                ],
                rooms: [
                    {
                        "dmc": 1256,
                        "dmcperpax": 628,
                        "net": 1294,
                        "netperpax": 647,
                        "priceperpax": 763,
                        "price": 1526,
                        "roomcode": "double",
                        "name": "double",
                        "_id": "5873e18cc3d305b84b19eafb",
                        "paxlist": [
                            "sadsad-9f4410ad-3907-48db-cd27-38118820cfa3",
                            "asdasd-54b06e69-cd27-4304-d565-680096493139"
                        ],
                        "$$hashKey": "object: 37"
                    }
                ],
                //fee: 18,
                //onlyfee: true
            },
            auth: member
        },
        url: url
    };
}