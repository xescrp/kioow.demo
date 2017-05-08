<!-- INIT CONTROL OMT -->
<div class="row" ng-show="isAdmin && !hideOmtPanel">
    <div class="col-md-12 well mb-l">
        <h4 class="text-alternate mt-zero">Campos de control OMT</h4>
        <div>
        <uib-tabset active="active">
          <uib-tab index="0" heading="Destacados">
          <fieldset class="padded-xl bg-light bordered-l bordered-r bordered-b">
              <h4 class="text-xs mb-zero">Destacados</h4>  
              <ul class="list-inline">
                <li class="checkbox" ng-repeat="tag in tagoptions | filter : {state:'special'}">
                  <label>
                    <input name="{{tag.slug}}" type="checkbox" checklist-model="dmcproduct.tags" checklist-value="tag">{{tag.label}}
                  </label>
                </li>
              </ul>
          </fieldset>
          </uib-tab>
          <uib-tab index="1" heading="Categorías">
          <div class="padded-xl bg-light bordered-l bordered-r bordered-b">
            <fieldset>
                <h4 class="text-xs mb-zero">Idiomas</h4>  
                    <ul class="list-inline">
                      <li class="checkbox" ng-repeat="tag in tagoptions | filter : {state:'language'}">
                        <label>
                          <input name="{{tag.slug}}" type="checkbox" checklist-model="dmcproduct.tags" checklist-value="tag">{{tag.label}}
                        </label>
                      </li>
                    </ul>
            </fieldset>
            <hr class="mt-b mb-b" />

            <fieldset>
                <h4 class="text-xs mb-zero">Tipo de Viaje</h4>  
                    <ul class="list-inline">
                      <li class="checkbox" ng-repeat="tag in tagoptions | filter : {state:'kindtrip'}">
                        <label>
                          <input name="{{tag.slug}}" type="checkbox" checklist-model="dmcproduct.tags" checklist-value="tag">{{tag.label}}
                        </label>
                      </li>
                    </ul>
            </fieldset>
            <hr class="mt-b mb-b" />

            <fieldset>
                <h4 class="text-xs mb-zero">Tipo de Viajero</h4>  
                    <ul class="list-inline">
                      <li class="checkbox" ng-repeat="tag in tagoptions | filter : {state:'kindtraveler'}">
                        <label>
                          <input name="{{tag.slug}}" type="checkbox" checklist-model="dmcproduct.tags" checklist-value="tag">{{tag.label}}
                        </label>
                      </li>
                    </ul>
            </fieldset>
            <hr class="mt-b mb-b" />

            <fieldset>
                <h4 class="text-xs mb-zero">Categorías</h4>  
                    <ul class="list-inline">
                      <li class="checkbox" ng-repeat="tag in tagoptions | filter : {state:'hotel-category'}">
                        <label>
                          <input name="{{tag.slug}}" type="checkbox" checklist-model="dmcproduct.tags" checklist-value="tag">{{tag.label}}
                        </label>
                      </li>
                    </ul>
            </fieldset>
            <hr class="mt-b mb-b" />

            <fieldset>
                <h4 class="text-xs mb-zero">Régimen Alimenticio</h4>  
                    <ul class="list-inline">
                      <li class="checkbox" ng-repeat="tag in tagoptions | filter : {state:'regimen'}">
                        <label>
                          <input name="{{tag.slug}}" type="checkbox" checklist-model="dmcproduct.tags" checklist-value="tag">{{tag.label}}
                        </label>
                      </li>
                    </ul>
            </fieldset>
          </div>
          </uib-tab>
          <uib-tab index="2" heading="Vuelos">
          <div class="padded-xl bg-light bordered-l bordered-r bordered-b">
            <fieldset>
                <h4 class="text-xs mb-zero">Vuelos</h4> 
                    <ul class="list-inline">
                      <li class="checkbox">
                        <label>
                          <input name="flightsdmc" ng-model="dmcproduct.flightsdmc" ng-change="onselecflightsdmc(dmcproduct.flightsdmc)" type="checkbox"> Vuelos ofrecidos por DMC
                        </label>
                      </li>
                      <li class="checkbox">
                        <label>
                          <input name="flights" ng-disabled="blockflights" ng-change="onselecflights(dmcproduct.flights)" ng-model="dmcproduct.flights" type="checkbox">Ofrecer Vuelos
                        </label>
                      </li>
                    </ul>
              </fieldset>
          </div>

          </uib-tab>
        </uib-tabset>


        </div>
        <hr class="mt-l mb-l" />

        <fieldset>
            <label class="checkbox-inline">
                <input ng-model="dmcproduct.productvalid" type="checkbox" id="productvalid"> Producto Publicable
            </label>
            <label class="checkbox-inline">
              <input ng-model="dmcproduct.pvp.keep" type="checkbox" id="productvalid"> Mantener Paridad Precios
            </label>
            <button class="btn btn-alt ml-xl" ng-click="saveCanPublish('s')">guardar</button>
            <button class="btn btn-primary ml-xl" ng-click="saveCanPublish('syp')">guardar y publicar</button>
        </fieldset>
    </div>
</div>
<!-- END CONTROL OMT -->