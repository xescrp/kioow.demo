app.controller("resultsCtrl",
    ['$scope',
    '$log',
    '$http',
    '$window',
    '$location',
    '$route',
    '$filter',
    '$uibModal',
    'tools_service',
    'yto_api',
    'yto_session_service',
    '$cookies',
    'Lightbox', 
    'destinations_service',   
    function(
        $scope,
        $log,
        $http,
        $window,
        $location,
        $route,
        $filter,
        $uibModal,
        tools_service,
        yto_api,
        yto_session_service,
        $cookies,
        Lightbox,
        destinations_service
        ){
        'use strict';
        $scope.brandpath = '';
        if (typeof brandPath != 'undefined') {
            if (brandPath != null){
               $scope.brandpath = brandPath;
            }
        };

        var juststarted = true;
        //
        //
        //BEGIN INFITE SCROLL FUNCTIONS
        //
        //


        /**
         * Detect if the element is in viewport
         * @param  {dom element}  el document.element
         * @return {Boolean}   true if is in viewport
         */
        function isElementInViewport (el) {

            //special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
            );
        }
        
        
        /**
         * trigger moreresults when element #moreresultsbtn is in viewPort
         */
        function NeedMoreResults() {
            // if showmore is true have more pages
            // if isElementInViewport button more in windows
            //console.log ('???? is element ',isElementInViewport(document.getElementById('moreresultsbtn')));
            if (!$scope.loadingmorebtn && $scope.showmore() && isElementInViewport(document.getElementById('moreresultsbtn'))){
                //console.log ('Launch more results >>>>> trigger'); 
                $scope.getmoreresults();
            }
        }
        /**
         * Event watch scroll window
         */
        angular.element($window).bind("scroll resize", function() {
            NeedMoreResults();
        });

        

         //show blocks by default
        $scope.viewblocks = false;
        
        //check if cookie was set and apply cookie view
        //console.log("checking for cookie");

        if ($cookies.get('viewblocks') == 'true') {
            $scope.viewblocks = true;    
        } else if ($cookies.get('viewblocks') == 'false') {
            $scope.viewblocks = false;    
        }

        //set cookie
        $scope.setviewcookie = function() {
            if ($scope.viewblocks == true) {
                $cookies.put('viewblocks','true');
            } else {
                $cookies.put('viewblocks','false');
            }
        };
        
        //HASHTABLE DEFINITION
        var hash = function () {
            this.length = 0;
            this.items = {};
        };
        hash.prototype.hasItem = function (key) {
            return this.items.hasOwnProperty(key);
        };
        hash.prototype.get = function (key) {
            return this.hasItem(key) ? this.items[key] : undefined;
        };
        hash.prototype.set = function (key, value) {
            var previous = undefined;
            if (this.hasItem(key)) {
                previous = this.items[key];
            }
            else {
                this.length++;
            }
            this.items[key] = value;
            return previous;
        };
        hash.prototype.remove = function (key) {
            if (this.hasItem(key)) {
                previous = this.items[key];
                this.length--;
                delete this.items[key];
                return previous;
            }
            else {
                return undefined;
            }
        };
        hash.prototype.each = function (fn) {
            for (var k in this.items) {
                if (this.hasItem(k)) {
                    fn(k, this.items[k]);
                }
            }
        };
        hash.prototype.clear = function () {
            this.items = {};
            this.length = 0;
        }; 
        hash.prototype.values = function () {
            var _values = [];
            for (var prop in this.items) { 
                _values.push(this.items[prop]);
            }
            return _values;
        }
        //END HASHTABLE DEFINITION
        var allcodes = new hash();
        var allparents = new hash();

        $scope.getUrlCloudinary = function (url, imagename) {
            return tools_service.cloudinaryUrl(url, imagename);
        };
    //collapse everything only when NO RESULTS
    $scope.gotresults = false; //bring gotresults from server
    if ($scope.gotresults) {
        $scope.pricecollapse = true; // by default ever true
        $scope.durationcollapse = true; // by default ever true
        $scope.kindtripcollapse = false;
        // deprecated $scope.salidascollapse = false;
        $scope.languagecollapse = false;
        $scope.categorycollapse = false;
        $scope.kindtravelercollapse = false;
        // deprecated $scope.categoriacollapse = false;
        $scope.tagscollapse = false;                
        $scope.ciudadescollapse = false;
        $scope.countriescollapse = false;
        $scope.dmcscollapse = false;
    } else {
        $scope.pricecollapse = true;
        $scope.durationcollapse = true;
        $scope.kindtripcollapse = true;
        // deprecated $scope.salidascollapse = true;
        $scope.languagecollapse = true;
        $scope.categorycollapse = true;
        $scope.kindtravelercollapse = false;
        // deprecated $scope.categoriacollapse = true;
        $scope.tagscollapse = true;
        $scope.countriescollapse = true;
        $scope.ciudadescollapse = true;
        $scope.dmcscollapse = true;
    }
        
    function _findtags(slugs) {
        return _.filter($scope.triptags, function (tag) { 
            return (slugs.indexOf(tag.slug) >= 0);
        });
    }    

    //full tags
    $scope.triptags = [];
    // init filters
    function _newFilterProduct(){
        var filtersProduct = {
            countries: [],
            cities : [],
            tags : [],
            hotelcats : [],
            kindtravelers : [],
            kindtrip: [],
            regimen:[],
            guidelanguages: [],
            mindays: 1,
            maxdays: 50,
            pricemin: 0,
            pricemax: 10000,
            providers: [],
            kind : null,
            exclusion: [],
            date : ""
        };
        return filtersProduct;
    }
    // set scope var filter products
    $scope.filtersProduct = _newFilterProduct();
    // copia de seguridad para cuando pulsemos clear filter
    var fitersProductoOrig = {};

    function _newFiltersList(){
        var filterList = {
            b2b: null,
            b2c: null,
            country: [],
            cities :[],
            tags : [],
            hotelcats : [],
            regimen : [],
            guidelanguages: [],
            kindtravelers : [],
            kindtrip: [],
            kind: [{ label: 'Programa en Grupo', slug: 'group' }, { label: 'Programa independiente', slug: 'private' }],
            mindays: 1,
            maxdays: 50,
            pricemin: 0,
            pricemax: 10000,
            providers: [],
            exclusions: [],
            date : ""
        };
        return filterList;
    }

    function _newPageFilters() {
        var pagefilters = {
            currency: 'EUR',
            maxresults: 12,
            orderby: 'pvp.b2b',
            ordinal: 'asc',
            sort: 'asc',
            page: 0,
            lastcode: null,
            prevcode: null
        };
        return pagefilters;
    };
    // set scope var filter List
    $scope.filtersList = _newFiltersList();

    $scope.pagerhelp = {
        totalitems: 0,
        maxresults: 0,
        currentpage: 0,
        pages: 0
    };
    

    $scope.pagefilters = _newPageFilters();
        
    // Instantiate sliders
    // https://github.com/seiyria/bootstrap-slider
    var sliderMaxPrice = $scope.filtersList.pricemax;
    var sliderMinPrice = $scope.filtersList.pricemin;
    $scope.sliderMaxPrice = sliderMaxPrice;
    $scope.sliderMinPrice = sliderMinPrice;
    var priceSlider = new Slider("#priceSlider", {
        // initial options object
        min : sliderMinPrice,
        max : sliderMaxPrice,
        step : 50,
        value : [sliderMinPrice, sliderMaxPrice]
    });
    
    //triger event price slider change
    priceSlider.on('slideStop', function (slideEvt) {
        //console.log ('1on slideStop event, value: ',priceSlider.getValue());
        console.log('on slideStop event, value: ', slideEvt);
    });
    //triger event price slider change
    priceSlider.on('change', function (slideChangeEvt) {
        //console.log ('1on slideStop event, value: ',priceSlider.getValue());
        console.log('on change event, value: ', slideChangeEvt);

    });    
    
    var sliderMinDay = $scope.filtersList.mindays;
    var sliderMaxDay = $scope.filtersList.maxdays;
    $scope.sliderMinDay = sliderMinDay;
    $scope.sliderMaxDay = sliderMaxDay;

    var durationSlider = new Slider("#durationSlider", {
        // initial options object
        min : sliderMinDay,
        max : sliderMaxDay,
        step : 1,
        value : [sliderMinDay, sliderMaxDay]
    });
    
    //triger event price slider change
    durationSlider.on('slideStop', function (slideEvt) {
        //console.log ('1on slideStop event, value: ',priceSlider.getValue());
        console.log('on slideStop event, value: ', slideEvt);
    });

    durationSlider.on('change', function (slideChangeEvt) {
        //console.log ('1on slideStop event, value: ',priceSlider.getValue());
        console.log('on change event, value: ', slideChangeEvt);

    });   

    $scope.getquery = function () {
        var querystring = $location.search();
        $scope.filtersProduct.countries = querystring.country != null ? querystring.country.split(',') : null;
        $scope.filtersProduct.cities = querystring.cities != null ? querystring.cities.split(',') : null;
        $scope.filtersProduct.tags = querystring.tags != null ? querystring.tags.split(',') : null;
        $scope.filtersProduct.hotelcats = querystring.hotelcats != null ? querystring.hotelcats.split(',') : null;
        $scope.filtersProduct.providers = querystring.providers != null ? querystring.providers.split(',') : null;
        $scope.filtersList.exclusions = querystring.exclusions != null ? querystring.exclusions.split(',') : null;
        $scope.filtersProduct.mindays = querystring.mindays != null && querystring.mindays != '' ? parseInt(querystring.mindays) : 1;
        $scope.filtersProduct.maxdays = querystring.maxdays != null && querystring.maxdays != '' ? parseInt(querystring.maxdays) : 50;
        $scope.filtersProduct.pricemin = querystring.pricemin != null && querystring.pricemin != '' ? parseInt(querystring.pricemin) : 1;
        $scope.filtersProduct.pricemax = querystring.pricemax != null && querystring.pricemax != '' ? parseInt(querystring.pricemax) : 10000;
        $scope.filtersProduct.date = querystring.date != null && querystring.date != '' ? querystring.date : '';
        $scope.filtersProduct.kind = querystring.kind != null && querystring.kind != '' ? querystring.kind : null;
        $scope.pagefilters.currency = querystring.currency != null && querystring.currency != '' ? querystring.currency : 'EUR';
        $scope.pagefilters.maxresults = querystring.maxresults != null && querystring.maxresults != '' ? parseInt(querystring.maxresults) : 12;
        $scope.pagefilters.orderby = querystring.orderby != null && querystring.orderby != '' ? querystring.orderby : 'pvp.b2b';
        $scope.pagefilters.ordinal = querystring.ordinal != null && querystring.ordinal != '' ? querystring.ordinal : 'asc';
        $scope.pagefilters.sort = querystring.ordinal != null && querystring.ordinal != '' ? querystring.ordinal : 'asc';
        $scope.pagefilters.page = querystring.page != null && querystring.page != '' ? parseInt(querystring.page) : 0;
        //$scope.pagefilters.lastcode = querystring.lastcode != null && querystring.lastcode != '' ? querystring.lastcode : null;
    }
        
    $scope.setquery = function () {
        ($scope.filtersProduct.countries != null && $scope.filtersProduct.countries.length > 0) ? 
            $location.search('country', $scope.filtersProduct.countries.join(',')): $location.search('country', null);
        ($scope.filtersProduct.cities != null && $scope.filtersProduct.cities.length > 0) ? 
            $location.search('cities', $scope.filtersProduct.cities.join(',')): $location.search('cities', null);
        ($scope.filtersProduct.tags != null && $scope.filtersProduct.tags.length > 0) ? 
            $location.search('tags', $scope.filtersProduct.tags.join(',')): $location.search('tags', null);
        ($scope.filtersProduct.hotelcats != null && $scope.filtersProduct.hotelcats.length > 0) ? 
            $location.search('hotelcats', $scope.filtersProduct.hotelcats.join(',')): $location.search('hotelcats', null);
        ($scope.filtersProduct.providers != null && $scope.filtersProduct.providers.length > 0) ? 
            $location.search('providers', $scope.filtersProduct.providers.join(',')): $location.search('providers', null);
        ($scope.filtersProduct.mindays != null && $scope.filtersProduct.mindays > 0) ? 
            $location.search('mindays', $scope.filtersProduct.mindays): $location.search('mindays', null);
        ($scope.filtersProduct.maxdays != null && $scope.filtersProduct.maxdays > 0) ? 
            $location.search('maxdays', $scope.filtersProduct.maxdays): $location.search('maxdays', null);
        ($scope.filtersProduct.pricemin != null && $scope.filtersProduct.pricemin > 0) ? 
            $location.search('pricemin', $scope.filtersProduct.pricemin): $location.search('pricemin', null);
        ($scope.filtersProduct.pricemax != null && $scope.filtersProduct.pricemax > 0) ? 
            $location.search('pricemax', $scope.filtersProduct.pricemax): $location.search('pricemax', null);
        ($scope.filtersProduct.kind != null && $scope.filtersProduct.kind != '') ? 
            $location.search('kind', $scope.filtersProduct.kind): $location.search('kind', null);

        ($scope.pagefilters.currency != null && $scope.pagefilters.currency != '') ?
            $location.search('currency', $scope.pagefilters.currency): $location.search('currency', null);
        ($scope.pagefilters.maxresults != null && $scope.pagefilters.maxresults > 0) ?
            $location.search('maxresults', $scope.pagefilters.maxresults): $location.search('maxresults', null);
        ($scope.pagefilters.orderby != null && $scope.pagefilters.orderby > 0) ?
            $location.search('orderby', $scope.pagefilters.orderby): $location.search('orderby', null);
        ($scope.pagefilters.page != null && $scope.pagefilters.page > 0) ?
            $location.search('page', $scope.pagefilters.page): $location.search('page', null);
    }    
        
    $scope.buildquery = function (filter) { 
        //for page...
        $scope.filtersearch = {
            currency: $scope.pagefilters.currency,
            maxresults: $scope.pagefilters.maxresults,
            orderby: $scope.pagefilters.orderby,
            ordinal: $scope.pagefilters.ordinal,
            sort: $scope.pagefilters.sort,
            page: $scope.pagefilters.page,
            countries: [],
            cities: [],
            tags: [],
        };
        // console.log('filter pre-building...');
        // console.log($scope.filtersList);
        //search criteria...
        if (filter.countries != null && filter.countries.length > 0) {
            var findedcountries = destinations_service.findcountries(
                { fieldname: 'slug', search: filter.countries });
            $scope.filtersearch.countries = _.pluck(findedcountries, '_id');
        }
        if (filter.cities != null && filter.cities.length > 0) {
            var findedcities = destinations_service.findcities({ fieldname: 'slug', search: filter.cities });
            $scope.filtersearch.cities = _.pluck(findedcities, '_id');
        }
        if (filter.tags != null && filter.tags.length > 0) {
            $scope.filtersearch.tags = filter.tags;
        }
        if (filter.hotelcats != null && filter.hotelcats.length > 0) {
            $scope.filtersearch.tags = $scope.filtersearch.tags.concat(filter.hotelcats);
        }
        if (filter.kindtravelers != null && filter.kindtravelers.length > 0) {
            $scope.filtersearch.tags = $scope.filtersearch.tags.concat(filter.kindtravelers);
        }
        if (filter.kindtrip != null && filter.kindtrip.length > 0) {
            $scope.filtersearch.tags = $scope.filtersearch.tags.concat(filter.kindtrip);
        }
        if (filter.guidelanguages != null && filter.guidelanguages.length > 0) {
            $scope.filtersearch.tags = $scope.filtersearch.tags.concat(filter.guidelanguages);
        }
        if (filter.kind != null && filter.kind.length != '') {
            $scope.filtersearch.group = filter.kind == 'group' ? true : null;
            $scope.filtersearch.private = filter.kind == 'private' ? true : null;
        }
        if (filter.providers != null && filter.providers.length > 0) {
            $scope.filtersearch.providers = filter.providers;
        }
        if (filter.pricemin > 1) { 
            $scope.filtersearch.pricemin = filter.pricemin;
        }
        if (filter.pricemax < 10000) {
            $scope.filtersearch.pricemax = filter.pricemax;
        }
        if (filter.mindays > 1) {
            $scope.filtersearch.mindays = filter.mindays;
        }
        if (filter.maxdays < 50) {
            $scope.filtersearch.maxdays = filter.maxdays;
        }
        if ($scope.filtersList.b2c != null && $scope.filtersList.b2c == true) { 
            $scope.filtersearch.b2cchannel = true;
        }
        if ($scope.filtersList.b2b != null && $scope.filtersList.b2b == true) {
            $scope.filtersearch.b2bchannel = true;
        }
        if (allcodes != null && allcodes.length > 0) { 
            $scope.filtersearch.exclusion = _.map(allcodes.values(), function(pr){ return pr.code; });
        }
        if (filter.date != null && filter.date != '') { 
            $scope.filtersearch.departuredate = filter.date;
        }

        juststarted == false ? $scope.setquery() : juststarted = false;
    }

    $scope.resetfilters = function () { 
        $scope.filtersProduct = _newFilterProduct();        
        $scope.filtersList = _newFiltersList();
        $scope.pagefilters = _newPageFilters();

        $location.search('cities', null);
        $location.search('tags', null);
        $location.search('hotelcats', null);
        $location.search('providers', null);
        $location.search('mindays', null);
        $location.search('maxdays', null);
        $location.search('pricemin', null);
        $location.search('pricemax', null);
        $location.search('kind', null);
        $location.search('date', null);
        $location.search('lastcode', null);
    }
        
    $scope.fractionSize = 0;

    $scope.querystring = tools_service.getQuerystring();
    
    /**
     * limpia los filtros de busquedas
     */
    $scope.clearFilters = function () {
        priceSlider.setAttribute('max', sliderMaxPrice);
        priceSlider.setAttribute('min', sliderMinPrice);
        priceSlider.refresh();
        durationSlider.setAttribute('max', sliderMaxDay);
        durationSlider.setAttribute('min', sliderMinDay);
        durationSlider.refresh();   	
    	$scope.filtersProduct = angular.copy(fitersProductoOrig);
        $scope.sendFilters();    	
    }

    $scope.sendFilters = function () {

        tools_service.showPreloader($scope, "show");
        $log.log('sfl', $scope.filtersProduct);
        $location.search('lastcode', null);
        $scope.pager.lastcode = null;
        $scope.pagefilters.lastcode = null;
        $scope.filtersProduct.exclusion = [];
        //sliders...
        var c = priceSlider.getValue();
        c.sort(function (a, b) { return b - a; });
        $scope.filtersProduct.pricemax = c[0];
        $scope.filtersProduct.pricemin = c[1];

        var d = durationSlider.getValue();
        d.sort(function (a, b) { return b - a; });
        $scope.filtersProduct.maxdays = d[0];
        $scope.filtersProduct.mindays = d[1];

        allcodes = null;
        allcodes = new hash();
        $scope.buildquery($scope.filtersProduct);

        $scope.loadresults(function (results) {
            //ok
            _renderResults(results.pager);
            // check if have changes since first query
            _checkFiltersChanges()
        }, function (err) {
            //error
            console.log(err);
        });
    };

    
    //
    $scope.setOrder = function(filter){
        var urlParams = {};
        if ($scope.pagefilters.orderby == filter){
             $scope.setTypeOrder();
        }else{
            $scope.pagefilters.orderby = filter;
        }
        if ($scope.pagefilters.orderby != ""){
            urlParams = $location.search("orderby" , $scope.pagefilters.orderby);
            //location.reload();
        } else {
            $location.search("orderby" , null);
            //location.reload();
        }
        if ($scope.pagefilters.ordinal != ""){
            urlParams = $location.search("ordinal" , $scope.pagefilters.ordinal);
            //location.reload();
        
        } else {
            $location.search("type" , null);
            //location.reload();
        }

        $scope.filtersearch.orderby = $scope.pagefilters.orderby;
        $scope.filtersearch.ordinal = $scope.pagefilters.ordinal;
        
        tools_service.showPreloader($scope, 'show');
        
        $scope.reloadresults();
        $scope.partialresults = false;
    }
    //
    $scope.setTypeOrder = function(){
        if ($scope.pagefilters.ordinal == 'asc'){
            $scope.pagefilters.ordinal = 'desc';
            $scope.pagefilters.sort = 'desc';
        }else{
            $scope.pagefilters.ordinal = 'asc';
            $scope.pagefilters.sort = 'asc';
        }
    }

    $scope.uncheckdate = function(element){
        //$log.log($scope.filtersList.date);
        //$log.log(element.month.value);
        if ($scope.filtersList.date == element.month.value){
            $scope.filtersList.date = undefined;
        }
    }
    var _prevkind = null;
    $scope.uncheckkind = function(element){
            // console.log(_prevkind);
            // console.log($scope.filtersProduct.kind);
        if ($scope.filtersProduct.kind == _prevkind){
            $scope.filtersProduct.kind = null;
        }
        _prevkind = $scope.filtersProduct.kind;
    };

    $scope.init = function () {
        $scope.fixBuscadorCollapse();
            recoverSession(function () {
            	
            	// obtengo el filtro
                $scope.getquery();
                
                $scope.buildquery($scope.filtersProduct);

                $scope.loadresults(function (results) { 
                    //ok
                    _renderResults(results.pager);
                    _setProductFilters(results.filter);
                    // salvo el filtro original
                    fitersProductoOrig = angular.copy($scope.filtersProduct);
                    // console.log ('fitersProductoOrig ',fitersProductoOrig);
                }, function (err) { 
                    //error
                    console.log(err);
                });
            
        });
        // remove server breadcrumb
    }; 

    // read cookie snapshot
    $scope.snapshoot = $cookies.snapshoot;
    $scope.pager = null;
    $scope.filtersearch = null;

    tools_service.showPreloader($scope, 'show');

    $scope.$on('destinations.loaded', function (event, mass) {
        console.log('destinations loaded...'); console.log(mass);
            // _recoverTags(function () {
        $scope.filtersList.countries = destinations_service.countries;
        $scope.filtersList.cities = destinations_service.cities;
        $scope.triptags = destinations_service.triptags;
        //'published', 'language', 'kindtrip', 'kindtraveler', 'hotel-category'
        $scope.filtersList.tags = _.filter(_findtags($scope.triptags), function (tag) { return tag.state == 'published' });
        $scope.filtersList.guidelanguages = _.filter(_findtags($scope.triptags), function (tag) { return tag.state == 'language' });
        $scope.filtersList.hotelcats = _.filter(_findtags($scope.triptags), function (tag) { return tag.state == 'hotel-category' });
        $scope.filtersList.kindtravelers = _.filter(_findtags($scope.triptags), function (tag) { return tag.state == 'kindtraveler' });
        $scope.filtersList.kindtrip = _.filter(_findtags($scope.triptags), function (tag) { return tag.state == 'kindtrip' });
        $scope.filtersList.regimen = _.filter(_findtags($scope.triptags), function (tag) { return tag.state == 'regimen' });
        $scope.init();
        // }, function (err) {
        //     console.log(err);
        // });
    });

    var rtitems = 0;
    
    $scope.session = {};
        
    function recoverSession(callback) {
        var token = null;
        $scope.session = yto_session_service.currentSession();     
        $scope.sessioncondition = {};
        $scope.session.user.isAffiliate ? $scope.filtersList.b2b = true : null;
        $scope.session.user.isAffiliate ? $scope.filtersList.b2c = false : null;
        $scope.session.user.isTraveler ? $scope.filtersList.b2c = true : null;
        /* TODO check if is it correct */
        $scope.session.user.isDMC ? $scope.filtersList.b2c = true : null;
        $scope.session.user.isAdmin ? $scope.filtersList.b2c = true : null;      
        if (callback) { callback(); }
    }    

    function _setProductFilters(searchfilter) {           
        $scope.filtersList.countries = _.sortBy(destinations_service.findcountries({ fieldname: '_id', search: searchfilter.countries }), function (country) { return country.label_es; });
        $scope.filtersList.cities = _.sortBy(destinations_service.findcities({ fieldname: '_id', search: searchfilter.cities }), function (city) { return city.label_en; });
        //'published', 'language', 'kindtrip', 'kindtraveler', 'hotel-category'
        $scope.filtersList.tags = _.filter(_findtags(searchfilter.tags), function (tag) { return tag.state == 'published' });
        $scope.filtersList.guidelanguages = _.filter(_findtags(searchfilter.tags), function (tag) { return tag.state == 'language' });
        $scope.filtersList.hotelcats = _.filter(_findtags(searchfilter.tags), function (tag) { return tag.state == 'hotel-category' });
        $scope.filtersList.kindtravelers = _.filter(_findtags(searchfilter.tags), function (tag) { return tag.state == 'kindtraveler' });
        $scope.filtersList.regimen = _.filter(_findtags(searchfilter.tags), function (tag) { return tag.state == 'regimen' });
        $scope.filtersList.kindtrip = _.filter(_findtags(searchfilter.tags), function (tag) { return tag.state == 'kindtrip' });
        $scope.filtersList.providers = _.sortBy(searchfilter.dmcs, function (dmc) { return dmc.name });;

        
        sliderMaxPrice = $scope.filtersList.pricemax = $scope.filtersProduct.pricemax= searchfilter.price.max;
        sliderMinPrice = $scope.filtersList.pricemin = $scope.filtersProduct.pricemin = searchfilter.price.min;
        $scope.sliderMaxPrice = sliderMaxPrice;
        $scope.sliderMinPrice = sliderMinPrice;
        priceSlider.setAttribute('max', sliderMaxPrice);
        priceSlider.setAttribute('min', sliderMinPrice);
        priceSlider.refresh();

        sliderMinDay = $scope.filtersList.mindays = $scope.filtersProduct.mindays = searchfilter.days.min;
        sliderMaxDay = $scope.filtersList.maxdays = $scope.filtersProduct.maxdays = searchfilter.days.max;
        $scope.sliderMinDay = sliderMinDay;
        $scope.sliderMaxDay = sliderMaxDay;
        durationSlider.setAttribute('max', sliderMaxDay);
        durationSlider.setAttribute('min', sliderMinDay);
        durationSlider.refresh();
        console.log('filtersList',$scope.filtersList);
        console.log('filtersProduct',$scope.filtersProduct);
    }    

    function _renderResults(fpager) {
        tools_service.showPreloader($scope, 'hide');
        if (fpager != null && fpager != undefined) {
            rtitems = 12;
            $scope.pager = fpager;
            rtitems = fpager.cantItems;
        }
        // console.log($scope.pager);
        hashcodes();
        
        $scope.setTotalItemsTit();
    }

    function hashcodes(callback) {
        allcodes = new hash();
        
        if ($scope.pager != null && $scope.pager.items != null && $scope.pager.items.length > 0) {
            $scope.pager.items = _.sortBy($scope.pager.items, function (it) { return it.minprice.value; });
            var ct = $scope.pager.items.length;
            _.each($scope.pager.items, function (prd) {
                if (!allcodes.hasItem(prd.code)) {
                    
                    allcodes.set(prd.code, { code: prd.code, parent: prd.parent, findedchilds: [prd] });
                    if (prd.parent != null && prd.parent != '') {
                        if (allcodes.hasItem(prd.parent)) {
                            allcodes.get(prd.parent).findedchilds.push(prd);
                        } else {
                            allcodes.set(prd.parent, { code: prd.parent, parent: '', findedchilds: [prd] });
                        }
                    }
                    
                } else {
                    allcodes.get(prd.code).findedchilds.push(prd);
                }
                
                //set the min...
                $scope.catalogsetmin(prd);
                
                ct--;
                if (ct == 0) {
                    console.log(allcodes);
                    
                    if (callback) {
                        callback();
                    }
                
                }
            });
        }
    }
            
    $scope.catalogsetmin = function (product) {
        //si el producto tiene algun producto parent...
        if (product.parent != null && product.parent != '') {
            //si el producto padre esta catalogado...
            
            var catalog = allcodes.get(product.parent);
            if (catalog != null) {
                
                var min = product.minprice.value;
                var code = product.code;
                
                for (var i = 0, len = catalog.findedchilds.length; i < len; i++) {
                    if (catalog.findedchilds[i].code != product.code) {
                        if (catalog.findedchilds[i].minprice.value < min) {
                            min = catalog.findedchilds[i].minprice.value;
                            code = catalog.findedchilds[i].code;
                            
                            break;
                        }
                    }
                }
                
                catalog.minprice = min;
                catalog.mincode = code;
                
                allcodes.set(product.parent, catalog);
            }
        } else {
            //si no tiene producto parent... puede que el mismo lo sea...
            
            var catalog = allcodes.get(product.code);
            if (catalog != null) {
                
                
                var min = product.minprice.value;
                var code = product.code;
                
                for (var i = 0, len = catalog.findedchilds.length; i < len; i++) {
                    if (catalog.findedchilds[i].code != product.code) {
                        if (catalog.findedchilds[i].minprice.value < min) {
                            min = catalog.findedchilds[i].minprice.value;
                            code = catalog.findedchilds[i].code;
                            
                            break;
                        }
                    }
                }
                
                catalog.minprice = min;
                catalog.mincode = code;
                
                allcodes.set(product.code, catalog);
            }
        }
    }
        
    $scope.hasparenthere = function (product) {
        var show = true;
        
        //si el producto tiene algun producto parent...
        if (product.parent != null && product.parent != '') {
            //si el producto padre esta catalogado...
            
            var catalog = allcodes.get(product.parent);
            if (catalog != null) {
                
                show = (product.minprice.value == catalog.minprice) && (product.code == catalog.mincode);
            }
        } else {
            //si no tiene producto parent... puede que el mismo lo sea...
            
            var catalog = allcodes.get(product.code);
            if (catalog != null) {
                
                show = (product.minprice.value == catalog.minprice) && (product.code == catalog.mincode);
            }
        }
        return show;
    }
        
    $scope.hascategories = function (product) {
        //console.log('Entering cat...');
        var has = false;
        //if (allcodes.hasItem(product.code)) {
        //    has = true;
        //}
        if ((product.parent != null && product.parent != '') || (product.categoryname != null && product.categoryname.label_en != '')) {
            has = true;
        //if (allcodes.hasItem(product.parent)) {
        //    has = true;
        //}
        //if (allparents.hasItem(product.parent)) {
        //    has = true;
        //}
        } else {
            var c = allcodes.get(product.code);
            if (c != null && c.findedchilds != null) {
                if (allcodes.get(product.code).findedchilds.length > 1) {
                    has = true
                }
            }
        }
        //console.log('cat for ' + product.code);
        //console.log(has);
        return has;
    }
    /**
     * Check if have more pages 
     * @return {boolean} true if have more 
     */
    $scope.showmore = function () {
        var ret = false;
        if ($scope.pager !== null){
            if ($scope.pager.currentpage + 1 < $scope.pager.pages){
                ret = true;
            } else {
                ret = false;
            }
        }
        return ret;
    }
    // set number of results
    
    $scope.partialresults = false;

    // check if is direct url whith last code on load page
    if ($location.search().lastcode != null || $location.search().lastcode != undefined){
        $scope.partialresults = true;
    } else {
        $scope.partialresults = false;
    }

    $scope.urlwolastcode = $location.url();
    $scope.urlwolastcode = $scope.urlwolastcode.slice(0, $scope.urlwolastcode.indexOf('&lastcode'));


    $scope.totalItems = '';
    $scope.initresultnumber = 0;
    $scope.endresultnumber = 0;

    var firstload = true;

    $scope.setTotalItemsTit = function(){
        var items = 0;
        if ($scope.pager != null){
            items = $scope.pager.totalItems
            if (items > 1){
                $scope.totalItems = $scope.pager.totalItems+' resultados'
            } else if (items == 1){
                $scope.totalItems = '1 resultado';
            }
            $scope.pager.cantItems = $scope.pager.items.length;
        } else{
            $scope.totalItems = 'Sin resultados';
        }
        // TODO manage item cant whit a only variable
        if (firstload){
            $scope.initresultnumber = $scope.pager.currentpage*12+1;
            firstload = false;
        }
        $scope.endresultnumber = ($scope.pager.currentpage*12)+$scope.pager.cantItems;
    }

    $scope.reloadresults = function (callback, errorcallback) {
        rtitems = 12;
        tools_service.showPreloader($scope, 'show');
            $scope.filtersearch.lastcode = null;

            var rq = {
                command: 'search2',
                service: 'api',
                request: $scope.filtersearch
            };
            
            var rqCB = yto_api.send(rq);
            console.log(rqCB);
            //on response Ok
            rqCB.on(rqCB.oncompleteeventkey, function (results) {
                console.log(results);
                if (results != null && results.pager != null) {
                    rtitems = results.pager.items.length;
                    $scope.pager = results.pager;
                    $scope.setTotalItemsTit();
                    $scope.pager.totalitems = results.pager.totalItems;
                    $scope.pager.currentpage = results.pager.currentpage;
                    $scope.pager.pages = results.pager.pages;
                } else {
                    $scope.pager = null;
                }
                console.log($scope.pager);
                tools_service.showPreloader($scope, 'hide');
                callback != null ? callback(results) : null;
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                $scope.loadingmorebtn = false;
                console.log(err);
                errorcallback != null ? errorcallback(err) : null;
            });        
    }


    $scope.getmoreresults = function (callback, errorcallback) {
        
        rtitems = 12;

        $scope.loadingmorebtn = true;

        $scope.filtersearch.exclusion = _.map(allcodes.values(), function (pr) { return pr.code; });
        if ($scope.filtersearch.countries == null || $scope.filtersearch.countries.length == 0){
            $log.error ('no country in query. F:', $scope.filtersearch);
            //$scope.filtersearch.countries = $location.search().countries;
        } else {
            $log.log ('country in query. F:',$scope.filtersearch);
        }

        $scope.filtersearch.page++;

            var rq = {
                command: 'search2',
                service: 'api',
                request: $scope.filtersearch
            };

            var rqCB = yto_api.send(rq);
            console.log(rqCB);
            //on response Ok
            rqCB.on(rqCB.oncompleteeventkey, function (results) {
                console.log(results);
                if (results != null) {
                    if (results.pager != null && results.pager.items != null && results.pager.items.length > 0) {
                        rtitems = results.pager.items.length;                        
                        $scope.pager.items = $scope.pager.items.concat(results.pager.items);
                        $scope.pager.currentpage = results.pager.currentpage;
                        $scope.pager.totalitems = results.pager.totalItems;
                        $scope.pager.pages = results.pager.pages;
                        $scope.setTotalItemsTit();
                        $scope.loadingmorebtn = ($scope.pager.currentpage == $scope.pager.pages);
                        //console.log($scope.loadingmorebtn, '$scope.loadingmorebtn');
                        hashcodes();
                        callback != null ? callback(results) : null;
                    }
                }
                
            });
            //on response noOk
            rqCB.on(rqCB.onerroreventkey, function (err) {
                $scope.loadingmorebtn = false;
                console.log(err);
                errorcallback != null ? errorcallback(err) : null;
            });        
      
    }
        
    $scope.loadresults = function (callback, errorcallback) {
        rtitems = 12;
        
        $scope.loadingmorebtn = true;
        
        if ($scope.filtersearch.countries == null || $scope.filtersearch.countries.length == 0) {
            $log.error('no country in query. F:', $scope.filtersearch);
        //$scope.filtersearch.countries = $location.search().countries;
        } else {
            $log.log('country in query. F:', $scope.filtersearch);
        }
        
        var rq = {
            command: 'search2',
            service: 'api',
            request: $scope.filtersearch
        };
        
        var rqCB = yto_api.send(rq);
        console.log(rqCB);
        //on response Ok
        rqCB.on(rqCB.oncompleteeventkey, function (results) {
            // console.log(results);
            if (results != null) {
                if (results.pager != null && results.pager.items != null && results.pager.items.length > 0) {
                    rtitems = results.pager.items.length;
                    $scope.pager = results.pager;
                    $scope.pagefilters.lastcode = $scope.pager.lastcode;
                    $scope.pager.currentpage = results.pager.currentpage;
                    $scope.pager.totalitems = results.pager.totalItems;
                    $scope.pager.pages = results.pager.pages;
                    hashcodes();
                    callback != null ? callback(results) : null;
                } else {
                    $scope.pager = results.pager;
                    callback != null ? callback(results) : null;
                }
            }
            $scope.loadingmorebtn = false;
        });
        //on response noOk
        rqCB.on(rqCB.onerroreventkey, function (err) {
            $scope.loadingmorebtn = false;
            console.log(err);
            errorcallback != null ? errorcallback(err) : null;
        });
    }    

    $scope.resultadded = function(item) {
        rtitems--;
        //console.log(rtitems);
    }

   
    // fix buscador collapse when resizing site
    $scope.fixBuscadorCollapse = function() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        if(w<=991) {
            $scope.buscadorcollapsed = true;
        } else {
            $scope.buscadorcollapsed = false;
        }    
    }

    /*                                        *\
                Filter active functions
    \*                                        */

    $scope.hasFilterActives = false;

    function _checkFiltersChanges(){
        if (!angular.equals($scope.filtersProduct, fitersProductoOrig)){
            $scope.hasFilterActives = true;
        } else {
            $scope.hasFilterActives = false;
        };
    }

}]);


