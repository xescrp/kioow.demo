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
                                                    <h1>New Tailor Made Request
                                                    {% if request.affiliate %}
                                                    B2B{%- else -%}
                                                    B2C{%- endif -%}
                                                    </h1>
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
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                {% if request.affiliate %}
                                                Under name: <strong>{{request.title}}</strong>
                                                {%- else -%}
                                                New request send by <strong>{{request.traveler.firstname}} {{request.traveler.lastname}}</strong> on <strong>{{request.publishedDate|date('jS \o\f F')}}</strong>.
                                                {%- endif -%}
                                                <br><br>
                                                <h3 class="null" style="line-height: 20.7999992370605px;">REQUEST ID: {{ request.code }}</h3>
                                                <br />
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
                    
                    <!-- BEGIN Call to action -->
                    {% set ca = {txt : 'GO TO THE REQUEST', url : 'http://openmarket.travel/dmc-response?code='+ request.code } %}
                    {% include "../partials/call-to-action.html.swig" %}
                    <!-- END Call to action -->
                    {% include "../partials/temessage-dmc-questions-request.html.swig" %}
                    {% if request.affiliate %}
                    {% include "../partials/yto-temessage-thanks.html.swig" %}
                    {%- else -%}
                    {% include "../partials/temessage-thanks.html.swig" %}
                    {%- endif -%}

                </td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}