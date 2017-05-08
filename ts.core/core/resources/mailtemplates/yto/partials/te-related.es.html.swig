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
                                    <a href="{{product.absurl}}?utm_source=yto&amp;utm_medium=email&amp;utm_term=yto&amp;utm_content=productorelacionado&amp;utm_campaign=ytotailormade" target="_blank">
                                        <img alt="{{product.title}} imagen principal" src="{{product.image}}" width="176" style="max-width:760px;" class="mcnImage">
                                    </a>
                                    </td>
                                </tr>
                            </tbody></table>
                            <table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="352">
                                <tbody><tr>
                                    <td valign="top" class="mcnTextContent">
                                        <h3><strong><a href="{{product.absurl}}?utm_source=yto&amp;utm_medium=email&amp;utm_term=yto&amp;utm_content=productorelacionado&amp;utm_campaign=ytotailormade" style="font-size: 20px;line-height: 20.7999992370605px; text-decoration: none;" target="_blank">{{product.title}}</a></strong></h3>

                <div style="padding-bottom: 9px;"><span style="line-height:22px"><img height="13" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-globe-normal.png" style="height: 13px; width: 13px;" width="13">&nbsp;<span>{{product.cities}}</span></span><br>
                <span style="line-height:22px"><img height="13" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-clock-o.png" style="height: 13px; width: 13px;" width="13">&nbsp;<span>{{product.duration}} día/s </span> &nbsp;<img height="13" src="http://res.cloudinary.com/open-market-travel/image/upload/v1423064611/mail/fa-tags.png" style="height: 13px; width: 13px;" width="13">&nbsp;<span>{{product.tags}}</span></span></div>

                <div style="vertical-align: bottom;"><a href="{{product.absurl}}?utm_source=yto&amp;utm_medium=email&amp;utm_term=yto&amp;utm_content=productorelacionado&amp;utm_campaign=ytotailormade" style="text-decoration: none;vertical-align: bottom;" target="_blank"><span style="font-size:12px">desde <span style="font-size:24px">{{product.price}}</span></span> </a>&nbsp;&nbsp;<a href="{{product.absurl}}?utm_source=yto&amp;utm_medium=email&amp;utm_term=yto&amp;utm_content=productorelacionado&amp;utm_campaign=ytotailormade" style="vertical-align:bottom; background-color: #FF5F59; font-weight: bold; padding: 9px 18px 9px; border-radius: 3px; color: #ffffff; text-decoration: none; font-size:14px; display: inline-block; text-transform: uppercase;" target="_blank">+ INFO</a></div>

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