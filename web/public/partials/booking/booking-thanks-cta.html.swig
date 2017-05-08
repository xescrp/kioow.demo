<section class="container transfer-msg">
  <div class="col-md-8 col-md-offset-2 bg-light well">
      <h3 class="mt-zero mt-b">Datos para transferencia</h3>
      <hr class="mb-xl mt-b" />              
      <p>Por favor indica el número de localizador de  yourttoo en <strong>"Concepto"</strong> para que podamos identificarla</p>
          <ul class="list-unstyled well">
          {% include "../admin/edit/booking/yto-bank-info.html" ignore missing %}
          </ul>
    <p class="text-center"> 
        <a href="#" class="btn  btn-success ml-b" ng-click="downloadProforma();" target="_self" >Descargar Factura Proforma</a>
        <a href="#" class="btn  btn-success ml-b" ng-click="downloadSummaryBooking();" target="_self" >Descargar resumen Reserva</a>
        <a href="#" class="btn btn-primary ml-b" ng-href="/edit/booking/?code={? idBooking ?}" target="_self" >Ver Reserva</a>
    </p>
  </div>
</section>