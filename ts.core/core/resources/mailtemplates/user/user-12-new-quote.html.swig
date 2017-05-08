{% extends '../user-layout.html.swig' %}

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
                                            <h1>Tienes una nueva cotización</h1>

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
                                        <tbody>
                                            <tr>
                                                <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                Hola <strong>{{traveler.firstname}}</strong> tienes una nueva cotización de tu petición a medida.<br /><em> Referencia : {{queryCode}}</em><br /><br />
                                                    El operador <strong>{{from.name}}</strong> te ha enviado un oferta <em>el {{content.date|date('d/m/Y')}} a las {{content.date|date('G:i',-120,'(GMT+2)')}} hs</em> <br />

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
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px;">
                                                <h2>{{product.title_es}}</h2>

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

                                    {% set ca = {txt : 'VER COTIZACIÓN', url : urlQuote} %}

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
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </td>
</tr>
            <!-- // END BODY -->
{% endblock %}
