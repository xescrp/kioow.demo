<h4 ng-hide="booking.status == 'cancelled'" class="iblock mt-l">Documentación para el cliente</h4>

<h5 class="bold mt-xl">Observaciones a mostrar al Traveler/Agencia de Viajes</h5>

<div class="mt-b">
  <div class="row mt-b">
    <div class="col-md-12">
      <textarea class="form-control" ng-model="booking.observations.label_es" rows="5"></textarea>
    </div>
  </div>
  <p class="help-block text-right">
    Max 450 char: <strong>{{450 -booking.observations.label_es.length}} left</strong>
  </p>
</div>

<h5 class="bold mt-xl">Observaciones a mostrar al DMC</h5>

<div class="mt-b">
  <div class="row mt-b">
    <div class="col-md-12">
      <textarea class="form-control" ng-model="booking.observations.label_en" rows="5"></textarea>
    </div>
  </div>
  <p class="help-block text-right">
    Max 450 char: <strong>{{450 -booking.observations.label_en.length}} left</strong>
  </p>
</div>

<div class="col-md-12">
  <hr class="mt-b mb-b" />
  <p class="text-right">
    <a class="btn btn-primary" ng-click="justsave()">Guardar</a>
  </p>
</div>

<form id="observationbooking" ng-hide="booking.status == 'cancelled'" name="observationbooking" novalidate="">
  <div class="row">
    <div class="col-md-12">
      <p class="text-center marged-xl">
        <a class="btn btn-success ml-l mr-l" 
           ng-click="downloadSummaryBooking()">Resumen de reserva</a>
        <a class="btn btn-success ml-l mr-l"  
           tooltip-trigger="mouseenter" 
           ng-click="downloadAffiliateVoucher()">Bono</a>
        <a class="btn btn-success ml-l mr-l" 
           ng-click="downloadAffiliateContract()" >Contrato de viaje combinado</a>
      </p>
    </div>
  </div>
</form>

