<section class="new-program" ng-show="formvisible">
    <div class="panel-body">
        <div ng-if="dmcresponse.status == 'under review' || dmcresponse.status == 'published'" class="alert alert-dismissable alert-info" ng-hide="closeur || isAdmin">
        <button type="button" ng-click="closeur = true" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        Your quote ({{dmcresponse.code}}) has been sent to the client.
        </div>
        <div ng-if="dmcresponse.status == 'win'" class="alert alert-success alert-dismissible" role="alert" ng-hide="closeun">
          <button type="button" class="close" ng-click="closeun = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4>Congratulations!</h4>
          <p>This quote ({{dmcresponse.code}}) is <strong>the chosen one</strong> <span class="label label-success"><i class="fa fa-trophy"></i> Win</span> <a class="btn btn-link" target="_self" ng-href="/dmc-booking?idbooking={{query.idBooking}}"><i class="fa fa-arrow-right"></i> go to booking</a></p>
        </div>
        <div ng-if="dmcresponse.status == 'lost' || dmcresponse.status == 'cancelled'" class="alert alert-dismissable alert-danger" role="alert" ng-hide="closepu">
          <button type="button" class="close" ng-click="closepu = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <i class="fa fa-warning"></i><strong>Your quote ({{dmcresponse.code}}) is not the chosen by the client or was cancelled.</strong>
        </div>
        <div ng-if="dmcresponse.status == 'draft'" class="alert alert-warning alert-dismissible" role="alert" ng-hide="closedr">
          <button type="button" class="close" ng-click="closedr = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          This quote ({{dmcresponse.code}}) is <strong>Draft</strong>
        </div>

        <div ng-if="dmcresponse.status == 'new'" class="alert alert-warning alert-dismissible" role="alert" ng-hide="closedr">
          <button type="button" class="close" ng-click="closedr = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          This quote ({{dmcresponse.code}}) is <strong>New</strong>
        </div>

        <!-- ////////////////////// -->
        <!-- // 0 TOUR MAIN LANGUAGES -->
        <!-- ////////////////////// -->
        <form ng-show="StepZeroVisible" class="step-load">
            <p class="required-label">* required</p>
            <h2><span>0.</span> Languages</h2>            
            <div class="bg-warning mb-l">
                <legend>In which languages will you quote this request?<b>*</b></legend>
                <fieldset>
                    <label class="checkbox-inline">
                        <input ng-model="dmcresponse.products.languages.english" type="checkbox" id="lang-tour-en" value="english"> English
                    </label><label class="checkbox-inline">
                        <input ng-model="dmcresponse.products.languages.spanish" type="checkbox" id="lang-tour-es" value="spanish"> Spanish
                    </label>
                </fieldset>
                <p class="help-block">
                    If you make use of the translator, our Product Department will review texts before sending.
                </p>
            </div>
            <footer ng-show="StepZeroVisibleButtons" class="ng-hide">
                <button ng-click="StepZeroCommit()" type="button" 
                        class="btn btn-success btn-lg pull-right" id="step0button">ok, next step</button>
                <div class="steps">
                    <h6>step 0 of 7</h6>
                    <ol>
                        <li class="active"><span>Languages</span></li>
                        <li><span>Tour main info</span></li>
                        <li><span>Operation dates, availability and rates</span></li>
                        <li><span>Included / Not included</span></li>
                        <li><span>Itinerary (Day to Day)</span></li>
                        <li><span>Descriptions</span></li>                                    
                        <li><span>Preview</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>

            </footer>
        </form>
        <!-- ////////////////////// -->
        <!-- // 1 TOUR MAIN INFO -->
        <!-- ////////////////////// -->
        <hr ng-show="StepOneVisible" class="hr" id="step1startpoint">
        <form ng-show="StepOneVisible" class="step-load">
            <p class="required-label">* required</p>
            <h2><span>1.</span> Tour name</h2>
            <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcresponse.products.languages.english">
                <label class="control-label" for="tourname">Tour name (english)<b>*</b></label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translatetitle_es(dmcresponse.products.title_es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                <input ng-model="dmcresponse.products.title" class="form-control" id="tourname" type="text" value="" placeholder="please, add the tour name here...">
            </div>
            <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcresponse.products.languages.spanish">
                <label class="control-label" for="tourname">Tour name (spanish)<b>*</b></label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translatetitle(dmcresponse.products.title)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                <input ng-model="dmcresponse.products.title_es" class="form-control" id="tourname" type="text" value="" placeholder="">
            </div>
            <footer ng-show="StepOneVisibleButtons">
                <button ng-click="StepOneCommit()" id="step1button" type="button" 
                        class="btn btn-success btn-lg pull-right">ok, next step</button>
                <div class="steps">
                    <h6>step 1 of 8</h6>
                    <ol>
                        <li class="active"><span>Languages</span></li>
                        <li class="active"><span>Tour main info</span></li>
                        <li><span>Operation dates, availability and rates</span></li>
                        <li><span>Included / Not included</span></li>
                        <li><span>Itinerary (Day to Day)</span></li>
                        <li><span>Descriptions</span></li>                                   
                        <li><span>Preview</span></li>
                        <li><span>Additional Information</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>

            </footer>
        </form>
        <!-- ////////////////////// -->
        <!-- // 2 OPERATION DATES, Accommodation AND RATES -->
        <!-- ////////////////////// -->
        <hr ng-show="StepTwoVisible" class="hr" id="step2startpoint">
        <form ng-show="StepTwoVisible" class="step-load">
            <p class="required-label">* required</p>
            <h2><span>2.</span> Operation dates, accomodation and net prices</h2>
            <!-- date inputs -->
            <div class="row">
                <!-- operation date -->
                <div class="form-group col-md-3 mb-l">
                    <label class="control-label mr-b mid-sized" for="operationstart">Operation Date <b>*</b></label>
                    <div class="input-group">
                        <p class="input-group">
                            <input type="text" class="form-control"
                                   uib-datepicker-popup="{{format}}"
                                   id="operationstart"
                                   ng-model="dmcresponse.operationStartDate" 
                                   is-open="datePicker.openedfrom"
                                   min-date="today"
                                   max-date="modifier.max" 
                                   datepicker-options="dateOptions"
                                   ng-change="checkDateOperation()"
                                   date-disabled="disabled(date, mode)" 
                                   ng-required="true"
                                   close-text="Close"
                                   placeholder="yyyy/mm/dd"/>
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default" 
                                        ng-click="openOperation($event)"><i class="fa fa-calendar"></i></button>
                            </span>
                        </p>                                  
                    </div>
                </div>
                <!-- fecha validez--> 
                <div class="form-group col-md-3 mb-l">
                <label class="control-label mr-b mid-sized" for="datevaliduntil">Quote valid until <b>*</b></label>
                    <div class="input-group">
                        <p class="input-group">
                            <input type="text"
                                   class="form-control"
                                   id="datevaliduntil"
                                   uib-datepicker-popup="{{format}}"
                                   ng-model="dmcresponse.quoteValidDate" 
                                   is-open="datePicker.openedto"
                                   min-date="today"
                                   max-date="modifier.max"
                                   ng-change="checkDateValidUntil()"
                                   datepicker-options="dateOptions"
                                   date-disabled="disabled(date, mode)" 
                                   ng-required="true" close-text="Close" placeholder="yyyy/mm/dd"/>
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default" 
                                        ng-click="openValid($event)"><i class="fa fa-calendar"></i></button>
                            </span>
                        </p>                                  
                    </div>
                    <small class="italic">The minimum validity is one week</small>
                </div>  
            </div>
            <hr class="mt-zero" />
            <div class="row">
                <div class="col-md-6">
                    <p class="mid-sized">Net Prices: <b class="text-red">*</b> </p>
                    <div class="bordered padded-l pt-zero pb-zero bb-none">
                        <div class="row">
                            <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Room type</h5>
                            <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Passengers</h5>
                            <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Net Price per pax</h5>
                        </div>
                        <div class="row">
                            <hr class="mt-zero mb-l">
                        </div>
                        <div class="row mb-l pb-l bordered-bottom">
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Single Room</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Adult</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4">
                                <div class="input-group">
                                    <input type="number" min="0"  class="form-control" ng-model="dmcresponse.rooms.single.pricePerPax.value" ng-change="roundValueSingle()">
                                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.single.pricePerPax.currency.symbol}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-l pb-l bordered-bottom ">
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Double</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Adult</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4">
                                <div class="input-group">
                                   <input type="number" min="0"  class="form-control" ng-model="dmcresponse.rooms.double.pricePerPax.value" ng-change="roundValueDouble()">
                                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.double.pricePerPax.currency.symbol}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-l pb-l bordered-bottom ">
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Triple Room</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Adult</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4">
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" ng-model="dmcresponse.rooms.triple.pricePerPax.value" ng-change="roundValueTriple()">
                                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.triple.pricePerPax.currency.symbol}}</span>
                                </div>
                            </div>
                        </div> 
                        <div class="row mb-l pb-l bordered-bottom ">
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Quad Room</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Adult</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4">
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" ng-model="dmcresponse.rooms.quad.pricePerPax.value" ng-change="roundValueQuad()">
                                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.quad.pricePerPax.currency.symbol}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- ninios distribucion -->
                        <div class="row mb-l pb-l bordered-bottom " ng-show="dmcresponse.children && dmcresponse.children.length >0" ng-repeat="child in dmcresponse.children">
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                                <strong>Child {{child.age}} years old</strong>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-4">
                                <div class="input-group">
                                    <input type="number" min="0"  class="form-control" ng-model="child.pricePerPax.value" ng-change="roundValueChild()">
                                    <span class="input-group-addon border-none bg-light">{{child.pricePerPax.currency.symbol}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                <br /><br />
                </div>
                <div class="col-md-6">
                    <p class="mid-sized">Accommodation: <b class="text-red">*</b></p>
                    <div class="bordered padded-l pt-zero pb-zero bb-none">
                        <div class="row">
                            <div class="col-md-12 bordered-bottom">
                                <div class="row">
                                <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Room type</h5>
                                <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Quantity</h5>
                                </div>
                            </div>
                            <div class="col-md-12 mt-l pb-l bordered-bottom">
                                <div class="row">
                                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Single Room </strong>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.single.quantity" placeholder="ej: 1"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-l pb-l bordered-bottom">
                                <div class="row">
                                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Double Room</strong>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.double.quantity" placeholder="ej: 1"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-l pb-l bordered-bottom">
                                <div class="row">
                                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Triple Room</strong>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.triple.quantity" placeholder="ej: 1"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-l pb-l bordered-bottom">
                                <div class="row">
                                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Quad Room</strong>
                                    <div class="col-md-3 col-sm-3 col-xs-3">
                                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.quad.quantity" placeholder="ej: 1"/>
                                    </div>
                                </div>
                            </div>                                                           
                        </div>
                    </div>
                </div>
            </div>

            <!-- version con ninios, carga manual del importe-->
            <div class="row alert alert-warning" ng-show="dmcresponse.children && dmcresponse.children.length > 0">            
                <div class="col-md-6 mt-l form-inline">               
                <p class="bold"><i class="fa fa-exclamation-circle text-brand-danger"></i> Please, calculate manually the total net price</p>
                    <h4 class="text-graydark">Total Net Price</h4>
                    <div class="form-group">
                        <label for="totalquote" class="sr-only">Total Net Price</label>
                        <div class="input-group">
                            <input type="number" min="1" class="form-control input-lg" name="totalquote" ng-model="dmcresponse.netPrice.value" placeholder="ej: 55.00" ng-change="roundValueNetPrice()">
                            <span class="input-group-addon border-none alert alert-warning padded-b bold h4-sized"> {{dmcresponse.netPrice.currency.symbol}}</span>
                        </div>
                        <p class="text-left">pleases set up the total rate (not automatic)</p>
                        <p class="help-block">Your prices must be net, as they will be increased with a percentual comission designed by omt.</p>
                    </div>
                </div>                                        
                <div class="col-md-6 text-center">
                    <p>{{getTotalPax()}}</p>
                    <strong class="text-graydark">Total Net Price:</strong>
                    <h3 class="h1 mt-zero text-gray bold">{{dmcresponse.netPrice.value}}<small class="bold"> {{dmcresponse.netPrice.currency.symbol}}</small></h3>
                    <small>Accommodation: <strong>{{getTotalDistribution(dmcresponse)}}</strong></small>
                </div>
            </div>

            <!-- version sin ninios, carga automatica del importe -->
            <div class="row alert alert-warning" ng-show="!dmcresponse.children || dmcresponse.children.length == 0">
                <div class="col-md-12 text-center">
                    <h4 class="text-graydark">Total Net Price</h4>
                    <p>{{getTotalPax()}}</p>
                    <strong class="text-graydark">Total Net Price:</strong>
                    <h3 class="h1 mt-zero text-gray bold">{{getTotalNetPrice()}}<small class="bold"> {{dmcresponse.netPrice.currency.symbol}}</small></h3>
                    <small>Accommodation: <strong>{{getTotalDistribution(dmcresponse)}}</strong></small>
                </div>
            </div>


            <footer ng-show="StepTwoVisibleButtons">
                <button ng-click="StepTwoCommit()" id="step2button" 
                        type="button" class="btn btn-success btn-lg pull-right">ok, next step</button>
                <div class="steps">
                    <h6>step 2 of 8</h6>
                    <ol>
                        <li class="active"><span>Languages</span></li>
                        <li class="active"><span>Tour main info</span></li>
                        <li class="active"><span>Operation dates, availability and rates</span></li>
                        <li><span>Included / Not included</span></li>
                        <li><span>Itinerary (Day to Day)</span></li>
                        <li><span>Descriptions</span></li>                                
                        <li><span>Preview</span></li>
                        <li><span>Additional Information</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>
            </footer>
        </form>

        <!-- ////////////////////// -->
        <!-- // 3 INCLUDED -->
        <!-- ////////////////////// -->
        <hr ng-show="StepThreeVisible" class="hr" id="step3startpoint">
        <form ng-show="StepThreeVisible" class="step-load">
            <p class="required-label">* required</p>
            <h2><span>3.</span> Included / Not included</h2>
            <p>Any service that is not selected, will appear to the client as not included.</p>
            <div class="bg-warning">
                <legend>Kind of trip <b>*</b></legend>
                <fieldset>
                    <label class="radio-inline">
                        <input ng-change="changeincludedtypetrip()" ng-model="included.tripisprivateorgroup" type="radio" name="kind-trip" id="group-trip" value="group"> Group Trip
                    </label>
                    <label class="radio-inline">
                        <input ng-change="changeincludedtypetrip()" ng-model="included.tripisprivateorgroup" type="radio" name="kind-trip" id="private-trip" value="private"> Private Trip
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
                                    <input ng-model="dmcresponse.products.included.arrivaltransfer" type="checkbox" value="arr-trans">
                                    Arrival transfer
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3" ng-show="dmcresponse.products.included.arrivaltransfer">
                            <div class="checkbox">
                                <label>
                                    <input ng-model="dmcresponse.products.included.arrivalassistance" type="checkbox" value="arr-assis">
                                    Arrival assistance
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6" ng-show="dmcresponse.products.included.arrivalassistance && dmcresponse.products.included.arrivaltransfer">
                            <div class="checkbox" ng-show="dmcresponse.products.included.arrivaltransfer">
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.arrivallanguage.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.arrivallanguage.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.arrivallanguage.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.arrivallanguage.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.arrivallanguage.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.arrivallanguage.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input ng-model="dmcresponse.products.included.departuretransfer" type="checkbox" value="depa-trans">
                                    Departure transfer
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="checkbox" ng-show="dmcresponse.products.included.departuretransfer">
                                <label>
                                    <input ng-model="dmcresponse.products.included.departureassistance" type="checkbox" value="depa-assi">
                                    Departure assistance
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6" >
                            <div class="checkbox" ng-show="dmcresponse.products.included.departureassistance && dmcresponse.products.included.departuretransfer">
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.departurelanguage.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.departurelanguage.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.departurelanguage.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.departurelanguage.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.departurelanguage.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.departurelanguage.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
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
                                    <input ng-model="dmcresponse.products.included.tourescort.included" type="checkbox" value="tour-escort">
                                    Tour Escort
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="checkbox" ng-show="dmcresponse.products.included.tourescort.included">
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.tourescort.language.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.tourescort.language.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.tourescort.language.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.tourescort.language.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.tourescort.language.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.tourescort.language.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
                                </label>
                            </div>
                            <!--select ng-change="dmcresponse.products.included.tourescort.language = dmcresponse.products.included.tourescort.tourescortselectedlanguage.language" class="form-control"
                                    ng-options="lang.language for lang in availablelanguages"
                                    ng-model="dmcresponse.products.included.tourescort.tourescortselectedlanguage"></select>
                            <select ng-model="dmcresponse.products.included.tourescort.language" class="form-control select-lang" id="tour-escort-lang">
                                <option>Spanish</option>
                                <option>English</option>
                                <option>French</option>
                                <option>German</option>
                                <option>Italian</option>
                            </select--> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input ng-model="dmcresponse.products.included.driveguide.included" type="checkbox" value="drive-guide">
                                    Driver/Guide
                                </label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="checkbox" ng-show="dmcresponse.products.included.driveguide.included">
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.driveguide.language.spanish" type="checkbox" id="lang-guide-esc-es" value="spanish"> Spanish
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.driveguide.language.english" type="checkbox" id="lang-guide-esc-en" value="english"> English
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.driveguide.language.french" type="checkbox" id="lang-guide-esc-fr" value="french"> French
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.driveguide.language.german" type="checkbox" id="lang-guide-esc-ge" value="german"> German
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.driveguide.language.italian" type="checkbox" id="lang-guide-esc-it" value="italian"> Italian
                                </label>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcresponse.products.included.driveguide.language.portuguese" type="checkbox" id="lang-guide-esc-it" value="portuguese"> Portuguese
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
                                    <input ng-model="dmcresponse.products.included.transportbetweencities.included" type="checkbox" value="trans-cities">
                                    Transportation between cities
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="trans-cities-opt" ng-show="dmcresponse.products.included.transportbetweencities.included">
                        <hr>
                        <div class="row">

                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.bus" type="checkbox" id="trans-city-bus" value="bus"> Bus
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.fourxfour" type="checkbox" id="trans-city-4x4" value="4x4"> 4x4
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.domesticflight" type="checkbox" id="trans-city-fly" value="domestic-fly"> Domestic Flight
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.train" type="checkbox" id="trans-city-train" value="train"> Train
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.boat" type="checkbox" id="trans-city-boat" value="boat"> Boat/Ferry
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.van" type="checkbox" id="trans-city-van" value="van"> Van/Minivan
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.truck" type="checkbox" id="trans-city-truck" value="truck"> Truck
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.privatecarwithdriver" type="checkbox" id="trans-city-driver" value="car-driver"> Car with driver
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <!--div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.privatecarwithdriverandguide" type="checkbox" id="trans-city-guide" value="car-guide"> Private car with driver and guide
                                    </label>
                                </div-->
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="dmcresponse.products.included.transportbetweencities.other" type="checkbox" id="trans-city-other" value="other"> Other
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group" ng-show="dmcresponse.products.included.transportbetweencities.other">
                                    <label class="control-label sr-only" for="other-trans">Other Transportation</label>
                                    <input ng-model="dmcresponse.products.included.transportbetweencities.otherdescription" class="form-control" id="other-trans" type="text" value="" placeholder="please, add the other transportation name here...">
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
                                <label>
                                    <input ng-model="dmcresponse.products.included.taxesinthecountry" type="checkbox" id="country-taxes" value="country-taxes"> Taxes in the country
                                </label>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="checkbox">
                                <label>
                                    <input ng-model="dmcresponse.products.included.airporttaxes" type="checkbox" id="air-taxes" value="air-taxes"> Airport Taxes
                                </label>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="checkbox">
                                <label>
                                    <input ng-model="dmcresponse.products.included.tips" type="checkbox" id="tips" value="tips"> Tips
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input ng-model="dmcresponse.products.included.baggagehandlingfees" type="checkbox" id="baggage" value="baggage"> Baggage handling fees
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
                        <li><span>Preview</span></li>
                        <li><span>Additional Information</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>
            </footer>
        </form>
        <!-- ////////////////////// -->
        <!-- // 4 ITINERARY -->
        <!-- ////////////////////// -->
        <hr ng-show="StepFourVisible" class="hr" id="step4startpoint">
        <form class="itinerary-load step-load" ng-show="StepFourVisible">
            <p class="required-label">* required</p>
            <h2><span>4.</span> Itinerary (Day to Day)</h2>
            <div class="day" ng-repeat="itinerary in dmcresponse.products.itinerary" 
                 data-itinerary="{{itinerary.uuid}}">
                <div class="day-thumb" ng-show="!itinerary.lastday">
                    <span class="label label-day"><i class="fa fa-calendar-o"></i> {{itinerary.daynumber}} DAY</span>
                </div>
                <div class="day-thumb" ng-show="itinerary.lastday">
                    <span class="label label-day"><i class="fa fa-calendar-o"></i> Last DAY</span>
                </div>
                <div class="col-xs-9 col-md-10">
                    <div class="row">
                        <div class="col-xs-9">
                            <div ng-class="{'disabledbox' : !itinerary.lastday && itinerary.daynumber < dmcresponse.products.itinerary.length }"
                                 class="checkbox alert-danger form-inline padded-l mb-zero mt-zero">
                                <label class="check-inline">
                                    <input ng-disabled="checkdisabled(itinerary)" type="checkbox" value="stop" 
                                           ng-model="itinerary.lastday">
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
                    <h3>Destinations <b class="text-danger">*</b></h3>
                    <div class="form-inline form-group" ng-show="!itinerary.lastday">
                        <label class="sr-only" for="select-city">Select City</label>
                        <input type="text"
                            class="form-control select-city"
                            ng-model="itinerary.citytoadd.city"
                            placeholder="Select city"
                            id="select-city"
                            uib-typeahead="destination as destination.name for destination in destinations() | filter:$viewValue | limitTo:8"
                            typeahead-popup-template-url="/partials/shared/cities-popup-result-item.html?v={? appversion ?}"
                            typeahead-template-url="/partials/shared/cities-result-item.html?v={? appversion ?}" />
                        <button type="button" ng-click="addcitytoitinerary(itinerary, itinerary.citytoadd.city)" class="btn btn-default add-city notranslate">stop</button>
                        <button type="button"
                        ng-show="itinerary.sleepcity.city == ''" 
                        ng-click="addsleeptoitinerary(itinerary, itinerary.citytoadd.city)" 
                        class="btn btn-primary add-city">night</button>
                    </div>
            
                   <!--OLD GOOGLE PLACES <div class="form-inline form-group" ng-show="!itinerary.lastday">
                        <label class="sr-only" for="select-city">Select City</label>
                        <input type="text"
                               class="form-control select-city"
                               ng-model="itinerary.citytoadd.city"
                               placeholder="Select city" id="select-city"
                               ng-autocomplete="result1" details="details1"
                               options="options1">
                        <button type="button" ng-click="addcitytoitinerary(itinerary, details1)" class="btn btn-default add-city">stop</button>
                        <button type="button" ng-show="itinerary.sleepcity.city == ''" 
                                ng-click="addsleeptoitinerary(itinerary, details1)" 
                                class="btn btn-primary add-city">night</button>
                    </div> -->
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
                    <!-- TODO this showlastdayaddcity no work correctly <pre>showlastdayaddcity: {{showlastdayaddcity}}</pre>
                        ng-show="showlastdayaddcity" -->
                    <div class="form-inline">
                        <div class="form-group">
                            <label class="sr-only" for="select-city">Select City</label>
                            <input type="text"
                            class="form-control select-city"
                            placeholder="Select city"
                            ng-model="itinerary.citytoadd.city"
                            placeholder="Select city"
                            id="select-city"
                            uib-typeahead="destination as destination.name for destination in destinations() | filter:$viewValue | limitTo:8"
                            typeahead-popup-template-url="/partials/shared/cities-popup-result-item.html?v={? appversion ?}"
                            typeahead-template-url="/partials/shared/cities-result-item.html?v={? appversion ?}" />
                            <button ng-click="addcitytoitinerarylastday(itinerary, itinerary.citytoadd.city)"
                            type="button" class="btn btn-default add-city">
                                Stop
                            </button>
                        </div>
                        <!-- <div class="form-group">
                            <label class="sr-only" for="select-city">Select City</label>
                            <input type="text"
                                   class="form-control select-city"
                                   placeholder="Select city"
                                   ng-model="itinerary.citytoadd.city"
                                   placeholder="Select city"
                                   id="select-city"
                                   ng-autocomplete="result1" details="details1" options="options1">
                            <button ng-click="addcitytoitinerarylastday(itinerary, details1)"
                                    type="button" class="btn btn-default add-city">
                                add
                            </button>
                        </div>
                    <button type="button" ng-click="addlastdaystop()"
                            class="btn btn-default add-city">
                        add stop
                    </button> -->
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
                    <div class="row" ng-show="!dmcresponse.products.included.transportbetweencities.domesticflight">
                        <div class="col-md-12">
                            <div class="checkboxform-inline mb-zero mt-zero">
                                <label class="check-inline text-danger">
                                    <input ng-model="itinerary.needflights" type="checkbox" id="needflights" ng-change="loadflights(itinerary.needflights, itinerary)"> <strong>Route needs any domestic flight not included in your price?</strong>
                                </label>
                            </div>
                            <div ng-show="itinerary.needflights">
                                  <h3 class="mt-l">Please, indicates which ones must be booked by clients.</h3>
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
                                                    <input ng-model="flight.departure" class="form-control select-tag" id="departureairport" type="text" value="" placeholder="Search IATA code" uib-typeahead="item as item.label for item in getAirport($viewValue)" typeahead-loading="loadingAirport" typeahead-on-select="onSelectAirport($item, $model, $label, flight.departure)" required>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-md-pull-2">
                                                <div class="form-group">
                                                <label class="control-label" for="arrivalairport">Arrival Airport <b>*</b></label>
                                                    <input ng-model="flight.arrival" class="form-control select-tag" id="arrivalairport" type="text" value="" placeholder="Search IATA code" uib-typeahead="item as item.label for item in getAirport($viewValue)" typeahead-loading="loadingAirport" typeahead-on-select="onSelectAirport($item, $model, $label, flight.arrival)" required>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-md-pull-2">
                                                <div class="form-group">
                                                <label class="control-label" for="recomendedflight">Recomended flight </label>
                                                    <input ng-model="flight.recommendedflight" class="form-control" id="recomendedflight" type="text" value="" placeholder="ex: flight code..">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                  <!--<pre>{{itinerary.flights | json}}</pre> -->
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
                                        <input ng-model="itinerary.hotel.name" class="form-control" id="hotel-name" type="text" value="" placeholder="please, add the hotel name here...">
                                        <p class="help-block">If you don't have a hotel or name hotel yet, leave it blank.</p>
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
                                                <input ng-change="changehotelkind(itinerary)" ng-model="itinerary.hotel.locationkind" type="radio" value="hotelcity">In city
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-md-3">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" ng-change="changehotelkind(itinerary)" ng-model="itinerary.hotel.locationkind" value="hotelsurr"> Out city
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
                                        <input ng-model="itinerary.hotel.breakfast" type="checkbox" id="breakfast" value="breakfast"> Breakfast
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="itinerary.hotel.lunch" type="checkbox" id="lunch" value="lunch"> Lunch
                                    </label>
                                </div>
                                <div class="checkbox" ng-show="itinerary.hotel.lunch">
                                    <label>
                                        <input ng-model="itinerary.hotel.lunchdrinks" type="checkbox" id="lunch-drink" value="lunch-drink"> Drinks included
                                    </label>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <div class="checkbox">
                                    <label>
                                        <input ng-model="itinerary.hotel.dinner" type="checkbox" id="dinner" value="dinner"> Dinner
                                    </label>
                                </div>
                                <div class="checkbox" ng-show="itinerary.hotel.dinner">
                                    <label>
                                        <input ng-model="itinerary.hotel.dinnerdrinks" type="checkbox" id="dinner-drink" value="dinner-drink"> Drinks included
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
                                        <button ng-click="deleteactivity(itinerary, activity)" type="button" class="btn btn-danger pull-right"><i class="fa fa-trash-o"></i> delete</button>
                                    </div>
                                    <div class="col-md-10 col-md-pull-2">
                                        <div class="form-group" ng-show="dmcresponse.products.languages.english" ng-class="{true : 'has-error'} [90 < activity.title.length]">
                                            <label class="control-label" for="activ-name">Title of the Activity or Sightseeing (english) <b>*</b> </label> <a href="" ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" ng-click="translateactivity_es(activity)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                                            <input ng-model="activity.title" class="form-control" ng-maxlength="90" maxlength="90" id="activ-name" type="text" value="" placeholder="">
                                            <p class="help-block text-right small">Max 90 char: <strong>{{90 - activity.title.length}} left</strong></p>
                                        </div>
                                        <div class="form-group" ng-show="dmcresponse.products.languages.spanish" ng-class="{true : 'has-error'} [90 < activity.title_es.length]">
                                            <label class="control-label" for="activ-name">Title of the Activity or Sightseeing (spanish) <b>*</b> </label> <a href="" ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" ng-click="translateactivity(activity)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                                            <input ng-model="activity.title_es" ng-maxlength="90" maxlength="90" class="form-control" id="activ-name" type="text" value="" placeholder="">
                                            <p class="help-block text-right small">Max 90 char: <strong>{{90 - activity.title_es.length}} left</strong></p>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="activ-group-box">
                                            <label class="radio-inline">
                                                <input ng-change="activitykindchange(activity)" ng-model="activity.activitykind" type="radio" value="group"> Group
                                            </label>
                                            <label class="radio-inline">
                                                <input ng-change="activitykindchange(activity)" ng-model="activity.activitykind" type="radio" value="individual"> Private
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="activ-extras">

                                            <div class="checkbox">
                                                <label>
                                                    <input ng-model="activity.ticketsincluded" type="checkbox"> Tickets Included
                                                </label>
                                            </div>

                                            <div class="checkbox ml-xl">
                                                <label>
                                                    <input type="checkbox" ng-model="activity.localguide"> Local Guide
                                                </label>
                                            </div>

                                        </div>
                                        <div class="checkbox alert" ng-show="activity.localguide">
                                            <h5><strong>Local guide language</strong></h5>
                                            <label class="checkbox-inline">
                                                <input ng-model="activity.language.spanish" type="checkbox" id="lang-tour-esc-es" value="spanish"> Spanish
                                            </label>
                                            <label class="checkbox-inline">
                                                <input ng-model="activity.language.english" type="checkbox" id="lang-tour-esc-en" value="english"> English
                                            </label>
                                            <label class="checkbox-inline">
                                                <input ng-model="activity.language.french" type="checkbox" id="lang-tour-esc-fr" value="french"> French
                                            </label>
                                            <label class="checkbox-inline">
                                                <input ng-model="activity.language.german" type="checkbox" id="lang-tour-esc-ge" value="german"> German
                                            </label>
                                            <label class="checkbox-inline">
                                                <input ng-model="activity.language.italian" type="checkbox" id="lang-tour-esc-it" value="italian"> Italian
                                            </label>
                                            <label class="checkbox-inline">
                                                <input ng-model="activity.language.portuguese" type="checkbox" id="lang-tour-esc-it" value="portuguese"> Portuguese
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <button ng-click="addactivitytoitinerary(itinerary)" type="button" class="btn btn-alt">add activity or sightseeing</button>
                </div>
                <div class="col-xs-12 close-day mt-l" ng-show="itinerary.lastday == false">
                    <button type="button" ng-click="additineraryday(itinerary)" class="btn btn-primary btn-lg pull-right">Add Day</button>
                </div>
                <hr ng-show="itinerary.lastday == false">
            </div> <!-- close first day -->
            <div class="close-day" ng-show="dmcresponse.products.itinerary.length == 0">
                <button type="button" ng-click="additineraryday()" class="btn btn-primary btn-lg pull-right">Add Day</button>
            </div>
            <!-- important notes for traveler -->
            <br/>
            <br/>
            <div class="panel panel-default">
                <div class="panel-body bg-warning">
                    <div class="row">
                        <div class="col-md-12">
                        <legend class=""><strong>Important Notes For Travelers:</strong></legend>
                            <div class="form-group pb-xxl" ng-show="dmcresponse.products.languages.english">
                                <label for="important_txt_en" class="control-label">Important Information for travelers (english) </label>
                                <a ng-show="dmcresponse.products.languages.english &amp;&amp; dmcresponse.products.languages.spanish" href="" ng-click="translateimportantenotes_es(dmcresponse.products.important_txt_es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                                <textarea ng-model="dmcresponse.products.important_txt_en" class="form-control " rows="4" id="important_txt_en" placeholder="Please, add information that travelers should know (if visa is needed and you can provide it, which is the best airport to arrive, if domestic flights are not included, which ones should clients book by themselves, etc... )"></textarea>
                                <span class="help-block pull-right">(optional)</span>
                            </div>
                            <div class="form-group" ng-show="dmcresponse.products.languages.spanish">
                                <label for="important_txt_es" class="control-label">Important Information for travelers (spanish) </label>
                                <a ng-show="dmcresponse.products.languages.english &amp;&amp; dmcresponse.products.languages.spanish" href="" ng-click="translateimportantenotes(dmcresponse.products.important_txt_en)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                                <textarea ng-model="dmcresponse.products.important_txt_es" class="form-control " rows="4" id="important_txt_es" placeholder="Por favor, agrega información que debe conocer el viajero (visas, vuelos domésticos incluidos o no ...)"></textarea>
                                <span class="help-block pull-right">(optional)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                        <li><span>Preview</span></li>
                        <li><span>Additional Information</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>
            </footer>
        </form>


        <!-- ////////////////////// -->
        <!-- // 5 DESCRIPTIONS -->
        <!-- ////////////////////// -->
        <hr ng-show="StepFiveVisible" class="hr" id="step5startpoint">
        <form class="step-load" ng-show="StepFiveVisible">
            <p class="text-help pull-right">(Optional)</p>
            <h2><span>5.</span> Descriptions <small>(Optional)</small>
            <button class="btn btn-primary" ng-show="!editDescription" ng-click="showDescriptions()">Add</button>
            <button class="btn btn-primary" ng-show="editDescription" ng-click="showDescriptions()">Hide</button>
            </h2>
            <div ng-show="editDescription">
                <fieldset class="main-des-item">
                    <legend ng-show="showPreviewEn()">Program: <strong>{{dmcresponse.products.title}}</strong></legend>
                    <legend ng-show="showPreviewEs()">Program: <strong>{{dmcresponse.products.title_es}}</strong></legend>
                    <div class="form-group pb-xxl" ng-show="dmcresponse.products.languages.english">
                        <label for="main_description_en" class="control-label">Main description of the tour (english) </label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translatemaindescription_es(dmcresponse.products.description_es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                        <textarea ng-model="dmcresponse.products.description_en" class="form-control" rows="7" id="main_description_en" placeholder="Please, this box is only for a turistical brief descrition of this trip..."></textarea>
                        <span class="help-block pull-right">(Max 250 char)</span>
                    </div>
                    <div class="form-group" ng-show="dmcresponse.products.languages.spanish">
                        <label for="main_description_es" class="control-label">Main description of the tour (spanish) </label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translatemaindescription(dmcresponse.products.description_en)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                        <textarea ng-model="dmcresponse.products.description_es" class="form-control" rows="7" id="main_description_es" placeholder="Por favor, esta caja es solo para una breve descripción turística del viaje..."></textarea>
                        <span class="help-block pull-right">(Max 250 char)</span>
                    </div>
                    <label>Tour main image<b>*</b></label>
                    <div class="row" >
                        <div class="col-xs-4">
                            <div ng-show="mainimageprogress" ng-show="false" id="prev-main" class="mainwaitimage">
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
                                <img ng-src="{{getimage(dmcresponse.products.productimage.url, 'mainproductimage')}}" data-src2x="{{getimage(dmcresponse.products.productimage.url, 'mainproductimageretina')}}" class="img-responsive" alt="{{dmcresponse.products.title}}" title="{{dmcresponse.products.title}}" />
                                <label class="btn btn-primary btn-upload mt-xl" ng-show="!showmainimage">
                                        <i class="fa fa-cloud-upload"></i> 
                                        <span>upload image</span>
                                        <input type="file" ng-hideid="main-image-container" ng-waitingid="prev-main" class="uploadfilebutton btn btn-primary mt-xl" ng-file-select ng-model="dmcresponse.products.productimage" />
                                </label>
                                <label class="btn btn-primary btn-upload mt-xl" ng-show="showmainimage">
                                        <i class="fa fa-cloud-upload"></i> 
                                        <span>replace image</span>
                                        <input type="file" ng-hideid="main-image-container" ng-waitingid="prev-main" class="replacefilebutton btn btn-danger mt-xl" ng-file-select ng-model="dmcresponse.products.productimage" />
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
                <hr>
                <div>
                    <fieldset class="day-desc-item" ng-repeat="itinerary in dmcresponse.products.itinerary">
                        <div class="tit-day-desc">
                            <span class="label label-day"><i class="fa fa-calendar-o"></i> {{ itinerary.daynumber }} DAY</span>
                            <h3>{{ showCities(itinerary) }}</h3>
                        </div>
                        <div class="form-group pb-xxl" ng-show="dmcresponse.products.languages.english">
                            <label class="control-label" for="day{{itinerary.daynumber}}">Day {{itineraray.daynumber}} description (english)</label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translateitinerary_es(itinerary)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                            <textarea ng-model="itinerary.description_en" class="form-control" rows="7" placeholder="please, add the description for day {{itinerary.daynumber}}.."></textarea>
                        </div>
                        <div class="form-group" ng-show="dmcresponse.products.languages.spanish">
                            <label class="control-label" for="day{{itinerary.daynumber}}">Day {{itineraray.daynumber}} description (spanish)</label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translateitinerary(itinerary)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
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
                                    <img  ng-src="{{getimage(itinerary.image.url, 'itinerarydaythumb')}}" data-src2x="{{getimage(itinerary.image.url, 'itinerarydaythumbretina')}}" class="img-responsive" alt="{{dmcresponse.products.title}} itinerary" title="{{dmcresponse.products.title}} itinerary" />
                                   

                                <label ng-show="!showmainimage" class="btn btn-danger btn-upload mt-xl" ng-show="!showmainimage">
                                        <i class="fa fa-cloud-upload"></i> 
                                        <span>upload image</span>
                                        <input type="file" ng-hideid="{{buildid('img',itinerary.uuid)}}" ng-waitingid="{{buildid('prev',itinerary.uuid)}}" ng-file-select ng-model="itinerary.image" />
                                </label>
                                <label class="btn btn-danger btn-upload mt-xl" ng-show="showmainimage">
                                        <i class="fa fa-cloud-upload"></i> 
                                        <span>replace image</span>
                                        <input type="file" ng-hideid="{{buildid('img',itinerary.uuid)}}" ng-waitingid="{{buildid('prev',itinerary.uuid)}}" ng-file-select ng-model="itinerary.image" />
                                </label>                                
                                </div>
                            </div>
                            <div class="col-xs-8">

                            </div>
                        </div>
                        <hr ng-show="!itinerary.lastday">
                    </fieldset>
                    
                </div>
                <input type="file" id="upfile" ng-model="fileup" style="display:none;" /> <!-- onchange="angular.element(this).scope().triggerupload(this)"-->
                <footer ng-show="StepFiveVisibleButtons">
                    <button ng-click="StepFiveCommit()" id="step5button"
                            type="button" class="btn btn-success btn-lg pull-right">
                        ok, next step
                    </button>
                    <div class="steps">
                        <h6>step 5 of 8</h6>
                        <ol>
                            <li class="active"><span>Languages</span></li>
                            <li class="active"><span>Tour main info</span></li>
                            <li class="active"><span>Operation dates, availability and rates</span></li>
                            <li class="active"><span>Included / Not included</span></li>
                            <li class="active"><span>Itinerary (Day to Day)</span></li>
                            <li class="active"><span>Descriptions</span></li>
                            <li><span>Preview</span></li>
                            <li><span>Additional Information</span></li>
                            <li><span>Save this program</span></li>
                        </ol>
                    </div>
                </footer>
            </div>
        </form>

        <!-- ////////////////////// -->
        <!-- // 6 preview -->
        <!-- ////////////////////// -->
        <div ng-show="StepSevenVisible" class="step-load">
            
            <h2><span>6.</span> Preview
                <button class="btn btn-primary" ng-show="(!StepFiveVisible && quoteFilled() && (dmcresponse.status == 'new' || dmcresponse.status == 'draft')) || isAdmin" ng-click="editQuote()">Edit</button>
            </h2>

            <div ng-include="'partials/dmc/tailormade/tailormade-productpreview.html.swig'"></div>

<!-- TODO one only Angular product preview <div ng-controller="productPreviewCtrl" ng-include="'partials/dmc/productpreview.html.swig'"></div> -->

          
            <footer ng-show="StepSevenVisibleButtons">
                <button ng-click="StepSevenCommit()" type="button" id="step7button"
                        class="btn btn-success btn-lg pull-right">
                    ok, next step
                </button>
                <div class="steps">
                    <h6>step 6 of 8</h6>
                    <ol>
                        <li class="active"><span>Languages</span></li>
                        <li class="active"><span>Tour main info</span></li>
                        <li class="active"><span>Operation dates, availability and rates</span></li>
                        <li class="active"><span>Included / Not included</span></li>
                        <li class="active"><span>Itinerary (Day to Day)</span></li>
                        <li class="active"><span>Descriptions</span></li>                                    
                        <li class="active"><span>Preview</span></li>
                        <li><span>Additional Information</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>
            </footer>
        </div>
        <!-- ////////////////////////// -->
        <!-- // 7 Additional information-->
        <!-- ////////////////////////// -->
        <hr ng-show="StepNineVisible" class="hr" id="step9startpoint">
        <form ng-show="StepNineVisible" class="step-load">
            <h2><span>7.</span> Additional Information  </h2>

            <p class="required-label">* required</p>                       
            <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcresponse.products.languages.english">
                <label class="control-label" for="cancelpolicy">Cancel Policy (english)<b>*</b></label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translatecancelpolicy_es(dmcresponse.responseDetails.cancelpolicy._es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                <textarea ng-model="dmcresponse.responseDetails.cancelpolicy._en" class="form-control" rows="7" id="cancelpolicy" type="text" value="" ></textarea>
            </div>
            <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcresponse.products.languages.spanish">
                <label class="control-label" for="cancelpolicy">Cancel Policy (spanish)<b>*</b></label> <a ng-show="dmcresponse.products.languages.english && dmcresponse.products.languages.spanish" href="" ng-click="translatecancelpolicy(dmcresponse.responseDetails.cancelpolicy._en)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                <textarea ng-model="dmcresponse.responseDetails.cancelpolicy._es" class="form-control" rows="7" id="cancelpolicy" type="text" value=""></textarea>
            </div>
            <footer ng-show="StepNineVisibleButtons">
                <button ng-click="StepNineCommit()" type="button" id="step9button"
                        class="btn btn-success btn-lg pull-right">
                    ok, next step
                </button>
                <div class="steps">
                    <h6>step 7 of 8</h6>
                    <ol>
                        <li class="active"><span>Languages</span></li>
                        <li class="active"><span>Tour main info</span></li>
                        <li class="active"><span>Operation dates, availability and rates</span></li>
                        <li class="active"><span>Included / Not included</span></li>
                        <li class="active"><span>Itinerary (Day to Day)</span></li>
                        <li class="active"><span>Descriptions</span></li>                                    
                        <li class="active"><span>Preview</span></li>
                        <li class="active"><span>Additional Information</span></li>
                        <li><span>Save this program</span></li>
                    </ol>
                </div>
            </footer>
        </form>
        <!-- ////////////////////// -->
        <!-- // 8 SAVE THIS TOUR -->
        <!-- ////////////////////// -->
        <hr ng-show="StepEightVisible" class="hr" id="step8startpoint">
        <form ng-show="StepEightVisible" class="step-load">
            <p class="required-label">* required</p>
            <h2><span>8.</span> Save this quote</h2>
            <div class="row">
                <div class="form-group col-md-7">
                    <label class="control-label" for="save-as">Save quote as <b>*</b></label>
                    <input ng-model="dmcresponse.products.name" class="form-control" id="save-as" type="text" value="" placeholder="">
                </div>
            </div>
          
            <footer ng-show="StepEightVisibleButtons && !isAdmin">
                <button type="button" ng-click="StepEightSendAndPublish()" id="step8publishbutton" class="btn btn-success btn-lg pull-right">send</button>                  
                <button type="button" 
                ng-click="StepEightCommitDraft()"
                id="step8draftbutton"
                ng-hide="dmcresponse.status != 'new' && dmcresponse.status != 'draft'"
                class="btn btn-alt btn-lg pull-right padleft">draft</button>
                <!--<button  type="button" class="btn btn-success btn-lg pull-right">save</button>-->
                <div class="steps">
                    <h6>step 8 of 8</h6>
                    <ol>
                        <li class="active"><span>Languages</span></li>
                        <li class="active"><span>Tour main info</span></li>
                        <li class="active"><span>Operation dates, availability and rates</span></li>
                        <li class="active"><span>Included / Not included</span></li>
                        <li class="active"><span>Itinerary (Day to Day)</span></li>
                        <li class="active"><span>Descriptions</span></li>                                   
                        <li class="active"><span>Preview</span></li>
                        <li class="active"><span>Additional Information</span></li>
                        <li class="active"><span>Save this program</span></li>
                    </ol>
                </div>
            </footer>
        </form>
    </div>
</section>