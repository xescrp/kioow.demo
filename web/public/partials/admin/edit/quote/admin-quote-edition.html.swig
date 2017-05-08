                          
<div>
    <div class="panel panel-default">
    <!-- control omt -->
    <div class="panel-heading">
        <p class="pt-b"><span class="h4">Control Administrador</span> para respuesta {{dmcresponse.code}} de <strong>{{dmc.name}}</strong> |
          <span class="label label-danger pl-b pr-b" ng-show="dmcresponse.status == 'new' || dmcresponse.status == 'draft'">
            <i class="fa fa-warning"></i> En proceso
          </span>
          <span class="label label-warning pl-b pr-b" ng-show="dmcresponse.status == 'under review'">
            <i class="fa fa-warning"></i> Validar OMT
          </span>
          <span class="badge pl-b pr-b" ng-show="dmcresponse.status == 'published'">
            <i class="fa fa-file-o"></i>  Cotizada
          </span>
          <span class="label label-success" ng-if="dmcresponse.status == 'win'">
            <i class="fa fa-trophy"></i>  Seleccionada
          </span>
          <span class="label label-danger" ng-if="dmcresponse.status == 'discard' || dmcresponse.status == 'lost'">
            <i class="fa fa-trash-o"></i>  Descartada
          </span>
        <span class="pull-right mt-zero pt-zero">

            <span class="">
            <a class="btn btn-link btn-xs" ng-show="!showChat" ng-click="showChat = true">
                <i class="fa fa-comments"></i> Ver chat
            </a>
            <a class="btn btn-link btn-xs" ng-show="showChat" ng-click="showChat = false">
                <i class="fa fa-comments"></i> Ocultar chat
            </a>
            </span>
            <button class="btn btn-xs btn-default danger" ng-click="showCancel = true" 
                ng-show="(!dmcresponse.code || !dmcresponse.products || !dmcresponse.products.code || !showCancel) && dmcresponse.status != 'win' && dmcresponse.status != 'lost' && dmcresponse.status != 'cancelled' && dmcresponse.status != 'discard'" >
            <i class="fa fa-trash-o"></i> descartar quote
            </button>
            <span ng-show="showCancel" class="ng-hide">
            ¿Estás seguro de descartar? <a class="btn btn-xs btn-danger" ng-click="discardRequest()">Si</a> 
            <a class="btn btn-xs btn-default" ng-click="showCancel = false">cancelar</a>
            </span>
        </span>
        </p>
    </div>

    <!-- comision omt -->
    <div class="panel-body">
        <div ng-if="dmcresponse.status == 'discard'" class="alert alert-dismissable alert-danger">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>Solicitud descartada por el cliente</strong> 
        <br />
        Motivo: 
        <span class="italic" ng-if="dmcresponse.cancelled.reason == 'price'">
            "no me cuadra por precio"
        </span>
        <span class="italic" ng-if="dmcresponse.cancelled.reason == 'services'">
            "no me cuadran los servicios"
        </span>
        </div>
        <form class="form-inline" ng-show="dmcresponse.status != 'draft'">
        <div class="form-group text-l mr-b" ng-show="dmcresponse.code != null && dmcresponse.products != null && dmcresponse.products.code != null">
            PRECIO NETO:
            <label><strong>{{dmcresponse.netPrice.value}}</strong> {{dmcresponse.netPrice.currency.symbol}}</label> 
            <label ng-show="dmcresponse.netPrice.currency.value != 'EUR'"> / <strong>{{exchangeValue(dmcresponse.netPrice.value, dmcresponse.netPrice.currency.value, 'EUR')}}</strong> €</label>
                                     
            <span class="text-gray-light-base ml-b mr-b">+</span>

            <label for="comissionOmt">Comisión OMT </label> 
                                      
            <strong ng-if="dmcresponse.status != 'under review' && dmcresponse.status != 'published'">{{dmcresponse.comission}}%</strong>

            <div class="input-group" ng-if="dmcresponse.status != 'win'">
            <input class="ml-b form-control" ng-model="dmcresponse.comission" 
				        name="comissionOmt" type="number" ng-change="recalculatePVP()" 
				        placeholder="15" min="0" max="90"/><span class="input-group-addon">%</span>
            </div>


            <span class="text-gray-light-base ml-b mr-b">=</span>
            PVP:                                          
            <label><strong>{{dmcresponse.amount.value  | number : 0}}</strong> {{dmcresponse.amount.currency.symbol}}</label>
            <label ng-show="dmcresponse.amount.currency.value != 'EUR'"> / <strong>{{ exchangeValue(dmcresponse.amount.value, dmcresponse.amount.currency.symbol, 'EUR')  | number : 0}}</strong> €</label>
        </div>


          <label class="checkbox-inline">
            <input ng-model="publishquote" type="checkbox" id="publishquote" value="dmcresponse.status == 'published'" class="ml-l mr-l" /> Publicar
          </label>
          
        <a href="#save"  
           ng-show="['win', 'lost', 'cancelled', 'discard'].indexOf(dmcresponse.status) < 0" 
           ng-click="saveQuote(dmcresponse)" id="step8publishbutton" class="mr-b btn btn-alt">guardar</a>


          

          <a class="iblock pt-xl" ng-href="#desglose" ng-click="showbreakdown = !showbreakdown" >
            Desglose <div class="relative">
              <div class="bottom popover in" style="width: 600px !important; max-width: 600px !important" 
                   ng-show="showbreakdown" ng-init="breakdownurl = '/partials/popup/admin-quote-breakdown.html?d=dd'">
                <div ng-include="breakdownurl"></div>
              </div>
            </div>
          </a>
        </form> 

        <!-- si es la pestana seleccionada -->
        <div >                              
        <!-- init messages chat -->                                   

            <div ng-chat ng-if="dmcresponse.dmccode"
            referenceobj="dmcresponse._id"
            referencetype="'quote'"
            lang="'ES'"
            usertype = "'travelersense'"
            fromcode="themember.code"
            tocode="dmcresponse.dmccode"
            showempty="'true'"
            ng-cloak 
            ng-show="showChat">
            </div> 
        <!-- end messages chat --> 
        </div>
      <hr />
        <div>
        <!-- date inputs -->
        <div class="row">
            <!-- operation date -->
            <div class="form-group col-md-3 mb-l">
            <label class="control-label mr-b mid-sized" for="operationstart">
                Operation Date <b>*</b>
            </label>
            <div class="input-group">
                <p class="input-group">
                <input type="text" class="form-control"
                        uib-datepicker-popup="{{format}}"
                        id="operationstart"
                        ng-model="dmcresponse.operationStartDate"
                        is-open="datePicker.openedfrom"
                        min-date="today"
                        max-date="modifier.max"
                        datepicker-options="dateOptions"
                        ng-change="checkDateOperation()"
                        date-disabled="disabled(date, mode)"
                        ng-required="true"
                        close-text="Close"
                        placeholder="yyyy/mm/dd"/>
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default"
                            ng-click="openOperation($event)">
                    <i class="fa fa-calendar"></i>
                    </button>
                </span>
                </p>
            </div>
            </div>
            <!-- fecha validez-->
            <div class="form-group col-md-3 mb-l">
            <label class="control-label mr-b mid-sized" for="datevaliduntil">
                Quote valid until <b>*</b>
            </label>
            <div class="input-group">
                <p class="input-group">
                <input type="text"
                        class="form-control"
                        id="datevaliduntil"
                        uib-datepicker-popup="{{format}}"
                        ng-model="dmcresponse.quoteValidDate"
                        is-open="datePicker.openedto"
                        min-date="today"
                        max-date="modifier.max"
                        ng-change="checkDateValidUntil()"
                        datepicker-options="dateOptions"
                        date-disabled="disabled(date, mode)"
                        ng-required="true" close-text="Close" placeholder="yyyy/mm/dd"/>
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default"
                            ng-click="openValid($event)">
                    <i class="fa fa-calendar"></i>
                    </button>
                </span>
                </p>
            </div>
            <small class="italic">The minimum validity is one week</small>
            </div>
        </div>
        <hr class="mt-zero" />
        <div class="row">
            <div class="col-md-6">
            <p class="mid-sized">
                Net Prices: <b class="text-red">*</b>
            </p>
            <div class="bordered padded-l pt-zero pb-zero bb-none">
                <div class="row">
                <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Room type</h5>
                <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Passengers</h5>
                <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Net Price per pax</h5>
                </div>
                <div class="row">
                <hr class="mt-zero mb-l" />
                </div>
                <div class="row mb-l pb-l bordered-bottom">
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Single Room</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Adult</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="input-group">
                    <input type="number" min="0" restrict-input="^[0-9-]*$"  class="form-control" ng-model="dmcresponse.rooms.single.pricePerPax.value" ng-change="roundValueSingle()" />
                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.single.pricePerPax.currency.symbol}}</span>
                    </div>
                </div>
                </div>
                <div class="row mb-l pb-l bordered-bottom ">
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Double</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Adult</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="input-group">
                    <input type="number" min="0" restrict-input="^[0-9-]*$"  class="form-control" ng-model="dmcresponse.rooms.double.pricePerPax.value" ng-change="roundValueDouble()" />
                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.double.pricePerPax.currency.symbol}}</span>
                    </div>
                </div>
                </div>
                <div class="row mb-l pb-l bordered-bottom ">
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Triple Room</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Adult</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="input-group">
                    <input type="number" min="0" restrict-input="^[0-9-]*$" class="form-control" ng-model="dmcresponse.rooms.triple.pricePerPax.value" ng-change="roundValueTriple()" />
                    <span class="input-group-addon border-none bg-light">{{dmcresponse.rooms.triple.pricePerPax.currency.symbol}}</span>
                    </div>
                </div>
                </div>
                <div class="row mb-l pb-l bordered-bottom ">
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Quad Room</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                    <strong>Adult</strong>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="input-group">
                    <input type="number" min="0" class="form-control" restrict-input="^[0-9-]*$" ng-model="dmcresponse.rooms.quad.pricePerPax.value" ng-change="roundValueQuad()" />
                    <span class="input-group-addon border-none bg-light" >{{dmcresponse.rooms.quad.pricePerPax.currency.symbol}}</span>
                    </div>
                </div>
                </div>
                <!-- ninios distribucion -->
                <div class="row mb-l pb-l bordered-bottom " ng-show="dmcresponse.children && dmcresponse.children.length >0" ng-repeat="child in dmcresponse.children">
                  <div class="col-md-4 col-sm-4 col-xs-4 pt-b">

                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4 pt-b">
                      <strong>Child {{child.age}} years old</strong>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4">
                      <div class="input-group">
                      <input type="number" min="0" restrict-input="^[0-9-]*$" class="form-control" ng-model="child.pricePerPax.value" ng-change="roundValueChild()" />
                          <span class="input-group-addon border-none bg-light">{{child.pricePerPax.currency.symbol}}</span>
                      </div>
                  </div>
                </div>
            </div>
            <br />
            <br />
            </div>
            <div class="col-md-6">
            <p class="mid-sized">
                Accommodation: <b class="text-red">*</b>
            </p>
            <div class="bordered padded-l pt-zero pb-zero bb-none">
                <div class="row">
                <div class="col-md-12 bordered-bottom">
                    <div class="row">
                    <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Room type</h5>
                    <h5 class="thin col-md-4 col-sm-4 col-xs-4 uppercase">Quantity</h5>
                    </div>
                </div>
                <div class="col-md-12 mt-l pb-l bordered-bottom">
                    <div class="row">
                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Single Room </strong>
                    <div class="col-md-3 col-sm-3 col-xs-3">
                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.single.quantity" placeholder="ej: 1"/>
                    </div>
                    </div>
                </div>
                <div class="col-md-12 mt-l pb-l bordered-bottom">
                    <div class="row">
                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Double Room</strong>
                    <div class="col-md-3 col-sm-3 col-xs-3">
                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.double.quantity" placeholder="ej: 1"/>
                    </div>
                    </div>
                </div>
                <div class="col-md-12 mt-l pb-l bordered-bottom">
                    <div class="row">
                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Triple Room</strong>
                    <div class="col-md-3 col-sm-3 col-xs-3">
                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.triple.quantity" placeholder="ej: 1"/>
                    </div>
                    </div>
                </div>
                <div class="col-md-12 mt-l pb-l bordered-bottom">
                    <div class="row">
                    <strong class="col-md-4 col-sm-4 col-xs-4 mt-b">Quad Room</strong>
                    <div class="col-md-3 col-sm-3 col-xs-3">
                        <input class="form-control inline" type="number" min="0" ng-model="dmcresponse.rooms.quad.quantity" placeholder="ej: 1"/>
                    </div>
                    </div>
                </div>
                </div>
                <div class="row mt-xl">
                  <div class="col-md-9"></div>
                  <div class="col-md-3">
                    <a href=""   
                       ng-click="recalculatePVP()" id="recalculatePVPBTN" class="btn btn-alt">validar</a>
                  </div>
                </div>
            </div>
            </div>
        </div>

        <!-- version sin ninios, carga automatica del importe -->
        <div class="row" ng-show="!dmcresponse.children || dmcresponse.children.length == 0">
            <div class="col-md-12 text-center">
            <h4 class="text-graydark">Total Net Price</h4>
            <p>{{getTotalPax()}}</p>
            <strong class="text-graydark">Total Net Price:</strong>
            <h3 class="h1 mt-zero text-gray bold">
                {{dmcresponse.amount.value}}<small class="bold"> {{dmcresponse.amount.currency.symbol}}</small>
            </h3>
            <small>
                Accommodation: <strong>{{getTotalDistribution(dmcresponse)}}</strong>
            </small>
            </div>
        </div>
        </div>

    </div>
    </div>
</div>
<!-- END CONTROL OMT -->
<!--<div programpreview 
        program="dmcresponse.products" 
        quote="dmcresponse"
        language="ES"
        openedit="dmcresponse.products == null"
        removeeditor="false"
        removebuttons="false" 
        showgetcopy="true" ></div>-->
<div>
  <programeditorworklet ng-if="dmcresponse != null" quote="dmcresponse" quotesavecallback="saveQuote" ng-cloak="">

  </programeditorworklet>
</div>