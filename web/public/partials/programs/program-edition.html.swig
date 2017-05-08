<section class="new-program">
    <div class="panel-body">
       
        <!-- ////////////////////// -->
        <!-- // 0 TOUR MAIN LANGUAGES -->
        <!-- ////////////////////// -->
      <form class="step-load">
        <p class="required-label">* required</p>
        <h2>
          <span>0.</span> Languages
        </h2>
        <div class="bg-warning mb-l">
          <legend>
            In which languages will you quote this request?<b>*</b>
          </legend>
          <fieldset>
            <label class="checkbox-inline">
              <input ng-model="dmcproduct.languages.english" type="checkbox" id="lang-tour-en" value="english" /> English
            </label>
            <label class="checkbox-inline">
              <input ng-model="dmcproduct.languages.spanish" type="checkbox" id="lang-tour-es" value="spanish" /> Spanish
            </label>
          </fieldset>
          <p class="help-block">
            If you make use of the translator, our Product Department will review texts before sending.
          </p>
        </div>
      </form>


      <!-- ////////////////////// -->
      <!-- // 1 TOUR MAIN INFO -->
      <!-- ////////////////////// -->
      <hr class="hr" id="step1startpoint" />
      <form class="step-load">
        <p class="required-label">* required</p>
        <h2>
          <span>1.</span> Tour name
        </h2>
        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.english">
          <label class="control-label" for="tourname">
            Tour name (english)<b>*</b>
          </label>
          <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatetitle_es(dmcproduct.title_es)" class="pull-right trans">
            <i class="fa fa-language"></i> get translation
          </a>
          <input ng-model="dmcproduct.title" class="form-control" id="tourname" type="text" value="" placeholder="please, add the tour name here..." />
        </div>
        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.spanish">
          <label class="control-label" for="tourname">
            Tour name (spanish)<b>*</b>
          </label>
          <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatetitle(dmcproduct.title)" class="pull-right trans">
            <i class="fa fa-language"></i> get translation
          </a>
          <input ng-model="dmcproduct.title_es" class="form-control" id="tourname" type="text" value="" placeholder="" />
        </div>
      </form>


      <!-- ////////////////////// -->
      <!-- // 3 INCLUDED -->
      <!-- ////////////////////// -->
      <hr class="hr" id="step3startpoint" />
      <form class="step-load">
        <p class="required-label">* required</p>
        <h2>
          <span>3.</span> Included / Not included
        </h2>
        <p>Any service that is not selected, will appear to the client as not included.</p>
        <div class="bg-warning">
          <legend>
            Kind of trip <b>*</b>
          </legend>
          <fieldset>
            <label class="radio-inline">
              <input ng-change="changeincludedtypetrip()" ng-model="included.tripisprivateorgroup" type="radio" name="kind-trip" id="group-trip" value="group" /> Group Trip
            </label>
            <label class="radio-inline">
              <input ng-change="changeincludedtypetrip()" ng-model="included.tripisprivateorgroup" type="radio" name="kind-trip" id="private-trip" value="private" /> Private Trip
            </label>
          </fieldset>
        </div>
        <h3>Click only if the service is included</h3>
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.arrivaltransfer" type="checkbox" value="arr-trans" />
                    Arrival transfer
                  </label>
                </div>
              </div>
              <div class="col-md-3" ng-show="dmcproduct.included.arrivaltransfer">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.arrivalassistance" type="checkbox" value="arr-assis" />
                    Arrival assistance
                  </label>
                </div>
              </div>
              <div class="col-md-6" ng-show="dmcproduct.included.arrivalassistance && dmcproduct.included.arrivaltransfer">
                <div class="checkbox" ng-show="dmcproduct.included.arrivaltransfer">
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.arrivallanguage.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish" /> Spanish
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.arrivallanguage.english" type="checkbox" id="lang-tour-esc-en" value="english" /> English
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.arrivallanguage.french" type="checkbox" id="lang-tour-esc-fr" value="french" /> French
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.arrivallanguage.german" type="checkbox" id="lang-tour-esc-ge" value="german" /> German
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.arrivallanguage.italian" type="checkbox" id="lang-tour-esc-it" value="italian" /> Italian
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.arrivallanguage.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese" /> Portuguese
                  </label>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.departuretransfer" type="checkbox" value="depa-trans" />
                    Departure transfer
                  </label>
                </div>
              </div>
              <div class="col-md-3">
                <div class="checkbox" ng-show="dmcproduct.included.departuretransfer">
                  <label>
                    <input ng-model="dmcproduct.included.departureassistance" type="checkbox" value="depa-assi" />
                    Departure assistance
                  </label>
                </div>
              </div>
              <div class="col-md-6" >
                <div class="checkbox" ng-show="dmcproduct.included.departureassistance && dmcproduct.included.departuretransfer">
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.departurelanguage.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish" /> Spanish
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.departurelanguage.english" type="checkbox" id="lang-tour-esc-en" value="english" /> English
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.departurelanguage.french" type="checkbox" id="lang-tour-esc-fr" value="french" /> French
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.departurelanguage.german" type="checkbox" id="lang-tour-esc-ge" value="german" /> German
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.departurelanguage.italian" type="checkbox" id="lang-tour-esc-it" value="italian" /> Italian
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.departurelanguage.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese" /> Portuguese
                  </label>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.tourescort.included" type="checkbox" value="tour-escort" />
                    Tour Escort
                  </label>
                </div>
              </div>
              <div class="col-md-9">
                <div class="checkbox" ng-show="dmcproduct.included.tourescort.included">
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.tourescort.language.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish" /> Spanish
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.tourescort.language.english" type="checkbox" id="lang-tour-esc-en" value="english"/> English
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.tourescort.language.french" type="checkbox" id="lang-tour-esc-fr" value="french"/> French
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.tourescort.language.german" type="checkbox" id="lang-tour-esc-ge" value="german"/> German
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.tourescort.language.italian" type="checkbox" id="lang-tour-esc-it" value="italian"/> Italian
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.tourescort.language.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"/> Portuguese
                  </label>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.driveguide.included" type="checkbox" value="drive-guide" />
                    Driver/Guide
                  </label>
                </div>
              </div>
              <div class="col-md-9">
                <div class="checkbox" ng-show="dmcproduct.included.driveguide.included">
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.driveguide.language.spanish" type="checkbox" id="lang-guide-esc-es" value="spanish" /> Spanish
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.driveguide.language.english" type="checkbox" id="lang-guide-esc-en" value="english"/> English
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.driveguide.language.french" type="checkbox" id="lang-guide-esc-fr" value="french"/> French
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.driveguide.language.german" type="checkbox" id="lang-guide-esc-ge" value="german" /> German
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.driveguide.language.italian" type="checkbox" id="lang-guide-esc-it" value="italian"/> Italian
                  </label>
                  <label class="checkbox-inline">
                    <input ng-model="dmcproduct.included.driveguide.language.portuguese" type="checkbox" id="lang-guide-esc-it" value="portuguese"/> Portuguese
                  </label>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.transportbetweencities.included" type="checkbox" value="trans-cities"/>
                    Transportation between cities
                  </label>
                </div>
              </div>
            </div>
            <div class="trans-cities-opt" ng-show="dmcproduct.included.transportbetweencities.included">
              <hr />
              <div class="row">

                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.bus" type="checkbox" id="trans-city-bus" value="bus" /> Bus
                    </label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.fourxfour" type="checkbox" id="trans-city-4x4" value="4x4"/> 4x4
                    </label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.domesticflight" type="checkbox" id="trans-city-fly" value="domestic-fly"/> Domestic Flight
                    </label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.train" type="checkbox" id="trans-city-train" value="train"/> Train
                    </label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.boat" type="checkbox" id="trans-city-boat" value="boat"/> Boat/Ferry
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.van" type="checkbox" id="trans-city-van" value="van"/> Van/Minivan
                    </label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.truck" type="checkbox" id="trans-city-truck" value="truck"/> Truck
                    </label>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.privatecarwithdriver" type="checkbox" id="trans-city-driver" value="car-driver"/> Car with driver
                    </label>
                  </div>
                </div>
                <div class="col-md-3">
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input ng-model="dmcproduct.included.transportbetweencities.other" type="checkbox" id="trans-city-other" value="other"/> Other
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group" ng-show="dmcproduct.included.transportbetweencities.other">
                    <label class="control-label sr-only" for="other-trans">Other Transportation</label>
                    <input ng-model="dmcproduct.included.transportbetweencities.otherdescription" class="form-control" id="other-trans" type="text" value="" placeholder="please, add the other transportation name here..."/>
                  </div>
                </div>
              </div>
            </div>
            <!--  close trans-cities-opt -->
          </div>
          <!--  close panel-body -->
        </div>
        <!--  close panel-default -->

        <div class="panel panel-default">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.taxesinthecountry" type="checkbox" id="country-taxes" value="country-taxes"/> Taxes in the country
                  </label>
                </div>
              </div>
              <div class="col-md-2">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.airporttaxes" type="checkbox" id="air-taxes" value="air-taxes"/> Airport Taxes
                  </label>
                </div>
              </div>
              <div class="col-md-2">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.tips" type="checkbox" id="tips" value="tips"/> Tips
                  </label>
                </div>
              </div>
              <div class="col-md-3">
                <div class="checkbox">
                  <label>
                    <input ng-model="dmcproduct.included.baggagehandlingfees" type="checkbox" id="baggage" value="baggage"/> Baggage handling fees
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>


      <!-- ////////////////////// -->
      <!-- // 4 ITINERARY -->
      <!-- ////////////////////// -->
      <hr class="hr" id="step4startpoint"/>
      <form class="itinerary-load step-load">
        <p class="required-label">* required</p>
        <h2>
          <span>4.</span> Itinerary (Day to Day)
        </h2>
        <div class="day" ng-repeat="itinerary in dmcproduct.itinerary"
             data-itinerary="{{itinerary.uuid}}">
          <div class="day-thumb" ng-show="!itinerary.lastday">
            <span class="label label-day">
              <i class="fa fa-calendar-o"></i> {{itinerary.daynumber}} DAY
            </span>
          </div>
          <div class="day-thumb" ng-show="itinerary.lastday">
            <span class="label label-day">
              <i class="fa fa-calendar-o"></i> Last DAY
            </span>
          </div>
          <div class="col-xs-9 col-md-10">
            <div class="row">
              <div class="col-xs-9">
                <div ng-class="{'disabledbox' : !itinerary.lastday && itinerary.daynumb < dmcproduct.itinerary.length }"
                                 class="checkbox alert-danger form-inline padded-l mb-zero mt-zero">
                  <label class="check-inline">
                    <input ng-disabled="checkdisabled(itinerary)" type="checkbox" value="stop"
                           ng-model="itinerary.lastday"/>
                    <strong>Is this the last day?</strong>
                  </label>
                </div>
              </div>
              <div class="col-xs-3 text-right">
                <button ng-click="deleteitinerary(itinerary)" type="button" class="btn btn-danger text-rigth">
                  <i class="fa fa-trash-o"></i> delete
                </button>
              </div>
            </div>
            <h3>
              Destinations <b class="text-danger">*</b>
            </h3>
            <div class="form-inline form-group" ng-show="!itinerary.lastday">
              <label class="sr-only" for="select-city">Select City</label>
              <input type="text"
                  class="form-control select-city"
                  ng-model="itinerary.citytoadd.city"
                  placeholder="Select city"
                  id="select-city"
                  uib-typeahead="destination as destination.name for destination in destinations() | filter:$viewValue | limitTo:8"
                  typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html"
                  typeahead-template-url="/partials/popup/cities-result-item.html" />
              <button type="button" ng-click="addcitytoitinerary(itinerary, itinerary.citytoadd.city)" class="btn btn-default add-city notranslate">stop</button>
              <button type="button"
              ng-show="itinerary.sleepcity.city == ''"
              ng-click="addsleeptoitinerary(itinerary, itinerary.citytoadd.city)"
              class="btn btn-primary add-city">night</button>
            </div>


            <h3 class="path" ng-show="!itinerary.lastday">
              <span ng-show="itinerary.departurecity.city != ''">
                <strong>{{itinerary.departurecity.city}}</strong> (departure) -
              </span>
              <span ng-show="itinerary.stopcities.length > 0" ng-repeat="city in itinerary.stopcities">
                <strong>{{city.city}}</strong> (stop)
                <small>
                  <a class="text-danger"
                     ng-click="removestopcitytoitinerary(itinerary, city.city)">
                    <i class="fa fa-trash-o"></i>
                  </a>
                </small> -
              </span>
              <span ng-show="itinerary.sleepcity.city != ''">
                <strong>{{itinerary.sleepcity.city}}</strong> (sleep)
                <small>
                  <a  class="text-danger"
                     ng-click="removesleepcitytoitinerary(itinerary)">
                    <i class="fa fa-trash-o"></i>
                  </a>
                </small>
              </span>
            </h3>
            <div ng-show="itinerary.lastday">

              <div class="form-inline">
                <div class="form-group">
                  <label class="sr-only" for="select-city">Select City</label>
                  <input type="text"
                  class="form-control select-city"
                  placeholder="Select city"
                  ng-model="itinerary.citytoadd.city"
                  id="select-city"
                  uib-typeahead="destination as destination.name for destination in destinations() | filter:$viewValue | limitTo:8"
                  typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html"
                  typeahead-template-url="/partials/popup/cities-result-item.html" />
                  <button ng-click="addcitytoitinerarylastday(itinerary, itinerary.citytoadd.city)"
                  type="button" class="btn btn-default add-city">
                    Stop
                  </button>
                </div>

              </div>
              <h3 class="path">
                <span ng-show="itinerary.departurecity.city != ''">
                  <strong>
                    {{ itinerary.departurecity.city }}
                  </strong> (departure)
                </span>
                <span ng-repeat="city in itinerary.stopcities">
                  -
                  <strong>{{city.city}}</strong> ({{city.citybehaviour}})
                  <small>
                    <a class="text-danger"
                       ng-click="removestopcitytoitinerary(itinerary, city.city)">
                      <i class="fa fa-trash-o"></i>
                    </a>
                  </small>
                </span>
              </h3>
            </div>
            <!-- aqui domestic flights -->
            <div class="row" ng-show="!dmcproduct.included.transportbetweencities.domesticflight">
              <div class="col-md-12">
                <div class="checkboxform-inline mb-zero mt-zero">
                  <label class="check-inline text-danger">
                    <input ng-model="itinerary.needflights" type="checkbox" id="needflights" ng-change="loadflights(itinerary.needflights, itinerary)" />
                    <strong>Route needs any domestic flight not included in your price?</strong>
                  </label>
                </div>
                <div ng-show="itinerary.needflights">
                  <h3 class="mt-l">Please, indicates the flights that the clients have to book.</h3>
                  <div class="panel panel-default mb-l">
                    <h4 class="padded-l" ng-show="itinerary.flights.length == 0">Please add a domestic flight</h4>
                    <div class="panel-body" ng-repeat="flight in itinerary.flights">
                      <div class="row">
                        <div class="col-md-2 col-md-push-10">
                          <button ng-click="deleteflights($index, itinerary)" type="button" class="btn btn-danger pull-right">
                            <i class="fa fa-trash-o"></i> delete
                          </button>
                        </div>
                        <div class="col-md-3 col-md-pull-2">
                          <div class="form-group">
                            <label class="control-label" for="departureairport">
                              Departure Airport <b>*</b>
                            </label>
                            <input ng-model="flight.departure" class="form-control select-tag"
                                   id="departureairport" type="text" value="" placeholder="Search IATA code"
                                   uib-typeahead="item as item.label for item in airports | filter:$viewValue  | limitTo:8"
                                   typeahead-loading="loadingAirport" typeahead-on-select="onSelectAirport($item, $model, $label, flight.departure)" required="" />
                          </div>
                        </div>
                        <div class="col-md-3 col-md-pull-2">
                          <div class="form-group">
                            <label class="control-label" for="arrivalairport">
                              Arrival Airport <b>*</b>
                            </label>
                            <input ng-model="flight.arrival" class="form-control select-tag" id="arrivalairport"
                                   type="text" value="" placeholder="Search IATA code"
                                   uib-typeahead="item as item.label for item in airports | filter:$viewValue  | limitTo:8"
                                   typeahead-loading="loadingAirport" typeahead-on-select="onSelectAirport($item, $model, $label, flight.arrival)" required="" />
                          </div>
                        </div>
                        <div class="col-md-4 col-md-pull-2">
                          <div class="form-group">
                            <label class="control-label" for="recomendedflight">Recomended flight </label>
                            <input ng-model="flight.recommendedflight" class="form-control" id="recomendedflight" type="text" value="" placeholder="ex: flight code.." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button ng-click="addflights(itinerary)" type="button" class="btn btn-alt">add domestic flight</button>
                </div>
              </div>
            </div>
            <!-- end flights -->
            <h3 ng-show="!itinerary.lastday" class="">Hotel</h3>
            <div class="panel panel-default" ng-show="!itinerary.lastday">
              <div class="panel-body">
                <div class="row">
                  <div class="col-md-8">
                    <div class="form-group">
                      <label class="control-label" for="hotel-name">Hotel name </label>
                      <input ng-model="itinerary.hotel.name" class="form-control" id="hotel-name" type="text" value="" placeholder="please, add the hotel name here..."/>
                      <p class="help-block">If you don't have a hotel or name hotel yet, leave it blank.</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="control-label" for="hotel-name">
                        Hotel category <b>*</b>
                      </label>
                      <select ng-change="itinerary.hotel.category = itinerary.hotel.selectedcategory.category" class="form-control"
                              ng-options="cat.text for cat in availablehotelcategory"
                              ng-model="itinerary.hotel.selectedcategory"></select>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default" ng-show="itinerary.isnotlastday">
                  <div class="row">
                    <div class="col-xs-5 col-md-3">
                      <div class="radio">
                        <label>Hotel location</label>
                      </div>
                    </div>
                    <div class="col-xs-3 col-md-2">
                      <div class="radio">
                        <label>
                          <input ng-change="changehotelkind(itinerary)" ng-model="itinerary.hotel.locationkind" type="radio" value="hotelcity" />In city
                        </label>
                      </div>
                    </div>
                    <div class="col-xs-4 col-md-3">
                      <div class="radio">
                        <label>
                          <input type="radio" ng-change="changehotelkind(itinerary)" ng-model="itinerary.hotel.locationkind" value="hotelsurr" /> Out city
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- close panel -->
            <h3>Meals</h3>
            <div class="panel panel-default no-bottom">
              <div class="row">
                <div class="col-xs-4">
                  <div class="checkbox ml-xxl">
                    <label>
                      <input ng-model="itinerary.hotel.breakfast" type="checkbox" id="breakfast" value="breakfast" /> Breakfast
                    </label>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="checkbox">
                    <label>
                      <input ng-model="itinerary.hotel.lunch" type="checkbox" id="lunch" value="lunch" /> Lunch
                    </label>
                  </div>
                  <div class="checkbox" ng-show="itinerary.hotel.lunch">
                    <label>
                      <input ng-model="itinerary.hotel.lunchdrinks" type="checkbox" id="lunch-drink" value="lunch-drink" /> Drinks included
                    </label>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="checkbox">
                    <label>
                      <input ng-model="itinerary.hotel.dinner" type="checkbox" id="dinner" value="dinner" /> Dinner
                    </label>
                  </div>
                  <div class="checkbox" ng-show="itinerary.hotel.dinner">
                    <label>
                      <input ng-model="itinerary.hotel.dinnerdrinks" type="checkbox" id="dinner-drink" value="dinner-drink" /> Drinks included
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <h3>Activities or Sightseeing</h3>
            <div ng-repeat="activity in itinerary.activities">
              <div class="panel panel-default activ-item">
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-2 col-md-push-10">
                      <button ng-click="deleteactivity(itinerary, activity)" type="button" class="btn btn-danger pull-right">
                        <i class="fa fa-trash-o"></i> delete
                      </button>
                    </div>
                    <div class="col-md-10 col-md-pull-2">
                      <div class="form-group" ng-show="dmcproduct.languages.english" ng-class="{true : 'has-error'} [90 < activity.title.length]">
                        <label class="control-label" for="activ-name">
                          Title of the Activity or Sightseeing (english) <b>*</b>
                        </label>
                        <a href="" ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" ng-click="translateactivity_es(activity)" class="pull-right trans">
                          <i class="fa fa-language"></i> get translation
                        </a>
                        <input ng-model="activity.title" class="form-control" ng-maxlength="90" maxlength="90" id="activ-name" type="text" value="" placeholder="" />
                          <p class="help-block text-right small">
                            Max 90 char: <strong>{{90 - activity.title.length}} left</strong>
                          </p>
                        </div>
                      <div class="form-group" ng-show="dmcproduct.languages.spanish" ng-class="{true : 'has-error'} [90 < activity.title_es.length]">
                        <label class="control-label" for="activ-name">
                          Title of the Activity or Sightseeing (spanish) <b>*</b>
                        </label>
                        <a href="" ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" ng-click="translateactivity(activity)" class="pull-right trans">
                          <i class="fa fa-language"></i> get translation
                        </a>
                        <input ng-model="activity.title_es" ng-maxlength="90" maxlength="90" class="form-control" id="activ-name" type="text" value="" placeholder="" />
                          <p class="help-block text-right small">
                            Max 90 char: <strong>{{90 - activity.title_es.length}} left</strong>
                          </p>
                        </div>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="activ-group-box">
                        <label class="radio-inline">
                          <input ng-change="activitykindchange(activity)" ng-model="activity.activitykind" type="radio" value="group" /> Group
                                            </label>
                        <label class="radio-inline">
                          <input ng-change="activitykindchange(activity)" ng-model="activity.activitykind" type="radio" value="individual" /> Private
                                            </label>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="activ-extras">

                        <div class="checkbox">
                          <label>
                            <input ng-model="activity.ticketsincluded" type="checkbox" /> Tickets Included
                                                </label>
                        </div>

                        <div class="checkbox ml-xl">
                          <label>
                            <input type="checkbox" ng-model="activity.localguide" /> Local Guide
                                                </label>
                        </div>

                      </div>
                      <div class="checkbox alert" ng-show="activity.localguide">
                        <h5>
                          <strong>Local guide language</strong>
                        </h5>
                        <label class="checkbox-inline">
                          <input ng-model="activity.language.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish" /> Spanish
                                            </label>
                        <label class="checkbox-inline">
                          <input ng-model="activity.language.english" type="checkbox" id="lang-tour-esc-en" value="english"/> English
                                            </label>
                        <label class="checkbox-inline">
                          <input ng-model="activity.language.french" type="checkbox" id="lang-tour-esc-fr" value="french"/> French
                                            </label>
                        <label class="checkbox-inline">
                          <input ng-model="activity.language.german" type="checkbox" id="lang-tour-esc-ge" value="german"/> German
                                            </label>
                        <label class="checkbox-inline">
                          <input ng-model="activity.language.italian" type="checkbox" id="lang-tour-esc-it" value="italian"/> Italian
                                            </label>
                        <label class="checkbox-inline">
                          <input ng-model="activity.language.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"/> Portuguese
                                            </label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <button ng-click="addactivitytoitinerary(itinerary)" type="button" class="btn btn-alt">add activity or sightseeing</button>

            <hr />
            <fieldset class="day-desc-item">
              <div class="tit-day-desc">
                <span class="label label-day">
                  <i class="fa fa-calendar-o"></i> {{ itinerary.daynumber }} DAY
                </span>
                <h3>{{ showCities(itinerary) }}</h3>
              </div>
              <div class="form-group pb-xxl" ng-show="dmcproduct.languages.english">
                <label class="control-label" for="day{{itinerary.daynumber}}">Day {{itineraray.daynumber}} description (english)</label>
                <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translateitinerary_es(itinerary)" class="pull-right trans">
                  <i class="fa fa-language"></i> get translation
                </a>
                <textarea ng-model="itinerary.description_en" class="form-control" rows="7" placeholder="please, add the description for day {{itinerary.daynumber}}.."></textarea>
              </div>
              <div class="form-group" ng-show="dmcproduct.languages.spanish">
                <label class="control-label" for="day{{itinerary.daynumber}}">Day {{itineraray.daynumber}} description (spanish)</label>
                <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translateitinerary(itinerary)" class="pull-right trans">
                  <i class="fa fa-language"></i> get translation
                </a>
                <textarea ng-model="itinerary.description_es" class="form-control" rows="7" placeholder="please, add the description for day {{itinerary.daynumber}}.."></textarea>
              </div>
              <label>Day image</label>
              <div class="row" ng-show="!itinerary.imageprogress">
                <div class="col-xs-4">
                  <div ng-show="false" id="prev-itinerary-{{ $index }}" class="thumbwaitimage">
                    <div class="row">
                      <div class="col-xs-2">
                        <div class="preloader solo in">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="img-itinerary-{{ $index }}">
                    <img  ng-src="{{getimage(itinerary.image.url, 'itinerarydaythumb')}}" data-src2x="{{getimage(itinerary.image.url, 'itinerarydaythumbretina')}}" 
                          class="img-responsive" alt="{{dmcproduct.title}} itinerary" title="{{dmcproduct.title}} itinerary" />

                    <label ng-show="!showmainimage" class="btn btn-danger btn-upload mt-xl" >
                      <i class="fa fa-cloud-upload"></i>
                      <span>upload image</span>
                      <input type="file" ng-hideid="img-itinerary-{{ $index }}" ng-waitingid="prev-itinerary-{{ $index }}" ng-file-select ng-model="itinerary.image" />
                    </label>
                    <label class="btn btn-danger btn-upload mt-xl" ng-show="showmainimage">
                      <i class="fa fa-cloud-upload"></i>
                      <span>replace image</span>
                      <input type="file" ng-hideid="img-itinerary-{{ $index }}" ng-waitingid="prev-itinerary-{{ $index }}" ng-file-select ng-model="itinerary.image" />
                    </label>
                  </div>
                </div>
                <div class="col-xs-8">

                </div>
              </div>
              <hr ng-show="!itinerary.lastday" />
            </fieldset>
          </div>
          <div class="col-xs-12 close-day mt-l" style="padding: 9px;border-radius: 0px;" ng-show="itinerary.lastday == false">
            <button type="button" ng-click="additineraryday(itinerary)" class="btn btn-primary btn-lg pull-right">Add Day</button>
          </div>
          <hr ng-show="itinerary.lastday == false" />
        </div>
        <!-- close first day -->
        <div class="close-day" style="padding: 9px;border-radius: 0px;" ng-show="dmcproduct.itinerary.length == 0">
          <button type="button" ng-click="additineraryday()" class="btn btn-primary btn-lg pull-right">Add Day</button>
        </div>
        <!-- important notes for traveler -->
        <br/>
        <br/>
        <div class="panel panel-default" style="display:initial;">
          <div class="panel-body bg-warning">
            <div class="row">
              <div class="col-md-12">
                <legend class="">
                  <strong>Important Notes For Travelers:</strong>
                </legend>
                <div class="form-group pb-xxl" ng-show="dmcproduct.languages.english">
                  <label for="important_txt_en" class="control-label">Important Information for travelers (english) </label>
                  <a ng-show="dmcproduct.languages.english &amp;&amp; dmcproduct.languages.spanish" href="" ng-click="translateimportantenotes_es(dmcproduct.important_txt_es)" class="pull-right trans">
                    <i class="fa fa-language"></i> get translation
                  </a>
                  <textarea ng-model="dmcproduct.important_txt_en" class="form-control " rows="4" id="important_txt_en" placeholder="Please, add information that travelers should know (if visa is needed and you can provide it, which is the best airport to arrive, if domestic flights are not included, which ones should clients book by themselves, etc... )"></textarea>
                  <span class="help-block pull-right">(optional)</span>
                </div>
                <div class="form-group" ng-show="dmcproduct.languages.spanish">
                  <label for="important_txt_es" class="control-label">Important Information for travelers (spanish) </label>
                  <a ng-show="dmcproduct.languages.english &amp;&amp; dmcproduct.languages.spanish" href="" ng-click="translateimportantenotes(dmcproduct.important_txt_en)" class="pull-right trans">
                    <i class="fa fa-language"></i> get translation
                  </a>
                  <textarea ng-model="dmcproduct.important_txt_es" class="form-control " rows="4" id="important_txt_es" placeholder="Por favor, agrega información que debe conocer el viajero (visas, vuelos domésticos incluidos o no ...)"></textarea>
                  <span class="help-block pull-right">(optional)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>



      <!-- ////////////////////// -->
      <!-- // 5 DESCRIPTIONS -->
      <!-- ////////////////////// -->
      <hr class="hr" id="step5startpoint" />
      <form class="step-load">
        <p class="text-help pull-right">(Optional)</p>
        <h2>
          <span>5.</span> Descriptions <small>(Optional)</small>
          <button class="btn btn-primary" ng-show="!editDescription" ng-click="showDescriptions()">Add</button>
          <button class="btn btn-primary" ng-show="editDescription" ng-click="showDescriptions()">Hide</button>
        </h2>
        <div ng-show="editDescription">
          <fieldset class="main-des-item">
            <legend ng-show="showPreviewEn()">
              Program: <strong>{{dmcproduct.title}}</strong>
            </legend>
            <legend ng-show="showPreviewEs()">
              Program: <strong>{{dmcproduct.title_es}}</strong>
            </legend>
            <div class="form-group pb-xxl" ng-show="dmcproduct.languages.english">
              <label for="main_description_en" class="control-label">Main description of the tour (english) </label>
              <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatemaindescription_es(dmcproduct.description_es)" class="pull-right trans">
                <i class="fa fa-language"></i> get translation
              </a>
              <textarea ng-model="dmcproduct.description_en" class="form-control" rows="7" id="main_description_en" placeholder="Please, this box is only for a turistical brief descrition of this trip..."></textarea>
              <span class="help-block pull-right">(Max 250 char)</span>
            </div>
            <div class="form-group" ng-show="dmcproduct.languages.spanish">
              <label for="main_description_es" class="control-label">Main description of the tour (spanish) </label>
              <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatemaindescription(dmcproduct.description_en)" class="pull-right trans">
                <i class="fa fa-language"></i> get translation
              </a>
              <textarea ng-model="dmcproduct.description_es" class="form-control" rows="7" id="main_description_es" placeholder="Por favor, esta caja es solo para una breve descripción turística del viaje..."></textarea>
              <span class="help-block pull-right">(Max 250 char)</span>
            </div>
            <label>
              Tour main image<b>*</b>
            </label>
            <div class="row" >
              <div class="col-xs-4">
                <div ng-show="mainimageprogress"  id="prev-main" class="mainwaitimage">
                  <div class="row">
                    <div class="col-xs-2">
                      <div class="preloader solo in">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="main-image-container">
                  <img ng-src="{{getimage(dmcproduct.productimage.url, 'mainproductimage')}}" data-src2x="{{getimage(dmcproduct.productimage.url, 'mainproductimageretina')}}" class="img-responsive" alt="{{dmcproduct.title}}" title="{{dmcproduct.title}}" />
                  <label class="btn btn-primary btn-upload mt-xl" ng-show="!showmainimage">
                    <i class="fa fa-cloud-upload"></i>
                    <span>upload image</span>
                    <input type="file" ng-hideid="main-image-container" ng-waitingid="prev-main" class="uploadfilebutton btn btn-primary mt-xl" ng-file-select="" ng-model="dmcproduct.productimage" />
                  </label>
                  <label class="btn btn-primary btn-upload mt-xl" ng-show="showmainimage">
                    <i class="fa fa-cloud-upload"></i>
                    <span>replace image</span>
                    <input type="file" ng-hideid="main-image-container" ng-waitingid="prev-main" class="replacefilebutton btn btn-danger mt-xl" ng-file-select="" ng-model="dmcproduct.productimage" />
                  </label>
                  <span class="help-block">
                    image min size 1200x800px - file format: .jpg .gif .png<br />
                    (If you can't upload an image, try another one.)
                  </span>
                </div>
              </div>
              <div class="col-xs-8">
              </div>
            </div>
          </fieldset>
          <hr />
          <div> <!-- REPEAT OF DAYS FOR DESCRIPTIONS -->


          </div>
          <input type="file" id="upfile" ng-model="fileup" style="display:none;" />
        </div>
      </form>

      <!-- ////////////////////////// -->
      <!-- // 6 Preview access ////// -->
      <!-- ////////////////////////// -->
      <hr class="hr" id="step6startpoint" />
      <form class="step-load">
        <h2>
          <span>6.</span> Preview
        </h2>
        <div class="form-group">
          <button class="btn btn-primary mb-l" ng-if="!removeeditionbuttons"
              ng-show="editionenabled == true"  ng-click="toggleedition()">Preview</button>
        </div>
      </form>
      



      <!-- ////////////////////////// -->
      <!-- // 7 Additional information-->
      <!-- ////////////////////////// -->
      <hr class="hr" id="step9startpoint" />
      <form class="step-load">
        <h2>
          <span>7.</span> Additional Information
        </h2>

        <p class="required-label">* required</p>
        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.english && booking != null">
          <label class="control-label" for="cancelpolicy">
            Cancel Policy (english)<b>*</b>
          </label>
          <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatecancelpolicy_es(booking.cancelpolicy._es)" class="pull-right trans">
            <i class="fa fa-language"></i> get translation
          </a>
          <textarea ng-model="booking.cancelpolicy._en" class="form-control" rows="7" id="cancelpolicy" type="text" value="" ></textarea>
        </div>
        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.spanish  && booking != null">
          <label class="control-label" for="cancelpolicy">
            Cancel Policy (spanish)<b>*</b>
          </label>
          <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatecancelpolicy(booking.cancelpolicy._en)" class="pull-right trans">
            <i class="fa fa-language"></i> get translation
          </a>
          <textarea ng-model="booking.cancelpolicy._es" class="form-control" rows="7" id="cancelpolicy" type="text" value=""></textarea>
        </div>
        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.english && quote != null">
          <label class="control-label" for="cancelpolicy">
            Cancel Policy (english)<b>*</b>
          </label>
          <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatecancelpolicy_es(quote.responseDetails.cancelpolicy._es)" class="pull-right trans">
            <i class="fa fa-language"></i> get translation
          </a>
          <textarea ng-model="quote.responseDetails.cancelpolicy._en" class="form-control" rows="7" id="cancelpolicy" type="text" value="" ></textarea>
        </div>
        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.spanish  && quote != null">
          <label class="control-label" for="cancelpolicy">
            Cancel Policy (spanish)<b>*</b>
          </label>
          <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatecancelpolicy(quote.responseDetails.cancelpolicy._en)" class="pull-right trans">
            <i class="fa fa-language"></i> get translation
          </a>
          <textarea ng-model="quote.responseDetails.cancelpolicy._es" class="form-control" rows="7" id="cancelpolicy" type="text" value=""></textarea>
        </div>
      </form>
      <!-- ////////////////////// -->
      <!-- // 8 SAVE THIS TOUR -->
      <!-- ////////////////////// -->
      <hr class="hr" id="step8startpoint" />
      <form class="step-load" ng-show="quote == null">
        <p class="required-label">* required</p>
        <h2>
          <span>8.</span> Save these product changes
        </h2>
        <footer>
          <button type="button"
          ng-click="SaveProductChanges()"
          id="step8draftbutton"
          class="btn btn-alt btn-lg pull-right padleft">save</button>
        </footer>
      </form>
      <form class="step-load" ng-show="quote != null">
        <p class="required-label">* required</p>
        <h2>
          <span>8.</span> Save this quote
        </h2>
        <div class="row">
          <div class="form-group col-md-7">
            <label class="control-label" for="save-as">
              Save quote as <b>*</b>
            </label>
            <input ng-model="dmcproduct.name" class="form-control" id="save-as" type="text" value="" placeholder="" />
          </div>
        </div>
        <footer>
          <button type="button"
          ng-click="SaveProductChanges()"
          id="step8draftbutton"
          class="btn btn-alt btn-lg pull-right padleft">save</button>
        </footer>
      </form>
    </div>
</section>