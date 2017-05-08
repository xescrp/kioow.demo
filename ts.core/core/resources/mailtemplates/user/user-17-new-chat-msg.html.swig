{% extends '../user-layout.html.swig' %}

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
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                            
                                                &nbsp;
                                            <h1>Tienes un nuevo mensaje</h1>

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
                <td valign="top" class="bodyContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                        <tbody>
                                            <tr>
                                                <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                Hola <strong>{{to.name}}</strong> tienes un mensaje en tu petición a medida. <br /><em> Referencia : {{idquery}}</em><br /><br />
                                                    El operador <strong>{{from.name}}</strong> te ha enviado un mensaje <em>el {{content.date|date('d/m/Y')}} a las {{content.date|date('G:i',-120,'(GMT+2)')}} hs</em> <br />

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="5" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FCF8E3;">
                                <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="text-align: left;">

                                        <table border="0" cellpadding="5" cellspacing="0"  class="mcnTextContentContainer">
                                            <tbody>
                                                <tr>
                                                    <td width="50" valign="top" align="center">

                                                        &nbsp;<img height="36" src="{{from.avatarimg}}" style="height: 36px; width: 36px;" width="36">
                                                    </td>
                                                    <td>
                                                        <strong style="line-height: 120%">{{from.name}}:</strong><br>
                                                        <em style="color:#999999">"{{content.message}}"</em>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p>&nbsp;&nbsp;&nbsp;<a target="_blank" href="{{ca.url}}">ver traducción</a></p>
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
<br />
<!-- BEGIN Call to action -->
{% include "../partials/gu-call-to-action.html.swig" %}
<!-- END Call to action -->



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <!-- BEGIN booking // -->
                {% include "../partials/temessage-gracias.html.swig" %}
                {% include "../partials/temessage-email-reply.html.swig" %}
                <!-- // END booking -->              
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
