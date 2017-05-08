{% extends '../user-layout.html.swig' %}
{% set answer = "fourth" %}

{% block body %}
                            <tr>
                                <td align="center" valign="top">
                                    <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
                                        <tr>
                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                        
                            &nbsp;
                            {% if answer == "first" %}
                            <h1>Primera respuesta a tu solicitud</h1>
                            {% elseif answer == "second" %}
                            <h1>Segunda respuesta a tu solicitud</h1>
                            {% elseif answer =="third" %}
                            <h1>Ya tienes tres respuestas!</h1>
                            {% else %}
                            <h1>Cuarta respuesta a tu solicitud.</h1>
                            {% endif %}
                            <br>
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
                                    <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                                        <tr>
                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            El operador local <a href="http://openmarket.travel/receptivo/{{dmc.code}}/{{dmc.name}}" target="_blank">{{dmc.name}}</a> ha contestado a tu solicitud de viaje <a href="#" target="_blank">"{{request.title}}"</a> &nbsp;<br><br>
                            {% if answer == "fourth" %}
                                Esta es la última respuesta. Recuerda que tu petición será válida hasta el {{quote.quoteValidDate}}.
                            {% endif %}
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>
<br>
<br>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;background-color: #309FD3;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">
                                <a class="mcnButton " title="VER RESPUESTA DEL OPERADOR LOCAL" href="#" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">VER RESPUESTA DE {{dmc.name|upper}}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

{% include "../partials/temessage-gracias.html.swig" %}
{% include "../partials/temessage-email-reply.html.swig" %}


</td>
                                        </tr>
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}
                            
