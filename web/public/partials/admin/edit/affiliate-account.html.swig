<div class="container mt-xl" ng-controller="AccountCtrl as account">
  <div ng-show="!affiliate.membership.registervalid && !adminRevision" 
       ng-if="readyaccount" ng-include="'/partials/admin/edit/affiliate-account-disabled.html.swig?v={? brand.appversion?}'">
  </div>

  <!-- INIT CONTROL OMT -->
  <div class="row mt-xxl" ng-show="adminRevision">
    <div class="col-md-12 alert alert-info" ng-include="'/partials/admin/edit/omt-header-affiliate-account.html.swig'">
    </div>
  </div>
  <!-- END CONTROL OMT -->

  <div ng-if="affiliate.membership.registervalid || adminRevision">
  <div class="row">
      <div class="col-md-12">
        <ul class="breadcrumb">
          <li>
            <a href="/" target="_self">Inicio</a>
          </li>
          <li>
            <a href="/edit/account?code={{affiliate.code}}&usertype=affiliate" target="_self">{{affiliate.company.name}}</a>
          </li>
          <li class="active">Configuración de cuenta</li>
        </ul>


        <div class="wellcome-dmc" ng-show="!adminRevision">
          <h1 class="mb-xxl">
            <i class="fa fa-smile-o"></i> Bienvenid@ a yourttoo.com<br />
              <small ng-show="menbershipvalid && !adminRevision">
                Tu registro ha sido aprobado.
                <strong class="text-danger">Tu identificador: {{ affiliate.code }}</strong>
              </small>
            </h1>

          <div class="well pt-l" ng-show="!menbershipvalid && !adminRevision">
            <h2 class="lh15 mt-zero">
              Para que tu cuenta sea válida debes rellenar los siguientes campos: 
            </h2>
            <div ng-show="!affiliate.images.logo.url">
              <ul class="list-unstyled">
                <li ng-show="!affiliate.images.logo.url">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#maininfo" class="alert-link">Logo de la agencia y descripción</a>
                  <p>
                    Por favor sube el logo de tu agencia.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <ul class="list-unstyled">
                <li ng-show="!local.fees.unique">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#fees" class="alert-link">Fee Multidays</a>
                  <p>Elige tu comisión para las reservas de programas multidays.</p>
                </li>
                <li ng-show="!local.fees.tailormade">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#fees" class="alert-link">Fee A medida individuales</a>
                  <p>Elige tu comisión para las reservas a medida hasta 14 pasajeros.</p>
                </li>
                <li ng-show="!local.fees.groups">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#fees" class="alert-link">Fee A medida grupos</a>
                  <p>Elige tu comisión para las reservas a medida para grupos de más de 14 pasajeros.</p>
                </li>
                <li ng-show="!local.fees.flights">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#fees" class="alert-link">Fee Aéreos</a>
                  <p>Elige tu comisión para las reservas de vuelos.</p>
                </li>
                <li ng-show="!local.membership.colaborationagree">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#collabagree" class="alert-link">Acuerdo Colaboración</a>
                  <p>Tienes que aceptar las condiciones del contrato de colaboración.</p>
                </li>
                <li ng-show="!hasOwnLogo()">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>
                  <a href="#maininfo" class="alert-link">Logotipo</a>
                  <p>Recuerda adjuntar tu logo para personalizar tus bonos, itinerarios y cartelería.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div class="account-dmc-tit">
          <figure class="">
            <img class="img-dmc-big" ng-src="{{getimage(affiliate.images.logo.url, 'avatar100')}}" />
              <figcaption>{{affiliate.company.name}} logo</figcaption>
            </figure>
          <section>
            <h1>
              {{affiliate.company.name}}  <span>/ Configuración de cuenta</span>
            </h1>
            <ul class="list-inline">
              <li>Su identificador: <span class="label label-default">{{affiliate.code}}</span></li>
            </ul>
          </section>
        </div>

      </div>

    </div>

    <div class="row">

<!--  ///////////// MENU  ///////////// -->


      <aside>
        <h4>
          Menu
        </h4>
        <div class="list-group">
          <a href="#maininfo" ng-click="selectTab('maininfo')" class="list-group-item" ng-class="{ active: isSelected('maininfo') }">Datos Generales</a>
          <a href="#account" ng-click="selectTab('account')" class="list-group-item" ng-class="{ active: isSelected('account') }">Administrador</a>
          <a href="#billing" ng-click="selectTab('billing')" class="list-group-item" ng-class="{ active: isSelected('billing') }">Datos Facturación</a>
          <a href="#fees" ng-click="selectTab('fees')" class="list-group-item" ng-class="{ active: isSelected('fees') }">Fee de reservas</a>
          <a href="#collabagree" ng-click="selectTab('collabagree')" class="list-group-item" ng-class="{ active: isSelected('collabagree') }">Acuerdo de Colaboración</a>
          <a href="#whiteLabel" ng-click="selectTab('whiteLabel')" class="list-group-item" ng-class="{ active: isSelected('whiteLabel') }">Marca Blanca</a>
          <a href="#ytoapijson" ng-click="selectTab('ytoapijson')" class="list-group-item" ng-class="{ active: isSelected('ytoapijson') }">API</a>
        </div>
      </aside>


