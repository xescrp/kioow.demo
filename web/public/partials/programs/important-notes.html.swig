{% if product.important_txt_es != "" || product.important_txt_en != "" %}
<div class="col-md-12">
     <div class="alert alert-warning mt-l mb-zero">
        <h5 class="bold mt-zero"><i class="fa fa-exclamation-triangle"></i> Notas Importantes</h5>
        <p class="pre-text">
        {%- if product.important_txt_es != "" -%}
        {?- product.important_txt_es -?}
        {%- else -%}
        {?- product.important_txt_en -?}
		{%- endif -%}
        </p>
    </div>
</div>
{% endif %}