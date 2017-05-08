<div class="container" ng-controller="EDITProgramCtrl">
    {% if loginsession %}
        {% if loginsession.user && loginsession.user.isAdmin %}
            {% include 'omt-header-product.html.swig' ignore missing %}
        {% endif %}
    {% endif %}
    <div class="row">
        <div class="col-md-9">
            <ul class="breadcrumb">
                <li><a href="/" target="_self" class="notranslate">Home</a></li>
                <li ng-show="dmcproduct.title == ''"><a href="/admin/programs" target="_self">Programs</a></li>
                <li ng-show="dmcproduct.title != ''"><a href="/admin/programs" target="_self">Programs</a></li>
                <li class="active notranslate">{{ dmcproduct.title }}</li>
            </ul>
            <div class="page-header">
                <h1 ng-show="dmcproduct.title == '' && dmcproduct.title_es == ''"><span class="thin">New Program</span></h1>
                <h1 ng-show="dmcproduct.title != '' || dmcproduct.title_es != ''"><span class="thin">Program:</span> <span class="translate">{{ dmcproduct.title || dmcproduct.title_es }}</span> </h1>
            </div>
        </div>
        <div class="col-md-3" ng-show="categoryEditingVisible">
            <div class="text-right"><a target="_blank" href="http://www.openmarket.travel/faq/21-how-do-i-upload-a-program" class="btn btn-link"><i class="fa fa-question-circle"></i> see the tutorial</a>
            <a ng-show="dmcproduct.code != ''" ng-href="" ng-click="open()" class="btn btn-alt mt-xl"><i class="fa fa-copy"></i> Copy this program</a>
           <h4><span class="thin">publish state: </span> {{dmcproduct.publishState}}</h4>
        </div>
            {# Init Copy Program modal #}
            <script type="text/ng-template" id="copyProgramModal.html">
                <div class="modal-header">
                    <h3 class="modal-title">Copy this program and save as a new one</h3>
                </div>
                <div class="modal-body">
                    <div class="form-group mt-xl">
                        <label class="control-label notranslate" for="save-as">Save copied program as <b>*</b></label>
                        <input ng-model="productName" class="form-control ng-pristine ng-valid" id="save-as" type="text" value="" placeholder="" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" ng-click="ok()">Save</button>
                    <button class="btn btn-default" ng-click="cancel()">Cancel</button>
                </div>
            </script>
            {# End Copy Program modal #}

        </div>
    </div>
    <!-- Example row of columns -->
    <div class="row">
        <section class="load-product">
            <nav class="subnav" ng-show="preloaded==false">
                <a type="button" target="_self" href="/edit/program?dmccode={? dmcdata.code ?}" id="multidaysbutton" class="btn btn-primary btn-lg notranslate">multiday tours</a>
            </nav>
            <section class="new-program arrow-load-request" ng-show="formvisible">
               <!-- <pre>{{dmcproduct | json }}</pre> -->
                <div class="panel-body">
                    <div ng-if="dmcproduct.publishState == 'under review'" class="alert alert-dismissable alert-info" ng-hide="closeur" ng-show="statusVisible && categoryEditingVisible">
                    <button type="button" ng-click="closeur = true" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    This tour <span class="notranslate">({{dmcproduct.code}})</span> is <strong class="notranslate">under review</strong> We will notify you when it is published.
                    </div>
                    <div ng-if="dmcproduct.publishState == 'unpublished'" class="alert alert-danger alert-dismissible" role="alert" ng-hide="closeun" ng-show="statusVisible && categoryEditingVisible">
                      <button type="button" class="close" ng-click="closeun = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      This tour <span class="notranslate">({{dmcproduct.code}})</span> is <strong class="notranslate">Unpublished</strong>
                    </div>
                    <div ng-if="dmcproduct.publishState == 'published'" class="alert alert-success alert-dismissible" role="alert" ng-hide="closepu" ng-show="statusVisible && categoryEditingVisible">
                      <button type="button" class="close" ng-click="closepu = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      This tour <span class="notranslate">({{dmcproduct.code}})</span> is <strong>Published</strong>
                    </div>
                    <div ng-if="dmcproduct.publishState == 'draft'" class="alert alert-warning alert-dismissible" role="alert" ng-hide="closedr" ng-show="statusVisible && categoryEditingVisible">
                      <button type="button" class="close" ng-click="closedr = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      This tour <span class="notranslate">({{dmcproduct.code}})</span> is <strong class="notranslate">Draft</strong>
                    </div>
                    <div ng-if="dmcproduct.publishState == 'new'" class="alert alert-warning alert-dismissible" role="alert" ng-hide="closedr" ng-show="statusVisible && categoryEditingVisible">
                      <button type="button" class="close" ng-click="closedr = true" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      This tour <span class="notranslate">({{dmcproduct.code}})</span> is <strong>New</strong>
                    </div>
                    <!-- ////////////////////// -->
                    <!-- // 0 TOUR MAIN LANGUAGES -->
                    <!-- ////////////////////// -->
                    <form ng-show="StepZeroVisible" class="step-load">
                        <p class="required-label">* required</p>
                        <h2><span>0.</span> Languages</h2>
                        <div class="bg-warning mb-l">
                            <legend>Choose languages for this program<b>*</b></legend>
                            <fieldset>
                                <label class="checkbox-inline">
                                    <input ng-model="dmcproduct.languages.english" type="checkbox" id="lang-tour-en" value="english" /> English
                                </label><label class="checkbox-inline">
                                    <input ng-model="dmcproduct.languages.spanish" type="checkbox" id="lang-tour-es" value="spanish" /> Spanish
                                </label>
                            </fieldset>
                            <p class="help-block" ng-hide="isTranslateEs()">
                                This application is operating in English, although clients will see all the items in spanish (including the geolocation). <br />
                                Some steps, as title and descriptions, will allow you to write in spanish also, or to use the automatic translation. If you make use of the translator, our Product Department will review texts before publishing.

                            </p>
                        </div>
                        <footer ng-show="StepZeroVisibleButtons" class="ng-hide">
                            <button ng-click="StepZeroCommit()" type="button" 
                                    class="btn btn-success btn-lg pull-right" id="step0button">ok, next step</button>
                            <div class="steps">
                                <h6>step 0 of 8</h6>
                                <ol>
                                    <li class="active"><span>Languages</span></li>
                                    <li><span>Tour main info</span></li>
                                    <li><span>Operation dates, availability and rates</span></li>
                                    <li><span>Included / Not included</span></li>
                                    <li><span>Itinerary (Day to Day)</span></li>
                                    <li><span>Descriptions</span></li>
                                    <li><span>Tag this tour</span></li>
                                    <li><span>Preview</span></li>
                                    <li><span>Save this program</span></li>
                                </ol>
                            </div>

                        </footer>
                    </form>
                    <!-- ////////////////////// -->
                    <!-- // 1 TOUR MAIN INFO -->
                    <!-- ////////////////////// -->
                    <hr ng-show="StepOneVisible" class="hr" id="step1startpoint" />
                    <form ng-show="StepOneVisible" class="step-load">
                        <p class="required-label">* required</p>
                        <h2><span>1.</span> Tour name & Description</h2>
                        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.english">
                            <label class="control-label" for="tourname">Tour name (english)<b>*</b></label> <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatetitle_es(dmcproduct.title_es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                            <input ng-model="dmcproduct.title" class="form-control" id="tourname" type="text" value="" placeholder="please, add the tour name here..." />
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': titleisempty }" ng-show="dmcproduct.languages.spanish">
                            <label class="control-label" for="tourname">Tour name (spanish)<b>*</b></label> <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatetitle(dmcproduct.title)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
                            <input ng-model="dmcproduct.title_es" class="form-control" id="tourname" type="text" value="" placeholder="please, add the tour name here..." />
                        </div>
                        <p class="help-block">
                            You do not need to specify days in the title. It will be requested in the following steps.
                        </p>

                      {% include 'program-descriptions.html.swig' %}

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
                                    <li><span>Tag this tour</span></li>
                                    <li><span>Preview</span></li>
                                    <li><span>Save this program</span></li>
                                </ol>
                            </div>

                        </footer>
                    </form>
                    <!-- ////////////////////// -->
                    <!-- // 2 OPERATION DATES -->
                    <!-- ////////////////////// -->
                    <hr ng-show="StepTwoVisible && categoryEditingVisible" class="hr" id="step2startpoint" />
                    <form ng-show="StepTwoVisible" class="step-load" name="step2form" id="step2form">
                        <p class="required-label">* required</p>
                        <h2><span>2.</span> Dates, Availability<span ng-if="showCategoriesTab">,</span> <span ng-hide="showCategoriesTab"> and </span> Prices <span ng-if="showCategoriesTab"> and Categories</span></h2>




                        <!-- ////////////////////// -->
                        <!-- // TABS FOR CATEGORIES -->
                        <!-- ////////////////////// -->

                        {# *************************************************** #}
                        {# *****************version dinamica ***************** #}
                        {# *************************************************** #}
                        <div>
                            <div ng-show="showCategoriesTab || dmcproduct.categoryname != null">
                            <h3>Categories:</h3>
                            <uib-tabset>
                                <uib-tab class="notranslate"
                                ng-repeat="workspace in workspaces"
                                heading="{{workspace.dmcproduct.categoryname.label_en}}"
                                active=workspace.active ng-click="selectCategory(workspace.id, true)">

                                     {# categoria #}
                                    <div ng-init="workspace=workspace">

                                         {# categoria #} 
                                         <h5 class="mt-l">
                                           <span class="h4-sized mt-l">
                                           
                                           <i class="fa fa-angle-right"></i>
                                           editing category: <strong class="notranslate">{{ workspace.dmcproduct.categoryname.label_en}} </strong>
                                           <a ng-href="" class="ml-b italic text-xs" ng-click="workspace.changeCategoryName = true"><i class="fa fa-pencil"></i>edit</a>

                                           <span class="ml-l" ng-show="workspace.id>0"><a ng-href="#" class="text-xs italic text-danger ml-xxl" ng-click="deleteCategory(workspace.id)"><i class="fa fa-trash-o"></i> delete this category</a></span>
                                         
                                         </h5>

                                        {# nombre de la categoria #}
                                        <div class="form-inline panel-body bordered pt-xl" ng-show="workspace.changeCategoryName">
                                            <ng-form name="catnameform">
                                            <div class="form-group" ng-class="{ 'has-error': catnameform.categoryname_en.$invalid }">
                                                <label for="categoryname_en" class="mr-b">Category name (english):</label>
                                                <div class="input-group mr-l">
                                                    <input class="form-control" ng-model="workspace.dmcproduct.categoryname.label_en" 
                                                           name="categoryname_en" id="categoryname_en" type="text" ng-minlength="2" required />
                                                </div>
                                            </div>
                                            <div class="form-group" ng-class="{ 'has-error': catnameform.categoryname_es.$invalid }">
                                                <label for="categoryname_es" class="mr-b">Category name (spanish):</label>
                                                <div class="input-group">
                                                    <input class="form-control" type="text" name="categoryname_es" 
                                                           id="categoryname_es" ng-model="workspace.dmcproduct.categoryname.label_es" ng-minlength="2" required />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                            <button class="btn btn-default ml-l" type="button" ng-click="validCategoryName(workspace)">ok</button>
                                            </div>
                                            <button type="button" class="close mr-b" ng-click="validCategoryName(workspace)" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                             </button>
                                         </ng-form>
                                        </div>
                                    </div>     
                                </uib-tab>
                                    <uib-tab ng-click="addWorkspace()">
	                                    <uib-tab-heading>
	                                        + add another category
	                                    </uib-tab-heading>
                                    </uib-tab>
                            </uib-tabset>
                        </div>
                        </div>
                        {# *************************************************** #}
                        {# *************************************************** #}
                        {# *************************************************** #}


                        <div class="nav-calendar">
                            <div class="left">
                                <button ng-click="removemonth()" type="button" class="btn btn-default"><i class="fa fa-arrow-left"></i></button>
                            </div>
                            <div class="center">
                                <select ng-change="newmonthselected(month)" class="form-control notranslate"
                                        id="select" ng-options="month.selectiontext for month in availablemonths"
                                        ng-model="selectnewmonth"></select>
                            </div>
                            <div class="right">
                                <button ng-click="addmonth()" type="button" class="btn btn-default"><i class="fa fa-arrow-right"></i></button>
                            </div>
                        </div>

                        <!-- MODAL PRICE -->
                        {% include 'program-price-modal.html.swig' %}
                        <!-- END MODAL PRICE -->

                        <!-- PRICE CALENDAR -->
                        {% include 'program-price-calendar.html.swig' %}
                        <!-- END PRICE CALENDAR -->
                        
                        <div ng-show="releaseDaysVisible" class="text-center">
                        <h3 class="notranslate">Release</h3>
                       
                            <div class="form-group col-xs-2 col-xs-offset-5">

                                <label class="control-label" for="release">Days</label>
                                
                                <select ng-model="dmcproduct.release" class="form-control " id="release" ng-options="i as i for i in releasedays">

                               
                                </select>
                            </div>
                        </div>
                        {#<p class="text-center">
                            Calendar last updated {{dmcproduct.updateOn | date :'short'}}<br>

                             Need to import or export your listings calendar? <a href="" class="text-mutted">download a CVS file</a> 
                        </p>#}
    
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
                                    <li><span>Tag this tour</span></li>
                                    <li><span>Preview</span></li>
                                    <li><span>Save this program</span></li>
                                </ol>
                            </div>

                        </footer>
                    </form>
                    <!-- ////////////////////// -->
                    <!-- // 3 INCLUDED -->
                    <!-- ////////////////////// -->
                    <hr ng-show="StepThreeVisible" class="hr" id="step3startpoint" />
                    
                    {% include 'program-included.html.swig' %}
                    <!-- ////////////////////// -->
                    <!-- // 4 ITINERARY -->
                    <!-- ////////////////////// -->
                    <hr ng-show="StepFourVisible" class="hr" id="step4startpoint" />
                    
                    {% include 'program-itinerary.html.swig' %}

                    <hr ng-show="StepSixVisible" class="hr" id="step6startpoint" />
                    <!-- ////////////////////// -->
                    <!-- // 5 TAG THIS TOUR -->
                    <!-- ////////////////////// -->
                    <form ng-show="StepSixVisible" class="step-load">
                        <p class="required-label">* required</p>
                        <h2><span>5.</span> Classify this tour</h2>
                        <div class="form-group">
                            <span class="help-block">Important for customer trip search.</span>
                            <div class="add-tag-control" ng-show="showPreviewEn()">
                                <div class="search">
                                    <label class="control-label" for="tag-tour">Select the tags  <b>*</b></label>
                                    <input uib-typeahead="tag as tag.label_en for tag in publicTags | filter:$viewValue | limitTo:8"
                                    ng-model="tagtoadd" type="text" class="form-control select-tag" 
                                    placeholder="Search tag" id="tagsenglish" uib-typeahead-template-url="tagTemplate.html" />
                                </div>
                                <div class="action">
                                    <button ng-click="addTag()" type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Add</button>
                                </div>
                                <div class="result">
                                    <h3><i class="fa fa-tags"></i>Tags: <span class="bold" ng-repeat="tag in dmcproduct.tags | filter : {state:'published'}"><span ng-show="!$first">,</span> {{tag.label_en}}</span></h3>
                                </div>
                            </div>
                            <div class="add-tag-control" ng-show="showPreviewEs()">
                                <div class="search">
                                    <label class="control-label" for="tag-tour">Select the tags <b>*</b></label>
                                    <input uib-typeahead="tag as tag.label for tag in publicTags | filter:$viewValue | limitTo:8"
                                    ng-model="tagtoadd" type="text" class="form-control select-tag" 
                                    placeholder="Search tag" id="tagsspanish" uib-typeahead-template-url="tagTemplate.html" />
                                </div>
                                <div class="action">
                                    <button ng-click="addTag()" type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Add</button>
                                </div>
                                <div class="result">
                                    <h3><i class="fa fa-tags"></i>Tags: <span ng-repeat="tag in dmcproduct.tags | filter : {state:'published'}"><span ng-show="!$first">,</span> <strong>{{tag.label}}</strong></span></h3>
                                </div>
                            </div>
                            
                            <p>
                                <a class="action" ng-click="viewCategorie = true"
                                   ng-show="!viewCategorie" href="">View all tags</a>
                            </p>
                            <div class="alert activities-box" ng-show="viewCategorie" ng-form="activitiesform">
                                <div class="row">
                                    <h4 class="col-xs-3">Activities</h4>
                                    <div class="activities-filter col-xs-9">
                                    </div>
                                </div>
                                <div class="row" ng-show="showPreviewEn()">
                                    <div class="col-lg-3 col-md-4 col-xs-6" ng-repeat="tag in publicTags track by $index" ng-if="tag.state != 'special'">
                                        <div class="checkbox">
                                            <label>
                                                <input name="{{tag.slug}}" type="checkbox" 
                                                       checklist-model="dmcproduct.tags" checklist-value="tag" />{{tag.label_en}}
                                            </label>
                                        </div>
                                    </div>
                                    <!-- esto debe ir cada 3 categorias-->
                                    <!-- <div class="clearfix visible-xs-block"></div> -->
                                </div>
                                <div class="row" ng-show="showPreviewEs()">
                                    <div class="col-lg-3 col-md-4 col-xs-6" ng-repeat="tag in publicTags track by $index" ng-if="tag.state != 'special'">
                                        <div class="checkbox">
                                            <label>
                                                <input name="{{tag.slug}}" type="checkbox"
                                                       checklist-model="dmcproduct.tags" checklist-value="tag" />{{tag.label}}
                                            </label>
                                        </div>
                                    </div>
                                    <!-- esto debe ir cada 3 categorias-->
                                    <!-- <div class="clearfix visible-xs-block"></div> -->
                                </div>
                            </div>
                            


                        </div>
                        <footer ng-show="StepSixVisibleButtons">
                            <button ng-click="StepSixCommit()" id="step6button"
                                    type="button" class="btn btn-success btn-lg pull-right">
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
                                    <li class="active"><span>Tag this tour</span></li>
                                    <li><span>Preview</span></li>
                                    <li><span>Save this program</span></li>
                                </ol>
                            </div>

                        </footer>
                      <script type="text/ng-template" id="tagTemplate.html">
                        <a><i class="fa fa-tags"></i>
                            <span bind-html-unsafe="match.label | typeaheadHighlight:query"></span>
                        </a>
                      </script>
                    </form>


                    <!-- ////////////////////// -->
                    <!-- // 6 preview -->
                    <!-- ////////////////////// -->
                    <div ng-show="StepSevenVisible" class="step-load" >

                        <h2><span>6.</span> Preview</h2>
                      <div programpreview=""
                               program="dmcproduct"
                               quote="null"
                               language="autolanguage()"
                               openedit="false"
                               removeedition="true"
                               removebuttons="true"></div>
                        

                      <footer ng-show="StepSevenVisibleButtons">
                            <button 
                            ng-click="StepSevenCommit()"
                            type="button"
                            id="step7button"
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
                                    <li class="active"><span>Tag this tour</span></li>
                                    <li class="active"><span>Preview</span></li>
                                    <li><span>Save this program</span></li>
                                </ol>
                            </div>

                        </footer>
                    </div>


                    <hr ng-show="StepEightVisible" class="hr" id="step8startpoint" />
                    <!-- ////////////////////// -->
                    <!-- // 7 SAVE THIS TOUR -->
                    <!-- ////////////////////// -->
                    <form ng-show="StepEightVisible" class="step-load">
                        <p class="required-label">* required</p>
                        <h2><span>7.</span> Save this tour</h2>
                        <div class="row">
                            <div class="form-group col-md-7">
                                <label class="control-label" for="save-as">Save as <b>*</b></label>
                                <input ng-model="dmcproduct.name" class="form-control" id="save-as" type="text" value="" placeholder="" />

                                <p ng-show="workspaces.length <= 1" class="mt-l">This program don't have categories 
                                <a href="#" class="btn btn-default" ng-click="goAndAddNewCategory()">add categories</a>
                                </p>

                                <p ng-show="workspaces.length > 1" class="mt-l">Categories: <span class="ml-b" ng-repeat="workspace in workspaces"> <a href="#" class="notranslate" ng-click="selectCategory(workspace.id, true)">{{workspace.dmcproduct.categoryname.label_en}}</a></span>
                                </p>                           
                            </div>

                        </div>

                        <footer ng-show="StepEightVisibleButtons">
                            <button type="button" ng-click="StepEightCommitPublish()" id="step8publishbutton" class="btn btn-success btn-lg pull-right">publish</button>
                            <button type="button" ng-click="StepEightCommitUnpublish()" id="step8unpublishbutton" class="btn btn-danger btn-lg pull-right padleft notranslate">unpublish</button>
                            <button type="button" ng-click="StepEightCommitDraft()" id="step8draftbutton" class="btn btn-alt btn-lg pull-right padleft notranslate">draft</button>
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
                                    <li class="active"><span>Tag this tour</span></li>
                                    <li class="active"><span>Preview</span></li>
                                    <li class="active"><span>Save this program</span></li>
                                </ol>
                            </div>

                        </footer>
                    </form>

                </div>
            </section>           
        </section>
    </div>
</div>