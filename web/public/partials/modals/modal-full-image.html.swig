<!-- ======= Login Modal ======== -->
<div class="modal-content" ng-controller="authLoginCtrl">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
      <span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    
  </div>
  <div class="modal-body mt-l">
  <img ng-src="{{fullimagepopup}}" class="img-responsive" />
  </div><!-- .modal-body ends -->

  <div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="cancel()">
      cerrar</button>
  </div>
</div>  <!-- .modal-content ends -->