<!--  ///////////// DATOS GENERALES  ///////////// -->


      <section class="account-settings" ng-show="isSelected('maininfo')">
        <div class="panel-body">
          <form name="maininfoform" novalidate="">
            <h1>
              Datos Generales
            </h1>
            <hr />
            <p class="required-label">
              <span>* obligatorio</span>
            </p>
            <article class="row">
              <div class="form-group col-md-8" ng-class="{ 'has-error': maininfoform.companyname.$invalid }">
                <label class="control-label" for="companyname">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre de tu agencia <b>*</b>
                </label>
                <input class="form-control" name="companyname" ng-model="local.company.name" type="text" ng-minlength="3" placeholder="" required="" />
              </div>

              <div class="form-group col-md-3" ng-class="{ 'has-error': maininfoform.constitutionyear.$invalid }">
                <label class="control-label" for="constitutionyear">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Año de establecimiento <b>*</b>
                </label>
                <input class="form-control" name="constitutionyear" ng-model="local.company.constitutionyear" type="number" placeholder="" ng-minlength="4" required="" />
              </div>
           </article>
           <article class="row">
              <div class="form-group col-md-4">
                <label class="control-label" for="agencylic">
                  Título-licencia Agencia
                </label>
                <span ng-if="!adminRevision">
                <input class="form-control" name="agencylic" ng-model="local.company.agencylic" type="text" disabled />
                    <a href="mailto:agencias@yourttoo.com?cc=notifications@yourttoo.com&amp;subject=Solicitud%20cambio%20Licencia%20de%20Agencia:%20{{local.company.name}}" uib-tooltip="Para modificar el Título-licencia Agencia envianos un correo a agencias@yourttoo.com" tooltip-placement="top" tooltip-trigger="mouseenter">Modificar</a>
                </span>
                <span ng-if="adminRevision">
                 <input class="form-control" name="agencylic" ng-model="local.company.agencylic" type="text" />
                </span>
              </div>
              <div class="form-group col-md-4">
                <label class="control-label" for="group">
                  Grupo de gestión
                </label>
                <span ng-if="!adminRevision">
                <input class="form-control" name="group" ng-model="local.company.group" type="text" disabled />
                    <a href="mailto:agencias@yourttoo.com?cc=notifications@yourttoo.com&amp;subject=Solicitud%20cambio%20Grupo%20de%20Gestión%20Agencia:%20{{local.company.name}}" 
                       uib-tooltip="Para modificar el grupo de gestión envianos un correo a agencias@yourttoo.com" tooltip-placement="top" tooltip-trigger="mouseenter">Modificar</a>
                </span>
                <span ng-if="adminRevision">
                <!-- aqui typeahead
                <pre>{{grouplist | json}}</pre>-->
                <input type="text" name="group" ng-model="local.company.group" uib-typeahead="group.name for group in grouplist | filter:$viewValue | limitTo:8" class="form-control" />
                </span>
              </div>
            </article>
          </form>
          <hr />
          <article id="companyimages">
            <!-- Logo -->
            <div ng-show="!uploadfileitem.showlogo">
              <h3 ng-class="{'has-error' : !affiliate.images.logo.url}">
                <i class="fa fa-exclamation-circle text-brand-danger"></i> Logo de la agencia <b class="text-brand-danger">*</b>
              </h3>
              <div id="load-logo" class="avatarwaitimage" ng-show="false">
                <div class="preloader solo in">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <img class="img-dmc-big" ng-src="{{getimage(affiliate.images.logo.url, 'avatar100')}}" ng-show="affiliate.images.logo.url" id="logo-image-container" />
              <label ng-show="!affiliate.images.logo.url" class="btn btn-upload btn-primary ml-l">
                <i class="fa fa-cloud-upload"></i>
                <span>subir imagen</span>
                <input type="file" ng-waitingid="load-logo" ng-hideid="logo-image-container" ng-file-select="" ng-model="affiliate.images.logo" ng-callback ='updateAccount'/>
              </label>
              <label ng-show="affiliate.images.logo.url" class="btn btn-upload btn-default danger ml-l">
                <i class="fa fa-cloud-upload"></i>
                <span>reemplazar imagen</span>
                <input type="file" ng-waitingid="load-logo" ng-hideid="logo-image-container" ng-file-select="" ng-model="affiliate.images.logo" ng-callback ='updateAccount'/>
              </label>
              <p class="help-block">
                <small>tamaño mínimo 400x400px, .jpg .gif .png</small>
              </p>
            </div>
          </article>
          <hr />
          <p class="required-label">
            <span>* obligarorio</span>
          </p>
          <article class="row">
            <div class="col-md-6">

                <div class="form-group" ng-class="{ 'has-error': contactdetails.phone.$invalid }">
                  <label class="control-label" for="phone">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Número de teléfono fijo <b>*</b>
                  </label>
                  <input class="form-control" name="phone" type="text" ng-model="local.company.phone" placeholder="ex: +34 871 870 296" required="" />
                </div>
                <div class="form-group" ng-class="{ 'has-error': contactdetails.celphone.$invalid }">
                  <label class="control-label" for="celphone">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Número de teléfono móvil
                  </label>
                  <input class="form-control" name="celphone" type="text" ng-model="local.company.celphone" placeholder="ex: +34 871 870 296" required="" />
                </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label" for="website">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>  Web Site
                </label>
                <input class="form-control" name="website" type="text" ng-model="local.company.website" placeholder="ex: http://www.yourttoo.com" />
              </div>
            </div>
          </article>
            <hr />
            <article class="row">
              <div class="col-md-8">
              <form name="address">
                <h3 class="mt-zero">Dirección</h3>
                <label class="control-label" for="address-search">Buscar Dirección</label>
                <div class="input-group input-date">
                <input type="text" class="form-control select-city"
                       ng-model="addressCompanyModel" placeholder="Escriba una dirección"
                       name="searchaddress" id="searchaddress"
                       ng-autocomplete="companyaddress.result" details="companyaddress.details"
                       options="companyaddress.options" name="address-search" ng-blur="setCompanyAddress()" />
                  <span class="input-group-btn">
                    <button class="btn btn-alt" ng-click="setCompanyAddress()"> <i class="fa fa-check"></i> ok </button>
                  </span>
                </div>
                <div class="address-box">
                  <div class="form-group col-xs-12" ng-class="{ 'has-error': contactdetails.fulladdress.$invalid }">
                    <label class="control-label" for="fulladdress">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Dirección <b>*</b>
                    </label>
                    <input class="form-control" name="fulladdress" type="text" ng-model="local.company.location.fulladdress" placeholder="calle, número, piso, etc" required="" />
                  </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.city.$invalid }">
                    <label class="control-label" for="city">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Ciudad / Población <b>*</b>
                    </label>
                    <input class="form-control" name="city" type="text" ng-model="local.company.location.city" placeholder="ciudad o localidad" required="" />
                        </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.stateorprovince.$invalid }">
                    <label class="control-label" for="stateorprovince">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Provincia<b>*</b>
                    </label>
                    <input class="form-control" name="stateorprovince" type="text" ng-model="local.company.location.stateorprovince" placeholder="provincia" required="" />
                  </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.cp.$invalid }">
                    <label class="control-label" for="cp">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Código Postal <b>*</b>
                    </label>
                    <input class="form-control" name="cp" type="text" ng-model="local.company.location.cp" placeholder="código postal" required="" />
                  </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.country.$invalid }">
                    <label class="control-label" for="country">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  País <b>*</b>
                    </label>


                    <!-- new country -->
                    <input class="form-control input-city select-city"
                      id="addresscountry"
                      name="addresscountry"
                      type="text"
                      value="local.company.location.country"
                      tabindex="25"
                      placeholder="País"
                      ng-model="local.company.location.country"
                      uib-typeahead="country.label_es for country in loccountries | filter:{label_es:$viewValue} | limitTo:8"
                      typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html?v={? appversion ?}"
                      typeahead-template-url="/partials/popup/cities-result-item.html?v={? appversion ?}"
                      typeahead-on-select="setCountryAddress($item, $model, $label, $event)"
                      required
                      autocomplete="off" />

                  </div>

                </div>
              </form>
            </div>
            <div class="col-md-4">

              <div id="map-address-dmc"></div>
            </div>
            </article>
            <hr />
          <p class="text-right"><button class="btn btn-primary btn-lg" ng-click="updateMainInfo()">Guardar</button></p>
        </div>
      </section>




