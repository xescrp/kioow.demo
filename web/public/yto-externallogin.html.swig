{% extends 'yto-layout-empty.html.swig' %}
{% block bodyclass %}user-front{% endblock %}
{% block body %}
	<div class="container">
	<div class="col-md-offset-3 col-md-6 text-center">
		<img src="http://res.cloudinary.com/open-market-travel/image/upload/v1448016027/yourttoo.com/yourttoo.com_brand_x2.png">
		{#	<div>
			<h3>Te estamos redireccionando a tu página de inicio</h3>
		  	<div class="preloader solo in"><span></span><span></span><span></span></div>
		</div> #}
		{% if error == 'empty'%}
		<div>
			<h1 class="text-red"><i class="fa fa-warning"></i></h1>
			<h3>Problemas con la identificación de tu cuenta</h3>
			<p>Contacta con tu servicio técnico</p>
			<pre class="hidden">login.error: {? message | json(2) ?}</pre>
		</div>
		{% endif %}
		{% if error == 'errorlogin'%}
		<div>
			<h1 class="text-red"><i class="fa fa-warning"></i></h1>
			<h3>Problemas con la identificación de tu cuenta</h3>
			<p class="bold">Usuario y contraseña no coinciden</p>
			<p>Contacta con tu servicio técnico</p>
			<pre class="hidden">login.error: {? message | json(2) ?}</pre>
		</div>
		{% endif %}

		{% if error == 'errorapi'%}
		<div>
			<h1 class="text-red"><i class="fa fa-warning"></i></h1>
			<h3>Problemas con la identificación de tu cuenta</h3>
			<p>Contacta con tu servicio técnico</p>
			<p class="alert alert-danger">
				Error : api.error : {? message | json(2) ?}
			</p>
		</div>
		{% endif %}

		{% if error == 'timeout'%}
		<div>
			<h1 class="text-red"><i class="fa fa-warning"></i></h1>
			<h3>Problemas con la identificación de tu cuenta</h3>
			<p>Contacta con tu servicio técnico</p>
			<p class="alert alert-danger">
				Tiempo de espera agotado<br />
				Error : api.timeout : {? message | json(2) ?}
			</p>
		</div>
		{% endif %}
	
	</div>
	</div>
{% endblock %}

{% block javascript %}
	{% parent %}
{% endblock %}