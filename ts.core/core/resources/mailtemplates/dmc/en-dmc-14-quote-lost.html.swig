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
														Your quote has been not selected
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
													We are sorry, the client has accepted the quote of another DMC.
													<br><br>
													<a href="http://localhost:3010/dmc-response?code={{ request.code }}" target="_blank">
														View the request {{ request.code }}
													</a>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>

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