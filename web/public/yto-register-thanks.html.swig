{% extends 'yto-layout.html.swig' %}

{% block bodyclass %}user-front confirmation-page {% endblock %}

{% block body %}

    <section class="shopping-prebooking bg-blue invert-text topbar-lifted">
      <div class="container static-content">
        <article>
        <div class="row static-thumb light sm">
          <div class="st-img text-center">
          <h2 class="mt-zero"><i class="fa fa-check-circle mb-b fa-3x middle text-light fadein-xxl"></i>&nbsp; <br class="visible-xs" /></h2>
          </div>
          <div class="st-description">
            <h1 class="thin mt-xxl">Registro realizado con éxito</h1>
          </div>
        </div>
        </article>
      </div>
    </section>

   <section class="thanks-wrap container static-content mt-xxl static-lifted">

     
      <div class="row thanks-signup">
        <div class="col-md-6 col-md-offset-3 text-left thanks-box bg-light">
          <br />
          <div class="thanks-icoblock"><i class="fa fa-check fa-3x pr-b"></i><span class="icon-bar"></span></div>
          <div class="thanks-icoblock"><i class="fa fa-check fa-3x pr-b"></i><span class="icon-bar"></span></div>
          <div class="thanks-icoblock mb-xxl"><i class="fa fa-check fa-3x pr-b"></i><span class="icon-bar"></span></div>
          <div>
          <h4 class="thin text-center mb-b">Estamos revisando tu solicitud.</h4>
          <h5 class="thin text-center mb-xxl">Nuestro departamento comercial te contactará <br> por correo para que puedas comenzar a operar.</h5>
        </div>
        </div>
        
       </div><!-- row ends --> 

{#       <div class="row text-center signup-tutorial">
        <br/><br/>
          <div class="tut-step-wrap">
            <div class="tut-step">
              <span class="middle mr-b badge tutorial">1</span>
              <span class="middle fa text-gray-lighter-low fa-envelope-o fa-5x"></span>
              <h3 class="text-gray-lighter">Check your inbox</h3>
            </div>
          </div>
          <div class="tut-step-wrap">
            <div class="tut-step">
              <span class="middle mr-b badge tutorial">2</span>
              <span class="middle fa text-gray-lighter-low fa-unlock-alt fa-5x"></span>
              <h3 class="text-gray-lighter">Sign into your account</h3>
            </div>
          </div>
          <div class="tut-step-wrap">
            <div class="tut-step">
              <span class="middle mr-b badge tutorial">3</span>
              <span class="middle fa text-gray-lighter-low fa-laptop fa-5x"></span>
              <h3 class="text-gray-lighter">Try our application</h3>
            </div>
          </div>
          <br/><br/>
 #}      </div>

    </section>

{% endblock %}

{% block javascript %}
  {% parent %}
   
{% endblock %}