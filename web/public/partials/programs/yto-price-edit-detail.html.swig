<table class="table table-striped table-hover text-graydark">

<button type="button" class="close" ng-click="togglebreakdown()" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <thead>
  	<tr>
  		<td>Neto</td>
  		<td class="text-center">Fee</td>
  		<td>PVP</td>
  	</tr>
  </thead>
  <tbody>
  	<tr>
  		<td>
        <span class="iblock mt-b">
          {{ quote.amount.value | number }}{{ quote.amount.currency.symbol }}
        </span>
      </td>

      <td class="text-center" style="width: 90px;">
        <span ng-hide="editFee">
          <a class="pointer" ng-click="toggle('editFee')">
            <strong> {{ quote.fees.tailormade }} %</strong>
          </a>
        </span>
        <div class="input-group" ng-show="editFee">
          <input type="text" id="feeProduct" ng-model="newfee" ng-value="quote.b2bcommission" required="" ng-trim="false"  class="bg-light form-control input-sm" />
        </div>
        <button ng-show="editFee" class="mt-xs btn btn-primary btn-xs" ng-click="feechanged(quote, newfee)">Guardar</button>
      </td>
      <td>
        <span class="iblock mt-b">
          {{ quote.pvpAffiliate.value | number }}{{ quote.pvpAffiliate.currency.symbol  }}
        </span>
      </td>
  	</tr>
  </tbody>
</table>
  <p class="marged-zero text-center"><a href="/faq/25-el-precio" target="_blank" class="link-faq-price">Construcción de Precios</a></p>
