<h4>PVP Cliente</h4>
<form id="pricebooking" class="" name="pricebooking" novalidate>
	<div class="row">
		<div class="col-md-4">
		<table class="table booking-detail">
			<thead>	
			<tr>
				<td class="middle">
					<label>Nº PAX: </label>
				</td>
				<td class="middle">
					<label>Habitación</label>
				</td>
				<td class="middle">
					<label>PVP PAX </label>
				</td>
			</tr>
      </thead>
			<tbody>
        <tr ng-repeat="pricekey in booking.breakdown.roomsbyprice.agency.keys">
          <td class="middle">
            {{booking.breakdown.roomsbyprice.agency[pricekey].paxes}}
          </td>
          <td>
            {{booking.breakdown.roomsbyprice.agency[pricekey].room}}
          </td>
          <td>
            {{booking.breakdown.roomsbyprice.agency[pricekey].price}} {{booking.pricing.currency.symbol}}
          </td>
        </tr>				
			</tbody>
			<tfoot class="bg-soft">
				<tr>
					<td class="middle">
					</td>
					<td class="middle">
						<strong>PVP Total:</strong>
					</td>
					<td class="middle">
						<strong>{{booking.breakdown.agency.pvp| number }} {{booking.pricing.currency.symbol}}</strong>
					</td>
				</tr>
        <tr>
          <td colspan="3">
            ATENCION! Este no es el NETO a pagar. Este es tu PVP, dependiendo del margen que hayas configurado en tu cuenta, o en esta reserva.
          </td>
        </tr>
			</tfoot>

		</table>
		</div>
		<div class="col-md-8">
    </div>
	</div>
</form>