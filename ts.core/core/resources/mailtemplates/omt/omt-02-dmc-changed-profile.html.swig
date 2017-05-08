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
                        
                            <h1><br>
                            {{dmc.company.name|title}} ha cambiado su perfil</h1>

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
                        
                            El operador {{dmc.company.name}} ha modificado sus actividades y sus países de operación.<br>
&nbsp;
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
                        
                            <h2 class="null">Datos Actuales</h2>

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
                        
						<strong>Activities</strong><br>
						{% for activity in dmc.tags %}
							{{ activity.label }}{% if loop.last %}{% else %}, {% endif %}
						{% endfor %}<br>
						<br>
						 <strong>Operation Countries</strong><br>
						{% for location in dmc.company.operatein %}
							{{ location.zone }} ({{ location.operateLocation.country }}){% if loop.last %}{% else %}, {% endif %}
						{% endfor %}<br>
						<br> 
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #999999;">
                    <tbody><tr>
                        <td>
                            <span></span>
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
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

                            <h2 class="null">Datos Modificados</h2>

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
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            {% if mail.tag.deleted.length != 0 %}
	                            <strong>Activities deleted</strong><br>
	                            <span style="text-decoration:line-through;">
								{% for activity in mail.tag.deleted %}
									{{ activity.label }}
									{% if loop.last %}
									{% else %}
									, 
									{% endif %}
								{% endfor %}
								<br>
	                            </span><br><br>
                            {% endif %}
                            {% if mail.tag.added.length != 0 %}
	                            <strong>Activities Added</strong><br>
	                            <span style="color:#2bb076;">
								{% for activity in mail.tag.added %}
									{{ activity.label }}
									{% if loop.last %}
									{% else %}
									, 
									{% endif %}
								{% endfor %}
	                            </span><br><br>
                            {% endif %}
							
							{% if mail.operatein.deleted != 0 %}
							<strong>Operation Countries Deleted</strong><br>
							<span style="text-decoration:line-through;">
							{% for location in mail.operatein.deleted %}
								{{ location.zone }}, ({{ location.operateLocation.country }})
									{% if loop.last %}
									{% else %}
									, 
									{% endif %}
							{% endfor %}
                            </span><br><br>
							{% endif %}
							
							{% if mail.operatein.added != 0 %}
                            <strong>Operation Countries Added</strong><br>
                            <span style="color:#2bb076;">
							{% for location in mail.operatein.added %}
								{{ location.zone }}, ({{ location.operateLocation.country }})
									{% if loop.last %}
									{% else %}
									, 
									{% endif %}
							{% endfor %}
                            </span><br>
                            {% endif %}
							<br>
                        </td>
                    </tr>
                </tbody></table>
                
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
                            
                            
