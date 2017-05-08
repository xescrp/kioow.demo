{% extends 'telayout.html.swig' %}

{% block body %}

<tr>
	<td align="center" valign="top" style="padding:30px;">
		<h1>TRANSACTIONAL-EMAILS</h1>
		<h4></h4>
		<ul>
			<li><a href="/te/dmc">DMCs / Receptivos</a></li>
			<li><a href="/te/omt">Admin OMT</a></li>
			<li><a href="/te/user">Traveler</a></li>
			<li><a href="/te/yto">yourttoo.com</a></li>
			<li><a href="/te/wl">White Label</a></li>
		</ul>
	</td>
</tr>

{% include "partials/index-utils.html.swig" %}

{% endblock %}
