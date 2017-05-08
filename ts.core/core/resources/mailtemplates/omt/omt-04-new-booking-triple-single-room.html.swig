{% extends '../admin-layout.html.swig' %}
{% block body %}
<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            &nbsp;
                        <h1>Reserva bajo petición</h1>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table></td>
            </tr>
        </table>
        <!-- // END HEADER -->
    </td>
</tr>
<tr>
    <td align="center" valign="top">
        <!-- BEGIN BODY // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
            <tr>
            <td valign="top" class="bodyContainer">
 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            Usuario: <strong>{{booking.traveler.firstname}} {{booking.traveler.lastname}} </strong><br />
                            Email: <strong>{{booking.traveler.email}}</strong><br />
                            Teléfono: <strong>{{booking.traveler.phone}}</strong><br />
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            <h3>Ha enviado la siguiente solicitud:</h3>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                        
                            <h2>{{product.title_es}}</h2>

                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
    <tbody class="mcnCaptionBlockOuter">
        <tr>
            <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">
    <tbody><tr>
        <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
                <tbody><tr>
                    <td class="mcnCaptionRightImageContent" valign="top">
                    <img alt="Portada de {{product.title_es}}" src="{{mainImageProduct}}" width="264" style="max-width:760px;" class="mcnImage">                    
                    </td>
                    
                </tr>
            </tbody></table>
            <table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264">
                <tbody><tr>
                    <td valign="top" class="mcnTextContent">
                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-globe-normal.png" style="height: 14px; width: 14px;" width="14">
		                {% for country in countries %}
                            <strong>{{ country }}</strong> {% if !loop.last %}-{% endif %}
                        {% endfor %}
                        </div>
                        
                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{booking.start.day}} {{booking.start.monthname_en}} {{booking.start.year}} &nbsp;</div>
                        
                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14"><span>&nbsp;</span><span>{{product.itinerary.length }} día/s</span></div>

                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14">
            	        {% if tags.length > 0 %}                               
                            {% for tag in tags %}{{ tag }}{% if !loop.last %}, {% endif %}{% endfor %}
                        {% endif %}
                        </div>

                        {% set totalpax = 0 %}
                        {% for room in booking.roomDistribution %}
                            {% set totalpax += room.paxList.length %}
                        {% endfor %}

                        <div>
                            <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{totalpax}}<span>&nbsp;pasajero{% if totalpax > 1%}s{% endif %}, {{booking.roomDistribution.length}}
                            {% if booking.roomDistribution.length > 1 %} 
                            habitaciones
                            {% else %}
                            habitación
                            {% endif %}
                            ({% for room in booking.roomDistribution %}{% if !loop.first %} {% endif %}{{room.roomCode}}{% if !loop.last %} / {% endif %}{% endfor %})
                            </span>
                        </div>

                        <div>
                            <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-h-square.png" style="height: 14px; width: 14px;" width="14"><span>
                            {% if hotelcats.length > 0 %}                             
                                {% for hot in hotelcats %}
                                    {{ hot }}{% if !loop.last %}, {% endif %}
                                {% endfor %}
                            {% endif %}
                        </span><br>
                        &nbsp;</div>


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

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        <div>
                            {% if lang == '_es' %}
                            {{product.description_es}}
                            {% else %}
                            {{product.description_en}}
                            {% endif %}
                            &nbsp;<a href='{{ urlViaje }}' target="_blank">leer más</a>
                        </div>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>


