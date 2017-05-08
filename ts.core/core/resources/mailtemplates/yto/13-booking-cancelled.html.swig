{% extends '../yto-layout.html.swig' %}
{% set acomodation = true %}

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
                                        <h1>Reserva {{booking.idBooking}} cancelada</h1>
                                        <p>
                                        Expediente {{booking.affiliate.company.name}}: <strong>{{booking.idBookingExt}}</strong><br><br>La reserva ha sido correctamente cancelada.<br>Por favor, verifica los posibles gastos.
                                        </p>
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
                    <!-- BEGIN Call to action
                    http://www.yourttoo.com/affiliate/booking-detail?idBooking={{ booking.idBooking}}
                     -->
                    {% if ca == null || ca == undefined || ca == ''%}
                    {% set ca = {txt : 'IR A ADMINISTRACIÓN', url : url+'#tabadmin'}; %}
                    {% endif %}
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
