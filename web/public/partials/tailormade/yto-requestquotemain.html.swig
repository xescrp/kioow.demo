<div class="container" ng-controller="RequestShowCtrl">
    <div class="row">
        <div class="col-md-12">		
            <ol class="breadcrumb mt-xl" vocab="http://schema.org/" typeof="BreadcrumbList">
				 {% for bread in bc %}
				  {% if bread.url != "" %}
					  <li property="itemListElement" typeof="ListItem"><a target="_self" property="item" typeof="WebPage" href="{? bread.url ?}">
				<span property="name">{? bread.label ?}</span></a>
				<meta property="position" content="{? loop.index ?}" ></meta>
					  </li>
				  {% else %}
				  <li class="active" property="itemListElement" typeof="ListItem">
				  	<a property="item" typeof="WebPage" href="{? canonicalurl ?}">
				  		<span property="name">{? bread.label ?}</span>
				  	</a>
				<meta property="position" content="{? loop.index ?}"></meta>
				  </li>	
				  {% endif %}
				{% endfor %}
		 	</ol>
        </div>
    </div>

        <div class="row">
          <section class="request">
            <nav class="subnav">
              <div class="main mb-l">
                <a href="{? back.url?}" target="_self" class="btn btn-link">
                  <i class="fa fa-arrow-left"></i> {? back.label?}
                </a>
              </div>
            </nav>

            <!-- product main content -->
            <div programpreview ng-if="quoteview != null && quoteview.products != null"
              program="quoteview.products"
              quote="quoteview"
              language="ES"
              openedit="false"
              removeeditor="true"
              removebuttons="true" ng-cloak="">
            </div>

            <div class="row" ng-if="{? quote.status != 'cancelled' && quote.status != 'discard' ?}">
              <!-- init messages chat -->
              <div ng-cloak="" name="chat" class="col-md-9">
                <div ng-chat=""
                referenceobj="'{? quote._id ?}'"
                referencetype="'quote'"
                lang="'ES'"
				        fromcode="'{? session.user.code ?}'"
                tocode="'{? product.dmc.code ?}'">
                </div>
              </div>
              <!-- end messages chat -->
            </div>
          </section>
</div>