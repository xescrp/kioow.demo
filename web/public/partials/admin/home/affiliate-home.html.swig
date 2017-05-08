  <div class="container" ng-controller="adminHomeCtrl">
    <header class="row">
      <div class="col-md-4">
        {% if brandprefix == null && footerprefix == null %}
        <div ng-click="goToWhiteLabel()" style="width: 100%; cursor: pointer" class="related-banner-wrap ng-scope">
          <div class="text-center mt-xxl padded-b bg-darkblue-half text-invert">
            <h3 class="mt-b text-light">
              <strong>Marca Blanca</strong>
            </h3>
            <p class="mt-xl text-light">
              <strong>
                Añade valor a tu Agencia Online<br/>
                Vende nuestros productos desde tu propia web
              </strong>
            </p>
          </div>
        </div>
        {% endif %}
      </div>
      <div class="col-md-8">
        <h1 class="text-right pt-xxl pr-xxl bold col-md-12 h2 text-alternate">
          {? brand.name ?} te da la bienvenida a tu panel de gestión
        </h1>
        <h4 class="text-right pr-xxl bold col-md-12 text-alternate">
          <a target="_blank" href="/faq/21-tutorial">
            <i class="fa fa-eye"></i> Ver Tutorial
          </a>
        </h4>
      </div>
    </header>
    <section class="ventajas-wrap max-center-sm mb-xxl">
      <div class="ventajas row">
        <div class="col-md-4 link-wrapper trans-l">
          <div class="text-center" ng-controller="buscadorCtrl">
            <h4 class="text-light h3 bold mt-zero pb-l tit-shadow">Programas Multidays</h4>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <a class="btn btn-primary btn-block" href="#" ng-href="#" ng-click="opencsGenerated(''); $event.stopPropagation();">Busca por destino</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 link-wrapper trans-l">
          <div class="text-center">
            <h4 class="text-light h3 bold mt-zero pb-l tit-shadow">Viajes a Medida</h4>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <a class="btn btn-primary btn-block" target="_self" href="{? brand.path?}/viaje-a-medida">Solicita cotización</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 link-wrapper trans-l">
          <div class="text-center">
            <h4 class="text-light h3 bold mt-zero pb-l tit-shadow">Agencia</h4>
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <a class="btn btn-warning btn-block" target="_self" href="/admin/bookings">Mis Reservas</a>
                <a class="btn btn-warning btn-block" target="_self" href="/admin/budgets">Mis Presupuestos</a>
                <a class="btn btn-warning btn-block" target="_self" href="/edit/account?code={? loginsession.affiliate.code ?}&usertype=affiliate">Mi Cuenta</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- .ventajas row ends -->
    </section>
  </div>