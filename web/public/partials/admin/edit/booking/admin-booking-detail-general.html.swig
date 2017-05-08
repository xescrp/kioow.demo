<div class="well padded-b">
  <h4 class="iblock">General</h4>
  <span class="pull-right iblock mt-l mr-xs">
    <span class="mr-b">Estado: </span>
    <span ng-if="booking.status == 'onbudget' || booking.status == 'error' || booking.status == 'cancelled'">
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
  <span class="pull-right iblock mt-l mr-l">
    <span class="mr-b">F. Pago: </span>
    <span ng-show="booking.paymentmodel == 'transfer-split' || booking.paymentmodel == 'tpv-split'" class="label label-success" >Pago fraccionado</span>
    <span ng-show="booking.paymentmodel == 'transfer-100' || booking.paymentmodel == 'tpv-100'" class="label label-success" >Pago 100%</span>
  </span>
  
  <form id="mainbooking" class="" name="mainbooking" novalidate="">
    <div class="row">
      <div class="col-md-12">
        <table class="table booking-detail mb-zero">
          <tr>
            <td class="middle">
              <label>Localizador: </label>
            </td>
            <td class="middle">
              <strong>{{booking.idBooking}}</strong>
            </td>
            <td class="middle">
              <label for="idBookingExt">Expediente AAVV: </label>
            </td>
            <td class="middle">
              <input type="text" class="bg-light input-sm form-control" 
                     ng-model="booking.idBookingExt" id="idBookingExt" 
                     ng-hide="booking.status == 'cancelled'"name="idBookingExt" type="text" capitalize=""/>
              <span ng-show="booking.status == 'cancelled'">{{booking.idBookingExt}}</span>
            </td>
            <td class="middle">
              <label for="affiliateuser">Agente: </label>
            </td>
            <td class="middle">
              <input type="text" class="bg-light input-sm form-control" ng-model="booking.agentid" id="agentid" ng-hide="booking.status == 'cancelled'" name="agentid" type="text" capitalize=""/>
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
              <strong>{{dmcproduct.title_es}}</strong> <small ng-if="dmcproduct.categoryname != null && dmcproduct.categoryname.label_es != ''"> ({{dmcproduct.categoryname.label_es}})</small>
              <a target="_blank" href="/edit/program?code={{dmcproduct.code}}"> [{{dmcproduct.code}}]</a>
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
            <td class="middle" colspan="5">
              {{booking.paxes.length}}
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
          <hr class="mt-b mb-b" />
          <tr style="white-space: nowrap;">
            <td class="middle">
              <label>Cliente: </label>
            </td>
            <td class="middle">
              {{ booking.signin.username }}
            </td>
            <td class="middle" colspan="2">
              <span><i class="fa fa-envelope"></i> <a href="mailto:{{booking.signin.email}}">{{ booking.signin.email }}</a></span>
            </td>
            <td class="middle" >
              <span><i class="fa fa-phone"></i> {{ booking.signin.phone }}</span>
            </td>
            <td class="middle text-right" colspan="2">
              <span ng-if="booking.bookingmodel.indexOf('taylor') >= 0" class="label label-danger">
                <i class="fa fa-check-circle"></i> taylor made
              </span>
              <span ng-if="booking.bookingmodel.indexOf('booking') >= 0" class="label label-success">
                <i class="fa fa-check-circle"></i> multi days
              </span>
              <span ng-if="booking.bookingmodel.indexOf('whitelabel') >= 0" class="label label-warning">
                <i class="fa fa-check-circle"></i> white label
              </span>
            </td>
            <td class="middle text-right" >
              <img title="reserva B2B" ng-show="booking.bookingmodel.indexOf('b2b') >= 0" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_22/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" />
              <img title="reserva B2C" ng-show="booking.bookingmodel.indexOf('b2c') >= 0" src="http://res.cloudinary.com/open-market-travel/image/upload/brand/openmarketlogo_bgblanco.png" />
              <img title="reserva white label" ng-show="booking.bookingmodel.indexOf('whitelabel') >= 0" src="http://res.cloudinary.com/open-market-travel/image/upload/c_scale,h_22/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png" />
            </td>
          </tr>
          <tr>
            <td class="middle">
              <label>DMC: </label> 
            </td>
            <td class="middle">
              <a target="_blank" href="/edit/account?code={{booking.dmc.code}}&usertype=dmc">{{booking.dmc.code}}</a>
            </td>
            <td class="middle" >
              {{booking.dmc.company.name}}
            </td>
            <td class="middle">
              <label>Comision: </label> {{ booking.dmc.membership.b2bcommission }} %<i uib-tooltip="comision B2B DMC" class="fa fa-info-circle"></i>
            </td>
            <td class="middle">
              <label>Contacto: </label>
            </td>
            <td class="middle">
              {{booking.dmc.contact.firstname}} {{booking.dmc.contact.lastname}}
            </td>
            <td class="middle">
              <span ng-show="booking.dmc.contact.bookingContact.email">
                <a href="mailto:{{booking.dmc.contact.bookingContact.email}}" >{{booking.dmc.contact.bookingContact.email}}</a>
              </span>
              <span ng-hide="booking.dmc.contact.bookingContact.email">
                <a href="mailto:{{booking.dmc.contact.email}}">{{booking.dmc.contact.email}}</a>
              </span>
            </td>
            <td>
              {{booking.dmc.company.phone}}
            </td>
          </tr>
          <tr ng-show="booking.affiliate != null">
            <td class="middle">
              <label>Agencia: </label>
            </td>
            <td class="middle">
              <a target="_blank" href="/edit/account?code={{booking.affiliate.code}}&usertype=affiliate">{{booking.affiliate.code}}</a>
            </td>
            <td class="middle" >
              {{booking.affiliate.company.name}}
            </td>
            <td class="middle">
              <label>Margen: </label> {{booking.affiliate.membership.omtmargin}} % <i uib-tooltip="Margen Traveler Sense &#013;
                                                                                 fees de agencia &#013;
                                                                                 multidays: {{ booking.affiliate.fees.unique }} % ; tailomarde: {{ booking.affiliate.fees.tailormade }} % ; groups: {{ booking.affiliate.fees.groups }} % ; flights: {{ booking.affiliate.fees.flights }} %" class="fa fa-info-circle"></i>
            </td>
            <td class="middle">
              <label>Contacto: </label>
            </td>
            <td class="middle">
              {{booking.affiliate.contact.firstname}} {{booking.affiliate.contact.lastname}}
            </td>
            <td class="middle">
              <span ng-show="booking.affiliate.contact.bookingContact.email">
                <a href="mailto:{{booking.affiliate.contact.bookingContact.email}}" >{{booking.affiliate.contact.bookingContact.email}}</a>
              </span>
              <span ng-hide="booking.affiliate.contact.bookingContact.email">
                <a href="mailto:{{booking.affiliate.contact.email}}">{{booking.affiliate.contact.email}}</a>
              </span>
            </td>
            <td>
              {{booking.affiliate.company.phone}}
            </td>
          </tr>
        </table>
		</div>
      <div class="col-md-12" >
        <p class="text-center">
          <span class="pull-right mr-xs">
            <a class="btn btn-primary" ng-hide="booking.status =='cancelled'" ng-click="justsave()">Guardar</a>
          </span>
        </p>

      </div>
    </div>
    
  </form>
</div>