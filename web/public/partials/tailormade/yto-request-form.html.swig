<div ng-controller="affiliateRequestFormCtrl">
    <section>
      <div class="hidden-sm hidden-xs" id="map" style="height: 940px;"></div> <!-- rendering map -->
      
      <div class="headline-wrap "> <!-- fixing it away from the top and full-width -->
        <div class="container"> 
          <div class="row">

            <!-- ////////////////////// -->
            <!-- // REQUEST FORM -->
            <!-- ////////////////////// --> 
            <!-- TAB NAVIGATION -->
            <div class="request-form mt-xxl"> 
                <ul class="nav flow-tabs pull-left" role="tablist" id="request-flow-tabs">
                  <li class="active act-tab" ng-class="{active:tab.isSet('owner'), 'completed pointer' : tab.show('owner')}">
                    <a ng-href="" ng-click="tab.setTab('owner')" role="tab" data-toggle="tab">
                     <i class="fa fa-user"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('dest'), 'completed pointer' : tab.show('dest')}">
                    <a ng-href="" ng-click="tab.setTab('dest')" role="tab" data-toggle="tab">
                    <i class="fa fa-globe"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('tags'), 'completed pointer' : tab.show('tags')}">
                    <a ng-href="" ng-click="tab.setTab('tags')" role="tab" data-toggle="tab">
                    <i class="fa fa-tags"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('date'), 'completed pointer' : tab.show('date')}">
                    <a ng-href="" ng-click="tab.setTab('date')" role="tab" data-toggle="tab">
                    <i class="fa fa-calendar"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('hotcat'), 'completed pointer' : tab.show('hotcat')}">
                    <a ng-href="" ng-click="tab.setTab('hotcat')" role="tab" data-toggle="tab">
                    <i class="fa fa-bed"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('pax'), 'completed pointer' : tab.show('pax')}">
                    <a ng-href="" ng-click="tab.setTab('pax')" role="tab" data-toggle="tab">
                    <i class="fa fa-male"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('info'), 'completed pointer' : tab.show('info')}">
                    <a ng-href="" ng-click="tab.setTab('info')" role="tab" data-toggle="tab">
                      <i class="fa fa-list"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('budget'), 'completed pointer' : tab.show('budget')}">
                    <a ng-href="" ng-click="tab.setTab('budget')" role="tab" data-toggle="tab">
                    <i class="fa fa-money"></i></a>
                  </li>
                  {# <li class="act-tab" ng-show="!userlogged()" ng-class="{active:tab.isSet('login'), 'completed pointer' : tab.show('login')}">
                    <a ng-href="#identificate" role="tab" data-toggle="tab">
                    <i class="fa fa-user"></i></a></li> #}
                  <li class="act-tab" ng-show="userlogged()" ng-click="tab.setTab('confirm')" ng-class="{active:tab.isSet('confirm'), 'completed pointer' : tab.show('confirm')}">
                    <a ng-href="" role="tab" data-toggle="tab"><i class="fa fa-envelope"></i></a>
                  </li>
                  <li class="act-tab" ng-class="{active:tab.isSet('complete')}">
                    <a ng-href="" role="tab" data-toggle="tab"><i class="fa fa-check"></i></a>
                  </li>
                </ul>

                <form name="tailormadeform" id="tailormadeform" class="tab-content" novalidate>
                    <!-- 0 OWNER -->
                    <div class="tab-pane active" id="destino" ng-class="{ active : tab.isSet('owner')}">
                      <h1 class="thin h2 mt-b mb-xl">
                      
{%- if brandprefix == 'haiku' -%}
                      Identifica tu petición con el nombre de la agencia <b>*</b>
{%- else -%}
                      Identifica tu petición con el nombre del pasajero o grupo <b>*</b>
{%- endif -%}
                      </h1>
                      <div class="input-group mb-xxl col-xs-12">
                          <label class="sr-only" for="">Titular de la reserva</label>
                          <input class="form-control" type="text" value="" ng-model="QUERY.title" id="owner" placeholder="Escribe el nombre aquí" capitalize/>
                      </div>
                      <p class="help-block invert"></p>

                      <footer class="mt-b">
                        <button stop-event ng-click="triggerTabEvent('owner')" type="button" class="btn btn-danger btn-lg pull-right">
                          Siguiente</button>
                      </footer>
                  </div>

                  <!-- 1 DESTINO -->
                  <div class="tab-pane" id="destino" ng-class="{ active : tab.isSet('dest')}">
                      <h1 class="thin h2 mt-b mb-xl">¿Dónde desea ir tu cliente? <b>*</b></h1>
                      <div class="input-group mb-xl">
                          <label class="sr-only" for="select-city">Destino</label>
                          <input
                          class="form-control input-city select-city"
                          type="text"
                          value=""
                          ng-change="showNoCity = false"
                          ng-model="itinerary.citytoadd.city"
                          id="finddestination"
                          uib-typeahead="destination as destination.name for destination in destinations() | filter:$viewValue | limitTo:8"
                          typeahead-popup-template-url="/partials/popup/cities-popup-result-item.html?v={? appversion ?}"
                          typeahead-template-url="/partials/popup/cities-result-item.html?v={? appversion ?}"
                          placeholder="Escribe tu destino" />
                          <span class="input-group-btn">
                            <button class="btn-add-destination" ng-click="addCityToDestinations()">
                              agregar <i title="añadir destino" class="fa fa-plus"></i>
                            </button>
                          </span>
                      </div>
                      <p class="help-block invert">¿Qué país o qué ciudades quiere visitar?</p>

                    <ul class="list-unstyled destinations">
                      <li ng-repeat="destination in QUERY.destinations">
                        <strong ng-show="{{destination.city==''}}">{{destination.fulladdress}}</strong>
                        <strong ng-show="{{destination.city!=''}}">{{destination.city}}, {{destination.country}}</strong>
                        <a title="eliminar" ng-click="deleteDestination(destination)">
                          <i title="eliminar" class="fa fa-times-circle link-danger"></i>
                        </a>                        
                      </li>
                    </ul>
                    <div class="alert alert-danger" ng-show="showNoCity" role="alert">Si no encuentras la ciudad, escribe el país y pídenos las ciudades que buscas <strong>en el cuadro de observaciones del paso 7</strong></div>
                      <footer>
                        <button stop-event ng-click="triggerTabEvent('dest')" type="button" class="btn btn-danger btn-lg pull-right">
                          Siguiente</button>
                      </footer>
                  </div>

                  <!-- 2 ACTIVIDADES -->
                  <div class="tab-pane" id="actividades" ng-class="{ active : tab.isSet('tags')}">
                      <h1 class="thin h2 mt-b mb-xl">¿Qué tipo de actividades le gustaria incluir en el viaje?</h1>
                        <select class="form-control mb-xl" ng-show="false">
                          <option>Temática</option>
                        </select>
                        <strong>Actividades en destino</strong><br />
                        <em>Los receptivos le pueden ofrecer las siguientes actividades en los destinos que seleccionaste</em>
                        <div class="row mt-xl">
                              <div ng-repeat="tag in tripTags" class="col-md-6">
                                <label>
                                  <input type="checkbox" checklist-model="QUERY.whattodo" 
                                         checklist-value="tag" /> {{tag.label}} 
                                </label>
                              </div>
                        </div>
                        <p class="strong" ng-show="showErrorLoadTags"><b class="fa fa-warning"> </b> Problemas con el servidor, intente recargando la página.</p>
                        <div class="preloader-partial-blanket" ng-class="{in : showLoadTags}"><div class="preloader alt-color"><span></span><span></span><span></span></div></div>
                        <footer>
                          <button type="button" ng-click="triggerTabEvent('tags')" class="btn btn-danger btn-lg pull-right">Siguiente</button>
                        </footer>
                  </div>

                  <!-- 3 PASAJEROS -->
                  <div class="tab-pane oh" id="pasajeros" ng-class="{ active : tab.isSet('pax')}">
                      <h1 class="thin h2 mt-b mb-xl">Pasajeros</h1>

                      <div id="regular" class="padded-b bordered" ng-hide="checkGroup">
                      <!-- acomodation -->
                          <div class="room" ng-repeat="room in QUERY.roomDistribution">

                            <div class="row" ng-init="roomFirst = $first">
                             
                                <div class="col-md-12 mb-b">

                                    <label class="control-label bold" for="roomType">Habitación {{$index+1}} </label>
                                    <select class="select-room iblock" ng-model="room.roomType"
                                    name="roomType"
                                    ng-options="room.label for room in local.rooms"
                                    ng-change="updateTravelersRoom(room)" ng-init="updateTravelersRoom(room)"></select>
                                    <button class="btn-delete-room pull-right" ng-hide="roomFirst && $first" ng-click="deleteRoom($index)"><i class="fa fa-trash-o fa-lg"></i> <span>borrar</span></button>
                                </div>

                                <!-- pasajero start-->
                                <div ng-form name="paxForm" class="col-xs-4" ng-repeat="pax in room.paxList track by $index">
                                      <div class="form-group">
                                        <label class="control-label text-light" for="agepax">
                                          <small>Edad Pasajero {{1+(1*$index)}}</small>
                                        </label>
                                        <br>
                                        <input class="form-control" ng-model="pax.age" type="number" id="agepax" name="agepax" required />
                                      </div>   
                                </div>
                                <!-- pasajero ends-->
                            </div>
                            <hr class="mb-l mt-zero line-invert">
                        </div><!-- room end-->
                        <div class="text-center">
                          <a href="#" class="mb-b link-softened" ng-click="addRoom()"><i class="fa fa-plus"></i> <strong>agregar habitación</strong></a>
                        </div>
                      </div>
                      
                      <div class="bordered padded-b mt-b" ng-show="checkGroup">
                      <h5 class="pasajeros-title mt-zero">Acomodación <span ng-show="checkGroup">del grupo</span><b>*</b><small><a class="ml-b" href="#" ng-show="QUERY.group" ng-click="isAGroup(true)" ><i class="fa fa-pencil"></i> <strong>editar</strong></a></small></h5>
                        <p class="mb-zero"><strong>{{accomodationStr()}}</strong></p>
                      </div>
                      
                      <label class="group-btn text-light h3 control-label mt-b pt-xs pl-b pr-b pb-b" for="grupo">
                      <input type="checkbox" ng-change="isAGroup(checkGroup)" name="checkGroup" ng-model="checkGroup" id="grupo" /> Grupos</label>

                      <div class="row">
                      <div class="col-md-12 mt-b">
                        <label>Observaciones sobre pasajeros</label>
                        <textarea class="form-control" rows="3" ng-model="QUERY.hosting.hostingKindNotes"></textarea>
                        <em class="text-right block mb-xl" ng-class="{true : 'text-brand-danger'} [200 < QUERY.hosting.hostingKindNotes.length]">max {{200 - QUERY.hosting.hostingKindNotes.length}} caracteres</em>
                      </div>
                      </div>

                      <footer>
                        <button type="button" ng-click="triggerTabEvent('pax')" class="btn btn-danger btn-lg pull-right">Siguiente</button>
                      </footer>
                  </div>

                  <!-- 4 FECHAS -->
                  <div class="tab-pane oh" id="fechas" ng-class="{ active : tab.isSet('date')}">
                    <h1 class="thin h2 mt-b mb-xxl">Conoces las fechas exactas de su viaje? <b>*</b></h1>
                    <div class="mb-xxl">
                        <label class="control-label mb-l">
                          <input type="radio" ng-model="QUERY.dates.knowingdates" ng-value="false" /> No, por ahora no las conozco </label>
                          <br />
                        <label class="control-label mb-">
                          <input type="radio" ng-model="QUERY.dates.knowingdates" ng-value="true" /> Sí, ya tengo las fechas </label>
                    </div>

                    <div ng-show="QUERY.dates.knowingdates" class="row">
                        <div class="fechas-input">
                          <label class="control-label">
                            <b class="fa fa-warning"> </b> Fecha de llegada a destino <b>*</b>
                          </label>
                          <div class="input-group input-date">
                            <input class="form-control" ng-model="QUERY.dates.arrivaldate"
                                   uib-datepicker-popup="dd-MM-yyyy"
                                   show-button-bar="false"
                                   is-open="openedfrom"
                                   datepicker-options="{{dateOptions}}"
                                   min-date="{{today}}"
                                   ng-required="true" />
                              <span class="input-group-btn">
                                <button class="btn" ng-click="openfrom($event)">
                                  <i class="fa fa-calendar"></i>
                                </button>
                              </span>
                            </div>
                        </div>

                        <div class="fechas-input">
                          <label><input type="checkbox" ng-model="QUERY.dates.alreadygotflights" /> Ya han reservado vuelo</label>
                        </div>
                        <div class="fechas-input" ng-show="!QUERY.dates.alreadygotflights">
                          <label class="control-label">Flexibilidad </label>
                          <select class="form-control" ng-model="QUERY.dates.flexibility.number" >
                            <option value="0" selected="selected">Sin Flexibilidad</option>
                            <option value="1">1 día</option>
                            <option value="2">2 días</option>
                            <option value="3">3 días</option>
                            <option value="4">4 días</option>
                          </select>
                        </div>
                    </div>
                      <div class="row" ng-show="!QUERY.dates.knowingdates">
                        <div class="form-group col-xs-6">
                          <label class="control-label">
                            Mes <b>*</b>
                          </label>
                          <select ng-change="newmonthselected()"
                                  class="form-control"
                                  id="select"
                                  ng-options="month.selectiontext for month in availablemonths"
                                  ng-model="selectnewmonth">
                            <option>[Mes año]</option>
                          </select>
                        </div>
                        <div class="form-group col-xs-6">
                          <label class="control-label">
                            Semana
                          </label>
                          <select class="form-control"
                                    id="selectweek" 
                                    ng-model="QUERY.dates.week"
                                    ng-change="newmonthselected()">
                            <option value="1">1&ordf;</option>
                            <option value="2">2&ordf;</option>
                            <option value="3">3&ordf;</option>
                            <option value="4">4&ordf;</option>
                          </select>
                        </div>

                      </div>
{#                       <pre>month{{selectnewmonth | json}}</pre>
                      <pre>dates {{QUERY.dates | json}}</pre> #}
                      <div class="row" ng-show="QUERY.dates.alreadygotflights && QUERY.dates.knowingdates">
                        <div class="fechas-input col-md-12">
                          <textarea class="form-control" ng-model="QUERY.dates.dataflightsIn" placeholder="Datos vuelo de ida"></textarea>
                          <p class="help-block">Ciudad de llegada, siglas compañía aérea, nº vuelo y fechas</p>
                        </div>
                        <div class="fechas-input col-md-12">
                          <textarea class="form-control" ng-model="QUERY.dates.dataflightsOut" placeholder="Datos vuelo de vuelta"></textarea>
                          <p class="help-block">Ciudad de salida, siglas compañía aérea, nº vuelo y fechas</p>
                        </div>
                      </div>

                      <div class="row mb-xxl">
                        <div class="fechas-input mt-b col-md-12">
                          <label class="control-label">
                          <span>Duración <span ng-show="!QUERY.dates.alreadygotflights">aproximada</span></span><b>*</b></label><br />
                            <input type="number" class="form-control smnumb" ng-model="QUERY.dates.duration" min="1" placeholder="ej: 7"></input>
                            <strong class="ml-b">días</strong>
                        </div>
                      </div>

                    <footer>
                          <button type="button" ng-click="openWarningDates()" data-toggle="modal" data-target="#fechaswarning" class="btn btn-danger btn-lg pull-right">Siguiente</button>
                          <span class="must">es obligatorio *</span>
                      </footer>
                  </div>

                  <!-- 5 ALOJAMIENTO -->
                  <div class="tab-pane" id="alojamiento" ng-class="{ active : tab.isSet('hotcat')}">
                    <h1 class="thin h2 mt-b mb-b">¿Qué tipo de alojamiento desea? <b>*</b></h1>
                    <em class="block mb-xxl">Puedes seleccionar varias opciones</em>
                    <div class="alojamiento-cbs">
                      <div><label><input type="checkbox" ng-model="QUERY.hosting.lowcosthotels" /> Económico <small class="italic">(1*, 2*) </small></label></div>
                      <div><label><input type="checkbox" ng-model="QUERY.hosting.superiorhotels" /> Confort <small class="italic">(3*,3*SUP, 4*)</small> </label></div>
                      <div><label><input type="checkbox" ng-model="QUERY.hosting.luxuryhotels" /> Lujo <small class="italic"> (4*SUP, 5*, 5*SUP)</small></label></div>
                    </div>
                    
                    <footer>
                        <button type="button" ng-click="triggerTabEvent('hotcat')" class="btn btn-lg btn-danger pull-right">Siguiente</button>
                        <span class="must">es obligatorio *</span>
                    </footer>
                  </div>

                  <!-- 6 PRESUPUESTO -->
                  <div class="tab-pane" id="presupuesto" ng-class="{ active : tab.isSet('budget')}">
                    <h1 class="thin h2 mt-b mb-xl">¿Cuál es tu presupuesto neto por pax (sin vuelos)?<b>*</b></h1>
                    <div class="form-group mt-b">
                      <label class="sr-only">Presupuesto</label>
                      <input type="number" ng-model="QUERY.budget.cost" name="budgetcost" id="budgetcost" min="1" class="form-control mb-b smnumb" placeholder="ej: 800" />
                      <div class="iblock ml-l">
                        <label class="sr-only">moneda</label>
                        <p class="bold mt-xl">€ (Euros)</p>
                        {# <pre>{{QUERY.budget.currency}}</pre> #}
                        {# <select class="form-control mb-xl hidden" ng-change="changeCurrency()" ng-disabled="QUERY.budget.showmebestprices"
                                ng-options="currency.label for currency in content.currency"
                                ng-model="QUERY.budget.currency"
                                ng-class="{'disabled' : QUERY.budget.showmebestprices}">
                        </select> #}
                      </div>
                    </div>
                    <p>
                      <em class="block mb-xl">máximo por persona, sin vuelos internacionales.</em>
                      </p>
                      <div ng-show="QUERY.budget.cost>=1 && lessThanMinBudget(QUERY.budget.cost) && QUERY.group == null">
                        <div class="alert alert-danger" role="alert">Has indicado un precio por persona demasiado bajo para este tipo de viaje. Los Operadores Locales calculan un <strong>mínimo para {{QUERY.dates.duration}} día/s de {{minBudgetResult}} €</strong></div>
                      </div>

<div class="preloader-partial-blanket" ng-class="{in : showLoadBudget}"><div class="preloader alt-color"><span></span><span></span><span></span></div></div>
                                      
                    <footer>
                      <button type="button"
                                ng-click="triggerTabEvent('budget')"  
                                class="btn btn-danger btn-lg pull-right">Siguiente</button>
                    </footer>
                  </div>
                  <!-- 7 ADDITIONAL INFO -->
                  <div class="tab-pane oh" id="additional" ng-class="{ active : tab.isSet('info')}">
                    <h1 class="thin h2 mt-b">
                      Información adicional<b>*</b>
                    </h1>
                    <div class="row">
                      <div class="col-md-12">
                        <div ng-hide="checkGroup">
                          <h5 class="pasajeros-title">¿Cómo viajar tu cliente? <b>*</b></h5>
                          <label class="control-label mb-l">
                          <input type="radio" name="comoviajas" ng-model="QUERY.additionalinfo.trip" id="congrupo" value="grouptrip" /> Prefiere viajar en grupo organizado
</label><br>
                          <label class="control-label mb-l">
                          <input type="radio" name="comoviajas" ng-model="QUERY.additionalinfo.trip" id="micuenta" value="privatetrip" /> Quiere viajar por su cuenta </label>
                        </div>
                        <div ng-show="QUERY.additionalinfo.trip == 'privatetrip'">
                          <h5 class="pasajeros-title mb-zero">¿Qué necesita?</h5>
                          <em class="block mb-l">puedes seleccionar una sola opción</em>
                          <div><label class="control-label mb-l"><input type="radio" name="needs" ng-model="QUERY.additionalinfo.needs" value="onlyhotel" id="onlyhotel" /> No quiero transporte </label></div>
                          <div><label class="control-label mb-l"><input type="radio" name="needs" ng-model="QUERY.additionalinfo.needs" value="rentacar" id="rentacar" /> Coche de alquiler </label></div>
                          <div><label class="control-label mb-l"><input type="radio" name="needs" ng-model="QUERY.additionalinfo.needs" value="caranddriver" id="caranddriver" /> Coche y conductor</label></div>
                          <div class="mt-xl">
                            <label class="control-label mb-l"><input type="checkbox" name="guideincluded" ng-model="QUERY.additionalinfo.guide.included" id="guideincluded"> <strong>¿Quiere visitas con guías?</strong></label>
                          </div>
                          <div ng-show='QUERY.additionalinfo.guide.included'>
                              <h5 class="pasajeros-title mb-zero">Acepta guías en:</h5>
                              <em class="block mb-l">puedes seleccionar varias opciones</em>
                              <div><label><input type="checkbox" ng-model="QUERY.additionalinfo.guide.language.spanish" /> Español</label></div>
                              <div><label><input type="checkbox" ng-model="QUERY.additionalinfo.guide.language.english" /> Inglés </label></div>
                              <div><label><input type="checkbox" ng-model="QUERY.additionalinfo.guide.language.french" /> Francés </label></div>
                              <div><label><input type="checkbox" ng-model="QUERY.additionalinfo.guide.language.german" /> Alemán </label></div>
                              <div><label><input type="checkbox" ng-model="QUERY.additionalinfo.guide.language.italian" /> Italiano </label></div>
                              <div><label><input type="checkbox" ng-model="QUERY.additionalinfo.guide.language.portuguese" /> Portugués </label></div>
                          </div>
                        </div>
                        <div>  
                        <h5 class="pasajeros-title mb-zero">¿Qué régimen desea incluir? <b>*</b></h5>
                          <em class="block mb-l">puedes seleccionar una sola opción</em>
                          <div><label class="control-label mb-l"><input type="radio" name="regimen" ng-model="QUERY.additionalinfo.regimen" value="ol" id="alojamiento" /> Solo alojamiento </label></div>
                          <div><label class="control-label mb-l"><input type="radio" name="regimen" ng-model="QUERY.additionalinfo.regimen" value="bb" id="hab-des" /> Alojamiento y desayuno </label></div>
                          <div><label class="control-label mb-l"><input type="radio" name="regimen" ng-model="QUERY.additionalinfo.regimen" value="hb" id="med-pens" /> Media pensión</label></div>
                          <div><label class="control-label mb-l"><input type="radio" name="regimen" ng-model="QUERY.additionalinfo.regimen" value="fb" id="pens-full" /> Pensión completa </label></div>
                          <div><label class="control-label mb-l"><input type="radio" name="regimen" ng-model="QUERY.additionalinfo.regimen" value="ai" id="todo-incl" /> Todo incluido </label></div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                        <h5 class="pasajeros-title mb-l">Observaciones sobre el viaje</h5>
                        <label for="tripcomments" class="sr-only control-label mb-b bold">Observaciones sobre el viaje</label>
                        <textarea class="form-control" ng-model="QUERY.additionalinfo.description" id="tripcomments" name="tripcomments" rows="3" placeholder="Utiliza este espacio para hacer aclaraciones..."></textarea></div>
                      </div>

                    <footer>
                      <button type="button" 
                                ng-click="triggerTabEvent('info')"  
                                class="btn btn-danger btn-lg pull-right">Siguiente</button>
                                <span class="must">es obligatorio *</span>
                    </footer>
                  </div>


                  <!-- 9 ENVIAR/MODIFICAR SOLICITUD request-revision -->
                  <div class="tab-pane" id="enviarmodificar" ng-show="userlogged()" ng-class="{ active : tab.isSet('confirm')}">
                    <h1 class="thin h2 mt-b mb-b">Resumen de tu petición</h1>
                      <div class="row">
                          <div class="rev-info">
                            <h5><i class="fa fa-globe"></i> Destinos <small><a ng-href="" ng-click="tab.setTab('dest')" data-toggle="tab"><i class="fa fa-pencil"></i> Modificar</a></small></h5> 
                            <span ng-repeat="city in QUERY.destinations">
                            <strong ng-show="{{city.city==''}}">{{city.fulladdress}}</strong>
                            <strong ng-show="{{city.city!=''}}">{{city.city}}, {{city.country}}</strong>
                            <span ng-hide="$last"> | </span>
                            </span>
                          </div>
                          <div class="rev-info">
                            <h5><i class="fa fa-tags"></i> Actividades <small><a ng-href="" ng-click="tab.setTab('tags')" data-toggle="tab"><i class="fa fa-pencil"></i> Modificar</a></small></h5> 
                            <strong>{{showTags()}}</strong>
                          </div>
                          <div class="rev-info">
                            <h5><i class="fa fa-calendar"></i> Fechas y Duración <small><a ng-href="" ng-click="tab.setTab('date')" role="tab" data-toggle="tab"><i class="fa fa-pencil"></i> Modificar</a></small></h5> 
                            <strong>{{showDates()}}</strong>
                          </div>
                          <div class="rev-info">
                            <h5><i class="fa fa-bed"></i> Tipo de alojamiento <small><a ng-href="" ng-click="tab.setTab('hotcat')" data-toggle="tab"><i class="fa fa-pencil"></i> Modificar</a></small></h5> 
                          <strong>{{showHosting()}}</strong>
                          </div>
                          <div class="rev-info">
                            <h5><i class="fa fa-male"></i> <i class="fa fa-female"></i> Pasajeros <small><a ng-href="" ng-click="tab.setTab('pax')" data-toggle="tab"><i class="fa fa-pencil"></i> Modificar</a></small></h5> 
                           <strong><span ng-show="QUERY.group != null">Grupo:</span> {{accomodationStr()}}</strong>
                          </div>

                          <div class="rev-info">
                            <h5>
                              <i class="fa fa-list"></i> Información Adicional <small><a ng-href="" ng-click="tab.setTab('info')" data-toggle="tab">
                              <i class="fa fa-pencil"></i> Modificar</a></small>
                             </h5>
                              <strong> 
                              {{showAdditionalinfo().trip}}
                              </strong>
                              <br ng-show="showAdditionalinfo().needs" />
                              {{showAdditionalinfo().needs}}
                              <br ng-show="showAdditionalinfo().guide" />
                              {{showAdditionalinfo().guide}}
                              <br ng-show="showAdditionalinfo().regimen" />
                              {{showAdditionalinfo().regimen}}
                          </div>

                          <div class="rev-info">
                            <h5><i class="fa fa-money"></i> Presupuesto <small><a ng-href="" ng-click="tab.setTab('budget')" data-toggle="tab"><i class="fa fa-pencil"></i> Modificar</a></small></h5>
                            <strong ng-hide="QUERY.budget.showmebestprices">{{QUERY.budget.cost}} {{QUERY.budget.currency.symbol}}</strong>
                            <strong ng-show="QUERY.budget.showmebestprices">Quiero que me ofrezcan el mejor precio.</strong>
                          </div>

                          <footer class="col-md-12">
                            <button type="button" tabindex="3" ng-click="sendQUERY()"
                                    class="btn btn-primary btn-lg pull-right">Confirmar y Enviar</button>
                          </footer>
                      </div> <!-- rev-block ends -->
                  </div>
                  <!-- 10 CONFIRMACION -->
                  <div class="tab-pane" id="confirmacion" ng-show="rqSavedOK" ng-class="{ active : tab.isSet('complete')}">
                    <div class="thanks-confirmation-form">
                      <span class="fa-stack fa-lg fa-3x pull-left mr-b">
                        <i class="fa fa-circle fa-stack-2x text-primary"></i>
                        <i class="fa fa-check fa-stack-1x text-light"></i>
                     </span>
                     <!-- is a modification -->
                     <div ng-show="!QUERY.isnew">
                     <h3 class="h2 thin stack-title">¡Petición modificada!</h3><br />
                     <div class="padded-xl bg-light text-gray">
                     <strong>¡Muchas gracias!</strong> Tus cambios han sido guardados correctamente.
                     </div>
                     <footer>
                     
                          <button ng-click="gotoRequest()" tabindex="1" class="btn btn-lg mt-xxl btn-primary center-block">Ver Solicitud</button>
                          <strong class="block text-light padded-l mt-xxl">Recibiras hasta 4 presupuestos. Te avisaremos por correo electrónico a {{QUERY.affiliate.contact.bookingContact.email}}</strong>
                      </footer>
                    </div>
                      
                     <!-- is new query -->
                     <div ng-show="QUERY.isnew">
                     <h3 class="h2 thin stack-title">¡Petición enviada!</h3><br />
                     <div class="padded-xl bg-light text-gray">

                     <strong>¡Muchas gracias!</strong> Con esta información los operadores locales podrán hacer un presupuesto ajustado.
                     </div>
                     <footer>
{% if prefix == 'haiku'%}
                          <strong class="block text-light padded-l mt-xxl">Recibiras hasta 4 presupuestos. Te avisaremos por correo electrónico.</strong>
{% else %}
                          <button ng-click="gotoRequest()" tabindex="1" class="btn btn-lg mt-xxl btn-primary center-block">Ver Solicitud</button>
                          <strong class="block text-light padded-l mt-xxl"> Te avisaremos a esta misma cuenta de correo {{QUERY.affiliate.contact.bookingContact.email}} cuando tengamos respuesta de los Operadores Locales.</strong>
{% endif %}
                      </footer>
                    </div>

                    </div>
                  </div>

                </form> <!-- .tab-content ends -->
            </div> <!-- .request-form ends -->

            <div class="request-resume-wrap hidden-xs hidden-sm">

              <div class="request-resume padded-l" ng-show="tab.show('all')">
                <div class="mt-b" ng-show="tab.show('owner')">
                    <p>
                    <i class="fa fa-user"></i>
                    {{QUERY.title}}
                    </p>
                </div>
                <div class="mt-b" ng-show="tab.show('dest')">
                    <p>
                    <i class="fa fa-globe"></i>
                    <span ng-repeat="city in QUERY.destinations">
                    <strong ng-show="{{city.city==''}}"> {{city.fulladdress}}</strong>
                    <strong ng-show="{{city.city!=''}}"> {{city.city}}, {{city.country}}</strong>
                    <span ng-hide="$last"> | </span>
                    </span>
                    </p>
                </div>
                <div ng-show="tab.show('tags')">
                    <p><i class="fa fa-tags"></i> {{showTags()}}</p>
                </div>
                <div ng-show="tab.show('date')">
                    <p><i class="fa fa-calendar"></i> {{showDates()}}</p>
                </div>
                <div ng-show="tab.show('hotcat')">
                    <p><i class="fa fa-bed"></i> {{showHosting()}}</p>
                </div>
                <div ng-show="tab.show('pax')">
                    <p><i class="fa fa-male"></i><span class="bold" ng-show="QUERY.group.adults != null">Grupo:</span> {{accomodationStr()}}</p>
                </div>
                <div ng-show="tab.show('info')">
                    <p><i class="fa fa-list"></i>
                      <strong> 
                      {{showAdditionalinfo().trip}}
                      </strong>
                      <br ng-show="showAdditionalinfo().needs" />
                      {{showAdditionalinfo().needs}}
                      <br ng-show="showAdditionalinfo().guide" />
                      {{showAdditionalinfo().guide}}
                      <br ng-show="showAdditionalinfo().regimen" />
                      {{showAdditionalinfo().regimen}}</p>
                </div>
                <div ng-show="tab.show('budget')">
                    <p><i class="fa fa-money"></i> {{showBudget()}}</p>
                </div>
              </div>
            </div>
            <div class="related-banner-wrap" ng-controller="getRelatedProduct">
                <div class="text-center mt-xxl padded-xl bg-darkblue-half text-invert" ng-hide="showRelated">
                  <i class="fa fa-2x fa-info-circle text-light"></i>
                  <h3 class="mt-b text-light"><strong>Gestor de cotizaciones A Medida.</strong><br /><br />Sólo servicios terrestres</h3>
                  <p class="mt-xl text-light"><strong>¿Has buscado antes en Multidays?</strong><br /><br />

El receptivo no podrá enviarte cotización A Medida si ya tiene un programa cargado casi idéntico<br /><br />

Por favor acota y define bien tu cotización<br /><br />

  <strong>Recuerda que no tramitamos sólo Hotelería</strong><br /><br />

  Sólo buscamos la respuesta más efectiva para ti</p>

                </div>
              <div ng-show="showRelated">
                <h4 class="text-alternate">Ideas de Viaje</h4>
                <div class="slider-loading preloader solo" ng-class="{'in' : loadingRelated}" >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div ng-hide="noProduct" ng-show="!loadingRelated">
                  <div class="related-banner" ng-repeat="item in resultItemsShow track by $index">
                    <a class="link-wrapper" target="_blank" ng-href="{?brand.path?}{{item.url}}">
                      <h5 class="text-alternate mt-zero mb-b bold">{{item.title}}</h5>
                      <div class="small">
                          <span>
                            <i class="fa fa-globe"></i>
                          </span>
                          <span><span>{{item.cities}}</span></span> <br />
                            <span>
                              <i class="fa fa-clock-o"></i>
                            </span>
                            <span>{{item.duration}} días</span>
                            <span>
                              <i class="fa fa-tags"></i>
                            </span>
                            <span><span>{{item.tags}}</span></span>
                      </div>
                      <div class="rb-price">
                        <em class="small">desde </em> <strong class="price-total"> {{item.pvp.b2b}} {{item.pvp.currency.symbol}}</strong>
                      <span class="pull-right mt-xs"><strong>reserva ahora</strong> <i class="fa fa-arrow-circle-right"></i></span>
                      </div>
                    </a>
                  </div> <!-- .related banner ends -->
                    <div ng-if="jumpUrlReady" ng-hide="noProduct" class="rb-more text-center">
                      <a ng-href="{?brand.path?}{{jumpUrl}}" target="_blank"><h4>Ver más Viajes <i class="fa fa-arrow-circle-right"></i></h4></a>  
                    </div>

                  </div>
                </div>
              </div> <!-- .related banner wrap ends -->

              <div>
                
              </div>
          </div> <!-- .row ends -->
        </div> <!-- .container ends -->
      </div>  <!-- .headline-wrap ends -->
    </section> <!-- .home-hero ends -->
</div>
