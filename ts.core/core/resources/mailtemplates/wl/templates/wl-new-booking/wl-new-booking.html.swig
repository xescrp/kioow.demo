{% extends '../../wl-layout.html.swig' %}
  {% block body %}

    <tr>
      <td align="center" valign="top">
        {% include 'wl-booking-summary.html.swig' %}
      </td>
    </tr>
    <tr>
      <td align="center" valign="top">
        {% include 'wl-booking-body.html.swig' %}
      </td>
    </tr>
  {% endblock %}
