<div itemprop="seller" itemscope itemtype="http://schema.org/Organization">
  <p><em>Viaje ofrecido por: </em></p>
  <a href="/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank">
    <img src='{? getUrlCloudinary(product.dmc.images.photo.url, "corporateselfie") ?}' 
         data-src2x='{? getUrlCloudinary(product.dmc.images.photo.url, "corporateselfieretina") ?}' 
         class="img-responsive" alt="{?  product.dmc.company.name ?} photo" title="{?  product.dmc.company.name ?} photo" /> 
  </a>
  <div class="dmc-profile-widget mt-xl">
    <a href="{? brand.path ?}/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank">
      <img class="img-circle avatarm42" src='{? getUrlCloudinary(product.dmc.images.logo.url, "avatarm42") ?}' 
           data-src2x='{? getUrlCloudinary(product.dmc.images.logo.url, "avatarm42retina") ?}' 
           title="{?  product.dmc.company.name ?} logo" alt="{?  product.dmc.company.name | title  ?}" />
    </a>
      <p class="dmc-text">
          por <a href="/receptivo/{? product.dmc.code ?}/{? product.dmc.name ?}" target="_blank" itemprop="name">{?  product.dmc.company.name ?}</a>
          <br />
          <br />
      </p>
  </div>
	</div>