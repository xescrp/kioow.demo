                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextContentContainer">
                    <tbody>
                    <tr>
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                            
                            {% if booking.queryCode %}
                            <h4>Your Quotation for the Tailor Made request has been booked</h4><br>
                            {% endif %}
                            <h2 class="null">Tour name: <strong>"{{ product.name }}{% if product.categoryname.label_en %} ({{ product.categoryname.label_en }}){% endif %}"</strong>
                            {# <a href="http://openmarket.travel/dmc-program?code={{ product.code }}">{{product.code}}</a> #}
                            </h2>
                            <br />
                            <h3 class="null" style="line-height: 20.7999992370605px;">BOOKING ID: {{ booking.idBooking }}
                            {# <a href="http://openmarket.travel/dmc-booking?idbooking={{ booking.idBooking }}" target="_blank">{{ booking.idBooking }}</a> #}
                            {% if booking.queryCode %}
                            <br /><br />REQUEST ID: {{booking.queryCode}}
                            {% endif %}
                            </h3>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 18px 18px 0px;">
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
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer">
                    <tbody><tr>                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 0px 9px 18px; text-align: left;">
                            <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{booking.start.day}} {{booking.start.monthname_en}} {{booking.start.year}} </span></div>

                            <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span>{{product.itinerary.length }} days</span></div>

                            {% set totalpax = 0 %}
                            {% for room in booking.roomDistribution %}
                                {% set totalpax += room.paxList.length %}
                            {% endfor %}

                            <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;{{totalpax}}<span>&nbsp;pax, {{booking.roomDistribution.length}}
                            {% if booking.roomDistribution.length > 1 %} 
                            rooms
                            {% else %}
                            room
                            {% endif %}
                            ({% for room in booking.roomDistribution %}{% if !loop.first %} {% endif %}{{room.roomCode}}{% if !loop.last %} / {% endif %}{% endfor %})
                            </span></div>
                        </td>
                    </tr>
                </tbody></table>
                
{#<table align="right" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px 9px 0px; text-align: right;">
                            
                            {% if queryCode && queryCode!=null %}                           
                                <h3 class="null" style="text-align: right;">TOTAL:&nbsp;<br />{{ booking.netPrice.value | numberFractions}} {{ booking.netPrice.currency.symbol }} 
                                    <small style="font-weight : normal">Net Price</small>
                                </h3>

                            {% else %}
                                <h3 class="null" style="text-align: right; font-weight: normal;">TOTAL:&nbsp;{{ booking.amount.value | numberFractions }} {{ booking.amount.currency.symbol }}</h3>

                                <em style="text-align: right; ">-{{booking.comission}}% of comission</em>
                                {% set comission = 1 - booking.comission / 100 %}

                                <h3 class="null" style="text-align: right;">NET PRICE:&nbsp;{{ booking.netPrice.value | numberFractions}} {{ booking.netPrice.currency.symbol }}</h3>
                            {% endif %}
                    
                        </td>
                    </tr>
                </tbody></table> #}
                
            </td>
        </tr>
    </tbody>
</table>


<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 0px 18px 18px;">
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

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                    <tbody><tr>                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="background-color: #FFF2F2;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-warning.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span style="color:#a94442"> Attention. This is a freesale booking.   Please ensure all services, as this booking has been already confirmed to clients. Thank you.<br>
                                        <br>
                                        Please, upload your proforma invoice into the booking.</span></div>
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

{# <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">
            
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                <tbody><tr>
                    
                    <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                    
                        <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
                            <tbody><tr>
                                <td valign="top" class="mcnTextContent">
                                    <h2 class="mc-toc-title">Client:</h2>
                                    <br>
                                    First Name: <strong>{{booking.traveler.firstname}}</strong><br>
                                    Last Name: <strong>{{booking.traveler.lastname}}</strong><br>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
        </td>
    </tr>
</tbody> #}
{# </table> #}<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
    <tbody class="mcnBoxedTextBlockOuter">
        <tr>
            <td valign="top" class="mcnBoxedTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                    <tbody><tr>
                        
                        <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                        
                            <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%" style="border: 1px solid #DDDDDD;">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <h2 class="null" style="line-height: 20.7999992370605px;">Accommodation:</h2>

{% for room in booking.roomDistribution %}

<h3 class="null" style="line-height: 20.7999992370605px;"><br>
Room {{loop.index}}: {{room.roomCode}}</h3>
<br style="line-height: 20.7999992370605px;">

    {% for pax in room.paxList %}
    <strong style="line-height:20.7999992370605px">Pax {{loop.index}} </strong>
    {# {% if loop.index == 1 %}
        <strong style="line-height:20.7999992370605px">-&nbsp; Book Holder</strong>
    {% endif %} #}
    <br style="line-height: 20.7999992370605px;">
    <span style="line-height:20.7999992370605px">First Name:&nbsp;<strong>{{pax.name}}</strong><br>
    Last Name:&nbsp;<strong>{{pax.lastName}}&nbsp;</strong></span><br style="line-height: 20.7999992370605px;">
    <span style="line-height:20.7999992370605px">Date of birth</span><span style="line-height:20.7999992370605px">:&nbsp;<strong>{{pax.birdthDate|date('d F, Y')}}&nbsp;</strong><br>
    Passport / ID Number:&nbsp;<strong>[{{pax.documentType|upper}}] {{pax.documentNumber}}</strong></span><br style="line-height: 20.7999992370605px;">
    <span style="line-height:20.7999992370605px">Country of nationality</span><span style="line-height:20.7999992370605px">:&nbsp;</span><strong style="line-height:20.7999992370605px">{{pax.country.name}} ({{pax.country.countrycode}})</strong><br style="line-height: 20.7999992370605px;">
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
{% if booking.meetingdata %}
{# <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock">
<tbody class="mcnBoxedTextBlockOuter">
    <tr>
        <td valign="top" class="mcnBoxedTextBlockInner">
            
            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextContentContainer">
                <tbody><tr>
                    
                    <td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
                    
                        <table border="0" cellpadding="18" cellspacing="0" class="mcnTextContentContainer" width="100%">
                            <tbody><tr>
                                <td valign="top" class="mcnTextContent">
                                    <h2 class="mc-toc-title">Information for trasnsfer in:</h2>

                                    <br>
                                    <strong>{{ booking.meetingdata }}</strong><br>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
        </td>
    </tr>
</tbody>
</table> #}
{% endif %}

