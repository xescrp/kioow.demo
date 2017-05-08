module.exports = function (url, member) {
    return {
        command: 'distinct',
        request: {
            fields: ['slug', 'slug_es', 'title_es'],
            oncompleteeventkey: 'distinct.done',
            onerroreventkey: 'distinct.error',
            collectionname: 'DMCProducts',
            auth: member
        },
        url: url
    };
}