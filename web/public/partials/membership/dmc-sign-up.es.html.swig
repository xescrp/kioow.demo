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
            <h1>Regístrate como proveedor de openmarket.travel</h1>
            <p>¿Quieres comercializar tu producto en todo el mundo? Regístrate y envía la información de tu empresa.<br />
            <strong>Una vez aprobado, nuestro departamento de producto te enviará un ID para operar.</strong>
            </p>
        </div>
    </div>
    <div class="col-md-2 text-right">
        <a target="_self" href="/suppliers-signup" class="btn btn-link btn-xs mt-xxl">See English Version</a>
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
                <p class="required-label">* requerido</p>
                <h2><span>1.</span> Empresa</h2>
                <article class="row">
                    <div class="col-md-8">
                        <div class="form-group" ng-class="{ 'has-error': signupform.companyname.$invalid }">
                            <label class="control-label" for="companyname"><i class="fa fa-exclamation-circle text-brand-danger"></i>  Nombre de tu Empresa <b>*</b></label>
                            <input class="form-control" name="companyname" id="companyname" type="text" value="" placeholder="ej: openmarket.travel..." ng-model="dmc.company.name" tabindex="1" required />
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': signupform.legalname.$invalid}">
                            <label class="control-label" for="legalname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre Legal de tu Empresa <b>*</b></label>
                            <input class="form-control" name="legalname" id="legalname" type="text" value="" placeholder="ej: Open Market Travel SL..." ng-model="dmc.company.legalname" tabindex="3" required />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" ng-class="{ 'has-error': signupform.yearest.$invalid}">
                            <label class="control-label" for="yearest"><i class="fa fa-exclamation-circle text-brand-danger"></i> Año de establecimiento <b>*</b></label>
                            <input class="form-control" id="yearest" name="yearest" type="text" value="" ng-minlength="4" ng-maxlength="4" placeholder="ej: 1985..." ng-model="dmc.company.constitutionyear" tabindex="2" required />
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': signupform.phone.$invalid}">
                            <label class="control-label" for="phone"><i class="fa fa-exclamation-circle text-brand-danger"></i> Teléfono <b>*</b></label>
                            <input class="form-control" id="phone" name="phone" type="text" value="" ng-model="dmc.company.phone" placeholder="ej: +34 555 555 555" ng-minlength="7" tabindex="4" required />
                        </div>
                    </div>
                </article>

                <article class="row">
                    <div class="form-group col-md-8 no-bottom">
                        <label class="control-label" for="website">Sitio Web</label>
                        <input class="form-control" id="website" name="website" 
                               type="text" value="" ng-model="dmc.company.website" 
                               placeholder="ej: http://www.openmarket.travel" tabindex="6" />
                        <span class="help-block text-right no-bottom">(optional)</span>
                    </div>
                </article>
                <article class="row">
                    <div class="col-sm-8">
                        <h3>Dirección</h3>
                        <div class="form-group">
                            <label class="control-label" for="searchaddress">Buscar Dirección</label>

                            <!--<pre>{{rawlocation | json}}</pre>-->

                            <div class="input-group input-date">
                              <label class="sr-only" for="llegada">Seleccionar dirección</label>
                              <input type="text" class="form-control select-city"
                                   ng-model="companyaddress" placeholder="Escribe vuestra dirección"
                                   name="searchaddress" id="searchaddress"
                                   ng-autocomplete="autocomplete2.result" details="autocomplete2.details"
                                   options="autocomplete2.options" ng-blur="setCompanyAddress()" tabindex="7" />
                              <span class="input-group-btn">
                                <button class="btn btn-alt" ng-click="setCompanyAddress()"> seleccionar </button>
                              </span>
                            </div>

                            <p class="help-block">Geolocalizarse será útil para la búsqueda del cliente.</p>
                        </div>
                        <div class="address-box">
                            <div class="form-group col-xs-12" ng-class="{ 'has-error': signupform.fulladdress.$invalid}">
                                <label class="control-label" for="address-street"><i class="fa fa-exclamation-circle text-brand-danger"></i> Dirección <b>*</b></label>
                                <input class="form-control" name="fulladdress" id="fulladdress" type="text" value="" placeholder="Dirección" ng-model="dmc.company.location.fulladdress" tabindex="8" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresscity.$invalid}">
                                <label class="control-label" for="addresscity"><i class="fa fa-exclamation-circle text-brand-danger"></i> Ciudad / Población <b>*</b></label>
                                <input class="form-control" id="addresscity" name="addresscity" type="text" value="" placeholder="Ciudad / Población" ng-model="dmc.company.location.city" tabindex="9" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addressstate.$invalid}">
                                <label class="control-label" for="addressstate"><i class="fa fa-exclamation-circle text-brand-danger"></i> Comunidad Autónoma <b>*</b></label>
                                <input class="form-control" id="addressstate" name="addressstate" type="text" value="" ng-model="dmc.company.location.stateorprovince" tabindex="10" placeholder="Comunidad Autónoma" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresspc.$invalid}">
                                <label class="control-label" for="addresspc"><i class="fa fa-exclamation-circle text-brand-danger"></i> Código Postal <b>*</b></label>
                                <input class="form-control" id="addresspc" name="addresspc" type="text" value="" placeholder="Código Postal" ng-model="dmc.company.location.cp" tabindex="10" required />
                            </div>
                            <div class="form-group col-sm-6" ng-class="{ 'has-error': signupform.addresscountry.$invalid}">
                                <label class="control-label" for="addresscountry"><i class="fa fa-exclamation-circle text-brand-danger"></i> País <b>*</b></label>
                                <input class="form-control select-input" id="addresscountry" name="addresscountry" type="text" value="" tabindex="11" placeholder="País" ng-model="dmc.company.location.country"
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
                <div ng-class="{ 'has-error': signupform.businesslicense.$invalid}">
                    <div class="checkbox">
                        <label><input type="checkbox" name="businesslicense" ng-model="dmc.additionalinfo.businesslicense" tabindex="12" required /><i class="fa fa-exclamation-circle text-brand-danger" ng-show="signupform.businesslicense.$invalid"></i> Confirmo estar en posesión del título / licencia que me permite operar servicios turísticos.<b>*</b></label>
                    </div>
                </div>
                <div ng-class="{ 'has-error': signupform.notpunished.$invalid}">
                    <div class="checkbox">
                        <label><input type="checkbox" name="notpunished" ng-model="dmc.additionalinfo.notpunished" tabindex="13" required /><i class="fa fa-exclamation-circle text-brand-danger" ng-show="signupform.notpunished.$invalid"></i> No tengo reclamación de la justicia por delitos de incumplimiento de las leyes de mi actividad empresarial.<b>*</b></label>
                    </div>
                </div>
                <div ng-class="{ 'has-error': signupform.paymenttaxes.$invalid}">
                    <div class="checkbox">
                        <label><input type="checkbox" name="paymenttaxes" ng-model="dmc.additionalinfo.paymenttaxes" tabindex="14" required /><i class="fa fa-exclamation-circle text-brand-danger" ng-show="signupform.paymenttaxes.$invalid"></i> Confirmo estar al día en el pago de los impuestos en mi país.<b>*</b></label>
                    </div>
                </div>

                <hr />
                <p class="required-label">* requerido</p>
                <h2><span>2.</span> Información adicional</h2>
                <article>
                    <div class="form-group" ng-class="{ 'has-error': signupform.companydescription.$invalid}">
                        <label class="control-label"><i class="fa fa-exclamation-circle text-brand-danger"></i> Descripción del perfil de la Empresa <b>*</b></label>
                        <textarea class="form-control" rows="7" tabindex="15" name="companydescription" ng-model="dmc.additionalinfo.description" required></textarea>
                        <p class="help-block text-right" ng-class="{true : 'text-brand-danger'} [600 < dmc.additionalinfo.description.length]">Máximo 600 caracteres: <strong>{{600 - dmc.additionalinfo.description.length}} restantes</strong></p>
                    </div>
                </article>
                <hr />
                <article ng-form="operartioncountryfrom">
                    <h3 ng-class="{'has-error' : !dmc.company.operatein.length}">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Destinos de Operación <b class=" text-brand-danger">*</b>
                    </h3>
                    <label class="control-label"><i class="fa fa-exclamation-circle text-brand-danger"></i> ¿En qué destinos operáis? <b>*</b></label>
                    <p ng-show="!dmc.company.operatein.length" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Por favor, seleccione un destino al menos.</p>
                    <ul class="tag-admin" ng-cloak>
                        <li ng-repeat="operateIn in dmc.company.operatein"><a class="label label-default" href="" ng-click="removeDestination($index)">{{operateIn.operateLocation.country}}<span ng-show="operateIn.zone">, {{operateIn.zone}}</span><i class="fa fa-times-circle"></i></a></li>
                    </ul>

                    <form name="adddestinationform">
                        <div class="row">
                            <div class="form-group col-sm-5">
                                <label class="sr-only" for="newdestination">Seleccionar país</label>
                                <input type="text" name="newdestination" class="form-control select-city" 
                                       ng-model="localdestination.newdestination" placeholder="Seleccionar Destino" 
                                       id="select-city" ng-autocomplete="autocomplete.result" 
                                       details="autocomplete.details" options="autocomplete.options" 
                                       tabindex="16" />
                                
                            </div>

                            <div class="form-group col-sm-3">
                                <label class="control-label sr-only" for="newzone">Zona</label>
                                <input class="form-control" ng-model="localdestination.newzone" name="newzone" maxlength="40" type="text" value="" tooltip-animation="false" placeholder="Zona" tooltip-placement="top" tooltip="ej: Toscana, Costa Este, etc." tabindex="17" />
                            </div>
                            <div class="col-sm-4">
                                <button type="button" ng-click="addDestination()" class="btn btn-alt">AGREGAR</button>
                            </div>
                        </div>
                    </form>
                </article>
                <hr />
                <article>
                    <h3 ng-class="{'has-error' : !dmc.tags.length}">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Actividades / Etiquetas <b class=" text-brand-danger">*</b>
                    </h3>

                    <p ng-show="!dmc.tags.length" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Por favor selecciona una actividad. Puedes utilizar tantas etiquetas como sea necesario.</p>
                    <ul class="tag-admin">
                        <!--<li ng-repeat="tag in dmc.tags | filter:tag.check=true"><a class="label label-info" data-ng-click="removeTag($index)" href="">{{tag.label}} <i class="fa fa-times-circle"></i></a></li>-->
                        <li ng-repeat="tag in dmc.tags">
                            <a class="label label-info" data-ng-click="removeTag($index)" href="">
                                {{tag.label}} <i class="fa fa-times-circle"></i>
                            </a>
                        </li>

                    </ul>

                    <div class="alert activities-box" ng-form="activitiesform">
                        <div class="row">
                            <h4 class="col-xs-3">Actividades</h4>
                            <!--<div class="activities-filter col-xs-9">
                                <label class="control-label sr-only">Filter activities</label>
                                <select class="form-control" tabindex="18" ng-model="selectedTagCategories" ng-options="tagCategorie as tagCategorie.label for tagCategorie in content.tagCategories">
                                    <option value="">All</option>
                                </select>
                            </div>-->
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-4 col-xs-6" ng-repeat="tag in tripTags track by $index">
                                <div class="checkbox"><label><input name="{{tag.value}}" type="checkbox" checklist-model="dmc.tags" checklist-value="tag" />{{tag.label}}</label></div>
                            </div>
                            <!-- esto debe ir cada 3 categorias-->
                            <!-- <div class="clearfix visible-xs-block"></div> -->
                        </div>
                    </div>

                </article>
                <article>
                    <h3>Asociaciones (opcional)</h3>
                    <label>¿Pertenece tu empresa a alguna Asociación de Turismo?</label>
                    <div class="alert" ng-repeat="association in dmc.additionalinfo.associations" ng-form="assocForm" novalidate on-last-repeat>

                        <div class="row">

                            <div class="col-sm-11 form-group">
                                <label class="control-label" for="associations"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre de la Asociación </label>
                                <input class="form-control" ng-model="association.name" type="text" value="" placeholder="por favor, incluir el nombre de la asociación." name="association" tabindex="{{20+$index}}" />
                            </div>
                            <div class="col-sm-1">
                            <p class="text-right">
                                <a href="" class="pull-right text-danger" ng-click="deleteAssociation($index)"><i class="fa fa-trash-o fa-lg"></i></a>
                            </p>
                            </div>
                        </div>

                    </div>
                    <a class="action" href="" ng-click="addAssociation()"><i class="fa fa-plus"></i> Añadir otra</a>
                </article>
                <hr />
                <article>
                    <h3>Recomendaciones (opcional)</h3>

                    <div class="alert" ng-repeat="recomender in dmc.additionalinfo.recomenders" ng-form="recomenderForm" novalidate>
                        <div class="row">
                            <div class="form-group col-sm-4">
                                <label class="control-label" for="recomenderName">Nombre </label>
                                <input class="form-control" name="recomenderName" ng-model="recomender.name" type="text" placeholder="ej: tripadvisor" tabindex="{{30+(1*$index)}}" />
                            </div>
                            <div class="form-group col-sm-7">
                                <label class="control-label" for="'recomenderUrl'+$index">URL </label>
                                <input class="form-control" name="'recomenderUrl'+$index" ng-model="recomender.url" type="text" placeholder="ej: http://www.tripadvisor.es/Attraction_Review-g312848-d5317192" tabindex="{{30+(1*$index)+1}}" novalidate />
                            </div>
                            <div class="col-sm-1">
                            <p class="text-right">
                                <a class="text-danger" ng-click="deleteRecommender($index)"><i class="fa fa-trash-o fa-lg"></i></a>
                            </p>
                            </div>
                        </div>

                    </div>
                    <p><a class="action" ng-click="addRecomender()" href=""><i class="fa fa-plus"></i> Añadir otro</a></p>
                </article>
                <hr />
                <p class="required-label">* requerido</p>
                <h2><span>3.</span> Contacto</h2>

                <article class="row">
                    <div class="form-group col-md-2">
                        <label class="control-label" for="admintit">Título</label>
                        <select class="form-control" id="admintit" name="admintit" ng-model="dmc.contact.title" tabindex="40">
                            <option>Sra.</option>
                            <option>Sr.</option>
                        </select>
                    </div>
                    <div class="form-group col-md-5" ng-class="{ 'has-error': signupform.adminfname.$invalid}">
                        <label class="control-label" for="adminfname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre <b>*</b></label>
                        <input class="form-control" type="text" id="adminfname" name="adminfname" ng-model="dmc.contact.firstname" tabindex="41" required />
                    </div>
                    <div class="form-group col-md-5" ng-class="{ 'has-error': signupform.adminlname.$invalid}">
                        <label class="control-label" for="adminlname"><i class="fa fa-exclamation-circle text-brand-danger"></i> Apellidos <b>*</b></label>
                        <input class="form-control" type="text" id="adminlname" name="adminlname" ng-model="dmc.contact.lastname" tabindex="42" required />
                    </div>
                    <div class="form-group col-md-7" ng-class="{ 'has-error': signupform.adminpos.$invalid}">
                        <label class="control-label" for="adminpos"><i class="fa fa-exclamation-circle text-brand-danger"></i> Cargo <b>*</b></label>
                        <input class="form-control" type="text" id="adminpos" name="adminpos" ng-model="dmc.contact.position" tabindex="43" required />
                    </div>
                </article>
                <hr />
                <p class="required-label">* requerido</p>
                <h2><span>4.</span> Login del Administrador</h2>
                <article>
                    <div class="row">
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminemail.$invalid}">
                            <label class="control-label" for="adminemail"><i class="fa fa-exclamation-circle text-brand-danger"></i> Email <b>*</b></label>
                            <input class="form-control" type="email" id="adminemail" name="adminemail" placeholder="email@mail.com" ng-model="dmc.contact.email" tabindex="44" required />
                        </div>
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpass.$invalid}">
                            <label class="control-label" for="adminpass"><i class="fa fa-exclamation-circle text-brand-danger"></i> Contraseña <b>*</b></label>
                            <input class="form-control" type="password" id="adminpass" name="adminpass" ng-model="theuser.password" tabindex="45" required />
                        </div>
                        <div class="form-group col-md-4" ng-class="{ 'has-error': signupform.adminpass2.$invalid}">
                            <label class="control-label" for="adminpass2"><i class="fa fa-exclamation-circle text-brand-danger"></i> Repetir Contraseña <b>*</b> <span ng-show="signupform.adminpass2.$error.match">los campos no coinciden!</span></label>
                            <input class="form-control" type="password" id="adminpass2" name="adminpass2" tabindex="46" ng-model="theuser.passwordConfirm" match="theuser.password" required />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label" for="adminskype">Identificador de Skype</label>
                            <input class="form-control" type="text" id="adminskype" name="adminskype" ng-model="dmc.contact.skype" tabindex="47" />
                            <p class="help-block text-right">(optional)</p>
                        </div>
                    </div>
                </article>
                <hr />
                <p class="required-label">* requerido</p>
                <h2><span>5.</span> Comisión</h2>
                <article>
                    <div class="row">
                        <div class="form-group col-sm-3" ng-class="{ 'has-error': signupform.commission.$invalid}">

                            <label class="control-label" for="commission"><i class="fa fa-exclamation-circle text-brand-danger"></i> Comisión de Openmarket<b>*</b></label>
                            <div class="input-group">
                              <input class="form-control" type="text" id="commission" name="commission" placeholder="00" ng-model="dmc.membership.commission" tabindex="48" required />
                              <span class="input-group-addon" style="border-left: 1px solid">%</span>
                            </div>
                            
                        </div>
                        <div class="col-sm-9">
                            <p class="well">La comisión fijada quedará a la espera de ser aprobada por nuestro equipo. Una vez la hayamos validado, este será el importe a deducir sobre el precio cuando os enviemos los pagos.</p>
                        </div>
                    </div>
                </article>
                <hr />
                <p class="required-label">* requerido</p>
                <h2><span>6.</span> Canal de Ventas</h2>
                <article>
                    <label>Selecciona los canales de venta sobre los que quieres ofrecer vuestros productos <b>*</b></label>
                    <div class="row">

                        <div class="form-group col-sm-4" ng-class="{ 'has-error': invalidchannels}">
                            <div class="checkbox">
                                <label><input tabindex="49" type="checkbox" name="b2cchannel" id="b2cchannel" ng-model="dmc.membership.b2cchannel" ng-change="chekchannel()" /> B2C - Cliente final</label>
                            </div>
                            <div class="checkbox">
                                <label><input tabindex="50" type="checkbox" name="b2bchannel" id="b2bchannel" ng-model="dmc.membership.b2bchannel" ng-change="chekchannel()" /> B2B - Agencia de Viajes</label>
                            </div>
                        </div>
                    </div>

                    <p ng-show="invalidchannels" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Por favor, selecciona un canal de venta almenos</p>
                </article>
                <hr />
                <p class="required-label">* requerido</p>
                <h2><span>7.</span> Tipo de producto</h2>
                <article>
                    <label>Por favor selecciona qué tipo de producto gestionáis <b>*</b></label>
                    <div class="row">

                        <div class="col-sm-4" ng-class="{ 'has-error': invalidproducts}">
                            <div class="checkbox">
                                <label><input tabindex="51" type="checkbox" name="toursmultidays" id="toursmultidays" ng-model="dmc.membership.toursmultidays" ng-change="chekproduct()" /> Tours Multidays</label>
                            </div>
                            <div class="checkbox">
                                <label><input tabindex="52" type="checkbox" name="tailormade" id="tailormade" ng-model="dmc.membership.tailormade" ng-change="chekproduct()" /> Viajes a medida</label>
                            </div>
                             <div class="checkbox">
                                <label><input tabindex="53" type="checkbox" name="groups" id="groups" ng-model="dmc.membership.groups" ng-change="chekproduct()" /> Grupos</label>
                            </div>

                        </div>

                    </div>

                    <p ng-show="invalidproducts" class="alert bg-danger text-danger"><i class="fa fa-exclamation-circle text-brand-danger"></i> Por favor, selecciona almenos un tipo de producto</p>
                </article>
                <hr />
                <h2><span>8.</span> Convenio de Colaboración</h2>
                <article>
                    <div class="form-group no-bottom" ng-class="{'has-error': signupform.termsuse.$invalid}">
                        <div class="checkbox">
                            <label>
                                <input tabindex="54" type="checkbox" name="termsuse" id="termsuse"
                                       ng-model="dmc.membership.acceptterms" required />
                                        <i class="fa fa-exclamation-circle text-brand-danger" 
                                           ng-show="signupform.termsuse.$invalid" >
                                </i> Estoy de acuerdo y acepto las condiciones del <a ng-class="{'alert-link': signupform.termsuse.$invalid}" href="/pagina/contrato-de-suministro-de-servicios-turisticos-y-contenidos" target="_blank">Acuerdo Final de Servicios Turísticos</a>. <b>*</b>
                            </label>
                        </div>
                    </div>
                </article>
                <hr />
                <footer class="row">
                    <div class="col-sm-10">
                        <p class="alert text-right text-brand-danger"
                           ng-hide="signupform.$valid">Los campos con * son requeridos</p>
                    </div>
                    <div class="col-sm-2">
                        <p class=" text-right">
                            <button type="button" ng-click="feedbackError()"
                                    ng-show="!checkform(signupform.$valid)" class="btn btn-success btn-lg"
                                    tabindex="55">
                                ENVIAR
                            </button>
                            <button type="button" ng-click="dmcSigninSubmit()"
                                    ng-show="checkform(signupform.$valid)" class=" btn btn-success btn-lg"
                                    tabindex="55">
                                ENVIAR
                            </button>
                        </p>
                    </div>
                </footer>
            </div>
        </form>
    </div>

</section>

</div> 