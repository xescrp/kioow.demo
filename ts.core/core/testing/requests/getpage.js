
module.exports = function (url, member) {
    return {
        command: 'find',
        request: {
            query: { slug: 'ventajas-agencia' },
            populate:
            [{ path: 'categories' },
                { path: 'profile' },
                { path: 'author' }],
            oncompleteeventkey: 'find.done',
            onerroreventkey: 'find.error',
            collectionname: 'Page',
            auth: member
        },
        url: url
    };
}