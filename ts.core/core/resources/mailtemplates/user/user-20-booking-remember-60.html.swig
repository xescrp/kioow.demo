{% extends '../user-layout.html.swig' %}

{% block body %}
{% set paymentstatus = true %}
{% set paybutton = true %}
{% set acomodation = false %}
{% set remember60 = true %}
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
                                            
                                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                &nbsp;
                                            <h1>Completa tu Reserva</h1>

                                            </td>
                                        </tr>
                                    </tbody></table>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody>
                                        <tr> 
                                            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                                <h3>Recuerda que es necesario abonar&nbsp;el importe restante
                                                {{booking.amount.exchange.value - (booking.payStatus[0].payment * booking.amount.exchange.value / 100) | numberFractions }} {{booking.amount.exchange.currency.symbol}} ({{100 - booking.payStatus[0].payment}}%)  para completar&nbsp;tu reserva de&nbsp; {{product.title_es}}</h3>
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

                    {% include "../partials/tebooking-user.html.swig" %}

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                        <tbody>
                                            <tr>
                                                <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                                    <tbody>
                                                    <tr>
                                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px; border: 1px solid #ccc;">
                                                        <p>De no recibir el pago entenderemos que la reserva debe ser cancelada. En ese caso se procederá a cargar los gastos que la cancelación haya provocado de acuerdo a las condiciones de cada Operador. Puedes consultarlas en tu reserva.</p>
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
                        </tbody>
                    </table>


                    <!-- BEGIN advice // -->
                    {% include "../partials/temessage-advice.html.swig" %}
                    <!-- // END advice -->  
                    <!-- BEGIN message // -->
                    {% include "../partials/temessage-confiar.html.swig" %}
                    {% include "../partials/temessage-email-reply.html.swig" %}
                    <!-- // END message -->      

                    </td>
                </tr>
            </table>
        <!-- // END BODY -->
        </td>
    </tr>
{% endblock %}
         

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                <tr>
                                    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px; border: 1px solid #ccc;">
                                    <p>Revisa con atención el resumen de tu reserva y en caso de detectar cualquier dato incorrecto, ponte en contacto con nosotros lo antes posible escribiendo un email a <a href="mailto:viajeros@openmarket.travel" target="_blank">viajeros@openmarket.travel</a> e intentaremos solucionarlo lo antes posible en la medida de nuestras posibilidades. openmarket.travel no se responsabiliza de los problemas que pueda ocasionarte el incumplimiento de esta obligación.</p>
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
