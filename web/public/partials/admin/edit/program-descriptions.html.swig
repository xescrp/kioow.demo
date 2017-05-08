 <form class="step-load" >

    <fieldset class="main-des-item">
        <!--<legend ng-show="showPreviewEn()">Program: <strong class="notranslate">{{dmcproduct.title}}</strong></legend>
        <legend ng-show="showPreviewEs()">Program: <strong class="notranslate">{{dmcproduct.title_es}}</strong></legend>-->
        <div class="form-group pb-xxl" ng-show="dmcproduct.languages.english">
            <label for="main_description_en" class="control-label">Brief Description (english) </label> <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatemaindescription_es(dmcproduct.description_es)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
            <textarea ng-model="dmcproduct.description_en" class="form-control" rows="7" id="main_description_en" placeholder="Please, this box is only for a turistical brief descrition of this trip..."></textarea>
            <span class="help-block pull-right">(Max 250 char)</span>
        </div>
        <div class="form-group" ng-show="dmcproduct.languages.spanish">
            <label for="main_description_es" class="control-label">Brief Description (spanish) </label> <a ng-show="dmcproduct.languages.english && dmcproduct.languages.spanish" href="" ng-click="translatemaindescription(dmcproduct.description_en)" class="pull-right trans"><i class="fa fa-language"></i> get translation</a>
            <textarea ng-model="dmcproduct.description_es" class="form-control" rows="7" id="main_description_es" placeholder="Por favor, esta caja es solo para una breve descripción turística del viaje..."></textarea>
            <span class="help-block pull-right">(Max 250 char)</span>
        </div>
        
        <div class="row" >
            <div class="col-xs-4">
                <label>Main image<b>*</b></label>
                <div ng-show="mainimageprogress" id="prev-main" class="mainwaitimage">
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
                            <input type="file" ng-hideid="main-image-container" ng-waitingid="prev-main" class="uploadfilebutton btn btn-primary mt-xl" ng-file-select ng-model="dmcproduct.productimage" />
                    </label>
                    <label class="btn btn-primary btn-upload mt-xl" ng-show="showmainimage">
                            <i class="fa fa-cloud-upload"></i> 
                            <span>replace image</span>
                            <input type="file" ng-hideid="main-image-container" ng-waitingid="prev-main" class="replacefilebutton btn btn-danger mt-xl" ng-file-select ng-model="dmcproduct.productimage" />
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

    <input type="file" id="upfile" ng-model="fileup" style="display:none;" /> <!-- onchange="angular.element(this).scope().triggerupload(this)"-->
    
</form>