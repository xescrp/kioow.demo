module.exports = function (url, member) {

    return {
        command: 'search2',
        request:
        {
            currency: 'EUR',
            maxresults: 12,
            orderby: 'pvp.b2b',
            ordinal: 'asc',
            sort: 'asc',
            page: 0,
            countries: ['56bcf2d398a07004105a049d'],
            cities: [],
            tags: [],
            b2bchannel: true,
            environment: 'yourttoo',
            oncompleteeventkey: 'search2.done',
            onerroreventkey: 'search2.error',
            auth: member
        },
        service: 'core',
        url: url
    };

}