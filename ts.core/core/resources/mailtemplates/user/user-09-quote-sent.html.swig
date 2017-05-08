{% extends '../user-layout.html.swig' %}

{% block body %}
<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                        <tbody class="mcnTextBlockOuter">
                            <tr>
                                <td valign="top" class="mcnTextBlockInner">
                                    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                        <tbody><tr>
                                            
                                            <td valign="top" class="mcnTextContent" style="padding: 9px 18px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;">
                                                &nbsp;
<h1>Has enviado una solicitud de viaje</h1>

                                            </td>
                                        </tr>
                                    </tbody></table>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
        <!-- // END HEADER -->
    </td>
</tr>
<tr>
    <td align="center" valign="top">
    <!-- BEGIN BODY // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
            <tr>
                <td valign="top" class="bodyContainer">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner">
                                
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                                    <tbody><tr>
                                        
                                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                                        
                                            Hola <strong>{{request.traveler.firstname}} {{request.traveler.lastname}}</strong>, hemos registrado tu solicitud del <strong>{{request.publishedDate|date('d/m/Y',-120,'(GMT+2)')}}</strong> a las <strong>{{request.publishedDate|date('G:i',-120,'(GMT+2)')}} hs</strong> <br />
                                            El identificador para esta solicitud es <stron>{{request.code}}</stron>
                                        </td>
                                    </tr>
                                </tbody></table>
                                
                            </td>
                        </tr>
                    </tbody>
                    </table>

<!-- BEGIN request // -->
{% include "../partials/tailor-made-details.es.html.swig" %}
<!-- // END request -->

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <br>
<span style="line-height:20.7999992370605px">Te avisaremos a esta misma cuenta de correo&nbsp;</span><strong style="line-height:20.7999992370605px">{{request.traveler.email}}</strong><span style="line-height:20.7999992370605px">&nbsp;cuando tengamos respuesta.&nbsp;</span><br style="line-height: 20.7999992370605px;">
<br>
                        </td>
                    </tr>
                </tbody>
               </table>
            </td>
        </tr>
    </tbody>
</table>

<!-- BEGIN Call to action -->
{% if ca == null || ca == undefined || ca == ''%}
    {% set ca = {txt : 'VER SOLICITUDES', url : 'http://www.openmarket.travel/client-requests/'}; %}
{% endif %}
{% include "../partials/gu-call-to-action.html.swig" %}
<!-- END Call to action -->

<!--  init  product related -->
{% if related && related.length > 0 %}

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="padding: 5px 18px;">
                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #D9D9D9;">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody>
</table>




<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding: 20px 18px; line-height: 125%; text-align: center;">
                        
                            <h2 style="text-align: left; text-weight: normal;"><span>Ideas de viajes disponibles online:</span>
&nbsp;</h2>


                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table>
<!-- init loop product related -->
    {% for product in related %}
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
        <tbody class="mcnCaptionBlockOuter">
            <tr>
                <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
                    



                <table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%">
                    <tbody><tr>
                        <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px ;">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer">
                                <tbody><tr>
                                    <td class="mcnCaptionRightImageContent" valign="top">
                                    <a href="{{product.absurl}}?utm_source=omt&amp;utm_medium=email&amp;utm_term=omt&amp;utm_content=productorelacionado&amp;utm_campaign=omttailormade" target="_blank">
                                        <img alt="{{product.title}} imagen principal" src="{{product.image}}" width="176" style="max-width:760px;" class="mcnImage">
                                    </a>
                                    </td>
                                </tr>
                            </tbody></table>
                            <table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="352">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <h3><strong><a href="{{product.absurl}}?utm_source=omt&amp;utm_medium=email&amp;utm_term=omt&amp;utm_content=productorelacionado&amp;utm_campaign=omttailormade" style="font-size: 20px;line-height: 20.7999992370605px;color: #1B5E7D;text-decoration: none;" target="_blank">{{product.title}}</a></strong></h3>

                <div style="padding-bottom: 9px;"><span style="line-height:22px"><img height="13" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-globe-normal.png" style="height: 13px; width: 13px;" width="13">&nbsp;<span>{{product.cities}}</span></span><br>
                <span style="line-height:22px"><img height="13" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 13px; width: 13px;" width="13">&nbsp;<span>{{product.duration}} día/s </span> &nbsp;<img height="13" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 13px; width: 13px;" width="13">&nbsp;<span>{{product.tags}}</span></span></div>

                <div style="vertical-align: bottom;"><a href="{{product.absurl}}?utm_source=omt&amp;utm_medium=email&amp;utm_term=omt&amp;utm_content=productorelacionado&amp;utm_campaign=omttailormade" style="color: #EA443E;text-decoration: none;vertical-align: bottom;" target="_blank"><span style="font-size:12px">desde <span style="font-size:24px">{{product.price}}</span></span> </a>&nbsp;&nbsp;<a href="{{product.absurl}}?utm_source=omt&amp;utm_medium=email&amp;utm_term=omt&amp;utm_content=productorelacionado&amp;utm_campaign=omttailormade" style="vertical-align:bottom; background-color:#e9433d; padding: 9px 18px 9px; border-radius: 3px; color: #ffffff; text-decoration: none; font-size:14px; display: inline-block; text-transform: uppercase;" target="_blank">+ INFO</a></div>

                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody>
                </table>

                </td>
            </tr>
        </tbody>
    </table>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock">
        <tbody class="mcnDividerBlockOuter">
            <tr>
                <td class="mcnDividerBlockInner" style="padding: 5px 18px;">
                    <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: solid;border-top-color: #D9D9D9;">
                        <tbody><tr>
                            <td>
                                <span></span>
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody>
    </table>
    {% endfor %}
    <!-- end loop product related -->
{% endif %}
<!-- end  product related -->

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">

                <!-- BEGIN messages // -->
                {% include "../partials/temessage-gracias.html.swig" %}
                {% include "../partials/temessage-email-reply.html.swig" %}
                <!-- // END messages -->              
                
            </td>
        </tr>
    </tbody>
</table>
</td>
</tr>
</table>
<!-- // END BODY -->
</td>
</tr>
{% endblock %}
