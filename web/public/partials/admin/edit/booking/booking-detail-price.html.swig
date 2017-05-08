<h4 class="iblock">Detalles</h4>
<form id="detailbookingpayment" class="" name="detailbookingpayment" novalidate>

	<div class="row">
		<div class="col-md-4">
			<h5 class="text-center bold padded-b bg-soft">PVP cliente
			</h5>

		<table class="table booking-detail mb-b">
			<thead>
			<tr>
				<td class="middle">
					<label>Nº PAX: </label>
				</td>
				<td class="middle">
					<label>Habitación</label>
				</td>
				<td class="middle" style="width:150px;">
					<label>PVP PAX </label>
				</td>
			</tr>
			</thead>
			<tbody>
        <tr ng-repeat="pricekey in booking.breakdown.roomsbyprice.agency.keys">
          <td class="middle" >
            {{booking.breakdown.roomsbyprice.agency[pricekey].paxes}}
          </td>
          <td class="middle">
            {{booking.breakdown.roomsbyprice.agency[pricekey].room}}
          </td>
          <td class="middle" ng-hide="editPrice">
            {{booking.breakdown.roomsbyprice.agency[pricekey].price}} {{booking.pricing.currency.symbol}}
          </td>
          <td class="middle" ng-show="editPrice">
            <input type="number" id="edit_{{pricekey}}" ng-model="booking.breakdown.roomsbyprice.agency[pricekey].price" required="" ng-trim="false" class="form-control" />
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
			</tfoot>
		</table>
		<p class="text-right" ng-if="rolename=='affiliate'">
			<button ng-hide="editPrice || booking.status == 'cancelled' || bookingIsWhiteLabel" type="button" class="btn btn-link btn-xs" ng-click="toggle('editPrice')">
				<i class="fa fa-pencil"></i>
				 Modificar PVP
			</button>
			<button ng-show="editPrice" class="btn btn-primary btn-xs" ng-click="updatePrice('pvp', true); toggle('editPrice')">Guardar</button>
		</p>
		</div>

		<div class="col-md-4" ng-show="booking.bookingmodel != 'whitelabel'">
		<h5 class="text-center bold padded-b bg-soft">Neto a abonar yourttoo.com</h5>
      <table class="table booking-detail mb-b">
        <thead>
          <tr>
            <td class="middle">
              <label>Nº PAX: </label>
            </td>
            <td class="middle">
              <label>Habitación</label>
            </td>
            <td class="middle" style="width:150px;">
              <label>Neto PAX </label>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="pricekey in booking.breakdown.roomsbyprice.travelersense.keys">
            <td class="middle">
              {{booking.breakdown.roomsbyprice.travelersense[pricekey].paxes}}
            </td>
            <td class="middle">
              {{booking.breakdown.roomsbyprice.travelersense[pricekey].room}}
            </td>
            <td class="middle">
              {{booking.breakdown.roomsbyprice.travelersense[pricekey].price}} {{booking.pricing.currency.symbol}}
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-soft">
          <tr>
            <td class="middle">
            </td>
            <td class="middle">
              <strong>Neto Total:</strong>
            </td>
            <td class="middle">
              <strong>{{booking.breakdown.agency.net | number }} {{booking.pricing.currency.symbol}}</strong>
            </td>

          </tr>
        </tfoot>
      </table>
		</div>

		<div class="col-md-4" ng-show="booking.bookingmodel != 'whitelabel'">
		<h5 class="text-center bold padded-b bg-soft">Rentabilidad de la reserva AAVV</h5>
		<table class="table booking-detail mb-b">
			<tbody>
				<tr>
					<td class="middle">
						Porcentaje
					</td>
					<td class="middle" style="width: 100px;">
						<span ng-hide="editProfit">
							<strong>{{ booking.breakdown.agency.fee | number }} %</strong><br />
						</span>
						<div class="input-group" ng-hide="!editProfit">
							<input type="text" id="edprofit" ng-model="booking.breakdown.agency.fee" required ng-trim="false" class="form-control" /><div class="input-group-addon"> %</div>
						</div>

					</td>
				</tr>
				<tr>
					<td class="middle">
						Neto
					</td>
					<td class="middle">
						<strong>  {{ booking.breakdown.agency.pvp - booking.breakdown.agency.net | number }} {{booking.pricing.currency.symbol}}</strong>
					</td>
				</tr>
			</tbody>
		</table>
		<p class="text-right" ng-if="rolename=='affiliate'">
			<span class="help-block" ng-hide="!editProfit">El porcentaje de la rentabilidad se redondea.</span>
			<button ng-hide="editProfit || booking.status == 'cancelled' || bookingIsWhiteLabel" type="button" class="btn btn-link btn-xs" ng-click="toggle('editProfit')">
				<i class="fa fa-pencil"></i>
				 Modificar Rentabilidad
			</button>
			<button ng-show="editProfit" class="btn btn-primary btn-xs" ng-click="updatePrice('fee', true); toggle('editProfit')">Guardar</button>
		</p>
		</div>

    <div class="col-md-4" ng-show="booking.bookingmodel == 'whitelabel'">
      <h5 class="text-center bold padded-b bg-soft">Comision de la reserva</h5>
      <table class="table booking-detail mb-b">
        <tbody>
          <tr>
            <td class="middle">
              Porcentaje:
            </td>
            <td class="middle">
              {{booking.pricing.fee }} %
            </td>
          </tr>
          <tr>
            <td class="middle">
              Comision:
            </td>
            <td class="middle">
              {{booking.breakdown.agency.payment}} {{ booking.pricing.currency.symbol }}
            </td>
          </tr>
          <tr>
            <td class="middle" ng-show="!editIVA">
              Iva Comision ({{booking.pricing.iva}}%): <button ng-hide="booking.status == 'cancelled'" type="button" class="btn btn-link btn-xs" ng-click="toggle('editIVA')">
              <i class="fa fa-pencil"></i>
              Modificar % IVA
            </button>
            </td>
            <td class="middle" ng-hide="!editIVA">
              <div class="input-group" >
                <input type="text" id="editiva" ng-model="booking.pricing.iva" style="width: 100px;" required="" ng-trim="false" class="form-control" />
                <button ng-show="editIVA" class="btn btn-primary btn-xs mt-xs" ng-click="justsave(); toggle('editIVA')">Guardar</button>
              </div>
            </td>
            <td class="middle">
              {{ booking.breakdown.agency.wl.ivaamount }} {{booking.pricing.currency.symbol}}
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-soft">
          <tr>
            <td class="middle">
              <strong>Total factura:</strong>
            </td>
            <td class="middle">
              <strong>{{ booking.breakdown.agency.wl.total }} {{booking.pricing.currency.symbol}}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="col-md-4" ng-show="booking.bookingmodel == 'whitelabel'">
      <h5 class="text-center bold padded-b bg-soft">Factura sobre Comision Reserva</h5>
      <div class="row mb-l">
        <div class="col-md-6 text-center " style="top: 13px;">
          <span class="fa-stack fa-2x">
            <i class="fa fa-file-o fa-stack-2x"></i>
            <i class="fa fa-check fa-stack-1x"></i>
          </span>
        </div>
        <div class="col-md-6 text-center" ng-if="booking.invoicesagency.length > 0" >
          <h3>
            <a target="_blank" ng-href="{{ booking.invoicesagency[0].file.url }}">Invoice: {{booking.invoicesagency[0].invoicenumber }}</a>
          </h3>
        </div>
        <div class="col-md-6" ng-if="booking.invoicesagency == null || booking.invoicesagency.length == 0">
          <h3>
            No se ha cargado factura
          </h3>
        </div>
      </div>
      <div class="row" ng-if="booking.invoicesagency == null || booking.invoicesagency.length == 0">
        <div class="col-xs-4">
          <button type="button" ng-click="uploadInvoice('')"  class="btn btn-xs iblock mt-l btn-primary left-mar-btn" >
            <i class="fa fa-file-text-o"></i> <b>subir</b> factura
          </button>
        </div>
        <div class="col-xs-8">
          <button type="button" ng-click="openGenerateInvoice('')"  class="btn btn-xs iblock mt-l btn-primary left-mar-btn" >
            <i class="fa fa-file-text-o"></i> factura automatica
          </button>
        </div>
      </div>
      <div class="row" ng-if="booking.invoicesagency != null && booking.invoicesagency.length > 0">
        <div class="col-md-12 text-center">
          <a class="btn btn-danger btn-xs" ng-click="deleteinvoice('agency', booking.invoicesagency[0])">
            <i class="fa fa-trash"></i> Eliminar
          </a>
        </div>
      </div>

    </div>
	</div>
  <br />
  <div class="row" ng-if="rolename=='admin'">
    <div class="col-md-4">
      <h5 class="text-center bold padded-b bg-soft">
        DMC Pricing
      </h5>

      <table class="table booking-detail mb-b">
        <tbody>
          <tr ng-show="false">
            <td class="middle">
              PVP: 
            </td>
            <td class="middle" ng-if="booking.dmc.currency.value != booking.pricing.currency.value" >
              ({{ convert(booking.breakdown.provider.pvp, booking.dmc.currency.value, booking.pricing.currency.value) | number:0 }} {{booking.pricing.currency.symbol}})
            </td>
            <td class="middle" style="width:100px;">
              {{booking.breakdown.provider.pvp | number:0 }} {{booking.dmc.currency.symbol}}
            </td>
          </tr>
          <tr>
            <td class="middle">
              Neto:
            </td>
            <td class="middle" ng-if="booking.dmc.currency.value != booking.pricing.currency.value" >
              ({{ convert(booking.breakdown.provider.net, booking.dmc.currency.value, booking.pricing.currency.value) | number:0 }} {{booking.pricing.currency.symbol}})
            </td>
            <td class="middle" style="width:100px;">
              {{booking.breakdown.provider.net | number:0 }} {{booking.dmc.currency.symbol}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-4">
      <h5 class="text-center bold padded-b bg-soft">
        Traveler Sense profit
      </h5>

      <table class="table booking-detail mb-b">
        <tbody>
          <tr>
            <td class="middle">
              Margen:
            </td>
            <td class="middle" style="width:100px;">
              {{booking.breakdown.travelersense.margin}} %
            </td>
          </tr>
          <tr>
            <td class="middle">
              Benfeficio:
            </td>
            <td class="middle" style="width:100px;">
              {{booking.breakdown.travelersense.netmargin}} {{booking.pricing.currency.symbol}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</form>
