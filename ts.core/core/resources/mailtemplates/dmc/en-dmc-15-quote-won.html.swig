{% extends '../dmc-layout.html.swig' %}

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
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
													<h1 class="null">
														<br>
														Your quote has been selected.
													</h1>
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
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
													Hello {{dmc.name}},
													<br><br>
													Congratulations, the client <strong>{{request.traveler.firstname}} {{request.traveler.lastname}}</strong> has accepted your quote.
													<br><br>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- BEGIN Call to action
	                http://www.yourttoo.com
	                you must to define ca object : { txt: 'button text', url 'absolute url'}
	                 -->
	                {% if ca == null || ca == undefined || ca == ''%}
	                    {% set ca = {txt : 'GO TO THE QUOTE', url : 'http://www.openmarket.travel/dmc-response?code='+request.code }; %}
	                {% endif %}
	                {% include "../partials/call-to-action.html.swig" %}
	                <!-- END Call to action -->

					

<!-- BEGIN message // -->
{% include "../partials/temessage-thanks.html.swig" %}
<!-- // END message -->

				</td>
			</tr>
		</table>
		<!-- // END BODY -->
	</td>
</tr>
{% endblock %}