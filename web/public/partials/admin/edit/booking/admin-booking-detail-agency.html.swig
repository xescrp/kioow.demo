<div class="well padded-b">
	<div class="row mt-b">
			<div class="col-md-1">
				<small>ID: </small><br>
				<p><a target="_blank" href="/edit/account?code={{booking.affiliate.code}}&usertype=affiliate">{{booking.affiliate.code}}</a></p>
			</div>
			<div class="col-md-2">
				<small>Agencia: </small><br>
				<p>{{booking.affiliate.company.name}}</p>
			</div>
			<div class="col-md-2">
				<small>Nombre: </small><br>
				<p>{{booking.affiliate.contact.firstname}} {{booking.affiliate.contact.lastname}}</p>
			</div>

			<div class="col-md-3">
				<small>Contacto de Reservas</small><br>
				<span ng-show="booking.affiliate.contact.bookingContact.email">{{booking.affiliate.contact.bookingContact.email}}</span>
				<span ng-hide="booking.affiliate.contact.bookingContact.email">{{booking.affiliate.contact.email}}</span>
			</div>
			<div class="col-md-2">
				<small>Telefono</small><br>
				{{booking.affiliate.company.phone}}
			</div>
			<div class="form-group col-md-2">
				<small>Registro</small>
				<p>
					{{booking.affiliate.createdOn | date : 'dd-MM-yyyy'}}
				</p>	
			</div> 	
   </div>
<hr class="mt-zero mb-b" />
</div>