<table align="right" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer">
  <tbody>
  <tr>
    <td valign="top" class="mcnTextContent" style="padding: 9px 18px 9px 0px; text-align: left;">

      <h3 class="null" style="text-align: right;">TOTAL:&nbsp;{{ pricing.amount | numberFractions}} {{ pricing.currency.symbol }}</h3>


      <div style="text-align: right;">

        {# ha pagado el 100 en un pago #}
        {% if paymentmodel == 'tpv-100' || payments.length > 1 %}
          100%  PAGADO
          ({{ pricing.amount | numberFractions}} {{ pricing.currency.symbol }} )
          <br/>
        {# hay dos pagos #}
        {% else %}
          40% PAGADO
          ({{ pricing.amount * 0.4 | numberFractions}} {{ pricing.currency.symbol }} )
          <br/>
        {% endif %}

        <strong>con Tarjeta de Crédito</strong>
      </div>
    </td>
  </tr>
  </tbody>
</table>
