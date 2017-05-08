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
              <a href="/page/about-us" target="_self">About Us</a>
            </li>
            <li>
              <a href="/page/how-does-it-work" target="_self">How does it work?</a>
            </li>
            <li>
              <a href="/faqs" target="_self">
                <abbr title="Frequently Asked Questions">FAQ</abbr>
              </a>
            </li>
          </ul>
          <ul class="col-md-3 text-center">
            <li>
              <a href="/page/contact-us" target="_self">Contact</a>
            </li>
            <li>
              <a href="/suppliers" target="_self">Supliers</a>
            </li>
            <li>
              <a href="http://blog.openmarket.travel/professional/" target="_blank">Blog</a>
            </li>
          </ul>
          <ul class="col-md-3 text-center">
            <li>
              <a href="/page/cookies-policy" target="_self">Cookies Policy</a>
            </li>
            <li>
              <a href="/page/privacy-policy" target="_self">Privacy Policy</a>
            </li>
            <li>
              <a href="/page/terms-conditions" target="_self">Terms and Conditions</a>
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