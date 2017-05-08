var app = angular.module("openMarketTravelApp");
app.controller('HeaderCtrl', ['$scope', '$rootScope', 
    'toaster',
    '$uibModal',
    '$location',
    '$cookieStore',
    '$cookies',
    'openmarket_file_uploader',
    'yto_session_service',
    'tools_service',
    'modals_service',
    '$log', 
    function ($scope, $rootScope,
        toaster,
        $uibModal,
        $location,
        $cookieStore,
        $cookies,
        openmarket_file_uploader,
        yto_session_service,
        tools_service,
        modals_service, 
        $log) {
        'use strict';
        //$scope.openthepopup = true;
        $scope.setopenpopup = function (open) {
            //console.log('the init... open: ', open);
            $scope.openthepopup = open;
            initLoad();
        };                
        $scope.session = {};

        $scope.userkind = {
            istraveler : false,
            isdmc : false,
            isadmin : false,
            isaffiliate: false
        };

        $scope.logout = function () {
            yto_session_service.logOut(function (rsp) {
                window.location = '/';
            });
           
        };

        $scope.loadedcurrencies = loadedcurrencies;

        $scope.getimage = function (url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };

        $scope.sessionstarted = false;
        function isSessionStarted() {
            return loginsession != null;
        }
        //function isSessionStarted() {
        //    var token = yto_session_service.currentSession(function (token) {
        //        if (token) {
        //            $scope.islogged = true;
        //            var ok = true;
        //            $scope.session = token;
        //            //console.log('------ isSessionStarted token :', token);
        //            $scope.sessionstarted = true;
        //        } else {
        //            console.log ('por el else ');
        //        }
        //    });
        //}

        isSessionStarted();

        
        function _getsession(callback) {
            var token = loginsession;
            console.log('________getsession token :', token);
            $scope.session = token;
            $scope.loginsession = token;
            if (token) {
                $scope.session = token;
                //check traveler...
                if (token.traveler != null && token.traveler.code != null) {
                    console.log('A traveler logged...');
                    $scope.userkind.istraveler = true;
                    $scope.userkind.isdmc = false;
                    $scope.userkind.isadmin = false;
                    if ($scope.session.traveler.images == null) {
                        $scope.session.traveler.images = {
                            logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                            splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                            photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
                        }
                    }
                    if ($scope.session.traveler.images.photo.url.indexOf('img-empty') > -1 ||
                        $scope.session.traveler.images.photo.url.indexOf('omtempty') > -1) {
                        $scope.session.traveler.images.photo.url =
                            'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
                    }
                }
                //check dmc
                if (token.dmc != null && token.dmc.code != null) {
                    console.log('A dmc logged...');
                    $scope.userkind.istraveler = false;
                    $scope.userkind.isdmc = true;
                    $scope.userkind.isadmin = false;
                    if ($scope.session.dmc.images == null) {
                        $scope.session.dmc.images = {
                            logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                            splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                            photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
                        }
                    }
                    if ($scope.session.dmc.images.logo != null && $scope.session.dmc.images.logo.url != '') {

                        if ($scope.session.dmc.images.logo.url.indexOf('img-empty') > -1 ||
                            $scope.session.dmc.images.logo.url.indexOf('omtempty') > -1) {
                            $scope.session.dmc.images.logo.url =
                                'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
                        }

                    } else {
                        $scope.session.dmc.images.logo = {
                            url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
                        }
                    }

                }
                //check admin
                if (token.admin != null && token.admin.code != null) {
                    console.log('A admin logged...');
                    $scope.userkind.istraveler = false;
                    $scope.userkind.isdmc = false;
                    $scope.userkind.isadmin = true;
                    if ($scope.session.admin.images == null) {
                        $scope.session.admin.images = {
                            logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                            splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                            photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
                        }
                    }
                    if ($scope.session.admin.images.logo.url.indexOf('img-empty') > -1 ||
                        $scope.session.admin.images.logo.url.indexOf('omtempty') > -1) {
                        $scope.session.admin.images.logo.url =
                            'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
                    }
                }

            }
            callback != null ? callback(token) : null;
        }

        function __getsession(callback) {
            var token = yto_session_service.currentSession(function (token) {
               console.log('________getsession token :', token);
                if (token) {
                    $scope.session = token;
                    //check traveler...
                    if (token.traveler != null && token.traveler.code != null) {
                        $scope.userkind.istraveler = true;
                        $scope.userkind.isdmc = false;
                        $scope.userkind.isadmin = false;
                        if ($scope.session.traveler.images == null) {
                            $scope.session.traveler.images = {
                                logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                                splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                                photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
                            }
                        }
                        if ($scope.session.traveler.images.photo.url.indexOf('img-empty') > -1 ||
                            $scope.session.traveler.images.photo.url.indexOf('omtempty') > -1) {
                            $scope.session.traveler.images.photo.url =
                            'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
                        }
                    }
                    //check dmc
                    if (token.dmc != null && token.dmc.code != null) {
                        $scope.userkind.istraveler = false;
                        $scope.userkind.isdmc = true;
                        $scope.userkind.isadmin = false;
                        if ($scope.session.dmc.images == null) {
                            $scope.session.dmc.images = {
                                logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                                splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                                photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
                            }
                        }
                        if ($scope.session.dmc.images.logo != null && $scope.session.dmc.images.logo.url != '') {

                            if ($scope.session.dmc.images.logo.url.indexOf('img-empty') > -1 ||
                                $scope.session.dmc.images.logo.url.indexOf('omtempty') > -1) {
                                $scope.session.dmc.images.logo.url =
                                'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
                            }

                        } else {
                            $scope.session.dmc.images.logo = {
                                url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg'
                            }
                        }

                    }
                    //check admin
                    if (token.admin != null && token.admin.code != null) {
                        $scope.userkind.istraveler = false;
                        $scope.userkind.isdmc = false;
                        $scope.userkind.isadmin = true;
                        if ($scope.session.admin.images == null) {
                            $scope.session.admin.images = {
                                logo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                                splash: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' },
                                photo: { url: 'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg' }
                            }
                        }
                        if ($scope.session.admin.images.logo.url.indexOf('img-empty') > -1 ||
                            $scope.session.admin.images.logo.url.indexOf('omtempty') > -1) {
                            $scope.session.admin.images.logo.url =
                            'http://res.cloudinary.com/open-market-travel/image/upload/v1426853495/assets/avatar.jpg';
                        }
                    }

                }
                else {

                }
            });

            
        }
        _getsession(function () {
            console.log('Inicio session in header...');
        });
        
        $scope.redirectlogin = true;
        $scope.redirectsignup = true;


        // ---- Modal for login    
        $scope.openlogin = function (nav) {
        	        	
            modals_service.openmodal('login_affiliate', $scope);
        };

        // ---- Modal for login    
        $scope.opensignup = function (size) {

        };

        $scope.islogged = false;
        
        $scope.toTravelroot = function(){
            tools_service.showPreloader($scope,'show');
        };

        $scope.$on('callOpenlogin', function(event, args) {
            $scope.openlogin(args);
        });

        $scope.$on('callOpensignup', function(event, args) {
            $scope.opensignup(args);
        });


        $scope.signUpPopUp = function(){
            var path = $location.path();
            var snapshoot = $cookies.snapshoot;

            if (snapshoot == "" || snapshoot == undefined || snapshoot == "undefined") {

                if ($cookies.OMTsignUpPopUp != 1 && !$scope.sessionstarted){

                    if ((path.indexOf("viaje") >= 0 && path.indexOf("peticion-de-viaje") != 1) || path == '/'){
                        //console.log('__> show opensignup');
                        var date = new Date();
                        date.setDate(date.getDate()+60);
                        document.cookie = 'OMTsignUpPopUp=1;expires='+date.toGMTString()+';path=/';
                        $scope.opensignup('');
                    }
                }

            }
        };

        $scope.translationGoogleActive = function(){
            var url = $location.url();
            //console.log('sesssion', $scope.session.admin);
            var transActive = $cookies.googtrans;
            if (transActive !== undefined && url.indexOf('dmc-') >= 0 && $scope.session.admin === null && $scope.session.dmc !== null){
                angular.element(document.querySelector('#toast-container')).css('top', '90px');
                return true;
            }
            angular.element(document.querySelector('#toast-container')).css('top', '');
            return false;
        };

        // redirect url when dropdown menu main element have link
        $scope.gotoUrl = function(path){
            document.location = path;
        }
        // show sub menu on over main navigation
        $scope.showSubMenu = function(event, id){
                angular.element(document.querySelector('#'+id)).addClass('showsubmenu');
        }
        // hide sub menu on over main navigation
        $scope.hideSubMenu = function(event, id){
            angular.element(document.querySelector('#'+id)).removeClass('showsubmenu');
        }
        // show selected item in main navigation
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        function initLoad() {
            var host = $location.host();
            var triggerPopUp = true;
            // check if regiter popup is needed
            if (host == 'yourttoo.com' || host == 'localhost'){
                triggerPopUp = false;
            };
            var delay = Math.floor((Math.random() * 1000) + 10000);
            if ($scope.openthepopup) {
                if ($location.search().action == 'register') {
                    var date = new Date();
                    date.setDate(date.getDate() + 60);
                    document.cookie = 'OMTsignUpPopUp=1;expires=' + date.toGMTString() + ';path=/';
                    setTimeout(function () {
                        if (triggerPopUp) {$scope.opensignup('')};
                    }, 400);
                } else {
                     setTimeout(function() {
                         if (triggerPopUp) {$scope.signUpPopUp()};
                     }, delay);
                }
            }
        };


        // calls to login end


        // ---- Modal for login    
        $scope.openlogin = function (nav) {
            var modalname = 'login_' + nav;
            modals_service.openmodal(modalname, $scope);
        };

        if (typeof brandPath !== 'undefined') {
            // the variable is defined
        } else {
            brandPath = '';
        }

        $rootScope.$on('login.done', function (event, session) {
            $log.log('Login done...');

            var userType = '';
            var redirect = $location.search().redirecturl;
            //console.log ('>>>>>>>>>>>>>>>>>redirect :',redirect);


            if (session.user.isAffiliate){
                if (session.affiliate.membership.registervalid){
                    if (redirect !== undefined){
                        userType = 'affiliatevalidredirect';
                    } else{
                        userType = 'affiliatevalid';
                    }
                } else {
                    userType = 'affiliatenovalid';
                }
            }

            if(session.user.isAdmin){
                if (redirect !== undefined){
                    userType = 'adminredirect';
                } else {
                    userType = 'admin';
                }
            }

            if (session.user.isDMC) {
                if (redirect !== undefined) {
                    userType = 'dmcredirect';
                } else {
                    userType = 'dmc';
                }
            }
            

            switch(userType) {
                case 'affiliatevalid':
                    window.location = '/home';
                    break;
                 case 'affiliatevalidredirect':
                    window.location = redirect;
                    break;
                case 'affiliatenovalid':
                    window.location = '/account-invalid';
                    break;
                case 'admin':
                    window.location = '/home';
                    break;
                case 'adminredirect':
                    window.location = redirect;
                    break;
                case 'dmc':
                    window.location = '/home';
                    break;
                case 'dmcredirect':
                    window.location = redirect;
                    break;
                default:
                    window.location = '/home';
            };


        });
        
        $rootScope.$on('login.error', function (event, err) {
            console.log(err);
        });

    }]);

