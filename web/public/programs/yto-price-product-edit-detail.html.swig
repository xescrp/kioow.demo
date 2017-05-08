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
      <td>{{ newbooking.breakdown.agency.net | number }}{{ newbooking.pricing.currency.symbol }}</td>
      <td class="text-center" style="width: 90px;">
        <span ng-hide="editFee"> 
          <a class="pointer" ng-click="toggle('editFee')">
          <strong>{{newbooking.breakdown.agency.fee}} %</strong>
          </a>
        </span>
        <div class="input-group" ng-show="editFee"> 
          <input type="text" id="feeProduct" ng-model="newfee" ng-value="currentfee" required ng-trim="false"  class="bg-light form-control input-sm" />
        </div>
        <button ng-show="editFee" class="mt-xs btn btn-primary btn-xs" ng-click="feechanged(newfee)">Guardar</button>
      </td>
      <td>{{ newbooking.breakdown.agency.pvp | number }}{{ newbooking.pricing.currency.symbol  }}</td>
    </tr>
  </tbody>
</table>
<p class="marged-zero text-center"><a href="/faq/25-el-precio" target="_blank" class="link-faq-price">Construcción de Precios</a></p>