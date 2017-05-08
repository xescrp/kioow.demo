var _ = require('underscore');
module.exports = function (yourttoocore, dbname) {
    var Types = yourttoocore.Field.Types;

    var Signin = new yourttoocore.List('SigninRegister', {
        // use nodelete to prevent people from deleting the demo admin user
        nodelete: true
    });

    Signin.add({
        code: { type: String,  index: true },
        username: { type: String, index: true },
        name: { type: String, index: true },
        lastname: { type: String, index: true },
        email: { type: Types.Email, initial: true, index: true },
        phone: { type: String, index: true },
        kind: { type: String, index: true },
        nif: { type: String, index: true }
    });

    Signin.addPattern('standard meta');
    Signin.defaultColumns = 'username, email, name';
    Signin.register(dbname);
}