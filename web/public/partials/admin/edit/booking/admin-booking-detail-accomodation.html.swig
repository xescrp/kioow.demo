<h4 class="iblock bold">Pasajeros</h4>
<form id="accomodationbooking" name="accomodationbooking" novalidate>
            <table class="table mb-zero">
              <thead> 
              <tr>
                <td></td>
                <td class="middle">
                  Apellido
                </td>
                <td class="middle">
                  Nombre                      
                </td>
                <td class="middle">
                  Fec. Nac.
                </td>
                <td class="middle">
                  Nac.
                </td>
                <td class="middle">
                  Doc.
                </td>
                <td class="middle">
                  Número
                </td>
                <td class="middle">
                  Hab.
                </td>  
				        <td class="middle">
                  Neto DMC
                </td>  
				        <td class="middle">
                  Curr.
                </td>
              <td class="middle">
                  Neto AAVV
                </td>  
              <td class="middle">
                  Curr.
                </td>  
              </tr>
              </thead>
              <tbody ng-repeat="room in booking.rooms" ng-init="numRoom = $index">
                <tr ng-repeat="paxit in getpaxes(room)" ng-init="calendarName = '' + numRoom + $index">
                  <td class="middle text-center">
                    <a href="" class="text-danger small" ng-click="removepax(paxit, room)">
                      <i class="fa fa-trash-o fa-lg"></i>
                    </a>
                  </td>
                  <td class="middle text-center">
                    <input type="text" name="input" ng-model="paxit.lastname" required ng-trim="false" class="form-control" />            
                  </td>
                  <td class="middle text-center">
                    <input type="text" name="input" ng-model="paxit.name" required ng-trim="false" class="form-control"/>                      
                  </td>
                  <td class="middle text-center per15">
                  <span class="input-group input-date">
                      <input type="text"
                      class="form-control"
                      uib-datepicker-popup="dd-MM-yyyy"
                      ng-model="paxit.birthdate"
                      max-date="dt"
                      datepicker-options="dateOptions"
                      date-disabled="disabled(date, mode)"
                      ng-required="true" close-text="Cerrar"
                      current-text="Hoy" clear-text="Limpiar" is-open="calendar[calendarName]" />
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-alt" ng-click="open($event, 'calendar', calendarName)"><i class="fa fa-calendar"></i></button>
                      </span>
                    </span>           
                  </td>
                  <td class="middle text-center" ng-init="paxit.country = paxit.country != null ? _findcounty(paxit.country.slug) : _findcounty(paxit.documentexpeditioncountry.slug);">
                    <select class="form-control" name="nationality" id="nationality" 
					                  ng-model="paxit.country" 
                            ng-options="country.name_es for country in nationalities |  orderBy:'name_es':reverse" 
                            required ></select>
                  </td>
                  <td class="middle text-center per10">
                    <select class="form-control" name="doctype" id="doctype" ng-model="paxit.documenttype" required="">
                      <option value="dni/nif">DNI/NIF</option>
                      <option value="nie">NIE</option>
                      <option value="passport">Pasaporte</option>
                    </select>           
                  </td>
                  <td class="middle text-center">
                    <input  type="text" name="input" ng-model="paxit.documentnumber" required ng-trim="false" value="{{ paxit.documentnumber }}" class="form-control" />           
                  </td>
                  <td class="middle text-center">
                    <span class="small">
                      {{showRoomNameSpanish(room.roomcode)}}
                    </span>
                  </td> 
				          <td class="middle text-center">
                    <span class="small">
                      <input  type="number" name="input" ng-model="paxit.dmc" required ng-trim="false" value="{{ paxit.dmc }}" class="form-control" /> 
                    </span>
                  </td> 
				          <td class="middle text-center">
                    <span class="small">
                      {{booking.dmc.currency.symbol}}
                    </span>
                  </td> 
                <td class="middle text-center">
                    <span class="small">
                      <input  type="number" name="input" ng-model="paxit.net" required ng-trim="false" value="{{ paxit.net }}" class="form-control" /> 
                    </span>
                  </td> 
				          <td class="middle text-center">
                    <span class="small">
                      {{booking.pricing.currency.symbol}}
                    </span>
                  </td> 
                </tr>
                <tr ng-if="room.paxlist.length < 4">
                <!-- si es el ultimo pax de la habitacion muestro el enlace -->
                  <td colspan="11" class="text-right">
                    <a href="" class="btn btn-link btn-xs" ng-click="agregarPax(room)">
                    <i class="fa fa-plus"></i> agregar pasajero
                    </a>
                  </td> 
                </tr>
              </tbody>
            </table>
            
            <hr class="mt-b mb-b" />
            <p class="text-center mt-l">
              <a class="btn btn-default" ng-click="addRoom()">
              <i class="fa fa-plus"></i> Agregar Habitación
              </a>     
            </p>

  <hr class="mt-b mb-b" />
  <div class="row">
    <div class="col-md-5">
      
    </div>
    
    <div class="col-md-5">
      <button id="saveNewAccomodationPVP"
                  uib-tooltip="Modificar el neto del DMC/AAVV y actualizar el PVP del cliente (aplicar las reglas de precios/rentabilidad)"
                  type="button" class="btn-primary btn" data-dismiss="modal" ng-click="updatePrice('paxes', true)"> Modificar PVP Cliente</button>
      <span class="ml-l"> fee: <input type="text" id="edprofit" 
              ng-model="booking.pricing.fee" 
              style="width: 50px; display: inline-block;margin-left: 7px;margin-top: 6px;" required 
              ng-trim="false" class="form-control" /> % 
              <a href="#" uib-tooltip="Fee de agencia (cuenta): {{ booking.affiliate.fees.unique }} % 
                 Especifica el fee a aplicar a esta booking." class="ng-scope"><i class="fa fa-info-circle"></i></a>
    </span>
    </div>
    <div class="col-md-2">
      <button id="saveNewAccomodationNOPVP"
                  uib-tooltip="Click aqui si solo quieres modificar el neto del DMC/AAVV sin propagar los cambios de PVP del cliente."
                  type="button" style="margin-top:6px;" class="btn-success btn" data-dismiss="modal" ng-click="updatePrice('paxes', false)">Guardar </button>
    </div>
  </div>
</form>




