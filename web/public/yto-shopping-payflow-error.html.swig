{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front shopping-prebooking-page confirmation-page{% endblock %}

{% block body %}
    
        <section class="shopping-error">
          <div class="container static-content">
            <article>
            <div class="row static-thumb light sm">
              <div class="st-img text-center">
              <h2 class="mt-zero"><i class="fa fa-times-circle mb-b fa-3x middle text-light fadein-xxl"></i>&nbsp; <br class="visible-xs" /></h2>
              </div>
              <div class="st-description">
                <h1 class="thin mt-zero">Problemas con el pago</h1>
                <h2 class="thin mt-zero mb-xxl">No hemos podido recibir tu pago</h2>
                <p></p>
              </div>
            </div>
            </article>
          </div>
        </section>

        {% include "partials/yto/widgets/yto-actions-confirmation.html.swig" %}

{% endblock %}

{% block javascript %}
    {% parent %}
    <!-- Controllers -->
	{% if newlocation %}
	<script type="text/javascript">
	(function(){
		try{
			window.parent.location.href = '{? newlocation ?}';
		}
		catch(err){
			console.log(err);
		}
		
	})();
	</script>
	{% endif %}
{% endblock %}