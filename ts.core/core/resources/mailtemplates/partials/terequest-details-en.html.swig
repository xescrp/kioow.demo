<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 5px 18px 15px;">
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
</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif; font-weight: normal;">
                        
                            <h2><img height="18" src="http://res.cloudinary.com/open-market-travel/image/upload/e_grayscale/v1423064611/mail/fa-globe.png" style="height: 18px; width: 18px;" width="18">
                             {% for destination in request.destinations %}
                                {% if destination.city != '' %}
                                    {{destination.city}}
                                   ({{destination.country}})
                                {% else %}
                                    {{destination.fulladdress}}
                                {% endif %}
                                {% if !loop.last %} - {% endif %}
                            {% endfor %}
                             </h2>

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
                        
                        <td valign="top" class="mcnTextContent" style="padding: 9px 18px; line-height: 140%;">
                                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1445501648/fa-calendar-o.png" style="height: 14px; width: 14px;" width="14">&nbsp;
                                {% if request.dates.knowingdates %}
                                    <span><strong>Departure Date: {{request.dates.arrival.day}}-{{request.dates.arrival.month+1}}-{{request.dates.arrival.year}}</strong>
                                {% else %}
                                    <strong>Departure Date: No exact date - {% if request.dates.week != 0 %} {{-request.dates.week-}}
                                        {%- if request.dates.week == 1 -%}
                                        st
                                        {%- elseif request.dates.week == 2 -%}
                                        nd
                                        {%- elseif request.dates.week == 3 -%}
                                        rd
                                        {%- else -%}
                                        th
                                        {%- endif -%}
                                        week
                                    {% endif %} {{request.dates.month.monthname}} of {{request.dates.month.monthyear}} 
                                    
                                    </strong>
                                {% endif %}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Duration: {{request.dates.duration}} days</strong>
                                <br />
                                {% if request.dates.alreadygotflights %}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Booked flight:</strong><br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Arrival: {{request.dates.dataflightsIn}}<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Departure: {{request.dates.dataflightsOut}}<br>
                                {% else %}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>No flight booked</strong><br>
                                    {% if request.dates.flexibility.number != 0 %}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{request.dates.flexibility.number}} day/s of flexibility
                                    {% elseif request.dates.knowingdates %}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No flexibility
                                    {% endif %}
                                {% endif %}
                                </span>
                                </div>
                                <br>
                            
                            {% set totalpax = 0 %}
                            {% for room in request.roomDistribution %}
                                {% set totalpax += room.paxList.length %}
                            {% endfor %}
                            <br>
                            <div>
                            <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">&nbsp;
                            
                           		<!-- ****total pax ****************** -->
								{% set totalPax = 0 %}
								{% for distribution in request.roomDistribution %}
									{% set totalPax = totalPax + distribution.paxList.length %}
								{% endfor %}		
								<!-- ******************************** -->
                            
                                {% if request.group == null %}
                                    <strong>{{totalPax}} pax{% if totalPax > 1%}s{% endif %}:</strong> &nbsp;{{request.roomDistribution.length}}
                                    {% if request.roomDistribution.length > 1 %} 
                                    Rooms 
                                    {% else %}
                                    Room
                                    {% endif %}
                                    <br>
                                    {% for room in request.roomDistribution %}
                                        <br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <em>Room {{loop.index}}: 
                                        {% if room.roomType.roomCode == 'double' %} 
                                        (double)
                                        {% endif %}
                                        {% if room.roomType.roomCode == 'single' %} 
                                        (single)
                                        {% endif %}
                                        {% if room.roomType.roomCode == 'triple' %}
                                        (triple)
                                        {% endif %}
                                        </em>
                                        {% for pax in room.paxList %}
                                        <br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        Pax {{loop.index}}: {{pax.age}} years old
                                        {% endfor %}
                                        <br>
                                    {% endfor %}

                                {% elseif request.group != null %}
                                    <strong>
                                    Group:
                                    {% if request.group.typeGroup == 'company' %}
                                    Company
                                    {% endif %}
                                    {% if request.group.typeGroup == 'club' %}
                                    Club
                                    {% endif %}
                                    {% if request.group.typeGroup == 'students' %}
                                    Students
                                    {% endif %}
                                    {% if request.group.typeGroup == 'otro' %}
                                    Other
                                    {% endif %}

                                    {{totalPax}} pax{% if totalPax > 1%}s{% endif %}
                                    </strong>
                                    <br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rooms: 
                                    {% if request.group.rooms.single %}
                                    {{request.group.rooms.single}} single{% if request.group.rooms.single > 1%}s{% endif %}
                                    {% endif %}
                                    {% if request.group.rooms.double %}
                                    {{request.group.rooms.double}} double{% if request.group.rooms.double > 1%}s{% endif %}
                                    {% endif %}
                                    {% if request.group.rooms.triple %}
                                    {{request.group.rooms.triple}} triple{% if request.group.rooms.triple > 1%}s{% endif %}
                                    {% endif %}
                                    <br>
                                    {% if request.group.comments != ''%}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comments: <em>{{request.group.comments}}</em>
                                    {% endif %}
                                {% endif %}
                                
                                
                                <span>
                                {# TODO LINK THESE VARS FROM REQUEST : 5 Habitaciones dobles,&nbsp;8 Adultos, 2 Bebés&nbsp;<br> #}

                                {# <em>&nbsp;&nbsp;&nbsp;&nbsp;Observaciones: {{request.description}} </em> #}</span></div>
                                <br />
                                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-h-square.png" style="height: 14px; width: 14px;" width="14">&nbsp;<span><strong> Hotels
                                {% set hashotel = false %}
                                {% if request.hosting.lowcosthotels %}
                                    Low Cost
                                    {% set hashotel = true %}
                                {% endif %}
                                {% if request.hosting.standarhotels %}
                                    {% if hashotel %}, {% endif %}Standard
                                    {% set hashotel = true %}
                                {% endif %}
                                {% if request.hosting.superiorhotels %}
                                    {% if hashotel %}, {% endif %}Superior
                                    {% set hashotel = true %}
                                {% endif %}
                                {% if request.hosting.charmhotels %}
                                    {% if hashotel %}, {% endif %}Charm
                                    {% set hashotel = true %}
                                {% endif %}
                                {% if request.hosting.luxuryhotels %}
                                    {% if hashotel %}, {% endif %}Luxury
                                {% endif %}
                                </strong><br>
                                {% if request.hosting.hostingKindNotes != ''%}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comments: <em>{{request.hosting.hostingKindNotes}}</em>
                                
                                {% endif %}
                                <br />
                                <br />
                                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-money.png" style="height: 14px; width: 14px;" width="14">&nbsp;&nbsp;<span style="line-height:20.7999992370605px">Budget per person: <strong>
                                {{request.budget.cost | numberFractions}} {{request.budget.currency.symbol}}</strong></span></div>
                                <br />

                                {% if request.additionalinfo.trip == 'privatetrip'%}
                                    <div>
                                        {% if request.additionalinfo.needs == 'rentacar'%}
                                        <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1445499951/mail/rentacar.png" style="height: 14px; width: 14px;" width="14">&nbsp;<strong>Rentacar</strong><br>
                                        {% endif %}
                                        {% if request.additionalinfo.needs == 'caranddriver'%}
                                        <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1445502190/fa-cardriver.png" style="height: 14px; width: 37px;" width="14">&nbsp;<strong>Car &amp; driver</strong><br>
                                        {% endif %}
                                    </div>
                                <br />
                                {% endif %}
                                

                                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-list.png" style="height: 14px; width: 14px;" width="14">
                                &nbsp;<span><strong>Additional info:</strong><br>
                                
                                {% if request.additionalinfo.trip == 'grouptrip' && request.group == null %}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Preferences: <strong>Group trip</strong><br>
                                {% endif %}

                                {% if request.additionalinfo.trip == 'privatetrip'%}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Preferences: <strong>Private trip</strong> 
                                    {% if request.additionalinfo.needs == 'onlyhotel'%}
                                     | Without transport<br>
                                    {% endif %}
                                    
                                    {% if request.additionalinfo.guide.included %}
                                        {% set hasguide = false %}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Include in your quote sightseeings with:&nbsp;
                                        {% if request.additionalinfo.guide.language.spanish %}
                                            Spanish
                                            {% set hasguide = true %}
                                        {% endif %}
                                        {% if request.additionalinfo.guide.language.english %}
                                            {% if hasguide %}, {% endif %}English
                                            {% set hasguide = true %}
                                        {% endif %}
                                        {% if request.additionalinfo.guide.language.french %}
                                            {% if hasguide %}, {% endif %}French
                                            {% set hasguide = true %}
                                        {% endif %}
                                        {% if request.additionalinfo.guide.language.german %}
                                            {% if hasguide %}, {% endif %}German
                                            {% set hasguide = true %}
                                        {% endif %}
                                        {% if request.additionalinfo.guide.language.italian %}
                                            {% if hasguide %}, {% endif %}Italian
                                            {% set hasguide = true %}
                                        {% endif %}
                                        {% if request.additionalinfo.guide.language.portuguese %}
                                            {% if hasguide %}, {% endif %}Portugues
                                        {% endif %}
                                         guides.
                                    {% endif %}
                                <br>
                                {% endif %}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Services: 
                                <strong>
                                {% if request.additionalinfo.regimen == 'ol'%}
                                Only Acomodation
                                {% endif %}
                                {% if request.additionalinfo.regimen == 'bb'%}
                                Bed and breakfast
                                {% endif %}
                                {% if request.additionalinfo.regimen == 'hb'%}
                                Half Board
                                {% endif %}
                                {% if request.additionalinfo.regimen == 'fb'%}
                                Full Board
                                {% endif %}
                                {% if request.additionalinfo.regimen == 'ai'%}
                                All Inclusive
                                {% endif %}
                                </strong>
                                </span></div>
                                </span></div>
                                <br />
                                <div><img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 14px; width: 14px;" width="14">&nbsp;<strong><span>
                                {% for tag in request.whattodo %}
                                    {{tag.label_en}}{% if !loop.last %}, {% endif %}
                                {% endfor %}
                            </span></strong></div>
                                <br />
                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>