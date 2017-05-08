{% extends '../user-layout.html.swig' %}

{% set paymentstatus = false %}
{% set acomodation = true %}
{% set paybutton = true %}
{% set description = true %}



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
<h1>Tu reserva ha sido confirmada</h1>
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

                        Hola {{booking.traveler.firstname}},<br><strong>{{booking.dmc.name | title}}</strong> ha confirmado tu reserva bajo petición.<br>&nbsp; 
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
<h2 class="null" style="text-align: center;"><span style="font-size:12px">PRECIO POR PERSONA:</span></h2>

 {% for room in booking.roomDistribution %}

    {% if room.roomCode =='single' %}
        <h2 class="mc-toc-title" style="text-align: center;">
            {% if booking.amount.exchange.value == 0%}
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
            {% if booking.amount.exchange.value == 0%}
            Doble : <strong>Precio a confirmar</strong>
            {% else %}
            Doble : 2 x <strong>{{room.pricePerPax.exchange.value | numberFractions}} {{room.pricePerPax.exchange.currency.symbol}}</strong>
            {% endif %}
        <br>
        </h2>
    {% endif %}

    {% if room.roomCode  =='triple' %}
        <h2 class="mc-toc-title" style="text-align: center;">

            {% if booking.amount.exchange.value == 0 %}
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
 {% if booking.amount.exchange.value == 0%}
<strong>Precio a confirmar</strong>
{% else %}
<span style="line-height:1.6em">&nbsp;{{booking.amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}}</span>
{% endif %}
</h2>
<br /><br />
            <br>
            <br>
<h4 style="text-align:center; font-weight: bold; color: #E04E3C!important;">Tienes 48 horas para efectuar el pago</h4>
<br>
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
            
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 5px;background-color: #309FD3;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">

                                <a class="mcnButton " title="PAGAR AHORA" href='http://openmarket.travel/client-booking?idbooking={{ booking.idBooking }}' target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">PAGAR AHORA</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                            