<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                Cliente:
                {% if request.affiliate %}
                <strong>{{request.title}}</strong>
				{% else %}
                <strong>{{request.traveler.firstname}} {{request.traveler.lastname}}</strong>
                {% endif %}
            </td>
        </tr>
    </tbody>
</table>