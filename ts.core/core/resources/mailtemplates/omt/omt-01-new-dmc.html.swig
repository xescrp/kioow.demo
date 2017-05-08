{% extends '../admin-layout.html.swig' %}
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
                            <h1><br>Nuevo registro de DMC</h1>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            Un nuevo operador local se ha registrado en el sistema.
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
                        <strong>CODE </strong><br>
                        {{dmc.code}}<br>
                        <br>
                        <strong>Company name</strong><br>
                        {{dmc.company.name}}<br>
                        <br>
                        <strong>Year of establishment</strong><br>
                        {{dmc.company.constitutionyear}}<br>
                        <br>
                        <strong>Phone</strong><br>
                        {{dmc.company.phone}}<br>
                        <br>
                        <strong>Address</strong><br>
                        {{dmc.company.location.fulladdress}}<br>
                        {{dmc.company.location.stateorprovince}} {{dmc.company.location.pc}}<br>
                        {{dmc.company.location.country}}<br>
                        <br>
                        <strong>Description</strong><br>
                        {{dmc.additionalinfo.description}}<br>
                        <br>
                        <strong>Activities</strong><br>
                        {% for activity in dmc.tags %}{{ activity.label }}{% if loop.last %}{% else %}, {% endif %}
                        {% endfor %}
                        <br>
                        <br>

                        <strong>Operation Countries</strong><br>
                        {% if dmc.company.operatein > 0 %}
                            {% for location in dmc.company.operatein.operateLocation %}
                            	{{ location.zone }}, ({{ location.country }})
                            	{% if loop.last %}
                            	{% else %}, 
                            	{% endif %}
                            {% endfor %}
                        {% else %}
                            No operation countries
                        {% endif %}
                        <br>
                        <br>

                        <strong>Associations</strong><br>
                        {% if dmc.additionalinfo.associations.length > 0 %}
                            {% for association in dmc.additionalinfo.associations %}
                            	{{ association.name }}{% if loop.last %}{% else %}, {% endif %}
                            {% endfor %}
                        {% else %}
                            No associations
                        {% endif %}
                        <br>
                        <br>

                        {% if dmc.additionalinfo.recomenders.length > 0 %}
                            <strong>Recomenders</strong><br>
                            {% for recomender in dmc.additionalinfo.recomenders %}
                            	{{ recomender.name }}{% if loop.last %}{% else %}, {% endif %}
                            {% endfor %}<br>
                            <br>
                        {% endif %}
                        
                        <strong>Contact Details</strong><br>
                        {{dmc.contact.title}}, {{dmc.contact.firstname}}<br>
                        {{dmc.contact.position}}<br>
                        <br>
                        <strong>Administrator email</strong><br>
                        {{dmc.contact.email}}<br>
                        <br>
                        <strong>Administrator skype</strong><br>
                       
                        {% if dmc.contact.skype != "" %}
                            {{dmc.contact.skype}}
                            {% else %}
                            No skype provided
                        {% endif %}
                        <br>
                        <br>
                        &nbsp;
                        </td>
                    </tr>
                </tbody></table>
                <!-- BEGIN Call to action -->
                {% if ca == null || ca == undefined || ca == ''%}
                    {% set ca = {txt : 'GO TO PROFILE', url : 'http://openmarket.travel/dmc-account?code='+dmc.code}; %}
                {% endif %}
                {% include "../partials/call-to-action.html.swig" %}
                <!-- END Call to action -->

            </td>
        </tr>
    </tbody>
</table></td>
            </tr>
        </table>
        <!-- // END BODY -->
    </td>
</tr>
{% endblock %}

