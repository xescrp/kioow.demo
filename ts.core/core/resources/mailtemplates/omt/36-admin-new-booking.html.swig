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
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                                &nbsp;
                                                <h1>Nueva Reserva confirmada {{booking.idBooking}} </h1>
                                                {% if booking.queryCode %}
                                                <br>
                                                <h2 style="text-align:center;">UNA PETICIÓN A MEDIDA SE HA RESERVADO</h2>
                                                {% endif %}
                                                {% include "../partials/te-agency.es.html.swig" %}
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
                                                <td valign="top" class="mcnTextBlockInner">
                                                    {% include "../partials/booking.es.html.swig" %}
                                                </td>
                                            </tr>
                                             <tr>
                                                <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                    <p>Cliente: 
                                                    
                                                    <strong>{{booking.roomDistribution[0].paxList[0].lastName}} {{booking.roomDistribution[0].paxList[0].name}}</strong>

                                                    </p>
                                                    <p>Modalidad de pago: <strong>{{booking.payStatus[0].payment}}%</strong></p>
                                                    <p>Observaciones: <strong>{{booking.affiliateobservations}}</strong></p>
                                                    <p>Traslados: <strong>{{booking.meetingdata}}</strong></p>
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
