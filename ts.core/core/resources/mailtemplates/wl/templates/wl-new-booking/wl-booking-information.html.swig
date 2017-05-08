<table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
  <tbody>
  <tr>
    <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">

      <h2 class="null">Programa: <strong>"{{ products[0].name }} {{ products[0].categoryname.label_es }}"</strong></h2>
      <br />

      <h3 class="null" style="line-height: 20.7999992370605px;">ID DE BOOKING: <a>{{ idBooking }}</a></h3>
      <em>Realizada: {{ createdOn | date('d/m/Y - G:i',-120,'(GMT+2)')}}</em>
    </td>
  </tr>
  </tbody>
</table>
