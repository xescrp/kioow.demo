(function () {
    'use strict';

    app
        .factory('StringUtils', StringUtils);

    StringUtils.$inject = [];

    /* @ngInject */
    function StringUtils() {
        var service = {
            emailIsValid: emailIsValid,
            emailsAreEqual: emailsAreEqual
        };

        return service;

        function emailIsValid(email) {
            var emailValidationRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
            return emailValidationRegex.test(email);
        }

        function emailsAreEqual(email, confirmationEmail){
            return email === confirmationEmail;
        }
    }

})();