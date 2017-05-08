var app = angular.module("openMarketTravelApp");

app.controller('authLoginCtrl', ['$scope', 'tools_service', 'yto_api', 'toaster', 
    function ($scope, tools_service, yto_api, toaster) {
        
        $scope.login = {
            email: '',
            password: '',
            iamnew: false,
            sociallogged: false,
            sessiondata: null
        };
        $scope.errorLogin = false;
        $scope.lang = 'ES';

        $scope.dologin = function () {
            var errors = [];
            $scope.waiting = true;
            $scope.errorLogin = false;
            if ($scope.login.email == null || $scope.login.email == '') { 
                //errors.push('You must provide your email to log in.');
                errors.push('Es obligatorio introducir un email valido.');
            }
            if ($scope.login.password == null || $scope.login.password == '') {
                //errors.push('You must provide a password to log in.');
                errors.push('Introduzca un password.');
            }
            if (errors.length == 0) {
                //$scope.$emit('login.before');
                
                var rq = {
                    command: 'login',
                    service: 'auth',
                    request: {
                        email: $scope.login.email,
                        password: $scope.login.password,
                        iamnew: $scope.login.iamnew,
                        sociallogged: false
                    }
                };
                var rqCB = yto_api.send(rq);
                console.log(rqCB);
                //on response Ok
                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    $scope.waiting = false;
                    console.log(rsp);
                    
                    ga('send', {
                        'hitType': 'event',          // Required.
                        'eventCategory': 'Login',   // Required.
                        'eventAction': 'ok',      // Required.
                        'eventLabel': 'Login User',
                        'eventValue': 1
                    });
                    
                    $scope.$emit('login.done', rsp);

                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.log(err);
                    $scope.waiting = false;
                    // google analytics event to track action
                    ga('send', {
                        'hitType': 'event',          // Required.
                        'eventCategory': 'Login',   // Required.
                        'eventAction': 'error',      // Required.
                        'eventLabel': 'Login User',
                        'eventValue': 1
                    });
                    
                    var reterr;
                    switch (err){
                        case 'Your email or password is invalid. Please try again':
                            reterr = 'Tu email o contraseña no es válida. Por favor inténtalo de nuevo.';
                            break;
                        case 'This email is not valid or registered. Please try again.':
                            reterr = 'Este email no es correcto o no está registrado. Por favor inténtalo de nuevo.';
                            break;
                        case 'You must provide your email to log in. Try again':
                            reterr = 'Debes introducir tu email para acceder. Por favor inténtalo de nuevo.';
                            break;
                        case 'You must provide a password to log in. Try again':
                            reterr = 'Debes introducir una contraseña para acceder. Por favor inténtalo de nuevo.';
                            break;
                        case 'Your password does not match with the email registered':
                            reterr = 'Email y contraseña no coiciden. Por favor inténtalo de nuevo.';
                            break;
                        default:
                            reterr = 'Error de conexión. Por favor inténtalo de nuevo.';
                            break;
                    }


                    $scope.$emit('login.error', reterr);
                    errors.push(reterr);
                    var html = errors.join('\r\n');
                    $scope.notificar_error = html;
                    $scope.errorLogin = true;
                });
            } else {
                var html = errors.join('\r\n');
                $scope.notificar_error = html;
                $scope.errorLogin = true; 
               
                //toaster.pop('error', 'Registro', html, 6000, 'trustedHtml')
            }
        };

    }]);