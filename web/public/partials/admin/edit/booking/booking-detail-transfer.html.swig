<section id="transferdetails" class="" 
         ng-show="(dmcproduct.included.arrivaltransfer==true) || (dmcproduct.included.departuretransfer==true)">
	<div class="row" >
		<div class="col-md-12">
            <h4 class="iblock">Traslado</h4>
			<a href="#editTransfer" ng-show="booking.meetingdata" class="iblock btn btn-link btn-xs" ng-click="toggle('editTransferDetails')" 
         ng-hide="booking.status =='cancelled'"><i class="fa fa-pencil"></i> modificar</a>
        </div>
	</div>
	<div class="row">
		<div class="col-md-12 mb-l">
			<p class="mb-zero bordered padded-b" ng-hide="booking.meetingdata || editTransferDetails">No tienes información de traslados.
			<a href="#editTransfer" class="iblock" ng-click="toggle('editTransferDetails')" ng-hide="booking.status =='cancelled'"> Agregar</a>
			</p>
			<p class="mb-zero bordered padded-b pre-text" ng-show="!editTransferDetails && booking.meetingdata">{{ booking.meetingdata }}</p>
			<span ng-show="editTransferDetails">
				<form name="formmeetingdata" class="form-group has-error" ng-class="{ 'has-error': formmeetingdata.meetingData.$invalid}">
					<textarea id="meetingData" name="meetingData" cols="30" rows="6" ng-model="booking.meetingdata" required ng-trim="false" class="form-control">
						{{ booking.meetingdata }}
					</textarea>
					<p class="help-block">Detalla aquí la información de llegada a destinos de tus pasajeros: número de vuelo/tren, compañía aérea, horas de llegada y salida, etc.<br>Con esta información el Receptivo efectuará los traslados que estén incluidos.</p>
					<p class="text-right mt-l">
						<a class="btn btn-primary" ng-click="justsave()">Guardar</a>
					</p>
				</form>
			</span>
		</div>
	</div>
</section>