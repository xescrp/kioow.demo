module.exports = function (url, member) {

    return {
        command: 'inspiration',
        request:
        {
            currency: 'EUR',
            tag: 'community-base',
            b2cchannel: true,
            environment: 'whitelabel',
            oncompleteeventkey: 'inspiration.done',
            onerroreventkey: 'inspiration.error',
            auth: member
        },
        service: 'core',
        url: url
    };

}