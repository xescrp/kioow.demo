
		<div class="row">
			<div class="col-md-3"><strong>Total DMC:</strong></div>
			<div class="col-md-2">{{booking.breakdown.payments.total| number:2}} {{booking.dmc.currency.symbol}}</div>
		</div>
		<div class="row">
			<div class="col-md-3"><strong>Pagado:</strong></div>
			<div class="col-md-4">{{booking.breakdown.payments.current| number:2}} {{booking.dmc.currency.symbol}}       ({{ booking.breakdown.payments.current*100/booking.breakdown.payments.total | number:0}} %)</div>
		</div>
    <div class="row">
      <div class="col-md-3"><strong>Pendiente:</strong></div>
      <div class="col-md-4" ng-class="{ 'btn-lnk': booking.breakdown.payments.pending > 0, 'btn-danger': booking.breakdown.payments.pending > 0 }">{{booking.breakdown.payments.pending | number:2}} {{booking.dmc.currency.symbol}}       ({{ booking.breakdown.payments.pending*100/booking.breakdown.payments.total | number:0}} %)</div>
    </div>
		<div class="row">
			<div class="col-md-3"><strong>Fecha limite:</strong></div>
			<div class="col-md-3">{{ booking.dates.finalpayment.date | date:'dd/MM/yyyy' }}</div>
		</div>
    <div class="row">
      <div class="col-md-12">
        <p class="mt-xl alert alert-info">
          <i class="fa fa-info-circle"></i> Política de pago: <strong>
            {{booking.dmc.membership.paymentoption._es}}
          </strong>
        </p>
      </div>
    </div>
    <br />
    <div class="row" ng-show="booking.bookingmodel=='whitelabel'">
      <div class="col-md-3"><strong>Total AAVV (whitelabel) :</strong></div>
      <div class="col-md-2">{{booking.breakdown.payments.totalagency | number:2 }} {{booking.pricing.currency.symbol}}</div>
    </div>
    <div class="row" ng-show="booking.bookingmodel=='whitelabel'">
      <div class="col-md-3"><strong>Pagado: </strong></div>
      <div class="col-md-4">{{booking.breakdown.payments.currentagency | number:2}} {{booking.dmc.currency.symbol}}       ({{ booking.breakdown.payments.current*100/booking.breakdown.payments.totalagency | number:0}} %)</div>
      
    </div>
    <div class="row" ng-show="booking.bookingmodel=='whitelabel'">
      <div class="col-md-3"><strong>Pendiente:</strong></div>
      <div class="col-md-4" ng-class="{ 'btn-lnk': booking.breakdown.payments.pendingagency > 0, 'btn-danger': booking.breakdown.payments.pendingagency > 0 }">{{booking.breakdown.payments.pendingagency | number:2}} {{booking.pricing.currency.symbol}}       ({{ booking.breakdown.payments.pendingagency*100/booking.breakdown.payments.totalagency | number:0}} %)</div>
    </div>
		<hr />
		<table class="table booking-detail" >
			<thead>
			<tr>
				<td class="middle">
					<strong>Transfer</strong> 
				</td>
				<td class="middle">
					Estado
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
				%
				</td>
				<td class="middle">
				Fecha
				</td>
			</tr>
			</thead>
			<tbody>
				<tr ng-repeat="pay in booking.payments" ng-if="pay.paymenttarget=='provider' || pay.paymenttarget=='agency'">
					<td class="middle">
            {{pay.transferid}}
          </td>
					<td class="middle">
						<span ng-if="pay.transferid != null" class="label label-success"><i class="fa fa-check-circle"></i> valido</span>
						<span ng-if="pay.transferid == null || pay.transferid == ''" class="label label-danger"><i class="fa fa-check-danger"></i> pendiente</span>
					</td>
					<td class="middle">
						<span class="label label-danger" >{{pay.paymentmethod}}</span>
					</td>
          <td class="middle">
            <span class="label" uib-tooltip="{{ pay.paymenttarget == 'provider' ? booking.dmc.company.name : booking.affiliate.company.name }}"
                  ng-class="{ 'label-danger' : pay.paymenttarget == 'provider', 'label-success' : pay.paymenttarget == 'agency' }">{{pay.paymenttarget}}</span>
          </td>
					<td class="middle">
						{{ pay.amount  | number:2 }}{{pay.currency.symbol}}
					</td>
					<td class="middle">
						{{ (pay.amount*100)/booking.breakdown.payments.total | number:0 }}%
					</td>
					<td class="middle">
						<span >{{ pay.date | date:'dd/MM/yyyy' }}</span>
					</td>
				</tr>
			</tbody>
		</table>
		