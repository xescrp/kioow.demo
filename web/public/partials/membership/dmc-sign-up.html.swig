<div class="container" ng-controller="DMCSignInCtrl">
<div class="row">
    <div class="col-md-10">
        <ul class="breadcrumb mt-xl" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
             {% for bread in bc %}
              {% if bread.url != "" %}
              <li><a target="_self" itemprop="url" href="{? bread.url ?}"><span itemprop="title">{? bread.label ?}</span></a></li>
              {% else %}
              <li class="active"><span itemprop="title">{? bread.label ?}</span></li>   
              {% endif %}
            {% endfor %}
        </ul>
        <div class="page-header">
            <h1>Register as a supplier of openmarket.travel</h1>
            <p>Want to commercialize your product around the World? Registrate and submit your Company's info.<br /> 
            <strong>Once approved, our Product Department will send you the ID to operate.
                </strong><br /> 
                <a target="_self" href="/faq/13-do-you-have-more-than-one-operation-office">Have you more than one operation office?</a>
            </p>
        </div>
    </div>
    <div class="col-md-2 text-right">
        <a target="_self" href="/suppliers-signup/es" class="btn btn-link btn-xs mt-xxl">Versión en Castellano</a>
    </div>
</div>

<!-- Example row of columns -->


<section class="panel panel-default">
    <div class="panel-body">
        <!-- ////////////////////// -->
        <!-- // 1 Company info -->
        <!-- ////////////////////// -->
        <form name="signupform" novalidate ng-init="setFormScope(this)">
            <div class="step-load">
                <p class="required-label">* required</p>
                <h2><span>1.</span> Company</h2>
                <article class="row">
                    <div class="col-md-8">
                        <div class="form-group" ng-class="{ 'has-error': signupform.companyname.$invalid }">
                            <label class="control-label" for="companyname"><i class="fa fa-exclamation-circle text-brand-danger"></i>  Name of your organization <b>*</b></label>
                            <input class="form-control" name="companyname" id="companyname" type="text" value="" placeholder="ex: openmarket.travel..." ng-model="dmc.company.name" tabindex="1" required />
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': signupform.legalname.$invalid}">
                            <label class="control-label" for="legalname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Legal Company Name <b>*</b></label>
                            <input class="form-control" name="legalname" id="legalname" type="text" value="" placeholder="ex: Open Market Travel SL..." ng-model="dmc.company.legalname" tabindex="3" required />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" ng-class="{ 'has-error': signupform.yearest.$invalid}">
                            <label class="control-label" for="yearest"><i class="fa fa-exclamation-circle text-brand-danger"></i> Year of establishment <b>*</b></label>
                            <input class="form-control" id="yearest" name="yearest" type="text" value="" ng-minlength="4" ng-maxlength="4" placeholder="ex: 1985..." ng-model="dmc.company.constitutionyear" tabindex="2" required />
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': signupform.phone.$invalid}">
                            <label class="control-label" for="phone"><i class="fa fa-exclamation-circle text-brand-danger"></i> Phone <b>*</b></label>
                            <input class="form-control" id="phone" name="phone" type="text" value="" ng-model="dmc.company.phone" placeholder="ex: +34 555 555 555" ng-minlength="7" tabindex="4" required />
                        </div>
                    </div>
                </article>

                <article class="row">
                    <div class="form-group col-md-8 no-bottom">
                        <label class="control-label" for="website">Website</label>
                        <input class="form-control" id="website" name="website" 
                               type="text" value="" ng-model="dmc.company.website" 
                               placeholder="ex: http://www.openmarket.travel" tabindex="6" />
                        <span class="help-block text-right no-bottom">(optional)</span>
                    </div>
                </article>
                <article class="row">
                    <div class="col-sm-8">
                        <h3>Address</h3>
                        <div class="form-group">
                            <label class="control-label" for="searchaddress">Search Address</label>

                            <!--<pre>{{rawlocation | json}}</pre>-->

                            <div class="input-group input-date">
                              <label class="sr-only" for="llegada">Select Address</label>
                              <input type="text" class="form-control select-city"
                                   ng-model="companyaddress" placeholder="Write your address"
                                   name="searchaddress" id="searchaddress"
                                   ng-autocomplete="autocomplete2.result" details="autocomplete2.details"
                                   options="autocomplete2.options" ng-blur="setCompanyAddress()" tabindex="7" />
                              <span class="input-group-btn">
                                <button class="btn btn-alt" ng-click="setCompanyAddress()"> select </button>
                              </span>
                            </div>

                            <p class="help-block">Geolocate will be useful for the client's search.</p>
                        </div>
                        <div class="address-box">
                            <div class="form-group col-xs-12" ng-class="{ 'has-error': signupform.fulladdress.$invalid}">
                                <label class="control-label" for="address-street"><i class="fa fa-exclamation-circle text-brand-danger"></i> Street Address <b>*</b></label>
                                <input class="form-control" name="fulladdress" id="fulladdress" type="text" value="" placeholder="Street Address" ng-model="dmc.company.location.fulladdress" tabindex="8" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresscity.$invalid}">
                                <label class="control-label" for="addresscity"><i class="fa fa-exclamation-circle text-brand-danger"></i> City / Town <b>*</b></label>
                                <input class="form-control" id="addresscity" name="addresscity" type="text" value="" placeholder="City / Town" ng-model="dmc.company.location.city" tabindex="9" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addressstate.$invalid}">
                                <label class="control-label" for="addressstate"><i class="fa fa-exclamation-circle text-brand-danger"></i> State <b>*</b></label>
                                <input class="form-control" id="addressstate" name="addressstate" type="text" value="" ng-model="dmc.company.location.stateorprovince" tabindex="10" placeholder="State" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresspc.$invalid}">
                                <label class="control-label" for="addresspc"><i class="fa fa-exclamation-circle text-brand-danger"></i> Zip / Postalcode <b>*</b></label>
                                <input class="form-control" id="addresspc" name="addresspc" type="text" value="" placeholder="Zip / Postcode" ng-model="dmc.company.location.cp" tabindex="10" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresscountry.$invalid}">
                                <label class="control-label" for="addresscountry"><i class="fa fa-exclamation-circle text-brand-danger"></i> Country <b>*</b></label>
                                <input class="form-control select-input" id="addresscountry" name="addresscountry" type="text" value="" tabindex="11" placeholder="Country" ng-model="dmc.company.location.country"
                                    ng-autocomplete="autocompletecountry.result" details="autocompletecountry.details"
                                    options="autocompletecountry.options" ng-blur="setCountryAddress()"
                                 required />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 hidden">
                        <div id="map-address-dmc"><pre>{{dmc.company.location | json }}</pre></div>
                    </div>
                </article>
                <hr />
                <h3>Company Status</h3>
                <div ng-class="{ 'has-error': signupform.businesslicense.$invalid}">
                    <div class="checkbox">
                        <label><input type="checkbox" name="businesslicense" ng-model="dmc.additionalinfo.businesslicense" tabindex="12" required /><i class="fa fa-exclamation-circle text-brand-danger" ng-show="signupform.businesslicense.$invalid"></i> I confirm to be in possession of the title / license that allows me to operate as a DMC.<b>*</b></label>
                    </div>
                </div>
                <div ng-class="{ 'has-error': signupform.notpunished.$invalid}">
                    <div class="checkbox">
                        <label><input type="checkbox" name="notpunished" ng-model="dmc.additionalinfo.notpunished" tabindex="13" required /><i class="fa fa-exclamation-circle text-brand-danger" ng-show="signupform.notpunished.$invalid"></i> I affirm not having been punished for offenses dealing with breaching the laws of my country business activity.<b>*</b></label>
                    </div>
                </div>
                <div ng-class="{ 'has-error': signupform.paymenttaxes.$invalid}">
                    <div class="checkbox">
                        <label><input type="checkbox" name="paymenttaxes" ng-model="dmc.additionalinfo.paymenttaxes" tabindex="14" required /><i class="fa fa-exclamation-circle text-brand-danger" ng-show="signupform.paymenttaxes.$invalid"></i> I confirm that my company has currently paid the business taxes in my country.<b>*</b></label>
                    </div>
                </div>

                <hr />
                <p class="required-label">* required</p>
                <h2><span>2.</span> Additional Company Information</h2>
                <article>
                    <div class="form-group" ng-class="{ 'has-error': signupform.companydescription.$invalid}">
                        <label class="control-label"><i class="fa fa-exclamation-circle text-brand-danger"></i> Description of the Company's profile &amp; business activity <b>*</b></label>
                        <textarea class="form-control" rows="7" tabindex="15" name="companydescription" ng-model="dmc.additionalinfo.description" required></textarea>
                        <p class="help-block text-right" ng-class="{ 'text-brand-danger' : (600 < dmc.additionalinfo.description.length) }">Max 600 char: <strong>{{600 - dmc.additionalinfo.description.length}} left</strong></p>
                    </div>
                </article>
                <hr />
                <article ng-form="operartioncountryfrom">
                    <h3 ng-class="{'has-error' : !dmc.company.operatein.length}">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Operation Countries <b class=" text-brand-danger">*</b> <small> (where you operate services, not where you sell)</small>
                    </h3>
                    <label class="control-label"><i class="fa fa-exclamation-circle text-brand-danger"></i> In which countries the company operates? <b>*</b></label>
                    <p ng-show="!dmc.company.operatein.length" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Please select one country and zone at least.</p>
                    <ul class="tag-admin" ng-cloak>
                        <li ng-repeat="operateIn in dmc.company.operatein"><a class="label label-default" href="" ng-click="removeDestination($index)">{{operateIn.operateLocation.country}}<span ng-show="operateIn.zone">, {{operateIn.zone}}</span><i class="fa fa-times-circle"></i></a></li>
                    </ul>

                    <form name="adddestinationform">
                        <div class="row">
                            <div class="form-group col-sm-5">
                                <label class="sr-only" for="newdestination">Select country</label>
                                <input type="text" name="newdestination" class="form-control select-city" 
                                       ng-model="localdestination.newdestination" placeholder="Search country" 
                                       id="select-city" ng-autocomplete="autocomplete.result" 
                                       details="autocomplete.details" options="autocomplete.options" 
                                       tabindex="16" />
                                
                            </div>

                            <div class="form-group col-sm-3">
                                <label class="control-label sr-only" for="newzone">Zone</label>
                                <input class="form-control" ng-model="localdestination.newzone" name="newzone" maxlength="40" type="text" value="" tooltip-animation="false" placeholder="Zone" tooltip-placement="top" tooltip="ex: Tuscan, East coast, etc." tabindex="17" />
                            </div>
                            <div class="col-sm-4">
                                <button type="button" ng-click="addDestination()" class="btn btn-alt"><i class="fa fa-check"></i> OK</button>
                            </div>
                        </div>
                        <p>
                        <i class="fa fa-info-circle"></i> If you operate in an special area or cities of a country, please select country in the first field and delimitate areas/cities at the set zone. Ex: EEUU/East Coast.
                        </p>
                            <a class="mt-xl" href="/faq/13-do-you-have-more-than-one-operation-office" target="_blank">have you more than one operation office?</a>
                        

                    </form>
                </article>
                <hr />
                <article>
                    <h3 ng-class="{'has-error' : !dmc.tags.length}">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Activities / Tags <b class=" text-brand-danger">*</b>
                    </h3>

                    <label class="control-label">Are you specialist in any kind of product?</label>
                    <p ng-show="!dmc.tags.length" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Please select an activity. You may use as many tags as you need.</p>
                    <ul class="tag-admin">
                        <li ng-repeat="tag in dmc.tags">
                            <a class="label label-info" data-ng-click="removeTag($index)" href="">
                                {{tag.label_en}} <i class="fa fa-times-circle"></i>
                            </a>
                        </li>

                    </ul>

                    <div class="alert activities-box" ng-form="activitiesform">
                        <div class="row">
                            <h4 class="col-xs-3">Activities</h4>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-4 col-xs-6" ng-repeat="tag in tripTags track by $index">
                                <div class="checkbox"><label><input name="{{tag.value}}" type="checkbox" checklist-model="dmc.tags" checklist-value="tag" />{{tag.label_en}}</label></div>
                            </div>
                        </div>
                    </div>

                </article>
                <article>
                    <h3>Associations (optional)</h3>
                    <label>Do you belong to any Touristic or Sustainable Association?</label>
                    <div class="alert" ng-repeat="association in dmc.additionalinfo.associations" ng-form="assocForm" novalidate on-last-repeat>

                        <div class="row">

                            <div class="col-sm-11 form-group">
                                <label class="control-label" for="associations"><i class="fa fa-exclamation-circle text-brand-danger"></i> Association Name </label>
                                <input class="form-control" ng-model="association.name" type="text" value="" placeholder="please, add the association name." name="association" tabindex="{{20+$index}}" />
                            </div>
                            <div class="col-sm-1">
                            <p class="text-right">
                                <a href="" class="pull-right text-danger" ng-click="deleteAssociation($index)"><i class="fa fa-trash-o fa-lg"></i></a>
                            </p>
                            </div>
                        </div>

                    </div>
                    <a class="action" href="" ng-click="addAssociation()"><i class="fa fa-plus"></i> Add another associations</a>
                </article>
                <hr />
                <article>
                    <h3>Recommender (optional)</h3>

                    <div class="alert" ng-repeat="recomender in dmc.additionalinfo.recomenders" ng-form="recomenderForm" novalidate>
                        <div class="row">
                            <div class="form-group col-sm-4">
                                <label class="control-label" for="recomenderName">Name </label>
                                <input class="form-control" name="recomenderName" ng-model="recomender.name" type="text" placeholder="ex: google local business" tabindex="{{30+(1*$index)}}" />
                            </div>
                            <div class="form-group col-sm-7">
                                <label class="control-label" for="recomenderUrl">URL </label>
                                <input class="form-control" name="recomenderUrl" ng-model="recomender.url" type="url" placeholder="ex: http://www.tripadvisor.es/Attraction_Review-g312848-d5317192" tabindex="{{30+(1*$index)+1}}" />
                            </div>
                            <div class="col-sm-1">
                            <p class="text-right">
                                <a class="text-danger" ng-click="deleteRecommender($index)"><i class="fa fa-trash-o fa-lg"></i></a>
                            </p>
                            </div>
                        </div>
                    </div>
                    <p><a class="action" ng-click="addRecomender()" href=""><i class="fa fa-plus"></i> Add another recommender</a></p>
                </article>
                <hr />
                <p class="required-label">* required</p>
                <h2><span>3.</span> Contact Details</h2>

                <article class="row">
                    <div class="form-group col-md-2">
                        <label class="control-label" for="admintit">Title</label>
                        <select class="form-control" id="admintit" name="admintit" ng-model="dmc.contact.title" tabindex="40">
                            <option>Ms.</option>
                            <option>Mr.</option>
                        </select>
                    </div>
                    <div class="form-group col-md-5" ng-class="{ 'has-error': signupform.adminfname.$invalid}">
                        <label class="control-label" for="adminfname"><i class="fa fa-exclamation-circle text-brand-danger"></i> First Name <b>*</b></label>
                        <input class="form-control" type="text" id="adminfname" name="adminfname" ng-model="dmc.contact.firstname" tabindex="41" required />
                    </div>
                    <div class="form-group col-md-5" ng-class="{ 'has-error': signupform.adminlname.$invalid}">
                        <label class="control-label" for="adminlname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Last Name <b>*</b></label>
                        <input class="form-control" type="text" id="adminlname" name="adminlname" ng-model="dmc.contact.lastname" tabindex="42" required />
                    </div>
                    <div class="form-group col-md-7" ng-class="{ 'has-error': signupform.adminpos.$invalid}">
                        <label class="control-label" for="adminpos"><i class="fa fa-exclamation-circle text-brand-danger"></i> Position <b>*</b></label>
                        <input class="form-control" type="text" id="adminpos" name="adminpos" ng-model="dmc.contact.position" tabindex="43" required />
                    </div>
                </article>
                <hr />
                <p class="required-label">* required</p>
                <h2><span>4.</span> Administrator Login</h2>
                <article>
                    <div class="row">
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminemail.$invalid}">
                            <label class="control-label" for="adminemail"><i class="fa fa-exclamation-circle text-brand-danger"></i> Email <b>*</b></label>
                            <input class="form-control" type="email" id="adminemail" name="adminemail" placeholder="email@mail.com" ng-model="dmc.contact.email" tabindex="44" required />
                        </div>
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpass.$invalid}">
                            <label class="control-label" for="adminpass"><i class="fa fa-exclamation-circle text-brand-danger"></i> Password <b>*</b></label>
                            <input class="form-control" type="password" id="adminpass" name="adminpass" ng-model="theuser.password" tabindex="45" required />
                        </div>
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpass2.$invalid}">
                            <label class="control-label" for="adminpass2"><i class="fa fa-exclamation-circle text-brand-danger"></i> Repeat Password <b>*</b> <span ng-show="signupform.adminpass2.$error.match">fields do not match!</span></label>
                            <input class="form-control" type="password" id="adminpass2" name="adminpass2" tabindex="46" ng-model="theuser.passwordConfirm" match="theuser.password" required />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label" for="adminskype">Skype Id</label>
                            <input class="form-control" type="text" id="adminskype" name="adminskype" ng-model="dmc.contact.skype" tabindex="47" />
                            <p class="help-block text-right">(optional)</p>
                        </div>
                    </div>
                </article>
                <hr />
                <p class="required-label">* required</p>
                <h2><span>5.</span> Comission</h2>
                <article>
                    <div class="row">
                        <div class="form-group col-sm-3" ng-class="{ 'has-error': signupform.commission.$invalid}">

                            <label class="control-label" for="commission"><i class="fa fa-exclamation-circle text-brand-danger"></i> Openmarket commission<b>*</b></label>
                            <div class="input-group">
                              <input class="form-control" type="text" id="commission" name="commission" placeholder="00" ng-model="dmc.membership.commission" tabindex="48" required />
                              <span class="input-group-addon" style="border-left: 1px solid">%</span>
                            </div>
                            
                        </div>
                        <div class="col-sm-9">
                            <p class="well">The commission your have marked, is awaiting to be approved by our team. Once we validate it, this will be the percentage to be deducted from your price, when we send you the payments.</p>
                        </div>
                    </div>
                </article>
                <hr />
                <p class="required-label">* required</p>
                <h2><span>6.</span> Sales Channel</h2>
                <article>
                    <label>Select sales channels where you want to offer your products <b>*</b></label>
                    <div class="row">

                        <div class="form-group col-sm-4" ng-class="{ 'has-error': invalidchannels}">
                            <div class="checkbox">
                                <label><input tabindex="49" type="checkbox" name="b2cchannel" id="b2cchannel" ng-model="dmc.membership.b2cchannel" ng-change="chekchannel()" /> B2C - Business-to-Consumer</label>
                            </div>
                            <div class="checkbox">
                                <label><input tabindex="50" type="checkbox" name="b2bchannel" id="b2bchannel" ng-model="dmc.membership.b2bchannel" ng-change="chekchannel()" /> B2B - Business-to-business</label>
                            </div>
                        </div>
                    </div>

                    <p ng-show="invalidchannels" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Please select one channel sale at least</p>
                </article>
                <hr />
                <p class="required-label">* required</p>
                <h2><span>7.</span> Type segment to which you are engaged</h2>
                <article>
                    <label>Please select which kind of product do you manage <b>*</b></label>
                    <div class="row">

                        <div class="col-sm-4" ng-class="{ 'has-error': invalidproducts}">
                            <div class="checkbox">
                                <label><input tabindex="51" type="checkbox" name="toursmultidays" id="toursmultidays" ng-model="dmc.membership.toursmultidays" ng-change="chekproduct()" /> Regular Tours Multidays</label>
                            </div>
                            <div class="checkbox">
                                <label><input tabindex="52" type="checkbox" name="tailormade" id="tailormade" ng-model="dmc.membership.tailormade" ng-change="chekproduct()" /> Tailor made</label>
                            </div>
                             <div class="checkbox">
                                <label><input tabindex="53" type="checkbox" name="groups" id="groups" ng-model="dmc.membership.groups" ng-change="chekproduct()" /> Groups</label>
                            </div>

                        </div>

                    </div>

                    <p ng-show="invalidproducts" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Please select one kind of product at least</p>
                </article>
                <hr />
                <h2><span>8.</span> Collaboration Agreement</h2>
                <article>
                    <div class="form-group no-bottom" ng-class="{'has-error': signupform.termsuse.$invalid}">
                        <div class="checkbox">
                            <label>
                                <input tabindex="54" type="checkbox" name="termsuse" id="termsuse"
                                       ng-model="dmc.membership.acceptterms" required />
                                        <i class="fa fa-exclamation-circle text-brand-danger" 
                                           ng-show="signupform.termsuse.$invalid">
                                </i> I have read and would be willing to accept the conditions of the <a ng-class="{'alert-link': signupform.termsuse.$invalid}" href="/page/supply-final-agreement" target="_blank">Supply Contract of Services and Content</a>. <b>*</b>
                            </label>
                        </div>
                    </div>
                </article>
                <hr />
                <footer class="row">
                    <div class="col-sm-10">
                        <p class="alert text-right text-brand-danger"
                           ng-hide="signupform.$valid">The fields with * are required</p>
                    </div>
                    <div class="col-sm-2">
                        <p class=" text-right">
                            <button type="button" ng-click="feedbackError()"
                                    ng-show="!checkform(signupform.$valid)" class="btn btn-success btn-lg"
                                    tabindex="55">
                                submit
                            </button>
                            <button type="button" ng-click="dmcSigninSubmit()"
                                    ng-show="checkform(signupform.$valid)" class=" btn btn-success btn-lg"
                                    tabindex="55">
                                submit
                            </button>
                        </p>
                    </div>
                </footer>
            </div>
        </form>
    </div>

</section>

</div> 