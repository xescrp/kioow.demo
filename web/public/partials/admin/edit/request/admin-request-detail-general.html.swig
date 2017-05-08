<div class="well pt-l pb-l">
  <h4 class="iblock">General</h4>
  <pre class="hidden">state: {{query.state}}</pre>
  <span class="pull-right iblock mt-l mr-xs">
    <span class="mr-b iblock">Estado: </span>
    <span ng-if="query.state == 'requested' || query.state == 'waiting dmc' || query.state == 'waiting client' || query.state == 'quoted'" class="iblock label label-success">
      <i class="fa fa-check-circle"></i>
      En Proceso
    </span>
    <span ng-if="query.state == 'waiting user'" class="iblock label label-default">
      <i class="fa fa-times-circle"></i>
      P. usuario
    </span>
    <span ng-if="query.state == 'cancelled'" class="iblock label label-default">
      <i class="fa fa-times-circle"></i>
      Cancelada
    </span>
    <span ng-if="query.state == 'close'" class="iblock label label-success">
      <i class="fa fa-check-circle"></i>
      Reservada
    </span>
  </span>
  <form id="mainquery" class="" name="mainquery" novalidate="">
    <div class="row">
      <div class="col-md-12">
        <table class="table booking-detail mb-zero">
          <tr>
            <td class="middle">
              <label>Localizador: </label>
            </td>
            <td class="middle">
              {{query.code}}
            </td>
            <td class="middle">
              <label for="title">Nombre Pax/Grupo: </label>
            </td>
            <td class="middle">
              {{query.title}}
            </td>
            <td class="middle">
              <label for="affiliateuser">Agente: </label>
            </td>
            <td class="middle">
              <input type="text" class="bg-light input-sm form-control" ng-model="query.affiliateuser" id="affiliateuser" ng-hide="query.state == 'cancelled' || query.state == 'close'" name="affiliateuser" type="text" capitalize=""/>
              <span ng-show="query.state == 'cancelled' || query.state == 'close'">{{query.affiliateuser}}</span>
            </td>
            <td class="middle">
              <label>F. Creación: </label>
            </td>
            <td class="middle">
              {{query.createdOn | date: 'dd-MM-yyyy'}}
            </td>
          </tr>
          <tr>
            <td class="middle">
              <label>Destinos: </label>
            </td>
            <td>
              {{getUniqueCountries(query)}}
            </td>
            <td class="middle">
              <label>Pasajeros: </label>
            </td>
            <td class="middle">
              {{getQueryPax(query.roomDistribution)}}
            </td>
            <td class="middle">
              <label>Días: </label>
            </td>
            <td class="middle">
              {{query.dates.duration}} días
            </td>
            <td class="middle">
              <label>F. Salida: </label>
            </td>
            <td class="middle">
              <span ng-if="query.dates.knowingdates">
                {{transformToDate(query.dates.arrival) | date : 'dd-MM-yyyy'}}
              </span>
              <span ng-if="!query.dates.knowingdates">
                {{monthStrL_es(query.dates.month.monthnumber -1)}} <span ng-if="query.dates.week >= 1">(semana {{query.dates.week}})</span> <span>{{query.dates.month.monthyear}}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td class="middle" colspan="5">
            </td>
            <td class="middle text-right" colspan="3" ng-show="!booking.cancelDate">
              <a ng-hide="quotes.length > 0 || userquery.state == 'cancelled'" ng-click="userquery.state = 'waiting user'; saveQuery();"
                            target="_self" class="btn btn-xs mr-b btn-default">
                Pendiente usuario
              </a>
              <a ng-hide="quotes.length > 0 || userquery.state == 'cancelled'" ng-href="/viaje-a-medida?code={{userquery.code}}"
              target="_self" class="btn btn-xs mr-b btn-default">
                Modificar Petición
              </a>
              <a ng-href="#cancell" ng-hide="query.state == 'cancelled' || query.state == 'close'" ng-click="cancellQueryModal()" class="uppercase btn btn-xs mr-b btn-default">
                Cancelar Petición
              </a>
              <button ng-hide="query.state == 'cancelled' || query.state == 'close'" class="btn btn-xs btn-primary" ng-click="saveQuery()">
                Guardar
              </button>
            </td>
            <td class="middle" ng-hide="!booking.cancelDate">
            </td>
            <td class="middle" ng-hide="!booking.cancelDate">
              <label>F. cancelación: </label>
            </td>
            <td class="middle" ng-hide="!booking.cancelDate">
              {{booking.cancelDate | date: 'dd-MM-yyyy'}}
            </td>
          </tr>
          <tr ng-show="userquery.affiliate != null">
            <td class="middle">
              <label>Agencia: </label>
            </td>
            <td class="middle">
              <a target="_blank" href="/edit/account?code={{query.affiliate.code}}&usertype=affiliate">{{query.affiliate.code}}</a>
            </td>
            <td class="middle" colspan="2">
              {{query.affiliate.company.name}}
            </td>
            <td class="middle">
              <label>Contacto: </label>
            </td>
            <td class="middle">
              {{query.affiliate.contact.firstname}} {{query.affiliate.contact.lastname}}
            </td>
            <td class="middle">
              <span ng-show="query.affiliate.contact.bookingContact.email">
                <a href="mailto:{{query.affiliate.contact.bookingContact.email}}" >{{query.affiliate.contact.bookingContact.email}}</a>
              </span>
              <span ng-hide="query.affiliate.contact.bookingContact.email">
                <a href="mailto:{{query.affiliate.contact.email}}">{{query.affiliate.contact.email}}</a>
              </span>
            </td>
            <td>
              {{query.affiliate.company.phone}}
            </td>
          </tr>
          <tr ng-show="userquery.affiliate != null">
            <td colspan="9" class="text-right">
              <a class="btn btn-link btn-xs" ng-show="!showChatAgency" ng-click="showChatAgency = true">
                <i class="fa fa-comments"></i> Ver chat
              </a>
              <a class="btn btn-link btn-xs" ng-show="showChatAgency" ng-click="showChatAgency = false">
                <i class="fa fa-comments"></i> Ocultar chat
              </a>
            </td>
          </tr>
          <tr ng-show="showChatAgency">
            <td colspan="9">
              <div ng-chat="" ng-if="query.affiliate"
                                      referenceobj="query._id"
                                      referencetype="'userquery'"
                                      userquery="query"
                                      lang="'ES'"
                                      usertype = "'admin'"
                                      fromcode="'notificationsyto'"
                                      tocode="query.affiliate.code"
                                      showempty="'true'"
                                      ng-cloak="">
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </form>
</div>