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
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                            <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                        <h1 class="null"><br>Booking
                                        {% if booking.affiliate %}
                                        B2B{%- else -%}
                                        B2C{%- endif -%}: {{booking.idBooking}} has been MODIFIED</h1>
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
            <span>An important modification han been done on this booking:<br>
            <br>
            <strong>{{modification}}</strong>

            <br>
            <br>
            Please, verify into your dasboard.
            </span>
            <br>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- BEGIN Call to action -->
            {% if ca == null || ca == undefined || ca == ''%}
                {% set ca = {txt : 'GO TO BOOKING', url : 'http://www.openmarket.travel/'}; %}
            {% endif %}
            {% include "../partials/call-to-action.html.swig" %}
            <!-- END Call to action -->

            <!-- BEGIN message // -->
            {% include "../partials/temessage-dmc-questions.html.swig" %}
            <!-- // END message -->
            </td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>

{% endblock %}