<table border="0" cellpading="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #D1D1D1;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <h2 class="null" style="line-height: 20.7999992370605px;">Acomodación:</h2>
                                    &nbsp;
                                    {% for room in booking.roomDistribution %}

                                    <h3 class="null" style="line-height: 20.7999992370605px;">
                                    Habitación {{loop.index}} ({{room.paxList.length}} pasajero{% if room.paxList.length > 1 %}s{% endif %})</h3>
                                    <br style="line-height: 20.7999992370605px;">
                                        {% for pax in room.paxList %}
                                        <strong style="line-height:20.7999992370605px">Pasajero {{ loop.index }}

                                        {# {% if pax.holder == true %}
                                         - Titular de la Reserva
                                        {% endif %} #}
                                        </strong><br style="line-height: 20.7999992370605px;">
                                        <span style="line-height:20.7999992370605px">Nombre:&nbsp;<strong>{{ pax.name }}</strong><br>
                                        Apellido:&nbsp;<strong> {{pax.lastName}}&nbsp;</strong><br>
                                        Fecha de Nacimiento:&nbsp;<strong>{{ pax.birdthDate|date('d/m/Y') }}&nbsp;</strong><br>
                                        Documento:&nbsp;<strong>[{{pax.documentType|upper}}] {{pax.documentNumber}}</strong></span><br style="line-height: 20.7999992370605px;">
                                        <span style="line-height:20.7999992370605px">País de Nacionalidad:&nbsp;</span><strong style="line-height:20.7999992370605px">{{ pax.country.name_es }}</strong><br style="line-height: 20.7999992370605px;">
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
<br />
<br />


<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            <div style="text-align: center;">Precio estimado (*)</div>
<h2 class="null" style="text-align: center;"><span style="font-size:12px">PRECIO POR PERSONA:</span></h2>

{% set priceComplete = "true" %}
{% for room in booking.roomDistribution %}

    {% if room.roomCode =='single' %}
    	<h2 class="mc-toc-title" style="text-align: center;">
    		{% if room.pricePerPax.exchange.value == 0%}
              {% set priceComplete = "false" %}
    		  Individual : <strong>Precio a confirmar</strong>
    		{% else %}    		
    		  Individual : 1 x <strong>{{room.pricePerPax.exchange.value | numberFractions}} {{room.pricePerPax.exchange.currency.symbol}}
    		  </strong>
    		{% endif %}
    	<br>
    </h2>
    {% endif %}

    {% if room.roomCode  =='double'%}
    	<h2 class="mc-toc-title" style="text-align: center;">
    		{% if room.pricePerPax.exchange.value == 0%}
              {% set priceComplete = "false" %}
    		  Doble : <strong>Precio a confirmar</strong>
    		{% else %}
    		  Doble : 2 x <strong>{{room.pricePerPax.exchange.value | numberFractions}} {{room.pricePerPax.exchange.currency.symbol}}</strong>
    		{% endif %}
    	<br>
    	</h2>
    {% endif %}

    {% if room.roomCode  =='triple' %}
    	<h2 class="mc-toc-title" style="text-align: center;">

    		{% if room.pricePerPax.exchange.value == 0 %}
              {% set priceComplete = "false" %}
    		  Triple : <strong>Precio a confirmar</strong>
    		{% else %}
    		  Triple : 3 x <strong>{{room.pricePerPax.exchange.value | numberFractions}} {{room.pricePerPax.exchange.currency.symbol}}
    		  </strong>
    		{% endif %}
    	<br>
    	</h2>
    {% endif %}

{% endfor %}

&nbsp;
<h2 class="null" style="text-align: center;"><span style="font-size:12px"><strong>TOTAL:</strong></span></h2>
<h2 class="mc-toc-title" style="text-align: center;">

{% if priceComplete == "false"  %}
    <strong>Precio a confirmar</strong>
{% else %}
    <span style="line-height:1.6em">&nbsp;{{booking.amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}}</span>
{% endif %}
</h2>
<div>&nbsp;</div>
<div style="text-align: center;">(*) El precio es orientativo puede variar según la disponibilidad.</div>
<div>&nbsp;</div>
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
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody>
                    <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            <h3 class="mc-toc-title"><strong>El operador {{booking.dmc.company.name}} contactará contigo para confirmar la disponibilidad de tus habitaciones.</strong></h3>
                            <br>
                            <br>
                            {% if booking.meetingdata.length > 0 %}
                            <div class="graybox" style="background-color:#eee; padding: 15px; border-top: 1px solid #ccc;">
                                <h4>Transfer Data</h4>    
                                <p>{{booking.meetingdata}}</p>
                            </div>
                            {% endif %}
                            
                        </td>
                    </tr>
                	</tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<!-- BEGIN message // -->
{% include "../partials/temessage-confiar.html.swig" %}
<!-- // END message -->

</td>
                                        </tr>
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}                            
