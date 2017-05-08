<div class="container" ng-controller="AccountCtrl">
  <div class="row" ng-show="!dmc.membership.registervalid && !adminRevision">
    <div class="col-md-12">
      <div class="wellcome-dmc">
        <h1>
          <i class="fa fa-meh-o"></i> We are sorry
        </h1>
        <div class="alert-intro">
          <h2 class="lh15">Your registration is still under review</h2>
          <h5>
            If you have any questions you can contact <a href="mailto:dmc@openmarket.travel">dmc@openmarket.travel</a>
          </h5>

        </div>
      </div>
    </div>
  </div>
  <!-- INIT CONTROL OMT -->

  <div class="row" ng-show="adminRevision">
    <div class="col-md-12 alert alert-info">
      <legend class="text-alternate">Campos de control Administrador</legend>
      <div class="row">
      <fieldset class="col-md-5">
        <label class="control-label" for="namevoucher">Nombre DMC para bonos</label>
        <input class="form-control" type="text" id="namevoucher" ng-model="dmc.vouchername" name="namevoucher" />
      </fieldset>
        <fieldset class="col-md-12">
          <label class="control-label mt-l" for="vouchernotes">Notas para bonos</label>
          <textarea class="form-control" type="text" id="namevoucher" ng-model="dmc.vouchernotes" name="namevoucher" ></textarea>
        </fieldset>
      <fieldset class="col-md-12">
        <label class="control-label mt-l" for="comments">Comentarios</label>
        <textarea class="form-control" name="comments" id="comments" ng-model="omtcomment"></textarea>
        <div class="mt-xl">
          <label class="checkbox-inline">
            <input ng-model="registervalid" type="checkbox" id="registervalid" /> Usuario Válido 
          </label>
          <label class="checkbox-inline">
            <input ng-model="autopublish" type="checkbox" id="autopublish" /> Puede publicar producto automaticamente</label>
          <label class="checkbox-inline">
            <input ng-model="dmc.membership.pvp.keep" type="checkbox" id="autopublish" /> Mantener paridad de precios</label>
          <button class="btn btn-primary ml-xl pull-right" ng-click="updateStatusDMCOMT()">guardar</button>
        </div>
      </fieldset>
    </div>
    </div>
  </div>

  <!-- END CONTROL OMT -->


  <div ng-show="dmc.membership.registervalid || adminRevision">
    <div class="row">
      <div class="col-md-12">

        <ul class="breadcrumb">
          <li>
            <a href="/" target="_self">Home</a>
          </li>
          <li>
            <a href="/edit/account?code={{dmc.code}}&usertype=dmc" target="_self" class="notranslate">{{dmc.company.name}}</a>
          </li>
          <li class="active">Account Settings</li>
        </ul>


        <div class="wellcome-dmc" ng-show="wellcomeWindow">
          <h1>
            <i class="fa fa-smile-o"></i> Welcome to openmarket.travel<br/>
              <small>
                Your registration has been successfully approved.<br />
                <strong class="text-danger">Your ID: {{dmc.code}}</strong>
              </small>
            </h1>

          <div class="alert-intro">
            <h2 class="lh15">
              To complete the process you must fill in other fields, some of them are mandatory. 
              <br/>Otherwise your ID will not be valid to operate.
                    </h2>
            <div ng-show="!dmc.membership.companyimagescomplete || !dmc.membership.emergencycomplete || !dmc.membership.companytaxid">
              <h3>Public Profile</h3>
              <ul class="list-unstyled">
                <li ng-show="!dmc.membership.companyimagescomplete">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" class="alert-link" ng-click="gotoTabAndId('MainInfo','companyimages')">Company logo, picture and description</a>
                  <p>
                    Please upload your company logo and a picture that represents your company <strong>(an idea: take a selfie of you or you with your team)</strong>.  Please also add a detailed company description to complete your public profile.
                  </p>
                </li>
                <li ng-show="!dmc.membership.companytaxid">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" ng-click="gotoTabAndId('Contact','contactdetail')" class="alert-link">Company tax id</a>
                  <p>Please set your company tax id to receive payments.</p>
                </li>
                <li ng-show="!dmc.membership.emergencycomplete">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" ng-click="gotoTabAndId('Contact','emergecyphonenumber')" class="alert-link">Emergency Phone (24/365) </a>
                  <p>Please set your emergency phone number.</p>
                </li>
              </ul>
            </div>
            <div ng-show="!dmc.membership.paymentcomplete || !dmc.membership.averagecomplete || !dmc.membership.companycomplete || !dmc.membership.confirmterms">
              <h3>Private Profile</h3>
              <ul class="list-unstyled">
                <li ng-show="!dmc.membership.paymentcomplete">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" ng-click="gotoTabAndId('Payment','paymentdetails')" class="alert-link">Payment details and currency</a>
                  <p>Please set your payment details and currency to receive payments from openmarket.travel.</p>
                </li>
                {# <li ng-show="!dmc.membership.averagecomplete">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" ng-click="gotoTabAndId('Expenditure','dailyexpenditure')" class="alert-link">Average daily expenditure (optional)</a>
                  <p>Please set your payment details to receive payments from openmarket.travel.</p>
                </li> #}
                <li ng-show="!dmc.membership.companycomplete">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" ng-click="gotoTabAndId('Collabagree','insuranceandregistration')" class="alert-link">Insurance policy and company registration</a>
                  <p>Please upload your insurance policy and your company registration.</p>
                </li>
                <li ng-show="!dmc.membership.confirmterms">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="" ng-click="gotoTabAndId('Collabagree','collaborationagreement')" class="alert-link">Collaboration Agreement</a>
                  <p>Please confirm cancelation policy, payment conditions and openmarket.travel comission.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="account-dmc-tit">
          <figure class="">
            <img class="img-dmc-big" ng-src="{{getimage(dmc.images.logo.url, 'avatar100')}}" />
              <figcaption class="notranslate">{{dmc.company.name}} logo</figcaption>
            </figure>
          <section>
            <h1>
            <span class="notranslate">{{dmc.company.name}}</span>  <span>/ Account Settings</span>
            </h1>
            <ul class="list-inline">
              <li>Your ID: <span class="label label-default">{{dmc.code}}</span></li>
              <li><a class="btn btn-link" target="_blank" href="/receptivo/{{dmc.code}}/{{dmc.name}}">Go to my Profile</a></li>
              <!--<li>RATING: <span class="dmc-rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span></li>-->
            </ul>
          </section>
        </div>
      </div>
    </div>

    <!-- Example row of columns -->
    <div class="row">
      <aside>
        <h4>
          Public <a href="" class="form-helper" tooltip-animation="false"
             uib-tooltip="All this information will be seen by all the platform users.">
            <i class="fa fa-info-circle"></i>
          </a>
        </h4>
        <ul class="list-group list-unstyled">
          <li><a href="" ng-click="selectTab('MainInfo')" class="list-group-item" ng-class="{ active: isSelected('MainInfo') }">Main Info</a></li>
          <li><a href="" ng-click="selectTab('Contact')" class="list-group-item" ng-class="{ active: isSelected('Contact') }">Contact</a></li>
          <li><a href="" ng-click="selectTab('Escorts')" class="list-group-item" ng-class="{ active: isSelected('Escorts') }">Guides</a></li>
        </ul>
        <h4>
          private <span class="form-helper" tooltip-animation="false"
             uib-tooltip="This information is private. Only you and openmarket.travel have access.">
            <i class="fa fa-info-circle"></i>
          </span>
        </h4>
        <ul class="list-group list-unstyled">
          <li><a href="" ng-click="selectTab('Account')" class="list-group-item" ng-class="{ active: isSelected('Account') }">Account</a></li>
          <li><a href="" ng-click="selectTab('Payment')" class="list-group-item" ng-class="{ active: isSelected('Payment') }">Data Payment</a></li>
          <li><a href="" ng-click="selectTab('Expenditure')" class="list-group-item" ng-class="{ active: isSelected('Expenditure') }">Daily Expenditure</a></li>
          <li><a href="" ng-click="selectTab('Collabagree')" class="list-group-item" ng-class="{ active: isSelected('Collabagree') }">Collaboration Agreement</a></li>
        </ul>

      </aside>
      <section class="account-settings" ng-show="isSelected('MainInfo')">
        <div class="panel-body">
          <form name="maininfoform" novalidate="">
            <h1>
              Main Info <small>(public)</small>
            </h1>
            <hr/>
              <p class="required-label">
                <span>* required</span>
              </p>
              <article class="row">
                <div class="form-group col-md-8" ng-class="{ 'has-error': maininfoform.companyname.$invalid }">
                  <label class="control-label" for="companyname">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i> Name of your organization <b>*</b>
                  </label>
                  <input class="form-control notranslate" name="companyname" ng-model="dmc.company.name" type="text"
                         ng-minlength="3" placeholder="please, add the name of your organization." ng-blur="checkUpdateForm(maininfoform.companyname.$valid)" required="" />
                        </div>

                <div class="form-group col-md-4" ng-class="{ 'has-error': maininfoform.constitutionyear.$invalid }">
                  <label class="control-label" for="constitutionyear">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i> Year of establishment <b>*</b>
                  </label>
                  <input class="form-control" name="constitutionyear" ng-model="dmc.company.constitutionyear" type="number" 
                         ng-blur="checkUpdateForm(maininfoform.constitutionyear.$valid)" placeholder="please, add the year in numbers." ng-minlength="4" required="" />
                        </div>
              </article>
              <article class="row">
                <div class="form-group col-md-12" ng-class="{true : 'has-error'} [600 < dmc.additionalinfo.description.length]">
                  <label class="control-label">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  Description of the Company <b>*</b></label>
                  <textarea ng-model="dmc.additionalinfo.description" class="form-control" ng-blur="updateBlur()" rows="7" required="">

                  </textarea>
                  <p class="help-block text-right notranslate">Max 600 char: <strong>{{600 - dmc.additionalinfo.description.length}} left</strong></p>
                </div>
              </article>
            </form>
            <div ng-show="adminRevision" class="row">
              <div class="alert alert-info">
              <legend class="text-alternate">Campos de control Administrador</legend>
               <label class="control-label">Descripción de la empresa (español)</label>
              <textarea ng-model="dmc.additionalinfo.description_es" class="form-control" ng-blur="updateBlur()" rows="7" required="">
              </textarea>
              </div>
            </div>
          <hr/>

            <article ng-form="operartioncountryfrom">
              <h3 ng-class="{'has-error' : !dmc.company.operatein.length}">
              <i class="fa fa-exclamation-circle text-brand-danger"></i>Destinations <b class=" text-brand-danger">*</b> <small> (where you operate services)</small>
              </h3>

              <ul class="list-inline notranslate" ng-cloak="">
                <li ng-repeat="operateIn in dmc.company.operatein" class="mb-l">
                  <a class="label label-default" href="" ng-click="removeDestination($index)">
                    {{operateIn.operateLocation.country}}<span ng-show="operateIn.zone">, {{operateIn.zone}}</span> <i class="fa fa-times-circle"></i>
                  </a>
                </li>
              </ul>
              <a class="action" ng-click="viewDestination = true" ng-show="!viewDestination" href="">Add destination</a>
              <form name="adddestinationform">
                <div class="account-add-search" ng-show="viewDestination">
                  <div class="form-group">
                    <label for="newdestination mr-b">Select country</label>
                    <input type="text" name="newdestination" class="form-control select-city ml-b mr-b" 
                           ng-model="local.newdestination" placeholder="" id="select-city" ng-autocomplete="autocomplete.result" details="autocomplete.details" options="autocomplete.options" />

                    </div>

                  <div class="form-group">
                    <label class="control-label" for="newzone">Zone</label>
                    <input class="form-control select-zone" ng-model="local.newzonedata" name="newzone" type="text" value="" placeholder="" 
                           data-toggle="tooltip" data-placement="top" title="ex: Tuscan, East coast, etc." /></div>

                  <button type="button" ng-click="addDestination()" class="btn btn-alt add-city">
                    <i class="fa fa-plus"></i> add
                  </button>
                </div>
              </form>
            </article>
            <hr/>
              <article>
                <h3 ng-class="{'has-error' : !dmc.tags.length}">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Activities / Tags <b class=" text-brand-danger">*</b>
                </h3>
                <label class="control-label">You are specialist in this type of tourist product:</label>
                <p ng-show="!dmc.tags.length" class="alert bg-danger text-danger">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Please select an activity. You may use as many tags as you need.</p>
                <ul class="list-inline">
                  <li ng-repeat="tag in local.tags" class="mb-l">
                    <a class="label label-info" data-ng-click="removeTag($index)" ng-href="">
                      {{tag.label_en}} <i class="fa fa-times-circle"></i>
                    </a>
                  </li>

                </ul>
                <p>
                  <a class="action" ng-click="viewCategorie = true" ng-show="!viewCategorie" href="">Add activity</a>
                </p>


                <div class="alert activities-box" ng-show="viewCategorie" ng-form="activitiesform">


                  <div class="row">
                    <h4 class="col-xs-3">Activities</h4>
                    <div class="activities-filter col-xs-9">
                      <label class="control-label sr-only">Filter activities</label>
                      <select class="form-control" ng-model="selectedTagCategories" ng-options="tagCategorie as tagCategorie.label for tagCategorie in content.tagCategories">
                        <option value="">All</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">

                    <div class="col-md-4 col-xs-6" ng-repeat="tag in tripTags">
                      <div class="checkbox">
                        <label>
                          <input name="{{tag.slug}}" type="checkbox" checklist-model="local.tags" checklist-value="tag" />{{tag.label_en}}
                        </label>
                      </div>
                    </div>

                    <!--<div class="activities-other col-xs-12">
                      <label class="control-label" for="suggactivite">Suggest another activity</label>
                      <input class="form-control" id="suggactivity" name="suggactivity" type="text" ng-model="suggTag" placeholder="name of activity" />
                        <button ng-click="suggNewTag(activitiesform.suggactivity.value)" class="btn btn-alt">send</button>
                    </div>-->
                    <div class="col-xs-12">
                      <hr />
                        <div class="text-right">
                          <a href="" ng-click="addTag()" class="btn btn-lg btn-primary">save</a>
                        </div>
                      </div>
                  </div>

                </div>

              </article>
              <hr />
                <article id="companyimages">
                  <!-- Logo -->

                  <div ng-show="!uploadfileitem.showlogo">

                    <h3 ng-class="{'has-error' : !dmc.images.logo.url}">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i> Company Logo <b class="text-brand-danger">*</b>
                    </h3>

                    <div id="load-logo" class="avatarwaitimage" ng-show="false">
                      <div class="preloader solo in">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>

                    <img class="img-dmc-big" ng-src="{{getimage(dmc.images.logo.url, 'avatar100')}}" ng-show="dmc.images.logo.url" id="logo-image-container" />

                    <label ng-show="!dmc.images.logo.url" class="btn btn-upload btn-primary ml-l">
                      <i class="fa fa-cloud-upload"></i>
                      <span>upload logo</span>
                      <input type="file" ng-waitingid="load-logo" ng-hideid="logo-image-container" ng-file-select="" ng-model="dmc.images.logo" ng-callback ='updateBlur'/>
                    </label>

                    <label ng-show="dmc.images.logo.url" class="btn btn-upload btn-default danger ml-l">
                      <i class="fa fa-cloud-upload"></i>
                      <span>replace logo</span>
                      <input type="file" ng-waitingid="load-logo" ng-hideid="logo-image-container" ng-file-select="" ng-model="dmc.images.logo" ng-callback ='updateBlur'/>
                    </label>

                    <p class="help-block">
                      <small>an image min size 400x400px, .jpg .gif .png</small>
                    </p>
                  </div>
                  <!-- Company selfie -->
                    <div ng-show="!uploadfileitem.showphoto">
                      <h3 ng-class="{'has-error' : !dmc.images.photo.url}">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Image of your company <b class="text-brand-danger">*</b>
                      </h3>
                      <p>A picture that represents your company or take a selfie of you or you with your team.</p>

                      <div id="load-selfie" class="selfiewaitimage" ng-show="false">
                        <div class="preloader solo in">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>

                      <img ng-src="{{getimage(dmc.images.photo.url, 'corporateselfie')}}" ng-show="dmc.images.photo.url" id="selfie-image-container" class="img-thumbnail-alias" />

                      <label class="btn btn-upload btn-default danger ml-l" ng-show="dmc.images.photo.url">
                        <i class="fa fa-cloud-upload"></i>
                        <span>replace</span>
                        <input type="file" ng-waitingid="load-selfie" ng-hideid="selfie-image-container" ng-file-select="" ng-model="dmc.images.photo" ng-callback ="updateBlur"/>
                      </label>

                      <label class="btn btn-upload btn-primary ml-l" ng-show="!dmc.images.photo.url">
                        <i class="fa fa-cloud-upload"></i>
                        <span>upload</span>
                        <input type="file" ng-waitingid="load-selfie" ng-hideid="selfie-image-container" ng-file-select="" ng-model="dmc.images.photo" ng-callback ="updateBlur"/>
                      </label>
                    </div>
                </article>
                  <hr />
                    <article>
                      <h3>Associations, Certifications or Awards (optional)</h3>
                      <p>
                        <strong>Do you belong to any Touristic association or have won an award?</strong>
                      </p>
                      <div class="alert" ng-repeat="association in dmc.additionalinfo.associations" ng-form="assocForm">

                        <div class="row">
                          <div class="col-xs-4">
                            <div class="text-center">

                              <label class="control-label">Logo or Cetification</label>
                              
                              <div id="load-assoc-{{$index}}" class="escortwaitimage" ng-show="false">
                                <div class="preloader solo in">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                              </div>
                              <br />
                              <img ng-src="{{getimage(association.image.url, 'avatar100')}}" ng-show="association.image.url" id="assoc-image-container-{{$index}}" />
                              <br />
                              <br />
                              <label ng-show="!association.image.url" class="btn btn-upload btn-primary">
                                <i class="fa fa-cloud-upload"></i> upload
                                <input type="file" ng-waitingid="load-assoc-{{$index}}" ng-hideid="assoc-image-container-{{$index}}" ng-file-select ng-model="association.image" ng-callback ='updateBlur'/>
                              </label>

                              <label ng-show="association.image.url" class="btn btn-upload btn-default danger">
                                <i class="fa fa-cloud-upload"></i> replace
                                <input type="file" ng-waitingid="load-assoc-{{$index}}" ng-hideid="assoc-image-container-{{$index}}" ng-file-select ng-model="association.image" ng-callback ='updateBlur'/>
                              </label> 
                              <p class="help-block">
                                <small>an image min size 400x400px, .jpg .gif .png</small>
                              </p>
  
                            </div>
                          </div>
                          <div class="col-xs-7 form-group" ng-class="{'has-error' : assocForm.association.$invalid}">
                            <label class="control-label" for="associations">
                              <i class="fa fa-exclamation-circle text-brand-danger"></i> Association Name <b>*</b>
                            </label>
                            <input class="form-control" ng-model="association.name" type="text" value="" placeholder="please, add the association name." name="association" ng-blur="checkUpdateForm(assocForm.association.$valid)" required="" />
                            </div>
                          <div class="col-xs-1">
                            <a href="" class="pull-right text-danger" ng-click="deleteAssociation($index)">
                              <i class="fa fa-trash-o fa-lg"></i>
                            </a>
                          </div>
                        </div>

                      </div>
                      <input type="file" name="associationlogo"
                             id="associationlogo" ng-show="false" />
                        <a class="action" href="" ng-click="addAssociation()">
                          <i class="fa fa-plus"></i> Add associations
                        </a>
                      </article>
                    <input type="file" name="matrixuploads"
                           id="matrixuploads" ng-show="false" />
                      <article>
                        <h3>References (optional)</h3>
                        <div class="alert" ng-repeat="recomender in dmc.additionalinfo.recomenders" ng-form="recomenderForm">

                          <div class="row">
                            <div class="form-group col-xs-4" ng-class="{'has-error' : recomenderForm.recomenderName.$invalid}">
                              <label class="control-label" for="recomenderName">
                                Name <b>*</b>
                              </label>
                              <input class="form-control" name="recomenderName" ng-model="recomender.name" 
                                     type="text" placeholder="ex: google bussines" ng-blur="checkUpdateForm(recomenderForm.$valid)" required="" />
                            </div>
                            <div class="form-group col-xs-7" ng-class="{'has-error' : recomenderForm.recomenderUrl.$invalid}">
                              <label class="control-label" for="recomenderUrl">
                                URL <b>*</b>
                              </label>
                              <input class="form-control" name="recomenderUrl" ng-model="recomender.url" 
                                     type="url" placeholder="ex: http://www.google.es/dmc-review" ng-blur="checkUpdateForm(recomenderForm.$valid)" required="" />
                            </div>
                            <div class="col-xs-1">
                              <a class="text-danger" ng-click="deleteRecommender($index)">
                                <i class="fa fa-trash-o fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <p>
                          <a class="action" href="" ng-click="addRecomender()">
                            <i class="fa fa-plus"></i> Add reference
                          </a>
                        </p>
                      </article>
                    </div>
      </section>

      <section class="account-settings" id="contactdetail" ng-show="isSelected('Contact')">
        <form class="panel-body" name="contactdetails">
          <h1>
            Company Details <small>(public)</small>
          </h1>
          <hr/>
            <p class="required-label">
              <span>* required</span>
            </p>
            <article class="row">
              <div class="col-md-8">
                <div class="form-group" ng-class="{ 'has-error': contactdetails.legalname.$invalid }">
                  <label class="control-label" for="legalname">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i> Company Name (Legal) <b>*</b>
                  </label>
                  <input class="form-control" name="legalname" type="text" ng-model="dmc.company.legalname" placeholder="your company legal name" required="">
                    <span class="help-block">Use the company name that you need for the invoice.</span>
                  </div>
                <div class="form-group" ng-class="{ 'has-error': contactdetails.taxid.$invalid }">
                  <label class="control-label" for="taxid">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Company Tax Id <b>*</b>
                  </label>
                  <input class="form-control" name="taxid" type="text" ng-model="dmc.company.taxid" placeholder="your company tax id" required="">
                    <span class="help-block">Write the tax id required for payments.</span>
                  </div>
                <div class="form-group" ng-class="{ 'has-error': contactdetails.phone.$invalid }">
                  <label class="control-label" for="phone">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Company Phone Number <b>*</b>
                  </label>
                  <input class="form-control" name="phone" type="text" ng-model="dmc.company.phone" placeholder="ex: +34 871 870 296" required="">

                        </div>
                <div class="form-group">
                  <label class="control-label" for="website">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Company Web Site
                  </label>
                  <input class="form-control" name="website" type="text" ng-model="dmc.company.website" placeholder="ex: http://www.openmarket.travel">
                  </div>
                  <hr/>
                  <article>
                    <h3 id="emergecyphonenumber" ng-class="{ 'has-error': emergencyphoneform.emergencyphone.$invalid }">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i> Emergency Phone (24/365)<b class=" text-brand-danger">*</b>
                    </h3>
                    
                      <div  ng-form="" name="emergencyphoneform">
                        <div class="form-group" ng-class="{ 'has-error': emergencyphoneform.emergencyphone.$invalid }">
                          <label class="control-label" for="emergencyphone">Phone Number</label>
                          <input class="form-control" type="text" name="emergencyphone" ng-minlength="7" ng-model="dmc.company.emergencyphone" required="">
                           <p class="help-block">This number will be only shown at the clients voucher</p>
                            </div>
                      </div>
                    
                  </article>
                  <hr/>
                  <h3>Address</h3>
                  <label class="control-label" for="address-search">Search Address</label>
                  <div class="input-group input-date">


                  <input type="text" class="form-control select-city"
                         ng-model="adressmodel" placeholder="Select destination"
                         name="searchaddress" id="searchaddress"
                         ng-autocomplete="companyaddress.result" details="companyaddress.details"
                         options="companyaddress.options" name="address-search" ng-blur="setCompanyAddress()">
                  <span class="input-group-btn">
                    <button class="btn btn-alt" ng-click="setCompanyAddress()"> <i class="fa fa-check"></i> ok </button>
                  </span>
                </div>

                    <div class="address-box">
                      <div class="form-group col-xs-12" ng-class="{ 'has-error': contactdetails.fulladdress.$invalid }">
                        <label class="control-label" for="fulladdress">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Street Address <b>*</b>
                        </label>
                        <input class="form-control" name="fulladdress" type="text" ng-model="local.officeAddress.fulladdress" placeholder="please enter street address" required="">
                            </div>
                      <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.city.$invalid }">
                        <label class="control-label" for="city">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  City / Town <b>*</b>
                        </label>
                        <input class="form-control" name="city" type="text" ng-model="local.officeAddress.city" placeholder="please, enter city / town" required="">
                            </div>
                      <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.stateorprovince.$invalid }">
                        <label class="control-label" for="stateorprovince">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  State <b>*</b>
                        </label>
                        <input class="form-control" name="stateorprovince" type="text" ng-model="local.officeAddress.stateorprovince" placeholder="please, enter state or province" required="">
                            </div>
                      <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.cp.$invalid }">
                        <label class="control-label" for="cp">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Zip / Postalcode <b>*</b>
                        </label>
                        <input class="form-control" name="cp" type="text" ng-model="local.officeAddress.cp" placeholder="please enter zip / postal code" required="">
                            </div>
                      <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.country.$invalid }">
                        <label class="control-label" for="country">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Country <b>*</b>
                        </label>
                        <input class="form-control select-input" name="country" type="text" ng-model="local.officeAddress.country" placeholder="Country" required="">
                            </div>

                    </div>
                  </div>

              <div class="col-md-4">

                <div id="map-address-dmc"></div>

              </div>

            </article>
            <p class="text-right">
              <button ng-click="updateContact()" ng-disabled="contactdetails.$invalid" class="btn btn-lg btn-primary">
                Save</button>
            </p>
          </form>
      </section>

      <section class="account-settings" ng-show="isSelected('Escorts')">
        <div class="panel-body">
          <h1>
            Info Guides <small>(public)</small>
          </h1>
          <hr/>
              <article ng-repeat="tourEscort in dmc.tourEscorts" ng-init="indexEscort = $index" ng-form="tourescortform">
                <div class="row">
                  
                  <div class="guide-image">
                                                  
                    <div id="load-escort-{{$index}}" class="escortwaitimage" ng-show="false">
                      <div class="preloader solo in">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <img ng-src="{{getimage(tourEscort.image.url, 'avatar100')}}" class="img-circle" ng-show="tourEscort.image.url" id="escort-image-container-{{$index}}">
                    <br class="visible-sm visible-xs">
                    
                    <label ng-show="!tourEscort.image.url" class="btn btn-upload btn-primary">
                      <i class="fa fa-cloud-upload"></i> upload 
                      <input type="file" ng-waitingid="load-escort-{{$index}}" ng-hideid="escort-image-container-{{$index}}" ng-file-select ng-model="tourEscort.image" ng-callback ='updateBlur'/>
                    </label>
                  
                    <label ng-show="tourEscort.image.url" class="btn btn-upload btn-default danger">
                      <i class="fa fa-cloud-upload"></i>  replace 
                      <input type="file" ng-waitingid="load-escort-{{$index}}" ng-hideid="escort-image-container-{{$index}}" ng-file-select ng-model="tourEscort.image" ng-callback ='updateBlur'/>
                    </label>

                  </div>
                  <div class="col-md-9">
                    <a class="text-danger pull-right" ng-click="deleteTourEscort($index, 1)">
                      <i class="fa fa-trash-o fa-lg"></i>
                    </a>
                    <div class="form-group clear" ng-class="{ 'has-error': !tourEscort.fullname}">
                      <label class="control-label" for="guidename">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i>  Full Name <b>*</b>
                      </label>
                      <input class="form-control" name="guidename" ng-model="tourEscort.fullname" type="text" value="" placeholder="Tour Escort full name" ng-blur="saveTourEscort(tourescortform.$valid)" required="">
                            </div>
                    <div class="form-group" ng-class="{true : 'has-error'} [300 < tourEscort.biography.length]">
                      <label class="control-label" for="guidebio">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i>  Biography <b>*</b>
                      </label>
                      <textarea class="form-control" name="guidebio" ng-model="tourEscort.biography" placeholder="" rows="5" ng-blur="saveTourEscort(tourescortform.$valid)"></textarea>
                      <p class="help-block text-right">Max 300 char: <strong>{{300 - tourEscort.biography.length}} left</strong></p>
                    </div>

                    <div ng-show="adminRevision" class="row">
                      <div class="alert alert-info">
                      <legend class="text-alternate">Campos de control Administrador</legend>
                       <label class="control-label">Biografia de Guía Acompañante (español)</label>
                      <textarea ng-model="tourEscort.biography_es" class="form-control" ng-blur="saveTourEscort(true)" rows="5">
                      </textarea>
                      </div>
                    </div>

                    <div class="form-group no-bottom">
                      <label class="control-label" for="guide-bio">Languages</label>
                      <ul class="tag-admin">
                        <li ng-repeat="language in tourEscort.languages track by $index">
                          <a class="label label-default" ng-click="tourEscort.languages.splice($index, 1)" href="">
                            {{language.label}} <i class="fa fa-times-circle"></i>
                          </a>
                        </li>
                      </ul>
                      <a class="action" ng-click="tourEscort.viewLanguages = true" ng-show="tourEscort.languages.length > 0" ng-init="tourEscort.viewLanguages = false" href="">Add more languages</a>
                      <div class="account-add-search no-bottom" ng-show="tourEscort.languages.length
                        <= 0 || tourEscort.viewLanguages">
                        <label class="control-label sr-only" for="guide-bio">
                          Add languages <b>*</b>
                        </label>
                        <select class="form-control select-lang" ng-model="newAssistanceLanguages" ng-options="opt as opt.label for opt in content.assistancelanguages">
                          <option value="" disabled="" selected="">Select language</option>
                        </select>
                        <button class="btn btn-alt" ng-click="addLanguage($index, newAssistanceLanguages)">
                          <i class="fa fa-plus"></i> add
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
                <hr/>
                </article>



              <footer>
                <button class="btn btn-primary pull-right btn-lg" ng-click="addTourEscort()">
                  <i class="fa fa-plus"></i> Add tour escort
                </button>
              </footer>
            </div>
      </section>

      <section class="account-settings" ng-show="isSelected('Account')">
        <div class="panel-body">

          <h1>
            Your Account <small>(private)</small>
          </h1>
          <hr/>
            <h3>
              Your ID: <strong> {{dmc.code}}</strong>
            </h3>
            <p>
              <a data-container="body" uib-tooltip="This number is your identifier for openmarket.travel's internal processes. Please mention this number in all your communications with us, to speed up identification and to avoid mistakes." tooltip-animation="false" >more info about reference number</a>
            </p>
            <hr/>
              <form name="administrator">
                <h3>Administrator</h3>
                <article class="row">
                  <div class="form-group col-md-2">
                    <label class="control-label" for="admin-tit">Title</label>
                    <input class="form-control" type="text" name="admin-f-name" ng-model="dmc.contact.title" ng-blur="updateBlur()">
                        </div>
                  <div class="form-group col-md-5" ng-class="{ 'has-error': administrator.contactname.$invalid }">
                    <label class="control-label" for="contactname">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i> First Name <b>*</b>
                    </label>
                    <input class="form-control" type="text" name="contactname" ng-model="dmc.contact.firstname" required="" ng-blur="updateBlur()">
                        </div>
                  <div class="form-group col-md-5" ng-class="{ 'has-error': administrator.contactlast.$invalid }">
                    <label class="control-label" for="contactlast">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i> Last Name <b>*</b>
                    </label>
                    <input class="form-control" type="text" name="contactlast" ng-model="dmc.contact.lastname" required="" ng-blur="updateBlur()">
                        </div>
                  <div class="form-group col-md-7" ng-class="{ 'has-error': administrator.contactpos.$invalid }">
                    <label class="control-label" for="contactpos">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i> Position <b>*</b>
                    </label>
                    <input class="form-control" type="text" name="contactpos" ng-model="dmc.contact.position" required="" ng-blur="updateBlur()">
                        </div>
                </article>
              </form>

              <hr/>
                <h3>Administrator Login</h3>
                <article>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="control-label" for="useremail">Email</label>
                      <input class="form-control" type="email" name="useremail" placeholder="your email"
                             ng-model="dmc.user.email" disabled="">
                      <p>
                        <a class="change-link" href="" ng-click="changeEmail = true" ng-init="changeEmail = false" ng-hide="changeEmail">Change email</a>
                      </p>
                      <div class="alert" ng-show="changeEmail">
                        <form novalidate="" name="adminlogin">
                          <div class="alert alert-danger" ng-show="passdont">
                            <p>
                              <i class="fa fa-exclamation-circle fa-lg">
                              </i> Sorry, wrong password. Try again.
                            </p>
                          </div>
                          <div class="form-group" ng-class="{ 'has-error': adminlogin.usernewemail.$invalid }">
                            <label class="control-label" for="usernewemail">
                              <i class="fa fa-exclamation-circle text-brand-danger"></i> New email <b>*</b>
                            </label>
                            <input class="form-control" type="email" name="usernewemail"
                                   ng-model="theuser.newEmail" placeholder="your new email" required="">
                            </div>
                          <div class="form-group">
                            <label class="control-label">
                              <i class="fa fa-exclamation-circle text-brand-danger">
                              </i>  This change requires to reset your session and log in again <b>*</b>
                            </label>
                          </div>
                          {# <!--<div class="form-group" ng-class="{ 'has-error': adminlogin.userpassx.$invalid }">
                                        <label class="control-label" for="userpassx">
                                            <i class="fa fa-exclamation-circle text-brand-danger"></i>  Password <b>*</b>
                                        </label>
                                        <input class="form-control" type="password" name="userpassx" required>
                                        <div ng-show="adminlogin.userpassx.$error.required">
                                            Field required!
                                        </div>
                                    </div>--> #}
                          <p class="text-right">
                            <button class="btn btn-default" ng-click="changeEmail = false">Cancel</button>
                            <button ng-click="changeuseremail()" class="btn btn-default danger">Change Email</button>
                          </p>
                        </form>
                      </div>


                      <div class="form-group">
                        <label class="control-label" for="admin-skype">Skype Id (optional)</label>
                        <input class="form-control" type="text" id="admin-skype" ng-model="dmc.contact.skype" ng-blur="updateBlur()">
                            </div>


                    </div>

                    <div class="col-md-6">
                      <form name="changepassword" novalidate="">
                        <label class="control-label">Password</label>
                        <input class="form-control" type="password" name="falsepass" value="password"
                                 disabled="">
                        <p>
                          <a href="" ng-click="changepass = true" ng-init="changepass = false" ng-hide="changepass">Change Password</a>
                        </p>
                        <div class="alert" ng-show="changepass">
                          <div class="form-group" ng-class="{ 'has-error': changepassword.oldpass.$invalid }">
                            <label class="control-label" for="oldpass">
                              <i class="fa fa-exclamation-circle text-brand-danger"></i> Old password <b>*</b>
                            </label>
                            <input class="form-control" type="password" name="oldpass"
                                   id="oldpass" ng-minlength="5" ng-maxlength="20"
                                   ng-pattern="/^[A-z][A-z0-9]*$/"
                                   ng-model="newpasswordstuff.oldpassword">
                            </div>
                          <div class="form-group">
                            <label class="control-label" for="pass1">
                              <i class="fa fa-exclamation-circle text-brand-danger"></i>  New password <b>*</b>
                            </label>
                            <input ng-model="newpasswordstuff.newpassword" class="form-control"
                                   type="password" ng-required="" id="pass1" name="pass1">
                            </div>
                          <div class="form-group">
                            <label class="control-label" for="pass2">
                              <i class="fa fa-exclamation-circle text-brand-danger"></i>  Repeat new password <b>*</b>
                            </label>
                            <input ng-model="newpasswordstuff.repeatpassword" class="form-control" type="password"
                                   ng-required="" id="pass2" name="pass2" pw-check="pass1">
                            </div>
                          <span class="msg-error" ng-show="administrator.pass2.$error.pwmatch">Passwords don't match.</span>
                          <div class="form-group">
                            <label class="control-label">
                              <i class="fa fa-exclamation-circle text-brand-danger">
                              </i>  This change requires to reset your session and log in again <b>*</b>
                            </label>
                          </div>
                          <p class="text-right">
                            <button class="btn btn-default" ng-click="changepass = false">Cancel</button>
                            <button ng-click="changeuserpassword()" class="btn btn-default danger">Change Password</button>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </article>
                <hr/>
                <article>
                  <h3>Email notifications <small>(optional)</small></h3>
                  <div class="row">
                    <div class=" col-md-6">
                      <div class="form-group">
                        <label class="control-label" for="bookingContact">Bookings:</label>
                        <input class="form-control" type="email" name="bookingContact" ng-model="dmc.contact.bookingContact.email" ng-blur="updateBlur()">
                      </div>
                      <div class="form-group">
                        <label class="control-label" for="prodContact">Claims:</label>
                        <input class="form-control" type="email" name="prodContact" ng-model="dmc.contact.prodContact.email" ng-blur="updateBlur()">
                      </div>
                      <div class="form-group">
                        <label class="control-label" for="reqFITContact">Tailor made Request FIT:</label>
                        <input class="form-control" type="email" name="reqFITContact" ng-model="dmc.contact.reqFITContact.email" ng-blur="updateBlur()">
                      </div>
                      <div class="form-group">
                        <label class="control-label" for="reqFITContact">Tailor made Request Groups:</label>
                        <input class="form-control" type="email" name="reqGroupContact" ng-model="dmc.contact.reqGroupContact.email" ng-blur="updateBlur()">
                      </div>
                    </div>
                  </div>
                </article>
                <hr/>
                     <h3 ng-class="{ 'has-error':  invalidchannels}">
                     <i class="fa fa-exclamation-circle text-brand-danger"></i>
                      Please select the product you want to commercialize <b>*</b></h3>
                      <article>
                       <div class="row">

                            <div class="col-sm-4" ng-class="{ 'has-error': invalidproducts}">
                                <div class="checkbox">
                                    <label><input type="checkbox" name="toursmultidays" id="toursmultidays" ng-model="dmc.membership.toursmultidays" ng-change="saveProduct()"> Tours Multidays</label>
                                </div>
                            </div>
                            <div class="col-sm-4" ng-class="{ 'has-error': invalidproducts}">
                                <div class="checkbox">
                                    <label><input type="checkbox" name="tailormade" id="tailormade" ng-model="dmc.membership.tailormade" ng-change="saveProduct()"> Tailor made</label>
                                </div>
                            </div>
                            <div class="col-sm-4" ng-class="{ 'has-error': invalidproducts}">
                                 <div class="checkbox">
                                    <label><input type="checkbox" name="groups" id="groups" ng-model="dmc.membership.groups" ng-change="saveProduct()"> Groups</label>
                                </div>
                            </div>

                        </div>

                        <p ng-show="invalidproducts" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Please select one kind of product at least</p>
                      </article>
                    <hr/>
                      <h3 ng-class="{ 'has-error':  invalidchannels}">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Select sales channels <b>*</b>
                      </h3>
                      <article>
                        <div class="row">

                          <div class="form-group col-sm-4" ng-class="{ 'has-error': invalidchannels}">
                            <div class="checkbox">
                              <label>
                                <input type="checkbox" name="b2cchannel" id="b2cchannel" ng-model="dmc.membership.b2cchannel" ng-change="saveChannel()"> B2C - Final customer
                              </label><br/>
                              <img class="mt-l" src="http://res.cloudinary.com/open-market-travel/image/upload/brand/openmarketlogo_bgblanco.png" />
                            </div>
                          </div>
                          <div class="form-group col-sm-4" ng-class="{ 'has-error': invalidchannels}">
                            <div class="checkbox">
                              <label>
                                <input type="checkbox" name="b2bchannel" id="b2bchannel" ng-model="dmc.membership.b2bchannel" ng-change="saveChannel()"> B2B - Travel agency
                              </label><br/>
                              <img class="mt-b" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_22/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" />
                            </div>

                          </div>
                        </div>

                        <p ng-show="invalidchannels" class="alert bg-danger text-danger">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i> Please select one channel sale at least</p>
                      </article>
                      <hr/>
                        <form novalidate="" name="timezone">
                          <h3>Time Zone</h3>
                          <article class="form-group">

                            <label>Time zone</label>
                            <!-- <p><strong>{{theuser.timeZone.label}}</strong></p>
                         <pre>{{theuser.timeZone | json}}</pre>-->

                            <select class="form-control" ng-model="dmc.timeZone" ng-options="timezone as timezone.label for timezone in content.timezones" name="timezoneselect" ng-change="updateBlur();" required=""></select>
                          </article>

                          {# <!--<p class="text-right"><button class="btn btn-lg btn-primary">Save</button></p>
                    ng-change="checkUpdateForm(timezone.timezoneselect.$invalid)"
                                            --> #}
                        </form>
                        <hr/>
                          <article>
                            <div class="alert alert-danger" role="alert">
                              <h4>Delete your account</h4>
                              <p ng-show="dmc.membership.requestdelete">
                                <strong>You have requested to delete this account.</strong> For any suggestion please send us an email to <a href="mailto:dmc@openmarket.travel" class="notranslate">dmc@openmarket.travel</a>
                              </p>
                              <p ng-hide="dmc.membership.requestdelete">
                                <a ng-init="showdeletequestion = false" ng-click="showdeletequestion = true"
                                   href="" class="action alert-link">Ask us to delete this account</a>
                                <span ng-show="showdeletequestion">
                                  - Are you sure to leave us?
                                  <a ng-click="requestdeleteaccount()" href="" class="btn btn-danger">Yes</a>
                                  <a href="" ng-click="showdeletequestion = false" class="btn btn-default">No</a>
                                </span>
                              </p>
                            </div>
                          </article>
                        </div>
      </section>

      <section class="account-settings" id="paymentdetails" ng-show="isSelected('Payment')">
        <div class="panel-body">

          <h1>
            Payment details <small>(private)</small>
          </h1>
          
          <form name="currencybank" novalidate="">
            <hr/>
              <h3 ng-class="{'has-error' : !local.currency}">
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Your currency:
              </h3>
              <p ng-show="local.currency.label">
                <big>
                  <strong>
                    {{local.currency.symbol}} <span>({{local.currency.label}})</span>
                  </strong>
                </big>
              </p>
               <div clasps="alert alert-danger" ng-show="dmc.currency">
                <p>If you need to change the currency, please write to <a href="mailto:dmc@openmarket.travel" class="alert-link notranslate">dmc@openmarket.travel</a></p>
              </div>
              {# <div clasps="alert alert-danger" ng-show="showAlertCurrency">
                <p>Please change <a href="" class="alert-link" ng-click="selectTab('Expenditure')">average daily expenditure</a> to adjust to new currency</p>
              </div> #}
              <div class="row" ng-show="!dmc.currency">
                <div class="form-group col-md-4" ng-class="{'has-error' : !local.currency}">
                  <label class="control-label" for="currency">Currency for payment</label>
                  <select class="form-control select-lang" ng-model="local.currency" name="currency" ng-options="currency as currency.label for currency in content.currency" required="">
                    <option selected disabled>-- choose your currency --</option>
                  </select>
                  <!-- currency is based en iso http://www.iso.org/iso/home/standards/currency_codes.htm -->
                </div>
              </div>
              <hr/>
              <h3>Accounting Contact</h3>
              <div class="row">
                <div class=" col-md-4">
                  <div class="form-group">
                    <label class="control-label" for="accountingContactName">Full Name:</label>
                    <input class="form-control" type="text" name="accountingContactName" ng-model="dmc.contact.accountingContact.name">
                  </div>
                </div>
                <div class=" col-md-5">
                  <div class="form-group">
                    <label class="control-label" for="accountingContactEmail">Email:</label>
                    <input class="form-control" type="email" name="accountingContactEmail" ng-model="dmc.contact.accountingContact.email">
                  </div>
                </div>
              </div>
              <hr/>
                  <h3>Bank Transfer or SEPA:</h3>
                  <div class="row">
                    <div class="col-md-9">
                      <div class="form-group" ng-class="{ 'has-error': currencybank.beneficiary.$invalid }">
                        <label class="control-label" for="beneficiary">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Beneficiary: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="beneficiary" ng-model="local.bankinfo.beneficiary" required="">
                            </div>
                      <div class="form-group" ng-class="{ 'has-error': currencybank.iban.$invalid }">
                        <label class="control-label" for="iban">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  IBAN: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="iban" ng-model="local.bankinfo.iban" required="">
                            </div>
                      <div class="form-group" ng-class="{ 'has-error': currencybank.accountnumber.$invalid }">
                        <label class="control-label" for="accountnumber">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Account number: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="accountnumber" ng-model="local.bankinfo.accountnumber" required="">
                            </div>
                      <div class="form-group" ng-class="{ 'has-error': currencybank.bankname.$invalid }">
                        <label class="control-label" for="bankname">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Bank Name: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="bankname" ng-model="local.bankinfo.bankname" required="">
                            </div>

                      <div class="form-group" ng-class="{ 'has-error': currencybank.bic.$invalid }">
                        <label class="control-label" for="bic">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  BIC (Swift): <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="bic" ng-model="local.bankinfo.bic" required="">
                            </div>

                      <div class="form-group" ng-class="{ 'has-error': currencybank.routing.$invalid }">
                        <label class="control-label" for="routing">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Routing number (ABA): <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="routing" ng-model="local.bankinfo.routing" required="">
                            </div>

                      <div class="form-group" ng-class="{ 'has-error': currencybank.bankaddress.$invalid }">
                        <label class="control-label" for="bankaddress">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Bank address: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="bankaddress" ng-model="local.bankinfo.bankaddress" required="">
                            </div>

                      <div class="form-group" ng-class="{ 'has-error': currencybank.bankzip.$invalid }">
                        <label class="control-label" for="bankzip">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> ZIP Code: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="bankzip" ng-model="local.bankinfo.bankzip" required="">
                            </div>

                      <div class="form-group" ng-class="{ 'has-error': currencybank.bankcity.$invalid }">
                        <label class="control-label" for="bankcity">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  City: <b>*</b>
                        </label>
                        <input class="form-control" type="text" name="bankcity" ng-model="local.bankinfo.bankcity" required="">
                            </div>


                      <div class="form-group">
                        <label class="control-label" for="bankcountry">
                          <i class="fa fa-exclamation-circle text-brand-danger"></i>  Country: <b>*</b>
                        </label>

                        <select class="form-control" name="bankcountry" ng-options="country as country.label for country in content.bankcountries" ng-model="local.bankinfo.bankcountry" required="">
                          <option value=""> - select country -</option>
                        </select>
                      </div>
                      <hr/>
                        <p class="text-right">
                          <button class="btn btn-lg btn-primary" ng-disabled="currencybank.$invalid" ng-click="updatePayment()">Save</button>
                        </p>
                      </div>
                  </div>
                </form>
        </div>
      </section>

      <section class="account-settings" id="dailyexpenditure" ng-show="isSelected('Expenditure')">
        <div class="panel-body">
          <h1>
            Average daily expenditure <small>(private)</small>
          </h1>
          <p>Please enter an average daily expenditure per month to control  acceptable budgets in client's request. <br/>The amount shown will be the average of the area.</p>

          <a href="" ng-click="selectTab('Payment')">Change currency</a>

          <form name="expenditureForm" novalidate="">
            <div class="row">
              <div class="expenditure" ng-repeat="year in local.expenditure">
                <h3 class="text-center">{{year.label}}</h3>
                <div class="form-inline" ng-repeat="month in year.months" ng-class="{ 'has-error': monthForm.month.$invalid }" ng-form="monthForm">
                  <label class="control-label notranslate" for="month">
                    {{month.label}} {{year.label}}
                  </label>
                  <input class="form-control dayexpend" ng-model="month.value" name="month" type="number">
                    <span ng-show="dmc.currency">{{dmc.currency.symbol}}</span>
                    <a href="" ng-hide="dmc.currency" class="text-danger" ng-click="selectTab('Payment')">set currency</a>
                  </div>

              </div>
            </div>
            <hr/>
              <p class="text-right">
                <button class="btn btn-lg btn-primary" ng-click="updateExpenditure()" ng-disabled="expenditureForm.$invalid">Save</button>
              </p>
            </form>
        </div>
      </section>
      <section class="account-settings" id="collaborationagreement" ng-show="isSelected('Collabagree')">
        <div class="panel-body">
          <h1>
            Colaboration Agreement <small>(private)</small>
          </h1>
          <p>The data shown below are specifications to the Agreement concerning commission, payment and cancellation policy.</p>
          <hr/>
          <article id="insuranceandregistration">
            <!-- Registration -->
            <div>
              <h3 ng-class="{'has-error' : !dmc.additionalinfo.registration.url}">
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Company Registration / Business License <b class="text-brand-danger">*</b>
              </h3>
              <p>Scan and upload the certification / license that allows you to operate.</p>
              <p ng-show="dmc.additionalinfo.registration.url" id="licenselink">
                  <a class="action" target="_blank" ng-href="{{dmc.additionalinfo.registration.url}}" >Download your certification</a>
              </p>

            <div id="load-business" class="documentwait" ng-show="false">
              <div class="preloader solo in">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            
            <label ng-show="!dmc.additionalinfo.registration.url" class="btn btn-upload btn-primary">
              <i class="fa fa-cloud-upload"></i> upload certification
              <input type="file" ng-waitingid="load-business" ng-hideid="licenselink" ng-file-select ng-file-type="document" ng-additional-data="certification" ng-model="dmc.additionalinfo.registration" ng-callback ='updateCompanycomplete'/>
            </label>
          
            <label ng-show="dmc.additionalinfo.registration.url" class="btn btn-upload btn-default danger">
              <i class="fa fa-cloud-upload"></i>  replace certification
              <input type="file" ng-waitingid="load-business" ng-hideid="licenselink" ng-file-select ng-file-type="document" ng-additional-data="certification" ng-model="dmc.additionalinfo.registration" ng-callback ='updateCompanycomplete'/>
            </label>

            </div>

            <hr/>
              <!-- Insurance -->
              <div>
                <h3 ng-class="{'has-error' : !dmc.additionalinfo.insurancepolicy.url}">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Insurance Policy <b class="text-brand-danger">*</b>
                </h3>
                <p>Scan and upload your insurance policy.</p>

                  <p ng-show="dmc.additionalinfo.insurancepolicy.url" id="insurancelink">
                    <a class="action" target="_blank" ng-href="{{dmc.additionalinfo.insurancepolicy.url}}">Download your Insurance Policy</a>
                  </p>


                  <div id="load-insurance" class="documentwait" ng-show="false">
                    <div class="preloader solo in">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  
                  <label ng-show="!dmc.additionalinfo.insurancepolicy.url" class="btn btn-upload btn-primary">
                    <i class="fa fa-cloud-upload"></i> upload Insurance Policy
                    <input type="file" ng-waitingid="load-insurance" ng-hideid="insurancelink" ng-file-type="document" ng-additional-data="insurance" ng-file-select ng-model="dmc.additionalinfo.insurancepolicy" ng-callback ='updateCompanycomplete'/>
                  </label>
                
                  <label ng-show="dmc.additionalinfo.insurancepolicy.url" class="btn btn-upload btn-default danger">
                    <i class="fa fa-cloud-upload"></i>  replace Insurance Policy
                    <input type="file" ng-waitingid="load-insurance" ng-hideid="insurancelink" ng-file-type="document" ng-additional-data="insurance" ng-file-select ng-model="dmc.additionalinfo.insurancepolicy" ng-callback ='updateCompanycomplete'/>
                  </label>
                  {# <button ng-show="!dmc.additionalinfo.insurancepolicy.url" ng-click="uploadclick('insurance')" class="btn btn-primary">
                    <i class="fa fa-cloud-upload"></i> upload the Insurance Policy
                  </button>
                  <button ng-show="dmc.additionalinfo.insurancepolicy.url" ng-click="uploadclick('insurance')" class="btn btn-default danger">
                    <i class="fa fa-cloud-upload"></i> replace the Insurance Policy
                  </button>
                </div> #}
            </article>
          <hr/>
          <h3>Commission</h3>
          <p class="h4-sized">          
            <span>openmarket <strong>b2c</strong> commission:</span> <strong class="notranslate">{{dmc.membership.commission}} %</strong>
            <i class="fa fa-info-circle fa-lg text-brand-danger" tooltip-animation="false" tooltip-placement="top" uib-tooltip="this percentage will be deducted from your rates."></i><img class="ml-b" src="http://res.cloudinary.com/open-market-travel/image/upload/brand/openmarketlogo_bgblanco.png" />
          </p>
          <p class="h4-sized">          
          <span>openmarket <strong>b2b</strong> commission:</span> <strong class="notranslate">{{dmc.membership.b2bcommission}} %</strong>
            <i class="fa fa-info-circle fa-lg text-brand-danger" tooltip-animation="false" tooltip-placement="top" uib-tooltip="this percentage will be deducted from your rates."></i> <img class="ml-b" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_22/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" />
          </p>
          <p class="help-block">
            For any question about the commission please contact to: <a href="mailto:dmc@openmarket.travel">dmc@openmarket.travel</a>
          </p>
         {#  TODO  init pasar esto a swig  #}
          <div ng-show="adminRevision" class="alert alert-info mb-l">
          <div class="row">
              <div class="col-md-12">
              <legend class="text-alternate">Campos de control Administrador</legend>
                <form name="commission" class="form-inline" role="form" novalidate="">
                      <div>
                      <label class="control-label mr-l" for="commission">b2c commission:</label>
                        <div class="form-group mb-l">
                          <div class="input-group">
                            <input class="form-control" type="text" id="commission" name="commission" placeholder="00" ng-model="dmc.membership.commission" required="">
                            <span class="input-group-addon" style="border-left: 1px solid">%</span>
                          </div>  
                        </div>
                      </div>
                      <div class="mt-l">
                        <label class="control-label mr-l" for="commission">b2b commission:</label>
                        <div class="form-group">
                          <div class="input-group">
                            <input class="form-control" type="text" id="b2bcommission" name="b2bcommission" placeholder="00" ng-model="dmc.membership.b2bcommission" required="">
                            <span class="input-group-addon" style="border-left: 1px solid">%</span>
                          </div>  
                        </div>
                      </div>
                        <hr/>
                  <button class="btn btn-primary pull-right" ng-click="updateColaborationOMT()">Guardar</button>
                </form>
              </div>
            </div>
            </div>
          {#  TODO end pasar esto a swig  #}
          <hr/>
          <h3>Cancellation Policy </h3>        
          
          <strong>Cancellation Policy (english)</strong>
          <p ng-bind-html="trustHtml(dmc.membership.cancelpolicy._en)" class="pre-text"></p>
          
          <strong>Política de Cancelación (spanish)</strong>
          <p ng-bind-html="trustHtml(dmc.membership.cancelpolicy._es)" class="pre-text"></p>
          
          {# {{dmc.membership.cancelpolicy._es}} #}
          {#  TODO init pasar esto a swig  #}
          <form name="cancelpolicy" novalidate="" ng-show="adminRevision" class="alert alert-info mb-l">
            <div class="row">
              <div class="col-md-12">
              <legend class="text-alternate">Campos de control Administrador</legend>
                <label class="control-label"><strong>Cancellation Policy</strong></label>
                  <textarea ng-model="dmc.membership.cancelpolicy._en" class="form-control" rows="7" required="">
                  </textarea>
                  <br/>
                  <label class="control-label"><strong>Política de Cancelación</strong></label>
                  <textarea ng-model="dmc.membership.cancelpolicy._es" class="form-control" rows="7" required="">
                  </textarea>
                  <hr/>
                  <p class="text-right">
                <button class="btn btn-primary" ng-click="updateColaborationOMT()">Guardar</button>
              </p>
              </div>
            </div>
          </form>
          
            {#  TODO end pasar esto a swig  #}
            <hr/>
            <h3>Payment Conditions </h3>        
            <p>
            <strong>You will receive the payment</strong><br />
            <em>{{dmc.membership.paymentoption._en}}</em>
            </p>
            <form name="paymentoptions" novalidate="" ng-show="adminRevision" class="alert alert-info mb-l">
            <div class="row">
              <div class="col-md-12">
              <legend class="text-alternate">Campos de control Administrador</legend>
                <label class="control-label"><strong>Opciones de pago</strong></label>
                  
                  <select class="form-control" ng-model="local.paymentoption" ng-options="option._es for option in content.paymentoptions"></select>
                 <hr/>
                  <p class="text-right">
                <button class="btn btn-primary" ng-click="updateColaborationOMT()">Guardar</button>
              </p>
              </div>
            </div>
          </form>

            <hr/>
            <h3>Confirm Collaboration Agreement </h3>
            <form name="acceptconditions" novalidate="">
              <div class="form-group" ng-class="{'has-error': acceptconditions.termconfirm.$invalid}">
              <div class="checkbox">
                 <label>
                      <input type="checkbox" name="termconfirm" id="termconfirm" ng-model="local.membership.confirmterms" required="" ng-disabled="dmc.membership.confirmterms">
                              <i class="fa fa-exclamation-circle text-brand-danger" ng-show="acceptconditions.termconfirm.$invalid"></i> I agree and accept the conditions of the Tourist Services Final Agreement (<a ng-class="{'alert-link': acceptconditions.termconfirm.$invalid}" href="/page/supply-final-agreement" target="_blank" class="alert-link">English</a> | <a ng-class="{'alert-link': acceptconditions.termconfirm.$invalid}" href="/pagina/contrato-de-suministro-de-servicios-turisticos-y-contenidos" target="_blank" class="alert-link">Spanish</a>). <b>*</b>
                  </label>
              </div>
              <hr/>
              <p class="text-right">
                <button class="btn btn-primary btn-lg" ng-click="checkConfirm()">Save</button>
              </p>
            </div>
            </form>
        </div>
      </section>
    </div>
  </div>

  <div class="preloader-blanket in"
       ng-class="{'in' : showPageLoad }">
    <div class="preloader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  
</div>