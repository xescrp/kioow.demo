{% extends '../admin-layout.html.swig' %}
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

                    {% if query!=null && query.code!=null %}                           
                        <h1>Nueva Reserva para la petición a medida  {{query.code}}</h1>
                    {% elseif booking.traveler != null %}
                       <h1>Nueva Reserva</h1>
                    {% elseif booking.affiliate !=null%}
                       <h1>Nueva Reserva De Afiliado</h1>
                    {% endif %}

                    {% if booking.payStatus[0].paymentMethod == 'transfer' %}
                    <h3>Pago por transferencia</h3>
                    {% endif %}

                    <br>
                    <span style="background-color: #f1f1f1; display: block; padding: 10px;">
                    Producto: <a href="http://openmarket.travel/dmcproduct/{{product.code}}" target="_blank">{{product.name}} ({{product.categoryname.label_es}}) - {{product.code}}</a> <br /> DMC: 

                    {% if booking.dmc.name != null %}
                    <a href="http://openmarket.travel/dmc/{{booking.dmc.code}}" target="_blank">
                    {{booking.dmc.name}} - {{booking.dmc.code}}
                    {% else %}
                    <a href="http://openmarket.travel/dmc/{{product.dmc.code}}" target="_blank">
                    {{product.dmc.name}} - {{product.dmc.code}}
                    {% endif %}
                    </a> <br /> Reserva: <a href="http://openmarket.travel/dmc-booking?idbooking={{booking.idBooking}}" target="_blank">{{booking.idBooking}}</a>
                    </span>
                    <br>

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
                                    {% include "../partials/tebooking-omt.html.swig" %}
                                    <!-- // END booking -->
                                    

                                    {% if ca == null || ca == undefined || ca == ''%}
                                        {% set ca = {txt : 'VER RESERVA', url : 'http://openmarket.travel/dmc-booking?idbooking='+ booking.idBooking}; %}
                                    {% endif %}
                                    {% include "../partials/call-to-action.html.swig" %}

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    <!-- // END BODY -->
{% endblock %}
                            