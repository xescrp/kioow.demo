{% extends '../yto-layout.html.swig' %}
{% set paymentstatus = false %}
{% set paybutton = false %}
{% set acomodation = false %}
{% set remember60 = false %}
{% set description = false %}
{% set checkbooking = false %}
{% set pagocompleto = false %}

{% block body %}
<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner">
                                
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                <tbody>
                                    <tr>  
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                            &nbsp;
                                            <h1>Tu Reserva {{booking.idBooking}}</h1>
                                            <p><strong>Expediente {{affiliate.company.name}}:</strong> {{booking.idBookingExt}}</p>
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
                                        <tbody>
                                        <tr> 
                                            <td valign="top" class="mcnTextContent" style="padding-top:0px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

                                            <!-- un pago 100% -->
                                            {% if booking.payStatus[0].payment == 100%}
                                                {% set pagocompleto = true %}
                                                <p>
                                                Hemos recibido correctamente el pago correspondiente al {{booking.payStatus[0].payment | removeDecimal }}% del total ({{booking.amount.exchange.value | removeDecimal }}{{booking.amount.exchange.currency.symbol}})
                                                <br>
                                                </p>
                                                <p>
                                                Ya puedes entregar el bono de servicios y el Contrato de Viajes Combinados.
                                                </p>
                                            <!-- dos pagos -->
                                            {% else %}
                                            
                                                {% if !booking.payStatus[1].receiptNumber%}
                                                <!-- primer pago 15% recibido 85% pendiente -->
                                                    <p>
                                                    Hemos recibido correctamente el pago correspondiente al  {{booking.payStatus[0].payment | removeDecimal }}% del total ({{booking.payStatus[0].amount.exchange.value | removeDecimal }}{{booking.amount.exchange.currency.symbol}})
                                                    Recuerda que el {{100 - booking.payStatus[0].payment | removeDecimal }}% restante ({{ (booking.amount.exchange.value - booking.payStatus[0].amount.exchange.value) | removeDecimal }}{{booking.amount.exchange.currency.symbol}}) deberá ser abonado antes del  {{booking.payStatus[0].nextPaymentDate | date('d-m-Y')}}
                                                    </p>
                                                {% else %}
                                                <!-- 85% recibido -->
                                                    {% set pagocompleto = true %}
                                                    <p>
                                                    Hemos recibido correctamente el pago correspondiente al  {{booking.payStatus[1].payment | removeDecimal}}% del total ({{booking.payStatus[1].amount.exchange.value | removeDecimal }}{{booking.amount.exchange.currency.symbol}})<br>
                                                    La reserva está pagada al 100%.
                                                    </p>
                                                {% endif %}
                                            {% endif %}
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
                        {% if pagocompleto %}
                            {% set ca = {txt : 'DESCARGAR BONOS', url : url+'#tabdetails' } %}
                            {% include "partials/gu-call-to-action.html.swig" %}
                            {% set ca = {txt : 'DESCARGAR CONTRATO', url : url+'#tabdetails' } %}
                            {% include "partials/gu-call-to-action.html.swig" %}
                        {% else %}
                            {% set ca = {txt : 'IR A ADMINISTRACIÓN', url : url+'#tabadmin' } %}
                            {% include "partials/gu-call-to-action.html.swig" %}
                        {% endif %}

                        <!-- BEGIN booking // -->
                        {% include "../partials/booking.es.html.swig" %}
                        <!-- // END booking -->


                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                            <tbody class="mcnTextBlockOuter">
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                        <p>Cliente: <strong>{{booking.roomDistribution[0].paxList[0].lastName}} {{booking.roomDistribution[0].paxList[0].name}}</strong></p>
                                    </td>
                                </tr>
                            </tbody>
                            </table>


                <!-- BEGIN Call to action
                http://www.yourttoo.com/
                 -->
                {% set ca = {txt : 'IR A LA RESERVA', url : url} %}

                {% include "partials/gu-call-to-action.html.swig" %}

                <!-- END Call to action -->
                

                <!-- BEGIN message // -->
                {% include "../partials/thanks-message.es.html.swig" %}
                {% include "partials/email-no-reply.es.html.swig" %}
                <!-- // END message -->

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
