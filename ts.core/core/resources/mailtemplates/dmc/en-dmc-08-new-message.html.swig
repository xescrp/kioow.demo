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
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                            &nbsp;
                                            <h1>New message Tailor Made
                                            {% if request.affiliate %}
                                            B2B{%- else -%}
                                            B2C{%- endif -%}
                                            </h1>
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
                                                Hello <strong>{{to.name}}</strong> you have a new message from 
                                                {% if request.affiliate %}
                                                <strong>{{request.title}}</strong>
                                                {%- else -%}
                                                <strong>{{request.traveler.firstname}} {{request.traveler.lastname}}</strong>.
                                                {%- endif -%}
                                                <br />
                                                <br />
                                                 <h3 class="null" style="line-height: 20.7999992370605px;">REQUEST ID: {{ request.code }}</h3>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>
                        </tbody>
                    </table>
{% if request.affiliate %}

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="5" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FCF8E3;">
                                <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="text-align: left;">

                                        <table border="0" cellpadding="5" cellspacing="0"  class="mcnTextContentContainer">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <em style="color:#999999">"{{content.message}}"</em>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p>&nbsp;&nbsp;&nbsp;<a target="_blank" href="{{ca.url}}">see translation</a></p>
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


{%- else -%}
<!-- body b2c question -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
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
                                        <p>&nbsp;&nbsp;&nbsp;<a target="_blank" href="{{ca.url}}">see translation</a></p>
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
{%- endif -%}



<br />
<!-- BEGIN Call to action -->
 {% if ca == null || ca == undefined || ca == ''%}
    {% set ca = {txt : 'GO TO THE REQUEST', url : 'http://openmarket.travel/dmc-response?code='+ request.code}; %}
{% endif %}
{% include "../partials/call-to-action.html.swig" %}
<!-- END Call to action -->
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


