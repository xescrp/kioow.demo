module.exports = function (url, member) {
    return {
        command: 'distinct',
        request: {
            fields: ['messages.from', 'messages.to'],
            oncompleteeventkey: 'distinct.done',
            onerroreventkey: 'distinct.error',
            collectionname: 'Chats',
            auth: member
        },
        url: url
    };
}