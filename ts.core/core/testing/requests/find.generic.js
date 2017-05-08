module.exports = function (url, member, options) {
    return {
        command: 'find',
        request: {
            query: options.query,
            oncompleteeventkey: 'find.done',
            onerroreventkey: 'find.error',
            populate: options.populate,
            collectionname: options.collectionname,
            fields: options.fields,
            sortcondition: options.sort,
            auth: member
        },
        url: url
    };
}