
{% if payments != null && payments.length > 0 %}

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
  <tbody class="mcnBoxedTextBlockOuter">
  <tr>
    <td valign="top" class="mcnBoxedTextBlockInner">
      {# un pago valido o varios pero del total de la reserva#}
      {% if paymentmodel == 'tpv-100' %}

      <table  border="0" cellpadding="0" cellspacing="0" width="100%" align="center" class="mcnBoxedTextContentContainer">
        <tbody>
        <tr>
          <td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:0;">
            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
              <tbody>
              <tr>
                <td valign="top" class="mcnTextContent" style="text-align: center;">
                  <h4 style="text-align: center;">
                    <span style="font-family:arial,helvetica neue,helvetica,sans-serif">TOTAL</span>
                  </h4>&nbsp;
                  <h2 style="text-align: center;" >
                    <span style="font-family:arial,helvetica neue,helvetica,sans-serif">
                      <strong>{{pricing.amount | numberFractions}} {{pricing.currency.symbol}}</strong>
                    </span>
                  </h2>
                  <p style="text-align: center;">(100% del total)</p>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      {# ha seleccionado un pago del 40% #}
      {% else  %}
      <table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnBoxedTextContentContainer">
        <tbody><tr>
          <td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:0;">
            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
              <tbody><tr>
                <td valign="top" class="mcnTextContent" style="text-align: center;">
                  <h4 style="text-align: center;">
                    <span style="font-family:arial,helvetica neue,helvetica,sans-serif">PRIMER PAGO</span>
                  </h4>&nbsp;
                  <h2 style="text-align: center;" >
                    <span style="font-family:arial,helvetica neue,helvetica,sans-serif">
                      <strong>{{ payments[0].amount | numberFractions }} {{ pricing.currency.symbol }}</strong>
                    </span>
                  </h2>
                  <p style="text-align: center;">(40% del total)</p>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>


      <table align="right" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnBoxedTextContentContainer">
        <tbody>
        <tr>
          <td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:0;">
            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
              <tbody>
              <tr>
                <td valign="top" class="mcnTextContent" style="text-align: center;">

                  {% if remember60 %}
                    <h4 style="text-align: center; color:#a94442!important;"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">A PAGAR</span></h4>
                  {% else %}
                    <h4 style="text-align: center; color:#a94442!important;"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">SEGUNDO PAGO</span></h4>
                  {% endif %}
                  &nbsp;

                  <h2 style="text-align: center;">
                    <span style="font-family:arial,helvetica neue,helvetica,sans-serif">
                      <span style="color:#a94442">
                        <strong>
                          {{ payments[1].amount | numberFractions }} {{ pricing.currency.symbol }}
                        </strong>
                        </span>
                    </span>
                  </h2>

                  {% if remember60 %}
                  <p style="text-align: center;">(60% del total)</p>
                  {% endif %}

                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      {% endif %}
    </td>
  </tr>
  </tbody>
</table>
  {% if paybutton %}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
<tbody class="mcnBoxedTextBlockOuter">
<tr>
  <td valign="top" class="mcnBoxedTextBlockInner">

    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
      <tbody><tr>

        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">

          <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
            <tbody><tr>
              <td valign="top" class="mcnTextContent">
                <h2 class="mc-toc-title" style="text-align: center;">
                  <span style="font-family:arial,helvetica neue,helvetica,sans-serif">TOTAL:&nbsp;</span>
                  <strong>{{pricing.amount *1 | numberFractions}}&nbsp;{{pricing.currency.symbol}}</strong>
                </h2>
              </td>
            </tr>
            </tbody></table>
        </td>
      </tr>
      </tbody></table>

  </td>
</tr>
</tbody>
</table>

  <!-- BEGIN Call to action -->
  {% if ca == null || ca == undefined || ca == ''%}
  {% set ca = {txt : 'PAGAR AHORA', url : urlRestoPago }; %}
  {% endif %}
  {% include "../../partials/gu-call-to-action.html.swig" %}
  <!-- END Call to action -->
  {% endif %} {# show paybutton #}

  {% endif %} {# show paymentstatus #}


<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
<tbody class="mcnTextBlockOuter">
<tr>
  <td valign="top" class="mcnTextBlockInner">

    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
      <tbody>
      <tr>
        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

          <h3 class="null">TU VIAJE</h3>

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

          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
            <tbody>
            <tr>
              <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px; border: 1px solid #ccc;">
                <p>Revisa con atención el resumen de tu reserva y en caso de detectar cualquier dato incorrecto, ponte en contacto con nosotros lo antes posible escribiendo un email a <a href="mailto:{{ affiliate.contact.email }}" target="_blank">{{ affiliate.contact.email }}</a> e intentaremos solucionarlo lo antes posible en la medida de nuestras posibilidades.</p>
              </td>
            </tr>
            </tbody>
          </table>

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
    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
      <tbody>
      <tr>
        <td valign="top" class="mcnTextContent" style="padding: 9px 18px;">
          <h2><strong>{{products[0].title_es}} {% if products[0].categoryname.label_es %}({{ products[0].categoryname.label_es }}) {% endif %}<strong></h2>
        </td>
      </tr>
      </tbody>
    </table>

  </td>
</tr>
</tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
<tbody class="mcnCaptionBlockOuter">
<tr>
  <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">




    <table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">
      <tbody><tr>
        <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
            <tbody>
            <tr>
              <td class="mcnCaptionRightImageContent" valign="top">
                <img alt="Portada de {{products[0].title_es}}" src="{{ products[0].productimage.url }}" width="264" style="max-width:760px;" class="mcnImage">
              </td>
            </tr>
            </tbody>
          </table>
          <table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264">
            <tbody><tr>
              <td valign="top" class="mcnTextContent">

                {# <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-globe-normal.png" style="height: 14px; width: 14px;" width="14">
                                <span>
                                {% for country in countries %}
                                    <strong>{{ country }}</strong>{% if !loop.last %} -{% endif %}
                                {% endfor %}
                                </span>
              </div> #}

                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{dates.start.day}} {{dates.start.monthname_es}} {{dates.start.year}} </span></div>

                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{products[0].itinerary.length }} días</span></div>
                {% if tags.length > 0 %}
                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14"><span>

                                        {% for tag in tags %}{{ tag }}{% if !loop.last %}, {% endif %}{% endfor %}

                                </span>
                </div>
                {% endif %}
                {% set totalpax = 0 %}
                {% for room in booking.roomDistribution %}
                {% set totalpax += room.paxlist.length %}
                {% endfor %}

                <div>
                  <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{paxes.length}}<span>&nbsp;pasajero{% if totalpax > 1%}s{% endif %}, {{booking.roomDistribution.length}}
                                {% if rooms.length > 1 %}
                                habitaciones
                                {% else %}
                                habitación
                                {% endif %}
                                {% for room in rooms %}{% if !loop.first %} {% endif %}
                                    {% if room.roomCode == "single" %}(individual)
                                    {% elseif room.roomCode == "double" %}(doble)
                                    {% else %}(triple){% endif %}
                                {% if !loop.last %} / {% endif %}{% endfor %}
                                </span>
                </div>

                <div>
                  <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-h-square.png" style="height: 14px; width: 14px;" width="14"><span>
                                {% if hotelcats.length > 0 %}
                                    {% for hot in hotelcats %}
                                        {{ hot }}{% if !loop.last %}, {% endif %}
                                    {% endfor %}
                                {% endif %}
                            </span><br>
                  &nbsp;</div>
              </td>
            </tr>
            </tbody></table>
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
    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
      <tbody>
      <tr>
        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
          <div>
            {% if paymentmodel == 'tpv-split' || payments.length == 0 %}
              {{ products[0].description_es }}
            {% endif %}
            &nbsp;
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </td>
</tr>
</tbody>
</table>

  {% if acomodation %}
  {% include "booking-rooms.html.swig"%}
  {% endif %}
