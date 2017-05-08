{% if paymentstatus %}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
	<tbody class="mcnBoxedTextBlockOuter">
		<tr>
			<td valign="top" class="mcnBoxedTextBlockInner">
				{# un pago o varios pero del total de la reserva#}
				{% if booking.payStatus && (booking.payStatus[0].payment == 100 || booking.payStatus.length> 1) %}
			   
				<table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" class="mcnBoxedTextContentContainer">
					<tbody>
						<tr>
							<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:0;">
								<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
									<tbody>
										<tr>
											<td valign="top" class="mcnTextContent" style="text-align: center;">

											{# reserva pagada entera #}
											{# {% if booking.payStatus && (booking.payStatus[0].payment == 100 || booking.payStatus.length> 1) %} #}
											<h4 style="text-align: center;"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">TOTAL</span></h4>
											&nbsp;
											<h2 style="text-align: center;">
												<span style="font-family:arial,helvetica neue,helvetica,sans-serif">
													<strong>{{booking.amount.exchange.value | numberFractions}} {{booking.amount.exchange.currency.symbol}}</strong>
												</span>
											</h2>
											<p style="text-align: center;">(100% del total)</p>

											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>

				{# ha seleccionado un pago del 40% #}
				{# {% elseif  booking.payStatus %} #}
				{% else  %}   
					<table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnBoxedTextContentContainer">
						<tbody>
							<tr>
								<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:0;">
									<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="text-align: center;">

												<h4 style="text-align: center;">
													<span style="font-family:arial,helvetica neue,helvetica,sans-serif">PRIMER PAGO</span>
												</h4>
												&nbsp;
												<h2 style="text-align: center;">
													<span style="font-family:arial,helvetica neue,helvetica,sans-serif">
														<strong>
															{% if booking.payStatus[0].amount && booking.payStatus[0].amount.exchange && booking.payStatus[0].amount.exchange.value > 0 %}
																{{booking.payStatus[0].amount.exchange.value | numberFractions}}
															{% else %}
																{{booking.amount.exchange.value * booking.payStatus[0].payment / 100 | numberFractions}}
															{% endif %}
															{{booking.amount.exchange.currency.symbol}}
														</strong>
													</span>
												</h2>
												<p style="text-align: center;">({{booking.payStatus[0].payment}}% del total)</p>

												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>

					<table align="right" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnBoxedTextContentContainer">
						<tbody>
							<tr>
								<td class="mcnBoxedTextContentColumn" style="padding-top:9px; padding-right:18px; padding-bottom:9px; padding-left:0;">
									<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent" style="text-align: center;">
												{% if remember60 %}
													<h4 style="text-align: center; color:#a94442!important;"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">A PAGAR</span></h4>
												{% else %}
													<h4 style="text-align: center; color:#a94442!important;"><span style="font-family:arial,helvetica neue,helvetica,sans-serif">SEGUNDO PAGO</span></h4>
												{% endif %}
												&nbsp;
												<h2 style="text-align: center;">
													<span style="font-family:arial,helvetica neue,helvetica,sans-serif">
														<span style="color:#a94442">
															<strong>
																{% if booking.payStatus[0].payment != 100 %}
																	{{ (100 - booking.payStatus[0].payment) * booking.amount.exchange.value / 100 | numberFractions}}
																{% else %}
																	0
																{% endif %}
																{{booking.amount.exchange.currency.symbol}}
															</strong>
														</span>
													</span>
												</h2>

												{% if remember60 %}
													<p style="text-align: center;">({{ 100 - booking.payStatus[0].payment}}% del total)</p>
												{% endif %}

												{% if booking.payStatus[0].payment != 100 && booking.status != 'transfer1-2' %}
													<p style="text-align: center; margin-bottom: 0;">({{100 - booking.payStatus[0].payment}}% que debes abonar antes del {{booking.payStatus[0].nextPaymentDate|date('d/m/Y')}}).
													{% if !paybutton %}
														<a href='{{ urlRestoPago }}' target="_blank">Pagar ahora</a>
													{% endif %}
													</p>
												{% endif %}
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table> 
				{% endif %}
				</td>
			</tr>
		</tbody>
	</table>

	{% if paybutton %}
	<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
		<tbody class="mcnBoxedTextBlockOuter">
			<tr>
				<td valign="top" class="mcnBoxedTextBlockInner">
					<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
						<tbody>
							<tr>
								<td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
									<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
										<tbody>
											<tr>
												<td valign="top" class="mcnTextContent">
												<h2 class="mc-toc-title" style="text-align: center;">
													<span style="font-family:arial,helvetica neue,helvetica,sans-serif">TOTAL:&nbsp;</span>
													<strong>{{booking.pricing.amount | numberFractions }}&nbsp;{{booking.pricing.currency.symbol}}</strong>
												</h2>
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
	<!-- BEGIN Call to action
	http://yourttoo.com//edit/booking?code=={{ booking.idBooking }}
	 -->
	{% set ca = {txt : 'PAGAR AHORA', url : urlRestoPago} %}
	{% include "../partials/gu-call-to-action.html.swig" %}
	<!-- END Call to action -->

	{% endif %} {# show paybutton #}

{% endif %} {# show paymentstatus #}


{% if checkbooking %}
	{% include "../partials/check-booking-es.html.swig" %}
{% endif %}



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding: 9px 18px;">

<h2><strong>{{booking.products[0].title_es}} {% if booking.products[0].categoryname.label_es %}({{ booking.products[0].categoryname.label_es }}) {% endif %}<strong></h2>

							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
	<tbody class="mcnCaptionBlockOuter">
		<tr>
			<td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
				<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">
					<tbody>
						<tr>
							<td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
								<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
									<tbody>
										<tr>
											<td class="mcnCaptionRightImageContent" valign="top">
												<img alt="Portada de {{booking.products[0].title_es}}" src="{{booking.products[0].productimage.url}}" width="264" style="max-width:760px;" class="mcnImage">
											</td>
										</tr>
									</tbody>
								</table>
								<table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264">
									<tbody>
										<tr>
											<td valign="top" class="mcnTextContent">

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;
	<span>
		{{booking.dates.start.day}} {{booking.dates.start.monthname_es}} {{booking.dates.start.year}}
	</span>
</div>

<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{booking.products[0].itinerary.length }} días</span>
</div>

{% if booking.products[0].tags.length > 0 %}
	<div>
		<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14">
		<span>
			{% for tag in booking.products[0].tags %}{{ tag }}{% if !loop.last %}, {% endif %}{% endfor %}
		</span>
	</div>
{% endif %}

{% set totalpax = booking.paxes.length %}


<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{totalpax}}<span>
		pasajero{% if totalpax > 1%}s{% endif %}, {{booking.rooms.length}}
		{% if booking.rooms.length > 1 %} 
			habitaciones
		{% else %}
			habitación
		{% endif %}
		{% for room in booking.rooms %}
			{% if !loop.first %}{% endif %}
			{% if room.roomcode == "single" %}(individual)
			{% elseif room.roomcode == "double" %}(doble)
			{% else %}(triple){% endif %}
			{% if !loop.last %} / {% endif %}
		{% endfor %}
	</span>
</div>
<div>
	<img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-h-square.png" style="height: 14px; width: 14px;" width="14">
	<span>
		{% if hotelcats.length > 0 %}
			{% for hot in hotelcats %}
				{{ hot }}{% if !loop.last %}, {% endif %}
			{% endfor %}
		{% endif %}
	</span>
	<br>
	&nbsp;
</div>

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

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
	<tbody class="mcnTextBlockOuter">
		<tr>
			<td valign="top" class="mcnTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
					<tbody>
						<tr>
							<td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
		


{% if description %}						
<div>
	{% if lang == '_es' %}
		{{booking.products[0].description_es}}	
	{% else %}
		{{booking.products[0].description_en}}	 
	{% endif %}
	&nbsp;
</div>
{% endif %}

							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>


{% if acomodation %}
<table border="0" cellpading="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
	<tbody class="mcnBoxedTextBlockOuter">
		<tr>
			<td valign="top" class="mcnBoxedTextBlockInner">
				<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
					<tbody>
						<tr>
							<td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
								<table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #D1D1D1;">
									<tbody>
										<tr>
											<td valign="top" class="mcnTextContent">
<h2 class="null" style="line-height: 20.7999992370605px;">Acomodación:</h2>
&nbsp;
{% set lastroomcode = '' %}
{% set lasroomcount = 0 %}
{% set lastroommax = 0 %}
{% set lastroomhash = { double: 2, triple: 3, quad: 4, single: 1 } %}
{% for pax in booking.paxes %}
	{% set lastroomcount = lastroomcount + 1 %}
	{% set lastroommax = lastroomhash[pax.room]  %}

	{% if lastroomcount == 0 %}
		<h3 class="null" style="line-height: 20.7999992370605px;">
			Habitación {{pax.room}} ({{room.paxlist.length}} pasajero{% if room.paxlist.length > 1 %}s{% endif %})
		</h3>
	{% endif %}
	{% if lastroomcount >= lastroommax %}
		{% set lastroomcount = 0 %}
			<br style="line-height: 20.7999992370605px;">
			<br style="line-height: 20.7999992370605px;">
	{% endif %}
	<br style="line-height: 20.7999992370605px;">
		<strong style="line-height:20.7999992370605px">
			Pasajero {{ loop.index }}
			{% if pax.holder == true %}
			 - Titular de la Reserva
			{% endif %}
		</strong>
		<br style="line-height: 20.7999992370605px;">
		<span style="line-height:20.7999992370605px">Nombre:&nbsp;<strong>{{ pax.name }}</strong>
		<br>
		Apellido:&nbsp;<strong> {{pax.lastname}}&nbsp;</strong><br>
		Fecha de Nacimiento:&nbsp;<strong>{{ pax.birthDate|date('d/m/Y') }}&nbsp;</strong><br>
		Documento:&nbsp;<strong>[{{pax.documentType|upper}}] {{pax.documentNumber}}</strong></span><br style="line-height: 20.7999992370605px;">
		<span style="line-height:20.7999992370605px">País de Nacionalidad:&nbsp;</span>
		<strong style="line-height:20.7999992370605px">{{ pax.country.name_es }}</strong>
	{% for pax in room.paxes %}
		
		{% if loop.index < room.paxList.length %}
			
		{% endif %}
	{% endfor %}

{% endfor %}
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
<br />
{% endif %}