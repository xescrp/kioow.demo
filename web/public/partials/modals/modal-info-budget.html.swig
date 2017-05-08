
<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header clearfix">
      <button type="button" class="close" data-dismiss="modal" ng-click="exit()"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
          <span class="fa-stack fa-lg fa-2x pull-left">
            <i class="fa fa-circle fa-stack-2x text-gray-lighter-low"></i>
            <i class="fa fa-warning fa-stack-1x text-red"></i>
          </span>
       <h3 class="h2 thin pt-xxl">&nbsp; ¡Atención!</h3>
      </div>
      
  

    
     <div class="modal-body">
        <p class="mb-xxl pt-xxl">El programa ha podido sufrir alguna modificación desde la fecha en que se generó el presupuesto.</p>
        <p><a class="btn btn-link btn-xs" target="_blank" href="{{url}}">Por favor clicka aquí para revisar los detalles de nuevo.</a>  </p>
      </div>
       <div class="modal-footer">
        <button class="btn  btn-danger" ng-click="ok()">ACEPTAR</button>
      </div>        
      
    </div>
</div>