<footer id="footer" class="no-print">
  <div class="container">
    <div class="row">
      <div class="footer-content">
        <div class="">
          <ul class="col-md-3">
            <div class="brand">
              <a href="#">
                <img class="logo" src="{? brand.logo ?}" data-src2x="{? brand.logox2 ?}" alt="{? brand.domain ?}" title="{? brand.domain ?} logo" />
              </a>
            </div>
          </ul>
          <ul class="col-md-3 text-center">
            <li>
              <h4 class="text-xs mb-b">Nosotros</h4>
            </li>
            <li>
              <a target="_self" href="/faqs">Preguntas Frecuentes</a>
            </li>
            <li>
              <a target="_self" href="/contacta">Contacta con nosotros</a>
            </li>
          </ul>
          <ul class="col-md-3 text-center">
            <li>
              <h4 class="text-xs mb-b">Información Legal</h4>
            </li>
            <li>
              <a target="_self" href="/pagina/aviso-legal-yourttoo">Aviso Legal</a>
              <a target="_self" class="ml-b" href="/pagina/politica-de-cookies-yourttoo">Política de Cookies</a>
            </li>
            <li>
              <a target="_self" href="/pagina/condiciones-yourttoo">Condiciones generales</a>
            </li>
          </ul>
          <ul class="col-md-3">
            <li  ng-show="false" class="text-center verifieds pt-l">Apoyado por el ministerio de Energia, turismo y agenda digital</li>
            <li>
              <img src="/img/brand/emprentur.jpg" style="width: 150px; margin-top: 53px;" />
            </li>
          </ul>
        </div>
        <div class="text-center verifieds col-md-12 pt-l">
          <p>
            <p>{?- brand.footertxt | safe -?}</p>
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>

{% include "../../widgets/yto-olark.html.swig" %}