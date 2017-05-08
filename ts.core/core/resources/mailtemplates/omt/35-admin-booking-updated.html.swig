{% extends '../admin-layout.html.swig' %}

{% set paymentstatus = false %}
{% set paybutton = false %}
{% set acomodation = false %}
{% set remember60 = false %}
{% set description = false %}
{% set checkbooking = false %}
{% set flights = false %}


{% block body %}

{% if product %}
    {% if product.included.transportbetweencities %}
        {% if product.included.transportbetweencities.domesticflight %}
            {% set flights = true %}
        {% endif %}
    {% endif %}
{% endif %}

<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                                &nbsp;
                                                <h1>Reserva {{booking.idBooking}} MODIFICADA</h1>
                                                {% include "../partials/te-agency.es.html.swig" %}
                                            </td>
                                        </tr>

                                    </tbody></table>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
        <!-- // END HEADER -->
    </td>
</tr>
<tr>
    <td align="center" valign="top">
        <!-- BEGIN BODY // -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
            <tr>
                <td valign="top" class="bodyContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody>
                                            <tr>
                                                <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                {% if modification.type == 'paxs'%}
                                                  <h3 style="text-align:center">SE HAN CAMBIADO LOS DATOS DE LOS PASAJEROS</h3>
                                                {% elseif modification.type == 'trans'%}
                                                  <h3 style="text-align:center">SE HAN CAMBIADO LOS DATOS DE TRASLADOS</h3>
                                                {% else %}
                                                   <strong>{{modification.text}}</strong>
                                                {% endif %}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner">

                                                    <!-- ******************************************************************
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                                                        <tbody class="mcnTextBlockOuter">
                                                            <tr>
                                                                <td valign="top" class="mcnTextBlockInner">
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td valign="top" class="mcnTextContent" style="padding: 9px 18px;">

                                                    <h2><strong>{{product.title_es}} {% if product.categoryname.label_es %}({{ product.categoryname.label_es }}) {% endif %}<strong></h2>

                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
    <tbody class="mcnCaptionBlockOuter">
        <tr>
            <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">
                    <tbody>
                        <tr>
                            <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
                                    <tbody>
                                        <tr>
                                            <td class="mcnCaptionRightImageContent" valign="top">
                                                <img alt="Portada de {{product.title_es}}" src="{{mainImageProduct}}" width="264" style="max-width:760px;" class="mcnImage">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264">
                                    <tbody>
                                        <tr>
                                            <td valign="top" class="mcnTextContent">

<div>
    <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;
    <span>
        {{booking.start.day}} {{booking.start.monthname_es}} {{booking.start.year}}
    </span>
</div>

<div>
    <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{product.itinerary.length }} días</span>
</div>

{% if tags.length > 0 %}
    <div>
        <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14">
        <span>
            {% for tag in tags %}{{ tag }}{% if !loop.last %}, {% endif %}{% endfor %}
        </span>
    </div>
{% endif %}

{% set totalpax = 0 %}
{% for room in booking.roomDistribution %}
    {% set totalpax += room.paxList.length %}
{% endfor %}

<div>
    <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{totalpax}}
    <span>
        &nbsp;
        pasajero{% if totalpax > 1%}s{% endif %}, {{booking.roomDistribution.length}}
        {% if booking.roomDistribution.length > 1 %} 
            habitaciones
        {% else %}
            habitación
        {% endif %}
        {% for room in booking.roomDistribution %}
            {% if !loop.first %}{% endif %}
            {% if room.roomCode == "single" %}(individual)
            {% elseif room.roomCode == "double" %}(doble)
            {% else %}(triple){% endif %}
            {% if !loop.last %} / {% endif %}
        {% endfor %}
    </span>
</div>

<div>
    <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-h-square.png" style="height: 14px; width: 14px;" width="14">
    <span>
        {% if hotelcats.length > 0 %}
            {% for hot in hotelcats %}
                {{ hot }}{% if !loop.last %}, {% endif %}
            {% endfor %}
        {% endif %}
    </span>
    <br>
    &nbsp;
</div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>



table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
    <tbody class="mcnCaptionBlockOuter">
        <tr>
        <td>
            Datos antiguos:
        </td>
        <td>
            {{oldPax}}
        </td>
        </tr>

        <tr>
        <td>
            Datos nuevos:
        </td>
        <td>
             {{newPax}}
        </td>
        </tr>

        </tbody>
        </table-->




                                                <!-- ******************************************************************-->
                                                {# {% include "partials/divider.html.swig" %} #}
                                                <br>
                                                {% include "../partials/booking.es.html.swig" %}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
{% if flights %}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                    <tbody><tr>                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FFF2F2;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-warning.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span style="color:#a94442"> ATENCIÓN:<br>
                                                ESTE PROGRAMA TIENE VUELOS DOMÉSTICOS
  
                                        <!-- todo vuelos 
                                        RESERVA CON VUELOS 
                                        RESERVA CON VUELOS INTERNACIONALES DEL DMC
                                        -->
                                        </div>
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
{% endif %}


                                <br />
                                    {% if ca == null || ca == undefined || ca == ''%}
                                    {% set ca = {txt : 'IR A LA RESERVA', url : url }; %}
                                    {% endif %}
                                    {% include "../partials/call-to-action.html.swig" %}
                                    <!-- END Call to action -->
          
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}
