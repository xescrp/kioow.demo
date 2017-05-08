<table class="table booking-detail" ng-show="toggable.paymentsedit">
			<thead>
			<tr>
        <td></td>
				<td class="middle">
					<strong>Tranfer Id</strong> 
				</td>
				<td class="middle">
					<strong>Metodo</strong> 
				</td>
        <td class="middle">
          <strong>Receptor</strong>
        </td>
				<td class="middle">
					Importe
				</td>
				<td class="middle">
				Fecha
				</td>
			</tr>
			</thead>
			<tbody>
				<tr ng-repeat="pay in booking.payments" ng-if="pay.paymenttarget=='provider' || pay.paymenttarget=='agency'" >
          <td class="middle text-center" ng-init="calendarName = 'calendarfor' + pay.receiptnumber + '_' + $index">
            <a href="" class="text-danger small" ng-click="removeitem('payment', pay)">
              <i class="fa fa-trash-o fa-lg"></i>
            </a>
          </td>
					<td class="middle text-center">
						<input type="text" name="input" ng-model="pay.transferid" required ng-trim="false" class="form-control"/>
					</td>
					<td class="middle text-center">
						<select class="bg-light form-control" name="paymethod" id="paymethod" ng-model="pay.paymentmethod" required="">
						  <option value="transfer">transfer</option>
						  <option value="tpv">tpv</option>
						  <option value="other">otros</option>
						</select>
					</td>
          <td class="middle text-center">
            <select class="bg-light form-control" name="target" id="paymenttarget" ng-model="pay.paymenttarget" required="">
              <option value="provider">proveedor</option>
              <option value="agency">agencia</option>
            </select>
          </td>
					<td class="middle text-center">
						<input type="text" name="input" ng-model="pay.amount" required ng-trim="false" class="form-control"/>
					</td>
					<td class="middle text-center">
					<span class="input-group input-date">
                      <input type="text"
                      class="form-control"
                      uib-datepicker-popup="dd-MM-yyyy"
                      ng-model="pay.date"
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
				</tr>	
			</tbody>
      <tfoot>
        <td colspan="5" class="text-right">
          <button id="saveChargesEdit" type="button" class="btn-primary btn mt-l" data-dismiss="modal" ng-click="saveallpayments()"> Guardar </button>
        </td>
      </tfoot>
		</table>
