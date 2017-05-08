{% extends '../dmc-layout.html.swig' %}

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
                                        <tbody>
                                            <tr>
                                                <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                                    &nbsp;
                                                    <h1>Nueva Petición a medida</h1>
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
                <td valign="top" class="bodyContainer">

                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner">
                                
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                    <tbody><tr>
                                        
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                            Nueva solicitud enviada por <strong>{{request.traveler.firstname}} {{request.traveler.lastname}}</strong> el <strong>{{request.publishedDate|date('d/m/Y',-120,'(GMT+2)')}}</strong> a las <strong>{{request.publishedDate|date('G:i',-120,'(GMT+2)')}} hs</strong>.<br><br>
                                            <h3 class="null" style="line-height: 20.7999992370605px;">Solicitud ID: <a href="" target="_blank">{{ request.code }}</a></h3>
                                        </td>
                                    </tr>
                                </tbody></table>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- BEGIN request // -->
                {# {% include "../partials/terequest-details-en.html.swig" %} #}
                <!-- // END request -->
                <br />
                <!-- BEGIN Call to action -->
                {% set ca = {txt : 'GO TO REQUEST', url : 'http://openmarket.travel/dmc-response?code='+ request.code } %}
                {% include "../partials/call-to-action.html.swig" %}
                <!-- END Call to action -->


                </td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}

