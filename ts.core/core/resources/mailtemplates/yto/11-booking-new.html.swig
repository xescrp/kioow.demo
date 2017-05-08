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
                                    <tbody>
                                    <tr>  
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                            &nbsp;
                                            {% if booking.query !=null %}
                                                <h1>Nueva Reserva a Medida {{booking.idBooking}}</h1>
                                            {% else %}
                                               <h1>Reserva confirmada {{booking.idBooking}}</h1>
                                            {% endif %}
                                            <p><strong>Expediente {{booking.affiliate.company.name}}:</strong> {{booking.idBookingExt}}</p>
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
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
            <tr>
                <td valign="top" class="bodyContainer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            <p>Cliente: <strong>{{booking.paxes[0].lastname}} {{booking.paxes[0].name}}</strong></p>
                        </td>
                    </tr>

                     <!-- botones -->
                    <tr>
                        <td>
                            <p>
                               {% set ca = { txt : 'IR A LA RESERVA', url : booking.url + '#tabdetails' } %}
                                {% include "partials/gu-call-to-action.html.swig" %}
                                {% set ca = {txt : 'DESCARGAR RESUMEN', url : booking.url + '#tabdetails' } %}
                                {% include "partials/gu-call-to-action.html.swig" %}
                            </p>
                        </td>
                    </tr>
                    <!-- check booking -->
                    <tr>
                        <td>
                            {% include "partials/check-booking-es.html.swig" %}
                        </td>
                    </tr>
                    <!-- dudas
                    <tr>
                        <td>
                          {% include "partials/questions.es.html.swig" %}
                        </td>
                    </tr> -->
                   
                    <!-- factura y administracion -->
                    <tr>
                        <td valign="top" class="mcnTextContent" >
                            <p style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">Ya puedes descargarte la factura Proforma para realizar los pagos.</p>
                            {% set ca = {txt : 'IR A ADMINISTRACIÓN', url : booking.url+'#tabadmin'} %}
                            {% include "partials/gu-call-to-action.html.swig" %} 
                        </td>
                    </tr>
                    <!-- informacion bancaria -->
                    <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">                        
                                
                                
                            <div class="graybox" style="background-color:#eee; padding: 15px; border-top: 1px solid #ccc;">
                            <h3 class="mt-zero mt-b">Datos para transferencia</h3>
                            <hr class="mb-xl mt-b" />              
                            <p>Por favor indica el número de localizador de  yourttoo en <strong>"Concepto"</strong> para que podamos identificarla</p>                         
                            {% include "partials/yto-bank-info.html" %}                                 
                            </div>
                        </td>
                    </tr>   
                    <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">                        
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
