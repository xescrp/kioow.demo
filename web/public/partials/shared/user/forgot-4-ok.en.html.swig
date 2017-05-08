<section class="shopping-prebooking bg-blue invert-text">
  <div class="container static-content">
    <article>
    <div class="row static-thumb light sm mb-zero">
      <div class="st-img text-center">
      <h2 class="mt-zero"><i class="fa fa-check-circle mb-b fa-3x middle text-light fadein-xxl"></i>&nbsp; <br class="visible-xs" /></h2>
      </div>
      <div class="st-description">
        <h1 class="thin mt-zero">Great, your password changed!</h1>
        <h3 class="thin mt-zero mb-xxl">You can now log in with your new credentials.</h3>
      </div>
    </div>
    </article>
  </div>
</section>

<section class="thanks-wrap container static-content mt-zero">
<div class="afternewpass-modal login-modal user-related-modal static" id="login" 
tabindex="-1" role="dialog" 
aria-labelledby="loginLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="h1 thin mb-xxl" id="loginLabel">Log In</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group">
              <div class="col-lg-12">
                <input type="text" tabindex="1" class="form-control" id="inputUsername" 
			ng-model="email" placeholder="User">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-12">
                <input type="password" tabindex="2" class="form-control" id="inputPasswordLogin" 
			ng-model="password" placeholder="Password">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-12">
                <input  type="checkbox" class="remember-checkbox modal-checkbox" tabindex="3" name="remember" id="inputRemember" checked />
                <label for="inputRemember" class="remember-label"> Remember me</label>
              </div>
            </div>
          </fieldset>
        </form>
      </div><!-- .modal-body ends -->

      <div class="modal-footer">
          <div class="row">
            <div class="col-lg-12">
              <button type="submit" tabindex="4" ng-click="login()" class="btn-login-action btn btn-primary btn-lg btn-block">Log In</button>
            </div>
          </div>
      </div>
    </div>  <!-- .modal-content ends -->
  </div>
</div>
</section>