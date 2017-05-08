{% extends 'yto-layout.html.swig' %}
{% block bodyclass %}user-front static{% endblock %}

{% block body %}

<section class="container static-content" ng-controller="affiliateContactusCtrl">

  <ul class="breadcrumb">
    <li><a target="_self" href="/">Inicio</a></li>
    <li class="active">Contacta</li>
  </ul>

  <article class="panel">
    <header>
      <h1 class="thin mt-l mb-xxl mt-xl">Contacta</h1>
    </header>

    <div class="alert">
      <p><strong>yourttoo.com</strong><br>
      AVBAL/657<br>
      Calle Issac Newton 10 - Edificio Disset, 2da planta<br>
      07121 - Palma de Mallorca - Spain<br></p>
    </div>

    <form name="messageform" no-validate ng-init="formlang = 'es'">
    
      <input name="action" ng-model="formtype" type="hidden" value="contact" />
      <input name="action" ng-model="formsource" type="hidden" value="yourttoo" />
      
      <p class="text-brand-danger text-right">* requerido</p>

      <div class="form-group" ng-class="{ 'has-error': messageform.name.$invalid }">
        <label class="control-label" for="name"><i class="fa fa-exclamation-circle text-brand-danger"></i> Nombre <b>*</b></label><input required class="form-control" ng-model="msg.name" name="name" type="text" />
      </div>      

      <div class="form-group" ng-class="{ 'has-error': messageform.email.$invalid }">
        <label class="control-label" for="email"><i class="fa fa-exclamation-circle text-brand-danger"></i> Email <b>*</b></label><input required class="form-control" ng-model="msg.email" name="email" type="email">
      </div>

      <div class="form-group">
        <label> Teléfono</label><input class="form-control" ng-model="msg.phone" name="phone" placeholder="(opcional)" type="text">
      </div>

{#       <div class="form-group">
        <label>¿Por qué nos contactas?</label>
        <select class="form-control" ng-model="msg.type" name="enquiryType">
          <option value="">(selecciona uno)</option>
          <option value="message">Solo dejo un mensaje</option>
          <option value="question">Tengo una pregunta</option>
          <option value="other">Otra cosa...</option>
        </select>
      </div> #}

      <div class="form-group"ng-class="{ 'has-error': messageform.message.$invalid }">
        <label class="control-label" for="message"><i class="fa fa-exclamation-circle text-brand-danger"></i> Mensaje <b>*</b></label>
        <textarea class="form-control" ng-model="msg.msg" ng-minlength="4" name="message" placeholder="Escríbenos un mensaje..." rows="4" required></textarea>
      </div>
      <div class="form-group" ng-class="{ 'has-error': messageform.ireadconditions.$invalid}">
          <label class="control-label">
          Al enviar estoy aceptando la políticas de privacidad y protección de datos del <a target="_self" href="/pagina/aviso-legal-yourttoo">aviso legal</a>.
          </label> 
      </div>
      <div class="form-actions">
        <p class="text-right"><button class="btn btn-lg btn-primary" ng-click="checkform(messageform.$valid)" type="submit">Enviar</button></p>
      </div>
    </form>
  </article>
</section>

{% endblock %}

{% block javascript %}
    {% parent %}
    <!-- Controllers -->
    <script src="/js/angular/helpers/ContactusCtrl.js?v={? brand.appversion ?}"></script>

{% endblock %}