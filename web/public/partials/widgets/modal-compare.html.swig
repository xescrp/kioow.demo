<div class="modal-header mb-xs text-right hidden-xs">
    <button class="btn btn-danger absolute btn-xs" style="top: 0; right: 0;" ng-click="exit()"><i class="fa fa-times"></i></button>
</div>
<div class="modal-body mt-b text-center hidden-xs">
     <div class="row">
        <h3 class="text-center thin pb-l comparing">Comparación de viajes</h3>

        <div class="preloader solo" ng-class="{'in' : !loaded}"><span></span><span></span><span></span></div>

         <div class="col-md-3 col-sm-3" ng-repeat="result in cproducts" ng-show="loaded">
            <div class="info-block well padded-zero relative request-offer">
                <header>
                    <span class="request-offer-num">{{$index+1}}</span>
                    <h4 class="text-alternate comparing-title uppercase h5 padded-xs mb-xs">{{result.title_es}}</h4>
                    <p class="text-center text-gray mb-b "><i class="fa fa-clock-o"></i>&nbsp;{{result.itinerarylength}} días</p>
                </header>

              <!-- if it has categories -->
              <div ng-if="result.allcats">
                <div class="mt-b" ng-show="result.allcats">Elige tu opción:</div>
                <div class="btn-group mb-b pt-zero mt-zero dropdown" ng-show="result.allcats" uib-dropdown="" on-toggle="toggled(open)">
                  <button  type="button" class="btn mt-b btn-xs btn-link dropdown-toggle" id="simple-dropdown" uib-dropdown-toggle="" ng-disabled="disabled">
                    {{result.categoryname.label_es}}
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" uib-dropdown-menu="" aria-labelledby="simple-dropdown">
                    <li role="menuitem" ng-repeat="(cat, code) in result.allcats">
                      <a href="" ng-click="updateCompare(code, result.allcats, result.allrelateds, $parent.$index)" target="_self">{{cat}}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div ng-if="!result.allcats" class="mt-b mb-b" style="padding:26px;">
              </div>
              
                <img class="img-responsive" ng-src="{{getimage(result.productimage.url, 'resultimage')}}" />

                <div class="bg-red-mid text-light padded-b">
                    <span class="italic"><span ng-if="brandpath">PVP </span>por persona en base doble</span>
                    <div>
                        <h2 class="bold marged-zero">{{result.pvp.b2b | number : fractionSize}}<span class="h4-sized">{{ result.pvp.currency.symbol }}</span></h2>
                        <span class="italic mt-b ">{{result.pvp.b2b / result.itinerarylength | number : 0}}{{ result.pvp.currency.symbol }} / día</span>
                    </div>
                    <!--<div ng-hide="brandpath">
                        --><!-- if is EUR --><!--
                        <div ng-if="result.minprice.currency.value == 'EUR'">
                            <h2 class="bold marged-zero">{{result.minprice.value | number : fractionSize}}<span class="h4-sized">{{result.minprice.currency.symbol}}</span></h2>
                            <span class="italic mt-b ">{{result.minprice.value/result.itinerarylength | number : 0}}{{result.minprice.currency.symbol}} / día</span>
                        </div>
                        --><!-- if is not EUR --><!--
                        <div ng-if="result.minprice.currency.value != 'EUR'">
                            <h2 class="bold marged-zero">{{result.minprice.exchange.value | number : fractionSize}}<span class="h4-sized">{{result.minprice.exchange.currency.symbol}}</span></h2>
                            <span class="italic mt-b ">{{result.minprice.exchange.value/result.itinerarylength | number : 0}}{{result.minprice.exchange.currency.symbol}} / día</span>
                        </div>
                    </div>-->
                    <a target="_blank" href="/viaje/{{ result.slug_es }}/{{ querystring }}" class="btn btn-empty btn-block mt-b mb-b">Ver Más</a>
                </div>

                <!--<div class="mt-b" ng-show="result.allcats">Elige tu opción:</div>
                <div class="btn-group mb-b pt-zero mt-zero dropdown" ng-show="result.allcats" uib-dropdown on-toggle="toggled(open)">
                  <button id="single-button" type="button" class="btn mt-b btn-xs btn-link dropdown-toggle" id="simple-dropdown" uib-dropdown-toggle ng-disabled="disabled">
                        {{result.categoryname.label_es}}
                    <span class="caret"></span>
                  </button>

                  <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                    <li role="menuitem" ng-repeat="(cat, code) in result.allcats">
                      <a href ng-click="updateCompare(code, result.allcats, result.allrelateds, $parent.$index)" target="_self">{{cat}}</a>
                    </li>
                  </ul>

                </div>-->

                <div class="details text-left padded-b" ng-show="result.mealstext">
                    <span class="uppercase block omb-zero">COMIDAS</span>    
                    <span>{{result.mealstext}}</span>
                </div>
                <div class="details text-left padded-b">
                    <span class="uppercase block mb-zero">HOTELES</span>    
                    <span>{{result.hotels}}</span>
                </div>
                <div class="details text-left padded-b">
                    <span class="uppercase block mb-zero">ITINERARIO</span>    
                    <ul class=" padded-zero list-unstyled">
                        <li ng-repeat="it in result.itinerary">
                            <strong class="text-red">{{$index+1}}.&nbsp;</strong>
                            <strong>{{getItineraryDay(it)}}</strong>
                            <span class="text-gray mb-b pb-b" ng-repeat="act in it.activities">
                                <span class="pb-xs italic pl-b" style="padding-left: 18px; display: block;">
                                    {{act.title_es}}<br/>
                                    <span ng-show="act.ticketsincluded"> - tickets incluidos</span>
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
                <hr class="marged-zero" />
                <div class="dmc-profile-widget padded-b text-left" ng-show="!isWhiteLabel">
                    <a href="{{brandpath}}/receptivo/{{result.dmc.code}}/{{result.dmc.company.name}}" target="_blank">
                    <img class="img-circle avatarm42" ng-src="{{getimage(result.dmc.images.logo.url, 'avatarm42')}}" />
                    </a>
                    <p class="dmc-text">
                    por <a href="{{brandpath}}/receptivo/{{result.dmc.code}}/{{result.dmc.company.name}}" target="_blank">{{result.dmc.company.name}}</a>
                    </p>
                </div>

            </div>
         </div>
     </div>
</div>