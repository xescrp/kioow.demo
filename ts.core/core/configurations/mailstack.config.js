
var routes = require('../local.routes');

var configuration = {
        templatespath: routes.paths.public+'partials/transactional-emails',
        mailfrom: 'test@testmail.com',
        smtp: {
            service: 'Mandrill SMTP',
            host: 'smtp.mandrillapp.com',
            port: 587,
            auth: {
                user: 'username',
                pass: 'password'
            },
            apikey: 'apikey'
        }, 
        port: 8000
}
module.exports.configuration = configuration;