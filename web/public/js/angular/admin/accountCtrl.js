app.controller("AccountCtrl",
    ['$scope',
    '$http',
    'toaster',
    '$location',
    '$anchorScroll',
    'anchorSmoothScroll',
    '$timeout',
    'yto_session_service',
    'openmarket_file_uploader',
    'tools_service',
    '$log',
    'openmarket_google_service',
    'http_service',
    '$sce',
    'yto_api',
    'whitelabelhelpers',
    'affiliatehelpers',
        'AffiliateService', 'destinations_service',
    function($scope,
        $http,
        toaster,
        $location,
        $anchorScroll,
        anchorSmoothScroll,
        $timeout,
        yto_session_service,
        openmarket_file_uploader,
        tools_service,
        $log,
        openmarket_google_service,
        http_service,
        $sce,
        yto_api,
        whitelabelhelpers,
        affiliatehelpers,
        AffiliateService, destinations_service) {
        'use strict';

        var brandpath = '';
        if (typeof brandPath !== 'undefined') {
            $scope.brandpath = brandPath;
        }
        var debug = $location.search().debug;
        $scope.debug = debug;
        $scope.slugIsValid = true;

        if(debug)
            $log.log('in debug mode');

        // INIT  admin secondary nav and content show
        $scope.showPageLoad = true;
        $scope.readyaccount = false;
        $scope.session = loginsession;
        $scope.tripTags = [];
        // requested data
        $scope.content = {};
        $scope.theuser = {};
        $scope.affiliate = {};
        $scope.dmc = {};
        // local var for partial updates
        $scope.local = {};
        $scope.defaultWLTemplate = null; //default customization template model
        $scope.lastWLTemplate = null;

        $scope.local.newzonedata = "";
        $scope.local.newdestination = "";
        // $scope.mGroups = [];
        // $scope.groupSelect={};

        // $scope.urlapi = openmarket_api_service.apiCoreServiceUrl();
        // flags load content
        $scope.load = {
            content: false,
            theuser: false,
            affiliate: false,
			dmc: false
        };

        $scope.$on('destinations.loaded', function (event, mass) {
            $scope.tripTags = _.map(destinations_service.triptags, function (tag) { return { label: tag.label, label_en: tag.label_en, slug: tag.slug, _id: tag._id } });
            $scope.local.tags = $scope.dmc != null ? _.filter($scope.tripTags, function (tag) { return _.find($scope.dmc.tags, function (dmctag) { return dmctag.slug == tag.slug; }) != null; }) : [];

        });

        $scope.previewOptionChanged = function () {
            console.log('change option...');
            $scope.lastWLTemplate = $scope.lastWLTemplate != null ? $scope.lastWLTemplate : angular.copy($scope.affiliate.wlcustom);
            $scope.affiliate.wlcustom = whitelabelhelpers.defaultTemplate;
            $scope.$broadcast('cssColorsChanged',  whitelabelhelpers.defaultTemplate.css);
        };

        $scope.getAffiliateCode = function(){
            return $scope.affiliate.code.toString();
        };

        $scope.addDestination = function () {
            this.dummy = {
                "operateLocation": openmarket_google_service.parseGoogleResult($scope.autocomplete.details),
                "zone": $scope.local.newzonedata
            };
            if ($scope.local.newzonedata == "") {
                var gl = openmarket_google_service.parseGoogleResult($scope.autocomplete.details);
                this.dummy.zone = gl.stateorprovince;
            };
            $scope.dmc.company.operatein.push(this.dummy);
            //
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('success', "Destination added", "You added a operation country/zone");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
            
            $scope.local.newzonedata = "";
            $scope.local.newdestination = "";
        };

        $scope.removeDestination = function (index) {
            var contentObj = {
                dmc: $scope.dmc,
                mail: {
                   	operatein: {
                        deleted: [$scope.dmc.company.operatein[index]]
                   	}
                }
            }
            var subject = $scope.dmc.name + ", id:" + $scope.dmc.code + " ha borrado el destino de operación: " + $scope.dmc.company.operatein[index].operateLocation.country + " zona: " + $scope.dmc.company.operatein[index].zone;
            $scope.dmc.company.operatein.splice(index, 1);
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('warning', "Destination deleted", "You have deleted a operation country/zone");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        $scope.findDiff = function (arrInit, arrEnd) {

            var min = [];
            var max = [];

            var send = {
                added: [],
                deleted: []
            }
            // remove prop error
            for (var i = 0; i < arrInit.length; i++) {
                delete arrInit[i].$$hashKey;
            }
            for (var i = 0; i < arrEnd.length; i++) {
                delete arrEnd[i].$$hashKey;
            }
            if (arrInit.length > arrEnd.length) {
                //$log.log("delete item");

            } else if (arrInit.length < arrEnd.length) {
                //$log.log("add item");
            } else {
                if (angular.equals(arrEnd, arrInit)) {
                    //$log.log("same array");
                } else {
                    //$log.error("array are diferents")
                }
            }
            for (var i = 0; i < arrInit.length; i++) {
                var eq = false;
                for (var j = 0; j < arrEnd.length; j++) {
                    if (arrInit[i].slug == arrEnd[j].slug) {
                        // equals
                        eq = true;
                        break
                    }
                }
                if (eq) {
                    // equals
                } else {
                    //$log.log("delete item: ")
                    //$log.log(arrInit[i].slug);
                    send.deleted.push(arrInit[i]);
                }
            }
            for (var i = 0; i < arrEnd.length; i++) {
                var eq = false;
                for (var j = 0; j < arrInit.length; j++) {
                    if (arrEnd[i].slug == arrInit[j].slug) {
                        // equals
                        eq = true;
                        break
                    }
                }
                if (eq) {
                    // equals
                } else {
                    //$log.log("add item : ")
                    //$log.log(arrEnd[i].slug);
                    send.added.push(arrEnd[i]);
                }
            }

            //$log.log(send);
            return send;
        };


        $scope.onColorChange = function () {
            $scope.local.wlcustom = $scope.lastWLTemplate || $scope.local.wlcustom;
            $scope.affiliate.wlcustom = $scope.lastWLTemplate || $scope.local.wlcustom;
            if($scope.local.wlcustom)
                $scope.$broadcast('cssColorsChanged', $scope.local.wlcustom.css);
        };

        $scope.sanitizeSlug = function () {
            if($scope.affiliate.slug != undefined) {
                $scope.affiliate.slug = $scope.affiliate.slug.split(' ').join('').toLowerCase();
            }
        };

        $scope.slugHasBlurred = function () {
            AffiliateService.searchSlug($scope.affiliate.slug, function(response) {
                if(response != "" && response.code != $scope.affiliate.code){
                    $scope.slugIsValid = false;
                    showInvalidSlugMessage();
                } else {
                    $scope.slugIsValid = true;
                }
            }, function(err) {

            });
        };

        function showInvalidSlugMessage() {
            toaster.pop('error', "Error", "El subdominio no esta disponible");
        }

        // manage notification and welcome window
        var wellcomeWindow = false;
        $scope.grouplist = {};
        affiliatehelpers.getGroupsList(function(res){
            $scope.grouplist = res;
        });
        /*                                        *\
            AUX Autocomplete Google Location
        \*                                        */


        $scope.loccountries = {};
        affiliatehelpers.getCountryList(function(res){
            $scope.loccountries = res;
        });

        $scope.addressCompanyModel = {};

        $scope.addAssociation = function () {
            this.dummy = {
                "name": "",
                "image": {
                    "url": ""
                }
            };
            $scope.dmc.additionalinfo.associations.push(this.dummy);
            this.dummy = null;
        };

        $scope.deleteAssociation = function (index) {
            $scope.dmc.additionalinfo.associations.splice(index, 1)
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('warning', "Association deleted", "You have deleted an Association");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        $scope.addRecomender = function () {
            this.dummy = {
                "name": "",
                "url": ""
            };
            $scope.dmc.additionalinfo.recomenders.push(this.dummy);
            this.dummy = null;
        };

        $scope.deleteRecommender = function (index) {
            $scope.dmc.additionalinfo.recomenders.splice(index, 1);
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('warning', "Recomender deleted", "You have deleted a recommender");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        }

        $scope.loadTourEscort = function () {
            $scope.local.tourEscorts = angular.copy($scope.dmc.tourEscorts);
        }

        $scope.addTourEscort = function () {
            this.dummy = {
                "fullname": "",
                "biography": "",
                "image": {
                    "url": ""
                },
                "languages": []
            };
            $scope.dmc.tourEscorts.push(this.dummy);
        };

        $scope.deleteTourEscort = function (index) {
            $scope.dmc.tourEscorts.splice(index, 1);
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('warning', "Tour Escort deleted", "You have deleted a Tour Escort");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        }

        $scope.saveTourEscort = function (valid) {
            if (valid) {
                $scope.updateAccount(function (err) {
                    if (err == null) {
                        toaster.pop('success', "Data saved", "Tour Escort updated");
                    } else {
                        toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                    }
                });
            }
        }

        $scope.addLanguage = function (indexEscort, lang) {
            this.haveIt = false;
            for (var i = 0; i < $scope.dmc.tourEscorts[indexEscort].languages.length; i++) {
                if ($scope.dmc.tourEscorts[indexEscort].languages[i].value == lang.value) {
                    this.haveIt = true
                }
            };
            if (!this.haveIt) {
                $scope.dmc.tourEscorts[indexEscort].languages.push(lang);
                $scope.saveTourEscort(true);
            };
        };


        $scope.companyaddress = {
            result: "",
            options: {
                types: 'geocode'
            },
            details: ''
        };

        $scope.addressPaymentModel = {};

        $scope.paymentaddress = {
            result: "",
            options: {
                types: 'geocode'
            },
            details: ''
        };

        $scope.autocomplete = {
            result: "",
            options: {
                types: '(regions)'
            },
            details: ''
        };

        $scope.setCompanyAddress = function() {
            if ($scope.companyaddress.details) {
                var loc = openmarket_google_service.parseGoogleResult($scope.companyaddress.details);
                $scope.local.company.location = angular.copy(loc);
            }
        };

        $scope.setPaymentAddress = function() {

            if ($scope.paymentaddress.details) {
                var loc = openmarket_google_service.parseGoogleResult($scope.paymentaddress.details);
                $scope.local.contact.paymentContact.location = angular.copy(loc);
            }
        };

        $scope.autocompletecountry ={
            result: "",
            options: {
                types: '(regions)'
            },
            details: ''
        };

        $scope.setCountryAddress = function () {
            console.log ('local.company.location.country ',$scope.local.company.location.country);
            console.log ('$scope.autocompletecountry',$scope.autocompletecountry);
            console.log ('--FORM---this.address.addresscountry',this.address.addresscountry);
            if ($scope.autocompletecountry.details) {
                var loc = openmarket_google_service.parseGoogleResult($scope.autocompletecountry.details);
                if (loc.countrycode){
                    $log.info("__>>>>>>>>",loc.country);
                    $log.info("__>>>>>>>>",$scope.autocompletecountry.result);
                    $scope.local.company.location.country = loc.country;
                    $scope.local.company.location.countrycode = loc.countrycode;
                    $scope.local.company.location.latitude = loc.latitude;
                    $scope.local.company.location.longitude = loc.longitude;
                    $scope.autocompletecountry.result = loc.country;
                } else {
                    this.address.addresscountry = "";
                    this.address.addresscountry.$setValidity = false;
                }
            }
        };

        $scope.countryPaymentModel = {};

        $scope.countryPayment = {
            result: "",
            options: {
                types: '(regions)'
            },
            details: ''
        };

        $scope.setCountryPayment = function () {
            if ($scope.countryPayment.details) {
                var loc = openmarket_google_service.parseGoogleResult($scope.countryPayment.details);
                if (loc.countrycode){
                    this.paymentaddr.paymentcountry.value = loc.country;
                    $scope.local.contact.paymentContact.location.country = loc.country;
                    $scope.local.contact.paymentContact.location.countrycode = loc.countrycode;
                    $scope.local.contact.paymentContact.location.latitude = loc.latitude;
                    $scope.local.contact.paymentContact.location.longitude = loc.longitude;
                    $scope.autocompletecountry.result = loc.country;
                } else{
                    this.paymentaddr.paymentcountry = "";
                    this.paymentaddr.paymentcountry.$setValidity = false;
                }
            }
            $log.log('contact.paymentContact.location ',$scope.affiliate.contact.paymentContact.location);
        };

        $scope.trustHtml = function (html) {
            return $sce.trustAsHtml(html);
        };


        // get hash for tab navigation
        var hash = $location.hash();
        // watch url hash for tab navigation
        $scope.$watch(function () { return $location.hash(); }, function (url) {
            if (url) {
                $scope.selectTab($location.hash());
            } else {
                $scope.selectTab('maininfo');
            }
        });

        //images helper
        $scope.getimage = function(url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };

        //
        $scope.selectTab = function(setTab) {
            $scope.tab = setTab;
            return true;
        };
        //
        $scope.isSelected = function(checkTab) {
            return $scope.tab === checkTab;
        };

        $scope.gotoElement = function(eID) {
            anchorSmoothScroll.scrollTo(eID);
        };

        $scope.gotoTabAndId = function (tab, eID) {
            $scope.selectTab(tab);
            $timeout(function () {
                $scope.gotoElement(eID);
            }, 150);
        };

        // get content

        try {
            var rqCB = yto_api.get('/statics/getfullstaticcontent');

            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                $scope.content = rsp;
                //$log.info ("carga ok content");
                $scope.load.content = true;
                //$scope.init();
                initialize();
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                console.log(err);
            });
        }
        catch (err) {
            console.log(err);
        }

        function _initLoadQueryString() {
            var code = '';
            if ($location.search()) {
                if ($location.search().code != null && $location.search().code != '') {
                    code = $location.search().code;
                }
            }
            return code;
        }
        $scope.rolename = '';
        function initialize() {
            tools_service.showPreloader($scope, "show");
            $scope.rolename = editiondata.user.rolename;
            editiondata.user.rolename == 'affiliate' ? $scope.affiliate = editiondata : null;
            editiondata.user.rolename == 'dmc' ? $scope.dmc = editiondata : null;
            $scope.theuser = editiondata.user;
           // $scope.affiliate = editiondat;
            $scope.originalSlug = editiondata.slug.toString();
            $scope.adminRevision = adminaccess;
            $scope.load.affiliate = true;
            $scope.load.dmc = true;
            $scope.load.theuser = true;
            $scope.local = editiondata.user.rolename == 'affiliate' ? JSON.parse(JSON.stringify($scope.affiliate)) : null;
            $scope.local = editiondata.user.rolename == 'dmc' ? JSON.parse(JSON.stringify($scope.dmc)) : $scope.local;
            editiondata.user.rolename == 'dmc' ? $scope.tab = "MainInfo" : $scope.tab = 'maininfo';
            wellcomeWindow = true;
            $scope.readyaccount = true;
            $scope.loadPayment();
            $scope.findCross();
            $scope.dmcstuffinit();
            var hash = $location.hash();
            hash != null && hash != '' ? $scope.selectTab(hash) : null;
            $scope.menbershipvalid = $scope.menbershipAlert();
            tools_service.showPreloader($scope, "hide");
            console.log($scope.affiliate);
            console.log($scope.dmc);
            
        }

        $scope.dmcstuffinit = function () {
            if ($scope.rolename == 'dmc') {
                $scope.loadExpenditure();
                $scope.loadContact();
                $scope.registervalid = $scope.dmc.membership.registervalid;
                $scope.local.membership.confirmterms = $scope.dmc.membership.confirmterms;
                $scope.autopublish = $scope.dmc.membership.autopublish;
            }
        }

        $scope.$on('whitelabel.helper.ready', function () {
            $scope.defaultWLTemplate = whitelabelhelpers.defaultTemplate;
            //$scope.onColorChange();
            getWhiteLabelTemplate();
            console.log($scope.affiliate.wlcustom);
        });
        
        
        function getWhiteLabelTemplate() {
            if ($scope.affiliate.wlcustom == null ||
                ($scope.affiliate.wlcustom != null && $scope.affiliate.wlcustom != '' && $scope.affiliate.wlcustom.code == "default_wl")) {
                console.log('No white label customization detected ... is/assign default template');
                $scope.templateType = "standard";
                $scope.affiliate.wlcustom = whitelabelhelpers.defaultTemplate;
                $scope.local.wlcustom = whitelabelhelpers.defaultTemplate;
                $scope.defaultWLTemplate = whitelabelhelpers.defaultTemplate;
            } else {
                $scope.templateType = "custom";
                var rqWLT = getAffiliateWLTemplate();
                rqWLT.on(rqWLT.oncompleteeventkey, function (wlt) {
                    wlt = wlt == null ? whitelabelhelpers.newBlankWLCustom($scope.affiliate) : wlt;
                    $scope.affiliate.wlcustom = wlt;
                    $scope.local.wlcustom = wlt;
                });
                rqWLT.on(rqWLT.onerroreventkey, function (err) {
                    console.log(err);
                    $scope.templateType = "standard";
                    $scope.affiliate.wlcustom = whitelabelhelpers.defaultTemplate;
                    $scope.local.wlcustom = whitelabelhelpers.defaultTemplate;
                    toaster.pop('error', "Error", "No se ha podido recuperar la personalizacion de la plantilla.");
                });
            }
        }

        function getDefaultWLTemplate(callback) {
            var rqWLT = whitelabelhelpers.defaultWLTemplate($scope.affiliate); //default customization template
            rqWLT.on(rqWLT.oncompleteeventkey, function (wlt) {
                $scope.defaultWLTemplate = wlt;
                callback != null ? callback() : null;
            });
            rqWLT.on(rqWLT.onerroreventkey, function (err) {
                console.log(err);
                callback != null ? callback(err) : null;
            });
        }

        function getAffiliateWLTemplate(callback) {
            var rqWLT = whitelabelhelpers.findoneWLCustom({ code : $scope.affiliate.code }); //default customization template
            rqWLT.on(rqWLT.oncompleteeventkey, function (wlt) {
                callback != null ? callback(wlt) : null;
            });
            rqWLT.on(rqWLT.onerroreventkey, function (err) {
                console.log(err);
                callback != null ? callback(null) : null;
            });
            return rqWLT;
        }

        
        $scope.findCross = function () {
            $scope.iTimeZone = $scope.findEqs($scope[$scope.rolename].timeZone, $scope.content.timezones);
            $scope.theuser.timeZone = $scope.content.timezones[$scope.iTimeZone];
            $scope[$scope.rolename].timeZone = $scope.content.timezones[$scope.iTimeZone];
            // currency equals
            $scope.iCurerncy = $scope.findEqs($scope[$scope.rolename].currency, $scope.content.currency, 'value');
            $scope.local.currency = $scope.content.currency[$scope.iCurerncy];
            if ($scope.rolename == 'dmc') {
                // bank country equals
                $scope.iCountryBank = $scope.findEqs($scope.dmc.bankinfo.bankcountry, $scope.content.bankcountries);
                $scope.local.bankinfo.bankcountry = $scope.content.bankcountries[$scope.iCountryBank];
                // payment option match
                $scope.iPaymentOpt = $scope.findEqs($scope.dmc.membership.paymentoption, $scope.content.paymentoptions, 'slug');
                $scope.local.paymentoption = $scope.content.paymentoptions[$scope.iPaymentOpt];
                console.log($scope.iPaymentOpt);
            }
        };


        // find position of one object in an array (for selects)
        $scope.findEqs = function (obj, arr, fieldname) {
            var i = 0;
            function byfield() {
                var rs = obj != null ? obj[fieldname] == arr[i][fieldname] : false;
                return rs;
            }
            function byobj() {
                return angular.equals(obj, arr[i]);
            }
            for (i = 0; i < arr.length; i++) {
                var finded = (fieldname != null && fieldname != '') ? byfield() : byobj();
                if (finded) break;
            }
            return i;
        };

        $scope.membershipvalid = false;

        $scope.menbershipAlert = function() {
            //console.log ('$scope.affiliate.images ',$scope.affiliate.images);
            var alertA = false;
            if ($scope.rolename == 'affiliate') {
                alertA = (wellcomeWindow &&
                    $scope.affiliate.images.logo != null &&
                    $scope.affiliate.images.logo.public_id != null &&
                    $scope.affiliate.images.logo.public_id != '' &&
                    $scope.affiliate.images.logo.url != "" &&
                    ($scope.affiliate.fees != null &&
                        $scope.affiliate.fees.unique &&
                        $scope.affiliate.fees.groups &&
                        $scope.affiliate.fees.tailormade &&
                        $scope.affiliate.fees.flights &&
                        $scope.affiliate.membership.colaborationagree))
            }
            if ($scope.rolename == 'dmc') {
                alertA = ($scope.dmc.membership.publicprofilecomplete &&
                    $scope.dmc.membership.companycomplete &&
                    $scope.dmc.membership.paymentcomplete &&
                    $scope.dmc.membership.emergencycomplete &&
                    $scope.dmc.membership.averagecomplete &&
                    $scope.dmc.membership.companytaxid &&
                    $scope.dmc.membership.confirmterms
                );
            }
            return alertA;
        };

        // check if have own logo
        //
        $scope.hasOwnLogo = function(){
           return (wellcomeWindow && $scope.affiliate.images.logo != null &&
                $scope.affiliate.images.logo.public_id != null &&
                $scope.affiliate.images.logo.public_id != '' &&
                $scope.affiliate.images.logo.url != "")
        };

        // functions to save partials views

        $scope.updateMainInfo = function() {
            // console.log ('local company ',$scope.local.company);

            $scope.affiliate.company = $scope.local.company;

            $scope.updateAccount(function(err) {
                if (err != null) {
                    toaster.pop('error', "Error", "Problemas con el servicio. Intente más tarde.");
                } else {
                    toaster.pop('success', "Información guardada", "Datos de empresa Actualizados");
                }
            });
        };

        $scope.updateContact = function () {
            $scope.rolename == 'dmc' ? $scope.dmc.membership.companytaxid = true : null;
            $scope.rolename == 'dmc' ? $scope.dmc.company.location = angular.copy($scope.local.officeAddress) : null;
            $scope.rolename == 'affiliate' ? $scope.affiliate.contact = $scope.local.contact : null;
            
            $scope.updateAccount(function(err) {
                if (err != null) {
                    toaster.pop('error', "Error", "Problemas con el servicio. Intente más tarde.");
                } else {
                    toaster.pop('success', "Información guardada", "Contacto Actualizado");
                }
            });
        };

        $scope.updateFees = function() {
            //console.log ('local fees ',$scope.local.fees);
            $scope.affiliate.fees = $scope.local.fees;

            $scope.updateAccount(function(err) {
                if (err != null) {
                    toaster.pop('error', "Error", "Problemas con el servicio. Intente más tarde.");
                } else {
                    toaster.pop('success', "Información guardada", "Fee de reservas actualizado");
                }
            });
        };

        // UPDATE collaborationagreement

        $scope.updateBilling = function(){

            $scope.affiliate.company.legalname = $scope.local.company.legalname;
            $scope.affiliate.company.taxid = $scope.local.company.taxid;
            $scope.affiliate.contact.paymentContact = $scope.local.contact.paymentContact;

            $scope.updateAccount(function(err) {
                if (err != null) {
                    toaster.pop('error', "Error", "Problemas con el servicio. Intente más tarde.");
                } else {
                    toaster.pop('success', "Información guardada", "Datos de facturación actualizados");
                }
            });

        };

        // UPDATE collaborationagreement

        $scope.updateColaboration = function(){

            //console.log ('$scope.affiliate.membership ',$scope.affiliate.membership);
            $scope.affiliate.membership.colaborationagree = $scope.local.membership.colaborationagree;

            $scope.updateAccount(function(err) {
                if (err != null) {
                    toaster.pop('error', "Error", "Problemas con el servicio. Intente más tarde.");
                } else {
                    toaster.pop('success', "Información guardada", "Acuerdo de colaboración actualizado");
                }
            });

        };

        // UPDATE CHANGE ADMIN CONTROL
        //
        $scope.updateStatusAffiliate = function() {

            var stop = false;
            if ($scope.local.membership.registervalid != $scope.affiliate.membership.registervalid){
                $scope.affiliate.membership.registervalid = $scope.local.membership.registervalid;
                $log.log ('valido',$scope.affiliate);
            } else {
                $log.log ('NO hay cambios',$scope.affiliate);
            }
            if ($scope.local.membership.omtmargin != $scope.affiliate.membership.omtmargin){
                $scope.affiliate.membership.omtmargin = $scope.local.membership.omtmargin;
                //console.log ('cambio margen',$scope.affiliate);

            }
            if ($scope.local.membership.registervalid && ($scope.local.membership.omtmargin == 0 ||
                $scope.local.membership.omtmargin == null ||
                $scope.local.membership.omtmargin == undefined)){
                stop = true
                toaster.pop('error', "Error", "No se puede validar con esa comisión");
            }
            if ($scope.local.omtcomment != $scope.affiliate.omtcomment){
                $scope.affiliate.omtcomment = $scope.local.omtcomment;
                console.log ('agrego comentarios', $scope.affiliate);
            }
            if (!stop)
                $scope.updateAccount(function(err) {
                    if (err != null) {
                       toaster.pop('error', "Error", "Problemas con el servidor intente más tarde");
                    } else {
                       toaster.pop('success', "Afiliado Actualizado", "Se han guardado las modificaciones");
                    }
                });
        };

        $scope.updateAccount = function (callback) {
            if ($scope.rolename == 'affiliate' && $scope.affiliate != null) {
                tools_service.showPreloader($scope, "show");
                var rq = {
                    command: 'save',
                    service: 'api',
                    request: {
                        data: $scope.affiliate,
                        query: { code: $scope.affiliate.code },
                        collectionname: 'Affiliate',
                        oncompleteeventkey: 'save.done',
                        onerroreventkey: 'save.error',
                        populate : [{path : 'user'}, {path: 'wlcustom'}]
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    tools_service.showPreloader($scope, "hide");
                    $scope.affiliate = rsp;
                    $scope.originalSlug = $scope.affiliate.slug.toString();
                    getWhiteLabelTemplate();
                    //$scope.local = JSON.parse(JSON.stringify($scope.affiliate));
                    if (callback != null && typeof (callback) === 'function') { callback(); }
                    yto_session_service.refreshSession(function (session) { console.log('session refresh...'); });
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "hide");
                    tools_service.showConectionError($scope, "show");
                    console.log(err);
                    if (callback != null && typeof (callback) === 'function') { callback(err); }
                });
            }


            if ($scope.rolename == 'dmc' && $scope.dmc != null) {
                tools_service.showPreloader($scope, "show");
                $scope.checkWellcomeWindow();
                var rq = {
                    command: 'save',
                    service: 'api',
                    request: {
                        data: $scope.dmc,
                        query: { code: $scope.dmc.code },
                        collectionname: 'DMCs',
                        oncompleteeventkey: 'save.done',
                        onerroreventkey: 'save.error',
                        populate: [{ path: 'user' }, { path: 'admin'}]
                    }
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    tools_service.showPreloader($scope, "hide");
                    $scope.dmc = rsp;
                    //$scope.local = JSON.parse(JSON.stringify($scope.dmc));
                    if (callback != null && typeof (callback) === 'function') { callback(); }
                    yto_session_service.refreshSession(function (session) { console.log('session refresh...'); });

                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    tools_service.showPreloader($scope, "hide");
                    tools_service.showConectionError($scope, "show");
                    console.log(err);
                    if (callback != null && typeof (callback) === 'function') { callback(err); }
                });
            }


        };

        $scope.updateWhiteLabel = function (templateType) {

            if($scope.slugIsValid === true){
                if (templateType == "custom") {
                    console.log($scope.local.wlcustom);
                    $scope.affiliate.wlcustom = JSON.parse(JSON.stringify($scope.local.wlcustom));
                    if ($scope.affiliate.wlcustom.code == "default_wl" ) {
                        $scope.setNewCustomizedWLTemplate();
                    } else {
                        $scope.saveWLTemplateChanges();
                    }

                } else {
                    //$scope.affiliate.wlcustom = null;
                    $scope.updateAccount(function (err) {
                        err != null ? toaster.pop('error', "Error", "Problemas con el servicio. Intentelo más tarde.") : toaster.pop('success', "Información guardada", "Marca Blanca actualizada");
                    });
                }
            } else {
                showInvalidSlugMessage();
            }
        };

        //WHITE LABEL TEMPLATE HANDLING
        $scope.setNewCustomizedWLTemplate = function (callback) {
            var newwlcustom = whitelabelhelpers.newBlankWLCustom($scope.affiliate);
            $scope.affiliate.wlcustom = newwlcustom;
            $scope.local.wlcustom = newwlcustom;
            var rqSWL = whitelabelhelpers.saveWLCustom(newwlcustom);
            rqSWL.on(rqSWL.oncompleteeventkey, function (savedwlcustom) {
                $scope.affiliate.wlcustom = savedwlcustom;
                $scope.local.wlcustom = savedwlcustom;
                $scope.updateAccount(function (err) {
                    err != null ? toaster.pop('error', "Error", "Problemas con el servicio. Intente más tarde.") : toaster.pop('success', "Información guardada", "Datos de empresa Actualizados");
                    callback = ! null ? callback() : null;
                });
            });
            rqSWL.on(rqSWL.onerroreventkey, function (err) {
                console.log(err);
                callback = ! null ? callback() : null;
            });
        };

        $scope.saveWLTemplateChanges = function () {
            var rqSWL = whitelabelhelpers.saveWLCustom($scope.affiliate.wlcustom);
            rqSWL.on(rqSWL.oncompleteeventkey, function (savedwlcustom) {
                $scope.affiliate.wlcustom = savedwlcustom;
                $scope.updateAccount(function (err) {
                    err != null ? toaster.pop('error', "Error", "Problemas con el servicio. Intentelo más tarde.") : toaster.pop('success', "Información guardada", "Marca Blanca actualizada");
                });
            });
            rqSWL.on(rqSWL.onerroreventkey, function (err) {
                console.log(err);
            });
            return rqSWL;
        };


        $scope.updateColaborationOMT = function () {
            $scope.dmc.membership.paymentoption = $scope.local.paymentoption;
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('success', "Cambios Guardados", "Perfil de DMC Actualizado");
                } else {
                    toaster.pop('error', "Error", "Problemas con el servidor intente más tarde");
                }
            });
        }

        $scope.updateContactDMC = function () {
            $scope.dmc.membership.companytaxid = true;
            $scope.dmc.company.location = angular.copy($scope.local.officeAddress);
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('success', "Data saved", "Company Contact Details was updated");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        $scope.checkExpenditure = function () {
            this.hasValues = false;
            for (var i = 0; i < $scope.local.expenditure.length; i++) {
                for (var j = 0; j < $scope.local.expenditure[i].months.length; j++) {
                    if ($scope.local.expenditure[i].months[j].value != "") {
                        this.hasValues = true;
                        break
                    }
                }
                if (this.hasValues) {
                    break
                }
            }
            if (this.hasValues) {
                $scope.showAlertCurrency = true;
            }
        };

        $scope.invalidchannels = false;
        $scope.saveChannel = function () {
            if ($scope.checkchannel()) {
                $scope.updateAccount(function (err) {
                    if (err == null) {
                        toaster.pop('success', "Data saved", "Account updated");
                    } else {
                        toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                    }
                });
            }
        };

        $scope.checkchannel = function () {
            if ($scope.dmc.membership.b2cchannel || $scope.dmc.membership.b2bchannel) {
                $scope.invalidchannels = false;
                return true;
            } else {
                $scope.invalidchannels = true;
                return false;
            }

        };

        $scope.updateStatusDMCOMT = function () {

            var changes = {
                validregister: false,
                autopublish: false,
                comment: false,
                dmcnamevoucher: false
            };
            // check if register is changed
            if ($scope.registervalid != $scope.dmc.membership.registervalid) {
                $scope.dmc.membership.registervalid = $scope.registervalid;
                changes.validregister = true;
            }
            // check if have autopublish changes
            if ($scope.autopublish != $scope.dmc.membership.autopublish) {
                $scope.dmc.membership.autopublish = $scope.autopublish;
                changes.autopublish = true;

            }

            if ($scope.omtcomment != $scope.dmc.omtcomment) {
                $scope.dmc.omtcomment = $scope.omtcomment;
                changes.comment = true;
            }

            function notificateValidDMC(callback) {
                var subject = $scope.dmc.name + " Account activated"
                var contentObj = {
                    dmc: {
                        name: $scope.dmc.name
                    }
                }
                var to = [$scope.dmc.user.email];
                $log.log("sending notification valid dmc");
                $scope.notification(subject, 'dmcemailconfirmed_en', contentObj, to, callback);
            }


            function notificateAutopublish(callback) {
                var subject = $scope.dmc.name + " can automatically publish programs"
                var contentObj = {
                    dmc: {
                        name: $scope.dmc.name
                    }
                }
                var to = [$scope.dmc.user.email];
                $log.log("sending notification autopublish");
                $scope.notification(subject, 'dmcemailautopublish_en', contentObj, to, callback);
            }

            $scope.updateAccount(function (err) {
                console.log('resok ', err);
                if (err == null) {
                    toaster.pop('success', "Cambios Guardados", "El DMC se ha actualizado");
                } else {
                    toaster.pop('error', "Error", "Problemas con el servidor intente más tarde");
                }

                (changes.validregister && $scope.registervalid) ? notificateValidDMC(function () {
                    toaster.pop('success', "DMC Validado", "DMC puede ingresar a la plataforma");
                }) : null;
                (changes.autopublish && $scope.autopublish) ? notificateAutopublish(function () {
                    toaster.pop('success', "DMC Puede Publicar", "DMC puede publicar automaticamente");
                }) : null;


            });
        }

        $scope.notification = function (subject, template, contentObj, to, callback) {

            var request = {
                command: 'email',
                service: 'api',
                request: {
                    oncompleteeventkey: 'email.done',
                    onerroreventkey: 'email.error',
                    to: to,
                    subject: subject,
                    mailtemplate: template,
                    mailparameter: contentObj,
                }
            };

            var rqMail = yto_api.send(request);
            //on response Ok
            rqMail.on(rqMail.oncompleteeventkey, function (rsp) {
                tools_service.showPreloader($scope, "hide");
                $log.info("Send Notification OK", rsp);
                callback != null && typeof (callback === 'function') ? callback() : null;
            });
            //on response noOk
            rqMail.on(rqMail.onerroreventkey, function (err) {
                $log.error(err);
                tools_service.showPreloader($scope, "hide");
                if ($scope.formlang == "es") {
                    toaster.pop('error', 'Error del Servidor', 'Inténtalo de nuevo más tarde.');
                } else {
                    toaster.pop('error', 'Server Error', 'Please try later.');
                }
                callback != null && typeof (callback === 'function') ? callback() : null;
                // end google analytics event to track action
            });

        };

        

        $scope.checkUpdateForm = function (valid) {
            if (valid) {
                $scope.updateBlur();
            }
        };
        // general save fn on blur field o check events	
        $scope.updateBlur = function () {
            tools_service.showPreloader($scope, "show")
            $scope.updateAccount(function (err) {
                tools_service.showPreloader($scope, "hide")
                if (err == null) {
                    toaster.pop('success', "Data saved", "Account updated");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        // check list reqs complete
        $scope.checkWellcomeWindow = function () {
            if ($scope.dmc.membership.companyimagescomplete &&
                $scope.dmc.membership.companycomplete &&
                $scope.dmc.membership.companytaxid) {
                $scope.dmc.membership.publicprofilecomplete = true;
            }

            if ($scope.dmc.membership.paymentcomplete &&
                $scope.dmc.membership.emergencycomplete &&
                $scope.dmc.membership.averagecomplete &&
                $scope.dmc.membership.confirmterms) {
                $scope.dmc.membership.privateprofilecomplete = true;
            }

        }

        $scope.updateCompanycomplete = function () {
            if ($scope.dmc.additionalinfo.registration.url &&
                $scope.dmc.additionalinfo.insurancepolicy.url
            ) {
                $scope.dmc.membership.companycomplete = true;
                $scope.updateBlur();
            }

        }

        $scope.checkConfirm = function () {
            $scope.dmc.membership.confirmterms = $scope.local.membership.confirmterms;
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('success', "Data saved", "Account updated");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        $scope.invalidproducts = false;
        $scope.saveProduct = function () {
            if ($scope.chekproduct()) {
                $scope.updateAccount(function (err) {
                    if (err == null) {
                        toaster.pop('success', "Data saved", "Account updated");
                    } else {
                        toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                    }
                });
            }
        };

        $scope.chekproduct = function () {
            if ($scope.dmc.membership.toursmultidays || $scope.dmc.membership.tailormade || $scope.dmc.membership.groups) {
                $scope.invalidproducts = false;
                return true;
            } else {
                $scope.invalidproducts = true;
                return false;
            }
        };


        $scope.loadExpenditure = function () {
            $scope.local.expenditure = [];

            var cant = $scope.dmc.expenditure.length

            if (cant > 2) {
                $scope.local.expenditure.push($scope.dmc.expenditure[cant - 2]);
                $scope.local.expenditure.push($scope.dmc.expenditure[cant - 1]);
            } else {
                $scope.local.expenditure = angular.copy($scope.dmc.expenditure);
            }
        }

        $scope.updateExpenditure = function () {
            $scope.dmc.expenditure = angular.copy($scope.local.expenditure);
            $scope.dmc.membership.averagecomplete = true;
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('success', "Data saved", "Average daily expenditure was updated");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        $scope.loadPayment = function() {
            $scope.local.currency = angular.copy($scope[$scope.rolename].currency);
            $scope.local.bankinfo = angular.copy($scope[$scope.rolename].bankinfo);
        };

        $scope.updatePayment = function () {
            $scope.theuser.currency = angular.copy($scope.local.currency);
            $scope.dmc.currency = angular.copy($scope.local.currency);
            $scope.dmc.bankinfo = angular.copy($scope.local.bankinfo);
            $scope.dmc.membership.paymentcomplete = true;
            $scope.updateAccount(function (err) {
                if (err == null) {
                    toaster.pop('success', "Data saved", "Payment info was updated");
                } else {
                    toaster.pop('error', "Error", "Sorry, server problem. Try later.");
                }
            });
        };

        $scope.onSelectAddress = function ($item) {
            $scope.local.officeAddress = angular.copy($scope.parseGoogleResult($item));
        }

        $scope.loadContact = function () {
            $scope.local.officeAddress = angular.copy($scope.dmc.company.location);
        }

        $scope.validateYear = function () {
            if ($scope.dmc.company) {
                $scope.dmc.company.constitutionyear = parseInt($scope.dmc.company.constitutionyear);
            }
        }

        $scope.newpasswordstuff = {
            newpassword: '',
            repeatpassword: '',
            oldpassword: ''
        };

        $scope.changeuserpassword = function (callback) {

            if ($scope.newpasswordstuff.newpassword != null && $scope.newpasswordstuff.newpassword != '') {
                if ($scope.newpasswordstuff.newpassword == $scope.newpasswordstuff.repeatpassword) {
                    tools_service.showPreloader($scope, "show");
                    var rq = {
                        command: 'changepassword',
                        service: 'membership',
                        request: {
                            email: $scope[$scope.rolename].user.email,
                            oldpassword: $scope.newpasswordstuff.oldpassword,
                            newpassword: $scope.newpasswordstuff.newpassword,
                        }
                    };
                    var rqCB = yto_api.send(rq);

                    rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                        tools_service.showPreloader($scope, "hide");
                        // toaster.pop('success',
                        //             'Contraseña modificada',
                        //             'Necesitas acceder de nuevo');
                        tools_service.showFullError($scope, "show", 'success', 'Contraseña modificada, Necesitas acceder de nuevo ');

                        $timeout(function(){
                            yto_session_service.logOut(function (rsp) {
                                    window.location = '/';
                            });
                        }, 3000);
                    });
                    //on response noOk
                    rqCB.on(rqCB.onerroreventkey, function (err) {
                        tools_service.showPreloader($scope, "hide");
                        toaster.pop('error', 'Error al cambiar contraseña', err);
                    });


                } else {
                    toaster.pop('error', 'Contraseña requerida', 'Las nuevas contraseñas no coinciden');
                }
            } else {
                toaster.pop('error', 'Contraseña requerida', 'La nueva contraseña no puede estar vacía.');
            }
        };

        $scope.changeuseremail = function(callback) {
            if ($scope.theuser.newEmail != null && $scope.theuser.newEmail != '') {

                var rq = {
                    command: 'changeemail',
                    service: 'membership',
                    request: {
                        oldemail: $scope[$scope.rolename].user.email,
                        newemail: $scope.theuser.newEmail,
                        oncompleteeventkey: 'auth.done',
                        onerroreventkey: 'auth.error',
                    }
                };
                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    // toaster.pop('success',
                    //             'Correo Modificado',
                    //             'Necesitas identificarte de nuevo');
                    yto_session_service.logOut(function (rsp) {
                                window.location = '/';
                    });
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    toaster.pop('error', 'Error modificando el correo', err);
                });

            } else {
                toaster.pop('error', 'Correo requerido', 'El nuevo correo no puede estar vacío.');
            }
        };

        $scope.requestdeleteaccount = function(callback) {

            $scope.affiliate.membership.requestdelete = true;
             var rq = {
                command: 'removeaccount',
                service: 'membership',
                request:{
                    email: $scope[$scope.rolename].user.email,
                    oncompleteeventkey: 'auth.done',
                    onerroreventkey: 'auth.error',
                }
            };

            var rqCB = yto_api.send(rq);
            tools_service.showPreloader($scope, "show");

            rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                tools_service.showPreloader($scope, "hide");
                toaster.pop('warning', 'Mensaje enviado', 'Has enviado la solicitud para borrar tu cuenta.');
                $scope.updateAccount(function(err) {
                    if (err == null) {
                        $log.log('Account updated requestdelete');
                    } else {
                        toaster.pop('error', 'Error', 'Problemas con el servicio. Por favor intente más tarde.');
                    }
                });
            });
            //On response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                tools_service.showPreloader($scope, "hide");
                tools_service.showConectionError($scope, "show");
                toaster.pop('error', 'Error', 'Problemas con el servicio. Por favor intente más tarde.');
            });

        };

        // start page
        
    }
]);

/**
 * directiva para validar varios correos separados por ,
 */
app.directive('multipleEmails', function () {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ctrl) {
	      ctrl.$parsers.unshift(function(viewValue) {

	        var emails = viewValue.split(',');
	        // loop that checks every email, returns undefined if one of them fails.
	        var re = /\S+@\S+\.\S+/;

	        // angular.foreach(emails, function() {
	          var validityArr = emails.map(function(str){
	              return re.test(str.trim());
	          }); // sample return is [true, true, true, false, false, false]
	          console.log(emails, validityArr);
	          var atLeastOneInvalid = false;
	          angular.forEach(validityArr, function(value) {
	            if(value === false)
	              atLeastOneInvalid = true;
	          });
	          if(!atLeastOneInvalid) {
	            // ^ all I need is to call the angular email checker here, I think.
	            ctrl.$setValidity('multipleEmails', true);
	            return viewValue;
	          } else {
	            ctrl.$setValidity('multipleEmails', false);
	            return undefined;
	          }
	        // })
	      });
	    }
	  };
	});