app.directive("resultitem",['tools_service', '$uibModal', 'yto_api', '$cookieStore', 'Lightbox', function (tools_service, $uibModal, yto_api, $cookieStore, Lightbox) {
    return {
        templateUrl: '/partials/directives/resultItem.shared.html',
        scope: {
            result: '=resultdata',
            //bindAttr: '='
        },
        link: function ($scope, el, attrs) {
            var now = new Date();
            //console.log($scope.result.minprice);
            $scope.getUrlCloudinary = $scope.$parent.getUrlCloudinary
            $scope.$parent.resultadded(this);
            
            //MAP
            $scope.opensupermapModal = function (size, result) {
                var modalInstance = $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: '/partials/widgets/modal-pmap.html.swig?v='+now,
                  size: size,
                  controller: "supermapCtrl",
                  windowClass: 'supermap',
                  resolve: {
                    data : function() {
                        return result;
                    }   
                  }
                });
            }; 

            //CAROUSEL
            $scope.openLightboxModal = function (images) {
                Lightbox.openModal(images, 0);
            };

            $scope.showGallery = function(code) {
                tools_service.showPreloader($scope, 'show');

                var rqprodimg = {
                    command: 'findone',
                    service: 'api',
                    request: {
                        query: {code: code},
                        collectionname: 'DMCProducts',
                        populate : [{path: 'dmc', select : 'code name images company.name'}]
                    }
                };
                  
                var rqCBProdimg = yto_api.send(rqprodimg);
              
                rqCBProdimg.on(rqCBProdimg.oncompleteeventkey, function (results) {
                    if (results != null) {
                        $scope.images = [];    
                        mainimage = {
                            "url": tools_service.cloudinaryUrl(results.productimage.url, 'mainproductimage'),
                            "caption" : "Imágenes de " + results.title_es
                        } 


                        if ( results.productimage.url.indexOf('omtempty.png') == -1) {
                            $scope.images.push(mainimage);
                        }

                        for (var i = 0; i < results.itinerary.length; i++) {
                            image = {
                                "url": tools_service.cloudinaryUrl(results.itinerary[i].image.url, 'mainproductimage'),
                                "caption" : "Imágenes de " + results.title_es
                            }
                            if ( results.itinerary[i].image.url.indexOf('omtempty.png') == -1) {
                                $scope.images.push(image);
                            }
                            
                        };
                        // console.log("the imgs ALL!",$scope.images)
                    }

                    $scope.openLightboxModal($scope.images);
                    tools_service.showPreloader($scope, 'hide');
                    // console.log(Lightbox);
                    var elementResult = el.find('.modal-backdrop');
                    elementResult.addClass( "ibg-black" );
                    // console.log(elementResult);                    
                });

            }

            function escapeHTMLEncode(str) {
                return angular.element('<div>' + str + '</div>').text();
            }

            $scope.getUrl= function() {
                
                var url = '/viaje'
                if (typeof brandPath != 'undefined') {
                    if (brandPath != null && brandPath != ''){
                        url = brandPath+'/viaje';
                    }
                };
                return url;
            }

            $scope.session = $scope.$parent.session;

            $scope.getPrice = function(program) {
                //console.log ('apiPrice ', apiPrice);
                //console.log ('>>>session ',$scope.$parent.session);
                var price = program.pvp.b2c;
                var rolename = ($scope.session != null && $scope.session.user != null && $scope.session.user.rolename != null) ? $scope.session.user.rolename : 'dmc';
                var hs = {
                    dmc: function () { return program.pvp.b2c; },
                    admin: function () { return program.pvp.b2b; },
                    traveler: function () { return program.pvp.b2c; },
                    affiliate: function () { return program.pvp.b2b; }
                }

                return hs[rolename]();
            }

            $scope.querystring = tools_service.getQuerystring();

            $scope.printCities = function () {
                var htmlstr = '';
              //  console.log();
                var t = $scope.result.buildeditinerary.sleepcities.slice(0, 8);
                var s = [];
                s = _.map(t, function (city) {
                    var c = city.city_es || city.city;
                    return c;
                });

                
                htmlstr = s.join(', ');
                var rst = 0;
                if ($scope.result.buildeditinerary.sleepcities.length > 8) {
                    rst = $scope.result.buildeditinerary.sleepcities.length - 8;
                }
                if (rst > 0) {
                        htmlstr += ', ver más..'
                }
                return htmlstr;

            }

            $scope.printStops = function() {
                var htmlstr = '';
                var t = $scope.result.buildeditinerary.stopcities;
                var s = []
                s = _.map(t, function (city) {
                    var c = city.city_es || city.city;
                    return c;
                });

                //for (var i = 0, length = t.length; i < length; i++) {
                //    if (t[i].city_es != "" && t[i].city_es != null && t[i].city_es != undefined){
                //        s.push(t[i].city_es)
                //    } else {
                //        s.push(t[i].city)
                //    }
                //};
                
                htmlstr = s.join(', ');
                if (htmlstr.length > 100) {
                    htmlstr = htmlstr.substring(0,100) + "...";
                }
                return htmlstr;
            }

            $scope.printHotelCats = function () {
                var htmlstr = 'Hotel sin categorizar';
                if ($scope.$parent.hascategories($scope.result)) {
                    htmlstr = "Varias categorias";
                } else {
                    if ($scope.result.buildeditinerary.hotelcategories.length == 1) {
                        htmlstr = 'Hotel ' + $scope.result.buildeditinerary.hotelcategories.join(', ');
                    } else {
                        htmlstr = 'Hoteles ' + $scope.result.buildeditinerary.hotelcategories.join(', ');
                    }
                    htmlstr = htmlstr.replace('unclassified *', 'otros alojamientos');
                }
                return htmlstr;
            }

            $scope.printTags = function () {
                var htmlstr = 'No hay categorias';
                if ($scope.result.tags != null && $scope.result.tags.length > 0) {
                    htmlstr = '';
                    var published = _.filter($scope.result.tags, function(tag){ return tag.state == 'published'; });
                    var tg = _.pluck(published, 'label');
                    if (tg != null && tg.length > 0) {
                        htmlstr += tg.slice(0, 5).join(', ');
                    }
                }
                return htmlstr;
            }
            $scope.printTagsArray = function () {
                var htmlstr = 'No hay categorias';
                if ($scope.result.tags != null && $scope.result.tags.length > 0) {
                        var published = _.filter($scope.result.tags, function(tag){ return tag.state == 'published'; });
                        if (published.length > 3) {
                            published.length = 3;
                        }
                        return published;
                }
            }

            $scope.printMeals = function () {
                var htmlstr = 'Solo alojamiento';
                var ht = [];
                var bitm = $scope.result.buildeditinerary.meals;
                if (bitm == null || bitm == undefined){
                    return htmlstr;
                }
                if ($scope.$parent.hascategories($scope.result)) {
                    return 'Varias opciones';
                }
                if (bitm.breakfast != null &&
                    bitm.breakfast == 0 &&
                    bitm.lunch != null &&
                    bitm.lunch == 0 &&
                    bitm.dinner != null &&
                    bitm.dinner == 0) {
                    return htmlstr;
                } else {
                    htmlstr = '';
                    if (bitm.breakfast > 0) {
                        var htmlstb = bitm.breakfast;
                        (bitm.breakfast > 1)? htmlstb += ' desayunos' : htmlstb += ' desayuno';
                        ht.push(htmlstb);
                    }
                    if (bitm.lunch > 0) {
                        var htmlstl = bitm.lunch;
                        (bitm.lunch > 1)? htmlstl += ' comidas' : htmlstl += ' comida';
                        ht.push(htmlstl);
                    }
                    if (bitm.dinner > 0) {
                        var htmlstd = bitm.dinner;
                        (bitm.dinner > 1)? htmlstd += ' cenas' : htmlstd += ' cenas';
                        ht.push(htmlstd);
                    }
                    htmlstr = ht.join(', ');
                    return htmlstr;
                }
                
            }
        }
    }

}]);
