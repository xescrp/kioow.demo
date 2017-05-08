  <html>
  <head>
  <link href="/css/yto-main.css" rel="stylesheet"/>
{#   <script>
  function subst() {
    var vars={};
    var x=window.location.search.substring(1).split('&');
    for (var i in x) {var z=x[i].split('=',2);vars[z[0]] = unescape(z[1]);}
    var x=['frompage','topage','page','webpage','section','subsection','subsubsection'];
    for (var i in x) {
      var y = document.getElementsByClassName(x[i]);
      for (var j=0; j<y.length; ++j) y[j].textContent = vars[x[i]];
    }
  }
  </script> #}
  </head>
  <body class="print" onload="subst()">
    <style type="text/css">
      html{
      }
      body{
        margin: 0;
        padding: 0;
        border: none;
      }
      #pageFooter{
        width: 100%;
        color: #555;
        font-size: 0.8em;
        height: 1.3cm;
        padding-top: .2cm!important;       
      }
      #pageFooter td{
        width: 33.3%;
      }
      #pageholder{
        text-align: center;
      }
      #agencyFooter{
        text-align: right;
        height: 40px!important;
      }
      #agencyName{
        padding-left: .2cm;        
      }
    </style>

    <div class="col-xs-12">
      <table id="pageFooter">
        <tr>
        <td>{? date | date('d-m-Y') ?} <span>- Yourttoo.com</span></td>
          <td id="pageholder">
            P&aacute;gina <span class="page">{? page ?}</span> de <span class="topage">{? topage ?}</span>
          </td>         
        </tr>
      </table>
    </div>

  </body>
  </html>