{% extends '../../../dmc-layout.html.swig' %}

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
                                            &nbsp;
                                            <h1>New Booking
                                                {% if affiliate %}
                                                B2B
                                                {% else %}
                                                B2C
                                                {% endif %}
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
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
            <tr>
                <td valign="top" class="bodyContainer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner">

                        <!-- BEGIN booking // -->
                        {% include "wl-en-booking-information.html.swig" %}
                        {% include "wl-en-freesale-banner.html.swig" %}
						            {% include "../../common/booking.en.html.swig" %}
                        <!-- // END booking -->

                        <!-- BEGIN Call to action -->
                        {% set ca = {txt : 'GO TO BOOKING', url : 'http://openmarket.travel/dmc-booking?idbooking='+ idBooking } %}
                        {% include "../../../partials/call-to-action.html.swig" %}
                        <!-- END Call to action -->

                        <!-- BEGIN message // -->

                        <!-- // END message -->
                        {% if booking.affiliate %}
                        {% include "../../../partials/temessage-questions-yto.html.swig" %}
                        {%- else -%}
                        {% include "../../../partials/temessage-questions.html.swig" %}
                        {%- endif -%}
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}
