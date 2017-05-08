<!-- ======= Login Modal ======== -->
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
      <span aria-hidden="true">&times;</span><span class="sr-only">cerrar</span></button>
    <h3 class="h1 thin">Cancelación de solicitud</h3>
  </div>
  <div class="modal-body">
    <h5>¿Estas seguro que deseas cancelar esta solicitud?</h5>
    <p class="mt-xl">
      <button class="btn btn-default" type="button" ng-click="cancel()">no</button>
    <button class="btn btn-primary ml-xl" type="button" ng-click="ok()">si</button>
    </p>
  </div><!-- .modal-body ends -->

</div>  <!-- .modal-content ends -->
