{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front product{% endblock %}

{% block body %}
    <section class="shopping-payflow-wrap container" ng-controller="bookingCtrl">

		<ol class="breadcrumb mt-xl mb-xs ng-scope" vocab="http://schema.org/" typeof="BreadcrumbList">
            <li>
                <a target="_self" property="item" typeof="WebPage" href="/inicio">
                    <span property="name" class="ng-binding">Inicio</span>
                </a>
            </li>
            <li>
                <a target="_self" property="item" typeof="WebPage" ng-href="/viajes?country={{ product.buildeditinerary.countries[0] | lowercase}}">
                    <span property="name" class="ng-binding">{{product.buildeditinerary.countriesfull_es[0]}}</span>
                </a>
            </li>
            <li>
                <a target="_self" property="item" typeof="WebPage" ng-href="/viaje/{{product.slug_es}}/?country={{ product.buildeditinerary.countries[0] | lowercase}}">
                    <span property="name" class="ng-binding">{{ product.title_es }}</span>
                </a>
            </li>
            <li>
                <a target="_self" property="item" typeof="WebPage" href="#">
                    <span property="name" class="ng-binding">Ficha Reserva</span>
                </a>
            </li>
        </ol>

        <header class="mb-xxl pt-l">
        <h3 class="thin">Reserva de <strong> {{ product.title_es }}</strong></h3> 
        </header>
        <!-- wrap-sf1 main content -->
        <div class="row shopping-payflow">
            <div class="col-md-9">

              <!-- calendario para producto cargado -->             
              <form class="step-sf well bg-light" ng-show="quote == null || quote.code == ''">
                    <h2 class="thin mt-zero mb-zero"><span>1.</span> Selecciona la fecha de salida</h2>
                    <div ng-include="'/partials/booking/yto-bookingcalendar.html.swig'"></div>
                    
 
                    <div ng-if="local.price.perperson.double > 0" class="bg-red visible-xs visible-sm text-light padded-l text-center fadein-l">
                        <h5 class="opac-l line-invert-bottom pb-l">p/persona en habitación doble</h5>
                        <h2 class="mt-b">{{local.price.perperson.double | number : 0}}<span class="text-light">{{local.currency.symbol}}</span></h2>


                    </div>
                </form>
                <!-- step-sf ends -->


                <form name="accomodation" id="accomodation" ng-init="setAccomodationForm(this)" class="step-sf well bg-light" ng-show="showStep.s2">
                    <p class="required-label">* obligatorio</p>
                    <h2 class="thin mt-zero mb-xxl"><span>2.</span> Detalle de Pasajeros</h2>
                    <p class="text-help">IMPORTANTE: Si no dispones de todos los datos obligatorios basta con que incluyas cualquier caracter, puedes continuar con la reserva y cuando dispongas de los mismos deberás añadirlos desde tu gestor de Reservas.</p>

                    <div class="room" id="room{{$index}}" ng-repeat="room in rooms">
                        <div class="alert" ng-init="roomFirst = $first">
                            <div class="row">
                                <div class="col-md-12">
                                    <h2 class="tit-room">Habitación {{$index+1}}</h2>

                                    <a href="" class="pull-right text-danger" ng-hide="(roomFirst && $first) || quote.code != null" ng-click="deleteRoom($index)" >
                                      <i class="fa fa-trash-o fa-lg"></i>
                                       BORRAR
                                    </a>
                                    <a ng-init="nextElement = $index+1" ng-show="(roomFirst && $first) && quote.code == null"
                                       class="pull-right btn btn-default" ng-click="addRoom(); gotoElement('room'+nextElement)">
                                         Agregar + Habitaciones
                                    </a>
                                    <div class="iblock form-inline">
                                        <label class="control-label" for="typeRoom">Tipo de habitación:</label>
                                        <label class="control-label" ng-show="quote || quote.code != null" name="typeRoom"><strong> {{room.typeRoom.label}}</strong></label>
                                        
                                        <select class="select-room" 
											ng-show="quote.code==null" 
											ng-model="room.typeRoom" 
											name="typeRoom" 
											ng-options="room.label for room in bookings_service.rooms" 
											ng-change="updateTravelersRoom(room,true)"></select>
                                    </div>
                                </div>
								{% set minoperate = product.included.trip.minpaxoperate == 1 %}
                                   <p class="text-danger bold col-md-12 mt-l mb-zero"
                                    ng-show="quote.code==null && roomFirst && $first && room.typeRoom.roomCode == 'single' && rooms.length == 1 && product.included.trip.minpaxoperate > 1">
                                    Este programa se opera con un mínimo de 2 pasajeros. Si quieres reservar solo una plaza el precio de la individual cambia.</p>
                            </div>
                            <div class="pasajero row" ng-repeat="pax in room.paxList track by $index">
                            <ng-form name="paxForm">
                                <div class="col-md-12">
                                    <hr />
                                    <h3 class="iblock mt-zero bold" >Pasajero {{1+(1*$index)}}</h3>
                                        {# <div class="iblock checkbox" ng-show="roomFirst && $first">- 
                                        <strong ng-show="$first">Titular de la reserva  </strong> 
                                        <label class="ml-b" ng-show="local.traveler">
                                        <input type="checkbox" ng-model="checkUser" ng-change="setUsertoFirstPax(checkUser)" >el primer pasajero es el usuario actual</label>
                                        </div>#}
                                </div>
                                <div class="form-group col-md-6" ng-class="{ 'has-error': paxForm.namesf.$invalid}">
                                    <label class="control-label" for="namesf"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre/s <b>*</b></label>
                                    <input class="form-control" ng-model="pax.name" type="text" id="namesf" name="namesf" required />
                                    {# <p class="help-block text-right">como figura en el pasaporte</p> #}
                                </div>
                                <div class="form-group col-md-6" ng-class="{ 'has-error': paxForm.lastsf.$invalid}">
                                    <label class="control-label" for="lastsf"><i class="fa fa-exclamation-circle text-brand-danger"></i> Apellido/s <b>*</b></label>
                                    <input class="form-control" ng-model="pax.lastName" type="text" name="lastsf" id="lastsf" required />
                                    {# <p class="help-block text-right">como figura en el pasaporte</p> #}
                                </div>
                                <div class="form-group col-md-6" ng-class="{ 'has-error': paxForm.nationality.$invalid}">
                                    <label class="control-label" for="nationality"><i class="fa fa-exclamation-circle text-brand-danger"></i> País de Nacionalidad <b>*</b></label>                                    
                                    <div class="input-group full-width">
                                        <select class="form-control"  name="nationality" id="nationality" ng-model="pax.country" ng-options="country.name_es for country in bookings_service.nationalities |  orderBy:'name_es':reverse" required>
                                        
                                        </select>
                                    </div>
                                </div>                               
                                <div class="form-group col-md-4" ng-class="{ 'has-error': paxForm.datesf.$invalid}">                                    
                                    <label class="control-label" for="datesf"><i class="fa fa-exclamation-circle text-brand-danger"></i> Fecha de Nacimiento <b>*</b></label>
                                    <p class="input-group input-date" ng-controller="datePickerCtrl">
                                        <input type="text" id="datesf" name="datesf" class="form-control" uib-datepicker-popup="{{format}}" ng-model="pax.birdthDate" is-open="opened" max-date="dt" datepicker-options="dateOptions" placeholder="{{defaultBirthDate | date : 'dd-MM-yyyy'}}" ng-required="true" close-text="Cerrar" current-text="Hoy" clear-text="Limpiar" ng-blur="loadBooking()" init-date="defaultBirthDate" required />
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-alt" ng-click="open($event)"><i class="fa fa-calendar"></i></button>
                                        </span>
                                    </p>
                                </div>
                                 <div class="col-md-6">
                                    <div class="row">
                                        <div class="form-group col-xs-5" ng-class="{ 'has-error': paxForm.doctype.$invalid}">
                                        <label class="control-label" for="doctype"><i class="fa fa-exclamation-circle text-brand-danger"></i> Documento <b>*</b></label>
                                        <select class="form-control" name="doctype" id="doctype" ng-model="pax.documentType" required />
                                            <option value="dni/nif">DNI/NIF</option>
                                            <option value="nie">NIE</option>
                                            <option value="passport">Pasaporte</option>
                                        </select>
                                        </div>
                                        <div class="form-group col-xs-7" ng-class="{ 'has-error': paxForm.docnumber.$invalid}">
                                        <label class="control-label" for="docnumber"><i class="fa fa-exclamation-circle text-brand-danger"></i> N&uacute;mero <b>*</b></label>
                                        <input class="form-control" ng-model="pax.documentNumber" type="text" id="docnumber" name="docnumber" required placeholder="">
                                        </div>
                                    </div>
                                </div> 
                            </ng-form>    
                            </div> <!-- pasajero ends-->
                            
                        </div>
                    </div><!-- room end-->
                    <div class="text-center" ng-show="quote.code==null">
                        <a class="text-center btn btn-alt" ng-click="addRoom()"> Agregar + Habitaciones</a>
                    </div>
                   
                </form> <!-- step-sf ends -->



                <form class="step-sf well bg-light" ng-show="showStep.s3">
                    <h2 class="thin mb-l mt-zero"><span>3.</span>  Datos Agencia</h2>
                    <div class="row">
                        <div class="col-md-5 mt-xxl pt-xs">
                            <div class="row">
                                <div class="form-group col-xs-6">
                                <p class="mt-b text-right"><label for="idBookingExt" class="control-label">Expediente AAVV</label></p>
                                </div>
                                <div class="form-group col-xs-6">
                                    <input class="form-control" name="idBookingExt" ng-model="idBookingExt" capitalize/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-6">
                                    <p class="mt-b text-right"><label for="affiliateuser" class="control-label">Agente</label></p>
                                </div>
                                <div class="form-group col-xs-6">
                                    <input class="form-control" name="affiliateuser" ng-model="agentid" capitalize/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="form-group">
                                <label for="affiliateobservations" class="control-label">Observaciones para el operador</label>
                                <textarea class="form-control textarea-xl" rows="2" name="affiliateobservations" ng-model="observations"></textarea>
                                <p class="help-block">Incluye aquí las notas importantes respecto a tu reserva </p>
                            </div>
                        </div>
                        <div class="col-md-12" ng-show="product.included.arrivaltransfer || product.included.departuretransfer">
                            <h3 class="bold"><i class="fa fa-exclamation-triangle text-gray"></i> Infomación importante para traslados</h3>
                            <div class="form-group">
                                <label class="control-label text-gray">Detalla aquí la información de llegada a destino de tus pasajeros: número de vuelo/tren, compañía aérea, horas de llegada y salida, etc... Con esta información el Receptivo efectuará los traslados que estén incluidos.</label>
                                <textarea class="form-control textarea-xl" rows="3" name="transferdetails" ng-model="meetingdata" placeholder=""></textarea>

                            </div>
                        </div>
                    </div>
                </form>
                

                {# parcial de las condiciones de pago #}       
                <form class="step-sf well bg-light" name="payconditions" id="payconditions" ng-show="showStep.s4" novalidate>

                {% include "partials/booking/yto-payconditions-form.html.swig" %}

                </form>
                <form class="step-sf well bg-light" ng-show="showStep.s5" novalidate>

                        <h2 class="thin mb-xxl mt-zero"><span>5.</span> Condiciones de cancelación </h2>
                        <div ng-hide="!toConfirm && dateNoMatch">
                                <h3 class="text-danger"><i class="fa fa-exclamation-triangle text-brand-danger"></i> Selecciona una fecha con disponibilidad</h3>
                        </div>
                        
                        <div ng-form name="generalconditions" id="generalconditions" ng-init="setGeneralConditionsForm(this)" ng-show="!toConfirm && dateNoMatch">
                            <p class="mt-xxl mb-xxl pre-text" ng-hide="quote && quote.code!=null">{{product.dmc.membership.cancelpolicy._es }}</p>
                             <p class="mt-xxl mb-xxl pre-text" ng-hide="quote.code==null">{{quote.responseDetails.cancelpolicy._es }}</p>
                            <div class="form-group" ng-class="{ 'has-error': generalconditions.ireadconditions.$invalid}">
                                <label class="control-label">
                                <input type="checkbox" name="ireadconditions" ng-model="booking.acceptcancell" id="ireadconditions" required />
                                <i class="fa fa-exclamation-circle text-brand-danger"></i>
                                He revisado los servicios de la reserva, siendo estos correctos. Acepto las condiciones de cancelación
                                </label> 
                            </div>
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': !insurance}">
                            <label class="control-label">
                            <input ng-init="insurance = true" type="checkbox" ng-model="insurance" name="insurance" id="insurance" required/>
                            <i class="fa fa-exclamation-circle text-brand-danger"></i>
                             He sido informado sobre la suscripción facultativa de un
                            {% if brandprefix == 'haiku' %}
                                <a href="http://www.taeds.com/aonseguros/entry.asp" target="_blank">Contrato de Seguro</a>
                            {% else %}
                                <a href="https://www.intermundial.es/" target="_blank">Contrato de Seguro</a>
                            {% endif %}
                             que cubra los gastos de cancelación, asistencia y repatriación y rechazo expresamente la contratación.
                            </label>
                        </div>
                        <div class="form-group" ng-class="{ 'has-error': !visa}">
                            <label class="control-label">
                            <input ng-init="visa = true" type="checkbox" ng-model="visa" name="visa" id="visa" required/>
                            <i class="fa fa-exclamation-circle text-brand-danger"></i>
                             He sido informado de que {? brand.name ?} no informa ni tramita visados.
                            </label>
                        </div>
                        <p class="help-block">Es tu responsabilidad revisar si se necesita algún tipo de visado para la realización de este viaje. Puedes informarte en <a href="http://visados.org/" target="_blank">CAP270</a>.</p>
                        <p class="help-block">Si necesitas ayuda consulta nuestras Preguntas Frecuentes: <a href="/faq/42-y-si-tengo-que-cancelar-la-reserva" target="_blank">Cambios y Cancelaciones</a></p>
                        <hr>
                        <div class="text-right mt-xxl">
                            <button type="button" ng-click="feedbackError()" ng-show="!_checkBooking()" class="btn btn-danger btn-lg">Confirmar y Reservar</button>

                            <button type="button"  ng-click="confirmBtn(); bookdisabled=true" class="btn btn-success btn-lg" ng-class="{'btn-preloader-button' : bookdisabled}" ng-show="_checkBooking()">
                                <div ng-init="bookdisabled=false" ng-show="bookdisabled" class="preloader btn-preloader in"><span></span><span></span><span></span>
                                </div>Confirmar y Reservar
                            </button>       
                        </div>
                    </form> <!-- step-sf ends -->
              </div><!-- col-md-9 ends -->

              <div  class="col-md-3" id="booking-resumen">

                <!-- resume start -->
                {% include "partials/booking/yto-column-resume.html.swig" %}
                <!-- resume end --> 

                <!-- info-blocks start -->
                {# {% include "partials/widgets/help-infoblocks-phone.html.swig" %} #}

                {% set budgetbtn = "partials/booking/yto-budget-button.html.swig" %}
                <!-- cta and data banking -->
                {% include budgetbtn ignore missing %}

                <!-- info-blocks end --> 

              </div>
            </div>
            {# 
            <pre>{{booking.start.day}} {{booking.start.monthname_es}} {{booking.start.year}} - {{booking.end.day}} {{booking.end.monthname_es}} {{booking.end.year}}</pre>
            <hr>
            <pre>{{booking | json}}</pre>
            <hr>#}
            {# <pre>{{ booking.product | json }}</pre> #}
            {# <pre>countries :{{ countries | json }}</pre> #}
            {# <pre>url :{? url ?}</pre>
            <pre>tags: {? tags ?}</pre> #}
 </section>

{% endblock %}

{% block javascript %}
    {% parent %}
    <!-- sticky -->
    <!-- DOCS https://github.com/kudago/sticky -->
    <script src="/js/libs/sticky.min.js"></script>  
    <script>
      document.addEventListener("DOMContentLoaded", function(event) {
            var sticky = new Sticky(document.querySelector("#booking-resumen"), {offset:110});
            document.dispatchEvent(new CustomEvent("sticky:recalc"));
      });
    </script>
    <script type="text/javascript">
        var dateActualServer = {? dateActual | json | safe ?};
		var bookquote = {? quote | json | safe ?};
		var bookquery = {? userquery | json | safe ?};
		var bookbudget = {? budget | json | safe ?};
    </script>
    <!-- Directives -->
    <script src="/js/angular/directives/match.js?v={? brand.appversion ?}"></script>
    <!-- Services -->
    <script src="/js/angular/helpers/bookinghelpers.js?v={? appversion ?}"></script>
    <!-- Controllers -->
    <script src="/js/libs/1.4.9/i18n/angular-locale_es-es.js"></script>
    <script src="/js/angular/booking/bookingCtrl.js?v={? brand.appversion ?}"></script>
    <script src="/js/angular/booking/bookingCalendarCtrl.js?v={? brand.appversion ?}"></script>
    <script src="/js/angular/booking/BudgetCtrl.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/helpers/bookinghelpers.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/services/bookingservice.js?v={? brand.appversion ?}"></script>
	<script src="/js/angular/utils/StringUtils.js?v={? brand.appversion ?}"></script>

{% endblock %}