{% extends '../dmc-layout.html.swig' %}

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
                            &nbsp;
                        <h1>New Booking under Request</h1>
                        <br>
                        <h2 class="null">Program: <strong>"{{ product.name }}"</strong></h2>
                        <br />
                        <h3 class="null" style="line-height: 20.7999992370605px;">BOOKING ID: <a href="http://openmarket.travel/dmc-booking?idbooking={{ booking.idBooking }}" target="_blank">{{ booking.idBooking }}</a> <span style="font-weight: normal">(needs confirmation)</span></h3>
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
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <h4>The traveler <strong>{{booking.traveler.firstname}} {{booking.traveler.lastname}}</strong> sent the following request</h4>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
    <tbody class="mcnCaptionBlockOuter">
        <tr>
            <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">
    <tbody><tr>
        <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
                <tbody><tr>
                    <td class="mcnCaptionRightImageContent" valign="top">
                    <img alt="Portada de {{product.title_es}}" src="{{mainImageProduct}}" width="264" style="max-width:760px;" class="mcnImage">                    
                    </td>
                    
                </tr>
            </tbody></table>
            <table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="264">
                <tbody><tr>
                    <td valign="top" class="mcnTextContent">
                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-globe-normal.png" style="height: 14px; width: 14px;" width="14">
		                {% for country in countries %}
                            <strong>{{ country }}</strong> {% if !loop.last %}-{% endif %}
                        {% endfor %}
                        </div>
                        
                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{booking.start.day}} {{booking.start.monthname_en}} {{booking.start.year}} &nbsp;</div>
                        
                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14"><span>&nbsp;</span><span>{{ product.itinerary.length }} day{% if product.itinerary.length > 1 %}s{% endif %}</span></div>

                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14">
            	        {% if tags.length > 0 %}                               
                            {% for tag in tags %}{{ tag }}{% if !loop.last %}, {% endif %}{% endfor %}
                        {% endif %}
                        </div>

                        {% set totalpax = 0 %}
                        {% for room in booking.roomDistribution %}
                            {% set totalpax += room.paxList.length %}
                        {% endfor %}

                        <div>
                            <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{totalpax}}<span>&nbsp;pax, {{booking.roomDistribution.length}} room
                            {% if booking.roomDistribution.length > 1 %}s{% endif %}
                            ({% for room in booking.roomDistribution %}{% if !loop.first %} {% endif %}{{room.roomCode}}{% if !loop.last %} / {% endif %}{% endfor %})
                            </span>
                        </div>

                        <div>
                            <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-h-square.png" style="height: 14px; width: 14px;" width="14"><span>
                            {% if hotelcats.length > 0 %}                             
                                {% for hot in hotelcats %}
                                    {{ hot }}{% if !loop.last %}, {% endif %}
                                {% endfor %}
                            {% endif %}
                        </span><br>
                        &nbsp;</div>

                    </td>
                </tr>
            </tbody></table>
        </td>
    </tr>
</tbody></table>
            </td>
        </tr>
    </tbody>
</table>


