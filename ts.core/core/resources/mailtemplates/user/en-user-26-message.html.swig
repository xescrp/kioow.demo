{% extends '../user-layout.html.swig' %}

{% block body %}
                            <tr>
                                <td align="center" valign="top">
                                    <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
                                        <tr>
                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <h1 class="null"><br>Thanks for your message {{name}}</h1>

                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table></td>
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
                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        <strong>We received:</strong>
						<br>
						<br>
                        <strong>Message type:</strong>
                        <br>
                        <span>{{type}}</span>
                        <br>
                        <br>
                    	<strong>Body message:</strong>
						<br>                        
						<span>{{ msg }}</span>
						<br>
						<br>
						<strong>Phone :</strong> {{phone}}
                        <br /><br /><br />
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>
<!-- BEGIN message // -->
{% include "../partials/temessage-team.html.swig" %}
{% include "../partials/temessage-email-reply.html.swig" %}
<!-- // END message -->      
<!-- BEGIN message // -->
<!-- // END message -->      
</td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}
                            