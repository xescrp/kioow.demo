module.exports = function (url, member, options) {
    return {
        command: 'findone',
        request: {
            query: options.query,
            oncompleteeventkey: 'findone.done',
            onerroreventkey: 'findone.error',
            populate: options.populate,
            collectionname: options.collectionname,
            fields: options.fields,
            sortcondition: options.sort,
            auth: member
        },
        url: url
    };
}