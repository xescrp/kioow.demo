﻿{% extends '../user-layout.html.swig' %}

{% block body %}

<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner">
                            
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                    
                                        <h1 class="null"><br>
            Contraseña Olvidada</h1>

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
                        
                            <span>Hola {{traveler}},</span><br>
<br>
Parece que has olvidado tu contraseña. No pasa nada, solo tienes que hacer click en el botón de abajo para crear una nueva contraseña. <br> Una vez confirmada, podrás acceder de nuevo a tu cuenta de <strong>openmarket.travel</strong><br>
&nbsp;
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;background-color: #309FD3;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">
                                <a class="mcnButton " title="CREA UNA NUEVA CONTRASEÑA" href="{{ link }}" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">CREA UNA NUEVA CONTRASEÑA</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<!-- BEGIN message // -->
{% include "../partials/temessage-gracias.html.swig" %}
{% include "../partials/temessage-email-reply.html.swig" %}
<!-- // END message -->

</td>
                                        </tr>
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}
