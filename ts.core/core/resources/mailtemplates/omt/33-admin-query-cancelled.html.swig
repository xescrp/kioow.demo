{% extends '../admin-layout.html.swig' %}
{% set acomodation = true %}

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
                                        <h1>Solicitud {{query.code}} cancelada</h1>
                                        <br>
                                        <br>
                                        <p>
                                        Realizada por {{query.affiliate.company.name}}
                                        <br>
                                        Cliente: <strong>{{query.title}}</strong><br><br>
                                        </p>
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
                    <!-- BEGIN Call to action
                    http://www.yourttoo.com/affiliate/booking-detail?idBooking={{ booking.idBooking}}
                     -->
                    {% if ca == null || ca == undefined || ca == ''%}
                    {% set ca = {txt : 'IR A LA SOLICITUD', url : 'http://www.openmarket.travel/omt-response?code=[querycode]'}; %}
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
