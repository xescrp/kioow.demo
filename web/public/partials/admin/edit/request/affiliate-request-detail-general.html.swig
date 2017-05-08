<div class="well pt-l pb-l">
  <h4 class="iblock">General</h4>
  <pre class="hidden">state: {{query.state}}</pre>
  <span class="pull-right iblock mt-l mr-xs">
    <span class="mr-b iblock">Estado: </span>
    <span ng-if="query.state == 'requested' || query.state == 'waiting dmc' || query.state == 'waiting client' || query.state == 'quoted'" class="iblock label label-success">
      <i class="fa fa-check-circle"></i>
      En Proceso
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
            <td class="middle" colspan="3">
            </td>
            <td class="middle text-right" colspan="3" >

              <a ng-hide="query.dmcs.length > 0" ng-href="/viaje-a-medida?code={{userquery.code}}"
              target="_self" class="btn btn-xs mr-b btn-default">
                Modificar Petición
              </a>
              <a  ng-href="#cancell" ng-hide="(query.booking != null) || (quotes.length > 0 || userquery.state == 'cancelled' || query.state == 'close')" ng-click="cancellQueryModal()" class="uppercase btn btn-xs mr-b btn-default">
                Cancelar Petición
              </a>
              <button ng-hide="(query.booking != null) || (quotes.length > 0 || userquery.state == 'cancelled' || query.state == 'close')" class="btn btn-xs btn-primary" ng-click="saveQuery()">
                Guardar
              </button>
            </td>
            <td class="middle" show="userquery.state == 'cancelled'">
              <label>F. cancelación: </label>
            </td>
            <td class="middle" show="userquery.state == 'cancelled'">
              {{userquery.cancelled.cancelDate | date: 'dd-MM-yyyy'}}
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
              <div ng-chat="" ng-if="query.affiliate"edi
                                      referenceobj="query._id"
                                      userquery="query"
                                      referencetype="'userquery'"
                                      lang="'ES'"
                                      usertype = "'affiliate'"
                                      fromcode="themember.code"
                                      tocode="'notificationsyto'"
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