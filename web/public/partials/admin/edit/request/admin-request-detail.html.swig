<h4 class="iblock">Detalle Solicitud</h4>
<form id="detailquery" class="" name="detailquery" novalidate="">
  <div class="row">
    <div class="col-md-12">
      <table class="table booking-detail mb-zero query-detail">
        <tr>
          <td class="middle">
            <label>Itinerario: </label>
          </td>
          <td class="middle per50">
            {{destinationStrEs}}
          </td>
          <td class="middle">
            <label>Presupuesto p/pax</label>
          </td>
          <td class="middle per10">
            <span>
              {{query.budget.cost | number}}<small>{{query.budget.currency.symbol}}</small>
            </span>
          </td>
        </tr>
        <tr>
          <!-- ng-show="query.group == null"-->
          <td class="middle">
            <label>Estilo de viaje: </label>
          </td>
          <td colspan="6">
            <span ng-if="query.additionalinfo.trip == 'grouptrip'">
              Grupo Organizado
            </span>
            <span ng-if="query.additionalinfo.trip == 'privatetrip'">
              Viaje privado
            </span>
            <span ng-repeat="tag in query.whattodo">, {{tag.label}}</span>
          </td>
        </tr>
      </table>

      <table class="table booking-detail mb-zero query-detail" ng-if="!query.dates.knowingdates">
        <!-- if aprox date -->
        <tr>
          <td class="middle">
            <label>F. Salida: </label>
          </td>
          <td class="middle per20">
            {{monthStrL_es(query.dates.month.monthnumber -1)}} <span ng-if="query.dates.week >= 1">(semana {{query.dates.week}})</span> <span>{{query.dates.month.monthyear}}</span>
          </td>
          <td class="middle per10">
            <label>Días: </label>
          </td>
          <td class="middle per10">
            {{query.dates.duration}} días
          </td>
          <td colspan="2">
          </td>
        </tr>
      </table>


      <table class="table booking-detail mb-zero query-detail" ng-if="query.dates.knowingdates && !query.dates.alreadygotflights">
        <!-- if fix date -->
        <tr>
          <td class="middle">
            <label>F. Salida: </label>
          </td>
          <td class="middle">
            {{transformToDate(query.dates.arrival) |date : 'dd-MM-yyyy' }}
          </td>
          <td class="middle per10">
            <label>Flexibilidad: </label>
          </td>
          <td class="middle">
            {{query.dates.flexibility.number}} <span ng-if="query.dates.flexibility.range == 'days'">días</span>
          </td>
          <td class="middle">
            <label>Días: </label>
          </td>
          <td class="middle">
            {{query.dates.duration}} días
          </td>
          <td class="middle">
          </td>
        </tr>
      </table>


      <table class="table booking-detail mb-zero query-detail" ng-if="query.dates.knowingdates && query.dates.alreadygotflights">
        <!-- if have flights -->
        <tr>
          <td class="middle">
            <label>F. Llegada a destino: </label>
          </td>
          <td class="middle per20">
            {{transformToDate(query.dates.arrival) |date : 'dd-MM-yyyy' }}
          </td>
          <td class="middle per10">
            <label>Días: </label>
          </td>
          <td class="middle per10">
            {{query.dates.duration}} días
          </td>
          <td colspan="3">
          </td>
        </tr>
      </table>

      <table class="table booking-detail mb-zero query-detail">

        <tr ng-if="query.dates.knowingdates && query.dates.alreadygotflights">
          <td class="middle">
            <label>Detalles vuelo ida: </label>
          </td>
          <td class="middle" colspan="3">
            {{query.dates.dataflightsIn}}
          </td>
          <td class="middle per20">
            <label>Detalles vuelo regreso: </label>
          </td>
          <td class="middle" colspan="2">
            {{query.dates.dataflightsOut}}
          </td>
        </tr>
      </table>

      <table class="table booking-detail mb-zero query-detail">
        <!-- hotel and services -->
        <tr>
          <td class="middle">
            <label>Categoria de Alojamiento: </label>
          </td>
          <td class="middle">
            <span ng-bind-html="hotelString"></span>
          </td>
          <td class="middle per20">
            <label>Régimen alimenticio: </label>
          </td>
          <td class="middle per20">
            {{serviceString}}
          </td>
          <td class="middle">
          </td>
        </tr>
      </table>
      <table class="table booking-detail mb-zero query-detail">
        <!--- Distribución -->

        <tr>
          <td class="middle">
            <label>Distribución Pax/Hab:</label>
          </td>
          <td class="middle per10">
            <label>Individual:</label>
          </td>
          <td class="middle">
            <label>Nº Pax: </label>{{paxSingle}}
          </td>
          <td class="middle per10">
            <label>Doble:</label>
          </td>
          <td class="middle">
            <label>Nº Pax: </label>{{paxDouble}}
          </td>
          <td class="middle per10">
            <label>Triple:</label>
          </td>
          <td class="middle">
            <label>Nº Pax: </label>{{paxTriple}}
          </td>
          <td class="middle per20">

          </td>
        </tr>
      </table>


      <table class="table booking-detail mb-zero query-detail">
        <!--- Transportation -->

        <tr>
          <td class="middle">
            <label>Medio de transporte:</label>
          </td>
          <td class="middle per20">
            <span ng-show="query.additionalinfo.needs == 'rentacar'">
              Rentacar
            </span>
            <span ng-show="query.additionalinfo.needs == 'caranddriver'">
              Coche y conductor
            </span>
            <span ng-show="query.additionalinfo.needs != 'caranddriver' && query.additionalinfo.needs != 'rentacar'">
              Sin transporte
            </span>
          </td>
          <td class="middle per10">
            <label>Guías / Visitas </label>
          </td>
          <td class="middle per5">
            <span ng-show="query.additionalinfo.guide.included">
              Si
            </span>
            <span ng-hide="query.additionalinfo.guide.included">
              No
            </span>
          </td>
          <td class="middle per10">
            <span ng-show="query.additionalinfo.guide.included">
              <label>Idioma </label>
            </span>
          </td>
          <td class="middle">
            <span ng-show="query.additionalinfo.guide.included">
              {{guidestr}}
            </span>
          </td>
        </tr>
      </table>

      <table class="table booking-detail mb-zero query-detail">
        <!-- obs -->
        <tr ng-if="query.group == null">
          <td class="middle">
            <label>Observaciones sobre pasajeros:</label>
          </td>
          <td class="middle">
            {{query.hosting.hostingKindNotes}}
          </td>
        </tr>

        <tr ng-if="query.group != null">
          <td class="middle">
            <label>Observaciones sobre grupo:</label>
          </td>
          <td class="middle">
            {{query.group.comments}}
          </td>
        </tr>

        <tr>
          <td class="middle">
            <label>Observaciones sobre viaje:</label>
          </td>
          <td class="middle">
            {{query.additionalinfo.description}}
          </td>
        </tr>
      </table>
    </div>

  </div>
</form>