<!-- Preview english -->
<div class="row wrap-program-product notranslate" ng-if="showPreviewEn()">
    <div class="col-md-9">
        <div class="product-detail">
            <section class="product-head">
                <header>
                    <div class="summary border-none">
                    <h1 class="notranslate">{{ dmcproduct.title }} <small>{{ dmcproduct.categoryname.label_en }}</small></h1>
                        <h3>
                            <i class="fa fa-globe pull-left mr-four"></i>
                            {{ showAllCities() }}
                        </h3>
                        <ul class="list-inline">
                            <li>
                                <span class="iblock">
                                    <i class="fa fa-clock-o"></i>
                                </span>
                                {{ dmcproduct.itinerary.length }} days
                            </li>
                             <li ng-show="dmcproduct.tags &&dmcproduct.tags.length >0">
                                <i class="fa fa-tags pull-left mr-four  pt-xs"></i>
                                <span ng-repeat="tag in dmcproduct.tags | filter: {state:'published'}" ng-class="{active: $last}" ng-switch="$last">
                                    <i ng-switch-when="true">{{tag.label_en}}</i>
                                    <i ng-switch-default>{{tag.label_en}}, </i>
                                </span>
                            </li>
                            <li ng-show="showItinerariesHotelIncluded()">
                                <i class="fa fa-cutlery pull-left mr-four pt-xs"></i>
                                {{showItinerariesHotelIncluded()}}
                            </li>
                        </ul>

                    </div>
                </header>
                <img ng-src="{{ getimage(dmcproduct.productimage.url, 'mainproductimage') }}" data-src2x="{{ getimage(dmcproduct.productimage.url, 'mainproductimageretina') }}" 
                     class="img-responsive" alt="{{ dmcproduct.title }}" title="{{ dmcproduct.title }}" />
            </section>
            <section class="main-description row">
                <h2 class="thin col-md-8 hidden-xs hidden-sm">Description</h2>
                <p class="col-md-12 pre-text">{{ dmcproduct.description_en }}</p>
            </section>
            <!-- init map -->
            <section class="product-map" ng-show="havemap">
                <h2 class="thin padded-b mb-xl">Map</h2>
                <div class="hidden-sm hidden-xs" ng-init="mapUpdate()" id="map_en"></div>
            </section>
           <!-- end map -->
            <section class="itinerary">
                <h2 class="thin padded-b mb-xl">Itinerary</h2>
                <hr />
                <div ng-repeat="itinerary in dmcproduct.itinerary">
                    <div class="row day-item">
                        <div class="day-thumb">
                            <span class="label label-day"><i class="fa fa-calendar-o"></i> {{ itinerary.daynumber }} DAY</span>
                            <img class="img-responsive" ng-src="{{ getimage(itinerary.image.url, 'itinerarydaythumb') }}"
                                 data-src2x="{{ getimage(itinerary.image.url, 'itinerarydaythumbretina') }}" 
                                 alt="day {{ itinerary.daynumber }}" title="day {{ itinerary.daynumber }}" />
                        </div>
                        <div class="day-desc">
                            <h3 class="day-tit">{{ showCities(itinerary) }} </h3>
                            <h4 ng-show="itinerary.description_en != ''">DESCRIPTION</h4>
                            <p class="pre-text" ng-show="itinerary.description_en != ''">{{ itinerary.description_en }}</p>
                            <h4 ng-show="!itinerary.lastday">HOTEL</h4>
                            <p ng-show="!itinerary.lastday">
                                <strong>{{itinerary.hotel.name}} {{ itinerary.hotel.category }} </strong>
                                <em ng-show="itinerary.hotel.incity">(city)</em>
                                <em ng-show="itinerary.hotel.insurroundings">(surroundings)</em>
                            </p>
                            <h4 ng-show="therearemeals(itinerary)">MEALS</h4>
                            <p ng-show="therearemeals(itinerary)">
                                <span ng-show="itinerary.hotel.breakfast">Breakfast <span ng-show="itinerary.hotel.lunch"> - </span></span><span ng-show="itinerary.hotel.lunch">Lunch <em ng-show="itinerary.hotel.lunchdrinks">(drinks included)</em> <span ng-show="itinerary.hotel.dinner"> - </span></span><span ng-show="itinerary.hotel.dinner">Dinner <em ng-show="itinerary.hotel.dinnerdrinks">(drinks included)</em></span>
                            </p>
                            <h4 ng-show="itinerary.activities != null && itinerary.activities.length > 0">ACTIVITIES OR SIGHTSEEING</h4>
                            <ul ng-show="itinerary.activities != null && itinerary.activities.length > 0" class="list-activities">
                                <li ng-repeat="activity in itinerary.activities" ng-show="activity.title !=''">
                                    <strong>{{activity.title}}</strong> - {{ showActivityResume(activity,'en') }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr ng-show="itinerary.isnotlastday" />
                </div>
            </section>
            <hr />
            <section class="incl-or-not">
                <h2>Included / Not included</h2>
                <div class="row">
                    <div class="include">
                        <h4>Included</h4>
                        <ul class="fa-ul">
                            <li ng-show="dmcproduct.included.arrivaltransfer==true"><i class="fa-li fa fa-check-circle"></i>Arrival transfer <span ng-show="dmcproduct.included.arrivalassistance==true">and arrival assistance <span ng-show="arelanguages(dmcproduct.included.arrivallanguage)"> in </span> {{showLanguages(dmcproduct.included.arrivallanguage, 'en')}}</span></li>
                            <li ng-show="dmcproduct.included.departuretransfer==true"><i class="fa-li fa fa-check-circle"></i>Departure transfer <span ng-show="dmcproduct.included.departureassistance==true">and departure assistance <span ng-show="arelanguages(dmcproduct.included.departurelanguage)"> in </span> {{showLanguages(dmcproduct.included.departurelanguage, 'en')}}</span></li>
                            <li ng-show="dmcproduct.included.transportbetweencities.included==true">
                                <i class="fa-li fa fa-check-circle"></i>Transportation between cities: {{showTransportsIncluded('en')}}
                            </li>
                            <li ng-show="showItinerariesHotelIncluded() != ''">
                                <i class="fa-li fa fa-check-circle"></i>
                                {{showItinerariesHotelIncluded()}}  <span ng-show="hasDrinks()"> - {{showItineraryDrinksIncluded()}}</span>
                            </li>
                            <li ng-show=""><i class="fa-li fa fa-check-circle"></i></li>
                            <li ng-show="dmcproduct.included.taxesinthecountry==true"><i class="fa-li fa fa-check-circle"></i>Taxes in the country</li>
                            <li ng-show="dmcproduct.included.airporttaxes==true"><i class="fa-li fa fa-check-circle"></i>Airport Taxes</li>
                            <li ng-show="dmcproduct.included.tips==true"><i class="fa-li fa fa-check-circle"></i>Tips</li>
                            <li ng-show="dmcproduct.included.baggagehandlingfees==true"><i class="fa-li fa fa-check-circle"></i>Baggage handling fees</li>
                            <li ng-show="dmcproduct.included.tourescort.included==true"><i class="fa-li fa fa-check-circle"></i>Tour escort <span ng-show="arelanguages(dmcproduct.included.tourescort.language)">in</span> {{showLanguages(dmcproduct.included.tourescort.language, 'en')}}</li>
                            <li ng-show="dmcproduct.included.driveguide.included==true && dmcproduct.included.tourescort.included==false "><i class="fa-li fa fa-check-circle"></i>Driver-guide <span ng-show="arelanguages(dmcproduct.included.driveguide.language)">in</span> {{showLanguages(dmcproduct.included.driveguide.language, 'en')}}</li>
                            <li><i class="fa-li fa fa-check-circle"></i>Visits as per itinerary</li>
                        </ul>
                    </div>
                    <div class="not-include">
                        <h4>Not Included</h4>
                        <ul class="fa-ul">
                            <li ng-show="dmcproduct.included.arrivaltransfer==false"><i class="fa-li fa fa-times-circle"></i>Arrival transfer</li>
                            <li ng-show="dmcproduct.included.departuretransfer==false"><i class="fa-li fa fa-times-circle"></i>Departure transfer</li>
                            <li ng-show="dmcproduct.included.transportbetweencities.included==false"><i class="fa-li fa fa-times-circle"></i>Transportation between cities </li>
                            <li ng-show="dmcproduct.included.taxesinthecountry==false"><i class="fa-li fa fa-times-circle"></i>Taxes in the country</li>
                            <li ng-show="dmcproduct.included.airporttaxes==false"><i class="fa-li fa fa-times-circle"></i>Airport Taxes</li>
                            <li ng-show="!hasDrinks()"><i class="fa-li fa fa-times-circle"></i>Drinks</li>
                            <li ng-show="dmcproduct.included.tips==false"><i class="fa-li fa fa-times-circle"></i>Tips</li>
                            <li ng-show="dmcproduct.included.baggagehandlingfees==false"><i class="fa-li fa fa-times-circle"></i>Baggage handling fees</li>
                            <li ng-show="dmcproduct.included.tourescort.included==false"><i class="fa-li fa fa-times-circle"></i>Tour escort</li>
                            <li><i class="fa-li fa fa-times-circle"></i>International flights</li>
                            <li><i class="fa-li fa fa-times-circle"></i>Insurance</li>
                            <li><span><i class="fa-li fa fa-times-circle"></i>Visas, if needed.</span></li>
                        </ul>
                    </div>

                    
                    <div ng-include="'/partials/shared/product/domesticflights.en.html'" ng-hide="!productNeedFlights(dmcproduct.itinerary) || dmcproduct.included.transportbetweencities.domesticflight">
                    </div>

                    <div class="col-md-12">
                    <div ng-show="dmcproduct.important_txt_en && dmcproduct.important_txt_en != ''" class="alert alert-warning mt-l mb-zero">
                        <h5 class="bold mt-zero"><i class="fa fa-exclamation-triangle"></i> Important Notes</h5>
                        <p class="pre-text">{{dmcproduct.important_txt_en}}</p>
                    </div>
                    </div>
                </div>
            </section>
            <section class="cancel-policies" ng-show="booking.cancelpolicy._en">
                <hr class="mt-b" />
                <h5 class="ml-b">Cancel Policy</h5>
                <p class="pre-text ml-b" ng-bind-html="trustHtml(booking.cancelpolicy._en)"></p>
            </section>
            <section class="price-total padded-b" ng-hide="booking.idBooking.length > 0">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <div class="the-price">
                            <p class="mb-zero"><em>from</em></p>
                            <p class="mb-l"><strong class="h1 bold">{{calculatePriceMinimum()}}</strong><span class="h3 bold"> {{dmcproduct.dmc.currency.symbol}}</span></p>
                        </div>
                        <p class="mb-b"><em>p/person double based</em></p>
                        <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}} / day</p>
                        <p class="mb-zero">2 adults, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}}</strong></p>
                    </div>
                    <div class="col-md-6 text-center">
                        <h3 class="h2 thin text-alternate mb-xxl">Ready to book?</h3>
                        <button type="button" class="btn btn-lg btn-default disabled">Book now</button>
                    </div>
                </div>
            </section>
            <hr class="mb-b" />
            <footer class="dmc-profile">
                <div class="row">
                    <div class="col-md-8">
                        <div class="dmc-profile-widget">
                            <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" 
                                 data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" 
                                 alt="{{ dmcproduct.dmc.company.name }} logo" title="{{ dmcproduct.dmc.company.name }} logo" />
                            <p class="dmc-text">
                                by <a href="#dmc-profile">{{ dmcproduct.dmc.company.name }}</a><br />
                                <!--<span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> -->
                            </p>
                        </div>
                        <p class="pre-text">{{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a >more info</a></p>
                    </div>
                    <div class="col-md-4">
                        <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" 
                             data-src2x="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfieretina')}}" 
                             class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <div class="col-md-3 ">
        <section class="product-resume max-center-sm info-block hidden-sm hidden-xs">
            <section class="price-total padded-b text-center" ng-hide="booking.idBooking.length > 0">
                <h4><a class="text-alternate" >{{dmcproduct.title}}</a></h4>
                <div class="the-price">
                    <p class="mb-zero"><em>from</em></p>
                    <p class="mb-l"><strong class="h1 bold">{{calculatePriceMinimum()}}</strong><span class="h3 bold"> {{dmcproduct.dmc.currency.symbol}}</span></p>
                </div>
                <p class="mb-b"><em>p/person double based</em></p>
                <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}} / day</p>
                <p class="mb-xl">2 adults, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}} </strong></p>
                <button type="button" class="btn btn-lg btn-default disabled">Book now</button>
            </section>
            <hr class="mb-zero mt-xl" ng-hide="booking.idBooking.length > 0" />
            <footer class="dmc-profile">
                <p><em>Tour made by: </em></p>
                <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" 
                     data-src2x="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfieretina')}}" 
                     class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
                <div class="dmc-profile-widget mt-xl">
                    <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" 
                         data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" 
                         title="{{ dmcproduct.dmc.company.name }} logo" alt="{{ dmcproduct.dmc.company.name }} logo" />
                    <p class="dmc-text">
                        <a href="/dmc-account" target="_blank">{{ dmcproduct.dmc.company.name }}</a>
                        <br />
                       <!--  <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> -->
                    </p>
                </div>
                <p class="mt-b pre-text">{{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a href="/dmc-account" target="_blank">more info</a></p>
            </footer>
        </section>
    </div>
</div>

<!-- Preview spanish -->
<div class="row wrap-program-product notranslate" ng-if="showPreviewEs()">
    <div class="col-md-9">
        <div class="product-detail">
            <section class="product-head">
                <header>
                    <div class="summary  border-none">
                        <h1 class="notranslate">{{ dmcproduct.title_es }}</h1>
                        <h3>
                            <i class="fa fa-globe pull-left mr-four"></i>
                            {{ showAllCities() }}
                        </h3>
                        <ul class="list-inline">
                            <li>
                                <span class="iblock">
                                    <i class="fa fa-clock-o "></i>
                                </span>
                                {{ dmcproduct.itinerary.length }} días
                            </li>
                            <li ng-show="dmcproduct.tags &&dmcproduct.tags.length >0">
                                <i class="fa fa-tags pull-left mr-four  pt-xs"></i>
								<span ng-repeat="tag in dmcproduct.tags | filter: {state:'published'}" ng-class="{active: $last}" ng-switch="$last">
									<i ng-switch-when="true">{{tag.label_en}}</i>
									<i ng-switch-default>{{tag.label_en}}, </i>	
                                </span>
                            </li>
                            <li ng-show="showItinerariesHotelIncluded()">
                                <i class="fa fa-cutlery pull-left mr-four pt-xs"></i>
                                {{showItinerariesHotelIncluded()}}
                            </li>
                        </ul>
                    </div>
                </header>
                <img ng-src="{{ getimage(dmcproduct.productimage.url, 'mainproductimage') }}" data-src2x="{{ getimage(dmcproduct.productimage.url, 'mainproductimageretina') }}" class="img-responsive" alt="{{dmcproduct.title}}" title="{{dmcproduct.title}}" />
            </section>
            <section class="main-description row">
                <h2 class="thin col-md-8 hidden-xs hidden-sm ">Descripción </h2>
                <p class="col-md-12  pre-text">{{ dmcproduct.description_es }}</p>
            </section>
            <hr />
            <!-- init map -->
            <section class="product-map" ng-show="havemap">
              <h2 class="thin padded-b mb-xl">Mapa</h2>
              <div class="hidden-sm hidden-xs" ng-init="mapUpdate()" id="map_es"></div> 
            </section>
            <!-- end map -->
            <section class="itinerary">
                <h2>Itinerario</h2>
                <hr />
                <div ng-repeat="itinerary in dmcproduct.itinerary">
                    <div class="row day-item">
                        <div class="day-thumb">
                            <span class="label label-day"><i class="fa fa-calendar-o"></i> Día {{ itinerary.daynumber }}</span>
                            <img class="img-responsive" ng-src="{{ getimage(itinerary.image.url, 'itinerarydaythumb') }}" 
                                 data-src2x="{{ getimage(itinerary.image.url, 'itinerarydaythumbretina') }}" 
                                 alt="day {{ itinerary.daynumber }}" title="day {{ itinerary.daynumber }}" />
                        </div>
                        <div class="day-desc">
                            <h3 class="day-tit">{{ showCities(itinerary) }} </h3>
                            <h4 ng-show="itinerary.description_es != ''">Descripción</h4>
                            <p class="pre-text" ng-show="itinerary.description_es != ''">{{ itinerary.description_es }}</p>
                            <h4 ng-show="itinerary.hotel.category != ''">Hotel</h4>
                            <p>
                                <strong>{{itinerary.hotel.name}} {{ itinerary.hotel.category }} </strong>
                                <em ng-show="itinerary.hotel.incity">(en la ciudad)</em>
                                <em ng-show="itinerary.hotel.insurroundings">(fuera de la ciudad)</em>
                            </p>
                            <h4 ng-show="therearemeals(itinerary)">Régimen Alimenticio</h4>
                            <p ng-show="therearemeals(itinerary)">
                                <span ng-show="itinerary.hotel.breakfast">Desayuno <span ng-show="itinerary.hotel.lunch"> - </span></span><span ng-show="itinerary.hotel.lunch">Almuerzo <em ng-show="itinerary.hotel.lunchdrinks">(bebidas incluidas)</em> <span ng-show="itinerary.hotel.dinner"> - </span></span><span ng-show="itinerary.hotel.dinner">Cena <em ng-show="itinerary.hotel.dinnerdrinks">(bebidas incluidas)</em></span>
                            </p>
                            <h4 ng-show="itinerary.activities != null && itinerary.activities.length > 0">Actividades y excursiones</h4>
                            <ul ng-show="itinerary.activities != null && itinerary.activities.length > 0" class="list-activities">
                                <li ng-repeat="activity in itinerary.activities" ng-show="activity.title_es !=''">
                                    <strong>{{activity.title_es}}</strong> - {{ showActivityResume(activity,'es') }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr ng-show="itinerary.isnotlastday" />
                </div>
            </section>
            <hr />
            <section class="incl-or-not">
                <h2>Incluido / No incluido</h2>
                <div class="row">
                    <div class="include">
                        <h4>Incluido</h4>
                        <ul class="fa-ul">
                            <li ng-show="dmcproduct.included.arrivaltransfer==true"><i class="fa-li fa fa-check-circle"></i>Traslado de llegada <span ng-show="dmcproduct.included.arrivalassistance==true">y asistencia <span ng-show="arelanguages(dmcproduct.included.arrivallanguage)"> en </span> {{showLanguages(dmcproduct.included.arrivallanguage, 'es')}}</span></li>
                            <li ng-show="dmcproduct.included.departuretransfer==true"><i class="fa-li fa fa-check-circle"></i>Traslado de salida <span ng-show="dmcproduct.included.departureassistance==true">y asistencia <span ng-show="arelanguages(dmcproduct.included.departurelanguage)"> en </span> {{showLanguages(dmcproduct.included.departurelanguage, 'es')}}</span></li>
                            <li ng-show="dmcproduct.included.transportbetweencities.included==true">
                                <i class="fa-li fa fa-check-circle"></i>Transporte entre ciudades: {{showTransportsIncluded('es')}}
                            </li>
                            <li ng-show="dmcproduct.included.tourescort.included==true"><i class="fa-li fa fa-check-circle"></i>Guía <span ng-show="arelanguages(dmcproduct.included.tourescort.language)">en</span> {{showLanguages(dmcproduct.included.tourescort.language, 'es')}}</li>
                            <li ng-show="dmcproduct.included.driveguide.included==true && dmcproduct.included.tourescort.included==false"><i class="fa-li fa fa-check-circle"></i>Guía-conductor <span ng-show="arelanguages(dmcproduct.included.driveguide.language)">in</span> {{showLanguages(dmcproduct.included.driveguide.language, 'es')}}</li>
                            <li ng-show="showItinerariesHotelIncluded() != ''">
                                <i class="fa-li fa fa-check-circle"></i>
                                {{showItinerariesHotelIncluded()}}  <span ng-show="hasDrinks()"> - {{showItineraryDrinksIncluded()}}</span>
                            </li>
                            <li ng-show=""><i class="fa-li fa fa-check-circle"></i></li>
                            <li ng-show="dmcproduct.included.airporttaxes==true"><i class="fa-li fa fa-check-circle"></i>Tasas de Aeropuerto</li>
                            <li ng-show="dmcproduct.included.tips==true"><i class="fa-li fa fa-check-circle"></i>Tips</li>
                            <li ng-show="dmcproduct.included.baggagehandlingfees==true"><i class="fa-li fa fa-check-circle"></i>Maleteros</li>
                            <li><i class="fa-li fa fa-check-circle"></i>Hoteles, Régimen Alimenticio, Visitas y guías según se especifique o no, en el itinerario</li>
                        </ul>
                        <p class="ml-b help-block mt-xl">
                            <span ng-show="dmcproduct.included.trip.grouptrip">Este es un Programa Regular</span>
                            <span ng-hide="dmcproduct.included.trip.grouptrip">Programa Independiente (Algunos servicios incluidos pueden ser compartidos)</span>
                        </p>
                    </div>
                    <div class="not-include">
                        <h4>No Incluido</h4>
                        <ul class="fa-ul">
                            <li><i class="fa-li fa fa-times-circle"></i>Vuelos Internacionales</li>
                            <li ng-show="dmcproduct.included.tourescort.included==false"><i class="fa-li fa fa-times-circle"></i>Guías</li>        
                            <li ng-show="dmcproduct.included.arrivaltransfer==false"><i class="fa-li fa fa-times-circle"></i>Traslado de llegada</li>
                            <li ng-show="dmcproduct.included.departuretransfer==false"><i class="fa-li fa fa-times-circle"></i>Traslado de salida</li>
                            <li ng-show="dmcproduct.included.transportbetweencities.included==false"><i class="fa-li fa fa-times-circle"></i>Transporte entre ciudades </li>
                            <li ng-show="dmcproduct.included.taxesinthecountry==false"><i class="fa-li fa fa-times-circle"></i>Impuestos en el país</li>
                            <li ng-show="dmcproduct.included.airporttaxes==false">
                            <span ng-show="dmcproduct.included.transportbetweencities.domesticflight">
                                <i class="fa-li fa fa-times-circle"></i>Tasas de Aeropuertos
                            </span>
                            </li>
                            <li ng-show="!hasDrinks()"><i class="fa-li fa fa-times-circle"></i>Bebidas</li>
                            <li ng-show="dmcproduct.included.tips==false"><i class="fa-li fa fa-times-circle"></i>Propinas</li>
                            <li ng-show="dmcproduct.included.baggagehandlingfees==false"><i class="fa-li fa fa-times-circle"></i>Maleteros</li>
                            <li><i class="fa-li fa fa-times-circle"></i>Seguro</li>
                            <li><i class="fa-li fa fa-times-circle"></i>Visados, si fueran necesarios.</li>
                        </ul>
                    </div>
                    <!-- domestic flights -->

                    <div ng-include="'/partials/shared/product/domesticflights.es.html'" ng-hide="!productNeedFlights(dmcproduct.itinerary) || dmcproduct.included.transportbetweencities.domesticflight"></div>

                    <div class="col-md-12">
                         <div ng-show="dmcproduct.important_txt_es && dmcproduct.important_txt_es != ''" class="alert alert-warning mt-l mb-zero">
                            <h5 class="bold mt-zero"><i class="fa fa-exclamation-triangle"></i> Notas Importantes</h5>
                            <p class="pre-text">{{dmcproduct.important_txt_es}}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="cancel-policies ml-b" ng-show="booking.cancelpolicy._es">
                <hr class="mt-b" />
                <h5>Políticas de Cancelación</h5>
                <p class="pre-text" ng-bind-html="trustHtml(booking.cancelpolicy._es)"></p>
            </section>
            <section class="price-total padded-b" ng-hide="booking.idBooking.length > 0">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <div class="the-price">
                            <p class="mb-zero"><em>desde</em></p>
                            <p class="mb-l"><strong class="h1 bold">{{calculatePriceMinimum()}}{{dmcproduct.dmc.currency.symbol}}</strong></p>
                        </div>
                        <p class="mb-b"><em>p/persona en base doble</em></p>
                        <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}}  / day</p>
                        <p class="mb-zero">2 adultos, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}} </strong></p>
                    </div>
                    <div class="col-md-6 text-center">
                        <h3 class="h2 thin text-alternate mb-xxl">¿Listo para reservar?</h3>
                        <button type="button" class="btn btn-lg btn-default disabled">Reservar</button>
                    </div>
                </div>
            </section>
            <hr class="mb-b" />
            <footer class="dmc-profile">
                <div class="row">
                    <div class="col-md-8">
                        <div class="dmc-profile-widget">
                            <img class="img-dmc-big" 
                                 ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" 
                                 data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" 
                                 title="{{ dmcproduct.dmc.company.name }} logo" alt="{{ dmcproduct.dmc.company.name }} logo" />
                            <p class="dmc-text">
                                por <a href="#dmc-profile">{{ dmcproduct.dmc.company.name }}</a><br />
                               <!--  <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> -->
                            </p>
                        </div>
                        <p class="pre-text">{{ dmcproduct.dmc.additionalinfo.description.substring(0, 249) }}... <a href="/dmc-account" target="_blank">más info</a></p>
                    </div>
                    <div class="col-md-4">
                        <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" 
                             class="img-responsive" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
                    </div>
                </div>
            </footer>
        </div>
    </div>

    <div class="col-md-3">
        <section class="product-resume max-center-sm info-block hidden-sm hidden-xs">
            <section class="price-total padded-b text-center" ng-hide="booking.idBooking.length > 0">
                <h4><a class="text-alternate ">{{dmcproduct.title_es}}</a></h4>
                <div class="the-price">
                    <p class="mb-zero"><em>desde</em></p>
                    <p class="mb-l"><strong class="h1 bold">{{calculatePriceMinimum()}}{{dmcproduct.dmc.currency.symbol}}</strong></p>
                </div>
                <p class="mb-b"><em>p/persona base doble</em></p>
                <p class="mb-b">{{ formatnumber(calculatePriceMinimum()/dmcproduct.itinerary.length) }} {{dmcproduct.dmc.currency.symbol}}  / día</p>
                <p class="mb-xl">2 adultos, <strong>TOTAL: {{calculatePriceMinimum() * 2 }} {{dmcproduct.dmc.currency.symbol}} </strong></p>
                <button type="button" class="btn btn-lg btn-default disabled">Reservar</button>
            </section>
            <hr class="mb-zero mt-xl" ng-hide="booking.idBooking.length > 0" />
            <footer class="dmc-profile">
                <p><em>Viaje de: </em></p>
                <img ng-src="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfie')}}" 
                     data-src2x="{{getimage(dmcproduct.dmc.images.photo.url, 'corporateselfieretina')}}" 
                     class="img-responsive mb-xl" alt="{{ dmcproduct.dmc.company.name }} selfie" title="{{ dmcproduct.dmc.company.name }} selfie" />
                <div class="dmc-profile-widget">
                    <img class="img-dmc-big" ng-src="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36') }}" 
                         data-src2x="{{ getimage(dmcproduct.dmc.images.logo.url, 'avatarb36retina') }}" alt="{{ dmcproduct.dmc.company.name }} logo" 
                      title="{{ dmcproduct.dmc.company.name }} logo" />
                    <p class="dmc-text pre-text">
                      <a href="/receptivo/{{dmcproduct.dmc.code}}/{{dmcproduct.dmc.company.name}}" 
                           target="_blank">{{ dmcproduct.dmc.company.name }}</a>
                    </p>
                </div>
            </footer>
        </section>
    </div>
</div>