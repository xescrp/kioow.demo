  <div class="container" ng-controller="adminHomeCtrl">
    <div class="row">
      <div class="col-md-6 bg-light padded-l">
        <h4>Traveler Sense Data: </h4>
        <hr></hr>
        <table class="table booking-detail">
          <thead>
            <tr>
              <td></td>
              <td>
                <label>total</label></td>
              <td>
                <label>published</label>
              </td>
              <td>
                <label>published (no avail)</label>
              </td>
              <td>
                <label>under review</label>
              </td>
              <td>
                <label>draft</label>
              </td>
            </tr>
          </thead>
          <tr>
            <td class="middle">
              <strong>Programs</strong>
            </td>
            <td class="middle">
              {{statistics.programs.total}}
            </td>
            <td class="middle">
              {{statistics.programs.published}}
            </td>
            <td class="middle">
              {{statistics.programs.publishednoavail}}
            </td>
            <td class="middle">
              {{statistics.programs.underreview}}
            </td>
            <td class="middle">
              {{statistics.programs.draft}}
            </td>
          </tr>
          <tr>
            <td class="middle">
              <strong>DMCs</strong>
            </td>
            <td class="middle">
              {{statistics.dmcs.total}}
            </td>
          </tr>
          <tr>
            <td class="middle">
              <strong>Agencias</strong>
            </td>
            <td class="middle">
              {{statistics.affiliates.total}}
            </td>
          </tr>
          <tr>
            <td class="middle">
              <strong>Bookings</strong>
            </td>
            <td class="middle">
              {{statistics.bookings.total}}
            </td>
          </tr>
          <tr>
            <td class="middle">
              <strong>Tailor made</strong>
            </td>
            <td class="middle">
              {{statistics.taylormades.total}}
            </td>
          </tr>
        </table>
        
      </div>
      <div class="col-md-2">
      </div>
      <div class="col-md-4 bg-light padded-l">
        <div id="filter-shortcuts" 
             ng-include="'/js/angular/components/ts-filterboxes/templates/toolbar/admin-home-buttons-programs.html'">
          
        </div>
      </div>
    </div>
    <br></br>
    <div class="row">
      <div class="col-md-12 bg-light padded-l">
        <h4>Traveler Sense Transactions (last 10): </h4>
        <hr></hr>
        <h4>Bookings: </h4>
        <table class="table booking-detail">
          <thead>
            <tr>
              <td>IdBooking</td>
              <td>
                <label>Realizada</label>
              </td>
              <td>
                <label>Fecha inicio</label>
              </td>
              <td>
                <label>Program</label>
              </td>
              <td>
                <label>Agencia</label>
              </td>
              <td>
                <label>PVP</label>
              </td>
            </tr>
          </thead>
          <tr ng-repeat="booking in statistics.bookings.last">
            <td>
              <a href="/edit/booking?code={{booking.idBooking}}">{{ booking.idBooking }}</a></td>
            <td>
              {{ printDate(booking.createdOn) }}
            </td>
            <td>
              {{ printDate(booking.dates.start.date) }}
            </td>
            <td title="{{booking.products[0].name}}">
                <a href="/edit/program?code={{booking.products[0].code}}">{{ booking.products[0].code}}</a> {{ booking.products[0].name.substring(0,20)}} ... <label ng-if="booking.products[0].origin=='taylormade'"> (taylor made)</label> 
            </td>
            <td>
              <a href="/edit/account?code={{booking.affiliate.code}}&usertype=affiliate">{{booking.affiliate.company.name}}</a>
            </td>
            <td>
              {{booking.pricing.amount}} {{ booking.pricing.currency.symbol}}
            </td>
          </tr>
        </table>

        <h4>Tailor Made: </h4>
        <table class="table booking-detail">
          <thead>
            <tr>
              <td>code</td>
              <td>
                <label>Realizada</label>
              </td>
              <td>
                <label>Fecha inicio</label>
              </td>
              <td>
                <label>Destinos</label>
              </td>
              <td>
                <label>Agencia</label>
              </td>
            </tr>
          </thead>
          <tr ng-repeat="taylor in statistics.taylormades.last">
            <td>
              <a href="/edit/query?code={{taylor.code}}">{{ taylor.code }}</a>
            </td>
            <td>
              {{ printDate(taylor.createdOn) }}
            </td>
            <td>
              {{ printDate(taylor.dates.arrivaldate) }}
            </td>
            <td>
              {{destinations(taylor)}}
            </td>
            <td>
              <a href="/edit/account?code={{taylor.affiliate.code}}&usertype=affiliate">{{taylor.affiliate.company.name}}</a>
            </td>
          </tr>
        </table>
        
      </div>
    </div>

    <br></br>
    
  </div>