<table border="0" cellpading="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #D1D1D1;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <h2 class="null" style="line-height: 20.7999992370605px;">Accomodation:</h2>
                                    &nbsp;
                                    {% for room in booking.roomDistribution %}
                                    <h3 class="null" style="line-height: 20.7999992370605px;">
                                    Room {{loop.index}} ({{room.paxList.length}} pax{% if room.paxList.length > 1 %}{% endif %})</h3>
                                    <br style="line-height: 20.7999992370605px;">
                                        {% for pax in room.paxList %}
                                        <strong style="line-height:20.7999992370605px">Pax {{ loop.index }}

                                        {% if pax.holder == true %}
                                         - {# Book Holder #}
                                        {% endif %}
                                        </strong><br style="line-height: 20.7999992370605px;">
                                        <span style="line-height:20.7999992370605px">First Name:&nbsp;<strong>{{ pax.name }}</strong><br>
                                        Last Name:&nbsp;<strong> {{pax.lastName}}&nbsp;</strong><br>
                                        Date of birth:&nbsp;<strong>{{ pax.birdthDate|date('d/m/Y') }}&nbsp;</strong><br>
                                        Passport / ID Number:&nbsp;<strong>[{{pax.documentType|upper}}] {{pax.documentNumber}}</strong></span><br style="line-height: 20.7999992370605px;">
                                        <span style="line-height:20.7999992370605px">Country of Nationality:&nbsp;</span><strong style="line-height:20.7999992370605px">{{ pax.country.name_es }}</strong><br style="line-height: 20.7999992370605px;">
                                        <br style="line-height: 20.7999992370605px;">
                                        {% endfor %}
                                    {% endfor %}
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>
<br />
<br />


<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

<h2 class="null" style="text-align: center;"><span style="font-size:12px">PRICE PER PERSON:</span></h2>


{#
si el operador ha puesto triple y single prices mostrar desglose de precio, si no hay precio, 
no mostrar desglose (vacio) y añadir price to be confirmed encima del callaction
#}

{% set priceComplete = "true" %}
{% for room in booking.roomDistribution %}

    {% if room.roomCode =='single' %}
    	<h2 class="mc-toc-title" style="text-align: center;">
    		{% if room.pricePerPax.value == 0%}
              {% set priceComplete = "false" %}
    		  Single : <strong>Price to be confirmed</strong>
    		{% else %}
    		  Single : 1 x <strong>{{room.pricePerPax.value | numberFractions}} {{room.pricePerPax.currency.symbol}}
    		  </strong>
    		{% endif %}
    	<br>
    </h2>
    {% endif %}

    {% if room.roomCode  =='double'%}
        <h2 class="mc-toc-title" style="text-align: center;">
            {% if room.pricePerPax.value == 0%}
              {% set priceComplete = "false" %}
              Double : <strong>Price to be confirmed</strong>
            {% else %}
              Double : 2 x <strong>{{room.pricePerPax.value | numberFractions}} {{room.pricePerPax.currency.symbol}}</strong>
            {% endif %}
        <br>
        </h2>
    {% endif %}

    {% if room.roomCode  =='triple' %}
    	<h2 class="mc-toc-title" style="text-align: center;">

    		{% if room.pricePerPax.value == 0 %}
              {% set priceComplete = "false" %}
    		  Triple : <strong>Price to be confirmed</strong>
    		{% else %}
    		  Triple : 3 x <strong>{{room.pricePerPax.value | numberFractions}} {{room.pricePerPax.currency.symbol}}
    		  </strong>
    		{% endif %}
    	<br>
    	</h2>
    {% endif %}

{% endfor %}

&nbsp;
<h2 class="null" style="text-align: center;"><span style="font-size:12px"><strong>TOTAL:</strong></span></h2>
<h2 class="mc-toc-title" style="text-align: center;">

{% if priceComplete == "false"  %}
    <strong>Price to be confirmed</strong>
{% else %}
    <span style="line-height:1.6em">&nbsp;{{booking.amount.value | numberFractions}} {{booking.amount.currency.symbol}}</span>
{% endif %}
</h2>
<div>&nbsp;</div>
<div style="text-align: center;">Please confirm this request urgently.</div>
<div>&nbsp;</div>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody>
</table>



<!-- BEGIN Call to action -->
 {% if ca == null || ca == undefined || ca == ''%}
    {% set ca = {txt : 'CONFIRM BOOKING', url : 'http://openmarket.travel/dmc-booking?idbooking='+ booking.idBooking}; %}
{% endif %}
{% include "../partials/call-to-action.html.swig" %}
<!-- END Call to action -->


<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 0px 18px 30px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #D9D9D9;">
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

<!-- BEGIN message // -->
{% include "../partials/temessage-trust.html.swig" %}
<!-- // END message -->

</td>
                                        </tr>
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}                            
