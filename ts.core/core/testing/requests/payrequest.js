module.exports = function (url, member) {
    return {
        command: 'pay',
        request: {
            paymentdata: {
                action: 'pay',
                paymentmethod: 'transfer',
                transferid: 'RT/220488-XQ',
                target: 'provider',
                date: new Date(),
                amount: 550,
                currency: {
                    label: 'Euro',
                    value: 'EUR',
                    symbol: '€'
                }
            },
            idbooking: '001657RY',
            auth: member
        },
        url: url
    };
}