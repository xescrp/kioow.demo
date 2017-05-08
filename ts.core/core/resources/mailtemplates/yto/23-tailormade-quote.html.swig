{% extends '../yto-layout.html.swig' %}

{% block body %}

<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody><tr> 
                                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                            &nbsp;
                                            <h1>Presupuesto a medida</h1>
                                            <br>
                                            <h3 class="null" style="line-height: 20.7999992370605px;">
                                                Localizador: <strong>{{ request.code }}</strong>
                                            </h3>
                                            <p>
                                                Cliente: <strong>{{request.title}}</strong>
                                            </p>
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
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
            <tr>
                <td valign="top" class="bodyContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px;">
                                                <h2 style="text-align: center;">UN RECEPTIVO TE HA ENVIADO UNA COTIZACIÓN</h2>
                                                <p style="text-align: center;"><strong>Esta información es sólo una propuesta. No existen servicios reservados. Ten en cuenta también que el precio neto se basa en el número de personas especificado en la petición. Si los pasajeros variaran, la cotización podría no ser la misma.</strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
                        <tbody class="mcnCaptionBlockOuter">
                            <tr>
                                <td class="mcnCaptionBlockInner" valign="top">

                                    <br />
                                    <!-- BEGIN Call to action -->

                                    {% set ca = {txt : 'IR AL PRESUPUESTO', url : urlQuote} %}

                                    {% include "partials/gu-call-to-action.html.swig" %}


                                    <!-- END Call to action -->


                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                                        <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner">
                                                    <!-- BEGIN booking // -->
                    {% include "../partials/thanks-message.es.html.swig" %}
                    {% include "partials/email-no-reply.es.html.swig" %}
                                                    <!-- // END booking -->              
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
    </td>
</tr>
            <!-- // END BODY -->
{% endblock %}
