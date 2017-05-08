<!-- ======= Login Modal ======== -->
<div class="modal-content" ng-controller="authLoginCtrl">
<div ng-show="waiting" class="preloader-blanket in"><div class="preloader"><span></span><span></span><span></span></div></div>
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
      <span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h3 class="h1 thin" id="loginLabel">Acceder</h3>
  </div>
  <div class="modal-body">
    <div ng-show="errorLogin" class="alert alert-dismissable alert-danger text-center">
      <span class="infoError"><strong>{{notificar_error}}</strong></span>
    </div>
    <p>Identifícate y gestiona tus viajes y tus reservas.</p>
    <form class="form-horizontal">
      <fieldset>
        <div class="form-group">
          <div class="col-lg-12">
          <input type="hidden" ng-model="lang" ng-init="lang='es'">
            <input type="text" tabindex="1" class="form-control" ng-model="login.email" 
                   id="inputUsername" placeholder="Email">
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-12">
            <input type="password" tabindex="2" class="form-control" ng-model="login.password" 
                   id="inputPasswordLogin" placeholder="Contraseña">
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-12">
            <input  type="checkbox" class="remember-checkbox modal-checkbox" tabindex="3" name="remember" id="inputRemember" checked />
            <label for="inputRemember" class="remember-label"> Recordarme</label>
            <!-- ng-click="forgotpassword('ES')" -->
            <a href="/cambiar-contrasena" target="_self" class="recover-pass pull-right pointer"><strong>¿Has olvidado <br class="visible-xs" />tu contraseña?</strong></a>
          </div>
        </div>
      </fieldset>
      <div class="row">
        <div class="col-lg-12">
          <button type="submit" tabindex="4" ng-click="dologin()" class="btn-login-action btn btn-primary btn-lg btn-block">Acceder</button>
        </div>
      </div>
    </form>
  <div class="alert alert-danger mt-xxl" ng-show="showerror">
    <strong>Ups!</strong> <span ng-model="errorprint" >No conocemos esa dirección de email. Prueba con otra.</span>
  </div>

  </div><!-- .modal-body ends -->

  <div class="modal-footer">
    <a href="/signup" target="_self" tabindex="7" 
       class="login-signup-call text-center"><strong>¿Eres nuevo? ¡Regístrate!</strong></a>
  </div>
</div>  <!-- .modal-content ends -->
