<table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer">
  <tbody>
    <tr>
      <td valign="top" class="mcnTextContent" style="padding: 9px 0px 9px 18px; text-align: left; font-size: 15px">
        <div>
          <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-calendar.png" style="height: 14px; width: 14px;" width="14">
          &nbsp;
          <span>{{dates.start.day}} {{dates.start.monthname_es}} {{dates.start.year}}</span>
        </div>
        <div>
          <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 14px; width: 14px;" width="14">
          &nbsp;
          <span>{{products[0].itinerary.length }} días</span>
        </div>

        {% set totalpax = 0 %}
        {% for room in rooms %}
        {% set totalpax += room.paxlist.length %}
        {% endfor %}

        <div>
          <img height="14" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-male.png" style="height: 14px; width: 14px;" width="14">
          &nbsp;{{totalpax}}
                    <span>&nbsp;pax, {{rooms.length}}
                      {% if rooms.length > 1 %}
                        habitaciones
                      {% else %}
                        habitación
                      {% endif %}
                      ({% for room in rooms %}{% if !loop.first %}{% endif %}{{room.roomcode}}{% if !loop.last %} / {% endif %}{% endfor %})
                    </span>
        </div>
      </td>
    </tr>
  </tbody>
</table>
