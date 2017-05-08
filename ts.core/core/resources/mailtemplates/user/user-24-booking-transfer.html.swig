{% extends '../user-layout.html.swig' %}
{% set paymentstatus = true %}
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
                            {% if query!=null && query.code!=null %}                           
                                <h1>Debes realizar el pago de tu reserva para La petición a medida  {{query.code}}</h1>
                            {% else %}
                                <h1>Debes realizar el pago de tu reserva</h1>
                            {% endif %}
                            
                            <br />
                            <h3 class="null" style="line-height: 20.7999992370605px;">LOCALIZADOR DE LA RESERVA: 
                            {# Enlace de ir a la reserva comentado
                            <a href='http://openmarket.travel/dmc-booking?idbooking={{ booking.idBooking }}'>{{ booking.idBooking }} #}
                            {{ booking.idBooking }}
                            </a></h3>
                            <span>Realizada: {{ booking.createdOn |date('d/m/Y - G:i',-120,'(GMT+2)')}}</span>
                            
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
                        Hola {{booking.traveler.firstname}}&nbsp;{{booking.traveler.lastname}},<br><br>
                                
                            Recuerda que tu reserva no estará en firme hasta que no ingreses el pago. <br />Tienes que efectuar el ingreso de <strong>

                            {# es primer pago del 100% #}
                            {% if booking.payStatus[0].payment == 100%}                          
                                {{booking.amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}}
                            
                            {# se ha hecho un pago solo del 40% #}
                            {% elseif booking.payStatus.length == 1 %}                                      
                                {{booking.payStatus[0].payment * booking.amount.exchange.value / 100}} {{booking.amount.exchange.currency.symbol}}
                                
                            {# se ha pagado el 100% en dos pagos#}
                            {% else %}                                
                                {{booking.amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}}
                            
                            {% endif %}

                           </strong> en la siguiente cuenta, indicando el número de localizador <strong>{{booking.idBooking}}</strong> en el concepto. De no indicarlo, nos resultará imposible identificar tu pago.


                            <br/><br/>
                            <div style="background-color: #f1f1f1; padding: 20px;">
                                Banco : <strong>Banco Sabadell</strong> <br>
                                IBAN : <strong>ES89 0081 0652 2300 0184 3992</strong><br>
                                BIC :  <strong>BSABESBB</strong><br>
                                Titular : <strong>Open Market Travel SL.</strong><br />
                                CIF : <strong>B57860017</strong>
                            </div>
                            <br/>
                            De no recibir el pago en las próximas 72hs hábiles daremos por cancelada la reserva.
                            <br/>
                            Cuando confirmemos tu transferencia te notificaremos por correo electrónico a <em>{{booking.traveler.email}}</em>
                            <br/>
                            <br/>
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



                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
            <br>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 5px;background-color: #309FD3;">
                    <tbody>
                        <tr>

                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">

                                <a class="mcnButton " title="VER RESERVA" href='{{ urlBooking }}' target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">VER RESERVA</a>
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
                            