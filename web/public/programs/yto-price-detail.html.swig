<table class="table table-striped table-hover text-graydark" >

<button type="button" class="close" ng-click="togglebreakdown()" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <thead>
  	<tr>
  		<td>Neto</td>
  		<td>Fee</td>
  		<td>PVP</td>
  	</tr>
  </thead>
  <tbody>
  	<tr>
  		<td>{{ theprogram.pvp.net}} {{ theprogram.pvp.currency.symbol }}</td>
  		<td>{{ session.affiliate.fees.unique  }} %</td>
  		<td>{{ theprogram.pvp.b2b}} {{ theprogram.pvp.currency.symbol  }}</td>
  	</tr>
  </tbody>
</table>
<a href="/faq/25-el-precio" target="_blank" class="link-faq-price">Construcción de Precios</a>
