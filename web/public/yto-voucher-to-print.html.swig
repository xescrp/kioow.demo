{% extends 'yto-layout-empty.html.swig' %}

{% block bodyclass %}print{% endblock %}

{% block body %}

<STYLE TYPE="text/css">
     .breakhere {page-break-before: always}
</STYLE>

<div class="container">
    <div class="invoice-modal" id="invoice-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="invoice-preview">

              {# tabla  info afiliado#}
              <div class="row">
                <div class="col-md-12">
                      <img class="id-user-img pull-left" src="{? getUrlCloudinary(booking.affiliate.images.logo.url, 'avatar125') ?}" data-src2x="{? getUrlCloudinary(dmc.images.logo.url, 'avatar125retina') ?}"  />                         
                    <div class="pull-left ml-l">
                      <h2 class="thin middle mb-xl mt-b">{? booking.affiliate.company.name ?}</h2>
                    <p>{? booking.affiliate.company.location.fulladdress ?},<br /> {?  booking.affiliate.company.location.cp ?}, {?  booking.affiliate.company.location.city ?}, ({? booking.affiliate.company.location.country ?})</p>
                    <p>Teléfono: <strong>{? booking.affiliate.company.phone ?}</strong></p>
                    <br />
                  </div>
                  </div>
              </div>

              <H4>Copia para Pasajeros / Copy for Passengers</H4>

              {# tabla con los datos de la reserva#}
              <table class="table table-hover table-invoice">
                <tr>
                  <td><strong>Localizador de la Reserva / Booking ID</strong></td>
                  <td><strong>{? booking.idBooking ?}</strong></td>
                </tr>

                <tr>
                  <td>Número de pasajeros / Passengers</td>
                  <td>
                     {% set totalPax = booking.paxes.length %}
                     
                    {? totalPax ?}
                  </td>
                </tr>

                <tr>
                  <td>Nombre de los pasajeros / Passenger Names</td>
                  <td>
                  {% for pax in booking.paxes %}
                    
                      {? pax.name ?} {? pax.lastname ?}
                      {% if !loop.last %}<br>{% endif %}

                    {% if !loop.last %}<br>{% endif %}
                  {% endfor %}
                  </td>
                </tr>
                <tr>
                  <td>Tipo de Acomodación / Accomodation Type</td>
                  <td>
                    {% set totalSingle = 0 %}
                    {% set totalDouble = 0 %}
                    {% set totalTriple = 0 %}

                    {% for room in booking.rooms %}
                      {% if room.roomcode == 'double'%}
                         {% set totalDouble = totalDouble + 1 %}
                      {% endif %}
                      {% if room.roomcode == 'single'%}
                         {% set totalSingle = totalSingle + 1 %}
                      {% endif %}
                      {% if room.roomcode == 'triple'%}
                         {% set totalTriple = totalTriple + 1 %}
                      {% endif %}
                    {% endfor %}

                    {% if totalSingle > 0 %}
                      {% if totalSingle > 1 %}
                        {? totalSingle ?} Habitaciones Individuales / Single Rooms
                      {% else %}
                        {? totalSingle ?} Habitación Individual / Single Room
                      {% endif %}
                    {% endif %}

                    {% if totalDouble > 0 %}
                        {# salto de linea entre uno y otro#}
                       {% if totalSingle > 0%}
                        <br>
                       {% endif %}

                      {% if totalDouble > 1 %}
                        {? totalDouble ?} Habitaciones Dobles / Double Rooms
                      {% else %}
                        {? totalDouble ?} Habitación Doble / Double Room
                      {% endif %}
                    {% endif %}

                    {% if totalTriple > 0 %}
                      {% if totalSingle>0 || totalDouble>0 %}
                        <br>
                      {% endif %}

                      {% if totalTriple > 1 %}
                        {? totalTriple ?} Habitaciones Triples / Triple Rooms
                      {% else %}
                        {? totalTriple ?} Habitación Triple / Triple Room
                      {% endif %}
                    {% endif %}
                 </td>
                </tr>

                <tr>
                  <td><strong>Programa / Program</strong></td>
                  <td><strong>{? product.title_es ?} {? product.categoryname.label_es ?} / {? product.title ?} {? product.categoryname.label_en ?}</strong></td>
                </tr>
                <tr>
                  <td>Ref. de Programa DMC / DMC Program Ref</td>
                  <td>{? product.name ?}</td>
                </tr>
                <tr>
                  <td>Duración del viaje / Trip duration</td>
                  <td>{? product.itinerary.length ?} Días / {? product.itinerary.length ?} Days</td>
                </tr>
                <tr>
                  <td>Comienzo del programa / Tour start</td>
                  <td>{? booking.dates.start.day ?} {? booking.dates.start.monthname_es ?} {? booking.dates.start.year?}</td>
                </tr>


              {# observaciones de yto #}
                 {% if booking.observations%}
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>

                  <tr>
                    <td colspan="2"><strong>Observaciones / Observations</strong> </td>
                  </tr>
                  <tr>
                    <td colspan="2">{? booking.observations.label_es ?}</td>
                  </tr>
                 {% endif %}
              </table>



              <br />
              <hr />

              <footer class="row">
                 {# tabla con informacion del dmc y yto#}
                 <div class="col-md-12">
                  <table class="table table-dmc table-nolined">
                    <tr>
                      <td class="cellempty" style="width:50%">
                        <h4 class="text-xs">PROVEEDOR DE SERVICIOS/DMC</h4>
                      </td>
                      <td class="cellempty" style="width:50%">
                        <h4 class="text-xs">RESERVADO A TRAVES DE/BOOKED THROUGH</h4>
                      </td>
                    </tr>
                    <tr>
                      {# dmc #}
                      <td class="cellempty ml-b">
                        <img class="id-user-img" src="{? getUrlCloudinary(dmc.images.logo.url, 'avatarl70') ?}" data-src2x="{? getUrlCloudinary(dmc.images.logo.url, 'avatarl70retina') ?}"/><br>
                      
                        <h3 class="middle mt-b">
                        {% if dmc.vouchername != '' %}
                        {? dmc.vouchername ?}
                        {% else %}
                        {? dmc.name ?}
                        {% endif %}
                        </h3>
                        <p>{? dmc.company.location.fulladdress ?},<br /> CP {? dmc.company.location.cp ?}, {? dmc.company.location.city ?}, ({? dmc.company.location.country ?})</p>
                        <p class="bold">Teléfono 24hs / Emergency Phone (24/365) : {? dmc.company.emergencyphone ?}</p>
                        <br />
                      </td>
                      {# yto #}
                      <td class="cellempty mr-b">
                        <div>
                           <img class="id-user-img" src="http://res.cloudinary.com/open-market-travel/image/upload/c_pad,h_70,w_160/v1448267234/yourttoo.com/yourttoo_logo_invoice.png">
                         </div>
                        Marca comercial de TRAVELER SENSE S.L. NIF: B57860017  Insc. en el Reg. Mercantil, Tomo 2575, Libro 0, Folio 170, Hoja PM-74129, AVBAL/657
                      </td>
                    </tr>
                  </table>
                </div>

              </footer>
            </div><!-- .modal-body ends -->
         </div> <!-- invoice-preview ends -->
        </div>  <!-- .modal-content ends -->
      </div> <!-- .modal-dialog ends -->
    </div>


  </div>
  <div class="container breakhere">

    {#  pagina para el operador#}
    <div class="invoice-modal" id="invoice-modal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class="invoice-preview">

              {# informacion del afiliado
              <table class="table table-dmc table-nolined" style="width: 100%;">
                <tr>
                  <td class="cellempty" style="width: 30%;">
                      <img class="id-user-img" src="{? getUrlCloudinary(booking.affiliate.images.logo.url, 'avatar150') ?}" data-src2x="{? getUrlCloudinary(dmc.images.logo.url, 'avatar150retina') ?}"  >
                  </td>
                  <td class="cellempty">
                      <h2 class="thin middle mb-xl mt-b">{? booking.affiliate.company.name ?}</h2>
                    <p>{? booking.affiliate.company.location.fulladdress ?},<br /> {?  booking.affiliate.company.location.cp ?}, {?  booking.affiliate.company.location.city ?}, ({? booking.affiliate.company.location.country ?})</p>
                    <p>Teléfono: <strong>{? booking.affiliate.company.phone ?}</strong></p>
                    <br />
                  </td>
                </tr>
              </table>
            #}

            <h4>Copia para el operador / Copy for DMC</h4>



              {# tabla con los datos de la reserva #}
              <table class="table table-hover table-invoice">
                <tr>
                  <td><strong>Localizador de la Reserva / Booking ID</strong></td>
                  <td><strong>{? booking.idBooking ?}</strong></td>
                </tr>

                <tr>
                  <td>Número de pasajeros / Passengers</td>
                  <td>
                     {% set totalPax = booking.paxes.length %}
                    {? totalPax ?}
                  </td>
                </tr>

                <tr>
                  <td>Nombre de los pasajeros / Passenger Names</td>
                  <td>
                  {% for pax in booking.paxes %}
                    
                      {? pax.name ?} {? pax.lastname ?}
                      {% if !loop.last %}<br>{% endif %}

                    {% if !loop.last %}<br>{% endif %}
                  {% endfor %}
                  </td>
                </tr>
                <tr>
                  <td>Tipo de Acomodación / Accomodation Type</td>
                  <td>
                    {% set totalSingle = 0 %}
                    {% set totalDouble = 0 %}
                    {% set totalTriple = 0 %}

                    {% for room in booking.rooms %}
                      {% if room.roomcode == 'double'%}
                         {% set totalDouble = totalDouble + 1 %}
                      {% endif %}
                      {% if room.roomcode == 'single'%}
                         {% set totalSingle = totalSingle + 1 %}
                      {% endif %}
                      {% if room.roomcode == 'triple'%}
                         {% set totalTriple = totalTriple + 1 %}
                      {% endif %}
                    {% endfor %}

                    {% if totalSingle > 0 %}
                      {% if totalSingle > 1 %}
                        {? totalSingle ?} Habitaciones Individuales / Single Rooms
                      {% else %}
                        {? totalSingle ?} Habitación Individual / Single Room
                      {% endif %}
                    {% endif %}

                    {% if totalDouble > 0 %}
                        {# salto de linea entre uno y otro#}
                       {% if totalSingle > 0%}
                        <br>
                       {% endif %}

                      {% if totalDouble > 1 %}
                        {? totalDouble ?} Habitaciones Dobles / Double Rooms
                      {% else %}
                        {? totalDouble ?} Habitación Doble / Double Room
                      {% endif %}
                    {% endif %}

                    {% if totalTriple > 0 %}
                      {% if totalSingle>0 || totalDouble>0 %}
                        <br>
                      {% endif %}

                      {% if totalTriple > 1 %}
                        {? totalTriple ?} Habitaciones Triples / Triple Rooms
                      {% else %}
                        {? totalTriple ?} Habitación Triple / Triple Room
                      {% endif %}
                    {% endif %}
                 </td>
                </tr>

                <tr>
                  <td>Programa / Program </td>
                  <td>{? product.title_es ?} {? product.categoryname.label_es ?} / {? product.title ?} {? product.categoryname.label_en ?}</td>
                </tr>
                <tr>
                  <td><strong>Ref. de Programa DMC / DMC Program Ref</strong></td>
                  <td><strong>{? product.name ?}</strong></td>
                </tr>
                <tr>
                  <td>Duración del viaje / Trip duration</td>
                  <td>{? product.itinerary.length ?} Días / {? product.itinerary.length ?} Days</td>
                </tr>
                <tr>
                  <td>Comienzo del programa / Tour start</td>
                  <td>{? booking.dates.start.day ?} {? booking.dates.start.monthname_en ?} {? booking.dates.start.year?}</td>
                </tr>


                {# observaciones de yto #}
                 {% if booking.observations%}
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>

                  <tr>
                    <td colspan="2"><strong>Observaciones / Observations</strong> </td>
                  </tr>
                  <tr>
                    <td colspan="2">{? booking.observations.label_en ?}</td>
                  </tr>
                 {% endif %}
              </table>


              <br />
              <hr />

              <footer class="row">
                 {# tabla con informacion del dmc y yto#}
                 <div class="col-md-12">
                  <table class="table table-dmc table-nolined">
                    <tr>
                      <td class="cellempty" style="width:50%">
                        <h4 class="text-xs">PROVEEDOR DE SERVICIOS/DMC</h4>
                      </td>
                      <td class="cellempty" style="width:50%">
                        <h4 class="text-xs">RESERVADO A TRAVES DE/BOOKED THROUGH</h4>
                      </td>
                    </tr>
                    <tr>
                      {# dmc #}
                      <td class="cellempty ml-b">
                        <img class="id-user-img" src="{? getUrlCloudinary(dmc.images.logo.url, 'avatarl70') ?}" data-src2x="{? getUrlCloudinary(dmc.images.logo.url, 'avatarl70retina') ?}"/><br>
                      
                        <h3 class="middle mt-b">
                        {% if dmc.vouchername != '' %}
                        {? dmc.vouchername ?}
                        {% else %}
                        {? dmc.name ?}
                        {% endif %}
                        </h3>
                        <p>{? dmc.company.location.fulladdress ?},<br /> CP {? dmc.company.location.cp ?}, {? dmc.company.location.city ?}, ({? dmc.company.location.country ?})</p>
                        <p class="bold">Teléfono 24hs / Emergency Phone (24/365) : {? dmc.company.emergencyphone ?}</p>
                        <br />
                      </td>
                      {# yto #}
                      <td class="cellempty mr-b">
                        <div>
                           <img class="id-user-img" src="http://res.cloudinary.com/open-market-travel/image/upload/c_pad,h_70,w_160/v1448267234/yourttoo.com/yourttoo_logo_invoice.png">
                         </div>
                        Marca comercial de TRAVELER SENSE S.L. NIF: B57860017  Insc. en el Reg. Mercantil, Tomo 2575, Libro 0, Folio 170, Hoja PM-74129, AVBAL/657
                      </td>
                    </tr>
                  </table>
                </div>

              </footer>
            </div><!-- .modal-body ends -->
         </div> <!-- invoice-preview ends -->
        </div>  <!-- .modal-content ends -->
      </div> <!-- .modal-dialog ends -->
    </div>
  </div>
{% endblock %}
