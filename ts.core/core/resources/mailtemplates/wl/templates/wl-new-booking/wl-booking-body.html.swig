<table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
  <tr>
    <td valign="top" class="bodyContainer">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
        <tbody class="mcnTextBlockOuter">
        <tr>
          <td valign="top" class="mcnTextBlockInner">

            {% include "wl-booking-information.html.swig" %}

            {% include "../../common/email-hr.html.swig" %}

            {% include "../../common/booking-payment-details.html.swig" %}

            {% include "../../common/email-hr.html.swig" %}

            {% include "wl-booking-customer-information.html.swig" %}

            {% include "../../common/booking-rooms.html.swig" %}

            {% include "wl-booking-transfer-details.html.swig" %}

            {% if ca == null || ca == undefined || ca == ''%}
            {% set ca = {txt : 'VER RESERVA', url : 'http://openmarket.travel/dmc-booking?idbooking='+ booking.idBooking}; %}
            {% endif %}
            {% include "../../../partials/call-to-action.html.swig" %}

            <br/>
          </td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
</table>
