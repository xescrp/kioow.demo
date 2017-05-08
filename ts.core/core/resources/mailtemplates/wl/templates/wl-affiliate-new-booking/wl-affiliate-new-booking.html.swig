{% extends '../../../wl-layout.html.swig' %}
{% set paybutton = false %}
{% set acomodation = false %}
{% set remember60 = false %}
{% set description = false %}
{% set checkbooking = false %}

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
                                    <tbody>
                                    <tr>
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                            &nbsp;
                                            {% if paymentmodel === 'tpv-split' && payments.length === 1 %}
                                                <h1>Hemos recordado a tus clientes el resto de pago de tu reserva</h1>
                                            {% else %}
                                               <h1>Reserva confirmada Marca Blanca {{idBooking}}</h1>
                                            {% endif %}
                                            <p><strong>Expediente {{affiliate.company.name}}:</strong> {{idBookingExt}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" class="mcnTextBlockInner">
                                            {% include "../../common/booking.es.html.swig" %}
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
                     <!-- botones -->
                    <tr>
                        <td>
                            <p>
                               {% set ca = {txt : 'IR A LA RESERVA', url : url+'#tabdetails' } %}
                                {% include "../../../partials/gu-call-to-action.html.swig" %}
                                {% set ca = {txt : 'DESCARGAR RESUMEN', url : url+'#tabdetails' } %}
                                {% include "../../../partials/gu-call-to-action.html.swig" %}
                            </p>
                        </td>
                    </tr>
                    <!-- dudas
                    <tr>
                        <td>
                          {% include "../../../yto/partials/questions.es.html.swig" %}
                        </td>
                    </tr> -->

                    <!-- factura y administracion -->
                    <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            {% include "../../../yto/partials/email-no-reply.es.html.swig" %}
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