<!--  ///////////// ADMINISTRADOR  ///////////// -->

      <section class="account-settings" id="account" ng-show="isSelected('account')">
        <div class="panel-body">
          <h1>
            Administrador
          </h1>
          <hr />
          <form name="administrator">
            <h3>Detalles de Administrador</h3>
            <article class="row">
              <div class="form-group col-md-4" ng-class="{ 'has-error': administrator.contactname.$invalid }">
                <label class="control-label" for="contactname">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre <b>*</b>
                </label>
                <input class="form-control" type="text" name="contactname" ng-model="local.contact.firstname" required="" />
                    </div>
              <div class="form-group col-md-4" ng-class="{ 'has-error': administrator.contactlast.$invalid }">
                <label class="control-label" for="contactlast">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Primer Apellido <b>*</b>
                </label>
                <input class="form-control" type="text" name="contactlast" ng-model="local.contact.lastname" required="" />
                    </div>
              <div class="form-group col-md-4" ng-class="{ 'has-error': administrator.contactpos.$invalid }">
                <label class="control-label" for="contactpos">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Cargo <b>*</b>
                </label>
                <input class="form-control" type="text" name="contactpos" ng-model="local.contact.position" required="" />
                    </div>
            </article>
          </form>
          <hr />
          <h3>Datos de identificación</h3>
          <article>
            <div class="row">
              <div class="col-md-6">
                <label class="control-label" for="useremail">Email</label>
                <input class="form-control" type="email" name="useremail" placeholder="tu email" ng-model="affiliate.user.email" disabled="" />
                <p>
                  <a class="change-link" href="" ng-click="changeEmail = true" ng-init="changeEmail = false" ng-hide="changeEmail">Cambiar email</a>
                </p>
                <div class="alert" ng-show="changeEmail">
                  <form novalidate="" name="adminlogin">
                    <div class="alert alert-danger" ng-show="passdont">
                      <p>
                        <i class="fa fa-exclamation-circle fa-lg">
                        </i> Error contraseña no válida.
                      </p>
                    </div>
                    <div class="form-group" ng-class="{ 'has-error': adminlogin.usernewemail.$invalid }">
                      <label class="control-label" for="usernewemail">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Nuevo Correo<b>*</b>
                      </label>
                      <input class="form-control" type="email" name="usernewemail"
                             ng-model="theuser.newEmail" placeholder="tu nuevo correo" required="" />
                      </div>
                    <div class="form-group">
                      <label class="control-label">
                        <i class="fa fa-exclamation-circle text-brand-danger">
                        </i>  Para este cambio es necesario volver a acceder. <b>*</b>
                      </label>
                    </div>
                    <p class="text-right">
                      <button class="btn btn-default" ng-click="changeEmail = false">Cancelar</button>
                      <button ng-click="changeuseremail()" class="btn btn-default danger">Cambiar Email</button>
                    </p>
                  </form>
                </div>
                <div class="form-group">
                  <label class="control-label" for="admin-skype">Skype </label>
                  <input class="form-control" type="text" id="admin-skype" ng-model="local.contact.skype" />
                  <p class="text-right italic text-help">(opcional)</p>
                </div>
              </div>

              <div class="col-md-6">
                <form name="changepassword" novalidate="">
                  <label class="control-label">Contraseña</label>
                  <input class="form-control" type="password" name="falsepass" value="password" disabled="" />
                  <p>
                    <a href="" ng-click="changepass = true" ng-init="changepass = false" ng-hide="changepass">Cambiar Contraseña</a>
                  </p>
                  <div class="alert" ng-show="changepass">
                    <div class="form-group" ng-class="{ 'has-error': changepassword.oldpass.$invalid }">
                      <label class="control-label" for="oldpass">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i> Contraseña antigua <b>*</b>
                      </label>
                      <input class="form-control" type="password" name="oldpass"
                             id="oldpass"
                             ng-model="newpasswordstuff.oldpassword" /> 
                      </div>
                    <div class="form-group">
                      <label class="control-label" for="pass1">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i>  Nueva Contraseña <b>*</b>
                      </label>
                      <input ng-model="newpasswordstuff.newpassword" class="form-control"
                             type="password" ng-required="" id="pass1" name="pass1" />
                      </div>
                    <div class="form-group">
                      <label class="control-label" for="pass2">
                        <i class="fa fa-exclamation-circle text-brand-danger"></i>  Repetir la nueva contraseña <b>*</b>
                      </label>
                      <input ng-model="newpasswordstuff.repeatpassword" class="form-control" type="password"
                             ng-required="" id="pass2" name="pass2" pw-check="pass1" />
                      </div>
                    <span class="msg-error" ng-show="administrator.pass2.$error.pwmatch">Contraseñas no coinciden.</span>
                    <div class="form-group">
                      <label class="control-label">
                        <i class="fa fa-exclamation-circle text-brand-danger">
                        </i>  Para este cambio es necesario volver a acceder. <b>*</b>
                      </label>
                    </div>
                    <p class="text-right">
                      <button class="btn btn-default" ng-click="changepass = false">Cancelar</button>
                      <button ng-click="changeuserpassword()" class="btn btn-default danger">Cambiar Contraseña</button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </article>
          <hr />
          <article>
            <h3>Notificaciones</h3>
            <div class="row">
              <div class=" col-md-6">
                <div class="form-group">
                  <label class="control-label" for="bookingContact">Email para reservas y tramitación a medida:</label>
                  <input class="form-control"  type="text" name="bookingContact" ng-model="local.contact.bookingContact.email" multiple-emails />
                </div>
                <div class="form-group" >
                  <label class="control-label" for="marketingContact">Email de comercial y marketing:</label>
                  <input class="form-control" type="text" name="marketingContact" ng-model="local.contact.marketingContact.email" multiple-emails />
                </div>
              </div>
            </div>
          </article>
            <hr />
            <p class="text-right">
              <button class="btn btn-primary btn-lg" ng-click="updateContact()">Guardar</button>
            </p>
        </div>
      </section>


