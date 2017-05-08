<section class="thanks-wrap container static-content mt-xxl">
  <div class="newpass-modal user-related-modal modal static">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h3 class="h1 thin mb-xxl" id="loginLabel">Reset your password</h3>
		</div>
		<div class="modal-body">
		  <p>Type your email address, so we can send you a link to set a <strong>new password</strong>.</p>
		  <br />
		  <form name="recoverpass">
				<div class="form-group" g-class="{ 'has-error': recoverpass.email.$invalid }">
					<label for="em-confpass">Email <b>*</b></label>
					<input ng-model="email" class="form-control" type="email" id="em-confpass" placeholder="email@email.com" />
				</div>
				<br />
				<div class="row">
				  <div class="col-lg-12">
					<a ng-click="requestrecovery()" class="btn-login-action btn btn-primary btn-lg btn-block">Send</a>
				  </div>
				</div>
		  </form>

		<br />
		</div><!-- .modal-body ends -->
	  </div>  <!-- .modal-content ends -->
	</div>
  </div>
</section>
