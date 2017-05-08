<section class="thanks-wrap container static-content mt-xxl">
  <div class="newpass-modal user-related-modal modal static">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h3 class="h1 thin mb-xxl" id="loginLabel">Cambia tu contraseña</h3>
		</div>
		<div class="modal-body">
		  <p>Escribe tu dirección de email, así podremos enviarte un enlace para <strong>cambiar tu contraseña</strong>.</p>
		  <br />
		  <form>
			<div class="form-group has-error">
				<label for="em-confpass">Email <b>*</b></label>
				<input ng-model="email" class="form-control" type="text" id="em-confpass" placeholder="email@email.com" />
			</div>
			<br />
			<div class="row">
			  <div class="col-lg-12">
				<a ng-click="requestrecovery()" class="btn-login-action btn btn-primary btn-lg btn-block">Enviar</a>
			  </div>
			</div>
		  </form>

		<br />
		</div><!-- .modal-body ends -->
	  </div>  <!-- .modal-content ends -->
	</div>
  </div>
</section>