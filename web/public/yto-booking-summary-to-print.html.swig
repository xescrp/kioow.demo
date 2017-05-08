{% extends 'yto-layout-empty.html.swig' %}

{% block bodyclass %}print{% endblock %}

{% block body %}

<style type="text/css">
     .breakhere {page-break-before: always}
     .day-tit{
        border-bottom: 1px solid #333;
     }
</style>
<div class="container">
    <div class="invoice-modal" id="invoice-modal">
        <div class="modal-content">        
            <div class="pl-xxl pr-xxl">
              {# tabla  info afiliado#}
              <table class="table table-dmc table-nolined" style="width: 100%;">
                <tr>
                  <td class="cellempty" style="width: 100px">
                   <img src="{? getUrlCloudinary(booking.affiliate.images.logo.url, 'avatar100') ?}" data-src2x="{? getUrlCloudinary(dmc.images.logo.url, 'avatar100retina') ?}">
                  </td>
                  <td class="cellempty">
                      <h2 class="bold">{? booking.affiliate.company.name ?}</h2>
                      <span class="mr-b">Tel: {? booking.affiliate.company.phone ?} | {? booking.affiliate.company.location.fulladdress ?} {# {% if booking.affiliate.company.website %}| web : {? booking.affiliate.company.website ?}{% endif %} #}</span>
                    </div>
                  </td>
                  <td class="cellempty text-right">
                    <h2>Localizador: <strong> {? booking.idBooking ?}</strong></h2>
                      <span class="mr-b">Estado: </span>
                      {%if booking.status == 'invalid' || booking.status == 'cancelled' || booking.status == 'error' || booking.status == 'onbudget' %}
                          <span class="label label-default"><i class="fa fa-times-circle"></i> Cancelada</span>
                      {% endif %}
                      {% if booking.status != 'invalid' && booking.status != 'cancelled' && booking.status != 'error' && booking.status != 'onbudget' %}
                        <span class="label label-default"><i class="fa fa-check-circle"></i> Confirmada</span>
                      {% endif %}                      
                  </td>
                </tr>                 
              </table>

              <h2>Resumen de la reserva para los pasajeros:</h2>
              <ol class="pb-l">
                {% for pax in booking.paxes %}
                      <li class="bold"> {?pax.name?} {?pax.lastname?}</li>
                {% endfor %}
              </ol>
              <hr class="mt-b mb-b">
              <h4 class="mt-xxl">Detalles del viaje</h4>
              <table class="table table-hover table-invoice bg-soft ">
                <tr>
                  <td>Programa: <strong>{? product.title_es ?} {? product.categoryname.label_es ?}</strong></td>
                  <td>Duración del viaje: <strong>{? product.itinerary.length ?} Días</strong></td>
                  <td>Fecha de Salida: <strong>{? booking.dates.start.day ?} {? booking.dates.start.monthname_es ?} {? booking.dates.start.year?}</strong></td>
                </tr>
                <tr>
                  <td>Número de pasajeros
                     {% set totalPax = booking.paxes.length %}
                    <strong>{? totalPax ?}</strong>
                  </td>
              
               
                  <td>
                  Distribución de Habitaciones:
                  {% set totalSingle = 0 %}
                  {% set totalDouble = 0 %}
                  {% set totalTriple = 0 %}
                  {% set totalQuad = 0 %}
                  </td>
                  <td>
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
                    {% if room.roomcode == 'other'%}    
                       {% set totalQuad = totalQuad + 1 %}
                    {% endif %}                    
                  {% endfor %}

                  {% if totalSingle > 0 %}
                    {% if totalSingle > 1 %}
                      <strong>{? totalSingle ?} pasajeros en individuales </strong>
                    {% else %}
                      <strong>{? totalSingle ?} pasajero en individual</strong>
                    {% endif %}
                  {% endif %}

                  {% if totalDouble > 0 %}
                      {# salto de linea entre uno y otro#}
                     {% if totalSingle > 0%}
                      <br>
                     {% endif %}

                    {% if totalDouble > 1 %}
                      <strong>{? totalDouble*2 ?} pasajeros en dobles</strong>
                    {% else %}
                      <strong>{? totalDouble*2 ?} pasajeros en doble</strong>
                    {% endif %}
                  {% endif %}

                  {% if totalTriple > 0 %}
                    {% if totalSingle>0 || totalDouble>0 %}
                      <br>
                    {% endif %}

                    {% if totalTriple > 1 %}
                      <strong>{? totalTriple*3 ?} pasajeros en triples</strong>
                    {% else %}
                      <strong>{? totalTriple*3 ?} pasajeros en triple</strong>
                    {% endif %}
                  {% endif %}

                  {% if totalQuad > 0 %}
                    {% if totalSingle>0 || totalDouble>0  || totalTriple>0 %}
                      <br>
                    {% endif %}

                    {% if totalQuad > 1 %}
                      <strong>{? totalQuad*4 ?} pasajeros en cuádruples</strong>
                    {% else %}
                      <strong>{? totalQuad*4 ?} pasajeros en cuádruple</strong>
                    {% endif %}
                  {% endif %}
                 </td>
               </tr>
              </table>



              <h4 class="mt-xxl">Detalles de precios</h4>
                {% set totalSingle = 0 %}
                {% set totalDouble = 0 %}
                {% set totalTriple = 0 %}
                {% set totalOther = 0 %}
                {% set pvpSingle = 0 %}
                {% set pvpDouble = 0 %}
                {% set pvpTriple = 0 %}
                {% set pvpOther = 0 %}
                {% for room in booking.rooms %}
                    {% if room.roomcode == 'double'%}    
                      {% set pvpDouble = room.priceperpax %}
                      {% set totalDouble = totalDouble + 1 %}
                    {% endif %}
                    {% if room.roomcode == 'single'%}    
                      {% set pvpSingle = room.priceperpax %}
                      {% set totalSingle = totalSingle + 1 %}
                    {% endif %}
                    {% if room.roomcode == 'triple'%}    
                      {% set pvpTriple = room.priceperpax %}
                      {% set totalTriple = totalTriple + 1 %}
                    {% endif %}
                    {% if room.roomcode == 'other'%}    
                      {% set pvpOther = room.priceperpax %}
                      {% set totalOther = totalOther + 1 %}
                    {% endif %}
                  {% endfor %}
              <table class="table table-hover table-invoice bg-soft"  style="width:50%">
                <!-- resumen simple -->
                {% if totalSingle > 0 %}
                  {% if totalSingle > 1 %}
                    <tr>
                      <td>
                        Pasajeros en individuales 
                      </td>                        
                      <td>
                        <strong> {? totalSingle ?} x</strong>
                      </td>                       
                      <td>
                        <strong> {? pvpSingle | removeDecimal?} {? booking.pricing.currency.symbol?}</strong>
                      </td>                       
                    </tr>                       
                  {% else %}
                    <tr>
                      <td>
                       pasajero en individual
                      </td>                        
                      <td>
                        <strong> {? totalSingle ?} x </strong>
                      </td>                       
                      <td>
                       <strong> {? pvpSingle | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                      </td>                       
                    </tr>
                  {% endif %}                    
                {% endif %}

              <!-- resumen doble -->
              {% if totalDouble > 0 %}
                {% if totalDouble > 1 %}
                  <tr>
                    <td>
                      Pasajeros en dobles 
                    </td>                        
                    <td>
                      <strong> {? totalDouble*2 ?} x </strong>
                    </td>                       
                    <td>
                      <strong> {? pvpDouble | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                    </td>                       
                  </tr>                             
                {% else %}
                  <tr>
                    <td>
                     Pasajeros en doble
                    </td>                        
                    <td>
                      <strong> {? totalDouble*2 ?} x </strong>
                    </td>                       
                    <td>
                      <strong> {? pvpDouble | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                    </td>                       
                  </tr>                      
                {% endif %}                    
              {% endif %}

              <!-- resumen triple -->
              {% if totalTriple > 0 %}
                {% if totalTriple > 1 %}
                  <tr>
                    <td>
                      Pasajeros en triples 
                    </td>                        
                    <td>
                      <strong> {? totalTriple*3 ?} x </strong>
                    </td>                       
                    <td>
                      <strong> {? pvpTriple | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                    </td>                       
                  </tr>                           
                {% else %}
                  <tr>
                    <td>
                     Pasajeros en triple
                    </td>                        
                    <td>
                      <strong> {? totalTriple*3 ?} x </strong>
                    </td>                       
                    <td>
                      <strong> {? pvpTriple | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                    </td>                       
                  </tr>                          
                {% endif %}                    
              {% endif %}

              <!-- resumen quad -->
              {% if totalOther > 0 %}
                {% if totalOther > 1 %}
                  <tr>
                    <td>
                      Pasajeros en cuádruples 
                    </td>                        
                    <td>
                      <strong>{? totalOther*4 ?} x </strong>
                    </td>                       
                    <td>
                      <strong> {? pvpOther | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                    </td>                       
                  </tr>                            
                {% else %}
                  <tr>
                    <td>
                     Pasajeros en cuadruple
                    </td>                        
                    <td>
                      <strong>{? totalOther*4 ?} x </strong>
                    </td>                       
                    <td>
                      <strong> {? pvpOther | removeDecimal ?} {? booking.pricing.currency.symbol?}</strong>
                    </td>                     
                  </tr>   
                {% endif %}                   
              {% endif %}

              <!-- total -->
               <tr>
                  <td> 
                  Total:                        
                  </td>                        
                  <td>                      
                  </td>                       
                  <td>
                  <strong>{? booking.breakdown.agency.pvp | removeDecimal ?} {? booking.pricing.currency.symbol ?}</strong>
                  </td>                     
                </tr>   
              </table>
                 

         
<!-- **************************itinerario ************************************************************** -->
      <h4 class="pt-xxl">Itinerario</h4>
      <table class="table table-hover table-invoice">           
        {% for day in product.itinerary %}
          <div class="day-item mb-xxl">
            <div class="day-desc">
              <h3 class="day-tit bold pb-b cell-b-b">
                Día {? loop.index ?} - 
                {% if day.departurecity.city.length > 0 %}
                  
                  {# check if city ES exists #}         
                  {% if day.departurecity.city_es != null %}
                    
                    {# make sure departure is not like sleepcity #}
                    {% if day.sleepcity.city_es != day.departurecity.city_es %}
                      {? day.departurecity.city_es ?}
                      {% if day.stopcities.length > 0 || day.sleepcity.city.length > 0 %} - {% endif %}
                      {# else (so dep and sleep were the same) #}
                    {% else %}
                      {% if day.stopcities.length > 0 %}
                        {? day.departurecity.city_es ?} -
                      {% endif %}
                    {% endif %}

                  {# else show regular city #}
                  {% else %}
                    {# make sure departure is not like sleepcity #}
                    {% if day.sleepcity.city != day.departurecity.city %}
                      {? day.departurecity.city ?}
                      {% if day.stopcities.length > 0 || day.sleepcity.city.length > 0 %} - {% endif %}
                      {# else (so dep and sleep were the same) #}
                    {% else %}
                      {% if day.stopcities.length > 0 %}
                        {? day.departurecity.city ?} -
                      {% endif %}
                    {% endif %}
                  {% endif %}
                {% endif %}

                {% if day.stopcities.length > 0 %}
                  {% for city in day.stopcities %}
                    {% if city.city_es != null %}
                      {? city.city_es ?}
                    {% else %}
                      {? city.city ?}
                    {% endif %}

                    {% if day.sleepcity.city.length > 0 %} - {% else %}{% if !loop.last %} - {% endif %} {% endif %}
                  {% endfor %}
                {% endif %}

                {% if !product.itinerary.lastday %}
                  {% if day.sleepcity.city.length > 0 %}
                    {% if day.sleepcity.city_es != null %}
                      {? day.sleepcity.city_es ?}
                    {% else %}
                      {? day.sleepcity.city ?}
                    {% endif %}
                  {% endif %}
                {% endif %}

              </h3>

              <p class="pre-text">{? day.description_es ?}</p>
              {% if day.lastday %}
              {% else %}
              <h4 class="small">Hotel</h4>
              <p><strong>{?  day.hotel.name  ?} {% if day.hotel.category == "unclassified *" %}{% else %}{? day.hotel.category ?}{% endif %} </strong> 
              {% if day.hotel.incity %}<em>(en la ciudad)</em>{% endif %}
              {% if day.hotel.insurroundings %}<em>(alrededores)</em>{% endif %}
                </p>
              {% endif %}

              {% if day.hotel.breakfast or day.hotel.lunch or day.hotel.dinner %}
              <h4 class="small">Régimen Alimenticio</h4>
                <p>
                  {% if day.hotel.breakfast %}
                    <span>Desayuno{% if day.hotel.lunch or day.hotel.dinner %} - {% endif %}</span>
                  {% endif %}
                  
                  {% if day.hotel.lunch %}
                    <span>Comida{% if day.hotel.lunchdrinks %}<em> (bebidas incluídas)</em>{% endif %} {% if day.hotel.dinner %} - {% endif %}</span>
                  {% endif %}
                  
                  {% if day.hotel.dinner %}
                    <span>Cena{% if day.hotel.dinnerdrinks %}<em> (bebidas incluídas)</em>{% endif %}</span>
                  {% endif %}
                </p>
              {% endif %}

              {% if day.activities.length > 0 %}
                <h4 class="small">Actividades</h4>
                <ul class="list-activities">
                  {% for activity in day.activities %}
                  <li>
                    {? activity.title_es ?}
                    {% if activity.ticketsincluded %}
                      <span> - tickets incluidos</span>
                    {% endif %}

                    {% if activity.group %}
                      <span> - en grupo</span>
                    {% endif %}

                    {% if activity.localguide %}
                      <span>- Guía Local </span>
                      {% if activity.language.spanish %}
                        en español
                      {% else %}
                        {% if activity.language.english %}
                          en inglés
                        {% else %}
                          {% if activity.language.french %}
                            en francés
                          {% else %}
                            {% if activity.language.german %}
                              en alemán
                            {% else %}
                              {% if activity.language.italian %}
                                en italiano
                              {% else %}
                                {% if activity.language.portuguese %}
                                  en portugués
                                {% endif %}
                              {% endif %}
                            {% endif %}
                          {% endif %}
                        {% endif %}
                      {% endif %}
                    {% endif %}
                  </li>
                   {% endfor %}
                </ul>
              {% endif %}
            </div>
          </div>
        {% endfor %}

        <hr>

        <div class="include">
          <h4>Incluido</h4>
          <ul class="fa-ul">
            {% if product.included.arrivaltransfer %}
              <li>
                <span>
                  <i class="fa-li fa fa-check-circle"></i>
                  Traslado de llegada
                  {% if product.included.arrivalassistance %}
                  <span>
                    con asistencia
                    {% set arass = product.included.arrivallanguage %}
                    {% if arass.spanish or arass.english or arass.french or arass.german or arass.italian or arass.portuguese  %}
                      en: 
                    {% endif %}

                    {% for lang in product.included.arrivallanguage %}
                      {% if lang %}
                        {% if loop.key == "spanish" %}
                          español<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "english" %}
                          inglés<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "french" %}
                          francés<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "german" %}
                          alemán<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "italian" %}
                          italiano<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "portuguese" %}
                          portugués<span class="comma">,</span>
                        {% endif %}
                      {% endif %}
                    {% endfor %}
                  </span>
                {% endif %}
                </span>
              </li>
            {% endif %}

            {% if product.included.departuretransfer %}
              <li>
                <span><i class="fa-li fa fa-check-circle"></i>
                Traslado de salida 
                {% if product.included.departureassistance %}
                  <span>
                    con asistencia
                    {% set deass = product.included.departurelanguage %}
                    {% if deass.spanish or deass.english or deass.french or deass.german or deass.italian or deass.portuguese  %}
                      en: 
                    {% endif %}

                    {% for lang in product.included.arrivallanguage %}
                      {% if lang %}
                        {% if loop.key == "spanish" %}
                          español<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "english" %}
                          inglés<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "french" %}
                          francés<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "german" %}
                          alemán<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "italian" %}
                          italiano<span class="comma">,</span>
                        {% endif %}

                        {% if loop.key == "portuguese" %}
                          portugués<span class="comma">,</span>
                        {% endif %}
                      {% endif %}
                    {% endfor %}
                  </span>
                {% endif %}
                </span>
              </li>
            {% endif %}

            {% if product.included.transportbetweencities.included %}
              <li>
                <span><i class="fa-li fa fa-check-circle"></i>
                Transporte entre ciudades:

                {% if product.included.transportbetweencities.bus %}
                  autobús<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.domesticflight %}
                  vuelo doméstico<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.train %}
                  tren<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.boat %}
                  barco<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.van %}
                  minivan<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.truck %}
                  camión<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.privatecarwithdriver %}
                  coche privado con conductor<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.privatecarwithdriverandguide %}
                  coche privado con conductor y guía<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.fourxfour %}
                  4x4<span class="comma">,</span>
                {% endif %}

                {% if product.included.transportbetweencities.other %}
                  {? product.included.transportbetweencities.otherdescription ?}<span class="comma">,</span>
                {% endif %}

                </span>
              </li>
            {% endif %}

            {% if product.included.tourescort.included %}
              <li>
                <span>
                  <i class="fa-li fa fa-check-circle"></i>
                  {% set escortindex = product.included.tourescort.language %}
                  {% if escortindex.spanish %}
                      Guía Turístico en español
                    {% else %}
                      {% if escortindex.english %}
                      Guía Turístico en inglés
                      {% else %}
                        {% if escortindex.french %}
                            Guía Turístico en francés
                          {% else %}
                            {% if escortindex.german %}
                              Guía Turístico en alemán
                            {% else %}
                              {% if escortindex.italian %}
                                Guía Turístico en italiano
                              {% else %}
                                {% if escortindex.portuguese %}
                                  Guía Turístico en portugués
                                {% endif %} 
                              {% endif %}                 
                            {% endif %}             
                        {% endif %}           
                      {% endif %}
                    {% endif %}
                </span>
              </li>
            {% endif %}

            {% if product.included.driveguide.included && !product.included.tourescort.included %}
              <li>
                <span>
                  <i class="fa-li fa fa-check-circle"></i>
                  {% set driveindex = product.included.driveguide.language %}
                  {% if driveindex.spanish %}
                    Conductor-guía en español
                  {% else %}
                    {% if driveindex.english %}
                    Conductor-guía en inglés
                    {% else %}
                      {% if driveindex.french %}
                          Conductor-guía en francés
                        {% else %}
                          {% if driveindex.german %}
                            Conductor-guía en alemán
                          {% else %}
                            {% if driveindex.italian %}
                              Conductor-guía en italiano
                            {% else %}
                              {% if driveindex.portuguese %}
                                Conductor-guía en portugués
                              {% endif %} 
                            {% endif %}
                          {% endif %}
                      {% endif %}
                    {% endif %}
                  {% endif %}
                </span>
              </li>
            {% endif %}

            <li>
              <span>
                <i class="fa-li fa fa-check-circle"></i>
                {% if meals.breakfast == 1 %}
                  {? meals.breakfast ?} desayuno<span class="comma"> - </span>
                {% elseif meals.breakfast > 1 %}
                  {? meals.breakfast ?} desayunos<span class="comma"> - </span>
                {% endif %}

                {% if meals.lunch == 1 %}
                  {? meals.lunch ?} comida<span class="comma"> - </span>
                {% elseif meals.lunch > 1 %}
                  {? meals.lunch ?} comidas<span class="comma"> - </span>
                {% endif %}

                {% if meals.dinner == 1 %}
                  {? meals.dinner ?} cena<span class="comma"> - </span>
                {% elseif meals.dinner > 1 %}
                  {? meals.dinner ?} cenas<span class="comma"> - </span>
                {% endif %}
              </span>
            </li>

            {# ONLY SHOWING WHEN NOT INCLUDED #}
            {# {% if product.included.taxesinthecountry %}
              <li><span><i class="fa-li fa fa-check-circle"></i>
              Impuestos del país </span></li>
            {% endif %} #}

            {% if product.included.airporttaxes %}
              <li><span><i class="fa-li fa fa-check-circle"></i>
              Tasas aeropuerto </span></li>
            {% endif %}
            
            {% if product.included.tips %}
              <li><span><i class="fa-li fa fa-check-circle"></i>
              Propinas </span></li>
            {% endif %}

            {% if hasDrinks %}
              <li><span><i class="fa-li fa fa-check-circle"></i>
              Bebidas
              </span></li>
            {% endif %}        
            
            {% if product.included.baggagehandlingfees %}
              <li><span><i class="fa-li fa fa-check-circle"></i>
              Maleteros </span></li>
            {% endif %}
            <li>
              <span>
                <i class="fa-li fa fa-check-circle"></i>
                Hoteles, Regimen Alimenticio y visitas según se especifique o no, en el itinerario
              </span>
            </li>
            {% if product.included.trip.grouptrip %}
              <p class="help-block mt-xl">Este es un Programa Regular</p>
            {% endif %}
          </ul>
        </div>

        <div class="not-include">
          <h4>No Incluido</h4>
          <ul class="fa-ul">
            <li><span><i class="fa-li fa fa-times-circle"></i>Vuelos internacionales</span></li>

            {% if !product.included.arrivaltransfer %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Traslado de llegada</span></li>
            {% endif %}

            {% if !product.included.departuretransfer %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Traslado de salida</span></li>
            {% endif %}

            {% if !product.included.transportbetweencities.included %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Transporte entre ciudades
              </span></li>
            {% endif %}

            {% if !product.included.taxesinthecountry %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Impuestos del país </span></li>
            {% endif %}

            {% if !product.included.airporttaxes %}
              {% if product.included.transportbetweencities.domesticflight %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Tasas de aeropuerto </span></li>
              {% endif %}
            {% endif %}

            {% if !hasDrinks %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Bebidas
              </span></li>
            {% endif %}

            {% if !product.included.tips %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Propinas </span></li>
            {% endif %}

            {% if !product.included.baggagehandlingfees %}
              <li><span><i class="fa-li fa fa-times-circle"></i>
              Maleteros </span></li>
            {% endif %}
            <li><span><i class="fa-li fa fa-times-circle"></i>Seguros</span></li>
          </ul>
        </div> 
      </table>
      {% for day in product.itinerary %}
        {% if day.needflights %}
          {% set showfly = true %}
        {% endif %}
      {% endfor %}

      {% if showfly %}
              <h5 class="bold mt-zero"><i class="fa fa-times-circle"></i> Este circuito no incluye los siguientes vuelos internos:</h5>
              
            {% for day in product.itinerary %}
              {% set dayindex = loop.index %}
              {% if loop.first %}<ol class="list-unstyled">{% endif %}
              {% if day.needflights %}
                {% for fly in day.flights %}
                <li><strong>Día {? dayindex ?}:</strong> &nbsp;&nbsp;{? fly.departure.label ?}&nbsp;&nbsp; <i class="fa fa-arrow-circle-right"></i> &nbsp;&nbsp;{? fly.arrival.label ?}
                 {% if fly.recommendedflight %}
                   | <em>vuelo recomendado: {? fly.recommendedflight ?}</em>
                   </li>
                 {% endif %}
                {% endfor %}
              {% endif %} 
              {% if loop.last %}</ol>{% endif %}
                  {% endfor %}
                  <p><em>Recuerda que también debes reservar estos vuelos por tu cuenta</em></p>
      {% endif %}


      {% if product.important_txt_es != "" || product.important_txt_en != "" %}
      <hr />
          <h5 class="bold mt-zero"><i class="fa fa-exclamation-triangle"></i> Notas Importantes</h5>
          <p class="pre-text">
        {%- if product.important_txt_es != "" -%}
        {?- product.important_txt_es -?}
        {%- else -%}
        {?- product.important_txt_en -?}
        {%- endif -%}
          </p>
        {% endif %}
      <!-- politicas de cancelacioin -->
      <hr />
      <h4>Políticas de cancelación</h4>
      <p> {? booking.dmc.membership.cancelpolicy._es ?}</p>
      <!-- reservado -->
      <hr />
      <p class="small"><small>Reservado a través de yourttoo.com marca comercial de TRAVELER SENSE | NIF: B57860017 Insc. En el Reg. Mercantil, Tomo 2575, Libro 0, Folio 170, Hoja PM-74129, AVBAL/657</small></p>

    </div><!-- .modal-body ends -->

  </div>  <!-- .modal-content ends -->      
  </div>
</div> <!-- .container ends -->
   
{% endblock %}