{% extends '../telayout.html.swig' %}

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
                        <h1>El operador {{booking.dmc.name}} no tiene disponibilidad</h1>
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
 <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            El usuario <strong>{{booking.traveler.firstname}} {{booking.traveler.lastname}} </strong>  solicitó : <br/> 
{% for room in booking.roomDistribution %}
    {% if room.roomCode =='single' %}una habitación individual<br/> {% endif %}
    {% if room.roomCode =='double' %}una habitación doble<br/> {% endif %}
    {% if room.roomCode =='triple' %}una habitación triple<br/> {% endif %}
{% endfor %}
<br/>Para el programa:  <strong><a href="http://openmarket.travel/viaje/{{product.slug}}?source=email">{{product.title_es}}</a></strong>, <br>
Pero el operador <strong>{{booking.dmc.name}}</strong> no tiene disponibilidad y ha cancelado la reserva.

                            <br/><br/>
                            <h3>Usuario</h3>
                            Usuario : <strong>{{booking.traveler.firstname}} {{booking.traveler.lastname}} </strong><br/>
                            Email: <strong>{{booking.traveler.email}}</strong><br />
                            Teléfono: <strong>{{booking.traveler.phone}}</strong><br />

                            <br/>
                            <h3>Operador</h3>
                            Nombre: <strong>{{booking.dmc.name}} </strong><br/>
                            Código: <strong>{{booking.dmc.code}} </strong><br/>
                            Contacto : <strong>{{booking.dmc.contact.firstname}} {{booking.dmc.contact.lastname}} </strong><br/>
                            Código: <strong>{{booking.dmc.contact.email}}</strong><br />
                            <br /><br />
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
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}                            
