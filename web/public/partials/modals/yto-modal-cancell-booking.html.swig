<!-- ======= Login Modal ======== -->
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
      <span aria-hidden="true">&times;</span><span class="sr-only">cerrar</span></button>
    <h3 class="h1 thin">Cancelación de reserva</h3>
  </div>
  <div class="modal-body">
    <h5>Recuerda que cancelar la reserva implica los siguientes <strong>Gastos de Cancelación:</strong></h5>
    <p ng-bind-html="dmcproduct.dmc.membership.cancelpolicy._es" ng-show="!booking.cancelpolicy || !booking.cancelpolicy._es" class="well pre-text"></p>
        <!-- cancell taylormade -->
    <p ng-bind-html="booking.cancelpolicy._es" ng-show="booking.cancelpolicy && booking.cancelpolicy._es" class="well pre-text"></p>
    <p>¿Estás seguro que deseas cancelar?</p>
    <p>
      <button class="btn btn-default" type="button" ng-click="cancel()">no</button>
    <button class="btn btn-primary ml-xl" type="button" ng-click="ok()">si</button>
    </p>
  </div><!-- .modal-body ends -->

</div>  <!-- .modal-content ends -->
