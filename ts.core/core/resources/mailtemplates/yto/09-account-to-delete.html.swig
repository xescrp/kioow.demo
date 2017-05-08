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
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                    <tbody>
                                        <tr>
                                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                <h1 class="null"><br>Hasta pronto!</h1>
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
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
            <tr>
                <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                <tbody><tr>
                                <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                    <span style="font-family:lucida sans unicode,lucida grande,sans-serif; line-height:20.7999992370605px">
                                        Hola {{ contact.firstname }},
                                        <br><br>
                                        Se ha dado de baja tu cuenta para operar con <strong>{{ company.name }}</strong>.
                                        <br><br>
                                        Esperamos que pronto estéis de vuelta.
                                        <br><br>
                                    </span>
                                </td>
                                </tr>
                                </tbody></table>
                            </td>
                        </tr>
                    </tbody>
                </table>

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
