    <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <h2 class="null">Programa: <strong>"{{ product.name }} {{ product.categoryname.label_es }}"</strong></h2>
                            <br />
                            {# <h3 class="null" style="line-height: 20.7999992370605px;">BOOKING ID: <a href="http://openmarket.travel/dmc-booking?idbooking={{ booking.idBooking }}" target="_blank">{{ booking.idBooking }}</a></h3> #}
                            <h3 class="null" style="line-height: 20.7999992370605px;">ID DE BOOKING: <a>{{ booking.idBooking }}</a></h3>
                            <em>Realizada: {{ booking.createdOn |date('d/m/Y - G:i',-120,'(GMT+2)')}}</em>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 18px 18px 0px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #999999;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 0px 9px 18px; text-align: left;">

                           {#  <div>
                            <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-globe-normal.png" style="height: 14px; width: 14px;" width="14">
                            <span>
                            {% for country in countries %}
                                <strong>{{ country }}</strong> {% if !loop.last %}-{% endif %}
                            {% endfor %}
                            </span>
                            </div> #}

                            <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{booking.start.day}} {{booking.start.monthname_es}} {{booking.start.year}} </span></div>

                            <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{product.itinerary.length }} días</span></div>                                

                            {% set totalpax = 0 %}
                            {% for room in booking.roomDistribution %}
                                {% set totalpax += room.paxList.length %}
                            {% endfor %}

                            <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{totalpax}}<span>&nbsp;pax, {{booking.roomDistribution.length}}
                            {% if booking.roomDistribution.length > 1 %} 
                            habitaciones
                            {% else %}
                            habitación
                            {% endif %}
                            ({% for room in booking.roomDistribution %}{% if !loop.first %} {% endif %}{{room.roomCode}}{% if !loop.last %} / {% endif %}{% endfor %})
                            </span></div>
                        </td>
                    </tr>
                </tbody></table>
                
                <table align="right" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px 9px 0px; text-align: left;">
                        

                            {# si tiene vuelos muestro como total tierra y vuelos #}
                            {% if booking.flights && booking.amountflights %}
                                <h3 class="null" style="text-align: right;">TOTAL:&nbsp; {{(booking.amount.exchange.value + booking.amountflights.exchange.value) | numberFractions}} {{booking.amount.exchange.currency.symbol}}</h3>
                            {% else %}
                                 <h3 class="null" style="text-align: right;">TOTAL:&nbsp;{{ booking.amount.exchange.value | numberFractions}} {{ booking.amount.exchange.currency.symbol }}</h3>
                            {% endif %}
                          

                            <div style="text-align: right;">

                            {# ha pagado el 100 en un pago #}
                            {% if booking.payStatus.length == 1 %}
                                {{booking.payStatus[0].payment}}%  PAGADO 

                                {# total pagaddo #}
                                ({{ booking.payStatus[0].amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}} ) 
                                <br/>

                            {# hay dos pagos #}   
                            {% elseif booking.payStatus.length > 1 %}

                                {# se ha validado el segundo pago #}
                                {% if booking.payStatus[1].receiptNumber %}
                                    {{ booking.payStatus[1].payment }}% PAGADO 

                                    {# total pagaddo #}
                                    ({{ booking.payStatus[1].amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}} ) 
                                    <br/>

                                {# reserva hecha con el primer pago #}
                                {% else %}
                                    {{ booking.payStatus[0].payment }}% PAGADO 

                                    {# total pagaddo #}
                                    ({{ booking.payStatus[0].amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}} ) 
                                {% endif %}
                            {% endif %}                             

                            <strong>con 
                            {% if booking.payStatus.length == 1 %}
                                {% if booking.payStatus[0].paymentMethod == 'tpv' %}Tarjeta de Crédito{% endif %}
                                {% if booking.payStatus[0].paymentMethod == 'transfer' %}Transferencia{% endif %}
                            {% elseif booking.payStatus.length > 1 %}
                                {% if booking.payStatus[1].paymentMethod == 'tpv' %}Tarjeta de Crédito{% endif %}
                                {% if booking.payStatus[1].paymentMethod == 'transfer' %}Transferencia{% endif %}
                            {% endif %}
                            </strong></div>

                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>

{% if booking.payStatus[0].payment < 100 && booking.payStatus.length < 2%}
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
        <tbody class="mcnTextBlockOuter">
            <tr>
                <td valign="top" class="mcnTextBlockInner">
                    
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                        <tbody><tr>
                            
                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                              
                                <div style="text-align: center;"><strong><span style="color:#B22222">Tendrá que pagar el {{100 - booking.payStatus[0].payment }}% restante antes del {{booking.payStatus[0].nextPaymentDate|date('d/m/Y')}}</span></strong></div>
                            </td>
                        </tr>
                    </tbody></table>
                    
                </td>
            </tr>
        </tbody>
    </table>
{% endif %}

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 0px 18px 18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #999999;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">
            
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
                <tbody><tr>
                    
                    <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                    
                        <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
                            <tbody>
                                <tr>       
                                    {% if booking.traveler != null %}                        
                                        <td valign="top" class="mcnTextContent" >
                                            <h2 class="mc-toc-title">Cliente:</h2>
                                            <br>                                        
                                                Nombre: <strong>{{booking.traveler.firstname}}</strong><br>
                                                Apellido: <strong>{{booking.traveler.lastname}}</strong><br>
                                                Email: <strong>{{booking.traveler.email}}</strong><br>
                                                Teléfono: <strong>{{booking.traveler.phone}}</strong>
                                        </td>
                                    {% elseif booking.affiliate != null %}
                                        <td valign="top" class="mcnTextContent">
                                            <h2 class="mc-toc-title">Afiliado:</h2>
                                            <br>
                                              Afiliado: <strong>{{booking.affiliate.company.name}}</strong><br>
                                              Razon social: <strong>{{booking.affiliate.company.legalname}}</strong><br>
                                              Email: <strong>{{booking.affiliate.contact.email}}</strong><br>
                                              Teléfono: <strong>{{booking.affiliate.company.phone}}</strong>
                                        </td>
                                    {% endif %}
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody></table>
            
        </td>
    </tr>
</tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #DDDDDD;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <h2 class="null" style="line-height: 20.7999992370605px;">Acomodación:</h2>

{% for room in booking.roomDistribution %}

<h3 class="null" style="line-height: 20.7999992370605px;"><br>
Habitación {{loop.index}}: {{room.roomCode}}</h3>
<br style="line-height: 20.7999992370605px;">

    {% for pax in room.paxList %}
    <strong style="line-height:20.7999992370605px">Pax {{loop.index}} </strong>
    {% if loop.index == 1 %}<strong style="line-height:20.7999992370605px">-&nbsp; {# Book Holder #}</strong>{% endif %}<br style="line-height: 20.7999992370605px;">
    <span style="line-height:20.7999992370605px">Nombre:&nbsp;<strong>{{pax.name}}</strong><br>
    Apellido:&nbsp;<strong>{{pax.lastName}}&nbsp;</strong></span><br style="line-height: 20.7999992370605px;">
    <span style="line-height:20.7999992370605px">Fecha Nacimiento</span><span style="line-height:20.7999992370605px">:&nbsp;<strong>{{pax.birdthDate|date('d F, Y')}}&nbsp;</strong><br>
    Pasaporte / ID:&nbsp;<strong>[{{pax.documentType|upper}}] {{pax.documentNumber}}</strong></span><br style="line-height: 20.7999992370605px;">
    <span style="line-height:20.7999992370605px">País de nacionalidad</span><span style="line-height:20.7999992370605px">:&nbsp;</span><strong style="line-height:20.7999992370605px">{{pax.country.name}} ({{pax.country.countrycode}})</strong><br style="line-height: 20.7999992370605px;">
    <br style="line-height: 20.7999992370605px;">

    {% endfor %}

{% endfor %}


                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody>
</table>
{% if booking.flights %}
  {% include "../partials/tebooking-flights-user.html.swig" %}
{% endif %}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                <tbody><tr>
                    <td >
                        <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
                            <tbody><tr>
                                <td valign="top" class="mcnTextContent">
                                {% if booking.meetingdata.length > 0 %}
                                <div class="graybox" style="background-color:#eee; padding: 15px; border-top: 1px solid #ccc;">
                                    <h4>Detalles de transfer</h4>    
                                    <p style="white-space:pre-line;">{{booking.meetingdata}}</p>
                                </div>
                                {% endif %}
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody></table>
            
        </td>
    </tr>
</tbody>
</table>
<br />