<!--  ///////////// DATOS DE FACTURACIÓN  ///////////// -->


      <section class="account-settings" id="billing" ng-show="isSelected('billing')">
        <div class="panel-body">
          <h1>
            Datos de facturación
          </h1>
          <hr />
          <p class="required-label">
            <span>* obligatorio</span>
          </p>
          <article class="row">
            <div class="col-md-6">
              <div class="form-group" ng-class="{ 'has-error': contactdetails.legalname.$invalid }">
                <label class="control-label" for="legalname">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre legal de la empresa <b>*</b>
                </label>
                  <span ng-if="!adminRevision">
                    <input class="form-control" name="legalname" type="text" ng-model="local.company.legalname" placeholder="nombre legal de la empresa" disabled />
                    <a href="mailto:agencias@yourttoo.com?cc=notifications@yourttoo.com&amp;subject=Solicitud%20cambio%20Nombre%20Legal%20de%20Agencia:%20{{local.company.name}}" uib-tooltip="Para modificar el Nombre legal de la empresa envianos un correo a agencias@yourttoo.com" tooltip-placement="top" tooltip-trigger="mouseenter">Modificar</a>
                  </span>
                  <span ng-if="adminRevision">
                    <input class="form-control" name="legalname" type="text" ng-model="local.company.legalname" placeholder="nombre legal de la empresa" />
                  </span>
                    <p class="help-block">Nombre que figurará en la factura</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" ng-class="{ 'has-error': contactdetails.taxid.$invalid }">
                  <label class="control-label" for="taxid">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Identificador Fiscal <b>*</b>
                  </label>
                  <span ng-if="!adminRevision">
                  <input class="form-control" name="taxid" type="text" ng-model="local.company.taxid" placeholder="Tu identificador fiscal" disabled />
                    <a href="mailto:agencias@yourttoo.com?cc=notifications@yourttoo.com&amp;subject=Solicitud%20cambio%20identificador%20fiscal%20de%20Agencia:%20{{local.company.name}}" uib-tooltip="Para modificar el identificador fiscal que figurará en la factura envianos un correo a agencias@yourttoo.com" tooltip-placement="top" tooltip-trigger="mouseenter">Modificar</a>
                  </span>
                  <span ng-if="adminRevision">
                  <input class="form-control" name="taxid" type="text" ng-model="local.company.taxid" placeholder="Tu identificador fiscal" />
                  </span>
                    <p class="help-block">Identificador fiscal que figurará en la factura</p>
                </div>

              </div>
            </article>

            <hr />
            <article class="row">
              <div class="col-md-9">
              <form name="paymentaddr">
                <h3 class="mt-zero">Dirección</h3>
                <label class="control-label" for="address-search">Buscar Dirección</label>
                <div class="input-group input-date">
                <input type="text"
                       class="form-control select-city"
                       ng-model="addressPaymentModel"
                       placeholder="Escriba una dirección"
                       name="searchpaymentaddress"
                       id="searchpaymentaddress"
                       ng-autocomplete="paymentaddress.result"
                       details="paymentaddress.details"
                       options="paymentaddress.options"
                       ng-blur="setPaymentAddress()" />
                  <span class="input-group-btn">
                    <button class="btn btn-alt" ng-click="setPaymentAddress()"> <i class="fa fa-check"></i> ok </button>
                  </span>
                </div>
                <div class="address-box">
                  <div class="form-group col-xs-12" ng-class="{ 'has-error': contactdetails.fulladdress.$invalid }">
                    <label class="control-label" for="fulladdress">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Calle <b>*</b>
                    </label>
                    <input class="form-control" name="fulladdress" type="text" ng-model="local.contact.paymentContact.location.fulladdress" placeholder="calle, número, piso, etc" required="" />
                  </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.city.$invalid }">
                    <label class="control-label" for="city">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Ciudad / Población <b>*</b>
                    </label>
                    <input class="form-control" name="city" type="text" ng-model="local.contact.paymentContact.location.city" placeholder="ciudad o localidad" required="" /></div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.stateorprovince.$invalid }">
                    <label class="control-label" for="stateorprovince">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Provincia <b>*</b>
                    </label>
                    <input class="form-control" name="stateorprovince" type="text" ng-model="local.contact.paymentContact.location.stateorprovince" placeholder="provincia" required="" />
                  </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.cp.$invalid }">
                    <label class="control-label" for="cp">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  Código Postal <b>*</b>
                    </label>
                    <input class="form-control" name="cp" type="text" ng-model="local.contact.paymentContact.location.cp" placeholder="código postal" required="" />
                  </div>
                  <div class="form-group col-xs-6" ng-class="{ 'has-error': contactdetails.country.$invalid }">
                    <label class="control-label" for="country">
                      <i class="fa fa-exclamation-circle text-brand-danger"></i>  País <b>*</b>
                    </label>

                    <!-- new country -->
                    <input class="form-control input-city select-city"
                    id="paymentcountry"
                    name="paymentcountry"
                    type="text"
                    value="local.contact.paymentContact.location.country"
                    tabindex="25"
                    placeholder="País"
                    ng-model="local.contact.paymentContact.location.country"
                    uib-typeahead="country.label_es for country in loccountries | filter:{label_es:$viewValue} | limitTo:8"
                    typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html?v={? appversion ?}"
                    typeahead-template-url="/partials/popup/cities-result-item.html?v={? appversion ?}"
                    typeahead-on-select="setCountryAddress($item, $model, $label, $event)"
                    required
                    autocomplete="off" />

                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-3">
              <div id="map-address-dmc"></div>
            </div>

            </article>
            <hr />
            <h3>Persona de contacto para facturación</h3>
            <article class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label" for="paymentContactFirstname">Nombre:</label>
                  <input class="form-control" type="text" name="paymentContactFirstname" ng-model="local.contact.paymentContact.firstname" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label" for="paymentContactlastname">Primer Apellido:</label>
                  <input class="form-control" type="text" name="paymentContactlastname" ng-model="local.contact.paymentContact.lastname" />
                </div>
              </div>
              <div class="col-md-4">
                 <div class="form-group">
                  <label class="control-label" for="paymentContactPhone">Teléfono:</label>
                  <input class="form-control" type="text" name="paymentContactPhone" ng-model="local.contact.paymentContact.phone" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label" for="paymentContactEmail">Email:</label>
                  <input class="form-control" type="email" name="paymentContactEmail" ng-model="local.contact.paymentContact.email" />
                </div>
              </div>
            </article>
            <hr />
            <p class="text-right"><button class="btn btn-primary btn-lg" ng-click="updateBilling()">Guardar</button></p>

        </div>
      </section>

