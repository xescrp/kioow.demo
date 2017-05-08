{% set isWhiteLabel = true %}

{% extends '../../../wl-layout.html.swig' %}
{% set paymentstatus = true %}
{% set acomodation = true %}

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
                                <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                        &nbsp;
                                     <br />
                                        <h1>Comprobante de pago Reserva {{ idBooking }}</h1>
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

                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

                                    <em>Realizada: {{ createdOn |date('d/m/Y - G:i',-120,'(GMT+2)')}}</em>


                                     {% if (paymentmodel == 'tpv-100' || paymentmodel == 'tpv-split') && payments != null && payments.length > 0 %}
                                     <br />
                                     <br />
                                     <strong>
                                       <h1>Hemos recibido correctamente tu pago de</h1>

                                       {{ payments[0].amount | }}
                                       {{ pricing.currency.symbol}}
                                     </strong>
                                     {% endif %}
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
                    {% include "../../common/tebooking-user.html.swig" %}
                    <br />
                    <br />
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
                        <tbody class="mcnButtonBlockOuter">
                            <tr>
                                <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 5px;background-color: #E6E6E6;">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">
                                                    <a class="mcnButton " title="VER TU RESERVA" href="http://openmarket.travel/client-booking?idbooking={{ idBooking }}" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #666666;">VER TU RESERVA</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                                    <a class="mcnButton " title="DESCARGAR BONOS" href="{{ urlbono }}" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">DESCARGAR BONOS</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                  <!-- BEGIN advice // -->
                  {% include "../../../partials/temessage-advice.html.swig" %}
                  <!-- // END advice -->
                  <!-- BEGIN message // -->
                  {% include "../../common/booking-contact-information.html.swig" %}
                  {% include "../../../partials/temessage-gracias.html.swig" %}
                  <!-- // END message -->
            </td>
        </tr>
    </table>
    <!-- // END BODY -->
    </td>
</tr>
{% endblock %}




