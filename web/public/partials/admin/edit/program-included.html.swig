<form ng-show="StepThreeVisible" class="step-load">
    <p class="required-label">* required</p>
    <h2><span>3.</span> Included / Not included</h2>
    <p>If the service is not selected, client will see it as not included.</p>
    <div class="bg-warning">
        <div class="row">
        <div class="col-md-6">
        <legend>Kind of trip <b>*</b></legend>
        <fieldset>
            <label class="radio-inline notranslate">
                <input ng-change="changeincludedtypetrip()" ng-model="included.tripisprivateorgroup" type="radio" name="kind-trip" id="group-trip" value="group"> Group
            </label>
            <label class="radio-inline notranslate">
                <input ng-change="changeincludedtypetrip()" ng-model="included.tripisprivateorgroup" type="radio" name="kind-trip" id="private-trip" value="private"> Private
            </label>
        </fieldset>
        </div>
        <div class="col-md-6">
        <legend>Minimun to operate <b>*</b></legend>
        <fieldset>
            <div class="form-group mb-zero">
                <select class="form-control datefilter iblock" name="minpaxoperate" ng-model="dmcproduct.included.trip.minpaxoperate">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <label class="sr-only" for="minpaxoperate">Minimun to operate</label>
                <span class="form-control-static iblock ml-l">pax</span>
            </div>

        </fieldset>
        </div>
        </div>
    </div>
    <h3>Click only if the service is included</h3>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                    <div class="checkbox">
                        <label>
                            <input ng-model="dmcproduct.included.arrivaltransfer" type="checkbox" value="arr-trans">
                            Arrival transfer
                        </label>
                    </div>
                </div>
                <div class="col-md-3" ng-show="dmcproduct.included.arrivaltransfer">
                    <div class="checkbox">
                        <label>
                            <input ng-model="dmcproduct.included.arrivalassistance" type="checkbox" value="arr-assis">
                            Assistance
                        </label>
                    </div>
                </div>
                <div class="col-md-6" ng-show="dmcproduct.included.arrivalassistance && dmcproduct.included.arrivaltransfer">
                    <div class="checkbox" ng-show="dmcproduct.included.arrivaltransfer">
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.arrivallanguage.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.arrivallanguage.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.arrivallanguage.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.arrivallanguage.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.arrivallanguage.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.arrivallanguage.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
                        </label>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="checkbox">
                        <label>
                            <input ng-model="dmcproduct.included.departuretransfer" type="checkbox" value="depa-trans">
                            Departure transfer
                        </label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="checkbox" ng-show="dmcproduct.included.departuretransfer">
                        <label>
                            <input ng-model="dmcproduct.included.departureassistance" type="checkbox" value="depa-assi">
                            Assistance
                        </label>
                    </div>
                </div>
                <div class="col-md-6" >
                    <div class="checkbox" ng-show="dmcproduct.included.departureassistance && dmcproduct.included.departuretransfer">
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.departurelanguage.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.departurelanguage.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.departurelanguage.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.departurelanguage.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.departurelanguage.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.departurelanguage.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
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
                            <input ng-model="dmcproduct.included.tourescort.included" type="checkbox" value="tour-escort">
                            Tour Escort
                        </label>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="checkbox" ng-show="dmcproduct.included.tourescort.included">
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.tourescort.language.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.tourescort.language.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.tourescort.language.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.tourescort.language.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.tourescort.language.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.tourescort.language.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
                        </label>
                    </div>
                    {# <select ng-change="dmcproduct.included.tourescort.language = dmcproduct.included.tourescort.tourescortselectedlanguage.language" class="form-control"
                            ng-options="lang.language for lang in availablelanguages"
                            ng-model="dmcproduct.included.tourescort.tourescortselectedlanguage"></select>
                    <select ng-model="dmcproduct.included.tourescort.language" class="form-control select-lang" id="tour-escort-lang">
                        <option>Spanish</option>
                        <option>English</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Italian</option>
                    </select> #}
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="checkbox">
                        <label>
                            <input ng-model="dmcproduct.included.driveguide.included" type="checkbox" value="drive-guide">
                            Driver/Guide
                        </label>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="checkbox" ng-show="dmcproduct.included.driveguide.included">
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.driveguide.language.spanish" type="checkbox" id="lang-guide-esc-es" value="spanish"> Spanish
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.driveguide.language.english" type="checkbox" id="lang-guide-esc-en" value="english"> English
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.driveguide.language.french" type="checkbox" id="lang-guide-esc-fr" value="french"> French
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.driveguide.language.german" type="checkbox" id="lang-guide-esc-ge" value="german"> German
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.driveguide.language.italian" type="checkbox" id="lang-guide-esc-it" value="italian"> Italian
                        </label>
                        <label class="checkbox-inline">
                            <input ng-model="dmcproduct.included.driveguide.language.portuguese" type="checkbox" id="lang-guide-esc-it" value="portuguese"> Portuguese
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
                            <input ng-model="dmcproduct.included.transportbetweencities.included" type="checkbox" value="trans-cities">
                            Transportation between cities
                        </label>
                    </div>
                </div>
            </div>
            <div class="trans-cities-opt" ng-show="dmcproduct.included.transportbetweencities.included">
                <hr>
                <div class="row">

                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.bus" type="checkbox" id="trans-city-bus" value="bus"> Bus
                            </label>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.fourxfour" type="checkbox" id="trans-city-4x4" value="4x4"> 4x4
                            </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="checkbox">
                            <label>
                            <input ng-model="dmcproduct.included.transportbetweencities.domesticflight" type="checkbox" id="trans-city-fly" ng-change="removeflights(dmcproduct.included.transportbetweencities.domesticflight)" value="domestic-fly"> <span class="notranslate">Domestic Flight</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.train" type="checkbox" id="trans-city-train" value="train"> Railway
                            </label>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.boat" type="checkbox" id="trans-city-boat" value="boat"> Boat/Ferry
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.van" type="checkbox" id="trans-city-van" value="van"> Van/Minivan
                            </label>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.truck" type="checkbox" id="trans-city-truck" value="truck"> Truck
                            </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.privatecarwithdriver" type="checkbox" id="trans-city-driver" value="car-driver"> Car + driver
                            </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        {# <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.privatecarwithdriverandguide" type="checkbox" id="trans-city-guide" value="car-guide"> Private car with driver and guide
                            </label>
                        </div> #}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="checkbox">
                            <label>
                                <input ng-model="dmcproduct.included.transportbetweencities.other" type="checkbox" id="trans-city-other" value="other"> Other
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group" ng-show="dmcproduct.included.transportbetweencities.other">
                            <label class="control-label sr-only" for="other-trans">Other Transportation</label>
                            <input ng-model="dmcproduct.included.transportbetweencities.otherdescription" class="form-control" id="other-trans" type="text" value="" placeholder="please, add the other transportation name here...">
                        </div>
                    </div>
                </div>
            </div> <!--  close trans-cities-opt -->
        </div> <!--  close panel-body -->
    </div> <!--  close panel-default -->

    <div class="panel panel-default">
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                    <div class="checkbox">
                        <label class="notranslate">
                            <input ng-model="dmcproduct.included.taxesinthecountry" type="checkbox" id="country-taxes" value="country-taxes"> Country Taxes
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="checkbox">
                        <label class="notranslate">
                            <input ng-model="dmcproduct.included.airporttaxes" type="checkbox" id="air-taxes" value="air-taxes"> Airport Taxes
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="checkbox">
                        <label class="notranslate">
                            <input ng-model="dmcproduct.included.tips" type="checkbox" id="tips" value="tips"><span class="notranslate"> Tips</span>
                        </label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="checkbox">
                        <label>
                            <input ng-model="dmcproduct.included.baggagehandlingfees" type="checkbox" id="baggage" value="baggage"> Baggage handling
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer ng-show="StepThreeVisibleButtons">
        <button ng-click="StepThreeCommit()" id="step3button"
                type="button" class="btn btn-success btn-lg pull-right">
            ok, next step
        </button>
        <div class="steps">
            <h6>step 3 of 8</h6>
            <ol>
                <li class="active"><span>Languages</span></li>
                <li class="active"><span>Tour main info</span></li>
                <li class="active"><span>Operation dates, availability and rates</span></li>
                <li class="active"><span>Included / Not included</span></li>
                <li><span>Itinerary (Day to Day)</span></li>
                <li><span>Descriptions</span></li>
                <li><span>Tag this tour</span></li>
                <li><span>Preview</span></li>
                <li><span>Save this program</span></li>
            </ol>
        </div>

    </footer>
</form>