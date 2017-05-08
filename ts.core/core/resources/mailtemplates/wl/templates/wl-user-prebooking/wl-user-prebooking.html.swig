{% set isWhiteLabel = true %}
{% extends '../../../wl-layout.html.swig' %}
{% set acomodation = true %}
{% set paymentstatus = true %}

{% block body %}

{% set payed_percentage = 40 %}

{% if paymentmodel == 'tpv-100' || payments.length > 1 %}
  {% set payed_percentage = 100 %}
{% elseif paymentmodel == 'tpv-split' && payments.length == 1 %}
  {% set remember60 = true %}
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
                  <tbody>
                  <tr>
                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                      &nbsp;
                      <h1>Tu reserva  {{ idBooking }}</h1>
                      <em>Realizada: {{ createdOn |date('d/m/Y')}}</em>
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
              <td valign="top" class="mcnTextBlockInner bodyContainer">

                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                  <tbody>
                  <tr>
                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                      <p>Hemos recibido tu pago correctamente. Has reservado con el {{ payed_percentage }} % del valor de {{products[0].title_es}}&nbsp;</p>
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

        {% include "../../common/tebooking-user.html.swig" %}

        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
          <tbody class="mcnButtonBlockOuter">
          <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;background-color: #309FD3;">
                <tbody>
                <tr>
                  <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">
                    <a class="mcnButton " title="VER TU RESERVA" href='http://openmarket.travel/client-booking?idbooking={{ _id }}'target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">VER TU RESERVA</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>

        {% include "../../common/booking-contact-information.html.swig" %}

      </td>
    </tr>
  </table>
  <!-- // END BODY -->
</td>
</tr>
  {% endblock %}

