<!-- ======= Fechas warning modal ======== -->
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header clearfix">
      <button type="button" class="close" data-dismiss="modal" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
          <span class="fa-stack fa-lg fa-2x pull-left">
            <i class="fa fa-circle fa-stack-2x text-gray-lighter-low"></i>
            <i class="fa fa-warning fa-stack-1x text-red"></i>
          </span>
       <h3 class="h2 thin pt-xxl">&nbsp; ¡Importante!</h3>
      </div>
      <div class="modal-body">
        <p class="mb-xxl pt-xxl">En algunos casos pasas la noche a bordo del avión. Revisa las fechas de llegada a destino.</p>
        <p>Has seleccionado la fecha de llegada <strong>{{arrivaldate | date: 'mediumDate'}}</strong></p>
      </div>
      <div class="modal-footer">
        <button type="button" ng-click="cancel()"class="btn btn-default" data-dismiss="modal">Modificar</button>
        <button type="button" ng-click="ok()" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
      </div>
    </div>
  </div>


