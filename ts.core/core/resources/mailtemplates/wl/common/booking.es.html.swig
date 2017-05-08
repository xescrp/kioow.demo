<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
  <tbody class="mcnTextBlockOuter">
  <tr>
    <td valign="top" class="mcnTextBlockInner">
      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
        <tbody>
        <tr>
          <td valign="top" class="mcnTextContent" style="padding: 9px 18px;">

            <h2><strong>
              {{products[0].title_es}} 
              {% if products[0].categoryname.label_es %}({{ products[0].categoryname.label_es }}) {% endif %}</strong></h2>

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
      <tbody>
      <tr>
        <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
            <tbody>
            <tr>
              <td class="mcnCaptionRightImageContent" valign="top">
                <img alt="Portada de {{products[0].title_es}}" src="{{products[0].productimage.url}}" width="264" style="max-width:760px;" class="mcnImage">
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



          {% if description %}
          <div>
            {% if lang == '_es' %}
            {{products[0].description_es}}
            {% else %}
            {{products[0].description_en}}
            {% endif %}
            &nbsp;
          </div>
          {% endif %}

        </td>
      </tr>
      </tbody>
    </table>
  </td>
</tr>
</tbody>
</table>

  {% include "email-hr.html.swig" %}

  {% include "booking-payment-details.html.swig" %}

  {% include "email-hr.html.swig" %}

  {% if rooms != null %}
<table border="0" cellpading="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
<tbody class="mcnBoxedTextBlockOuter">
<tr>
  <td valign="top" class="mcnBoxedTextBlockInner">
    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
      <tbody>
      <tr>
        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
          <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #D1D1D1;">
            <tbody>
            <tr>
              <td valign="top" class="mcnTextContent">
                <h2 class="null" style="line-height: 20.7999992370605px;">Acomodación:</h2>
                &nbsp;
                {% for room in rooms %}
                <h3 class="null" style="line-height: 20.7999992370605px;">
                  Habitación {{loop.index}} ({{room.paxlist.length}} pasajero{% if room.paxlist.length > 1 %}s{% endif %})
                </h3>
                <br style="line-height: 20.7999992370605px;"/>
                {% for paxr in room.paxlist %}
                <strong style="line-height:20.7999992370605px">
                  Pasajero {{ loop.index }}
                  {% for pax in paxes %}
                  {% if pax.slug == paxr %}

                  {% if pax.holder == true %}
                  - Titular de la Reserva
                  {% endif %}

                  <br style="line-height: 20.7999992370605px;" />
                  <span style="line-height:20.7999992370605px">
                    Nombre:&nbsp;<strong>{{ pax.name }}</strong>
                    <br />
                    Apellido:&nbsp;<strong> {{pax.lastname}}&nbsp;</strong><br/>
                    Fecha de Nacimiento:&nbsp;<strong>{{ pax.birdthdate|date('d/m/Y') }}&nbsp;</strong><br/>
                    Documento:&nbsp;<strong>[{{pax.documenttype|upper}}] {{pax.documentnumber}}</strong>
                  </span>
                  <br style="line-height: 20.7999992370605px;"/>
                  <span style="line-height:20.7999992370605px">País de Nacionalidad:&nbsp;</span>
                  <strong style="line-height:20.7999992370605px">{{ pax.country.label_es }}</strong>
                  {% if loop.index < room.paxlist.length %}
                <br style="line-height: 20.7999992370605px;"/>
                  <br style="line-height: 20.7999992370605px;"/>
                  {% endif %}


                  {% endif %}
                  {% endfor %}
                  
                </strong>
                
                {% endfor %}
                {% endfor %}
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
</tbody>
</table>
<br />
  {% endif %}
