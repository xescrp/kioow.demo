module.exports = function (url, member) {
    return {
        command: 'list2',
        request: {
            "query": {
                "$and": [
                    {
                        "_id": {
                            "$ne": null
                        }
                    },
                    {
                        "bookingmodel": {
                            "$ne": "budget"
                        }
                    }
                ]
            },
            "fields": [
                "_id",
                "idBooking",
                "idBookingExt",
                "code",
                "agentid",
                "agencyid",
                "bookingmodel",
                "paymentmodel",
                "dates",
                "previousstatus",
                "status",
                "chargestatus",
                "paystatusprovider",
                "paystatusagency",
                "startdateindexing",
                "enddateindexing",
                "createdonindexing",
                "affiliateindexing",
                "dmcindexing",
                "destinationindexing",
                "paxindexing",
                "textindexing",
                "products",
                "dmc",
                "affiliate",
                "query",
                "quote",
                "stories",
                "signin",
                "pricing",
                "paxes",
                "rooms",
                "createdOn",
                "updatedOn"
            ],
            "populate": [
                {
                    "path": "products",
                    "select": "_id code name title title_es slug slug_es _id itinerary sleepcountry sleepcity"
                },
                {
                    "path": "dmc",
                    "select": "_id code name company membership currency"
                },
                {
                    "path": "traveler"
                },
                {
                    "path": "affiliate",
                    "select": "_id code name company"
                },
                {
                    "path": "query"
                },
                {
                    "path": "quote"
                },
                {
                    "path": "payments"
                },
                {
                    "path": "stories"
                },
                {
                    "path": "signin"
                },
                {
                    "path": "invoices"
                },
                {
                    "path": "relatedbooking"
                }
            ],
            "collectionname": "Bookings2",
            "maxresults": 20,
            "orderby": "createdOn",
            "type": "desc",
            "page": 0,
            oncompleteeventkey: 'list2.done',
            onerroreventkey: 'list2.error',
            environment: 'yourttoo',
            auth: member
        },
        service: 'core',
        url: url
    }
}