<!--  ///////////// FEE DE RESERVAS  ///////////// -->


      <section class="account-settings" id="fees" ng-show="isSelected('fees')">
        <div class="panel-body">
          <h1>
            Fee de reservas
          </h1>
          <form name="commisions" novalidate="">
            <hr />
              <div class="row">
                <div class="form-horizontal">
                  <div class="form-group" ng-class="{'has-error' : !local.fees.unique}">
                    <label class="col-md-offset-3 col-sm-2 control-label h4-sized mt-b" for="uniquefee">Multidays <b>*</b></label>
                    <div class="col-sm-3 mt-xs">
                      <div class="input-group">
                        <input class="form-control input-lg" ng-model="local.fees.unique" name="uniquefee" id="uniquefee" placeholder="0" type="text" required="" />
                        <span class="input-group-addon" style="border-left: 1px solid">%</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" ng-class="{'has-error' : !local.fees.tailormade}">
                    <label class="col-md-offset-1 col-sm-4 control-label h4-sized" for="tailorfee">A medida Individuales<br /><small>
                      (hasta 14 pasajeros)</small><b>*</b></label>
                    <div class="col-sm-3 mt-xs">
                      <div class="input-group">
                        <input class="form-control input-lg" ng-model="local.fees.tailormade" name="tailorfee" id="tailorfee" placeholder="0" type="text" required="" />
                        <span class="input-group-addon" style="border-left: 1px solid">%</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" ng-class="{'has-error' : !local.fees.groups}">
                    <label class="col-md-offset-1 col-sm-4 control-label h4-sized" for="groupfee">A medida Grupos<br />
                      <small>(más de 14 pasajeros)</small> <b>*</b></label>
                    <div class="col-sm-3 mt-xs">
                      <div class="input-group">
                        <input class="form-control input-lg" ng-model="local.fees.groups" name="groupfee" id="groupfee" placeholder="0" type="text" required="" />
                        <span class="input-group-addon" style="border-left: 1px solid">%</span>
                      </div>
                    </div>
                  </div>

                  <div class="form-group" ng-class="{'has-error' : !local.fees.flights}">
                  <label class="col-md-offset-3 col-sm-2 control-label h4-sized" for="flightsfee">Aéreos <br><small>(en proceso)</small><b>*</b></label>
                    <div class="col-sm-3 mt-xs">
                      <div class="input-group">
                        <input class="form-control input-lg" ng-model="local.fees.flights" name="flightsfee" id="flightsfee" placeholder="0" type="text" required="" />
                        <span class="input-group-addon" style="border-left: 1px solid">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-center">Recuerda que durante el proceso de reserva o una vez realizada también podrás modificar el fee.<br>
              <a href="/faq/25-el-precio" target="_blank" class="link-faq-price">Construcción de Precios</a></p>

              <hr />
              <p class="text-right"><button class="btn btn-primary btn-lg" ng-click="updateFees()">Guardar</button></p>
          </form>
        </div>
      </section>



