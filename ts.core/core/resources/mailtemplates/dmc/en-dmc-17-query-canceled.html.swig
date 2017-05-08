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
														The query {{ request.code }} has been canceled.
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
													<br>
													Hello {{dmc.name}},
													<br><br>
													The query {{ request.code }} has been canceled.
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>

					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
						<tbody class="mcnBoxedTextBlockOuter">
							<tr>
								<td valign="top" class="mcnBoxedTextBlockInner">
									
									<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
										<tbody><tr>
											
											<td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
											
												<table border="0" cellpadding="5" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FCF8E3;">
													<tbody>
													<tr>
														<td valign="top" class="mcnTextContent" style="text-align: left;">

															<table border="0" cellpadding="5" cellspacing="0"  class="mcnTextContentContainer">
																<tbody>
																	<tr>
																		
																		<td>
																			<strong style="line-height: 120%">Reason:</strong><br>
																			<em style="color:#999999">"{{ textReason }}"</em>
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
									</tbody></table>
									
								</td>
							</tr>
						</tbody>
					</table>
					<br />

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