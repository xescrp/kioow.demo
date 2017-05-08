<div class="modal-header mb-xl text-right hidden-xs">
    <button class="btn btn-danger absolute btn-xs" style="top: 0; right: 0;" ng-click="exit()"><i class="fa fa-times"></i></button>
</div>
<div class="modal-body mt-xxl text-center hidden-xs" style="text-align: center;" ng-show="comlist.length < 4">
    <h3 class=" hiddenmodal-title thin text-graydark">Has seleccionado 
    <span ng-show="comlist.length == 1">un</span>
    <span ng-show="comlist.length == 2">dos</span>
    <span ng-show="comlist.length == 3">tres</span>
     viaje<span ng-show="comlist.length > 1">s</span> para comparar</h3>
</div>
<div class="modal-footer text-center hidden-xs" style="text-align: center;" ng-show="comlist.length < 4">
    <button class="btn btn-default btn-xs" type="button" ng-click="ok()">Agregar Otro</button>
    <button class="btn btn-danger btn-xs" type="button" ng-show="comlist.length > 1" ng-click="openthemodal()">Comparar</button>
</div>
<div class="modal-body mt-xxl text-center hidden-xs" style="text-align: center;" ng-show="comlist.length >= 4">
    <h3 ng-show="!comparing" class=" hiddenmodal-title thin text-graydark">Ya has seleccionado cuatro viajes. </h3>
    <button class="btn btn-danger btn-xs" type="button" ng-show="comlist.length > 1" ng-click="openthemodal()">Comparar</button>
</div>    