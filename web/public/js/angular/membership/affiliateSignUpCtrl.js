app.controller("affiliateSignUpCtrl", ['$scope',
    '$http',
    'toaster',
    '$location',
    '$anchorScroll',
    '$timeout',
    '$cookieStore',
    '$cookies',
    'tools_service',
    '$log',
    'openmarket_google_service',
    'http_service',
    'yto_api',
    'affiliatehelpers',
    function ($scope,
        $http,
        toaster,
        $location,
        $anchorScroll,
        $timeout,
        $cookieStore,
        $cookies, 
        tools_service,
        $log,
        openmarket_google_service,
        http_service,
        yto_api,
        affiliatehelpers) {

        'use strict';
    // if (lang == undefined || lang == null){
    // 	lang = 'es';
    // }
    var lang = 'es';

    $scope.signing = false;

	$scope.showPageLoad = false;
	//
	$scope.load = {
		cont : "false",
		tags : "false"
	};

	$scope.affiliate = {
		code: "",
		name: "",
		company: {
		    name: "",
		    legalname: "",
		    constitutionyear: "",
		    phone: "",
            agencylic: "",
            group: "",
		    website: "",
		    taxid : "",
		    location: {
		        fulladdress: "",
		        city: "",
		        stateorprovince: "",
		        cp: "",
		        country: "",
		        countrycode: "",
		        latitude: 0.0,
		        longitude: 0.0
		    },
		},
		contact: {
		    firstname: "",
		    lastname: "",
		    email: "",
			position: "",
		    skype: "",
            bookingContact : {
                email : ""
            },
            marketingContact : {
                email : ""
            },
            paymentContact : {
                firstname : "",
                lastname : "",
                phone : "",
                email : "",
                location: {
                    fulladdress : "",
                    city : "",
                    stateorprovince : "",
                    cp : "",
                    country : "",
                    countrycode : "",
                    continent : "",
                    latitude: 0.0,
                    longitude: 0.0,
                    route : "",
                }
            }
		},
		membership : {
    		acceptterms : false,
            colaborationagree : false
  		},
        currency: {
            label: "Euro",
            symbol: "€",
            value: "EUR"
        }
	};

	$scope.theuser = {};

	//** Autocomplete aux to Address..
    $scope.companyaddress;
	$scope.autocomplete2 = {
	    result: "",
	    options: {
	        types: 'geocode'
	    },
	    details: ''
	};

    $scope.loccountries = {};
    affiliatehelpers.getCountryList(function(res){
        $scope.loccountries = res;
    });

	//** Autocomplete aux to country..
   
    $scope.setCountryAddress = function ($item, $model, $label, $event) {
        $log.log ('$item ',$item);
        $scope.affiliate.company.location.country = $item.label_es;
        $scope.affiliate.company.location.countrycode = $item.slug.toUpperCase();
        $scope.affiliate.company.location.latitude = $item.location.latitude;
        $scope.affiliate.company.location.longitude = $item.location.longitude;
        //$log.log('this.signupform',this.signupform);
        $log.log('company.location ',$scope.affiliate.company.location);
    };

 	$scope.setCompanyAddress = function () {
	    if ($scope.autocomplete2.details) {
	        var loc = openmarket_google_service.parseGoogleResult($scope.autocomplete2.details);
	        $scope.rawlocation = angular.copy(loc);
	        $scope.affiliate.company.location = angular.copy(loc);
	    }
	};
	
	// $scope.onSelectLocation = function($item){
	// 	//$scope.rawlocation = $item;
	// 	$scope.activelocation = angular.copy(openmarket_google_service.parseGoogleResult($item));
	// };


	// $scope.removeDestination = function(index){
	//   	//
	//     $scope.affiliate.company.operatein.splice(index, 1);
	// 	$scope.firstDestination = true;
	// };


	$scope.rawlocation = "";

	$scope.onSelectAddress = function($item){
		//$log.log ($item); 	
	  	$scope.rawlocation = angular.copy(openmarket_google_service.parseGoogleResult($item));

	  	$scope.affiliate.company.location = angular.copy(openmarket_google_service.parseGoogleResult($item));
	};

	$scope.setFormScope = function (scope) {
        this.signupform = scope;
    }

	$scope.checkform = function (formvalid) {
	    return (formvalid);
	};

	$scope.feedbackError = function () {
	    var errors = [];
            if (!this.signupform.companyname.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Company Name');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Agencia": Nombre de la Empresa');
                } else {
                	errors.push('Please check "1. Company": Company Name');
                }
            };
            if (!this.signupform.legalname.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Company Legal Name');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Agencia": Nombre Legal de la Empresa');
                } else {
                	errors.push('Please check "1. Company": Company Legal Name');
                }
            };
            if (!this.signupform.agencylic.$valid) {
                if (lang == 'es'){
                    errors.push('Por favor, comprueba "1. Agencia": Título-licencia de Agencia');
                } else {
                    errors.push('Please check "1. Company": Agency title or license');
                }
            };
            if (!this.signupform.yearest.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Year of establishment');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Agencia": Año de establecimiento');
                } else {
                	errors.push('Please check "1. Company": Year of establishment');
                }
            };
            if (!this.signupform.phone.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Phone');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Agencia": Teléfono');
                } else {
                	errors.push('Please check "1. Company": Phone');
                }
            };
            if (!this.signupform.fulladdress.$valid || !this.signupform.addresscity.$valid || !this.signupform.addressstate.$valid || !this.signupform.addresspc.$valid || !this.signupform.addresscountry.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Address');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Agencia": Dirección');
                } else {
                	errors.push('Please check "1. Company": Address');
                }
            };
            if (!this.signupform.adminfname.$valid || !this.signupform.adminlname.$valid || !this.signupform.adminpos.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "3. Contact Details"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "2. Administrador de Cuenta - Nombres, Apellidos y Cargo"');
                } else {
                	errors.push('Please check "2. Account Details"');
                }
            }
            if (!this.signupform.adminemail.$valid || !this.signupform.adminpass.$valid || !this.signupform.adminpass2.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "4. Administrator Login"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "2. Administrador de Cuenta - Email y Contraseña"');
                } else {
                	errors.push('Please check "2. Account Details"');
                }
            }

            //console.log ('affiliate.membership.acceptterms ',$scope.affiliate.membership.acceptterms);
            if (!$scope.affiliate.membership.acceptterms) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "7. Collaboration Agreement"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "3. Términos y condiciones"');
                } else {
                	errors.push('Please check "3. Terms and conditions"');
                }
            }
            if (errors.length > 0) {
                if (lang == 'es'){
					toaster.pop('error', 'Formulario Incompleto', errors.join('<br>'),6000 ,'trustedHtml');
                } else {
                	toaster.pop('error', 'Incomplete Form', errors.join('<br>'),6000 ,'trustedHtml');
                }
            }
        };

	$scope.affiliateSigninSubmit = function(){
        $scope.signing = true;
        // path differens emails contacto to main email
        $scope.affiliate.contact.bookingContact.email = $scope.affiliate.contact.email;
        $scope.affiliate.contact.marketingContact.email = $scope.affiliate.contact.email;
        $scope.affiliate.contact.paymentContact.email = $scope.affiliate.contact.email;
        $scope.affiliate.contact.paymentContact.firstname = $scope.affiliate.contact.firstname;
        $scope.affiliate.contact.paymentContact.lastname = $scope.affiliate.contact.lastname;
        $scope.affiliate.contact.paymentContact.phone = $scope.affiliate.company.phone;

        $scope.affiliate.contact.paymentContact.location = angular.copy($scope.affiliate.company.location);
		//lets register...
	    tools_service.showPreloader($scope, "show");
	    $scope.theuser.email = $scope.affiliate.contact.email;
        //$log.log('$scope.affiliate__>',$scope.affiliate);

        var rq = {
                command: 'signup',
                service: 'auth',
                request: {
                    email: $scope.theuser.email,
                    password: $scope.theuser.password,
                    affiliate: $scope.affiliate,
                    kind: 'Affiliate'
                }
            };

            var rqCB = yto_api.send(rq);
            //on response Ok
            rqCB.on(rqCB.oncompleteeventkey, function (rsp) { 
                //$log.log(rsp);
                tools_service.showPreloader($scope, "hide");
                ga('send', {
                    'hitType': 'event', // Required.
                    'eventCategory': 'RegisterAffiliate', // Required.
                    'eventAction': 'ok', // Required.
                    'eventLabel': 'Affiliate Register',
                    'eventValue': 1
                });
                $scope.changeswithoutsave = false;
                window.onbeforeunload = null;
                if (lang == 'es') {
                    window.location = '/thanks';
                } else {
                    window.location = '/thanks';
                }
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) { 
                //$log.log(err);
                if (err.indexOf("trying to register already exists") >= 0){
                    $scope.showEmailExistError = true;
                    toaster.pop('error', 'Email Existente', 'No te puedes registrar 2 veces con el mismo correo, intenta con otro email',6000 ,'trustedHtml');
                    $scope.affiliate.contact.email = '';
                }
                tools_service.showPreloader($scope, "hide");
               
                //tools_service.showConectionError($scope, "show");
                // google analytics event to track action
                ga('send', {
                    'hitType': 'event', // Required.
                    'eventCategory': 'RegisterAffiliate', // Required.
                    'eventAction': 'error', // Required.
                    'eventLabel': 'Affiliate Register',
                    'eventValue': 1
                });
            });


		//$log.log('$scope.affiliate', $scope.affiliate);
		//$log.log('$scope.theuser', $scope.theuser);
	
      	return true;

	};
    //  WATCH: LEAVE PAGE WITHOUT SAVE        
    $scope.changeswithoutsave = true;

    $scope.$watch('affiliate', function () {
        if ($scope.changeswithoutsave){
            window.onbeforeunload = function (event) {
                var message = 'Tienes datos sin enviar. Estos se perderan si abandonas la página en estos momentos.\r\n' +
                '¿Estas seguro de que quieres salir?\r\n';
                if (typeof event == 'undefined') {
                    event = window.event;
                }
                if (event) {
                    event.returnValue = message;
                }
                return message;
            };
        }
    }, true);

    $scope.showEmailExistError = false;

    $scope.resetFields = function(){
    	$scope.affiliate = "";
		$scope.theuser = "";
    };
    
	tools_service.showPreloader($scope, "hide");
    
}]);

