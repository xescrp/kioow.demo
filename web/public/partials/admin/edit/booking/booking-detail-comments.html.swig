<div ng-show="booking.observations.observations != null && booking.observations.observations != ''">
<h4 class="iblock mt-l" ng-show="rolename == 'admin'">Observaciones para yourttoo</h4>
<h4 class="iblock mt-l" ng-show="rolename == 'affiliate'">Tus observaciones</h4>
<form id="observationbooking" class="" name="observationbooking" novalidate>
	<div class="row">
		<div class="col-md-12">
			<p class="pre-text mb-zero bordered padded-b">{{ booking.observations.observations }}</p> 
		</div>
	</div>
</form>
</div>
<div ng-show="rolename == 'admin' && booking.observations != null && (booking.observations.label_es != '' || booking.observations.label_en != '')">
<h4 class="iblock mt-l">Observaciones de yourttoo (Aparecen en el Bono)</h4>
<form id="observationbooking" class="" name="observationbooking" novalidate>
	<div class="row">
		<div class="col-md-12">
			<p class="pre-text mb-zero bordered padded-b">{{ booking.observations.label_es || booking.observations.label_en }}</p> 
		</div>
	</div>
</form>
</div>