<section class="thanks-wrap container static-content mt-xxl">
  <div class="newpass-modal user-related-modal modal static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="h1 thin mb-xxl" id="loginLabel">Nueva Contraseña</h3>
        </div>
        <div class="modal-body">
          <form>
                <div class="form-group">
                    <label for="em-confpass">Email <b>*</b></label>
                    <input class="form-control" type="text" id="em-confpass" 
  					          ng-init="email = '{? email ?}'" ng-model="email"  disabled>
                </div>
                <div class="form-group">
                    <label for="new-confpass">Nueva contraseña <b>*</b></label>
                    <input class="form-control" ng-model="password" type="password" id="new-confpass">
                </div>  
                <div class="form-group">
                    <label for="conf-confpass">Repite nueva contraseña <b>*</b></label>
                    <input class="form-control" ng-model="repeatpassword" type="password" id="conf-confpass">
                </div>  
                <br />
                <div class="row">
                  <div class="col-lg-12">
                    <a ng-click="changepassword()" href="#" class="btn-login-action btn btn-primary btn-lg btn-block">Guardar</a>
                  </div>
                </div>
          </form>
        </div><!-- .modal-body ends -->
      </div>  <!-- .modal-content ends -->
    </div>
  </div>
</section>