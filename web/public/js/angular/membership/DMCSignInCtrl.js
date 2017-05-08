app.controller("DMCSignInCtrl", ['$scope', '$http', 'toaster',
    '$location', '$anchorScroll', '$timeout', 'destinations_service', '$cookieStore', '$cookies', 
    'tools_service', '$log', 'openmarket_google_service', 'yto_api', 
    function ($scope, $http, toaster, $location, $anchorScroll, $timeout, destinations_service,
        $cookieStore, $cookies, tools_service, $log, openmarket_google_service, yto_api
        ) {

    	'use strict';

	$scope.showPageLoad = false;
	//
	$scope.load = {
		cont : "false",
		tags : "false"
	}
	$scope.dmc = {
		code: "",
		name: "",
		vouchername: "",
		company: {
		    name: "",
		    legalname: "",
		    constitutionyear: "",
		    phone: "",
		    emergencyphone : "",
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
		    operatein: []
		},
		contact: {
		    title: "",
		    name: "",
		    firstname: "",
		    lastname: "",
		    email: "",
		    fax: "",
		    skype: "",
		    nif: "",
		    position: ""
		},
		bankinfo:{
		    beneficiary : "",
		    iban : "",
		    accountnumber : "",
		    bankname : "",
		    bic : "",
		    routing : "",
		    bankaddress : "",
		    bankzip : "",
		    bankcity : "",
		    bankcountry : ""
		    },
		additionalinfo: {
		    description: "",
		    recomenders:[
		        {name:"", url: ""},
		    ],
		    associations: [
		        {name:"", imageUrl: ""},
		    ],
		    registration: {
		       url:""
		       },
		    insurancepolicy:{
		       url:""
		       },
		    businessLicense: false,
		    notpunished: false,
		    paymenttaxes: false
		},
		membership : {
			b2bchannel : false,
			b2cchannel : true,
			toursmultidays : true,
			tailormade : false,
			groups : false,
			commission : "",
			acceptterms : false,
		    membershipDate: "",
		    registervalid : false,
		    publicprofilecomplete : false,
		    companyimagescomplete : false,
		    companycomplete : false,
		    paymentcomplete : false,
		    averagecomplete : false,
		    companytaxid : false,
		    emergencycomplete : false,
		    requestdelete : false
		    },
		images:
		    {
		    photo: {
		        url: 'img/elements/img-empty.png'
		        },
		    logo: {
		        url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
		        },
		    splash: {
		        url: 'img/elements/img-empty.png'
		        }
		    },
		user: "",
		admin: "",
		contactuser: "",
		tourEscorts:[
		        {
		        fullname:"",
		        biography : "",
		        imageUrl: "",
		        languages :[]
		        }
		    ],
		tags:[
		],
		expenditure:""
	};


	$scope.theuser = {};
	$scope.tripTags = null;


	//** Autocomplete aux to operation countries..
	$scope.autocomplete = {
		result : "",
		options : {
               types: '(regions)'
           },
        details : ''
	};

	//** Autocomplete aux to Address..
    $scope.companyaddress;
	$scope.autocomplete2 = {
	    result: "",
	    options: {
	        types: 'geocode'
	    },
	    details: ''
	};

	//** Autocomplete aux to country..
	$scope.autocompletecountry ={
		result: "",
	    options: {
	        types: '(regions)'
	    },
	    details: ''
	}

	$scope.setCountryAddress = function () {
		if ($scope.autocompletecountry.details) {
			var loc = openmarket_google_service.parseGoogleResult($scope.autocompletecountry.details);
			$log.log(loc)
			if (loc.countrycode){
				this.signupform.addresscountry.value = loc.country;
				$scope.dmc.company.location.country = loc.country;
				$scope.dmc.company.location.countrycode = loc.countrycode;
				$scope.dmc.company.location.latitude = loc.latitude;
				$scope.dmc.company.location.longitude = loc.longitude;
				$scope.autocompletecountry.result = loc.country;

			} else{
				this.signupform.addresscountry = "";
				this.signupform.addresscountry.$setValidity = false;
			}
		}
	};


	$scope.setCompanyAddress = function () {
	    if ($scope.autocomplete2.details) {
	        var loc = openmarket_google_service.parseGoogleResult($scope.autocomplete2.details);
	        $scope.rawlocation = angular.copy(loc);
	        $scope.dmc.company.location = angular.copy(loc);
	    }
	}

	$scope.localdestination = {
		"newdestination" : "",
		"newzone": ""
	}

	$scope.addDestination = function(){		
		this.dummy = {
		    "operateLocation": openmarket_google_service.parseGoogleResult($scope.autocomplete.details),
		    "zone": $scope.localdestination.newzone
		};
		if($scope.localdestination.newzone == ""){
			var gl = openmarket_google_service.parseGoogleResult($scope.autocomplete.details);
            this.dummy.zone = gl.stateorprovince;
		}
		$scope.dmc.company.operatein.push(this.dummy);
		//
		this.dummy = null;
		$scope.localdestination.newzone = "";
		$scope.localdestination.newdestination ="";
		//
	};
	
	$scope.onSelectLocation = function($item){
		//$scope.rawlocation = $item;
		$scope.activelocation = angular.copy(openmarket_google_service.parseGoogleResult($item));
	}


	$scope.removeDestination = function(index){
	  	//
	    $scope.dmc.company.operatein.splice(index, 1);
		$scope.firstDestination = true;
	};


	$scope.rawlocation = "";

	$scope.onSelectAddress = function($item){
		//$log.log ($item); 	
	  	$scope.rawlocation = angular.copy(openmarket_google_service.parseGoogleResult($item));

	  	$scope.dmc.company.location = angular.copy(openmarket_google_service.parseGoogleResult($item));
	};

	$scope.removeTag = function(index){
		$scope.firstTag = true;
		$scope.dmc.tags.splice(index, 1);

	};

	$scope.addAssociation = function(){
		this.dummy = {"name":"", "imageUrl": ""};
		$scope.dmc.additionalinfo.associations.push(this.dummy);
		this.dummy = null;
	};


	$scope.deleteAssociation = function(index){
		$scope.dmc.additionalinfo.associations.splice(index, 1)
	};


	$scope.addRecomender = function(){
		this.dummy = {"name":"", "url": ""};
		$scope.dmc.additionalinfo.recomenders.push(this.dummy);
		this.dummy = null;
	};


	$scope.deleteRecommender = function(index){
		$scope.dmc.additionalinfo.recomenders.splice(index, 1);
	}

	$scope.checkPasswordMatch = function(){

	}

	$scope.invalidchannels = false;
	$scope.chekchannel = function(){
		
		if ($scope.dmc.membership.b2cchannel || $scope.dmc.membership.b2bchannel){
			$scope.invalidchannels = false;
			return true;
		} else {
			$scope.invalidchannels = true;
			return false;
		}
	};
	$scope.invalidproducts = true;
	$scope.chekproduct = function(){
		
		if ($scope.dmc.membership.toursmultidays || $scope.dmc.membership.tailormade || $scope.dmc.membership.groups){
			$scope.invalidproducts = false;
			return true;
		} else {
			$scope.invalidproducts = true;
			return false;
		}
	};

	$scope.setFormScope = function (scope) {
        this.signupform = scope;
    }

	$scope.checkform = function (formvalid) {
	    return (formvalid &
            $scope.dmc.tags.length > 0 &
            $scope.dmc.company.operatein.length > 0 &
            $scope.chekchannel() &
            $scope.chekproduct()
            );
	};

	$scope.feedbackError = function () {
		$scope.dmc.membership.commission = parseInt($scope.dmc.membership.commission);
	    var errors = [];
            if (!this.signupform.companyname.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Company Name');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Empresa": Nombre de la Empresa');
                } else {
                	errors.push('Please check "1. Company": Company Name');
                }
            };
            if (!this.signupform.legalname.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Company Legal Name');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Empresa": Nombre Legal de la Empresa');
                } else {
                	errors.push('Please check "1. Company": Company Legal Name');
                }
            };
            if (!this.signupform.yearest.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Year of establishment');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Empresa": Año de establecimiento');
                } else {
                	errors.push('Please check "1. Company": Year of establishment');
                }
            };
            if (!this.signupform.phone.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Phone');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Empresa": Teléfono');
                } else {
                	errors.push('Please check "1. Company": Phone');
                }
            };
            if (!this.signupform.fulladdress.$valid || !this.signupform.addresscity.$valid || !this.signupform.addressstate.$valid || !this.signupform.addresspc.$valid || !this.signupform.addresscountry.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Address');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Empresa": Dirección');
                } else {
                	errors.push('Please check "1. Company": Address');
                }
            };
            if (!this.signupform.businesslicense.$valid || !this.signupform.notpunished.$valid || !this.signupform.paymenttaxes.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "1. Company": Company Status');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "1. Empresa": Estado de la Empresa');
                } else {
                	errors.push('Please check "1. Company": Company Status');
                }
            };
            if (!this.signupform.companydescription.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "2. Additional Company Information": Company Description');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "2. Información Adicional de la Empresa": Descripción de la Empresa');
                } else {
                	errors.push('Please check "2. Additional Company Information": Company Description');
                }
            };
            if (!$scope.dmc.tags.length) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "2. Additional Company Information": Activities / Tags');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "2. Información Adicional de la Empresa": Actividades / Etiquetas');
                } else {
                	errors.push('Please check "2. Additional Company Information": Activities / Tags');
                }
            };
            if (!$scope.dmc.company.operatein.length) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "2. Additional Company Information": Operation Countries');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "2. Información Adicional de la Empresa": Destinos de Operación');
                } else {
                	errors.push('Please check "2. Additional Company Information": Operation Countries');
                }
            };
            if (!this.signupform.adminfname.$valid || !this.signupform.adminlname.$valid || !this.signupform.adminpos.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "3. Contact Details"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "3. Detalles de Contacto"');
                } else {
                	errors.push('Please check "3. Contact Details"');
                }
            }
            if (!this.signupform.adminemail.$valid || !this.signupform.adminpass.$valid || !this.signupform.adminpass2.$valid) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "4. Administrator Login"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "4. Login del Administrador"');
                } else {
                	errors.push('Please check "4. Administrator Login"');
                }
            }
            //$log.log($scope.dmc.membership.commission);
            if (!$scope.dmc.membership.commission) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "5. Comission"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "5. Comisión"');
                } else {
                	errors.push('Please check "5. Comission"');
                }
            }
            //$log.log($scope.chekchannel());
            if (!$scope.chekchannel()) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "6. Sales Channel"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "6. Canales de Venta"');
                } else {
                	errors.push('Please check "6. Sales Channel"');
                }
            }
            // $log.log($scope.chekproduct());
             if (!$scope.chekproduct()) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "7. Type segment to which you are engaged"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "7. Tipo de Producto"');
                } else {
                	errors.push('Please check "7. Type segment to which you are engaged"');
                }
            }
            //$log.log($scope.dmc.membership.acceptterms);
            if (!$scope.dmc.membership.acceptterms) {
                //toaster.pop('error', 'Incomplete Form', 'Please check "7. Collaboration Agreement"');
                if (lang == 'es'){
                	errors.push('Por favor, comprueba "8. Convenio de Colaboración"');
                } else {
                	errors.push('Please check "8. Collaboration Agreement"');
                }
            }
            if (errors.length > 0) {
                if (lang == 'es'){
					toaster.pop('error', 'Formulario Incompleto', errors.join('<br>'),6000 ,'trustedHtml');
                } else {
                	toaster.pop('error', 'Incomplete Form', errors.join('<br>'),6000 ,'trustedHtml');
                }
            }
        }

	$scope.dmcSigninSubmit = function(){
		tools_service.showPreloader($scope, "show");
	    try{
	    	if ($scope.dmc.additionalinfo.recomenders[0].name ==""){
			$scope.dmc.additionalinfo.recomenders = [];
			}
			if ($scope.dmc.additionalinfo.associations[0].name ==""){
				$scope.dmc.additionalinfo.associations = [];
			}
	    }
	    catch (err) {
	    	$log.log('error recomenders assoc')
	    }
	    //lets register...
	    $scope.dmc.membership.commission = parseInt($scope.dmc.membership.commission);
	    //
	    $scope.dmc.vouchername = $scope.dmc.company.name;
	    
	    $scope.theuser.email = $scope.dmc.contact.email;

        var rq = {
            command: 'signup',
            service: 'auth',
            request: {
                email: $scope.theuser.email,
                password: $scope.theuser.password,
                dmc: $scope.dmc,
                kind: 'DMC'
            }
        };

        var rqCB = yto_api.send(rq);
        //on response Ok
        rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
            //$log.log(rsp);
            tools_service.showPreloader($scope, "hide");
            ga('send', {
                'hitType': 'event',          // Required.
                'eventCategory': 'RegisterDMC',   // Required.
                'eventAction': 'ok',      // Required.
                'eventLabel': 'DMC Register',
                'eventValue': 1
            });
            // END google analytics event to track action
            if (lang == 'es') {
                window.location = '/suppliers-thanks/es';
            } else {
                window.location = '/suppliers-thanks';
            }
            
        });
        //on response noOk
        rqCB.on(rqCB.onerroreventkey, function (err) {
            //$log.log(err);
            ga('send', {
                'hitType': 'event',          // Required.
                'eventCategory': 'RegisterDMC',   // Required.
                'eventAction': 'error',      // Required.
                'eventLabel': 'DMC Register',
                'eventValue': 1
            });
            // END google analytics event to track action
            if ($scope.dmc.additionalinfo.recomenders == null ||
                $scope.dmc.additionalinfo.recomenders.length == 0) {
                $scope.dmc.additionalinfo.recomenders.push({ name: "", url: "" });
            }
            if ($scope.dmc.additionalinfo.associations == null ||
                $scope.dmc.additionalinfo.associations.length == 0) {
                $scope.dmc.additionalinfo.associations.push({ name: "", imageUrl: "" });
            }
            tools_service.showPreloader($scope, "hide");
        });
        
      	return true
	}
	
    $scope.resetFields = function(){
    	$scope.dmc = "";
		$scope.theuser = "";
    };

    function _findtags(slugs) {
        return _.filter($scope.tripTags, function (tag) {
            return (slugs.indexOf(tag.slug) >= 0);
        });
    }    

    $scope.$on('destinations.loaded', function (event, mass) {
        console.log('destinations loaded...'); console.log(mass);
        $scope.tripTags = _.filter(destinations_service.triptags, function (tag) { return tag.state == 'published' });
        tools_service.showPreloader($scope, "hide");
    });

    

    
}]);

