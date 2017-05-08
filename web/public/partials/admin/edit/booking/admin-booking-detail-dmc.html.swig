<div class="well padded-b">
	<div class="row mt-b">
			<div class="col-md-1">
				<small>ID: </small><br>
				<p><a target="_blank" href="/edit/account?code={{booking.dmc.code}}&usertype=dmc">{{booking.dmc.code}}</a></p>
			</div>
			<div class="col-md-2">
				<small>Agencia: </small><br>
				<p>{{booking.dmc.company.name}}</p>
			</div>
			<div class="col-md-2">
				<small>Nombre: </small><br>
				<p>{{booking.dmc.contact.firstname}} {{booking.dmc.contact.lastname}}</p>
			</div>

			<div class="col-md-3">
				<small>Contacto de Reservas</small><br>
				<span ng-show="booking.dmc.contact.bookingContact.email">{{booking.dmc.contact.bookingContact.email}}</span>
				<span ng-hide="booking.dmc.contact.bookingContact.email">{{booking.dmc.contact.email}}</span>
			</div>
			<div class="col-md-2">
				<small>Telefono</small><br>
				{{booking.dmc.company.phone}}
			</div>
			<div class="form-group col-md-2">
				<small>Registro</small>
				<p>
					{{booking.dmc.createdOn | date : 'dd-MM-yyyy'}}
				</p>	
			</div> 	
   </div>
<hr class="mt-zero mb-b" />
</div>