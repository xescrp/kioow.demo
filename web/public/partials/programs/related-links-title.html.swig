{% if related %}			
	<section class="main-description mt-l row hidden-xs" name="category">
		<ul class="nav nav-tabs nav-justified related-product">
		{% for rel in related %}
			{% if rel.slug_es == product.slug_es %}
				<li role="presentation" class="active"><a target="_self" href="/viaje/{?rel.slug_es?}?{? querystring ?}#category">
				{? rel.categoryname.label_es?}  
				<small>desde
				{? addNumSeps(rel.pvp.b2b) || rel.minprice.value ?}{? rel.pvp.currency.symbol ?}
				</small>
			{% else %}
				<li role="presentation"><a target="_self" href="/viaje/{?rel.slug_es?}?{? querystring ?}#category">
				{? rel.categoryname.label_es?}  
				<small class="text-red">desde
				{? addNumSeps(rel.pvp.b2b) || rel.minprice.value ?}{? rel.pvp.currency.symbol ?}
				</small>
			{% endif %}
			</a>
		</li>
		{% endfor %}
		</ul>
	</section>
{% endif %}
