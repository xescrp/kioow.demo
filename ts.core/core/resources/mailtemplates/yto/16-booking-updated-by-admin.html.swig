{% extends '../yto-layout.html.swig' %}
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
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                                &nbsp;                                                
                                                <h1 ng-if="modification">
                                                Modificación de {{modification}} para la reserva {{booking.idBooking}}</h1>                                
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
            Yourttoo.com ha realizado los cambios solicitados en  tu reserva
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
                                <br />
                                    {% if ca == null || ca == undefined || ca == '' %}
                                    {% set ca = {txt : 'IR A LA RESERVA', url : url}; %}
                                    {% endif %}
                                    {% include "partials/gu-call-to-action.html.swig" %}
                                    <!-- END Call to action -->

                                    <!-- BEGIN booking // -->
                                    {% include "../partials/booking.es.html.swig" %}
                                    <!-- // END booking -->

                                    <!-- BEGIN client holder // -->
                                    {% include "../partials/te-holder.es.html.swig" %}
                                    <!-- // END client holder -->  
                                    
                                    {% include "../partials/thanks-message.es.html.swig" %}
                                    {% include "partials/email-no-reply.es.html.swig" %}
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
