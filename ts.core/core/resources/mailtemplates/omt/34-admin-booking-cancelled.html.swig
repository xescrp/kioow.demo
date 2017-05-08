{% extends '../admin-layout.html.swig' %}
{% set paymentstatus = false %}
{% set paybutton = false %}
{% set acomodation = false %}
{% set remember60 = false %}
{% set description = false %}
{% set checkbooking = false %}

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
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                            &nbsp;
                                        <h1>Reserva {{booking.idBooking}} cancelada</h1>
                                        {% include "../partials/te-agency.es.html.swig" %}

                                        <p>La agencia ha pedido la cancelación de la reserva.</p>
                                        </td>
                                    </tr>
                                    <tr>                                    
                                        <td valign="top" class="mcnTextBlockInner">
                                            {% include "../partials/booking.es.html.swig" %}
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
                        {% include "../partials/te-holder.es.html.swig" %}
                        <br>
                    <!-- BEGIN Call to action
                    http://www.yourttoo.com/affiliate/booking-detail?idBooking={{ booking.idBooking}}
                     -->
                    {% if ca == null || ca == undefined || ca == ''%}
                    {% set ca = {txt : 'IR A LA RESERVA', url : url}; %}
                    {% endif %}
                    {% include "../partials/call-to-action.html.swig" %}

                    <!-- END Call to action -->

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
