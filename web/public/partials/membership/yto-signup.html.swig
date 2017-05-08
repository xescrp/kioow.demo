<div class="container" ng-controller="affiliateSignUpCtrl as signup">
<div class="row">
    <div class="col-md-12">
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
            <h1>Regístrate en nuestro programa de Agencias</h1>
            {# <p>Para más información consulta en <a target="_self" href="/faq/">Preguntas Frecuentes</a>
            </p> #}
        </div>
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
                <p class="required-label">* obligatorio</p>
                <h2 class="mt-b"><span>1.</span> Agencia</h2>
                <article class="row">
                    <div class="col-md-8">
                        <div class="form-group" ng-class="{ 'has-error': signupform.companyname.$invalid }">
                            <label class="control-label" for="companyname"><i class="fa fa-exclamation-circle text-brand-danger"></i>  Nombre de tu Agencia <b>*</b></label>
                            <input class="form-control" name="companyname" id="companyname" type="text" value="" placeholder="ej: Viajes Mundiales ..." ng-model="affiliate.company.name" tabindex="1" required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" ng-class="{ 'has-error': signupform.yearest.$invalid}">
                            <label class="control-label" for="yearest"><i class="fa fa-exclamation-circle text-brand-danger"></i> Año de establecimiento <b>*</b></label>
                            <input class="form-control" id="yearest" name="yearest" type="number" value="" ng-minlength="4" ng-maxlength="4" placeholder="ej: 1985..." ng-model="affiliate.company.constitutionyear" tabindex="2" required>
                        </div>
                    </div>
                </article>

                <article class="row">
                    <div class="col-md-4">
                         <div class="form-group" ng-class="{ 'has-error': signupform.legalname.$invalid}">
                            <label class="control-label" for="legalname"><i class="fa fa-exclamation-circle text-brand-danger"></i>  Nombre legal de la Agencia <b>*</b></label>
                            <input class="form-control" name="legalname" id="legalname" type="text" value="" placeholder="ej: Viajes Mundiales SL ..." ng-model="affiliate.company.legalname" tabindex="3" required>
                        </div>
                    </div>
                    <div class="col-md-4">
                         <div class="form-group" ng-class="{ 'has-error': signupform.agencylic.$invalid}">
                            <label class="control-label" for="agencylic"><i class="fa fa-exclamation-circle text-brand-danger"></i>  Título-licencia de Agencia <b>*</b></label>
                            <input class="form-control" name="agencylic" id="agencylic" type="text" value="" placeholder="CICMA/GC MD/BAL.." ng-model="affiliate.company.agencylic" tabindex="4" required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" ng-class="{ 'has-error': signupform.taxid.$invalid}">
                            <label class="control-label" for="taxid"><i class="fa fa-exclamation-circle text-brand-danger"></i> CIF /  Identificador Fiscal <b>*</b></label>
                            <input class="form-control" id="taxid" name="taxid" type="text" value="" ng-model="affiliate.company.taxid" placeholder="ej: XA453344553" ng-minlength="5" tabindex="5" required>
                        </div>
                    </div>
                </article>

                <article class="row">
                    <div class="form-group col-md-4 no-bottom">
                        <label class="control-label" for="website">Website</label>
                        <input class="form-control" id="website" name="website" 
                               type="text" value="" ng-model="affiliate.company.website" 
                               placeholder="ej: http://www.viajesmundiales.com" tabindex="6">
                        <span class="help-block text-right no-bottom">(opcional)</span>
                    </div>
                     <div class="form-group col-md-4 no-bottom">
                        <label class="control-label" for="group">¿Perteneces a un Grupo de Gestión?</label>
                        <input class="form-control" id="group" name="group" 
                               type="text" value="" ng-model="affiliate.company.group"
                               placeholder="Escribe aquí el nombre del grupo" tabindex="7">
                        <span class="help-block text-right no-bottom">(opcional)</span>
                    </div> 
                    <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.phone.$invalid}">
                            <label class="control-label" for="phone"><i class="fa fa-exclamation-circle text-brand-danger"></i> Teléfono <b>*</b></label>
                            <input class="form-control" id="phone" name="phone" type="text" value="" ng-model="affiliate.company.phone" placeholder="ej: +34 555 555 555" ng-minlength="7" tabindex="8" required>
                    </div>
                    
                </article>
                <hr class="mt-l mb-zero">

                <article class="row">
                    <div class="col-sm-8">
                        <h3>Dirección</h3>
                        <div class="form-group">
                            <label class="control-label" for="searchaddress">Buscar dirección</label>

                            <!--<pre>{{rawlocation | json}}</pre>-->

                            <div class="input-group input-date">
                              <label class="sr-only" for="llegada">Selecciona dirección</label>
                              <input type="text" class="form-control select-city"
                                   ng-model="companyaddress"
                                   placeholder="Escriba su dirección..."
                                   name="searchaddress" id="searchaddress"
                                   ng-autocomplete="autocomplete2.result" details="autocomplete2.details"
                                   options="autocomplete2.options" ng-blur="setCompanyAddress()" tabindex="20">
                              <span class="input-group-btn">
                                <button class="btn btn-alt" ng-click="setCompanyAddress()"> seleccionar </button>
                              </span>
                            </div>
                        </div>
                        <div class="address-box">
                            <div class="form-group col-xs-12" ng-class="{ 'has-error': signupform.fulladdress.$invalid}">
                                <label class="control-label" for="address-street"><i class="fa fa-exclamation-circle text-brand-danger"></i> Dirección <b>*</b></label>
                                <input class="form-control" name="fulladdress" id="fulladdress" type="text" value="" placeholder="ej: calle Mosconi nº 79" ng-model="affiliate.company.location.fulladdress" tabindex="21" required>
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresscity.$invalid}">
                                <label class="control-label" for="addresscity"><i class="fa fa-exclamation-circle text-brand-danger"></i> Ciudad / Población <b>*</b></label>
                                <input class="form-control" id="addresscity" name="addresscity" type="text" value="" placeholder="Nombre de la ciudad o población" ng-model="affiliate.company.location.city" tabindex="22" required>
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addressstate.$invalid}">
                                <label class="control-label" for="addressstate"><i class="fa fa-exclamation-circle text-brand-danger"></i> Provincia <b>*</b></label>
                                <input class="form-control" id="addressstate" name="addressstate" type="text" value="" ng-model="affiliate.company.location.stateorprovince" tabindex="23" placeholder="Provincia" required>
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresspc.$invalid}">
                                <label class="control-label" for="addresspc"><i class="fa fa-exclamation-circle text-brand-danger"></i> Código Postal <b>*</b></label>
                                <input class="form-control" id="addresspc" name="addresspc" type="text" value="" placeholder="Código Postal" ng-model="affiliate.company.location.cp" tabindex="24" required>
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresscountry.$invalid}">
                                <label class="control-label" for="addresscountry"><i class="fa fa-exclamation-circle text-brand-danger"></i> País <b>*</b></label>
                                <input class="form-control input-city select-city"
                                id="addresscountry"
                                name="addresscountry"
                                type="text"
                                value=""
                                tabindex="25"
                                placeholder="País"
                                ng-model="affiliate.company.location.country"
                                uib-typeahead="country.label_es for country in loccountries | filter:{label_es:$viewValue} | limitTo:8"
                                typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html?v={? appversion ?}"
                                typeahead-template-url="/partials/popup/cities-result-item.html?v={? appversion ?}"
                                typeahead-on-select="setCountryAddress($item, $model, $label, $event)"
                                required
                                autocomplete="off">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 hidden">
                        <div id="map-address-dmc"><pre>{{affiliate.company.location | json }}</pre></div>
                    </div>
                </article>

                <hr>
        <!-- ////////////////////// -->
        <!-- // 2 Account -->
        <!-- ////////////////////// -->
                <p class="required-label">* obligatorio</p>
                <h2><span>2.</span> Administrador de Cuenta</h2>

                <article class="row">
                    
                    <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminfname.$invalid}">
                        <label class="control-label" for="adminfname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre <b>*</b></label>
                        <input class="form-control" type="text" id="adminfname" name="adminfname" placeholder="ej: Juan" ng-model="affiliate.contact.firstname" tabindex="30" required>
                    </div>
                    <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminlname.$invalid}">
                        <label class="control-label" for="adminlname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Primer Apellido <b>*</b></label>
                        <input class="form-control" type="text" id="adminlname" name="adminlname" ng-model="affiliate.contact.lastname" placeholder="ej: Gómez"  tabindex="31" required>
                    </div>
                    <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpos.$invalid}">
                        <label class="control-label" for="adminpos"><i class="fa fa-exclamation-circle text-brand-danger"></i> Cargo <b>*</b></label>
                        <input class="form-control" type="text" id="adminpos" name="adminpos" ng-model="affiliate.contact.position" placeholder="ej: Director" tabindex="32" required>
                    </div>
                </article>
                <article>
                    <div class="row">
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminemail.$invalid || showEmailExistError}">
                            <label class="control-label" for="adminemail"><i class="fa fa-exclamation-circle text-brand-danger"></i> Email <b>*</b></label>
                            <input class="form-control" type="email" id="adminemail" name="adminemail" placeholder="ej: email@mail.com" ng-model="affiliate.contact.email" tabindex="33" required>
                        </div>
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpass.$invalid}">
                            <label class="control-label" for="adminpass"><i class="fa fa-exclamation-circle text-brand-danger"></i> Contraseña <b>*</b></label>
                            <input class="form-control" type="password" id="adminpass" name="adminpass" ng-model="theuser.password" tabindex="34" required>
                        </div>
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpass2.$invalid}">
                            <label class="control-label" for="adminpass2"><i class="fa fa-exclamation-circle text-brand-danger"></i> Repita contraseña <b>*</b> <span ng-show="signupform.adminpass2.$error.matchpass">Contraseña no coinciden!</span></label>
                            <input class="form-control" type="password" id="adminpass2" name="adminpass2" tabindex="35" ng-model="theuser.passwordConfirm" matchpass="theuser.password" required />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label" for="adminskype">Skype Id</label>
                            <input class="form-control" type="text" id="adminskype" name="adminskype" ng-model="affiliate.contact.skype" tabindex="36">
                            <p class="help-block text-right">(opcional)</p>
                        </div>
                    </div>
                </article>
                <hr>
                <h2><span>3.</span> Términos y condiciones</h2>
                <article>
                    <div class="form-group no-bottom" ng-class="{'has-error': signupform.termsuse.$invalid && !signupform.termsuse.$pristine}">
                        <div class="checkbox">
                            <label>
                                <input tabindex="40" type="checkbox" name="termsuse" id="termsuse"
                                       ng-model="affiliate.membership.acceptterms" required>
                                        <i class="fa fa-exclamation-circle text-brand-danger" 
                                           ng-show="signupform.termsuse.$invalid">
                                       </i> Acepto las 
 <a ng-class="{'alert-link': signupform.termsuse.$invalid}" href="/pagina/condiciones-yourttoo" target="_blank">Condiciones Generales </a> y <a ng-class="{'alert-link': signupform.termsuse.$invalid}" href="/pagina/aviso-legal-yourttoo" target="_blank">Aviso Legal</a>. <b>*</b>
                            </label>
                        </div>
                    </div>
                </article>
                <hr>
                <footer class="row">
                    <div class="col-sm-10">
                        <p class="alert text-right text-brand-danger"
                           ng-hide="signupform.$valid">los campos con * son obligatorios</p>
                    </div>
                    <div class="col-sm-2">
                        <p class=" text-right">
                            <button type="button" ng-click="feedbackError()"
                                    ng-show="!checkform(signupform.$valid)" class="btn btn-success btn-lg"
                                    tabindex="50">
                                Enviar
                            </button>
                            <button type="button" ng-click="affiliateSigninSubmit()"
                                    ng-show="checkform(signupform.$valid)" class=" btn btn-success btn-lg" ng-disabled="signing"
                                    tabindex="51">
                                Enviar
                            </button>
                        </p>
                    </div>
                </footer>
            </div>
        </form>
    </div>
</section>
</div> 