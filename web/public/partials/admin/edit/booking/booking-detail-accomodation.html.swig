<h4 class="iblock">Pasajeros</h4>
<a href="#" ng-if="rolename == 'affiliate'" uib-tooltip="Si quieres modificar los datos de los pasajeros de esta reserva contacta por mensajeria."><i class="fa fa-info-circle"></i></a>

<form id="accomodationbooking" class="" name="accomodationbooking" novalidate>
	<div class="row">
		<div class="col-md-12">
		<table class="table booking-detail">
			<thead>	
			<tr>
				<td class="middle">
					<label>Apellido</label>
				</td>
				<td class="middle">
					<label>Nombre</label>
				</td>
				<td class="middle" style="width: 150px;">
					<label>F. Nacimiento</label>
				</td>
				<td class="middle">
					<label>Edad</label>
				</td>
				<td class="middle" style="width: 200px;">
					<label>Nacionalidad</label>
				</td>
				<td class="middle">
					<label>Documento</label>
				</td>
				<td class="middle">
					<label>Número</label>
				</td>
				<td class="middle">
					<label>Habitación</label>
				</td>
			</tr>
			</thead>
			<tbody ng-repeat="room in booking.rooms" ng-init="numRoom = $index">
				<tr ng-repeat="paxit in getpaxes(room)" ng-init="calendarName = '' + numRoom + $index">
					<td class="middle">
						<input ng-show="editPassengers" type="text" name="input" ng-model="paxit.lastname" required ng-trim="false" class="form-control" />
						<span ng-hide="editPassengers" class="control-label">
						{{paxit.lastname}}
						</span>
					</td>
					<td class="middle">
						<input ng-show="editPassengers" type="text" name="input" ng-model="paxit.name" required ng-trim="false" class="form-control" />
						<span ng-hide="editPassengers" class="control-label">
						{{paxit.name}}
						</span>
					</td>
					<td class="middle">
					<span class="input-group input-date" ng-show="editPassengers">
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
						<span ng-hide="editPassengers" class="control-label">
              {{paxit.birthdate | date:'dd-MM-yyyy'}}
            </span>
					</td>
					<td class="middle">
            {{_get_age(paxit.birthdate)}}
          </td>
					<td class="middle" >
            <span class="control-label">
              {{paxit.country.name_es || paxit.country.label_es}}
            </span>
					</td>
					<td class="middle">
						<select ng-show="editPassengers" class="form-control" name="doctype" id="doctype" ng-model="paxit.documenttype" required="">
                                <option value="dni/nif">DNI/NIF</option>
                                <option value="nie">NIE</option>
                                <option value="passport">Pasaporte</option>
						</select>
						<span ng-hide="editPassengers" class="control-label">
						{{paxit.documenttype}}
						</span>
					</td>
					<td class="middle">
						<input ng-show="editPassengers" type="text" name="input" ng-model="paxit.documentnumber" required ng-trim="false" value="{{ paxit.documentnumber }}" class="form-control" />
						<span ng-hide="editPassengers" class="control-label">
						{{paxit.documentnumber}}
						</span>
					</td>
					<td class="middle">
						{{showRoomNameSpanish(room.roomcode)}}
					</td>
				</tr>	
			</tbody>

		</table>
		<p class="text-right mt-l">
			<a class="btn btn-primary" ng-show="editPassengers" ng-click="updatePassengers()">Guardar</a>
		</p>
		</div>
	</div>
  <br></br>
  <div class="row" ng-show="booking.bookingmodel == 'whitelabel' && booking.status != 'cancelled' && booking.status != 'invalid' && booking.status != 'onbudget'">
    <div class="col-md-6 text-right"> </div>
    <div class="col-md-6">
      <table class="table">
        <tr>
          <td>
            <label class="control-label">Mail recordatorio segundo pago: </label>
            <a class="btn btn-primary" ng-click="lastchargemail()">Enviar</a>
          </td>
          <td>
            <label class="control-label">Email: </label>
            <input type="text" name="input input-sm" ng-model="booking.signin.email" required="" ng-trim="false" value="{{ booking.signin.email }}" class="form-control" />
          </td>
          <td>
            <label class="control-label">Telefono/Movil: </label>
            <input type="text" name="input input-sm" ng-model="booking.signin.phone" required="" ng-trim="false" value="{{ booking.signin.phone }}" class="form-control" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</form>