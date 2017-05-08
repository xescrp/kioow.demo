{# SEPARADOR #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
	<tbody class="mcnDividerBlockOuter">
		<tr>
			<td class="mcnDividerBlockInner" style="padding: 5px 18px;">
				<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #D9D9D9;">
					<tbody>
						<tr>
							<td>
								<span></span>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN SEPARADOR #}


{# INFO CLIENTE #}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
								<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
									<tbody>
										<tr>
											<td valign="top" class="mcnTextContent">

<h3 class="null" style="line-height: 20.7999992370605px;">
	CLIENTE:</a>
</h3>
<br>
Nombre: <strong>{{request.traveler.firstname}}</strong><br>
Apellido: <strong>{{request.traveler.lastname}}</strong><br>
Email: <a href="mailto:{{request.traveler.email}}" target="_blank"><strong>{{request.traveler.email}}</strong></a><br>
{% if request.traveler.phone %}
Teléfono: <strong>{{request.traveler.phone}}</strong>
{% endif %}

											</td>
										</tr>
									</tbody>
								</table>
							<br>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
{# FIN INFO CLIENTE #}