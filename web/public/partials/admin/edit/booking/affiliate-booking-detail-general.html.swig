<div class="well padded-b">
	<h4 class="iblock">General</h4>
		<span class="pull-right iblock mt-l mr-xs"> 
			<span class="mr-b">Estado: </span>
      <span ng-if="booking.status == 'cancelled' || booking.status == 'onbudget' || booking.status == 'error'">
        <span class="label label-default">
          <i class="fa fa-times-circle"></i> Cancelada
        </span>
      </span>
      <span ng-if="booking.status == 'end' || booking.status == 'ok.charges' || booking.status == 'commited' || booking.status == 'pending.charges' || booking.status == 'ondestiny'">
        <span class="label label-success">
          <i class="fa fa-check-circle"></i> Confirmada
        </span>
      </span>
		</span>
	<form id="mainbooking" class="" name="mainbooking" novalidate>
	<div class="row">
	<div class="col-md-12">
		<table class="table booking-detail mb-zero">
			<tr>
				<td class="middle">
				<label>Localizador: </label>
				</td>
				<td class="middle">
				{{booking.idBooking}}
				</td>
				<td class="middle">
			    	<label for="idBookingExt">Expediente AAVV: </label>
			    </td>
			    <td class="middle">
					<input type="text" class="bg-light input-sm form-control" ng-model="booking.idBookingExt" id="idBookingExt" ng-hide="booking.status == 'cancelled'"name="idBookingExt" type="text" capitalize />
					<span ng-show="booking.status == 'cancelled'">{{booking.idBookingExt}}</span>
				</td>
				<td class="middle">
			    	<label for="affiliateuser">Agente: </label>
			    </td>
			    <td class="middle">
					<input type="text" class="bg-light input-sm form-control" ng-model="booking.agentid" id="affiliateuser" ng-hide="booking.status == 'cancelled'" name="affiliateuser" type="text" capitalize />
					<span ng-show="booking.status == 'cancelled'">{{booking.agentid}}</span>
				</td>
				<td class="middle">
					<label>F. Creación: </label>
				</td>
				<td class="middle">
				{{booking.createdOn | date: 'dd-MM-yyyy'}}
				</td>
			</tr>
			<tr>
				<td class="middle">
				<label>Producto: </label>
				</td>
				<td colspan="3">
          <strong>{{dmcproduct.title_es}}</strong> <small>{{dmcproduct.categoryname.label_es}}</small>
				</td>
				<td class="middle">
					<label>Días: </label>
				</td>
				<td class="middle">
				 {{ dmcproduct.itinerary.length }} 
				</td>
				<td class="middle">
					<label>F. Salida: </label>
				</td>
				<td class="middle">
          {{transformToDate(booking.dates.start) | date:'dd-MM-yyyy'}}
        </td>
			</tr>
			<tr>
				<td class="middle">
					<label>Nº de Pax: </label>
				</td>
				<td class="middle" colspan="4">
					 {{booking.paxes.length}} 
				</td>
        <td class="middle text-right">
          <span ng-if="booking.bookingmodel.indexOf('taylor') >= 0" class="label label-danger">
            <i class="fa fa-check-circle"></i> a medida
          </span>
          <span ng-if="booking.bookingmodel.indexOf('booking') >= 0" class="label label-success">
            <i class="fa fa-check-circle"></i> multi days
          </span>
          <span ng-if="booking.bookingmodel.indexOf('whitelabel') >= 0" class="label label-warning">
            <i class="fa fa-check-circle"></i> marca blanca
          </span>
        </td>
				<td class="middle text-right" colspan="2" ng-show="booking.status != 'cancelled' && booking.status != 'invalid' && booking.status != 'onbudget'">
						<button class="btn btn-invert btn-xs" ng-click="cancellBookingModal()">Cancelar reserva</button>
				</td>
				<td class="middle" ng-hide="booking.status != 'cancelled'">
				<label>F. cancelación: </label>
				</td>
				<td class="middle" ng-hide="booking.status != 'cancelled'">
          {{transformToDate(booking.dates.canceldate) | date:'dd-MM-yyyy'}}
        </td>
			</tr>
      <tr style="white-space: nowrap;">
        <td class="middle">
          <label>Cliente: </label>
        </td>
        <td class="middle">
          {{ booking.signin.username }}
        </td>
        <td class="middle" colspan="2">
          <span>
            <i class="fa fa-envelope"></i>
            <a href="mailto:{{booking.signin.email}}">{{ booking.signin.email }}</a>
          </span>
        </td>
        <td class="middle" >
          <span>
            <i class="fa fa-phone"></i> {{ booking.signin.phone }}
          </span>
        </td>
        <td class="middle text-right" colspan="2">
          
        </td>
        <td class="middle text-right" >
          <img title="reserva B2B" ng-show="booking.bookingmodel.indexOf('b2b') >= 0" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_22/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" />
          <img title="reserva B2C" ng-show="booking.bookingmodel.indexOf('b2c') >= 0" src="http://res.cloudinary.com/open-market-travel/image/upload/brand/openmarketlogo_bgblanco.png" />
          <img title="reserva white label" ng-show="booking.bookingmodel.indexOf('whitelabel') >= 0" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_22/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" />
        </td>
      </tr>
		</table>
		<hr class="mt-b mb-b" />
		</div>

		<div class="col-md-12">
			<p class="text-center"><span class="italic text-gray">Por favor utiliza el <a class="bold" ng-click="selectTab('tabmessage')" href="#tabmessage">área de mensajería</a> para solicitar <strong>otras modificaciones</strong> de tu reserva.</span>
			<span class="pull-right mr-xs">
			<a class="btn btn-primary" ng-hide="booking.status =='cancelled'" ng-click="justsave()">Guardar</a>
			</span>
			</p>
			
		</div>
	</div>
	</form>
</div>