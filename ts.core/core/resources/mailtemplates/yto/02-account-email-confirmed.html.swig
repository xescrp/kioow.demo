{% extends '../yto-layout.html.swig' %}

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
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                        <h1 class="null"><br>Todo está listo.</h1>
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
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner">                
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                    <tr>                        
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">                        
                                            <span>Hola {{ contact.firstname }},</span>
                                            <br><br>
                                            El registro para <strong>{{ company.name }}</strong> ha sido aprobado con éxito, por favor accede a tu cuenta para completar el perfil.
                                            <br><br>
                                            Una vez completado, podréis comenzar a usar la plataforma.
                                            <br><br>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
                </table>

                <!-- BEGIN Call to action
                http://www.yourttoo.com
                 -->
                {% set ca = {txt : 'IR A YOURTTOO.COM', url : url} %}
                {% include "partials/gu-call-to-action.html.swig" %}
                <!-- END Call to action -->



                <!-- BEGIN message // -->
                {% include "../partials/thanks-message.es.html.swig" %}
                {% include "partials/email-no-reply.es.html.swig" %}
                <!-- // END message -->

                </td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}