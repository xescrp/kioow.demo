{% extends '../user-layout.html.swig' %}

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
                        
                            <h1 class="null"><br>Gracias por tu mensaje {{name}}</h1>

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
                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        <strong>Hemos recibido:</strong>
						<br>
						<br>
                        <strong>Tipo de mensaje: </strong>
                        <br>
                        <span>{{type}}</span>
                        <br>
                        <br>
                    	<strong>Cuerpo del mensaje: </strong>
						<br>                        
						<span>{{ msg }}</span>
						<br>
						<br>
						<strong>Teléfono: </strong> {{phone}}
                        <br /><br />
                        </td>
                    </tr>
                </tbody></table>
                
                <!-- BEGIN message // -->
                    {% include "../partials/temessage-equipo.html.swig" %}
                    {% include "../partials/temessage-email-reply.html.swig" %}
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
                            
