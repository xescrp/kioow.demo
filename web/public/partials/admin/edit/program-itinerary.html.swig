<form class="itinerary-load step-load" ng-show="StepFourVisible">
    <p class="required-label">* required</p>
    <h2><span>4.</span> Itinerary (Day to Day)</h2>
    
    <div class="day" ng-repeat="itinerary in dmcproduct.itinerary" 
         data-itinerary="{{itinerary.uuid}}">
        
        <hr ng-show="!categoryEditingVisible" class="hr" />

        <div class="day-thumb" ng-show="!itinerary.lastday">
            <span class="label label-day"><i class="fa fa-calendar-o"></i> Day {{itinerary.daynumber}}</span>
        </div>
        <div class="day-thumb" ng-show="itinerary.lastday">
            <span class="label label-day"><i class="fa fa-calendar-o"></i> Last Day</span>
        </div>
        <div class="col-xs-9 col-md-10">

            <div class="row" ng-show="categoryEditingVisible && $index != 0">
                <div class="col-xs-9">
                    <div ng-class="{'disabledbox' : !itinerary.lastday && itinerary.daynumber < dmcproduct.itinerary.length }"
                    class="checkbox alert-danger form-inline padded-l mb-zero mt-zero">
                        <label class="check-inline">
                            <input
                            ng-disabled="checkdisabled(itinerary)"
                            type="checkbox"
                            value="stop" 
                            ng-model="itinerary.lastday"
                            ng-click="deleteLastDay(itinerary)" />
                            <strong>Is this the last day?</strong>
                        </label>
                    </div>
                </div>
                <div class="col-xs-3 text-right">
                    <button ng-click="deleteitinerary($index)" type="button" class="btn btn-danger text-rigth">
                        <i class="fa fa-trash-o"></i> delete
                    </button>
                </div>
            </div>
            <!-- init arrival airport  shows if is first day & dmcproduct.flights is true-->
            <div ng-show="categoryEditingVisible && $index == 0 && dmcproduct.flights">
                <!-- show if have airport -->
                <h3 class="mt-b pb-b iblock">
                Arrival airport <b class="text-danger" ng-if="!itinerary.flights[0].arrival">*</b><span ng-show="haveArrivalAirport || itinerary.flights[0].arrival" ng-if="itinerary.flights[0].arrival">: <strong>({{itinerary.flights[0].arrival.iata}}) {{itinerary.flights[0].arrival.name}} - {{itinerary.flights[0].arrival.country}}</strong><small>
                        <a class="text-info ml-b pointer" 
                        ng-show="categoryEditingVisible"
                        ng-click="deleteAirport(itinerary, 'arrival')">
                            <i class="fa fa-pencil"></i> EDIT
                        </a>
                    </small>
                    </span>
                </h3>

                <!-- show if dont have airport -->
                <div ng-show="!haveArrivalAirport && !itinerary.flights[0].arrival" class="ml-b iblock">
                    <div name="arrivalairport" class="form-inline">
                        <div class="form-inline form-group mb-zero">
                            <label class="control-label sr-only" for="arrivalairport">Arrival Airport <b>*</b></label>
                            <input 
                            ng-model="arrivalairportholder"
                            class="form-control select-city"
                            id="arrivalairport"
                            type="text" value=""
                            placeholder="Search IATA code"
                            uib-typeahead="item as item.label for item in airports | filter:$viewValue  | limitTo:8"
                            typeahead-loading="loadingAirport"
                            required />
                            <button class="btn btn-default" ng-click="selectAirport(arrivalairportholder, itinerary, 'arrival')" type="button">select</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end arrival airport -->

            <h3 ng-show="categoryEditingVisible">Destinations <b class="text-danger">*</b></h3>
            
            <div class="form-inline form-group"
            ng-show="!itinerary.lastday && categoryEditingVisible">
                <label class="sr-only" for="select-city">Select City</label>
                <input type="text"
                    class="form-control select-city"
                    ng-model="itinerary.citytoadd.city"
                    placeholder="Select city"
                    id="select-city"
                    uib-typeahead="destination as destination.label_en for destination in cities | filter:$viewValue | limitTo:8"
                    typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html?v={? appversion ?}"
                    typeahead-template-url="/partials/popup/cities-result-item.html?v={? appversion ?}" />
                <button type="button" ng-click="addcitytoitinerary(itinerary, itinerary.citytoadd.city)" class="btn btn-default add-city notranslate">stop</button>
                <button type="button"
                ng-show="itinerary.sleepcity.city == ''" 
                ng-click="addsleeptoitinerary(itinerary, itinerary.citytoadd.city)" 
                class="btn btn-primary add-city" >night</button>
            </div>
            
            <!-- init last day -->
            <div class="form-inline" ng-show="showlastdayaddcity && itinerary.lastday">
                <div class="form-group">
                    <label class="sr-only" for="select-city">Select City</label>
                    <input type="text"
                    class="form-control select-city"
                    placeholder="Select city"
                    ng-model="itinerary.citytoadd.city"
                    id="select-city"
                    uib-typeahead="destination as destination.label_en for destination in cities | filter:$viewValue | limitTo:8"
                    typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html?v={? appversion ?}"
                    typeahead-template-url="/partials/popup/cities-result-item.html?v={? appversion ?}" />
                    <button ng-click="addcitytoitinerarylastday(itinerary, itinerary.citytoadd.city)"
                    type="button" class="btn btn-default add-city">
                        Stop
                    </button>
                </div>
            </div>
            <!-- end last day -->


            <h3 class="path notranslate" ng-show="!itinerary.lastday" ng-class="{'mt-b' : !categoryEditingVisible}">
                <span ng-show="itinerary.departurecity != null && itinerary.departurecity.city != ''">
                    <strong>{{itinerary.departurecity.city}}</strong> (departure) -
                </span>
                <span ng-show="itinerary.stopcities.length > 0"
                      ng-repeat="city in itinerary.stopcities">
                    <strong>{{city.city}}</strong> (stop)
                    <small>
                        <a class="text-danger" ng-show="categoryEditingVisible"
                           ng-click="removestopcitytoitinerary(itinerary, city.city)">
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </small> -
                </span>
                <span ng-show="itinerary.sleepcity.city != ''">
                    <strong>{{itinerary.sleepcity.city}}</strong> (night)
                    <small>
                        <a  class="text-danger" ng-show="categoryEditingVisible"
                           ng-click="removesleepcitytoitinerary(itinerary)">
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </small>
                </span>
            </h3>

            <h3 class="path notranslate" ng-show="itinerary.lastday" ng-class="{'mt-b' : !categoryEditingVisible}">
                <span ng-show="itinerary.departurecity.city != ''">
                    <strong>
                        {{ itinerary.departurecity.city }}
                    </strong> (departure)
                </span>
                <span ng-repeat="city in itinerary.stopcities">
                    -
                    <strong>{{city.city}}</strong> ({{city.citybehaviour}})
                    <small>
                        <a class="text-danger" ng-show="categoryEditingVisible"
                           ng-click="removestopcitytoitinerary(itinerary, city.city)">
                            <i class="fa fa-trash-o"></i>
                        </a>
                    </small>
                </span>
                <!-- button to add stop on last day-->
                <button type="button" ng-hide="!categoryEditingVisible || showlastdayaddcity" ng-click="addlastdaystop()" class="ml-l btn btn-default add-city notranslate"> Add Stop </button>
            </h3>

            <!-- Aquí domestic flights -->

            <!-- dmcproduct.included.transportbetweencities.domesticflight -->
            <div class="row" ng-show="!dmcproduct.included.transportbetweencities.domesticflight && categoryEditingVisible && $index != 0 && !itinerary.lastday">
                <div class="col-md-12">
                    <div class="checkboxform-inline mb-zero mt-zero">
                        <label class="check-inline text-danger">
                            <input ng-model="itinerary.needflights" type="checkbox" id="needflights" 
                                   ng-change="loadflights(itinerary.needflights, itinerary)" /> <strong>this day requires domestic flights not included in your price?</strong>
                        </label>
                    </div>
                    <div ng-show="itinerary.needflights">
                          <h3 class="mt-l">Please, indicates the flights that the clients have to book.</h3>
                          <div class="panel panel-default mb-l">
                          <h4 class="padded-l" ng-show="itinerary.flights.length == 0">Please add a domestic flight</h4>
                            <div class="panel-body" ng-repeat="flight in itinerary.flights">
                                <div class="row">
                                    <div class="col-md-2 col-md-push-10">
                                        <button ng-click="deleteflights($index, itinerary)" type="button" class="btn btn-danger pull-right"><i class="fa fa-trash-o"></i> delete</button>
                                    </div>
                                    <div class="col-md-3 col-md-pull-2">
                                        <div class="form-group">
                                        <label class="control-label" for="departureairport">Departure Airport <b>*</b></label>
                                            <input ng-model="flight.departure" class="form-control select-tag" 
                                                   id="departureairport" type="text" value="" placeholder="Search IATA code" 
                                                   uib-typeahead="item as item.label for item in airports | filter:$viewValue  | limitTo:8" 
                                                   typeahead-loading="loadingAirport" typeahead-on-select="onSelectAirport($item, $model, $label, flight.departure)" required />
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-md-pull-2">
                                        <div class="form-group">
                                        <label class="control-label" for="arrivalairport">Arrival Airport <b>*</b></label>
                                            <input ng-model="flight.arrival" class="form-control select-tag" id="arrivalairport" 
                                                   type="text" value="" placeholder="Search IATA code" 
                                                   uib-typeahead="item as item.label for item in airports | filter:$viewValue  | limitTo:8" 
                                                   typeahead-loading="loadingAirport" typeahead-on-select="onSelectAirport($item, $model, $label, flight.arrival)" required />
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
            <h3 ng-show="!itinerary.lastday" class="">Hotel</h3>
            <div class="panel panel-default" ng-show="!itinerary.lastday">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label class="control-label" for="hotel-name">Hotel name </label>
                                <input ng-model="itinerary.hotel.name" class="form-control" id="hotel-name" type="text" value="" placeholder="please, add the hotel name here..." />
                               <!-- TODO --> <p class="help-block">If you don't have a hotel name, leave it blank.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label" for="hotel-name">Hotel category <b>*</b></label>
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
                                        <input ng-change="changehotelkind(itinerary)" ng-model="itinerary.hotel.locationkind" type="radio" value="hotelcity" /> In City
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-4 col-md-3">
                                <div class="radio">
                                    <label>
                                        <input type="radio" ng-change="changehotelkind(itinerary)" ng-model="itinerary.hotel.locationkind" value="hotelsurr" /> Out City
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div> <!-- close panel -->
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

            <h3 ng-show="categoryEditingVisible">Activities or Excursions</h3>
            <div ng-repeat="activity in itinerary.activities" ng-show="categoryEditingVisible">
                <div class="panel panel-default activ-item">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-2 col-md-push-10">
                                <button ng-click="deleteactivity(itinerary, activity)" type="button" class="btn btn-danger pull-right"><i class="fa fa-trash-o"></i> delete</button>
                            </div>
                            <div class="col-md-10 col-md-pull-2">
                                <div class="form-group" ng-show="dmcproduct.languages.english" ng-class="{true : 'has-error'} [90 < activity.title.length]">
                                    <label class="control-label" for="activ-name">Title (english) <b>*</b> </label> <a href="" ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" ng-click="translateactivity_es(activity)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                                    <input ng-model="activity.title" class="form-control" ng-maxlength="90" maxlength="90" id="activ-name" type="text" value="" placeholder="" />
                                    <p class="help-block text-right small notranslate">Max 90 char: <strong>{{90 - activity.title.length}} left</strong></p>
                                </div>
                                <div class="form-group" ng-show="dmcproduct.languages.spanish" ng-class="{true : 'has-error'} [90 < activity.title_es.length]">
                                    <label class="control-label" for="activ-name">Title (spanish) <b>*</b> </label> <a href="" ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" ng-click="translateactivity(activity)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                                    <input ng-model="activity.title_es" ng-maxlength="90" maxlength="90" class="form-control" id="activ-name" type="text" value="" placeholder="" />
                                    <p class="help-block text-right small notranslate">Max 90 char: <strong>{{90 - activity.title_es.length}} left</strong></p>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="activ-group-box">
                                    <label class="radio-inline notranslate">
                                        <input ng-change="activitykindchange(activity)" ng-model="activity.activitykind" type="radio" value="group" /> Group
                                    </label>
                                    <label class="radio-inline notranslate">
                                        <input ng-change="activitykindchange(activity)" ng-model="activity.activitykind" type="radio" value="individual" /> Private
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="activ-extras">

                                    <div class="checkbox">
                                        <label>
                                            <input ng-model="activity.ticketsincluded" type="checkbox" /> Tickets
                                        </label>
                                    </div>

                                    <div class="checkbox ml-xl">
                                        <label>
                                            <input type="checkbox" ng-model="activity.localguide" /> Local Guide
                                        </label>
                                    </div>

                                </div>
                                <div class="checkbox alert" ng-show="activity.localguide">
                                    <h5><strong>Local guide</strong></h5>
                                    <label class="checkbox-inline">
                                        <input ng-model="activity.language.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish" /> Spanish
                                    </label>
                                    <label class="checkbox-inline">
                                        <input ng-model="activity.language.english" type="checkbox" id="lang-tour-esc-en" value="english" /> English
                                    </label>
                                    <label class="checkbox-inline">
                                        <input ng-model="activity.language.french" type="checkbox" id="lang-tour-esc-fr" value="french" /> French
                                    </label>
                                    <label class="checkbox-inline">
                                        <input ng-model="activity.language.german" type="checkbox" id="lang-tour-esc-ge" value="german" /> German
                                    </label>
                                    <label class="checkbox-inline">
                                        <input ng-model="activity.language.italian" type="checkbox" id="lang-tour-esc-it" value="italian" /> Italian
                                    </label>
                                    <label class="checkbox-inline">
                                        <input ng-model="activity.language.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese" /> Portuguese
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>                               
            <button ng-click="addactivitytoitinerary(itinerary)" type="button" class="btn btn-alt" ng-show="categoryEditingVisible" >add an activity</button>

            <!-- init departure airport -->
            <div ng-show="itinerary.lastday && categoryEditingVisible && dmcproduct.flights" class="mt-xl">
                <!-- show if have airport -->
                <h3 class="mt-l pb-b iblock">
                Departure airport <b class="text-danger" ng-if="!itinerary.flights[0].departure">*</b>
                  <span ng-show="haveDepartureAirport || itinerary.flights[0].departure" ng-if="itinerary.flights[0].departure">: 
                  <strong>({{itinerary.flights[0].departure.iata}}) {{itinerary.flights[0].departure.name}} - {{itinerary.flights[0].departure.country}}</strong><small>
                        <a class="text-info ml-b pointer" 
                        ng-show="categoryEditingVisible"
                        ng-click="deleteAirport(itinerary, 'departure')">
                            <i class="fa fa-pencil"></i> EDIT
                        </a>
                    </small>
                    </span>
                </h3>
                <!-- show if dont have airport -->
                <div ng-show="!haveDepartureAirport && !itinerary.flights[0].departure" class="ml-b iblock">
                    <div name="departureairpor" class="form-inline">
                        <div class="form-inline form-group mb-zero">
                                <label class="control-label sr-only" for="arrivalairport">Departure Airport <b>*</b></label>
                                <input 
                                ng-model="departureairportholder"
                                class="form-control select-city"
                                id="arrivalairport"
                                type="text" value=""
                                placeholder="Search IATA code"
                                uib-typeahead="item as item.label for item in airports | filter:$viewValue  | limitTo:8"
                                typeahead-loading="loadingAirport"
                                required />
                                <button class="btn btn-default" ng-click="selectAirport(departureairportholder, itinerary, 'departure')" type="button">select</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end departure airport -->
          <fieldset class="day-desc-item mt-xxl" >
            
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
                <div ng-show="false" id="{{buildid('prev',itinerary.uuid)}}" class="thumbwaitimage">
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
                <div id="{{buildid('img',itinerary.uuid)}}">
                  <img  ng-src="{{getimage(itinerary.image.url, 'itinerarydaythumb')}}" data-src2x="{{getimage(itinerary.image.url, 'itinerarydaythumbretina')}}" class="img-responsive" alt="{{dmcproduct.title}} itinerary" title="{{dmcproduct.title}} itinerary" />


                  <label ng-show="!showmainimage" class="btn btn-danger btn-upload mt-xl" ng-show="!showmainimage">
                    <i class="fa fa-cloud-upload"></i>
                    <span>upload image</span>
                    <input type="file" ng-hideid="{{buildid('img',itinerary.uuid)}}" ng-waitingid="{{buildid('prev',itinerary.uuid)}}" ng-file-select="" ng-model="itinerary.image" />
                  </label>
                  <label class="btn btn-danger btn-upload mt-xl" ng-show="showmainimage">
                    <i class="fa fa-cloud-upload"></i>
                    <span>replace image</span>
                    <input type="file" ng-hideid="{{buildid('img',itinerary.uuid)}}" ng-waitingid="{{buildid('prev',itinerary.uuid)}}" ng-file-select="" ng-model="itinerary.image" />
                  </label>
                </div>
              </div>
              <div class="col-xs-8">

              </div>
            </div>
            <hr ng-show="!itinerary.lastday" />
        </fieldset>
           
        </div> <!-- end class="col-xs-9 col-md-10" -->

        <div class="col-xs-12 mt-l close-day" ng-show="itinerary.lastday == false && categoryEditingVisible">

            <button type="button" ng-click="additineraryday(itinerary)" class="btn btn-primary btn-lg pull-right">Add Day</button>

        </div>
        <hr ng-show="itinerary.lastday == false" />
    
    </div> <!-- close first day -->
    
    <div class="close-day" ng-show="dmcproduct.itinerary.length == 0 && categoryEditingVisible">
        <button type="button" ng-click="additineraryday()" class="btn btn-primary btn-lg pull-right">Add Day</button>
    </div>
    <!-- important notes for traveler -->  
    <hr />                
    <div class="panel panel-default mt-xxl" ng-show="categoryEditingVisible">
        <div class="panel-body bg-warning"> 
            <div class="row" >
                <div class="col-md-12">
                <legend class=""><strong>Important Notes For Travelers:</strong></legend>
                    <div class="form-group pb-xxl" ng-show="dmcproduct.languages.english">
                        <label for="important_txt_en" class="control-label">Important Information for travelers (english) </label>
                        <a ng-show="dmcproduct.languages.english &amp;&amp; dmcproduct.languages.spanish" href="" ng-click="translateimportantenotes(dmcproduct.important_txt_es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                        <textarea ng-model="dmcproduct.important_txt_en" class="form-control " rows="4" id="important_txt_en" placeholder="Please, add information that travelers should know (if visa is needed and you can provide it, which is the best airport to arrive, if domestic flights are not included, which ones should clients book by themselves, etc... )"></textarea>
                        <span class="help-block pull-right">(optional)</span>
                    </div>
                    <div class="form-group" ng-show="dmcproduct.languages.spanish">
                        <label for="important_txt_es" class="control-label">Important Information for travelers (spanish) </label>
                        <a ng-show="dmcproduct.languages.english &amp;&amp; dmcproduct.languages.spanish" href="" ng-click="translateimportantenotes_es(dmcproduct.important_txt_en)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                        <textarea ng-model="dmcproduct.important_txt_es" class="form-control " rows="4" id="important_txt_es" placeholder="Por favor, agrega información que debe conocer el viajero (visas, vuelos domésticos incluidos o no ...)"></textarea>
                        <span class="help-block pull-right">(optional)</span>
                    </div>
                </div>
            </div>
        </div>
     </div>
    {# Boton para guardar categoria #}
    <button type="button" ng-show="!categoryEditingVisible" ng-click="saveCategories()" id="step8publishbutton" class="btn btn-success btn-lg pull-right">Save</button>
    <footer ng-show="StepFourVisibleButtons">
        <button ng-click="StepFourCommit()" type="button" id="step4button"
                class="btn btn-success btn-lg pull-right">
            ok, next step
        </button>
        <div class="steps">
            <h6>step 4 of 8</h6>
            <ol>
                <li class="active"><span>Languages</span></li>
                <li class="active"><span>Tour main info</span></li>
                <li class="active"><span>Operation dates, availability and rates</span></li>
                <li class="active"><span>Included / Not included</span></li>
                <li class="active"><span>Itinerary (Day to Day)</span></li>
                <li><span>Descriptions</span></li>
                <li><span>Tag this tour</span></li>
                <li><span>Preview</span></li>
                <li><span>Save this program</span></li>
            </ol>
        </div>
    </footer>
</form>

