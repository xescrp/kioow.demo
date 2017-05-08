{% extends '../user-layout.html.swig' %}
{% set acomodation = true %}
{% set paymentstatus = true %}

{% block body %}

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
                                            
                                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                            
                                                &nbsp;
                    <h1>Tu reserva  {{ booking.idBooking }}</h1>
                    <em>Realizada: {{ booking.createdOn |date('d/m/Y - G:i',-120,'(GMT+2)')}}</em>
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
                                    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                <h2>Hemos recibido tu pago correctamente. Has reservado con el {{booking.payStatus[0].payment}}% del valor de {{product.title_es}}&nbsp;</h2>

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

                    {% include "../partials/tebooking-user.html.swig" %}
                    
                    {# descripcion de vuelos #}
                    {% if booking.flights %}
                      {% include "../partials/tebooking-flights-user.html.swig" %}
                    {% endif %}


                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
                        <tbody class="mcnButtonBlockOuter">
                            <tr>
                                <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;background-color: #309FD3;">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">
                                                    <a class="mcnButton " title="VER TU RESERVA" href='http://openmarket.travel/client-booking?idbooking={{ booking.idBooking }}'target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">VER TU RESERVA</a>
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
                           
