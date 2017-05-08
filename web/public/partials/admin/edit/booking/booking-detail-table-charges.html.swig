
    <div class="row">
      <div class="col-md-3">
        <strong>Total:</strong>
      </div>
      <div class="col-md-2">{{booking.breakdown.charges.total| number:2}} {{booking.pricing.currency.symbol}}</div>
      <div class="col-md-2">
        <strong>F. Pago:</strong>
      </div>
      <div class="col-md-4">
        <span ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'" class="label label-success" >Pago fraccionado</span>
        <span ng-show="booking.paymentmodel == 'transfer-100' || booking.paymentmodel == 'tpv-100'" class="label label-success" >Pago 100%</span>
        <br />
        <a class="mt-xs" style="display: block;" href="">
          <i class="fa fa-pencil"></i> 
          <span ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'" ng-click="changepaymentmodel('split', '100')">Cambiar a Pago 100%</span>
          <span ng-show="booking.paymentmodel == 'transfer-100' || booking.paymentmodel == 'tpv-100'" ng-click="changepaymentmodel('100', 'split')">Cambiar a Pago fraccionado</span>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <strong>Pagado:</strong>
      </div>
      <div class="col-md-4">{{booking.breakdown.charges.current| number:2}} {{booking.pricing.currency.symbol}}       ({{ booking.breakdown.charges.current*100/booking.breakdown.charges.total | number:0}} %)</div>
    </div>
    <!-- 100% -->
    <div class="row">
      <div class="col-md-3">
        <strong>Pendiente:</strong>
      </div>
      <div class="col-md-4" ng-class="{ 'btn-lnk': booking.breakdown.charges.pending > 0, 'btn-danger': booking.breakdown.charges.pending > 0 }">{{booking.breakdown.charges.pending| number:2}} {{booking.pricing.currency.symbol}}       ({{ booking.breakdown.charges.pending*100/booking.breakdown.charges.total | number:0 }} %)</div>
    </div>
    <div class="row" ng-show="booking.paymentmodel == 'transfer-100' || booking.paymentmodel == 'tpv-100'" ng-init="edit100chargedate = false; ">
      <div class="col-md-3">
        <strong>Fecha limite:</strong>
      </div>
      <div class="col-md-3" ng-show="!edit100chargedate">
        {{ booking.dates.finalcharge.date | date:'dd/MM/yyyy' }}
        <a href="" ng-click="edit100chargedate = !edit100chargedate">
          <i class="fa fa-pencil"></i> Cambiar
        </a>
      </div>
      <div class="col-md-3" ng-hide="!edit100chargedate" ng-init="calendarName100charge = 'calendarName100charge'">
        <span class="input-group input-date">
          <input type="text"
          class="form-control input-sm"
          uib-datepicker-popup="dd-MM-yyyy"
          ng-model="booking.dates.finalcharge.date"
          datepicker-options="dateOptions"
          date-disabled="disabled(date, mode)"
          ng-required="true" close-text="Cerrar"
          current-text="Hoy" clear-text="Limpiar" is-open="calendar[calendarName100charge]" />
          <span class="input-group-btn">
            <button type="button" class="btn btn-alt" ng-click="open($event, 'calendar', calendarName100charge)">
              <i class="fa fa-calendar"></i>
            </button>
          </span>
        </span>
        <a class="btn btn-danger btn-xs" href="" ng-click="edit100chargedate = !edit100chargedate; justsave();">
          <i class="fa fa-pencil"></i> Guardar
        </a>
      </div>
    </div>
    <!-- SPLITED -->
    <div class="row mt-l mb-l" ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'" ng-init="editfirstsecondcharge = false; ">
      <div class="col-md-3" ng-click="editfirstsecondcharge = !editfirstsecondcharge">
        <a>
          <i class="fa fa-pencil"></i> Editar 1º y 2º cobro
        </a>
      </div>
      <div class="col-md-3" ng-show="editfirstsecondcharge">
        <button class="btn btn-danger btn-xs" ng-click="justsave()">Guardar</button>
      </div>
    </div>
    <!-- 1º cobro -->
    <div class="row" ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
      <div class="col-md-3">
        <strong>1º Cobro:</strong>
      </div>
      <div class="col-md-4" ng-show="!editfirstsecondcharge" ng-class="{ 'btn-lnk': booking.breakdown.charges.pending > 0, 'btn-danger': booking.breakdown.charges.pending > 0 }">
        {{booking.breakdown.charges.first.amount | number:2}} {{booking.pricing.currency.symbol}}       ({{ booking.breakdown.charges.first.amount*100/booking.breakdown.charges.total | number:0}} %)
      </div>
      <div class="col-md-3" ng-show="editfirstsecondcharge">
        <input ng-model="booking.chargefeatures.first.amount" type="number" class="bg-light input-sm form-control"></input>
      </div>
    </div>
    <div class="row" ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
      <div class="col-md-3">
        <strong>1º F. limite:</strong>
      </div>
      <div class="col-md-3" ng-show="!editfirstsecondcharge">{{ booking.breakdown.charges.first.date | date:'dd/MM/yyyy' }}</div>
      <div class="col-md-3" ng-show="editfirstsecondcharge" ng-init="calendarNamefirst = 'calendarforfirstcharge'">
        <span class="input-group input-date">
                      <input type="text"
                      class="form-control input-sm"
                      uib-datepicker-popup="dd-MM-yyyy"
                      ng-model="booking.chargefeatures.first.date"
                      datepicker-options="dateOptions"
                      date-disabled="disabled(date, mode)"
                      ng-required="true" close-text="Cerrar"
                      current-text="Hoy" clear-text="Limpiar" is-open="calendar[calendarNamefirst]" />
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-alt" ng-click="open($event, 'calendar', calendarNamefirst)"><i class="fa fa-calendar"></i></button>
                      </span>
                    </span>           
      </div>
    </div>
    <br />
    <!-- 2º cobro -->
    <div class="row" ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
      <div class="col-md-3">
        <strong>2º Cobro:</strong>
      </div>
      <div ng-show="!editfirstsecondcharge" class="col-md-4" ng-class="{ 'btn-lnk': booking.breakdown.charges.pending > 0, 'btn-danger': booking.breakdown.charges.pending > 0 }">
        {{booking.breakdown.charges.second.amount | number:2}} {{booking.pricing.currency.symbol}}       ({{ booking.breakdown.charges.second.amount*100/booking.breakdown.charges.total | number:0}} %)
      </div>
      <div ng-show="editfirstsecondcharge" class="col-md-3">
        <input ng-model="booking.chargefeatures.second.amount" type="number" class="bg-light input-sm form-control"></input>
      </div>
    </div>
    <div class="row" ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'">
      <div class="col-md-3">
        <strong>2º F. limite:</strong>
      </div>
      <div class="col-md-3" ng-show="!editfirstsecondcharge">{{ booking.breakdown.charges.second.date | date:'dd/MM/yyyy' }}</div>
      <div class="col-md-3" ng-show="editfirstsecondcharge" ng-init="calendarNamesecond = 'calendarforsecondcharge'">
        <span class="input-group input-date">
          <input type="text"
          class="form-control input-sm"
          uib-datepicker-popup="dd-MM-yyyy"
          ng-model="booking.chargefeatures.second.date"
          datepicker-options="dateOptions"
          date-disabled="disabled(date, mode)"
          ng-required="true" close-text="Cerrar"
          current-text="Hoy" clear-text="Limpiar" is-open="calendar[calendarNamesecond]" />
          <span class="input-group-btn">
            <button type="button" class="btn btn-alt" ng-click="open($event, 'calendar', calendarNamesecond)">
              <i class="fa fa-calendar"></i>
            </button>
          </span>
        </span>
      </div>
    </div>
		<hr />
		<table class="table booking-detail" >
			<thead>
			<tr>
				<td class="middle">
					<strong>Recibo</strong> 
				</td>
				<td class="middle">
					Estado
				</td>
				<td class="middle">
					<strong>Metodo</strong> 
				</td>
				<td class="middle">
					Importe
				</td>
				<td class="middle">
				%
				</td>
				<td class="middle">
				Fecha
				</td>
			</tr>
			</thead>
			<tbody>
				<tr ng-repeat="pay in booking.payments" ng-if="pay.paymenttarget=='travelersense'">
					<td class="middle">
						{{pay.receiptnumber}}
					</td>
					<td class="middle">
						<span ng-if="pay.receiptnumber != null" class="label label-success"><i class="fa fa-check-circle"></i> valido</span>
						<span ng-if="pay.receiptnumber == null || pay.receiptnumber == ''" class="label label-danger"><i class="fa fa-check-danger"></i> pendiente</span>
					</td>
					<td class="middle">
						<span class="label label-danger" >{{pay.paymentmethod}}</span>
					</td>
					<td class="middle">
						{{ pay.amount  | number:2 }}{{pay.currency.symbol}}
					</td>
					<td class="middle">
						{{ (pay.amount*100)/booking.breakdown.charges.total | number:0 }}%
					</td>
					<td class="middle">
						<span >{{ pay.date | date:'dd/MM/yyyy' }}</span>
					</td>
				</tr>	
			</tbody>
		</table>

		