<!--  ///////////// ACUERDO DE COLABORACION  ///////////// -->



      <section class="account-settings" id="collaborationagreement" ng-show="isSelected('collabagree')">
        <div class="panel-body">
          <h1>
            Acuerdo de Colaboración
          </h1>
          <hr />
          <h3>Confirma Contrato de Colaboración con yourttoo.com</h3>
          <form name="acceptconditions" novalidate="">
            <div class="form-group" ng-class="{'has-error': acceptconditions.termconfirm.$invalid}">
            <div class="checkbox">
               <label>
                <input type="checkbox" name="termconfirm" id="termconfirm" ng-model="local.membership.colaborationagree" required="" ng-disabled="affiliate.membership.colaborationagree" />
                <i class="fa fa-exclamation-circle text-brand-danger" ng-show="acceptconditions.termconfirm.$invalid"></i> <span class="text-graydark">Estoy de acuerdo y acepto las condiciones del</span> <a ng-class="{'alert-link': acceptconditions.termconfirm.$invalid}" href="/pagina/contrato-de-colaboracion" target="_blank" class="alert-link">Contrato de colaboración</a>. <b>*</b>
                </label>
              </div>
              <hr />
              <h3>Muestra del Contrato de viaje Combinado</h3>
              <p> Descarga muestra del <a target="_blank" href="/pdfs/contract-yto-example.pdf">Contrato de Viajes Combinado</a> de tus reservas.</p>
              <hr />
              <p class="text-right">
                <button class="btn btn-primary btn-lg" ng-click="updateColaboration()">Guardar</button>
              </p>
            </div>
          </form>
        </div>
      </section>

      <!--  ///////////// MARCA BLANCA ///////////// -->

      <section class="account-settings" id="whiteLabel" ng-show="isSelected('whiteLabel')">
        <div class="panel-body">
          <h1> Marca Blanca</h1>
          <blockquote>
            <p style="font-size: 14px"> Elige plantilla para crear tu web estándar o selecciona tu mismo los colores disponibles. </p>
            <p style="font-size: 14px"> Si también quieres personalizar cabecera y pie, inserta tu html en el punto 5 y 6 respectivamente </p>
          </blockquote>
          <h4>
            <a href="http://yourttoo.com/pdfs/tutorial-marca-blanca.pdf" target="_blank">Descarga tutorial Marca Blanca</a>
          </h4>
          <hr/>
          <form name="whiteLabelSlug">
            <h3> <span>1.</span> Elige tu subdominio </h3>
            <blockquote>
              <p style="font-size: 14px"> El nombre que escribas en la caja de texto, sera el primer dato que aparezca en la url. ej: viajesprueba.travelersense.com.*</p>
            </blockquote>
            <article class="row">
              <div class="form-group col-md-12" ng-class="{ 'has-error': !slugIsValid }">
                <label class="control-label" for="slug">
                  <i class="fa fa-exclamation-circle text-brand-danger"></i>  Subdominio: <b>*</b>
                </label>
                <div>
                  <input class="form-control slug-form" type="text" name="slug" ng-model="affiliate.slug" ng-trim="false" ng-change="sanitizeSlug()" ng-blur="slugHasBlurred()" required="" />
                  <span><a class="btn btn-success mt-l" ng-href="{{ 'http://' + originalSlug + '.travelersense.es?rnw=true' }}" target="_blank">Visualiza tu web  ({{ originalSlug }}.travelersense.es)</a></span>
                </div>
              </div>
            </article>
          </form>
          <form name="whiteLabelLogo">
            <h3>
              <span>2.</span> Logo de la agencia para marca blanca
              <article id="wlimages" class="row">
                <!-- Logo -->
                <div ng-show="!uploadfileitem.showlogo">
                  <div id="load-logo" class="brand-logo" ng-show="false">
                    <div class="preloader solo in">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <img style="max-height:42px;" ng-src="{{affiliate.images.splash.url}}" ng-show="affiliate.images.splash.url" id="logo-image-container" />
                  <label ng-show="!affiliate.images.splash.url" class="btn btn-upload btn-primary ml-l">
                    <i class="fa fa-cloud-upload"></i>
                    <span>subir imagen</span>
                    <input type="file" ng-waitingid="load-logo" ng-hideid="logo-image-container" ng-file-select="" ng-model="affiliate.images.splash" ng-callback="updateAccount"/>
                  </label>
                  <label ng-show="affiliate.images.logo.url" class="btn btn-upload btn-default danger ml-l">
                    <i class="fa fa-cloud-upload"></i>
                    <span>reemplazar imagen</span>
                    <input type="file" ng-waitingid="load-logo" ng-hideid="logo-image-container" ng-file-select="" ng-model="affiliate.images.splash" ng-callback="updateAccount"/>
                  </label>
                  <p class="help-block">
                    <small>tamaño recomendado 228x42px (min/max height: 42px), .jpg .gif .png</small>
                  </p>
                </div>
              </article>
            </h3>
          </form>
          <form name="whiteLabelType">
            <h3> <span>3.</span> Selecciona plantillas</h3>
            <blockquote>
              <p style="font-size: 14px"> Para visualizar tu web haz click en el boton "Visualiza tu web" del paso 1.*</p>
            </blockquote>
            <article class="row">
              <div class="form-group col-md-6" ng-class="{ 'has-error': whiteLabel.header.$invalid }">
                <label for="backgroundColor">Estándar</label>
                <input type="radio" ng-model="templateType" value="standard" ng-change="previewOptionChanged()" />
              </div>
              <div class="form-group col-md-6" ng-class="{ 'has-error': whiteLabel.searchBarColors.$invalid }">
                <label for="backgroundColor">Personalizada</label>
                <input type="radio" ng-model="templateType" value="custom" ng-change="onColorChange()" />
              </div>
            </article>
            <article class="row">
              <div class="col-md-12">
                <white-label-preview colors="local.wlcustom.css" code="{{ affiliate.slug }}"></white-label-preview>
              </div>
            </article>
          </form>
          <hr ng-show="templateType == 'custom'" />
          <form name="whiteLabelCustomization" ng-show="templateType == 'custom'">
            <h3> <span>4.</span> Selecciona los colores</h3>
            <blockquote>
              <p style="font-size: 14px"> Puedes elegirlos directamente en la muestra o introduciendo la referencia del color</p>
            </blockquote>
            <article class="row">
              <div class="form-group col-md-4" ng-class="{ 'has-error': whiteLabel.css.brand_background.$invalid }">
                <label for="backgroundColor">Fondo de página</label>
                <color-picker ng-model="local.wlcustom.css.brand_background"
                              color-picker-format="'hex'"
                              color-picker-on-change="onColorChange()">
                </color-picker>
              </div>
              <div class="form-group col-md-4" ng-class="{ 'has-error': whiteLabel.css.brand_alternate.$invalid }">
                <label for="backgroundColor">Barra de búsqueda y títulos</label>
                <color-picker ng-model="local.wlcustom.css.brand_alternate"
                              color-picker-format="'hex'"
                              color-picker-on-change="onColorChange()">
                </color-picker>
              </div>
              <div class="form-group col-md-4" ng-class="{ 'has-error': whiteLabel.css.brand_info.$invalid }">
                <label for="backgroundColor">Botones principales</label>
                <color-picker ng-model="local.wlcustom.css.brand_danger"
                              color-picker-format="'hex'"
                              color-picker-on-change="onColorChange()">
                </color-picker>
              </div>
            </article>
          </form>
          <hr ng-show="templateType == 'custom'" />
          <form name="whiteLabelHeader" ng-show="templateType == 'custom'">
            <h3> <span>5.</span> Personaliza tu cabecera</h3>
            <blockquote>
              <p style="font-size: 14px"> Crea un archivo de cabecera para personalizar tu web.</p>
            </blockquote>
            <article class="row">
              <div class="form-group col-md-5">
                <div id="load-header" class="brand-logo" ng-show="false">
                  <div class="preloader solo in">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <label class="btn btn-upload btn-primary ml-l" style="width:100%">
                  <i class="fa fa-cloud-upload"></i>
                  <span>subir archivo de cabecera</span>
                  <input type="file" ng-waitingid="load-header" ng-hideid="logo-image-container" ng-file-select="" 
                         ng-file-type="document" ng-additional-data="whitelabel/header" accept=".html"
                         ng-model="local.wlcustom.web.header" ng-callback ='updateAccount'/>
                </label>
              </div>
              <div class="col-md-1"></div>
              <div class="form-group col-md-6">
                <a href="/download/whitelabel/headerfile" target="_self" class=""> Descarga tu archivo</a>
                <p class="help-block">
                  <small> (header.html)</small>
                </p>
              </div>
              <!--<div class="form-group col-md-12" ng-class="{ 'has-error': whiteLabel.web.header.$invalid }">
                <textarea rows="5" class="form-control" ng-model="local.wlcustom.web.header"></textarea>
              </div>-->
            </article>
          </form>
          <hr ng-show="templateType == 'custom'" />
          <form name="whiteLabelFooter" ng-show="templateType == 'custom'">
            <h3> <span>6.</span> Personaliza tu pie de página</h3>
            <blockquote>
              <p style="font-size: 14px"> Crea un archivo de pie de pagina para personalizar tu web.</p>
            </blockquote>
            <article class="row">
              <div class="form-group col-md-5">
                <div id="load-footer" class="brand-logo" ng-show="false">
                  <div class="preloader solo in">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <label class="btn btn-upload btn-primary ml-l" style="width:100%">
                  <i class="fa fa-cloud-upload"></i>
                  <span>subir archivo de pie de pagina</span>
                  <input type="file" ng-waitingid="load-footer" ng-hideid="logo-image-container" ng-file-select=""
                         ng-file-type="document" ng-additional-data="whitelabel/footer" accept=".html"
                         ng-model="local.wlcustom.web.footer" ng-callback ='updateAccount'/>
                </label>
              </div>
              <div class="col-md-1"></div>
              <div class="form-group col-md-6">
                <a href="/download/whitelabel/footerfile" target="_self" class=""> Descarga tu archivo</a>
                <p class="help-block">
                  <small> (footer.html)</small>
                </p>
              </div>
              
              <!--<div class="form-group col-md-12" ng-class="{ 'has-error': whiteLabel.web.footer.$invalid }">
                <textarea rows="5" class="form-control" ng-model="local.wlcustom.web.footer"></textarea>
              </div>-->
            </article>
          </form>
          <hr />
          <form name="whiteLabelBankInfo">
            <h3> <span ng-show="templateType == 'custom'">7.</span> <span ng-show="templateType != 'custom'">4.</span> Datos bancarios para el reintegro de comisiones:</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.beneficiary.$invalid }">
                  <label class="control-label" for="beneficiary">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Beneficiario: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="beneficiary" ng-model="affiliate.bankinfo.beneficiary" required="" />
                </div>
                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.iban.$invalid }">
                  <label class="control-label" for="iban">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  IBAN: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="iban" ng-model="affiliate.bankinfo.iban" required="" />
                </div>
                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.accountnumber.$invalid }">
                  <label class="control-label" for="accountnumber">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i> Número de cuenta: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="accountnumber" ng-model="affiliate.bankinfo.accountnumber" required="" />
                </div>
                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.bankname.$invalid }">
                  <label class="control-label" for="bankname">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Nombre del banco: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="bankname" ng-model="affiliate.bankinfo.bankname" required="" />
                </div>

                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.bic.$invalid }">
                  <label class="control-label" for="bic">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  BIC (Swift): <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="bic" ng-model="affiliate.bankinfo.bic" required="" />
                </div>

                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.bankaddress.$invalid }">
                  <label class="control-label" for="bankaddress">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Dirección del banco: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="bankaddress" ng-model="affiliate.bankinfo.bankaddress" required="" />
                </div>

                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.bankzip.$invalid }">
                  <label class="control-label" for="bankzip">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i> Código Postal: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="bankzip" ng-model="affiliate.bankinfo.bankzip" required="" />
                </div>

                <div class="form-group" ng-class="{ 'has-error': local.whiteLabel.bankinfo.bankcity.$invalid }">
                  <label class="control-label" for="bankcity">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  Ciudad: <b>*</b>
                  </label>
                  <input class="form-control" type="text" name="bankcity" ng-model="affiliate.bankinfo.bankcity" required="" />
                </div>


                <div class="form-group">
                  <label class="control-label" for="bankcountry">
                    <i class="fa fa-exclamation-circle text-brand-danger"></i>  País: <b>*</b>
                  </label>

                  <select class="form-control" name="bankcountry" ng-options="country as country.label for country in content.bankcountries track by country.label" ng-model="affiliate.bankinfo.bankcountry" required="">
                    <option value=""> - select country -</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <hr />
          <form name="acceptconditions" novalidate="" class="ng-pristine ng-valid ng-valid-required">
            <h3> <span ng-show="templateType == 'custom'">8.</span> <span ng-show="templateType != 'custom'">5.</span> Confirma Contrato de Colaboración con yourttoo.com</h3>
            <div class="form-group" ng-class="{'has-error': acceptconditions.termconfirm.$invalid}">
              <div class="checkbox">
                <label>
                  <input type="checkbox"
                         name="wlcollaborationagree"
                         id="affiliate.membership.wlcollaborationagree"
                         ng-model="affiliate.membership.wlcollaborationagree"
                         required=""
                         ng-disabled="affiliate.membership.wlcollaborationagree"
                         class="ng-pristine ng-untouched ng-valid ng-valid-required"/>
                  <i class="fa fa-exclamation-circle text-brand-danger ng-hide"
                     ng-show="affiliate.membership.wlcollaborationagree.$invalid"></i>
                  <span class="text-graydark">Estoy de acuerdo y acepto las condiciones del</span>
                  <a ng-class="{'alert-link': affiliate.membership.wlcollaborationagree.$invalid}"
                     href="/pagina/contrato-colaboracion-marca-blanca"
                     target="_blank"
                     class="alert-link">Contrato de colaboración</a>. <b>*</b>
                </label>
              </div>
            </div>
          </form>
          <p class="text-right"><button class="btn btn-primary btn-lg" ng-click="updateWhiteLabel(templateType)">Guardar</button></p>
        </div>
      </section>
      
      
      <!-- API JSON -->
      <section class="account-settings" id="ytoapijson" ng-show="isSelected('ytoapijson')">
        <div class="panel-body">
          <h1>
            API
          </h1>
          <h3>Documentacion y credenciales para uso de API yourttoo.com</h3>
          <br />
          <h4>Documentacion: <a href="/apidocs" target="_blank"> Accede a la documentacion del api aqui</a></h4>
          <br />
          <form name="xmljsonapiform" novalidate="">

            <h4>Datos de acceso a la API</h4>
            <div class="row">
              <div class="col-md-6">
                <label>
                  <strong>userid: </strong>
                </label> {{ affiliate.user._id }}
              </div>
              <div class="col-md-6">
                <label>
                  <strong>apikey: </strong>
                </label> {{ affiliate.user.apikey }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label>
                  <strong>access token: </strong> {{ session.accessToken }}
                </label>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <p>
                  API URL para testing: <a href="https://apitest.yourttoo.com/">https://apitest.yourttoo.com/</a>
                </p>
                <p ng-if="false">
                  API URL para produccion: <a href="https://api.yourttoo.com/">https://api.yourttoo.com/</a>
                </p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <h4>Autenticacion</h4>
                <p>Para el consumo del API yourttoo, es necesario primero usar las credenciales de acceso, para obtener tu token de acceso, identificandote en la plataforma</p>
                <p>Guarda el token obtenido para acceder a los comandos de la API. Estos parametros necesitaras introducirlos en tu cabecera de peticion HTTP.</p>
                <p>Todos los comandos del API requieren estos parametros de identificacion en la cabecera, y se acceden via metodo POST. </p>
                <p>
                  Puedes obtener tu token de acceso via POST al endpoint del api <a >
                    <span class="badge">/apiv2/auth</span>
                  </a> con los siguientes parametros:
                </p>
                <ul>
                  <li>email : {string} (tu email de agencia, el que usas para acceder a yourttoo.com : {{ session.user.email }})</li>
                  <li>password : {string} (password que usas para identificarte en yourttoo.com)</li>
                </ul>
                <p>
                  HTTP Headers <span class="badge">/apiv2/auth</span>
                </p>
                <ul>
                  <li>Content-Type : usa application/json o application/xml</li>
                  <li>Accept : usa application/json or application/xml</li>
                </ul>
                <p>Obtendras los parametros de acceso para la api : </p>
                <p class="small">
                  {<br />
                    userid: {{ affiliate.user._id }},<br />
                    accessToken: {{ session.accessToken }}<br />
                  }<br />
                </p>
                <p>Añade estos parametros a la cabecera HTTP. Estas son los parametros requeridos en la cabecera para acceder al resto de comandos: </p>
                <ul>
                  <li>userid : {string} (id usuario obtenido en la autenticacion. tambien puedes obtener este dato desde esta misma seccion)</li>
                  <li>accesstoken : {string} (token de acceso obtenido en la autenticacion. )</li>
                  <li>Content-Type : usa application/json o application/xml. indica de este modo el formato de tu peticion (JSON o XML)</li>
                  <li>Accept : usa application/json or application/xml. indica de este modo el formato de respuesta de la peticion (JSON o XML)</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p>Puedes consultar y probar la lista completa de comandos del api en la documentacion, accediendo aqui: <a href="/apidocs" target="_blank"> API DOCS</a>
              </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</div>
