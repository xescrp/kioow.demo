{% extends '../user-layout.html.swig' %}

{% set paymentstatus = false %}
{% set acomodation = true %}
{% set paybutton = false %}


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
            </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner">
                                
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                    <tbody>
                                    <tr>
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

                                        Hola <strong>{{booking.traveler.firstname}} {{booking.traveler.lastname}}</strong>, hemos recibido tu solicitud.<br>&nbsp;
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

                    {% include "../partials/tebooking-user.html.swig" %} 



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">                            
<h2 class="null" style="text-align: center;"><span style="font-size:12px">PRECIO ESTIMADO POR PERSONA:</span></h2>

{% set priceComplete = "true" %}
{% for room in booking.roomDistribution %}

    {% if room.roomCode =='single' %}
        <h2 class="mc-toc-title" style="text-align: center;">
            {% if room.pricePerPax.exchange.value == 0%}
            {% set priceComplete = "false" %}
            Individual : <strong>Precio a confirmar</strong>
            {% else %}
            Individual : 1 x <strong>{{room.pricePerPax.exchange.value | numberFractions}} {{room.pricePerPax.exchange.currency.symbol}}
             (*)</strong>
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
             (*)</strong>
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
    <span style="line-height:1.6em">&nbsp;{{booking.amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}} (*)</span>
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
</table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
            <br /><br />
            <h3 style="text-align:center;">Te enviaremos un correo a esta dirección cuando el operador {{booking.dmc.company.name}} confirme la disponibilidad de las habitaciones.</h3>




            <br>
            <br>
                {# <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 5px;background-color: #309FD3;">
                    <tbody>
                        <tr>

                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">

                                <a class="mcnButton " title="VER FICHA COMPLETA" href='{{ urlViaje }}' target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">VER FICHA COMPLETA</a>
                            </td>
                        </tr>
                    </tbody>
                </table> #}
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #D9D9D9;">
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
<!-- BEGIN advice // -->
{% include "../partials/temessage-advice.html.swig" %}
<!-- // END advice -->  
<!-- BEGIN message // -->
{% include "../partials/temessage-confiar.html.swig" %}
{% include "../partials/temessage-email-reply.html.swig" %}
<!-- // END message -->      
</td>
                                        </tr>
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}
                            