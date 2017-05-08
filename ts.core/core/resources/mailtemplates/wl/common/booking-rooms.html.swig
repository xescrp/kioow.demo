<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
  <tbody class="mcnBoxedTextBlockOuter">
  <tr>
    <td valign="top" class="mcnBoxedTextBlockInner">
      <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
        <tbody>
          <tr>
            <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
              <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #DDDDDD;">
                <tbody>
                  <tr>
                    <td valign="top" class="mcnTextContent">
                      <h2 class="null" style="line-height: 20.7999992370605px;">Acomodación:</h2>
                      {% for room in rooms %}
                        <h3 class="null" style="line-height: 20.7999992370605px;">
                          <br/>
                          Habitación {{loop.index}}: {{room.roomcode}}</h3>
                          <br style="line-height: 20.7999992370605px;"/>

                          {% for pax in paxes %}
                            <strong style="line-height:20.7999992370605px">Pax {{loop.index}} </strong>
                            {% if loop.index == 1 %}
                              <strong style="line-height:20.7999992370605px">-&nbsp; {# Book Holder #}</strong>
                            {% endif %}
                            <br style="line-height: 20.7999992370605px;"/>
                            <span style="line-height:20.7999992370605px">
                              Nombre:&nbsp;<strong>{{pax.name}}</strong>
                              <br/>
                              Apellido:&nbsp;<strong>{{pax.lastname}}&nbsp;</strong>
                            </span>
                            <br style="line-height: 20.7999992370605px;"/>
                            <span style="line-height:20.7999992370605px">Fecha Nacimiento</span>
                            <span style="line-height:20.7999992370605px">:&nbsp;<strong>{{pax.birdthdate|date('d F, Y')}}&nbsp;</strong>
                              <br/>
                              Pasaporte / ID:&nbsp;<strong>[{{pax.documenttype|upper}}] {{pax.documentnumber}}</strong>
                            </span>
                            <br style="line-height: 20.7999992370605px;"/>
                            <span style="line-height:20.7999992370605px">País de nacionalidad</span>
                            <span style="line-height:20.7999992370605px">:&nbsp;</span>
                            <strong style="line-height:20.7999992370605px">{{pax.country.label_es}} ({{pax.country.slug}})</strong>
                            <br style="line-height: 20.7999992370605px;"/>
                            <br style="line-height: 20.7999992370605px;"/>
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
