<!-- ======= TripTags Modal ======== -->
<div class="modal-content countryselect-modal" id="csgenerated">
    <div class="modal-body padded-zero" id="countries" ng-hide="allcountries">
        <div class="absolute closer">
            <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
            </button>
        </div>
        <div class="row">
            <div class="col-md-12 triptags">
                <ul class="mb-xl list-unstyled bg-light">
                    <li ng-repeat="triptag in publishedTriptags" class="col-md-12 bg-light bordered zone-link">
                        <a href="/viajes/?tags={{ triptag.slug }}" target="_self">
                            <span class="h4 padded-b iblock mt-l"> {{ triptag.label }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div><!-- .modal-body ends  --><!-- <div class="modal-body" id="country" ng-hide="countrycities"><section class="row mb-xl" ng-repeat="country in destinations | filter:{name_es: selectedcountry} : true"><div class="col-md-4 mt-b mb-zero" ng-repeat="city in country.cities"><a class="padded-b" ng-click="ok({name : city+', '+country.name_es, query : '&country='+country.countrycode+'&cities='+city})" href="#">{{city}}</a></div></section></div><div class="modal-footer" ng-hide="countrycities" ng-repeat="country in destinations | filter:{name_es: selectedcountry} : true"><a class="btn btn-primary" ng-click="ok({name : selectedcountry, query : '&country='+country.countrycode})" href="#">Seleccionar todo {{selectedcountry}}</a></div> -->
</div><!-- .modal-content ends -->
